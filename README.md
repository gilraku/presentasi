# Apakah AI membuat kita semakin bodoh?

Sharing session berbahasa Indonesia oleh Gilang Swandaru tentang ketakutan terhadap teknologi, temuan penelitian, dan peluang mengadopsi AI dalam keseharian serta pekerjaan.

Pesan utama: AI seperti api. Ia bisa membantu kita, tetapi juga bisa membahayakan jika dipakai tanpa tujuan dan pemeriksaan yang jelas. Ketakutan pada teknologi pernah berulang; hal itu mengajak kita menilai bukti, bukan otomatis menganggap setiap kekhawatiran keliru.

## Menjalankan

Buka `index.html` di browser modern. Tidak memerlukan npm, build, atau internet untuk menampilkan slide; tautan sumber eksternal memerlukan internet. Jika browser membatasi berkas lokal, jalankan `python -m http.server 8080` dari folder proyek dan buka `http://localhost:8080`.

## Alur 19 slide

Benang merah: AI dapat membantu menyelesaikan pekerjaan, sementara manusia tetap menentukan tujuan, memahami konteks, dan memeriksa hasil. Setiap bagian menjawab pertanyaan pembuka atau menerapkannya pada pekerjaan.

| Slide | Peran dalam alur |
|---|---|
| 1 | Mengundang pengalaman peserta tentang penggunaan AI. |
| 2 | Menjelaskan perubahan dari bantuan berupa penjelasan menuju hasil kerja. |
| 3 | Memberi konteks perdebatan alat bantu tanpa menganggap semua kekhawatiran salah. |
| 4 | Mengubah pertanyaan “bodoh” menjadi tiga hal yang dapat diperiksa: pemahaman, latihan, dan hasil kerja. |
| 5 | Memisahkan studi IQ antargenerasi dari penelitian penggunaan AI. |
| 6 | Menunjukkan risiko menerima hasil AI tanpa pemeriksaan melalui survei pekerja. |
| 7 | Menjelaskan pentingnya latihan mandiri dalam konteks pembelajaran matematika. |
| 8 | Menyeimbangkan bukti dengan studi peningkatan produktivitas layanan pelanggan. |
| 9 | Menjawab pertanyaan pembuka dengan batas kesimpulan yang sesuai. |
| 10 | Menunjukkan bahwa cara memberi instruksi kepada AI mengikuti tujuan kita. |
| 11 | Memakai analogi api: AI bisa membantu, tetapi juga bisa membahayakan. |
| 12 | Menjelaskan bahwa AI sekarang dapat menalar, membaca berkas, menulis kode, dan mengerjakan beberapa langkah. |
| 13 | Membahas usulan agar pengembangan AI paling maju berjalan lebih hati-hati. |
| 14 | Mengakui kebutuhan energi dan dampak lingkungan AI, sekaligus peluangnya membantu efisiensi. |
| 15 | Memperkenalkan satu kebutuhan konkret: menggabungkan sepuluh berkas laporan. |
| 16 | Melanjutkan contoh yang sama untuk menjelaskan pemeriksaan kelengkapan dan perhitungan. |
| 17 | Menjelaskan dukungan karyawan, tim, dan IT saat alat mulai dipakai bersama. |
| 18 | Memberi langkah awal: tugas berulang, data fiktif, contoh hasil benar, uji manfaat. |
| 19 | Menutup dengan ajakan memakai AI sambil memahami pekerjaan dan menilai hasil. |

Artikel IWH menjadi bacaan tambahan tentang dukungan organisasi, bukan dasar untuk menganggap alat buatan karyawan pasti menimbulkan konflik proses. Skenario rekap dan pengujiannya disusun sebagai ilustrasi, bukan laporan kejadian di perusahaan.

## Kontrol

- Panah kanan/kiri, Page Down/Page Up, Space: berpindah slide.
- Panah atas/bawah: berpindah slide atau menggulir isi panjang saat fokus berada di dalamnya.
- `1`–`9`: langsung ke sembilan slide pertama; Home/End: awal/akhir.
- `F`: layar penuh. `S`: sumber. Escape: menutup sumber.
- Roda tetikus dan usapan layar mendukung navigasi. Isi yang lebih tinggi dari layar dapat digulir terlebih dahulu; tombol navigasi tetap tersedia.
- Pada dua tab slide 10, panah kiri/kanan memilih contoh belajar atau menyelesaikan tugas.
- Tautan `#scene-1` sampai `#scene-19` membuka slide tertentu.

## Desain dan aksesibilitas

Judul bagian isi memakai DM Sans; Cinzel dipertahankan pada pembuka dan penutup. Tata letak berganti antara perbandingan, satu angka utama, contoh pekerjaan, dan daftar tindakan.

Gaya gelap dan emas serta ilustrasi lokal dipertahankan. Materi yang sebelumnya padat dibagi menjadi beberapa slide dengan satu gagasan utama per slide. Analogi api, perdebatan kecepatan pengembangan, dan dampak lingkungan memakai tata letak tipografi yang tenang agar fokus tetap pada percakapan. Slide penelitian dan organisasi memakai latar sederhana; teks isi diperbesar, sumber singkat terlihat pada slide, dan seluruh rujukan tersedia dalam dialog Sumber. Isi panjang dapat digulir pada layar kecil. Navigasi tidak meninggalkan slide dalam keadaan transisi setengah terbaca.

Font dan Three.js tersimpan lokal beserta lisensinya. Efek memiliki fallback ketika WebGL tidak tersedia, menghormati `prefers-reduced-motion`, dan tidak menentukan keterbacaan teks. Tanpa JavaScript, slide menjadi bacaan berurutan. CSS cetak menampilkan seluruh slide dan kedua contoh pada slide 10.

## Sumber dan batas kesimpulan

- Balon (2026): editorial, bukan eksperimen sebab-akibat.
- Bratsberg & Rogeberg (2018): kohort kelahiran pria Norwegia; bukan penelitian penggunaan AI generatif.
- Lee dkk. (2025): survei 319 pekerja; asosiasi berdasarkan laporan diri, bukan tes penurunan IQ.
- Bastani dkk. (2025): eksperimen pembelajaran matematika; bukan kesimpulan universal untuk semua pekerjaan. Tautan catatan koreksi penerbit juga disertakan.
- Brynjolfsson, Li & Raymond (2025), QJE: 5.172 petugas layanan pelanggan; rata-rata masalah selesai per jam meningkat 15%. Menggunakan angka versi jurnal; working paper awal memuat angka berbeda. Hasil tidak berlaku otomatis untuk semua pekerjaan.
- Risko & Gilbert (2016): tinjauan cognitive offloading.
- IWH: perspektif praktisi tentang peluang dan tata kelola alat buatan karyawan.
- Google DeepMind: kerangka untuk membahas dan mengukur AGI; belum ada satu definisi atau tes yang disepakati semua pihak.
- Dario Amodei dan CNBC: perdebatan tentang memberi waktu bagi evaluasi dan pengamanan untuk mengejar kemampuan AI paling maju.
- IEA: kebutuhan energi AI, pusat data, dan peluang AI membantu efisiensi.
- Plato, NCTM, dan Sparrow dkk. (2011): konteks sejarah, kalkulator, dan strategi ingatan.

Contoh prompt, kebutuhan aplikasi, dan pengujian rekap bersifat ilustratif. Tidak ada klaim bahwa contoh tersebut merupakan hasil eksperimen atau sistem yang sudah diterapkan pada suatu perusahaan. Seluruh tautan rujukan tersedia di `index.html`.

## Pemeriksaan revisi editorial

- Diuji melalui browser pada viewport sekitar 1366 × 936: seluruh 19 slide muat tanpa gulir pada pembesaran normal.
- Mode layar dengan tinggi 768px memiliki aturan CSS yang lebih ringkas; proyektor fisik tetap perlu dicoba sebelum sesi.
- Navigasi seluruh slide, kedua tab pada slide 10, panel Sumber, serta batas tombol awal/akhir diperiksa.
- Tampilan proyektor fisik belum diuji. Pada layar kecil atau pembesaran teks, isi tetap dapat digulir agar tidak terpotong.
- Pratinjau HTTP opsional tersedia melalui `npm run dev`, tanpa dependensi tambahan. Membuka `index.html` langsung tetap didukung.

## Struktur

- `index.html`: narasi, contoh interaktif, dan sumber.
- `css/editorial.css`: penyesuaian tipografi dan tata letak revisi editorial.
- `css/style.css`: tipografi, tata letak, responsivitas, dan gaya cetak.
- `js/app.js`: navigasi, tab tujuan, sumber, dan layar penuh.
- `js/three-fx.js`: efek latar Three.js.
- `assets/`: ilustrasi dan font lokal.
- `vendor/`: Three.js dan lisensinya.

## Kapabilitas AI, pengamanan, dan dampak

Slide 12 membahas kapabilitas AI masa kini secara umum, tanpa mengikat alur pada satu merek atau demo. Slide 13 dan 14 menambahkan dua konteks yang sering muncul dalam percakapan publik: usulan memperlambat laju pengembangan AI paling maju, serta kebutuhan energi dan dampak lingkungan. Keduanya disajikan sebagai pertanyaan yang perlu dipertimbangkan, bukan alasan untuk menolak penggunaan AI sehari-hari.

## Keselarasan Visual (19 Slide)

Ilustrasi digital painting bergaya editorial klasik tetap dipakai pada bagian yang paling terbantu oleh gambar. Bagian baru menggunakan latar gelap, cahaya emas, dan divider yang sama agar tetap terasa satu presentasi:
- **Slide 1–4**: Pengantar filosofis, pilihan peran AI, sejarah alat bantu baru, dan fokus 3 pertanyaan.
- **Slide 5–8**: Bukti empiris dan riset ilmiah (perubahan skor IQ lintas generasi, risiko percaya begitu saja pada AI, riset belajar matematika, dan studi produktivitas layanan pelanggan).
- **Slide 9–10**: Jawaban pertanyaan pembuka dan contoh cara memberi instruksi sesuai tujuan.
- **Slide 11–14**: Analogi AI seperti api, kapabilitas AI saat ini, perdebatan pengamanan, dan dampak lingkungan.
- **Slide 15–17**: Studi kasus rekap laporan, verifikasi hasil, dan tata kelola tim.
- **Slide 18–19**: Panduan langkah awal konkret dan penutup sesi.
