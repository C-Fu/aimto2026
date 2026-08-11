# Family Alerts 📢

English | [**Bahasa Melayu**](README.md)

Aplikasi web kecil tanpa pelayan (backend) yang membolehkan ahli keluarga menghantar makluman pantas dan mesej pendek antara satu sama lain — dengan emoji dan bunyi. Fork projek ini, ubah satu tetapan, dan anda akan ada aplikasi makluman keluarga anda sendiri.

**Demo langsung:** https://c-fu.github.io/aimto2026/

---

## 📽️ Media & bahan pembentangan

**Tonton demo (2 minit):**

<video src="Family_Alert_System.mp4" controls style="max-width:100%;"></video>

**Slaid pembentangan:**
- 🇲🇾 [Family Alert System — Malaysia Pitch](Family%20Alert%20System%20-%20Malaysia%20Pitch.pptx) — slaid pitch (PowerPoint)
- 📶 [Signal Over Noise](Signal_Over_Noise.pptx) — slaid konsep (PowerPoint)

**Pitch satu imej:**

![Custom Family Alert System Guide](Custom_Family_Alert_System_Guide.png)

---

## Apa ini

Sebuah laman web statik satu halaman. Pengirim menekan butang pratetap (atau menaip mesej emoji pendek) dan ia terus sampai ke **topik ntfy** keluarga. Penerima melihatnya sebagai pemberitahuan push (pada aplikasi ntfy telefon) atau sebagai popup dalam laman dengan bunyi (pada tab pelayar). Tiada pelayan belakang, tiada akaun, tiada pendaftaran.

---

## Apa itu ntfy.sh?

[ntfy.sh](https://ntfy.sh) ialah perkhidmatan "pemberitahuan push" percuma dan sumber terbuka — anggap sahaja ia sebagai **mesej WhatsApp untuk telefon anda, tetapi tanpa akaun atau kumpulan**.

### Apa yang ia lakukan
- Anda pilih **topik** — satu perkataan rahsia seperti `gomokelategomo-sjhasjhsa`. Topik itu adalah "nombor telefon" anda.
- Mana-mana aplikasi atau laman web yang tahu topik itu boleh menghantar mesej kepadanya.
- Sesiapa yang melanggan topik itu menerima mesej serta-merta sebagai pemberitahuan push pada telefon atau pelayar.

### Apa yang ia boleh buat
- Menghantar **pemberitahuan push** ke aplikasi ntfy (Android/iOS) — berfungsi walaupun aplikasi ditutup
- Menghantar mesej yang muncul sebagai **popup dengan bunyi** pada mana-mana tab pelayar yang dibuka
- Menetapkan **tajuk**, **keutamaan** (senyap hingga sangat segera), dan **tag emoji**
- Mesej bersifat **sekejap** — tiada sejarah, tiada akaun, tiada penjejakan

### Mengapa projek ini menggunakan ntfy
ntfy sesuai di sini kerana ia **percuma, tanpa pendaftaran, dan tiada pelayan belakang**. Keseluruhan projek ini hanyalah fail statik (HTML + JavaScript) yang berkomunikasi terus dengan ntfy — jadi ia boleh dihoskan secara percuma di GitHub Pages tanpa pelayan yang perlu dijalankan atau bil yang perlu dibayar.

---

## Bagaimana projek ini menggunakan ntfy

| Langkah | Apa yang berlaku |
|---------|------------------|
| **Anda tekan pratetap** (cth. "🚗 Ayah sampai sekolah") | Laman menghantar `POST` ke `https://ntfy.sh/gomokelategomo-sjhasjhsa` dengan mesej, tajuk, dan keutamaan |
| **Telefon penerima (aplikasi ntfy)** | Serta-merta memaparkan pemberitahuan push — makluman tinggi/segera menggunakan bunyi lebih kuat |
| **Pelayar penerima (laman ini, dibuka)** | Memaparkan popup dengan bunyi tiga nada + menulis ke senarai makluman diterima |
| **Sesiapa, di mana sahaja** | Sesiapa yang ada topik itu juga boleh menontonnya di `https://ntfy.sh/gomokelategomo-sjhasjhsa` dalam pelayar |

**Topik projek ini:** `gomokelategomo-sjhasjhsa`
**Tonton di sini:** https://ntfy.sh/gomokelategomo-sjhasjhsa

> ⚠️ Topik itu ialah kata laluan. Sesiapa yang mengetahuinya boleh menghantar kepadanya. Simpan rahsia, dan putarkannya jika ia bocor (lihat di bawah).

---

## Untuk bukan-ahli teknikal: bagaimana menjadikan aplikasi ini milik anda (fork)

Anda tidak perlu menulis kod — anda hanya perlu menyalin ("fork") projek ini dan menukar satu perkataan. Ini laluan penuh daripada kosong kepada aplikasi makluman keluarga anda sendiri:

### Langkah 1 — Buka akaun GitHub
Pergi ke https://github.com dan daftar akaun percuma (jika anda belum ada).

### Langkah 2 — Fork projek ini
1. Buka halaman projek: https://github.com/C-Fu/aimto2026
2. Klik butang **Fork** (penjuru kanan atas). Ini mencipta **salinan anda sendiri** projek itu.
3. GitHub akan membawa anda ke salinan anda. Alamatnya akan kelihatan seperti `https://github.com/NAMA-ANDA/aimto2026`.

### Langkah 3 — Cipta topik rahsia anda sendiri
1. Buka https://ntfy.sh dalam pelayar dan cari penjana nama topik (atau reka perkataan rawak panjang dengan huruf, nombor, sengkang atau garis bawah — cth. `keluarga-2026-r7x9k2`).
2. **Petua:** gunakan sesuatu yang rawak seperti `keluarga-r7x9k2-biru-42` — jangan sekali-kali nama keluarga atau nombor telefon anda.

### Langkah 4 — Tukar topik dalam salinan anda
1. Dalam projek fork anda, buka fail **`config.js`**.
2. Cari baris yang bertulis:
   `TOPIC: "gomokelategomo-sjhasjhsa"`
3. Gantikan `gomokelategomo-sjhasjhsa` dengan **topik rahsia anda sendiri**, cth.:
   `TOPIC: "keluarga-r7x9k2-biru-42"`
4. Klik **Commit changes** (butang hijau). Siap — anda baru sahaja mengedit fail!

### Langkah 5 — Terbitkan aplikasi anda ke web (percuma, 5 minit)
1. Dalam fork anda, buka **Settings** → **Pages** (dalam menu kiri).
2. Di bawah **Source**, pilih: **Deploy from a branch**.
3. Tetapkan **Branch** kepada `master` (atau `main`) dan folder kepada `/ (root)`. Klik **Save**.
4. Tunggu kira-kira 1 minit. GitHub akan menunjukkan alamat langsung anda — seperti `https://NAMA-ANDA.github.io/aimto2026/`.

> 📖 Untuk panduan langkah demi langkah penuh (menghidupkannya, mencari URL anda, mengemas kini, penyelesaian masalah, domain tersuai), lihat **["Cara mengaktifkan & menggunakan GitHub Pages"](#cara-mengaktifkan--menggunakan-github-pages-panduan-lengkap)** di bawah.

### Langkah 6 — Beritahu keluarga anda
1. Hantar semua orang pautan ke laman langsung anda (dari Langkah 5).
2. Minta mereka **pasang aplikasi ntfy percuma** (Android atau iOS) dan melanggan topik anda:
   buka aplikasi → tekan **+** → taip topik anda, cth. `keluarga-r7x9k2-biru-42`.
3. Buka laman anda pada telefon. Tekan pratetap atau taip mesej. Semua yang melanggan akan mendengarnya serta-merta! 🎉

### Menukar butang pratetap (pilihan, tanpa kod)
Buka `config.js` dan edit senarai **`PRESETS`** — setiap baris ialah satu butang. Contoh:
```js
{ id: "school", emoji: "🚗", label: "Dad arrived at school", title: "🚗 Dad arrived", priority: "default" },
```
Tukar `label` (apa yang tertulis pada butang), `emoji`, dan `priority` (`default` = biasa, `high` = kuat, `urgent` = sangat kuat). Simpan, commit, dan laman anda dikemas kini.

### Memutar topik yang bocor
Jika topik anda bocor, tukar kembali dalam `config.js` (Langkah 4), commit, dan beritahu semua orang melanggan topik baharu. Ini serta-merta membatalkan topik lama.

---

## Cara mengaktifkan & menggunakan GitHub Pages (panduan lengkap)

GitHub Pages ialah **pengehosan web percuma** yang menerbitkan repositori anda sebagai laman web. Projek ini tidak memerlukan langkah binaan — anda hanya memberitahu GitHub untuk menghidangkan fail, dan ia berbuat demikian.

### A. Hidupkan GitHub Pages (5 minit)

1. Pergi ke repositori fork anda di github.com (cth. `https://github.com/NAMA-ANDA/aimto2026`).
2. Klik **Settings** (tab berhampiran penjuru kanan atas halaman repo).
3. Dalam bar sisi kiri, klik **Pages** (di bawah "Code and automation").
4. Di bawah **Build and deployment → Source**, klik dropdown dan pilih **Deploy from a branch**.
5. Di bawah **Branch**, klik dropdown dan pilih cabang anda — `master` atau `main` (mana-mana yang wujud dalam fork anda).
6. Di sebelah cabang, kekalkan folder sebagai **`/ (root)`**.
7. Klik **Save**.
8. Tunggu kira-kira 1–2 minit. GitHub sedang membina laman anda.

> 💡 Jika anda tidak nampak pilihan `Pages`, repositori anda mungkin kosong atau anda mungkin berada di repositori yang salah — pastikan anda berada di **fork anda**, bukan yang asal.

### B. Cari alamat laman langsung anda

- URL laman anda secara automatik ialah: `https://NAMA-ANDA.github.io/aimto2026/`
- (Jika repositori anda dinamakan berbeza, bahagian akhir berubah mengikutnya: `https://NAMA-ANDA.github.io/NAMA-REPO/`)
- GitHub menunjukkan URL di bahagian atas halaman **Settings → Pages** sebaik binaan selesai.
- Anda juga boleh semak di bawah tab **Actions** — tanda semak hijau bermaksud deploy berjaya.

### C. Kemas kini laman anda selepas perubahan

Setiap kali anda menukar fail (cth. mengedit `config.js` atau pratetap) dan klik **Commit changes** di GitHub, Pages **secara automatik menerbitkan semula** laman. Tunggu ~1 minit dan segarkan halaman anda untuk melihat kemas kini.

### D. Penyelesaian masalah

| Gejala | Penyelesaian |
|--------|--------------|
| Laman menunjukkan "404" atau kosong | Tunggu 2 minit lagi (binaan pertama paling lama). Kemudian semak tab **Actions** untuk tanda semak hijau. |
| Anda nampak senarai folder, bukan aplikasi | Anda memilih cabang/folder yang salah dalam Langkah A — mestilah cabang `master`/`main` dan folder `/ (root)`. |
| Gaya/bunyi hilang | Pelayar anda menyimpan versi lama — segarkan keras (Ctrl+Shift+R pada desktop). |
| Merah ✗ dalam Actions | Buka run yang gagal, baca mesej, dan minta bantuan (atau buka isu GitHub). |
| `NAMA-ANDA.github.io` tidak memuat | Anda perlukan sekurang-kurangnya satu fail dalam akar repo — projek ini sudah ada `index.html`, jadi ini hanya berlaku pada repo kosong. |

### E. Jadikan ia alamat anda sendiri (pilihan)

Anda boleh menggunakan domain tersuai (cth. `makluman.keluargaku.com`) dan bukannya URL lalai:

1. Beli domain daripada mana-mana pendaftar.
2. Dalam tetapan DNS pendaftar, tambah rekod CNAME menunjuk ke `NAMA-ANDA.github.io`.
3. Dalam **Settings → Pages → Custom domain**, masukkan domain anda dan klik **Save**.
4. Aktifkan **Enforce HTTPS** selepas DNS tersebar (beberapa jam).

---

## Penyediaan penerima (aplikasi ntfy)

1. Pasang aplikasi ntfy (Android / iOS).
2. Langgan topik anda (perkataan rahsia yang anda pilih).
3. Aktifkan pemberitahuan + bunyi dalam tetapan aplikasi. Makluman tinggi/segera menggunakan bunyi lebih kuat.

---

## Jalankan pada komputer anda sendiri (pilihan)

```
python3 -m http.server 8000
```

Kemudian buka http://localhost:8000.

---

## Had yang diketahui

- **Akses terbuka** — sesiapa yang ada topik boleh menghantar. Simpan rahsia.
- **Sekejap** — makluman tidak direkod, tiada sejarah mesej.
- **Makluman dalam laman memerlukan tab terbuka.** (Aplikasi ntfy telefon berfungsi dengan aplikasi ditutup; laman pelayar tidak.)
- **Penghantaran bergantung pada perkhidmatan percuma ntfy.sh.**

---

## Idea untuk membuatnya lebih baik (untuk kegunaan anda)

Projek ini sengaja dibuat kecil supaya anda boleh fork dan membinanya. Berikut adalah idea, daripada mudah kepada lebih lanjut:

- **Lebih banyak pratetap** — tambah mesej sebenar keluarga anda ("Makan siap", "Saya dah sampai", "Telefon saya"). Hanya tambah baris ke `PRESETS` dalam `config.js`.
- **Sembang dua hala** — tambah bahagian pengirim untuk kedua-dua pihak supaya mana-mana ahli keluarga boleh membalas.
- **Bunyi berbeza setiap orang** — ntfy memetakan keutamaan kepada bunyi; beri setiap ahli keluarga keutamaan atau topik mereka sendiri.
- **Nama/avatar setiap ahli keluarga** — paparkan siapa yang menghantar makluman dalam popup dan dalam senarai makluman diterima.
- **Corak getaran** — cetuskan getaran tersuai dengan Web Vibration API pada mudah alih.
- **Kekalkan tab terjaga / wake lock** — gunakan Wake Lock API supaya tab penerima tidak tidur pada mudah alih.
- **Pratetap lokasi** — butang "Jemput saya" yang menghantar pautan lokasi anda (menggunakan geolokasi pelayar).
- **Makluman berjadual atau berulang** — cth. peringatan ubat yang berulang.
- **Lampiran** — ntfy menyokong imej/fail; tambah butang untuk menghantar foto ("Ini yang saya beli").
- **UnifiedPush** — integrasikan UnifiedPush ntfy untuk Android agar jimat bateri.
- **Lindungi topik anda dengan kata laluan** — ntfy menyokong token akses; tambah gerbang kod ringkas jika anda mahukan lebih kawalan daripada "simpan rahsia".
- **Log mesej (pilihan)** — ntfy menyimpan mesej terkini dalam paparan webnya; tentukan sama ada anda mahu sejarah kecil pada laman.

---

## Nota teknikal (untuk pengguna yang ingin tahu)

- 100% statik: HTML, CSS, dan JavaScript tulen. Tiada langkah binaan.
- Dihoskan di GitHub Pages (percuma). Boleh dipasang sebagai PWA (tambah ke skrin utama).
- Berkomunikasi dengan ntfy melalui panggilan HTTPS mudah (`fetch` POST untuk terbit, Server-Sent Events untuk menerima).
- Tiada rangka kerja, tiada kebergantungan, tiada kuki, tiada penjejakan.

---

*Dibuat untuk keluarga. Fork, dan jadikan milik anda.*
