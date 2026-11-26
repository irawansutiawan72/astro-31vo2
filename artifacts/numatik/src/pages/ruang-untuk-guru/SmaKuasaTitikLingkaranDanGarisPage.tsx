import { useState, type ReactNode } from "react";
import { BookOpen, Check, Lightbulb, Sparkles, Target } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import PageNavigation from "@/components/PageNavigation";
import Starfield from "@/components/Starfield";

const PAGE_PATH = "/ruang-untuk-guru/sma/buku-animasi/lingkaran";

function Equation({ math, label }: { math: string; label?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-3 text-center text-cyan-100 sm:px-6">
      {label && <p className="mb-2 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/50">{label}</p>}
      <BlockMath math={math} />
    </div>
  );
}

function SectionHeading({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <div className="mb-5 flex gap-4">
      <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">
        {index}
      </span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{description}</p>
      </div>
    </div>
  );
}

function Note({ title, children, tone = "cyan" }: {
  title: string;
  children: ReactNode;
  tone?: "cyan" | "amber" | "emerald" | "violet";
}) {
  const tones = {
    cyan: "border-cyan-200/15 bg-cyan-200/[.05] text-cyan-50",
    amber: "border-amber-200/15 bg-amber-200/[.05] text-amber-50",
    emerald: "border-emerald-200/15 bg-emerald-200/[.05] text-emerald-50",
    violet: "border-violet-200/15 bg-violet-200/[.05] text-violet-50",
  };
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${tones[tone]}`}>
      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p><strong>{title}</strong> {children}</p>
    </div>
  );
}

function Example({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh baru {number}</p>
          <h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function PowerDiagram({ kind }: { kind: "external" | "secants" | "tangent" }) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-[#071326]/75 p-3">
      <svg viewBox="0 0 320 210" role="img" aria-label={{
        external: "Titik P berada di luar lingkaran dan jaraknya ke pusat dibandingkan dengan jari-jari.",
        secants: "Dua garis sekan dari titik luar P memotong lingkaran di A, B, C, dan D.",
        tangent: "Garis singgung PA tegak lurus jari-jari CA di titik singgung A.",
      }[kind]} className="mx-auto h-auto w-full max-w-sm">
        <circle cx="142" cy="104" r="57" fill="#22d3ee" fillOpacity=".08" stroke="#67e8f9" strokeWidth="2.5" />
        <circle cx="142" cy="104" r="3.5" fill="#fbbf24" />
        <text x="126" y="126" fill="#fef3c7" fontSize="12">C</text>
        {kind === "external" && (
          <>
            <line x1="142" y1="104" x2="263" y2="104" stroke="#fbbf24" strokeWidth="2" />
            <circle cx="263" cy="104" r="4" fill="#fb923c" />
            <text x="269" y="100" fill="#fed7aa" fontSize="12">P</text>
            <text x="184" y="96" fill="#fde68a" fontSize="12">r</text>
            <text x="208" y="122" fill="#fed7aa" fontSize="12">CP</text>
          </>
        )}
        {kind === "secants" && (
          <>
            <line x1="268" y1="36" x2="74" y2="173" stroke="#fbbf24" strokeWidth="2" />
            <line x1="268" y1="36" x2="67" y2="94" stroke="#fb923c" strokeWidth="2" />
            <circle cx="268" cy="36" r="4" fill="#fb923c" />
            <text x="276" y="34" fill="#fed7aa" fontSize="12">P</text>
            <text x="196" y="83" fill="#fde68a" fontSize="12">A</text>
            <text x="101" y="151" fill="#fde68a" fontSize="12">B</text>
            <text x="180" y="59" fill="#fdba74" fontSize="12">C</text>
            <text x="81" y="87" fill="#fdba74" fontSize="12">D</text>
          </>
        )}
        {kind === "tangent" && (
          <>
            <line x1="142" y1="104" x2="142" y2="47" stroke="#fbbf24" strokeWidth="2" />
            <line x1="142" y1="47" x2="263" y2="47" stroke="#fb923c" strokeWidth="2" />
            <line x1="142" y1="104" x2="263" y2="47" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 5" />
            <circle cx="142" cy="47" r="4" fill="#fb923c" />
            <circle cx="263" cy="47" r="4" fill="#fb923c" />
            <path d="M142 47 L142 55 L150 55 L150 47" fill="none" stroke="#fef3c7" strokeWidth="1.5" />
            <text x="126" y="126" fill="#fef3c7" fontSize="12">C</text>
            <text x="135" y="39" fill="#fed7aa" fontSize="12">A</text>
            <text x="270" y="44" fill="#fed7aa" fontSize="12">P</text>
          </>
        )}
        <text x="289" y="194" fill="#cbd5e1" fontSize="11">{kind === "external" ? "P di luar" : kind === "secants" ? "PA · PB = PC · PD" : "CA tegak lurus PA"}</text>
      </svg>
      <figcaption className="mt-1 text-center font-body text-xs leading-relaxed text-slate-400">
        {kind === "external" ? "Bandingkan jarak CP dengan jari-jari r." : kind === "secants" ? "Hasil kali jarak dari P pada kedua sekan bernilai sama." : "Jari-jari ke titik singgung membentuk sudut 90°."}
      </figcaption>
    </figure>
  );
}

function LinePositionDiagram() {
  const cases = [
    { x: 54, title: "Sekan", lineY: 70 },
    { x: 160, title: "Singgung", lineY: 27 },
    { x: 266, title: "Di luar", lineY: 5 },
  ];
  return (
    <figure className="rounded-2xl border border-white/10 bg-[#071326]/75 p-3">
      <svg viewBox="0 0 320 142" role="img" aria-label="Tiga kemungkinan posisi garis terhadap lingkaran: memotong, menyinggung, atau tidak berpotongan." className="mx-auto h-auto w-full max-w-xl">
        {cases.map(({ x, title, lineY }, index) => (
          <g key={title}>
            <circle cx={x} cy="57" r="30" fill="#22d3ee" fillOpacity=".07" stroke="#67e8f9" strokeWidth="2" />
            <line x1={x - 37} y1={lineY} x2={x + 37} y2={lineY} stroke={index === 0 ? "#fbbf24" : index === 1 ? "#34d399" : "#fb923c"} strokeWidth="2" />
            <text x={x} y="112" textAnchor="middle" fill="#e2e8f0" fontSize="11">{title}</text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-1 text-center font-body text-xs leading-relaxed text-slate-400">Jarak pusat ke garis menentukan banyaknya titik perpotongan.</figcaption>
    </figure>
  );
}

const CHECK_QUESTIONS = [
  {
    question: "Lingkaran berpusat di (1, −2), berjari-jari 5. Kuasa titik P(7, 6) adalah ...",
    options: ["−25", "75", "100"],
    answer: 1,
    explanation: "CP² = 6² + 8² = 100, maka kuasa P = CP² − r² = 100 − 25 = 75.",
  },
  {
    question: "Jika jarak pusat ke garis lebih kecil daripada jari-jari, garis itu ...",
    options: ["Memotong lingkaran di dua titik", "Menyinggung lingkaran", "Tidak berpotongan"],
    answer: 0,
    explanation: "Jarak pusat yang lebih kecil dari r berarti garis melewati bagian dalam lingkaran, sehingga ada dua titik potong.",
  },
  {
    question: "Dari titik P di luar lingkaran, panjang garis singgungnya 8. Hasil kali jarak pada sekan PA · PB adalah ...",
    options: ["16", "64", "128"],
    answer: 1,
    explanation: "Teorema kuasa titik memberi PA · PB = (panjang garis singgung)² = 8² = 64.",
  },
  {
    question: "Untuk lingkaran x² + y² = 25, garis y = 5 bersifat ...",
    options: ["Sekan", "Singgung", "Di luar lingkaran"],
    answer: 1,
    explanation: "Jarak garis y = 5 dari pusat (0,0) adalah 5, sama dengan jari-jari.",
  },
];

function SelfCheck() {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  return (
    <div className="space-y-4">
      {CHECK_QUESTIONS.map((item, questionIndex) => {
        const selected = answers[questionIndex];
        const answered = selected !== undefined;
        const correct = selected === item.answer;
        return (
          <article key={item.question} className="rounded-2xl border border-white/10 bg-[#101b2d]/80 p-4 sm:p-5">
            <h3 className="font-display text-base font-bold text-white">
              <span className="mr-2 text-cyan-200">{questionIndex + 1}.</span>{item.question}
            </h3>
            <div className="mt-3 grid gap-2">
              {item.options.map((option, optionIndex) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected === optionIndex}
                  onClick={() => setAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex }))}
                  className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                    selected === optionIndex
                      ? correct
                        ? "border-emerald-300/50 bg-emerald-400/10 text-emerald-100"
                        : "border-rose-300/50 bg-rose-400/10 text-rose-100"
                      : "border-white/10 bg-white/[.025] text-slate-300 hover:border-cyan-200/30"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {answered && (
              <p className={`mt-3 flex gap-2 text-sm leading-relaxed ${correct ? "text-emerald-200" : "text-amber-100"}`}>
                <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{correct ? "Tepat!" : "Belum tepat."} {item.explanation}</span>
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

const SmaKuasaTitikLingkaranDanGarisPage = () => (
  <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation prevPath={PAGE_PATH} />

    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
        <div className="relative max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Ruang untuk Guru · SMA</span>
            <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika · Persamaan Lingkaran</span>
          </div>
          <div className="mb-3 flex items-center gap-2 text-amber-200">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <p className="font-body text-xs font-bold uppercase tracking-[.24em]">Yuk, cari tahu seberapa dekat titik dengan lingkaran!</p>
          </div>
          <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Kuasa titik dan <span className="text-cyan-200">hubungan garis</span> dengan lingkaran
          </h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
            Dari satu rumus sederhana, kita bisa mengetahui apakah titik berada di dalam atau di luar lingkaran, mencari panjang garis singgung, dan menentukan apakah sebuah garis memotong, menyinggung, atau tidak bertemu lingkaran.
          </p>
          <div className="mt-6 flex items-start gap-2 text-sm text-amber-100">
            <Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Target belajar: memahami kuasa titik, teorema garis singgung dan sekan, jarak pusat ke garis, serta diskriminan persamaan potong.</span>
          </div>
        </div>
      </header>

      <div className="grid gap-8 desktop:grid-cols-[minmax(0,1fr)_260px] phone-land:grid-cols-2">
        <div className="min-w-0 space-y-12">
          <section id="arti-kuasa">
            <SectionHeading
              index="1"
              title="Apa arti kuasa sebuah titik?"
              description="Ambil lingkaran berpusat C(a,b) dengan jari-jari r dan sebuah titik P(x₁,y₁). Kuasa P membandingkan kuadrat jarak CP dengan kuadrat jari-jari."
            />
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_300px]">
              <div className="space-y-4">
                <Equation math="\operatorname{Kuasa}(P)=CP^2-r^2=(x_1-a)^2+(y_1-b)^2-r^2" label="Definisi kuasa titik terhadap lingkaran" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Hasilnya langsung memberi tahu posisi P. Bila kuasanya negatif, P berada di dalam lingkaran; jika nol, P tepat di keliling; dan jika positif, P berada di luar. Kuasa bukan panjang, jadi nilainya boleh negatif.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-rose-200/15 bg-rose-200/[.045] p-3 text-sm text-rose-100">Kuasa &lt; 0 <span className="block text-slate-300">P di dalam</span></div>
                  <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-3 text-sm text-amber-100">Kuasa = 0 <span className="block text-slate-300">P di keliling</span></div>
                  <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.045] p-3 text-sm text-emerald-100">Kuasa &gt; 0 <span className="block text-slate-300">P di luar</span></div>
                </div>
                <Note title="Lingkaran dalam bentuk pusat-jari-jari." tone="violet">
                  <span> Jika <InlineMath math="(x-a)^2+(y-b)^2=r^2" />, maka kuasa titik <InlineMath math="P(x_1,y_1)" /> juga dapat diperoleh dengan memasukkan koordinatnya ke ruas kiri lalu mengurangkan <InlineMath math="r^2" />.</span>
                </Note>
              </div>
              <PowerDiagram kind="external" />
            </div>
          </section>

          <section id="garis-singgung">
            <SectionHeading
              index="2"
              title="Kuasa titik dan panjang garis singgung"
              description="Dari titik P di luar lingkaran, tarik garis singgung yang menyentuh lingkaran di A. Jari-jari CA tegak lurus garis singgung PA, sehingga segitiga CAP siku-siku."
            />
            <div className="grid gap-4 md:grid-cols-[300px_minmax(0,1fr)]">
              <PowerDiagram kind="tangent" />
              <div className="space-y-4">
                <Equation math="PA^2=PC^2-CA^2=PC^2-r^2=\operatorname{Kuasa}(P)" label="Teorema panjang garis singgung" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Karena <InlineMath math="PA" /> adalah panjang, ambil akar kuadrat yang tidak negatif. Jadi panjang garis singgung dari P dapat dicari langsung dari kuasa P.
                </p>
                <Equation math="PA=\sqrt{\operatorname{Kuasa}(P)}" />
                <Note title="Ada dua garis singgung dari titik luar." tone="cyan">
                  <span> Jika P berada di luar lingkaran, dua ruas singgung yang menyentuh di A dan B memiliki panjang sama: <InlineMath math="PA=PB" />. Jika kuasa P nol, titiknya berada di lingkaran dan panjang ruas singgungnya nol.</span>
                </Note>
              </div>
            </div>
            <div className="mt-4">
              <Example number={1} title="Menentukan panjang garis singgung">
                <p className="text-sm leading-relaxed text-slate-300">
                  Lingkaran berpusat di <InlineMath math="C(2,-1)" /> dan berjari-jari 5. Tentukan panjang garis singgung dari <InlineMath math="P(8,7)" />.
                </p>
                <Equation math="\begin{aligned}PC^2&=(8-2)^2+(7-(-1))^2=6^2+8^2=100\\\operatorname{Kuasa}(P)&=100-5^2=75\\PA&=\sqrt{75}=5\sqrt{3}\end{aligned}" />
                <p className="text-sm leading-relaxed text-emerald-100">Jadi, masing-masing ruas garis singgung dari P panjangnya <InlineMath math="5\sqrt{3}" /> satuan.</p>
              </Example>
            </div>
          </section>

          <section id="teorema-sekan">
            <SectionHeading
              index="3"
              title="Hasil kali ruas-ruas pada garis sekan"
              description="Garis sekan melewati lingkaran dan memotongnya di dua titik. Dari titik luar P, dua sekan dapat ditarik; hasil kali jarak P ke dua titik potong pada satu sekan selalu sama."
            />
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_300px]">
              <div className="space-y-4">
                <Equation math="PA\cdot PB=PC\cdot PD=\operatorname{Kuasa}(P)" label="Dua sekan dari titik luar P" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Pada setiap sekan, huruf A dan C menamai titik potong yang lebih dekat ke P, sedangkan B dan D adalah titik potong yang lebih jauh. Jarak yang dipakai adalah panjang ruas dari P, bukan panjang seluruh garis.
                </p>
                <Note title="Satu sekan dan satu garis singgung." tone="amber">
                  <span> Jika satu garis dari P menyinggung lingkaran di T, sementara garis lain memotong lingkaran di A dan B, berlaku <InlineMath math="PT^2=PA\cdot PB" />. Jadi, rumus garis singgung merupakan kasus khusus dari hubungan kuasa titik.</span>
                </Note>
                <Equation math="PA\cdot PB=PT^2" label="Teorema sekan-garis singgung" />
              </div>
              <PowerDiagram kind="secants" />
            </div>
            <div className="mt-4">
              <Example number={2} title="Mengecek hasil kali dua sekan">
                <p className="text-sm leading-relaxed text-slate-300">
                  Dari titik P, sekan pertama memiliki <InlineMath math="PA=3" /> dan <InlineMath math="PB=12" />. Pada sekan kedua, <InlineMath math="PC=4" /> dan <InlineMath math="PD=x" />. Tentukan x.
                </p>
                <Equation math="\begin{aligned}PA\cdot PB&=PC\cdot PD\\3\cdot12&=4x\\x&=9\end{aligned}" />
                <p className="text-sm leading-relaxed text-emerald-100">Maka panjang ruas <InlineMath math="PD=9" /> satuan.</p>
              </Example>
            </div>
          </section>

          <section id="jarak-ke-garis">
            <SectionHeading
              index="4"
              title="Posisi garis terhadap lingkaran"
              description="Jarak tegak lurus dari pusat lingkaran ke sebuah garis menjadi penentu yang praktis. Bandingkan jarak itu dengan jari-jari."
            />
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <Equation math="d=\frac{|Aa+Bb+D|}{\sqrt{A^2+B^2}}" label="Jarak pusat C(a,b) ke garis Ax+By+D=0" />
                <ul className="space-y-2 rounded-2xl border border-white/10 bg-[#101b2d]/80 p-4 text-sm leading-relaxed text-slate-300">
                  <li><strong className="text-amber-100">Jika d &lt; r:</strong> garis memotong lingkaran di dua titik (sekan).</li>
                  <li><strong className="text-emerald-100">Jika d = r:</strong> garis menyentuh lingkaran di satu titik (garis singgung).</li>
                  <li><strong className="text-orange-100">Jika d &gt; r:</strong> garis berada di luar, tidak memiliki titik persekutuan.</li>
                </ul>
                <p className="text-sm leading-relaxed text-slate-300">
                  Rumus jarak tersebut memakai nilai mutlak karena jarak selalu nonnegatif. Untuk garis <InlineMath math="Ax+By+D=0" />, panjang vektor normalnya adalah <InlineMath math="\sqrt{A^2+B^2}" />.
                </p>
              </div>
              <LinePositionDiagram />
            </div>
            <div className="mt-4">
              <Example number={3} title="Menguji tiga garis pada lingkaran yang sama">
                <p className="text-sm leading-relaxed text-slate-300">
                  Lingkaran <InlineMath math="x^2+y^2=25" /> berpusat di <InlineMath math="O(0,0)" /> dengan jari-jari 5. Tentukan posisi garis <InlineMath math="y=2" />, <InlineMath math="x+y=10" />, dan <InlineMath math="y=5" />.
                </p>
                <div className="space-y-2 text-sm leading-relaxed text-slate-300">
                  <p><strong className="text-amber-100">a. y = 2:</strong> jarak O ke garis 2, kurang dari 5, jadi sekan.</p>
                  <p><strong className="text-orange-100">b. x + y = 10:</strong> jarak O adalah <InlineMath math="10/\sqrt{2}=5\sqrt{2}" />, lebih dari 5, jadi tidak berpotongan.</p>
                  <p><strong className="text-emerald-100">c. y = 5:</strong> jarak O tepat 5, jadi garis singgung.</p>
                </div>
              </Example>
            </div>
          </section>

          <section id="diskriminan">
            <SectionHeading
              index="5"
              title="Cara aljabar: lihat diskriminannya"
              description="Kita juga bisa mensubstitusikan persamaan garis ke persamaan lingkaran. Hasilnya persamaan kuadrat; diskriminannya menunjukkan banyaknya titik potong."
            />
            <div className="space-y-4">
              <Equation math="\Delta=B^2-4AC" label="Diskriminan persamaan kuadrat Ax²+Bx+C=0" />
              <div className="grid gap-3 desktop:grid-cols-3 phone-land:grid-cols-2">
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4 text-sm leading-relaxed text-amber-100">Δ &gt; 0 <span className="block text-slate-300">Dua titik potong</span></div>
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.045] p-4 text-sm leading-relaxed text-emerald-100">Δ = 0 <span className="block text-slate-300">Satu titik singgung</span></div>
                <div className="rounded-2xl border border-orange-200/15 bg-orange-200/[.045] p-4 text-sm leading-relaxed text-orange-100">Δ &lt; 0 <span className="block text-slate-300">Tidak ada titik real</span></div>
              </div>
              <Example number={4} title="Menentukan garis singgung melalui diskriminan">
                <p className="text-sm leading-relaxed text-slate-300">
                  Periksa garis <InlineMath math="y=3x+10" /> terhadap lingkaran <InlineMath math="x^2+y^2=10" />.
                </p>
                <Equation math="\begin{aligned}x^2+(3x+10)^2&=10\\10x^2+60x+90&=0\\\Delta&=60^2-4(10)(90)=0\end{aligned}" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Karena <InlineMath math="\Delta=0" />, garis menyinggung lingkaran. Akar gandanya <InlineMath math="x=-3" />, sehingga <InlineMath math="y=3(-3)+10=1" />. Titik singgungnya <InlineMath math="(-3,1)" />.
                </p>
              </Example>
              <Note title="Pilih cara yang paling nyaman." tone="violet">
                <span> Menghitung jarak pusat ke garis biasanya cepat jika persamaan garis sudah dalam bentuk <InlineMath math="Ax+By+D=0" />. Substitusi dan diskriminan berguna saat kita juga perlu menemukan koordinat titik potong atau titik singgungnya.</span>
              </Note>
            </div>
          </section>

          <section id="kuasa-persamaan-umum">
            <SectionHeading
              index="6"
              title="Kuasa titik dari bentuk umum lingkaran"
              description="Tidak perlu selalu melengkapi kuadrat lebih dulu. Untuk persamaan lingkaran yang koefisien x² dan y²-nya sama, nilai kuasa bisa dihitung dengan menyubstitusikan koordinat titik."
            />
            <div className="space-y-4">
              <Equation math="x^2+y^2+Ax+By+C=0" label="Bentuk umum lingkaran" />
              <Equation math="\operatorname{Kuasa}(P)=x_1^2+y_1^2+Ax_1+By_1+C" label="Kuasa P(x₁,y₁) terhadap lingkaran tersebut" />
              <p className="text-sm leading-relaxed text-slate-300">
                Nilai substitusi itu sama dengan <InlineMath math="CP^2-r^2" />. Tanda negatif menunjukkan titik di dalam, nol menunjukkan titik pada keliling, dan tanda positif menunjukkan titik di luar.
              </p>
              <Example number={5} title="Menentukan posisi titik tanpa mengubah persamaan">
                <p className="text-sm leading-relaxed text-slate-300">
                  Tentukan posisi <InlineMath math="P(4,1)" /> terhadap lingkaran <InlineMath math="x^2+y^2-2x+4y-20=0" />.
                </p>
                <Equation math="\operatorname{Kuasa}(P)=4^2+1^2-2(4)+4(1)-20=16+1-8+4-20=-7" />
                <p className="text-sm leading-relaxed text-rose-100">Kuasa negatif, jadi P berada di dalam lingkaran.</p>
              </Example>
            </div>
          </section>

          <section id="cek-pemahaman">
            <SectionHeading
              index="7"
              title="Cek pemahaman—coba satu per satu!"
              description="Pilih jawaban yang menurutmu tepat. Setelah memilih, penjelasan singkat akan muncul agar kamu bisa memeriksa cara berpikirmu."
            />
            <SelfCheck />
          </section>
        </div>

        <aside className="hidden desktop:block">
          <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#101b2d]/90 p-4 backdrop-blur">
            <p className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-cyan-100">
              <Target className="h-4 w-4" aria-hidden="true" /> Peta belajar
            </p>
            <nav className="space-y-1.5">
              {[
                ["arti-kuasa", "Arti kuasa titik"],
                ["garis-singgung", "Panjang garis singgung"],
                ["teorema-sekan", "Teorema sekan"],
                ["jarak-ke-garis", "Jarak pusat ke garis"],
                ["diskriminan", "Diskriminan"],
                ["kuasa-persamaan-umum", "Kuasa bentuk umum"],
                ["cek-pemahaman", "Cek pemahaman"],
              ].map(([id, label], index) => (
                <a key={id} href={`#${id}`} className="flex items-center gap-2 rounded-xl px-2 py-2 text-xs text-slate-300 transition hover:bg-white/[.05] hover:text-cyan-100">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/[.06] text-[10px] font-bold text-cyan-100/80">{index + 1}</span>
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-4 rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-3">
              <p className="flex items-center gap-2 font-display text-sm font-bold text-amber-100"><Check className="h-4 w-4" aria-hidden="true" /> Rumus kunci</p>
              <p className="mt-2 font-body text-xs leading-relaxed text-slate-400"><InlineMath math="\operatorname{Kuasa}(P)=PC^2-r^2" /> dan dari P di luar lingkaran, <InlineMath math="PT^2=PA\cdot PB" />.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
);

export default SmaKuasaTitikLingkaranDanGarisPage;
