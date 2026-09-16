# Apakah AI membuat kita semakin bodoh?

Sharing session berbahasa Indonesia oleh Gilang Swandaru tentang ketakutan terhadap teknologi, perubahan cara kerja, dan peluang memakai AI secara masuk akal.

Pesan utama:

> AI tidak otomatis membuat kita bodoh. AI mengubah cara kita bekerja. Kita perlu belajar memakainya, memahami hasilnya, dan tetap mengambil keputusan.

## Menjalankan

Buka index.html di browser modern. Presentasi tidak memerlukan npm, build, atau koneksi internet untuk menampilkan slide. Koneksi internet hanya diperlukan ketika membuka tautan sumber.

Jika browser membatasi berkas lokal, jalankan python -m http.server 8080 dari folder proyek, lalu buka http://localhost:8080.

## Alur 12 slide

| Slide | Peran dalam alur |
|---|---|
| 1 | Membuka pertanyaan: apakah AI membuat kita semakin bodoh? |
| 2 | Menunjukkan perubahan dari AI yang menjelaskan menjadi AI yang ikut mengerjakan. |
| 3 | Mengingatkan bahwa alat baru memang sering menimbulkan kekhawatiran. |
| 4 | Mengubah pertanyaan menjadi tiga hal yang bisa diperiksa: manfaat, pemahaman, dan kemampuan baru. |
| 5 | Merangkum bukti secara seimbang: ada risiko lebih jarang mengecek, tetapi ada juga peningkatan produktivitas. |
| 6 | Memberi jawaban sementara: AI tidak otomatis membuat kita bodoh. |
| 7 | Menjelaskan kapabilitas AI saat ini dengan contoh yang mudah dikenali. |
| 8 | Memberi contoh pekerjaan berulang yang dapat diubah menjadi alat dengan bantuan AI. |
| 9 | Menunjukkan mengapa aplikasi buatan AI tetap perlu diuji. |
| 10 | Menjelaskan hal yang perlu disepakati ketika alat mulai dipakai bersama. |
| 11 | Memberi langkah awal yang sederhana dan aman. |
| 12 | Menutup dengan ajakan mencoba dan pertanyaan untuk diskusi. |

Artikel IWH menjadi bacaan tambahan untuk slide tentang alat yang dipakai bersama. Skenario rekap laporan disusun sebagai ilustrasi, bukan kasus dari artikel atau sistem perusahaan yang sudah diterapkan.

## Kontrol

- Panah kanan/kiri, Page Down/Page Up, dan Space: berpindah slide.
- Panah atas/bawah: berpindah slide atau menggulir isi panjang saat fokus berada di dalamnya.
- Tombol angka 1–9: langsung ke sembilan slide pertama; Home/End: awal/akhir.
- F: layar penuh. S: sumber. Escape: menutup sumber.
- Roda tetikus dan usapan layar mendukung navigasi.
- Tautan #scene-1 sampai #scene-12 membuka slide tertentu.
- Di slide 7, tombol “Coba tanya AI” membuka simulasi percakapan lokal. Pilih pertanyaan contoh atau ketik pertanyaan sendiri; tidak ada koneksi API.

## Desain dan aksesibilitas

Gaya gelap dan emas serta ilustrasi lokal dipertahankan. Setiap slide kini membawa satu gagasan utama. Bagian penelitian dibuat ringkas, sedangkan contoh pekerjaan mendapat ruang lebih besar agar mudah dibahas saat sharing session.

Judul bagian isi memakai DM Sans; Cinzel dipertahankan pada pembuka dan penutup. Isi yang panjang dapat digulir pada layar kecil. Sumber singkat terlihat pada slide terkait dan rujukan lengkap tersedia melalui dialog Sumber.

Font dan Three.js tersimpan lokal beserta lisensinya. Efek memiliki fallback ketika WebGL tidak tersedia, menghormati prefers-reduced-motion, dan tidak menentukan keterbacaan teks. Tanpa JavaScript, slide menjadi bacaan berurutan. CSS cetak menampilkan seluruh slide.

## Sumber dan batas kesimpulan

- Plato, NCTM, dan Sparrow dkk. (2011): contoh kekhawatiran terhadap tulisan, kalkulator, dan internet.
- Lee dkk. (2025): survei 319 pekerja tentang kepercayaan dan pemeriksaan hasil AI; bukan tes penurunan IQ.
- Brynjolfsson, Li & Raymond (2025), QJE: studi 5.172 petugas layanan pelanggan; rata-rata masalah selesai per jam meningkat 15%. Hasil tidak berlaku otomatis untuk semua pekerjaan.
- IWH: perspektif praktisi tentang peluang alat buatan karyawan dan dukungan organisasi.

Temuan penelitian berlaku pada konteksnya masing-masing. Tidak ada klaim bahwa AI menyebabkan penurunan IQ atau bahwa hasil satu studi berlaku untuk semua pekerjaan. Contoh prompt, kebutuhan aplikasi, dan pengujian rekap bersifat ilustratif.

## Pemeriksaan revisi editorial

- 12 slide terdeteksi dengan ID dan nomor berurutan.
- Navigasi slide, batas tombol awal/akhir, panel Sumber, dan tata letak contoh pekerjaan diperiksa melalui browser.
- Pada viewport sekitar 1366 × 936, teks tidak melampaui area slide.
- Mode layar dengan tinggi 768px memiliki aturan CSS yang lebih ringkas; proyektor fisik tetap perlu dicoba sebelum sesi.

## Struktur

- index.html: narasi, contoh pekerjaan, dan sumber.
- css/editorial.css: penyesuaian tipografi dan tata letak editorial.
- css/style.css: tipografi, tata letak, responsivitas, dan gaya cetak.
- js/app.js: navigasi, sumber, layar penuh, dan simulasi percakapan lokal.
- js/three-fx.js: efek latar Three.js.
- assets/: ilustrasi dan font lokal.
- vendor/: Three.js dan lisensinya.
