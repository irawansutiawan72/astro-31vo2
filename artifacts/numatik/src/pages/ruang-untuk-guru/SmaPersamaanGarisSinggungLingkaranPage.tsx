import { useState } from "react";
import { BookOpen, Check, Lightbulb, Sparkles, Target } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import PageNavigation from "@/components/PageNavigation";
import Starfield from "@/components/Starfield";

const BASE_PATH = "/ruang-untuk-guru/sma/buku-animasi/lingkaran";

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
      <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">{index}</span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{description}</p>
      </div>
    </div>
  );
}

function Example({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200"><BookOpen className="h-4 w-4" aria-hidden="true" /></span>
        <div>
          <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh baru {number}</p>
          <h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function TangentDiagram({ external = false }: { external?: boolean }) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-[#071326]/75 p-3">
      <svg viewBox="0 0 360 230" role="img" aria-label={external
        ? "Dua garis dari titik luar P menyinggung lingkaran di A dan B; jari-jari CA dan CB tegak lurus garis singgung."
        : "Jari-jari OP bertemu garis singgung di P dengan sudut siku-siku."}
        className="mx-auto h-auto w-full max-w-md">
        <circle cx="142" cy="118" r="67" fill="#22d3ee" fillOpacity=".08" stroke="#67e8f9" strokeWidth="2.5" />
        <circle cx="142" cy="118" r="4" fill="#fbbf24" />
        <text x="126" y="139" fill="#fef3c7" fontSize="13">O</text>
        {external ? (
          <>
            <line x1="290" y1="118" x2="172" y2="53" stroke="#fb923c" strokeWidth="2.5" />
            <line x1="290" y1="118" x2="172" y2="183" stroke="#fb923c" strokeWidth="2.5" />
            <line x1="142" y1="118" x2="172" y2="53" stroke="#fbbf24" strokeWidth="2" />
            <line x1="142" y1="118" x2="172" y2="183" stroke="#fbbf24" strokeWidth="2" />
            <circle cx="172" cy="53" r="4" fill="#34d399" /><circle cx="172" cy="183" r="4" fill="#34d399" />
            <circle cx="290" cy="118" r="4" fill="#fb923c" />
            <text x="163" y="42" fill="#a7f3d0" fontSize="13">A</text><text x="163" y="205" fill="#a7f3d0" fontSize="13">B</text>
            <text x="297" y="123" fill="#fed7aa" fontSize="13">P</text>
            <path d="M168 60 L175 64 L179 57 M168 176 L175 172 L179 179" fill="none" stroke="#fef3c7" strokeWidth="1.5" />
          </>
        ) : (
          <>
            <line x1="142" y1="51" x2="303" y2="51" stroke="#fb923c" strokeWidth="2.5" />
            <line x1="142" y1="118" x2="142" y2="51" stroke="#fbbf24" strokeWidth="2.5" />
            <circle cx="142" cy="51" r="4" fill="#34d399" />
            <path d="M142 62 L153 62 L153 51" fill="none" stroke="#fef3c7" strokeWidth="1.5" />
            <text x="132" y="42" fill="#a7f3d0" fontSize="13">P</text>
            <text x="303" y="46" fill="#fed7aa" fontSize="13">garis singgung</text>
            <text x="150" y="91" fill="#fde68a" fontSize="12">OP = r</text>
          </>
        )}
        <text x="16" y="218" fill="#cbd5e1" fontSize="11">{external ? "PA = PB dan OA ⟂ PA, OB ⟂ PB" : "OP tegak lurus garis singgung di P"}</text>
      </svg>
      <figcaption className="mt-1 text-center font-body text-xs leading-relaxed text-slate-400">
        {external ? "Dari satu titik luar, dua garis singgung memiliki panjang yang sama." : "Sudut antara jari-jari dan garis singgung tepat 90°."}
      </figcaption>
    </figure>
  );
}

const QUESTIONS = [
  {
    question: "Lingkaran x² + y² = 169. Persamaan garis singgung di titik (5, 12) adalah ...",
    options: ["5x + 12y = 169", "12x + 5y = 169", "5x − 12y = 169"],
    answer: 0,
    explanation: "Titiknya memang pada lingkaran karena 5² + 12² = 169. Gunakan xx₁ + yy₁ = r².",
  },
  {
    question: "Lingkaran berpusat di (−1, 2), berjari-jari 5. Gradien garis singgung yang dicari adalah 2. Nilai konstanta c pada y = 2x + c ialah ...",
    options: ["4 ± 5√5", "−4 ± 5√5", "4 ± 5√2"],
    answer: 0,
    explanation: "Jarak pusat ke garis y = 2x + c harus 5: |4 − c|/√5 = 5, sehingga c = 4 ± 5√5.",
  },
  {
    question: "Dari titik P(13, 0) ditarik garis singgung ke lingkaran x² + y² = 25. Salah satu garis singgungnya adalah ...",
    options: ["5x + 12y = 65", "5x + 12y = 25", "12x + 5y = 65"],
    answer: 0,
    explanation: "Kedua garis singgungnya 5x + 12y = 65 dan 5x − 12y = 65.",
  },
];

function SelfCheck() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  return (
    <div className="space-y-4">
      {QUESTIONS.map((item, questionIndex) => {
        const selected = answers[questionIndex];
        const answered = selected !== undefined;
        const correct = selected === item.answer;
        return (
          <article key={item.question} className="rounded-2xl border border-white/10 bg-[#101b2d]/80 p-4 sm:p-5">
            <h3 className="font-display text-base font-bold text-white"><span className="mr-2 text-cyan-200">{questionIndex + 1}.</span>{item.question}</h3>
            <div className="mt-3 grid gap-2">
              {item.options.map((option, optionIndex) => (
                <button key={option} type="button" aria-pressed={selected === optionIndex}
                  onClick={() => setAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex }))}
                  className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${selected === optionIndex
                    ? correct ? "border-emerald-300/50 bg-emerald-400/10 text-emerald-100" : "border-rose-300/50 bg-rose-400/10 text-rose-100"
                    : "border-white/10 bg-white/[.025] text-slate-300 hover:border-cyan-200/30"}`}>
                  {option}
                </button>
              ))}
            </div>
            {answered && <p className={`mt-3 flex gap-2 text-sm leading-relaxed ${correct ? "text-emerald-200" : "text-amber-100"}`}><Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>{correct ? "Tepat!" : "Yuk, periksa lagi."} {item.explanation}</span></p>}
          </article>
        );
      })}
    </div>
  );
}

const SmaPersamaanGarisSinggungLingkaranPage = () => (
  <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation
      prevPath={`${BASE_PATH}/kuasa-titik-terhadap-lingkaran-dan-garis`}
      nextPath={`${BASE_PATH}/hubungan-dua-lingkaran`}
    />
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
        <div className="relative max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Ruang untuk Guru · SMA</span>
            <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika · Persamaan Lingkaran</span>
          </div>
          <div className="mb-3 flex items-center gap-2 text-amber-200"><Sparkles className="h-4 w-4" aria-hidden="true" /><p className="font-body text-xs font-bold uppercase tracking-[.24em]">Saat lingkaran dan garis bertemu di satu titik!</p></div>
          <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">Persamaan <span className="text-cyan-200">garis singgung</span> lingkaran</h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">Garis singgung menyentuh lingkaran tepat di satu titik. Kita akan membangun persamaannya dari ide tegak lurus jari-jari, lalu menggunakannya ketika titik singgung diketahui, gradien diketahui, atau garis ditarik dari sebuah titik di luar lingkaran.</p>
          <div className="mt-6 flex items-start gap-2 text-sm text-amber-100"><Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>Target belajar: memahami sifat garis singgung, menentukan persamaan pada lingkaran berpusat di titik asal maupun di titik lain, memakai gradien, dan mencari garis singgung dari titik luar.</span></div>
        </div>
      </header>

      <div className="grid gap-8 desktop:grid-cols-[minmax(0,1fr)_260px] phone-land:grid-cols-2">
        <div className="min-w-0 space-y-12">
          <section id="gagasan-singgung">
            <SectionHeading index="1" title="Satu titik sentuh, satu sifat istimewa" description="Sebuah garis disebut menyinggung lingkaran apabila keduanya memiliki tepat satu titik persekutuan. Jari-jari yang ditarik ke titik sentuh selalu tegak lurus garis singgung." />
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <Equation math="OT\perp \ell\quad\text{dan}\quad OT=r" label="Jari-jari OT bertemu garis singgung ℓ di T" />
                <p className="text-sm leading-relaxed text-slate-300">Bayangkan sebuah roda menyentuh lantai. Jari-jari yang menuju titik sentuh berdiri tegak terhadap lantai. Sifat 90° inilah kunci utama untuk mencari persamaan garis singgung.</p>
                <div className="rounded-2xl border border-white/10 bg-[#101b2d]/80 p-4 text-sm leading-relaxed text-slate-300">
                  <p className="font-display font-bold text-cyan-100">Kenali posisi garisnya</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>Jika jarak pusat ke garis lebih kecil daripada r, garis memotong lingkaran di dua titik.</li>
                    <li>Jika jaraknya sama dengan r, garis menyinggung di satu titik.</li>
                    <li>Jika jaraknya lebih besar daripada r, garis tidak bertemu lingkaran.</li>
                  </ul>
                </div>
              </div>
              <TangentDiagram />
            </div>
          </section>

          <section id="titik-di-lingkaran-asal">
            <SectionHeading index="2" title="Titik singgung pada lingkaran berpusat O" description="Untuk lingkaran x² + y² = r², pusatnya (0,0). Misalkan P(x₁,y₁) berada pada keliling. Vektor OP tegak lurus garis singgung, sehingga koordinat OP dapat menjadi koefisien normal garis itu." />
            <div className="space-y-4">
              <Equation math="x_1^2+y_1^2=r^2" label="P(x₁,y₁) harus benar-benar terletak pada lingkaran" />
              <p className="text-sm leading-relaxed text-slate-300">Persamaan garis yang normalnya searah <InlineMath math="\overrightarrow{OP}=(x_1,y_1)" /> dapat ditulis <InlineMath math="x_1x+y_1y=k" />. Karena garis melewati P, masukkan koordinat P: <InlineMath math="k=x_1^2+y_1^2=r^2" />.</p>
              <Equation math="x_1x+y_1y=r^2" label="Rumus garis singgung di P(x₁,y₁)" />
              <Example number={1} title="Menentukan garis singgung saat titiknya diketahui">
                <p className="text-sm leading-relaxed text-slate-300">Tentukan garis singgung lingkaran <InlineMath math="x^2+y^2=169" /> di titik <InlineMath math="P(5,12)" />.</p>
                <Equation math="5^2+12^2=25+144=169" label="Pastikan titik berada pada lingkaran" />
                <p className="text-sm leading-relaxed text-slate-300">Titiknya cocok. Masukkan <InlineMath math="x_1=5" />, <InlineMath math="y_1=12" />, dan <InlineMath math="r^2=169" /> ke rumus.</p>
                <Equation math="5x+12y=169" label="Persamaan garis singgung" />
                <p className="text-sm leading-relaxed text-emerald-100">Selesai! Tidak perlu mencari gradiennya lebih dahulu.</p>
              </Example>
              <Example number={2} title="Titik dengan koordinat negatif">
                <p className="text-sm leading-relaxed text-slate-300">Cari garis singgung lingkaran <InlineMath math="x^2+y^2=100" /> di titik <InlineMath math="Q(-6,8)" />.</p>
                <Equation math="(-6)^2+8^2=36+64=100" />
                <Equation math="-6x+8y=100\quad\Longleftrightarrow\quad -3x+4y=50" label="Rumus lalu sederhanakan" />
                <p className="text-sm leading-relaxed text-slate-300">Tanda negatif pada koordinat x tetap ikut dimasukkan. Kedua bentuk persamaan di atas menyatakan garis yang sama.</p>
              </Example>
              <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-4 text-sm leading-relaxed text-amber-50">
                <Lightbulb className="mr-2 inline h-4 w-4" aria-hidden="true" /><strong>Jangan lupa cek titiknya.</strong> Rumus ini berlaku apabila <InlineMath math="x_1^2+y_1^2=r^2" />. Kalau tidak terpenuhi, titik tersebut bukan titik singgung pada lingkaran yang dimaksud.
              </div>
            </div>
          </section>

          <section id="titik-pada-lingkaran-geser">
            <SectionHeading index="3" title="Pusat lingkarannya tidak di titik asal" description="Jika pusat lingkaran bergeser ke C(h,k), kita cukup mengukur posisi titik singgung relatif terhadap pusat. Selisih koordinat P dan C menjadi komponen jari-jari." />
            <div className="space-y-4">
              <Equation math="(x_1-h)(x-h)+(y_1-k)(y-k)=r^2" label="Titik singgung P(x₁,y₁), pusat C(h,k)" />
              <p className="text-sm leading-relaxed text-slate-300">Perhatikan faktor <InlineMath math="(x_1-h,y_1-k)" />: itulah arah jari-jari dari C menuju P. Karena arah ini tegak lurus garis singgung, rumus ini merupakan versi bergeser dari rumus sebelumnya.</p>
              <p className="text-sm leading-relaxed text-slate-300">Jika lingkaran sudah berbentuk umum <InlineMath math="x^2+y^2+Ax+By+C=0" />, bentuk garis singgung yang setara adalah:</p>
              <Equation math="xx_1+yy_1+\frac A2(x+x_1)+\frac B2(y+y_1)+C=0" label="Rumus singgung pada bentuk umum lingkaran" />
              <Example number={3} title="Lingkaran dengan pusat bergeser">
                <p className="text-sm leading-relaxed text-slate-300">Lingkaran berpusat di <InlineMath math="C(-1,2)" /> dengan jari-jari 5. Tentukan garis singgung di <InlineMath math="P(2,6)" />.</p>
                <Equation math="(2+1)^2+(6-2)^2=3^2+4^2=25=5^2" label="Cek bahwa P berada pada lingkaran" />
                <Equation math="\begin{aligned}(2+1)(x+1)+(6-2)(y-2)&=25\\3(x+1)+4(y-2)&=25\\3x+4y&=30\end{aligned}" label="Gunakan bentuk pusat (−1,2)" />
                <p className="text-sm leading-relaxed text-emerald-100">Jadi, garis singgungnya <InlineMath math="3x+4y=30" />.</p>
              </Example>
              <Example number={4} title="Menggunakan bentuk umum secara langsung">
                <p className="text-sm leading-relaxed text-slate-300">Tentukan garis singgung lingkaran <InlineMath math="x^2+y^2-6x+2y-15=0" /> di titik <InlineMath math="P(7,2)" />.</p>
                <p className="text-sm leading-relaxed text-slate-300">Di sini <InlineMath math="A=-6" />, <InlineMath math="B=2" />, dan <InlineMath math="C=-15" />. Pastikan titiknya berada pada lingkaran:</p>
                <Equation math="49+4-42+4-15=0" label="P(7,2) berada pada lingkaran" />
                <Equation math="\begin{aligned}7x+2y-3(x+7)+(y+2)-15&=0\\4x+3y-34&=0\end{aligned}" label="Substitusikan ke rumus bentuk umum" />
                <p className="text-sm leading-relaxed text-emerald-100">Garis singgungnya adalah <InlineMath math="4x+3y-34=0" />. Mengecek titik terlebih dahulu mencegah kita menerapkan rumus pada titik yang keliru.</p>
              </Example>
            </div>
          </section>

          <section id="gradien-pusat-asal">
            <SectionHeading index="4" title="Gradien garis diketahui, titik singgung belum" description="Untuk garis y = mx + c dan lingkaran berpusat di O berjari-jari r, jarak pusat ke garis harus sama dengan r. Inilah jalan cepat untuk menemukan dua kemungkinan garis singgung." />
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-slate-300">Tuliskan garis sebagai <InlineMath math="mx-y+c=0" />. Jarak titik <InlineMath math="(0,0)" /> ke garis tersebut adalah <InlineMath math="\frac{|c|}{\sqrt{m^2+1}}" />. Supaya tepat menyinggung, jarak ini harus r.</p>
              <Equation math="\frac{|c|}{\sqrt{m^2+1}}=r\quad\Longrightarrow\quad c=\pm r\sqrt{m^2+1}" label="Dua garis sejajar dengan gradien m" />
              <Equation math="y=mx\pm r\sqrt{m^2+1}" label="Garis singgung lingkaran x² + y² = r²" />
              <p className="text-sm leading-relaxed text-slate-300">Tanda <InlineMath math="\pm" /> berarti biasanya ada dua garis singgung sejajar: satu di sisi atas dan satu di sisi bawah lingkaran.</p>
              <Example number={5} title="Dua garis dengan gradien yang sama">
                <p className="text-sm leading-relaxed text-slate-300">Tentukan garis-garis singgung bergradien 2 pada lingkaran <InlineMath math="x^2+y^2=16" />.</p>
                <Equation math="r=4,\quad m=2,\quad \sqrt{m^2+1}=\sqrt5" />
                <Equation math="y=2x\pm4\sqrt5" label="Dua persamaan garis singgung" />
                <p className="text-sm leading-relaxed text-slate-300">Jadi, garisnya adalah <InlineMath math="y=2x+4\sqrt5" /> dan <InlineMath math="y=2x-4\sqrt5" />. Keduanya memiliki gradien 2 dan berjarak 4 satuan dari pusat.</p>
              </Example>
            </div>
          </section>

          <section id="gradien-pusat-sebarang">
            <SectionHeading index="5" title="Rumus gradien untuk pusat sembarang" description="Untuk lingkaran berpusat C(h,k), geser persamaan garis ke bentuk yang menggunakan selisih terhadap pusat. Langkahnya tetap sama: jarak C ke garis harus r." />
            <div className="space-y-4">
              <Equation math="y-k=m(x-h)\pm r\sqrt{m^2+1}" label="Garis singgung pada lingkaran (x−h)² + (y−k)² = r²" />
              <p className="text-sm leading-relaxed text-slate-300">Bentuk ini berasal dari garis sejajar berslope m yang melalui pusat, lalu digeser tegak lurus sejauh r. Dengan demikian, untuk setiap gradien m ada dua kemungkinan garis singgung.</p>
              <Example number={6} title="Gradien pada lingkaran yang bergeser">
                <p className="text-sm leading-relaxed text-slate-300">Carilah garis singgung bergradien <InlineMath math="m=-\frac34" /> pada lingkaran <InlineMath math="(x-2)^2+(y+3)^2=16" />.</p>
                <p className="text-sm leading-relaxed text-slate-300">Pusatnya <InlineMath math="(2,-3)" />, jari-jarinya 4, dan <InlineMath math="\sqrt{m^2+1}=\frac54" />. Maka <InlineMath math="r\sqrt{m^2+1}=5" />.</p>
                <Equation math="\begin{aligned}y+3&=-\frac34(x-2)\pm5\\4y+12&=-3x+6\pm20\end{aligned}" label="Masukkan h, k, m, dan r" />
                <Equation math="3x+4y=14\quad\text{atau}\quad 3x+4y=-26" label="Dua garis singgung" />
              </Example>
            </div>
          </section>

          <section id="titik-luar">
            <SectionHeading index="6" title="Dua garis singgung dari titik di luar lingkaran" description="Satu titik luar biasanya dapat dihubungkan dengan dua garis singgung. Titik singgungnya belum diketahui, jadi kita cari dulu dengan menggabungkan persamaan lingkaran dan sifat tegak lurus." />
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-slate-300">Misalkan lingkaran <InlineMath math="x^2+y^2=r^2" />, titik luar <InlineMath math="P(u,v)" />, dan titik singgung <InlineMath math="T(x_1,y_1)" />. Syarat <InlineMath math="OT\perp PT" /> berarti hasil kali skalar kedua arah itu nol.</p>
                <Equation math="(x_1,y_1)\cdot(u-x_1,v-y_1)=0" label="Gunakan tegak lurus di T" />
                <Equation math="ux_1+vy_1=x_1^2+y_1^2=r^2" label="Persamaan garis yang menghubungkan dua titik singgung" />
                <p className="text-sm leading-relaxed text-slate-300">Persamaan terakhir dikenal sebagai garis polar titik P terhadap lingkaran. Titik potongnya dengan lingkaran adalah kandidat titik singgung; setelah mendapat T, gunakan rumus pada bagian 2 untuk menulis garis singgungnya.</p>
              </div>
              <TangentDiagram external />
            </div>
            <div className="mt-4 space-y-4">
              <Example number={7} title="Mencari kedua garis singgung dari satu titik luar">
                <p className="text-sm leading-relaxed text-slate-300">Tentukan garis singgung lingkaran <InlineMath math="x^2+y^2=25" /> yang melalui <InlineMath math="P(13,0)" />.</p>
                <p className="text-sm leading-relaxed text-slate-300">Karena <InlineMath math="P" /> ada di luar (<InlineMath math="13>5" />), ada dua garis singgung. Persamaan penghubung titik-titik singgung diperoleh dari <InlineMath math="ux_1+vy_1=r^2" />:</p>
                <Equation math="13x_1+0y_1=25\quad\Longrightarrow\quad x_1=\frac{25}{13}" />
                <p className="text-sm leading-relaxed text-slate-300">Masukkan ke persamaan lingkaran untuk memperoleh ordinat titik singgung:</p>
                <Equation math="y_1^2=25-\left(\frac{25}{13}\right)^2=\frac{3600}{169}\quad\Longrightarrow\quad y_1=\pm\frac{60}{13}" />
                <p className="text-sm leading-relaxed text-slate-300">Maka titik singgungnya <InlineMath math="T_1(\frac{25}{13},\frac{60}{13})" /> dan <InlineMath math="T_2(\frac{25}{13},-\frac{60}{13})" />. Terapkan rumus <InlineMath math="x_1x+y_1y=25" /> untuk masing-masing titik.</p>
                <Equation math="5x+12y=65\quad\text{dan}\quad5x-12y=65" label="Dua garis singgung melalui P(13,0)" />
                <p className="text-sm leading-relaxed text-emerald-100">Cek cepat: kedua persamaan benar-benar dilewati P(13,0), dan masing-masing menyinggung lingkaran.</p>
              </Example>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-rose-200/15 bg-rose-200/[.04] p-4 text-sm leading-relaxed text-slate-300"><strong className="text-rose-100">P di dalam:</strong> jarak OP &lt; r, tidak ada garis singgung real melalui P.</div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.04] p-4 text-sm leading-relaxed text-slate-300"><strong className="text-amber-100">P pada lingkaran:</strong> jarak OP = r, ada satu garis singgung di P.</div>
                <div className="rounded-2xl border border-emerald-200/15 bg-emerald-200/[.04] p-4 text-sm leading-relaxed text-slate-300"><strong className="text-emerald-100">P di luar:</strong> jarak OP &gt; r, ada dua garis singgung.</div>
              </div>
            </div>
          </section>

          <section id="pilih-rumus">
            <SectionHeading index="7" title="Pilih cara yang pas, lalu cek hasilnya" description="Baca informasi yang diberikan dengan teliti. Metode yang tepat membuat perhitungan lebih ringkas dan membantu menghindari kesalahan tanda." />
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#101b2d]/80 p-4 sm:p-5">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-cyan-100"><tr><th className="border-b border-white/10 p-3">Informasi soal</th><th className="border-b border-white/10 p-3">Mulai dari</th><th className="border-b border-white/10 p-3">Jangan lupa</th></tr></thead>
                <tbody className="text-slate-300">
                  <tr><td className="border-b border-white/5 p-3">Titik singgung diketahui, pusat O</td><td className="border-b border-white/5 p-3"><InlineMath math="x_1x+y_1y=r^2" /></td><td className="border-b border-white/5 p-3">Cek titik ada pada lingkaran.</td></tr>
                  <tr><td className="border-b border-white/5 p-3">Titik singgung diketahui, pusat C(h,k)</td><td className="border-b border-white/5 p-3"><InlineMath math="(x_1-h)(x-h)+(y_1-k)(y-k)=r^2" /></td><td className="border-b border-white/5 p-3">Gunakan selisih koordinat dari pusat.</td></tr>
                  <tr><td className="border-b border-white/5 p-3">Gradien diketahui</td><td className="border-b border-white/5 p-3"><InlineMath math="y-k=m(x-h)\pm r\sqrt{m^2+1}" /></td><td className="border-b border-white/5 p-3">Biasanya ada dua garis sejajar.</td></tr>
                  <tr><td className="p-3">Titik luar diketahui</td><td className="p-3">Cari titik singgung dengan syarat tegak lurus</td><td className="p-3">Titik luar menghasilkan dua garis singgung.</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                <h3 className="font-display font-bold text-violet-100">Cek dengan dua cara</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">Substitusikan titik yang diketahui ke persamaan garis untuk memastikan garis melewatinya. Lalu periksa jarak pusat ke garis—hasilnya harus sama dengan jari-jari.</p>
              </div>
              <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                <h3 className="font-display font-bold text-cyan-100">Jebakan tanda yang sering muncul</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">Pada lingkaran berpusat (h,k), tulis <InlineMath math="x-h" /> dan <InlineMath math="y-k" /> dengan teliti. Saat garis ditulis <InlineMath math="Ax+By+D=0" />, jarak titik ke garis memakai nilai mutlak di pembilang.</p>
              </div>
            </div>
          </section>

          <section id="cek-pemahaman">
            <SectionHeading index="8" title="Cek pemahaman—coba dulu, ya!" description="Pilih satu jawaban pada tiap soal. Jika belum pas, penjelasannya akan memberi petunjuk untuk mencoba lagi." />
            <SelfCheck />
          </section>

          <section id="ringkasan">
            <SectionHeading index="9" title="Bekal penting sebelum lanjut" description="Ringkasan ini membantu mengingat rumus; saat mengerjakan soal, tetap tulis alasan dan langkah hitungnya." />
            <div className="rounded-3xl border border-cyan-200/15 bg-[#101b2d]/80 p-5 sm:p-6">
              <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Jari-jari pada titik singgung tegak lurus garis singgung.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Untuk <InlineMath math="x^2+y^2=r^2" /> di P(x₁,y₁): <InlineMath math="x_1x+y_1y=r^2" />.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Untuk pusat C(h,k): <InlineMath math="(x_1-h)(x-h)+(y_1-k)(y-k)=r^2" />.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Untuk gradien m: <InlineMath math="y-k=m(x-h)\pm r\sqrt{m^2+1}" />.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Titik di luar lingkaran memiliki dua garis singgung; panjang kedua ruas singgung dari titik itu sama.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Selalu uji bahwa titik singgung berada pada lingkaran dan garis yang diperoleh benar-benar menyinggungnya.</li>
              </ul>
            </div>
          </section>
        </div>

        <aside className="hidden desktop:block">
          <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#101b2d]/90 p-4 backdrop-blur">
            <p className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-cyan-100"><Target className="h-4 w-4" aria-hidden="true" /> Peta belajar</p>
            <nav className="space-y-1.5">
              {[
                ["gagasan-singgung", "Gagasan singgung"],
                ["titik-di-lingkaran-asal", "Titik singgung · pusat O"],
                ["titik-pada-lingkaran-geser", "Pusat bergeser"],
                ["gradien-pusat-asal", "Gradien · pusat O"],
                ["gradien-pusat-sebarang", "Gradien · pusat lain"],
                ["titik-luar", "Titik di luar"],
                ["pilih-rumus", "Pilih rumus"],
                ["cek-pemahaman", "Cek pemahaman"],
                ["ringkasan", "Bekal penting"],
              ].map(([id, label], index) => (
                <a key={id} href={`#${id}`} className="flex items-center gap-2 rounded-xl px-2 py-2 text-xs text-slate-300 transition hover:bg-white/[.05] hover:text-cyan-100">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/[.06] text-[10px] font-bold text-cyan-100/80">{index + 1}</span>{label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </main>
  </div>
);

export default SmaPersamaanGarisSinggungLingkaranPage;
