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

Geniş kadraj ve yöntem örneği, Narrowsburg ve Delaware Nehri çevresinin USDA National Agriculture Imagery Program (NAIP) ortofotoğraflarından alınmıştır. Kaynak USGS The National Map tarafından kamu malı (public domain) olarak sunulur. Fotoğraflar RGB WebP biçiminde yayımlanır.

- Açılış görseli · 1920 × 1080 piksel. [Özgün NAIP dışa aktarımı](https://imagery.nationalmap.gov/arcgis/rest/services/USGSNAIPImagery/ImageServer/exportImage?f=image&bbox=-8356853.569%2C5101787.679%2C-8355118.569%2C5102763.617&bboxSR=3857&imageSR=3857&size=1920%2C1080&format=jpg&compressionQuality=98&bandIds=0%2C1%2C2)
- Yöntem görseli · 1448 × 1086 piksel. Mobil sürüm 724 × 543 pikseldir. Kaynak karo `m_4107532_ne_18_060_20190917`. [Özgün NAIP dışa aktarımı](https://imagery.nationalmap.gov/arcgis/rest/services/USGSNAIPImagery/ImageServer/exportImage?f=image&bbox=-8356031.403%2C5102145.489%2C-8355406.403%2C5102614.239&bboxSR=3857&imageSR=3857&size=1448%2C1086&format=jpg&compressionQuality=98&bandIds=0%2C1%2C2&mosaicRule=%7B%22mosaicMethod%22%3A%22esriMosaicLockRaster%22%2C%22lockRasterIds%22%3A%5B142357%5D%7D)

Yöntem görselindeki bina sınırları ve inceleme işaretleri gösterim amacıyla elle çizildi. [USGS NAIP kaynak ve kullanım bilgisi](https://imagery.nationalmap.gov/arcgis/rest/services/USGSNAIPImagery/ImageServer)

Yazı tiplerinin lisansları `public/licenses/` klasöründe.
