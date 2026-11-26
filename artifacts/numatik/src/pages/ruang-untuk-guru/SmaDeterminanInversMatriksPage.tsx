import type { ReactNode } from "react";
import { ArrowRight, BookOpen, Check, Lightbulb, Sparkles } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

type MatrixProps = {
  rows: ReactNode[][];
  label: string;
};

function Matrix({ rows, label }: MatrixProps) {
  return (
    <span role="img" aria-label={label} className="inline-flex items-stretch gap-1 align-middle font-mono text-sm font-semibold text-cyan-100 sm:text-base">
      <span aria-hidden="true" className="w-2 rounded-l-md border-y-2 border-l-2 border-cyan-200/75" />
      <span className="grid gap-x-4 gap-y-1 px-1 py-1">
        {rows.map((row, rowIndex) => (
          <span key={rowIndex} className="flex justify-center gap-4">
            {row.map((entry, columnIndex) => <span key={columnIndex} className="min-w-3 text-center">{entry}</span>)}
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="w-2 rounded-r-md border-y-2 border-r-2 border-cyan-200/75" />
    </span>
  );
}

function Determinant({ rows, label }: MatrixProps) {
  return (
    <span role="img" aria-label={label} className="inline-flex items-stretch gap-1 align-middle font-mono text-sm font-semibold text-cyan-100 sm:text-base">
      <span aria-hidden="true" className="w-1 border-y-2 border-l border-cyan-200/75" />
      <span className="grid gap-x-4 gap-y-1 px-1 py-1">
        {rows.map((row, rowIndex) => (
          <span key={rowIndex} className="flex justify-center gap-4">
            {row.map((entry, columnIndex) => <span key={columnIndex} className="min-w-3 text-center">{entry}</span>)}
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="w-1 border-y-2 border-r border-cyan-200/75" />
    </span>
  );
}

function Heading({ number, title, intro }: { number: string; title: string; intro: string }) {
  return (
    <div className="mb-5 flex gap-4">
      <span className="grid h-10 w-14 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-mono text-xs font-black text-cyan-100">{number}</span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{intro}</p>
      </div>
    </div>
  );
}

function Example({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <article data-testid={`example-${number}`} className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]">
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-300/15 text-orange-200"><BookOpen className="h-4 w-4" aria-hidden="true" /></span>
        <div>
          <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh {number}</p>
          <h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3>
        </div>
      </header>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function Formula({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-cyan-200/15 bg-[#071326]/90 px-4 py-4 text-center">
      {label && <p className="mb-3 text-left font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100/55">{label}</p>}
      <div className="flex min-w-max items-center justify-center gap-3 font-mono text-sm font-semibold leading-relaxed text-cyan-100 sm:gap-5 sm:text-base">{children}</div>
    </div>
  );
}

function SarrusDiagram() {
  const cells = [
    ["a", "b", "c", "a", "b"],
    ["d", "e", "f", "d", "e"],
    ["g", "h", "i", "g", "h"],
  ];
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-3">
      <svg viewBox="0 0 510 265" role="img" aria-label="Diagram aturan Sarrus: jumlahkan tiga diagonal turun dan kurangi tiga diagonal naik" className="mx-auto h-auto min-w-[440px] w-full max-w-xl">
        <title>Aturan Sarrus untuk determinan matriks 3 × 3</title>
        {cells.map((row, rowIndex) => row.map((value, columnIndex) => {
          const x = 56 + columnIndex * 74;
          const y = 52 + rowIndex * 55;
          return (
            <g key={`${rowIndex}-${columnIndex}`}>
              <rect x={x - 23} y={y - 19} width="46" height="38" rx="8" fill={columnIndex < 3 ? "#0e7490" : "#334155"} fillOpacity=".42" stroke="#67e8f9" strokeOpacity=".35" />
              <text x={x} y={y + 6} fill="#ecfeff" fontSize="18" fontWeight="700" textAnchor="middle">{value}</text>
            </g>
          );
        }))}
        {[0, 1, 2].map((column) => (
          <g key={`down-${column}`}>
            <path d={`M${56 + column * 74} 52L${56 + (column + 1) * 74} 107L${56 + (column + 2) * 74} 162`} fill="none" stroke="#34d399" strokeWidth="2.5" strokeOpacity=".75" />
            <path d={`M${56 + column * 74} 162L${56 + (column + 1) * 74} 107L${56 + (column + 2) * 74} 52`} fill="none" stroke="#fb7185" strokeWidth="2.5" strokeOpacity=".75" />
          </g>
        ))}
        <text x="255" y="214" fill="#6ee7b7" fontSize="13" fontWeight="700" textAnchor="middle">diagonal turun: dijumlahkan</text>
        <text x="255" y="239" fill="#fda4af" fontSize="13" fontWeight="700" textAnchor="middle">diagonal naik: dikurangkan</text>
      </svg>
    </div>
  );
}

function CofactorSigns() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-3">
      <svg viewBox="0 0 310 130" role="img" aria-label="Pola tanda kofaktor matriks tiga kali tiga: plus minus plus, minus plus minus, plus minus plus" className="mx-auto h-auto min-w-[270px] w-full max-w-sm">
        <title>Pola tanda kofaktor</title>
        {["+","−","+","−","+","−","+","−","+"].map((sign, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          return (
            <g key={index}>
              <rect x={67 + col * 59} y={12 + row * 34} width="48" height="29" rx="6" fill={sign === "+" ? "#064e3b" : "#7f1d1d"} fillOpacity=".55" stroke={sign === "+" ? "#6ee7b7" : "#fda4af"} strokeOpacity=".5" />
              <text x={91 + col * 59} y={33 + row * 34} fill="#fff" fontSize="17" fontWeight="700" textAnchor="middle">{sign}</text>
            </g>
          );
        })}
        <text x="155" y="125" fill="#cbd5e1" fontSize="11" textAnchor="middle">Tandanya mengikuti (−1)ⁱ⁺ʲ</text>
      </svg>
    </div>
  );
}

const outline = [
  ["Determinan 2 × 2", "det2"],
  ["SPLDV dan Cramer", "spldv"],
  ["Determinan 3 × 3", "det3"],
  ["Sifat determinan", "properties"],
  ["Penerapan SPLTV", "spltv"],
  ["Invers 2 × 2", "inverse2"],
  ["Invers 3 × 3", "inverse3"],
];

export default function SmaDeterminanInversMatriksPage() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/matriks" />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
        <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10" data-testid="lesson-hero">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
          <div className="relative max-w-4xl">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Ruang untuk Guru · SMA</span>
              <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika · Matriks</span>
            </div>
            <div className="mb-3 flex items-center gap-2 text-amber-200">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <p className="font-body text-xs font-bold uppercase tracking-[.24em]">Pola angka, banyak cara menemukan jawabannya!</p>
            </div>
            <p className="mb-2 font-mono text-xs font-bold tracking-[.22em] text-cyan-100">BAB 4.1–4.2</p>
            <h1 className="font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">
              Determinan &amp; <span className="text-cyan-200">Invers Matriks</span>
            </h1>
            <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
              Dari menghitung determinan sampai mencari invers, kita akan menjelajahi aturan, metode, dan penerapannya untuk menyelesaikan SPLDV maupun SPLTV. Kita kerjakan langkah demi langkah—tanpa melewatkan konsep penting!
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Determinan 2 × 2", "Sarrus", "Kofaktor", "Cramer", "Invers 2 × 2", "Invers 3 × 3"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs font-semibold text-slate-200">{item}</span>
              ))}
            </div>
          </div>
        </header>

        <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 desktop:hidden" aria-label="Peta materi">
          {outline.map(([label, id]) => <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-slate-200 hover:border-cyan-200/40 hover:text-cyan-100">{label}</a>)}
        </nav>

        <div className="grid gap-8 desktop:grid-cols-[minmax(0,1fr)_245px] phone-land:grid-cols-2">
          <div className="min-w-0 space-y-12">
            <section id="det2" className="scroll-mt-8 space-y-5">
              <Heading number="4.1" title="Determinan matriks persegi" intro="Kita mulai petualangan ini dengan determinan! Nilainya memberi banyak petunjuk tentang matriks dan membantu kita mengecek apakah sebuah sistem persamaan punya solusi tunggal." />
              <div className="space-y-4 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                <h3 className="font-display text-lg font-bold text-cyan-100">4.1.1 · Determinan matriks persegi berordo 2 × 2</h3>
                <p className="text-sm leading-relaxed text-slate-300">Untuk matriks A berordo 2 × 2, determinannya ditulis <span className="font-mono text-white">det(A)</span> atau <span className="font-mono text-white">|A|</span>. Cara menghitungnya asyik dan simpel: kalikan diagonal utama, lalu kurangi dengan hasil kali diagonal lainnya.</p>
                <Formula label="Rumus determinan 2 × 2">
                  <span>A =</span><Matrix rows={[[<span>a</span>, <span>b</span>], [<span>c</span>, <span>d</span>]]} label="Matriks A berordo dua kali dua dengan elemen a b c d" />
                  <span>→</span><Determinant rows={[[<span>a</span>, <span>b</span>], [<span>c</span>, <span>d</span>]]} label="Determinan matriks A berordo dua kali dua" />
                  <span>= ad − bc</span>
                </Formula>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h4 className="font-display font-bold text-cyan-100">Diagonal utama</h4><p className="mt-2 text-sm text-slate-300">Kalikan elemen kiri atas dengan kanan bawah. Hasilnya adalah <span className="font-mono text-white">a · d</span>.</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h4 className="font-display font-bold text-cyan-100">Diagonal lainnya</h4><p className="mt-2 text-sm text-slate-300">Nah, hasil kali elemen kanan atas dan kiri bawah, <span className="font-mono text-white">b · c</span>, menjadi pengurang. Jadi, determinannya <span className="font-mono text-white">a · d − b · c</span>.</p></div>
                </div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.035] p-4">
                  <h3 className="font-display font-bold text-violet-100">Teorema determinan hasil kali</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Ada sifat keren yang mempersingkat hitungan: jika A dan B adalah matriks persegi berordo sama, determinan hasil kalinya sama dengan hasil kali determinan masing-masing.</p>
                  <Formula><span>det(AB) = det(A) · det(B)</span></Formula>
                  <details className="mt-3 rounded-xl border border-white/10 bg-white/[.025] p-3">
                    <summary className="cursor-pointer text-sm font-bold text-violet-100">Lihat pembuktian untuk matriks 2 × 2</summary>
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                      <p>Misalkan <span className="font-mono text-white">A = [[a,b],[c,d]]</span> dan <span className="font-mono text-white">B = [[e,f],[g,h]]</span>. Maka <span className="font-mono text-white">AB = [[ae+bg, af+bh],[ce+dg, cf+dh]]</span>.</p>
                      <p className="font-mono text-cyan-100">det(AB) = (ae + bg)(cf + dh) − (af + bh)(ce + dg)</p>
                      <p className="font-mono text-cyan-100">= acef + adeh + bcfg + bdgh − acef − adfg − bceh − bdgh</p>
                      <p className="font-mono text-cyan-100">= adeh + bcfg − adfg − bceh = (ad − bc)(eh − fg)</p>
                      <p>Karena <span className="font-mono text-white">det(A)=ad−bc</span> dan <span className="font-mono text-white">det(B)=eh−fg</span>, terbukti bahwa <span className="font-mono text-white">det(AB)=det(A)det(B)</span>.</p>
                    </div>
                  </details>
                </div>
              </div>

              <Example number={1} title="Mari mulai dengan determinan 2 × 2!">
                <p className="text-sm text-slate-300">Siap jadi detektif diagonal? Gunakan rumus <span className="font-mono text-white">ad − bc</span>, dan awas jangan sampai tanda negatif menyelinap!</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 font-bold text-cyan-100">a</p><Formula><span>A =</span><Determinant rows={[[1, 0], [1, 1]]} label="Determinan A, satu nol; satu satu" /><span>→ det(A) = (1)(1) − (0)(1) = 1</span></Formula></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 font-bold text-cyan-100">b</p><Formula><span>B =</span><Determinant rows={[[0, -1], [-1, 0]]} label="Determinan B, nol minus satu; minus satu nol" /><span>→ det(B) = 0 − 1 = −1</span></Formula></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 font-bold text-cyan-100">c</p><Formula><span>C =</span><Determinant rows={[[3, 4], [-2, 5]]} label="Determinan C, tiga empat; minus dua lima" /><span>→ det(C) = 15 − (−8) = 23</span></Formula></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 font-bold text-cyan-100">d</p><Formula><span>D =</span><Determinant rows={[[-6, 2], [-1, 5]]} label="Determinan D, minus enam dua; minus satu lima" /><span>→ det(D) = −30 − (−2) = −28</span></Formula></div>
                </div>
              </Example>

              <Example number={2} title="Yuk, hitung det(A − kI)!">
                <p className="text-sm leading-relaxed text-slate-300">Diketahui <span className="font-mono text-white">A = [[2,1],[3,4]]</span> dan matriks identitas <span className="font-mono text-white">I = [[1,0],[0,1]]</span>. Ayo tentukan <span className="font-mono text-white">det(A − 2I)</span> dan <span className="font-mono text-white">det(A − 3I)</span>. Kalikan I dengan k dulu, lalu kurangkan elemen-elemen yang seletak. Langkah demi langkah, pasti bisa!</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="font-bold text-cyan-100">det(A − 2I)</p><p className="mt-2 font-mono text-sm text-slate-200">A − 2I = [[0, 1], [3, 2]]</p><p className="mt-2 font-mono text-sm text-cyan-100">det(A − 2I) = (0)(2) − (1)(3) = −3</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="font-bold text-cyan-100">det(A − 3I)</p><p className="mt-2 font-mono text-sm text-slate-200">A − 3I = [[−1, 1], [3, 1]]</p><p className="mt-2 font-mono text-sm text-cyan-100">det(A − 3I) = (−1)(1) − (1)(3) = −4</p></div>
                </div>
              </Example>

              <Example number={3} title="Beraksi dengan teorema determinan hasil kali">
                <p className="text-sm text-slate-300">Tantangan berikutnya! Diketahui <span className="font-mono text-white">AB = [[6,0],[0,6]]</span> dan <span className="font-mono text-white">det(A) = 3</span>. Yuk, cari det(B).</p>
                <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-orange-200">
                  <li>Hitung determinan hasil kali: <span className="font-mono text-white">det(AB) = (6)(6) − 0 = 36</span>.</li>
                  <li>Gunakan teorema: <span className="font-mono text-white">det(AB)=det(A)det(B)</span>, sehingga <span className="font-mono text-white">36=3·det(B)</span>.</li>
                  <li>Jadi, <span className="font-mono text-white">det(B)=12</span>.</li>
                </ol>
              </Example>

              <Example number={4} title="Mencari parameter dengan determinan hasil kali">
                <p className="text-sm text-slate-300">Ayo pecahkan tantangan ini! Diketahui <span className="font-mono text-white">A = [[a,1],[2,3]]</span>, <span className="font-mono text-white">B = [[2,0],[0,1]]</span>, dan <span className="font-mono text-white">det(AB)=20</span>. Berapa nilai <span className="font-mono text-white">a²−3a</span>?</p>
                <div className="space-y-2 text-sm leading-relaxed text-slate-300">
                  <p><span className="font-mono text-white">det(B)=2</span> dan <span className="font-mono text-white">det(A)=3a−2</span>.</p>
                  <p>Dari teorema hasil kali: <span className="font-mono text-white">20=2(3a−2)</span>, sehingga <span className="font-mono text-white">20=6a−4</span>, <span className="font-mono text-white">6a=24</span>, dan <span className="font-mono text-white">a=4</span>.</p>
                  <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 font-mono text-emerald-50">a² − 3a = 4² − 3(4) = 4</p>
                </div>
              </Example>

              <Example number={5} title="Latihan mencari nilai dari determinan 2 × 2">
                <p className="text-sm text-slate-300">Sekarang giliranmu! Temukan nilai x yang membuat kesamaan determinan berikut benar.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <p className="mb-2 font-bold text-cyan-100">a</p>
                    <Formula><Determinant rows={[[<span>x</span>, 1], [2, 3]]} label="Determinan x satu; dua tiga" /><span>=</span><Determinant rows={[[5, 1], [2, 3]]} label="Determinan lima satu; dua tiga" /></Formula>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">Kedua determinan memiliki bentuk <span className="font-mono text-white">3x − 2 = 15 − 2</span>, jadi <span className="font-mono text-white">3x = 15</span> dan <span className="font-mono text-white">x = 5</span>.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <p className="mb-2 font-bold text-cyan-100">b</p>
                    <Formula><Determinant rows={[[2, <span>x</span>], [3, 4]]} label="Determinan dua x; tiga empat" /><span>=</span><Determinant rows={[[2, 2], [3, 4]]} label="Determinan dua dua; tiga empat" /></Formula>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300"><span className="font-mono text-white">8 − 3x = 8 − 6</span>, maka <span className="font-mono text-white">3x = 6</span> dan <span className="font-mono text-white">x = 2</span>.</p>
                  </div>
                </div>
              </Example>
            </section>

            <section id="spldv" className="scroll-mt-8 space-y-5">
              <Heading number="4.1.2" title="Menyelesaikan SPLDV dengan determinan" intro="Saatnya berkenalan dengan aturan Cramer! Kita gunakan beberapa determinan untuk menemukan nilai variabel. Kalau determinan matriks koefisien tidak nol, kita bisa langsung melangkah mencari solusinya." />
              <div className="space-y-4 rounded-3xl border border-violet-200/15 bg-violet-200/[.04] p-4 sm:p-5">
                <h3 className="font-display text-lg font-bold text-violet-100">Rumus Cramer untuk SPLDV</h3>
                <p className="text-sm leading-relaxed text-slate-300">Pertama, tuliskan SPLDV <span className="font-mono text-white">ax + by = m</span> dan <span className="font-mono text-white">cx + dy = n</span> dalam bentuk matriks <span className="font-mono text-white">AX = B</span>. Determinan koefisien kita sebut D. Untuk memperoleh Dₓ, ganti kolom x dengan konstanta; untuk Dᵧ, ganti kolom y. Polanya mudah diikuti, kan?</p>
                <Formula label="Determinan dan solusi Cramer">
                  <span>D =</span><Determinant rows={[[<span>a</span>, <span>b</span>], [<span>c</span>, <span>d</span>]]} label="Determinan koefisien a b c d" />
                  <span>Dₓ =</span><Determinant rows={[[<span>m</span>, <span>b</span>], [<span>n</span>, <span>d</span>]]} label="Determinan D x" />
                  <span>Dᵧ =</span><Determinant rows={[[<span>a</span>, <span>m</span>], [<span>c</span>, <span>n</span>]]} label="Determinan D y" />
                </Formula>
                <Formula><span>x = Dₓ/D</span><span>·</span><span>y = Dᵧ/D</span><span className="text-slate-400">, jika D ≠ 0</span></Formula>
                <p className="text-sm text-slate-300">Jika D ≠ 0, SPLDV punya tepat satu penyelesaian. Kalau D = 0, jangan menyerah—cek Dₓ dan Dᵧ untuk mengetahui apakah sistem tidak memiliki solusi atau justru memiliki tak terhingga banyak solusi.</p>
              </div>

              <Example number={6} title="Langkah demi langkah dengan aturan Cramer">
                <p className="text-sm text-slate-300">Yuk, selesaikan SPLDV <span className="font-mono text-white">2x + 3y = 13</span> dan <span className="font-mono text-white">5x − y = 7</span> dengan determinan. Ikuti D, Dₓ, dan Dᵧ sampai ketemu jawabannya!</p>
                <div className="space-y-3">
                  <p className="text-sm text-slate-300">Matriks koefisiennya <span className="font-mono text-white">A = [[2,3],[5,−1]]</span> dan matriks konstanta <span className="font-mono text-white">B = [[13],[7]]</span>.</p>
                  <Formula><span>D =</span><Determinant rows={[[2, 3], [5, -1]]} label="Determinan D dua tiga; lima minus satu" /><span>= −2 − 15 = −17</span></Formula>
                  <Formula><span>Dₓ =</span><Determinant rows={[[13, 3], [7, -1]]} label="Determinan D x tiga belas tiga; tujuh minus satu" /><span>= −13 − 21 = −34</span><span>→ x = 2</span></Formula>
                  <Formula><span>Dᵧ =</span><Determinant rows={[[2, 13], [5, 7]]} label="Determinan D y dua tiga belas; lima tujuh" /><span>= 14 − 65 = −51</span><span>→ y = 3</span></Formula>
                  <p className="flex items-center gap-2 rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-sm text-emerald-50"><Check className="h-4 w-4 shrink-0" aria-hidden="true" />Mantap, penyelesaiannya adalah <strong>(x, y) = (2, 3)</strong>!</p>
                </div>
              </Example>

              <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                <h3 className="font-display font-bold text-amber-100">D = 0? Tenang, kita cek kemungkinan solusinya!</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="font-bold text-rose-100">D = 0 dan Dₓ atau Dᵧ tidak nol</p><p className="mt-1 text-sm text-slate-300">Persamaannya tidak konsisten, jadi tidak ada penyelesaian dan HP = ∅.</p></div>
                  <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="font-bold text-emerald-100">D = Dₓ = Dᵧ = 0</p><p className="mt-1 text-sm text-slate-300">Kedua persamaan saling bergantung; hasilnya ada tak terhingga banyak penyelesaian.</p></div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">Sistem bergantung memiliki satu persamaan yang merupakan kelipatan persamaan lainnya. Variabelnya bebas mengikuti hubungan yang sama, bukan menentukan satu titik saja.</p>
              </div>

              <Example number={7} title="Mengenali satu, nol, atau tak terhingga banyak solusi">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h4 className="font-display font-bold text-cyan-100">a · Ketika persamaan tidak punya solusi</h4>
                    <p className="mt-2 text-sm text-slate-300">Ayo periksa SPLDV <span className="font-mono text-white">2x − 3y = 7</span> dan <span className="font-mono text-white">4x − 6y = 10</span>.</p>
                    <div className="mt-3 space-y-2 font-mono text-xs leading-relaxed text-slate-200">
                      <p>D = 2(−6) − (−3)(4) = 0</p>
                      <p>Dₓ = 7(−6) − (−3)(10) = −12</p>
                      <p>Dᵧ = 2(10) − 7(4) = −8</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">D = 0, tetapi Dₓ dan Dᵧ tidak nol. Persamaan pertama mengharuskan <span className="font-mono">2x−3y=7</span>, sementara persamaan kedua jika dibagi dua menjadi <span className="font-mono">2x−3y=5</span>. Keduanya bertentangan, jadi HP = ∅.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h4 className="font-display font-bold text-cyan-100">b · Ketika solusi berjumlah tak terhingga</h4>
                    <p className="mt-2 text-sm text-slate-300">Sekarang bandingkan dengan SPLDV <span className="font-mono text-white">x + y = −2</span> dan <span className="font-mono text-white">−3x − 3y = 6</span>.</p>
                    <div className="mt-3 space-y-2 font-mono text-xs leading-relaxed text-slate-200">
                      <p>D = 1(−3) − 1(−3) = 0</p>
                      <p>Dₓ = (−2)(−3) − 1(6) = 0</p>
                      <p>Dᵧ = 1(6) − (−2)(−3) = 0</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">Persamaan kedua sama dengan −3 kali persamaan pertama. Jadi hubungan solusinya adalah <span className="font-mono text-white">x + y = −2</span>, atau <span className="font-mono text-white">y = −2 − x</span>. HP = <span className="font-mono text-white">{`{(x, −2 − x) | x ∈ ℝ}`}</span>.</p>
                  </div>
                </div>
              </Example>
            </section>

            <section id="det3" className="scroll-mt-8 space-y-5">
              <Heading number="4.1.3" title="Determinan matriks persegi berordo 3 × 3" intro="Naik satu tingkat, yuk! Untuk matriks 3 × 3, kita bisa memakai aturan Sarrus atau ekspansi kofaktor-minor. Dua-duanya memberi hasil yang sama—pilih cara yang paling pas buatmu." />
              <div className="space-y-5 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                <div className="space-y-3">
                  <h3 className="font-display text-lg font-bold text-cyan-100">A. Cara Sarrus dan Sarrus-Kino</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Cara Sarrus, siap! Tulis matriks 3 × 3 dan salin dua kolom pertamanya di sebelah kanan. Kalikan elemen pada tiga diagonal yang turun dari kiri ke kanan, lalu jumlahkan. Setelah itu, kalikan tiga diagonal yang naik dan kurangkan jumlahnya. Ikuti arah garisnya, dan determinan pun ketemu!</p>
                  <Formula label="Aturan Sarrus"><span>det(A) = aei + bfg + cdh − ceg − bdi − afh</span></Formula>
                  <SarrusDiagram />
                  <p className="text-sm leading-relaxed text-slate-300">Sarrus-Kino menata baris atau kolom dengan cara berbeda supaya pola diagonal terlihat dari arah lain. Prinsipnya tetap sama dan mudah diingat: jumlahkan tiga hasil kali diagonal bertanda positif, lalu kurangi tiga hasil kali bertanda negatif. Penyalinan boleh ke kanan/kiri atau baris pertama ke bawah—pastikan keenam hasil kali terhitung tepat satu kali.</p>
                </div>

                <Example number={8} title="Ayo hitung determinan 3 × 3 dengan Sarrus!">
                  <p className="text-sm text-slate-300">Coba terapkan aturan Sarrus pada matriks berikut. Kita hitung diagonal turun dan naik, lalu bandingkan hasilnya.</p>
                  <Formula><span>A =</span><Determinant rows={[[2, 1, 3], [0, -2, 4], [1, 5, -1]]} label="Determinan matriks dua satu tiga, nol minus dua empat, satu lima minus satu" /></Formula>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <p className="font-bold text-cyan-100">Diagonal turun</p>
                    <p className="mt-2 font-mono text-sm text-slate-200">(2)(−2)(−1) + (1)(4)(1) + (3)(0)(5) = 4 + 4 + 0 = 8</p>
                    <p className="mt-4 font-bold text-cyan-100">Diagonal naik</p>
                    <p className="mt-2 font-mono text-sm text-slate-200">(3)(−2)(1) + (1)(0)(−1) + (2)(4)(5) = −6 + 0 + 40 = 34</p>
                    <p className="mt-4 rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 font-mono text-emerald-50">det(A) = 8 − 34 = −26</p>
                  </div>
                </Example>

                <div className="space-y-3">
                  <h3 className="font-display text-lg font-bold text-cyan-100">B. Cara ekspansi dengan kofaktor dan minor</h3>
                  <h4 className="font-display font-bold text-cyan-100">1. Pengertian minor</h4>
                  <p className="text-sm leading-relaxed text-slate-300">Kita kenalan dulu dengan <strong className="text-cyan-100">minor</strong>. Minor <span className="font-mono text-white">Mᵢⱼ</span> adalah determinan yang tersisa setelah baris ke-i dan kolom ke-j dihapus. Pada matriks 3 × 3, minor menjadi determinan 2 × 2. Misalnya, untuk elemen baris kedua kolom kedua, hapus baris kedua dan kolom kedua—lalu lihat matriks kecil yang tertinggal!</p>
                  <Formula label="Contoh minor"><span>M₂₂ =</span><Determinant rows={[[<span>a</span>, <span>c</span>], [<span>g</span>, <span>i</span>]]} label="Minor dua dua berisi a c g i" /><span>= ai − cg</span></Formula>
                  <h4 className="font-display font-bold text-cyan-100">2. Kofaktor</h4>
                  <p className="text-sm leading-relaxed text-slate-300">Kofaktor adalah minor yang mendapat tanda sesuai posisinya. Untuk elemen pada baris ke-i dan kolom ke-j, gunakan <span className="font-mono text-white">Cᵢⱼ = (−1)ⁱ⁺ʲ Mᵢⱼ</span>. Pola tanda plus-minusnya membantu kita tetap di jalur!</p>
                  <CofactorSigns />
                  <h4 className="font-display font-bold text-cyan-100">3. Ekspansi dengan kofaktor-minor</h4>
                  <p className="text-sm leading-relaxed text-slate-300">Sekarang kita ekspansikan determinan! Pilih baris atau kolom mana pun, kalikan setiap elemen dengan kofaktornya, lalu jumlahkan hasilnya. Agar hitungan lebih ringkas, pilih baris atau kolom yang punya banyak nol—nol-nol itu akan membantu kita menghemat langkah.</p>
                  <Formula label="Ekspansi baris pertama"><span>det(A) = a₁₁M₁₁ − a₁₂M₁₂ + a₁₃M₁₃</span></Formula>
                </div>

                <Example number={9} title="Memahami ekspansi kofaktor-minor">
                  <p className="text-sm text-slate-300">Yuk, lihat pola lengkapnya! Untuk matriks umum A berordo 3 × 3 ini, ekspansikan determinan sepanjang baris pertama.</p>
                  <Formula><span>A =</span><Matrix rows={[[<span>a₁₁</span>, <span>a₁₂</span>, <span>a₁₃</span>], [<span>a₂₁</span>, <span>a₂₂</span>, <span>a₂₃</span>], [<span>a₃₁</span>, <span>a₃₂</span>, <span>a₃₃</span>]]} label="Matriks umum A tiga kali tiga" /></Formula>
                  <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[.025] p-4 text-sm leading-relaxed text-slate-300">
                    <p className="font-mono text-cyan-100">det(A) = a₁₁(a₂₂a₃₃ − a₂₃a₃₂) − a₁₂(a₂₁a₃₃ − a₂₃a₃₁) + a₁₃(a₂₁a₃₂ − a₂₂a₃₁)</p>
                    <p>Jika semua perkalian dibuka, diperoleh enam suku:</p>
                    <p className="font-mono text-cyan-100">= a₁₁a₂₂a₃₃ + a₁₂a₂₃a₃₁ + a₁₃a₂₁a₃₂ − a₁₃a₂₂a₃₁ − a₁₂a₂₁a₃₃ − a₁₁a₂₃a₃₂</p>
                    <p>Hasil ini sama dengan rumus Sarrus. Jika memilih kolom atau baris lain untuk ekspansi, nilai determinannya tetap sama.</p>
                  </div>
                </Example>

                <Example number={10} title="Serunya menghitung determinan dengan kofaktor">
                  <p className="text-sm text-slate-300">Ayo hitung <span className="font-mono text-white">|A|</span>! Kita pilih ekspansi baris pertama dan ikuti tanda kofaktornya dengan teliti.</p>
                  <Formula><span>A =</span><Determinant rows={[[3, 2, -1], [1, -2, 4], [5, 0, 2]]} label="Determinan A, tiga dua minus satu; satu minus dua empat; lima nol dua" /></Formula>
                  <div className="space-y-2 text-sm leading-relaxed text-slate-300">
                    <p className="font-mono text-cyan-100">det(A) = 3[(-2)(2) − (4)(0)] − 2[(1)(2) − (4)(5)] + (−1)[(1)(0) − (−2)(5)]</p>
                    <p className="font-mono text-cyan-100">= 3(−4) − 2(−18) + (−1)(10)</p>
                    <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 font-mono text-emerald-50">= −12 + 36 − 10 = 14</p>
                  </div>
                </Example>

                <Example number={11} title="Tantangan determinan matriks 4 × 4">
                  <p className="text-sm leading-relaxed text-slate-300">Siap menghadapi tantangan 4 × 4? Ekspansi kofaktor tetap bisa dipakai. Pilih baris atau kolom dengan banyak nol supaya langkahnya lebih sedikit, lalu hitung determinan 3 × 3 yang tersisa dengan Sarrus.</p>
                  <Formula><span>A =</span><Matrix rows={[[1, 2, 0, 1], [0, 3, 0, 0], [2, -1, 4, 2], [1, 5, 0, -2]]} label="Matriks empat kali empat dengan baris kedua memuat tiga nol" /></Formula>
                  <p className="text-sm text-slate-300">Ekspansi pada baris kedua hanya menyisakan elemen 3 di kolom kedua. Tanda kofaktornya positif karena 2 + 2 genap.</p>
                  <Formula><span>det(A) = 3</span><Determinant rows={[[1, 0, 1], [2, 4, 2], [1, 0, -2]]} label="Minor matriks tiga kali tiga setelah menghapus baris kedua kolom kedua" /></Formula>
                  <p className="text-sm leading-relaxed text-slate-300">Dengan Sarrus, minor tersebut bernilai <span className="font-mono text-white">−12</span>. Jadi, <span className="font-mono text-white">det(A) = 3(−12) = −36</span>.</p>
                </Example>
              </div>
            </section>

            <section id="properties" className="scroll-mt-8 space-y-5">
              <Heading number="4.1.4" title="Sifat-sifat determinan matriks persegi" intro="Ada kabar gembira: sifat-sifat determinan bisa memangkas banyak langkah! Kita tidak selalu perlu menghitung semua suku dari awal." />
              <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                <ol className="space-y-3">
                  <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-cyan-100">Sifat 1 · Transpose</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">Nilai determinan tidak berubah jika matriks ditranspose: <span className="font-mono text-white">det(Aᵀ) = det(A)</span>. Ini berarti baris dan kolom dapat dipertukarkan sekaligus tanpa mengubah nilainya.</p></li>
                  <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-cyan-100">Sifat 2 · Baris atau kolom nol</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">Jika semua elemen pada suatu baris atau kolom bernilai nol, maka determinannya nol.</p></li>
                  <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-cyan-100">Sifat 3 · Pertukaran dua baris/kolom</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">Jika dua baris atau dua kolom ditukar, tanda determinan berubah: determinan baru adalah negatif determinan semula.</p></li>
                  <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-cyan-100">Sifat 4 · Baris/kolom sama atau sebanding</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">Jika dua baris atau kolom sama, determinan bernilai nol. Hal yang sama berlaku jika salah satunya merupakan kelipatan yang lain.</p></li>
                  <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-cyan-100">Sifat 5 · Mengalikan satu baris/kolom dengan k</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">Jika setiap elemen pada satu baris atau kolom dikalikan bilangan k, determinan juga dikalikan k.</p></li>
                  <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-cyan-100">Sifat 6 · Kelinearan pada satu baris/kolom</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">Jika satu baris atau kolom merupakan jumlah dua vektor, determinannya dapat diuraikan menjadi jumlah dua determinan, masing-masing memakai salah satu vektor tersebut pada posisi yang sama.</p></li>
                  <li className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-cyan-100">Sifat 7 · Menambahkan kelipatan baris/kolom lain</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">Jika satu baris atau kolom ditambah k kali baris atau kolom lain, nilai determinan tidak berubah. Operasi baris ini sering dipakai untuk membuat nol agar perhitungan lebih mudah.</p></li>
                </ol>
              </div>

              <Example number={12} title="Yuk, manfaatkan sifat-sifat determinan!">
                <p className="text-sm text-slate-300">Ayo tentukan nilai x tanpa menghitung determinan panjang lebar. Perhatikan pola baris dan kolomnya!</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h4 className="font-display font-bold text-cyan-100">a · Menemukan x dari kolom sebanding</h4>
                    <Formula><Determinant rows={[[1, 2, 4], [3, -1, -2], [2, 5, <span>2x</span>]]} label="Determinan dengan elemen baris ketiga kolom ketiga dua x" /><span>= 0</span></Formula>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">Ekspansi baris pertama memberi <span className="font-mono text-white">(−2x+10)−2(6x+4)+4(17)=0</span>, sehingga <span className="font-mono text-white">−14x+70=0</span> dan <span className="font-mono text-white">x=5</span>. Saat x = 5, kolom ketiga adalah <span className="font-mono text-white">(4,−2,10)=2(2,−1,5)</span>; dua kolom sebanding membuat determinan nol.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h4 className="font-display font-bold text-cyan-100">b · Menemukan x dari baris sebanding</h4>
                    <Formula><Determinant rows={[[2, 1, 3], [4, <span>x</span>, 6], [1, 0, 1]]} label="Determinan dengan x pada baris kedua kolom kedua" /><span>= 0</span></Formula>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">Ekspansi baris pertama menghasilkan <span className="font-mono text-white">2x−(4−6)+3(−x)=0</span>, jadi <span className="font-mono text-white">2−x=0</span> dan <span className="font-mono text-white">x=2</span>. Baris kedua lalu menjadi dua kali baris pertama, sehingga determinannya nol sesuai sifat 4.</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                  <h4 className="font-display font-bold text-cyan-100">Sifat 6 · Baris yang merupakan jumlah dua baris</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Sebagai contoh, baris ketiga <span className="font-mono text-white">(4,1,4)</span> pada matriks <span className="font-mono text-white">[[1,2,0],[3,−1,4],[4,1,4]]</span> adalah jumlah baris pertama dan kedua. Kelinearan determinan menguraikannya menjadi dua determinan, masing-masing memuat dua baris yang sama; keduanya bernilai nol.</p>
                </div>
                <p className="rounded-xl border border-amber-200/15 bg-amber-200/[.045] p-3 text-sm leading-relaxed text-amber-50/90">Tips jitu: jika diminta mencari x, gunakan sifat-sifat determinan untuk menyederhanakan bentuknya terlebih dahulu. Jangan buru-buru mengembangkan semua diagonal—kita bisa memilih jalan yang lebih ringkas!</p>
              </Example>
            </section>

            <section id="spltv" className="scroll-mt-8 space-y-5">
              <Heading number="4.1.5" title="Penerapan determinan untuk menyelesaikan SPLTV" intro="Aturan Cramer juga bisa membantu kita menaklukkan tiga variabel! Ganti kolom variabel yang dicari dengan kolom konstanta, lalu bagi determinannya dengan determinan koefisien." />
              <div className="space-y-4 rounded-3xl border border-violet-200/15 bg-violet-200/[.04] p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300">Misalkan SPLTV memiliki matriks koefisien A dan vektor konstanta B. Determinan D adalah det(A). Untuk memperoleh Dₓ, Dᵧ, dan D𝓏, ganti berturut-turut kolom x, y, dan z dengan B. Jika D ≠ 0, kita mendapatkan satu penyelesaian seperti berikut. Yuk, kita coba!</p>
                <Formula label="Aturan Cramer untuk SPLTV"><span>x = Dₓ/D</span><span>·</span><span>y = Dᵧ/D</span><span>·</span><span>z = D𝓏/D</span></Formula>
                <Example number={13} title="Ayo, selesaikan SPLTV dengan aturan Cramer!">
                  <p className="text-sm text-slate-300">Tantangan tiga variabel! Selesaikan sistem <span className="font-mono text-white">x + y + z = 6</span>, <span className="font-mono text-white">2x − y + z = 3</span>, dan <span className="font-mono text-white">x + 2y − z = 2</span>.</p>
                  <p className="text-sm text-slate-300">Kita susun matriks koefisien dan konstanta:</p>
                  <Formula><Matrix rows={[[1, 1, 1], [2, -1, 1], [1, 2, -1]]} label="Matriks koefisien sistem tiga variabel" /><Matrix rows={[[<span>x</span>], [<span>y</span>], [<span>z</span>]]} label="Vektor variabel x y z" /><span>=</span><Matrix rows={[[6], [3], [2]]} label="Vektor konstanta enam tiga dua" /></Formula>
                  <div className="space-y-3 text-sm text-slate-300">
                    <p className="font-mono text-cyan-100">D = det([[1,1,1],[2,−1,1],[1,2,−1]]) = 7</p>
                    <p className="font-mono text-cyan-100">Dₓ = det([[6,1,1],[3,−1,1],[2,2,−1]]) = 7 → x = 7/7 = 1</p>
                    <p className="font-mono text-cyan-100">Dᵧ = det([[1,6,1],[2,3,1],[1,2,−1]]) = 14 → y = 14/7 = 2</p>
                    <p className="font-mono text-cyan-100">D𝓏 = det([[1,1,6],[2,−1,3],[1,2,2]]) = 21 → z = 21/7 = 3</p>
                  </div>
                  <p className="flex items-center gap-2 rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-sm text-emerald-50"><Check className="h-4 w-4 shrink-0" aria-hidden="true" />Berhasil! HP = <strong>{`{(1, 2, 3)}`}</strong>.</p>
                </Example>

                <Example number={14} title="Mengubah soal cerita menjadi SPLTV">
                  <p className="text-sm leading-relaxed text-slate-300">Sekarang kita pakai matematika untuk membaca cerita! Dalam sebuah segitiga, sudut terbesar 6° lebih besar daripada tiga kali sudut terkecil. Sudut tengah 24° lebih besar daripada dua kali sudut terkecil. Yuk, tentukan besar ketiga sudutnya.</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <p>Misalkan <span className="font-mono text-white">a</span> adalah sudut terbesar, <span className="font-mono text-white">b</span> sudut tengah, dan <span className="font-mono text-white">c</span> sudut terkecil. Jumlah sudut segitiga 180°, jadi <span className="font-mono text-white">a+b+c=180</span>. Dua informasi lainnya memberi <span className="font-mono text-white">a−3c=6</span> dan <span className="font-mono text-white">b−2c=24</span>.</p>
                    <p>Asyik, model SPLTV-nya sudah terbentuk: <span className="font-mono text-white">a+b+c=180</span>, <span className="font-mono text-white">a−3c=6</span>, <span className="font-mono text-white">b−2c=24</span>.</p>
                    <Formula><Matrix rows={[[1, 1, 1], [1, 0, -3], [0, 1, -2]]} label="Matriks koefisien untuk sudut a b c" /><Matrix rows={[[<span>a</span>], [<span>b</span>], [<span>c</span>]]} label="Vektor sudut a b c" /><span>=</span><Matrix rows={[[180], [6], [24]]} label="Vektor konstanta 180, 6, 24" /></Formula>
                    <p className="font-mono text-cyan-100">D = det([[1,1,1],[1,0,−3],[0,1,−2]]) = 6</p>
                    <p className="font-mono text-cyan-100">Dₐ = det([[180,1,1],[6,0,−3],[24,1,−2]]) = 486</p>
                    <p className="font-mono text-cyan-100">Dᵦ = det([[1,180,1],[1,6,−3],[0,24,−2]]) = 444</p>
                    <p className="font-mono text-cyan-100">D𝒸 = det([[1,1,180],[1,0,6],[0,1,24]]) = 150</p>
                    <p className="font-mono text-cyan-100">a = 486/6 = 81°, b = 444/6 = 74°, c = 150/6 = 25°</p>
                    <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-emerald-50">Tepat sekali! Sudut terbesar 81°, sudut tengah 74°, dan sudut terkecil 25°. Ketiganya berjumlah 180° dan memenuhi semua informasi soal.</p>
                  </div>
                </Example>
              </div>
            </section>

            <section id="inverse2" className="scroll-mt-8 space-y-5">
              <Heading number="4.2" title="Invers matriks persegi" intro="Sekarang kita berkenalan dengan invers matriks! Gagasan kebalikan pada perkalian bilangan juga berlaku untuk matriks persegi. Tidak semua matriks punya invers—determinan menjadi petunjuk utamanya." />
              <div className="space-y-4 rounded-3xl border border-emerald-200/15 bg-emerald-200/[.035] p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300">Untuk bilangan real a ≠ 0, ada kebalikan <span className="font-mono text-white">a⁻¹</span> yang memenuhi <span className="font-mono text-white">a·a⁻¹ = a⁻¹·a = 1</span>. Pada matriks, angka 1 digantikan oleh matriks identitas I. Matriks M⁻¹ disebut invers M jika memenuhi kedua persamaan berikut. Perhatikan, perkaliannya berlaku dari dua arah!</p>
                <Formula label="Definisi invers matriks"><span>M·M⁻¹ = M⁻¹·M = I</span></Formula>
                <p className="text-sm leading-relaxed text-slate-300">Jika matriks persegi memiliki invers, matriks itu disebut <strong className="text-emerald-100">nonsingular</strong>. Sebaliknya, jika determinannya nol, matriks disebut <strong className="text-emerald-100">singular</strong> dan tidak memiliki invers. Jadi, cek determinan dulu, ya!</p>
                <h3 className="font-display text-lg font-bold text-emerald-100">4.2.1 · Invers matriks persegi berordo 2 × 2</h3>
                <Example number={15} title="Menemukan invers matriks 2 × 2">
                  <p className="text-sm text-slate-300">Untuk matriks A berordo 2 × 2, kita bisa menemukan invers dengan langkah yang mudah diingat: tukar elemen diagonal utama, ubah tanda elemen lainnya, lalu bagi dengan determinan.</p>
                  <Formula label="Rumus invers 2 × 2">
                    <span>A =</span><Matrix rows={[[<span>a</span>, <span>b</span>], [<span>c</span>, <span>d</span>]]} label="Matriks dua kali dua a b c d" />
                    <span>→ A⁻¹ = 1/(ad−bc)</span><Matrix rows={[[<span>d</span>, <span>−b</span>], [<span>−c</span>, <span>a</span>]]} label="Adjoin matriks a b c d" />
                  </Formula>
                  <p className="text-sm leading-relaxed text-slate-300">Ingat, rumus ini berlaku jika <span className="font-mono text-white">det(A)=ad−bc ≠ 0</span>. Adjoin A untuk ordo 2 × 2 diperoleh dari kofaktor dengan menukar posisi elemen diagonal utama. Coba cocokkan langkahnya dengan dua contoh berikut!</p>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                      <p className="mb-2 font-bold text-emerald-100">a</p>
                      <p className="text-sm text-slate-300">Diketahui <span className="font-mono text-white">M = [[2,3],[1,2]]</span>.</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300"><span className="font-mono text-white">det(M)=2(2)−3(1)=1</span>, sehingga M memiliki invers.</p>
                      <Formula><span>M⁻¹ =</span><Matrix rows={[[2, -3], [-1, 2]]} label="Invers matriks M" /></Formula>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                      <p className="mb-2 font-bold text-emerald-100">b</p>
                      <p className="text-sm text-slate-300">Diketahui <span className="font-mono text-white">N = [[2,−4],[3,6]]</span>.</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300"><span className="font-mono text-white">det(N)=2(6)−(−4)(3)=24</span>. Karena det(N) ≠ 0, N memiliki invers.</p>
                      <Formula><span>N⁻¹ = 1/24</span><Matrix rows={[[6, 4], [-3, 2]]} label="Adjoin matriks N" /></Formula>
                    </div>
                  </div>
                </Example>
              </div>

              <div className="space-y-4 rounded-3xl border border-violet-200/15 bg-violet-200/[.04] p-4 sm:p-5">
                <h3 className="font-display text-lg font-bold text-violet-100">B. Invers matriks 2 × 2 dengan eliminasi Gauss–Jordan</h3>
                <p className="text-sm leading-relaxed text-slate-300">Ada cara lain yang tak kalah seru untuk mencari invers: gabungkan matriks A dengan matriks identitas I yang berordo sama. Bentuk ini disebut matriks augmented <span className="font-mono text-white">[A | I]</span>. Gunakan operasi baris elementer untuk mengubah bagian kiri menjadi I; jika berhasil, bagian kanan akan menjadi A⁻¹.</p>
                <Formula label="Prosedur Gauss–Jordan"><span>[A | I] → [I | A⁻¹]</span></Formula>
                <p className="text-sm leading-relaxed text-slate-300">Operasi baris elementer yang boleh kita lakukan adalah menukar dua baris, mengalikan sebuah baris dengan skalar bukan nol, atau menambahkan kelipatan sebuah baris ke baris lain. Setelah selesai, cek <span className="font-mono text-white">AA⁻¹</span>; hasilnya harus I. Yuk, pastikan jawabannya benar!</p>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <h4 className="font-display font-bold text-amber-100">Cek jawabanmu di sini!</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Jika diagonal utama matriks kiri sudah 1 dan elemen di luar diagonal sudah 0, sisi kiri menjadi I. Pastikan proses yang sama dilakukan pada seluruh baris matriks kanan.</p>
                  <p className="mt-2 font-mono text-sm text-amber-50">AA⁻¹ = I dan A⁻¹A = I</p>
                </div>
                <Example number={16} title="Mencari invers dengan eliminasi Gauss–Jordan">
                  <p className="text-sm text-slate-300">Ayo tentukan invers <span className="font-mono text-white">A = [[3,1],[2,1]]</span> dengan mengikuti operasi barisnya satu per satu.</p>
                  <div className="space-y-3">
                    <Formula label="Gabungkan A dengan I"><span>[A | I] =</span><Matrix rows={[[3, 1, "|", 1, 0], [2, 1, "|", 0, 1]]} label="Matriks augmented A dan identitas" /></Formula>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Langkah 1 · R₁ ← ⅓R₁</p><Formula><Matrix rows={[[1, "⅓", "|", "⅓", 0], [2, 1, "|", 0, 1]]} label="Hasil langkah satu" /></Formula></div>
                      <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Langkah 2 · R₂ ← R₂ − 2R₁</p><Formula><Matrix rows={[[1, "⅓", "|", "⅓", 0], [0, "⅓", "|", "−⅔", 1]]} label="Hasil langkah dua" /></Formula></div>
                      <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Langkah 3 · R₂ ← 3R₂</p><Formula><Matrix rows={[[1, "⅓", "|", "⅓", 0], [0, 1, "|", -2, 3]]} label="Hasil langkah tiga" /></Formula></div>
                      <div className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.05] p-3"><p className="text-xs font-bold uppercase tracking-wider text-emerald-100">Langkah 4 · R₁ ← R₁ − ⅓R₂</p><Formula><Matrix rows={[[1, 0, "|", 1, -1], [0, 1, "|", -2, 3]]} label="Identitas di kiri, invers di kanan" /></Formula></div>
                    </div>
                    <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-sm text-emerald-50">Berhasil! <span className="font-mono font-bold">A⁻¹ = [[1,−1],[−2,3]]</span>. Jika dikalikan dengan A, hasilnya matriks identitas.</p>
                  </div>
                </Example>

                <Example number={17} title="Latihan OBE untuk invers matriks 2 × 2">
                  <p className="text-sm text-slate-300">Sekarang giliranmu mencoba! Tentukan invers <span className="font-mono text-white">A = [[1,2],[3,7]]</span> menggunakan operasi baris elementer.</p>
                  <div className="space-y-3">
                    <Formula><Matrix rows={[[1, 2, "|", 1, 0], [3, 7, "|", 0, 1]]} label="Augmented matriks A dan identitas" /></Formula>
                    <p className="text-sm text-slate-300">Agar sisi kiri menjadi I, hilangkan angka 3 di bawah pivot pertama, lalu angka 2 di atas pivot kedua:</p>
                    <Formula><span>R₂ ← R₂ − 3R₁</span><span>→</span><Matrix rows={[[1, 2, "|", 1, 0], [0, 1, "|", -3, 1]]} label="Hasil setelah menghilangkan elemen bawah pivot" /></Formula>
                    <Formula><span>R₁ ← R₁ − 2R₂</span><span>→</span><Matrix rows={[[1, 0, "|", 7, -2], [0, 1, "|", -3, 1]]} label="Matriks identitas di kiri dan invers di kanan" /></Formula>
                    <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-sm text-emerald-50">Tada! Inversnya adalah <span className="font-mono font-bold">A⁻¹ = [[7,−2],[−3,1]]</span>.</p>
                  </div>
                </Example>

                <Example number={18} title="Mengecek matriks yang tidak memiliki invers">
                  <p className="text-sm text-slate-300">Yuk, cek apakah <span className="font-mono text-white">N = [[3,1],[6,2]]</span> mempunyai invers.</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <p>Determinan N adalah <span className="font-mono text-white">3(2) − 1(6) = 0</span>. Jadi, N singular dan tidak memiliki invers.</p>
                    <p>Hal yang sama terlihat dengan Gauss–Jordan:</p>
                    <Formula><Matrix rows={[[3, 1, "|", 1, 0], [6, 2, "|", 0, 1]]} label="Matriks augmented N dan identitas" /><span>R₂ ← R₂ − 2R₁</span><span>→</span><Matrix rows={[[3, 1, "|", 1, 0], [0, 0, "|", -2, 1]]} label="Baris nol di sisi kiri dan elemen bukan nol di sisi kanan" /></Formula>
                    <p>Baris kedua meminta <span className="font-mono text-white">0 = −2</span> sekaligus <span className="font-mono text-white">0 = 1</span>, yang mustahil. Karena bagian kiri tidak dapat diubah menjadi I, invers tidak ada.</p>
                  </div>
                </Example>
              </div>
            </section>

            <section id="inverse3" className="scroll-mt-8 space-y-5">
              <Heading number="4.2.2" title="Invers matriks persegi 3 × 3" intro="Kita lanjut ke invers matriks 3 × 3! Ada dua cara yang bisa dipilih: rumus determinan dan adjoin, atau eliminasi Gauss–Jordan. Keduanya berangkat dari syarat AA⁻¹ = I." />
              <div className="space-y-5 rounded-3xl border border-violet-200/15 bg-violet-200/[.04] p-4 sm:p-5">
                <div className="space-y-3">
                  <h3 className="font-display text-lg font-bold text-violet-100">A. Rumus invers matriks 3 × 3 dengan adjoin</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Untuk matriks persegi A berordo 3 × 3, bagi adjoin A dengan determinan A untuk mendapatkan invers. Adjoin adalah transpose dari matriks kofaktor. Determinannya bisa dicari dengan Sarrus atau ekspansi kofaktor-minor—pilih cara yang paling nyaman!</p>
                  <Formula label="Rumus invers melalui adjoin"><span>A⁻¹ = 1/det(A) · Adj(A)</span><span className="text-slate-400">, dengan det(A) ≠ 0</span></Formula>
                </div>
                <Example number={19} title="Ayo, cari invers 3 × 3 dengan rumus adjoin!">
                  <p className="text-sm text-slate-300">Mari ikuti langkahnya untuk menemukan invers matriks <span className="font-mono text-white">M = [[1,0,1],[2,1,0],[0,1,1]]</span>.</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <p>Langkah pertama, hitung determinannya dengan Sarrus:</p>
                    <Formula><span>det(M) = 1(1)(1) + 0(0)(0) + 1(2)(1) − 1(1)(0) − 0(2)(1) − 1(0)(1) = 3</span></Formula>
                    <p>Berikutnya, hapus baris dan kolom yang bersangkutan untuk memperoleh minor, lalu beri tanda kofaktor. Ayo lengkapi kesembilan kofaktor M berikut:</p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <p className="rounded-lg bg-white/[.025] p-2 font-mono text-xs text-cyan-100">C₁₁ = +det[[1,0],[1,1]] = 1</p>
                      <p className="rounded-lg bg-white/[.025] p-2 font-mono text-xs text-cyan-100">C₁₂ = −det[[2,0],[0,1]] = −2</p>
                      <p className="rounded-lg bg-white/[.025] p-2 font-mono text-xs text-cyan-100">C₁₃ = +det[[2,1],[0,1]] = 2</p>
                      <p className="rounded-lg bg-white/[.025] p-2 font-mono text-xs text-cyan-100">C₂₁ = −det[[0,1],[1,1]] = 1</p>
                      <p className="rounded-lg bg-white/[.025] p-2 font-mono text-xs text-cyan-100">C₂₂ = +det[[1,1],[0,1]] = 1</p>
                      <p className="rounded-lg bg-white/[.025] p-2 font-mono text-xs text-cyan-100">C₂₃ = −det[[1,0],[0,1]] = −1</p>
                      <p className="rounded-lg bg-white/[.025] p-2 font-mono text-xs text-cyan-100">C₃₁ = +det[[0,1],[1,0]] = −1</p>
                      <p className="rounded-lg bg-white/[.025] p-2 font-mono text-xs text-cyan-100">C₃₂ = −det[[1,1],[2,0]] = 2</p>
                      <p className="rounded-lg bg-white/[.025] p-2 font-mono text-xs text-cyan-100">C₃₃ = +det[[1,0],[2,1]] = 1</p>
                    </div>
                    <Formula label="Matriks kofaktor"><Matrix rows={[[1, -2, 2], [1, 1, -1], [-1, 2, 1]]} label="Matriks kofaktor M" /></Formula>
                    <p>Bagus! Sekarang transpose matriks kofaktor untuk memperoleh adjoin:</p>
                    <Formula><span>Adj(M) =</span><Matrix rows={[[1, 1, -1], [-2, 1, 2], [2, -1, 1]]} label="Adjoin M" /></Formula>
                    <p className="text-sm text-slate-300">Karena det(M) = 3 ≠ 0, M mempunyai invers.</p>
                    <Formula label="Invers M"><span>M⁻¹ = ⅓</span><Matrix rows={[[1, 1, -1], [-2, 1, 2], [2, -1, 1]]} label="Sepertiga kali matriks adjoin M" /></Formula>
                    <p className="text-sm text-slate-300">Bentuk pecahan per elemen: baris pertama <span className="font-mono text-white">(⅓, ⅓, −⅓)</span>, baris kedua <span className="font-mono text-white">(−⅔, ⅓, ⅔)</span>, dan baris ketiga <span className="font-mono text-white">(⅔, −⅓, ⅓)</span>.</p>
                  </div>
                </Example>

                <div className="space-y-3">
                  <h3 className="font-display text-lg font-bold text-violet-100">B. Invers matriks 3 × 3 dengan eliminasi Gauss–Jordan</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Prinsipnya sama seperti pada invers 2 × 2. Susun matriks augmented <span className="font-mono text-white">[A | I]</span>, lalu gunakan OBE sampai bagian kiri menjadi I. Matriks di sebelah kanan pada akhir proses adalah A⁻¹. Kita coba bersama, yuk!</p>
                  <Formula label="Bentuk awal dan bentuk akhir"><span>[A | I] → [I | A⁻¹]</span></Formula>
                </div>

                <Example number={20} title="Tantangan terakhir: invers 3 × 3 dengan OBE">
                  <p className="text-sm text-slate-300">Tantangan terakhir, semangat! Temukan invers <span className="font-mono text-white">A = [[1,1,0],[0,1,1],[1,0,1]]</span> dengan eliminasi Gauss–Jordan.</p>
                  <div className="space-y-4">
                    <Formula label="Matriks augmented awal"><Matrix rows={[[1, 1, 0, "|", 1, 0, 0], [0, 1, 1, "|", 0, 1, 0], [1, 0, 1, "|", 0, 0, 1]]} label="Augmented matriks A dan identitas tiga kali tiga" /></Formula>
                    <div className="space-y-3">
                      <div className="rounded-xl border border-white/10 bg-white/[.025] p-3">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Langkah 1 · R₃ ← R₃ − R₁, lalu R₃ ← R₃ + R₂</p>
                        <Formula><Matrix rows={[[1, 1, 0, "|", 1, 0, 0], [0, 1, 1, "|", 0, 1, 0], [0, 0, 2, "|", -1, 1, 1]]} label="Augmented matrix setelah dua operasi baris" /></Formula>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[.025] p-3">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Langkah 2 · R₃ ← ½R₃</p>
                        <Formula><Matrix rows={[[1, 1, 0, "|", 1, 0, 0], [0, 1, 1, "|", 0, 1, 0], [0, 0, 1, "|", "−½", "½", "½"]]} label="Pivot ketiga menjadi satu" /></Formula>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[.025] p-3">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Langkah 3 · R₂ ← R₂ − R₃, lalu R₁ ← R₁ − R₂</p>
                        <Formula><Matrix rows={[[1, 0, 0, "|", "½", "−½", "½"], [0, 1, 0, "|", "½", "½", "−½"], [0, 0, 1, "|", "−½", "½", "½"]]} label="Identitas di sebelah kiri dan invers di kanan" /></Formula>
                      </div>
                    </div>
                    <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-sm leading-relaxed text-emerald-50">Jadi, <span className="font-mono font-bold">A⁻¹ = [[½,−½,½],[½,½,−½],[−½,½,½]]</span>. Untuk mengecek, kalikan A dengan hasil invers; setiap elemen diagonal menjadi 1 dan elemen lainnya 0.</p>
                  </div>
                </Example>

                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <h3 className="font-display font-bold text-amber-100">Bekal penting: sifat-sifat invers matriks persegi</h3>
                  <ol className="mt-3 list-[lower-roman] space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-amber-200">
                    <li>Matriks A nonsingular (mempunyai invers) jika dan hanya jika <span className="font-mono text-white">det(A) ≠ 0</span>.</li>
                    <li>Jika A memiliki invers, maka inversnya tunggal dan <span className="font-mono text-white">AA⁻¹ = A⁻¹A = I</span>.</li>
                    <li>Invers dari invers matriks adalah matriks semula: <span className="font-mono text-white">(A⁻¹)⁻¹ = A</span>.</li>
                    <li>Determinan invers adalah kebalikan determinan: <span className="font-mono text-white">det(A⁻¹)=1/det(A)</span>.</li>
                    <li>Invers hasil kali membalik urutan: <span className="font-mono text-white">(AB)⁻¹ = B⁻¹A⁻¹</span>, jika A dan B keduanya mempunyai invers.</li>
                    <li>Invers transpose adalah transpose invers: <span className="font-mono text-white">(Aᵀ)⁻¹ = (A⁻¹)ᵀ</span>.</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-amber-200/20 bg-[linear-gradient(135deg,rgba(120,79,24,.18),rgba(14,25,42,.9))] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-200/20 bg-amber-200/[.08] text-amber-100"><Sparkles className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <h2 className="font-display text-xl font-extrabold text-white sm:text-2xl">Hebat! Kamu sudah menuntaskan perjalanan determinan dan invers!</h2>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Determinan hanya untuk matriks persegi; untuk 2 × 2 gunakan ad − bc.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Matriks 3 × 3 bisa dihitung dengan Sarrus atau ekspansi kofaktor-minor, sedangkan determinan 4 × 4 dapat diekspansi ke determinan 3 × 3.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Aturan Cramer menyelesaikan SPLDV dan SPLTV jika determinan koefisien tidak nol.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Invers ada tepat saat determinan tidak nol; cari dengan rumus adjoin atau Gauss–Jordan, lalu cek hasilnya dengan perkalian ke I.</li>
                  </ul>
                  <a href="#det2" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-100 hover:text-white">Siap berlatih lagi? Mulai dari determinan 2 × 2 <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                </div>
              </div>
            </section>
          </div>

          <aside className="hidden desktop:block">
            <nav aria-label="Daftar isi materi" className="sticky top-6 rounded-2xl border border-white/10 bg-[#0b1628]/90 p-4 backdrop-blur">
              <h2 className="mb-3 font-display text-sm font-bold text-cyan-100">Peta petualangan</h2>
              <ul className="space-y-1">{outline.map(([label, id]) => <li key={id}><a href={`#${id}`} className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-cyan-200/[.08] hover:text-cyan-100">{label}</a></li>)}</ul>
            </nav>
          </aside>
        </div>
      </main>
    </div>
  );
}
