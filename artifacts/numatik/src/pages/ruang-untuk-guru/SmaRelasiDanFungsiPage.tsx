import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BookOpen, Check, Lightbulb, Sparkles, Target } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const sections = [
  ["1", "Kenalan dengan fungsi", "kenalan-fungsi"],
  ["2", "Relasi dan cara menyajikannya", "relasi"],
  ["3", "Notasi, domain, dan range", "notasi-domain"],
  ["4", "Keluarga fungsi", "keluarga-fungsi"],
  ["5", "Operasi aljabar fungsi", "operasi-fungsi"],
  ["6", "Sifat-sifat fungsi", "sifat-fungsi"],
  ["7", "Cek pemahaman", "cek-pemahaman"],
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

function MappingDiagram() {
  return (
    <svg viewBox="0 0 620 250" role="img" aria-label="Diagram relasi: setiap anggota himpunan A dipasangkan dengan satu anggota di himpunan B" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-function-mapping">
      <defs><marker id="rf-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#67d9e8" /></marker></defs>
      <ellipse cx="145" cy="125" rx="90" ry="104" fill="#13243a" stroke="#f6bd60" strokeWidth="2" />
      <ellipse cx="475" cy="125" rx="90" ry="104" fill="#13243a" stroke="#8ce2b8" strokeWidth="2" />
      <g fill="#fff4db" fontFamily="sans-serif" fontSize="16" fontWeight="700" textAnchor="middle">
        <text x="145" y="33">A (input)</text><text x="475" y="33">B (target)</text>
        <text x="145" y="83">1</text><text x="145" y="133">2</text><text x="145" y="183">3</text>
        <text x="475" y="83">kuning</text><text x="475" y="133">biru</text><text x="475" y="183">hijau</text>
      </g>
      <g fill="none" stroke="#67d9e8" strokeWidth="2.5" markerEnd="url(#rf-arrow)">
        <path d="M176 78 Q310 50 438 78" /><path d="M176 128 L438 128" /><path d="M176 178 Q310 205 438 78" />
      </g>
      <text x="310" y="235" fill="#a8b8cf" fontFamily="sans-serif" fontSize="13" textAnchor="middle">Setiap input memiliki tepat satu panah keluar</text>
    </svg>
  );
}

function RelationTypesDiagram() {
  return (
    <svg viewBox="0 0 720 230" role="img" aria-label="Tiga skema relasi: satu-ke-satu, banyak-ke-satu, dan satu-ke-banyak" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-relation-types">
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <ellipse cx="80" cy="116" rx="48" ry="82" /><ellipse cx="210" cy="116" rx="48" ry="82" />
        <ellipse cx="320" cy="116" rx="48" ry="82" /><ellipse cx="450" cy="116" rx="48" ry="82" />
        <ellipse cx="560" cy="116" rx="48" ry="82" /><ellipse cx="690" cy="116" rx="48" ry="82" />
      </g>
      <g fill="#fff4db" fontFamily="sans-serif" fontSize="12" textAnchor="middle">
        <text x="80" y="87">a</text><text x="80" y="121">b</text><text x="80" y="155">c</text>
        <text x="210" y="87">1</text><text x="210" y="121">2</text><text x="210" y="155">3</text>
        <text x="320" y="87">a</text><text x="320" y="121">b</text><text x="320" y="155">c</text>
        <text x="450" y="87">1</text><text x="450" y="121">2</text><text x="450" y="155">3</text>
        <text x="560" y="87">a</text><text x="560" y="121">b</text><text x="560" y="155">c</text>
        <text x="690" y="87">1</text><text x="690" y="121">2</text><text x="690" y="155">3</text>
      </g>
      <g fill="none" stroke="#67d9e8" strokeWidth="2">
        <path d="M97 84L193 84M97 118L193 118M97 152L193 152" />
        <path d="M337 84L433 118M337 118L433 118M337 152L433 152" />
        <path d="M577 84L673 84M577 84L673 152M577 118L673 118M577 152L673 152" />
      </g>
      <g fill="#a8b8cf" fontFamily="sans-serif" fontSize="12" textAnchor="middle">
        <text x="145" y="216">satu-ke-satu</text><text x="385" y="216">banyak-ke-satu</text><text x="625" y="216">satu-ke-banyak</text>
      </g>
    </svg>
  );
}

function FunctionFamiliesDiagram() {
  return (
    <svg viewBox="0 0 720 320" role="img" aria-label="Sketsa SVG grafik fungsi konstan, identitas, linear, nilai mutlak, kuadrat, dan tangga bilangan bulat terbesar" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-function-families">
      <defs><pattern id="rf-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#33445b" strokeWidth=".7" /></pattern></defs>
      <rect x="10" y="10" width="700" height="300" fill="url(#rf-grid)" />
      <g stroke="#91a4bd" strokeWidth="1.5"><path d="M25 160H700M120 20V300" /><path d="M375 160H700M470 20V300" /></g>
      <g fill="none" strokeWidth="3">
        <path d="M35 105H210" stroke="#f6bd60" />
        <path d="M35 235L210 60" stroke="#67d9e8" />
        <path d="M385 225L555 70" stroke="#8ce2b8" />
        <path d="M385 240L470 160L555 240" stroke="#f6bd60" />
        <path d="M565 225Q610 45 675 225" stroke="#67d9e8" />
        <path d="M565 235H600V205H635V175H670V145H700" stroke="#c4a7ff" />
      </g>
      <g fill="#fff4db" fontFamily="sans-serif" fontSize="12">
        <text x="40" y="95">konstan</text><text x="38" y="255">identitas</text><text x="515" y="60">kuadrat</text>
        <text x="390" y="256">nilai mutlak</text><text x="575" y="132">tangga</text>
      </g>
      <g fill="#a8b8cf" fontFamily="sans-serif" fontSize="11">
        <text x="128" y="18">y</text><text x="701" y="155">x</text><text x="478" y="18">y</text><text x="701" y="155">x</text>
      </g>
    </svg>
  );
}

function PropertyDiagram() {
  return (
    <svg viewBox="0 0 720 230" role="img" aria-label="Perbandingan pemetaan satu-ke-satu, onto, dan bijektif" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-function-properties">
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <ellipse cx="80" cy="112" rx="45" ry="82" /><ellipse cx="205" cy="112" rx="45" ry="82" />
        <ellipse cx="320" cy="112" rx="45" ry="82" /><ellipse cx="445" cy="112" rx="45" ry="82" />
        <ellipse cx="560" cy="112" rx="45" ry="82" /><ellipse cx="685" cy="112" rx="30" ry="82" />
      </g>
      <g fill="#fff4db" fontFamily="sans-serif" fontSize="12" textAnchor="middle">
        <text x="80" y="80">a</text><text x="80" y="115">b</text><text x="80" y="150">c</text>
        <text x="205" y="64">1</text><text x="205" y="98">2</text><text x="205" y="132">3</text><text x="205" y="166">4</text>
        <text x="320" y="80">a</text><text x="320" y="115">b</text><text x="320" y="150">c</text>
        <text x="445" y="80">1</text><text x="445" y="115">2</text><text x="445" y="150">3</text>
        <text x="560" y="80">a</text><text x="560" y="115">b</text><text x="560" y="150">c</text>
        <text x="685" y="80">1</text><text x="685" y="115">2</text><text x="685" y="150">3</text>
      </g>
      <g fill="none" stroke="#67d9e8" strokeWidth="2">
        <path d="M96 78L189 64M96 112L189 98M96 146L189 132" />
        <path d="M336 78L429 78M336 112L429 112M336 146L429 146" />
        <path d="M576 78L655 78M576 112L655 112M576 146L655 146" />
      </g>
      <g fill="#a8b8cf" fontFamily="sans-serif" fontSize="12" textAnchor="middle">
        <text x="142" y="216">satu-ke-satu</text><text x="382" y="216">onto (surjektif)</text><text x="620" y="216">bijektif</text>
      </g>
    </svg>
  );
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

const SmaRelasiDanFungsiPage = () => {
  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/komposisi-fungsi-dan-fungsi-invers" />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-4xl text-center" data-testid="lesson-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[.06] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><Sparkles className="h-3.5 w-3.5" />Matematika SMA · ayo jelajahi!</div>
          <p className="font-display text-xs font-bold uppercase tracking-[.24em] text-orange-200">Peta belajar fungsi</p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">Relasi dan Fungsi</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">Siap bertualang dari pasangan input-output sampai sifat grafik? Kita akan menghubungkan ide, membaca aturan, mencoba contoh, dan memeriksa jawaban langkah demi langkah. Tidak perlu terburu-buru—setiap bagian saling membantu!</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map(([number, label, id]) => <button key={id} type="button" onClick={() => jumpTo(id)} data-testid={`jump-${id}`} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs text-slate-200 transition-colors hover:border-cyan-200/40 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/60">{number} · {label}</button>)}
          </div>
        </header>

        <div className="grid gap-8 desktop:grid-cols-[minmax(0,1fr)_250px] phone-land:grid-cols-2">
          <div className="min-w-0 space-y-12">
            <section id="kenalan-fungsi" className="scroll-mt-6">
              <SectionHeading number="1" title="Kenalan dengan fungsi: mesin input-output" intro="Bayangkan sebuah mesin yang menerima masukan, menjalankan satu aturan, lalu mengeluarkan hasil. Fungsi adalah aturan yang memasangkan setiap masukan yang diizinkan dengan tepat satu keluaran. Satu masukan tidak boleh menghasilkan dua keluaran berbeda." />
              <div className="mb-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4"><p className="font-display text-sm font-bold text-cyan-100">Masukan</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Nilai yang kita masukkan ke aturan; semua masukan yang diizinkan membentuk domain.</p></div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4"><p className="font-display text-sm font-bold text-violet-100">Aturan</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Prosedur yang mengolah setiap masukan dengan cara yang sama dan konsisten.</p></div>
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.05] p-4"><p className="font-display text-sm font-bold text-emerald-100">Keluaran</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Hasil aturan; semua hasil yang benar-benar muncul membentuk range.</p></div>
              </div>
              <Example number={1} title="Mesin tiket wahana">
                <p className="text-sm leading-relaxed text-slate-300">Mesin memberi satu gelang warna kepada setiap nomor tiket: tiket 1 mendapat gelang kuning, tiket 2 gelang biru, dan tiket 3 juga gelang kuning. Setiap tiket mempunyai tepat satu warna, jadi aturan ini adalah fungsi. Dua tiket boleh saja mendapat warna yang sama, dan gelang hijau boleh tidak terpakai.</p>
                <MappingDiagram />
                <Note>Fungsi tidak menuntut setiap anggota himpunan tujuan dipakai. Yang wajib: setiap anggota domain mendapat satu dan hanya satu pasangan.</Note>
              </Example>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.045] p-4 text-sm leading-relaxed text-slate-200"><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Fungsi: satu input → tepat satu output.</div>
                <div className="rounded-2xl border border-rose-200/15 bg-rose-200/[.045] p-4 text-sm leading-relaxed text-slate-200">Bukan fungsi: ada input yang tidak dipasangkan, atau satu input memiliki dua output berbeda.</div>
              </div>
            </section>

            <section id="relasi" className="scroll-mt-6">
              <SectionHeading number="2" title="Relasi: cara menghubungkan dua himpunan" intro="Relasi adalah hubungan yang memasangkan anggota suatu himpunan dengan anggota himpunan lain. Hubungannya dapat ditulis sebagai pasangan berurutan, tabel, diagram panah, atau titik pada bidang koordinat. Fungsi merupakan relasi dengan aturan khusus pada setiap input." />
              <Example number={2} title="Klub dan kegiatan favorit">
                <p className="text-sm leading-relaxed text-slate-300">Misalkan A = {"{Ayu, Bima, Cici}"} adalah himpunan siswa dan B = {"{musik, tari, robotik}"} adalah pilihan kegiatan. Hubungan “mengikuti kegiatan” dapat ditulis R = {"{(Ayu, musik), (Bima, robotik), (Cici, musik)}"}. Pasangan berurutan pertama berasal dari A dan anggota kedua berasal dari B.</p>
                <DataTable headers={["Siswa", "Kegiatan", "Pasangan berurutan"]} rows={[
                  ["Ayu", "musik", "(Ayu, musik)"],
                  ["Bima", "robotik", "(Bima, robotik)"],
                  ["Cici", "musik", "(Cici, musik)"],
                ]} />
                <Note>Jika setiap siswa memilih tepat satu kegiatan, relasi ini juga fungsi dari A ke B. Bila Ayu mengikuti musik sekaligus tari, hubungan tersebut tetap relasi, tetapi bukan fungsi dari siswa ke kegiatan.</Note>
              </Example>
              <div className="my-5"><RelationTypesDiagram /></div>
              <p className="mb-5 text-xs leading-relaxed text-slate-400">Relasi dapat satu-ke-satu, banyak-ke-satu, satu-ke-banyak, atau banyak-ke-banyak. Dua bentuk pertama bisa menjadi fungsi jika setiap anggota domain memiliki tepat satu pasangan. Bentuk satu-ke-banyak tidak memenuhi syarat fungsi.</p>
              <Example number={3} title="Menguji apakah relasi adalah fungsi">
                <p className="text-sm leading-relaxed text-slate-300">Periksa tiga relasi berikut dari P = {"{1, 2, 3}"} menuju Q = {"{a, b, c}"}.</p>
                <DataTable headers={["Relasi", "Pasangan", "Fungsi?", "Alasan"]} rows={[
                  ["R₁", "{(1,a), (2,b), (3,c)}", "Ya", "Setiap input muncul sekali."],
                  ["R₂", "{(1,a), (2,a), (3,b)}", "Ya", "Beberapa input boleh menuju output yang sama."],
                  ["R₃", "{(1,a), (1,b), (2,c)}", "Tidak", "Input 1 memiliki dua output; input 3 juga tidak dipasangkan."],
                ]} />
                <p className="text-sm leading-relaxed text-slate-300">Cara cepatnya: telusuri semua anggota domain satu per satu. Pastikan masing-masing punya tepat satu panah keluar—bukan nol dan bukan dua.</p>
              </Example>
            </section>

            <section id="notasi-domain" className="scroll-mt-6">
              <SectionHeading number="3" title="Notasi fungsi, domain, kodomain, dan range" intro="Fungsi sering ditulis f: A → B. Huruf f menamai aturan, A adalah domain (himpunan asal), dan B adalah kodomain (himpunan tujuan). Range adalah anggota kodomain yang benar-benar menjadi keluaran." />
              <div className="mb-5 rounded-2xl border border-white/10 bg-white/[.035] p-4 font-mono text-sm leading-8 text-cyan-100 sm:text-base">
                <p>f : A → B</p><p>x ↦ f(x)</p><p className="font-sans text-xs leading-relaxed text-slate-300">Dibaca: fungsi f memetakan setiap x di A ke nilai f(x) di B.</p>
              </div>
              <Example number={4} title="Membaca aturan dan menentukan hasil">
                <p className="text-sm leading-relaxed text-slate-300">Diberikan fungsi f: A → B dengan A = {"{0, 1, 2, 3, 4}"} dan aturan f(x) = 2x + 1. Ambil setiap nilai x, kalikan dua, lalu tambahkan satu.</p>
                <DataTable headers={["x (domain)", "Perhitungan", "f(x)"]} rows={[
                  [0, "2(0) + 1", 1],
                  [1, "2(1) + 1", 3],
                  [2, "2(2) + 1", 5],
                  [3, "2(3) + 1", 7],
                  [4, "2(4) + 1", 9],
                ]} />
                <p className="text-sm leading-relaxed text-slate-300">Pasangan berurutannya {(<>{"{(0,1), (1,3), (2,5), (3,7), (4,9)}"}</>)}. Domainnya A. Jika kodomainnya B = {"{1, 3, 5, 7, 9, 11}"} maka range-nya {"{1, 3, 5, 7, 9}"}; angka 11 ada di kodomain, tetapi tidak menjadi keluaran dari aturan ini.</p>
              </Example>
              <Example number={5} title="Domain harus cocok dengan aturan">
                <p className="text-sm leading-relaxed text-slate-300">Untuk g(x) = √(x − 2) pada bilangan real, isi akar harus tidak negatif. Jadi x − 2 ≥ 0, atau x ≥ 2. Domain alaminya adalah {"[2, ∞)"} dan range-nya {"[0, ∞)"}. Untuk h(x) = 1/(x + 4), penyebut tidak boleh nol, sehingga domainnya semua bilangan real kecuali −4.</p>
                <Note>Sebelum mencari range, pastikan domainnya jelas. Pembatas domain bisa mengubah keluaran yang mungkin, bahkan saat rumusnya sama.</Note>
              </Example>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4"><p className="font-bold text-cyan-100">Domain</p><p className="mt-2 text-xs text-slate-300">Semua masukan yang diperbolehkan.</p></div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4"><p className="font-bold text-violet-100">Kodomain</p><p className="mt-2 text-xs text-slate-300">Himpunan tujuan yang ditetapkan.</p></div>
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.05] p-4"><p className="font-bold text-emerald-100">Range</p><p className="mt-2 text-xs text-slate-300">Keluaran yang benar-benar tercapai.</p></div>
              </div>
            </section>

            <section id="keluarga-fungsi" className="scroll-mt-6">
              <SectionHeading number="4" title="Keluarga fungsi: kenali bentuk aturannya" intro="Banyak fungsi memiliki pola yang bisa dikenali dari rumus maupun grafiknya. Bentuk-bentuk berikut sering muncul; amati ciri utamanya, lalu gunakan domain yang sesuai." />
              <div className="mb-5"><FunctionFamiliesDiagram /></div>
              <div className="space-y-3">
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">1. Fungsi linear</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Bentuk umumnya f(x) = ax + b dengan a ≠ 0. Nilai a menentukan kemiringan garis; b menunjukkan titik potong dengan sumbu-y. Contoh: f(x) = 3x − 2, sehingga f(4) = 10.</p></article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">2. Fungsi konstan</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Bentuknya f(x) = c, dengan c bilangan tetap. Apa pun inputnya, hasilnya sama. Contoh: f(x) = 4 memiliki range {"{4}"}; grafiknya garis mendatar y = 4.</p><p className="mt-2 font-mono text-xs text-cyan-100">Contoh hitung: f(−3) = 4 dan f(8) = 4.</p></article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">3. Fungsi identitas</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Bentuknya I(x) = x. Mesin tidak mengubah input. Contoh: I(−2) = −2. Grafiknya garis y = x yang melalui titik asal.</p></article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">4. Fungsi kuadrat</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Bentuk umumnya f(x) = ax² + bx + c, a ≠ 0. Grafiknya parabola: terbuka ke atas jika a &gt; 0 dan ke bawah jika a &lt; 0. Contoh f(x) = x² − 4x + 3 dapat ditulis (x − 2)² − 1, jadi titik puncaknya (2, −1) dan sumbu simetrinya x = 2.</p></article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">5. Fungsi nilai mutlak</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Untuk M(x) = |x|, nilai negatif di dalam tanda mutlak berubah menjadi positif. Bentuk per kasusnya M(x) = x jika x ≥ 0, dan M(x) = −x jika x &lt; 0. Contoh: |−6| = 6. Grafik dasarnya berbentuk huruf V.</p></article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">6. Fungsi rasional</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Bentuknya r(x) = p(x)/q(x), dengan p dan q polinom dan q(x) ≠ 0. Contoh r(x) = (x + 1)/(x − 2) memiliki domain x ≠ 2. Grafiknya memiliki asimtot tegak x = 2 dan asimtot datar y = 1.</p></article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">7. Fungsi polinom</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Fungsi polinom adalah jumlah suku berpangkat bulat tak negatif, misalnya p(x) = 2x³ − x² + 4x − 7. Pangkat tertinggi dengan koefisien bukan nol disebut derajat. Fungsi linear dan kuadrat juga termasuk polinom.</p></article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">8. Fungsi bilangan bulat terbesar (floor)</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Notasi ⌊x⌋ berarti bilangan bulat terbesar yang tidak melebihi x. Jadi ⌊2,7⌋ = 2, ⌊−1,2⌋ = −2, dan ⌊5⌋ = 5. Grafiknya berbentuk anak tangga dan setiap anak tangga tertutup di sisi kiri, terbuka di sisi kanan.</p></article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">9. Fungsi genap dan fungsi ganjil</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Fungsi genap memenuhi f(−x) = f(x) dan grafiknya simetris terhadap sumbu-y. Contoh f(x) = x². Fungsi ganjil memenuhi f(−x) = −f(x) dan grafiknya simetris terhadap titik asal. Contoh g(x) = x³. Syarat ini diperiksa pada domain yang simetris terhadap nol.</p></article>
              </div>
              <Example number={6} title="Memeriksa genap atau ganjil">
                <p className="text-sm leading-relaxed text-slate-300">Ambil p(x) = x⁴ + 2. Kita hitung p(−x) = (−x)⁴ + 2 = x⁴ + 2 = p(x), sehingga p adalah fungsi genap.</p>
                <p className="text-sm leading-relaxed text-slate-300">Untuk q(x) = x³ − x, q(−x) = −x³ + x = −(x³ − x) = −q(x), sehingga q adalah fungsi ganjil. Perhatikan bahwa kesimpulan berlaku karena domain kedua fungsi adalah seluruh bilangan real.</p>
              </Example>
            </section>

            <section id="operasi-fungsi" className="scroll-mt-6">
              <SectionHeading number="5" title="Operasi aljabar pada fungsi" intro="Dua fungsi dapat dijumlahkan, dikurangkan, dikalikan, atau dibagi seperti bentuk aljabar biasa. Namun, domain hasilnya perlu diperiksa: untuk jumlah, selisih, dan hasil kali, input harus berada di kedua domain; untuk hasil bagi, penyebut juga tidak boleh nol." />
              <div className="mb-5 rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4 font-mono text-xs leading-7 text-violet-100 sm:text-sm">
                <p>(f + g)(x) = f(x) + g(x)</p><p>(f − g)(x) = f(x) − g(x)</p><p>(fg)(x) = f(x)g(x)</p><p>(f/g)(x) = f(x)/g(x), jika g(x) ≠ 0</p>
              </div>
              <Example number={7} title="Empat operasi, satu pasangan fungsi">
                <p className="text-sm leading-relaxed text-slate-300">Misalkan f(x) = x² + 2x dan g(x) = 3 − x, keduanya berdomain bilangan real.</p>
                <DataTable headers={["Operasi", "Aturan hasil", "Nilai saat x = 2"]} rows={[
                  ["Jumlah", "(f + g)(x) = x² + x + 3", "4 + 2 + 3 = 9"],
                  ["Selisih", "(f − g)(x) = x² + 3x − 3", "4 + 6 − 3 = 7"],
                  ["Hasil kali", "(fg)(x) = (x² + 2x)(3 − x)", "(4 + 4)(1) = 8"],
                  ["Hasil bagi", "(f/g)(x) = (x² + 2x)/(3 − x)", "8/1 = 8, x ≠ 3"],
                ]} />
                <p className="text-sm leading-relaxed text-slate-300">Untuk hasil bagi, x = 3 dikeluarkan dari domain karena g(3) = 0. Sementara itu, jumlah, selisih, dan hasil kalinya terdefinisi untuk semua bilangan real.</p>
              </Example>
              <Example number={8} title="Domain irisan dan larangan penyebut nol">
                <p className="text-sm leading-relaxed text-slate-300">Misalkan u(x) = √x dan v(x) = 1/(x − 5). Domain u adalah x ≥ 0, sedangkan domain v adalah semua real kecuali 5.</p>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
                  <li>Domain u + v adalah {"[0, 5) ∪ (5, ∞)"}: kedua fungsi harus terdefinisi.</li>
                  <li>Domain uv sama, yaitu {"[0, 5) ∪ (5, ∞)"}.</li>
                  <li>Domain u/v juga mengharuskan v(x) ≠ 0. Karena 1/(x − 5) tidak pernah bernilai nol, domainnya tetap {"[0, 5) ∪ (5, ∞)"}.</li>
                </ul>
                <Note>Jangan hanya menggabungkan rumusnya. Selalu tulis syarat domain sebelum menyederhanakan.</Note>
              </Example>
            </section>

            <section id="sifat-fungsi" className="scroll-mt-6">
              <SectionHeading number="6" title="Sifat fungsi: satu-ke-satu, onto, dan bijektif" intro="Tiga sifat ini membandingkan keluaran fungsi dengan kodomainnya. Kuncinya: injektif memeriksa apakah input berbeda bertabrakan; surjektif memeriksa apakah semua target tercapai; bijektif memenuhi keduanya." />
              <div className="mb-5"><PropertyDiagram /></div>
              <div className="space-y-3">
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">Injektif (satu-ke-satu)</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Input berbeda menghasilkan output berbeda. Bentuk ekuivalennya: jika f(a) = f(b), maka a = b. Pada grafik, setiap garis mendatar memotong grafik paling banyak satu kali. Contoh f(x) = 4x − 7 dari R ke R adalah injektif.</p></article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">Surjektif (onto)</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Setiap anggota kodomain menjadi hasil dari setidaknya satu input; dengan kata lain range = kodomain. Contoh h(x) = x + 6 dari R ke R bersifat surjektif, karena untuk setiap y real, kita dapat memilih x = y − 6.</p></article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-bold text-cyan-100">Bijektif (korespondensi satu-satu)</h3><p className="mt-2 text-sm leading-relaxed text-slate-300">Fungsi bijektif sekaligus injektif dan surjektif. Setiap anggota kodomain dicapai oleh tepat satu input. Contoh f(x) = 2x + 1 dari R ke R bijektif; untuk target y, ada tepat satu input x = (y − 1)/2.</p></article>
              </div>
              <Example number={9} title="Kodomain dapat mengubah sifat surjektif">
                <p className="text-sm leading-relaxed text-slate-300">Perhatikan f(x) = x². Jika f: R → R, fungsi ini tidak injektif karena f(2) = f(−2) = 4, dan tidak surjektif karena tidak ada x real yang menghasilkan −1.</p>
                <p className="text-sm leading-relaxed text-slate-300">Namun, jika domainnya dibatasi menjadi [0, ∞) dan kodomainnya juga [0, ∞), fungsi yang sama menjadi bijektif: setiap keluaran nonnegatif memiliki tepat satu akar nonnegatif. Hebat, kan? Domain dan kodomain memang bagian penting dari definisi fungsi.</p>
              </Example>
            </section>

            <section id="cek-pemahaman" className="scroll-mt-6">
              <SectionHeading number="7" title="Cek pemahaman: kamu pasti bisa!" intro="Coba kerjakan dahulu tanpa melihat pembahasan. Setelah itu cocokkan langkahmu—bukan hanya hasil akhirnya—agar kamu tahu bagian mana yang sudah mantap." />
              <div className="space-y-4">
                <Example number={10} title="Latihan singkat beserta pembahasan">
                  <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-300">
                    <li>Apakah {"{(1,a), (2,b), (3,b)}"} fungsi? <p className="mt-1 text-emerald-100">Ya. Setiap input 1, 2, dan 3 muncul tepat satu kali; output b boleh mendapat dua input.</p></li>
                    <li>Untuk f(x) = 5x − 4, tentukan f(−2). <p className="mt-1 text-emerald-100">f(−2) = 5(−2) − 4 = −10 − 4 = −14.</p></li>
                    <li>Jika p(x) = x + 3 dan q(x) = 2x − 1, tentukan (p + q)(x) dan (pq)(x). <p className="mt-1 text-emerald-100">(p + q)(x) = 3x + 2. (pq)(x) = (x + 3)(2x − 1) = 2x² + 5x − 3.</p></li>
                    <li>Apakah r(x) = x² dari R ke R injektif? Apakah onto? <p className="mt-1 text-emerald-100">Tidak injektif: r(3) = r(−3). Tidak onto R: nilai negatif tidak pernah menjadi keluaran.</p></li>
                  </ol>
                </Example>
                <div className="rounded-3xl border border-emerald-200/20 bg-emerald-200/[.05] p-5">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-emerald-100"><Target className="h-5 w-5" />Ringkasan bekalmu</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-200">
                    <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Relasi memasangkan anggota dua himpunan; fungsi memasangkan setiap input dengan tepat satu output.</li>
                    <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Domain adalah masukan, kodomain adalah himpunan tujuan, dan range adalah keluaran yang tercapai.</li>
                    <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Notasi f(x) menyatakan nilai keluaran untuk input x; cek domain saat memakai akar dan pecahan.</li>
                    <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Operasi fungsi mengikuti aljabar, dengan perhatian khusus pada irisan domain dan penyebut nol.</li>
                    <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Injektif berarti tidak ada tabrakan output, surjektif berarti semua kodomain tercapai, dan bijektif memenuhi keduanya.</li>
                  </ul>
                </div>
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
              <div className="mt-5 rounded-2xl border border-orange-200/15 bg-orange-200/[.05] p-3 text-xs leading-relaxed text-orange-50/80"><ArrowDown className="mr-1 inline h-3.5 w-3.5 text-orange-200" />Tips: tandai domain lebih dahulu sebelum menghitung range atau operasi fungsi.</div>
            </div>
          </aside>
        </div>
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => jumpTo("kenalan-fungsi")} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/[.07] px-4 py-2 text-sm font-bold text-cyan-100 transition-colors hover:bg-cyan-300/[.14]"><ArrowRight className="h-4 w-4 -rotate-90" />Kembali ke awal</button>
        </div>
      </main>
    </div>
  );
};

export default SmaRelasiDanFungsiPage;
