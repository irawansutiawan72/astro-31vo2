import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BookOpen, Check, Lightbulb, Sparkles, Target } from "lucide-react";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";

const sections = [
  ["1", "Mengubah cerita menjadi fungsi", "membentuk-model"],
  ["2", "Komisi dari penjualan", "komisi"],
  ["3", "Konversi suhu dan invers", "suhu"],
  ["4", "Tarif sewa dan potongan", "tarif"],
  ["5", "Strategi dan rangkuman", "rangkuman"],
];

function SectionHeading({ number, title, intro }: { number: string; title: string; intro: string }) {
  return (
    <div className="mb-5 flex gap-4">
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

function CommissionFlowDiagram() {
  return (
    <svg viewBox="0 0 760 220" role="img" aria-label="Alur fungsi komisi: data penjualan menjadi kelebihan dari batas, lalu dikalikan tarif komisi" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-commission-model">
      <defs><marker id="ap-commission-arrow" markerWidth="8" height="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#67d9e8" /></marker></defs>
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <rect x="18" y="58" width="145" height="82" rx="18" />
        <rect x="214" y="58" width="160" height="82" rx="18" />
        <rect x="425" y="58" width="126" height="82" rx="18" />
        <rect x="602" y="58" width="140" height="82" rx="18" />
      </g>
      <g fill="none" stroke="#67d9e8" strokeWidth="2.5" markerEnd="url(#ap-commission-arrow)">
        <path d="M167 99H205" /><path d="M378 99H416" /><path d="M555 99H593" />
      </g>
      <g fill="#fff4db" fontFamily="sans-serif" fontSize="13" fontWeight="700" textAnchor="middle">
        <text x="90" y="91">Penjualan</text><text x="90" y="113">S(minggu)</text>
        <text x="294" y="91">Bagian lebih</text><text x="294" y="113">max(0, S − 4 jt)</text>
        <text x="488" y="91">Tarif</text><text x="488" y="113">× 4%</text>
        <text x="672" y="91">Komisi</text><text x="672" y="113">C(S)</text>
      </g>
      <g fill="#a8b8cf" fontFamily="sans-serif" fontSize="12" textAnchor="middle">
        <text x="90" y="178">input</text><text x="294" y="178">operasi selisih</text>
        <text x="488" y="178">operasi kali</text><text x="672" y="178">hasil berurutan</text>
      </g>
    </svg>
  );
}

function TemperatureFlowDiagram() {
  return (
    <svg viewBox="0 0 720 235" role="img" aria-label="Suhu Fahrenheit dikonversi ke Celsius lalu Kelvin; proses balik mengurangi 273 koma 15 dan mengubah Celsius ke Fahrenheit" className="h-auto w-full rounded-2xl border border-white/10 bg-[#091426] p-2" data-testid="diagram-temperature-model">
      <defs>
        <marker id="ap-temp-arrow" markerWidth="8" height="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#67d9e8" /></marker>
        <marker id="ap-temp-reverse" markerWidth="8" height="8" refX="1" refY="4" orient="auto"><path d="M8 0L0 4L8 8z" fill="#c4a7ff" /></marker>
      </defs>
      <g fill="#13243a" stroke="#f6bd60" strokeWidth="2">
        <rect x="24" y="34" width="142" height="62" rx="18" />
        <rect x="288" y="34" width="142" height="62" rx="18" />
        <rect x="552" y="34" width="142" height="62" rx="18" />
      </g>
      <g fill="none" stroke="#67d9e8" strokeWidth="2.5" markerEnd="url(#ap-temp-arrow)">
        <path d="M170 65H278" /><path d="M434 65H542" />
      </g>
      <g fill="none" stroke="#c4a7ff" strokeWidth="2.5" markerStart="url(#ap-temp-reverse)">
        <path d="M552 139H434" /><path d="M288 139H170" />
      </g>
      <g fill="#fff4db" fontFamily="sans-serif" fontSize="15" fontWeight="700" textAnchor="middle">
        <text x="95" y="72">Fahrenheit</text><text x="359" y="72">Celsius</text><text x="623" y="72">Kelvin</text>
      </g>
      <g fill="#a8b8cf" fontFamily="sans-serif" fontSize="12" textAnchor="middle">
        <text x="224" y="48">C(F) = 5/9(F − 32)</text><text x="488" y="48">K(C) = C + 273,15</text>
        <text x="493" y="164">K − 273,15</text><text x="229" y="164">9/5 C + 32</text>
        <text x="359" y="211" fill="#67d9e8" fontSize="13">Maju: K ∘ C  Balik: C⁻¹ ∘ K⁻¹</text>
      </g>
    </svg>
  );
}

const SmaPenerapanOperasiInversKomposisiPage = () => {
  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden gradient-space">
      <Starfield />
      <PageNavigation prevPath="/ruang-untuk-guru/sma/buku-animasi/komposisi-fungsi-dan-fungsi-invers" />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-4xl text-center" data-testid="lesson-header">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[.06] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100"><Sparkles className="h-3.5 w-3.5" />Matematika SMA · ayo pecahkan masalah!</div>
          <p className="font-display text-xs font-bold uppercase tracking-[.24em] text-orange-200">Aplikasi fungsi</p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight text-primary text-glow-cyan sm:text-5xl">Menyelesaikan Permasalahan dengan Fungsi</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">Soal cerita jadi lebih teratur saat setiap langkah kita ubah menjadi fungsi. Mari gunakan operasi, komposisi, dan invers untuk menghitung komisi, mengonversi suhu, serta membalik proses menuju nilai awal.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map(([number, label, id]) => <button key={id} type="button" onClick={() => jumpTo(id)} data-testid={`jump-${id}`} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 font-body text-xs text-slate-200 transition-colors hover:border-cyan-200/40 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200/60">{number} · {label}</button>)}
          </div>
        </header>

        <div className="grid gap-8 desktop:grid-cols-[minmax(0,1fr)_250px] phone-land:grid-cols-2">
          <div className="min-w-0 space-y-12">
            <section id="membentuk-model" className="scroll-mt-6">
              <SectionHeading number="1" title="Dari cerita ke model fungsi" intro="Mulailah dengan mengenali apa yang diketahui dan apa yang ingin dicari. Beri nama pada setiap tahap, tulis aturan matematikanya, lalu susun fungsi sesuai urutan proses dalam cerita." />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.05] p-4"><p className="font-display text-sm font-bold text-cyan-100">1 · Kenali input</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Nilai awal apa yang diketahui atau dicari?</p></div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4"><p className="font-display text-sm font-bold text-violet-100">2 · Susun proses</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Tuliskan operasi tiap tahap sebagai fungsi.</p></div>
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.05] p-4"><p className="font-display text-sm font-bold text-emerald-100">3 · Periksa hasil</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Cek satuan, syarat domain, dan kewajaran jawaban.</p></div>
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-relaxed text-slate-300">
                <p><span className="font-mono text-cyan-100">Operasi</span> menggabungkan nilai atau aturan, misalnya selisih penjualan dan tarif komisi.</p>
                <p className="mt-2"><span className="font-mono text-violet-100">Komposisi</span> mengirim hasil satu fungsi sebagai input fungsi berikutnya.</p>
                <p className="mt-2"><span className="font-mono text-emerald-100">Invers</span> menelusuri proses dari hasil kembali ke nilai awal, dengan urutan langkah dibalik.</p>
              </div>
            </section>

            <section id="komisi" className="scroll-mt-6">
              <SectionHeading number="2" title="Komisi dari penjualan mingguan" intro="Pada masalah bertahap, penjualan menjadi input untuk mencari bagian yang melampaui target; setelah itu, tarif komisi diterapkan pada bagian tersebut. Operasi dan komposisi bekerja bersama." />
              <Example number={1} title="Menjumlahkan komisi selama empat minggu">
                <p className="text-sm leading-relaxed text-slate-300">Seorang staf toko memperoleh komisi sebesar 4% dari bagian penjualan mingguan yang melampaui Rp4.000.000. Jika penjualan tidak melewati batas itu, tidak ada komisi. Penjualannya selama empat minggu berturut-turut adalah Rp3.500.000, Rp5.000.000, Rp6.200.000, dan Rp4.800.000.</p>
                <CommissionFlowDiagram />
                <p className="text-sm leading-relaxed text-slate-300">Untuk penjualan s, tentukan bagian di atas batas dengan E(s) = max(0, s − 4.000.000). Fungsi tarifnya T(e) = 0,04e. Jika S(w) adalah penjualan pada minggu ke-w, komisi minggu itu adalah komposisi (T ∘ E ∘ S)(w).</p>
                <DataTable headers={["Minggu", "Penjualan S(w)", "Lebih dari target E(S(w))", "Komisi T(E(S(w)))"]} rows={[
                  ["1", "Rp3.500.000", "Rp0", "Rp0"],
                  ["2", "Rp5.000.000", "Rp1.000.000", "Rp40.000"],
                  ["3", "Rp6.200.000", "Rp2.200.000", "Rp88.000"],
                  ["4", "Rp4.800.000", "Rp800.000", "Rp32.000"],
                ]} />
                <p className="text-sm leading-relaxed text-slate-300">Total komisi = Rp0 + Rp40.000 + Rp88.000 + Rp32.000 = <strong className="text-emerald-100">Rp160.000</strong>.</p>
                <Note>Fungsi max memastikan selisih yang negatif menjadi nol. Jadi, penjualan di bawah target tidak menghasilkan komisi negatif.</Note>
              </Example>
            </section>

            <section id="suhu" className="scroll-mt-6">
              <SectionHeading number="3" title="Konversi suhu: komposisi dan invers" intro="Mengubah Fahrenheit ke Kelvin dapat dilakukan lewat dua tahap: Fahrenheit ke Celsius, lalu Celsius ke Kelvin. Untuk berjalan balik, gunakan invers tahap terakhir terlebih dahulu." />
              <Example number={2} title="Mengubah 86°F menjadi Kelvin">
                <p className="text-sm leading-relaxed text-slate-300">Gunakan C(F) = 5/9(F − 32) untuk mengubah Fahrenheit menjadi Celsius dan K(C) = C + 273,15 untuk mengubah Celsius menjadi Kelvin.</p>
                <TemperatureFlowDiagram />
                <p className="font-mono text-sm leading-relaxed text-cyan-100">(K ∘ C)(F) = 5/9(F − 32) + 273,15</p>
                <ol className="list-decimal space-y-2 pl-5 font-mono text-sm leading-relaxed text-slate-200">
                  <li>C(86) = 5/9(86 − 32) = 5/9 × 54 = 30°C.</li>
                  <li>K(30) = 30 + 273,15 = 303,15 K.</li>
                </ol>
                <p className="text-sm leading-relaxed text-emerald-100">Jadi, 86°F sama dengan 303,15 K.</p>
              </Example>
              <Example number={3} title="Menelusuri suhu dari Kelvin ke Fahrenheit">
                <p className="text-sm leading-relaxed text-slate-300">Untuk membalik konversi, gunakan K⁻¹(K) = K − 273,15 lebih dahulu, lalu C⁻¹(C) = 9/5 C + 32. Dengan kata lain, fungsi invers dari K ∘ C adalah C⁻¹ ∘ K⁻¹.</p>
                <p className="font-mono text-sm leading-relaxed text-cyan-100">(C⁻¹ ∘ K⁻¹)(K) = 9/5(K − 273,15) + 32</p>
                <p className="text-sm leading-relaxed text-slate-300">Jika suhu awal 293,15 K:</p>
                <ol className="list-decimal space-y-2 pl-5 font-mono text-sm leading-relaxed text-slate-200">
                  <li>K⁻¹(293,15) = 293,15 − 273,15 = 20°C.</li>
                  <li>C⁻¹(20) = 9/5(20) + 32 = 36 + 32 = 68°F.</li>
                </ol>
                <Note>Untuk membalik rangkaian, urutannya berlawanan: batalkan tahap yang terakhir dilakukan, baru tahap sebelumnya.</Note>
              </Example>
            </section>

            <section id="tarif" className="scroll-mt-6">
              <SectionHeading number="4" title="Tarif sewa, potongan, dan mencari durasi" intro="Contoh ini menggabungkan operasi penjumlahan dan perkalian, komposisi dua aturan, lalu invers untuk mencari berapa lama suatu barang disewa." />
              <Example number={4} title="Mencari lama sewa dari harga setelah diskon">
                <p className="text-sm leading-relaxed text-slate-300">Biaya sewa sepeda terdiri atas biaya awal Rp8.000 ditambah Rp2.000 untuk setiap blok waktu 15 menit. Pelanggan mendapat potongan 10% dari total biaya. Jika pelanggan membayar Rp14.400 setelah potongan, berapa lama ia menyewa sepeda?</p>
                <p className="text-sm leading-relaxed text-slate-300">Misalkan t adalah banyak blok 15 menit. Biaya sebelum potongan adalah R(t) = 8.000 + 2.000t, sedangkan fungsi pembayaran setelah potongan adalah D(p) = 0,9p. Total pembayaran mengikuti komposisi (D ∘ R)(t).</p>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.05] p-4 font-mono text-sm leading-7 text-violet-100">
                  <p>(D ∘ R)(t) = 0,9(8.000 + 2.000t)</p>
                  <p>14.400 = 0,9(8.000 + 2.000t)</p>
                  <p>14.400 ÷ 0,9 = 16.000</p>
                  <p>16.000 = 8.000 + 2.000t</p>
                  <p>t = (16.000 − 8.000) ÷ 2.000 = 4 blok</p>
                </div>
                <p className="text-sm leading-relaxed text-emerald-100">Empat blok × 15 menit = 60 menit. Jadi, sepeda disewa selama 1 jam.</p>
                <Note>Urutan inversnya adalah R⁻¹ ∘ D⁻¹: pulihkan dulu harga sebelum diskon, kemudian gunakan harga itu untuk mencari lama sewa.</Note>
              </Example>
            </section>

            <section id="rangkuman" className="scroll-mt-6">
              <SectionHeading number="5" title="Strategi dan rangkuman" intro="Kamu sudah menghubungkan cerita dengan operasi fungsi, komposisi, dan invers. Pakai daftar ini sebagai pemeriksaan akhir saat mengerjakan soal serupa." />
              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-relaxed text-slate-200"><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Tentukan apa yang menjadi input dan apa yang diminta soal.</div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-relaxed text-slate-200"><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Tuliskan fungsi untuk setiap langkah, termasuk batas, tarif, diskon, atau konversi.</div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-relaxed text-slate-200"><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Susun komposisi mengikuti urutan proses; fungsi paling kanan dikerjakan lebih dahulu.</div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-relaxed text-slate-200"><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Jika mencari input awal dari hasil akhir, gunakan invers dalam urutan terbalik.</div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-sm leading-relaxed text-slate-200"><Check className="mr-2 inline h-4 w-4 text-emerald-200" />Periksa satuan, domain, dan jawaban dengan memasukkannya kembali ke model.</div>
              </div>
              <div className="mt-5 rounded-3xl border border-emerald-200/20 bg-emerald-200/[.05] p-5">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-emerald-100"><Target className="h-5 w-5" />Yang perlu diingat</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">Operasi membentuk aturan tiap tahap, komposisi menyatukan tahap-tahap itu, dan invers membawa kita kembali dari hasil ke input. Dengan menuliskan alurnya, soal cerita yang panjang pun bisa dipecahkan selangkah demi selangkah!</p>
              </div>
            </section>
          </div>

          <aside className="hidden desktop:block">
            <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#0b1628]/90 p-5 backdrop-blur-md">
              <p className="font-display text-sm font-bold text-white">Peta perjalanan</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">Pilih bagian untuk melompat.</p>
              <nav className="mt-4 space-y-1">
                {sections.map(([number, label, id]) => <button key={id} type="button" onClick={() => jumpTo(id)} className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs text-slate-300 transition-colors hover:bg-white/[.06] hover:text-cyan-100"><span className="grid h-6 w-6 place-items-center rounded-lg bg-cyan-300/10 font-bold text-cyan-100">{number}</span>{label}</button>)}
              </nav>
              <div className="mt-5 rounded-2xl border border-orange-200/15 bg-orange-200/[.05] p-3 text-xs leading-relaxed text-orange-50/80"><ArrowDown className="mr-1 inline h-3.5 w-3.5 text-orange-200" />Tips: gambar alur proses sebelum menghitung.</div>
            </div>
          </aside>
        </div>
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => jumpTo("membentuk-model")} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/[.07] px-4 py-2 text-sm font-bold text-cyan-100 transition-colors hover:bg-cyan-300/[.14]"><ArrowRight className="h-4 w-4 -rotate-90" />Kembali ke awal</button>
        </div>
      </main>
    </div>
  );
};

export default SmaPenerapanOperasiInversKomposisiPage;
