import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const LANGUAGES = ["id", "en", "ms-MY", "ja", "zh-CN", "ru"] as const;
type Language = (typeof LANGUAGES)[number];

type TranslationMap = {
  label: string;
  node: ts.ObjectLiteralExpression;
  entries: Map<Language, ts.Expression | undefined>;
};

type LocaleSnapshot = {
  keys: Set<string>;
  arrays: Map<string, number>;
  values: Map<string, string>;
  locations: Map<string, number>;
  readable: boolean;
  issues: string[];
};

type NumberClass =
  | "format-saja"
  | "adaptasi-mata-uang"
  | "adaptasi-skala"
  | "adaptasi-nama-konteks"
  | "label"
  | "nilai-beda"
  | "ambigu-pemisah";

type MismatchCounts = {
  idOnlyKeys: number;
  extraKeys: number;
  arrayLengths: number;
  numbers: number;
};

type NumericCase = {
  key: string;
  line: number;
  language: "en" | "ja";
  classification: Exclude<NumberClass, "format-saja">;
  idValue: string;
  otherValue: string;
  idNumbers: string[];
  otherNumbers: string[];
  idNumberCodePoints: string[];
  otherNumberCodePoints: string[];
};

type FalsePositiveHypotheses = {
  minusSigns: number;
  japaneseCounters: number;
  englishWordsOrSteps: number;
  separators: number;
};

type MismatchExample = {
  key: string;
  idValue: string;
  enValue: string;
  type: string;
  numericNote?: string;
};

type FileAnalysis = {
  path: string;
  maps: TranslationMap[];
  languages: Set<Language>;
  hasJaBranch: boolean;
  usesPickLang: boolean;
  hasTranslation: boolean;
  unreadable: string[];
  mismatchCounts: MismatchCounts;
  discrepancyCount: number;
  mismatchExamples: MismatchExample[];
  numberMismatchesBefore: number;
  numberMismatchesBeforeDiagnosis: number;
  numberMismatchesRemovedByDiagnosis: number;
  numberMismatchesAddedByDiagnosis: number;
  numberMismatchesAfter: number;
  numberMismatchesRemoved: number;
  numberMismatchesAdded: number;
  formatOnlyPairs: number;
  numberFormatAmbiguities: number;
  numberClasses: Record<NumberClass, number>;
  numericCases: NumericCase[];
  falsePositiveHypotheses: FalsePositiveHypotheses;
  kind: "halaman konten" | "wrapper";
  report: string[];
};

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pagesRoot = resolve(
  projectRoot,
  "artifacts/numatik/src/pages/buku-animasi-matematika",
);
const reportPath = resolve(projectRoot, "docs/i18n-report.md");

function isLanguage(value: string): value is Language {
  return LANGUAGES.includes(value as Language);
}

function propertyName(name: ts.PropertyName | undefined): string | undefined {
  if (!name) return undefined;
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteral(name) ||
    ts.isNoSubstitutionTemplateLiteral(name) ||
    ts.isNumericLiteral(name)
  ) {
    return name.text;
  }
  return undefined;
}

function unwrap(expression: ts.Expression): ts.Expression {
  let current = expression;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isNonNullExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function isLanguageExpression(expression: ts.Expression): boolean {
  const value = unwrap(expression);
  const name = ts.isIdentifier(value)
    ? value.text.toLowerCase()
    : ts.isPropertyAccessExpression(value)
      ? value.name.text.toLowerCase()
      : "";
  return (
    name === "language" ||
    name === "lang" ||
    name === "locale" ||
    name === "currentlanguage" ||
    name === "currentlang" ||
    name === "currentlocale" ||
    name === "selectedlanguage" ||
    name === "selectedlang" ||
    name === "selectedlocale"
  );
}

function collectDeclarations(
  source: ts.SourceFile,
): Map<string, ts.Expression[]> {
  const declarations = new Map<string, ts.Expression[]>();
  const visit = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer
    ) {
      const values = declarations.get(node.name.text) ?? [];
      values.push(node.initializer);
      declarations.set(node.name.text, values);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return declarations;
}

function resolveObject(
  expression: ts.Expression,
  declarations: Map<string, ts.Expression[]>,
  visited = new Set<string>(),
): ts.ObjectLiteralExpression | undefined {
  const value = unwrap(expression);
  if (ts.isObjectLiteralExpression(value)) return value;
  if (!ts.isIdentifier(value) || visited.has(value.text)) return undefined;

  visited.add(value.text);
  const candidates = declarations.get(value.text) ?? [];
  for (const candidate of candidates) {
    const resolved = resolveObject(candidate, declarations, visited);
    if (resolved) return resolved;
  }
  return undefined;
}

function resolveInitializer(
  expression: ts.Expression,
  declarations: Map<string, ts.Expression[]>,
  visited = new Set<string>(),
): ts.Expression {
  const value = unwrap(expression);
  if (!ts.isIdentifier(value) || visited.has(value.text)) return value;
  visited.add(value.text);
  const candidates = declarations.get(value.text) ?? [];
  for (const candidate of candidates) {
    const resolved = resolveInitializer(candidate, declarations, visited);
    if (resolved !== candidate || !ts.isIdentifier(resolved)) return resolved;
  }
  return value;
}

function mapSignature(
  entries: Map<Language, ts.Expression | undefined>,
): string {
  return LANGUAGES.filter((language) => entries.has(language))
    .map(
      (language) => `${language}:${entries.get(language)?.pos ?? "unresolved"}`,
    )
    .join("|");
}

function discoverTranslationMaps(source: ts.SourceFile): {
  maps: TranslationMap[];
  branches: Set<Language>;
  usesPickLang: boolean;
} {
  const declarations = collectDeclarations(source);
  const maps: TranslationMap[] = [];
  const signatures = new Set<string>();
  const branches = new Set<Language>();
  let usesPickLang = false;

  const addMap = (
    label: string,
    object: ts.ObjectLiteralExpression,
    allowSingleLocale = false,
  ) => {
    const languageProperties = new Map<Language, ts.Expression | undefined>();
    for (const property of object.properties) {
      if (ts.isSpreadAssignment(property)) continue;
      const key = propertyName(
        ts.isPropertyAssignment(property) ||
          ts.isMethodDeclaration(property) ||
          ts.isGetAccessorDeclaration(property) ||
          ts.isSetAccessorDeclaration(property)
          ? property.name
          : ts.isShorthandPropertyAssignment(property)
            ? property.name
            : undefined,
      );
      if (!key || !isLanguage(key)) continue;

      const initializer = ts.isPropertyAssignment(property)
        ? property.initializer
        : ts.isShorthandPropertyAssignment(property)
          ? property.name
          : undefined;
      languageProperties.set(key, initializer);
    }

    const hasSourceLanguage =
      languageProperties.has("id") ||
      languageProperties.has("en") ||
      languageProperties.has("ja");
    if (
      !hasSourceLanguage ||
      (!allowSingleLocale && languageProperties.size < 2)
    ) {
      return;
    }

    const signature = mapSignature(languageProperties);
    if (signatures.has(signature)) return;
    signatures.add(signature);
    maps.push({ label, node: object, entries: languageProperties });
  };

  const scopeLocales = new Map<
    ts.Node,
    Map<
      Language,
      { expression: ts.Expression; object: ts.ObjectLiteralExpression }
    >
  >();

  const nearestFunctionScope = (node: ts.Node): ts.Node => {
    let current: ts.Node | undefined = node.parent;
    while (current && !ts.isSourceFile(current)) {
      if (
        (ts.isFunctionDeclaration(current) ||
          ts.isFunctionExpression(current) ||
          ts.isArrowFunction(current) ||
          ts.isMethodDeclaration(current) ||
          ts.isConstructorDeclaration(current) ||
          ts.isGetAccessorDeclaration(current) ||
          ts.isSetAccessorDeclaration(current)) &&
        current.body &&
        ts.isBlock(current.body)
      ) {
        return current.body;
      }
      current = current.parent;
    }
    return source;
  };

  const visit = (node: ts.Node) => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      if (node.expression.text === "pickLang") usesPickLang = true;
    }

    if (ts.isBinaryExpression(node)) {
      const operator = node.operatorToken.kind;
      if (
        operator === ts.SyntaxKind.EqualsEqualsEqualsToken ||
        operator === ts.SyntaxKind.EqualsEqualsToken ||
        operator === ts.SyntaxKind.ExclamationEqualsEqualsToken ||
        operator === ts.SyntaxKind.ExclamationEqualsToken
      ) {
        const left = unwrap(node.left);
        const right = unwrap(node.right);
        const literal = ts.isStringLiteral(left)
          ? left
          : ts.isStringLiteral(right)
            ? right
            : undefined;
        if (
          literal &&
          isLanguage(literal.text) &&
          (isLanguageExpression(left) || isLanguageExpression(right))
        ) {
          branches.add(literal.text);
        }
      }
    }

    if (ts.isCaseClause(node) && ts.isStringLiteral(node.expression)) {
      let parent: ts.Node | undefined = node.parent;
      while (parent && !ts.isSwitchStatement(parent)) parent = parent.parent;
      if (
        isLanguage(node.expression.text) &&
        parent &&
        ts.isSwitchStatement(parent) &&
        isLanguageExpression(parent.expression)
      ) {
        branches.add(node.expression.text);
      }
    }

    if (ts.isObjectLiteralExpression(node)) {
      const parent = node.parent;
      const label =
        ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)
          ? parent.name.text
          : `object@${source.getLineAndCharacterOfPosition(node.getStart()).line + 1}`;
      const allowSingle = label === "translations";
      addMap(label, node, allowSingle);
    }

    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      isLanguage(node.name.text)
    ) {
      const object = resolveObject(node.initializer, declarations);
      if (object) {
        const scope = nearestFunctionScope(node);
        const locales = scopeLocales.get(scope) ?? new Map();
        locales.set(node.name.text, { expression: node.initializer, object });
        scopeLocales.set(scope, locales);
      }
    }

    ts.forEachChild(node, visit);
  };
  visit(source);

  for (const [scope, locales] of scopeLocales) {
    if (
      locales.size < 2 ||
      (!locales.has("id") && !locales.has("en") && !locales.has("ja"))
    ) {
      continue;
    }
    const entries = new Map<Language, ts.Expression | undefined>();
    for (const [language, value] of locales) {
      entries.set(language, value.expression);
    }
    const signature = mapSignature(entries);
    if (signatures.has(signature)) continue;
    signatures.add(signature);
    const first = locales.values().next().value as
      { object: ts.ObjectLiteralExpression } | undefined;
    if (first) {
      maps.push({
        label: `locale constants@${source.getLineAndCharacterOfPosition(scope.getStart()).line + 1}`,
        node: first.object,
        entries,
      });
    }
  }

  return { maps, branches, usesPickLang };
}

function visibleText(
  expression: ts.Expression,
  source: ts.SourceFile,
): string | undefined {
  const value = unwrap(expression);
  if (
    ts.isStringLiteral(value) ||
    ts.isNoSubstitutionTemplateLiteral(value) ||
    ts.isNumericLiteral(value)
  ) {
    return value.text;
  }

  if (ts.isTemplateExpression(value)) {
    const parts = [value.head.text];
    for (const span of value.templateSpans) {
      const spanValue = unwrap(span.expression);
      if (
        ts.isStringLiteral(spanValue) ||
        ts.isNoSubstitutionTemplateLiteral(spanValue) ||
        ts.isNumericLiteral(spanValue)
      ) {
        parts.push(spanValue.text);
      }
      parts.push(span.literal.text);
    }
    return parts.join("");
  }

  const jsxText = (node: ts.Node): string => {
    if (ts.isJsxText(node)) return node.text;
    if (ts.isJsxExpression(node)) {
      if (!node.expression) return "";
      return visibleText(node.expression, source) ?? "";
    }
    if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
      return node.children.map(jsxText).join("");
    }
    if (ts.isJsxSelfClosingElement(node)) {
      const attributes: string[] = [];
      for (const property of node.attributes.properties) {
        if (!ts.isJsxAttribute(property) || !property.initializer) continue;
        if (ts.isStringLiteral(property.initializer)) {
          attributes.push(property.initializer.text);
        } else if (
          ts.isJsxExpression(property.initializer) &&
          property.initializer.expression
        ) {
          attributes.push(
            visibleText(property.initializer.expression, source) ?? "",
          );
        }
      }
      return attributes.join(" ");
    }
    return "";
  };

  if (
    ts.isJsxElement(value) ||
    ts.isJsxFragment(value) ||
    ts.isJsxSelfClosingElement(value)
  ) {
    return jsxText(value);
  }

  return undefined;
}

function flattenLocale(
  expression: ts.Expression,
  source: ts.SourceFile,
  declarations: Map<string, ts.Expression[]>,
): LocaleSnapshot {
  const snapshot: LocaleSnapshot = {
    keys: new Set(),
    arrays: new Map(),
    values: new Map(),
    locations: new Map(),
    readable: true,
    issues: [],
  };

  const issue = (message: string) => {
    snapshot.readable = false;
    snapshot.issues.push(message);
  };

  const visitObject = (
    current: ts.ObjectLiteralExpression,
    prefix: string,
    visited: Set<string>,
  ) => {
    for (const property of current.properties) {
      if (ts.isSpreadAssignment(property)) {
        issue(`spread property at ${prefix || "<root>"}`);
        continue;
      }
      if (
        !ts.isPropertyAssignment(property) &&
        !ts.isShorthandPropertyAssignment(property)
      ) {
        issue(`unsupported property at ${prefix || "<root>"}`);
        continue;
      }

      const key = propertyName(property.name);
      if (!key) {
        issue(`computed property at ${prefix || "<root>"}`);
        continue;
      }
      const keyPath = prefix ? `${prefix}.${key}` : key;
      snapshot.keys.add(keyPath);
      snapshot.locations.set(
        keyPath,
        source.getLineAndCharacterOfPosition(property.getStart()).line + 1,
      );
      const initializer = ts.isPropertyAssignment(property)
        ? property.initializer
        : property.name;
      visitExpression(initializer, keyPath, visited);
    }
  };

  const visitExpression = (
    expression: ts.Expression,
    keyPath: string,
    visited: Set<string>,
  ) => {
    const value = resolveInitializer(expression, declarations);
    if (ts.isObjectLiteralExpression(value)) {
      visitObject(value, keyPath, visited);
      return;
    }
    if (ts.isArrayLiteralExpression(value)) {
      snapshot.arrays.set(keyPath, value.elements.length);
      value.elements.forEach((element) => {
        if (ts.isSpreadElement(element)) {
          issue(`spread array element at ${keyPath}`);
          return;
        }
        visitExpression(element, `${keyPath}[]`, visited);
      });
      return;
    }
    const text = visibleText(value, source);
    if (text !== undefined) snapshot.values.set(keyPath, text);
  };

  const root = resolveInitializer(expression, declarations);
  if (ts.isObjectLiteralExpression(root)) {
    visitObject(root, "", new Set());
  } else {
    visitExpression(root, "$value", new Set());
  }
  return snapshot;
}

function normalizeNumber(
  token: string,
  language: Language,
): string | undefined {
  let value = token;
  let sign = "";
  if (/^[+\-\u2212\u2012\u2013\u2014\uFE63\uFF0D]/u.test(value)) {
    sign = /^[\-\u2212\u2012\u2013\u2014\uFE63\uFF0D]/u.test(value) ? "-" : "";
    value = value.slice(1);
  }
  if (!value) return undefined;

  if (language === "ja" && /[億万]/u.test(value)) {
    const unitMatches = [
      ...value.matchAll(/(\d+(?:,\d{3})*(?:\.\d+)?)\s*([億万])/gu),
    ];
    const matchedValue = unitMatches
      .map((match) => match[0].replace(/\s/g, ""))
      .join("");
    if (
      !unitMatches.length ||
      matchedValue !== value.replace(/\s/g, "")
    ) {
      return undefined;
    }
    const total = unitMatches.reduce((sum, match) => {
      const multiplier = match[2] === "億" ? 100_000_000 : 10_000;
      return sum + Number(match[1].replace(/,/g, "")) * multiplier;
    }, 0);
    if (!Number.isFinite(total)) return undefined;
    const normalized = String(total)
      .replace(/(\.\d*?)0+$/, "$1")
      .replace(/\.$/, "");
    return `${sign}${normalized}`;
  }

  const decimalSeparator =
    language === "id" || language === "ru" ? "," : ".";
  const decimalIndex = value.lastIndexOf(decimalSeparator);
  const integerPart = decimalIndex >= 0 ? value.slice(0, decimalIndex) : value;
  const fractionalPart = decimalIndex >= 0 ? value.slice(decimalIndex + 1) : "";
  const integer =
    integerPart.replace(/[.,\u00a0\u202f ]/g, "").replace(/^0+(?=\d)/, "") ||
    "0";
  const fraction = fractionalPart
    .replace(/[.,\u00a0\u202f ]/g, "")
    .replace(/0+$/, "");
  return `${sign}${integer}${fraction ? `.${fraction}` : ""}`;
}

const circledDigits: Record<string, string> = {
  "①": "1",
  "②": "2",
  "③": "3",
};

function prepareNumberText(text: string, language: Language): string {
  const gradePatterns: Partial<Record<Language, RegExp>> = {
    id: /\bkelas\s*[789]\s*[a-z]?\b/gi,
    en: /\bgrade\s*[789]\s*[a-z]?\b/gi,
    "ms-MY": /\btingkatan\s*[1-3]\s*[a-z]?\b/gi,
    ja: /中学\s*[1-3]\s*年/g,
    "zh-CN": /[七八九1-9]\s*年级/g,
    ru: /\b[789]\s*класс\b/gi,
  };
  return text
    .replace(/[①②③]/gu, (digit) => `${circledDigits[digit]};`)
    .replace(/(?<=\d)(?=cm²)/giu, " ")
    .replace(/\bRp(?=\s*[+-]?\d)/gi, " ")
    .replace(/\\,/g, " ")
    .replace(/\{,\}/g, ",")
    .replace(
      /\\(?:underline|overline|text|mathrm|mathbf|mathit|operatorname)\s*\{([^{}]*)\}/g,
      "$1",
    )
    .replace(/\\[A-Za-z]+/g, " ")
    .replace(
      /\\?\{(\s*\d+(?:\s*,\s*\d+)+\s*)\\?\}/g,
      (_match, values: string) => values.replace(/,/g, ";"),
    )
    .replace(/[{}]/g, " ")
    .replace(gradePatterns[language] ?? /$^/, " ");
}

function numberTokenMatches(
  text: string,
  language: Language,
): Array<{ index: number; value: string }> {
  const prepared = prepareNumberText(text, language);
  const numericPattern =
    language === "id"
      ? String.raw`(?:\d{1,3}(?:\.\d{3})+|\d+)(?:,\d+)?`
      : language === "ru"
        ? String.raw`(?:\d{1,3}(?:[ \u00a0\u202f]\d{3})+|\d+)(?:,\d+)?`
        : language === "ja"
          ? String.raw`(?:(?:\d+(?:,\d{3})*(?:\.\d+)?\s*[億万])+|(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?)`
          : String.raw`(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?`;
  const pattern = new RegExp(
    String.raw`(?<![A-Za-z0-9_])([+\-\u2212\u2012\u2013\u2014\uFE63\uFF0D]?${numericPattern})(?:st|nd|rd|th)?(?![A-Za-z0-9_])`,
    "giu",
  );
  const matches = [
    ...prepared.matchAll(pattern),
  ];
  return matches.map((match) => ({
    index: match.index ?? 0,
    value: match[1].replace(/(?:st|nd|rd|th)$/i, ""),
  }));
}

function numberTokensIn(text: string, language: Language): string[] {
  return numberTokenMatches(text, language).map(({ value }) => value);
}

function numbersIn(text: string, language: Language): string[] {
  return numberTokensIn(text, language)
    .map((token) => normalizeNumber(token, language))
    .filter((value): value is string => value !== undefined);
}

const numberWordPatterns: Partial<Record<Language, Array<[RegExp, string]>>> = {
  id: [
    [/\b(?:pertama|kesatu|satu)\b/gi, "1"],
    [/\b(?:keduanya|kedua|dua)\b/gi, "2"],
    [/\b(?:ketiganya|ketiga|tiga)\b/gi, "3"],
    [/\b(?:keempatnya|keempat|empat)\b/gi, "4"],
    [/\b(?:kelimanya|kelima|lima)\b/gi, "5"],
    [/\b(?:keenamnya|keenam|enam)\b/gi, "6"],
    [/\b(?:ketujuhnya|ketujuh|tujuh)\b/gi, "7"],
    [/\b(?:kedelapannya|kedelapan|delapan)\b/gi, "8"],
    [/\b(?:kesembilannya|kesembilan|sembilan)\b/gi, "9"],
    [/\b(?:kesepuluhnya|kesepuluh|sepuluh)\b/gi, "10"],
  ],
  "ms-MY": [
    [/\b(?:pertama|kesatu|satu)\b/gi, "1"],
    [/\b(?:keduanya|kedua|dua)\b/gi, "2"],
    [/\b(?:ketiga|tiga)\b/gi, "3"],
    [/\b(?:keempat|empat)\b/gi, "4"],
    [/\b(?:kelima|lima)\b/gi, "5"],
    [/\b(?:keenam|enam)\b/gi, "6"],
    [/\b(?:ketujuh|tujuh)\b/gi, "7"],
    [/\b(?:kelapan|lapan)\b/gi, "8"],
    [/\b(?:kesembilan|sembilan)\b/gi, "9"],
    [/\b(?:kesepuluh|sepuluh)\b/gi, "10"],
  ],
  en: [
    [/\b(?:first|one)\b/gi, "1"],
    [/\b(?:second|two)\b/gi, "2"],
    [/\b(?:third|three)\b/gi, "3"],
    [/\b(?:fourth|four)\b/gi, "4"],
    [/\b(?:fifth|five)\b/gi, "5"],
    [/\b(?:sixth|six)\b/gi, "6"],
    [/\b(?:seventh|seven)\b/gi, "7"],
    [/\b(?:eighth|eight)\b/gi, "8"],
    [/\b(?:ninth|nine)\b/gi, "9"],
    [/\b(?:tenth|ten)\b/gi, "10"],
  ],
};

function japaneseKanjiNumber(value: string): number | undefined {
  const digits: Record<string, number> = {
    零: 0,
    〇: 0,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
  };
  const units: Record<string, number> = { 十: 10, 百: 100, 千: 1000 };
  let total = 0;
  let current = 0;
  for (const character of value) {
    if (character in digits) {
      current = digits[character];
    } else if (character in units) {
      total += (current || 1) * units[character];
      current = 0;
    } else {
      return undefined;
    }
  }
  return total + current;
}

function numberWordMatches(
  text: string,
  language: Language,
): Array<{ index: number; value: string }> {
  const prepared = prepareNumberText(text, language);
  if (language === "ja") {
    const matches = [
      ...prepared.matchAll(
        /(?:第\s*)?([〇零一二三四五六七八九十百千]+)\s*(?:つ|個|回|人|番目)/gu,
      ),
    ];
    return matches.flatMap((match) => {
      const value = japaneseKanjiNumber(match[1]);
      return value === undefined
        ? []
        : [{ index: match.index ?? 0, value: String(value) }];
    });
  }
  return (numberWordPatterns[language] ?? [])
    .flatMap(([pattern, value]) => {
      const matches = [...prepared.matchAll(pattern)];
      return matches.map((match) => ({
        index: match.index ?? 0,
        value,
      }));
    })
    .sort((a, b) => a.index - b.index)
    .filter((match, index, matches) => {
      const previous = matches[index - 1];
      return !previous || previous.index !== match.index;
    });
}

function numberCodePoints(text: string): string[] {
  const symbols = [
    ...new Set(
      text.match(
        /[0-9０-９①②③〇零一二三四五六七八九十百千万億.,，。٫٬+\-\u2212\u2012\u2013\u2014\uFE63\uFF0D]/gu,
      ) ?? [],
    ),
  ];
  return symbols.map((symbol) => {
    const code = symbol.codePointAt(0) ?? 0;
    return `${symbol}=U+${code.toString(16).toUpperCase().padStart(4, "0")}`;
  });
}

function numbersForComparison(
  text: string,
  language: Language,
): string[] {
  return [...new Set(numbersIn(text, language))].sort();
}

function hasComparableDigits(
  firstText: string,
  firstLanguage: Language,
  secondText: string,
  secondLanguage: Language,
): boolean {
  return (
    numberTokenMatches(firstText, firstLanguage).length > 0 &&
    numberTokenMatches(secondText, secondLanguage).length > 0
  );
}

const previousNumberWordPatterns: Partial<
  Record<Language, Array<[RegExp, string]>>
> = {
  id: numberWordPatterns.id,
  "ms-MY": numberWordPatterns["ms-MY"],
  en: numberWordPatterns.en,
  ja: [
    [/一/g, "1"],
    [/二/g, "2"],
    [/三/g, "3"],
    [/四/g, "4"],
    [/五/g, "5"],
    [/六/g, "6"],
    [/七/g, "7"],
    [/八/g, "8"],
    [/九/g, "9"],
    [/十/g, "10"],
  ],
};

function previousNormalizeNumber(
  token: string,
  language: Language,
): string | undefined {
  let value = token.replace(/[\u00a0\u202f ]/g, "");
  let sign = "";
  if (value.startsWith("-") || value.startsWith("+")) {
    sign = value[0] === "-" ? "-" : "";
    value = value.slice(1);
  }
  if (!value) return undefined;
  const comma = value.lastIndexOf(",");
  const dot = value.lastIndexOf(".");
  let decimalSeparator: string | undefined;
  if (comma >= 0 && dot >= 0) {
    decimalSeparator = language === "id" || language === "ru" ? "," : ".";
  } else if (comma >= 0) {
    const trailing = value.length - comma - 1;
    decimalSeparator =
      language === "en" ||
      language === "ja" ||
      language === "ms-MY" ||
      language === "zh-CN"
        ? trailing === 3
          ? undefined
          : ","
        : ",";
  } else if (dot >= 0) {
    const trailing = value.length - dot - 1;
    decimalSeparator =
      language === "id" || language === "ru"
        ? trailing === 3
          ? undefined
          : "."
        : ".";
  }
  const decimalIndex = decimalSeparator
    ? value.lastIndexOf(decimalSeparator)
    : -1;
  const integerPart = decimalIndex >= 0 ? value.slice(0, decimalIndex) : value;
  const fractionalPart = decimalIndex >= 0 ? value.slice(decimalIndex + 1) : "";
  const integer =
    integerPart.replace(/[.,]/g, "").replace(/^0+(?=\d)/, "") || "0";
  const fraction = fractionalPart.replace(/[.,]/g, "").replace(/0+$/, "");
  return `${sign}${integer}${fraction ? `.${fraction}` : ""}`;
}

function previousNumberTokensIn(
  text: string,
  language: Language,
): Array<{ index: number; value: string }> {
  const prepared = prepareNumberText(text, language);
  return [
    ...prepared.matchAll(
      /(?<![A-Za-z0-9_])([+-]?\d+(?:[.,\u00a0\u202f ]\d+)*)(?:st|nd|rd|th)?(?![A-Za-z0-9_])/giu,
    ),
  ].map((match) => ({
    index: match.index ?? 0,
    value: match[1].replace(/(?:st|nd|rd|th)$/i, ""),
  }));
}

function previousNumberWordsIn(
  text: string,
  language: Language,
): Array<{ index: number; value: string }> {
  const prepared = prepareNumberText(text, language);
  return (previousNumberWordPatterns[language] ?? [])
    .flatMap(([pattern, value]) =>
      [...prepared.matchAll(pattern)].map((match) => ({
        index: match.index ?? 0,
        value,
      })),
    )
    .sort((left, right) => left.index - right.index)
    .filter((match, index, matches) => {
      const previous = matches[index - 1];
      return !previous || previous.index !== match.index;
    });
}

function previousNumbersForComparison(
  text: string,
  language: Language,
  counterpartText: string,
  counterpartLanguage: Language,
): string[] {
  const comparisonText =
    language === "ja" &&
    /\d+\s*乗/.test(text) &&
    /(?:dikuadratkan|kuadrat|squared)/i.test(counterpartText) &&
    previousNumberWordsIn(counterpartText, counterpartLanguage).length === 0
      ? text.replace(/\d+\s*乗/g, " ")
      : text;
  const literals = previousNumberTokensIn(comparisonText, language);
  const counterpartLiteralCount = previousNumberTokensIn(
    counterpartText,
    counterpartLanguage,
  ).length;
  const words = previousNumberWordsIn(comparisonText, language).slice(
    0,
    Math.max(0, counterpartLiteralCount - literals.length),
  );
  return [...literals, ...words]
    .sort((left, right) => left.index - right.index)
    .map(({ value }) => previousNormalizeNumber(value, language))
    .filter((value): value is string => value !== undefined);
}

function sameDigitsDifferentSeparators(
  leftTokens: string[],
  rightTokens: string[],
): boolean {
  return (
    leftTokens.length > 0 &&
    leftTokens.length === rightTokens.length &&
    leftTokens.every(
      (token, index) =>
        token.replace(/[.,\s]/g, "") ===
        rightTokens[index].replace(/[.,\s]/g, ""),
    )
  );
}

const labelNumberPatterns: Partial<Record<Language, RegExp>> = {
  id: /\b(?:langkah|contoh|gambar|soal|bab|sub[- ]?bab|nomor)\s*#?\s*\d+\b/gi,
  en: /\b(?:step|example|figure|problem|question|chapter|section|no\.?)\s*#?\s*\d+\b/gi,
  "ms-MY": /\b(?:langkah|contoh|rajah|soalan|bab|nombor)\s*#?\s*\d+\b/gi,
  ja: /(?:第\s*)?\d+\s*(?:章|節|問|図|ステップ|例)|(?:ステップ|例|図|問題)\s*\d+/g,
  "zh-CN": /(?:第\s*)?\d+\s*(?:章|节|题|图|步|例)|(?:步骤|例|图|问题)\s*\d+/g,
  ru: /\b(?:шаг|пример|рисунок|задача|вопрос|глава|раздел)\s*#?\s*\d+\b/gi,
};

const localPersonNames = [
  "Adi",
  "Bayu",
  "Beni",
  "Budi",
  "Candra",
  "Citra",
  "Dewi",
  "Dina",
  "Eko",
  "Fitri",
  "Made",
  "Putri",
  "Rani",
  "Siti",
  "Wayan",
];
const adaptedPersonNames = [
  "Alex",
  "Casey",
  "Chris",
  "Drew",
  "Jamie",
  "Jordan",
  "Morgan",
  "Pat",
  "Riley",
  "Sam",
  "Sage",
  "Taylor",
];

function containsOneOf(text: string, names: string[]): boolean {
  return names.some((name) => new RegExp(`\\b${name}\\b`, "i").test(text));
}

function numbersWithoutLabels(
  text: string,
  language: Language,
): { numbers: string[]; removedLabel: boolean } {
  const withoutLabels = text.replace(
    labelNumberPatterns[language] ?? /$^/,
    " ",
  );
  return {
    numbers: numbersIn(withoutLabels, language),
    removedLabel: withoutLabels !== text,
  };
}

function isCurrencyAdaptation(
  idText: string,
  otherText: string,
  idNumbers: string[],
  otherNumbers: string[],
): boolean {
  if (!/\bRp\s*[\d.,]/i.test(idText) || !/\$\s*[\d.,]/.test(otherText)) {
    return false;
  }
  if (idNumbers.length !== otherNumbers.length || !idNumbers.length)
    return false;

  let scaledAmountFound = false;
  return (
    idNumbers.every((idNumber, index) => {
      const idValue = Number(idNumber);
      const otherValue = Number(otherNumbers[index]);
      if (!Number.isFinite(idValue) || !Number.isFinite(otherValue))
        return false;
      if (idValue === otherValue) return true;
      if (
        idValue !== 0 &&
        otherValue !== 0 &&
        (Math.abs(idValue / otherValue) === 1000 ||
          Math.abs(otherValue / idValue) === 1000)
      ) {
        scaledAmountFound = true;
        return true;
      }
      return false;
    }) && scaledAmountFound
  );
}

function divideByPowerOfTen(
  value: string,
  exponent: number,
): string | undefined {
  const match = value.match(/^(-?)(\d+)(?:\.(\d+))?$/);
  if (!match) return undefined;
  const [, sign, integer, fraction = ""] = match;
  const digits = `${integer}${fraction}`;
  const decimalPosition = integer.length - exponent;
  const shiftedInteger =
    decimalPosition > 0 ? digits.slice(0, decimalPosition) : "0";
  const shiftedFraction =
    decimalPosition > 0
      ? digits.slice(decimalPosition)
      : `${"0".repeat(-decimalPosition)}${digits}`;
  const normalizedInteger =
    shiftedInteger.replace(/^0+(?=\d)/, "") || "0";
  const normalizedFraction = shiftedFraction.replace(/0+$/, "");
  return `${sign}${normalizedInteger}${normalizedFraction ? `.${normalizedFraction}` : ""}`;
}

const scaleAdaptationFactors = [10, 100, 1000, 10000, 1000000] as const;

function isScaleAdaptation(
  idNumbers: string[],
  otherNumbers: string[],
): boolean {
  if (!idNumbers.length || idNumbers.length !== otherNumbers.length) {
    return false;
  }

  return scaleAdaptationFactors.some((factor) => {
    const candidates = idNumbers
      .map((idNumber) => {
        const values = [{ value: idNumber, scaled: false }];
        const scaledValue = divideByPowerOfTen(
          idNumber,
          Math.log10(factor),
        );
        if (scaledValue !== undefined && scaledValue !== idNumber) {
          values.push({ value: scaledValue, scaled: true });
        }
        return values
          .map(({ value, scaled }) => ({
            index: otherNumbers.indexOf(value),
            scaled,
          }))
          .filter(({ index }) => index >= 0);
      })
      .sort((first, second) => first.length - second.length);
    if (candidates.some((values) => !values.length)) return false;

    const findMatching = (
      index: number,
      usedIndices: Set<number>,
      scaledValueFound: boolean,
    ): boolean => {
      if (index === candidates.length) return scaledValueFound;
      return candidates[index].some(
        ({ index: otherIndex, scaled }) =>
          !usedIndices.has(otherIndex) &&
          findMatching(
            index + 1,
            new Set([...usedIndices, otherIndex]),
            scaledValueFound || scaled,
          ),
      );
    };
    return findMatching(0, new Set(), false);
  });
}

function classifyNumberMismatch(
  idText: string,
  otherText: string,
  language: "en" | "ja",
  idTokens: string[],
  otherTokens: string[],
  idNumbers: string[],
  otherNumbers: string[],
): Exclude<NumberClass, "format-saja"> {
  if (sameDigitsDifferentSeparators(idTokens, otherTokens)) {
    return "ambigu-pemisah";
  }
  if (
    language === "ja" &&
    /\d+(?:本|冊|人|個|枚|台|匹|回|つ)/.test(otherText) &&
    !idNumbers.length &&
    otherNumbers.every((number) => number === "1" || number === "2") &&
    numberWordMatches(idText, "id").length === 0
  ) {
    return "adaptasi-nama-konteks";
  }
  const idWithoutLabels = numbersWithoutLabels(idText, "id");
  const otherWithoutLabels = numbersWithoutLabels(otherText, language);
  if (
    (idWithoutLabels.removedLabel || otherWithoutLabels.removedLabel) &&
    idWithoutLabels.numbers.join(",") === otherWithoutLabels.numbers.join(",")
  ) {
    return "label";
  }
  if (isCurrencyAdaptation(idText, otherText, idNumbers, otherNumbers)) {
    return "adaptasi-mata-uang";
  }
  if (isScaleAdaptation(idNumbers, otherNumbers)) {
    return "adaptasi-skala";
  }
  if (
    containsOneOf(idText, localPersonNames) &&
    containsOneOf(otherText, adaptedPersonNames)
  ) {
    return "adaptasi-nama-konteks";
  }
  return "nilai-beda";
}

const numberNormalizationExamples: Array<[string, Language, string[]]> = [
  ["1.234,5", "id", ["1234.5"]],
  ["1,234.5", "en", ["1234.5"]],
  ["1,234.5", "ms-MY", ["1234.5"]],
  ["1,234.5", "ja", ["1234.5"]],
  ["1,234.5", "zh-CN", ["1234.5"]],
  ["1 234,5", "ru", ["1234.5"]],
  ["1.234", "id", ["1234"]],
  ["1,234", "en", ["1234"]],
  ["2, 3, 5, 7, 11, 13", "en", ["2", "3", "5", "7", "11", "13"]],
  ["4,638", "id", ["4.638"]],
  ["4,638", "en", ["4638"]],
  ["S = \\{1,2,3,4\\}", "id", ["1", "2", "3", "4"]],
  ["①②③", "en", ["1", "2", "3"]],
  ["Rp1.234.500", "id", ["1234500"]],
  ["$1,234,500", "en", ["1234500"]],
  ["300万", "ja", ["3000000"]],
  ["1億2,345万", "ja", ["123450000"]],
  ["1\\,234{,}5", "ru", ["1234.5"]],
  ["4,\\underline{6}38", "id", ["4.638"]],
  ["2nd decimal", "en", ["2"]],
  ["中学1年", "ja", []],
];

function displayValue(
  snapshot: LocaleSnapshot | undefined,
  key: string,
): string {
  if (!snapshot) return "—";
  const value = snapshot.values.get(key);
  if (value !== undefined) return value.replace(/\s+/g, " ").trim();
  const arrayLength = snapshot.arrays.get(key);
  if (arrayLength !== undefined) return `[array length ${arrayLength}]`;
  const childCount = [...snapshot.keys].filter((candidate) =>
    candidate.startsWith(`${key}.`),
  ).length;
  if (childCount) return `[object with ${childCount} keys]`;
  return snapshot.keys.has(key) ? "[dynamic value]" : "—";
}

function compactValue(value: string, maxLength = 180): string {
  const normalized = markdownCell(value);
  return normalized.length > maxLength
    ? `${normalized.slice(0, maxLength - 1)}…`
    : normalized;
}

function markdownCell(value: string): string {
  return value.replace(/\s+/g, " ").replace(/\|/g, "\\|").replace(/`/g, "\\`");
}

function legacyNumbersIn(text: string, language: Language): string[] {
  const tokens =
    text.match(
      /(?<![\p{L}\p{N}_])[+-]?\d+(?:[.,\u00a0\u202f ]\d+)*(?![\p{L}\p{N}_])/gu,
    ) ?? [];
  return tokens
    .map((token) => normalizeNumber(token, language))
    .filter((value): value is string => value !== undefined);
}

function assertNumberNormalizationExamples(): void {
  for (const [text, language, expected] of numberNormalizationExamples) {
    const actual = numbersIn(text, language);
    if (actual.join(",") !== expected.join(",")) {
      throw new Error(
        `Number normalization failed for ${language} value ${JSON.stringify(text)}: ${actual.join(",")}`,
      );
    }
  }
  const scaleAdaptationExamples: Array<
    [string[], string[], boolean]
  > = [
    [["3000000", "50"], ["300", "50"], true],
    [["1000000", "2000000"], ["1", "2"], true],
    [["10", "100"], ["1", "10"], true],
    [["100", "200"], ["10", "20"], true],
    [["100", "200"], ["10", "21"], false],
    [["100"], ["1000"], false],
  ];
  for (const [idNumbers, otherNumbers, expected] of scaleAdaptationExamples) {
    if (isScaleAdaptation(idNumbers, otherNumbers) !== expected) {
      throw new Error(
        `Scale adaptation failed for id=[${idNumbers}] and other=[${otherNumbers}]`,
      );
    }
  }
  if (hasComparableDigits("dua bilangan", "id", "2つ", "ja")) {
    throw new Error("Pairs without digits on both sides must be ignored");
  }
  for (const sign of ["-", "−", "–", "—"]) {
    if (numbersIn(`${sign}12`, "en").join(",") !== "-12") {
      throw new Error(`Minus normalization failed for ${JSON.stringify(sign)}`);
    }
  }
  if (hasComparableDigits("3", "id", "三つ", "ja")) {
    throw new Error("Japanese word counters without digits must be ignored");
  }
  if (numberWordMatches("三角形", "ja").length !== 0) {
    throw new Error(
      "Kanji digits embedded in ordinary words must not be counted",
    );
  }
  if (numberWordMatches("二十人", "ja")[0]?.value !== "20") {
    throw new Error("Japanese compound counter parsing failed");
  }
  if (numbersForComparison("①②③", "en").join(",") !== "1,2,3") {
    throw new Error("Circled digit normalization failed");
  }
  if (
    numbersForComparison("1 + 2 + 1", "en").join(",") !==
    numbersForComparison("2 + 1", "en").join(",")
  ) {
    throw new Error("Numeric comparisons must compare sets, not sequences");
  }
}

assertNumberNormalizationExamples();

function analyzeMap(
  map: TranslationMap,
  source: ts.SourceFile,
  declarations: Map<string, ts.Expression[]>,
): {
  lines: string[];
  counts: MismatchCounts;
  examples: MismatchExample[];
  numericCases: NumericCase[];
  unreadable: string[];
  numberMismatchesBefore: number;
  numberMismatchesBeforeDiagnosis: number;
  numberMismatchesRemovedByDiagnosis: number;
  numberMismatchesAddedByDiagnosis: number;
  numberMismatchesAfter: number;
  numberMismatchesRemoved: number;
  numberMismatchesAdded: number;
  formatOnlyPairs: number;
  numberFormatAmbiguities: number;
  numberClasses: Record<NumberClass, number>;
  falsePositiveHypotheses: FalsePositiveHypotheses;
} {
  const snapshots = new Map<Language, LocaleSnapshot>();
  const unreadable: string[] = [];
  const counts: MismatchCounts = {
    idOnlyKeys: 0,
    extraKeys: 0,
    arrayLengths: 0,
    numbers: 0,
  };
  const examples: MismatchExample[] = [];
  const numericCases: NumericCase[] = [];
  const numberClasses: Record<NumberClass, number> = {
    "format-saja": 0,
    "adaptasi-mata-uang": 0,
    "adaptasi-skala": 0,
    "adaptasi-nama-konteks": 0,
    label: 0,
    "nilai-beda": 0,
    "ambigu-pemisah": 0,
  };
  let numberMismatchesBefore = 0;
  let numberMismatchesBeforeDiagnosis = 0;
  let numberMismatchesRemovedByDiagnosis = 0;
  let numberMismatchesAddedByDiagnosis = 0;
  let numberMismatchesAfter = 0;
  let numberMismatchesRemoved = 0;
  let numberMismatchesAdded = 0;
  let formatOnlyPairs = 0;
  let numberFormatAmbiguities = 0;
  const falsePositiveHypotheses: FalsePositiveHypotheses = {
    minusSigns: 0,
    japaneseCounters: 0,
    englishWordsOrSteps: 0,
    separators: 0,
  };

  const addExample = (example: MismatchExample) => {
    const category = example.type[0];
    if (
      examples.filter((candidate) => candidate.type[0] === category).length < 12
    ) {
      examples.push(example);
    }
  };

  for (const [language, expression] of map.entries) {
    if (!expression) {
      unreadable.push(`${language}: locale value cannot be resolved`);
      continue;
    }
    const snapshot = flattenLocale(expression, source, declarations);
    snapshots.set(language, snapshot);
    if (!snapshot.readable) {
      unreadable.push(
        `${language}: ${[...new Set(snapshot.issues)].join(", ")}`,
      );
    }
  }

  const lines: string[] = [];
  const id = snapshots.get("id");
  if (id) {
    for (const language of LANGUAGES) {
      if (language === "id") continue;
      const other = snapshots.get(language);
      if (!other) continue;

      const onlyId = [...id.keys].filter((key) => !other.keys.has(key)).sort();
      const onlyOther = [...other.keys]
        .filter((key) => !id.keys.has(key))
        .sort();
      if (onlyId.length) {
        lines.push(
          `- **${language}, key id yang tidak ada:** ${onlyId.map((key) => `\`${key}\``).join(", ")}`,
        );
        counts.idOnlyKeys += onlyId.length;
        for (const key of onlyId) {
          addExample({
            key,
            idValue: displayValue(id, key),
            enValue: displayValue(snapshots.get("en"), key),
            type: `a — key id hilang di ${language}`,
          });
        }
      }
      if (onlyOther.length) {
        lines.push(
          `- **${language}, key tambahan:** ${onlyOther.map((key) => `\`${key}\``).join(", ")}`,
        );
        counts.extraKeys += onlyOther.length;
        for (const key of onlyOther) {
          addExample({
            key,
            idValue: displayValue(id, key),
            enValue: displayValue(snapshots.get("en"), key),
            type: `b — key tambahan di ${language}`,
          });
        }
      }
    }

    const arrayPaths = new Set([
      ...[...snapshots.values()].flatMap((snapshot) => [
        ...snapshot.arrays.keys(),
      ]),
    ]);
    for (const key of [...arrayPaths].sort()) {
      const lengths = LANGUAGES.flatMap((language) => {
        const length = snapshots.get(language)?.arrays.get(key);
        return length === undefined ? [] : [[language, length] as const];
      });
      if (new Set(lengths.map(([, length]) => length)).size > 1) {
        lines.push(
          `- **Panjang array \`${key}\` berbeda:** ${lengths.map(([language, length]) => `${language}=${length}`).join(", ")}`,
        );
        counts.arrayLengths++;
        addExample({
          key,
          idValue: displayValue(id, key),
          enValue: displayValue(snapshots.get("en"), key),
          type: `c — panjang array berbeda (${lengths.map(([language, length]) => `${language}=${length}`).join(", ")})`,
        });
      }
    }

    for (const language of ["en", "ja"] as const) {
      const other = snapshots.get(language);
      if (!other) continue;
      const sharedValues = [...id.values.keys()].filter((key) =>
        other.values.has(key),
      );
      for (const key of sharedValues.sort()) {
        const idText = id.values.get(key) ?? "";
        const otherText = other.values.get(key) ?? "";
        const idTokens = numberTokensIn(idText, "id");
        const otherTokens = numberTokensIn(otherText, language);
        const hasDigitPair = idTokens.length > 0 && otherTokens.length > 0;
        const previousIdNumbers = previousNumbersForComparison(
          idText,
          "id",
          otherText,
          language,
        );
        const previousOtherNumbers = previousNumbersForComparison(
          otherText,
          language,
          idText,
          "id",
        );
        const previousMismatch =
          hasDigitPair &&
          previousIdNumbers.join(",") !== previousOtherNumbers.join(",");
        if (previousMismatch) numberMismatchesBeforeDiagnosis++;
        const legacyIdNumbers = legacyNumbersIn(idText, "id");
        const legacyOtherNumbers = legacyNumbersIn(otherText, language);
        const idNumbers = numbersForComparison(idText, "id");
        const otherNumbers = numbersForComparison(otherText, language);
        const legacyMismatch =
          (legacyIdNumbers.length || legacyOtherNumbers.length) &&
          legacyIdNumbers.join(",") !== legacyOtherNumbers.join(",");
        const mismatch =
          hasDigitPair &&
          idNumbers.join(",") !== otherNumbers.join(",");
        if (previousMismatch && !mismatch) {
          numberMismatchesRemovedByDiagnosis++;
        } else if (!previousMismatch && mismatch) {
          numberMismatchesAddedByDiagnosis++;
        }
        if (previousMismatch && !mismatch) {
          const previousClassification = classifyNumberMismatch(
            idText,
            otherText,
            language,
            previousNumberTokensIn(idText, "id").map(({ value }) => value),
            previousNumberTokensIn(otherText, language).map(
              ({ value }) => value,
            ),
            previousIdNumbers,
            previousOtherNumbers,
          );
          if (previousClassification === "nilai-beda") {
            if (
              language === "ja" &&
              /[〇零一二三四五六七八九十百千]\s*(?:つ|個|回|人|番目)/u.test(
                otherText,
              )
            ) {
              falsePositiveHypotheses.japaneseCounters++;
            } else if (
              /[\u2212\u2012\u2013\u2014\uFE63\uFF0D]\d/u.test(
                `${idText} ${otherText}`,
              )
            ) {
              falsePositiveHypotheses.minusSigns++;
            } else if (
              language === "en" &&
              numberWordMatches(otherText, "en").length > 0
            ) {
              falsePositiveHypotheses.englishWordsOrSteps++;
            } else if (
              sameDigitsDifferentSeparators(
                previousNumberTokensIn(idText, "id").map(({ value }) => value),
                previousNumberTokensIn(otherText, language).map(
                  ({ value }) => value,
                ),
              )
            ) {
              falsePositiveHypotheses.separators++;
            }
          }
        }
        if (legacyMismatch) numberMismatchesBefore++;
        if (mismatch) {
          numberMismatchesAfter++;
          const classification = classifyNumberMismatch(
            idText,
            otherText,
            language,
            idTokens,
            otherTokens,
            idNumbers,
            otherNumbers,
          );
          numberClasses[classification]++;
          if (classification === "ambigu-pemisah") {
            counts.numbers++;
            numberFormatAmbiguities++;
          } else if (classification === "nilai-beda") {
            counts.numbers++;
          }
          numericCases.push({
            key,
            line:
              id.locations.get(key) ??
              other.locations.get(key) ??
              source.getLineAndCharacterOfPosition(map.node.getStart()).line +
                1,
            language,
            classification,
            idValue: idText,
            otherValue: otherText,
            idNumbers,
            otherNumbers,
            idNumberCodePoints: numberCodePoints(idText),
            otherNumberCodePoints: numberCodePoints(otherText),
          });
          const numericNote =
            !idNumbers.length || !otherNumbers.length
              ? `angka digit hanya ditemukan di ${idNumbers.length ? "id" : language}; kemungkinan angka lain ditulis dengan kata, perlu review`
              : classification === "ambigu-pemisah"
                ? `token/pemisah angka sama; tafsir locale berbeda: id=[${idNumbers.join(", ")}], ${language}=[${otherNumbers.join(", ")}]`
                : `beda nilai setelah normalisasi: id=[${idNumbers.join(", ")}], ${language}=[${otherNumbers.join(", ")}]`;
          lines.push(
            `- **Angka berbeda pada \`${key}\` (id vs ${language}; ${classification}):** id=[${idNumbers.join(", ")}], ${language}=[${otherNumbers.join(", ")}]`,
          );
          addExample({
            key,
            idValue: idText,
            enValue: displayValue(snapshots.get("en"), key),
            type: `d — ${classification} (id vs ${language})`,
            numericNote,
          });
        } else if (legacyMismatch) {
          numberMismatchesRemoved++;
        } else if (
          idNumbers.length > 0 &&
          idNumbers.join(",") === otherNumbers.join(",") &&
          idTokens.join(",") !== otherTokens.join(",") &&
          idTokens.map((token) => token.replace(/[.,\s]/g, "")).join(",") ===
            otherTokens.map((token) => token.replace(/[.,\s]/g, "")).join(",")
        ) {
          formatOnlyPairs++;
          numberClasses["format-saja"]++;
        }
        if (!legacyMismatch && mismatch) numberMismatchesAdded++;
      }
    }
  } else {
    lines.push(
      "- Perbandingan key/angka dilewati: tidak ada objek `id` yang terbaca.",
    );
  }

  if (unreadable.length) {
    lines.unshift(`- **tidak terbaca:** ${unreadable.join("; ")}`);
  }
  if (!lines.length)
    lines.push(
      "- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.",
    );
  return {
    lines,
    counts,
    examples,
    numericCases,
    unreadable,
    numberMismatchesBefore,
    numberMismatchesBeforeDiagnosis,
    numberMismatchesRemovedByDiagnosis,
    numberMismatchesAddedByDiagnosis,
    numberMismatchesAfter,
    numberMismatchesRemoved,
    numberMismatchesAdded,
    formatOnlyPairs,
    numberFormatAmbiguities,
    numberClasses,
    falsePositiveHypotheses,
  };
}

function listSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return listSourceFiles(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

function analyzeFile(path: string): FileAnalysis {
  const text = readFileSync(path, "utf8");
  const source = ts.createSourceFile(
    path,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const unreadable: string[] = [];
  const declarations = collectDeclarations(source);
  const { maps, branches, usesPickLang } = discoverTranslationMaps(source);
  const languages = new Set<Language>(branches);
  for (const map of maps) {
    for (const language of map.entries.keys()) languages.add(language);
  }

  const usesTranslationHook =
    text.includes("useTranslation") && /\bt\s*\(/.test(text);
  const hasTranslation =
    maps.length > 0 ||
    branches.size > 0 ||
    usesTranslationHook ||
    /\bi18n\.t\s*\(/.test(text);
  const report: string[] = [];
  const mismatchCounts: MismatchCounts = {
    idOnlyKeys: 0,
    extraKeys: 0,
    arrayLengths: 0,
    numbers: 0,
  };
  const mismatchExamples: MismatchExample[] = [];
  const numericCases: NumericCase[] = [];
  const numberClasses: Record<NumberClass, number> = {
    "format-saja": 0,
    "adaptasi-mata-uang": 0,
    "adaptasi-skala": 0,
    "adaptasi-nama-konteks": 0,
    label: 0,
    "nilai-beda": 0,
    "ambigu-pemisah": 0,
  };
  let numberMismatchesBefore = 0;
  let numberMismatchesBeforeDiagnosis = 0;
  let numberMismatchesRemovedByDiagnosis = 0;
  let numberMismatchesAddedByDiagnosis = 0;
  let numberMismatchesAfter = 0;
  let numberMismatchesRemoved = 0;
  let numberMismatchesAdded = 0;
  let formatOnlyPairs = 0;
  let numberFormatAmbiguities = 0;
  const falsePositiveHypotheses: FalsePositiveHypotheses = {
    minusSigns: 0,
    japaneseCounters: 0,
    englishWordsOrSteps: 0,
    separators: 0,
  };

  maps.forEach((map, index) => {
    const result = analyzeMap(map, source, declarations);
    mismatchCounts.idOnlyKeys += result.counts.idOnlyKeys;
    mismatchCounts.extraKeys += result.counts.extraKeys;
    mismatchCounts.arrayLengths += result.counts.arrayLengths;
    mismatchCounts.numbers += result.counts.numbers;
    mismatchExamples.push(...result.examples);
    numericCases.push(...result.numericCases);
    for (const classification of Object.keys(numberClasses) as NumberClass[]) {
      numberClasses[classification] += result.numberClasses[classification];
    }
    numberMismatchesBefore += result.numberMismatchesBefore;
    numberMismatchesBeforeDiagnosis += result.numberMismatchesBeforeDiagnosis;
    numberMismatchesRemovedByDiagnosis +=
      result.numberMismatchesRemovedByDiagnosis;
    numberMismatchesAddedByDiagnosis += result.numberMismatchesAddedByDiagnosis;
    numberMismatchesAfter += result.numberMismatchesAfter;
    numberMismatchesRemoved += result.numberMismatchesRemoved;
    numberMismatchesAdded += result.numberMismatchesAdded;
    formatOnlyPairs += result.formatOnlyPairs;
    numberFormatAmbiguities += result.numberFormatAmbiguities;
    falsePositiveHypotheses.minusSigns +=
      result.falsePositiveHypotheses.minusSigns;
    falsePositiveHypotheses.japaneseCounters +=
      result.falsePositiveHypotheses.japaneseCounters;
    falsePositiveHypotheses.englishWordsOrSteps +=
      result.falsePositiveHypotheses.englishWordsOrSteps;
    falsePositiveHypotheses.separators +=
      result.falsePositiveHypotheses.separators;
    unreadable.push(...result.unreadable);
    const line =
      source.getLineAndCharacterOfPosition(map.node.getStart()).line + 1;
    report.push(`#### Peta ${index + 1}: \`${map.label}\` (baris ${line})`);
    report.push(
      `Bahasa: ${LANGUAGES.filter((language) => map.entries.has(language)).join(", ") || "tidak terbaca"}`,
    );
    report.push(...result.lines);
    report.push("");
  });

  const discrepancyCount = Object.values(mismatchCounts).reduce(
    (total, count) => total + count,
    0,
  );
  if (unreadable.length && maps.length === 0) {
    report.push(`- **tidak terbaca:** ${[...new Set(unreadable)].join("; ")}`);
  }

  return {
    path,
    maps,
    languages,
    hasJaBranch: languages.has("ja"),
    usesPickLang,
    hasTranslation,
    unreadable: [...new Set(unreadable)],
    mismatchCounts,
    discrepancyCount,
    mismatchExamples,
    numberMismatchesBefore,
    numberMismatchesBeforeDiagnosis,
    numberMismatchesRemovedByDiagnosis,
    numberMismatchesAddedByDiagnosis,
    numberMismatchesAfter,
    numberMismatchesRemoved,
    numberMismatchesAdded,
    formatOnlyPairs,
    numberFormatAmbiguities,
    numberClasses,
    numericCases,
    falsePositiveHypotheses,
    kind: text.includes("MateriTopicPage") ? "wrapper" : "halaman konten",
    report,
  };
}

function markdownPath(path: string): string {
  return relative(resolve(projectRoot, "docs"), path).split(sep).join("/");
}

const topicDirectories = readdirSync(pagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    name: entry.name,
    path: resolve(pagesRoot, entry.name),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const rootFiles = readdirSync(pagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.tsx?$/.test(entry.name))
  .map((entry) => resolve(pagesRoot, entry.name));

const topics = [
  { name: "(root)", path: pagesRoot, directFiles: rootFiles },
  ...topicDirectories.map((topic) => ({
    ...topic,
    directFiles: listSourceFiles(topic.path),
  })),
];

const analyses = new Map<string, FileAnalysis>();
for (const topic of topics) {
  for (const file of topic.directFiles) {
    if (!analyses.has(file)) analyses.set(file, analyzeFile(file));
  }
}

const allFiles = [...analyses.values()].sort((a, b) =>
  a.path.localeCompare(b.path),
);
const topDiscrepancies = allFiles
  .filter((file) => file.discrepancyCount > 0)
  .sort(
    (a, b) =>
      b.discrepancyCount - a.discrepancyCount || a.path.localeCompare(b.path),
  )
  .slice(0, 10);
const totalMismatchCounts = allFiles.reduce<MismatchCounts>(
  (totals, file) => ({
    idOnlyKeys: totals.idOnlyKeys + file.mismatchCounts.idOnlyKeys,
    extraKeys: totals.extraKeys + file.mismatchCounts.extraKeys,
    arrayLengths: totals.arrayLengths + file.mismatchCounts.arrayLengths,
    numbers: totals.numbers + file.mismatchCounts.numbers,
  }),
  { idOnlyKeys: 0, extraKeys: 0, arrayLengths: 0, numbers: 0 },
);
const totalLegacyNumberMismatches = allFiles.reduce(
  (total, file) => total + file.numberMismatchesBefore,
  0,
);
const totalNumberMismatchesBeforeDiagnosis = allFiles.reduce(
  (total, file) => total + file.numberMismatchesBeforeDiagnosis,
  0,
);
const totalNumberMismatchesRemovedByDiagnosis = allFiles.reduce(
  (total, file) => total + file.numberMismatchesRemovedByDiagnosis,
  0,
);
const totalNumberMismatchesAddedByDiagnosis = allFiles.reduce(
  (total, file) => total + file.numberMismatchesAddedByDiagnosis,
  0,
);
const totalNormalizedNumberMismatches = allFiles.reduce(
  (total, file) => total + file.numberMismatchesAfter,
  0,
);
if (
  totalNumberMismatchesBeforeDiagnosis -
    totalNumberMismatchesRemovedByDiagnosis +
    totalNumberMismatchesAddedByDiagnosis !==
  totalNormalizedNumberMismatches
) {
  throw new Error("Number-mismatch before/after totals do not reconcile");
}
const totalRemovedNumberMismatches = allFiles.reduce(
  (total, file) => total + file.numberMismatchesRemoved,
  0,
);
const totalAddedNumberMismatches = allFiles.reduce(
  (total, file) => total + file.numberMismatchesAdded,
  0,
);
if (
  totalLegacyNumberMismatches -
    totalRemovedNumberMismatches +
    totalAddedNumberMismatches !==
  totalNormalizedNumberMismatches
) {
  throw new Error("Legacy/current number-mismatch totals do not reconcile");
}
const totalFormatOnlyPairs = allFiles.reduce(
  (total, file) => total + file.formatOnlyPairs,
  0,
);
const totalNumberFormatAmbiguities = allFiles.reduce(
  (total, file) => total + file.numberFormatAmbiguities,
  0,
);
const totalNumberClasses = allFiles.reduce<Record<NumberClass, number>>(
  (totals, file) => {
    for (const classification of Object.keys(totals) as NumberClass[]) {
      totals[classification] += file.numberClasses[classification];
    }
    return totals;
  },
  {
    "format-saja": 0,
    "adaptasi-mata-uang": 0,
    "adaptasi-skala": 0,
    "adaptasi-nama-konteks": 0,
    label: 0,
    "nilai-beda": 0,
    "ambigu-pemisah": 0,
  },
);
const totalAdaptationNumberMismatches =
  totalNumberClasses["adaptasi-mata-uang"] +
  totalNumberClasses["adaptasi-skala"] +
  totalNumberClasses["adaptasi-nama-konteks"] +
  totalNumberClasses.label;
const totalClassifiedNumberMismatches =
  totalNumberClasses["nilai-beda"] + totalNumberClasses["ambigu-pemisah"];
if (
  totalAdaptationNumberMismatches + totalClassifiedNumberMismatches !==
  totalNormalizedNumberMismatches
) {
  throw new Error("Classified number-mismatch totals do not reconcile");
}
if (totalClassifiedNumberMismatches !== totalMismatchCounts.numbers) {
  throw new Error("Reported numeric-mismatch total does not reconcile");
}
const totalStructuralMismatches =
  totalMismatchCounts.idOnlyKeys +
  totalMismatchCounts.extraKeys +
  totalMismatchCounts.arrayLengths;
const totalReportedMismatches =
  totalStructuralMismatches + totalClassifiedNumberMismatches;
const totalFalsePositiveHypotheses = allFiles.reduce<FalsePositiveHypotheses>(
  (totals, file) => ({
    minusSigns: totals.minusSigns + file.falsePositiveHypotheses.minusSigns,
    japaneseCounters:
      totals.japaneseCounters + file.falsePositiveHypotheses.japaneseCounters,
    englishWordsOrSteps:
      totals.englishWordsOrSteps +
      file.falsePositiveHypotheses.englishWordsOrSteps,
    separators: totals.separators + file.falsePositiveHypotheses.separators,
  }),
  {
    minusSigns: 0,
    japaneseCounters: 0,
    englishWordsOrSteps: 0,
    separators: 0,
  },
);

function sampledNumericCases(): Array<{
  file: FileAnalysis;
  numericCase: NumericCase;
}> {
  let state = 0x31_0a_7;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
  const candidates = allFiles
    .map((file) => ({
      file,
      cases: file.numericCases.filter(
        (numericCase) => numericCase.classification === "nilai-beda",
      ),
    }))
    .filter(({ cases }) => cases.length > 0);
  for (let index = candidates.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [candidates[index], candidates[swap]] = [
      candidates[swap],
      candidates[index],
    ];
  }
  return candidates.slice(0, 30).map(({ file, cases }) => ({
    file,
    numericCase: cases[Math.floor(random() * cases.length)],
  }));
}

const sampledCases = sampledNumericCases();

function maximumNumericMagnitude(numericCase: NumericCase): number {
  const values = [...numericCase.idNumbers, ...numericCase.otherNumbers]
    .map(Number)
    .filter(Number.isFinite)
    .map(Math.abs);
  return Math.max(0, ...values);
}

const largestNumericCases = allFiles
  .flatMap((file) =>
    file.numericCases.map((numericCase) => ({ file, numericCase })),
  )
  .sort(
    (first, second) =>
      maximumNumericMagnitude(second.numericCase) -
        maximumNumericMagnitude(first.numericCase) ||
      first.file.path.localeCompare(second.file.path) ||
      first.numericCase.key.localeCompare(second.numericCase.key),
  )
  .slice(0, 10);

function selectMismatchExamples(file: FileAnalysis): MismatchExample[] {
  const selected: MismatchExample[] = [];
  for (const category of ["a", "b", "c", "d"]) {
    const example = file.mismatchExamples.find(
      (candidate) =>
        candidate.type.startsWith(category) &&
        !selected.some(
          (existing) =>
            existing.key === candidate.key && existing.type === candidate.type,
        ),
    );
    if (example) selected.push(example);
  }
  for (const example of file.mismatchExamples) {
    if (selected.length >= 5) break;
    if (
      !selected.some(
        (existing) =>
          existing.key === example.key && existing.type === example.type,
      )
    ) {
      selected.push(example);
    }
  }
  return selected.slice(0, 5);
}

const output: string[] = [
  "# Laporan pemeriksaan i18n materi",
  "",
  "Dihasilkan oleh `pnpm i18n:check` menggunakan TypeScript compiler API.",
  "Pemeriksaan membaca objek locale statis; spread atau key komputasi yang menghalangi pembacaan ditandai **tidak terbaca**.",
  "",
  "## Ringkasan",
  "",
  `- File sumber yang dipindai: ${allFiles.length}.`,
  `- File dengan objek terjemahan per bahasa: ${allFiles.filter((file) => file.maps.length > 0).length}.`,
  `- File dengan cabang \`ja\`: ${allFiles.filter((file) => file.hasJaBranch).length}.`,
  `- File tanpa terjemahan yang terdeteksi: ${allFiles.filter((file) => !file.hasTranslation).length}.`,
  `- File dengan objek yang tidak terbaca: ${allFiles.filter((file) => file.unreadable.length > 0).length}.`,
  `- Ekstraksi angka: ${totalLegacyNumberMismatches} mismatch dengan ekstraktor digit lama; ${totalNumberMismatchesBeforeDiagnosis} mismatch dengan pembanding sebelum diagnosis; ${totalNormalizedNumberMismatches} setelah perbaikan parser; ${totalMismatchCounts.numbers} setelah klasifikasi. ${totalRemovedNumberMismatches} mismatch digit lama tidak lagi terdeteksi; ${totalAddedNumberMismatches} mismatch baru terungkap.`,
  `- Selain selisih yang diklasifikasikan, ${totalNumberClasses["format-saja"]} pasangan angka bernilai sama hanya berbeda format. Adaptasi mata uang memakai pasangan Rp/$ dengan nilai sama atau skala nominal 1.000:1; adaptasi-skala memakai faktor pangkat 10 yang konsisten pada seluruh angka di key.`,
  "- Label jenjang seperti Kelas 7 / Grade 7 / 中学1年 diabaikan pada perbandingan angka karena penomoran jenjang berbeda menurut bahasa.",
  "",
  "### 10 file dengan ketidaksesuaian terbanyak",
  "",
  "| File | Total | (a) Key id hilang | (b) Key ekstra | (c) Array | Format saja | Mata uang | Skala | Nama/konteks | Label | Nilai beda | Ambigu pemisah |",
  "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
  ...(topDiscrepancies.length
    ? topDiscrepancies.map(
        (file) =>
          `| [\`${markdownPath(file.path)}\`](${markdownPath(file.path)}) | ${file.discrepancyCount} | ${file.mismatchCounts.idOnlyKeys} | ${file.mismatchCounts.extraKeys} | ${file.mismatchCounts.arrayLengths} | ${file.numberClasses["format-saja"]} | ${file.numberClasses["adaptasi-mata-uang"]} | ${file.numberClasses["adaptasi-skala"]} | ${file.numberClasses["adaptasi-nama-konteks"]} | ${file.numberClasses.label} | ${file.numberClasses["nilai-beda"]} | ${file.numberClasses["ambigu-pemisah"]} |`,
      )
    : [
        "| Tidak ada ketidaksesuaian terdeteksi | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |",
      ]),
  "",
  "### Rekonsiliasi sebelum dan sesudah perbaikan parser",
  "",
  "| Perbandingan | Mismatch numeric | Hilang | Baru terungkap |",
  "| --- | ---: | ---: | ---: |",
  `| Ekstraktor digit lama → parser saat ini | ${totalLegacyNumberMismatches} → ${totalNormalizedNumberMismatches} | ${totalRemovedNumberMismatches} | ${totalAddedNumberMismatches} |`,
  `| Pembanding sebelum diagnosis → sesudah diagnosis | ${totalNumberMismatchesBeforeDiagnosis} → ${totalNormalizedNumberMismatches} | ${totalNumberMismatchesRemovedByDiagnosis} | ${totalNumberMismatchesAddedByDiagnosis} |`,
  "",
  "### Jumlah ketidaksesuaian per jenis (seluruh file)",
  "",
  "| Jenis / total | Jumlah | Dihitung sebagai mismatch |",
  "| --- | ---: | --- |",
  `| format-saja | ${totalNumberClasses["format-saja"]} | Tidak |`,
  `| adaptasi-mata-uang | ${totalNumberClasses["adaptasi-mata-uang"]} | Tidak |`,
  `| adaptasi-skala | ${totalNumberClasses["adaptasi-skala"]} | Tidak |`,
  `| adaptasi-nama-konteks | ${totalNumberClasses["adaptasi-nama-konteks"]} | Tidak |`,
  `| label | ${totalNumberClasses.label} | Tidak |`,
  `| nilai-beda | ${totalNumberClasses["nilai-beda"]} | Ya |`,
  `| ambigu-pemisah | ${totalNumberClasses["ambigu-pemisah"]} | Ya |`,
  `| **Mismatch numeric sebelum pengecualian adaptasi** | **${totalNormalizedNumberMismatches}** | Ya |`,
  `| **Mismatch numeric setelah klasifikasi** | **${totalClassifiedNumberMismatches}** | **${totalMismatchCounts.numbers}** |`,
  `| (a) Key ada di id tetapi tidak ada di locale lain | ${totalMismatchCounts.idOnlyKeys} | Ya |`,
  `| (b) Key ada di locale lain tetapi tidak ada di id | ${totalMismatchCounts.extraKeys} | Ya |`,
  `| (c) Panjang array berbeda | ${totalMismatchCounts.arrayLengths} | Ya |`,
  `| **Mismatch struktural** | **${totalStructuralMismatches}** | Ya |`,
  `| **Total mismatch terlapor** | **${totalReportedMismatches}** | **${totalReportedMismatches}** |`,
  "",
  `Rekonsiliasi: ${totalNormalizedNumberMismatches} = ${totalNumberClasses["adaptasi-mata-uang"]} adaptasi mata uang + ${totalNumberClasses["adaptasi-skala"]} adaptasi-skala + ${totalNumberClasses["adaptasi-nama-konteks"]} adaptasi nama/konteks + ${totalNumberClasses.label} label + ${totalNumberClasses["nilai-beda"]} nilai-beda + ${totalNumberClasses["ambigu-pemisah"]} ambigu-pemisah. Jumlah kelas tersebut sama dengan total mismatch numerik sebelum klasifikasi. Setelah ${totalAdaptationNumberMismatches} adaptasi dikecualikan, tersisa ${totalClassifiedNumberMismatches} mismatch numerik (${totalNumberClasses["nilai-beda"]} nilai-beda + ${totalNumberClasses["ambigu-pemisah"]} ambigu-pemisah); ${totalFormatOnlyPairs} pasangan format-saja bernilai sama dan tidak masuk hitungan mismatch. Ditambah ${totalStructuralMismatches} mismatch struktural, totalnya ${totalReportedMismatches}.`,
  "",
  "### Uji hipotesis false positive",
  "",
  "Jumlah kasus nilai-beda lama yang berubah menjadi sama setelah setiap penyesuaian. Penghitungan tiap baris independen; kelas pemisah tetap ambigu bila teks tidak menentukan tafsirnya.",
  "",
  "| Hipotesis | Kasus nilai-beda hilang |",
  "| --- | ---: |",
  `| Tanda minus ASCII/Unicode (\`-\`, \`−\`, \`–\`, \`—\`) | ${totalFalsePositiveHypotheses.minusSigns} |`,
  `| Penghitung Jepang dan angka kanji | ${totalFalsePositiveHypotheses.japaneseCounters} |`,
  `| Angka-kata Inggris / nomor langkah | ${totalFalsePositiveHypotheses.englishWordsOrSteps} |`,
  `| Pemisah ribuan/desimal | ${totalFalsePositiveHypotheses.separators} |`,
  "",
  "Pemisah angka ditafsirkan menurut locale yang dinyatakan; format yang tidak sesuai tetap dilaporkan sebagai mismatch, tanpa menebak makna yang dimaksud.",
  "",
  "### 10 kasus sisa dengan angka terbesar",
  "",
  "Diurutkan menurut nilai absolut maksimum pada himpunan angka hasil parse id dan locale pembanding.",
  "",
  "| File | Baris | Key | Bahasa | Nilai id | Nilai en/ja | Maksimum absolut |",
  "| --- | ---: | --- | --- | --- | --- | ---: |",
  ...largestNumericCases.map(
    ({ file, numericCase }) =>
      `| [\`${markdownPath(file.path)}\`](${markdownPath(file.path)}) | ${numericCase.line} | \`${markdownCell(numericCase.key)}\` | ${numericCase.language} | [${numericCase.idNumbers.join(", ")}] | [${numericCase.otherNumbers.join(", ")}] | ${maximumNumericMagnitude(numericCase)} |`,
  ),
  "",
  "",
  "### Sampel acak merata: 30 kasus nilai-beda dari file berbeda",
  "",
  "Pemilihan memakai seed tetap untuk hasil yang dapat direproduksi; satu kasus dipilih per file.",
  "",
  "| File | Baris | Key | Nilai id lengkap | Nilai en/ja lengkap | Code point angka id | Code point angka en/ja |",
  "| --- | ---: | --- | --- | --- | --- | --- |",
  ...sampledCases.map(
    ({ file, numericCase }) =>
      `| [\`${markdownPath(file.path)}\`](${markdownPath(file.path)}) | ${numericCase.line} | \`${markdownCell(numericCase.key)}\` | ${markdownCell(numericCase.idValue)} | ${markdownCell(numericCase.otherValue)} | ${numericCase.idNumberCodePoints.join(", ") || "—"} | ${numericCase.otherNumberCodePoints.join(", ") || "—"} |`,
  ),
  "",
  "Klasifikasi numeric mismatch: token digit yang sama tetapi ditafsirkan berbeda menurut locale menjadi ambigu-pemisah; pasangan yang seluruh nilainya sama atau berubah secara konsisten dengan faktor 10, 100, 1.000, 10.000, atau 1.000.000 menjadi adaptasi-skala; label soal/langkah/figur yang bila dihapus menyamakan angka menjadi label; pasangan Rp/$ dengan rasio nominal 1.000:1 menjadi adaptasi-mata-uang; nama orang lokal/netral yang dikenali atau classifier jumlah Jepang yang tidak dinyatakan di id menjadi adaptasi-nama-konteks. Sisa perbedaan menjadi nilai-beda. Pasangan angka sama yang hanya berbeda separator dicatat sebagai format-saja.",
  "",
  "### Seluruh kasus nilai-beda dan ambigu-pemisah",
  "",
  "| File | Baris | Key | Bahasa pembanding | Nilai id | Nilai en/ja | Angka id | Angka en/ja |",
  "| --- | ---: | --- | --- | --- | --- | --- | --- |",
  ...allFiles.flatMap((file) =>
    file.numericCases
      .filter(
        (numericCase) =>
          numericCase.classification === "nilai-beda" ||
          numericCase.classification === "ambigu-pemisah",
      )
      .map(
        (numericCase) =>
          `| [\`${markdownPath(file.path)}\`](${markdownPath(file.path)}) | ${numericCase.line} | \`${compactValue(numericCase.key, 100)}\` | ${numericCase.language} | ${markdownCell(numericCase.idValue)} | ${markdownCell(numericCase.otherValue)} | [${numericCase.idNumbers.join(", ")}] | [${numericCase.otherNumbers.join(", ")}] |`,
      ),
  ),
  "",
  "### Contoh perbaikan ekstraksi angka",
  "",
  "| Teks | Bahasa | Ekstraktor lama | Setelah perbaikan |",
  "| --- | --- | --- | --- |",
  ...numberNormalizationExamples.map(
    ([text, language]) =>
      `| \`${compactValue(text)}\` | ${language} | [${legacyNumbersIn(text, language).join(", ") || "—"}] | [${numbersIn(text, language).join(", ") || "—"}] |`,
  ),
  "",
  "False positive yang terkonfirmasi: ekstraktor lama memecah `4,\\underline{6}38` menjadi tiga angka (`4`, `6`, `38`), bukan satu desimal (`4.638`); notasi KaTeX `1\\,234{,}5` juga terpecah menjadi tiga angka. Perbaikan membuka markup KaTeX, membaca awalan mata wang `Rp`, menangani akhiran ordinal Inggris, dan mengecualikan angka label jenjang lintas bahasa.",
  "",
  "### Contoh konkret untuk 5 file teratas",
  "",
  "Nilai dipendekkan bila terlalu panjang. Hanya kelas nilai-beda dan ambigu-pemisah dihitung sebagai ketidaksesuaian angka.",
  "",
  ...topDiscrepancies.slice(0, 5).flatMap((file) => {
    const examples = selectMismatchExamples(file);
    return [
      `#### [\`${markdownPath(file.path)}\`](${markdownPath(file.path)})`,
      "",
      "| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |",
      "| --- | --- | --- | --- | --- |",
      ...examples.map(
        (example) =>
          `| \`${compactValue(example.key)}\` | ${compactValue(example.idValue)} | ${compactValue(example.enValue)} | ${example.type} | ${example.numericNote ?? "—"} |`,
      ),
      "",
    ];
  }),
  "### File tanpa terjemahan yang terdeteksi",
  "",
  "| File | Klasifikasi |",
  "| --- | --- |",
  ...allFiles
    .filter((file) => !file.hasTranslation)
    .map(
      (file) =>
        `| [\`${markdownPath(file.path)}\`](${markdownPath(file.path)}) | ${file.kind} |`,
    ),
  "",
  "## Cakupan per topik",
  "",
  "| Topik | File | File dengan cabang ja | Memakai pickLang | Tanpa terjemahan sama sekali |",
  "| --- | ---: | ---: | ---: | --- |",
];

for (const topic of topics) {
  const files = topic.directFiles
    .map((file) => analyses.get(file))
    .filter((file): file is FileAnalysis => file !== undefined);
  const jaCount = files.filter((file) => file.hasJaBranch).length;
  const noTranslation = files
    .filter((file) => !file.hasTranslation)
    .map((file) => relative(topic.path, file.path).split(sep).join("/"));
  const topicPath =
    topic.name === "(root)"
      ? "../artifacts/numatik/src/pages/buku-animasi-matematika"
      : `../artifacts/numatik/src/pages/buku-animasi-matematika/${topic.name}`;
  const topicLabel =
    topic.name === "(root)" ? "(root)" : `[\`${topic.name}\`](${topicPath})`;
  const noTranslationLabel = noTranslation.length
    ? noTranslation.map((file) => `\`${file}\``).join(", ")
    : "—";
  output.push(
    `| ${topicLabel} | ${files.length} | ${jaCount}${jaCount === 0 ? " (**tanpa cabang ja**)" : ""} | ${files.filter((file) => file.usesPickLang).length} | ${noTranslationLabel} |`,
  );
}

const requestedTopics = [
  ["Perbandingan", "perbandingan"],
  ["Himpunan", "himpunan"],
  ["Garis dan Sudut", "garis-dan-sudut"],
  ["Aritmetika Sosial", "aritmetika-sosial"],
  ["PGL", "persamaan-garis-lurus"],
  ["Teorema Pythagoras", "teorema-pythagoras"],
  ["Bangun Ruang Sisi Datar", "bangun-ruang-sisi-datar"],
  ["Bilangan Berpangkat", "bilangan-berpangkat"],
  ["Kesebangunan", "kesebangunan-kekongruenan"],
  ["Transformasi Geometri", "transformasi-geometri"],
  ["BRSL", "bangun-ruang-sisi-lengkung"],
  ["Statistika", "statistika"],
  ["Peluang", "peluang"],
  ["Fungsi Kuadrat", "fungsi-kuadrat"],
  ["Persamaan Kuadrat", "persamaan-kuadrat"],
] as const;

output.push(
  "",
  "### Topik yang diminta",
  "",
  "| Topik | Folder ada | Berisi terjemahan |",
  "| --- | --- | --- |",
);
for (const [label, directoryName] of requestedTopics) {
  const topic = topics.find((entry) => entry.name === directoryName);
  const files = topic?.directFiles
    .map((file) => analyses.get(file))
    .filter((file): file is FileAnalysis => file !== undefined);
  const hasTranslation = Boolean(files?.some((file) => file.hasTranslation));
  output.push(
    `| ${label} | ${topic ? "Ya" : "Tidak"} | ${topic ? (hasTranslation ? "Ya" : "Tidak") : "—"} |`,
  );
}

for (const topic of topics) {
  const files = topic.directFiles
    .map((file) => analyses.get(file))
    .filter((file): file is FileAnalysis => file !== undefined)
    .filter((file) => file.maps.length > 0 || file.unreadable.length > 0);
  output.push("", `## Topik ${topic.name}`, "");
  if (!files.length) {
    output.push("Tidak ada objek terjemahan per bahasa yang dapat dianalisis.");
    continue;
  }
  for (const file of files) {
    output.push(
      `### [\`${markdownPath(file.path)}\`](${markdownPath(file.path)})`,
      "",
    );
    if (file.report.length) output.push(...file.report);
    else
      output.push(
        "- Tidak ada perbedaan key, panjang array, atau angka yang terdeteksi.",
        "",
      );
  }
}

writeFileSync(reportPath, `${output.join("\n").trimEnd()}\n`);
console.log(
  `Wrote ${relative(projectRoot, reportPath)} (${allFiles.length} files scanned).`,
);
