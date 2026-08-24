# Reversal of the Flynn Effect and Cognitive Laziness

Presentasi web sinematik berbahasa Indonesia yang membedah editorial Richard Balon (2026) tentang pembalikan Efek Flynn dan kemalasan kognitif. Asal-usul Efek Flynn, pola sejarah kekhawatiran teknologi, brainrot, dan percakapan interaktif dengan AI dipakai untuk membangun konteks tanpa mengubah hipotesis menjadi kepastian.

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
- `js/app.js`: navigasi, fullscreen, dialog sumber, navigator bukti, mesin waktu, dan percakapan AI
- `js/three-fx.js`: satu dunia Three.js persisten yang bermorfosis antarscene
- `assets/character/the-thinker*.webp`: delapan adegan karakter original—prolog, pembaca, analis, fragmen, pilihan AI, brainrot, deep work, dan epilog
- `vendor/three.r128.min.js`: Three.js yang sudah disimpan lokal

Font dan Three.js disertakan secara lokal beserta lisensinya. Semua efek memiliki fallback ketika WebGL tidak tersedia dan menghormati `prefers-reduced-motion`.

## Prinsip ilmiah

Narasi membedakan:

- hasil empiris tentang Efek Flynn dan pembalikannya;
- interpretasi yang masih diteliti;
- hipotesis bahwa AI atau smartphone menjadi penyebab langsung penurunan IQ.

Navigator bukti membedakan meta-analisis global, systematic review pembalikan, dan pendalaman kohort Norwegia. Grafik Norwegia menampilkan empat titik acuan dari Bratsberg & Rogeberg (2018), sekaligus menjelaskan bahwa perbandingan saudara merupakan analisis tambahan dalam dataset nasional. Mesin waktu sejarah membedakan teks primer, sejarah informasi, perdebatan pendidikan, eksperimen, dan editorial agar jenis buktinya tidak tercampur.

Daftar sumber utama tersedia melalui tombol **Sumber** di dalam presentasi.
