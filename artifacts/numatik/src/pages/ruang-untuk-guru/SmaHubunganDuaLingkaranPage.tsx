import { useState, type ReactNode } from "react";
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

function Example({ number, title, children }: { number: number; title: string; children: ReactNode }) {
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

const POSITION_CASES = [
  { title: "Terpisah di luar", d: 70, condition: "d > r₁ + r₂", kind: "outside" },
  { title: "Singgung luar", d: 59, condition: "d = r₁ + r₂", kind: "external" },
  { title: "Berpotongan", d: 40, condition: "|r₁ − r₂| < d < r₁ + r₂", kind: "intersect" },
  { title: "Singgung dalam", d: 9, condition: "d = |r₁ − r₂|", kind: "internal" },
  { title: "Satu di dalam", d: 5, condition: "0 < d < |r₁ − r₂|", kind: "inside" },
  { title: "Berimpit", d: 0, condition: "d = 0, r₁ = r₂", kind: "coincident" },
] as const;

function PositionDiagrams() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 desktop:grid-cols-3 phone-land:grid-cols-2">
      {POSITION_CASES.map(({ title, d, condition, kind }) => {
        const c1 = 47;
        const c2 = c1 + d;
        return (
          <figure key={kind} className="rounded-2xl border border-white/10 bg-[#071326]/75 p-3">
            <svg viewBox="0 0 180 106" role="img" aria-label={`Diagram dua lingkaran: ${title.toLowerCase()}.`} className="mx-auto h-auto w-full max-w-[220px]">
              <circle cx={c1} cy="51" r="34" fill="#22d3ee" fillOpacity=".08" stroke="#67e8f9" strokeWidth="2" />
              {kind === "coincident"
                ? <circle cx={c1} cy="51" r="34" fill="none" stroke="#fb923c" strokeWidth="2" strokeDasharray="4 3" />
                : <circle cx={c2} cy="51" r="25" fill="#fb923c" fillOpacity=".06" stroke="#fb923c" strokeWidth="2" />}
              <circle cx={c1} cy="51" r="2.5" fill="#67e8f9" />
              {kind !== "coincident" && <circle cx={c2} cy="51" r="2.5" fill="#fb923c" />}
              {kind === "intersect" && <><circle cx="73.6" cy="29.9" r="3" fill="#fbbf24" /><circle cx="73.6" cy="72.1" r="3" fill="#fbbf24" /></>}
              {kind === "external" && <circle cx="81" cy="51" r="3" fill="#34d399" />}
              {kind === "internal" && <circle cx="81" cy="51" r="3" fill="#34d399" />}
              {kind === "coincident"
                ? <text x={c1 + 6} y="56" fill="#fef3c7" fontSize="8">C₁ = C₂</text>
                : <><text x={c1 - 5} y="57" fill="#e0f2fe" fontSize="9">C₁</text><text x={c2 - 5} y="57" fill="#ffedd5" fontSize="9">C₂</text></>}
              <text x="90" y="98" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">{condition}</text>
            </svg>
            <figcaption className="mt-1 text-center font-body text-xs font-semibold text-slate-300">{title}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function ChordDiagram() {
  return (
    <figure className="rounded-2xl border border-white/10 bg-[#071326]/75 p-3">
      <svg viewBox="0 0 340 220" role="img" aria-label="Dua lingkaran berpotongan di A dan B. Garis AB adalah tali busur persekutuan dan tegak lurus garis penghubung pusat." className="mx-auto h-auto w-full max-w-md">
        <circle cx="126" cy="108" r="72" fill="#22d3ee" fillOpacity=".07" stroke="#67e8f9" strokeWidth="2.5" />
        <circle cx="205" cy="108" r="61" fill="#fb923c" fillOpacity=".055" stroke="#fdba74" strokeWidth="2.5" />
        <line x1="126" y1="108" x2="205" y2="108" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5 5" />
        <line x1="174.1" y1="54.4" x2="174.1" y2="161.6" stroke="#34d399" strokeWidth="3" />
        <circle cx="174.1" cy="54.4" r="4" fill="#fef3c7" /><circle cx="174.1" cy="161.6" r="4" fill="#fef3c7" />
        <circle cx="126" cy="108" r="3.5" fill="#67e8f9" /><circle cx="205" cy="108" r="3.5" fill="#fdba74" />
        <path d="M168.1 108 L168.1 114 L174.1 114" fill="none" stroke="#fef3c7" strokeWidth="1.5" />
        <text x="113" y="129" fill="#e0f2fe" fontSize="12">C₁</text><text x="208" y="129" fill="#ffedd5" fontSize="12">C₂</text>
        <text x="180" y="53" fill="#fef3c7" fontSize="12">A</text><text x="180" y="174" fill="#fef3c7" fontSize="12">B</text>
        <text x="181" y="110" fill="#a7f3d0" fontSize="11">AB</text>
        <text x="148" y="101" fill="#fde68a" fontSize="10">d</text>
        <text x="14" y="207" fill="#cbd5e1" fontSize="11">Garis pusat tegak lurus tali busur persekutuan.</text>
      </svg>
      <figcaption className="mt-1 text-center font-body text-xs leading-relaxed text-slate-400">Titik tengah AB terletak pada garis penghubung pusat C₁C₂.</figcaption>
    </figure>
  );
}

const QUESTIONS = [
  {
    question: "Dua lingkaran berjari-jari 8 dan 3 memiliki jarak pusat 11. Kedudukannya adalah ...",
    options: ["Berpotongan di dua titik", "Bersinggungan luar", "Bersinggungan dalam"],
    answer: 1,
    explanation: "Jarak pusat sama dengan jumlah jari-jari: 11 = 8 + 3, jadi keduanya bersinggungan luar.",
  },
  {
    question: "Jari-jari dua lingkaran 7 dan 5, sedangkan jarak pusatnya 1. Bagaimana kedudukannya?",
    options: ["Berpotongan di dua titik", "Berimpit", "Satu lingkaran berada di dalam yang lain tanpa bersinggungan"],
    answer: 2,
    explanation: "Selisih jari-jari 2 dan d = 1 < 2, jadi lingkaran kecil berada di dalam tanpa bersinggungan.",
  },
  {
    question: "Dua lingkaran x² + y² − 4x + 2y − 8 = 0 dan x² + y² + 2x + 2y − 8 = 0 memiliki tali busur persekutuan pada garis ...",
    options: ["x = 0", "y = −1", "x + y = 0"],
    answer: 0,
    explanation: "Kurangkan persamaan lingkaran yang diberikan: suku yang tersisa menghasilkan −6x = 0, yaitu x = 0.",
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

const SmaHubunganDuaLingkaranPage = () => (
  <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation prevPath={`${BASE_PATH}/persamaan-garis-singgung-lingkaran`} />
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
        <div className="relative max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Ruang untuk Guru · SMA</span>
            <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika · Persamaan Lingkaran</span>
          </div>
          <div className="mb-3 flex items-center gap-2 text-amber-200"><Sparkles className="h-4 w-4" aria-hidden="true" /><p className="font-body text-xs font-bold uppercase tracking-[.24em]">Dua lingkaran, banyak kemungkinan seru!</p></div>
          <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">Hubungan <span className="text-cyan-200">dua lingkaran</span></h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">Apakah dua lingkaran saling berjauhan, bersinggungan, berpotongan, atau salah satunya berada di dalam yang lain? Kita dapat menjawabnya dengan membandingkan jarak kedua pusat terhadap jari-jari. Setelah itu, kita telusuri persamaan tali busur bersama dan sudut yang terbentuk.</p>
          <div className="mt-6 flex items-start gap-2 text-sm text-amber-100"><Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>Target belajar: mengklasifikasikan kedudukan lingkaran, mencari jarak pusat, menyusun persamaan tali busur persekutuan, membentuk keluarga lingkaran, dan menganalisis sudut serta panjang tali busur.</span></div>
        </div>
      </header>

      <div className="grid gap-8 desktop:grid-cols-[minmax(0,1fr)_260px] phone-land:grid-cols-2">
        <div className="min-w-0 space-y-12">
          <section id="jarak-pusat">
            <SectionHeading index="1" title="Kunci utamanya: jarak antarpusat" description="Misalkan dua lingkaran berpusat di C₁ dan C₂ dengan jari-jari r₁ dan r₂. Sebut jarak kedua pusat d. Posisi kedua lingkaran dapat diprediksi dengan membandingkan d terhadap jumlah dan selisih jari-jarinya." />
            <div className="space-y-4">
              <Equation math="d=C_1C_2=\sqrt{(h_2-h_1)^2+(k_2-k_1)^2}" label="Jarak antara C₁(h₁,k₁) dan C₂(h₂,k₂)" />
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                  <h3 className="font-display font-bold text-cyan-100">Jika persamaan lingkarannya diketahui</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Ubah atau baca setiap persamaan ke bentuk pusat-jari-jari. Untuk bentuk <InlineMath math="x^2+y^2+Ax+By+C=0" />, pusatnya <InlineMath math="(-A/2,-B/2)" /> dan <InlineMath math="r^2=(A^2+B^2)/4-C" />.</p>
                </div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                  <h3 className="font-display font-bold text-violet-100">Pikirkan garis pusatnya</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Tarik garis khayal yang menghubungkan C₁ dan C₂. Lingkaran berjari-jari r₁ dan r₂ dapat dibandingkan sepanjang garis ini, tanpa perlu menggambar dengan ukuran sempurna.</p>
                </div>
              </div>
              <PositionDiagrams />
            </div>
          </section>

          <section id="klasifikasi">
            <SectionHeading index="2" title="Enam kedudukan yang perlu dikenali" description="Nilai batasnya adalah r₁+r₂ dan |r₁−r₂|. Kesamaan dengan jumlah berarti bersinggungan dari luar, sedangkan kesamaan dengan selisih berarti bersinggungan dari dalam." />
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#101b2d]/80 p-4 sm:p-5">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="text-cyan-100"><tr><th className="border-b border-white/10 p-3">Hubungan d</th><th className="border-b border-white/10 p-3">Kedudukan</th><th className="border-b border-white/10 p-3">Banyak titik bersama</th></tr></thead>
                <tbody className="text-slate-300">
                  <tr><td className="border-b border-white/5 p-3"><InlineMath math="d>r_1+r_2" /></td><td className="border-b border-white/5 p-3">Terpisah di luar</td><td className="border-b border-white/5 p-3">0</td></tr>
                  <tr><td className="border-b border-white/5 p-3"><InlineMath math="d=r_1+r_2" /></td><td className="border-b border-white/5 p-3">Bersinggungan luar</td><td className="border-b border-white/5 p-3">1</td></tr>
                  <tr><td className="border-b border-white/5 p-3"><InlineMath math="|r_1-r_2|<d<r_1+r_2" /></td><td className="border-b border-white/5 p-3">Berpotongan di dua titik</td><td className="border-b border-white/5 p-3">2</td></tr>
                  <tr><td className="border-b border-white/5 p-3"><InlineMath math="d=|r_1-r_2|>0" /></td><td className="border-b border-white/5 p-3">Bersinggungan dalam</td><td className="border-b border-white/5 p-3">1</td></tr>
                  <tr><td className="border-b border-white/5 p-3"><InlineMath math="0<d<|r_1-r_2|" /></td><td className="border-b border-white/5 p-3">Satu lingkaran di dalam yang lain</td><td className="border-b border-white/5 p-3">0</td></tr>
                  <tr><td className="p-3"><InlineMath math="d=0,\ r_1=r_2" /></td><td className="p-3">Berimpit</td><td className="p-3">Tak hingga titik</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-4 text-sm leading-relaxed text-amber-50">
              <Lightbulb className="mr-2 inline h-4 w-4" aria-hidden="true" /><strong>Kasus pusat sama:</strong> jika <InlineMath math="d=0" /> tetapi <InlineMath math="r_1\ne r_2" />, kedua lingkaran sepusat dan salah satunya berada di dalam yang lain tanpa berpotongan. Jika jari-jarinya juga sama, keduanya berimpit.
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Example number={1} title="Menentukan kedudukan dari pusat dan jari-jari">
                <p className="text-sm leading-relaxed text-slate-300">Lingkaran pertama berpusat di <InlineMath math="C_1(-2,1)" /> dengan jari-jari 6. Lingkaran kedua berpusat di <InlineMath math="C_2(5,1)" /> dengan jari-jari 4. Bagaimana kedudukannya?</p>
                <Equation math="d=\sqrt{(5-(-2))^2+(1-1)^2}=7" label="Hitung jarak pusat" />
                <p className="text-sm leading-relaxed text-slate-300">Selisih jari-jari <InlineMath math="|6-4|=2" />, sedangkan jumlahnya <InlineMath math="6+4=10" />. Karena <InlineMath math="2<7<10" />, kedua lingkaran berpotongan di dua titik.</p>
              </Example>
              <Example number={2} title="Membedakan singgung dalam dan luar">
                <p className="text-sm leading-relaxed text-slate-300">Dua lingkaran memiliki jari-jari 8 dan 3. Tentukan kedudukan jika jarak pusatnya (a) 11, (b) 5, atau (c) 4.</p>
                <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
                  <li><strong className="text-cyan-100">(a)</strong> 11 = 8 + 3, jadi bersinggungan luar.</li>
                  <li><strong className="text-cyan-100">(b)</strong> 5 = 8 − 3, jadi bersinggungan dalam.</li>
                  <li><strong className="text-cyan-100">(c)</strong> 0 &lt; 4 &lt; 5, jadi lingkaran kecil berada di dalam lingkaran besar tanpa bersinggungan.</li>
                </ul>
              </Example>
            </div>
          </section>

          <section id="tali-busur">
            <SectionHeading index="3" title="Tali busur persekutuan dan sumbu radikal" description="Jika dua lingkaran berpotongan di A dan B, ruas AB adalah tali busur yang sama-sama dimiliki keduanya. Persamaan garis AB dapat diperoleh dengan mengurangkan kedua persamaan lingkaran." />
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-slate-300">Tuliskan persamaan lingkaran dalam bentuk umum. Karena suku <InlineMath math="x^2" /> dan <InlineMath math="y^2" /> sama, pengurangan menghilangkan suku kuadrat dan tersisa persamaan garis lurus.</p>
                <Equation math="\begin{aligned}L_1&=x^2+y^2+A_1x+B_1y+C_1=0\\L_2&=x^2+y^2+A_2x+B_2y+C_2=0\end{aligned}" label="Dua lingkaran" />
                <Equation math="L_1-L_2=(A_1-A_2)x+(B_1-B_2)y+(C_1-C_2)=0" label="Garis sumbu radikal" />
                <p className="text-sm leading-relaxed text-slate-300">Setiap titik pada sumbu radikal mempunyai kuasa yang sama terhadap kedua lingkaran. Jika lingkaran benar-benar berpotongan, garis ini melewati titik A dan B sehingga menjadi garis tali busur persekutuan.</p>
              </div>
              <ChordDiagram />
            </div>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4 text-sm leading-relaxed text-slate-300">
                <h3 className="font-display font-bold text-violet-100">Arah tali busur persekutuan</h3>
                <p className="mt-2">Garis penghubung pusat tegak lurus tali busur persekutuan. Selain itu, garis pusat membagi tali busur tersebut menjadi dua bagian sama panjang. Jadi, bila jarak pusat dan jari-jari diketahui, panjang tali busur dapat ditemukan lewat segitiga siku-siku.</p>
              </div>
              <Example number={3} title="Menemukan tali busur bersama dari persamaan lingkaran">
                <p className="text-sm leading-relaxed text-slate-300">Dua lingkaran diberikan oleh <InlineMath math="L_1:x^2+y^2-4x+2y-8=0" /> dan <InlineMath math="L_2:x^2+y^2+2x+2y-8=0" />. Tentukan garis tali busur persekutuannya dan titik potongnya.</p>
                <Equation math="\begin{aligned}L_1-L_2&=(-4-2)x+(2-2)y+(-8+8)=0\\-6x&=0\\x&=0\end{aligned}" label="Kurangkan kedua persamaan" />
                <p className="text-sm leading-relaxed text-slate-300">Substitusikan <InlineMath math="x=0" /> ke salah satu lingkaran:</p>
                <Equation math="y^2+2y-8=0\quad\Longrightarrow\quad(y+4)(y-2)=0" />
                <p className="text-sm leading-relaxed text-emerald-100">Titik perpotongannya adalah <InlineMath math="A(0,2)" /> dan <InlineMath math="B(0,-4)" />. Dengan demikian, ruas AB berada pada garis <InlineMath math="x=0" /> dan panjangnya 6 satuan.</p>
                <p className="text-sm leading-relaxed text-slate-300">Sebagai cek kedudukan, pusat-pusat lingkarannya (2,−1) dan (−1,−1), sehingga jaraknya 3. Jari-jarinya √13 dan √10; karena <InlineMath math="|\sqrt{13}-\sqrt{10}|<3<\sqrt{13}+\sqrt{10}" />, kedua lingkaran memang berpotongan.</p>
              </Example>
            </div>
          </section>

          <section id="keluarga-lingkaran">
            <SectionHeading index="4" title="Membuat keluarga lingkaran melalui A dan B" description="Semua lingkaran yang melewati dua titik potong A dan B dapat dibangun dari gabungan aljabar persamaan L₁ dan L₂. Karena L₁−L₂ adalah garis AB, setiap anggota keluarga tetap melewati kedua titik tersebut." />
            <div className="space-y-4">
              <Equation math="L_3=L_1+\lambda(L_1-L_2)=0" label="Keluarga lingkaran melalui titik potong L₁ dan L₂" />
              <p className="text-sm leading-relaxed text-slate-300">Di sini <InlineMath math="\lambda" /> adalah bilangan real. Untuk setiap pilihan <InlineMath math="\lambda" />, titik yang memenuhi <InlineMath math="L_1=0" /> dan <InlineMath math="L_2=0" /> juga memenuhi <InlineMath math="L_3=0" />. Karena selisih kedua persamaan tidak mengandung suku kuadrat, hasilnya tetap persamaan lingkaran.</p>
              <Example number={4} title="Memilih satu lingkaran dari keluarga">
                <p className="text-sm leading-relaxed text-slate-300">Gunakan kembali pasangan lingkaran pada contoh sebelumnya. Bentuk persamaan anggota keluarga yang melalui titik <InlineMath math="R(1,-1)" />.</p>
                <p className="text-sm leading-relaxed text-slate-300">Untuk titik tersebut, <InlineMath math="L_1(1,-1)=-12" /> dan <InlineMath math="(L_1-L_2)(1,-1)=-6" />. Syarat <InlineMath math="L_3(1,-1)=0" /> memberi <InlineMath math="-12-6\lambda=0" />, jadi <InlineMath math="\lambda=-2" />.</p>
                <Equation math="\begin{aligned}L_3&=L_1-2(L_1-L_2)=0\\&=x^2+y^2+8x+2y-8=0\end{aligned}" label="Persamaan lingkaran yang dicari" />
                <p className="text-sm leading-relaxed text-emerald-100">Pemeriksaan: titik A dan B tetap berada pada L₃, dan R(1,−1) juga memenuhi persamaan tersebut.</p>
              </Example>
            </div>
          </section>

          <section id="sudut-dan-panjang">
            <SectionHeading index="5" title="Sudut dua lingkaran dan panjang tali busur" description="Saat dua lingkaran berpotongan, sudut di antara garis singgung pada titik potong sama besar dengan sudut antara kedua jari-jari menuju titik tersebut. Panjang tali busurnya pun dapat dihitung dari jarak antarpusat." />
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                  <h3 className="font-display font-bold text-cyan-100">Mengapa sudutnya sama?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Di titik potong, setiap garis singgung tegak lurus jari-jarinya. Memutar kedua garis 90° tidak mengubah besar sudut di antara keduanya. Karena itu sudut antara dua garis singgung sama dengan sudut antara jari-jari yang menuju titik potong.</p>
                </div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <h3 className="font-display font-bold text-amber-100">Setengah tali busur membentuk segitiga siku-siku</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Jika jarak pusat C₁ ke garis tali busur adalah <InlineMath math="a" />, setengah panjang tali busur bernilai <InlineMath math="\sqrt{r_1^2-a^2}" />. Garis pusat tegak lurus tali busur, sehingga Teorema Pythagoras langsung berlaku.</p>
                </div>
              </div>
              <Equation math="a=\frac{d^2+r_1^2-r_2^2}{2d},\qquad AB=2\sqrt{r_1^2-a^2}\quad(d>0)" label="Jarak C₁ ke tali busur AB dan panjang tali busur" />
              <p className="text-sm leading-relaxed text-slate-300">Rumus <InlineMath math="a" /> dapat diturunkan dengan membandingkan dua segitiga siku-siku yang memiliki sisi tegak lurus sama, atau dengan mengurangkan persamaan lingkaran. Rumus panjang AB digunakan ketika kedua lingkaran berpotongan.</p>
              <Example number={5} title="Dua lingkaran sama besar berpotongan">
                <p className="text-sm leading-relaxed text-slate-300">Dua lingkaran berjari-jari 5 memiliki jarak antarpusat 5. Tentukan panjang tali busur persekutuan dan sudut antara jari-jari di salah satu titik potong.</p>
                <p className="text-sm leading-relaxed text-slate-300">Karena ketiga sisi segitiga yang dibentuk oleh kedua pusat dan titik potong sama-sama 5, segitiga itu sama sisi. Maka sudut antara jari-jari adalah 60°.</p>
                <Equation math="a=\frac{5^2+5^2-5^2}{2(5)}=\frac52" label="Jarak pusat ke tali busur" />
                <Equation math="\frac{AB}{2}=\sqrt{5^2-\left(\frac52\right)^2}=\frac{5\sqrt3}{2}\quad\Longrightarrow\quad AB=5\sqrt3" />
                <p className="text-sm leading-relaxed text-emerald-100">Sudut antara garis-garis singgung di titik potong juga 60° (sudut antara kedua garis sebagai garis, yaitu sudut yang lebih kecil).</p>
              </Example>
            </div>
          </section>

          <section id="cek-pemahaman">
            <SectionHeading index="6" title="Cek pemahaman—ayo tentukan hubungannya!" description="Gunakan perbandingan jarak pusat, jumlah jari-jari, dan selisih jari-jari. Pilih jawaban, lalu baca pembahasannya." />
            <SelfCheck />
          </section>

          <section id="ringkasan">
            <SectionHeading index="7" title="Ringkasan bekal penting" description="Simpan langkah-langkah berikut sebagai peta cepat saat menyelesaikan soal, ya!" />
            <div className="rounded-3xl border border-cyan-200/15 bg-[#101b2d]/80 p-5 sm:p-6">
              <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Hitung jarak pusat <InlineMath math="d" /> dan tentukan kedua jari-jari sebelum mengklasifikasikan.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" /><InlineMath math="d=r_1+r_2" /> berarti singgung luar; <InlineMath math="d=|r_1-r_2|>0" /> berarti singgung dalam.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Dua titik potong terjadi jika <InlineMath math="|r_1-r_2|<d<r_1+r_2" />.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Kurangkan persamaan lingkaran untuk memperoleh sumbu radikal; bila keduanya berpotongan, garis itu memuat tali busur bersama.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Garis pusat tegak lurus dan membagi dua tali busur persekutuan.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Untuk pusat berimpit, bandingkan jari-jari secara khusus: sama berarti berimpit, berbeda berarti satu lingkaran berada di dalam yang lain.</li>
              </ul>
            </div>
          </section>
        </div>

        <aside className="hidden desktop:block">
          <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#101b2d]/90 p-4 backdrop-blur">
            <p className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-cyan-100"><Target className="h-4 w-4" aria-hidden="true" /> Peta belajar</p>
            <nav className="space-y-1.5">
              {[
                ["jarak-pusat", "Jarak antarpusat"],
                ["klasifikasi", "Kedudukan lingkaran"],
                ["tali-busur", "Tali busur bersama"],
                ["keluarga-lingkaran", "Keluarga lingkaran"],
                ["sudut-dan-panjang", "Sudut dan panjang"],
                ["cek-pemahaman", "Cek pemahaman"],
                ["ringkasan", "Ringkasan"],
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

export default SmaHubunganDuaLingkaranPage;
