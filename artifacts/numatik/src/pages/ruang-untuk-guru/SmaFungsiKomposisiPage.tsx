import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BookOpen, Check, Lightbulb, Sparkles, Target } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const sections = [
  ["1", "Dua aturan jadi satu", "rantai-fungsi"],
  ["2", "Menghitung komposisi", "menghitung-komposisi"],
  ["3", "Urutan dan domain", "urutan-domain"],
  ["4", "Menentukan fungsi yang belum diketahui", "mencari-fungsi"],
  ["5", "Sifat komposisi", "sifat-komposisi"],
  ["6", "Invers dari komposisi", "invers-komposisi"],
  ["7", "Latihan dan rangkuman", "latihan-rangkuman"],
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

function CompositionFlowDiagram() {
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="Dua urutan mesin: x masuk ke g lalu f, atau x masuk ke f lalu g" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-composition-flow">
      <defs><marker id="fc-arrow" markerWidth="8" height="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#67d9e8" /></marker></defs>
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <rect x="34" y="46" width="112" height="58" rx="18" /><rect x="252" y="46" width="112" height="58" rx="18" /><rect x="470" y="46" width="170" height="58" rx="18" />
        <rect x="34" y="192" width="112" height="58" rx="18" /><rect x="252" y="192" width="112" height="58" rx="18" /><rect x="470" y="192" width="170" height="58" rx="18" />
      </g>
      <g fill="none" stroke="#67d9e8" strokeWidth="2.5" markerEnd="url(#fc-arrow)">
        <path d="M150 75H244" /><path d="M368 75H462" />
        <path d="M150 221H244" /><path d="M368 221H462" />
      </g>
      <g fill="#fff4db" fontFamily="sans-serif" fontSize="16" fontWeight="700" textAnchor="middle">
        <text x="90" y="81">x</text><text x="308" y="81">g(x)</text><text x="555" y="81">f(g(x))</text>
        <text x="90" y="227">x</text><text x="308" y="227">f(x)</text><text x="555" y="227">g(f(x))</text>
      </g>
      <g fill="#a8b8cf" fontFamily="sans-serif" fontSize="13" textAnchor="middle">
        <text x="198" y="62">g</text><text x="416" y="62">f</text>
        <text x="198" y="208">f</text><text x="416" y="208">g</text>
        <text x="350" y="137" fill="#67d9e8" fontSize="15" fontWeight="700">f ∘ g (x) = f(g(x))</text>
        <text x="350" y="283" fill="#c4a7ff" fontSize="15" fontWeight="700">g ∘ f (x) = g(f(x))</text>
      </g>
    </svg>
  );
}

function DomainFlowDiagram() {
  return (
    <svg viewBox="0 0 640 190" role="img" aria-label="Input x harus berada di domain g dan keluaran g dari x harus berada di domain f" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-composition-domain">
      <defs><marker id="fc-domain-arrow" markerWidth="8" height="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#67d9e8" /></marker></defs>
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <circle cx="92" cy="82" r="36" /><rect x="220" y="46" width="116" height="72" rx="20" /><circle cx="472" cy="82" r="36" />
      </g>
      <g fill="none" stroke="#67d9e8" strokeWidth="2.5" markerEnd="url(#fc-domain-arrow)">
        <path d="M132 82H210" /><path d="M346 82H430" />
      </g>
      <g fill="#fff4db" fontFamily="sans-serif" fontSize="15" fontWeight="700" textAnchor="middle">
        <text x="92" y="87">x</text><text x="278" y="87">g</text><text x="472" y="87">g(x)</text>
      </g>
      <g fill="#a8b8cf" fontFamily="sans-serif" fontSize="12" textAnchor="middle">
        <text x="92" y="147">x ∈ Dg</text><text x="472" y="147">g(x) ∈ Df</text>
        <text x="320" y="177">Kedua syarat harus dipenuhi agar f(g(x)) terdefinisi.</text>
      </g>
    </svg>
  );
}

const SmaFungsiKomposisiPage = () => {
  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/komposisi-fungsi-dan-fungsi-invers" />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-4xl text-center" data-testid="lesson-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[.06] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><Sparkles className="h-3.5 w-3.5" />Matematika SMA · ayo susun aturannya!</div>
          <p className="font-display text-xs font-bold uppercase tracking-[.24em] text-orange-200">Petualangan fungsi</p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">Fungsi Komposisi</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">Bagaimana jika hasil dari satu mesin langsung menjadi masukan mesin berikutnya? Itulah ide komposisi fungsi! Kita akan menyusun aturan, membaca urutannya, menjaga domain, dan membuktikan hubungan komposisi dengan invers.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map(([number, label, id]) => <button key={id} type="button" onClick={() => jumpTo(id)} data-testid={`jump-${id}`} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs text-slate-200 transition-colors hover:border-cyan-200/40 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/60">{number} · {label}</button>)}
          </div>
        </header>

        <div className="grid gap-8 desktop:grid-cols-[minmax(0,1fr)_250px] phone-land:grid-cols-2">
          <div className="min-w-0 space-y-12">
            <section id="rantai-fungsi" className="scroll-mt-6">
              <SectionHeading number="1" title="Dua aturan menjadi satu perjalanan" intro="Komposisi terjadi saat keluaran suatu fungsi dipakai sebagai masukan fungsi lain. Untuk f setelah g, kita tulis f ∘ g dan membacanya “f komposisi g”. Aturan yang dikerjakan lebih dahulu adalah g, jadi (f ∘ g)(x) = f(g(x))." />
              <div className="mb-5"><CompositionFlowDiagram /></div>
              <div className="mb-5 rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4 font-mono text-xs leading-7 text-violet-100 sm:text-sm">
                <p>(f ∘ g)(x) = f(g(x))</p>
                <p>(g ∘ f)(x) = g(f(x))</p>
                <p className="font-sans text-xs leading-relaxed text-slate-300">Baca dari kanan: fungsi yang menempel langsung pada x dikerjakan lebih dahulu.</p>
              </div>
              <Example number={1} title="Mesin tiket dan mesin poin">
                <p className="text-sm leading-relaxed text-slate-300">Mesin g mengubah nomor tiket dengan menambahkan 4, sedangkan mesin f menggandakan angka lalu mengurangi 1. Jika tiket awal bernomor 3, urutan g lalu f memberi hasil berikut:</p>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 font-mono text-sm leading-7 text-cyan-100">
                  <p>3 ──g(x)=x+4──▶ 7 ──f(x)=2x−1──▶ 13</p>
                  <p>(f ∘ g)(3) = f(g(3)) = f(7) = 13</p>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">Komposisi menggabungkan dua langkah itu menjadi satu aturan langsung. Dari input 3, hasil akhirnya tetap 13.</p>
              </Example>
              <Note>f ∘ g adalah fungsi baru. Tanda “∘” bukan perkalian: (f ∘ g)(x) berarti memasukkan hasil g(x) ke dalam f.</Note>
            </section>

            <section id="menghitung-komposisi" className="scroll-mt-6">
              <SectionHeading number="2" title="Menghitung rumus komposisi" intro="Cara paling aman adalah menghitung fungsi bagian dalam dahulu, lalu memasukkan seluruh hasilnya ke fungsi bagian luar. Gunakan tanda kurung agar setiap suku ikut dimasukkan." />
              <Example number={2} title="Komposisi dua fungsi linear">
                <p className="text-sm leading-relaxed text-slate-300">Misalkan f(x) = 2x + 3 dan g(x) = x − 4. Tentukan f ∘ g serta g ∘ f.</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                    <p className="font-bold text-cyan-100">(f ∘ g)(x)</p>
                    <p className="mt-2 font-mono text-sm leading-7 text-slate-200">= f(g(x))<br />= f(x − 4)<br />= 2(x − 4) + 3<br />= 2x − 5</p>
                  </div>
                  <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4">
                    <p className="font-bold text-violet-100">(g ∘ f)(x)</p>
                    <p className="mt-2 font-mono text-sm leading-7 text-slate-200">= g(f(x))<br />= g(2x + 3)<br />= (2x + 3) − 4<br />= 2x − 1</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">Urutannya berpengaruh: f ∘ g menghasilkan 2x − 5, sedangkan g ∘ f menghasilkan 2x − 1. Keduanya tidak sama.</p>
              </Example>
              <Example number={3} title="Memasukkan polinom ke fungsi kuadrat">
                <p className="text-sm leading-relaxed text-slate-300">Ambil p(x) = x² + 2 dan q(x) = 3x − 1. Carilah kedua susunan komposisi.</p>
                <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-300">
                  <li><span className="font-mono text-cyan-100">(p ∘ q)(x) = p(3x − 1) = (3x − 1)² + 2 = 9x² − 6x + 3.</span> Seluruh bentuk 3x − 1 dikuadratkan.</li>
                  <li><span className="font-mono text-violet-100">(q ∘ p)(x) = q(x² + 2) = 3(x² + 2) − 1 = 3x² + 5.</span> Hasil p(x) menjadi input bagi q.</li>
                </ul>
                <p className="text-sm leading-relaxed text-slate-300">Perhatikan tanda kurung sebelum mengembangkan kuadrat. Kesalahan yang sering terjadi adalah hanya menguadratkan suku pertama.</p>
              </Example>
              <Example number={4} title="Menilai komposisi pada suatu bilangan">
                <p className="text-sm leading-relaxed text-slate-300">Untuk f(x) = x² − 1 dan g(x) = 2x + 5, tentukan (f ∘ g)(2) dan (g ∘ f)(2).</p>
                <DataTable headers={["Urutan", "Langkah", "Hasil"]} rows={[
                  ["f ∘ g", "g(2) = 9, lalu f(9) = 9² − 1", "80"],
                  ["g ∘ f", "f(2) = 3, lalu g(3) = 2(3) + 5", "11"],
                ]} />
                <p className="text-sm leading-relaxed text-slate-300">Sebaiknya kerjakan tahap demi tahap. Cara ini membantu kita melihat urutannya dan menghindari memasukkan input ke mesin yang keliru.</p>
              </Example>
            </section>

            <section id="urutan-domain" className="scroll-mt-6">
              <SectionHeading number="3" title="Urutan penting, domain juga penting" intro="Agar f(g(x)) terdefinisi, x harus boleh masuk ke g dan hasil g(x) harus boleh masuk ke f. Maka domain komposisi adalah semua x di domain g yang nilai g(x)-nya berada dalam domain f." />
              <div className="mb-5"><DomainFlowDiagram /></div>
              <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4 font-mono text-xs leading-7 text-violet-100 sm:text-sm">
                <p>D(f ∘ g) = {"{x ∈ Dg | g(x) ∈ Df}"}</p>
                <p>D(g ∘ f) = {"{x ∈ Df | f(x) ∈ Dg}"}</p>
                <p className="font-sans text-xs leading-relaxed text-slate-300">Karena syaratnya berbeda, domain f ∘ g dan g ∘ f juga dapat berbeda.</p>
              </div>
              <Example number={5} title="Komposisi akar dan kuadrat">
                <p className="text-sm leading-relaxed text-slate-300">Definisikan f(x) = √x dengan domain x ≥ 0 dan g(x) = x² − 5 dengan domain semua bilangan real.</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                    <p className="font-bold text-cyan-100">(f ∘ g)(x)</p>
                    <p className="mt-2 font-mono text-xs leading-7 text-slate-200 sm:text-sm">= √(x² − 5)<br />Perlu x² − 5 ≥ 0.<br />Jadi x ≤ −√5 atau x ≥ √5.</p>
                  </div>
                  <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4">
                    <p className="font-bold text-violet-100">(g ∘ f)(x)</p>
                    <p className="mt-2 font-mono text-xs leading-7 text-slate-200 sm:text-sm">= (√x)² − 5 = x − 5<br />Syarat dari √x adalah x ≥ 0.<br />Domainnya [0, ∞).</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">Walaupun rumusnya sama-sama memuat akar dan kuadrat, urutan berbeda memberi rumus dan domain yang berbeda pula.</p>
              </Example>
              <Example number={6} title="Domain komposisi pecahan">
                <p className="text-sm leading-relaxed text-slate-300">Misalkan r(x) = 1/(x − 2) dan s(x) = x + 1. Untuk (r ∘ s)(x), hasil s(x) tidak boleh membuat penyebut r menjadi nol.</p>
                <p className="font-mono text-sm leading-relaxed text-cyan-100">(r ∘ s)(x) = r(x + 1) = 1/((x + 1) − 2) = 1/(x − 1)</p>
                <p className="text-sm leading-relaxed text-slate-300">Jadi domain komposisinya semua bilangan real kecuali x = 1. Syarat ini datang dari x + 1 ≠ 2, bukan langsung dari penyebut fungsi s.</p>
              </Example>
            </section>

            <section id="mencari-fungsi" className="scroll-mt-6">
              <SectionHeading number="4" title="Menentukan fungsi yang belum diketahui" intro="Kadang kita mengetahui satu fungsi dan aturan komposisinya, lalu diminta menemukan fungsi pasangannya. Kenali dulu nilai antara: jadikan output fungsi pertama sebagai variabel baru." />
              <Example number={7} title="Mencari aturan g dari g ∘ f">
                <p className="text-sm leading-relaxed text-slate-300">Diketahui f(x) = 3x + 2 dan (g ∘ f)(x) = 6x − 5. Tentukan g(x).</p>
                <ol className="list-decimal space-y-2 pl-5 font-mono text-xs leading-relaxed text-slate-200 sm:text-sm">
                  <li>Misalkan t = f(x) = 3x + 2, sehingga x = (t − 2)/3.</li>
                  <li>Karena g(f(x)) = 6x − 5, maka g(t) = 6((t − 2)/3) − 5.</li>
                  <li>Sederhanakan: g(t) = 2t − 4 − 5 = 2t − 9.</li>
                  <li>Ganti nama t menjadi x: g(x) = 2x − 9.</li>
                </ol>
                <p className="text-sm leading-relaxed text-emerald-100">Pemeriksaan: g(f(x)) = 2(3x + 2) − 9 = 6x − 5. Cocok!</p>
              </Example>
              <Example number={8} title="Mencari fungsi pertama dari komposisi">
                <p className="text-sm leading-relaxed text-slate-300">Diketahui g(x) = 2x − 3 dan (g ∘ f)(x) = 8x + 1. Tentukan f(x).</p>
                <p className="font-mono text-sm leading-relaxed text-slate-200">g(f(x)) = 2f(x) − 3 = 8x + 1</p>
                <p className="font-mono text-sm leading-relaxed text-slate-200">2f(x) = 8x + 4</p>
                <p className="font-mono text-sm leading-relaxed text-emerald-100">f(x) = 4x + 2</p>
                <p className="text-sm leading-relaxed text-slate-300">Cek dengan memasukkan f(x) ke g: 2(4x + 2) − 3 = 8x + 1. Langkah balik ini memastikan hasil kita tepat.</p>
              </Example>
            </section>

            <section id="sifat-komposisi" className="scroll-mt-6">
              <SectionHeading number="5" title="Sifat-sifat komposisi yang perlu diingat" intro="Komposisi memiliki sifat asosiatif, tetapi umumnya tidak komutatif. Fungsi identitas bertindak seperti angka 1 dalam operasi komposisi: ia tidak mengubah input." />
              <div className="space-y-3">
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <h3 className="font-display font-bold text-cyan-100">Asosiatif: pengelompokan boleh berubah</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">(f ∘ g) ∘ h = f ∘ (g ∘ h), selama semua komposisi yang dibutuhkan terdefinisi. Urutan fungsi tetap sama; yang berubah hanya tanda pengelompokan.</p>
                </article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <h3 className="font-display font-bold text-violet-100">Tidak komutatif: urutan umumnya mengubah hasil</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Biasanya f ∘ g ≠ g ∘ f. Contoh sebelumnya menghasilkan f ∘ g = 2x − 5 dan g ∘ f = 2x − 1.</p>
                </article>
                <article className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <h3 className="font-display font-bold text-emerald-100">Identitas: tidak mengubah fungsi</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Jika I(x) = x, maka f ∘ I = f dan I ∘ f = f pada domain yang sesuai.</p>
                </article>
              </div>
              <Example number={9} title="Membuktikan sifat asosiatif">
                <p className="text-sm leading-relaxed text-slate-300">Ambil f(x) = x + 1, g(x) = 2x, dan h(x) = x². Hitung kedua pengelompokan.</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                    <p className="font-bold text-cyan-100">((f ∘ g) ∘ h)(x)</p>
                    <p className="mt-2 font-mono text-xs leading-7 text-slate-200 sm:text-sm">f(g(x)) = 2x + 1<br />(f ∘ g)(h(x)) = 2x² + 1</p>
                  </div>
                  <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4">
                    <p className="font-bold text-violet-100">(f ∘ (g ∘ h))(x)</p>
                    <p className="mt-2 font-mono text-xs leading-7 text-slate-200 sm:text-sm">g(h(x)) = 2x²<br />f(g(h(x))) = 2x² + 1</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-emerald-100">Hasilnya sama, yaitu 2x² + 1. Tiga fungsi boleh dikelompokkan dengan dua cara, asalkan urutannya tidak ditukar.</p>
              </Example>
            </section>

            <section id="invers-komposisi" className="scroll-mt-6">
              <SectionHeading number="6" title="Invers dari komposisi: balik urutannya" intro="Jika f dan g masing-masing mempunyai invers, maka untuk membatalkan f ∘ g kita harus membalik prosesnya dari belakang. Karena g dikerjakan lebih dahulu dan f sesudahnya, invers membatalkan f terlebih dahulu, baru g." />
              <div className="mb-5 rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4 font-mono text-center text-sm leading-8 text-violet-100 sm:text-base">
                <p>(f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹</p>
                <p className="font-sans text-xs leading-relaxed text-slate-300">Urutan pada sisi kanan berbalik: f⁻¹ diterapkan dahulu, lalu g⁻¹.</p>
              </div>
              <Example number={10} title="Membalik komposisi dua fungsi linear">
                <p className="text-sm leading-relaxed text-slate-300">Gunakan f(x) = 2x + 3 dan g(x) = x − 4. Kita sudah memperoleh (f ∘ g)(x) = 2x − 5. Mari cari inversnya dengan dua cara.</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4">
                    <p className="font-bold text-cyan-100">Balik rumus komposisi</p>
                    <p className="mt-2 font-mono text-sm leading-7 text-slate-200">y = 2x − 5<br />x = 2y − 5<br />y = (x + 5)/2</p>
                  </div>
                  <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4">
                    <p className="font-bold text-violet-100">Balik dengan invers berurutan</p>
                    <p className="mt-2 font-mono text-xs leading-7 text-slate-200 sm:text-sm">f⁻¹(x) = (x − 3)/2<br />g⁻¹(x) = x + 4<br />g⁻¹(f⁻¹(x)) = (x + 5)/2</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-emerald-100">Kedua cara sepakat: (f ∘ g)⁻¹(x) = (x + 5)/2. Urutannya memang g⁻¹ ∘ f⁻¹, bukan f⁻¹ ∘ g⁻¹.</p>
              </Example>
              <Example number={11} title="Memeriksa rumus invers komposisi">
                <p className="text-sm leading-relaxed text-slate-300">Periksa bahwa hasil di atas benar dengan memasukkannya ke komposisi asal:</p>
                <p className="font-mono text-xs leading-7 text-cyan-100 sm:text-sm">(f ∘ g)((f ∘ g)⁻¹(x)) = 2((x + 5)/2) − 5 = x + 5 − 5 = x.</p>
                <p className="text-sm leading-relaxed text-slate-300">Karena komposisi mengembalikan input x, rumus inversnya terverifikasi.</p>
              </Example>
            </section>

            <section id="latihan-rangkuman" className="scroll-mt-6">
              <SectionHeading number="7" title="Latihan dan rangkuman: giliran kamu!" intro="Coba selesaikan setiap soal, kemudian cocokkan prosesnya. Jangan lupa membaca dari kanan dan memeriksa domain setiap kali ada akar atau penyebut." />
              <Example number={12} title="Tantangan komposisi beserta pembahasan">
                <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-300">
                  <li>Jika f(x) = 4x − 1 dan g(x) = x + 6, tentukan f ∘ g dan g ∘ f. <p className="mt-1 text-emerald-100">(f ∘ g)(x) = 4(x + 6) − 1 = 4x + 23. (g ∘ f)(x) = (4x − 1) + 6 = 4x + 5.</p></li>
                  <li>Untuk f(x) = x² dan g(x) = x − 3, tentukan (f ∘ g)(x). <p className="mt-1 text-emerald-100">f(g(x)) = (x − 3)² = x² − 6x + 9.</p></li>
                  <li>Jika f(x) = 5x + 2 dan g(f(x)) = 10x + 7, tentukan g(x). <p className="mt-1 text-emerald-100">Misalkan t = 5x + 2, jadi x = (t − 2)/5. g(t) = 10((t − 2)/5) + 7 = 2t + 3. Maka g(x) = 2x + 3.</p></li>
                  <li>Jika f dan g bijektif, tuliskan invers dari g ∘ f. <p className="mt-1 text-emerald-100">(g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹; urutannya berbalik.</p></li>
                </ol>
              </Example>
              <div className="rounded-3xl border border-emerald-200/20 bg-emerald-200/[.05] p-5">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-emerald-100"><Target className="h-5 w-5" />Kartu pengingat</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-200">
                  <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />f ∘ g berarti f(g(x)); g dikerjakan lebih dahulu.</li>
                  <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Umumnya f ∘ g tidak sama dengan g ∘ f.</li>
                  <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Domain f ∘ g memerlukan x ∈ Dg dan g(x) ∈ Df.</li>
                  <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Komposisi bersifat asosiatif dan fungsi identitas tidak mengubah fungsi.</li>
                  <li><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Jika f dan g punya invers, (f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹.</li>
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
              <div className="mt-5 rounded-2xl border border-orange-200/15 bg-orange-200/[.05] p-3 text-xs leading-relaxed text-orange-50/80"><ArrowDown className="mr-1 inline h-3.5 w-3.5 text-orange-200" />Tips: tulis fungsi bagian dalam dengan tanda kurung sebelum menyederhanakan.</div>
            </div>
          </aside>
        </div>
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => jumpTo("rantai-fungsi")} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/[.07] px-4 py-2 text-sm font-bold text-cyan-100 transition-colors hover:bg-cyan-300/[.14]"><ArrowRight className="h-4 w-4 -rotate-90" />Kembali ke awal</button>
        </div>
      </main>
    </div>
  );
};

export default SmaFungsiKomposisiPage;
