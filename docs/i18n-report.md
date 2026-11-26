# Laporan pemeriksaan i18n materi

Dihasilkan oleh `pnpm i18n:check` menggunakan TypeScript compiler API.
Pemeriksaan membaca objek locale statis; spread atau key komputasi yang menghalangi pembacaan ditandai **tidak terbaca**.

## Ringkasan

- File sumber yang dipindai: 176.
- File dengan objek terjemahan per bahasa: 151.
- File dengan cabang `ja`: 172.
- File tanpa terjemahan yang terdeteksi: 0.
- File dengan objek yang tidak terbaca: 0.
- Ekstraksi angka: 2606 mismatch dengan ekstraktor digit lama; 452 mismatch dengan pembanding sebelum diagnosis; 592 setelah perbaikan parser; 389 setelah klasifikasi. 2085 mismatch digit lama tidak lagi terdeteksi; 71 mismatch baru terungkap.
- Selain selisih yang diklasifikasikan, 311 pasangan angka bernilai sama hanya berbeda format. Adaptasi mata uang memakai pasangan Rp/$ dengan nilai sama atau skala nominal 1.000:1; adaptasi-skala memakai faktor pangkat 10 yang konsisten pada seluruh angka di key.
- Label jenjang seperti Kelas 7 / Grade 7 / 中学1年 diabaikan pada perbandingan angka karena penomoran jenjang berbeda menurut bahasa.

### 10 file dengan ketidaksesuaian terbanyak

| File | Total | (a) Key id hilang | (b) Key ekstra | (c) Array | Format saja | Mata uang | Skala | Nama/konteks | Label | Nilai beda | Ambigu pemisah |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 30 | 0 | 0 | 0 | 3 | 0 | 0 | 4 | 0 | 30 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 29 | 0 | 0 | 0 | 25 | 6 | 6 | 0 | 0 | 29 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 27 | 0 | 0 | 0 | 18 | 0 | 0 | 0 | 0 | 27 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 26 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 26 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 12 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 12 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 11 | 0 | 0 | 0 | 26 | 6 | 0 | 0 | 0 | 11 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 11 | 0 | 0 | 0 | 5 | 0 | 0 | 0 | 0 | 11 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx) | 10 | 8 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 2 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 8 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 8 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 8 | 0 | 0 | 0 | 22 | 0 | 0 | 0 | 0 | 8 | 0 |

### Rekonsiliasi sebelum dan sesudah perbaikan parser

| Perbandingan | Mismatch numeric | Hilang | Baru terungkap |
| --- | ---: | ---: | ---: |
| Ekstraktor digit lama → parser saat ini | 2606 → 592 | 2085 | 71 |
| Pembanding sebelum diagnosis → sesudah diagnosis | 452 → 592 | 90 | 230 |

### Jumlah ketidaksesuaian per jenis (seluruh file)

| Jenis / total | Jumlah | Dihitung sebagai mismatch |
| --- | ---: | --- |
| format-saja | 311 | Tidak |
| adaptasi-mata-uang | 166 | Tidak |
| adaptasi-skala | 33 | Tidak |
| adaptasi-nama-konteks | 4 | Tidak |
| label | 0 | Tidak |
| nilai-beda | 389 | Ya |
| ambigu-pemisah | 0 | Ya |
| **Mismatch numeric sebelum pengecualian adaptasi** | **592** | Ya |
| **Mismatch numeric setelah klasifikasi** | **389** | **389** |
| (a) Key ada di id tetapi tidak ada di locale lain | 8 | Ya |
| (b) Key ada di locale lain tetapi tidak ada di id | 1 | Ya |
| (c) Panjang array berbeda | 1 | Ya |
| **Mismatch struktural** | **10** | Ya |
| **Total mismatch terlapor** | **399** | **399** |

Rekonsiliasi: 592 = 166 adaptasi mata uang + 33 adaptasi-skala + 4 adaptasi nama/konteks + 0 label + 389 nilai-beda + 0 ambigu-pemisah. Jumlah kelas tersebut sama dengan total mismatch numerik sebelum klasifikasi. Setelah 203 adaptasi dikecualikan, tersisa 389 mismatch numerik (389 nilai-beda + 0 ambigu-pemisah); 311 pasangan format-saja bernilai sama dan tidak masuk hitungan mismatch. Ditambah 10 mismatch struktural, totalnya 399.

### Uji hipotesis false positive

Jumlah kasus nilai-beda lama yang berubah menjadi sama setelah setiap penyesuaian. Penghitungan tiap baris independen; kelas pemisah tetap ambigu bila teks tidak menentukan tafsirnya.

| Hipotesis | Kasus nilai-beda hilang |
| --- | ---: |
| Tanda minus ASCII/Unicode (`-`, `−`, `–`, `—`) | 29 |
| Penghitung Jepang dan angka kanji | 0 |
| Angka-kata Inggris / nomor langkah | 1 |
| Pemisah ribuan/desimal | 0 |

Pemisah angka ditafsirkan menurut locale yang dinyatakan; format yang tidak sesuai tetap dilaporkan sebagai mismatch, tanpa menebak makna yang dimaksud.

### 10 kasus sisa dengan angka terbesar

Diurutkan menurut nilai absolut maksimum pada himpunan angka hasil parse id dan locale pembanding.

| File | Baris | Key | Bahasa | Nilai id | Nilai en/ja | Maksimum absolut |
| --- | ---: | --- | --- | --- | --- | ---: |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx) | 119 | `tarifTable[].pkp` | ja | [500] | [500000000] | 500000000 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx) | 987 | `compareText` | ja | [100, 23, 3, 4, 5] | [100000000, 23000000, 3000000, 4000000, 5, 5000000] | 100000000 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 115 | `ex8s3b` | en | [12650, 2975, 37633750] | [126, 2975, 374850] | 37633750 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 115 | `ex8s3b` | ja | [12650, 2975, 37633750] | [126, 2975, 374850] | 37633750 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 128 | `ex9ans` | en | [29750000] | [29750] | 29750000 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 128 | `ex9ans` | ja | [29750000] | [29750] | 29750000 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 127 | `ex9katex4` | en | [1190, 25000, 29750000] | [1190, 25, 29750] | 29750000 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 127 | `ex9katex4` | ja | [1190, 25000, 29750000] | [1190, 25, 29750] | 29750000 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx) | 136 | `quiz[].penjelasan` | en | [0.15, 1500000, 2, 5000000] | [0.15, 1500, 2, 5000] | 5000000 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx) | 136 | `quiz[].penjelasan` | ja | [0.15, 1500000, 2, 5000000] | [0.15, 1500, 2, 5000] | 5000000 |


### Sampel acak merata: 30 kasus nilai-beda dari file berbeda

Pemilihan memakai seed tetap untuk hasil yang dapat direproduksi; satu kasus dipilih per file.

| File | Baris | Key | Nilai id lengkap | Nilai en/ja lengkap | Code point angka id | Code point angka en/ja |
| --- | ---: | --- | --- | --- | --- | --- |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx) | 222 | `s4emptyWarnText` | BUKAN himpunan kosong! Ia punya anggota: angka 0. | は空集合ではありません！要素が1つあります：数字の0。 | 0=U+0030, .=U+002E | 1=U+0031, 0=U+0030, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 81 | `q3Answer` | 🔑 Harga 1 kg mangga: $16.80 \| Harga 1 kg jeruk: $10.80 | 🔑 マンゴー1kg：$16.80 \| オレンジ1kg：$10.80 | 1=U+0031, 6=U+0036, .=U+002E, 8=U+0038, 0=U+0030 | 1=U+0031, 6=U+0036, .=U+002E, 8=U+0038, 0=U+0030 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 19 | `secPLDV` | 📘 Sub-Bab 1: PLDV — Satu Persamaan, Dua Variabel | 📘 第1節：一次方程式 — 1本の式、2つの変数 | -=U+002D, 1=U+0031, —=U+2014, ,=U+002C | 1=U+0031, 一=U+4E00, —=U+2014, 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 106 | `conclusionBody2` | . Kunci konversinya: jumlah angka di belakang koma menentukan penyebut (10, 100, 1000). Hafalkan pecahan-desimal umum, dan kamu akan bisa bergerak bebas antara kedua bentuk ini dengan cepat! | です。変換のカギ：小数点以下の桁数が分母を決めます（10、100、1000）。よく使う分数-小数のペアを暗記すれば、2 つの形式を自由に行き来できます！ | .=U+002E, 1=U+0031, 0=U+0030, ,=U+002C, -=U+002D | 。=U+3002, 1=U+0031, 0=U+0030, -=U+002D, 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1032 | `soalD` | Segitiga PQR dengan P(1,1), Q(4,1), R(2,4) ditranslasikan oleh T = \begin{pmatrix}-3\\-2\end{pmatrix}. Tentukan bayangan! | 三角形PQRで P(1,1),\, Q(4,1),\, R(2,4) を移動ベクトル T = \begin{pmatrix}-3\\-2\end{pmatrix} で平行移動した。像を求めなさい！ | 1=U+0031, ,=U+002C, 4=U+0034, 2=U+0032, -=U+002D, 3=U+0033, .=U+002E | 三=U+4E09, 1=U+0031, ,=U+002C, 4=U+0034, 2=U+0032, -=U+002D, 3=U+0033, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 63 | `ex3s1desc` | 7,63\underline{8}524 - Angka 8 adalah desimal ke-3 (yang akan dipertahankan) | 7,63\underline{8}524 — digit 8 is the 3rd decimal (the one to keep) | 7=U+0037, ,=U+002C, 6=U+0036, 3=U+0033, 8=U+0038, 5=U+0035, 2=U+0032, 4=U+0034, -=U+002D | 7=U+0037, ,=U+002C, 6=U+0036, 3=U+0033, 8=U+0038, 5=U+0035, 2=U+0032, 4=U+0034, —=U+2014 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 73 | `k6Soal` | Daerah arsiran berbentuk "tiga busur" dalam persegi panjang 28 cm × 14 cm. Satu setengah lingkaran besar (R = 14 cm) berada di atas, lalu dua setengah lingkaran kecil (r = 7 cm) dipotong dari bawahnya. Hitunglah (a) luas arsiran dan (b) keliling arsiran! | 28 cm × 14 cmの長方形内に「三重弧」の着色域がある。大きな半円（R = 14 cm）が上にあり、小さな半円2つ（r = 7 cm）が下から切り取られる。(a) 面積と(b) 周長を求めなさい！ | 2=U+0032, 8=U+0038, 1=U+0031, 4=U+0034, .=U+002E, ,=U+002C, 7=U+0037 | 2=U+0032, 8=U+0038, 1=U+0031, 4=U+0034, 三=U+4E09, 。=U+3002, 7=U+0037 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx) | 52 | `s3defTxt` | Dua sudut saling berpelurus (supplementary) jika jumlah keduanya tepat 180°. | 2つの角の和がちょうど180°のとき、それらは補角といいます。 | 1=U+0031, 8=U+0038, 0=U+0030, .=U+002E | 2=U+0032, 1=U+0031, 8=U+0038, 0=U+0030, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx) | 23 | `introBody` | Pernahkah kamu memperhatikan label di kemasan makanan? Di sana tertulis "Berat Bersih: 500 g". Itu artinya berat isinya saja — tanpa kemasan. Konsep inilah yang disebut netto. Bersama bruto (berat total) dan tara (berat kemasan), ketiganya membentuk sistem penimbangan yang adil dalam dunia perdagangan. | 食品のパッケージのラベルを見たことがありますか？「内容量：500 g」と書かれています。これは包装を除いた中身だけの重さです。これが純量（ネット）です。総量（グロス：包装を含む全重量）と風袋（包装の重さ）と合わせて、この3つが公正な商取引の計量システムを形成しています。 | 5=U+0035, 0=U+0030, .=U+002E, —=U+2014, ,=U+002C | 5=U+0035, 0=U+0030, 。=U+3002, 3=U+0033 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx) | 97 | `vis_tabel_rows[][]` | Satu titik (sudut ≠ 90°) | 1点（90°以外の角） | 9=U+0039, 0=U+0030 | 1=U+0031, 9=U+0039, 0=U+0030 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx) | 124 | `tipCheck` | Periksa kewajaran jawaban: jika k > 1, bangun kedua lebih besar; jika k < 1, bangun kedua lebih kecil. Pastikan jawaban sesuai dengan gambar soal. | 答えが妥当か確認する。k > 1なら2つ目の図形は大きく、k < 1なら小さい。問題の図と答えが一致するか確かめる。 | 1=U+0031, ,=U+002C, .=U+002E | 。=U+3002, 1=U+0031, 2=U+0032, 一=U+4E00 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 141 | `c2Q` | Seorang pedagang buah membeli durian seharga Rp240.000 per buah. Ia ingin mendapatkan untung 35% dari modal. Berapa harga jual yang harus ia patok? | 果物商人がドリアンを1個$240で仕入れた。元金の35%の利益を得たい。売価はいくらに設定すべきか？ | 2=U+0032, 4=U+0034, 0=U+0030, .=U+002E, 3=U+0033, 5=U+0035 | 1=U+0031, 2=U+0032, 4=U+0034, 0=U+0030, 。=U+3002, 3=U+0033, 5=U+0035 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx) | 36 | `obtuseDesc` | Ada satu sudut lebih dari 90° | 1つの角が90°より大きい | 9=U+0039, 0=U+0030 | 1=U+0031, 9=U+0039, 0=U+0030 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 210 | `s5pascalNote` | Baris ke-n segitiga Pascal = jumlah himpunan bagian dengan k anggota (k = 0,1,...,n). | パスカルの三角形のn行目 = k個の要素を持つ部分集合の数（k = 0,1,...,n）。 | -=U+002D, 0=U+0030, ,=U+002C, 1=U+0031, .=U+002E | 三=U+4E09, 0=U+0030, ,=U+002C, 1=U+0031, .=U+002E, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 20 | `introBody` | Pernahkah kamu memperhatikan susunan kursi di bioskop atau teater? Baris pertama mungkin berisi 10 kursi, baris kedua 13 kursi, baris ketiga 16 kursi, dan seterusnya. Setiap baris bertambah 3 kursi secara konsisten! Inilah contoh nyata dari barisan aritmetika — barisan bilangan dengan beda (selisih) yang sama antar suku berurutan. Dengan rumus barisan aritmetika, pengelola gedung bisa langsung menghitung jumlah kursi di baris manapun tanpa menghitung satu per satu. | 映画館や劇場の座席配置を見たことがありますか？1列目に10席、2列目に13席、3列目に16席と続いていくことがあります。各列が一定の3席ずつ増えています！これが等差数列の実例です — 連続する項の間に同じ差（公差）がある数の列。等差数列の公式を使えば、場内担当者はすべての座席を1つずつ数えることなく、どの列の座席数もすぐに計算できます。 | 1=U+0031, 0=U+0030, ,=U+002C, 3=U+0033, 6=U+0036, .=U+002E, —=U+2014 | 1=U+0031, 0=U+0030, 2=U+0032, 3=U+0033, 6=U+0036, 。=U+3002, 一=U+4E00, —=U+2014 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx) | 33 | `pascal.desc` | Setiap bilangan = jumlah dua bilangan di atasnya. Baris dimulai dan diakhiri angka 1. | 各数 = 上の2つの数の和。各行は1で始まり1で終わる。 | .=U+002E, 1=U+0031 | 2=U+0032, 。=U+3002, 1=U+0031 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx) | 79 | `c3Problem` | Sebuah segitiga sama sisi ABC memiliki sisi 12 cm. Titik D adalah kaki tegak lurus dari A ke BC. Hitung panjang AD, lalu gunakan AD sebagai kaki segitiga 45-45-90 baru. Berapa hipotenusa segitiga baru itu? | 正三角形ABCの辺の長さは12cmです。点DはAからBCへ下ろした垂線の足です。ADの長さを求め、ADを新しい45-45-90三角形の直角辺として使います。新しい三角形の斜辺は何cmですか？ | 1=U+0031, 2=U+0032, .=U+002E, ,=U+002C, 4=U+0034, 5=U+0035, -=U+002D, 9=U+0039, 0=U+0030 | 三=U+4E09, 1=U+0031, 2=U+0032, 。=U+3002, 4=U+0034, 5=U+0035, -=U+002D, 9=U+0039, 0=U+0030 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage.tsx) | 61 | `ex1Header` | ✏️ Contoh 1 — Mudah (Jarak Dua Titik) | ✏️ 例題1 — 基本（2点間の距離） | 1=U+0031, —=U+2014 | 1=U+0031, —=U+2014, 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx) | 122 | `c2Diagrams[].penj` | x→2, y→2, z→2. Semua anggota domain menunjuk ke satu elemen kodomain yang sama (2). Ini disebut fungsi konstan — tetap sah sebagai fungsi karena setiap domain punya tepat satu pasangan ✓ | x→2, y→2, z→2。すべての定義域要素が同じ終域要素（2）を指します。これを定数関数と呼びます — 各定義域要素に正確に1つの対応があるため有効な関数です ✓ | 2=U+0032, ,=U+002C, .=U+002E, —=U+2014 | 2=U+0032, ,=U+002C, 。=U+3002, —=U+2014, 1=U+0031 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx) | 40 | `step4Desc` | Substitusikan nilai yang ditemukan ke ekspresi dari Langkah 1 untuk mendapatkan variabel kedua. Verifikasi ke kedua persamaan! | 求めた値をステップ1の式に代入して2番目の変数を求めます。両方の方程式で確認しましょう！ | 1=U+0031, .=U+002E | 1=U+0031, 2=U+0032, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx) | 106 | `ex2q2` | Jika harga cat dinding Rp 12.000 per cm², berapakah biaya mengecat seluruh permukaan segitiga tersebut? | ペンキの費用が1 cm²あたり12,000円の場合、三角形全体を塗るのにかかる費用はいくらですか？ | 1=U+0031, 2=U+0032, .=U+002E, 0=U+0030, ,=U+002C | 1=U+0031, 2=U+0032, ,=U+002C, 0=U+0030, 三=U+4E09 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 171 | `contoh[].math2` | 102.000 \times 1{,}11 = \text{Rp}113.220 | 102{,}000 \times 1{.}11 = \text{Rp}113{,}220 | 1=U+0031, 0=U+0030, 2=U+0032, .=U+002E, ,=U+002C, 3=U+0033 | 1=U+0031, 0=U+0030, 2=U+0032, ,=U+002C, .=U+002E, 3=U+0033 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx) | 27 | `intro_tip` | Ada tiga kemungkinan posisi garis terhadap lingkaran: tidak berpotongan (0 titik), singgung (1 titik), atau memotong/sekans (2 titik). Yang kita fokuskan adalah yang tengah — | 直線と円の位置関係には3通りあります：交点なし（0点）、接線（1点）、割線（2点）。注目するのは中間の — | 0=U+0030, ,=U+002C, 1=U+0031, 2=U+0032, .=U+002E, —=U+2014 | 3=U+0033, 0=U+0030, 1=U+0031, 2=U+0032, 。=U+3002, —=U+2014 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx) | 13 | `c2_steps[]` | Hitung: f(5) = 3(5) + 7 = 15 + 7 = 22 (ribuan) = Rp 22.000,00 ✓ | Calculate: f(5) = 3(5) + 7 = 15 + 7 = 22 (thousands) = $22 ✓ | 5=U+0035, 3=U+0033, +=U+002B, 7=U+0037, 1=U+0031, 2=U+0032, .=U+002E, 0=U+0030, ,=U+002C | 5=U+0035, 3=U+0033, +=U+002B, 7=U+0037, 1=U+0031, 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx) | 121 | `katexContoh3` | \text{Perubahan per menit} = (-120) \div 8 = -15 \text{ meter} | \text{1分あたりの変化量} = (-120) \div 8 = -15 \text{ m} | -=U+002D, 1=U+0031, 2=U+0032, 0=U+0030, 8=U+0038, 5=U+0035 | 1=U+0031, -=U+002D, 2=U+0032, 0=U+0030, 8=U+0038, 5=U+0035 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx) | 135 | `c3_l1` | Langkah 1 — Substitusi ke Rumus Dua Titik | ステップ1 — 2点公式に代入 | 1=U+0031, —=U+2014 | 1=U+0031, —=U+2014, 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 92 | `q3L2Rel2` | Dari hubungan panjang-lebar: "panjang = 3 lebih dari dua kali lebar" | 縦横の関係：「長さ = 幅の2倍 + 3」 | -=U+002D, 3=U+0033 | 2=U+0032, +=U+002B, 3=U+0033 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx) | 138 | `s4e1q` | S = {1,2,...,10}, A = {bilangan prima}. Tentukan Aᶜ! | S = {1,2,...,10}、A = {素数}。Aᶜ を求めなさい！ | 1=U+0031, ,=U+002C, 2=U+0032, .=U+002E, 0=U+0030 | 1=U+0031, ,=U+002C, 2=U+0032, .=U+002E, 0=U+0030, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPtLSVPage.tsx) | 74 | `c3a` | "Dua kali suatu bilangan dikurangi 3 tidak lebih dari 11" | 「ある数の2倍から3を引いた値が11以下」 | 3=U+0033, 1=U+0031 | 2=U+0032, 3=U+0033, 1=U+0031 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 98 | `ex7Q` | Sebuah toko menjual apel seharga Rp15.500 per kg. Berapakah harga yang harus dibayar jika membeli 2,5 kg apel? | あるお店でリンゴが1 kgあたり$15.50で売られています。2.5 kgのリンゴを買うといくらになりますか？ | 1=U+0031, 5=U+0035, .=U+002E, 0=U+0030, 2=U+0032, ,=U+002C | 1=U+0031, 5=U+0035, .=U+002E, 0=U+0030, 。=U+3002, 2=U+0032 |

Klasifikasi numeric mismatch: token digit yang sama tetapi ditafsirkan berbeda menurut locale menjadi ambigu-pemisah; pasangan yang seluruh nilainya sama atau berubah secara konsisten dengan faktor 10, 100, 1.000, 10.000, atau 1.000.000 menjadi adaptasi-skala; label soal/langkah/figur yang bila dihapus menyamakan angka menjadi label; pasangan Rp/$ dengan rasio nominal 1.000:1 menjadi adaptasi-mata-uang; nama orang lokal/netral yang dikenali atau classifier jumlah Jepang yang tidak dinyatakan di id menjadi adaptasi-nama-konteks. Sisa perbedaan menjadi nilai-beda. Pasangan angka sama yang hanya berbeda separator dicatat sebagai format-saja.

### Seluruh kasus nilai-beda dan ambigu-pemisah

| File | Baris | Key | Bahasa pembanding | Nilai id | Nilai en/ja | Angka id | Angka en/ja |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx) | 23 | `introBody` | ja | Pernahkah kamu memperhatikan label di kemasan makanan? Di sana tertulis "Berat Bersih: 500 g". Itu artinya berat isinya saja — tanpa kemasan. Konsep inilah yang disebut netto. Bersama bruto (berat total) dan tara (berat kemasan), ketiganya membentuk sistem penimbangan yang adil dalam dunia perdagangan. | 食品のパッケージのラベルを見たことがありますか？「内容量：500 g」と書かれています。これは包装を除いた中身だけの重さです。これが純量（ネット）です。総量（グロス：包装を含む全重量）と風袋（包装の重さ）と合わせて、この3つが公正な商取引の計量システムを形成しています。 | [500] | [3, 500] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx) | 33 | `analogiBody` | ja | Bayangkan kamu meminjam uang dari teman sebesar Rp500.000 dengan kesepakatan bayar bunga 10% setiap bulan. Bulan pertama bunganya Rp50.000. Bulan kedua? Tetap Rp50.000 — karena dihitung dari modal awal, bukan dari total yang sudah menumpuk. Itulah bunga tunggal. | 友達から$500を借りて、毎月10%の利息を払う約束をしたとします。1ヶ月目の利息は$50。2ヶ月目は？やはり$50 — 元金から計算されるため、累積した合計からではありません。これが単利です。 | [10, 50000, 500000] | [1, 10, 2, 50, 500] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx) | 56 | `rumus[].contoh` | en | Harga awal Rp400.000, harga bayar Rp300.000: % diskon = (100.000 ÷ 400.000) × 100% = 25% | Original $400, paid $300: % discount = (100 ÷ 400) × 100% = 25% | [100, 100000, 25, 300000, 400000] | [100, 25, 300, 400] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx) | 56 | `rumus[].contoh` | ja | Harga awal Rp400.000, harga bayar Rp300.000: % diskon = (100.000 ÷ 400.000) × 100% = 25% | 元の価格$400、支払額$300：割引率 = (100 ÷ 400) × 100% = 25% | [100, 100000, 25, 300000, 400000] | [100, 25, 300, 400] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 136 | `c1Q` | en | Seorang pedagang membeli 1 karung beras seharga Rp180.000 lalu menjualnya seharga Rp225.000. Hitunglah besar untung dan persentase keuntungannya! | A merchant buys a sack of rice for $180 and sells it for $225. Calculate the profit and profit percentage! | [1, 180000, 225000] | [180, 225] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 141 | `c2Q` | ja | Seorang pedagang buah membeli durian seharga Rp240.000 per buah. Ia ingin mendapatkan untung 35% dari modal. Berapa harga jual yang harus ia patok? | 果物商人がドリアンを1個$240で仕入れた。元金の35%の利益を得たい。売価はいくらに設定すべきか？ | [240000, 35] | [1, 240, 35] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 149 | `c4Q` | ja | Seorang pedagang membeli 10 buah mangga seharga Rp50.000. Ia menjual 7 buah seharga Rp6.000 per buah dan sisanya busuk. Apakah pedagang untung, rugi, atau impas? | 商人がマンゴーを10個$50で買った。7個を1個$6で売り、残りは腐った。商人は利益・損失・損益分岐のどれか？ | [10, 50000, 6000, 7] | [1, 10, 50, 6, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 32 | `secIntroBody` | ja | Bayangkan kamu membeli sepasang sepatu seharga Rp150.000, lalu menjualnya ke temanmu Rp180.000. Apakah kamu untung atau rugi? Dari warung kelontong, toko online, hingga perusahaan besar — semua transaksi jual beli selalu berpusat pada dua angka kunci: | 靴を$150で買い、友達に$180で売ったとします。利益が出たでしょうか、損失でしょうか？小さな商店から大企業まで、あらゆる売買取引は常に2つの重要な数字を中心に回っています： | [150000, 180000] | [150, 180, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx) | 65 | `contoh[].maths[]` | en | \%\text{PPh} = \frac{3.250.000}{5.000.000} \times 100\% = 65\% | \%\text{Tax} = \frac{3{,}250{,}000}{5{,}000{,}000} \times 100\% = 65\% | [100, 3250000, 5000000, 65] | [0, 100, 250, 3, 5, 65] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx) | 65 | `contoh[].maths[]` | ja | \%\text{PPh} = \frac{3.250.000}{5.000.000} \times 100\% = 65\% | \text{税率} = \frac{3{,}250{,}000}{5{,}000{,}000} \times 100\% = 65\% | [100, 3250000, 5000000, 65] | [0, 100, 250, 3, 5, 65] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx) | 119 | `tarifTable[].pkp` | ja | di atas Rp500 jt | 5億ルピア超 | [500] | [500000000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 171 | `contoh[].math2` | en | 102.000 \times 1{,}11 = \text{Rp}113.220 | 102{,}000 \times 1{.}11 = \text{Rp}113{,}220 | [1.11, 102000, 220] | [1, 102000, 11, 220] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 55 | `contoh[].maths[]` | en | \%\text{PPN} = \frac{48.000}{400.000} \times 100\% = 12\% | \%\text{VAT} = \frac{48{,}000}{400{,}000} \times 100\% = 12\% | [100, 12, 400000, 48000] | [0, 100, 12, 400, 48] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 159 | `contoh[].noteKatex` | en | 120.000 \times 1{,}11 = \text{Rp}133.200 | 120{,}000 \times 1{.}11 = \text{Rp}133{,}200 | [1.11, 120000, 200] | [1, 11, 120000, 200] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 169 | `contoh[].math1` | ja | 120.000 \times (100\% - 15\%) = 120.000 \times 85\% = \text{Rp}102.000 | 120{,}000 \times (100\% - 15\%) = 120{,}000 \times 85\% = 102{,}000 | [0, 100, 120000, 15, 85] | [100, 102000, 120000, 15, 85] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 171 | `contoh[].math2` | ja | 102.000 \times 1{,}11 = \text{Rp}113.220 | 102{,}000 \times 1{.}11 = 113{,}220 | [1.11, 102000, 220] | [1, 102000, 11, 113220] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 55 | `contoh[].maths[]` | ja | \%\text{PPN} = \frac{48.000}{400.000} \times 100\% = 12\% | \text{税率} = \frac{48{,}000}{400{,}000} \times 100\% = 12\% | [100, 12, 400000, 48000] | [0, 100, 12, 400, 48] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 159 | `contoh[].noteKatex` | ja | 120.000 \times 1{,}11 = \text{Rp}133.200 | 120{,}000 \times 1{.}11 = 133{,}200 | [1.11, 120000, 200] | [1, 11, 120000, 133200] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx) | 2404 | `$value[].answer` | en |  Langkah 1 — Cari jari-jari dari keliling: K = 2\pi r \Rightarrow 44 = 2 \times \frac{22}{7} \times r r = \frac{44 \times 7}{2 \times 22} = \frac{308}{44} = 7 \text{ cm} Langkah 2 — Cari tinggi: t = \sqrt{s^2 - r^2} = \sqrt{25^2 - 7^2} = \sqrt{625 - 49} = \sqrt{576} = 24 \text{ cm} Langkah 3 — Volume topi: V = \frac{1}{3}\pi r^2 t = \frac{1}{3} \times \frac{22}{7} \times 7^2 \times 24 = \frac{1}{3} \times \frac{22}{7} \times 49 \times 24 = \frac{1}{3} \times 22 \times 7 \times 24 = \frac{3.696}{3} = 1.232 \text{ cm}^3 ✅ Jawaban: • Jari-jari = 7 cm • Tinggi topi = 24 cm • Volume = 1.232 cm³  |  Step 1 — Find the radius from the circumference: K = 2\pi r \Rightarrow 44 = 2 \times \frac{22}{7} \times r r = \frac{44 \times 7}{2 \times 22} = \frac{308}{44} = 7 \text{ cm} Step 2 — Find the height: t = \sqrt{s^2 - r^2} = \sqrt{25^2 - 7^2} = \sqrt{625 - 49} = \sqrt{576} = 24 \text{ cm} Step 3 — Volume of the hat: V = \frac{1}{3}\pi r^2 t = \frac{1}{3} \times \frac{22}{7} \times 7^2 \times 24 = \frac{1}{3} \times \frac{22}{7} \times 49 \times 24 = \frac{1}{3} \times 22 \times 7 \times 24 = \frac{3,696}{3} = 1,232 \text{ cm}^3 ✅ Answer: • Radius = 7 cm • Height of the hat = 24 cm • Volume = 1,232 cm³  | [1, 1232, 2, 22, 24, 25, 3, 308, 3696, 44, 49, 576, 625, 7] | [1, 1232, 2, 22, 24, 25, 3, 308, 44, 49, 576, 625, 696, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx) | 2404 | `$value[].answer` | ja |  Langkah 1 — Cari jari-jari dari keliling: K = 2\pi r \Rightarrow 44 = 2 \times \frac{22}{7} \times r r = \frac{44 \times 7}{2 \times 22} = \frac{308}{44} = 7 \text{ cm} Langkah 2 — Cari tinggi: t = \sqrt{s^2 - r^2} = \sqrt{25^2 - 7^2} = \sqrt{625 - 49} = \sqrt{576} = 24 \text{ cm} Langkah 3 — Volume topi: V = \frac{1}{3}\pi r^2 t = \frac{1}{3} \times \frac{22}{7} \times 7^2 \times 24 = \frac{1}{3} \times \frac{22}{7} \times 49 \times 24 = \frac{1}{3} \times 22 \times 7 \times 24 = \frac{3.696}{3} = 1.232 \text{ cm}^3 ✅ Jawaban: • Jari-jari = 7 cm • Tinggi topi = 24 cm • Volume = 1.232 cm³  |  ステップ1 — 周から半径を求める： K = 2\pi r \Rightarrow 44 = 2 \times \frac{22}{7} \times r r = \frac{44 \times 7}{2 \times 22} = \frac{308}{44} = 7 \text{ cm} ステップ2 — 高さを求める： t = \sqrt{s^2 - r^2} = \sqrt{25^2 - 7^2} = \sqrt{625 - 49} = \sqrt{576} = 24 \text{ cm} ステップ3 — ハットの体積： V = \frac{1}{3}\pi r^2 t = \frac{1}{3} \times \frac{22}{7} \times 7^2 \times 24 = \frac{1}{3} \times \frac{22}{7} \times 49 \times 24 = \frac{1}{3} \times 22 \times 7 \times 24 = \frac{3,696}{3} = 1,232 \text{ cm}^3 ✅ 解答： • 半径 = 7 cm • ハットの高さ = 24 cm • 体積 = 1,232 cm³  | [1, 1232, 2, 22, 24, 25, 3, 308, 3696, 44, 49, 576, 625, 7] | [1, 1232, 2, 22, 24, 25, 3, 308, 44, 49, 576, 625, 696, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx) | 2887 | `$value[].answer` | en |  Langkah 1 — Jari-jari & tinggi kerucut penuh: r_1 = \frac{28}{2} = 14 \text{ cm}, \quad t_1 = 30 \text{ cm} Langkah 2 — Jari-jari kerucut pasir (sebangun): Pasir setinggi 20 cm dari puncak membentuk kerucut kecil sebangun: \frac{r_2}{r_1} = \frac{t_2}{t_1} = \frac{20}{30} = \frac{2}{3} r_2 = 14 \times \frac{2}{3} = \frac{28}{3} \text{ cm} Langkah 3 — Volume pasir: V_2 = \frac{1}{3}\pi r_2^2 \times t_2 = \frac{1}{3} \times \frac{22}{7} \times \left(\frac{28}{3}\right)^2 \times 20 = \frac{1}{3} \times \frac{22}{7} \times \frac{784}{9} \times 20 = \frac{22 \times 784 \times 20}{3 \times 7 \times 9} = \frac{344.960}{189} \approx 1.825{,}7 \text{ cm}^3 ✅ Jawaban: • Jari-jari pasir = 28/3 ≈ 9,33 cm • Volume pasir ≈ 1.825,7 cm³ 💡 Kunci: gunakan sifat kesebangunan kerucut!  |  Step 1 — Radius and height of the full cone: r_1 = \frac{28}{2} = 14 \text{ cm}, \quad t_1 = 30 \text{ cm} Step 2 — Radius of the sand cone (similar triangles): Sand at a height of 20 cm from the apex forms a similar smaller cone: \frac{r_2}{r_1} = \frac{t_2}{t_1} = \frac{20}{30} = \frac{2}{3} r_2 = 14 \times \frac{2}{3} = \frac{28}{3} \text{ cm} Step 3 — Volume of the sand: V_2 = \frac{1}{3}\pi r_2^2 \times t_2 = \frac{1}{3} \times \frac{22}{7} \times \left(\frac{28}{3}\right)^2 \times 20 = \frac{1}{3} \times \frac{22}{7} \times \frac{784}{9} \times 20 = \frac{22 \times 784 \times 20}{3 \times 7 \times 9} = \frac{344{,}960}{189} \approx 1{,}825.7 \text{ cm}^3 ✅ Answer: • Sand cone radius = 28/3 ≈ 9.33 cm • Volume of sand ≈ 1,825.7 cm³ 💡 Key: use the similarity property of cones!  | [1, 14, 1825.7, 189, 2, 20, 22, 28, 3, 30, 344960, 7, 784, 9, 9.33] | [1, 14, 1825.7, 189, 2, 20, 22, 28, 3, 30, 344, 7, 784, 9, 9.33, 960] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx) | 2887 | `$value[].answer` | ja |  Langkah 1 — Jari-jari & tinggi kerucut penuh: r_1 = \frac{28}{2} = 14 \text{ cm}, \quad t_1 = 30 \text{ cm} Langkah 2 — Jari-jari kerucut pasir (sebangun): Pasir setinggi 20 cm dari puncak membentuk kerucut kecil sebangun: \frac{r_2}{r_1} = \frac{t_2}{t_1} = \frac{20}{30} = \frac{2}{3} r_2 = 14 \times \frac{2}{3} = \frac{28}{3} \text{ cm} Langkah 3 — Volume pasir: V_2 = \frac{1}{3}\pi r_2^2 \times t_2 = \frac{1}{3} \times \frac{22}{7} \times \left(\frac{28}{3}\right)^2 \times 20 = \frac{1}{3} \times \frac{22}{7} \times \frac{784}{9} \times 20 = \frac{22 \times 784 \times 20}{3 \times 7 \times 9} = \frac{344.960}{189} \approx 1.825{,}7 \text{ cm}^3 ✅ Jawaban: • Jari-jari pasir = 28/3 ≈ 9,33 cm • Volume pasir ≈ 1.825,7 cm³ 💡 Kunci: gunakan sifat kesebangunan kerucut!  |  ステップ1 — 元の円錐（全体）の半径と高さ： r_1 = \frac{28}{2} = 14 \text{ cm}, \quad t_1 = 30 \text{ cm} ステップ2 — 砂の円錐の半径（相似）： 頂点から20cmの高さの砂は、相似な小さい円錐を形成します： \frac{r_2}{r_1} = \frac{t_2}{t_1} = \frac{20}{30} = \frac{2}{3} r_2 = 14 \times \frac{2}{3} = \frac{28}{3} \text{ cm} ステップ3 — 砂の体積： V_2 = \frac{1}{3}\pi r_2^2 \times t_2 = \frac{1}{3} \times \frac{22}{7} \times \left(\frac{28}{3}\right)^2 \times 20 = \frac{1}{3} \times \frac{22}{7} \times \frac{784}{9} \times 20 = \frac{22 \times 784 \times 20}{3 \times 7 \times 9} = \frac{344{,}960}{189} \approx 1{,}825.7 \text{ cm}^3 ✅ 解答： • 砂の円錐の半径 = 28/3 ≈ 9.33 cm • 砂の体積 ≈ 1,825.7 cm³ 💡 ポイント：円錐の相似の性質を使う！  | [1, 14, 1825.7, 189, 2, 20, 22, 28, 3, 30, 344960, 7, 784, 9, 9.33] | [1, 14, 1825.7, 189, 2, 20, 22, 28, 3, 30, 344, 7, 784, 9, 9.33, 960] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx) | 237 | `intro` | ja |  Apa yang terjadi jika jari-jari sebuah bola diperbesar 3 kali? Apakah volumenya juga 3 kali? Tidak! Di sini kamu akan belajar bagaimana perubahan satu unsur bangun ruang sisi lengkung memengaruhi luas permukaan dan volume-nya secara dramatis.  |  球の半径を3倍にしたとき、体積も3倍になるでしょうか？ いいえ！ここでは、曲面体の 1つの寸法を変えることで、 表面積と体積が どのように劇的に変化するかを学びます。  | [3] | [1, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx) | 160 | `konsep3_def_zero` | ja | Bilangan apa pun (kecuali nol) yang dipangkatkan nol hasilnya adalah 1: | ゼロでない数を0乗すると常に1になる： | [1] | [0, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx) | 162 | `konsep3_proof_note` | ja | Setiap turun satu pangkat, nilainya dibagi 2 → maka | 1段下がるごとに2で割る → よって | [2] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx) | 100 | `k6_seq_note` | ja | Setiap turun satu pangkat, nilainya dibagi 2 → maka | 1段下がるごとに2で割る → よって | [2] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 168 | `gcdStoryS2a` | ja | Faktor 2: ada di ketiganya, pangkat terendah = 2 | 因数2: 3つすべてに含まれる、最小の指数 = 2 | [2] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 169 | `gcdStoryS2b` | ja | Faktor 7: ada di ketiganya, pangkat terendah = 1 | 因数7: 3つすべてに含まれる、最小の指数 = 1 | [1, 7] | [1, 3, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 156 | `lcmStoryAnsDate` | ja | 21 Februari | 2月21日 | [21] | [2, 21] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 146 | `lcmStoryQ4` | ja | . Jika pada tanggal 28 Januari mereka berkunjung bersama-sama, kapan mereka akan bertemu lagi di perpustakaan? | に図書館を訪れる。1月28日に3人が一緒に訪れたとすると、次に図書館で会うのはいつか？ | [28] | [1, 28, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 152 | `lcmStoryS3a` | ja | 28 Januari + 24 hari | 1月28日 + 24日 | [24, 28] | [1, 24, 28] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 153 | `lcmStoryS3b` | ja | Januari memiliki 31 hari, sisa: 31 - 28 = 3 hari | 1月は31日まで、残り: 31 - 28 = 3日 | [28, 3, 31] | [1, 28, 3, 31] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 154 | `lcmStoryS3c` | ja | 24 - 3 = 21 hari di bulan Februari | 24 - 3 = 2月の21日 | [21, 24, 3] | [2, 21, 24, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx) | 95 | `bonusStory` | ja | Pak Budi seorang pedagang buah. Pada pagi hari, ia memiliki stok 50 kg jeruk. Siang hari terjual 28 kg, lalu sore hari datang kiriman 3 karung yang masing-masing berisi 15 kg. Malam hari, ada 12 kg jeruk yang busuk dan harus dibuang. Berapa kg stok jeruk Pak Budi sekarang? | ブディさんは果物屋です。朝、オレンジが50kg在庫にあります。昼間に28kg売れ、夕方に各15kgの袋が3袋届きました。夜に12kgのオレンジが腐って廃棄されました。今、ブディさんの在庫は何kgですか？ | [12, 15, 28, 3, 50] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx) | 114 | `contoh3Story` | ja | Sebuah kapal selam menyelam dari permukaan laut hingga kedalaman 120 meter di bawah permukaan laut dalam waktu 8 menit dengan kecepatan konstan. Berapa meter perubahan kedalaman kapal selam setiap menitnya? | 潜水艦が海面から8分間で一定の速さで海面下120mの深さまで潜りました。潜水艦の深さは毎分何メートル変化しましたか？ | [120, 8] | [8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx) | 121 | `katexContoh3` | ja | \text{Perubahan per menit} = (-120) \div 8 = -15 \text{ meter} | \text{1分あたりの変化量} = (-120) \div 8 = -15 \text{ m} | [-120, -15, 8] | [-120, -15, 1, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx) | 1108 | `cara1Step2` | ja | ② Bergerak sesuai bilangan pertama | ② 1つ目の数に従って移動 | [2] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx) | 1109 | `cara1Step3` | ja | ③ Lanjut sesuai bilangan kedua | ③ 2つ目の数に従って移動 | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 396 | `posNegG1` | ja | (satu buah -3) | （-3 が 1 つ） | [-3] | [-3, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 397 | `posNegG2` | ja | (dua buah -3) | （-3 が 2 つ） | [-3] | [-3, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 398 | `posNegG3` | ja | (tiga buah -3) | （-3 が 3 つ） | [-3] | [-3, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 399 | `posNegG4` | ja | (empat buah -3) | （-3 が 4 つ） | [-3] | [-3, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 383 | `posPosG1` | ja | (satu buah 3) | （3 が 1 つ） | [3] | [1, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 384 | `posPosG2` | ja | (dua buah 3) | （3 が 2 つ） | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 386 | `posPosG4` | ja | (empat buah 3) | （3 が 4 つ） | [3] | [3, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx) | 21 | `imgCaption` | ja | Kelima pizza di atas memiliki ukuran yang sama dan masing-masing menunjukkan bagian yang diarsir (pepperoni). Walaupun penulisannya berbeda (\frac{1}{2}, \frac{2}{4}, \frac{3}{6}, \frac{4}{8}, \frac{6}{12}), bagian pizza yang diambil tetap sama besar — inilah yang disebut Pecahan Senilai! | 上の 5 枚のピザはすべて同じ大きさで、それぞれ塗られた部分（ペパロニ）を示しています。表記は異なっても（\frac{1}{2}, \frac{2}{4}, \frac{3}{6}, \frac{4}{8}, \frac{6}{12}）、取った量はまったく同じです — これが等価分数です！ | [1, 12, 2, 3, 4, 6, 8] | [1, 12, 2, 3, 4, 5, 6, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 86 | `sec4TipBody` | en | Jika semua angka setelah koma berulang, penyebut awalnya terdiri dari angka 9. Jika ada angka yang tidak berulang di depan, tambahkan angka 0 pada penyebut untuk setiap angka tersebut. | If all digits after the decimal point repeat, the initial denominator is made of 9s. If non-repeating digits come first, add one 0 to the denominator for each non-repeating digit. | [0, 9] | [0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 106 | `conclusionBody2` | ja | . Kunci konversinya: jumlah angka di belakang koma menentukan penyebut (10, 100, 1000). Hafalkan pecahan-desimal umum, dan kamu akan bisa bergerak bebas antara kedua bentuk ini dengan cepat! | です。変換のカギ：小数点以下の桁数が分母を決めます（10、100、1000）。よく使う分数-小数のペアを暗記すれば、2 つの形式を自由に行き来できます！ | [10, 100, 1000] | [10, 100, 1000, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 66 | `sec4SummaryBody` | ja | Desimal berulang adalah desimal yang memiliki satu angka atau lebih yang terus berulang tanpa berhenti. Gunakan garis di atas angka yang berulang, misalnya 0,3̅ = 0,3333... | 循環小数とは、1つまたは複数の数字が無限に繰り返される小数です。繰り返す数字の上に線を付けます。例：0.3̅ = 0.3333... | [0.3, 0.3333] | [0.3, 0.3333, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 37 | `ex1Q` | en | Hitunglah hasil pembagian 234,5 \div 10 | Calculate 234,5 \div 10 | [10, 234.5] | [10, 234, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 40 | `ex2Q` | en | Hitunglah hasil pembagian 3456,78 \div 1000 | Calculate 3456,78 \div 1000 | [1000, 3456.78] | [1000, 3456, 78] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 72 | `ex6Q` | en | Hitunglah hasil pembagian 0,4563 \div 0,0015 | Calculate 0,4563 \div 0,0015 | [0.0015, 0.4563] | [0, 15, 4563] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 37 | `ex1Q` | ja | Hitunglah hasil pembagian 234,5 \div 10 | 計算せよ 234,5 \div 10 | [10, 234.5] | [10, 234, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 40 | `ex2Q` | ja | Hitunglah hasil pembagian 3456,78 \div 1000 | 計算せよ 3456,78 \div 1000 | [1000, 3456.78] | [1000, 3456, 78] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 46 | `ex3s2desc` | ja | Kita perlu menambah 1 angka nol di depan: 03456,78 | 前に0を1つ追加する必要があります：03456.78 | [1, 3456.78] | [0, 1, 3456.78] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 72 | `ex6Q` | ja | Hitunglah hasil pembagian 0,4563 \div 0,0015 | 計算せよ 0,4563 \div 0,0015 | [0.0015, 0.4563] | [0, 15, 4563] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 91 | `ex7Q` | ja | Andi membeli 2,5 kg gula dengan harga Rp37.500. Berapakah harga gula per kilogram? | Andiは砂糖2.5 kgを$37.50で買いました。砂糖1 kgあたりの価格はいくらですか？ | [2.5, 37500] | [1, 2.5, 37.5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 97 | `ex7ans` | ja | Harga gula per kilogram adalah Rp15.000 | 砂糖1 kgの価格は$15.00です。 | [15000] | [1, 15] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 99 | `ex8Q` | ja | Sebuah mobil menempuh jarak 187,5 km dengan menghabiskan 12,5 liter bensin. Berapa kilometer yang dapat ditempuh mobil tersebut untuk setiap liter bensin? | 車が12.5リットルのガソリンで187.5 kmを走りました。1リットルあたり何km走れますか？ | [12.5, 187.5] | [1, 12.5, 187.5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 106 | `ex8ans` | ja | Mobil dapat menempuh 15 km per liter bensin | 車は1リットルで15 km走れます。 | [15] | [1, 15] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 53 | `ex2Q` | en | Bulatkan 5,70642 sampai dua desimal | Round 5,70642 to two decimal places | [5.70642] | [5, 70642] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 55 | `ex2s1desc` | en | 5,7\underline{0}642 - Angka 0 adalah desimal ke-2 (yang akan dipertahankan) | 5,7\underline{0}642 — digit 0 is the 2nd decimal (the one to keep) | [0, 2, 5.70642] | [0, 2, 5, 70642] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 61 | `ex3Q` | en | Bulatkan 7,638524 sampai tiga desimal | Round 7,638524 to three decimal places | [7.638524] | [638524, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 63 | `ex3s1desc` | en | 7,63\underline{8}524 - Angka 8 adalah desimal ke-3 (yang akan dipertahankan) | 7,63\underline{8}524 — digit 8 is the 3rd decimal (the one to keep) | [3, 7.638524, 8] | [3, 638524, 7, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 84 | `ex4Q` | en | Bulatkan 111,48 ke bilangan satuan terdekat | Round 111,48 to the nearest whole number | [111.48] | [111, 48] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 86 | `ex4s1desc` | en | 11\underline{1},48 - Satuan = 1, Persepuluhan = 4 | 11\underline{1},48 — ones digit = 1, tenths digit = 4 | [1, 111.48, 4] | [1, 111, 4, 48] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 92 | `ex5Q` | en | Bulatkan 613,54 ke bilangan satuan terdekat | Round 613,54 to the nearest whole number | [613.54] | [54, 613] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 94 | `ex5s1desc` | en | 61\underline{3},54 - Satuan = 3, Persepuluhan = 5 | 61\underline{3},54 — ones digit = 3, tenths digit = 5 | [3, 5, 613.54] | [3, 5, 54, 613] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 125 | `ex7Q` | en | Suhu ruangan tercatat 25,48°C. Bulatkan suhu tersebut ke satu desimal untuk laporan harian! | The room temperature is recorded as 25,48°C. Round it to one decimal place for the daily report. | [25.48] | [25, 48] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 132 | `ex7ans` | en | Suhu ruangan = 25,5°C | Room temperature = 25,5°C | [25.5] | [25, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 127 | `ex7s1desc` | en | 25,\underline{4}8°C - Angka 4 adalah desimal ke-1 | 25,\underline{4}8°C — digit 4 is the 1st decimal | [1, 25.48, 4] | [1, 25, 4, 48] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 141 | `ex8ans` | en | Jarak yang dicatat = 10,47 km | Recorded distance = 10,47 km | [10.47] | [10, 47] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 45 | `ex1Q` | ja | Bulatkan 4,638 sampai satu desimal | 4.638 を小数第1位まで四捨五入せよ | [4.638] | [1, 4.638] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 53 | `ex2Q` | ja | Bulatkan 5,70642 sampai dua desimal | 5,70642 を小数第2位まで四捨五入せよ | [5.70642] | [2, 5, 70642] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 55 | `ex2s1desc` | ja | 5,7\underline{0}642 - Angka 0 adalah desimal ke-2 (yang akan dipertahankan) | 5,7\underline{0}642 — 0が小数2桁目（保持する桁） | [0, 2, 5.70642] | [0, 2, 5, 70642] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 61 | `ex3Q` | ja | Bulatkan 7,638524 sampai tiga desimal | 7,638524 を小数第3位まで四捨五入せよ | [7.638524] | [3, 638524, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 63 | `ex3s1desc` | ja | 7,63\underline{8}524 - Angka 8 adalah desimal ke-3 (yang akan dipertahankan) | 7,63\underline{8}524 — 8が小数3桁目（保持する桁） | [3, 7.638524, 8] | [3, 638524, 7, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 84 | `ex4Q` | ja | Bulatkan 111,48 ke bilangan satuan terdekat | 111,48 を最も近い整数に四捨五入せよ | [111.48] | [111, 48] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 86 | `ex4s1desc` | ja | 11\underline{1},48 - Satuan = 1, Persepuluhan = 4 | 11\underline{1},48 — 一の位 = 1、十分の一の位 = 4 | [1, 111.48, 4] | [1, 111, 4, 48] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 92 | `ex5Q` | ja | Bulatkan 613,54 ke bilangan satuan terdekat | 613,54 を最も近い整数に四捨五入せよ | [613.54] | [54, 613] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 94 | `ex5s1desc` | ja | 61\underline{3},54 - Satuan = 3, Persepuluhan = 5 | 61\underline{3},54 — 一の位 = 3、十分の一の位 = 5 | [3, 5, 613.54] | [3, 5, 54, 613] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 125 | `ex7Q` | ja | Suhu ruangan tercatat 25,48°C. Bulatkan suhu tersebut ke satu desimal untuk laporan harian! | 室温が 25,48°C と記録されました。日常報告のために小数第1位に四捨五入せよ。 | [25.48] | [1, 25, 48] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 132 | `ex7ans` | ja | Suhu ruangan = 25,5°C | 室温 = 25,5°C | [25.5] | [25, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 127 | `ex7s1desc` | ja | 25,\underline{4}8°C - Angka 4 adalah desimal ke-1 | 25,\underline{4}8°C — 4が小数1桁目 | [1, 25.48, 4] | [1, 25, 4, 48] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 134 | `ex8Q` | ja | Seorang atlet berlari sejauh 10,473 km dalam latihan maraton. Untuk catatan pribadi, ia ingin membulatkan jarak tersebut ke dua desimal. Berapa jarak yang dicatat? | あるアスリートがマラソントレーニングで 10.473 km走りました。個人記録として小数第2位に四捨五入した距離を記録したい。記録される距離は？ | [10.473] | [10.473, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 141 | `ex8ans` | ja | Jarak yang dicatat = 10,47 km | 記録される距離 = 10,47 km | [10.47] | [10, 47] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 143 | `ex9Q` | ja | Hasil pengukuran massa suatu benda di laboratorium adalah 2,99567 gram. Untuk laporan ilmiah, massa harus dibulatkan ke tiga desimal. Berapa nilai yang harus ditulis dalam laporan? | 実験室で測定した物体の質量は 2.99567 グラムです。科学レポートのために小数第3位に四捨五入する必要があります。レポートに書く値は？ | [2.99567] | [2.99567, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 47 | `s1e1Q` | en | Tentukan hasil penjumlahan 14{,}7 + 8{,}39 | Find the sum of 14{,}7 + 8{,}39 | [14.7, 8.39] | [14, 39, 7, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 51 | `s1e1ans` | en | ∴ Jadi, hasil penjumlahannya adalah 23{,}09 | ∴ Therefore, the sum is 23{,}09 | [23.09] | [23, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 48 | `s1e1s1` | en | Langkah 1: Samakan digit desimal — 14{,}7 menjadi 14{,}70 (tambah 1 nol) | Step 1: Equalize decimal digits — 14{,}7 becomes 14{,}70 (add 1 zero) | [1, 14.7] | [1, 14, 7, 70] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 73 | `s2e1Q` | en | Kurangkan 23{,}5 - 7{,}25 | Subtract 23{,}5 - 7{,}25 | [23.5, 7.25] | [23, 25, 5, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 75 | `s2e1ans` | en | ∴ Jadi, 23{,}5 - 7{,}25 = 16{,}25 | ∴ Therefore, 23{,}5 - 7{,}25 = 16{,}25 | [16.25, 23.5, 7.25] | [16, 23, 25, 5, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 74 | `s2e1s1` | en | Langkah 1: Samakan digit desimal — 23{,}5 menjadi 23{,}50 | Step 1: Equalize decimal digits — 23{,}5 becomes 23{,}50 | [1, 23.5] | [1, 23, 5, 50] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 88 | `s3e1Q` | en | Hitunglah 18{,}6 + 7{,}45 - 9{,}3 | Calculate 18{,}6 + 7{,}45 - 9{,}3 | [18.6, 7.45, 9.3] | [18, 3, 45, 6, 7, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 92 | `s3e1ans` | en | ∴ Jadi, hasilnya adalah 16{,}75 | ∴ Therefore, the result is 16{,}75 | [16.75] | [16, 75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 90 | `s3e1s1` | en | Langkah 1: Hitung 18{,}60 + 7{,}45 terlebih dahulu: | Step 1: Calculate 18{,}60 + 7{,}45 first: | [1, 18.6, 7.45] | [1, 18, 45, 60, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 91 | `s3e1s2` | en | Langkah 2: Lanjutkan 26{,}05 - 9{,}30: | Step 2: Continue with 26{,}05 - 9{,}30: | [2, 26.05, 9.3] | [2, 26, 30, 5, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 102 | `s3e3katex1` | en | \text{Luas} = 1250{,}75 - 375{,}5 + 128{,}25 | \text{Area} = 1250{,}75 - 375{,}5 + 128{,}25 | [1250.75, 128.25, 375.5] | [1250, 128, 25, 375, 5, 75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 103 | `s3e3s2` | en | Langkah 2: Kerjakan dari kiri: 1250{,}75 - 375{,}50 | Step 2: Work from the left: 1250{,}75 - 375{,}50 | [1250.75, 2, 375.5] | [1250, 2, 375, 50, 75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 104 | `s3e3s3` | en | Langkah 3: Lanjutkan: 875{,}25 + 128{,}25 | Step 3: Continue: 875{,}25 + 128{,}25 | [128.25, 3, 875.25] | [128, 25, 3, 875] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 47 | `s1e1Q` | ja | Tentukan hasil penjumlahan 14{,}7 + 8{,}39 | 14{,}7 + 8{,}39 の答えを求めなさい | [14.7, 8.39] | [14, 39, 7, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 51 | `s1e1ans` | ja | ∴ Jadi, hasil penjumlahannya adalah 23{,}09 | ∴ よって、答えは 23{,}09 | [23.09] | [23, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 48 | `s1e1s1` | ja | Langkah 1: Samakan digit desimal — 14{,}7 menjadi 14{,}70 (tambah 1 nol) | 手順1：小数の桁数を揃える — 14{,}7 を 14{,}70 にする（0を1つ補う） | [1, 14.7] | [0, 1, 14, 7, 70] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 53 | `s1e2s1` | ja | Langkah 1: 52{,}18 punya 2 digit desimal, 9{,}754 punya 3 digit. Tambah 1 nol pada 52{,}18 → 52{,}180 | 手順1：52.18 は小数2桁、9.754 は3桁。52.18 に0を1つ補う → 52.180 | [1, 2, 3, 52.18, 9.754] | [0, 1, 2, 3, 52.18, 9.754] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 57 | `s1e3Q` | ja | Sebuah proyek jalan membutuhkan 3 gulungan kawat. Gulungan pertama sepanjang 934{,}456 m, gulungan kedua sepanjang 70{,}806 m, dan gulungan ketiga sepanjang 8{,}34 m. Berapa meter total panjang kawat yang dibutuhkan? | 道路工事に針金が3巻き必要です。1巻き目は 934.456 m、2巻き目は 70.806 m、3巻き目は 8.34 m です。針金の合計の長さは何mですか？ | [3, 70.806, 8.34, 934.456] | [1, 2, 3, 70.806, 8.34, 934.456] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 73 | `s2e1Q` | ja | Kurangkan 23{,}5 - 7{,}25 | 23{,}5 - 7{,}25 を計算しなさい | [23.5, 7.25] | [23, 25, 5, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 75 | `s2e1ans` | ja | ∴ Jadi, 23{,}5 - 7{,}25 = 16{,}25 | ∴ よって、23{,}5 - 7{,}25 = 16{,}25 | [16.25, 23.5, 7.25] | [16, 23, 25, 5, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 74 | `s2e1s1` | ja | Langkah 1: Samakan digit desimal — 23{,}5 menjadi 23{,}50 | 手順1：小数の桁数を揃える — 23{,}5 を 23{,}50 にする | [1, 23.5] | [1, 23, 5, 50] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 88 | `s3e1Q` | ja | Hitunglah 18{,}6 + 7{,}45 - 9{,}3 | 18{,}6 + 7{,}45 - 9{,}3 を計算しなさい | [18.6, 7.45, 9.3] | [18, 3, 45, 6, 7, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 92 | `s3e1ans` | ja | ∴ Jadi, hasilnya adalah 16{,}75 | ∴ よって、答えは 16{,}75 | [16.75] | [16, 75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 90 | `s3e1s1` | ja | Langkah 1: Hitung 18{,}60 + 7{,}45 terlebih dahulu: | 手順1：まず 18{,}60 + 7{,}45 を計算する： | [1, 18.6, 7.45] | [1, 18, 45, 60, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 91 | `s3e1s2` | ja | Langkah 2: Lanjutkan 26{,}05 - 9{,}30: | 手順2：続いて 26{,}05 - 9{,}30 を計算する： | [2, 26.05, 9.3] | [2, 26, 30, 5, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 102 | `s3e3katex1` | ja | \text{Luas} = 1250{,}75 - 375{,}5 + 128{,}25 | \text{面積} = 1250{,}75 - 375{,}5 + 128{,}25 | [1250.75, 128.25, 375.5] | [1250, 128, 25, 375, 5, 75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 103 | `s3e3s2` | ja | Langkah 2: Kerjakan dari kiri: 1250{,}75 - 375{,}50 | 手順2：左から計算：1250{,}75 - 375{,}50 | [1250.75, 2, 375.5] | [1250, 2, 375, 50, 75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 104 | `s3e3s3` | ja | Langkah 3: Lanjutkan: 875{,}25 + 128{,}25 | 手順3：続き：875{,}25 + 128{,}25 | [128.25, 3, 875.25] | [128, 25, 3, 875] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 64 | `sec2Summary` | ja | Pengurangan desimal prinsipnya sama persis dengan penjumlahan: jajarkan koma, samakan panjang digit desimal dengan menambahkan nol. Bedanya, saat kamu mengurangkan kolom dan angka atas lebih kecil dari angka bawah, kamu perlu meminjam 1 nilai dari kolom sebelah kiri (persis seperti pengurangan bilangan bulat biasa). | 小数の減法の原理は加法と全く同じです：小数点を揃えて、0を補って桁数を揃えましょう。違いは、上の数が下の数より小さいとき、左の列から1借りる必要があることです（整数の引き算と全く同じです）。 | [1] | [0, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 72 | `sec2Tip` | ja | Tips: Kalau bilangan yang dikurangi adalah bilangan bulat (contoh: 467,8 dikurangi sesuatu), kamu bisa tulis bilangan itu dengan nol di belakang koma sesuai kebutuhan. Misal 467{,}8 bisa ditulis 467{,}800 agar punya 3 digit desimal. | ヒント：引かれる数の小数桁数が少ない場合（例：467.8から引く）、必要に応じて0を補って書けます。例えば 467.8 を 467.800 と書いて小数3桁にできます。 | [3, 467.8] | [0, 3, 467.8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx) | 105 | `ex9katex4` | en | = \frac{13}{30} \times 840.000 = \text{Rp}364.000 | = \frac{13}{30} \times 840{,}000 = \$364{,}000 | [0, 13, 30, 840000] | [13, 30, 364000, 840000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx) | 99 | `ex9Q` | ja | Seseorang mendapat upah Rp840.000 sebulan. Seperenam dari upah digunakan untuk sewa rumah, \frac{2}{5} bagian untuk kebutuhan makan. Berapa rupiah yang digunakan untuk keperluan lain? | ある人の月収は$840,000です。6分の1を家賃、\frac{2}{5} を食費に使います。その他の費用はいくらですか？ | [2, 5, 840000] | [1, 2, 5, 6, 840000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx) | 105 | `ex9katex4` | ja | = \frac{13}{30} \times 840.000 = \text{Rp}364.000 | = \frac{13}{30} \times 840{,}000 = \$364{,}000 | [0, 13, 30, 840000] | [13, 30, 364000, 840000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 37 | `ex1Q` | en | Hitunglah hasil perkalian 46,72 \times 10 | Calculate 46,72 \times 10 | [10, 46.72] | [10, 46, 72] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 40 | `ex2Q` | en | Hitunglah hasil perkalian 2,3467 \times 1000 | Calculate 2,3467 \times 1000 | [1000, 2.3467] | [1000, 2, 3467] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 67 | `ex4Q` | en | Hitunglah hasil perkalian 0,25 \times 0,87 | Calculate 0,25 \times 0,87 | [0.25, 0.87] | [0, 25, 87] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 74 | `ex5Q` | en | Hitunglah hasil perkalian 6,4 \times 1,38 | Calculate 6,4 \times 1,38 | [1.38, 6.4] | [1, 38, 4, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 102 | `ex7s2a` | en | 15.500 memiliki 0 tempat desimal | 15.50 has 2 decimal places | [0, 15500] | [15.5, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 105 | `ex7s2d` | en | Letakkan koma (1 angka dari kanan): 38.750,0 | Place the decimal point (3 digits from the right): 38.750 = 38.75 | [1, 38750] | [3, 38.75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 108 | `ex8Q` | en | Sebuah mobil mengonsumsi bensin 8,5 liter untuk menempuh jarak 100 km. Jika harga bensin Rp12.650 per liter, berapa biaya bensin untuk perjalanan sejauh 350 km? | A car uses 8.5 litres of petrol for 100 km. If petrol costs $1.26 per litre, what is the petrol cost for a 350 km journey? | [100, 12650, 350, 8.5] | [1.26, 100, 350, 8.5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 117 | `ex8ans` | en | Biaya bensin adalah Rp376.337,50 | The petrol cost is $37.49 | [376337.5] | [37.49] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 112 | `ex8katex2` | en | \text{Biaya} = 29,75 \times 12.650 | \text{Cost} = 29.75 \times 1.26 | [12650, 29.75] | [1.26, 29.75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 114 | `ex8s3a` | en | 29,75 (2 tempat desimal) × 12.650 (0 tempat desimal) | 29.75 (2 decimal places) × 1.26 (2 decimal places) | [0, 12650, 2, 29.75] | [1.26, 2, 29.75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 115 | `ex8s3b` | en | 2975 × 12650 = 37.633.750 | 2,975 × 126 = 374,850 | [12650, 2975, 37633750] | [126, 2975, 374850] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 116 | `ex8s3c` | en | Total = 2 tempat desimal = 376.337,50 | 4 decimal places = 37.4850; rounded to the nearest cent = $37.49 | [2, 376337.5] | [37.485, 37.49, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 125 | `ex9katex3` | en | \text{Jumlah} = \frac{107,1}{0,09} = 1190 \text{ buah} | \text{Quantity} = \frac{107.1}{0.09} = 1{,}190 \text{ tiles} | [10, 107, 1190, 9] | [0.09, 107.1, 1190] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 37 | `ex1Q` | ja | Hitunglah hasil perkalian 46,72 \times 10 | 計算せよ 46,72 \times 10 | [10, 46.72] | [10, 46, 72] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 40 | `ex2Q` | ja | Hitunglah hasil perkalian 2,3467 \times 1000 | 計算せよ 2,3467 \times 1000 | [1000, 2.3467] | [1000, 2, 3467] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 46 | `ex3s2desc` | ja | Kita perlu menambah 1 angka nol di belakang: 8,65430 | 後ろに0を1つ追加する必要があります：8.65430 | [1, 8.6543] | [0, 1, 8.6543] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 67 | `ex4Q` | ja | Hitunglah hasil perkalian 0,25 \times 0,87 | 計算せよ 0,25 \times 0,87 | [0.25, 0.87] | [0, 25, 87] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 74 | `ex5Q` | ja | Hitunglah hasil perkalian 6,4 \times 1,38 | 計算せよ 6,4 \times 1,38 | [1.38, 6.4] | [1, 38, 4, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 98 | `ex7Q` | ja | Sebuah toko menjual apel seharga Rp15.500 per kg. Berapakah harga yang harus dibayar jika membeli 2,5 kg apel? | あるお店でリンゴが1 kgあたり$15.50で売られています。2.5 kgのリンゴを買うといくらになりますか？ | [15500, 2.5] | [1, 15.5, 2.5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 102 | `ex7s2a` | ja | 15.500 memiliki 0 tempat desimal | 15.50は小数2桁 | [0, 15500] | [15.5, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 105 | `ex7s2d` | ja | Letakkan koma (1 angka dari kanan): 38.750,0 | 小数点を配置（右から3桁）：38.750 = 38.75 | [1, 38750] | [3, 38.75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 108 | `ex8Q` | ja | Sebuah mobil mengonsumsi bensin 8,5 liter untuk menempuh jarak 100 km. Jika harga bensin Rp12.650 per liter, berapa biaya bensin untuk perjalanan sejauh 350 km? | ある車は100 kmを走るのに8.5リットルのガソリンを消費します。ガソリンが1リットル$1.26の場合、350 kmの旅行のガソリン代はいくらですか？ | [100, 12650, 350, 8.5] | [1, 1.26, 100, 350, 8.5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 117 | `ex8ans` | ja | Biaya bensin adalah Rp376.337,50 | ガソリン代は$37.49です。 | [376337.5] | [37.49] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 112 | `ex8katex2` | ja | \text{Biaya} = 29,75 \times 12.650 | \text{費用} = 29.75 \times 1.26 | [12650, 29.75] | [1.26, 29.75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 114 | `ex8s3a` | ja | 29,75 (2 tempat desimal) × 12.650 (0 tempat desimal) | 29.75（小数2桁）× 1.26（小数2桁） | [0, 12650, 2, 29.75] | [1.26, 2, 29.75] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 115 | `ex8s3b` | ja | 2975 × 12650 = 37.633.750 | 2,975 × 126 = 374,850 | [12650, 2975, 37633750] | [126, 2975, 374850] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 116 | `ex8s3c` | ja | Total = 2 tempat desimal = 376.337,50 | 小数4桁の結果は37.4850。セント単位に四捨五入すると$37.49です。 | [2, 376337.5] | [37.485, 37.49, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 119 | `ex9Q` | ja | Pak Ahmad memiliki sebidang tanah berbentuk persegi panjang dengan panjang 12,75 m dan lebar 8,4 m. Ia ingin memasang keramik dengan ukuran 0,3 m × 0,3 m. Jika harga keramik Rp25.000 per buah, berapa total biaya yang dibutuhkan untuk membeli keramik? | アフマドさんは縦12.75 m、横8.4 mの長方形の土地を持っています。0.3 m × 0.3 mのタイルを敷こうとしています。タイルが1枚$25の場合、タイルの購入総費用はいくらですか？ | [0.3, 12.75, 25000, 8.4] | [0.3, 1, 12.75, 25, 8.4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 125 | `ex9katex3` | ja | \text{Jumlah} = \frac{107,1}{0,09} = 1190 \text{ buah} | \text{枚数} = \frac{107.1}{0.09} = 1{,}190 \text{ 枚} | [10, 107, 1190, 9] | [0.09, 107.1, 1190] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage.tsx) | 91 | `ex12Q` | ja | Hitunglah \frac{1}{3} \times \left(\frac{1}{4} + \frac{1}{6}\right) dengan dua cara: langsung dan distributif! | \frac{1}{3} \times \left(\frac{1}{4} + \frac{1}{6}\right) を 2 通りの方法で計算せよ：直接計算と分配法則！ | [1, 3, 4, 6] | [1, 2, 3, 4, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage.tsx) | 69 | `ex8Q` | ja | Hitunglah \frac{3}{7} \times \frac{1}{9} \times \frac{3}{5} dengan dua cara pengelompokan berbeda! | \frac{3}{7} \times \frac{1}{9} \times \frac{3}{5} を 2 通りのグループ化で計算せよ！ | [1, 3, 5, 7, 9] | [1, 2, 3, 5, 7, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage.tsx) | 70 | `ex8way1` | ja | Cara 1: Kelompokkan dua pecahan pertama | 方法 1：最初の 2 つをグループ化 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx) | 67 | `ex2r4` | ja | Garis bersilangan memerlukan dua bidang berbeda, sehingga hanya mungkin terjadi pada ruang 3 dimensi. | ねじれの位置は2つの異なる平面が必要なので、3次元空間でのみ存在します。 | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx) | 72 | `ex3n1` | ja | Segitiga PBQ siku-siku di B (karena AB ⊥ h dan AB = 8 = jarak antar garis): | 三角形PBQはBで直角（AB⊥h、AB=8=2直線間の距離）： | [8] | [2, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx) | 39 | `s2note` | ja | Dua garis tegak lurus membagi bidang menjadi 4 sudut siku-siku yang sama besar. | 垂直な2直線は平面を4つの等しい直角に分けます。 | [4] | [2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx) | 38 | `s2spTxt` | ja | Jika sudut yang terbentuk di titik potong tepat 90°, kedua garis disebut tegak lurus. | 交点でできる角がちょうど90°のとき、2直線は垂直といいます。 | [90] | [2, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 59 | `s1proofMid` | ja | melalui titik B. Karena sifat sudut dalam berseberangan dan sudut sehadap, ketiga sudut segitiga berkumpul membentuk sudut lurus (180°) di titik B. | に平行な直線を引く。錯角と同位角の性質から、三角形の3つの角がB点で直線角（180°）を形成する。 | [180] | [180, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 96 | `s4how3` | ja | 3. Kalikan dengan | 3. 180°をかける | [3] | [180, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx) | 21 | `intisariP` | ja | Ketika dua garis sejajar dipotong oleh sebuah garis transversal, terbentuklah 8 sudut dengan | 2本の平行線が横断線で切られると、8つの角ができ、それらには | [8] | [2, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx) | 108 | `s5tipEnd` | ja | yang terbentuk. Kedua sudut di "dasar" huruf C itulah sudut dalam sepihak — kalau dijumlah selalu 180°! | の字を想像してください。Cのベースにある2つの角が同側内角です — 合計すると常に180°！ | [180] | [180, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx) | 66 | `ex2q` | ja | Dua garis a dan b berpotongan membentuk 4 sudut. Sudut | 2直線aとbが交わって4つの角を作ります。角 | [4] | [2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx) | 41 | `s2p1` | ja | Bayangkan kamu menekan gunting — kedua mata guntingnya membentuk dua garis yang berpotongan. Perpotongan itu menghasilkan 4 sudut, dan yang saling "bersebrangan" disebut | はさみを押すところを想像してください — 2枚の刃が交わる直線を作ります。その交点で4つの角ができ、向かい合うものを | [4] | [2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx) | 52 | `s3defTxt` | ja | Dua sudut saling berpelurus (supplementary) jika jumlah keduanya tepat 180°. | 2つの角の和がちょうど180°のとき、それらは補角といいます。 | [180] | [180, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx) | 59 | `s4defTxt` | ja | Dua sudut saling berpenyiku (complementary) jika jumlah keduanya tepat 90°. | 2つの角の和がちょうど90°のとき、それらは余角といいます。 | [90] | [2, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx) | 46 | `c1_problem` | ja | Dua lingkaran berjari-jari 9 cm dan 6 cm, berjarak pusat 25 cm. Hitung panjang GSPD! | 半径9 cmと6 cmの2つの円の中心間距離が25 cmです。内接共通接線の長さを求めなさい！ | [25, 6, 9] | [2, 25, 6, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx) | 49 | `c2_problem` | ja | Dua lingkaran sama besar (R = r) memiliki jarak pusat 26 cm. Panjang GSPD = 24 cm. Tentukan jari-jari masing-masing lingkaran! | 同じ大きさの2つの円（R = r）の中心間距離が26 cmです。内接共通接線の長さ = 24 cm。各円の半径を求めなさい！ | [24, 26] | [2, 24, 26] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx) | 52 | `c3_problem` | ja | Dua lingkaran berjari-jari R = 10 cm dan r = 6 cm. Panjang GSPL = 4√21 cm. Tentukan panjang GSPD! | 半径R = 10 cm、r = 6 cmの2つの円があります。外接共通接線の長さ = 4√21 cm。内接共通接線の長さを求めなさい！ | [10, 21, 4, 6] | [10, 2, 21, 4, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx) | 56 | `c1_problem` | ja | Dua lingkaran berjari-jari 10 cm dan 4 cm. Jarak antara kedua pusatnya adalah 17 cm. Hitung panjang GSPL! | 半径10 cmと4 cmの2つの円があり、中心間の距離は17 cmです。外接共通接線の長さを求めなさい！ | [10, 17, 4] | [10, 17, 2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx) | 60 | `c2_problem` | ja | Dua lingkaran berjari-jari 8 cm dan 3 cm memiliki GSPL sepanjang 12 cm. Tentukan jarak antara kedua pusat lingkaran! | 半径8 cmと3 cmの2つの円の外接共通接線の長さが12 cmです。2つの中心間の距離を求めなさい！ | [12, 3, 8] | [12, 2, 3, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx) | 29 | `def_summary` | ja | adalah garis lurus yang memotong lingkaran di tepat satu titik. Titik pertemuan itu disebut titik singgung (T). Di titik ini, jari-jari lingkaran dan garis singgung selalu saling tegak lurus (90°). | とは、円をちょうど1点で交わる直線です。その交点を接点（T）といいます。この点では、半径と接線は常に垂直（90°）です。 | [90] | [1, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx) | 27 | `intro_tip` | ja | Ada tiga kemungkinan posisi garis terhadap lingkaran: tidak berpotongan (0 titik), singgung (1 titik), atau memotong/sekans (2 titik). Yang kita fokuskan adalah yang tengah — | 直線と円の位置関係には3通りあります：交点なし（0点）、接線（1点）、割線（2点）。注目するのは中間の — | [0, 1, 2] | [0, 1, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 61 | `c2_step1` | en | Tiga silinder bersentuhan: jarak pusat ke pusat = d = 2r = 28 cm. Ada 2 celah, jadi total segmen lurus = 4 × 28 cm. Busur total: setiap silinder di ujung = setengah lingkaran, silinder tengah = 1 lingkaran penuh. Total busur = 2 × setengah + 1 = 2 lingkaran penuh. | Three touching cylinders: center-to-center distance = d = 2r = 28 cm. 2 gaps, so total straight = 4 × 28 cm. Total arcs: end cylinders = semicircle each, middle cylinder = full circle. Total arcs = 2 full circles. | [1, 2, 28, 4] | [2, 28, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 57 | `c1_problem` | ja | Sebuah mesin memiliki dua roda silinder berjari-jari 7 cm yang berjarak pusat 30 cm. Tentukan panjang sabuk minimal yang diperlukan! (Gunakan π = 22/7) | ある機械に半径7 cmの2つの円筒形の車輪があり、中心間距離が30 cmです。必要な最小ベルト長を求めなさい！（π = 22/7を使用） | [22, 30, 7] | [2, 22, 30, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 60 | `c2_problem` | ja | Tiga silinder berjari-jari 14 cm disusun berjajar dan diikat sabuk keliling. Tentukan panjang sabuk minimal! (π = 22/7) | 半径14 cmの3つの円柱が一列に並びベルトで囲まれています。最小ベルト長を求めなさい！（π = 22/7） | [14, 22, 7] | [14, 22, 3, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 61 | `c2_step1` | ja | Tiga silinder bersentuhan: jarak pusat ke pusat = d = 2r = 28 cm. Ada 2 celah, jadi total segmen lurus = 4 × 28 cm. Busur total: setiap silinder di ujung = setengah lingkaran, silinder tengah = 1 lingkaran penuh. Total busur = 2 × setengah + 1 = 2 lingkaran penuh. | 3つの接触円柱：中心間距離 = d = 2r = 28 cm。2つのすき間があるので直線合計 = 4 × 28 cm。弧合計：両端 = 半円ずつ、真ん中 = 全円。合計 = 2全円。 | [1, 2, 28, 4] | [2, 28, 3, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 38 | `case1_title` | ja | 📋 Kasus 1: Dua Lingkaran Sama Besar (R = r) | 📋 ケース1：同じ大きさの2つの円（R = r） | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 20 | `sec_contoh1` | ja | ✏️ Contoh 1 — Dua Roda Sama Besar (Mudah) | ✏️ 例題1 — 同径の2つの車輪（基本） | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 21 | `sec_contoh2` | ja | ✏️ Contoh 2 — Tiga Roda Segaris (Sedang) | ✏️ 例題2 — 一列の3つの車輪（標準） | [2] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 22 | `sec_contoh3` | ja | ✏️ Contoh 3 — Dua Roda Berbeda Ukuran (Sulit) | ✏️ 例題3 — 異径の2つの車輪（発展） | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 71 | `s1e2c` | en | c. Bilangan asli antara 10 dan 20 (eksklusif): 11,12,...,19 → 9 anggota | c. Natural numbers between 10 and 20 (exclusive): 11,12,...,19 → 9 members | [10, 11.12, 19, 20, 9] | [10, 11, 12, 19, 20, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 108 | `s2e1c` | en | M: Cari bilangan asli dengan x² < 100 → x < 10 → x ∈ {1,2,3,...,9}. | M: Natural numbers with x² < 100 → x < 10 → x ∈ {1,2,3,...,9}. | [1.2, 10, 100, 3, 9] | [1, 10, 100, 2, 3, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 164 | `s3e3cAns` | en | Pilih 2 dari 4: C(4,2) = 4!/(2!·2!) = 6 himpunan bagian. | Choose 2 from 4: C(4,2) = 4!/(2!·2!) = 6 subsets. | [2, 4, 4.2, 6] | [2, 4, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 180 | `s4e1aAns` | en | S = {1,2,3,...,10} atau S = {bilangan asli ≤ 10}. P adalah himpunan bilangan genap dalam S. | S = {1,2,...,10} or S = {natural numbers ≤ 10}. P is the set of even numbers in S. | [1.2, 10, 3] | [1, 10, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 182 | `s4e1cAns` | en | S = {bilangan asli ≤ 25} atau S = {1,4,9,...,625} (semua kuadrat sempurna). Tergantung konteks. | S = {natural numbers ≤ 25} or S = {all perfect squares}. Depends on context. | [1.4, 25, 625, 9] | [25] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 210 | `s5pascalNote` | en | Baris ke-n segitiga Pascal = jumlah himpunan bagian dengan k anggota (k = 0,1,...,n). | Row n of Pascal's Triangle = number of subsets with k members (k = 0,1,...,n). | [0.1] | [0, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 71 | `s1e2c` | ja | c. Bilangan asli antara 10 dan 20 (eksklusif): 11,12,...,19 → 9 anggota | c. 10から20の間（排他的）の自然数：11,12,...,19 → 9つの要素 | [10, 11.12, 19, 20, 9] | [10, 11, 12, 19, 20, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 108 | `s2e1c` | ja | M: Cari bilangan asli dengan x² < 100 → x < 10 → x ∈ {1,2,3,...,9}. | M：x² < 100 を満たす自然数 → x < 10 → x ∈ {1,2,3,...,9}。 | [1.2, 10, 100, 3, 9] | [1, 10, 100, 2, 3, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 164 | `s3e3cAns` | ja | Pilih 2 dari 4: C(4,2) = 4!/(2!·2!) = 6 himpunan bagian. | 4つから2つ選ぶ：C(4,2) = 4!/(2!·2!) = 6 個。 | [2, 4, 4.2, 6] | [2, 4, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 180 | `s4e1aAns` | ja | S = {1,2,3,...,10} atau S = {bilangan asli ≤ 10}. P adalah himpunan bilangan genap dalam S. | S = {1,2,...,10} または S = {10以下の自然数}。PはSの偶数の集合。 | [1.2, 10, 3] | [1, 10, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 182 | `s4e1cAns` | ja | S = {bilangan asli ≤ 25} atau S = {1,4,9,...,625} (semua kuadrat sempurna). Tergantung konteks. | S = {25以下の自然数} または S = {すべての完全平方数}。文脈による。 | [1.4, 25, 625, 9] | [25] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 210 | `s5pascalNote` | ja | Baris ke-n segitiga Pascal = jumlah himpunan bagian dengan k anggota (k = 0,1,...,n). | パスカルの三角形のn行目 = k個の要素を持つ部分集合の数（k = 0,1,...,n）。 | [0.1] | [0, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx) | 138 | `s4e1q` | en | S = {1,2,...,10}, A = {bilangan prima}. Tentukan Aᶜ! | S = {1,2,...,10}, A = {prime numbers}. Find Aᶜ! | [1.2, 10] | [1, 10, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx) | 138 | `s4e1q` | ja | S = {1,2,...,10}, A = {bilangan prima}. Tentukan Aᶜ! | S = {1,2,...,10}、A = {素数}。Aᶜ を求めなさい！ | [1.2, 10] | [1, 10, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx) | 87 | `s1e3all` | ja | Ketiganya: 5 · Di luar: 8 | 3つすべて: 5 · 外側: 8 | [5, 8] | [3, 5, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx) | 81 | `s1e3q` | ja | Survei terhadap 60 remaja: 32 punya akun Instagram (I), 27 punya akun X (X), 25 punya akun YouTube (Y). Diketahui 15 punya I dan X, 12 punya I dan Y, 10 punya X dan Y, 5 punya ketiganya, dan sisanya tidak punya akun apapun. Berapa remaja yang tidak punya akun apapun? | 60人の若者への調査：32人がInstagram(I)、27人がX(X)、25人がYouTube(Y)を持つ。15人がIとX、12人がIとY、10人がXとY、5人が3つすべてを持ち、残りは何も持たない。何も持たない若者は何人ですか？ | [10, 12, 15, 25, 27, 32, 5, 60] | [10, 12, 15, 25, 27, 3, 32, 5, 60] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx) | 134 | `s2e3ans` | ja | Ada 14 siswa yang mengikuti ketiga ekskul sekaligus. | 3つの部活すべてに参加する生徒は14人います。 | [14] | [14, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx) | 122 | `s2e3q` | ja | Dari 80 siswa di sebuah sekolah: 45 ikut ekskul Seni, 38 ikut ekskul Olahraga, 30 ikut ekskul Sains. Diketahui 20 ikut Seni dan Olahraga, 15 ikut Seni dan Sains, 12 ikut Olahraga dan Sains. Jika semua siswa ikut setidaknya satu ekskul, berapa yang ikut ketiganya? | 80人の生徒のうち：45人が芸術部、38人が運動部、30人が科学部に参加。20人が芸術と運動、15人が芸術と科学、12人が運動と科学に参加。全員が少なくとも1つの部に参加している場合、3つすべてに参加する生徒は何人ですか？ | [12, 15, 20, 30, 38, 45, 80] | [1, 12, 15, 20, 3, 30, 38, 45, 80] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx) | 175 | `s3e3ans` | ja | Ada 60 orang yang hanya menyukai tepat satu warna. | ちょうど1色だけ好きな人は60人です。 | [60] | [1, 60] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx) | 168 | `s3e3q` | ja | Dari 100 orang, setiap orang menyukai setidaknya satu dari tiga warna: Merah (M), Biru (B), Kuning (K). Diketahui: n(M)=60, n(B)=50, n(K)=40, yang menyukai tepat dua warna berjumlah 30, dan yang menyukai ketiga warna berjumlah 10. Berapa yang hanya menyukai satu warna? | 100人全員が3色のうち少なくとも1色が好き：赤(M)、青(B)、黄(K)。n(M)=60, n(B)=50, n(K)=40、ちょうど2色好き：30人、3色すべて好き：10人。ちょうど1色だけ好きな人は何人ですか？ | [10, 100, 30, 40, 50, 60] | [1, 10, 100, 2, 3, 30, 40, 50, 60] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx) | 232 | `s4e1a` | ja | Hari dalam seminggu: Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu → ada 7 hari. | 1週間の日：月、火、水、木、金、土、日 → 7日。 | [7] | [1, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx) | 222 | `s4emptyWarnText` | ja | BUKAN himpunan kosong! Ia punya anggota: angka 0. | は空集合ではありません！要素が1つあります：数字の0。 | [0] | [0, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 119 | `fig10` | ja | Gambar 10. Dua layang-layang kongruen — ABCD ≅ PQRS jika semua sisi bersesuaian sama panjang dan semua sudut bersesuaian sama besar | 図10. 2つの合同な凧形 — ABCD ≅ PQRSは対応するすべての辺と角が等しいとき | [10] | [10, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 129 | `fig11` | ja | Gambar 11. Dua lingkaran kongruen — jika jari-jarinya sama panjang (r₁ = r₂) | 図11. 2つの合同な円 — 半径が等しいとき (r₁ = r₂) | [11] | [11, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 55 | `fig2` | ja | Gambar 2. Syarat RRR — ketiga pasang sisi bersesuaian sama panjang: AB=PQ, BC=QR, CA=RP | 図2. 条件SSS — 3組の対応する辺がすべて等しい：AB=PQ, BC=QR, CA=RP | [2] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 58 | `fig3` | ja | Gambar 3. Syarat RAR — dua sisi bersesuaian sama panjang dan sudut apitnya sama besar: AB=PQ, ∠A=∠P, AC=PR | 図3. 条件SAS — 2辺が等しく挟む角も等しい：AB=PQ, ∠A=∠P, AC=PR | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 63 | `fig4` | ja | Gambar 4. Syarat ARA/AAR/RAA — satu sisi sama panjang dan dua sudut bersesuaian sama besar: ∠A=∠P, AB=PQ, ∠B=∠Q | 図4. 条件ASA/AAS/SAA — 1辺が等しく2角が等しい：∠A=∠P, AB=PQ, ∠B=∠Q | [4] | [1, 2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 75 | `fig5` | ja | Gambar 5. Dua persegi kongruen — Persegi ABCD ≅ Persegi PQRS jika sisinya sama panjang (AB = PQ) | 図5. 2つの合同な正方形 — 正方形ABCD ≅ 正方形PQRSは辺が等しいとき (AB = PQ) | [5] | [2, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 83 | `fig6` | ja | Gambar 6. Dua persegi panjang kongruen — ABCD ≅ PQRS jika panjang dan lebarnya sama (AB=PQ dan BC=QR) | 図6. 2つの合同な長方形 — ABCD ≅ PQRSは縦と横が等しいとき (AB=PQ かつ BC=QR) | [6] | [2, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 93 | `fig7` | ja | Gambar 7. Dua jajar genjang kongruen — ABCD ≅ PQRS jika dua sisi bersesuaian sama panjang dan sudut apitnya sama besar (AB=PQ, BC=QR, ∠A=∠P) | 図7. 2つの合同な平行四辺形 — ABCD ≅ PQRSは2辺と挟む角が等しいとき (AB=PQ, BC=QR, ∠A=∠P) | [7] | [2, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 101 | `fig8` | ja | Gambar 8. Dua trapesium kongruen — ABCD ≅ PQRS jika semua sisi bersesuaian sama panjang dan semua sudut bersesuaian sama besar | 図8. 2つの合同な台形 — ABCD ≅ PQRSは対応するすべての辺と角が等しいとき | [8] | [2, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 109 | `fig9` | ja | Gambar 9. Dua belah ketupat kongruen — ABCD ≅ PQRS jika panjang sisinya sama dan salah satu sudut apitnya sama besar (AB=PQ dan ∠A=∠P) | 図9. 2つの合同なひし形 — ABCD ≅ PQRSは辺が等しく挟む角が等しいとき (AB=PQ かつ ∠A=∠P) | [9] | [2, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 62 | `k2_ara` | ja | ③ Syarat ARA / AAR / RAA — Sudut-Sisi-Sudut / Sudut-Sudut-Sisi / Sisi-Sudut-Sudut | ③ 条件ASA / AAS / SAA — 2角夾辺 / 2角1辺 | [3] | [1, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 54 | `k2_rrr` | ja | ① Syarat RRR — Sisi-Sisi-Sisi | ① 条件SSS — 3辺相等 | [1] | [1, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 18 | `sec_konsep1` | ja | 📘 Sub-Bab 1 — Sifat Dua Segitiga Kongruen | 📘 第1節 — 合同な2つの三角形の性質 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 119 | `fig10` | ja | Gambar 10. Dua layang-layang kongruen — ABCD ≅ PQRS jika semua sisi bersesuaian sama panjang dan semua sudut bersesuaian sama besar | 図10. 2つの合同な凧形 — ABCD ≅ PQRSは対応するすべての辺と角が等しいとき | [10] | [10, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 129 | `fig11` | ja | Gambar 11. Dua lingkaran kongruen — jika jari-jarinya sama panjang (r₁ = r₂) | 図11. 2つの合同な円 — 半径が等しいとき (r₁ = r₂) | [11] | [11, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 55 | `fig2` | ja | Gambar 2. Syarat RRR — ketiga pasang sisi bersesuaian sama panjang: AB=PQ, BC=QR, CA=RP | 図2. 条件SSS — 3組の対応する辺がすべて等しい：AB=PQ, BC=QR, CA=RP | [2] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 58 | `fig3` | ja | Gambar 3. Syarat RAR — dua sisi bersesuaian sama panjang dan sudut apitnya sama besar: AB=PQ, ∠A=∠P, AC=PR | 図3. 条件SAS — 2辺が等しく挟む角も等しい：AB=PQ, ∠A=∠P, AC=PR | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 63 | `fig4` | ja | Gambar 4. Syarat ARA/AAR/RAA — satu sisi sama panjang dan dua sudut bersesuaian sama besar: ∠A=∠P, AB=PQ, ∠B=∠Q | 図4. 条件ASA/AAS/SAA — 1辺が等しく2角が等しい：∠A=∠P, AB=PQ, ∠B=∠Q | [4] | [1, 2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 75 | `fig5` | ja | Gambar 5. Dua persegi kongruen — Persegi ABCD ≅ Persegi PQRS jika sisinya sama panjang (AB = PQ) | 図5. 2つの合同な正方形 — 正方形ABCD ≅ 正方形PQRSは辺が等しいとき (AB = PQ) | [5] | [2, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 83 | `fig6` | ja | Gambar 6. Dua persegi panjang kongruen — ABCD ≅ PQRS jika panjang dan lebarnya sama (AB=PQ dan BC=QR) | 図6. 2つの合同な長方形 — ABCD ≅ PQRSは縦と横が等しいとき (AB=PQ かつ BC=QR) | [6] | [2, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 93 | `fig7` | ja | Gambar 7. Dua jajar genjang kongruen — ABCD ≅ PQRS jika dua sisi bersesuaian sama panjang dan sudut apitnya sama besar (AB=PQ, BC=QR, ∠A=∠P) | 図7. 2つの合同な平行四辺形 — ABCD ≅ PQRSは2辺と挟む角が等しいとき (AB=PQ, BC=QR, ∠A=∠P) | [7] | [2, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 101 | `fig8` | ja | Gambar 8. Dua trapesium kongruen — ABCD ≅ PQRS jika semua sisi bersesuaian sama panjang dan semua sudut bersesuaian sama besar | 図8. 2つの合同な台形 — ABCD ≅ PQRSは対応するすべての辺と角が等しいとき | [8] | [2, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 109 | `fig9` | ja | Gambar 9. Dua belah ketupat kongruen — ABCD ≅ PQRS jika panjang sisinya sama dan salah satu sudut apitnya sama besar (AB=PQ dan ∠A=∠P) | 図9. 2つの合同なひし形 — ABCD ≅ PQRSは辺が等しく挟む角が等しいとき (AB=PQ かつ ∠A=∠P) | [9] | [2, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 62 | `k2_ara` | ja | ③ Syarat ARA / AAR / RAA — Sudut-Sisi-Sudut / Sudut-Sudut-Sisi / Sisi-Sudut-Sudut | ③ 条件ASA / AAS / SAA — 2角夾辺 / 2角1辺 | [3] | [1, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 54 | `k2_rrr` | ja | ① Syarat RRR — Sisi-Sisi-Sisi | ① 条件SSS — 3辺相等 | [1] | [1, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 18 | `sec_konsep1` | ja | 📘 Sub-Bab 1 — Sifat Dua Segitiga Kongruen | 📘 第1節 — 合同な2つの三角形の性質 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx) | 85 | `exampleFourQuestion` | ja | Segitiga siku-siku ABC dan RPQ sebangun. Pada ABC, AB = 5 cm, AC = 12 cm, dan BC = 13 cm. Pada RPQ, RQ = 24 cm. Tentukan RP dan PQ! Perhatikan bahwa orientasi kedua segitiga pada gambar berbeda. | 直角三角形ABCとRPQは相似である。ABCでは AB = 5 cm、AC = 12 cm、BC = 13 cm、RPQでは RQ = 24 cm である。RPとPQを求めなさい。図では2つの三角形の向きが異なることに注意。 | [12, 13, 24, 5] | [12, 13, 2, 24, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx) | 124 | `tipCheck` | ja | Periksa kewajaran jawaban: jika k > 1, bangun kedua lebih besar; jika k < 1, bangun kedua lebih kecil. Pastikan jawaban sesuai dengan gambar soal. | 答えが妥当か確認する。k > 1なら2つ目の図形は大きく、k < 1なら小さい。問題の図と答えが一致するか確かめる。 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx) | 85 | `exampleFourQuestion` | ja | Segitiga siku-siku ABC dan RPQ sebangun. Pada ABC, AB = 5 cm, AC = 12 cm, dan BC = 13 cm. Pada RPQ, RQ = 24 cm. Tentukan RP dan PQ! Perhatikan bahwa orientasi kedua segitiga pada gambar berbeda. | 直角三角形ABCとRPQは相似である。ABCでは AB = 5 cm、AC = 12 cm、BC = 13 cm、RPQでは RQ = 24 cm である。RPとPQを求めなさい。図では2つの三角形の向きが異なることに注意。 | [12, 13, 24, 5] | [12, 13, 2, 24, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx) | 124 | `tipCheck` | ja | Periksa kewajaran jawaban: jika k > 1, bangun kedua lebih besar; jika k < 1, bangun kedua lebih kecil. Pastikan jawaban sesuai dengan gambar soal. | 答えが妥当か確認する。k > 1なら2つ目の図形は大きく、k < 1なら小さい。問題の図と答えが一致するか確かめる。 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx) | 36 | `aaExplanation` | ja | Jika dua pasang sudut bersesuaian dari dua segitiga sama besar, sudut ketiga juga sama besar karena jumlah sudut segitiga adalah 180°. Jadi, kedua segitiga sebangun. | 2つの三角形で対応する2組の角が等しければ、第3の角も等しくなります。三角形の内角の和は180°だからです。したがって相似です。 | [180] | [180, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx) | 72 | `example2Question` | ja | Perhatikan dua segitiga yang berhadapan pada titik E. Diketahui AB ∥ CD, AE = 4 cm, CE = 6 cm, dan CD = 18 cm. Tentukan panjang AB. | 点Eで向かい合う2つの三角形を見てみましょう。AB ∥ CD、AE = 4 cm、CE = 6 cm、CD = 18 cmのとき、ABの長さを求めましょう。 | [18, 4, 6] | [18, 2, 4, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx) | 107 | `summaryThirdAngle` | ja | 📌 Sudut ketiga: Jika dua sudut sama besar, sudut ketiga otomatis sama besar karena jumlah sudut segitiga adalah 180°. | 📌 第3の角は、2つの角が等しければ自動的に等しくなります。三角形の内角の和は180°です。 | [180] | [180, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx) | 36 | `aaExplanation` | ja | Jika dua pasang sudut bersesuaian dari dua segitiga sama besar, sudut ketiga juga sama besar karena jumlah sudut segitiga adalah 180°. Jadi, kedua segitiga sebangun. | 2つの三角形で対応する2組の角が等しければ、第3の角も等しくなります。三角形の内角の和は180°だからです。したがって相似です。 | [180] | [180, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx) | 72 | `example2Question` | ja | Perhatikan dua segitiga yang berhadapan pada titik E. Diketahui AB ∥ CD, AE = 4 cm, CE = 6 cm, dan CD = 18 cm. Tentukan panjang AB. | 点Eで向かい合う2つの三角形を見てみましょう。AB ∥ CD、AE = 4 cm、CE = 6 cm、CD = 18 cmのとき、ABの長さを求めましょう。 | [18, 4, 6] | [18, 2, 4, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx) | 107 | `summaryThirdAngle` | ja | 📌 Sudut ketiga: Jika dua sudut sama besar, sudut ketiga otomatis sama besar karena jumlah sudut segitiga adalah 180°. | 📌 第3の角は、2つの角が等しければ自動的に等しくなります。三角形の内角の和は180°です。 | [180] | [180, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage.tsx) | 61 | `ex1Header` | ja | ✏️ Contoh 1 — Mudah (Jarak Dua Titik) | ✏️ 例題1 — 基本（2点間の距離） | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage.tsx) | 29 | `pt1Header` | ja | 📏 Bagian 1 — Jarak Antar Dua Titik | 📏 パート1 — 2点間の距離 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx) | 109 | `tip4` | en | Cek jawaban: jika B(5,3) dan A(2,1), maka Δx=3 (kanan 3 satuan), Δy=2 (atas 2 satuan). Bayangkan panah dari A ke B — masuk akal? | Check your answer: if B(5,3) and A(2,1), then Δx=3 (3 units right), Δy=2 (2 units up). Imagine an arrow from A to B — does it make sense? | [2, 2.1, 3, 5.3] | [1, 2, 3, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx) | 37 | `visualHeader` | en | 🗺️ Contoh Visual: A(2,1) sebagai Acuan | 🗺️ Visual Example: A(2,1) as Reference Point | [2.1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx) | 78 | `step2note` | ja | 💡 Ini sebenarnya membuat barisan aritmetika 2D: A → B → C dengan selisih (5, −3) di setiap langkah! | 💡 実はこれは2次元の等差数列です：A → B → C で各ステップの差は (5, −3)！ | [-3, 5] | [-3, 2, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx) | 109 | `tip4` | ja | Cek jawaban: jika B(5,3) dan A(2,1), maka Δx=3 (kanan 3 satuan), Δy=2 (atas 2 satuan). Bayangkan panah dari A ke B — masuk akal? | 答えの確認：B(5,3)、A(2,1) なら Δx=3（右3単位）、Δy=2（上2単位）。AからBへの矢印を想像して — 合理的ですか？ | [2, 2.1, 3, 5.3] | [1, 2, 3, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx) | 37 | `visualHeader` | ja | 🗺️ Contoh Visual: A(2,1) sebagai Acuan | 🗺️ 視覚例：A(2,1) を基準点として | [2.1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx) | 114 | `ex3aNote` | ja | 💡 Ini sebenarnya membuat barisan aritmetika 2D: A → B → C dengan selisih (5, −3)! | 💡 実はこれは2次元の等差数列です：A → B → C で各ステップの差は (5, −3)！ | [-3, 5] | [-3, 2, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 118 | `k12Soal` | ja | Pada sebuah persegi dengan sisi 14 cm, dibuat dua buah seperempat lingkaran berhadapan (masing-masing di sudut kanan atas dan sudut kiri bawah) dengan jari-jari 7 cm. Daerah yang diarsir (persegi dikurangi kedua seperempat lingkaran) adalah luas yang dicari. Hitunglah luas daerah arsiran! | 14 cmの正方形の右上と左下の角に半径7 cmの四分の一円が描かれている。着色域（正方形 − 2つの四分の一円）の面積を求めなさい！ | [14, 7] | [14, 2, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 117 | `k12Title` | ja | ✏️ Kasus 12 — Persegi dikurangi Dua Seperempat Lingkaran (π = 22/7) | ✏️ ケース12 — 正方形から四分の一円2つを引く（π = 22/7） | [12, 22, 7] | [12, 2, 22, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 124 | `k13Title` | ja | ✏️ Kasus 13 — Gabungan Dua Setengah Lingkaran: Besar Atas + Kecil Bawah (π = 22/7) | ✏️ ケース13 — 半円2つの合体：大きな上向き + 小さな下向き（π = 22/7） | [13, 22, 7] | [13, 2, 22, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 135 | `k14Soal` | ja | Di dalam persegi bersisi 7 cm, dua busur seperempat lingkaran (jari-jari = 7 cm) ditarik dari dua sudut yang berseberangan sehingga membentuk "daun" di tengah. Hitunglah (a) luas daun (daerah arsiran) dan (b) kelilingnya! | 7 cmの正方形の対角の2頂点から四分の一円の弧（半径 = 7 cm）を描き、中央に「葉」を作る。(a) 葉の面積と(b) 周長を求めなさい！ | [7] | [2, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 148 | `k15Note3` | ja | Namun dalam susunan ini ada 4 kelopak, masing-masing dihitung sebagai irisan dua busur berdekatan: | 4枚の花びら、それぞれ隣接する2本の弧の交差として計算： | [4] | [2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 73 | `k6Soal` | ja | Daerah arsiran berbentuk "tiga busur" dalam persegi panjang 28 cm × 14 cm. Satu setengah lingkaran besar (R = 14 cm) berada di atas, lalu dua setengah lingkaran kecil (r = 7 cm) dipotong dari bawahnya. Hitunglah (a) luas arsiran dan (b) keliling arsiran! | 28 cm × 14 cmの長方形内に「三重弧」の着色域がある。大きな半円（R = 14 cm）が上にあり、小さな半円2つ（r = 7 cm）が下から切り取られる。(a) 面積と(b) 周長を求めなさい！ | [14, 28, 7] | [14, 2, 28, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 83 | `k7KnownV` | ja |  r = 10 cm, sudut sektor = 90° = ¼ lingkaran penuh. |  r = 10 cm、扇形の角度 = 90° = 1/4円。 | [10, 90] | [1, 10, 4, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 80 | `k7Title` | ja | ✏️ Kasus 7 — Sektor Siku-Siku (¼ Lingkaran) r = 10 cm (π = 3,14) | ✏️ ケース7 — 直角扇形（1/4円）r = 10 cm（π = 3.14） | [10, 3.14, 7] | [1, 10, 3.14, 4, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx) | 171 | `s3q` | ja | Dalam sebuah kotak terdapat 5 bola merah, 3 bola biru, dan 2 bola kuning. Sebuah bola diambil secara acak, lalu dikembalikan. Percobaan dilakukan sebanyak 300 kali. Hitunglah frekuensi harapan terambilnya:a. Bola merahb. Bola biruc. Bola yang bukan bola kuning | 箱の中に赤玉5個、青玉3個、黄玉2個が入っている。玉を1個ランダムに取り出し、元に戻す。この試行を300回行う。次の玉が出る期待度数を求めよ：a. 赤玉b. 青玉c. 黄玉ではない玉 | [2, 3, 300, 5] | [1, 2, 3, 300, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx) | 252 | `ringkasan[].isi` | en | Digunakan di industri: prediksi kerusakan mesin (1000 produk, P(cacat)=0.02, Fh=20 produk cacat). Di kesehatan: prediksi efek samping obat dari 500 pasien. | Used in industry: predicting machine defects (1000 products, P(defect)=0.02, Fh=20 defective products). In healthcare: predicting drug side effects among 500 patients. | [0, 1000, 2, 20, 500] | [0.02, 1000, 20, 500] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx) | 252 | `ringkasan[].isi` | ja | Digunakan di industri: prediksi kerusakan mesin (1000 produk, P(cacat)=0.02, Fh=20 produk cacat). Di kesehatan: prediksi efek samping obat dari 500 pasien. | 産業界での活用：機械の不良品予測（製品1000個、P(不良)=0.02、Fh=不良品20個）。医療分野：500人の患者における薬の副作用予測。 | [0, 1000, 2, 20, 500] | [0.02, 1000, 20, 500] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx) | 78 | `p1` | ja | Saat kamu melempar dadu, ada dua kemungkinan besar: muncul angka 6, atau tidak muncul angka 6. Nah, &quot;tidak muncul angka 6&quot; inilah yang disebut komplemen dari kejadian &quot;muncul angka 6&quot;. Komplemen kejadian A adalah himpunan semua kejadian dalam ruang sampel yang bukan merupakan anggota A. Dilambangkan dengan A' atau \bar{A}. | サイコロを投げるとき、大きく2つの可能性がある：6の目が出る、または6の目が出ない。この「6の目が出ない」ことこそが、「6の目が出る」という事象の余事象と呼ばれる。事象Aの余事象とは、標本空間の中でAに属さないすべての事象の集合である。A'または\bar{A}と表す。 | [6] | [2, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx) | 204 | `s3step1sub` | en | Jumlah 12 hanya dari (6,6) → 1 pasangan | A sum of 12 only comes from (6,6) → 1 pair | [1, 12, 6.6] | [1, 12, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx) | 192 | `s2q` | ja | Dalam sebuah kotak terdapat 4 bola merah, 5 bola putih, dan 3 bola hitam. Sebuah bola diambil secara acak. Tentukan peluang terambil:a. Bola bukan bola merahb. Bola bukan bola hitam | 箱の中に赤玉4個、白玉5個、黒玉3個が入っている。玉を1個ランダムに取り出す。次の玉が出る確率を求めよ：a. 赤玉ではない玉b. 黒玉ではない玉 | [3, 4, 5] | [1, 3, 4, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx) | 201 | `s3q` | ja | Dua buah dadu dilempar bersama-sama. Gunakan konsep komplemen untuk menentukan peluang bahwa jumlah kedua mata dadu bukan 12. Kemudian, jika dadu dilempar 360 kali, berapa kali diharapkan jumlah mata dadu bukan 12? | 2つのサイコロを同時に投げる。余事象の考え方を使って、2つのサイコロの目の合計が12ではない確率を求めよ。さらに、このサイコロ投げを360回行うとき、合計が12ではない回数は何回と期待されるか？ | [12, 360] | [12, 2, 360] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx) | 204 | `s3step1sub` | ja | Jumlah 12 hanya dari (6,6) → 1 pasangan | 合計が12になるのは(6,6)のみ → 1通り | [1, 12, 6.6] | [1, 12, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx) | 202 | `s3total` | ja | • Dua dadu: n(S) = 6 \times 6 = 36 | • 2つのサイコロ：n(S) = 6 \times 6 = 36 | [36, 6] | [2, 36, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangEmpirikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangEmpirikPage.tsx) | 80 | `s3q` | ja | Sebuah pabrik memproduksi 1.200 lampu. Setelah diuji kualitas, diperoleh data sebagai berikut: 36 lampu cacat, sisanya tidak cacat. a. Tentukan peluang empirik terambilnya lampu cacat jika diambil satu secara acak. b. Tentukan peluang empirik terambilnya lampu tidak cacat. c. Jika pabrik memproduksi 5.000 lampu lagi, berapa lampu yang diperkirakan cacat? | ある工場が電球を1,200個生産しました。品質検査後、36個が不良品で残りは良品でした。 a. 1個をランダムに取り出したとき、不良品を取り出す経験的確率を求めなさい。 b. 良品を取り出す経験的確率を求めなさい。 c. この工場がさらに5,000個生産する場合、不良品は何個と予測されますか？ | [1200, 36, 5000] | [1, 1200, 36, 5000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx) | 91 | `s3aPairs` | en | (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6 pasangan | (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6 pairs | [1.6, 2.5, 3.4, 4.3, 5.2, 6, 6.1] | [1, 2, 3, 4, 5, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx) | 93 | `s3bPairs` | en | (1,3),(2,4),(3,5),(4,6),(3,1),(4,2),(5,3),(6,4) → 8 pasangan | (1,3),(2,4),(3,5),(4,6),(3,1),(4,2),(5,3),(6,4) → 8 pairs | [1.3, 2.4, 3.1, 3.5, 4.2, 4.6, 5.3, 6.4, 8] | [1, 2, 3, 4, 5, 6, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx) | 81 | `s2q` | ja | Dari satu set kartu bridge (52 kartu), diambil satu kartu secara acak. Tentukan peluang terambil: a. Kartu As (A) b. Kartu berwarna merah c. Kartu King berwarna hitam | 52枚の標準的なトランプから1枚をランダムに引きます。次の確率を求めなさい： a. エースを引く b. 赤いカードを引く c. 黒のキングを引く | [52] | [1, 52] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx) | 91 | `s3aPairs` | ja | (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6 pasangan | (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6組 | [1.6, 2.5, 3.4, 4.3, 5.2, 6, 6.1] | [1, 2, 3, 4, 5, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx) | 92 | `s3b` | ja | b. Selisih = 2 (\|dadu1 − dadu2\| = 2): | b. 差 = 2（\|サイコロ1 − サイコロ2\| = 2）： | [2] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx) | 93 | `s3bPairs` | ja | (1,3),(2,4),(3,5),(4,6),(3,1),(4,2),(5,3),(6,4) → 8 pasangan | (1,3),(2,4),(3,5),(4,6),(3,1),(4,2),(5,3),(6,4) → 8組 | [1.3, 2.4, 3.1, 3.5, 4.2, 4.6, 5.3, 6.4, 8] | [1, 2, 3, 4, 5, 6, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx) | 88 | `s3q` | ja | Dua buah dadu dilempar bersama-sama satu kali. Tentukan peluang: a. Jumlah kedua mata dadu sama dengan 7 b. Selisih kedua mata dadu sama dengan 2 c. Jumlah kedua mata dadu merupakan bilangan prima | 2つのサイコロを同時に1回投げます。次の確率を求めなさい： a. 2つのサイコロの和が7になる b. 2つのサイコロの差が2になる c. 2つのサイコロの和が素数になる | [2, 7] | [1, 2, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx) | 54 | `c2Result` | ja | Dibutuhkan 14 pekerja ⌈13,3⌉ = 14. | 14人の作業員が必要（切り上げ）。 | [13.3, 14] | [14] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 79 | `c2Check` | ja | Cek: 12 + 16 + 20 = 48 cm ✓ | 確認：12 + 16 + 20 = 48cm ✓ | [12, 16, 20, 48] | [12, 16, 20] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 76 | `c2Q` | ja | Panjang sisi-sisi segitiga berbanding 3 : 4 : 5. Jika keliling segitiga adalah 48 cm, tentukan panjang setiap sisi! | 三角形の各辺の比は 3：4：5 です。周の長さが48cmのとき、各辺の長さを求めなさい。 | [3, 4, 48, 5] | [3, 4, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 75 | `c2Title` | ja | Contoh 2 – Perbandingan Tiga Besaran | 例題2 – 3量の比 | [2] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 85 | `c3Q` | ja | Uang Dafa dan Rani berbanding 3 : 5. Jika selisih uang mereka adalah Rp24.000, tentukan (a) uang masing-masing, dan (b) jumlah uang keduanya. | Reedのお金とBlairのお金の比は 3：5 です。2人の金額の差が$24のとき、(a) それぞれの金額と、(b) 合計金額を求めなさい。 | [24000, 3, 5] | [2, 24, 3, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 58 | `c1Q` | ja | Sebuah peta memiliki skala 1 : 2.000.000. Jarak antara Kota A dan Kota B pada peta tersebut adalah 4,5 cm. Berapa jarak sebenarnya kedua kota itu dalam kilometer? | 地図の縮尺が1：2,000,000です。地図上で都市Aと都市Bの距離は4.5cmです。実際の2都市間の距離は何kmですか？ | [1, 2000000, 4.5] | [1, 2, 2000000, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 61 | `c2Q` | ja | Jarak antara dua desa adalah 15 km. Pada sebuah denah wilayah, jarak keduanya digambar sepanjang 3 cm. (a) Tentukan skala denah tersebut! (b) Jika ada desa ketiga yang jaraknya 24 km dari desa pertama, berapa cm jaraknya di denah? | 2つの村の実際の距離は15kmです。地域の地図ではこの距離が3cmで描かれています。 (a) 地図の縮尺を求めなさい。 (b) 3番目の村が1番目の村から24km離れているとき、地図上では何cmですか？ | [15, 24, 3] | [1, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 65 | `c2ResultB` | ja | Jarak di denah = 4,8 cm | 地図上の距離 = 4.8cm | [4.8] | [4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 63 | `c2UbahB` | ja | 24 km = 2.400.000 cm | 24km = 2,400,000cm | [24, 2400000] | [2400] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 67 | `c3Q` | ja | Sebuah denah lapangan olahraga menggunakan skala 1 : 1.000. Pada denah, luas lapangan tersebut adalah 12 cm². (a) Tentukan luas lapangan sebenarnya dalam m²! (b) Jika lapangan futsal di sebelahnya luasnya 800 m², berapa cm² luasnya di denah? | スポーツグラウンドの間取り図の縮尺は1：1,000です。図面上のグラウンドの面積は12cm²です。 (a) 実際のグラウンドの面積をm²で求めなさい。 (b) 隣接するフットサルコートの実際の面積が800m²のとき、図面上では何cm²ですか？ | [1, 1000, 12, 800] | [1, 1000, 12] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 70 | `c3ResultA` | ja | Luas lapangan sebenarnya = 1.200 m² | 実際のグラウンド面積 = 1,200m² | [1200] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 33 | `readNote` | ja | Cara Baca Skala 1 : 500.000: Setiap 1 cm di peta = 500.000 cm (atau 5 km) di dunia nyata. Semakin besar angka di belakang titik dua, semakin kecil gambar dibanding aslinya. | 縮尺 1：500,000 の読み方：地図上の1cm = 実際の500,000cm（= 5km）。コロンの後の数字が大きいほど、図は実物より小さくなります。 | [1, 5, 500000] | [1, 500, 500000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx) | 87 | `c1_sb2` | ja | Baca dua titik ujung garis dari grafik: P(−3, −4) dan Q(1, 4), lalu substitusi ke rumus gradien: | グラフから2つの端点P(−3, −4)とQ(1, 4)を読み取り、傾きの公式に代入： | [-3, -4, 1, 4] | [-3, -4, 1, 2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx) | 105 | `c4_ans` | ja | ✅ k = −2, sehingga P(−2, 0). Ketiga titik terletak pada garis y = x + 2 dengan gradien m = 1. | ✅ k = −2 なので P(−2, 0)。3点すべてが傾きm = 1の直線y = x + 2上にある。 | [-2, 0, 1, 2] | [-2, 0, 1, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx) | 101 | `c4_l1` | ja | Langkah 1 — Hitung gradien QR (titik yang sudah diketahui nilai pastinya): | ステップ1 — QRの傾きを求める（値がわかっている2点）： | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx) | 104 | `c4_ver` | ja | Verifikasi — Ketiga titik P(−2, 0), Q(0, 2), R(2, 4) pada garis y = x + 2: | 確認 — 3点P(−2, 0)、Q(0, 2)、R(2, 4)がy = x + 2上にある： | [-2, 0, 2, 4] | [-2, 0, 2, 3, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx) | 212 | `c2_l1_title` | ja | 📍 Langkah 1 — Baca Dua Titik dari Grafik | 📍 ステップ 1 — グラフから 2 点を読み取る | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx) | 69 | `titikpotong_p1` | ja | Cara termudah menggambar garis lurus adalah dengan mencari dua titik istimewa: titik potong sumbu-x (saat y = 0) dan titik potong sumbu-y (saat x = 0). Hubungkan dua titik ini, dan kamu mendapat grafik yang akurat! | 直線を描く最も簡単な方法は、2つの特別な点を見つけること：x切片（y=0のとき）とy切片（x=0のとき）。この2点を結べば正確なグラフが得られる！ | [0] | [0, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx) | 123 | `sej_p1` | ja | Gradien (m) menunjukkan kecuraman atau laju kenaikan sebuah garis — setiap bergerak 1 satuan ke kanan, garis naik sebesar m. Jika dua garis punya gradien sama, keduanya naik dan turun dengan laju yang identik. | 傾き(m)は直線の急さまたは上昇率を示す — 右に1単位移動するたびに、直線はm分だけ上昇する。2本の直線が同じ傾きを持てば、両方とも同じ速度で上下する。 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx) | 124 | `sej_p2` | ja | Bayangkan dua mobil yang melaju dengan kecepatan yang sama: mobil A selalu 5 km di depan mobil B. Mobil B tidak akan pernah menyalip A karena lajunya sama persis. Begitu juga dua garis sejajar — jarak vertikal antara keduanya selalu konstan, sehingga tidak pernah bertemu. | 2台の車が同じ速度で走るとき、車Aは常に車Bの5km前にいる。速度がまったく同じなので車BはAに追いつけない。平行な2直線も同じ — 縦の距離は常に一定で、交わることはない。 | [5] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx) | 135 | `tek_sub` | ja | Perkalian kedua gradien sama dengan −1 | 2つの傾きの積が−1に等しい | [-1] | [-1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx) | 97 | `vis_tabel_rows[][]` | ja | Satu titik (sudut ≠ 90°) | 1点（90°以外の角） | [90] | [1, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx) | 129 | `c2_p1` | en | Gunakan rumus skenario 2: y − y₁ = m(x − x₁) | Use Scenario 1 formula: y − y₁ = m(x − x₁) | [2] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx) | 176 | `sk2_exLabel` | en | Melalui A(0,1) dan B(3,7) | Through A(0,1) and B(3,7) | [0.1, 3.7] | [0, 1, 3, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx) | 129 | `c2_p1` | ja | Gunakan rumus skenario 2: y − y₁ = m(x − x₁) | シナリオ1の公式を使用: y − y₁ = m(x − x₁) | [2] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx) | 133 | `c3_cara1` | ja | 📐 Cara 1 — Rumus Dua Titik Langsung | 📐 方法1 — 2点公式を直接使用 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx) | 135 | `c3_l1` | ja | Langkah 1 — Substitusi ke Rumus Dua Titik | ステップ1 — 2点公式に代入 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx) | 120 | `iv3_l1` | ja | Langkah 1 — Substitusi ke Rumus Dua Titik | ステップ1 — 2点公式に代入 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx) | 176 | `sk2_exLabel` | ja | Melalui A(0,1) dan B(3,7) | A(0,1)とB(3,7)を通る | [0.1, 3.7] | [0, 1, 3, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx) | 61 | `c2Q` | ja | Usia Ayah sekarang adalah 3 kali usia Jordan. Selisih usia mereka adalah 28 tahun. Berapakah usia Ayah dan Jordan sekarang? | 父の年齢はJordanの年齢の3倍である。2人の年齢の差は28歳である。父とJordanの現在の年齢を求めなさい。 | [28, 3] | [2, 28, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx) | 23 | `introBox` | ja | Contoh: "Usia Alex 5 tahun lebih tua dari Sam. Jika jumlah usia mereka 35 tahun, berapa usia masing-masing?" → Ini bisa diubah menjadi persamaan dan diselesaikan! | 例：「Alexの年齢はSamより5歳上。2人の年齢の合計が35歳なら、それぞれ何歳？」→ これを方程式にして解くことができます！ | [35, 5] | [2, 35, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 49 | `c1Q` | ja | Sebuah lift memiliki kapasitas maksimum 480 kg. Berat rata-rata satu orang dewasa adalah 60 kg. Paling banyak berapa orang yang dapat masuk lift sekaligus? | あるエレベーターの最大積載量は480kgです。大人1人の平均体重は60kgとします。最大で何人が同時にエレベーターに乗れますか？ | [480, 60] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 57 | `c2Q` | ja | Nilai ujian matematika Morgan pada tiga ulangan pertama adalah 70, 75, dan 80. Berapa nilai minimal yang harus Morgan dapatkan pada ulangan keempat agar rata-ratanya tidak kurang dari 78? | Morganの数学のテスト3回分の点数は70点、75点、80点でした。4回目のテストで何点以上取れば、平均点が78点以上になりますか？ | [70, 75, 78, 80] | [3, 4, 70, 75, 78, 80] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 64 | `c3Q` | ja | Seorang pedagang memiliki modal Rp150.000. Ia ingin membeli dua jenis barang: barang A seharga Rp8.000 per unit dan barang B seharga Rp5.000 per unit. Ia sudah pasti membeli 10 unit barang B. Berapa paling banyak unit barang A yang dapat ia beli tanpa melebihi modalnya? | ある商人の予算は$150です。2種類の商品を購入したいと思っています：商品Aは1個$8、商品Bは1個$5です。商品Bはすでに10個買うことが決まっています。予算を超えずに商品Aを最大何個買えますか？ | [10, 150000, 5000, 8000] | [1, 10, 150, 2, 5, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 21 | `introBox` | ja | Contoh situasi: "Kamu hanya punya uang Rp50.000. Kamu ingin membeli beberapa buku seharga Rp12.000 per buku. Paling banyak berapa buku yang bisa kamu beli?" → Ini adalah masalah PtLSV! | 例：「あなたは$50しか持っていません。1冊$12の本を何冊か買いたいです。最大で何冊買えますか？」→ これが一元一次不等式の問題です！ | [12000, 50000] | [1, 12, 50] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPtLSVPage.tsx) | 74 | `c3a` | ja | "Dua kali suatu bilangan dikurangi 3 tidak lebih dari 11" | 「ある数の2倍から3を引いた値が11以下」 | [11, 3] | [11, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx) | 104 | `ex2Step1` | ja | Langkah 1 — Nyatakan setiap suku sebagai perkalian dua bilangan berurutan: | ステップ1 — 各項を連続する2数の積として表す： | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx) | 119 | `ex3Pattern` | ja | Pola: faktor pertama = n, faktor kedua = (n+2) | パターン：第1の因数 = n、第2の因数 = (n+2) | [2] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx) | 114 | `ex3Step1` | ja | Langkah 1 — Nyatakan setiap pola sebagai perkalian dua bilangan: | ステップ1 — 各パターンを2数の積として表す： | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx) | 29 | `polaDescs[]` | ja | Setiap suku = jumlah dua suku sebelumnya. Dimulai dari 1, 1. | 各項 = 前の2項の和。1, 1から始まる。 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 64 | `ex2Problem` | ja | Suku ke-5 suatu barisan aritmetika adalah 23 dan suku ke-9 adalah 39. Tentukan suku pertama dan bedanya, lalu hitung suku ke-15! | ある等差数列の第5項は23、第9項は39である。第1項と公差を求め、第15項を計算しなさい！ | [15, 23, 39, 5, 9] | [1, 15, 23, 39, 5, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 102 | `ex2bProblem` | ja | Jumlah 10 suku pertama suatu barisan aritmetika adalah 155 dan suku pertamanya adalah 5. Tentukan beda dan suku ke-10! | ある等差数列の最初の10項の和は155で、第1項は5である。公差と第10項を求めなさい！ | [10, 155, 5] | [1, 10, 155, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 78 | `ex3Ans` | ja | ✅ Baris pertama: 18 kursi. Baris ke-25: 66 kursi | ✅ 1列目：18席。25列目：66席 | [18, 25, 66] | [1, 18, 25, 66] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 71 | `ex3Problem` | ja | Sebuah bioskop memiliki susunan kursi seperti barisan aritmetika. Diketahui baris ke-10 berisi 36 kursi, dan setiap baris bertambah 2 kursi dari baris sebelumnya.a) Berapa banyak kursi di baris pertama?b) Berapa banyak kursi di baris ke-25? | 映画館の座席が等差数列のように配置されている。10列目に36席あり、各列は前の列より2席増えることが分かっている。a) 1列目の座席数は？b) 25列目の座席数は？ | [10, 2, 25, 36] | [1, 10, 2, 25, 36] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 96 | `formula2Label` | ja | Rumus 2 (jika diketahui suku pertama dan suku terakhir): | 公式2（第1項と最終項が分かる場合）： | [2] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 54 | `howToUseBody` | ja | Rumus U_n = a + (n-1) \cdot b dapat digunakan untuk menentukan nilai suku manapun dalam suatu barisan aritmetika — suku ke-5, ke-20, bahkan ke-100 — tanpa perlu menghitung satu per satu, asalkan dua hal berikut diketahui: | 公式 U_n = a + (n-1) \cdot b を使えば、等差数列のどの項の値も求められます — 第5項、第20項、第100項でも、1つずつ足さずに、次の2つが分かれば： | [1, 100, 20, 5] | [1, 100, 2, 20, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 20 | `introBody` | ja | Pernahkah kamu memperhatikan susunan kursi di bioskop atau teater? Baris pertama mungkin berisi 10 kursi, baris kedua 13 kursi, baris ketiga 16 kursi, dan seterusnya. Setiap baris bertambah 3 kursi secara konsisten! Inilah contoh nyata dari barisan aritmetika — barisan bilangan dengan beda (selisih) yang sama antar suku berurutan. Dengan rumus barisan aritmetika, pengelola gedung bisa langsung menghitung jumlah kursi di baris manapun tanpa menghitung satu per satu. | 映画館や劇場の座席配置を見たことがありますか？1列目に10席、2列目に13席、3列目に16席と続いていくことがあります。各列が一定の3席ずつ増えています！これが等差数列の実例です — 連続する項の間に同じ差（公差）がある数の列。等差数列の公式を使えば、場内担当者はすべての座席を1つずつ数えることなく、どの列の座席数もすぐに計算できます。 | [10, 13, 16, 3] | [1, 10, 13, 16, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 62 | `ex2Ans` | en | a = 2, r = 3, U_{10} = 39{.}366 | a = 2, r = 3, U_{10} = 39{,}366 | [10, 2, 3, 366, 39] | [10, 2, 3, 39366] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 72 | `ex3Step2Table[].val` | en | 500 × 1.2⁸ ≈ 2.149,9 | 500 × 1.2⁸ ≈ 2,149.9 | [1, 2, 2149.9, 500] | [1.2, 2149.9, 500] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 102 | `ex3bStep1` | en | Barisan ketinggian pantulan: 12, 9, 6.75, ... | Bounce height sequence: 12, 9, 6.75, ... | [12, 6, 75, 9] | [12, 6.75, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 62 | `ex2Ans` | ja | a = 2, r = 3, U_{10} = 39{.}366 | a = 2、r = 3、U_{10} = 39{,}366 | [10, 2, 3, 366, 39] | [10, 2, 3, 39366] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 58 | `ex2Problem` | ja | Suku ke-3 suatu barisan geometri adalah 18 dan suku ke-6 adalah 486. Tentukan suku pertama (a) dan rasio (r), lalu hitung suku ke-10! | ある等比数列の第3項は18、第6項は486である。第1項(a)と公比(r)を求め、第10項を計算しなさい！ | [10, 18, 3, 486, 6] | [1, 10, 18, 3, 486, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 92 | `ex2bProblem` | ja | Jumlah 5 suku pertama suatu deret geometri adalah 62 dan suku pertamanya adalah 2. Tentukan rasio dan suku ke-5! | ある等比級数の最初の5項の和は62で、第1項は2である。公比と第5項を求めなさい！ | [2, 5, 62] | [1, 2, 5, 62] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 64 | `ex3Problem` | ja | Sebuah pabrik memproduksi 500 unit pada bulan pertama. Karena peningkatan kapasitas, produksi meningkat sebesar 20% setiap bulan.a) Berapa produksi pada bulan ke-6?b) Pada bulan ke berapa produksi pertama kali melampaui 2.000 unit? | 工場が1ヶ月目に500個を生産する。設備増強により毎月20%増加する。a) 6ヶ月目の生産量は？b) 何ヶ月目に初めて2,000個を超えるか？ | [20, 2000, 500, 6] | [1, 20, 2000, 500, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 72 | `ex3Step2Table[].val` | ja | 500 × 1.2⁸ ≈ 2.149,9 | 500 × 1.2⁸ ≈ 2,149.9 | [1, 2, 2149.9, 500] | [1.2, 2149.9, 500] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 102 | `ex3bStep1` | ja | Barisan ketinggian pantulan: 12, 9, 6.75, ... | バウンドの高さの数列：12, 9, 6.75, ... | [12, 6, 75, 9] | [12, 6.75, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 78 | `seriesSummaryBody` | ja | Deret geometri adalah jumlah n suku pertama barisan geometri. Rumusnya berbeda untuk r \neq 1 (ada dua varian bergantung nilai r) dan untuk r = 1. | 等比級数は等比数列の最初のn項の和。r \neq 1の場合（rの値によって2種類）とr = 1の場合で公式が異なります。 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 59 | `step1` | ja | Langkah 1 — Buat dua persamaan: | ステップ1 — 2つの方程式を立てる： | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx) | 40 | `fibonacci.desc` | ja | Setiap suku = jumlah dua suku sebelumnya. Dimulai dari 1, 1. | 各項 = 前の2項の和。1, 1から始まる。 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx) | 33 | `pascal.desc` | ja | Setiap bilangan = jumlah dua bilangan di atasnya. Baris dimulai dan diakhiri angka 1. | 各数 = 上の2つの数の和。各行は1で始まり1で終わる。 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx) | 89 | `koresp_visual_yes_note` | ja | n(A)=n(B)=3, tiap elemen berpasangan tepat satu | n(A)=n(B)=3、各要素が正確に1つと対応 | [3] | [1, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx) | 13 | `c2_steps[]` | en | Hitung: f(5) = 3(5) + 7 = 15 + 7 = 22 (ribuan) = Rp 22.000,00 ✓ | Calculate: f(5) = 3(5) + 7 = 15 + 7 = 22 (thousands) = $22 ✓ | [15, 22, 22000, 3, 5, 7] | [15, 22, 3, 5, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx) | 13 | `c2_steps[]` | ja | Hitung: f(5) = 3(5) + 7 = 15 + 7 = 22 (ribuan) = Rp 22.000,00 ✓ | 計算：f(5) = 3(5) + 7 = 15 + 7 = 22（千） = $22 ✓ | [15, 22, 22000, 3, 5, 7] | [15, 22, 3, 5, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx) | 122 | `c2Diagrams[].penj` | ja | x→2, y→2, z→2. Semua anggota domain menunjuk ke satu elemen kodomain yang sama (2). Ini disebut fungsi konstan — tetap sah sebagai fungsi karena setiap domain punya tepat satu pasangan ✓ | x→2, y→2, z→2。すべての定義域要素が同じ終域要素（2）を指します。これを定数関数と呼びます — 各定義域要素に正確に1つの対応があるため有効な関数です ✓ | [2] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/GarisBeratBagiTinggiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/GarisBeratBagiTinggiPage.tsx) | 103 | `ex1tip` | ja | 💡 Jika panjang total AM = AG + GM = 10 + 5 = 15 cm. Artinya G membagi AM sehingga bagian dari A dua kali lebih panjang. | 💡 AM の全長 = AG + GM = 10 + 5 = 15 cm。Gは A からの部分が2倍になるようにAMを分けます。 | [10, 15, 5] | [10, 15, 2, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/GarisBeratBagiTinggiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/GarisBeratBagiTinggiPage.tsx) | 54 | `medCountText` | ja | Setiap segitiga memiliki tepat 3 garis berat (satu dari setiap sudut). | 三角形には必ず3本の中線があります（各頂点から1本）。 | [3] | [1, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx) | 112 | `ex2q2` | ja | Jika biaya pengecatan Rp 50.000 per m², berapa total biaya untuk mengecat seluruh penampang jembatan tersebut? | ペンキの費用が1 m²あたり50,000円の場合、橋の断面全体を塗るのにかかる費用はいくらですか？ | [50000] | [1, 50000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx) | 95 | `s4tipText` | en | Setiap naik 1 tingkat satuan panjang → dikali 10. Tapi satuan luas berarti dikuadratkan → naik 1 tingkat = dikali 100. | Each step up in length unit → multiply by 10. But area units are squared → one step up = multiply by 100. | [1, 10, 100] | [10, 100] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx) | 97 | `ex1q` | ja | Sebuah segitiga siku-siku ABC memiliki dua kaki (sisi siku-siku) sepanjang AC = 6 cm dan BC = 8 cm. | 直角三角形ABCは2つの直角辺AC = 6 cm、BC = 8 cm を持ちます。 | [6, 8] | [2, 6, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx) | 106 | `ex2q2` | ja | Jika harga cat dinding Rp 12.000 per cm², berapakah biaya mengecat seluruh permukaan segitiga tersebut? | ペンキの費用が1 cm²あたり12,000円の場合、三角形全体を塗るのにかかる費用はいくらですか？ | [12000] | [1, 12000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx) | 95 | `s4tipText` | ja | Setiap naik 1 tingkat satuan panjang → dikali 10. Tapi satuan luas berarti dikuadratkan → naik 1 tingkat = dikali 100. | 長さの単位が1段階上がるごとに×10。でも面積の単位は2乗なので——1段階上がると×100になります。 | [1, 10, 100] | [-1, 1, 10, 100, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 29 | `introTip` | ja | SPLDV = Sistem Persamaan Linear Dua Variabel. Kata "linear" berarti pangkat tertinggi variabelnya adalah 1. Kata "dua variabel" berarti ada dua besaran yang tidak diketahui (biasanya x dan y). | 連立方程式 = 2変数の連立一次方程式。「一次」は各変数の最高次数が1であることを意味します。「2変数」は未知数が2つあること（通常xとy）を意味します。 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 31 | `pldvSummaryDesc` | ja | PLDV (Persamaan Linear Dua Variabel) adalah persamaan yang memiliki tepat dua variabel dan pangkat tertinggi setiap variabelnya adalah 1. Bentuk umumnya adalah ax + by = c dengan a, b ≠ 0. Satu persamaan linear dua variabel memiliki tak hingga banyak solusi karena kita bisa memasangkan nilai x apa saja dengan y yang sesuai. | 2変数の一次方程式は、各変数の次数が1の方程式で、標準形はax + by = c（a, b ≠ 0）です。xの値を何にでも設定できるため、1本の方程式には無数の解があります。 | [0, 1] | [0, 1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 19 | `secPLDV` | ja | 📘 Sub-Bab 1: PLDV — Satu Persamaan, Dua Variabel | 📘 第1節：一次方程式 — 1本の式、2つの変数 | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeCampuranPage.tsx) | 70 | `q3` | ja | Juno membeli 3 kg beras dan 2 kg gula seharga $14. Remy membeli 4 kg beras dan 5 kg gula seharga $24,50. Tentukan harga per kg beras dan gula menggunakan metode campuran! | Junoは米3kgと砂糖2kgを$14で買いました。Remyは米4kgと砂糖5kgを$24.50で買いました。組み合わせ法を使って米と砂糖の1kgあたりの価格を求めてください！ | [14, 2, 24.5, 3, 4, 5] | [14, 24.5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 81 | `q3Answer` | en | 🔑 Harga 1 kg mangga: $16.80 \| Harga 1 kg jeruk: $10.80 | 🔑 Price per kg of mango: $16.80 \| Price per kg of orange: $10.80 | [1, 10, 16, 80] | [10.8, 16.8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 73 | `q3L2Note` | en | Bagi P1 dengan 2 dan P2 tetap: | Divide Eq 1 by 2 and keep Eq 2: | [2] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 68 | `q3` | ja | Seorang pedagang menjual dua jenis buah: mangga dan jeruk. Pada hari pertama ia menjual 4 kg mangga dan 6 kg jeruk dan mendapat $132. Pada hari kedua ia menjual 3 kg mangga dan 2 kg jeruk dengan pendapatan $72. Tentukan harga per kilogram masing-masing buah menggunakan metode eliminasi! | ある商人が2種類の果物（マンゴーとオレンジ）を販売しています。初日は4kgのマンゴーと6kgのオレンジを$132で売りました。2日目は3kgのマンゴーと2kgのオレンジを$72で売りました。加減法を使って各果物の1kgあたりの価格を求めてください！ | [132, 2, 3, 4, 6, 72] | [132, 2, 72] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 81 | `q3Answer` | ja | 🔑 Harga 1 kg mangga: $16.80 \| Harga 1 kg jeruk: $10.80 | 🔑 マンゴー1kg：$16.80 \| オレンジ1kg：$10.80 | [1, 10, 16, 80] | [10.8, 16.8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 73 | `q3L2Note` | ja | Bagi P1 dengan 2 dan P2 tetap: | 式1を2で割り、式2はそのまま： | [2] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeGrafikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeGrafikPage.tsx) | 32 | `summaryDesc` | ja | Kunci metode grafik adalah menemukan dua titik yang berada di setiap garis, lalu menyambungkannya. Cara paling mudah: cari titik potong dengan sumbu-x (saat y = 0) dan titik potong dengan sumbu-y (saat x = 0). | グラフ法のカギは各直線上の2点を見つけてつなぐこと。最も簡単：x軸との交点(y=0のとき)とy軸との交点(x=0のとき)。 | [0] | [0, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx) | 40 | `step4Desc` | ja | Substitusikan nilai yang ditemukan ke ekspresi dari Langkah 1 untuk mendapatkan variabel kedua. Verifikasi ke kedua persamaan! | 求めた値をステップ1の式に代入して2番目の変数を求めます。両方の方程式で確認しましょう！ | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/ModelSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/ModelSPLDVPage.tsx) | 65 | `q2Problem` | ja | Umur Theo sekarang adalah 3 tahun lebih tua dari Nora. Jika jumlah umur mereka berdua adalah 27 tahun, buatlah model SPLDV dari permasalahan ini! | Theoの年齢はNoraより3歳年上です。2人の年齢の和が27歳のとき、この問題の連立方程式モデルを作りましょう！ | [27, 3] | [2, 27, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 62 | `q1Answer` | en | Harga 1 kg apel adalah $11.20 dan harga 1 kg jeruk adalah $10.20. | Price of 1 kg apples: $11.20 and price of 1 kg oranges: $10.20. | [1, 10, 11, 20] | [1, 10.2, 11.2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 62 | `q1Answer` | ja | Harga 1 kg apel adalah $11.20 dan harga 1 kg jeruk adalah $10.20. | リンゴ1kgの価格：$11.20、オレンジ1kgの価格：$10.20。 | [1, 10, 11, 20] | [10.2, 11.2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 47 | `q1Problem` | ja | Seorang pelanggan membeli 3 kg apel dan 2 kg jeruk seharga $54. Di toko yang sama, pelanggan lain membeli 1 kg apel dan 4 kg jeruk seharga $52. Berapa harga 1 kg apel dan 1 kg jeruk masing-masing? | ある客がリンゴ3kgとオレンジ2kgを$54で買いました。同じ店で別の客がリンゴ1kgとオレンジ4kgを$52で買いました。リンゴとオレンジそれぞれ1kgの価格はいくら？ | [1, 2, 3, 4, 52, 54] | [52, 54] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 63 | `q2Problem` | ja | Lima tahun lalu, umur Mr. Wells adalah empat kali umur anaknya, Indie. Tiga tahun mendatang, jumlah umur keduanya akan menjadi 56 tahun. Berapakah umur Mr. Wells dan Indie saat ini? | 5年前、Mr. Wellsの年齢は子どものIndieの年齢の4倍でした。3年後、2人の年齢の和は56歳になります。Mr. WellsとIndieの現在の年齢はそれぞれいくつ？ | [56] | [2, 3, 4, 5, 56] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 92 | `q3L2Rel2` | ja | Dari hubungan panjang-lebar: "panjang = 3 lebih dari dua kali lebar" | 縦横の関係：「長さ = 幅の2倍 + 3」 | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 84 | `q3Problem` | ja | Sebuah kolam renang berbentuk persegi panjang memiliki keliling 54 meter. Panjangnya adalah 3 meter lebih dari dua kali lebarnya. Hitunglah luas kolam renang tersebut! | 長方形の形をしたプールの周囲の長さは54メートルです。長さは幅の2倍より3メートル長いです。プールの面積を求めなさい！ | [3, 54] | [2, 3, 54] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx) | 144 | `step3BLabel` | ja | Langkah 3 — Bagi dua kaum (n genap → langsung belah di tengah) | ステップ3 — 2つの半分に分ける（nが偶数 → ちょうど中央で分割） | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx) | 136 | `step3Label` | ja | Langkah 3 — Bagi dua kaum (Q₂ tidak masuk keduanya) | ステップ3 — 2つの半分に分ける（Q₂はどちらにも含めない） | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx) | 276 | `footerSubtitle` | ja | Karena keduanya membagi data menjadi dua bagian yang sama besar (50%–50%). | どちらもデータを等しい2つの部分（50%–50%）に分けるためです。 | [-50, 50] | [-50, 2, 50] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx) | 334 | `kesimpulan` | ja | Kuartil membagi data menjadi 4 kelompok yang sama besar dan menjadi dasar Box Plot — alat visualisasi statistik yang digunakan di seluruh dunia. Kuartil sangat berguna untuk mendeteksi outlier, menganalisis distribusi data, dan membandingkan dua kelompok data di bidang medis, keuangan, dan machine learning! | 四分位数はデータを4つの等しいグループに分け、世界中で使われている統計可視化ツールである箱ひげ図の基礎となります。四分位数は、外れ値の検出、データ分布の分析、医療・金融・機械学習の分野での2つのデータグループの比較に非常に役立ちます！ | [4] | [2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx) | 987 | `compareText` | ja |  Gaji 5 karyawan = 3, 3, 4, 5, 100 juta. Rata-rata = 23 juta (tidak representatif karena terpengaruh angka 100). Median = 4 juta (lebih representatif). Modus = 3 juta (paling sering muncul). 🚀 |  5人の従業員の給料 = 300万、300万、400万、500万、1億円。平均 = 2300万円（1億円に引っ張られ、代表的ではない）。中央値 = 400万円（より代表的）。最頻値 = 300万円（最も多く出現）。🚀 | [100, 23, 3, 4, 5] | [100000000, 23000000, 3000000, 4000000, 5, 5000000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx) | 1062 | `illustExplainA` | ja |  (genap) → dua nilai tengah = ke-4 dan ke-5 | （偶数）→ 中央の2つの値 = 4番目と5番目 | [4, 5] | [2, 4, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx) | 1163 | `bisaLebih` | ja | Bisa lebih dari 1 | 2つ以上になることがある | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx) | 105 | `colDescRight` | ja | Tepat satu sudut = 90° — segitiga siku-siku | ちょうど1つの角が90° — 直角三角形 | [90] | [1, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx) | 36 | `obtuseDesc` | ja | Ada satu sudut lebih dari 90° | 1つの角が90°より大きい | [90] | [1, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx) | 32 | `rightDesc` | ja | Tepat satu sudut = 90° | ちょうど1つの角が90° | [90] | [1, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 42 | `c1Ans` | ja | ✅ Tangga mencapai ketinggian 8 m di tembok. (Ini triple 6-8-10 = kelipatan 3-4-5!) | ✅ はしごは壁の高さ8mまで届きます。（6-8-10は3-4-5の2倍のトリプル！） | [10, 3, 4, 5, 6, 8] | [10, 2, 3, 4, 5, 6, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 47 | `c2Ans` | ja | ✅ Pemain menempuh jarak sekitar 14,72 m saat berlari diagonal. | ✅ 選手は対角線上を約14.72m走ります。 | [14.72] | [14] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 43 | `c2Problem` | ja | Lapangan bulu tangkis berukuran panjang 13,4 m dan lebar 6,1 m. Seorang pemain berlari dari sudut ke sudut (diagonal). Berapa jarak yang ditempuhnya? (Bulatkan ke 2 desimal) | バドミントンコートの長さは13.4m、幅は6.1mです。選手が一方の角から対角の角まで（対角線上に）走ります。走った距離は何mですか？（小数第2位まで） | [13.4, 2, 6.1] | [13, 2, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 48 | `c3Problem` | ja | Dua kapal berangkat bersamaan dari pelabuhan A. Kapal P berlayar ke arah timur sejauh 36 km, lalu berbelok ke utara sejauh 15 km dan berhenti di titik B. Kapal Q berlayar lurus ke arah timur sejauh 20 km dan berhenti di titik C. Hitung jarak dari B ke C! | 2隻の船が港Aを同時に出発します。船Pは東に36km進み、次に北に15km進んで点Bで止まります。船Qは真東に20km進んで点Cで止まります。BからCまでの距離を求めなさい！ | [15, 20, 36] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 21 | `sec_contoh3` | ja | ✏️ Contoh 3 — Jarak Dua Kapal di Laut (Sulit) | ✏️ 例題3 — 2隻の船の距離（発展） | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx) | 56 | `c3Ans2` | ja | m atau sekitar 11,40 m. | m、約11.40mです。 | [11.4] | [11] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx) | 79 | `c3Problem` | ja | Sebuah segitiga sama sisi ABC memiliki sisi 12 cm. Titik D adalah kaki tegak lurus dari A ke BC. Hitung panjang AD, lalu gunakan AD sebagai kaki segitiga 45-45-90 baru. Berapa hipotenusa segitiga baru itu? | 正三角形ABCの辺の長さは12cmです。点DはAからBCへ下ろした垂線の足です。ADの長さを求め、ADを新しい45-45-90三角形の直角辺として使います。新しい三角形の斜辺は何cmですか？ | [12, 45, 90] | [45, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx) | 82 | `c3Step2` | ja | Langkah 2: Segitiga baru 45-45-90 dengan kaki = AD = | ステップ2：直角辺 = AD = | [2, 45, 90] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx) | 24 | `sec_contoh3` | ja | ✏️ Contoh 3 — Gabungan Dua Segitiga Khusus (Sulit) | ✏️ 例題3 — 2つの特殊三角形の組み合わせ（発展） | [3] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx) | 46 | `primitiveDesc3` | ja | — ketiga anggotanya tidak punya faktor persekutuan selain 1 (FPB = 1). Ini membuktikan bahwa dunia triple Pythagoras sangat luas! | と呼ばれます — 3数の公約数が1のみ（GCD=1）。ピタゴラス数の世界の広さを証明しています！ | [1] | [1, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx) | 51 | `tableTip` | ja | 💡 Cara cepat: Lihat apakah dua kaki segitiga bisa dibagi bilangan yang sama. Jika hasil baginya cocok dengan tipe 1–5, langsung tahu sisi miringnya! | 💡 素早い方法：2辺が共通の約数を持つか確認する。商がタイプ1〜5と一致すれば、斜辺がすぐわかる！ | [1, 5] | [1, 2, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage.tsx) | 1843 | `$value` | ja | Jika faktor skala k = 3, maka luas bangun bayangan = 9× luas asli. Sering muncul di soal HOTS — jangan lupa kuadratkan k! | 拡大率 k = 3 のとき、像の面積は元の面積の9倍になります。HOTS問題でよく出るので、kを2乗するのを忘れずに！ | [3, 9] | [2, 3, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/RotasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/RotasiPage.tsx) | 1336 | `$value` | ja | Hafalkan saja satu rumus! Rotasi 270° berlawanan sama hasilnya dengan 90° searah: (x,y) → (y, −x). Hemat hapalan. | 公式を1つ覚えるだけで済みます！270°反時計回りの回転は90°時計回りと同じ結果になります：(x,y) → (y, −x)。覚える量を減らせます。 | [270, 90] | [1, 270, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1039 | `kompSoal` | en | Titik A(2,3) dikenai T_1\begin{pmatrix}3\\-1\end{pmatrix} lalu T_2\begin{pmatrix}-1\\4\end{pmatrix} | Point A(2,3) is translated by T_1\begin{pmatrix}3\\-1\end{pmatrix} then T_2\begin{pmatrix}-1\\4\end{pmatrix} | [-1, 2.3, 3, 4] | [-1, 2, 3, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1032 | `soalD` | en | Segitiga PQR dengan P(1,1), Q(4,1), R(2,4) ditranslasikan oleh T = \begin{pmatrix}-3\\-2\end{pmatrix}. Tentukan bayangan! | Triangle PQR with P(1,1), Q(4,1), R(2,4) is translated by T = \begin{pmatrix}-3\\-2\end{pmatrix}. Find the image! | [-2, -3, 1.1, 2.4, 4.1] | [-2, -3, 1, 2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1101 | `tips[].body` | en | T₁(3,−2) lalu T₂(−1,4) = T(3+(−1), −2+4) = T(2,2). Tidak perlu menghitung satu per satu! | T₁(3,−2) then T₂(−1,4) = T(3+(−1), −2+4) = T(2,2). No need to compute one by one! | [-1, -1.4, -2, 2.2, 3, 4] | [-1, -2, 2, 3, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1060 | `ex2soal` | ja | Garis 2x - y + 1 = 0 ditranslasikan dua kali berturut-turut oleh T_1\begin{pmatrix}3\\-2\end{pmatrix} kemudian T_2\begin{pmatrix}-1\\4\end{pmatrix}. Tentukan persamaan bayangan akhir garis tersebut! | 直線 2x - y + 1 = 0 を T_1\begin{pmatrix}3\\-2\end{pmatrix}、次に T_2\begin{pmatrix}-1\\4\end{pmatrix} で2回連続して平行移動する。最終的な像の方程式を求めなさい！ | [-1, -2, 0, 1, 3, 4] | [-1, -2, 0, 1, 2, 3, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1039 | `kompSoal` | ja | Titik A(2,3) dikenai T_1\begin{pmatrix}3\\-1\end{pmatrix} lalu T_2\begin{pmatrix}-1\\4\end{pmatrix} | 点 A(2,3) を T_1\begin{pmatrix}3\\-1\end{pmatrix}、次に T_2\begin{pmatrix}-1\\4\end{pmatrix} で平行移動する。 | [-1, 2.3, 3, 4] | [-1, 2, 3, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1032 | `soalD` | ja | Segitiga PQR dengan P(1,1), Q(4,1), R(2,4) ditranslasikan oleh T = \begin{pmatrix}-3\\-2\end{pmatrix}. Tentukan bayangan! | 三角形PQRで P(1,1),\, Q(4,1),\, R(2,4) を移動ベクトル T = \begin{pmatrix}-3\\-2\end{pmatrix} で平行移動した。像を求めなさい！ | [-2, -3, 1.1, 2.4, 4.1] | [-2, -3, 1, 2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1101 | `tips[].body` | ja | T₁(3,−2) lalu T₂(−1,4) = T(3+(−1), −2+4) = T(2,2). Tidak perlu menghitung satu per satu! | T₁(3,−2)の後T₂(−1,4) = T(3+(−1), −2+4) = T(2,2)。1つずつ計算しなくてOK！ | [-1, -1.4, -2, 2.2, 3, 4] | [-1, -2, 1, 2, 3, 4] |

### Contoh perbaikan ekstraksi angka

| Teks | Bahasa | Ekstraktor lama | Setelah perbaikan |
| --- | --- | --- | --- |
| `1.234,5` | id | [1234.5] | [1234.5] |
| `1,234.5` | en | [1234.5] | [1234.5] |
| `1,234.5` | ms-MY | [1234.5] | [1234.5] |
| `1,234.5` | ja | [1234.5] | [1234.5] |
| `1,234.5` | zh-CN | [1234.5] | [1234.5] |
| `1 234,5` | ru | [1234.5] | [1234.5] |
| `1.234` | id | [1234] | [1234] |
| `1,234` | en | [1234] | [1234] |
| `2, 3, 5, 7, 11, 13` | en | [2, 3, 5, 7, 11, 13] | [2, 3, 5, 7, 11, 13] |
| `4,638` | id | [4.638] | [4.638] |
| `4,638` | en | [4638] | [4638] |
| `S = \{1,2,3,4\}` | id | [123.4] | [1, 2, 3, 4] |
| `①②③` | en | [—] | [1, 2, 3] |
| `Rp1.234.500` | id | [234500] | [1234500] |
| `$1,234,500` | en | [1234500] | [1234500] |
| `300万` | ja | [—] | [3000000] |
| `1億2,345万` | ja | [—] | [123450000] |
| `1\,234{,}5` | ru | [1, 234, 5] | [1234.5] |
| `4,\underline{6}38` | id | [4, 6, 38] | [4.638] |
| `2nd decimal` | en | [—] | [2] |
| `中学1年` | ja | [—] | [—] |

False positive yang terkonfirmasi: ekstraktor lama memecah `4,\underline{6}38` menjadi tiga angka (`4`, `6`, `38`), bukan satu desimal (`4.638`); notasi KaTeX `1\,234{,}5` juga terpecah menjadi tiga angka. Perbaikan membuka markup KaTeX, membaca awalan mata wang `Rp`, menangani akhiran ordinal Inggris, dan mengecualikan angka label jenjang lintas bahasa.

### Contoh konkret untuk 5 file teratas

Nilai dipendekkan bila terlalu panjang. Hanya kelas nilai-beda dan ambigu-pemisah dihitung sebagai ketidaksesuaian angka.

#### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx)

| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |
| --- | --- | --- | --- | --- |
| `s1e1Q` | Tentukan hasil penjumlahan 14{,}7 + 8{,}39 | Find the sum of 14{,}7 + 8{,}39 | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[14.7, 8.39], en=[14, 39, 7, 8] |
| `s1e1ans` | ∴ Jadi, hasil penjumlahannya adalah 23{,}09 | ∴ Therefore, the sum is 23{,}09 | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[23.09], en=[23, 9] |
| `s1e1s1` | Langkah 1: Samakan digit desimal — 14{,}7 menjadi 14{,}70 (tambah 1 nol) | Step 1: Equalize decimal digits — 14{,}7 becomes 14{,}70 (add 1 zero) | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[1, 14.7], en=[1, 14, 7, 70] |
| `s2e1Q` | Kurangkan 23{,}5 - 7{,}25 | Subtract 23{,}5 - 7{,}25 | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[23.5, 7.25], en=[23, 25, 5, 7] |
| `s2e1ans` | ∴ Jadi, 23{,}5 - 7{,}25 = 16{,}25 | ∴ Therefore, 23{,}5 - 7{,}25 = 16{,}25 | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[16.25, 23.5, 7.25], en=[16, 23, 25, 5, 7] |

#### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx)

| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |
| --- | --- | --- | --- | --- |
| `ex1Q` | Hitunglah hasil perkalian 46,72 \times 10 | Calculate 46,72 \times 10 | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[10, 46.72], en=[10, 46, 72] |
| `ex2Q` | Hitunglah hasil perkalian 2,3467 \times 1000 | Calculate 2,3467 \times 1000 | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[1000, 2.3467], en=[1000, 2, 3467] |
| `ex4Q` | Hitunglah hasil perkalian 0,25 \times 0,87 | Calculate 0,25 \times 0,87 | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[0.25, 0.87], en=[0, 25, 87] |
| `ex5Q` | Hitunglah hasil perkalian 6,4 \times 1,38 | Calculate 6,4 \times 1,38 | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[1.38, 6.4], en=[1, 38, 4, 6] |
| `ex7Q` | Sebuah toko menjual apel seharga Rp15.500 per kg. Berapakah harga yang harus dibayar jika membeli 2,5 kg apel? | A shop sells apples for $15.50 per kg. How much must be paid for 2.5 kg of apples? | d — adaptasi-mata-uang (id vs en) | beda nilai setelah normalisasi: id=[15500, 2.5], en=[15.5, 2.5] |

#### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx)

| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |
| --- | --- | --- | --- | --- |
| `ex2Q` | Bulatkan 5,70642 sampai dua desimal | Round 5,70642 to two decimal places | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[5.70642], en=[5, 70642] |
| `ex2s1desc` | 5,7\underline{0}642 - Angka 0 adalah desimal ke-2 (yang akan dipertahankan) | 5,7\underline{0}642 — digit 0 is the 2nd decimal (the one to keep) | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[0, 2, 5.70642], en=[0, 2, 5, 70642] |
| `ex3Q` | Bulatkan 7,638524 sampai tiga desimal | Round 7,638524 to three decimal places | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[7.638524], en=[638524, 7] |
| `ex3s1desc` | 7,63\underline{8}524 - Angka 8 adalah desimal ke-3 (yang akan dipertahankan) | 7,63\underline{8}524 — digit 8 is the 3rd decimal (the one to keep) | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[3, 7.638524, 8], en=[3, 638524, 7, 8] |
| `ex4Q` | Bulatkan 111,48 ke bilangan satuan terdekat | Round 111,48 to the nearest whole number | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[111.48], en=[111, 48] |

#### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx)

| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |
| --- | --- | --- | --- | --- |
| `fig10` | Gambar 10. Dua layang-layang kongruen — ABCD ≅ PQRS jika semua sisi bersesuaian sama panjang dan semua sudut bersesuaian sama besar | Figure 10. Two congruent kites — ABCD ≅ PQRS if all corresponding sides and angles are equal | d — nilai-beda (id vs ja) | beda nilai setelah normalisasi: id=[10], ja=[10, 2] |
| `fig11` | Gambar 11. Dua lingkaran kongruen — jika jari-jarinya sama panjang (r₁ = r₂) | Figure 11. Two congruent circles — if their radii are equal (r₁ = r₂) | d — nilai-beda (id vs ja) | beda nilai setelah normalisasi: id=[11], ja=[11, 2] |
| `fig2` | Gambar 2. Syarat RRR — ketiga pasang sisi bersesuaian sama panjang: AB=PQ, BC=QR, CA=RP | Figure 2. Condition SSS — all three pairs of corresponding sides equal: AB=PQ, BC=QR, CA=RP | d — nilai-beda (id vs ja) | beda nilai setelah normalisasi: id=[2], ja=[2, 3] |
| `fig3` | Gambar 3. Syarat RAR — dua sisi bersesuaian sama panjang dan sudut apitnya sama besar: AB=PQ, ∠A=∠P, AC=PR | Figure 3. Condition SAS — two sides equal and included angle equal: AB=PQ, ∠A=∠P, AC=PR | d — nilai-beda (id vs ja) | beda nilai setelah normalisasi: id=[3], ja=[2, 3] |
| `fig4` | Gambar 4. Syarat ARA/AAR/RAA — satu sisi sama panjang dan dua sudut bersesuaian sama besar: ∠A=∠P, AB=PQ, ∠B=∠Q | Figure 4. Condition ASA/AAS/SAA — one side equal and two corresponding angles equal: ∠A=∠P, AB=PQ, ∠B=∠Q | d — nilai-beda (id vs ja) | beda nilai setelah normalisasi: id=[4], ja=[1, 2, 4] |

#### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx)

| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |
| --- | --- | --- | --- | --- |
| `s1e2c` | c. Bilangan asli antara 10 dan 20 (eksklusif): 11,12,...,19 → 9 anggota | c. Natural numbers between 10 and 20 (exclusive): 11,12,...,19 → 9 members | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[10, 11.12, 19, 20, 9], en=[10, 11, 12, 19, 20, 9] |
| `s2e1c` | M: Cari bilangan asli dengan x² < 100 → x < 10 → x ∈ {1,2,3,...,9}. | M: Natural numbers with x² < 100 → x < 10 → x ∈ {1,2,3,...,9}. | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[1.2, 10, 100, 3, 9], en=[1, 10, 100, 2, 3, 9] |
| `s3e3cAns` | Pilih 2 dari 4: C(4,2) = 4!/(2!·2!) = 6 himpunan bagian. | Choose 2 from 4: C(4,2) = 4!/(2!·2!) = 6 subsets. | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[2, 4, 4.2, 6], en=[2, 4, 6] |
| `s4e1aAns` | S = {1,2,3,...,10} atau S = {bilangan asli ≤ 10}. P adalah himpunan bilangan genap dalam S. | S = {1,2,...,10} or S = {natural numbers ≤ 10}. P is the set of even numbers in S. | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[1.2, 10, 3], en=[1, 10, 2] |
| `s4e1cAns` | S = {bilangan asli ≤ 25} atau S = {1,4,9,...,625} (semua kuadrat sempurna). Tergantung konteks. | S = {natural numbers ≤ 25} or S = {all perfect squares}. Depends on context. | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[1.4, 25, 625, 9], en=[25] |

### File tanpa terjemahan yang terdeteksi

| File | Klasifikasi |
| --- | --- |

## Cakupan per topik

| Topik | File | File dengan cabang ja | Memakai pickLang | Tanpa terjemahan sama sekali |
| --- | ---: | ---: | ---: | --- |
| (root) | 26 | 26 | 5 | — |
| [`aljabar`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar) | 8 | 8 | 8 | — |
| [`aritmetika-sosial`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial) | 6 | 6 | 0 | — |
| [`bangun-ruang-sisi-datar`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar) | 5 | 5 | 0 | — |
| [`bangun-ruang-sisi-lengkung`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung) | 5 | 5 | 0 | — |
| [`bilangan-berpangkat`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat) | 4 | 4 | 0 | — |
| [`bilangan-bulat`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat) | 7 | 7 | 5 | — |
| [`bilangan-rasional`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional) | 10 | 10 | 10 | — |
| [`fungsi-kuadrat`](../artifacts/numatik/src/pages/buku-animasi-matematika/fungsi-kuadrat) | 6 | 6 | 0 | — |
| [`garis-dan-sudut`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut) | 4 | 4 | 0 | — |
| [`garis-singgung-lingkaran`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran) | 5 | 5 | 4 | — |
| [`himpunan`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan) | 5 | 5 | 0 | — |
| [`kesebangunan-kekongruenan`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan) | 5 | 5 | 5 | — |
| [`koordinat-cartesius`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius) | 5 | 5 | 4 | — |
| [`lingkaran`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran) | 7 | 7 | 7 | — |
| [`peluang`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang) | 6 | 5 | 0 | — |
| [`perbandingan`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan) | 5 | 5 | 0 | — |
| [`persamaan-garis-lurus`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus) | 5 | 5 | 0 | — |
| [`persamaan-kuadrat`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-kuadrat) | 7 | 4 | 0 | — |
| [`plsv-ptlsv`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv) | 7 | 7 | 7 | — |
| [`pola-bilangan`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan) | 4 | 4 | 4 | — |
| [`relasi-fungsi`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi) | 6 | 6 | 5 | — |
| [`segitiga-segiempat`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat) | 5 | 5 | 5 | — |
| [`spldv`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv) | 7 | 7 | 7 | — |
| [`statistika`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika) | 6 | 6 | 0 | — |
| [`teorema-pythagoras`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras) | 6 | 6 | 0 | — |
| [`transformasi-geometri`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri) | 4 | 4 | 0 | — |

### Topik yang diminta

| Topik | Folder ada | Berisi terjemahan |
| --- | --- | --- |
| Perbandingan | Ya | Ya |
| Himpunan | Ya | Ya |
| Garis dan Sudut | Ya | Ya |
| Aritmetika Sosial | Ya | Ya |
| PGL | Ya | Ya |
| Teorema Pythagoras | Ya | Ya |
| Bangun Ruang Sisi Datar | Ya | Ya |
| Bilangan Berpangkat | Ya | Ya |
| Kesebangunan | Ya | Ya |
| Transformasi Geometri | Ya | Ya |
| BRSL | Ya | Ya |
| Statistika | Ya | Ya |
| Peluang | Ya | Ya |
| Fungsi Kuadrat | Ya | Ya |
| Persamaan Kuadrat | Ya | Ya |

## Topik (root)

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/AljabarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/AljabarPage.tsx)

#### Peta 1: `translations` (baris 8)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/AritmetikaSosialPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/AritmetikaSosialPage.tsx)

#### Peta 1: `titles` (baris 31)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelasMap` (baris 32)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabelMap` (baris 33)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/BilanganBulatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/BilanganBulatPage.tsx)

#### Peta 1: `translations` (baris 8)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/BilanganRasionalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/BilanganRasionalPage.tsx)

#### Peta 1: `translations` (baris 5)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/GarisDanSudutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/GarisDanSudutPage.tsx)

#### Peta 1: `titles` (baris 25)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabel` (baris 27)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/GarisSinggungLingkaranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/GarisSinggungLingkaranPage.tsx)

#### Peta 1: `titles` (baris 28)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 29)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabels` (baris 30)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/HimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/HimpunanPage.tsx)

#### Peta 1: `titles` (baris 25)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabel` (baris 27)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/KesebangunanKekongruenPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/KesebangunanKekongruenPage.tsx)

#### Peta 1: `object@87` (baris 87)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `locale constants@1` (baris 5)
Bahasa: id, en, ja, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/KoordinatCartesiusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/KoordinatCartesiusPage.tsx)

#### Peta 1: `data` (baris 7)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/LingkaranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/LingkaranPage.tsx)

#### Peta 1: `titles` (baris 34)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 35)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabels` (baris 36)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/PLSVPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/PLSVPtLSVPage.tsx)

#### Peta 1: `content` (baris 7)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/PerbandinganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/PerbandinganPage.tsx)

#### Peta 1: `titles` (baris 28)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 29)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabel` (baris 30)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/PolaBilanganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/PolaBilanganPage.tsx)

#### Peta 1: `titles` (baris 22)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 23)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabels` (baris 24)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/RelasiFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/RelasiFungsiPage.tsx)

#### Peta 1: `translations` (baris 4)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/SPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/SPLDVPage.tsx)

#### Peta 1: `translations` (baris 5)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/SegitigaSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/SegitigaSegiempatPage.tsx)

#### Peta 1: `titles` (baris 28)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 29)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabel` (baris 30)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik aljabar

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/FaktorisasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/FaktorisasiPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/OperasiPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/OperasiPecahanPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PemangkatanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PemangkatanPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PembagianPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PengertianUnsurPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PengertianUnsurPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PenjumlahanPenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PenjumlahanPenguranganPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PerkalianPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/SubstitusiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/SubstitusiPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik aritmetika-sosial

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx)

#### Peta 1: `T` (baris 17)
Bahasa: id, en, ja
- **Angka berbeda pada `soalContoh[].jawaban` (id vs en; adaptasi-mata-uang):** id=[1152000], en=[1152]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs en; adaptasi-mata-uang):** id=[100000, 20, 4, 6, 90000], en=[100, 20, 4, 6, 90]
- **Angka berbeda pada `soalContoh[].soal` (id vs en; adaptasi-mata-uang):** id=[100000, 20, 4, 6, 90000], en=[100, 20, 4, 6, 90]
- **Angka berbeda pada `introBody` (id vs ja; nilai-beda):** id=[500], ja=[3, 500]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs ja; adaptasi-mata-uang):** id=[1152000], ja=[1152]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs ja; adaptasi-mata-uang):** id=[100000, 20, 4, 6, 90000], ja=[100, 20, 4, 6, 90]
- **Angka berbeda pada `soalContoh[].soal` (id vs ja; adaptasi-mata-uang):** id=[100000, 20, 4, 6, 90000], ja=[100, 20, 4, 6, 90]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx)

#### Peta 1: `translations` (baris 25)
Bahasa: id, en, ja
- **Angka berbeda pada `analogiBody` (id vs en; adaptasi-mata-uang):** id=[10, 50000, 500000], en=[10, 50, 500]
- **Angka berbeda pada `phModal` (id vs en; adaptasi-skala):** id=[2000000], en=[2000]
- **Angka berbeda pada `quiz[].penjelasan` (id vs en; adaptasi-mata-uang):** id=[0.15, 1500000, 2, 5000000], en=[0.15, 1500, 2, 5000]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs en; adaptasi-mata-uang):** id=[2500000], en=[2500]
- **Angka berbeda pada `quiz[].soal` (id vs en; adaptasi-mata-uang):** id=[15, 2, 5000000], en=[15, 2, 5000]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs en; adaptasi-mata-uang):** id=[3000000], en=[3000]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs en; adaptasi-mata-uang):** id=[0.08, 2.5, 3600000], en=[0.08, 2.5, 3600]
- **Angka berbeda pada `soalContoh[].soal` (id vs en; adaptasi-mata-uang):** id=[2.5, 3600000, 8], en=[2.5, 3600, 8]
- **Angka berbeda pada `analogiBody` (id vs ja; nilai-beda):** id=[10, 50000, 500000], ja=[1, 10, 2, 50, 500]
- **Angka berbeda pada `phModal` (id vs ja; adaptasi-skala):** id=[2000000], ja=[2000]
- **Angka berbeda pada `quiz[].penjelasan` (id vs ja; adaptasi-mata-uang):** id=[0.15, 1500000, 2, 5000000], ja=[0.15, 1500, 2, 5000]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs ja; adaptasi-mata-uang):** id=[2500000], ja=[2500]
- **Angka berbeda pada `quiz[].soal` (id vs ja; adaptasi-mata-uang):** id=[15, 2, 5000000], ja=[15, 2, 5000]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs ja; adaptasi-mata-uang):** id=[3000000], ja=[3000]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs ja; adaptasi-mata-uang):** id=[0.08, 2.5, 3600000], ja=[0.08, 2.5, 3600]
- **Angka berbeda pada `soalContoh[].soal` (id vs ja; adaptasi-mata-uang):** id=[2.5, 3600000, 8], ja=[2.5, 3600, 8]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx)

#### Peta 1: `translations` (baris 26)
Bahasa: id, en, ja
- **Angka berbeda pada `kalkPH` (id vs en; adaptasi-skala):** id=[300000], en=[300]
- **Angka berbeda pada `kalkPHBayar` (id vs en; adaptasi-skala):** id=[240000], en=[240]
- **Angka berbeda pada `persenDiskonContohSoal` (id vs en; adaptasi-mata-uang):** id=[525000, 750000], en=[525, 750]
- **Angka berbeda pada `quiz[].penjelasan` (id vs en; adaptasi-mata-uang):** id=[0.75, 100, 225000, 25, 300000], en=[0.75, 100, 225, 25, 300]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs en; adaptasi-mata-uang):** id=[350000], en=[350]
- **Angka berbeda pada `quiz[].soal` (id vs en; adaptasi-mata-uang):** id=[225000, 25], en=[225, 25]
- **Angka berbeda pada `rumus[].contoh` (id vs en; nilai-beda):** id=[100, 100000, 25, 300000, 400000], en=[100, 25, 300, 400]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs en; adaptasi-mata-uang):** id=[68000], en=[68]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs en; adaptasi-mata-uang):** id=[10, 20, 400000, 650000], en=[10, 20, 400, 650]
- **Angka berbeda pada `soalContoh[].soal` (id vs en; adaptasi-mata-uang):** id=[10, 20, 400000, 650000], en=[10, 20, 400, 650]
- **Angka berbeda pada `kalkPH` (id vs ja; adaptasi-skala):** id=[300000], ja=[300]
- **Angka berbeda pada `kalkPHBayar` (id vs ja; adaptasi-skala):** id=[240000], ja=[240]
- **Angka berbeda pada `persenDiskonContohSoal` (id vs ja; adaptasi-mata-uang):** id=[525000, 750000], ja=[525, 750]
- **Angka berbeda pada `quiz[].penjelasan` (id vs ja; adaptasi-mata-uang):** id=[0.75, 100, 225000, 25, 300000], ja=[0.75, 100, 225, 25, 300]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs ja; adaptasi-mata-uang):** id=[350000], ja=[350]
- **Angka berbeda pada `quiz[].soal` (id vs ja; adaptasi-mata-uang):** id=[225000, 25], ja=[225, 25]
- **Angka berbeda pada `rumus[].contoh` (id vs ja; nilai-beda):** id=[100, 100000, 25, 300000, 400000], ja=[100, 25, 300, 400]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs ja; adaptasi-mata-uang):** id=[68000], ja=[68]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs ja; adaptasi-mata-uang):** id=[10, 20, 400000, 650000], ja=[10, 20, 400, 650]
- **Angka berbeda pada `soalContoh[].soal` (id vs ja; adaptasi-mata-uang):** id=[10, 20, 400000, 650000], ja=[10, 20, 400, 650]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx)

#### Peta 1: `translations` (baris 26)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Known` (id vs en; adaptasi-mata-uang):** id=[180000, 225000], en=[180, 225]
- **Angka berbeda pada `c1Q` (id vs en; nilai-beda):** id=[1, 180000, 225000], en=[180, 225]
- **Angka berbeda pada `c1Result` (id vs en; adaptasi-mata-uang):** id=[25, 45000], en=[25, 45]
- **Angka berbeda pada `c2Known` (id vs en; adaptasi-mata-uang):** id=[240000, 35], en=[240, 35]
- **Angka berbeda pada `c2Q` (id vs en; adaptasi-mata-uang):** id=[240000, 35], en=[240, 35]
- **Angka berbeda pada `c2Result` (id vs en; adaptasi-mata-uang):** id=[324000], en=[324]
- **Angka berbeda pada `c3Known` (id vs en; adaptasi-mata-uang):** id=[15, 680000], en=[15, 680]
- **Angka berbeda pada `c3Q` (id vs en; adaptasi-mata-uang):** id=[15, 680000], en=[15, 680]
- **Angka berbeda pada `c3Result` (id vs en; adaptasi-mata-uang):** id=[120000, 800000], en=[120, 800]
- **Angka berbeda pada `c4Known1` (id vs en; adaptasi-mata-uang):** id=[50000], en=[50]
- **Angka berbeda pada `c4Known2` (id vs en; adaptasi-mata-uang):** id=[42000, 6000, 7], en=[42, 6, 7]
- **Angka berbeda pada `c4Note` (id vs en; adaptasi-mata-uang):** id=[50000, 6000, 9], en=[50, 6, 9]
- **Angka berbeda pada `c4Q` (id vs en; adaptasi-mata-uang):** id=[10, 50000, 6000, 7], en=[10, 50, 6, 7]
- **Angka berbeda pada `c4Result` (id vs en; adaptasi-mata-uang):** id=[8000, 9], en=[8, 9]
- **Angka berbeda pada `hbInputPH` (id vs en; adaptasi-skala):** id=[200000], en=[200]
- **Angka berbeda pada `hjInputPH` (id vs en; adaptasi-skala):** id=[250000], en=[250]
- **Angka berbeda pada `impasContoh` (id vs en; adaptasi-mata-uang):** id=[25000], en=[25]
- **Angka berbeda pada `pctUntungEx` (id vs en; adaptasi-mata-uang):** id=[100000, 20000], en=[100, 20]
- **Angka berbeda pada `quiz[].penjelasan` (id vs en; adaptasi-mata-uang):** id=[100, 120, 20, 400000, 480000], en=[100, 120, 20, 400, 480]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs en; adaptasi-mata-uang):** id=[420000], en=[420]
- **Angka berbeda pada `quiz[].soal` (id vs en; adaptasi-mata-uang):** id=[20, 480000], en=[20, 480]
- **Angka berbeda pada `secIntroBody` (id vs en; adaptasi-mata-uang):** id=[150000, 180000], en=[150, 180]
- **Angka berbeda pada `tips[].isi` (id vs en; adaptasi-mata-uang):** id=[100000, 20], en=[100, 20]
- **Angka berbeda pada `c1Known` (id vs ja; adaptasi-mata-uang):** id=[180000, 225000], ja=[180, 225]
- **Angka berbeda pada `c1Q` (id vs ja; adaptasi-mata-uang):** id=[1, 180000, 225000], ja=[1, 180, 225]
- **Angka berbeda pada `c1Result` (id vs ja; adaptasi-mata-uang):** id=[25, 45000], ja=[25, 45]
- **Angka berbeda pada `c2Known` (id vs ja; adaptasi-mata-uang):** id=[240000, 35], ja=[240, 35]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[240000, 35], ja=[1, 240, 35]
- **Angka berbeda pada `c2Result` (id vs ja; adaptasi-mata-uang):** id=[324000], ja=[324]
- **Angka berbeda pada `c3Known` (id vs ja; adaptasi-mata-uang):** id=[15, 680000], ja=[15, 680]
- **Angka berbeda pada `c3Q` (id vs ja; adaptasi-mata-uang):** id=[15, 680000], ja=[15, 680]
- **Angka berbeda pada `c3Result` (id vs ja; adaptasi-mata-uang):** id=[120000, 800000], ja=[120, 800]
- **Angka berbeda pada `c4Known1` (id vs ja; adaptasi-mata-uang):** id=[50000], ja=[50]
- **Angka berbeda pada `c4Known2` (id vs ja; adaptasi-mata-uang):** id=[42000, 6000, 7], ja=[42, 6, 7]
- **Angka berbeda pada `c4Note` (id vs ja; adaptasi-mata-uang):** id=[50000, 6000, 9], ja=[50, 6, 9]
- **Angka berbeda pada `c4Q` (id vs ja; nilai-beda):** id=[10, 50000, 6000, 7], ja=[1, 10, 50, 6, 7]
- **Angka berbeda pada `c4Result` (id vs ja; adaptasi-mata-uang):** id=[8000, 9], ja=[8, 9]
- **Angka berbeda pada `hbInputPH` (id vs ja; adaptasi-skala):** id=[200000], ja=[200]
- **Angka berbeda pada `hjInputPH` (id vs ja; adaptasi-skala):** id=[250000], ja=[250]
- **Angka berbeda pada `impasContoh` (id vs ja; adaptasi-mata-uang):** id=[25000], ja=[25]
- **Angka berbeda pada `pctUntungEx` (id vs ja; adaptasi-mata-uang):** id=[100000, 20000], ja=[100, 20]
- **Angka berbeda pada `quiz[].penjelasan` (id vs ja; adaptasi-mata-uang):** id=[100, 120, 20, 400000, 480000], ja=[100, 120, 20, 400, 480]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs ja; adaptasi-mata-uang):** id=[420000], ja=[420]
- **Angka berbeda pada `quiz[].soal` (id vs ja; adaptasi-mata-uang):** id=[20, 480000], ja=[20, 480]
- **Angka berbeda pada `secIntroBody` (id vs ja; nilai-beda):** id=[150000, 180000], ja=[150, 180, 2]
- **Angka berbeda pada `tips[].isi` (id vs ja; adaptasi-mata-uang):** id=[100000, 20], ja=[100, 20]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx)

#### Peta 1: `T` (baris 55)
Bahasa: id, en, ja
- **Angka berbeda pada `contoh[].math2` (id vs en; nilai-beda):** id=[1.11, 102000, 220], en=[1, 102000, 11, 220]
- **Angka berbeda pada `contoh[].maths[]` (id vs en; nilai-beda):** id=[100, 12, 400000, 48000], en=[0, 100, 12, 400, 48]
- **Angka berbeda pada `contoh[].noteKatex` (id vs en; nilai-beda):** id=[1.11, 120000, 200], en=[1, 11, 120000, 200]
- **Angka berbeda pada `contoh[].math1` (id vs ja; nilai-beda):** id=[0, 100, 120000, 15, 85], ja=[100, 102000, 120000, 15, 85]
- **Angka berbeda pada `contoh[].math2` (id vs ja; nilai-beda):** id=[1.11, 102000, 220], ja=[1, 102000, 11, 113220]
- **Angka berbeda pada `contoh[].maths[]` (id vs ja; nilai-beda):** id=[100, 12, 400000, 48000], ja=[0, 100, 12, 400, 48]
- **Angka berbeda pada `contoh[].noteKatex` (id vs ja; nilai-beda):** id=[1.11, 120000, 200], ja=[1, 11, 120000, 133200]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx)

#### Peta 1: `T` (baris 65)
Bahasa: id, en, ja
- **Angka berbeda pada `contoh[].maths[]` (id vs en; nilai-beda):** id=[100, 3250000, 5000000, 65], en=[0, 100, 250, 3, 5, 65]
- **Angka berbeda pada `contoh[].maths[]` (id vs ja; nilai-beda):** id=[100, 3250000, 5000000, 65], ja=[0, 100, 250, 3, 5, 65]
- **Angka berbeda pada `tarifTable[].pkp` (id vs ja; nilai-beda):** id=[500], ja=[500000000]


## Topik bangun-ruang-sisi-datar

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/BalokPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/BalokPage.tsx)

#### Peta 1: `labels` (baris 34)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `translations` (baris 1597)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/GabunganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/GabunganPage.tsx)

#### Peta 1: `translations` (baris 862)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/KubusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/KubusPage.tsx)

#### Peta 1: `translations` (baris 1906)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/LimasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/LimasPage.tsx)

#### Peta 1: `translations` (baris 1520)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/PrismaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/PrismaPage.tsx)

#### Peta 1: `object@1396` (baris 1396)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik bangun-ruang-sisi-lengkung

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/BolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/BolaPage.tsx)

#### Peta 1: `object@19` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@270` (baris 270)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@1132` (baris 1132)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@1139` (baris 1139)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@1218` (baris 1218)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@1309` (baris 1309)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@1363` (baris 1363)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@1420` (baris 1420)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@1684` (baris 1684)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@1685` (baris 1685)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@1686` (baris 1686)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@2482` (baris 2482)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/GabunganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/GabunganPage.tsx)

#### Peta 1: `object@142` (baris 142)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@390` (baris 390)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@677` (baris 677)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@833` (baris 833)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@834` (baris 834)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@835` (baris 835)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@841` (baris 841)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@869` (baris 869)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@875` (baris 875)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@956` (baris 956)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx)

#### Peta 1: `cone3DLabels` (baris 42)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `unsurSvgLabels` (baris 267)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `luasKerucutSvgLabels` (baris 342)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `coneNetAnimTrans` (baris 600)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `kerucutCountSvgLabels` (baris 938)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `selimutJuringSvgLabels` (baris 992)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `soalUnsurTrans` (baris 1170)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `unsurQuizUiTrans` (baris 1289)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `pageTrans` (baris 1509)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `slide1Trans` (baris 1516)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `slide2Trans` (baris 1585)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `slide3Trans` (baris 1700)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 13: `slide4Trans` (baris 1758)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 14: `slide5Trans` (baris 1807)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 15: `slide6Trans` (baris 1856)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 16: `slide7Trans` (baris 1914)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 17: `object@2297` (baris 2297)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 18: `object@2298` (baris 2298)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 19: `object@2299` (baris 2299)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 20: `exampleSlidesTrans` (baris 2308)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 21: `toggleLabelsTrans` (baris 2339)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 22: `gpExamplesTrans` (baris 2354)
Bahasa: id, en, ja
- **Angka berbeda pada `$value[].answer` (id vs en; nilai-beda):** id=[1, 1232, 2, 22, 24, 25, 3, 308, 3696, 44, 49, 576, 625, 7], en=[1, 1232, 2, 22, 24, 25, 3, 308, 44, 49, 576, 625, 696, 7]
- **Angka berbeda pada `$value[].answer` (id vs ja; nilai-beda):** id=[1, 1232, 2, 22, 24, 25, 3, 308, 3696, 44, 49, 576, 625, 7], ja=[1, 1232, 2, 22, 24, 25, 3, 308, 44, 49, 576, 625, 696, 7]

#### Peta 23: `luasExamplesTrans` (baris 2592)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 24: `volExamplesTrans` (baris 2833)
Bahasa: id, en, ja
- **Angka berbeda pada `$value[].answer` (id vs en; nilai-beda):** id=[1, 14, 1825.7, 189, 2, 20, 22, 28, 3, 30, 344960, 7, 784, 9, 9.33], en=[1, 14, 1825.7, 189, 2, 20, 22, 28, 3, 30, 344, 7, 784, 9, 9.33, 960]
- **Angka berbeda pada `$value[].answer` (id vs ja; nilai-beda):** id=[1, 14, 1825.7, 189, 2, 20, 22, 28, 3, 30, 344960, 7, 784, 9, 9.33], ja=[1, 14, 1825.7, 189, 2, 20, 22, 28, 3, 30, 344, 7, 784, 9, 9.33, 960]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx)

#### Peta 1: `calcTrans` (baris 84)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `pageTrans` (baris 190)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `slide0Trans` (baris 235)
Bahasa: id, en, ja
- **Angka berbeda pada `intro` (id vs ja; nilai-beda):** id=[3], ja=[1, 3]

#### Peta 4: `sec0Trans` (baris 282)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `sec1Trans` (baris 357)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `sec2Trans` (baris 423)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `sec3Trans` (baris 456)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `sec4Trans` (baris 492)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `secTitles` (baris 537)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@790` (baris 790)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@791` (baris 791)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@792` (baris 792)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/TabungPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/TabungPage.tsx)

#### Peta 1: `slide1Trans` (baris 870)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `slide2Trans` (baris 916)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `slide3Trans` (baris 1169)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `slide4Trans` (baris 1236)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `slide5Trans` (baris 1312)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@1847` (baris 1847)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@1848` (baris 1848)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@1849` (baris 1849)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `kesimpulanTrans` (baris 2640)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `contohSoalTrans` (baris 2708)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik bilangan-berpangkat

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/BentukAkarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/BentukAkarPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/NotasiIlmiahPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/NotasiIlmiahPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `konsep3_def_zero` (id vs ja; nilai-beda):** id=[1], ja=[0, 1]
- **Angka berbeda pada `konsep3_proof_note` (id vs ja; nilai-beda):** id=[2], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `k6_seq_note` (id vs ja; nilai-beda):** id=[2], ja=[1, 2]


## Topik bilangan-bulat

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/BukuAnimasiPenjumlahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/BukuAnimasiPenjumlahanPage.tsx)

#### Peta 1: `object@393` (baris 393)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `locale constants@1` (baris 68)
Bahasa: id, en, ja, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx)

#### Peta 1: `translations` (baris 25)
Bahasa: id, en, ja
- **Angka berbeda pada `gcdStoryS2a` (id vs ja; nilai-beda):** id=[2], ja=[2, 3]
- **Angka berbeda pada `gcdStoryS2b` (id vs ja; nilai-beda):** id=[1, 7], ja=[1, 3, 7]
- **Angka berbeda pada `lcmStoryAnsDate` (id vs ja; nilai-beda):** id=[21], ja=[2, 21]
- **Angka berbeda pada `lcmStoryQ4` (id vs ja; nilai-beda):** id=[28], ja=[1, 28, 3]
- **Angka berbeda pada `lcmStoryS3a` (id vs ja; nilai-beda):** id=[24, 28], ja=[1, 24, 28]
- **Angka berbeda pada `lcmStoryS3b` (id vs ja; nilai-beda):** id=[28, 3, 31], ja=[1, 28, 3, 31]
- **Angka berbeda pada `lcmStoryS3c` (id vs ja; nilai-beda):** id=[21, 24, 3], ja=[2, 21, 24, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx)

#### Peta 1: `translations` (baris 24)
Bahasa: id, en, ja
- **Angka berbeda pada `bonusStory` (id vs ja; nilai-beda):** id=[12, 15, 28, 3, 50], ja=[3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `contoh3Story` (id vs ja; nilai-beda):** id=[120, 8], ja=[8]
- **Angka berbeda pada `katexContoh3` (id vs ja; nilai-beda):** id=[-120, -15, 8], ja=[-120, -15, 1, 8]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenguranganPage.tsx)

#### Peta 1: `translations` (baris 954)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx)

#### Peta 1: `translations` (baris 957)
Bahasa: id, en, ja
- **Angka berbeda pada `cara1Step2` (id vs ja; nilai-beda):** id=[2], ja=[1, 2]
- **Angka berbeda pada `cara1Step3` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx)

#### Peta 1: `translations` (baris 354)
Bahasa: id, en, ja
- **Angka berbeda pada `posNegG1` (id vs ja; nilai-beda):** id=[-3], ja=[-3, 1]
- **Angka berbeda pada `posNegG2` (id vs ja; nilai-beda):** id=[-3], ja=[-3, 2]
- **Angka berbeda pada `posNegG3` (id vs ja; nilai-beda):** id=[-3], ja=[-3, 3]
- **Angka berbeda pada `posNegG4` (id vs ja; nilai-beda):** id=[-3], ja=[-3, 4]
- **Angka berbeda pada `posPosG1` (id vs ja; nilai-beda):** id=[3], ja=[1, 3]
- **Angka berbeda pada `posPosG2` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]
- **Angka berbeda pada `posPosG4` (id vs ja; nilai-beda):** id=[3], ja=[3, 4]


## Topik bilangan-rasional

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `imgCaption` (id vs ja; nilai-beda):** id=[1, 12, 2, 3, 4, 6, 8], ja=[1, 12, 2, 3, 4, 5, 6, 8]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `sec4TipBody` (id vs en; nilai-beda):** id=[0, 9], en=[0]
- **Angka berbeda pada `conclusionBody2` (id vs ja; nilai-beda):** id=[10, 100, 1000], ja=[10, 100, 1000, 2]
- **Angka berbeda pada `sec4SummaryBody` (id vs ja; nilai-beda):** id=[0.3, 0.3333], ja=[0.3, 0.3333, 1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `sumTips[].detail` (id vs en; adaptasi-mata-uang):** id=[100, 120000, 150000, 20, 30000], en=[100, 120, 150, 20, 30]
- **Angka berbeda pada `sumTips[].detail` (id vs ja; adaptasi-mata-uang):** id=[100, 120000, 150000, 20, 30000], ja=[100, 120, 150, 20, 30]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `ex1Q` (id vs en; nilai-beda):** id=[10, 234.5], en=[10, 234, 5]
- **Angka berbeda pada `ex2Q` (id vs en; nilai-beda):** id=[1000, 3456.78], en=[1000, 3456, 78]
- **Angka berbeda pada `ex6Q` (id vs en; nilai-beda):** id=[0.0015, 0.4563], en=[0, 15, 4563]
- **Angka berbeda pada `ex7Q` (id vs en; adaptasi-mata-uang):** id=[2.5, 37500], en=[2.5, 37.5]
- **Angka berbeda pada `ex7ans` (id vs en; adaptasi-mata-uang):** id=[15000], en=[15]
- **Angka berbeda pada `ex7given1` (id vs en; adaptasi-mata-uang):** id=[37500], en=[37.5]
- **Angka berbeda pada `usage1desc` (id vs en; adaptasi-mata-uang):** id=[15750, 2.5], en=[15.75, 2.5]
- **Angka berbeda pada `ex1Q` (id vs ja; nilai-beda):** id=[10, 234.5], ja=[10, 234, 5]
- **Angka berbeda pada `ex2Q` (id vs ja; nilai-beda):** id=[1000, 3456.78], ja=[1000, 3456, 78]
- **Angka berbeda pada `ex3s2desc` (id vs ja; nilai-beda):** id=[1, 3456.78], ja=[0, 1, 3456.78]
- **Angka berbeda pada `ex6Q` (id vs ja; nilai-beda):** id=[0.0015, 0.4563], ja=[0, 15, 4563]
- **Angka berbeda pada `ex7Q` (id vs ja; nilai-beda):** id=[2.5, 37500], ja=[1, 2.5, 37.5]
- **Angka berbeda pada `ex7ans` (id vs ja; nilai-beda):** id=[15000], ja=[1, 15]
- **Angka berbeda pada `ex7given1` (id vs ja; adaptasi-mata-uang):** id=[37500], ja=[37.5]
- **Angka berbeda pada `ex8Q` (id vs ja; nilai-beda):** id=[12.5, 187.5], ja=[1, 12.5, 187.5]
- **Angka berbeda pada `ex8ans` (id vs ja; nilai-beda):** id=[15], ja=[1, 15]
- **Angka berbeda pada `usage1desc` (id vs ja; adaptasi-mata-uang):** id=[15750, 2.5], ja=[15.75, 2.5]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2Q` (id vs en; nilai-beda):** id=[5.70642], en=[5, 70642]
- **Angka berbeda pada `ex2s1desc` (id vs en; nilai-beda):** id=[0, 2, 5.70642], en=[0, 2, 5, 70642]
- **Angka berbeda pada `ex3Q` (id vs en; nilai-beda):** id=[7.638524], en=[638524, 7]
- **Angka berbeda pada `ex3s1desc` (id vs en; nilai-beda):** id=[3, 7.638524, 8], en=[3, 638524, 7, 8]
- **Angka berbeda pada `ex4Q` (id vs en; nilai-beda):** id=[111.48], en=[111, 48]
- **Angka berbeda pada `ex4s1desc` (id vs en; nilai-beda):** id=[1, 111.48, 4], en=[1, 111, 4, 48]
- **Angka berbeda pada `ex5Q` (id vs en; nilai-beda):** id=[613.54], en=[54, 613]
- **Angka berbeda pada `ex5s1desc` (id vs en; nilai-beda):** id=[3, 5, 613.54], en=[3, 5, 54, 613]
- **Angka berbeda pada `ex7Q` (id vs en; nilai-beda):** id=[25.48], en=[25, 48]
- **Angka berbeda pada `ex7ans` (id vs en; nilai-beda):** id=[25.5], en=[25, 5]
- **Angka berbeda pada `ex7s1desc` (id vs en; nilai-beda):** id=[1, 25.48, 4], en=[1, 25, 4, 48]
- **Angka berbeda pada `ex8ans` (id vs en; nilai-beda):** id=[10.47], en=[10, 47]
- **Angka berbeda pada `ex1Q` (id vs ja; nilai-beda):** id=[4.638], ja=[1, 4.638]
- **Angka berbeda pada `ex2Q` (id vs ja; nilai-beda):** id=[5.70642], ja=[2, 5, 70642]
- **Angka berbeda pada `ex2s1desc` (id vs ja; nilai-beda):** id=[0, 2, 5.70642], ja=[0, 2, 5, 70642]
- **Angka berbeda pada `ex3Q` (id vs ja; nilai-beda):** id=[7.638524], ja=[3, 638524, 7]
- **Angka berbeda pada `ex3s1desc` (id vs ja; nilai-beda):** id=[3, 7.638524, 8], ja=[3, 638524, 7, 8]
- **Angka berbeda pada `ex4Q` (id vs ja; nilai-beda):** id=[111.48], ja=[111, 48]
- **Angka berbeda pada `ex4s1desc` (id vs ja; nilai-beda):** id=[1, 111.48, 4], ja=[1, 111, 4, 48]
- **Angka berbeda pada `ex5Q` (id vs ja; nilai-beda):** id=[613.54], ja=[54, 613]
- **Angka berbeda pada `ex5s1desc` (id vs ja; nilai-beda):** id=[3, 5, 613.54], ja=[3, 5, 54, 613]
- **Angka berbeda pada `ex7Q` (id vs ja; nilai-beda):** id=[25.48], ja=[1, 25, 48]
- **Angka berbeda pada `ex7ans` (id vs ja; nilai-beda):** id=[25.5], ja=[25, 5]
- **Angka berbeda pada `ex7s1desc` (id vs ja; nilai-beda):** id=[1, 25.48, 4], ja=[1, 25, 4, 48]
- **Angka berbeda pada `ex8Q` (id vs ja; nilai-beda):** id=[10.473], ja=[10.473, 2]
- **Angka berbeda pada `ex8ans` (id vs ja; nilai-beda):** id=[10.47], ja=[10, 47]
- **Angka berbeda pada `ex9Q` (id vs ja; nilai-beda):** id=[2.99567], ja=[2.99567, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx)

#### Peta 1: `translations` (baris 16)
Bahasa: id, en, ja
- **Angka berbeda pada `s1e1Q` (id vs en; nilai-beda):** id=[14.7, 8.39], en=[14, 39, 7, 8]
- **Angka berbeda pada `s1e1ans` (id vs en; nilai-beda):** id=[23.09], en=[23, 9]
- **Angka berbeda pada `s1e1s1` (id vs en; nilai-beda):** id=[1, 14.7], en=[1, 14, 7, 70]
- **Angka berbeda pada `s2e1Q` (id vs en; nilai-beda):** id=[23.5, 7.25], en=[23, 25, 5, 7]
- **Angka berbeda pada `s2e1ans` (id vs en; nilai-beda):** id=[16.25, 23.5, 7.25], en=[16, 23, 25, 5, 7]
- **Angka berbeda pada `s2e1s1` (id vs en; nilai-beda):** id=[1, 23.5], en=[1, 23, 5, 50]
- **Angka berbeda pada `s3e1Q` (id vs en; nilai-beda):** id=[18.6, 7.45, 9.3], en=[18, 3, 45, 6, 7, 9]
- **Angka berbeda pada `s3e1ans` (id vs en; nilai-beda):** id=[16.75], en=[16, 75]
- **Angka berbeda pada `s3e1s1` (id vs en; nilai-beda):** id=[1, 18.6, 7.45], en=[1, 18, 45, 60, 7]
- **Angka berbeda pada `s3e1s2` (id vs en; nilai-beda):** id=[2, 26.05, 9.3], en=[2, 26, 30, 5, 9]
- **Angka berbeda pada `s3e3Q` (id vs en; adaptasi-nama-konteks):** id=[1250.75, 128.25, 375.5], en=[1250, 128, 25, 375, 5, 75]
- **Angka berbeda pada `s3e3ans` (id vs en; adaptasi-nama-konteks):** id=[1003.5], en=[1003, 5]
- **Angka berbeda pada `s3e3katex1` (id vs en; nilai-beda):** id=[1250.75, 128.25, 375.5], en=[1250, 128, 25, 375, 5, 75]
- **Angka berbeda pada `s3e3s2` (id vs en; nilai-beda):** id=[1250.75, 2, 375.5], en=[1250, 2, 375, 50, 75]
- **Angka berbeda pada `s3e3s3` (id vs en; nilai-beda):** id=[128.25, 3, 875.25], en=[128, 25, 3, 875]
- **Angka berbeda pada `s1e1Q` (id vs ja; nilai-beda):** id=[14.7, 8.39], ja=[14, 39, 7, 8]
- **Angka berbeda pada `s1e1ans` (id vs ja; nilai-beda):** id=[23.09], ja=[23, 9]
- **Angka berbeda pada `s1e1s1` (id vs ja; nilai-beda):** id=[1, 14.7], ja=[0, 1, 14, 7, 70]
- **Angka berbeda pada `s1e2s1` (id vs ja; nilai-beda):** id=[1, 2, 3, 52.18, 9.754], ja=[0, 1, 2, 3, 52.18, 9.754]
- **Angka berbeda pada `s1e3Q` (id vs ja; nilai-beda):** id=[3, 70.806, 8.34, 934.456], ja=[1, 2, 3, 70.806, 8.34, 934.456]
- **Angka berbeda pada `s2e1Q` (id vs ja; nilai-beda):** id=[23.5, 7.25], ja=[23, 25, 5, 7]
- **Angka berbeda pada `s2e1ans` (id vs ja; nilai-beda):** id=[16.25, 23.5, 7.25], ja=[16, 23, 25, 5, 7]
- **Angka berbeda pada `s2e1s1` (id vs ja; nilai-beda):** id=[1, 23.5], ja=[1, 23, 5, 50]
- **Angka berbeda pada `s3e1Q` (id vs ja; nilai-beda):** id=[18.6, 7.45, 9.3], ja=[18, 3, 45, 6, 7, 9]
- **Angka berbeda pada `s3e1ans` (id vs ja; nilai-beda):** id=[16.75], ja=[16, 75]
- **Angka berbeda pada `s3e1s1` (id vs ja; nilai-beda):** id=[1, 18.6, 7.45], ja=[1, 18, 45, 60, 7]
- **Angka berbeda pada `s3e1s2` (id vs ja; nilai-beda):** id=[2, 26.05, 9.3], ja=[2, 26, 30, 5, 9]
- **Angka berbeda pada `s3e3Q` (id vs ja; adaptasi-nama-konteks):** id=[1250.75, 128.25, 375.5], ja=[1250, 128, 25, 375, 5, 75]
- **Angka berbeda pada `s3e3ans` (id vs ja; adaptasi-nama-konteks):** id=[1003.5], ja=[1003, 5]
- **Angka berbeda pada `s3e3katex1` (id vs ja; nilai-beda):** id=[1250.75, 128.25, 375.5], ja=[1250, 128, 25, 375, 5, 75]
- **Angka berbeda pada `s3e3s2` (id vs ja; nilai-beda):** id=[1250.75, 2, 375.5], ja=[1250, 2, 375, 50, 75]
- **Angka berbeda pada `s3e3s3` (id vs ja; nilai-beda):** id=[128.25, 3, 875.25], ja=[128, 25, 3, 875]
- **Angka berbeda pada `sec2Summary` (id vs ja; nilai-beda):** id=[1], ja=[0, 1]
- **Angka berbeda pada `sec2Tip` (id vs ja; nilai-beda):** id=[3, 467.8], ja=[0, 3, 467.8]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `ex9katex4` (id vs en; nilai-beda):** id=[0, 13, 30, 840000], en=[13, 30, 364000, 840000]
- **Angka berbeda pada `ex9Q` (id vs ja; nilai-beda):** id=[2, 5, 840000], ja=[1, 2, 5, 6, 840000]
- **Angka berbeda pada `ex9katex4` (id vs ja; nilai-beda):** id=[0, 13, 30, 840000], ja=[13, 30, 364000, 840000]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `ex1Q` (id vs en; nilai-beda):** id=[10, 46.72], en=[10, 46, 72]
- **Angka berbeda pada `ex2Q` (id vs en; nilai-beda):** id=[1000, 2.3467], en=[1000, 2, 3467]
- **Angka berbeda pada `ex4Q` (id vs en; nilai-beda):** id=[0.25, 0.87], en=[0, 25, 87]
- **Angka berbeda pada `ex5Q` (id vs en; nilai-beda):** id=[1.38, 6.4], en=[1, 38, 4, 6]
- **Angka berbeda pada `ex7Q` (id vs en; adaptasi-mata-uang):** id=[15500, 2.5], en=[15.5, 2.5]
- **Angka berbeda pada `ex7ans` (id vs en; adaptasi-mata-uang):** id=[38750], en=[38.75]
- **Angka berbeda pada `ex7katex1` (id vs en; adaptasi-skala):** id=[15500, 2.5], en=[15.5, 2.5]
- **Angka berbeda pada `ex7s2a` (id vs en; nilai-beda):** id=[0, 15500], en=[15.5, 2]
- **Angka berbeda pada `ex7s2c` (id vs en; adaptasi-skala):** id=[15500, 25, 387500], en=[1550, 25, 38750]
- **Angka berbeda pada `ex7s2d` (id vs en; nilai-beda):** id=[1, 38750], en=[3, 38.75]
- **Angka berbeda pada `ex8Q` (id vs en; nilai-beda):** id=[100, 12650, 350, 8.5], en=[1.26, 100, 350, 8.5]
- **Angka berbeda pada `ex8ans` (id vs en; nilai-beda):** id=[376337.5], en=[37.49]
- **Angka berbeda pada `ex8katex2` (id vs en; nilai-beda):** id=[12650, 29.75], en=[1.26, 29.75]
- **Angka berbeda pada `ex8s3a` (id vs en; nilai-beda):** id=[0, 12650, 2, 29.75], en=[1.26, 2, 29.75]
- **Angka berbeda pada `ex8s3b` (id vs en; nilai-beda):** id=[12650, 2975, 37633750], en=[126, 2975, 374850]
- **Angka berbeda pada `ex8s3c` (id vs en; nilai-beda):** id=[2, 376337.5], en=[37.485, 37.49, 4]
- **Angka berbeda pada `ex9Q` (id vs en; adaptasi-mata-uang):** id=[0.3, 12.75, 25000, 8.4], en=[0.3, 12.75, 25, 8.4]
- **Angka berbeda pada `ex9ans` (id vs en; adaptasi-mata-uang):** id=[29750000], en=[29750]
- **Angka berbeda pada `ex9katex3` (id vs en; nilai-beda):** id=[10, 107, 1190, 9], en=[0.09, 107.1, 1190]
- **Angka berbeda pada `ex9katex4` (id vs en; adaptasi-skala):** id=[1190, 25000, 29750000], en=[1190, 25, 29750]
- **Angka berbeda pada `ex1Q` (id vs ja; nilai-beda):** id=[10, 46.72], ja=[10, 46, 72]
- **Angka berbeda pada `ex2Q` (id vs ja; nilai-beda):** id=[1000, 2.3467], ja=[1000, 2, 3467]
- **Angka berbeda pada `ex3s2desc` (id vs ja; nilai-beda):** id=[1, 8.6543], ja=[0, 1, 8.6543]
- **Angka berbeda pada `ex4Q` (id vs ja; nilai-beda):** id=[0.25, 0.87], ja=[0, 25, 87]
- **Angka berbeda pada `ex5Q` (id vs ja; nilai-beda):** id=[1.38, 6.4], ja=[1, 38, 4, 6]
- **Angka berbeda pada `ex7Q` (id vs ja; nilai-beda):** id=[15500, 2.5], ja=[1, 15.5, 2.5]
- **Angka berbeda pada `ex7ans` (id vs ja; adaptasi-mata-uang):** id=[38750], ja=[38.75]
- **Angka berbeda pada `ex7katex1` (id vs ja; adaptasi-skala):** id=[15500, 2.5], ja=[15.5, 2.5]
- **Angka berbeda pada `ex7s2a` (id vs ja; nilai-beda):** id=[0, 15500], ja=[15.5, 2]
- **Angka berbeda pada `ex7s2c` (id vs ja; adaptasi-skala):** id=[15500, 25, 387500], ja=[1550, 25, 38750]
- **Angka berbeda pada `ex7s2d` (id vs ja; nilai-beda):** id=[1, 38750], ja=[3, 38.75]
- **Angka berbeda pada `ex8Q` (id vs ja; nilai-beda):** id=[100, 12650, 350, 8.5], ja=[1, 1.26, 100, 350, 8.5]
- **Angka berbeda pada `ex8ans` (id vs ja; nilai-beda):** id=[376337.5], ja=[37.49]
- **Angka berbeda pada `ex8katex2` (id vs ja; nilai-beda):** id=[12650, 29.75], ja=[1.26, 29.75]
- **Angka berbeda pada `ex8s3a` (id vs ja; nilai-beda):** id=[0, 12650, 2, 29.75], ja=[1.26, 2, 29.75]
- **Angka berbeda pada `ex8s3b` (id vs ja; nilai-beda):** id=[12650, 2975, 37633750], ja=[126, 2975, 374850]
- **Angka berbeda pada `ex8s3c` (id vs ja; nilai-beda):** id=[2, 376337.5], ja=[37.485, 37.49, 4]
- **Angka berbeda pada `ex9Q` (id vs ja; nilai-beda):** id=[0.3, 12.75, 25000, 8.4], ja=[0.3, 1, 12.75, 25, 8.4]
- **Angka berbeda pada `ex9ans` (id vs ja; adaptasi-mata-uang):** id=[29750000], ja=[29750]
- **Angka berbeda pada `ex9katex3` (id vs ja; nilai-beda):** id=[10, 107, 1190, 9], ja=[0.09, 107.1, 1190]
- **Angka berbeda pada `ex9katex4` (id vs ja; adaptasi-skala):** id=[1190, 25000, 29750000], ja=[1190, 25, 29750]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `ex3Q` (id vs en; adaptasi-mata-uang):** id=[1, 2, 3600000, 4, 5], en=[1, 2, 3600, 4, 5]
- **Angka berbeda pada `ex3ans` (id vs en; adaptasi-mata-uang):** id=[360000], en=[360]
- **Angka berbeda pada `ex3katex1` (id vs en; adaptasi-mata-uang):** id=[1, 10, 3600000], en=[1, 10, 3600]
- **Angka berbeda pada `ex3katex2` (id vs en; adaptasi-mata-uang):** id=[360000], en=[360]
- **Angka berbeda pada `ex12Q` (id vs ja; nilai-beda):** id=[1, 3, 4, 6], ja=[1, 2, 3, 4, 6]
- **Angka berbeda pada `ex3Q` (id vs ja; adaptasi-mata-uang):** id=[1, 2, 3600000, 4, 5], ja=[1, 2, 3600, 4, 5]
- **Angka berbeda pada `ex3ans` (id vs ja; adaptasi-mata-uang):** id=[360000], ja=[360]
- **Angka berbeda pada `ex3katex1` (id vs ja; adaptasi-mata-uang):** id=[1, 10, 3600000], ja=[1, 10, 3600]
- **Angka berbeda pada `ex3katex2` (id vs ja; adaptasi-mata-uang):** id=[360000], ja=[360]
- **Angka berbeda pada `ex8Q` (id vs ja; nilai-beda):** id=[1, 3, 5, 7, 9], ja=[1, 2, 3, 5, 7, 9]
- **Angka berbeda pada `ex8way1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]


## Topik fungsi-kuadrat

Tidak ada objek terjemahan per bahasa yang dapat dianalisis.

## Topik garis-dan-sudut

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx)

#### Peta 1: `uiMap` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2r4` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]
- **Angka berbeda pada `ex3n1` (id vs ja; nilai-beda):** id=[8], ja=[2, 8]
- **Angka berbeda pada `s2note` (id vs ja; nilai-beda):** id=[4], ja=[2, 4]
- **Angka berbeda pada `s2spTxt` (id vs ja; nilai-beda):** id=[90], ja=[2, 90]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx)

#### Peta 1: `uiMap` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `s1proofMid` (id vs ja; nilai-beda):** id=[180], ja=[180, 3]
- **Angka berbeda pada `s4how3` (id vs ja; nilai-beda):** id=[3], ja=[180, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx)

#### Peta 1: `uiMap` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `intisariP` (id vs ja; nilai-beda):** id=[8], ja=[2, 8]
- **Angka berbeda pada `s5tipEnd` (id vs ja; nilai-beda):** id=[180], ja=[180, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx)

#### Peta 1: `uiMap` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2q` (id vs ja; nilai-beda):** id=[4], ja=[2, 4]
- **Angka berbeda pada `s2p1` (id vs ja; nilai-beda):** id=[4], ja=[2, 4]
- **Angka berbeda pada `s3defTxt` (id vs ja; nilai-beda):** id=[180], ja=[180, 2]
- **Angka berbeda pada `s4defTxt` (id vs ja; nilai-beda):** id=[90], ja=[2, 90]


## Topik garis-singgung-lingkaran

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c1_problem` (id vs ja; nilai-beda):** id=[25, 6, 9], ja=[2, 25, 6, 9]
- **Angka berbeda pada `c2_problem` (id vs ja; nilai-beda):** id=[24, 26], ja=[2, 24, 26]
- **Angka berbeda pada `c3_problem` (id vs ja; nilai-beda):** id=[10, 21, 4, 6], ja=[10, 2, 21, 4, 6]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c1_problem` (id vs ja; nilai-beda):** id=[10, 17, 4], ja=[10, 17, 2, 4]
- **Angka berbeda pada `c2_problem` (id vs ja; nilai-beda):** id=[12, 3, 8], ja=[12, 2, 3, 8]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/MenghitungPanjangPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `def_summary` (id vs ja; nilai-beda):** id=[90], ja=[1, 90]
- **Angka berbeda pada `intro_tip` (id vs ja; nilai-beda):** id=[0, 1, 2], ja=[0, 1, 2, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c2_step1` (id vs en; nilai-beda):** id=[1, 2, 28, 4], en=[2, 28, 4]
- **Angka berbeda pada `c1_problem` (id vs ja; nilai-beda):** id=[22, 30, 7], ja=[2, 22, 30, 7]
- **Angka berbeda pada `c2_problem` (id vs ja; nilai-beda):** id=[14, 22, 7], ja=[14, 22, 3, 7]
- **Angka berbeda pada `c2_step1` (id vs ja; nilai-beda):** id=[1, 2, 28, 4], ja=[2, 28, 3, 4]
- **Angka berbeda pada `case1_title` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `sec_contoh1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `sec_contoh2` (id vs ja; nilai-beda):** id=[2], ja=[2, 3]
- **Angka berbeda pada `sec_contoh3` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]


## Topik himpunan

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx)

#### Peta 1: `translations` (baris 16)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx)

#### Peta 1: `translations` (baris 17)
Bahasa: id, en, ja
- **Angka berbeda pada `s1e2c` (id vs en; nilai-beda):** id=[10, 11.12, 19, 20, 9], en=[10, 11, 12, 19, 20, 9]
- **Angka berbeda pada `s2e1c` (id vs en; nilai-beda):** id=[1.2, 10, 100, 3, 9], en=[1, 10, 100, 2, 3, 9]
- **Angka berbeda pada `s3e3cAns` (id vs en; nilai-beda):** id=[2, 4, 4.2, 6], en=[2, 4, 6]
- **Angka berbeda pada `s4e1aAns` (id vs en; nilai-beda):** id=[1.2, 10, 3], en=[1, 10, 2]
- **Angka berbeda pada `s4e1cAns` (id vs en; nilai-beda):** id=[1.4, 25, 625, 9], en=[25]
- **Angka berbeda pada `s5pascalNote` (id vs en; nilai-beda):** id=[0.1], en=[0, 1]
- **Angka berbeda pada `s1e2c` (id vs ja; nilai-beda):** id=[10, 11.12, 19, 20, 9], ja=[10, 11, 12, 19, 20, 9]
- **Angka berbeda pada `s2e1c` (id vs ja; nilai-beda):** id=[1.2, 10, 100, 3, 9], ja=[1, 10, 100, 2, 3, 9]
- **Angka berbeda pada `s3e3cAns` (id vs ja; nilai-beda):** id=[2, 4, 4.2, 6], ja=[2, 4, 6]
- **Angka berbeda pada `s4e1aAns` (id vs ja; nilai-beda):** id=[1.2, 10, 3], ja=[1, 10, 2]
- **Angka berbeda pada `s4e1cAns` (id vs ja; nilai-beda):** id=[1.4, 25, 625, 9], ja=[25]
- **Angka berbeda pada `s5pascalNote` (id vs ja; nilai-beda):** id=[0.1], ja=[0, 1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `s4e1q` (id vs en; nilai-beda):** id=[1.2, 10], en=[1, 10, 2]
- **Angka berbeda pada `s4e1q` (id vs ja; nilai-beda):** id=[1.2, 10], ja=[1, 10, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx)

#### Peta 1: `translations` (baris 22)
Bahasa: id, en, ja
- **Angka berbeda pada `s1e3all` (id vs ja; nilai-beda):** id=[5, 8], ja=[3, 5, 8]
- **Angka berbeda pada `s1e3q` (id vs ja; nilai-beda):** id=[10, 12, 15, 25, 27, 32, 5, 60], ja=[10, 12, 15, 25, 27, 3, 32, 5, 60]
- **Angka berbeda pada `s2e3ans` (id vs ja; nilai-beda):** id=[14], ja=[14, 3]
- **Angka berbeda pada `s2e3q` (id vs ja; nilai-beda):** id=[12, 15, 20, 30, 38, 45, 80], ja=[1, 12, 15, 20, 3, 30, 38, 45, 80]
- **Angka berbeda pada `s3e3ans` (id vs ja; nilai-beda):** id=[60], ja=[1, 60]
- **Angka berbeda pada `s3e3q` (id vs ja; nilai-beda):** id=[10, 100, 30, 40, 50, 60], ja=[1, 10, 100, 2, 3, 30, 40, 50, 60]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Panjang array `s4e3opts` berbeda:** id=3, en=3, ja=4
- **Angka berbeda pada `s4e1a` (id vs ja; nilai-beda):** id=[7], ja=[1, 7]
- **Angka berbeda pada `s4emptyWarnText` (id vs ja; nilai-beda):** id=[0], ja=[0, 1]


## Topik kesebangunan-kekongruenan

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/DefinisiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/DefinisiPage.tsx)

#### Peta 1: `object@1219` (baris 1219)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `locale constants@1` (baris 19)
Bahasa: id, en, ja, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx)

#### Peta 1: `object@1221` (baris 1221)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- **Angka berbeda pada `fig10` (id vs ja; nilai-beda):** id=[10], ja=[10, 2]
- **Angka berbeda pada `fig11` (id vs ja; nilai-beda):** id=[11], ja=[11, 2]
- **Angka berbeda pada `fig2` (id vs ja; nilai-beda):** id=[2], ja=[2, 3]
- **Angka berbeda pada `fig3` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]
- **Angka berbeda pada `fig4` (id vs ja; nilai-beda):** id=[4], ja=[1, 2, 4]
- **Angka berbeda pada `fig5` (id vs ja; nilai-beda):** id=[5], ja=[2, 5]
- **Angka berbeda pada `fig6` (id vs ja; nilai-beda):** id=[6], ja=[2, 6]
- **Angka berbeda pada `fig7` (id vs ja; nilai-beda):** id=[7], ja=[2, 7]
- **Angka berbeda pada `fig8` (id vs ja; nilai-beda):** id=[8], ja=[2, 8]
- **Angka berbeda pada `fig9` (id vs ja; nilai-beda):** id=[9], ja=[2, 9]
- **Angka berbeda pada `k2_ara` (id vs ja; nilai-beda):** id=[3], ja=[1, 2, 3]
- **Angka berbeda pada `k2_rrr` (id vs ja; nilai-beda):** id=[1], ja=[1, 3]
- **Angka berbeda pada `sec_konsep1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]

#### Peta 2: `locale constants@1` (baris 14)
Bahasa: id, en, ja, ru
- **Angka berbeda pada `fig10` (id vs ja; nilai-beda):** id=[10], ja=[10, 2]
- **Angka berbeda pada `fig11` (id vs ja; nilai-beda):** id=[11], ja=[11, 2]
- **Angka berbeda pada `fig2` (id vs ja; nilai-beda):** id=[2], ja=[2, 3]
- **Angka berbeda pada `fig3` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]
- **Angka berbeda pada `fig4` (id vs ja; nilai-beda):** id=[4], ja=[1, 2, 4]
- **Angka berbeda pada `fig5` (id vs ja; nilai-beda):** id=[5], ja=[2, 5]
- **Angka berbeda pada `fig6` (id vs ja; nilai-beda):** id=[6], ja=[2, 6]
- **Angka berbeda pada `fig7` (id vs ja; nilai-beda):** id=[7], ja=[2, 7]
- **Angka berbeda pada `fig8` (id vs ja; nilai-beda):** id=[8], ja=[2, 8]
- **Angka berbeda pada `fig9` (id vs ja; nilai-beda):** id=[9], ja=[2, 9]
- **Angka berbeda pada `k2_ara` (id vs ja; nilai-beda):** id=[3], ja=[1, 2, 3]
- **Angka berbeda pada `k2_rrr` (id vs ja; nilai-beda):** id=[1], ja=[1, 3]
- **Angka berbeda pada `sec_konsep1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx)

#### Peta 1: `object@762` (baris 762)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- **Angka berbeda pada `exampleFourQuestion` (id vs ja; nilai-beda):** id=[12, 13, 24, 5], ja=[12, 13, 2, 24, 5]
- **Angka berbeda pada `tipCheck` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]

#### Peta 2: `numberLocales` (baris 771)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `locale constants@1` (baris 12)
Bahasa: id, en, ja, ru
- **Angka berbeda pada `exampleFourQuestion` (id vs ja; nilai-beda):** id=[12, 13, 24, 5], ja=[12, 13, 2, 24, 5]
- **Angka berbeda pada `tipCheck` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx)

#### Peta 1: `object@237` (baris 237)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `locale constants@1` (baris 11)
Bahasa: id, en, ja, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx)

#### Peta 1: `object@728` (baris 728)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- **Angka berbeda pada `aaExplanation` (id vs ja; nilai-beda):** id=[180], ja=[180, 2, 3]
- **Angka berbeda pada `example2Question` (id vs ja; nilai-beda):** id=[18, 4, 6], ja=[18, 2, 4, 6]
- **Angka berbeda pada `summaryThirdAngle` (id vs ja; nilai-beda):** id=[180], ja=[180, 2, 3]

#### Peta 2: `locale constants@1` (baris 13)
Bahasa: id, en, ja, ru
- **Angka berbeda pada `aaExplanation` (id vs ja; nilai-beda):** id=[180], ja=[180, 2, 3]
- **Angka berbeda pada `example2Question` (id vs ja; nilai-beda):** id=[18, 4, 6], ja=[18, 2, 4, 6]
- **Angka berbeda pada `summaryThirdAngle` (id vs ja; nilai-beda):** id=[180], ja=[180, 2, 3]


## Topik koordinat-cartesius

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage.tsx)

#### Peta 1: `translations` (baris 16)
Bahasa: id, en, ja
- **Angka berbeda pada `ex1Header` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `pt1Header` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifGarisPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `tip4` (id vs en; nilai-beda):** id=[2, 2.1, 3, 5.3], en=[1, 2, 3, 5]
- **Angka berbeda pada `visualHeader` (id vs en; nilai-beda):** id=[2.1], en=[1, 2]
- **Angka berbeda pada `step2note` (id vs ja; nilai-beda):** id=[-3, 5], ja=[-3, 2, 5]
- **Angka berbeda pada `tip4` (id vs ja; nilai-beda):** id=[2, 2.1, 3, 5.3], ja=[1, 2, 3, 5]
- **Angka berbeda pada `visualHeader` (id vs ja; nilai-beda):** id=[2.1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx)

#### Peta 1: `T` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `ex3aNote` (id vs ja; nilai-beda):** id=[-3, 5], ja=[-3, 2, 5]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik lingkaran

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/BusurJuringPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/BusurJuringPage.tsx)

#### Peta 1: `object@14` (baris 14)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx)

#### Peta 1: `object@13` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `k12Soal` (id vs ja; nilai-beda):** id=[14, 7], ja=[14, 2, 7]
- **Angka berbeda pada `k12Title` (id vs ja; nilai-beda):** id=[12, 22, 7], ja=[12, 2, 22, 7]
- **Angka berbeda pada `k13Title` (id vs ja; nilai-beda):** id=[13, 22, 7], ja=[13, 2, 22, 7]
- **Angka berbeda pada `k14Soal` (id vs ja; nilai-beda):** id=[7], ja=[2, 7]
- **Angka berbeda pada `k15Note3` (id vs ja; nilai-beda):** id=[4], ja=[2, 4]
- **Angka berbeda pada `k6Soal` (id vs ja; nilai-beda):** id=[14, 28, 7], ja=[14, 2, 28, 7]
- **Angka berbeda pada `k7KnownV` (id vs ja; nilai-beda):** id=[10, 90], ja=[1, 10, 4, 90]
- **Angka berbeda pada `k7Title` (id vs ja; nilai-beda):** id=[10, 3.14, 7], ja=[1, 10, 3.14, 4, 7]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarPage.tsx)

#### Peta 1: `object@13` (baris 13)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KelilingLuasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KelilingLuasPage.tsx)

#### Peta 1: `object@14` (baris 14)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/PenerapanKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/PenerapanKontekstualPage.tsx)

#### Peta 1: `object@13` (baris 13)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/SudutPusatKelilingPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/SudutPusatKelilingPage.tsx)

#### Peta 1: `object@16` (baris 16)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/UnsurUnsurPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/UnsurUnsurPage.tsx)

#### Peta 1: `object@14` (baris 14)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik peluang

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx)

#### Peta 1: `object@18` (baris 18)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@19` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@20` (baris 20)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `kali` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@28` (baris 28)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@58` (baris 58)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@79` (baris 79)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@115` (baris 115)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@160` (baris 160)
Bahasa: id, en, ja
- **Angka berbeda pada `s3q` (id vs ja; nilai-beda):** id=[2, 3, 300, 5], ja=[1, 2, 3, 300, 5]

#### Peta 10: `object@220` (baris 220)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@244` (baris 244)
Bahasa: id, en, ja
- **Angka berbeda pada `ringkasan[].isi` (id vs en; nilai-beda):** id=[0, 1000, 2, 20, 500], en=[0.02, 1000, 20, 500]
- **Angka berbeda pada `ringkasan[].isi` (id vs ja; nilai-beda):** id=[0, 1000, 2, 20, 500], ja=[0.02, 1000, 20, 500]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx)

#### Peta 1: `object@18` (baris 18)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@19` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@20` (baris 20)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `kali` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@28` (baris 28)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@55` (baris 55)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@76` (baris 76)
Bahasa: id, en, ja
- **Angka berbeda pada `p1` (id vs ja; nilai-beda):** id=[6], ja=[2, 6]

#### Peta 8: `object@127` (baris 127)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@184` (baris 184)
Bahasa: id, en, ja
- **Angka berbeda pada `s3step1sub` (id vs en; nilai-beda):** id=[1, 12, 6.6], en=[1, 12, 6]
- **Angka berbeda pada `s2q` (id vs ja; nilai-beda):** id=[3, 4, 5], ja=[1, 3, 4, 5]
- **Angka berbeda pada `s3q` (id vs ja; nilai-beda):** id=[12, 360], ja=[12, 2, 360]
- **Angka berbeda pada `s3step1sub` (id vs ja; nilai-beda):** id=[1, 12, 6.6], ja=[1, 12, 6]
- **Angka berbeda pada `s3total` (id vs ja; nilai-beda):** id=[36, 6], ja=[2, 36, 6]

#### Peta 10: `object@259` (baris 259)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@283` (baris 283)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangEmpirikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangEmpirikPage.tsx)

#### Peta 1: `object@28` (baris 28)
Bahasa: id, en, ja
- **Angka berbeda pada `s3q` (id vs ja; nilai-beda):** id=[1200, 36, 5000], ja=[1, 1200, 36, 5000]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx)

#### Peta 1: `object@27` (baris 27)
Bahasa: id, en, ja
- **Angka berbeda pada `s3aPairs` (id vs en; nilai-beda):** id=[1.6, 2.5, 3.4, 4.3, 5.2, 6, 6.1], en=[1, 2, 3, 4, 5, 6]
- **Angka berbeda pada `s3bPairs` (id vs en; nilai-beda):** id=[1.3, 2.4, 3.1, 3.5, 4.2, 4.6, 5.3, 6.4, 8], en=[1, 2, 3, 4, 5, 6, 8]
- **Angka berbeda pada `s2q` (id vs ja; nilai-beda):** id=[52], ja=[1, 52]
- **Angka berbeda pada `s3aPairs` (id vs ja; nilai-beda):** id=[1.6, 2.5, 3.4, 4.3, 5.2, 6, 6.1], ja=[1, 2, 3, 4, 5, 6]
- **Angka berbeda pada `s3b` (id vs ja; nilai-beda):** id=[2], ja=[1, 2]
- **Angka berbeda pada `s3bPairs` (id vs ja; nilai-beda):** id=[1.3, 2.4, 3.1, 3.5, 4.2, 4.6, 5.3, 6.4, 8], ja=[1, 2, 3, 4, 5, 6, 8]
- **Angka berbeda pada `s3q` (id vs ja; nilai-beda):** id=[2, 7], ja=[1, 2, 7]


## Topik perbandingan

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Check` (id vs en; adaptasi-skala):** id=[180000, 40000, 60000, 80000], en=[180, 40, 60, 80]
- **Angka berbeda pada `c1Math1` (id vs en; adaptasi-mata-uang):** id=[1, 180000, 20000, 9], en=[1, 180, 20, 9]
- **Angka berbeda pada `c1Math2` (id vs en; adaptasi-mata-uang):** id=[2, 20000, 40000], en=[2, 20, 40]
- **Angka berbeda pada `c1Math3` (id vs en; adaptasi-mata-uang):** id=[20000, 3, 60000], en=[20, 3, 60]
- **Angka berbeda pada `c1Math4` (id vs en; adaptasi-mata-uang):** id=[20000, 4, 80000], en=[20, 4, 80]
- **Angka berbeda pada `c1Q` (id vs en; adaptasi-mata-uang):** id=[180000, 2, 3, 4], en=[180, 2, 3, 4]
- **Angka berbeda pada `c3Check` (id vs en; adaptasi-skala):** id=[315000, 35000, 350000], en=[315, 35, 350]
- **Angka berbeda pada `c3Math1` (id vs en; adaptasi-mata-uang):** id=[1, 35000], en=[1, 35]
- **Angka berbeda pada `c3Math2` (id vs en; adaptasi-mata-uang):** id=[315000, 35000, 9], en=[315, 35, 9]
- **Angka berbeda pada `c3Math3` (id vs en; adaptasi-mata-uang):** id=[12, 35000, 420000], en=[12, 35, 420]
- **Angka berbeda pada `c3Math4` (id vs en; adaptasi-mata-uang):** id=[10, 35000, 350000], en=[10, 35, 350]
- **Angka berbeda pada `c3Math5` (id vs en; adaptasi-mata-uang):** id=[10, 1085000, 12, 31, 35000, 9], en=[10, 1085, 12, 31, 35, 9]
- **Angka berbeda pada `c3Q` (id vs en; adaptasi-mata-uang):** id=[3, 35000, 4, 5, 6], en=[3, 35, 4, 5, 6]
- **Angka berbeda pada `c3S3` (id vs en; adaptasi-mata-uang):** id=[1, 10, 35000, 9], en=[1, 10, 35, 9]
- **Angka berbeda pada `c1Check` (id vs ja; adaptasi-skala):** id=[180000, 40000, 60000, 80000], ja=[180, 40, 60, 80]
- **Angka berbeda pada `c1Math1` (id vs ja; adaptasi-mata-uang):** id=[1, 180000, 20000, 9], ja=[1, 180, 20, 9]
- **Angka berbeda pada `c1Math2` (id vs ja; adaptasi-mata-uang):** id=[2, 20000, 40000], ja=[2, 20, 40]
- **Angka berbeda pada `c1Math3` (id vs ja; adaptasi-mata-uang):** id=[20000, 3, 60000], ja=[20, 3, 60]
- **Angka berbeda pada `c1Math4` (id vs ja; adaptasi-mata-uang):** id=[20000, 4, 80000], ja=[20, 4, 80]
- **Angka berbeda pada `c1Q` (id vs ja; adaptasi-mata-uang):** id=[180000, 2, 3, 4], ja=[180, 2, 3, 4]
- **Angka berbeda pada `c3Check` (id vs ja; adaptasi-skala):** id=[315000, 35000, 350000], ja=[315, 35, 350]
- **Angka berbeda pada `c3Math1` (id vs ja; adaptasi-mata-uang):** id=[1, 35000], ja=[1, 35]
- **Angka berbeda pada `c3Math2` (id vs ja; adaptasi-mata-uang):** id=[315000, 35000, 9], ja=[315, 35, 9]
- **Angka berbeda pada `c3Math3` (id vs ja; adaptasi-mata-uang):** id=[12, 35000, 420000], ja=[12, 35, 420]
- **Angka berbeda pada `c3Math4` (id vs ja; adaptasi-mata-uang):** id=[10, 35000, 350000], ja=[10, 35, 350]
- **Angka berbeda pada `c3Math5` (id vs ja; adaptasi-mata-uang):** id=[10, 1085000, 12, 31, 35000, 9], ja=[10, 1085, 12, 31, 35, 9]
- **Angka berbeda pada `c3Q` (id vs ja; adaptasi-mata-uang):** id=[3, 35000, 4, 5, 6], ja=[3, 35, 4, 5, 6]
- **Angka berbeda pada `c3S3` (id vs ja; adaptasi-mata-uang):** id=[1, 10, 35000, 9], ja=[1, 10, 35, 9]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `c2Result` (id vs ja; nilai-beda):** id=[13.3, 14], ja=[14]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx)

#### Peta 1: `translations` (baris 166)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Math1` (id vs en; adaptasi-skala):** id=[20000, 5, 8], en=[20, 5, 8]
- **Angka berbeda pada `c1Math2` (id vs en; adaptasi-skala):** id=[160000, 32000], en=[160, 32]
- **Angka berbeda pada `c1Q` (id vs en; adaptasi-mata-uang):** id=[20000, 5, 8], en=[20, 5, 8]
- **Angka berbeda pada `c1R1c2` (id vs en; adaptasi-mata-uang):** id=[20000], en=[20]
- **Angka berbeda pada `c1Result` (id vs en; adaptasi-mata-uang):** id=[32000, 8], en=[32, 8]
- **Angka berbeda pada `c1Math1` (id vs ja; adaptasi-skala):** id=[20000, 5, 8], ja=[20, 5, 8]
- **Angka berbeda pada `c1Math2` (id vs ja; adaptasi-skala):** id=[160000, 32000], ja=[160, 32]
- **Angka berbeda pada `c1Q` (id vs ja; adaptasi-mata-uang):** id=[20000, 5, 8], ja=[20, 5, 8]
- **Angka berbeda pada `c1R1c2` (id vs ja; adaptasi-mata-uang):** id=[20000], ja=[20]
- **Angka berbeda pada `c1Result` (id vs ja; adaptasi-mata-uang):** id=[32000, 8], ja=[32, 8]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `c1BMath` (id vs en; adaptasi-mata-uang):** id=[15000, 3, 5000], en=[15, 3, 5]
- **Angka berbeda pada `c1BResult` (id vs en; adaptasi-mata-uang):** id=[1, 5000], en=[1, 5]
- **Angka berbeda pada `c1CMath` (id vs en; adaptasi-mata-uang):** id=[12, 5000, 60000], en=[12, 5, 60]
- **Angka berbeda pada `c1CResult` (id vs en; adaptasi-mata-uang):** id=[60000], en=[60]
- **Angka berbeda pada `c1Q` (id vs en; adaptasi-mata-uang):** id=[1, 12, 15000, 3, 8], en=[1, 12, 15, 3, 8]
- **Angka berbeda pada `c3DafaM2Math` (id vs en; adaptasi-mata-uang):** id=[2, 24000, 3, 36000], en=[2, 24, 3, 36]
- **Angka berbeda pada `c3DafaMath` (id vs en; adaptasi-mata-uang):** id=[12000, 3, 36000], en=[12, 3, 36]
- **Angka berbeda pada `c3Q` (id vs en; adaptasi-mata-uang):** id=[24000, 3, 5], en=[24, 3, 5]
- **Angka berbeda pada `c3RaniM2Math` (id vs en; adaptasi-mata-uang):** id=[2, 24000, 5, 60000], en=[2, 24, 5, 60]
- **Angka berbeda pada `c3RaniMath` (id vs en; adaptasi-mata-uang):** id=[12000, 5, 60000], en=[12, 5, 60]
- **Angka berbeda pada `c3TotalM2Math` (id vs en; adaptasi-mata-uang):** id=[2, 24000, 8, 96000], en=[2, 24, 8, 96]
- **Angka berbeda pada `c3TotalMath` (id vs en; adaptasi-mata-uang):** id=[36000, 60000, 96000], en=[36, 60, 96]
- **Angka berbeda pada `c3VarEq` (id vs en; adaptasi-skala):** id=[24000], en=[24]
- **Angka berbeda pada `c3VarSolve` (id vs en; adaptasi-skala):** id=[12000, 24000], en=[12, 24]
- **Angka berbeda pada `c1BMath` (id vs ja; adaptasi-mata-uang):** id=[15000, 3, 5000], ja=[15, 3, 5]
- **Angka berbeda pada `c1BResult` (id vs ja; adaptasi-mata-uang):** id=[1, 5000], ja=[1, 5]
- **Angka berbeda pada `c1CMath` (id vs ja; adaptasi-mata-uang):** id=[12, 5000, 60000], ja=[12, 5, 60]
- **Angka berbeda pada `c1CResult` (id vs ja; adaptasi-mata-uang):** id=[60000], ja=[60]
- **Angka berbeda pada `c1Q` (id vs ja; adaptasi-mata-uang):** id=[1, 12, 15000, 3, 8], ja=[1, 12, 15, 3, 8]
- **Angka berbeda pada `c2Check` (id vs ja; nilai-beda):** id=[12, 16, 20, 48], ja=[12, 16, 20]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[3, 4, 48, 5], ja=[3, 4, 5]
- **Angka berbeda pada `c2Title` (id vs ja; nilai-beda):** id=[2], ja=[2, 3]
- **Angka berbeda pada `c3DafaM2Math` (id vs ja; adaptasi-mata-uang):** id=[2, 24000, 3, 36000], ja=[2, 24, 3, 36]
- **Angka berbeda pada `c3DafaMath` (id vs ja; adaptasi-mata-uang):** id=[12000, 3, 36000], ja=[12, 3, 36]
- **Angka berbeda pada `c3Q` (id vs ja; nilai-beda):** id=[24000, 3, 5], ja=[2, 24, 3, 5]
- **Angka berbeda pada `c3RaniM2Math` (id vs ja; adaptasi-mata-uang):** id=[2, 24000, 5, 60000], ja=[2, 24, 5, 60]
- **Angka berbeda pada `c3RaniMath` (id vs ja; adaptasi-mata-uang):** id=[12000, 5, 60000], ja=[12, 5, 60]
- **Angka berbeda pada `c3TotalM2Math` (id vs ja; adaptasi-mata-uang):** id=[2, 24000, 8, 96000], ja=[2, 24, 8, 96]
- **Angka berbeda pada `c3TotalMath` (id vs ja; adaptasi-mata-uang):** id=[36000, 60000, 96000], ja=[36, 60, 96]
- **Angka berbeda pada `c3VarEq` (id vs ja; adaptasi-skala):** id=[24000], ja=[24]
- **Angka berbeda pada `c3VarSolve` (id vs ja; adaptasi-skala):** id=[12000, 24000], ja=[12, 24]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Q` (id vs ja; nilai-beda):** id=[1, 2000000, 4.5], ja=[1, 2, 2000000, 4]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[15, 24, 3], ja=[1, 2, 3]
- **Angka berbeda pada `c2ResultB` (id vs ja; nilai-beda):** id=[4.8], ja=[4]
- **Angka berbeda pada `c2UbahA` (id vs ja; adaptasi-skala):** id=[100000, 15, 1500000], ja=[100, 15, 1500]
- **Angka berbeda pada `c2UbahB` (id vs ja; nilai-beda):** id=[24, 2400000], ja=[2400]
- **Angka berbeda pada `c3Q` (id vs ja; nilai-beda):** id=[1, 1000, 12, 800], ja=[1, 1000, 12]
- **Angka berbeda pada `c3ResultA` (id vs ja; nilai-beda):** id=[1200], ja=[1]
- **Angka berbeda pada `readNote` (id vs ja; nilai-beda):** id=[1, 5, 500000], ja=[1, 500, 500000]


## Topik persamaan-garis-lurus

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/AplikasiKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/AplikasiKontekstualPage.tsx)

#### Peta 1: `object@49` (baris 49)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx)

#### Peta 1: `T_GRADIEN` (baris 15)
Bahasa: id, en, ja
- **Angka berbeda pada `c1_sb2` (id vs ja; nilai-beda):** id=[-3, -4, 1, 4], ja=[-3, -4, 1, 2, 4]
- **Angka berbeda pada `c4_ans` (id vs ja; nilai-beda):** id=[-2, 0, 1, 2], ja=[-2, 0, 1, 2, 3]
- **Angka berbeda pada `c4_l1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `c4_ver` (id vs ja; nilai-beda):** id=[-2, 0, 2, 4], ja=[-2, 0, 2, 3, 4]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx)

#### Peta 1: `T_GRAFIK` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `c2_l1_title` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `titikpotong_p1` (id vs ja; nilai-beda):** id=[0], ja=[0, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx)

#### Peta 1: `T_HUBUNGAN` (baris 97)
Bahasa: id, en, ja
- **Angka berbeda pada `sej_p1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `sej_p2` (id vs ja; nilai-beda):** id=[5], ja=[2]
- **Angka berbeda pada `tek_sub` (id vs ja; nilai-beda):** id=[-1], ja=[-1, 2]
- **Angka berbeda pada `vis_tabel_rows[][]` (id vs ja; nilai-beda):** id=[90], ja=[1, 90]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx)

#### Peta 1: `T_MENENTUKAN` (baris 69)
Bahasa: id, en, ja
- **Angka berbeda pada `c2_p1` (id vs en; nilai-beda):** id=[2], en=[1]
- **Angka berbeda pada `sk2_exLabel` (id vs en; nilai-beda):** id=[0.1, 3.7], en=[0, 1, 3, 7]
- **Angka berbeda pada `c2_p1` (id vs ja; nilai-beda):** id=[2], ja=[1]
- **Angka berbeda pada `c3_cara1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `c3_l1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `iv3_l1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `sk2_exLabel` (id vs ja; nilai-beda):** id=[0.1, 3.7], ja=[0, 1, 3, 7]


## Topik persamaan-kuadrat

Tidak ada objek terjemahan per bahasa yang dapat dianalisis.

## Topik plsv-ptlsv

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/KalimatTerbukaTertutupPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/KalimatTerbukaTertutupPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **ja, key tambahan:** `terbukaDefBody4`

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c3Q` (id vs en; adaptasi-mata-uang):** id=[2000, 22000, 3, 5], en=[2, 22, 3, 5]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[28, 3], ja=[2, 28, 3]
- **Angka berbeda pada `c3Q` (id vs ja; adaptasi-mata-uang):** id=[2000, 22000, 3, 5], ja=[2, 22, 3, 5]
- **Angka berbeda pada `introBox` (id vs ja; nilai-beda):** id=[35, 5], ja=[2, 35, 5]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c3Q` (id vs en; adaptasi-mata-uang):** id=[10, 150000, 5000, 8000], en=[10, 150, 5, 8]
- **Angka berbeda pada `currency.a` (id vs en; adaptasi-mata-uang):** id=[8000], en=[8]
- **Angka berbeda pada `currency.b` (id vs en; adaptasi-mata-uang):** id=[5000], en=[5]
- **Angka berbeda pada `currency.budget` (id vs en; adaptasi-mata-uang):** id=[150000], en=[150]
- **Angka berbeda pada `currency.hint` (id vs en; adaptasi-mata-uang):** id=[12000], en=[12]
- **Angka berbeda pada `currency.pocket` (id vs en; adaptasi-mata-uang):** id=[50000], en=[50]
- **Angka berbeda pada `introBox` (id vs en; adaptasi-mata-uang):** id=[12000, 50000], en=[12, 50]
- **Angka berbeda pada `c1Q` (id vs ja; nilai-beda):** id=[480, 60], ja=[1]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[70, 75, 78, 80], ja=[3, 4, 70, 75, 78, 80]
- **Angka berbeda pada `c3Q` (id vs ja; nilai-beda):** id=[10, 150000, 5000, 8000], ja=[1, 10, 150, 2, 5, 8]
- **Angka berbeda pada `currency.a` (id vs ja; adaptasi-mata-uang):** id=[8000], ja=[8]
- **Angka berbeda pada `currency.b` (id vs ja; adaptasi-mata-uang):** id=[5000], ja=[5]
- **Angka berbeda pada `currency.budget` (id vs ja; adaptasi-mata-uang):** id=[150000], ja=[150]
- **Angka berbeda pada `currency.hint` (id vs ja; adaptasi-mata-uang):** id=[12000], ja=[12]
- **Angka berbeda pada `currency.pocket` (id vs ja; adaptasi-mata-uang):** id=[50000], ja=[50]
- **Angka berbeda pada `introBox` (id vs ja; nilai-beda):** id=[12000, 50000], ja=[1, 12, 50]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPLSVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPtLSVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `introBody` (id vs en; adaptasi-mata-uang):** id=[50000, 75], en=[50, 75]
- **Angka berbeda pada `c3a` (id vs ja; nilai-beda):** id=[11, 3], ja=[11, 2, 3]
- **Angka berbeda pada `introBody` (id vs ja; adaptasi-mata-uang):** id=[50000, 75], ja=[50, 75]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PenyelesaianPLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PenyelesaianPLSVPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PenyelesaianPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PenyelesaianPtLSVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik pola-bilangan

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx)

#### Peta 1: `translations` (baris 29)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2Step1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `ex3Pattern` (id vs ja; nilai-beda):** id=[2], ja=[1, 2]
- **Angka berbeda pada `ex3Step1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `polaDescs[]` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2Problem` (id vs ja; nilai-beda):** id=[15, 23, 39, 5, 9], ja=[1, 15, 23, 39, 5, 9]
- **Angka berbeda pada `ex2bProblem` (id vs ja; nilai-beda):** id=[10, 155, 5], ja=[1, 10, 155, 5]
- **Angka berbeda pada `ex3Ans` (id vs ja; nilai-beda):** id=[18, 25, 66], ja=[1, 18, 25, 66]
- **Angka berbeda pada `ex3Problem` (id vs ja; nilai-beda):** id=[10, 2, 25, 36], ja=[1, 10, 2, 25, 36]
- **Angka berbeda pada `formula2Label` (id vs ja; nilai-beda):** id=[2], ja=[1, 2]
- **Angka berbeda pada `howToUseBody` (id vs ja; nilai-beda):** id=[1, 100, 20, 5], ja=[1, 100, 2, 20, 5]
- **Angka berbeda pada `introBody` (id vs ja; nilai-beda):** id=[10, 13, 16, 3], ja=[1, 10, 13, 16, 2, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2Ans` (id vs en; nilai-beda):** id=[10, 2, 3, 366, 39], en=[10, 2, 3, 39366]
- **Angka berbeda pada `ex3Step2Table[].val` (id vs en; nilai-beda):** id=[1, 2, 2149.9, 500], en=[1.2, 2149.9, 500]
- **Angka berbeda pada `ex3bStep1` (id vs en; nilai-beda):** id=[12, 6, 75, 9], en=[12, 6.75, 9]
- **Angka berbeda pada `ex2Ans` (id vs ja; nilai-beda):** id=[10, 2, 3, 366, 39], ja=[10, 2, 3, 39366]
- **Angka berbeda pada `ex2Problem` (id vs ja; nilai-beda):** id=[10, 18, 3, 486, 6], ja=[1, 10, 18, 3, 486, 6]
- **Angka berbeda pada `ex2bProblem` (id vs ja; nilai-beda):** id=[2, 5, 62], ja=[1, 2, 5, 62]
- **Angka berbeda pada `ex3Problem` (id vs ja; nilai-beda):** id=[20, 2000, 500, 6], ja=[1, 20, 2000, 500, 6]
- **Angka berbeda pada `ex3Step2Table[].val` (id vs ja; nilai-beda):** id=[1, 2, 2149.9, 500], ja=[1.2, 2149.9, 500]
- **Angka berbeda pada `ex3bStep1` (id vs ja; nilai-beda):** id=[12, 6, 75, 9], ja=[12, 6.75, 9]
- **Angka berbeda pada `seriesSummaryBody` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `step1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `fibonacci.desc` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `pascal.desc` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]


## Topik relasi-fungsi

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx)

#### Peta 1: `object@27` (baris 27)
Bahasa: id, en, ja
- **Angka berbeda pada `koresp_visual_yes_note` (id vs ja; nilai-beda):** id=[3], ja=[1, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BukuAnimasiBanyakFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BukuAnimasiBanyakFungsiPage.tsx)

#### Peta 1: `object@9` (baris 9)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx)

#### Peta 1: `object@13` (baris 13)
Bahasa: id, en, ja
- **en, key id yang tidak ada:** `graph1_sub`, `graph1_title`, `graph2_sub`, `graph2_title`
- **ja, key id yang tidak ada:** `graph1_sub`, `graph1_title`, `graph2_sub`, `graph2_title`
- **Angka berbeda pada `c2_opts[].teks` (id vs en; adaptasi-mata-uang):** id=[25000], en=[25]
- **Angka berbeda pada `c2_steps[]` (id vs en; nilai-beda):** id=[15, 22, 22000, 3, 5, 7], en=[15, 22, 3, 5, 7]
- **Angka berbeda pada `c2_opts[].teks` (id vs ja; adaptasi-mata-uang):** id=[25000], ja=[25]
- **Angka berbeda pada `c2_steps[]` (id vs ja; nilai-beda):** id=[15, 22, 22000, 3, 5, 7], ja=[15, 22, 3, 5, 7]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/NotasiFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/NotasiFungsiPage.tsx)

#### Peta 1: `object@14` (baris 14)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `c2Diagrams[].penj` (id vs ja; nilai-beda):** id=[2], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianRelasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianRelasiPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik segitiga-segiempat

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/GarisBeratBagiTinggiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/GarisBeratBagiTinggiPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- **Angka berbeda pada `ex1tip` (id vs ja; nilai-beda):** id=[10, 15, 5], ja=[10, 15, 2, 5]
- **Angka berbeda pada `medCountText` (id vs ja; nilai-beda):** id=[3], ja=[1, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/KelilingLuasBangunTakBeraturanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/KelilingLuasBangunTakBeraturanPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/KelilingSegitigaSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/KelilingSegitigaSegiempatPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2q2` (id vs ja; nilai-beda):** id=[50000], ja=[1, 50000]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- **Angka berbeda pada `s4tipText` (id vs en; nilai-beda):** id=[1, 10, 100], en=[10, 100]
- **Angka berbeda pada `ex1q` (id vs ja; nilai-beda):** id=[6, 8], ja=[2, 6, 8]
- **Angka berbeda pada `ex2q2` (id vs ja; nilai-beda):** id=[12000], ja=[1, 12000]
- **Angka berbeda pada `s4tipText` (id vs ja; nilai-beda):** id=[1, 10, 100], ja=[-1, 1, 10, 100, 2]


## Topik spldv

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `introDesc` (id vs en; adaptasi-mata-uang):** id=[1, 2, 23000, 25000], en=[1, 2, 23, 25]
- **Angka berbeda pada `quiz2Choices[].p1` (id vs en; adaptasi-skala):** id=[11000, 14000, 2, 25000, 7000], en=[11, 14, 2, 25, 7]
- **Angka berbeda pada `quiz2Choices[].p2` (id vs en; adaptasi-skala):** id=[11000, 2, 22000, 23000, 29000, 7000], en=[11, 2, 22, 23, 29, 7]
- **Angka berbeda pada `introDesc` (id vs ja; adaptasi-mata-uang):** id=[1, 2, 23000, 25000], ja=[1, 2, 23, 25]
- **Angka berbeda pada `introTip` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `pldvSummaryDesc` (id vs ja; nilai-beda):** id=[0, 1], ja=[0, 1, 2]
- **Angka berbeda pada `quiz2Choices[].p1` (id vs ja; adaptasi-skala):** id=[11000, 14000, 2, 25000, 7000], ja=[11, 14, 2, 25, 7]
- **Angka berbeda pada `quiz2Choices[].p2` (id vs ja; adaptasi-skala):** id=[11000, 2, 22000, 23000, 29000, 7000], ja=[11, 2, 22, 23, 29, 7]
- **Angka berbeda pada `secPLDV` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeCampuranPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `q3` (id vs ja; nilai-beda):** id=[14, 2, 24.5, 3, 4, 5], ja=[14, 24.5]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- **Angka berbeda pada `q3Answer` (id vs en; nilai-beda):** id=[1, 10, 16, 80], en=[10.8, 16.8]
- **Angka berbeda pada `q3L2Note` (id vs en; nilai-beda):** id=[2], en=[1, 2]
- **Angka berbeda pada `q3` (id vs ja; nilai-beda):** id=[132, 2, 3, 4, 6, 72], ja=[132, 2, 72]
- **Angka berbeda pada `q3Answer` (id vs ja; nilai-beda):** id=[1, 10, 16, 80], ja=[10.8, 16.8]
- **Angka berbeda pada `q3L2Note` (id vs ja; nilai-beda):** id=[2], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeGrafikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeGrafikPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `summaryDesc` (id vs ja; nilai-beda):** id=[0], ja=[0, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `step4Desc` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/ModelSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/ModelSPLDVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `q2Problem` (id vs ja; nilai-beda):** id=[27, 3], ja=[2, 27, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `q1Answer` (id vs en; nilai-beda):** id=[1, 10, 11, 20], en=[1, 10.2, 11.2]
- **Angka berbeda pada `q1Answer` (id vs ja; nilai-beda):** id=[1, 10, 11, 20], ja=[10.2, 11.2]
- **Angka berbeda pada `q1Problem` (id vs ja; nilai-beda):** id=[1, 2, 3, 4, 52, 54], ja=[52, 54]
- **Angka berbeda pada `q2Problem` (id vs ja; nilai-beda):** id=[56], ja=[2, 3, 4, 5, 56]
- **Angka berbeda pada `q3L2Rel2` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]
- **Angka berbeda pada `q3Problem` (id vs ja; nilai-beda):** id=[3, 54], ja=[2, 3, 54]


## Topik statistika

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx)

#### Peta 1: `object@18` (baris 18)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@19` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@20` (baris 20)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@26` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@53` (baris 53)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@80` (baris 80)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@122` (baris 122)
Bahasa: id, en, ja
- **Angka berbeda pada `step3BLabel` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]
- **Angka berbeda pada `step3Label` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]

#### Peta 8: `object@200` (baris 200)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@260` (baris 260)
Bahasa: id, en, ja
- **Angka berbeda pada `footerSubtitle` (id vs ja; nilai-beda):** id=[-50, 50], ja=[-50, 2, 50]

#### Peta 10: `object@314` (baris 314)
Bahasa: id, en, ja
- **Angka berbeda pada `kesimpulan` (id vs ja; nilai-beda):** id=[4], ja=[2, 4]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx)

#### Peta 1: `object@22` (baris 22)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@23` (baris 23)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@24` (baris 24)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@25` (baris 25)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@26` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@61` (baris 61)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@530` (baris 530)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@916` (baris 916)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@946` (baris 946)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@979` (baris 979)
Bahasa: id, en, ja
- **Angka berbeda pada `compareText` (id vs ja; nilai-beda):** id=[100, 23, 3, 4, 5], ja=[100000000, 23000000, 3000000, 4000000, 5, 5000000]

#### Peta 11: `object@1009` (baris 1009)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@1054` (baris 1054)
Bahasa: id, en, ja
- **Angka berbeda pada `illustExplainA` (id vs ja; nilai-beda):** id=[4, 5], ja=[2, 4, 5]

#### Peta 13: `object@1108` (baris 1108)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 14: `object@1153` (baris 1153)
Bahasa: id, en, ja
- **Angka berbeda pada `bisaLebih` (id vs ja; nilai-beda):** id=[1], ja=[2]

#### Peta 15: `object@1195` (baris 1195)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PengantarStatistikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PengantarStatistikaPage.tsx)

#### Peta 1: `rangkumanData` (baris 48)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyajianDataPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyajianDataPage.tsx)

#### Peta 1: `object@30` (baris 30)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@36` (baris 36)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@54` (baris 54)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@398` (baris 398)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `locale constants@100` (baris 101)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyebaranDataPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyebaranDataPage.tsx)

#### Peta 1: `object@13` (baris 13)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@19` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@40` (baris 40)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/RataRataPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/RataRataPage.tsx)

#### Peta 1: `rangkumanData` (baris 336)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik teorema-pythagoras

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `colDescRight` (id vs ja; nilai-beda):** id=[90], ja=[1, 90]
- **Angka berbeda pada `obtuseDesc` (id vs ja; nilai-beda):** id=[90], ja=[1, 90]
- **Angka berbeda pada `rightDesc` (id vs ja; nilai-beda):** id=[90], ja=[1, 90]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Ans` (id vs ja; nilai-beda):** id=[10, 3, 4, 5, 6, 8], ja=[10, 2, 3, 4, 5, 6, 8]
- **Angka berbeda pada `c2Ans` (id vs ja; nilai-beda):** id=[14.72], ja=[14]
- **Angka berbeda pada `c2Problem` (id vs ja; nilai-beda):** id=[13.4, 2, 6.1], ja=[13, 2, 6]
- **Angka berbeda pada `c3Problem` (id vs ja; nilai-beda):** id=[15, 20, 36], ja=[2]
- **Angka berbeda pada `sec_contoh3` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c3Ans2` (id vs ja; nilai-beda):** id=[11.4], ja=[11]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/PembuktianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/PembuktianPage.tsx)

#### Peta 1: `PP_TRANSLATIONS` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c3Problem` (id vs ja; nilai-beda):** id=[12, 45, 90], ja=[45, 90]
- **Angka berbeda pada `c3Step2` (id vs ja; nilai-beda):** id=[2, 45, 90], ja=[2]
- **Angka berbeda pada `sec_contoh3` (id vs ja; nilai-beda):** id=[3], ja=[2, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `primitiveDesc3` (id vs ja; nilai-beda):** id=[1], ja=[1, 3]
- **Angka berbeda pada `tableTip` (id vs ja; nilai-beda):** id=[1, 5], ja=[1, 2, 5]

#### Peta 2: `LIMA_TIPE_LABELS` (baris 298)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik transformasi-geometri

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage.tsx)

#### Peta 1: `object@289` (baris 289)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@290` (baris 290)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@291` (baris 291)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@292` (baris 292)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@293` (baris 293)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@294` (baris 294)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@295` (baris 295)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@296` (baris 296)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@297` (baris 297)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@298` (baris 298)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@299` (baris 299)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@300` (baris 300)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 13: `object@301` (baris 301)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 14: `object@302` (baris 302)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 15: `object@303` (baris 303)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 16: `object@304` (baris 304)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 17: `object@305` (baris 305)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 18: `object@306` (baris 306)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 19: `object@307` (baris 307)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 20: `object@308` (baris 308)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 21: `object@309` (baris 309)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 22: `object@310` (baris 310)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 23: `object@311` (baris 311)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 24: `object@312` (baris 312)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 25: `object@313` (baris 313)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 26: `object@314` (baris 314)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 27: `object@315` (baris 315)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 28: `object@316` (baris 316)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 29: `object@317` (baris 317)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 30: `object@318` (baris 318)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 31: `object@319` (baris 319)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 32: `object@320` (baris 320)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 33: `object@321` (baris 321)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 34: `object@322` (baris 322)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 35: `object@323` (baris 323)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 36: `object@324` (baris 324)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 37: `object@325` (baris 325)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 38: `object@326` (baris 326)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 39: `object@327` (baris 327)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 40: `object@328` (baris 328)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 41: `object@329` (baris 329)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 42: `object@330` (baris 330)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 43: `object@331` (baris 331)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 44: `object@332` (baris 332)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 45: `object@333` (baris 333)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 46: `object@334` (baris 334)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 47: `object@335` (baris 335)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 48: `object@336` (baris 336)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 49: `object@337` (baris 337)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 50: `object@338` (baris 338)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 51: `object@339` (baris 339)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 52: `object@340` (baris 340)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 53: `object@344` (baris 344)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 54: `object@345` (baris 345)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 55: `object@346` (baris 346)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 56: `object@347` (baris 347)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 57: `object@348` (baris 348)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 58: `object@349` (baris 349)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 59: `object@1775` (baris 1775)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 60: `object@1776` (baris 1776)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 61: `object@1777` (baris 1777)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 62: `object@1778` (baris 1778)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 63: `object@1783` (baris 1783)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 64: `object@1788` (baris 1788)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 65: `object@1793` (baris 1793)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 66: `object@1794` (baris 1794)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 67: `object@1795` (baris 1795)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 68: `object@1796` (baris 1796)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 69: `object@1797` (baris 1797)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 70: `object@1799` (baris 1799)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 71: `object@1800` (baris 1800)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 72: `object@1801` (baris 1801)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 73: `object@1802` (baris 1802)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 74: `object@1803` (baris 1803)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 75: `object@1804` (baris 1804)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 76: `object@1805` (baris 1805)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 77: `object@1810` (baris 1810)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 78: `object@1815` (baris 1815)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 79: `object@1816` (baris 1816)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 80: `object@1817` (baris 1817)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 81: `object@1818` (baris 1818)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 82: `object@1820` (baris 1820)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 83: `object@1821` (baris 1821)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 84: `object@1822` (baris 1822)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 85: `object@1823` (baris 1823)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 86: `object@1824` (baris 1824)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 87: `object@1825` (baris 1825)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 88: `object@1826` (baris 1826)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 89: `object@1827` (baris 1827)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 90: `object@1828` (baris 1828)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 91: `object@1829` (baris 1829)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 92: `object@1830` (baris 1830)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 93: `object@1831` (baris 1831)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 94: `object@1832` (baris 1832)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 95: `object@1833` (baris 1833)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 96: `object@1834` (baris 1834)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 97: `object@1835` (baris 1835)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 98: `object@1836` (baris 1836)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 99: `object@1837` (baris 1837)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 100: `object@1838` (baris 1838)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 101: `object@1839` (baris 1839)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 102: `object@1841` (baris 1841)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 103: `object@1842` (baris 1842)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 104: `object@1843` (baris 1843)
Bahasa: id, en, ja
- **Angka berbeda pada `$value` (id vs ja; nilai-beda):** id=[3, 9], ja=[2, 3, 9]

#### Peta 105: `object@1844` (baris 1844)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 106: `object@1845` (baris 1845)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 107: `object@1846` (baris 1846)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 108: `object@1847` (baris 1847)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 109: `object@1848` (baris 1848)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 110: `object@1849` (baris 1849)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 111: `object@1850` (baris 1850)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 112: `object@1851` (baris 1851)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 113: `object@1853` (baris 1853)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 114: `object@1854` (baris 1854)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 115: `object@1855` (baris 1855)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 116: `object@1856` (baris 1856)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 117: `object@1857` (baris 1857)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 118: `object@1858` (baris 1858)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 119: `object@1859` (baris 1859)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 120: `object@1860` (baris 1860)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 121: `object@1861` (baris 1861)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 122: `object@1862` (baris 1862)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 123: `object@1863` (baris 1863)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 124: `object@1864` (baris 1864)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 125: `object@1865` (baris 1865)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 126: `object@1866` (baris 1866)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 127: `object@1868` (baris 1868)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 128: `object@1869` (baris 1869)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 129: `object@1874` (baris 1874)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 130: `object@1875` (baris 1875)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 131: `object@1876` (baris 1876)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 132: `object@1877` (baris 1877)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 133: `object@1879` (baris 1879)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/RefleksiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/RefleksiPage.tsx)

#### Peta 1: `object@85` (baris 85)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@156` (baris 156)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@157` (baris 157)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@196` (baris 196)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@197` (baris 197)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@198` (baris 198)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@199` (baris 199)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@201` (baris 201)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@250` (baris 250)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@251` (baris 251)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@252` (baris 252)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@253` (baris 253)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 13: `object@254` (baris 254)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 14: `object@255` (baris 255)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 15: `object@256` (baris 256)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 16: `object@257` (baris 257)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 17: `object@404` (baris 404)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 18: `object@405` (baris 405)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 19: `object@406` (baris 406)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 20: `object@407` (baris 407)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 21: `object@408` (baris 408)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 22: `object@409` (baris 409)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 23: `object@410` (baris 410)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 24: `object@411` (baris 411)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 25: `object@412` (baris 412)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 26: `object@413` (baris 413)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 27: `object@418` (baris 418)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 28: `object@587` (baris 587)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 29: `object@588` (baris 588)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 30: `object@589` (baris 589)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 31: `object@590` (baris 590)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 32: `object@591` (baris 591)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 33: `object@592` (baris 592)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 34: `object@593` (baris 593)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 35: `object@594` (baris 594)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 36: `object@743` (baris 743)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 37: `object@744` (baris 744)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 38: `object@745` (baris 745)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 39: `object@746` (baris 746)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 40: `object@747` (baris 747)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 41: `object@748` (baris 748)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 42: `object@749` (baris 749)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 43: `object@750` (baris 750)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 44: `object@751` (baris 751)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 45: `object@752` (baris 752)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 46: `object@757` (baris 757)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 47: `object@1030` (baris 1030)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 48: `object@1031` (baris 1031)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 49: `object@1032` (baris 1032)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 50: `object@1033` (baris 1033)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 51: `object@1034` (baris 1034)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 52: `object@1035` (baris 1035)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 53: `object@1036` (baris 1036)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 54: `object@1037` (baris 1037)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 55: `object@1038` (baris 1038)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 56: `object@1039` (baris 1039)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 57: `object@1040` (baris 1040)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 58: `object@1041` (baris 1041)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 59: `object@1042` (baris 1042)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 60: `object@1043` (baris 1043)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 61: `object@1177` (baris 1177)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 62: `object@1178` (baris 1178)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 63: `object@1179` (baris 1179)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 64: `object@1180` (baris 1180)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 65: `object@1181` (baris 1181)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 66: `object@1182` (baris 1182)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 67: `object@1183` (baris 1183)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 68: `object@1184` (baris 1184)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 69: `object@1185` (baris 1185)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 70: `object@1186` (baris 1186)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 71: `object@1187` (baris 1187)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 72: `object@1188` (baris 1188)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 73: `object@1189` (baris 1189)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 74: `object@1190` (baris 1190)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 75: `object@1191` (baris 1191)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 76: `object@1330` (baris 1330)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 77: `object@1363` (baris 1363)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 78: `object@1364` (baris 1364)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 79: `object@1365` (baris 1365)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 80: `object@1366` (baris 1366)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 81: `object@1367` (baris 1367)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 82: `object@1368` (baris 1368)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 83: `object@1369` (baris 1369)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 84: `object@1370` (baris 1370)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 85: `object@1371` (baris 1371)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 86: `object@1374` (baris 1374)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 87: `object@1375` (baris 1375)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 88: `object@1376` (baris 1376)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 89: `object@1377` (baris 1377)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 90: `object@1378` (baris 1378)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 91: `object@1379` (baris 1379)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 92: `object@1381` (baris 1381)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 93: `object@1382` (baris 1382)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 94: `object@1383` (baris 1383)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 95: `object@1384` (baris 1384)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 96: `object@1386` (baris 1386)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 97: `object@1389` (baris 1389)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 98: `object@1390` (baris 1390)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 99: `object@1391` (baris 1391)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 100: `object@1392` (baris 1392)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 101: `object@1393` (baris 1393)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 102: `object@1394` (baris 1394)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 103: `object@1395` (baris 1395)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 104: `object@1398` (baris 1398)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 105: `object@1399` (baris 1399)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 106: `object@1400` (baris 1400)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 107: `object@1401` (baris 1401)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 108: `object@1402` (baris 1402)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 109: `object@1403` (baris 1403)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 110: `object@1404` (baris 1404)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 111: `object@1405` (baris 1405)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 112: `object@1408` (baris 1408)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 113: `object@1409` (baris 1409)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 114: `object@1412` (baris 1412)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 115: `object@1413` (baris 1413)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 116: `object@1414` (baris 1414)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 117: `object@1415` (baris 1415)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 118: `object@1416` (baris 1416)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 119: `object@1417` (baris 1417)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 120: `object@1418` (baris 1418)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 121: `object@1419` (baris 1419)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 122: `object@1420` (baris 1420)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 123: `object@1421` (baris 1421)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 124: `object@1422` (baris 1422)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 125: `object@1423` (baris 1423)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 126: `object@1424` (baris 1424)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 127: `object@1425` (baris 1425)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 128: `object@1426` (baris 1426)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 129: `object@1427` (baris 1427)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 130: `object@1428` (baris 1428)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 131: `object@1429` (baris 1429)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 132: `object@1430` (baris 1430)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 133: `object@1431` (baris 1431)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 134: `object@1432` (baris 1432)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 135: `object@1433` (baris 1433)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 136: `object@1436` (baris 1436)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 137: `object@1437` (baris 1437)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 138: `object@1438` (baris 1438)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 139: `object@1439` (baris 1439)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 140: `object@1440` (baris 1440)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 141: `object@1443` (baris 1443)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 142: `object@1444` (baris 1444)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 143: `object@1445` (baris 1445)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 144: `object@1446` (baris 1446)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 145: `object@1447` (baris 1447)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 146: `object@1450` (baris 1450)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 147: `object@1451` (baris 1451)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 148: `object@1452` (baris 1452)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 149: `object@1453` (baris 1453)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 150: `object@1454` (baris 1454)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 151: `object@1455` (baris 1455)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 152: `object@1456` (baris 1456)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 153: `object@1457` (baris 1457)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 154: `object@1458` (baris 1458)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 155: `object@1459` (baris 1459)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 156: `object@1460` (baris 1460)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 157: `object@1461` (baris 1461)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 158: `object@1462` (baris 1462)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 159: `object@1465` (baris 1465)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 160: `object@1466` (baris 1466)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 161: `object@1468` (baris 1468)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 162: `object@1469` (baris 1469)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 163: `object@1470` (baris 1470)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 164: `object@1471` (baris 1471)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 165: `object@1472` (baris 1472)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 166: `object@1473` (baris 1473)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 167: `object@1475` (baris 1475)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 168: `object@1477` (baris 1477)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 169: `object@1477` (baris 1477)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 170: `object@1478` (baris 1478)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 171: `object@1478` (baris 1478)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 172: `object@1479` (baris 1479)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 173: `object@1479` (baris 1479)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 174: `object@1480` (baris 1480)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 175: `object@1480` (baris 1480)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 176: `object@1482` (baris 1482)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 177: `object@1487` (baris 1487)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 178: `object@1488` (baris 1488)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 179: `object@1493` (baris 1493)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 180: `object@1494` (baris 1494)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 181: `object@1499` (baris 1499)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 182: `object@1500` (baris 1500)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 183: `object@1505` (baris 1505)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 184: `object@1506` (baris 1506)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 185: `object@1509` (baris 1509)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 186: `object@1510` (baris 1510)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 187: `object@1516` (baris 1516)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 188: `object@1517` (baris 1517)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 189: `object@1518` (baris 1518)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 190: `object@1519` (baris 1519)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/RotasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/RotasiPage.tsx)

#### Peta 1: `object@1291` (baris 1291)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@1292` (baris 1292)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@1293` (baris 1293)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@1294` (baris 1294)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@1295` (baris 1295)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@1300` (baris 1300)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@1301` (baris 1301)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@1302` (baris 1302)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@1303` (baris 1303)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@1304` (baris 1304)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@1305` (baris 1305)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@1306` (baris 1306)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 13: `object@1308` (baris 1308)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 14: `object@1309` (baris 1309)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 15: `object@1310` (baris 1310)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 16: `object@1311` (baris 1311)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 17: `object@1313` (baris 1313)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 18: `object@1314` (baris 1314)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 19: `object@1315` (baris 1315)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 20: `object@1316` (baris 1316)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 21: `object@1317` (baris 1317)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 22: `object@1319` (baris 1319)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 23: `object@1319` (baris 1319)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 24: `object@1320` (baris 1320)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 25: `object@1320` (baris 1320)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 26: `object@1321` (baris 1321)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 27: `object@1321` (baris 1321)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 28: `object@1322` (baris 1322)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 29: `object@1322` (baris 1322)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 30: `object@1324` (baris 1324)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 31: `object@1329` (baris 1329)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 32: `object@1330` (baris 1330)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 33: `object@1335` (baris 1335)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 34: `object@1336` (baris 1336)
Bahasa: id, en, ja
- **Angka berbeda pada `$value` (id vs ja; nilai-beda):** id=[270, 90], ja=[1, 270, 90]

#### Peta 35: `object@1341` (baris 1341)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 36: `object@1342` (baris 1342)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 37: `object@1347` (baris 1347)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 38: `object@1348` (baris 1348)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 39: `object@1351` (baris 1351)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 40: `object@1352` (baris 1352)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 41: `object@1358` (baris 1358)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 42: `object@1359` (baris 1359)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 43: `object@1360` (baris 1360)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 44: `object@1361` (baris 1361)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 45: `object@1366` (baris 1366)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 46: `object@1367` (baris 1367)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 47: `object@1368` (baris 1368)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 48: `object@1369` (baris 1369)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx)

#### Peta 1: `object@108` (baris 108)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@191` (baris 191)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@302` (baris 302)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@416` (baris 416)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@417` (baris 417)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@499` (baris 499)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@500` (baris 500)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@742` (baris 742)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@963` (baris 963)
Bahasa: id, en, ja
- **Angka berbeda pada `kompSoal` (id vs en; nilai-beda):** id=[-1, 2.3, 3, 4], en=[-1, 2, 3, 4]
- **Angka berbeda pada `soalD` (id vs en; nilai-beda):** id=[-2, -3, 1.1, 2.4, 4.1], en=[-2, -3, 1, 2, 4]
- **Angka berbeda pada `tips[].body` (id vs en; nilai-beda):** id=[-1, -1.4, -2, 2.2, 3, 4], en=[-1, -2, 2, 3, 4]
- **Angka berbeda pada `ex2soal` (id vs ja; nilai-beda):** id=[-1, -2, 0, 1, 3, 4], ja=[-1, -2, 0, 1, 2, 3, 4]
- **Angka berbeda pada `kompSoal` (id vs ja; nilai-beda):** id=[-1, 2.3, 3, 4], ja=[-1, 2, 3, 4]
- **Angka berbeda pada `soalD` (id vs ja; nilai-beda):** id=[-2, -3, 1.1, 2.4, 4.1], ja=[-2, -3, 1, 2, 4]
- **Angka berbeda pada `tips[].body` (id vs ja; nilai-beda):** id=[-1, -1.4, -2, 2.2, 3, 4], ja=[-1, -2, 1, 2, 3, 4]
