# AERIS VISION · Field Archive

Uydu görüntüleriyle afet sonrası görünür bina hasarını araştıran AERIS VISION projesinin Türkçe geliştirme günlüğü.

[Canlı site](https://vartmor.github.io/aeris-vision-site/)

## Yerel geliştirme

Node.js 24 ile çalışır.

```sh
npm ci
npm run dev
```

Yeni yazıyı `src/content/journal.ts` dosyasının başına ekle. Günlük listesi, ana sayfa ve yazı sayfası aynı kayıttan üretilir. Sonuçları güncellerken veri kümesini, değerlendirme koşulunu ve paydaları birlikte belirt.

## Yayın

`main` dalına gönderilen değişiklikleri GitHub Actions derler ve GitHub Pages'e aktarır. Yerelde üretim derlemesini `npm run build` ile oluşturup `npm run preview` ile açabilirsin.

## Görseller

Arşivdeki iki uydu görseli ImageGen ile üretildi. Yöntem bölümündeki bina sınırları etkileşimi göstermek için çizildi. xBD görüntüleri ve etiketleri bu depoda yer almıyor. Yazı tiplerinin lisansları `public/licenses/` klasöründe.

## ImageGen istemleri

### `river-valley.webp`

Use case: photorealistic-natural. Asset type: original website hero for a satellite computer vision research archive. Wide landscape 16:9, high quality analog editorial bird's eye direct-overhead satellite photograph of a fictional coastal settlement at blue hour after rain. A dark wide winding river enters at top center and makes a graceful irregular S-curve along the center left, thin reflective silvery strands. On the RIGHT two-thirds there are plausible small pitched roofs in clusters, roads, cultivated parcel lines, a bridge, olive vegetation and dark bare winter fields. Varied rich realistic crisp texture of a high resolution aerial remote sensing image, visible individual buildings, no perspective horizon, bright but soft warm cream and terracotta roofs amid muted deep sage, slate, tobacco and near black, dusky plum editorial atmosphere. Dim low-contrast dark river on left 38 percent to leave space for web type over it. Main visually compelling roof group at x=72% y=45%, usable also as a square crop. Cinematic, restrained, intelligent, textured like a real aerial photograph; documentary style, absolutely no text, caption, marks, icons, graphics, UI, satellite illustration, maps, watermark or borders. Depict a synthetic fictional place only, no recognizable landmark. Full bleed.

### `field-scene.webp`

Use case: scientific-educational. Asset type: unlabeled synthetic aerial photograph for an interactive building-footprint overlay in a satellite damage assessment research journal. Make a 4:3 wide nadir near-vertical high-resolution orthophoto of a fictional small rural town at the fringe of farm fields. Six to twelve obvious simple rectangular roofs in mixed slate and muted terracotta well separated from one another, street bends diagonally from lower left to upper right, textured lawns and dark deciduous trees, old agrarian stone building, cars barely visible. Crisp orthographic top-down coordinates and straightforward polygons that can be traced for a demonstration. Mild cloudy day with subtle shadows. Restrained dark sage and stone palette with atmospheric natural detail. Documentary real satellite photo look, no type, no border, no markers, no GIS overlay, no real identifiable location.
