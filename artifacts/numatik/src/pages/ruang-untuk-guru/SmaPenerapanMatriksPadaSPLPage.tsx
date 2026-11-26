import type { ReactNode } from "react";
import { ArrowRight, BookOpen, Check, Sparkles } from "lucide-react";
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

function EquationSystem({ equations }: { equations: ReactNode[] }) {
  return (
    <span className="inline-flex items-center gap-3 align-middle">
      <span aria-hidden="true" className="font-serif text-5xl leading-none text-cyan-200">{'{'}</span>
      <span className="flex flex-col gap-1 font-mono text-sm leading-relaxed text-cyan-100 sm:text-base">
        {equations.map((equation, index) => <span key={index}>{equation}</span>)}
      </span>
    </span>
  );
}

function SolutionCasesDiagram() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-3">
      <svg viewBox="0 0 900 250" role="img" aria-label="Tiga kemungkinan grafik sistem persamaan linear: dua garis berpotongan, sejajar, atau berhimpit" className="mx-auto h-auto min-w-[700px] w-full max-w-5xl">
        <title>Tiga kemungkinan penyelesaian sistem dua persamaan linear</title>
        {[0, 1, 2].map((panel) => {
          const x = 18 + panel * 294;
          return (
            <g key={panel}>
              <rect x={x} y="8" width="276" height="228" rx="16" fill="#0f172a" fillOpacity=".62" stroke="#94a3b8" strokeOpacity=".2" />
              <text x={x + 138} y="32" fill="#a5f3fc" fontSize="14" fontWeight="700" textAnchor="middle">
                {["Satu solusi", "Tidak ada solusi", "Tak terhingga solusi"][panel]}
              </text>
              <path d={`M${x + 40} 195H${x + 244}M${x + 74} 208V52`} fill="none" stroke="#94a3b8" strokeOpacity=".65" strokeWidth="1.5" />
            </g>
          );
        })}
        <path d="M75 174L260 75M100 78L245 174" fill="none" stroke="#34d399" strokeWidth="3" />
        <path d="M370 178L555 80M370 140L555 42" fill="none" stroke="#fb7185" strokeWidth="3" />
        <path d="M665 174L850 76" fill="none" stroke="#34d399" strokeWidth="4" />
        <path d="M665 174L850 76" fill="none" stroke="#fbbf24" strokeDasharray="7 6" strokeWidth="2" />
        <circle cx="166" cy="125" r="5" fill="#fbbf24" />
        <text x="452" y="218" fill="#cbd5e1" fontSize="11" textAnchor="middle">garis sejajar tidak berpotongan</text>
        <text x="752" y="218" fill="#cbd5e1" fontSize="11" textAnchor="middle">kedua garis bertumpuk</text>
      </svg>
    </div>
  );
}

const outline = [
  ["Satu persamaan, dua variabel", "pldv"],
  ["SPLDV dan solusi matriks", "spldv"],
  ["Eliminasi Gauss–Jordan", "gauss-jordan"],
  ["Tiga persamaan, dua variabel", "three-two"],
  ["SPLTV", "spltv"],
];

export default function SmaPenerapanMatriksPadaSPLPage() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/matriks/determinan-dan-invers-matriks" />
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
              <p className="font-body text-xs font-bold uppercase tracking-[.24em]">Matriks siap membantu kita menemukan solusi!</p>
            </div>
            <p className="mb-2 font-mono text-xs font-bold tracking-[.22em] text-cyan-100">BAB 4.2.4</p>
            <h1 className="font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">
              Penerapan Matriks <span className="text-cyan-200">pada SPL</span>
            </h1>
            <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
              Yuk, ubah persamaan menjadi matriks, kenali kapan solusinya tunggal, tidak ada, atau tak terhingga, lalu selesaikan SPLDV dan SPLTV dengan invers maupun eliminasi Gauss–Jordan. Semua konsep dan contoh kita bahas langkah demi langkah!
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["PLDV", "SPLDV", "Invers dan Cramer", "Gauss–Jordan", "SPLTV", "Soal kontekstual"].map((item) => (
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
            <section className="scroll-mt-8 space-y-5">
              <Heading number="4.2.4" title="Menerapkan konsep matriks untuk menyelesaikan SPL" intro="Siap berpetualang dengan matriks? Kita akan mengubah SPLDV dan SPLTV ke bentuk yang lebih rapi, lalu menemukan solusinya lewat invers, eliminasi Gauss–Jordan, dan aturan Cramer. Kita mulai dari yang sederhana, kemudian menaklukkan tantangan berikutnya bersama-sama!" />

              <div id="pldv" className="scroll-mt-8 space-y-4 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                <h3 className="font-display text-lg font-bold text-cyan-100">A. Persamaan linear dengan dua variabel (PLDV)</h3>
                <p className="text-sm leading-relaxed text-slate-300">Kita mulai dari bentuk dasarnya, yaitu <span className="font-mono text-white">ax + by = c</span>, dengan a, b, dan c bilangan real serta a dan b tidak keduanya nol. Satu persamaan seperti ini biasanya memiliki tak terhingga banyak pasangan penyelesaian. Serunya, semua pasangan itu dapat digambarkan sebagai titik-titik pada satu garis lurus!</p>
                <p className="text-sm leading-relaxed text-slate-300">Untuk menemukan semua pasangan tersebut, jika <span className="font-mono text-white">a ≠ 0</span>, pilih <span className="font-mono text-white">y = t</span>. Lalu <span className="font-mono text-white">x = c/a − (b/a)t</span>. Jika a = 0, maka b ≠ 0, sehingga y = c/b dan x dapat dipilih bebas. Mudah, kan?</p>
                <Formula label="Solusi parametrik umum saat a ≠ 0">
                  <Matrix rows={[[<span>x</span>], [<span>y</span>]]} label="Vektor variabel x dan y" />
                  <span>=</span>
                  <Matrix rows={[[<span>c/a</span>], [0]]} label="Vektor konstanta c per a dan nol" />
                  <span>+</span><span>t</span>
                  <Matrix rows={[[<span>−b/a</span>], [1]]} label="Vektor arah minus b per a dan satu" />
                  <span>, t ∈ ℝ</span>
                </Formula>
                <p className="text-sm leading-relaxed text-slate-300">Biar makin kebayang, lihat <span className="font-mono text-white">3x + 2y = 12</span>. Kita bisa menuliskannya sebagai <span className="font-mono text-white">x = 4 − ⅔y</span>. Sekarang pilih <span className="font-mono text-white">y = t</span>, lalu semua solusinya tersaji rapi seperti ini.</p>
                <Formula label="Bentuk parametrik solusi PLDV">
                  <Matrix rows={[[<span>x</span>], [<span>y</span>]]} label="Vektor variabel x dan y" />
                  <span>=</span>
                  <Matrix rows={[[4], [0]]} label="Vektor konstanta empat nol" />
                  <span>+</span><span>t</span>
                  <Matrix rows={[[<span>−⅔</span>], [1]]} label="Vektor arah minus dua per tiga dan satu" />
                  <span>, t ∈ ℝ</span>
                </Formula>
                <p className="text-sm leading-relaxed text-slate-300">Nah, satu persamaan dengan dua variabel menghasilkan satu garis dengan tak terhingga banyak pasangan solusi. Pilih nilai t sesukamu, lalu x menyesuaikan agar persamaannya tetap benar. Asyik!</p>
              </div>

              <div id="spldv" className="scroll-mt-8 space-y-4 rounded-3xl border border-violet-200/15 bg-violet-200/[.04] p-4 sm:p-5">
                <h3 className="font-display text-lg font-bold text-violet-100">B. Sistem persamaan linear dengan dua variabel (SPLDV)</h3>
                <p className="text-sm leading-relaxed text-slate-300">Kalau ada dua persamaan dengan variabel x dan y, kita bisa merapikannya menjadi bentuk matriks <span className="font-mono text-white">AX = B</span>. Matriks A memuat koefisien, X memuat variabel, dan B memuat konstanta. Semuanya jadi lebih ringkas!</p>
                <Formula label="SPLDV dalam bentuk matriks">
                  <EquationSystem equations={[<span>ax + by = p</span>, <span>cx + dy = q</span>]} />
                  <span>⇔</span>
                  <Matrix rows={[[<span>a</span>, <span>b</span>], [<span>c</span>, <span>d</span>]]} label="Matriks koefisien a b c d" />
                  <Matrix rows={[[<span>x</span>], [<span>y</span>]]} label="Vektor variabel x y" />
                  <span>=</span>
                  <Matrix rows={[[<span>p</span>], [<span>q</span>]]} label="Vektor konstanta p q" />
                </Formula>
                <p className="text-sm leading-relaxed text-slate-300">Periksa determinan matriks koefisien, ya! Jika nilainya tidak nol, matriks mempunyai invers dan sistem memiliki tepat satu penyelesaian. Kita bisa langsung memakai invers atau aturan Cramer untuk menemukannya.</p>
                <Formula label="Mencari solusi dengan invers">
                  <span>X = A⁻¹B = </span><span>1/(ad − bc)</span>
                  <Matrix rows={[[<span>d</span>, <span>−b</span>], [<span>−c</span>, <span>a</span>]]} label="Adjoin matriks koefisien" />
                  <Matrix rows={[[<span>p</span>], [<span>q</span>]]} label="Vektor konstanta p q" />
                </Formula>
                <Formula label="Aturan Cramer">
                  <span>D = ad − bc</span><span>·</span><span>Dₓ = pd − bq</span><span>·</span><span>Dᵧ = aq − cp</span>
                  <span>x = Dₓ/D</span><span>·</span><span>y = Dᵧ/D</span><span>, jika D ≠ 0</span>
                </Formula>
                <p className="text-sm leading-relaxed text-slate-300">Jika <span className="font-mono text-white">D = 0</span>, jangan buru-buru berhenti—cek determinan pengganti <span className="font-mono text-white">Dₓ</span> dan <span className="font-mono text-white">Dᵧ</span>. Kalau salah satunya tidak nol, sistem tidak memiliki solusi. Kalau <span className="font-mono text-white">D = Dₓ = Dᵧ = 0</span>, ada tak terhingga banyak solusi.</p>
                <SolutionCasesDiagram />
                <p className="text-xs leading-relaxed text-slate-400">Gambar 4.1 · Garis berpotongan menunjukkan satu solusi; garis sejajar tidak memiliki solusi bersama; garis berhimpit memiliki tak terhingga banyak titik persekutuan.</p>
              </div>

              <Example number={23} title="Mengenali jenis penyelesaian SPLDV">
                <p className="text-sm text-slate-300">Yuk, jadi detektif solusi! Kita periksa tiga kemungkinan berikut dengan menghitung D, Dₓ, dan Dᵧ.</p>
                <div className="grid gap-4 desktop:grid-cols-3 phone-land:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h4 className="font-display font-bold text-emerald-100">a · Tepat satu solusi</h4>
                    <div className="mt-3"><EquationSystem equations={[<span>2x + y = 8</span>, <span>x − y = 1</span>]} /></div>
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                      <p><span className="font-mono text-white">D = 2(−1) − 1(1) = −3</span>, jadi D ≠ 0.</p>
                      <p><span className="font-mono text-white">Dₓ = 8(−1) − 1(1) = −9</span> dan <span className="font-mono text-white">Dᵧ = 2(1) − 8(1) = −6</span>.</p>
                      <p><span className="font-mono text-white">x = Dₓ/D = 3</span> dan <span className="font-mono text-white">y = Dᵧ/D = 2</span>. Ketemu! HP = <span className="font-mono text-white">{`{(3, 2)}`}</span>.</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h4 className="font-display font-bold text-rose-100">b · Tidak ada solusi</h4>
                    <div className="mt-3"><EquationSystem equations={[<span>2x + 4y = 8</span>, <span>x + 2y = 5</span>]} /></div>
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                      <p><span className="font-mono text-white">D = 2(2) − 4(1) = 0</span>.</p>
                      <p><span className="font-mono text-white">Dₓ = 8(2) − 4(5) = −4</span> ≠ 0. Artinya, persamaan-persamaan ini tidak konsisten dan HP = ∅.</p>
                      <p>Persamaan pertama menyederhana menjadi <span className="font-mono text-white">x + 2y = 4</span>, sedangkan persamaan kedua meminta <span className="font-mono text-white">x + 2y = 5</span>. Keduanya tidak mungkin benar bersamaan.</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h4 className="font-display font-bold text-amber-100">c · Tak terhingga banyak solusi</h4>
                    <div className="mt-3"><EquationSystem equations={[<span>3x + 2y = 6</span>, <span>6x + 4y = 12</span>]} /></div>
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                      <p><span className="font-mono text-white">D = 0</span>, <span className="font-mono text-white">Dₓ = 6(4) − 2(12) = 0</span>, dan <span className="font-mono text-white">Dᵧ = 3(12) − 6(6) = 0</span>. Ketiganya nol—ini petunjuk penting!</p>
                      <p>Persamaan kedua ternyata dua kali persamaan pertama. Pilih <span className="font-mono text-white">y = t</span>, dan kita memperoleh <span className="font-mono text-white">x = 2 − ⅔t</span>.</p>
                      <Formula><span>(x,y) = (2,0) + t(−⅔,1), t ∈ ℝ</span></Formula>
                    </div>
                  </div>
                </div>
              </Example>

              <Example number={24} title="Menemukan solusi SPLDV dengan invers matriks">
                <p className="text-sm text-slate-300">Saatnya praktik! Susun matriks koefisien dan konstanta, lalu gunakan <span className="font-mono text-white">X = A⁻¹B</span> untuk menemukan pasangan solusinya.</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h4 className="font-display font-bold text-cyan-100">a · Sistem pertama</h4>
                    <div className="mt-2"><EquationSystem equations={[<span>3x + 2y = 18</span>, <span>x − y = 1</span>]} /></div>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-300">
                      <p><span className="font-mono text-white">det(A) = 3(−1) − 2(1) = −5</span>, jadi A memiliki invers.</p>
                      <Formula>
                        <Matrix rows={[[<span>x</span>], [<span>y</span>]]} label="Vektor x y" /><span>=</span>
                        <span>−⅕</span><Matrix rows={[[-1, -2], [-1, 3]]} label="Adjoin matriks koefisien bagian a" />
                        <Matrix rows={[[18], [1]]} label="Vektor konstanta delapan belas satu" />
                        <span>=</span><Matrix rows={[[4], [3]]} label="Vektor solusi empat tiga" />
                      </Formula>
                      <p>Mantap, penyelesaiannya adalah <span className="font-mono text-white">(x,y) = (4,3)</span>.</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h4 className="font-display font-bold text-cyan-100">b · Sistem kedua</h4>
                    <div className="mt-2"><EquationSystem equations={[<span>2x + y = 9</span>, <span>x + 3y = 17</span>]} /></div>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-300">
                      <p><span className="font-mono text-white">det(A) = 2(3) − 1(1) = 5</span>, maka inversnya ada.</p>
                      <Formula>
                        <Matrix rows={[[<span>x</span>], [<span>y</span>]]} label="Vektor x y" /><span>=</span>
                        <span>⅕</span><Matrix rows={[[3, -1], [-1, 2]]} label="Adjoin matriks koefisien bagian b" />
                        <Matrix rows={[[9], [17]]} label="Vektor konstanta sembilan tujuh belas" />
                        <span>=</span><Matrix rows={[[2], [5]]} label="Vektor solusi dua lima" />
                      </Formula>
                      <p>Berhasil! Penyelesaiannya adalah <span className="font-mono text-white">(x,y) = (2,5)</span>.</p>
                    </div>
                  </div>
                </div>
              </Example>

              <section id="gauss-jordan" className="scroll-mt-8 space-y-5">
                <div className="space-y-4 rounded-3xl border border-emerald-200/15 bg-emerald-200/[.035] p-4 sm:p-5">
                  <h3 className="font-display text-lg font-bold text-emerald-100">2. Mantapkan langkah eliminasi Gauss–Jordan</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Gauss–Jordan membantu kita menuntaskan SPLDV dengan rapi. Tulis sistem sebagai matriks augmented <span className="font-mono text-white">[A | B]</span>, lalu lakukan operasi baris elementer (OBE) sampai bagian kiri menjadi matriks identitas. Jika solusinya tunggal, bagian kanan langsung menunjukkan nilai variabelnya.</p>
                  <Formula label="Bentuk awal dan bentuk tujuan"><span>[A | B] → [I | X]</span></Formula>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3 text-sm text-slate-300"><strong className="text-emerald-100">Tukar baris:</strong> <span className="font-mono text-white">Bᵢ ↔ Bⱼ</span>.</div>
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3 text-sm text-slate-300"><strong className="text-emerald-100">Kali skalar bukan nol:</strong> <span className="font-mono text-white">Bᵢ → kBᵢ</span>, dengan k ≠ 0.</div>
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3 text-sm text-slate-300"><strong className="text-emerald-100">Tambah kelipatan baris:</strong> <span className="font-mono text-white">Bᵢ → Bᵢ + kBⱼ</span>, i ≠ j.</div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">Kabar baiknya, ketiga operasi ini tidak mengubah himpunan penyelesaian. Lakukan operasi yang sama pada seluruh elemen dalam baris matriks augmented agar hubungan persamaannya tetap terjaga.</p>
                </div>

                <Example number={25} title="Ayo tuntaskan SPLDV dengan OBE!">
                  <p className="text-sm text-slate-300">Tantangan berikutnya: selesaikan <span className="font-mono text-white">2x + 6y = 10</span> dan <span className="font-mono text-white">x + 4y = 9</span> dengan Gauss–Jordan. Ikuti pivotnya, ya!</p>
                  <p className="text-sm text-slate-300">Pertama, kita susun matriks augmented:</p>
                  <Formula><Matrix rows={[[2, 6, "|", 10], [1, 4, "|", 9]]} label="Matriks augmented untuk sistem bagian a" /></Formula>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Langkah 1 · Siapkan pivot pertama menjadi 1</p>
                      <Formula><span>B₁ ← ½B₁</span><span>→</span><Matrix rows={[[1, 3, "|", 5], [1, 4, "|", 9]]} label="Matriks setelah baris pertama dibagi dua" /></Formula>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Langkah 2 · Hilangkan elemen di bawah pivot</p>
                      <Formula><span>B₂ ← B₂ − B₁</span><span>→</span><Matrix rows={[[1, 3, "|", 5], [0, 1, "|", 4]]} label="Matriks setelah elemen bawah pivot dinolkan" /></Formula>
                    </div>
                    <div className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.05] p-3">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-100">Langkah 3 · Rapikan elemen di atas pivot kedua</p>
                      <Formula><span>B₁ ← B₁ − 3B₂</span><span>→</span><Matrix rows={[[1, 0, "|", -7], [0, 1, "|", 4]]} label="Matriks identitas di kiri dan solusi di kanan" /></Formula>
                    </div>
                  </div>
                  <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-sm text-emerald-50">Berhasil! <span className="font-mono font-bold">x = −7, y = 4</span>, sehingga HP = <strong>{`{(−7,4)}`}</strong>.</p>
                </Example>

                <Example number={26} title="Menemukan solusi tak terhingga dengan OBE">
                  <p className="text-sm text-slate-300">Ayo selesaikan sistem <span className="font-mono text-white">2x + y = 7</span> dan <span className="font-mono text-white">4x + 2y = 14</span>. Amati baik-baik baris kedua setelah dieliminasi!</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <Formula><Matrix rows={[[2, 1, "|", 7], [4, 2, "|", 14]]} label="Matriks augmented sistem bergantung" /><span>B₁ ← ½B₁; B₂ ← B₂ − 4B₁</span><span>→</span><Matrix rows={[[1, "½", "|", "7/2"], [0, 0, "|", 0]]} label="Baris kedua menjadi baris nol" /></Formula>
                    <p>Baris kedua berubah menjadi <span className="font-mono text-white">0 = 0</span>. Artinya, kedua persamaan mewakili garis yang sama! Tetapkan <span className="font-mono text-white">y = t</span>; persamaan pertama memberi <span className="font-mono text-white">x = 7/2 − t/2</span>.</p>
                    <Formula><span>(x,y) = (7/2 − t/2,t), t ∈ ℝ</span></Formula>
                    <p>Hebat, sistem ini memiliki tak terhingga banyak penyelesaian!</p>
                  </div>
                </Example>

                <Example number={27} title="Menangkap tanda sistem tanpa solusi">
                  <p className="text-sm text-slate-300">Coba selesaikan <span className="font-mono text-white">3x + 6y = 9</span> dan <span className="font-mono text-white">x + 2y = 5</span> dengan OBE. Awas, periksa ruas kanannya juga!</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <Formula><Matrix rows={[[3, 6, "|", 9], [1, 2, "|", 5]]} label="Matriks augmented sistem yang tidak konsisten" /><span>B₁ ← ⅓B₁</span><span>→</span><Matrix rows={[[1, 2, "|", 3], [1, 2, "|", 5]]} label="Matriks setelah membagi baris pertama dengan tiga" /></Formula>
                    <Formula><span>B₂ ← B₂ − B₁</span><span>→</span><Matrix rows={[[1, 2, "|", 3], [0, 0, "|", 2]]} label="Baris kedua menyatakan nol sama dengan dua" /></Formula>
                    <p>Ups, baris terakhir menyatakan <span className="font-mono text-white">0 = 2</span>—mustahil terjadi. Jadi, sistem tidak mempunyai penyelesaian dan <span className="font-mono text-white">HP = ∅</span>.</p>
                  </div>
                </Example>

                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <h4 className="font-display font-bold text-amber-100">Yuk, baca bentuk akhir Gauss–Jordan!</h4>
                  <div className="mt-3 grid gap-3 desktop:grid-cols-3 phone-land:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3">
                      <p className="font-bold text-emerald-100">Bentuk 1 · Solusi tunggal</p>
                      <Formula><Matrix rows={[[1, 0, "|", "m"], [0, 1, "|", "n"]]} label="Bentuk akhir dengan solusi tunggal m dan n" /></Formula>
                      <p className="mt-2 text-sm text-slate-300">Kiri menjadi I, dan solusi tunggalnya langsung terbaca: <span className="font-mono text-white">(m,n)</span>.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3">
                      <p className="font-bold text-amber-100">Bentuk 2 · Solusi tak terhingga</p>
                      <Formula><Matrix rows={[[1, 0, "|", "m"], [0, 0, "|", 0]]} label="Bentuk akhir dengan baris nol dan banyak solusi" /></Formula>
                      <p className="mt-2 text-sm text-slate-300">Baris nol menandakan ada variabel bebas—solusinya tak terhingga banyak!</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3">
                      <p className="font-bold text-rose-100">Bentuk 3 · Tidak ada solusi</p>
                      <Formula><Matrix rows={[[1, 0, "|", "m"], [0, 0, "|", "p"]]} label="Bentuk akhir dengan p bukan nol dan tanpa solusi" /></Formula>
                      <p className="mt-2 text-sm text-slate-300">Jika <span className="font-mono text-white">p ≠ 0</span>, kita menemukan persamaan mustahil <span className="font-mono text-white">0 = p</span>—berarti tidak ada solusi.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="three-two" className="scroll-mt-8 space-y-5">
                <div className="space-y-4 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                  <h3 className="font-display text-lg font-bold text-cyan-100">C. Sistem dengan tiga persamaan dan dua variabel</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Nah, kadang kita bertemu tiga persamaan linear dengan hanya dua variabel. Setiap persamaan mewakili sebuah garis. Jika ketiga garis bertemu di satu titik, solusinya satu; jika tidak punya titik persekutuan, tidak ada solusi; dan jika semuanya berhimpit, solusinya tak terhingga banyak. Yuk, kita buktikan lewat contoh!</p>
                </div>

                <Example number={28} title="Memeriksa tiga persamaan yang tidak berpotongan di satu titik">
                  <p className="text-sm text-slate-300">Tantangan pertama: selesaikan sistem berikut dengan Gauss–Jordan dan cari petunjuk saat baris-barisnya disederhanakan.</p>
                  <EquationSystem equations={[<span>x + 2y = 8</span>, <span>2x − y = 1</span>, <span>3x + y = 10</span>]} />
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <Formula><Matrix rows={[[1, 2, "|", 8], [2, -1, "|", 1], [3, 1, "|", 10]]} label="Matriks augmented tiga persamaan dan dua variabel" /></Formula>
                    <Formula><span>B₂ ← B₂ − 2B₁; B₃ ← B₃ − 3B₁</span><span>→</span><Matrix rows={[[1, 2, "|", 8], [0, -5, "|", -15], [0, -5, "|", -14]]} label="Matriks setelah mengeliminasi x dari baris dua dan tiga" /></Formula>
                    <Formula><span>B₃ ← B₃ − B₂</span><span>→</span><Matrix rows={[[1, 2, "|", 8], [0, -5, "|", -15], [0, 0, "|", 1]]} label="Baris ketiga menyatakan nol sama dengan satu" /></Formula>
                    <p>Baris terakhir menyatakan <span className="font-mono text-white">0 = 1</span>. Jadi, ketiga garis tidak berpotongan di satu titik dan <span className="font-mono text-white">HP = ∅</span>.</p>
                  </div>
                </Example>

                <Example number={29} title="Menemukan solusi bersama tiga persamaan">
                  <p className="text-sm text-slate-300">Sekarang ubah konstanta persamaan ketiga. Bisakah kamu menemukan satu titik yang memenuhi semuanya? Ayo cek!</p>
                  <EquationSystem equations={[<span>x + 2y = 8</span>, <span>2x − y = 1</span>, <span>3x + y = 9</span>]} />
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <Formula><Matrix rows={[[1, 2, "|", 8], [2, -1, "|", 1], [3, 1, "|", 9]]} label="Matriks augmented tiga persamaan yang konsisten" /></Formula>
                    <Formula><span>B₂ ← B₂ − 2B₁; B₃ ← B₃ − 3B₁</span><span>→</span><Matrix rows={[[1, 2, "|", 8], [0, -5, "|", -15], [0, -5, "|", -15]]} label="Dua baris terakhir memiliki hubungan yang sama" /></Formula>
                    <Formula><span>B₂ ← −⅕B₂; B₃ ← B₃ − B₂; B₁ ← B₁ − 2B₂</span><span>→</span><Matrix rows={[[1, 0, "|", 2], [0, 1, "|", 3], [0, 0, "|", 0]]} label="Matriks akhir memberikan x dua dan y tiga" /></Formula>
                    <p>Baris ketiga menjadi baris nol, sedangkan dua baris pertama memberi <span className="font-mono text-white">x = 2</span> dan <span className="font-mono text-white">y = 3</span>. Jadi, HP = <span className="font-mono text-white">{`{(2,3)}`}</span>.</p>
                  </div>
                </Example>

                <Example number={30} title="Memodelkan campuran alkohol dengan matriks">
                  <p className="text-sm leading-relaxed text-slate-300">Siap jadi peracik campuran? Tangki A berisi 18 liter air dan 12 liter alkohol. Tangki B berisi 21 liter air dan 9 liter alkohol. Berapa liter campuran dari masing-masing tangki yang perlu diambil agar diperoleh 20 liter campuran dengan kadar alkohol 35%?</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <p>Misalkan A dan B menyatakan banyaknya campuran (dalam liter) yang diambil dari tangki A dan B. Jumlah campuran harus 20 liter:</p>
                    <p className="font-mono text-cyan-100">A + B = 20</p>
                    <p>Kadar alkohol tangki A adalah <span className="font-mono text-white">12/30 = 2/5</span>, sedangkan tangki B <span className="font-mono text-white">9/30 = 3/10</span>. Campuran akhir mengandung <span className="font-mono text-white">35% × 20 = 7</span> liter alkohol.</p>
                    <p className="font-mono text-cyan-100">⅖A + ³⁄₁₀B = 7 ⇔ 4A + 3B = 70</p>
                    <p>Jadi, model SPLDV-nya adalah <span className="font-mono text-white">A + B = 20</span> dan <span className="font-mono text-white">4A + 3B = 70</span>.</p>
                    <Formula><Matrix rows={[[1, 1, "|", 20], [4, 3, "|", 70]]} label="Matriks augmented untuk campuran dua tangki" /></Formula>
                    <Formula><span>B₂ ← B₂ − 3B₁</span><span>→</span><Matrix rows={[[1, 1, "|", 20], [1, 0, "|", 10]]} label="Eliminasi menghasilkan sepuluh liter dari tangki A" /></Formula>
                    <Formula><span>B₁ ← B₁ − B₂; B₁ ↔ B₂</span><span>→</span><Matrix rows={[[1, 0, "|", 10], [0, 1, "|", 10]]} label="Solusi campuran sepuluh liter dari tiap tangki" /></Formula>
                    <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-emerald-50">Asyik, kita perlu mengambil 10 liter dari tangki A dan 10 liter dari tangki B. Campurannya tepat 20 liter dengan 7 liter alkohol, yaitu 35%.</p>
                  </div>
                  <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                    <h4 className="font-display font-bold text-amber-100">Tugas mandiri</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">Selesaikan kembali Contoh 30 dengan (i) invers matriks dan (ii) aturan Cramer. Kedua cara seharusnya memberi hasil yang sama!</p>
                  </div>
                </Example>
              </section>

              <section id="spltv" className="scroll-mt-8 space-y-5">
                <div className="space-y-4 rounded-3xl border border-violet-200/15 bg-violet-200/[.04] p-4 sm:p-5">
                  <h3 className="font-display text-lg font-bold text-violet-100">D. Sistem persamaan linear dengan tiga variabel (SPLTV)</h3>
                  <p className="text-sm leading-relaxed text-slate-300">Saatnya naik level ke tiga variabel! Satu persamaan umumnya memiliki tak terhingga banyak solusi, dua persamaan dapat menyisakan satu parameter bebas, sedangkan tiga persamaan bisa menghasilkan satu solusi, tak terhingga banyak solusi, atau tidak ada solusi.</p>
                  <h4 className="font-display font-bold text-violet-100">1. Satu atau dua persamaan linear dengan tiga variabel</h4>
                  <p className="text-sm leading-relaxed text-slate-300">Pada satu persamaan, pilih dua variabel sebagai parameter bebas. Untuk dua persamaan, rapikan matriks augmented dengan OBE sampai hubungan antarvariabel terlihat jelas. Mari kita coba satu per satu!</p>
                </div>

                <Example number={31} title="Membuka solusi satu persamaan, tiga variabel">
                  <p className="text-sm text-slate-300">Ayo selesaikan <span className="font-mono text-white">x + 2y + 3z = 11</span> dengan memilih dua variabel sebagai parameter bebas.</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <p>Ambil <span className="font-mono text-white">y = m</span> dan <span className="font-mono text-white">z = n</span>. Maka <span className="font-mono text-white">x = 11 − 2m − 3n</span>.</p>
                    <Formula label="Himpunan solusi">
                      <Matrix rows={[[<span>x</span>], [<span>y</span>], [<span>z</span>]]} label="Vektor x y z" />
                      <span>=</span>
                      <Matrix rows={[[11], [0], [0]]} label="Vektor konstanta sebelas nol nol" />
                      <span>+</span><span>m</span><Matrix rows={[[-2], [1], [0]]} label="Vektor arah pertama minus dua satu nol" />
                      <span>+</span><span>n</span><Matrix rows={[[-3], [0], [1]]} label="Vektor arah kedua minus tiga nol satu" />
                    </Formula>
                    <p>Karena <span className="font-mono text-white">m,n ∈ ℝ</span> boleh dipilih bebas, kita memperoleh tak terhingga banyak titik solusi. Banyak sekali, ya!</p>
                  </div>
                </Example>

                <Example number={32} title="Menemukan solusi dua persamaan, tiga variabel">
                  <p className="text-sm text-slate-300">Sekarang gunakan Gauss–Jordan untuk menyelesaikan <span className="font-mono text-white">x + y − z = 2</span> dan <span className="font-mono text-white">2x + y − 4z = 0</span>. Kita akan mendapat satu parameter bebas!</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <Formula><Matrix rows={[[1, 1, -1, "|", 2], [2, 1, -4, "|", 0]]} label="Matriks augmented sistem dua persamaan tiga variabel" /></Formula>
                    <Formula><span>B₂ ← B₂ − 2B₁</span><span>→</span><Matrix rows={[[1, 1, -1, "|", 2], [0, -1, -2, "|", -4]]} label="Matriks setelah mengeliminasi x" /></Formula>
                    <Formula><span>B₂ ← −B₂; B₁ ← B₁ − B₂</span><span>→</span><Matrix rows={[[1, 0, -3, "|", -2], [0, 1, 2, "|", 4]]} label="Bentuk akhir dengan z sebagai variabel bebas" /></Formula>
                    <p>Misalkan <span className="font-mono text-white">z = t</span>. Maka <span className="font-mono text-white">x = 3t − 2</span> dan <span className="font-mono text-white">y = 4 − 2t</span>.</p>
                    <Formula><span>(x,y,z) = (−2,4,0) + t(3,−2,1), t ∈ ℝ</span></Formula>
                  </div>
                </Example>

                <div className="space-y-4 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                  <h4 className="font-display font-bold text-cyan-100">2. Tiga persamaan linear dengan tiga variabel</h4>
                  <p className="text-sm leading-relaxed text-slate-300">Untuk tiga persamaan, kita tulis SPLTV dalam bentuk ringkas <span className="font-mono text-white">AX = B</span>. Jika determinan A tidak nol, hore—ada solusi tunggal yang bisa dicari dengan invers atau aturan Cramer. Jika determinannya nol, gunakan Gauss–Jordan untuk mengecek apakah sistem tidak konsisten atau memiliki variabel bebas.</p>
                  <Formula label="Model umum SPLTV">
                    <EquationSystem equations={[<span>a₁x + b₁y + c₁z = d₁</span>, <span>a₂x + b₂y + c₂z = d₂</span>, <span>a₃x + b₃y + c₃z = d₃</span>]} />
                    <span>⇔</span>
                    <Matrix rows={[[<span>a₁</span>, <span>b₁</span>, <span>c₁</span>], [<span>a₂</span>, <span>b₂</span>, <span>c₂</span>], [<span>a₃</span>, <span>b₃</span>, <span>c₃</span>]]} label="Matriks koefisien umum tiga kali tiga" />
                    <Matrix rows={[[<span>x</span>], [<span>y</span>], [<span>z</span>]]} label="Vektor variabel x y z" />
                    <span>=</span>
                    <Matrix rows={[[<span>d₁</span>], [<span>d₂</span>], [<span>d₃</span>]]} label="Vektor konstanta d satu d dua d tiga" />
                  </Formula>
                  <Formula label="Invers dan aturan Cramer untuk SPLTV">
                    <span>X = A⁻¹B, jika det(A) ≠ 0</span>
                    <span>·</span>
                    <span>x = Dₓ/D</span><span>·</span><span>y = Dᵧ/D</span><span>·</span><span>z = D𝓏/D</span>
                  </Formula>
                  <p className="text-sm leading-relaxed text-slate-300"><span className="font-mono text-white">D = det(A)</span>. Untuk memperoleh Dₓ, Dᵧ, dan D𝓏, ganti berturut-turut kolom x, y, dan z pada A dengan vektor konstanta B. Rumus Cramer berlaku jika D ≠ 0.</p>
                  <p className="text-sm leading-relaxed text-slate-300">Untuk Gauss–Jordan, susun <span className="font-mono text-white">[A | B]</span>, lalu ubah sisi kiri menjadi I. Jika berhasil, sisi kanan langsung menjadi <span className="font-mono text-white">(x,y,z)</span>. Jika muncul baris <span className="font-mono text-white">[0 0 0 | k]</span> dengan <span className="font-mono text-white">k ≠ 0</span>, sistem tidak punya solusi; baris nol yang tersisa bisa menandakan variabel bebas. Perhatikan bentuk akhirnya, ya!</p>
                </div>

                <Example number={33} title="Ayo tuntaskan SPLTV dengan Gauss–Jordan!">
                  <p className="text-sm text-slate-300">Tantangan SPLTV! Selesaikan <span className="font-mono text-white">x + y + z = 6</span>, <span className="font-mono text-white">x + 2y + 3z = 14</span>, dan <span className="font-mono text-white">2x + y + z = 7</span>. Ikuti langkahnya sampai semua pivot rapi.</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <Formula><Matrix rows={[[1, 1, 1, "|", 6], [1, 2, 3, "|", 14], [2, 1, 1, "|", 7]]} label="Matriks augmented tiga persamaan untuk contoh tiga puluh tiga" /></Formula>
                    <p><strong className="text-cyan-100">Langkah pertama.</strong> Hilangkan elemen pertama pada baris kedua dan ketiga.</p>
                    <Formula><span>B₂ ← B₂ − B₁; B₃ ← B₃ − 2B₁</span><span>→</span><Matrix rows={[[1, 1, 1, "|", 6], [0, 1, 2, "|", 8], [0, -1, -1, "|", -5]]} label="Hasil eliminasi kolom pertama" /></Formula>
                    <p><strong className="text-cyan-100">Langkah kedua.</strong> Jumlahkan baris kedua dan ketiga untuk memperoleh pivot z.</p>
                    <Formula><span>B₃ ← B₃ + B₂</span><span>→</span><Matrix rows={[[1, 1, 1, "|", 6], [0, 1, 2, "|", 8], [0, 0, 1, "|", 3]]} label="Pivot z diperoleh pada baris ketiga" /></Formula>
                    <p><strong className="text-cyan-100">Langkah ketiga.</strong> Rapikan elemen di atas pivot z, lalu pivot y. Tinggal sedikit lagi!</p>
                    <Formula><span>B₂ ← B₂ − 2B₃; B₁ ← B₁ − B₂ − B₃</span><span>→</span><Matrix rows={[[1, 0, 0, "|", 1], [0, 1, 0, "|", 2], [0, 0, 1, "|", 3]]} label="Matriks identitas dengan solusi x satu y dua z tiga" /></Formula>
                    <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-emerald-50">Jadi, penyelesaiannya <span className="font-mono font-bold">(x,y,z) = (1,2,3)</span> dan HP = <strong>{`{(1,2,3)}`}</strong>.</p>
                  </div>
                </Example>

                <Example number={34} title="Menemukan kontradiksi dalam SPLTV">
                  <p className="text-sm text-slate-300">Ayo gunakan Gauss–Jordan dan amati apakah ada baris yang memberi pernyataan mustahil.</p>
                  <EquationSystem equations={[<span>x + y + z = 4</span>, <span>2x + 2y + 2z = 11</span>, <span>x − y + z = 1</span>]} />
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <Formula><Matrix rows={[[1, 1, 1, "|", 4], [2, 2, 2, "|", 11], [1, -1, 1, "|", 1]]} label="Matriks augmented sistem tanpa solusi" /></Formula>
                    <Formula><span>B₂ ← B₂ − 2B₁; B₃ ← B₃ − B₁</span><span>→</span><Matrix rows={[[1, 1, 1, "|", 4], [0, 0, 0, "|", 3], [0, -2, 0, "|", -3]]} label="Muncul baris nol sama dengan tiga" /></Formula>
                    <Formula><span>B₃ ← −½B₃</span><span>→</span><Matrix rows={[[1, 1, 1, "|", 4], [0, 0, 0, "|", 3], [0, 1, 0, "|", "3/2"]]} label="Baris kontradiksi tetap muncul setelah operasi" /></Formula>
                    <p>Baris kedua menyatakan <span className="font-mono text-white">0 = 3</span>, sehingga sistem tidak mempunyai penyelesaian dan <span className="font-mono text-white">HP = ∅</span>.</p>
                  </div>
                </Example>

                <Example number={35} title="Menjelajahi solusi tak terhingga SPLTV">
                  <p className="text-sm text-slate-300">Semangat, satu tantangan lagi! Gunakan Gauss–Jordan pada sistem berikut dan tuliskan solusinya dengan parameter.</p>
                  <EquationSystem equations={[<span>x + 2y − 3z = 5</span>, <span>2x + 4y − 6z = 10</span>, <span>−2x − 3y + 4z = −6</span>]} />
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <Formula><Matrix rows={[[1, 2, -3, "|", 5], [2, 4, -6, "|", 10], [-2, -3, 4, "|", -6]]} label="Matriks augmented sistem dengan banyak solusi" /></Formula>
                    <Formula><span>B₂ ← B₂ − 2B₁; B₃ ← B₃ + 2B₁</span><span>→</span><Matrix rows={[[1, 2, -3, "|", 5], [0, 0, 0, "|", 0], [0, 1, -2, "|", 4]]} label="Satu baris menjadi nol dan satu persamaan tersisa" /></Formula>
                    <Formula><span>B₁ ← B₁ − 2B₃</span><span>→</span><Matrix rows={[[1, 0, 1, "|", -3], [0, 1, -2, "|", 4], [0, 0, 0, "|", 0]]} label="Bentuk akhir dengan z bebas" /></Formula>
                    <p>Ambil <span className="font-mono text-white">z = t</span>. Kita memperoleh <span className="font-mono text-white">x = −3 − t</span> dan <span className="font-mono text-white">y = 4 + 2t</span>, dengan <span className="font-mono text-white">t ∈ ℝ</span>. Satu parameter, tak terhingga banyak pasangan!</p>
                    <Formula><span>(x,y,z) = (−3,4,0) + t(−1,2,1), t ∈ ℝ</span></Formula>
                  </div>
                </Example>

                <details className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <summary className="cursor-pointer font-display font-bold text-amber-100">Tugas mandiri · Klasifikasikan tiga SPLTV</summary>
                  <div className="mt-3 space-y-4 text-sm leading-relaxed text-slate-300">
                    <p>Semangat berlatih! Selesaikan setiap sistem dengan eliminasi Gauss–Jordan, lalu tentukan apakah solusinya tunggal, tak terhingga banyak, atau tidak ada.</p>
                    <div className="grid gap-3 desktop:grid-cols-3 phone-land:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="mb-2 font-bold text-cyan-100">a</p><EquationSystem equations={[<span>x + y + z = 6</span>, <span>2x − y + z = 3</span>, <span>x + 2y − z = 2</span>]} /></div>
                      <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="mb-2 font-bold text-cyan-100">b</p><EquationSystem equations={[<span>x + 2y + z = 4</span>, <span>2x + 4y + 2z = 10</span>, <span>x − y + z = 1</span>]} /></div>
                      <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="mb-2 font-bold text-cyan-100">c</p><EquationSystem equations={[<span>x + 2y − z = 3</span>, <span>2x + 4y − 2z = 6</span>, <span>3x + 6y − 3z = 9</span>]} /></div>
                    </div>
                  </div>
                </details>

                <Example number={36} title="Menyelidiki harga buah dengan matriks">
                  <p className="text-sm leading-relaxed text-slate-300">Saatnya jadi detektif harga! Harga 2 kg mangga, 2 kg jeruk, dan 1 kg anggur adalah Rp86.000,00. Harga 1 kg mangga, 2 kg jeruk, dan 2 kg anggur adalah Rp94.000,00. Harga 1 kg mangga, 2 kg jeruk, dan 3 kg anggur adalah Rp116.000,00. Berapa harga 1 kg anggur?</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <p>Misalkan harga per kilogram mangga, jeruk, dan anggur berturut-turut adalah M, J, dan A (dalam ribuan rupiah). Model matematikanya:</p>
                    <EquationSystem equations={[<span>2M + 2J + A = 86</span>, <span>M + 2J + 2A = 94</span>, <span>M + 2J + 3A = 116</span>]} />
                    <p>Susun matriks augmented, lalu tukar baris pertama dan kedua agar pivot pertamanya langsung 1.</p>
                    <Formula><Matrix rows={[[1, 2, 2, "|", 94], [2, 2, 1, "|", 86], [1, 2, 3, "|", 116]]} label="Matriks augmented untuk harga tiga jenis buah" /></Formula>
                    <Formula><span>B₂ ← B₂ − 2B₁; B₃ ← B₃ − B₁</span><span>→</span><Matrix rows={[[1, 2, 2, "|", 94], [0, -2, -3, "|", -102], [0, 0, 1, "|", 22]]} label="Hasil eliminasi awal untuk soal harga buah" /></Formula>
                    <Formula><span>B₂ ← B₂ + 3B₃</span><span>→</span><Matrix rows={[[1, 2, 2, "|", 94], [0, -2, 0, "|", -36], [0, 0, 1, "|", 22]]} label="Baris kedua menentukan harga jeruk" /></Formula>
                    <Formula><span>B₂ ← −½B₂; B₁ ← B₁ − 2B₂ − 2B₃</span><span>→</span><Matrix rows={[[1, 0, 0, "|", 14], [0, 1, 0, "|", 18], [0, 0, 1, "|", 22]]} label="Harga mangga, jeruk, dan anggur dalam ribuan rupiah" /></Formula>
                    <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-emerald-50">Jadi, harga 1 kg mangga Rp14.000,00, jeruk Rp18.000,00, dan anggur <strong>Rp22.000,00</strong>.</p>
                  </div>
                </Example>

                <Example number={37} title="Tantangan terakhir: uang saku dan SPLTV!">
                  <p className="text-sm leading-relaxed text-slate-300">Tantangan terakhir! Uang Ari Rp10.000,00 lebih banyak daripada jumlah uang Budi dan dua kali uang Dodi. Jumlah uang Ari, Budi, dan Dodi adalah Rp98.000,00. Selisih uang Budi dan Dodi adalah Rp4.000,00. Yuk, cari uang Ari!</p>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                    <p>Misalkan uang Ari = A, Budi = B, dan Dodi = D. Model SPLTV-nya:</p>
                    <EquationSystem equations={[<span>A − B − 2D = 10.000</span>, <span>A + B + D = 98.000</span>, <span>B − D = 4.000</span>]} />
                    <p>Dengan eliminasi Gauss–Jordan, kita susun matriks augmented:</p>
                    <Formula><Matrix rows={[[1, -1, -2, "|", 10], [1, 1, 1, "|", 98], [0, 1, -1, "|", 4]]} label="Matriks augmented model uang saku dalam ribuan rupiah" /></Formula>
                    <Formula><span>B₂ ← B₂ − B₁</span><span>→</span><Matrix rows={[[1, -1, -2, "|", 10], [0, 2, 3, "|", 88], [0, 1, -1, "|", 4]]} label="Hasil eliminasi awal uang saku" /></Formula>
                    <Formula><span>B₂ ← ½B₂; B₃ ← B₃ − B₂</span><span>→</span><Matrix rows={[[1, -1, -2, "|", 10], [0, 1, "3/2", "|", 44], [0, 0, "−5/2", "|", -40]]} label="Matriks dengan pivot ketiga untuk uang Dodi" /></Formula>
                    <Formula><span>B₃ ← −⅖B₃; B₂ ← B₂ − ³⁄₂B₃</span><span>→</span><Matrix rows={[[1, -1, -2, "|", 10], [0, 1, 0, "|", 20], [0, 0, 1, "|", 16]]} label="Nilai uang Budi dan Dodi" /></Formula>
                    <Formula><span>B₁ ← B₁ + B₂ + 2B₃</span><span>→</span><Matrix rows={[[1, 0, 0, "|", 62], [0, 1, 0, "|", 20], [0, 0, 1, "|", 16]]} label="Solusi uang Ari, Budi, dan Dodi dalam ribuan rupiah" /></Formula>
                    <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-emerald-50">Mantap! Diperoleh A = 62, B = 20, dan D = 16. Jadi, uang Ari adalah <strong>Rp62.000,00</strong>.</p>
                  </div>
                </Example>
              </section>
            </section>

            <section className="rounded-3xl border border-amber-200/20 bg-[linear-gradient(135deg,rgba(120,79,24,.18),rgba(14,25,42,.9))] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-200/20 bg-amber-200/[.08] text-amber-100"><Sparkles className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <h2 className="font-display text-xl font-extrabold text-white sm:text-2xl">Hebat! Kamu berhasil menuntaskan penerapan matriks pada SPL!</h2>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Satu persamaan dua variabel umumnya memiliki tak terhingga banyak solusi yang membentuk garis.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />SPLDV dapat memiliki satu solusi, tidak ada solusi, atau tak terhingga banyak solusi; determinan dan bentuk grafik membantu mengenalinya.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Gauss–Jordan memakai tiga operasi baris elementer dan dapat diterapkan pada sistem dua maupun tiga variabel.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Untuk SPLTV, jumlah variabel bebas pada bentuk akhir menentukan apakah solusinya tunggal, tak terhingga, atau tidak ada.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Model matriks juga membantu menyelesaikan masalah sehari-hari, seperti campuran, harga, dan jumlah uang.</li>
                  </ul>
                  <a href="#pldv" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-100 hover:text-white">Mau berlatih lagi? Mulai dari PLDV <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
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
