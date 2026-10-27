# Immersive 3D Wedding Invitation — "A Day Written in Love"

Website undangan pernikahan 3D interaktif yang menjadikan model **`public/models/Backdrop_Pernikahan_Romantis_Updated.glb`** sebagai pusat visual dan emosional.

## Hasil Inspeksi Model 3D (`Backdrop_Pernikahan_Romantis_Updated.glb`)

- **Generator**: `RomanticGardenBackdropGLBBuilder` (glTF 2.0, `up_axis: y`)
- **Total Nodes & Meshes**: 31 Nodes / 31 Meshes (109.104 vertices)
- **Bounding Box**:
  - `min`: `[-0.170, 0.000, -0.070]`
  - `max`: `[ 0.170, 0.192,  0.280]`
  - `size (W × H × D)`: `0.340 × 0.192 × 0.350` units
  - `center`: `[0.000, 0.096, 0.105]`
- **Komponen Dekorasi di dalam Scene**:
  - Panggung & Lorong: `01_Base_Stage`, `15_Aisle_Runner_Warm_Ivory`, `16_Aisle_Border_Champagne_Beige`, `17_Aisle_Trim_Soft_Gold`, `18_Aisle_Petals_Dusty_Blush`
  - Backdrop & Kain Drapery: `02_Olive_Green_Drapes`, `03_Central_Pink_Drape`, `04_Top_Olive_Swags`
  - Florals & Taman: `05_Giant_Central_Flower`, `06_Giant_Flower_Core`, `07_Side_Columns_Foliage`, `08_Side_Columns_Blush_Roses`, `09_Side_Columns_Mauve_Roses`, `10_Front_Garden_Foliage`, `11_Front_Garden_Spikes`, `12_Front_Garden_Roses`, `27_Pillar_Florals_Dusty_Blush`, `28_Pillar_Florals_Warm_Ivory`, `29_Pillar_Foliage_Green`
  - Meja Akad & Cincin: `19_Akad_Table_Top_Warm_Ivory`, `20_Akad_Table_Runner_Champagne`, `21_Akad_Table_Frame_Soft_Gold`, `22_Velvet_Ring_Box_Dusty_Blush`, `23_Ring_Box_Cushion_Champagne`, `24_Wedding_Rings_Soft_Gold`
  - Pencahayaan & Pilar: `13_Backdrop_Candlesticks_Gold`, `14_Backdrop_Taper_Candles_Ivory`, `25_Standing_Pillars_Champagne`, `26_Standing_Pillars_Soft_Gold`, `30_Chandelier_Frame_Soft_Gold`, `31_Chandelier_Crystals_Warm_Ivory`

## Palet Warna & Design Tokens (Diambil Langsung dari Material GLB)

| Token CSS | Hex (sRGB) | Referensi Material GLB | Penggunaan UI |
| :--- | :--- | :--- | :--- |
| `--color-primary` | `#B6768B` | `Floral_Mauve_Rose` & `Velvet_Box_Dusty_Blush` | Aksen utama, tombol interaktif, badge |
| `--color-secondary` | `#4C5137` | `Olive_Green_Drape` | Tombol utama, label editorial, aksen struktural |
| `--color-accent` | `#D4AF37` | `Palette_Soft_Gold` & `Giant_Flower_Core_Gold` | Ornamen garis tipis, ikon, partikel cahaya |
| `--color-background` | `#F6F2EA` | `Stage_Warm_Ivory` | Latar belakang utama & fog scene 3D |
| `--color-surface` | `#FDFBF7` | `Palette_Warm_Ivory` | Panel editorial, kartu undangan, form RSVP |
| `--color-text` | `#2A3321` | `Garden_Foliage_Green` (`#3B492E` darkened) | Tipografi utama dengan kontras WCAG AAA |
| `--color-muted` | `#6E665E` | `Palette_Champagne_Beige` & `Garden_Lavender_Spike` | Teks sekunder, subjudul, keterangan waktu |
| `--color-border` | `#E8DEC8` | `Palette_Champagne_Beige` | Garis pembatas tipis dan bingkai foto |

## Cara Menjalankan Proyek Next.js

```bash
npm install
npm run dev
```

File model utama tersedia di `public/models/Backdrop_Pernikahan_Romantis_Updated.glb` dan seluruh data acara terpusat di `config/wedding.ts`.
