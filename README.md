# Apakah AI membuat kita semakin bodoh?

Sharing session berbahasa Indonesia oleh Gilang Swandaru tentang ketakutan terhadap teknologi, temuan penelitian, dan peluang mengadopsi AI dalam keseharian serta pekerjaan.

Pesan utama: kita dapat mendelegasikan pekerjaan kepada AI sambil tetap menentukan tujuan, menilai hasil, dan bertanggung jawab atas penggunaannya. Ketakutan pada teknologi pernah berulang; hal itu mengajak kita menilai bukti, bukan otomatis menganggap setiap kekhawatiran keliru.

## Menjalankan

Buka `index.html` di browser modern. Tidak memerlukan npm, build, atau internet untuk menampilkan slide; tautan sumber eksternal memerlukan internet. Jika browser membatasi berkas lokal, jalankan `python -m http.server 8080` dari folder proyek dan buka `http://localhost:8080`.

## Alur 16 slide

Benang merah: AI dapat membantu menyelesaikan pekerjaan, sementara manusia tetap memahami kebutuhan, melatih keterampilan yang diperlukan, dan memeriksa hasil. Setiap bagian menjawab pertanyaan pembuka atau menerapkannya pada pekerjaan.

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
| 10 | Memberi contoh instruksi; bekerja dan belajar tidak diperlakukan sebagai dua tujuan yang saling meniadakan. |
| 11 | Menghubungkan kemampuan AI, termasuk Astra, dengan peluang membuat alat kerja. |
| 12 | Memperkenalkan satu kebutuhan konkret: menggabungkan sepuluh berkas laporan. |
| 13 | Melanjutkan contoh yang sama untuk menjelaskan pemeriksaan kelengkapan dan perhitungan. |
| 14 | Menjelaskan dukungan karyawan, tim, dan IT saat alat mulai dipakai bersama. |
| 15 | Memberi langkah awal: tugas berulang, data fiktif, contoh hasil benar, uji manfaat. |
| 16 | Menutup dengan ajakan memakai AI sambil memahami pekerjaan dan menilai hasil. |

Contoh dua dashboard dengan definisi “selesai” yang berbeda dihapus. Artikel IWH menjadi bacaan tambahan tentang dukungan organisasi, bukan dasar untuk menganggap alat buatan karyawan pasti menimbulkan konflik proses. Skenario rekap dan pengujiannya disusun sebagai ilustrasi, bukan laporan kejadian di perusahaan.

## Kontrol

- Panah kanan/kiri, Page Down/Page Up, Space: berpindah slide.
- Panah atas/bawah: berpindah slide atau menggulir isi panjang saat fokus berada di dalamnya.
- `1`–`9`: langsung ke sembilan slide pertama; Home/End: awal/akhir.
- `F`: layar penuh. `S`: sumber. Escape: menutup sumber.
- Roda tetikus dan usapan layar mendukung navigasi. Isi yang lebih tinggi dari layar dapat digulir terlebih dahulu; tombol navigasi tetap tersedia.
- Pada dua tab slide 10, panah kiri/kanan memilih contoh memahami rumus atau menyelesaikan rekap.
- Tautan `#scene-1` sampai `#scene-16` membuka slide tertentu.

## Desain dan aksesibilitas

Judul bagian isi memakai DM Sans; Cinzel dipertahankan pada pembuka dan penutup. Tata letak berganti antara perbandingan, satu angka utama, contoh pekerjaan, dan daftar tindakan. Tidak memasukkan percobaan model 3D dari PR #6.

Gaya gelap dan emas serta ilustrasi lokal dipertahankan. Materi yang sebelumnya padat dibagi menjadi beberapa slide dengan satu gagasan utama per slide. Slide penelitian dan organisasi memakai latar sederhana; teks isi diperbesar, sumber singkat terlihat pada slide, dan seluruh rujukan tersedia dalam dialog Sumber. Isi panjang dapat digulir pada layar kecil. Navigasi tidak meninggalkan slide dalam keadaan transisi setengah terbaca.

Font dan Three.js tersimpan lokal beserta lisensinya. Efek memiliki fallback ketika WebGL tidak tersedia, menghormati `prefers-reduced-motion`, dan tidak menentukan keterbacaan teks. Tanpa JavaScript, slide menjadi bacaan berurutan. CSS cetak menampilkan seluruh slide dan kedua contoh pada slide 10.

## Sumber dan batas kesimpulan

- Balon (2026): editorial, bukan eksperimen sebab-akibat.
- Bratsberg & Rogeberg (2018): kohort kelahiran pria Norwegia; bukan penelitian penggunaan AI generatif.
- Lee dkk. (2025): survei 319 pekerja; asosiasi berdasarkan laporan diri, bukan tes penurunan IQ.
- Bastani dkk. (2025): eksperimen pembelajaran matematika; bukan kesimpulan universal untuk semua pekerjaan. Tautan catatan koreksi penerbit juga disertakan.
- Brynjolfsson, Li & Raymond (2025), QJE: 5.172 petugas layanan pelanggan; rata-rata masalah selesai per jam meningkat 15%. Menggunakan angka versi jurnal; working paper awal memuat angka berbeda. Hasil tidak berlaku otomatis untuk semua pekerjaan.
- Risko & Gilbert (2016): tinjauan cognitive offloading.
- IWH: perspektif praktisi tentang peluang dan tata kelola alat buatan karyawan.
- OpenAI: dokumentasi resmi GPT-6 Astra sebagai contoh kemampuan model terbaru dalam pekerjaan bertahap.
- Plato, NCTM, dan Sparrow dkk. (2011): konteks sejarah, kalkulator, dan strategi ingatan.

Contoh prompt, kebutuhan aplikasi, dan pengujian rekap bersifat ilustratif. Tidak ada klaim bahwa contoh tersebut merupakan hasil eksperimen atau sistem yang sudah diterapkan pada suatu perusahaan. Seluruh tautan rujukan tersedia di `index.html`.

## Pemeriksaan revisi editorial

- Diuji melalui browser pada viewport 1366 × 768 dan 1920 × 1080: seluruh 16 slide muat tanpa gulir pada pembesaran normal.
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
