# Reversal of the Flynn Effect and Cognitive Laziness

Presentasi web sinematik berbahasa Indonesia yang membahas editorial Richard Balon (2026) tentang pembalikan Efek Flynn dan kemalasan kognitif. Asal-usul Efek Flynn, sejarah kekhawatiran terhadap teknologi, istilah <em>brainrot</em>, dan percakapan dengan AI digunakan sebagai konteks tanpa mengubah hipotesis menjadi kepastian.

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
- Pengguliran layar dan usapan pada layar sentuh juga didukung

## Arsitektur

- `index.html`: struktur sembilan adegan dan sumber ilmiah
- `css/style.css`: tata artistik, transisi berbasis guliran, responsivitas, dan tampilan pengganti
- `js/app.js`: guliran sinematik, navigasi, layar penuh, dialog sumber, dan percakapan AI
- `js/three-fx.js`: dunia Three.js persisten yang berubah secara bertahap antaradegan
- `assets/character/*-ensemble.webp`: sembilan ilustrasi dengan kelompok tokoh dan lingkungan yang berbeda
- `vendor/three.r128.min.js`: Three.js yang sudah disimpan lokal

Font dan Three.js disertakan secara lokal beserta lisensinya. Semua efek memiliki tampilan pengganti ketika WebGL tidak tersedia dan menghormati `prefers-reduced-motion`.

## Prinsip ilmiah

Narasi membedakan:

- hasil empiris tentang Efek Flynn dan pembalikannya;
- interpretasi yang masih diteliti;
- hipotesis bahwa AI atau telepon pintar menjadi penyebab langsung penurunan IQ.

Slide data menampilkan satu grafik sederhana dari studi Bratsberg dan Rogeberg (2018): kenaikan skor sampai kelompok kelahiran 1975, kemudian penurunan pada kelompok berikutnya. Linimasa sejarah ditampilkan secara utuh agar seluruh perkembangan dapat dibaca tanpa menekan tombol tambahan.

Daftar sumber utama tersedia melalui tombol **Sumber** di dalam presentasi.
