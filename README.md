# Ketika Jawaban Menjadi Terlalu Mudah

Presentasi web sinematik berbahasa Indonesia tentang Flynn Effect, cognitive offloading, dan penggunaan AI secara sadar. Presentasi ini dirancang sebagai pengalaman layar penuh yang dikendalikan pembicara, bukan sebagai deck PowerPoint biasa.

## Menjalankan

Tidak membutuhkan npm, proses build, atau koneksi internet.

1. Unduh atau clone repository.
2. Buka `index.html` di Chrome, Edge, atau Firefox.
3. Tekan `F` untuk layar penuh.

Jika browser membatasi file lokal, jalankan server statis sederhana dari folder proyek:

```bash
python -m http.server 8080
```

Lalu buka `http://localhost:8080`.

## Kontrol

- `→`, `↓`, `Space`, atau `Page Down`: adegan berikutnya
- `←`, `↑`, atau `Page Up`: adegan sebelumnya
- `1`–`9`: lompat langsung ke adegan
- `Home` / `End`: awal / akhir
- `F`: layar penuh
- `S`: buka panel sumber
- Scroll dan swipe juga didukung

## Arsitektur

- `index.html`: struktur sembilan adegan dan sumber ilmiah
- `css/style.css`: tata artistik, transisi, responsivitas, dan fallback
- `js/app.js`: navigasi, fullscreen, dialog sumber, dan interaksi prompt AI
- `js/three-fx.js`: satu dunia Three.js persisten yang bermorfosis antarscene
- `assets/character/the-thinker*.webp`: lima pose karakter original—prolog, membaca, menganalisis, fragmen informasi, dan epilog
- `vendor/three.r128.min.js`: Three.js yang sudah disimpan lokal

Font dan Three.js disertakan secara lokal beserta lisensinya. Semua efek memiliki fallback ketika WebGL tidak tersedia dan menghormati `prefers-reduced-motion`.

## Prinsip ilmiah

Narasi membedakan:

- hasil empiris tentang Flynn Effect, pembalikannya, dan cognitive offloading;
- interpretasi yang masih diteliti;
- hipotesis bahwa AI atau smartphone menjadi penyebab langsung penurunan IQ.

Grafik kohort Norwegia menampilkan empat titik acuan yang dilaporkan dalam studi Bratsberg & Rogeberg (2018), dilengkapi penjelasan sumbu dan batas interpretasi. Linimasa sejarah membedakan teks primer, sejarah informasi, perdebatan pendidikan, eksperimen, dan editorial agar jenis buktinya tidak tercampur.

Daftar sumber utama tersedia melalui tombol **Sumber** di dalam presentasi.
