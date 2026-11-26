import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BookOpen, Check, Lightbulb, Sparkles, Target } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const sections = [
  ["1", "Membalik aturan", "membalik-aturan"],
  ["2", "Kapan invers ada?", "syarat-invers"],
  ["3", "Menentukan rumus invers", "rumus-invers"],
  ["4", "Domain, range, dan grafik", "domain-range-grafik"],
  ["5", "Memakai fungsi invers", "menggunakan-invers"],
  ["6", "Latihan dan rangkuman", "latihan-rangkuman"],
];

function SectionHeading({ number, title, intro }: { number: string; title: string; intro: string }) {
  return (
    <div className="mb-5 flex gap-4" data-testid={`heading-${number}`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-sm font-black text-cyan-100">{number}</span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{intro}</p>
      </div>
    </div>
  );
}

function Example({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]" data-testid={`example-${number}`}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200"><BookOpen className="h-4 w-4" aria-hidden="true" /></span>
        <div><p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh {number}</p><h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3></div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4 text-sm leading-relaxed text-slate-200"><Lightbulb className="mr-2 inline h-4 w-4 text-amber-200" aria-hidden="true" />{children}</div>;
}

function DataTable({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-max border-collapse text-left text-xs sm:text-sm">
        <thead><tr className="bg-cyan-300/[.1] text-cyan-50">{headers.map((header, index) => <th key={index} scope="col" className="border-b border-white/10 px-3 py-2 font-bold">{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, ri) => <tr key={ri} className={ri % 2 === 0 ? "bg-white/[.035]" : "bg-white/[.015]"}>{row.map((cell, ci) => <td key={ci} className="border-b border-white/[.06] px-3 py-2 text-slate-200">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function ForwardAndInverseDiagram() {
  return (
    <svg viewBox="0 0 720 260" role="img" aria-label="Pemetaan f dari A ke B dan pemetaan invers f invers dari B kembali ke A" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-forward-inverse">
      <defs>
        <marker id="fi-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#67d9e8" /></marker>
        <marker id="fi-arrow-reverse" markerWidth="8" height="8" refX="1" refY="4" orient="auto"><path d="M8 0L0 4L8 8z" fill="#c4a7ff" /></marker>
      </defs>
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <ellipse cx="92" cy="130" rx="60" ry="104" /><ellipse cx="280" cy="130" rx="60" ry="104" />
        <ellipse cx="440" cy="130" rx="60" ry="104" /><ellipse cx="628" cy="130" rx="60" ry="104" />
      </g>
      <g fill="#fff4db" fontFamily="sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">
        <text x="92" y="46">A</text><text x="280" y="46">B</text><text x="440" y="46">B</text><text x="628" y="46">A</text>
        <text x="92" y="95">1</text><text x="92" y="135">2</text><text x="92" y="175">3</text>
        <text x="280" y="95">4</text><text x="280" y="135">7</text><text x="280" y="175">10</text>
        <text x="440" y="95">4</text><text x="440" y="135">7</text><text x="440" y="175">10</text>
        <text x="628" y="95">1</text><text x="628" y="135">2</text><text x="628" y="175">3</text>
      </g>
      <g fill="none" stroke="#67d9e8" strokeWidth="2.5" markerEnd="url(#fi-arrow)">
        <path d="M120 93L252 93" /><path d="M120 133L252 133" /><path d="M120 173L252 173" />
      </g>
      <g fill="none" stroke="#c4a7ff" strokeWidth="2.5" markerStart="url(#fi-arrow-reverse)">
        <path d="M600 93L468 93" /><path d="M600 133L468 133" /><path d="M600 173L468 173" />
      </g>
      <g fill="#a8b8cf" fontFamily="sans-serif" fontSize="14" fontWeight="700" textAnchor="middle">
        <text x="186" y="232">f</text><text x="534" y="232">f⁻¹</text>
        <text x="360" y="250" fontSize="12">Invers membalik arah pasangan, bukan membagi 1 dengan fungsi.</text>
      </g>
    </svg>
  );
}

function ReflectionDiagram() {
  return (
    <svg viewBox="0 0 600 320" role="img" aria-label="Grafik f(x) sama dengan 2x tambah 1 dan grafik inversnya, simetris terhadap garis y sama dengan x" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-inverse-reflection">
      <defs><pattern id="fi-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#33445b" strokeWidth=".7" /></pattern></defs>
      <rect x="10" y="10" width="580" height="300" fill="url(#fi-grid)" />
      <g stroke="#91a4bd" strokeWidth="1.5"><path d="M20 150H580M300 20V300" /></g>
      <path d="M160 290L440 10" fill="none" stroke="#f6bd60" strokeDasharray="7 6" strokeWidth="2" />
      <path d="M220 270L360 -10" fill="none" stroke="#67d9e8" strokeWidth="3" />
      <path d="M180 230L460 90" fill="none" stroke="#c4a7ff" strokeWidth="3" />
      <g fill="#fff4db" fontFamily="sans-serif" fontSize="13">
        <text x="385" y="43">f(x) = 2x + 1</text>
        <text x="408" y="118">f⁻¹(x) = (x − 1)/2</text>
        <text x="210" y="63">y = x</text><text x="570" y="144">x</text><text x="307" y="24">y</text>
      </g>
      <circle cx="340" cy="30" r="4" fill="#67d9e8" />
      <circle cx="420" cy="110" r="4" fill="#c4a7ff" />
      <text x="300" y="304" fill="#a8b8cf" fontFamily="sans-serif" fontSize="12" textAnchor="middle">Titik (1, 3) pada f bertukar menjadi (3, 1) pada f⁻¹.</text>
    </svg>
  );
}

const SmaFungsiInversPage = () => {
  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/komposisi-fungsi-dan-fungsi-invers" />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-4xl text-center" data-testid="lesson-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[.06] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><Sparkles className="h-3.5 w-3.5" />Matematika SMA · ayo membalik aturan!</div>
          <p className="font-display text-xs font-bold uppercase tracking-[.24em] text-orange-200">Petualangan fungsi</p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">Fungsi Invers</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">Kalau sebuah fungsi mengubah input menjadi output, bisakah kita berjalan mundur untuk menemukan inputnya lagi? Yuk, cari tahu kapan aturan dapat dibalik, bagaimana menyusun rumus invers, dan bagaimana grafiknya saling bercermin!</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map(([number, label, id]) => <button key={id} type="button" onClick={() => jumpTo(id)} data-testid={`jump-${id}`} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs text-slate-200 transition-colors hover:border-cyan-200/40 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/60">{number} · {label}</button>)}
          </div>
        </header>

        <div className="grid gap-8 desktop:grid-cols-[minmax(0,1fr)_250px] phone-land:grid-cols-2">
          <div className="min-w-0 space-y-12">
            <section id="membalik-aturan" className="scroll-mt-6">
              <SectionHeading number="1" title="Membalik aturan: dari hasil kembali ke asal" intro="Fungsi invers membalik proses suatu fungsi. Jika f mengubah x menjadi y, maka f⁻¹ mengubah y kembali menjadi x. Agar perjalanan pulang selalu jelas, setiap output harus menunjuk balik ke satu input saja." />
              <div className="mb-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4"><p className="font-display text-sm font-bold text-cyan-100">Fungsi asal</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Membawa x ke y melalui aturan f.</p></div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4"><p className="font-display text-sm font-bold text-violet-100">Fungsi invers</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Membawa y kembali ke x melalui aturan f⁻¹.</p></div>
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.05] p-4"><p className="font-display text-sm font-bold text-emerald-100">Pasangan bertukar</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Jika (x, y) milik f, maka (y, x) milik f⁻¹.</p></div>
              </div>
              <Example number={1} title="Mesin pengubah poin">
                <p className="text-sm leading-relaxed text-slate-300">Aturan f(x) = 3x + 2 mengubah poin awal menjadi poin baru. Misalnya, input 4 menghasilkan 14. Untuk membaliknya, kurangi 2 dahulu, lalu bagi 3: dari 14 kita kembali memperoleh 4.</p>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 font-mono text-sm leading-7 text-cyan-100">
                  <p>4 ── f(x) = 3x + 2 ──▶ 14</p>
                  <p>4 ◀── f⁻¹(x) = (x − 2)/3 ── 14</p>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">Pasangan (4, 14) pada f menjadi pasangan (14, 4) pada f⁻¹. Kita akan belajar cara memastikan bahwa “perjalanan pulang” ini selalu berhasil.</p>
                <Note>Simbol f⁻¹(x) berarti fungsi invers, bukan 1/f(x). Keduanya adalah hal yang berbeda.</Note>
              </Example>
            </section>

            <section id="syarat-invers" className="scroll-mt-6">
              <SectionHeading number="2" title="Kapan sebuah fungsi mempunyai invers?" intro="Agar aturan dapat dibalik sebagai fungsi, tidak boleh ada dua input berbeda yang menghasilkan output sama. Jika fungsi dipandang sebagai pemetaan dari A ke seluruh B, syarat tepatnya adalah bijektif: injektif sekaligus surjektif." />
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                  <h3 className="font-display font-bold text-cyan-100">Injektif: tidak ada input bertabrakan</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Setiap output berasal dari paling banyak satu input. Bentuk uji: jika f(a) = f(b), maka a = b. Dengan begitu, saat dibalik kita tahu input yang tepat.</p>
                </article>
                <article className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4">
                  <h3 className="font-display font-bold text-violet-100">Surjektif: semua target tercapai</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Setiap anggota kodomain menjadi hasil dari setidaknya satu input. Ini memastikan tidak ada anggota kodomain yang tidak mempunyai pasangan balik.</p>
                </article>
              </div>
              <Example number={2} title="Pemetaan yang dapat dibalik">
                <p className="text-sm leading-relaxed text-slate-300">Ambil A = {"{1, 2, 3}"} dan B = {"{4, 7, 10}"}. Definisikan f dengan aturan f(x) = 3x + 1. Tabelnya menunjukkan bahwa setiap anggota A dipasangkan ke satu anggota B yang berbeda, dan semua anggota B terpakai.</p>
                <DataTable headers={["x di A", "f(x) = 3x + 1", "Pasangan"]} rows={[
                  [1, 4, "(1, 4)"],
                  [2, 7, "(2, 7)"],
                  [3, 10, "(3, 10)"],
                ]} />
                <p className="text-sm leading-relaxed text-slate-300">Karena f bijektif dari A ke B, inversnya berangkat dari B menuju A. Pasangan inversnya {(<>{"{(4,1), (7,2), (10,3)}"}</>)}.</p>
                <ForwardAndInverseDiagram />
              </Example>
              <Example number={3} title="Fungsi yang gagal dibalik pada domain asal">
                <p className="text-sm leading-relaxed text-slate-300">Fungsi q(x) = x² dengan domain semua bilangan real bukan satu-ke-satu: q(−3) = 9 dan q(3) = 9. Jika dibalik, input 9 harus kembali menjadi −3 sekaligus 3—ini tidak dapat menjadi satu nilai fungsi.</p>
                <p className="text-sm leading-relaxed text-slate-300">Namun, jika domain q dibatasi menjadi [0, ∞) dan kodomainnya [0, ∞), fungsi menjadi bijektif. Pada domain baru ini, inversnya q⁻¹(x) = √x. Pembatasan domain menyelamatkan aturan yang sebelumnya belum dapat dibalik.</p>
                <Note>Untuk grafik, uji garis mendatar membantu memeriksa injektif: jika ada garis mendatar yang memotong grafik lebih dari sekali, fungsi tidak injektif pada domain tersebut.</Note>
              </Example>
            </section>

            <section id="rumus-invers" className="scroll-mt-6">
              <SectionHeading number="3" title="Menentukan rumus fungsi invers" intro="Kita bisa menemukan aturan kebalikan secara aljabar. Triknya sederhana: tulis output sebagai y, tukar peran x dan y, lalu selesaikan persamaan untuk y. Terakhir, ganti nama y menjadi f⁻¹(x)." />
              <div className="mb-5 rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4 font-mono text-xs leading-7 text-violet-100 sm:text-sm">
                <p>1. Misalkan y = f(x)</p><p>2. Tukar x dan y</p><p>3. Selesaikan persamaan untuk y</p><p>4. Tulis f⁻¹(x) = y</p><p className="font-sans text-xs leading-relaxed text-slate-300">Sesudahnya, periksa dengan komposisi: f(f⁻¹(x)) = x dan f⁻¹(f(x)) = x.</p>
              </div>
              <Example number={4} title="Mencari invers fungsi linear">
                <p className="text-sm leading-relaxed text-slate-300">Tentukan invers dari f(x) = 5x − 6.</p>
                <ol className="list-decimal space-y-2 pl-5 font-mono text-sm leading-relaxed text-slate-200">
                  <li>Misalkan y = 5x − 6.</li>
                  <li>Tukar x dan y: x = 5y − 6.</li>
                  <li>Tambahkan 6: x + 6 = 5y.</li>
                  <li>Bagi 5: y = (x + 6)/5.</li>
                </ol>
                <p className="text-sm leading-relaxed text-emerald-100">Jadi f⁻¹(x) = (x + 6)/5. Cek cepat: f⁻¹(9) = 3, lalu f(3) = 9.</p>
              </Example>
              <Example number={5} title="Invers fungsi rasional, langkah demi langkah">
                <p className="text-sm leading-relaxed text-slate-300">Cari invers dari g(x) = (3x + 2)/(x − 4). Penyebut fungsi asal tidak boleh nol, jadi domain g adalah x ≠ 4.</p>
                <ol className="list-decimal space-y-2 pl-5 font-mono text-xs leading-relaxed text-slate-200 sm:text-sm">
                  <li>y = (3x + 2)/(x − 4).</li>
                  <li>Kalikan silang: y(x − 4) = 3x + 2.</li>
                  <li>Kumpulkan suku x: yx − 3x = 4y + 2.</li>
                  <li>Faktorkan: x(y − 3) = 4y + 2.</li>
                  <li>Bagi y − 3: x = (4y + 2)/(y − 3).</li>
                  <li>Tukar kembali nama variabel: g⁻¹(x) = (4x + 2)/(x − 3).</li>
                </ol>
                <p className="text-sm leading-relaxed text-slate-300">Karena penyebut g⁻¹ tidak boleh nol, domain g⁻¹ adalah x ≠ 3. Nilai 3 memang tidak termasuk range g: persamaan (3x + 2)/(x − 4) = 3 akan menghasilkan 2 = −12, yang mustahil.</p>
                <Note>Saat membagi dengan bentuk yang memuat variabel, catat syarat agar pembaginya tidak nol. Di sini y − 3 ≠ 0, sehingga input invers tidak boleh 3.</Note>
              </Example>
              <Example number={6} title="Menguji hasil dengan komposisi">
                <p className="text-sm leading-relaxed text-slate-300">Untuk f(x) = 5x − 6 dan f⁻¹(x) = (x + 6)/5, kita cek kedua arah:</p>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 font-mono text-xs leading-7 text-cyan-100 sm:text-sm">
                  <p>f(f⁻¹(x)) = 5((x + 6)/5) − 6 = x + 6 − 6 = x</p>
                  <p>f⁻¹(f(x)) = ((5x − 6) + 6)/5 = 5x/5 = x</p>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">Kedua komposisi menghasilkan x, jadi kedua aturan benar-benar saling membatalkan.</p>
              </Example>
            </section>

            <section id="domain-range-grafik" className="scroll-mt-6">
              <SectionHeading number="4" title="Domain, range, dan cermin y = x" intro="Ketika fungsi dibalik, himpunan asal dan hasil bertukar tempat. Pada grafik, setiap titik (a, b) berubah menjadi (b, a), sehingga grafik f dan f⁻¹ saling mencerminkan terhadap garis y = x." />
              <div className="mb-5"><ReflectionDiagram /></div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4"><p className="font-display text-sm font-bold text-cyan-100">Domain f⁻¹</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Sama dengan range f.</p></div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4"><p className="font-display text-sm font-bold text-violet-100">Range f⁻¹</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Sama dengan domain f.</p></div>
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.05] p-4"><p className="font-display text-sm font-bold text-emerald-100">Titik grafik</p><p className="mt-2 text-xs leading-relaxed text-slate-300">(a, b) pada f menjadi (b, a) pada f⁻¹.</p></div>
              </div>
              <Example number={7} title="Membalik domain dan range dari tabel">
                <p className="text-sm leading-relaxed text-slate-300">Untuk f(x) = 2x + 3 dengan domain A = {"{−1, 0, 2}"} dan kodomain B = {"{1, 3, 7, 9}"}, pasangan fungsi adalah (−1,1), (0,3), dan (2,7). Range f adalah {"{1, 3, 7}"}; angka 9 di kodomain tidak tercapai.</p>
                <p className="text-sm leading-relaxed text-slate-300">Maka domain f⁻¹ adalah {"{1, 3, 7}"} dan range f⁻¹ adalah {"{−1, 0, 2}"}. Nilai 9 tidak boleh dimasukkan ke domain invers untuk pemetaan ini karena tidak memiliki pasangan asal.</p>
              </Example>
              <Note>Untuk grafik fungsi yang punya invers, uji garis vertikal memastikan grafik asal memang fungsi; uji garis horizontal memastikan fungsi itu injektif dan dapat dibalik pada domain yang dipilih.</Note>
            </section>

            <section id="menggunakan-invers" className="scroll-mt-6">
              <SectionHeading number="5" title="Memakai fungsi invers untuk mencari input" intro="Invers berguna saat kita mengetahui hasil dan ingin menemukan nilai awal yang menghasilkan hasil tersebut. Masukkan nilai yang diketahui ke fungsi invers, bukan ke fungsi asal." />
              <Example number={8} title="Menemukan bilangan awal">
                <p className="text-sm leading-relaxed text-slate-300">Sebuah aturan memberi hasil f(x) = 4x + 7. Jika hasil akhirnya 31, bilangan awalnya adalah f⁻¹(31).</p>
                <p className="font-mono text-sm leading-relaxed text-cyan-100">f⁻¹(x) = (x − 7)/4</p>
                <p className="font-mono text-sm leading-relaxed text-emerald-100">f⁻¹(31) = (31 − 7)/4 = 24/4 = 6</p>
                <p className="text-sm leading-relaxed text-slate-300">Cek: f(6) = 4(6) + 7 = 31. Jadi bilangan awalnya memang 6.</p>
              </Example>
              <Example number={9} title="Mencari input dari nilai invers">
                <p className="text-sm leading-relaxed text-slate-300">Misalkan p(x) = 2x + 5. Tentukan p⁻¹(11) dan p⁻¹(−1).</p>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
                  <li>p⁻¹(x) = (x − 5)/2.</li>
                  <li>p⁻¹(11) = (11 − 5)/2 = 3.</li>
                  <li>p⁻¹(−1) = (−1 − 5)/2 = −3.</li>
                </ul>
                <p className="text-sm leading-relaxed text-slate-300">Artinya p(3) = 11 dan p(−3) = −1. Invers membantu berjalan dari hasil kembali ke masukan dengan cepat.</p>
              </Example>
              <Note>Jangan tertukar antara f⁻¹(7) dan f(−1). Angka kecil “−1” di atas f menandai invers; ia bukan pangkat biasa.</Note>
            </section>

            <section id="latihan-rangkuman" className="scroll-mt-6">
              <SectionHeading number="6" title="Latihan dan rangkuman: cek langkahmu!" intro="Coba jawab dahulu, lalu cocokkan dengan pembahasan. Perhatikan juga alasan domain dan syarat satu-ke-satu, bukan hanya rumus akhirnya." />
              <Example number={10} title="Tantangan invers">
                <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-300">
                  <li>Tentukan invers h(x) = 7x + 4. <p className="mt-1 text-emerald-100">Misalkan y = 7x + 4, tukar x dan y, lalu selesaikan: x = 7y + 4 → y = (x − 4)/7. Jadi h⁻¹(x) = (x − 4)/7.</p></li>
                  <li>Tentukan domain invers dari k(x) = (2x − 1)/(x + 3). <p className="mt-1 text-emerald-100">Domain k adalah x ≠ −3. Range k tidak memuat 2 karena 2x − 1 = 2(x + 3) akan memberi −1 = 6. Jadi domain k⁻¹ adalah x ≠ 2.</p></li>
                  <li>Apakah r(x) = x² dari R ke R mempunyai invers fungsi? <p className="mt-1 text-emerald-100">Tidak. r(−a) = r(a), misalnya r(−2) = r(2) = 4. Jika domain dibatasi ke [0, ∞) dan kodomain [0, ∞), inversnya √x.</p></li>
                  <li>Jika f(5) = 12 dan f mempunyai invers, berapa f⁻¹(12)? <p className="mt-1 text-emerald-100">f⁻¹(12) = 5, sebab invers mengembalikan output 12 ke input asalnya.</p></li>
                </ol>
              </Example>
              <div className="rounded-3xl border border-emerald-200/20 bg-emerald-200/[.05] p-5">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-emerald-100"><Target className="h-5 w-5" />Bekal penting sebelum lanjut</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-200">
                  <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Pasangan (x, y) pada f menjadi (y, x) pada f⁻¹.</li>
                  <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Untuk invers dari A ke B yang didefinisikan pada seluruh B, f harus bijektif.</li>
                  <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Cari rumus invers dengan menulis y = f(x), menukar x dan y, lalu menyelesaikan y.</li>
                  <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Domain dan range bertukar; grafik f dan f⁻¹ bercermin terhadap y = x.</li>
                  <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Pastikan f(f⁻¹(x)) = x dan f⁻¹(f(x)) = x pada domain masing-masing.</li>
                </ul>
              </div>
            </section>
          </div>

          <aside className="hidden desktop:block">
            <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#0b1628]/90 p-5 backdrop-blur-md">
              <p className="font-display text-sm font-bold text-white">Peta perjalanan</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">Pilih bagian untuk melompat. Kamu bisa kembali ke sini kapan saja.</p>
              <nav className="mt-4 space-y-1">
                {sections.map(([number, label, id]) => <button key={id} type="button" onClick={() => jumpTo(id)} className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs text-slate-300 transition-colors hover:bg-white/[.06] hover:text-cyan-100"><span className="grid h-6 w-6 place-items-center rounded-lg bg-cyan-300/10 font-bold text-cyan-100">{number}</span>{label}</button>)}
              </nav>
              <div className="mt-5 rounded-2xl border border-orange-200/15 bg-orange-200/[.05] p-3 text-xs leading-relaxed text-orange-50/80"><ArrowDown className="mr-1 inline h-3.5 w-3.5 text-orange-200" />Tips: periksa syarat domain dan satu-ke-satu sebelum membalik aturan.</div>
            </div>
          </aside>
        </div>
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => jumpTo("membalik-aturan")} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/[.07] px-4 py-2 text-sm font-bold text-cyan-100 transition-colors hover:bg-cyan-300/[.14]"><ArrowRight className="h-4 w-4 -rotate-90" />Kembali ke awal</button>
        </div>
      </main>
    </div>
  );
};

export default SmaFungsiInversPage;
