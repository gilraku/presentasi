# Apakah AI membuat kita semakin bodoh?

Sharing session berbahasa Indonesia oleh Gilang Swandaru tentang ketakutan terhadap teknologi, temuan penelitian, dan peluang mengadopsi AI dalam keseharian serta pekerjaan.

Pesan utama: kita dapat mendelegasikan pekerjaan kepada AI sambil tetap menentukan tujuan, menilai hasil, dan bertanggung jawab atas penggunaannya. Ketakutan pada teknologi pernah berulang; hal itu mengajak kita menilai bukti, bukan otomatis menganggap setiap kekhawatiran keliru.

## Menjalankan

Buka `index.html` di browser modern. Tidak memerlukan npm, build, atau internet untuk menampilkan slide; tautan sumber eksternal memerlukan internet. Jika browser membatasi berkas lokal, jalankan `python -m http.server 8080` dari folder proyek dan buka `http://localhost:8080`.

## Alur 15 slide

1. **Pertanyaan pembuka:** apakah AI membuat kita semakin bodoh?
2. **Perubahan yang cepat:** AI bergeser dari alat untuk bertanya menjadi alat yang ikut mengerjakan.
3. **Ketakutan yang berulang:** tulisan, kalkulator, internet, dan AI pernah memunculkan kekhawatiran yang mirip.
4. **Kekhawatiran yang masuk akal:** kemampuan, perubahan peran, dan kebenaran hasil.
5. **IQ dan AI:** penurunan skor tes pada kelompok tertentu tidak membuktikan AI sebagai penyebab.
6. **Penelitian pada pekerja:** kepercayaan yang tinggi pada AI berkaitan dengan lebih sedikit upaya memeriksa yang dilaporkan.
7. **Penelitian pada siswa:** AI dapat membantu atau mengganggu belajar, tergantung cara bantuannya dirancang.
8. **Jawaban sementara:** AI tidak otomatis membuat manusia bodoh; cara memakainya ikut menentukan.
9. **Belajar dan bekerja:** contoh penggunaan AI untuk dua tujuan yang berbeda.
10. **GPT-6 Astra:** contoh perkembangan AI dari pemberi jawaban menjadi pendamping pekerjaan bertahap.
11. **Dari pengguna menjadi pembuat:** karyawan dapat mulai membuat otomatisasi, dashboard, dan formulir.
12. **Risiko saat dipakai bersama:** dua dashboard dapat memakai definisi “selesai” yang berbeda.
13. **Organisasi ikut beradaptasi:** eksperimen tetap diberi ruang, lalu definisi, logika, dan pemilik alat disepakati.
14. **Mulai dari masalah nyata:** tentukan hasil, coba dalam lingkup kecil, periksa, lalu bagikan cara kerjanya.
15. **Diskusi penutup:** pekerjaan apa yang ingin peserta coba dengan bantuan AI?

## Kontrol

- Panah kanan/kiri, Page Down/Page Up, Space: berpindah slide.
- Panah atas/bawah: berpindah slide atau menggulir isi panjang saat fokus berada di dalamnya.
- `1`–`9`: langsung ke sembilan slide pertama; Home/End: awal/akhir.
- `F`: layar penuh. `S`: sumber. Escape: menutup sumber.
- Roda tetikus dan usapan layar mendukung navigasi. Isi yang lebih tinggi dari layar dapat digulir terlebih dahulu; tombol navigasi tetap tersedia.
- Pada dua tab slide 9, panah kiri/kanan memilih tujuan belajar/bekerja.
- Tautan `#scene-1` sampai `#scene-15` membuka slide tertentu.

## Desain dan aksesibilitas

Gaya gelap dan emas serta ilustrasi lokal dipertahankan. Materi yang sebelumnya padat dibagi menjadi beberapa slide dengan satu gagasan utama per slide. Slide penelitian dan organisasi memakai latar sederhana; teks isi diperbesar, sumber singkat terlihat pada slide, dan seluruh rujukan tersedia dalam dialog Sumber. Isi panjang dapat digulir pada layar kecil. Navigasi tidak meninggalkan slide dalam keadaan transisi setengah terbaca.

Font dan Three.js tersimpan lokal beserta lisensinya. Efek memiliki fallback ketika WebGL tidak tersedia, menghormati `prefers-reduced-motion`, dan tidak menentukan keterbacaan teks. Tanpa JavaScript, slide menjadi bacaan berurutan. CSS cetak menampilkan seluruh slide dan kedua contoh pada slide 5.

## Sumber dan batas kesimpulan

- Balon (2026): editorial, bukan eksperimen sebab-akibat.
- Bratsberg & Rogeberg (2018): kohort kelahiran pria Norwegia; bukan penelitian penggunaan AI generatif.
- Lee dkk. (2025): survei 319 pekerja; asosiasi berdasarkan laporan diri, bukan tes penurunan IQ.
- Bastani dkk. (2025): eksperimen pembelajaran matematika; bukan kesimpulan universal untuk semua pekerjaan. Tautan catatan koreksi penerbit juga disertakan.
- Risko & Gilbert (2016): tinjauan cognitive offloading.
- IWH: perspektif praktisi tentang peluang dan tata kelola alat buatan karyawan.
- OpenAI: dokumentasi resmi GPT-6 Astra sebagai contoh kemampuan model terbaru dalam pekerjaan bertahap.
- Plato, NCTM, dan Sparrow dkk. (2011): konteks sejarah, kalkulator, dan strategi ingatan.

Contoh prompt, kebutuhan aplikasi, dan dua dashboard bersifat ilustratif. Tidak ada klaim bahwa contoh tersebut merupakan hasil eksperimen atau sistem yang sudah diterapkan pada suatu perusahaan. Seluruh tautan rujukan tersedia di `index.html`.

## Struktur

- `index.html`: narasi, contoh interaktif, dan sumber.
- `css/style.css`: tipografi, tata letak, responsivitas, dan gaya cetak.
- `js/app.js`: navigasi, tab tujuan, sumber, dan layar penuh.
- `js/three-fx.js`: efek latar Three.js.
- `assets/`: ilustrasi dan font lokal.
- `vendor/`: Three.js dan lisensinya.
