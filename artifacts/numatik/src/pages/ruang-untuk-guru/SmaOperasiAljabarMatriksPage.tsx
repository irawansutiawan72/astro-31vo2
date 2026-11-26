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

function Heading({ number, title, intro }: { number: string; title: string; intro: string }) {
  return (
    <div className="mb-5 flex gap-4">
      <span className="grid h-10 w-12 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-mono text-xs font-black text-cyan-100">{number}</span>
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

function ProductDimensionsDiagram() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-3">
      <svg viewBox="0 0 720 190" role="img" aria-label="Matriks berordo m kali p dikalikan matriks berordo p kali n menghasilkan matriks berordo m kali n" className="mx-auto h-auto min-w-[560px] w-full max-w-3xl">
        <title>Ordo hasil perkalian matriks</title>
        <text x="123" y="34" fill="#a5f3fc" fontSize="16" fontWeight="700" textAnchor="middle">A · m × p</text>
        <text x="355" y="34" fill="#a5f3fc" fontSize="16" fontWeight="700" textAnchor="middle">B · p × n</text>
        <text x="585" y="34" fill="#a5f3fc" fontSize="16" fontWeight="700" textAnchor="middle">AB · m × n</text>
        <rect x="70" y="54" width="106" height="86" rx="8" fill="#0e7490" fillOpacity=".25" stroke="#67e8f9" strokeWidth="2" />
        <text x="123" y="103" fill="#ecfeff" fontSize="14" fontWeight="700" textAnchor="middle">m baris</text>
        <rect x="276" y="54" width="158" height="86" rx="8" fill="#155e75" fillOpacity=".25" stroke="#67e8f9" strokeWidth="2" />
        <text x="355" y="103" fill="#ecfeff" fontSize="14" fontWeight="700" textAnchor="middle">n kolom</text>
        <rect x="532" y="54" width="106" height="86" rx="8" fill="#0e7490" fillOpacity=".25" stroke="#67e8f9" strokeWidth="2" />
        <text x="585" y="103" fill="#ecfeff" fontSize="14" fontWeight="700" textAnchor="middle">m × n</text>
        <path d="M183 97h62m-12-10 12 10-12 10M441 97h70m-12-10 12 10-12 10" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="228" y="77" fill="#fde68a" fontSize="12" fontWeight="700" textAnchor="middle">p harus sama</text>
        <text x="360" y="172" fill="#cbd5e1" fontSize="12" textAnchor="middle">kolom A = baris B; hasil mengikuti baris A dan kolom B</text>
      </svg>
    </div>
  );
}

const outline = [
  ["Transpose matriks", "transpose"],
  ["Tambah dan kurangi", "addition"],
  ["Perkalian skalar", "scalar"],
  ["Perkalian matriks", "product"],
  ["Pangkat matriks", "power"],
];

export default function SmaOperasiAljabarMatriksPage() {
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
              <p className="font-body text-xs font-bold uppercase tracking-[.24em]">Operasi matriks? Kita pecahkan bareng!</p>
            </div>
            <p className="mb-2 font-mono text-xs font-bold tracking-[.22em] text-cyan-100">BAB 3.2–3.3</p>
            <h1 className="font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">
              Operasi Aljabar <span className="text-cyan-200">Matriks</span>
            </h1>
            <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
              Yuk, susun ulang baris dan kolom, jumlahkan atau kurangkan elemen seletak, lalu kalikan matriks dengan skalar maupun matriks lain. Kita juga akan melihat aturan penting dan pangkat matriks!
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Transpose", "Penjumlahan", "Pengurangan", "Skalar", "Perkalian matriks", "Pangkat"].map((item) => (
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
            <section id="transpose" className="scroll-mt-8 space-y-5">
              <Heading number="3.2.1" title="Transpose sebuah matriks" intro="Transpose mengubah posisi baris menjadi kolom dan kolom menjadi baris. Operasi ini akan berguna lagi saat kita mempelajari operasi matriks yang lain." />
              <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300">Jika A berordo <span className="font-mono text-white">m × n</span>, transposenya ditulis <span className="font-mono text-white">Aᵀ</span> dan berordo <span className="font-mono text-white">n × m</span>. Elemen <span className="font-mono text-white">aᵢⱼ</span> pada baris ke-i dan kolom ke-j berpindah menjadi elemen <span className="font-mono text-white">aⱼᵢ</span> pada Aᵀ.</p>
                <Formula label="Aturan transpose"><span>(Aᵀ)ᵢⱼ = aⱼᵢ</span><span>·</span><span>ordo m × n → n × m</span></Formula>
                <Example number={7} title="Menentukan transpose beberapa matriks">
                  <p className="text-sm text-slate-300">Ingat, setiap baris menjadi kolom. Kita lakukan satu per satu, ya!</p>
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">a · Matriks baris</p>
                      <Formula><span>D =</span><Matrix rows={[[2, 3, 5, 7]]} label="Matriks D baris berisi 2, 3, 5, 7" /><span>→</span><span>Dᵀ =</span><Matrix rows={[[2], [3], [5], [7]]} label="Transpose D kolom berisi 2, 3, 5, 7" /></Formula>
                      <p className="mt-2 text-sm text-slate-300">Ordo berubah dari 1 × 4 menjadi 4 × 1.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">b · Matriks 2 × 3</p>
                      <Formula><span>A =</span><Matrix rows={[[1, 2, 3], [4, 5, 6]]} label="Matriks A berordo dua kali tiga" /><span>→</span><span>Aᵀ =</span><Matrix rows={[[1, 4], [2, 5], [3, 6]]} label="Transpose A berordo tiga kali dua" /></Formula>
                      <p className="mt-2 text-sm text-slate-300">Baris pertama A menjadi kolom pertama Aᵀ, dan baris kedua A menjadi kolom kedua Aᵀ.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">c · Matriks 3 × 2</p>
                      <Formula><span>B =</span><Matrix rows={[[-1, 4], [-2, 6], [-3, 5]]} label="Matriks B berordo tiga kali dua" /><span>→</span><span>Bᵀ =</span><Matrix rows={[[-1, -2, -3], [4, 6, 5]]} label="Transpose B berordo dua kali tiga" /></Formula>
                      <p className="mt-2 text-sm text-slate-300">Sekarang Bᵀ memiliki 2 baris dan 3 kolom, sesuai pertukaran ordonya.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">d · Matriks persegi 3 × 3</p>
                      <Formula><span>C =</span><Matrix rows={[[1, 4, 3], [2, 5, 0], [3, 6, 0]]} label="Matriks C berordo tiga kali tiga" /><span>→</span><span>Cᵀ =</span><Matrix rows={[[1, 2, 3], [4, 5, 6], [3, 0, 0]]} label="Transpose C berordo tiga kali tiga" /></Formula>
                      <p className="mt-2 text-sm text-slate-300">Ordonya tetap 3 × 3 karena banyak baris dan kolomnya sama, tetapi elemen-elemen di luar diagonal utama bertukar posisi.</p>
                    </div>
                  </div>
                </Example>
              </div>
            </section>

            <section id="addition" className="scroll-mt-8 space-y-5">
              <Heading number="3.2.2" title="Penjumlahan dan pengurangan antarmatriks" intro="Penjumlahan dan pengurangan dilakukan pada elemen-elemen yang seletak. Karena itu, kedua matriks harus memiliki ordo yang sama." />
              <div className="space-y-4 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300">Jika matriks A dan B berordo sama, maka jumlah atau selisihnya juga memiliki ordo yang sama. Untuk <span className="font-mono text-white">C = A + B</span>, setiap elemen <span className="font-mono text-white">cᵢⱼ = aᵢⱼ + bᵢⱼ</span>. Pengurangan bekerja dengan cara serupa: <span className="font-mono text-white">(A − B)ᵢⱼ = aᵢⱼ − bᵢⱼ</span>. Bila ordonya berbeda, operasi penjumlahan atau pengurangan tidak terdefinisi.</p>
                <Formula label="Operasikan elemen-elemen seletak"><span>A ± B = [aᵢⱼ ± bᵢⱼ]</span><span className="text-slate-400">, hanya jika ordo A = ordo B</span></Formula>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-cyan-100">Identitas penjumlahan</h3><p className="mt-2 text-sm text-slate-300"><span className="font-mono text-white">A + O = A</span>, dengan O matriks nol yang ordonya sama dengan A.</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-cyan-100">Komutatif</h3><p className="mt-2 text-sm text-slate-300"><span className="font-mono text-white">A + B = B + A</span>.</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-cyan-100">Asosiatif</h3><p className="mt-2 text-sm text-slate-300"><span className="font-mono text-white">(A + B) + C = A + (B + C)</span>.</p></div>
                </div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <p className="text-sm leading-relaxed text-amber-50/90"><strong className="text-amber-100">Lawan tambah:</strong> matriks −A diperoleh dengan mengalikan setiap elemen A dengan −1. Karena itu, <span className="font-mono">A + (−A) = O</span>. Pengurangan dapat diubah menjadi penjumlahan lawan: <span className="font-mono">A − B = A + (−B)</span>.</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3"><span className="font-mono text-amber-100">M =</span><Matrix rows={[[2, -5], [3, 4]]} label="Matriks M dua kali dua" /><span className="font-mono text-amber-100">→ −M =</span><Matrix rows={[[-2, 5], [-3, -4]]} label="Lawan matriks M" /></div>
                </div>
              </div>

              <Example number={8} title="Memahami aturan penjumlahan dan pengurangan">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <p className="mb-2 text-sm font-bold text-cyan-100">a · Penjumlahan secara umum</p>
                    <Formula><Matrix rows={[[<span>a</span>, <span>b</span>], [<span>c</span>, <span>d</span>]]} label="Matriks A dengan elemen a b c d" /><span>+</span><Matrix rows={[[<span>e</span>, <span>f</span>], [<span>g</span>, <span>h</span>]]} label="Matriks B dengan elemen e f g h" /><span>=</span><Matrix rows={[[<span>a + e</span>, <span>b + f</span>], [<span>c + g</span>, <span>d + h</span>]]} label="Hasil penjumlahan elemen seletak" /></Formula>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <p className="mb-2 text-sm font-bold text-cyan-100">b · Ordo berbeda, jadi tidak terdefinisi</p>
                    <Formula><Matrix rows={[[2, -3, 1], [0, 4, 5]]} label="Matriks berordo dua kali tiga" /><span>+</span><Matrix rows={[[3, 1], [-2, 5], [4, 0]]} label="Matriks berordo tiga kali dua" /><span className="text-rose-200">tidak terdefinisi</span></Formula>
                    <p className="mt-2 text-sm text-slate-300">Matriks pertama berordo 2 × 3, sedangkan yang kedua 3 × 2.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <p className="mb-2 text-sm font-bold text-cyan-100">c · Pengurangan juga mensyaratkan ordo sama</p>
                    <Formula><Matrix rows={[[5, 2], [-1, 3]]} label="Matriks berordo dua kali dua" /><span>−</span><Matrix rows={[[1, 0, 4], [2, -3, 6]]} label="Matriks berordo dua kali tiga" /><span className="text-rose-200">tidak terdefinisi</span></Formula>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <p className="mb-2 text-sm font-bold text-cyan-100">d · Kurangkan elemen yang seletak</p>
                    <Formula><Matrix rows={[[6, 3], [2, -1]]} label="Matriks pengurang dengan elemen 6 3 2 minus 1" /><span>−</span><Matrix rows={[[4, 5], [-3, 2]]} label="Matriks kedua dengan elemen 4 5 minus 3 2" /><span>=</span><Matrix rows={[[2, -2], [5, -3]]} label="Hasil pengurangan matriks" /></Formula>
                    <p className="mt-2 text-sm text-slate-300">Contohnya, elemen baris 2 kolom 1 adalah <span className="font-mono text-white">2 − (−3) = 5</span>.</p>
                  </div>
                </div>
              </Example>

              <Example number={9} title="Menerapkan prinsip penjumlahan dan pengurangan">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <p className="mb-2 text-sm font-bold text-cyan-100">a · Matriks baris</p>
                    <Formula><Matrix rows={[[-2, 5, 4]]} label="Matriks baris minus 2, 5, 4" /><span>−</span><Matrix rows={[[3, 1, -1]]} label="Matriks baris 3, 1, minus 1" /><span>=</span><Matrix rows={[[-5, 4, 5]]} label="Hasil pengurangan matriks baris" /></Formula>
                    <p className="mt-2 text-sm text-slate-300">Hitung setiap posisi: (−2 − 3, 5 − 1, 4 − (−1)) = (−5, 4, 5).</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <p className="mb-2 text-sm font-bold text-cyan-100">b · Matriks persegi 2 × 2</p>
                    <Formula><Matrix rows={[[4, -1], [2, 3]]} label="Matriks pertama dua kali dua" /><span>+</span><Matrix rows={[[-2, 5], [6, -4]]} label="Matriks kedua dua kali dua" /><span>=</span><Matrix rows={[[2, 4], [8, -1]]} label="Hasil penjumlahan dua matriks" /></Formula>
                    <p className="mt-2 text-sm text-slate-300">Sebagai contoh, posisi baris 1 kolom 2 menghasilkan <span className="font-mono text-white">−1 + 5 = 4</span>.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <p className="mb-2 text-sm font-bold text-cyan-100">c · Pengurangan matriks 3 × 3</p>
                    <Formula><Matrix rows={[[1, 2, 0], [-3, 4, 5], [2, -1, 6]]} label="Matriks A berordo tiga kali tiga" /><span>−</span><Matrix rows={[[4, -2, 3], [1, 0, -1], [-2, 5, 2]]} label="Matriks B berordo tiga kali tiga" /><span>=</span><Matrix rows={[[-3, 4, -3], [-4, 4, 6], [4, -6, 4]]} label="Hasil pengurangan matriks tiga kali tiga" /></Formula>
                  </div>
                </div>
              </Example>
            </section>

            <section id="scalar" className="scroll-mt-8 space-y-5">
              <Heading number="3.3.1" title="Perkalian matriks dengan skalar" intro="Skalar adalah bilangan real. Mengalikan matriks dengan skalar berarti mengalikan setiap elemen matriks dengan bilangan tersebut; bentuk dan ordo matriksnya tetap." />
              <div className="space-y-4 rounded-3xl border border-violet-200/15 bg-violet-200/[.04] p-4 sm:p-5">
                <Formula label="Definisi perkalian skalar"><span>kA = [k · aᵢⱼ]</span><span className="text-slate-400">untuk setiap elemen aᵢⱼ</span></Formula>
                <p className="text-sm leading-relaxed text-slate-300">Perkalian berulang juga dapat disederhanakan. Misalnya, <span className="font-mono text-white">a + a = 2a</span>, <span className="font-mono text-white">3a + 3a = 6a</span>, dan <span className="font-mono text-white">4a + 4a + 4a = 12a</span>. Begitu pula untuk matriks: menjumlahkan matriks M dengan dirinya k kali sama dengan <span className="font-mono text-white">kM</span>.</p>
                <Example number={10} title="Menerapkan aturan perkalian skalar">
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-sm font-bold text-cyan-100">a · Skalar pecahan</p><Formula><span>½</span><Matrix rows={[[8, -6], [2, 4]]} label="Matriks dua kali dua 8 minus 6 2 4" /><span>=</span><Matrix rows={[[4, -3], [1, 2]]} label="Setengah kali matriks menghasilkan 4 minus 3 1 2" /></Formula><p className="mt-2 text-sm text-slate-300">Setiap elemen dikalikan ½, misalnya ½ × (−6) = −3.</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-sm font-bold text-cyan-100">b · Skalar positif</p><Formula><span>7</span><Matrix rows={[[1, -2], [0, 3]]} label="Matriks satu minus dua nol tiga" /><span>=</span><Matrix rows={[[7, -14], [0, 21]]} label="Tujuh kali matriks menghasilkan 7 minus 14 0 21" /></Formula></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-sm font-bold text-cyan-100">c · Skalar negatif</p><Formula><span>−3</span><Matrix rows={[[2, -1, 4], [0, 3, -2]]} label="Matriks dua kali tiga 2 minus 1 4, 0 3 minus 2" /><span>=</span><Matrix rows={[[-6, 3, -12], [0, -9, 6]]} label="Minus tiga kali matriks menghasilkan minus 6 3 minus 12, 0 minus 9 6" /></Formula><p className="mt-2 text-sm text-slate-300">Tanda skalar negatif memengaruhi tanda setiap elemen, sedangkan nol tetap nol.</p></div>
                  </div>
                </Example>
                <Example number={11} title="Memahami sifat perkalian skalar">
                  <p className="text-sm text-slate-300">Diketahui <span className="font-mono text-white">k = 2</span>, <span className="font-mono text-white">h = 3</span>, dan matriks-matriks M serta N berikut. Kita cek beberapa sifatnya.</p>
                  <div className="flex flex-wrap items-center gap-3"><span className="font-mono text-cyan-100">M =</span><Matrix rows={[[1, 2], [3, 4]]} label="Matriks M satu dua tiga empat" /><span className="font-mono text-cyan-100">N =</span><Matrix rows={[[4, 1], [0, -2]]} label="Matriks N empat satu nol minus dua" /></div>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="font-bold text-violet-100">a · Asosiatif terhadap skalar: k(hM) = (kh)M</p><Formula><span>2(3M) =</span><Matrix rows={[[6, 12], [18, 24]]} label="Hasil dua kali tiga M" /><span>= (2 × 3)M =</span><Matrix rows={[[6, 12], [18, 24]]} label="Hasil enam kali M" /></Formula></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="font-bold text-violet-100">b · Distributif terhadap penjumlahan matriks: k(M + N) = kM + kN</p><Formula><span>2(M + N) =</span><Matrix rows={[[10, 6], [6, 4]]} label="Dua kali jumlah M dan N" /><span>=</span><Matrix rows={[[2, 4], [6, 8]]} label="Dua M" /><span>+</span><Matrix rows={[[8, 2], [0, -4]]} label="Dua N" /></Formula></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="font-bold text-violet-100">c · Distributif terhadap penjumlahan skalar: hM + kN</p><Formula><span>3M + 2N =</span><Matrix rows={[[11, 8], [9, 8]]} label="Tiga M ditambah dua N menghasilkan sebelas delapan, sembilan delapan" /></Formula></div>
                  </div>
                </Example>
                <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                  <h3 className="font-display font-bold text-violet-100">Sifat-sifat perkalian skalar</h3>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-violet-200">
                    <li><span className="font-mono text-white">kO = O</span>, dengan O matriks nol.</li>
                    <li><span className="font-mono text-white">0A = O</span>.</li>
                    <li><span className="font-mono text-white">1A = A</span> dan <span className="font-mono text-white">(−1)A = −A</span>.</li>
                    <li><span className="font-mono text-white">h(kA) = (hk)A</span> (asosiatif terhadap skalar).</li>
                    <li><span className="font-mono text-white">(h + k)A = hA + kA</span>.</li>
                    <li><span className="font-mono text-white">h(A + B) = hA + hB</span>, jika ordo A dan B sama.</li>
                  </ol>
                </div>
              </div>
            </section>

            <section id="product" className="scroll-mt-8 space-y-5">
              <Heading number="3.3.2" title="Perkalian dua matriks" intro="Pada perkalian matriks, kita memasangkan baris dari matriks pertama dengan kolom dari matriks kedua. Perhatikan urutannya—perkalian matriks bukan perkalian elemen seletak!" />
              <div className="space-y-4 rounded-3xl border border-emerald-200/15 bg-emerald-200/[.035] p-4 sm:p-5">
                <h3 className="font-display text-lg font-bold text-emerald-100">Aturan baris kali kolom</h3>
                <p className="text-sm leading-relaxed text-slate-300">Untuk mengalikan matriks baris berordo <span className="font-mono text-white">1 × n</span> dengan matriks kolom berordo <span className="font-mono text-white">n × 1</span>, kalikan elemen-elemen yang bersesuaian lalu jumlahkan hasilnya. Secara umum, jika A berordo <span className="font-mono text-white">m × p</span> dan B berordo <span className="font-mono text-white">p × n</span>, maka AB terdefinisi dan berordo <span className="font-mono text-white">m × n</span>. Banyak kolom A harus sama dengan banyak baris B.</p>
                <Formula label="Elemen hasil perkalian"><span>cᵢⱼ = Σₖ aᵢₖbₖⱼ</span><span className="text-slate-400">· baris ke-i dikali kolom ke-j</span></Formula>
                <ProductDimensionsDiagram />
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <p className="flex items-start gap-2 text-sm leading-relaxed text-amber-50/90"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" /><span><strong className="text-amber-100">Trik cek cepat:</strong> pada <span className="font-mono">A(m × p) · B(p × n)</span>, dua angka di bagian dalam harus sama. Dua angka di bagian luar menunjukkan ordo hasil, yaitu m × n.</span></p>
                </div>
                <Example number={14} title="Mencermati aturan dasar perkalian matriks">
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-sm font-bold text-emerald-100">a · Matriks baris dikali matriks kolom</p><Formula><Matrix rows={[[4, -2, 3]]} label="Matriks baris 4 minus 2 3" /><Matrix rows={[[2], [5], [-1]]} label="Matriks kolom 2 5 minus 1" /><span>=</span><span>4(2) + (−2)(5) + 3(−1) = −5</span></Formula><p className="mt-2 text-sm text-slate-300">Hasilnya satu bilangan, karena hasil kali matriks 1 × 3 dengan 3 × 1 berordo 1 × 1.</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-sm font-bold text-emerald-100">b · Matriks 3 × 2 dikali matriks 2 × 3</p><Formula><Matrix rows={[[2, 1], [-1, 3], [4, 0]]} label="Matriks A berordo tiga kali dua" /><Matrix rows={[[1, 2, 0], [3, -1, 5]]} label="Matriks B berordo dua kali tiga" /><span>=</span><Matrix rows={[[5, 3, 5], [8, -5, 15], [4, 8, 0]]} label="Hasil kali matriks berordo tiga kali tiga" /></Formula><p className="mt-2 text-sm text-slate-300">Hasilnya berordo 3 × 3. Elemen baris pertama kolom kedua, misalnya, adalah <span className="font-mono text-white">2(2) + 1(−1) = 3</span>.</p></div>
                    <div className="rounded-2xl border border-rose-200/15 bg-rose-200/[.035] p-4"><p className="mb-2 text-sm font-bold text-rose-100">c · Ukuran bagian dalam tidak cocok</p><Formula><Matrix rows={[[1, 2, 3], [4, 5, 6]]} label="Matriks dua kali tiga" /><Matrix rows={[[1, 0], [2, 1]]} label="Matriks dua kali dua" /><span className="text-rose-200">tidak terdefinisi</span></Formula><p className="mt-2 text-sm text-slate-300">Ordo 2 × 3 dikali 2 × 2 tidak bisa dilakukan karena 3 ≠ 2.</p></div>
                    <div className="rounded-2xl border border-rose-200/15 bg-rose-200/[.035] p-4"><p className="mb-2 text-sm font-bold text-rose-100">d · Urutannya juga menentukan</p><Formula><Matrix rows={[[1, 2]]} label="Matriks baris berordo satu kali dua" /><Matrix rows={[[3, 4, 5]]} label="Matriks baris berordo satu kali tiga" /><span className="text-rose-200">tidak terdefinisi</span></Formula><p className="mt-2 text-sm text-slate-300">Kolom matriks pertama ada 2, sedangkan baris matriks kedua ada 1. Jadi, hasil kali ini tidak terdefinisi.</p></div>
                  </div>
                </Example>

                <div className="rounded-2xl border border-white/10 bg-[#071326]/70 p-4">
                  <h3 className="font-display font-bold text-emerald-100">Sifat-sifat perkalian matriks</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-emerald-200">
                    <li><strong className="text-white">Tidak komutatif pada umumnya:</strong> AB tidak selalu sama dengan BA, bahkan salah satunya bisa saja tidak terdefinisi.</li>
                    <li><strong className="text-white">Asosiatif:</strong> (AB)C = A(BC), selama ukuran-ukurannya memungkinkan.</li>
                    <li><strong className="text-white">Identitas:</strong> AI = IA = A untuk matriks identitas I yang ukurannya sesuai.</li>
                    <li><strong className="text-white">Matriks nol:</strong> AO = OA = O jika perkaliannya terdefinisi dan ukuran O sesuai.</li>
                    <li><strong className="text-white">Distributif:</strong> A(B + C) = AB + AC dan (A + B)C = AC + BC apabila setiap operasi terdefinisi.</li>
                  </ul>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">AB</p><Formula><Matrix rows={[[1, 2], [0, 1]]} label="Matriks A" /><Matrix rows={[[1, 0], [3, 1]]} label="Matriks B" /><span>=</span><Matrix rows={[[7, 2], [3, 1]]} label="Hasil AB" /></Formula></div>
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">BA</p><Formula><Matrix rows={[[1, 0], [3, 1]]} label="Matriks B" /><Matrix rows={[[1, 2], [0, 1]]} label="Matriks A" /><span>=</span><Matrix rows={[[1, 2], [3, 7]]} label="Hasil BA" /></Formula></div>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">Contoh ini menunjukkan <span className="font-mono text-white">AB ≠ BA</span>. Urutan perkalian penting, jadi jangan menukar posisi matriks begitu saja.</p>
                </div>

                <Example number={15} title="Memahami aturan dan ordo hasil perkalian matriks">
                  <p className="text-sm leading-relaxed text-slate-300">Perkalian baris-kolom membuat bentuk hasil bergantung pada ordo kedua matriks. Mari amati beberapa bentuk umum berikut.</p>
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-sm font-bold text-emerald-100">a · Matriks 2 × 2 dikali matriks 2 × 2</p><Formula><Matrix rows={[[<span>a</span>, <span>b</span>], [<span>c</span>, <span>d</span>]]} label="Matriks a b c d" /><Matrix rows={[[<span>x</span>, <span>y</span>], [<span>z</span>, <span>w</span>]]} label="Matriks x y z w" /><span>=</span><Matrix rows={[[<span>ax + bz</span>, <span>ay + bw</span>], [<span>cx + dz</span>, <span>cy + dw</span>]]} label="Hasil kali dua matriks simbolik dua kali dua" /></Formula></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-sm font-bold text-emerald-100">b · Baris 1 × 2 dikali kolom 2 × 1</p><Formula><Matrix rows={[[<span>a</span>, <span>b</span>]]} label="Matriks baris a b" /><Matrix rows={[[<span>x</span>], [<span>y</span>]]} label="Matriks kolom x y" /><span>=</span><span>ax + by</span></Formula><p className="mt-2 text-sm text-slate-300">Ordo hasilnya 1 × 1, yaitu satu bilangan.</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-sm font-bold text-emerald-100">c · Kolom 2 × 1 dikali baris 1 × 2</p><Formula><Matrix rows={[[<span>a</span>], [<span>b</span>]]} label="Matriks kolom a b" /><Matrix rows={[[<span>x</span>, <span>y</span>]]} label="Matriks baris x y" /><span>=</span><Matrix rows={[[<span>ax</span>, <span>ay</span>], [<span>bx</span>, <span>by</span>]]} label="Hasil kali kolom dengan baris berupa matriks dua kali dua" /></Formula><p className="mt-2 text-sm text-slate-300">Hasilnya matriks 2 × 2, berbeda dari urutan pada bagian b.</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-sm font-bold text-emerald-100">d · Ordo hasil mengikuti bagian luar</p><Formula><span>A (m × p)</span><span>×</span><span>B (p × n)</span><span>=</span><span>AB (m × n)</span></Formula></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-sm font-bold text-emerald-100">e · Contoh 3 × 2 dikali 2 × 4</p><Formula><Matrix rows={[[1, 0], [-1, 2], [3, 1]]} label="Matriks tiga kali dua" /><Matrix rows={[[2, 1, -1, 0], [0, 3, 2, 4]]} label="Matriks dua kali empat" /><span>=</span><Matrix rows={[[2, 1, -1, 0], [-2, 5, 5, 8], [6, 6, -1, 4]]} label="Hasil matriks tiga kali empat" /></Formula><p className="mt-2 text-sm text-slate-300">Bagian dalamnya 2 dan 2 cocok; hasilnya mengambil bagian luar, yaitu 3 × 4.</p></div>
                    <div className="rounded-2xl border border-rose-200/15 bg-rose-200/[.035] p-4"><p className="mb-2 text-sm font-bold text-rose-100">f · Periksa kecocokan sebelum menghitung</p><Formula><span>(2 × 3)</span><span>×</span><span>(2 × 2)</span><span className="text-rose-200">tidak terdefinisi, 3 ≠ 2</span></Formula></div>
                  </div>
                </Example>

                <Example number={16} title="Menentukan hasil perkalian dua matriks">
                  <p className="text-sm text-slate-300">Kalikan setiap baris matriks pertama dengan setiap kolom matriks kedua. Untuk hasil 3 × 3, ada sembilan perkalian baris-kolom yang perlu dihitung.</p>
                  <Formula><Matrix rows={[[1, 2, 0], [0, 1, -1], [2, 0, 1]]} label="Matriks A tiga kali tiga" /><Matrix rows={[[2, 1, 3], [-1, 0, 2], [1, 4, 0]]} label="Matriks B tiga kali tiga" /><span>=</span><Matrix rows={[[0, 1, 7], [-2, -4, 2], [5, 6, 6]]} label="Hasil kali A dan B" /></Formula>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Baris 1 × kolom 1</p><p className="mt-2 font-mono text-sm text-cyan-100">1(2) + 2(−1) + 0(1) = 0</p></div>
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Baris 1 × kolom 2</p><p className="mt-2 font-mono text-sm text-cyan-100">1(1) + 2(0) + 0(4) = 1</p></div>
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Baris 2 × kolom 3</p><p className="mt-2 font-mono text-sm text-cyan-100">0(3) + 1(2) + (−1)(0) = 2</p></div>
                    <div className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Baris 3 × kolom 2</p><p className="mt-2 font-mono text-sm text-cyan-100">2(1) + 0(0) + 1(4) = 6</p></div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">Ulangi pola yang sama untuk semua pasangan baris-kolom. Hasilnya tetap berordo 3 × 3 karena kedua matriks yang dikalikan berordo 3 × 3.</p>
                </Example>
              </div>
            </section>

            <section id="power" className="scroll-mt-8 space-y-5">
              <Heading number="3.3.3" title="Perpangkatan matriks persegi" intro="Pangkat matriks adalah perkalian berulang sebuah matriks dengan dirinya sendiri. Agar dapat dikalikan dengan dirinya, matriksnya harus persegi." />
              <div className="space-y-4 rounded-3xl border border-amber-200/15 bg-amber-200/[.035] p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300">Untuk matriks persegi A berordo <span className="font-mono text-white">m × m</span>, pangkat positif didefinisikan sebagai <span className="font-mono text-white">Aⁿ = A · A · … · A</span> sebanyak n faktor. Contohnya <span className="font-mono text-white">A² = A · A</span> dan <span className="font-mono text-white">A³ = A · A · A</span>. Operasi pangkat matriks bukan berarti setiap elemen dipangkatkan sendiri-sendiri.</p>
                <Formula label="Definisi pangkat matriks persegi"><span>Aⁿ = A · A · … · A</span><span className="text-slate-400">(n faktor, n bilangan bulat positif)</span></Formula>
                <Example number={17} title="Memahami pengertian pangkat matriks">
                  <p className="text-sm text-slate-300">Diketahui matriks A berikut. Tentukan A² dan A³.</p>
                  <Formula><span>A =</span><Matrix rows={[[1, 0], [3, 2]]} label="Matriks A satu nol tiga dua" /></Formula>
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 font-bold text-amber-100">a · Hitung A² = A · A</p><Formula><Matrix rows={[[1, 0], [3, 2]]} label="Matriks A" /><Matrix rows={[[1, 0], [3, 2]]} label="Matriks A kedua" /><span>=</span><Matrix rows={[[1, 0], [9, 4]]} label="Matriks A kuadrat" /></Formula><p className="mt-2 text-sm text-slate-300">Elemen kiri bawahnya adalah <span className="font-mono text-white">3(1) + 2(3) = 9</span>.</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 font-bold text-amber-100">b · Hitung A³ = A² · A</p><Formula><Matrix rows={[[1, 0], [9, 4]]} label="Matriks A kuadrat" /><Matrix rows={[[1, 0], [3, 2]]} label="Matriks A" /><span>=</span><Matrix rows={[[1, 0], [21, 8]]} label="Matriks A pangkat tiga" /></Formula><p className="mt-2 text-sm text-slate-300">Kita dapat melanjutkan dengan mengalikan A² dengan A. Tidak perlu mengalikan tiap elemen A dengan dirinya sendiri.</p></div>
                  </div>
                </Example>
              </div>
            </section>

            <section className="rounded-3xl border border-amber-200/20 bg-[linear-gradient(135deg,rgba(120,79,24,.18),rgba(14,25,42,.9))] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-200/20 bg-amber-200/[.08] text-amber-100"><Sparkles className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <h2 className="font-display text-xl font-extrabold text-white sm:text-2xl">Keren! Operasi matriks makin akrab</h2>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Transpose menukar baris dengan kolom; ordo m × n berubah menjadi n × m.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Penjumlahan dan pengurangan dilakukan pada elemen seletak dan hanya berlaku untuk matriks berordo sama.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Perkalian skalar mengalikan setiap elemen; perkalian matriks mengikuti aturan baris-kali-kolom.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Pada AB, kolom A harus sama dengan baris B. Pangkat matriks berarti perkalian berulang dan hanya untuk matriks persegi.</li>
                  </ul>
                  <a href="#transpose" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-100 hover:text-white">Ulangi dari transpose <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
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
