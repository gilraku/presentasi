# The Cognitive Renaissance — Interactive Presentation

Presentasi web interaktif delapan slide tentang pembalikan Efek Flynn, kemalasan kognitif, dan penggunaan teknologi secara sadar.

## Menjalankan presentasi

Tidak memerlukan Node.js, npm, atau proses build.

1. Unduh repository sebagai ZIP dan ekstrak seluruh isinya.
2. Buka `index.html` di Chrome atau Edge terbaru.
3. Tekan `F` atau tombol `⛶` untuk layar penuh.

Jika browser membatasi pemuatan file lokal, jalankan server statis sederhana dari folder proyek:

```powershell
python -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

## Kontrol

- `→`, `Page Down`, atau `Space`: slide berikutnya
- `←` atau `Page Up`: slide sebelumnya
- `1`–`8`: langsung menuju slide
- `F`: layar penuh
- `T` atau `I`: buka catatan sumber
- `Esc`: tutup catatan sumber
- Swipe horizontal/vertikal: navigasi pada perangkat sentuh

## Dependensi offline

- Three.js r128 dibundel di `vendor/three.r128.min.js`.
- Cinzel dan DM Sans dibundel di `assets/fonts/`.
- Seluruh gambar utama disimpan lokal di `assets/`.

Presentasi tetap dapat digunakan tanpa koneksi internet. Jika WebGL tidak tersedia, konten dan navigasi tetap berjalan tanpa efek Three.js.

## Sumber utama

- Balon, R. (2026). *Reversal of the Flynn Effect and Cognitive Laziness*. Annals of Clinical Psychiatry, 37(2), 59–61. https://doi.org/10.1177/10401237261438653
- Bratsberg, B., & Rogeberg, O. (2018). *Flynn effect and its reversal are both environmentally caused*. PNAS, 115(26), 6674–6678. https://doi.org/10.1073/pnas.1718793115
- Sparrow, B., Liu, J., & Wegner, D. M. (2011). *Google Effects on Memory*. Science, 333(6043), 776–778. https://doi.org/10.1126/science.1207745

Catatan: artikel Balon adalah editorial. Bagian interpretasi dan rekomendasi dalam presentasi dibedakan dari temuan empiris studi yang dikutip.
