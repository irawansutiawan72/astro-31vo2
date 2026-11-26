import { useState, type ReactNode } from "react";
import { BookOpen, Check, Lightbulb, Sparkles, Target } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import PageNavigation from "@/components/PageNavigation";
import Starfield from "@/components/Starfield";

const PAGE_PATH = "/ruang-untuk-guru/sma/buku-animasi/lingkaran";

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
      <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] font-display text-xs font-black text-cyan-100">
        {index}
      </span>
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-slate-300">{description}</p>
      </div>
    </div>
  );
}

function Note({ title, children, tone = "cyan" }: {
  title: string;
  children: ReactNode;
  tone?: "cyan" | "amber" | "emerald" | "violet";
}) {
  const tones = {
    cyan: "border-cyan-200/15 bg-cyan-200/[.05] text-cyan-50",
    amber: "border-amber-200/15 bg-amber-200/[.05] text-amber-50",
    emerald: "border-emerald-200/15 bg-emerald-200/[.05] text-emerald-50",
    violet: "border-violet-200/15 bg-violet-200/[.05] text-violet-50",
  };
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${tones[tone]}`}>
      <Lightbulb className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p><strong>{title}</strong> {children}</p>
    </div>
  );
}

function Example({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-orange-200/20 bg-[linear-gradient(140deg,rgba(106,45,35,.16),rgba(14,25,42,.92)_48%)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-300/15 text-orange-200">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-body text-[10px] font-black uppercase tracking-[.2em] text-orange-200">Contoh baru {number}</p>
          <h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </article>
  );
}

function CircleDiagram({
  centerX,
  centerY,
  radius,
  pointX,
  pointY,
  caption,
}: {
  centerX: number;
  centerY: number;
  radius: number;
  pointX?: number;
  pointY?: number;
  caption: string;
}) {
  const scale = 12;
  const originX = 160;
  const originY = 108;
  const cx = originX + centerX * scale;
  const cy = originY - centerY * scale;
  const radiusPx = radius * scale;
  const px = pointX === undefined ? cx + radiusPx * 0.8 : originX + pointX * scale;
  const py = pointY === undefined ? cy - radiusPx * 0.6 : originY - pointY * scale;

  return (
    <figure className="rounded-2xl border border-white/10 bg-[#071326]/75 p-3">
      <svg viewBox="0 0 320 220" role="img" aria-label={caption} className="mx-auto h-auto w-full max-w-sm text-cyan-100">
        <path d="M22 108 H298 M160 205 V18" fill="none" stroke="currentColor" strokeOpacity=".4" strokeWidth="1.5" />
        <path d="M291 104 l7 4 -7 4 M156 25 l4 -7 4 7" fill="none" stroke="currentColor" strokeOpacity=".65" strokeWidth="1.5" />
        <text x="300" y="103" fontSize="12" fill="currentColor">x</text>
        <text x="166" y="19" fontSize="12" fill="currentColor">y</text>
        <circle cx={cx} cy={cy} r={radiusPx} fill="#22d3ee" fillOpacity=".08" stroke="#67e8f9" strokeWidth="2.5" />
        <line x1={cx} y1={cy} x2={px} y2={py} stroke="#fbbf24" strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r="4.5" fill="#fbbf24" />
        <circle cx={px} cy={py} r="4" fill="#fb923c" />
        <text x={cx + 7} y={cy + 18} fontSize="12" fill="currentColor">{`C(${centerX}, ${centerY})`}</text>
        <text x={px + 6} y={py - 7} fontSize="12" fill="currentColor">P</text>
        <text x={(cx + px) / 2 + 5} y={(cy + py) / 2 - 6} fontSize="12" fill="#fbbf24">{`r = ${radius}`}</text>
      </svg>
      <figcaption className="mt-1 text-center font-body text-xs leading-relaxed text-slate-400">{caption}</figcaption>
    </figure>
  );
}

const CHECK_QUESTIONS = [
  {
    question: "Pusat lingkaran (−2, 3) dan jari-jari 5. Persamaan bentuk pusat-jari-jarinya adalah ...",
    options: [
      "(x − 2)² + (y + 3)² = 25",
      "(x + 2)² + (y − 3)² = 25",
      "(x + 2)² + (y + 3)² = 5",
    ],
    answer: 1,
    explanation: "Tanda di dalam kurung berlawanan dengan koordinat pusat, lalu jari-jari dikuadratkan: 5² = 25.",
  },
  {
    question: "Persamaan x² + y² − 8x + 6y + 9 = 0 mempunyai jari-jari ...",
    options: ["2", "4", "8"],
    answer: 1,
    explanation: "Pusatnya (4, −3), sedangkan r² = 4² + (−3)² − 9 = 16, sehingga r = 4.",
  },
  {
    question: "Apakah x² + y² + 6x − 4y + 15 = 0 mempunyai titik-titik real?",
    options: ["Ya, jari-jarinya 2", "Ya, jari-jarinya √8", "Tidak, karena r² bernilai negatif"],
    answer: 2,
    explanation: "Melengkapi kuadrat menghasilkan (x + 3)² + (y − 2)² = −2. Jumlah kuadrat tidak mungkin bernilai negatif.",
  },
];

function SelfCheck() {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  return (
    <div className="space-y-4">
      {CHECK_QUESTIONS.map((item, questionIndex) => {
        const selected = answers[questionIndex];
        const answered = selected !== undefined;
        const correct = selected === item.answer;
        return (
          <article key={item.question} className="rounded-2xl border border-white/10 bg-[#101b2d]/80 p-4 sm:p-5">
            <h3 className="font-display text-base font-bold text-white">
              <span className="mr-2 text-cyan-200">{questionIndex + 1}.</span>{item.question}
            </h3>
            <div className="mt-3 grid gap-2">
              {item.options.map((option, optionIndex) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected === optionIndex}
                  onClick={() => setAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex }))}
                  className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                    selected === optionIndex
                      ? correct
                        ? "border-emerald-300/50 bg-emerald-400/10 text-emerald-100"
                        : "border-rose-300/50 bg-rose-400/10 text-rose-100"
                      : "border-white/10 bg-white/[.025] text-slate-300 hover:border-cyan-200/30"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {answered && (
              <p className={`mt-3 flex gap-2 text-sm leading-relaxed ${correct ? "text-emerald-200" : "text-amber-100"}`}>
                <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{correct ? "Tepat!" : "Belum tepat."} {item.explanation}</span>
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

const SmaDefinisiBentukUmumPersamaanLingkaranPage = () => (
  <div className="animation-submaterial-route relative min-h-[100dvh] overflow-hidden bg-[#080f1e] text-slate-100">
    <Starfield />
    <PageNavigation prevPath={PAGE_PATH} />

    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-[linear-gradient(125deg,rgba(15,36,63,.96),rgba(16,22,43,.95)_60%,rgba(75,36,43,.76))] px-5 py-7 shadow-2xl shadow-black/25 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-cyan-100/10" />
        <div className="relative max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-200/25 bg-cyan-200/[.08] px-3 py-1.5 font-body text-[10px] font-black uppercase tracking-[.2em] text-cyan-100">Ruang untuk Guru · SMA</span>
            <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[.16em] text-slate-300">Buku Animasi Matematika · Persamaan Lingkaran</span>
          </div>
          <div className="mb-3 flex items-center gap-2 text-amber-200">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <p className="font-body text-xs font-bold uppercase tracking-[.24em]">Yuk, ajak lingkaran berkenalan dengan aljabar!</p>
          </div>
          <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Definisi dan <span className="text-cyan-200">bentuk umum</span> persamaan lingkaran
          </h1>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
            Kita akan melihat lingkaran sebagai kumpulan titik yang jaraknya sama dari satu pusat, menyusun persamaannya, lalu membaca pusat dan jari-jari dari bentuk yang sudah dikembangkan. Siapkan pensil—kita mulai dari ide sederhana!
          </p>
          <div className="mt-6 flex items-start gap-2 text-sm text-amber-100">
            <Target className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Target belajar: memahami definisi, menurunkan persamaan, mengubah bentuk pusat-jari-jari ke bentuk umum, dan menentukan apakah persamaan menghasilkan lingkaran real.</span>
          </div>
        </div>
      </header>

      <div className="grid gap-8 desktop:grid-cols-[minmax(0,1fr)_260px] phone-land:grid-cols-2">
        <div className="min-w-0 space-y-12">
          <section id="gagasan-lingkaran">
            <SectionHeading
              index="1"
              title="Apa yang membuat sebuah lingkaran?"
              description="Bayangkan sebuah titik tetap sebagai pusat. Lingkaran adalah lintasan semua titik pada bidang yang berjarak sama dari pusat itu. Jarak tetap tersebut dinamakan jari-jari."
            />
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_300px]">
              <div className="space-y-4">
                <Equation math="CP = r" label="Jarak dari pusat C ke setiap titik P pada lingkaran" />
                <p className="text-sm leading-relaxed text-slate-300">
                  Pada gambar, <InlineMath math="C(-2,2)" /> menjadi pusat dan panjang <InlineMath math="CP" /> adalah 5 satuan. Titik <InlineMath math="P(1,6)" /> berada pada lingkaran karena jaraknya dari <InlineMath math="C" /> tepat 5 satuan.
                </p>
                <div className="rounded-2xl border border-white/10 bg-[#101b2d]/80 p-4 text-sm leading-relaxed text-slate-300">
                  <p className="font-display font-bold text-cyan-100">Coba hitung jaraknya</p>
                  <BlockMath math="CP=\sqrt{(1-(-2))^2+(6-2)^2}=\sqrt{3^2+4^2}=5" />
                  <p>Jadi, pusat, titik pada lingkaran, dan jari-jari saling terhubung lewat rumus jarak. Dari hubungan inilah persamaan lingkaran dibangun.</p>
                </div>
              </div>
              <CircleDiagram centerX={-2} centerY={2} radius={5} pointX={1} pointY={6} caption="C adalah pusat; CP merupakan jari-jari dan P berada pada lingkaran." />
            </div>
          </section>

          <section id="menurunkan-persamaan">
            <SectionHeading
              index="2"
              title="Dari rumus jarak menjadi persamaan"
              description="Misalkan pusat lingkaran berada di C(a,b), sedangkan P(x,y) adalah sembarang titik pada keliling. Karena jarak CP selalu r, kita tuliskan rumus jarak lalu kuadratkan kedua sisi."
            />
            <div className="space-y-4">
              <Equation math="\sqrt{(x-a)^2+(y-b)^2}=r" label="Jarak titik P(x,y) dari pusat C(a,b)" />
              <div className="grid gap-3 desktop:grid-cols-3 phone-land:grid-cols-2">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                  <h3 className="font-display font-bold text-cyan-100">1 · Tulis selisih koordinat</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Selisih mendatar adalah <InlineMath math="x-a" />, sedangkan selisih tegak adalah <InlineMath math="y-b" />.</p>
                </div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                  <h3 className="font-display font-bold text-violet-100">2 · Gunakan Pythagoras</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Kuadrat kedua selisih dijumlahkan untuk mendapatkan kuadrat jarak dari pusat.</p>
                </div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <h3 className="font-display font-bold text-amber-100">3 · Samakan dengan r²</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Semua titik pada lingkaran berjarak r, sehingga hasil akhirnya sama dengan <InlineMath math="r^2" />.</p>
                </div>
              </div>
              <Equation math="(x-a)^2+(y-b)^2=r^2" label="Persamaan lingkaran berpusat di (a,b) dengan jari-jari r" />
              <Note title="Kenapa kedua ruas dikuadratkan?" tone="amber">
                <span> Karena panjang jarak dan jari-jari tidak negatif. Menguadratkan persamaan jarak menghilangkan akar tanpa mengubah kumpulan titik yang memenuhi persamaan.</span>
              </Note>
            </div>
          </section>

          <section id="membaca-bentuk-pusat">
            <SectionHeading
              index="3"
              title="Membaca persamaan pusat–jari-jari"
              description="Bentuk ini paling mudah dikenali karena pusat dan jari-jarinya langsung terlihat. Hati-hati dengan tanda di dalam kurung: tandanya berlawanan dengan koordinat pusat."
            />
            <div className="space-y-4">
              <Equation math="(x-a)^2+(y-b)^2=r^2" label="Bentuk baku lingkaran" />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#101b2d]/80 p-4">
                  <p className="font-display font-bold text-cyan-100">Pusat</p>
                  <p className="mt-2 text-sm text-slate-300">Koordinatnya <InlineMath math="(a,b)" />.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#101b2d]/80 p-4">
                  <p className="font-display font-bold text-amber-100">Jari-jari</p>
                  <p className="mt-2 text-sm text-slate-300">Panjang positif <InlineMath math="r" />; ruas kanan adalah <InlineMath math="r^2" />.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#101b2d]/80 p-4">
                  <p className="font-display font-bold text-violet-100">Tanda koordinat</p>
                  <p className="mt-2 text-sm text-slate-300"><InlineMath math="(x+2)^2" /> berarti koordinat pusat mendatar <InlineMath math="-2" />.</p>
                </div>
              </div>
              <Example number={1} title="Menulis persamaan dari pusat dan jari-jari">
                <p className="text-sm leading-relaxed text-slate-300">
                  Lingkaran berpusat di <InlineMath math="C(-2,2)" /> dengan jari-jari 5. Masukkan <InlineMath math="a=-2" />, <InlineMath math="b=2" />, dan <InlineMath math="r=5" /> ke bentuk baku.
                </p>
                <Equation math="(x-(-2))^2+(y-2)^2=5^2" />
                <Equation math="(x+2)^2+(y-2)^2=25" label="Persamaan pusat–jari-jari" />
                <CircleDiagram centerX={-2} centerY={2} radius={5} caption="Pusat C(−2, 2) dan jari-jari 5 satuan." />
              </Example>
              <Note title="Lingkaran dengan pusat di titik asal" tone="violet">
                <span> Jika pusatnya <InlineMath math="O(0,0)" />, maka <InlineMath math="a=b=0" />. Persamaan khususnya menjadi <InlineMath math="x^2+y^2=r^2" />. Contohnya, untuk jari-jari 7, persamaannya <InlineMath math="x^2+y^2=49" />.</span>
              </Note>
              <CircleDiagram centerX={0} centerY={0} radius={7} caption="Contoh lingkaran berpusat di O(0, 0) dengan jari-jari 7." />
            </div>
          </section>

          <section id="bentuk-umum">
            <SectionHeading
              index="4"
              title="Membuka kurung: bentuk umum"
              description="Kalau kedua kuadrat dikembangkan dan semua suku dipindahkan ke satu ruas, kita memperoleh bentuk umum. Koefisien x² dan y² harus sama, dan tidak ada suku xy."
            />
            <div className="space-y-4">
              <Equation math="(x-a)^2+(y-b)^2=r^2" label="Mulai dari bentuk pusat–jari-jari" />
              <Equation math="x^2+y^2-2ax-2by+(a^2+b^2-r^2)=0" label="Hasil pengembangan" />
              <Equation math="x^2+y^2+Ax+By+C=0" label="Bentuk umum persamaan lingkaran" />
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                  <h3 className="font-display text-lg font-bold text-cyan-100">Apa hubungan koefisiennya?</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                    <li><InlineMath math="A=-2a" />, jadi <InlineMath math="a=-\frac{A}{2}" />.</li>
                    <li><InlineMath math="B=-2b" />, jadi <InlineMath math="b=-\frac{B}{2}" />.</li>
                    <li><InlineMath math="C=a^2+b^2-r^2" />.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[.045] p-4">
                  <h3 className="font-display text-lg font-bold text-amber-100">Tanda khas lingkaran</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Suku kuadratnya berupa <InlineMath math="x^2+y^2" /> dengan koefisien sama. Bentuk seperti <InlineMath math="x^2+2y^2" /> atau yang memuat <InlineMath math="xy" /> bukan bentuk umum lingkaran biasa.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Jika koefisien x² dan y² sama-sama bukan 1, bagi semua suku dengan koefisien tersebut terlebih dahulu.</p>
                </div>
              </div>
              <Example number={2} title="Mengubah bentuk baku menjadi bentuk umum">
                <p className="text-sm leading-relaxed text-slate-300">
                  Kembangkan persamaan lingkaran <InlineMath math="(x+2)^2+(y-2)^2=25" />.
                </p>
                <Equation math="\begin{aligned}(x+2)^2+(y-2)^2&=25\\x^2+4x+4+y^2-4y+4&=25\\x^2+y^2+4x-4y-17&=0\end{aligned}" />
                <p className="text-sm leading-relaxed text-emerald-100"><Check className="mr-2 inline h-4 w-4" aria-hidden="true" />Bentuk umumnya adalah <InlineMath math="x^2+y^2+4x-4y-17=0" />.</p>
              </Example>
            </div>
          </section>

          <section id="melengkapi-kuadrat">
            <SectionHeading
              index="5"
              title="Membaca pusat dan jari-jari dari bentuk umum"
              description="Untuk membalik bentuk umum ke bentuk baku, kelompokkan suku x dan y, lalu lengkapi masing-masing menjadi kuadrat sempurna. Cara ini bernama melengkapi kuadrat."
            />
            <div className="space-y-4">
              <Equation math="x^2+y^2+Ax+By+C=0" label="Persamaan yang diketahui" />
              <Equation math="\left(x+\frac{A}{2}\right)^2+\left(y+\frac{B}{2}\right)^2=\frac{A^2+B^2-4C}{4}" label="Setelah melengkapi kuadrat" />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[.045] p-4">
                  <h3 className="font-display font-bold text-cyan-100">Pusat lingkaran</h3>
                  <Equation math="C\left(-\frac{A}{2},-\frac{B}{2}\right)" />
                </div>
                <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[.045] p-4">
                  <h3 className="font-display font-bold text-violet-100">Jari-jari lingkaran</h3>
                  <Equation math="r=\frac{\sqrt{A^2+B^2-4C}}{2}" />
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                Rumus cepat tersebut berasal dari <InlineMath math="r^2=\frac{A^2+B^2}{4}-C" />. Tetap periksa nilai di dalam akar: jari-jari lingkaran real tidak boleh berupa akar bilangan negatif.
              </p>
              <Example number={3} title="Melengkapi kuadrat langkah demi langkah">
                <p className="text-sm leading-relaxed text-slate-300">
                  Tentukan pusat dan jari-jari dari <InlineMath math="x^2+y^2-8x+6y+9=0" />.
                </p>
                <Equation math="\begin{aligned}(x^2-8x)+(y^2+6y)&=-9\\(x^2-8x+16)+(y^2+6y+9)&=-9+16+9\\(x-4)^2+(y+3)^2&=16\end{aligned}" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <p className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-sm leading-relaxed text-slate-300">Pusat: <strong className="text-white"><InlineMath math="(4,-3)" /></strong>.</p>
                  <p className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-sm leading-relaxed text-slate-300">Jari-jari: <strong className="text-white"><InlineMath math="r=\sqrt{16}=4" /></strong>.</p>
                </div>
                <CircleDiagram centerX={4} centerY={-3} radius={4} caption="Bentuk baku hasilnya adalah (x − 4)² + (y + 3)² = 16." />
              </Example>
              <Note title="Tambahkan angka yang sama di kedua ruas." tone="amber">
                <span> Untuk mengubah <InlineMath math="x^2+Ax" /> menjadi kuadrat sempurna, tambahkan <InlineMath math="(A/2)^2" />. Untuk <InlineMath math="y^2+By" />, tambahkan <InlineMath math="(B/2)^2" />. Karena persamaan harus tetap seimbang, angka tambahan juga harus dihitung pada ruas lainnya.</span>
              </Note>
            </div>
          </section>

          <section id="syarat-lingkaran">
            <SectionHeading
              index="6"
              title="Apakah persamaannya punya lingkaran real?"
              description="Bentuk aljabar yang mirip lingkaran belum tentu memiliki titik pada bidang real. Nilai yang menentukan adalah kuadrat jari-jari."
            />
            <div className="space-y-4">
              <Equation math="r^2=\frac{A^2+B^2-4C}{4}" label="Periksa nilai r²" />
              <div className="grid gap-3 desktop:grid-cols-3 phone-land:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200/20 bg-emerald-200/[.05] p-4">
                  <h3 className="font-display font-bold text-emerald-100">Jika r² &gt; 0</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Ada lingkaran real dengan jari-jari positif.</p>
                </div>
                <div className="rounded-2xl border border-amber-200/20 bg-amber-200/[.05] p-4">
                  <h3 className="font-display font-bold text-amber-100">Jika r² = 0</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Hanya tersisa satu titik, yaitu pusatnya; ini disebut kasus degenerat, bukan lingkaran berjari-jari positif.</p>
                </div>
                <div className="rounded-2xl border border-rose-200/20 bg-rose-200/[.05] p-4">
                  <h3 className="font-display font-bold text-rose-100">Jika r² &lt; 0</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">Tidak ada titik real yang memenuhi persamaan, sebab kuadrat jarak tidak mungkin negatif.</p>
                </div>
              </div>
              <Example number={4} title="Mendeteksi persamaan tanpa titik real">
                <p className="text-sm leading-relaxed text-slate-300">
                  Periksa apakah <InlineMath math="x^2+y^2+6x-4y+15=0" /> menggambarkan lingkaran real.
                </p>
                <Equation math="\begin{aligned}(x^2+6x)+(y^2-4y)&=-15\\(x+3)^2+(y-2)^2&=-15+9+4\\(x+3)^2+(y-2)^2&=-2\end{aligned}" />
                <p className="text-sm leading-relaxed text-rose-200">
                  Ruas kiri merupakan jumlah dua kuadrat, jadi nilainya paling kecil 0. Ia tidak mungkin sama dengan −2. Maka persamaan tersebut tidak mempunyai lingkaran real.
                </p>
              </Example>
            </div>
          </section>

          <section id="titik-pada-lingkaran">
            <SectionHeading
              index="7"
              title="Menguji apakah sebuah titik berada di lingkaran"
              description="Masukkan koordinat titik ke bentuk jarak dari pusat. Jika jaraknya sama dengan jari-jari, titik itu tepat berada pada keliling; jika tidak, titiknya berada di dalam atau di luar."
            />
            <div className="space-y-4">
              <Example number={5} title="Memeriksa dua titik dengan cepat">
                <p className="text-sm leading-relaxed text-slate-300">
                  Lingkaran berpusat di <InlineMath math="C(-2,2)" /> dan berjari-jari 5. Periksa titik <InlineMath math="P(1,6)" /> dan <InlineMath math="Q(4,2)" />.
                </p>
                <Equation math="\begin{aligned}CP&=\sqrt{(1+2)^2+(6-2)^2}=\sqrt{9+16}=5\\CQ&=\sqrt{(4+2)^2+(2-2)^2}=\sqrt{36}=6\end{aligned}" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <p className="rounded-xl border border-emerald-200/15 bg-emerald-200/[.05] p-3 text-sm leading-relaxed text-emerald-100"><InlineMath math="CP=r" /> sehingga P berada pada keliling.</p>
                  <p className="rounded-xl border border-amber-200/15 bg-amber-200/[.05] p-3 text-sm leading-relaxed text-amber-100"><InlineMath math="CQ>r" /> sehingga Q berada di luar lingkaran.</p>
                </div>
                <CircleDiagram centerX={-2} centerY={2} radius={5} pointX={1} pointY={6} caption="P terletak pada lingkaran; titik lain dapat diuji dengan cara yang sama." />
              </Example>
              <Equation math="(x-a)^2+(y-b)^2=r^2" label="Syarat titik P(x,y) terletak pada keliling" />
            </div>
          </section>

          <section id="latihan-cek-pemahaman">
            <SectionHeading
              index="8"
              title="Cek pemahaman—kamu pasti bisa!"
              description="Pilih jawaban untuk tiap pertanyaan. Kalau belum tepat, baca petunjuknya dan coba lagi. Semangat!"
            />
            <SelfCheck />
          </section>

          <section id="bekal-penting">
            <SectionHeading
              index="9"
              title="Bekal yang perlu dibawa"
              description="Gunakan daftar ini sebagai pemeriksaan akhir saat mengerjakan soal, bukan sebagai pengganti langkah-langkah penjelasan di atas."
            />
            <div className="rounded-3xl border border-cyan-200/15 bg-[#101b2d]/80 p-5 sm:p-6">
              <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Definisi: semua titik pada lingkaran berjarak sama dari pusat.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Bentuk pusat-jari-jari: <InlineMath math="(x-a)^2+(y-b)^2=r^2" />.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Bentuk umum: <InlineMath math="x^2+y^2+Ax+By+C=0" /> dengan koefisien kuadrat sama serta tanpa suku <InlineMath math="xy" />.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Dari bentuk umum, pusatnya <InlineMath math="(-A/2,-B/2)" /> dan <InlineMath math="r^2=(A^2+B^2-4C)/4" />.</li>
                <li><Check className="mr-2 inline h-4 w-4 text-emerald-300" aria-hidden="true" />Periksa <InlineMath math="r^2" /> sebelum menyebutnya lingkaran real.</li>
              </ul>
            </div>
          </section>
        </div>

        <aside className="hidden desktop:block">
          <div className="sticky top-6 rounded-3xl border border-white/10 bg-[#101b2d]/90 p-4 backdrop-blur">
            <p className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-cyan-100">
              <Target className="h-4 w-4" aria-hidden="true" /> Peta belajar
            </p>
            <nav className="space-y-1.5">
              {[
                ["gagasan-lingkaran", "Gagasan lingkaran"],
                ["menurunkan-persamaan", "Menurunkan persamaan"],
                ["membaca-bentuk-pusat", "Pusat dan jari-jari"],
                ["bentuk-umum", "Bentuk umum"],
                ["melengkapi-kuadrat", "Melengkapi kuadrat"],
                ["syarat-lingkaran", "Syarat lingkaran real"],
                ["titik-pada-lingkaran", "Uji titik"],
                ["latihan-cek-pemahaman", "Cek pemahaman"],
              ].map(([id, label], index) => (
                <a key={id} href={`#${id}`} className="flex items-center gap-2 rounded-xl px-2 py-2 text-xs text-slate-300 transition hover:bg-white/[.05] hover:text-cyan-100">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-white/[.06] text-[10px] font-bold text-cyan-100/80">{index + 1}</span>
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-4 rounded-2xl border border-amber-200/15 bg-amber-200/[.05] p-3">
              <p className="flex items-center gap-2 font-display text-sm font-bold text-amber-100"><Check className="h-4 w-4" aria-hidden="true" /> Ingat tanda pusat</p>
              <p className="mt-2 font-body text-xs leading-relaxed text-slate-400">Di dalam kurung, tanda berlawanan: <InlineMath math="(x-4)^2" /> berarti pusat memiliki koordinat mendatar 4.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
);

export default SmaDefinisiBentukUmumPersamaanLingkaranPage;
