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
    <span
      role="img"
      aria-label={label}
      className="inline-flex items-stretch gap-1 align-middle font-mono text-sm font-semibold text-cyan-100 sm:text-base"
    >
      <span aria-hidden="true" className="w-2 rounded-l-md border-y-2 border-l-2 border-cyan-200/75" />
      <span className="grid gap-x-4 gap-y-1 px-1 py-1">
        {rows.map((row, rowIndex) => (
          <span key={rowIndex} className="flex justify-center gap-4">
            {row.map((entry, columnIndex) => (
              <span key={columnIndex} className="min-w-3 text-center">{entry}</span>
            ))}
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
      <span className="grid h-10 w-12 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-mono text-xs font-black text-cyan-100">
        {number}
      </span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{intro}</p>
      </div>
    </div>
  );
}

function Example({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <article
      data-testid={`example-${number}`}
      className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]"
    >
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-300/15 text-orange-200">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
        </span>
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
      <div className="flex min-w-max items-center justify-center gap-3 font-mono text-sm font-semibold leading-relaxed text-cyan-100 sm:gap-5 sm:text-base">
        {children}
      </div>
    </div>
  );
}

function TransposeDiagram() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071326]/70 p-3">
      <svg
        viewBox="0 0 680 230"
        role="img"
        aria-label="Matriks dua baris tiga kolom berubah menjadi matriks tiga baris dua kolom setelah ditranspose"
        className="mx-auto h-auto min-w-[560px] w-full max-w-3xl"
      >
        <title>Transpose menukar baris menjadi kolom</title>
        <text x="155" y="34" fill="#a5f3fc" fontSize="16" fontWeight="700" textAnchor="middle">Matriks A · 2 × 3</text>
        <text x="525" y="34" fill="#a5f3fc" fontSize="16" fontWeight="700" textAnchor="middle">Transpose Aᵀ · 3 × 2</text>
        <path d="M92 58h-12v112h12M218 58h12v112h-12" fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
        <path d="M462 58h-12v112h12M588 58h12v112h-12" fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
        {[["2", "−1", "4"], ["0", "3", "7"]].map((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <g key={`a-${rowIndex}-${columnIndex}`}>
              <rect
                x={101 + columnIndex * 38}
                y={72 + rowIndex * 50}
                width="32"
                height="34"
                rx="8"
                fill={rowIndex === 0 ? "#0e7490" : "#155e75"}
                fillOpacity=".45"
                stroke="#67e8f9"
                strokeOpacity=".4"
              />
              <text x={117 + columnIndex * 38} y={94 + rowIndex * 50} fill="#ecfeff" fontSize="15" fontWeight="700" textAnchor="middle">{value}</text>
            </g>
          )),
        )}
        <path d="M270 114h136m-14-12 14 12-14 12" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="338" y="94" fill="#fde68a" fontSize="12" fontWeight="700" textAnchor="middle">tukar baris</text>
        {[["2", "0"], ["−1", "3"], ["4", "7"]].map((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <g key={`at-${rowIndex}-${columnIndex}`}>
              <rect
                x={471 + columnIndex * 42}
                y={62 + rowIndex * 38}
                width="34"
                height="30"
                rx="7"
                fill={columnIndex === 0 ? "#0e7490" : "#155e75"}
                fillOpacity=".45"
                stroke="#67e8f9"
                strokeOpacity=".4"
              />
              <text x={488 + columnIndex * 42} y={82 + rowIndex * 38} fill="#ecfeff" fontSize="14" fontWeight="700" textAnchor="middle">{value}</text>
            </g>
          )),
        )}
        <text x="340" y="210" fill="#cbd5e1" fontSize="12" textAnchor="middle">Posisi (baris, kolom) menjadi (kolom, baris)</text>
      </svg>
    </div>
  );
}

const outline = [
  ["Kenalan dengan matriks", "dasar"],
  ["Jenis dan ordo", "jenis"],
  ["Matriks dari SPL", "spl"],
  ["Kesamaan matriks", "kesamaan"],
  ["Transpose matriks", "transpose"],
];

export default function SmaKonsepJenisKesamaanTransposeMatriksPage() {
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
              <p className="font-body text-xs font-bold uppercase tracking-[.24em]">Susun angka, temukan polanya!</p>
            </div>
            <p className="mb-2 font-mono text-xs font-bold tracking-[.22em] text-cyan-100">BAB 3.1</p>
            <h1 className="font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="lesson-title">
              Matriks: <span className="text-cyan-200">rapi, seru, dan penuh pola</span>
            </h1>
            <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
              Matriks membantu kita merapikan informasi dan menuliskan sistem persamaan dengan ringkas. Yuk, kenali elemennya, bandingkan matriks, lalu lihat bagaimana transpose menukar baris dan kolom!
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Pengertian", "Ordo dan jenis", "Model SPL", "Kesamaan", "Transpose"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs font-semibold text-slate-200">{item}</span>
              ))}
            </div>
          </div>
        </header>

        <nav className="mb-8 flex gap-2 overflow-x-auto pb-2 desktop:hidden" aria-label="Peta materi">
          {outline.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-slate-200 hover:border-cyan-200/40 hover:text-cyan-100">{label}</a>
          ))}
        </nav>

        <div className="grid gap-8 desktop:grid-cols-[minmax(0,1fr)_245px] phone-land:grid-cols-2">
          <div className="min-w-0 space-y-12">
            <section id="dasar" className="scroll-mt-8 space-y-5">
              <Heading
                number="3.1.1"
                title="Apa itu matriks?"
                intro="Di kelas sebelumnya, kita sudah bertemu sistem persamaan linear dua variabel (SPLDV) dan tiga variabel (SPLTV). Kini, kita punya cara yang lebih ringkas untuk menata koefisiennya: matriks!"
              />
              <div className="space-y-4 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300">
                  <strong className="text-cyan-100">Matriks</strong> adalah susunan bilangan atau simbol yang ditata dalam baris dan kolom, lalu ditulis di antara tanda kurung siku atau kurung biasa. Setiap bilangan atau simbol di dalamnya disebut <strong className="text-cyan-100">elemen</strong> atau <strong className="text-cyan-100">entri</strong> matriks.
                </p>
                <Formula label="Contoh sebuah matriks">
                  <span>A =</span>
                  <Matrix rows={[[5, -2, 8], [1, 0, 6]]} label="Matriks A, baris pertama 5, minus 2, 8; baris kedua 1, 0, 6" />
                </Formula>
                <p className="text-sm leading-relaxed text-slate-300">
                  Matriks A di atas memiliki <strong className="text-cyan-100">2 baris</strong> dan <strong className="text-cyan-100">3 kolom</strong>, sehingga ordonya 2 × 3 (dibaca “dua kali tiga”). Baris dihitung dari atas ke bawah, sedangkan kolom dihitung dari kiri ke kanan. Jadi, jangan tertukar: angka pertama pada ordo menunjukkan banyak baris.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h3 className="font-display font-bold text-cyan-100">Cara membaca elemen</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">Elemen <span className="font-mono text-white">aᵢⱼ</span> berada pada baris ke-<span className="font-mono">i</span> dan kolom ke-<span className="font-mono">j</span>. Untuk matriks A tadi, misalnya, <span className="font-mono text-white">a₁₂ = −2</span> dan <span className="font-mono text-white">a₂₃ = 6</span>.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">
                    <h3 className="font-display font-bold text-cyan-100">Notasi umum</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">Jika sebuah matriks memiliki m baris dan n kolom, kita dapat menulis ordonya <span className="font-mono text-white">m × n</span> dan notasi umumnya <span className="font-mono text-white">A = [aᵢⱼ]ₘₓₙ</span>.</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <p className="flex items-start gap-2 text-sm leading-relaxed text-amber-50/90">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" />
                    <span><strong className="text-amber-100">Pengingat kecil:</strong> pada <span className="font-mono">a₂₃</span>, angka 2 berarti baris kedua dan angka 3 berarti kolom ketiga. Baca indeks baris dulu, baru indeks kolom.</span>
                  </p>
                </div>
              </div>
            </section>

            <section id="jenis" className="scroll-mt-8 space-y-5">
              <Heading
                number="A"
                title="Ordo dan jenis-jenis matriks"
                intro="Begitu tahu cara membaca baris dan kolom, kita bisa mengelompokkan matriks berdasarkan bentuknya. Yuk, lihat ciri setiap jenis!"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <article className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
                  <h3 className="font-display font-bold text-cyan-100">Matriks persegi</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">Jumlah baris sama dengan jumlah kolom. Matriks berordo 2 × 2 atau 3 × 3 adalah contoh matriks persegi.</p>
                  <div className="mt-3"><Matrix rows={[[4, 1], [-3, 2]]} label="Matriks persegi berordo dua kali dua" /></div>
                </article>
                <article className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
                  <h3 className="font-display font-bold text-cyan-100">Matriks baris</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">Hanya memiliki satu baris. Jika ada n elemen, ordonya 1 × n.</p>
                  <div className="mt-3"><Matrix rows={[[7, 0, -2, 5]]} label="Matriks baris dengan empat elemen" /></div>
                </article>
                <article className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
                  <h3 className="font-display font-bold text-cyan-100">Matriks kolom</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">Hanya memiliki satu kolom. Jika ada m elemen, ordonya m × 1.</p>
                  <div className="mt-3"><Matrix rows={[[6], [-1], [3]]} label="Matriks kolom dengan tiga elemen" /></div>
                </article>
                <article className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
                  <h3 className="font-display font-bold text-cyan-100">Matriks persegi panjang</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">Banyak baris dan kolomnya berbeda, misalnya berordo 2 × 3 atau 3 × 2.</p>
                  <div className="mt-3"><Matrix rows={[[2, 4, 1], [0, -3, 8]]} label="Matriks persegi panjang berordo dua kali tiga" /></div>
                </article>
              </div>

              <Example number={1} title="Menentukan ordo dan jenis matriks">
                <p className="text-sm text-slate-300">Yuk, hitung banyak baris dan kolom setiap matriks, lalu sebutkan jenisnya.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">a</p><Matrix rows={[[3, 1], [-2, 6]]} label="Matriks A, 3 dan 1 pada baris pertama, minus 2 dan 6 pada baris kedua" /><p className="mt-3 text-sm text-slate-300">Ada 2 baris dan 2 kolom, jadi ordo <strong className="text-white">2 × 2</strong> dan termasuk matriks persegi.</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">b</p><Matrix rows={[[4, -1, 7]]} label="Matriks B, satu baris berisi 4, minus 1, 7" /><p className="mt-3 text-sm text-slate-300">Ada 1 baris dan 3 kolom, jadi ordo <strong className="text-white">1 × 3</strong> dan termasuk matriks baris.</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">c</p><Matrix rows={[[9], [2], [-5], [1]]} label="Matriks C, satu kolom berisi 9, 2, minus 5, 1" /><p className="mt-3 text-sm text-slate-300">Ada 4 baris dan 1 kolom, jadi ordo <strong className="text-white">4 × 1</strong> dan termasuk matriks kolom.</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">d</p><Matrix rows={[[2, 5, 0], [-4, 1, 3]]} label="Matriks D berordo dua kali tiga" /><p className="mt-3 text-sm text-slate-300">Ada 2 baris dan 3 kolom, jadi ordo <strong className="text-white">2 × 3</strong> dan termasuk matriks persegi panjang.</p></div>
                </div>
              </Example>
            </section>

            <section id="spl" className="scroll-mt-8 space-y-5">
              <Heading
                number="B"
                title="Menyajikan sistem persamaan dalam bentuk matriks"
                intro="Koefisien variabel, variabelnya, dan konstanta dapat disusun menjadi tiga matriks. Hasilnya ringkas, rapi, dan mudah dikenali!"
              />
              <Example number={2} title="Mengubah SPLDV dan SPLTV menjadi persamaan matriks">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-cyan-100">a. SPLDV</h4>
                    <p className="text-sm text-slate-300">Tuliskan sistem <span className="font-mono text-white">3x + 2y = 17</span> dan <span className="font-mono text-white">x − 2y = −5</span> dalam bentuk matriks. Koefisien x dan y menjadi matriks pertama, variabel menjadi matriks kolom, dan konstanta di ruas kanan menjadi matriks kolom terakhir.</p>
                    <Formula label="Model matriks SPLDV">
                      <Matrix rows={[[3, 2], [1, -2]]} label="Matriks koefisien, baris pertama 3 dan 2, baris kedua 1 dan minus 2" />
                      <Matrix rows={[["x"], ["y"]]} label="Matriks kolom variabel x dan y" />
                      <span>=</span>
                      <Matrix rows={[[17], [-5]]} label="Matriks kolom konstanta 17 dan minus 5" />
                    </Formula>
                    <p className="text-sm text-slate-300">Jika matriks koefisien kita sebut A, vektor variabel X, dan vektor konstanta B, bentuk ringkasnya adalah <span className="font-mono text-white">AX = B</span>.</p>
                  </div>
                  <div className="space-y-3 border-t border-white/10 pt-5">
                    <h4 className="font-display font-bold text-cyan-100">b. SPLTV</h4>
                    <p className="text-sm text-slate-300">Lakukan hal yang sama untuk <span className="font-mono text-white">2x + y − z = 2</span>, <span className="font-mono text-white">x + 3y + 2z = 11</span>, dan <span className="font-mono text-white">−x + 2y + z = 3</span>.</p>
                    <Formula label="Model matriks SPLTV">
                      <Matrix rows={[[2, 1, -1], [1, 3, 2], [-1, 2, 1]]} label="Matriks koefisien tiga kali tiga" />
                      <Matrix rows={[["x"], ["y"], ["z"]]} label="Matriks kolom variabel x, y, z" />
                      <span>=</span>
                      <Matrix rows={[[2], [11], [3]]} label="Matriks kolom konstanta 2, 11, 3" />
                    </Formula>
                    <p className="text-sm text-slate-300">Baris pertama matriks koefisien selalu diambil dari persamaan pertama, baris kedua dari persamaan kedua, dan seterusnya. Tanda negatif pun jangan sampai tertinggal, ya!</p>
                  </div>
                </div>
              </Example>

              <Example number={3} title="Membuat model matriks dari cerita sehari-hari">
                <p className="text-sm leading-relaxed text-slate-300">Rani membeli 2 buku tulis dan 1 pulpen seharga Rp19.000. Sementara itu, Bima membeli 1 buku tulis dan 3 pulpen seharga Rp24.000. Berapa pun harga satu barang, kita bisa menyusun informasinya terlebih dahulu dalam bentuk sistem persamaan lalu matriks.</p>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                    <caption className="px-3 py-2 text-left font-bold text-cyan-100">Informasi belanja (harga dalam ribuan rupiah)</caption>
                    <thead><tr className="bg-cyan-300/[.1] text-cyan-50"><th scope="col" className="border-b border-white/10 px-3 py-2">Pembeli</th><th scope="col" className="border-b border-white/10 px-3 py-2">Buku tulis</th><th scope="col" className="border-b border-white/10 px-3 py-2">Pulpen</th><th scope="col" className="border-b border-white/10 px-3 py-2">Total harga</th></tr></thead>
                    <tbody>
                      <tr><th scope="row" className="border-b border-white/[.06] px-3 py-2 text-left text-slate-200">Rani</th><td className="border-b border-white/[.06] px-3 py-2">2</td><td className="border-b border-white/[.06] px-3 py-2">1</td><td className="border-b border-white/[.06] px-3 py-2">19</td></tr>
                      <tr><th scope="row" className="border-b border-white/[.06] px-3 py-2 text-left text-slate-200">Bima</th><td className="border-b border-white/[.06] px-3 py-2">1</td><td className="border-b border-white/[.06] px-3 py-2">3</td><td className="border-b border-white/[.06] px-3 py-2">24</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-slate-300">Misalkan <span className="font-mono text-white">x</span> adalah harga satu buku tulis dan <span className="font-mono text-white">y</span> adalah harga satu pulpen, masing-masing dalam ribuan rupiah. Model SPLDV-nya <span className="font-mono text-white">2x + y = 19</span> dan <span className="font-mono text-white">x + 3y = 24</span>.</p>
                <Formula label="Model matriks">
                  <Matrix rows={[[2, 1], [1, 3]]} label="Matriks banyak barang, dua kali dua" />
                  <Matrix rows={[["x"], ["y"]]} label="Matriks kolom harga buku tulis dan pulpen" />
                  <span>=</span>
                  <Matrix rows={[[19], [24]]} label="Matriks kolom total harga dalam ribuan rupiah" />
                </Formula>
                <p className="text-xs leading-relaxed text-slate-400">Karena satuan yang digunakan adalah ribuan rupiah, angka 19 mewakili Rp19.000 dan angka 24 mewakili Rp24.000. Menyamakan satuan sejak awal membantu kita menghindari salah hitung.</p>
              </Example>
            </section>

            <section id="kesamaan" className="scroll-mt-8 space-y-5">
              <Heading
                number="3.1.2"
                title="Kapan dua matriks dikatakan sama?"
                intro="Sekarang kita belajar membandingkan matriks. Syaratnya ada dua dan keduanya wajib terpenuhi!"
              />
              <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[.045] p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300">Dua matriks dikatakan <strong className="text-cyan-100">sama</strong> jika ordonya sama dan setiap elemen yang posisinya bersesuaian (seletak) bernilai sama. Jadi, kita tidak cukup hanya melihat angkanya; posisi dan ukuran matriks juga harus cocok.</p>
                <Formula label="Syarat kesamaan matriks">
                  <span>A = B</span>
                  <span>⟺</span>
                  <span>ordo A = ordo B</span>
                  <span>dan</span>
                  <span>aᵢⱼ = bᵢⱼ untuk setiap i, j</span>
                </Formula>
              </div>

              <Example number={4} title="Memeriksa kesamaan beberapa matriks">
                <p className="text-sm text-slate-300">Perhatikan tiga matriks berikut. Apakah ada yang sama?</p>
                <div className="grid gap-3 desktop:grid-cols-3 phone-land:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 font-bold text-cyan-100">A · ordo 2 × 3</p><Matrix rows={[[-2, 4, 1], [6, 0, 5]]} label="Matriks A, ordo dua kali tiga" /></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 font-bold text-cyan-100">B · ordo 2 × 3</p><Matrix rows={[[2, 4, 1], [6, 0, 5]]} label="Matriks B, ordo dua kali tiga" /></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><p className="mb-2 font-bold text-cyan-100">C · ordo 2 × 3</p><Matrix rows={[[-2, 4, 1], [6, 0, 5]]} label="Matriks C, ordo dua kali tiga" /></div>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-orange-200">
                  <li>Ordo A, B, dan C sama-sama 2 × 3, jadi kita lanjut membandingkan elemen-elemen seletaknya.</li>
                  <li>Elemen baris pertama kolom pertama A adalah −2, sedangkan pada B adalah 2. Karena −2 ≠ 2, maka <strong className="text-white">A ≠ B</strong>.</li>
                  <li>Semua elemen A dan C yang seletak sama, sehingga <strong className="text-white">A = C</strong>.</li>
                  <li>Karena A = C tetapi A ≠ B, maka <strong className="text-white">B ≠ C</strong>.</li>
                </ul>
              </Example>

              <Example number={5} title="Menentukan nilai variabel dari kesamaan matriks">
                <p className="text-sm text-slate-300">Tentukan nilai <span className="font-mono text-white">a</span> dan <span className="font-mono text-white">b</span> agar kedua matriks berikut sama.</p>
                <Formula>
                  <Matrix rows={[[<span>2a + 1</span>, 3], [5, <span>b − 4</span>]]} label="Matriks dengan baris 2a tambah 1 dan 3, lalu 5 dan b kurang 4" />
                  <span>=</span>
                  <Matrix rows={[[9, 3], [5, 2]]} label="Matriks dengan baris 9 dan 3, lalu 5 dan 2" />
                </Formula>
                <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                  <p>Samakan elemen-elemen yang seletak:</p>
                  <ul className="list-disc space-y-2 pl-5 marker:text-orange-200">
                    <li>Baris 1, kolom 1: <span className="font-mono text-white">2a + 1 = 9</span>, sehingga <span className="font-mono text-white">2a = 8</span> dan <span className="font-mono text-white">a = 4</span>.</li>
                    <li>Baris 2, kolom 2: <span className="font-mono text-white">b − 4 = 2</span>, sehingga <span className="font-mono text-white">b = 6</span>.</li>
                  </ul>
                  <p className="flex items-center gap-2 rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-emerald-50"><Check className="h-4 w-4 shrink-0" aria-hidden="true" />Jadi, nilai yang memenuhi adalah <strong>a = 4</strong> dan <strong>b = 6</strong>.</p>
                </div>
              </Example>

              <Example number={6} title="Menentukan hasil operasi dari kesamaan matriks">
                <p className="text-sm text-slate-300">Diketahui dua matriks berikut sama. Tentukan nilai <span className="font-mono text-white">a, b, c, d</span>, lalu hitung hasil kali <span className="font-mono text-white">a · b · c · d</span>.</p>
                <Formula>
                  <Matrix rows={[[<span>a + b</span>, <span>2c − 1</span>], [<span>d − 2</span>, <span>a − b</span>]]} label="Matriks dengan elemen a tambah b, 2c kurang 1, d kurang 2, dan a kurang b" />
                  <span>=</span>
                  <Matrix rows={[[13, 9], [6, 5]]} label="Matriks dengan baris 13 dan 9, lalu 6 dan 5" />
                </Formula>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-orange-200">
                  <li>Baris 1, kolom 1: <span className="font-mono text-white">a + b = 13</span>.</li>
                  <li>Baris 2, kolom 2: <span className="font-mono text-white">a − b = 5</span>. Jumlahkan kedua persamaan: <span className="font-mono text-white">2a = 18</span>, jadi <span className="font-mono text-white">a = 9</span> dan <span className="font-mono text-white">b = 4</span>.</li>
                  <li>Baris 1, kolom 2: <span className="font-mono text-white">2c − 1 = 9</span>, jadi <span className="font-mono text-white">c = 5</span>.</li>
                  <li>Baris 2, kolom 1: <span className="font-mono text-white">d − 2 = 6</span>, jadi <span className="font-mono text-white">d = 8</span>.</li>
                </ul>
                <p className="rounded-xl border border-emerald-200/20 bg-emerald-300/[.06] p-3 text-center font-mono text-sm text-emerald-50">a · b · c · d = 9 · 4 · 5 · 8 = 1.440</p>
              </Example>
            </section>

            <section id="transpose" className="scroll-mt-8 space-y-5">
              <Heading
                number="C"
                title="Transpose matriks: baris bertukar tempat dengan kolom"
                intro="Terakhir, kita kenalan dengan transpose. Caranya sederhana: setiap baris matriks asal menjadi kolom pada matriks baru, dan setiap kolom asal menjadi baris."
              />
              <div className="space-y-4 rounded-3xl border border-violet-200/15 bg-violet-200/[.04] p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-slate-300">Transpose matriks A ditulis <strong className="font-mono text-violet-100">Aᵀ</strong> (dapat pula ditulis A<sup>T</sup>). Elemen pada baris ke-i dan kolom ke-j di A berpindah menjadi elemen baris ke-j dan kolom ke-i di Aᵀ. Karena baris dan kolom bertukar, ordo matriks juga berubah dari <span className="font-mono text-white">m × n</span> menjadi <span className="font-mono text-white">n × m</span>.</p>
                <Formula label="Definisi transpose">
                  <span>(Aᵀ)ᵢⱼ = aⱼᵢ</span>
                  <span>·</span>
                  <span>ordo Aᵀ = n × m jika ordo A = m × n</span>
                </Formula>
                <TransposeDiagram />
                <Example number={7} title="Menentukan transpose matriks">
                  <p className="text-sm text-slate-300">Diketahui matriks P berordo 2 × 3. Yuk, pindahkan baris pertama menjadi kolom pertama, dan baris kedua menjadi kolom kedua.</p>
                  <Formula label="Matriks P dan transposenya">
                    <span>P =</span>
                    <Matrix rows={[[3, -2, 5], [1, 4, 0]]} label="Matriks P berordo dua kali tiga, baris pertama 3, minus 2, 5, baris kedua 1, 4, 0" />
                    <span>→</span>
                    <span>Pᵀ =</span>
                    <Matrix rows={[[3, 1], [-2, 4], [5, 0]]} label="Transpose P berordo tiga kali dua, baris pertama 3, 1, baris kedua minus 2, 4, baris ketiga 5, 0" />
                  </Formula>
                  <p className="text-sm leading-relaxed text-slate-300">Kolom pertama P, yaitu <span className="font-mono text-white">(3, 1)</span>, menjadi baris pertama Pᵀ. Kolom kedua <span className="font-mono text-white">(−2, 4)</span> menjadi baris kedua, dan kolom ketiga <span className="font-mono text-white">(5, 0)</span> menjadi baris ketiga. Maka, ordo Pᵀ adalah 3 × 2.</p>
                </Example>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-violet-100">Baris dan kolom saling bertukar</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Transpose matriks baris menghasilkan matriks kolom, dan transpose matriks kolom menghasilkan matriks baris.</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><h3 className="font-display font-bold text-violet-100">Transpose dua kali kembali semula</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Jika matriks ditranspose dua kali, kita memperoleh matriks asal: <span className="font-mono text-white">(Aᵀ)ᵀ = A</span>.</p></div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-amber-200/20 bg-[linear-gradient(135deg,rgba(120,79,24,.18),rgba(14,25,42,.9))] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-200/20 bg-amber-200/[.08] text-amber-100"><Sparkles className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <h2 className="font-display text-xl font-extrabold text-white sm:text-2xl">Mantap! Apa yang sudah kita kuasai?</h2>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Matriks menyusun bilangan atau simbol dalam baris dan kolom; ordo ditulis banyak baris × banyak kolom.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Matriks dapat berbentuk persegi, baris, kolom, atau persegi panjang, serta membantu menuliskan SPL dengan ringkas.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Dua matriks sama jika ordonya sama dan semua elemen yang seletak sama.</li>
                    <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />Transpose menukar baris dengan kolom dan mengubah ordo m × n menjadi n × m.</li>
                  </ul>
                  <a href="#dasar" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-100 hover:text-white">Ulangi dari awal <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                </div>
              </div>
            </section>
          </div>

          <aside className="hidden desktop:block">
            <nav aria-label="Daftar isi materi" className="sticky top-6 rounded-2xl border border-white/10 bg-[#0b1628]/90 p-4 backdrop-blur">
              <h2 className="mb-3 font-display text-sm font-bold text-cyan-100">Peta petualangan</h2>
              <ul className="space-y-1">
                {outline.map(([label, id]) => <li key={id}><a href={`#${id}`} className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-cyan-200/[.08] hover:text-cyan-100">{label}</a></li>)}
              </ul>
            </nav>
          </aside>
        </div>
      </main>
    </div>
  );
}
