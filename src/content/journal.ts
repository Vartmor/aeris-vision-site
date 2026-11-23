type Figure = {
  file: string;
  alt: string;
  caption: string;
};

type Section = {
  title: string;
  paragraphs: string[];
  figure?: Figure;
  code?: string;
};

export type Entry = {
  number: number;
  slug: string;
  title: string;
  intro: string;
  sections: Section[];
};

export const journal: Entry[] = [
  {
    number: 5,
    slug: 'm0-cekirdek',
    title: 'Çıkarım komutunu temiz bir kurulumda denedim',
    intro: 'Projeyi yeni bir Python ortamına kurdum ve CPU’da iki görüntüyle çalıştırdım. Komut 97 bina adayı ve üç çıktı dosyası verdi.',
    sections: [
      {
        title: 'Komutu nasıl çalıştırdım?',
        paragraphs: [
          'Paketi kendi geliştirme klasörümün dışında kurdum. Böylece komutun o klasördeki dosyalara yanlışlıkla bağlı olup olmadığını kontrol edebildim. CPU için PyTorch kurdum ve ayar dosyasında eğittiğim iki modelin ağırlıklarını gösterdim.',
          'Komuta aynı boyutta ve birbirine hizalanmış iki RGB görüntü verdim. Biri afet öncesine, diğeri sonrasına ait. Alttaki komutta kullandığım dosya yollarını örnek adlarla gösterdim.',
        ],
        code: 'aeris infer --config configs/inference.yaml --device cpu \\\n  --pre once.png --post sonra.png --output cikti/',
      },
      {
        title: 'Çıktıda ne vardı?',
        paragraphs: [
          'prediction.json dosyasında 97 adayın kutusu, piksel alanı ve hasar tahmini vardı. localization.png bina piksellerini, damage.png ise aynı adayların tahmin edilen hasar sınıflarını gösteriyor. JSON’daki kutuları ve sınıf numaralarını iki PNG ile karşılaştırdım.',
          'Bu görüntü çiftinde model 78 adayı hasarsız, 2 adayı hafif hasarlı, 4 adayı ağır hasarlı ve 13 adayı yıkılmış olarak işaretledi. Grafikteki sayılar modelin verdiği etiketler. Bu denemede doğruluğu ölçmek için gerçek etiket kullanmadım.',
        ],
        figure: {
          file: '05-cpu-tahminleri.png',
          alt: 'CPU denemesinde 78 hasarsız, 2 hafif hasarlı, 4 ağır hasarlı ve 13 yıkılmış tahmini.',
          caption: 'Tek görüntü çiftinden gelen 97 adayın tahmin edilen sınıfları.',
        },
      },
      {
        title: 'Önceki ölçümleri yeniden alabildim mi?',
        paragraphs: [
          'Hurricane Florence doğrulama bölümündeki 309 görüntüyü tekrar çalıştırdım. Toplam 1.854 maske ve skorlar önceki koşuyla eşleşti. Testleri de yeniden koştum. PyTorch ortamında 92 test geçti.',
          'Piksel düzeyinde harmonik hasar F1’i, modelin bulduğu sınırlarla 0,090, gerçek sınırlarla 0,118 çıktı. Hasar sınıflandırıcısının iyileştirmeye ihtiyacı var. Sonraki adımda modelin ham güven puanlarının hangi durumlarda yanıltıcı olduğunu inceleyeceğim.',
        ],
        figure: {
          file: '05-hasar-f1.png',
          alt: '0 ile 1 ölçeğinde harmonik hasar F1, modelin bulduğu sınırlarla 0,090 ve gerçek sınırlarla 0,118.',
          caption: 'Aynı 309 görüntü ve hedef maskelerle yaptığım iki ölçüm. Grafiğin ölçeği 0–1.',
        },
      },
    ],
  },
  {
    number: 4,
    slug: 'uctan-uca',
    title: 'İki modeli birleştirip hataları saydım',
    intro: 'İlk ağın bulduğu binaları hasar modeline verdim. Bina sınırları değişince sonuçların ne kadar değiştiğine baktım.',
    sections: [
      {
        title: 'Piksel maskesinden bina adayına',
        paragraphs: [
          'Bir önceki denemede hasar modeline gerçek bina sınırlarını vermiştim. Bu kez afet öncesi görüntüden çıkan U-Net maskesini kullandım. Köşeden veya kenardan birbirine değen bina piksellerini aynı adayda topladım, sonra bu alanı afet sonrası görüntüden kırptım.',
          'Maskede birkaç pikselden oluşan adaylar da vardı. En küçük aday alanını 1, 4, 8, 16 ve 32 piksel olarak denedim. En yüksek piksel F1’i 32 ile geldi, ama fark çok küçüktü. Aday sayısı 5.989’dan 5.554’e düştü.',
        ],
        figure: {
          file: '04-alan-filtresi.png',
          alt: 'Alan alt sınırı 1, 4, 8, 16 ve 32 pikselken sırasıyla 5.989, 5.968, 5.894, 5.763 ve 5.554 aday kalıyor.',
          caption: 'Beş alan alt sınırıyla kaç aday kaldığını saydım.',
        },
      },
      {
        title: 'Hatalar nerede birikiyor?',
        paragraphs: [
          'Adayları gerçek binalarla bire bir eşleştirdim. Kesişim alanı bölü birleşim alanı (IoU) en az 0,50 olan çiftleri, en yüksek IoU’dan başlayarak eşleştirdim. 5.770 etiketli binanın 3.561’i bu kuralla eşleşti. Ayrıca tek bir adayın birden çok binayı kapladığı 330 birleşme buldum.',
          'Özellikle ağır hasarlı ve yıkılmış binalara baktım. 1.299 binanın 301’i bulunamadı, 172’si birleşik adaya girdi ve 661’i hasarsız tahmin edildi. Bu üç durumu ayrı saymak, hatanın hangi aşamada ortaya çıktığını görmeme yardım etti.',
          'Aynı hedef maskelerle iki koşuyu xView2 puanlayıcısında karşılaştırdım. Harmonik piksel hasar F1’i modelin sınırlarıyla 0,0898, gerçek sınırlarla 0,1177 çıktı.',
        ],
        figure: {
          file: '04-agir-hasar.png',
          alt: '1.299 ağır hasarlı veya yıkılmış binada 301 bulunamadı, 172 birleşik adayda kaldı, 661 hasarsız, 58 hafif, 28 ağır ve 79 yıkılmış olarak tahmin edildi.',
          caption: 'Gerçekte ağır hasarlı veya yıkılmış 1.299 binanın her birini bir kez saydım.',
        },
      },
    ],
  },
  {
    number: 3,
    slug: 'hasar-siniflandirma',
    title: 'Hasar modeli için iki eğitim denedim',
    intro: 'ResNet18’i bina kırpımlarıyla eğittim. İlk denemede hasarsız örnekler baskındı, ikinci denemede sınıf başına örnek sayısını sınırladım.',
    sections: [
      {
        title: 'Bina görüntülerini nasıl hazırladım?',
        paragraphs: [
          'Afet sonrası görüntüden, gerçek bina sınırlarını kullanarak 160 × 160 piksellik parçalar hazırladım. Binanın hemen çevresi de görünsün diye sınırlayıcı kutunun her kenarına yüzde 25 pay bıraktım. Model bu parçaları hasarsız, hafif hasarlı, ağır hasarlı veya yıkılmış olarak ayırmaya çalışıyor.',
          'İlk eğitimde rastgele 24.000 bina seçtim ve az örneği olan sınıflara kayıp hesabında daha fazla ağırlık verdim. Buna rağmen 19.390 örnek hasarsız, yalnızca 656 örnek hafif hasarlıydı. İkinci eğitimde sınıf başına 6.000 üst sınırı koydum. Eğitimdeki 3.149 uygun hafif hasar örneğinin tamamı bu kez seçildi.',
        ],
        figure: {
          file: '03-ornekleme.png',
          alt: 'İlk eğitimde sınıf sayıları sırasıyla 19.390, 656, 1.885 ve 2.069. İkinci eğitimde 6.000, 3.149, 6.000 ve 6.000.',
          caption: 'Rastgele seçimle sınıf başına üst sınır koyduğum koşuda eğitime giren örnekler.',
        },
      },
      {
        title: 'Hangi sınıfları karıştırdı?',
        paragraphs: [
          'İki koşuyu aynı 5.508 bina kırpımında ölçtüm. Sınıfların F1 değerlerini harmonik ortalamayla birleştirdiğimde skor 0,0545’ten 0,0769’a çıktı. Bu ortalamada sınıflardan birinin F1’i çok düşükse toplam skor da düşük kalıyor.',
          'En çok ağır hasar satırı dikkatimi çekti. 1.245 ağır hasarlı binadan 918’ine hasarsız dedi. Hafif hasarlı örneklerde de 130 binadan yalnızca 12’sini doğru buldu. İkinci eğitimdeki küçük artışa rağmen bu iki sınıfı ayırmak hâlâ zor.',
        ],
        figure: {
          file: '03-karisiklik-matrisi.png',
          alt: 'Gerçek sınıfların satır, tahminlerin sütun olduğu matris. Ağır hasar satırında 918 hasarsız tahmin karşısında 53 doğru ağır hasar tahmini var.',
          caption: 'İkinci eğitimin karışıklık matrisi. Hücrede bina sayısı, renkte o satırdaki oran var.',
        },
      },
    ],
  },
  {
    number: 2,
    slug: 'lokalizasyon',
    title: 'Bina maskesi için ilk U-Net’i eğittim',
    intro: 'Önce 32 görüntü parçasıyla eğitim kodunu kontrol ettim. Sonra 320 görüntüyle eğittiğim modeli ayrı bir sahnede ölçtüm.',
    sections: [
      {
        title: '32 parçayla başladım',
        paragraphs: [
          'İlk olarak modelin aynı 32 örneği öğrenip öğrenemediğine baktım. Başta F1 sıfırdı. Aynı parçaları tekrar gösterince 0,931’e ulaştı. Bu skor yalnızca o 32 parçaya ait. Amacım ağın etiketleri ve kayıp hesabını düzgün okuyabildiğini görmekti.',
          'Görüntüleri her eğitim turunda tekrar açmanın zaman aldığını görünce görüntü ve maskeleri yerel önbelleğe aldım. Küçük denemede bir turun ortanca süresi 0,605 saniyeden 0,351 saniyeye indi.',
        ],
      },
      {
        title: 'Beş eğitim turunda ne değişti?',
        paragraphs: [
          'ResNet18 ile başlayan bir U-Net kullandım. Afet öncesi 320 görüntüyü 256 × 256 piksellik 5.120 parçaya böldüm. Modelden her piksel için bina olasılığı vermesini istedim. Kontrol için Hurricane Florence’tan ayrı tuttuğum 309 görüntüyü kullandım.',
          'Her turun sonunda dokuz eşikle F1 hesapladım. F1, doğru bulduğum bina piksellerinin yanında hem fazla hem de eksik işaretleri hesaba katıyor. Aşağıdaki çizgide her tur için o turun en iyi eşiğindeki F1 yer alıyor.',
        ],
        figure: {
          file: '02-egitim.png',
          alt: 'Beş eğitim turu boyunca doğrulama F1 eğrisi. En yüksek değer beşinci turda yaklaşık 0,778.',
          caption: 'Her tur için denediğim eşikler arasındaki en yüksek doğrulama F1’i. Y ekseni 0,65’ten başlıyor.',
        },
      },
      {
        title: '0,40 eşiğini neden seçtim?',
        paragraphs: [
          'Beşinci turun ağırlıklarında en iyi F1 değeri 0,40 eşiğinde 0,7778 çıktı. Aynı ağırlıklar ve 0,50 eşikle skor 0,7765’ti. Aradaki fark küçük. Bu seçimi yaptığım sahne, skoru ölçtüğüm sahneyle aynı.',
          'Seçtiğim ağırlıkları tekrar yükledim, 309 tam görüntü için bina maskelerini yazdım ve PNG’lerden piksel sayımlarını yeniden yaptım. Kayıtlı sonuçlarla eşleşti.',
        ],
        figure: {
          file: '02-esikler.png',
          alt: 'Beşinci eğitim turunda 0,30 ile 0,70 arasındaki dokuz eşik. En yüksek piksel F1 0,40 eşiğinde.',
          caption: 'Tek ağırlık dosyasıyla dokuz farklı eşik denedim. Y ekseni 0,70’ten başlıyor.',
        },
      },
    ],
  },
  {
    number: 1,
    slug: 'veri-ve-bolme',
    title: 'xBD verisini kontrol edip böldüm',
    intro: 'Afet öncesi ve sonrası 2.799 görüntü çiftini açtım, etiketlerini kontrol ettim ve aynı sahneye ait görüntüleri bir arada tuttum.',
    sections: [
      {
        title: 'Arşivden hangi dosyalar çıktı?',
        paragraphs: [
          'xView2’nin eğitim paketini kullandım. Bir görüntü çiftinde afet öncesi ve sonrası iki PNG var. JSON dosyaları bina sınırlarını ve hasar etiketini, hedef PNG’ler ise eğitimde kullanılacak piksel değerlerini taşıyor. Dosya adlarını eşleştirip 5.598 görüntünün açıldığını ve hepsinin 1.024 × 1.024 piksel olduğunu kontrol ettim.',
          'Bina sınırlarını kendim de piksel maskesine çevirdim. İki yöntem arasında piksellerin yaklaşık yüzde 0,37’sinde fark vardı. xView2 ile aynı koşulda puan almak için değerlendirmede arşivin kendi hedef maskelerini kullandım.',
          'Etiketleri saydığımda hasarsız binaların açık ara fazla olduğunu gördüm. Dört eğitim sınıfının yanında 2.993 sınıfsız kayıt vardı. Bunları hasar sınıflandırıcısının dört sınıfına katmadım.',
        ],
        figure: {
          file: '01-etiketler.png',
          alt: '117.426 hasarsız, 14.980 hafif hasarlı, 14.161 ağır hasarlı, 13.227 yıkılmış ve 2.993 sınıfsız etiket.',
          caption: 'Eğitim paketini bölmeden önce saydığım bina etiketleri.',
        },
      },
      {
        title: 'Aynı sahneyi iki bölüme koymamaya çalıştım',
        paragraphs: [
          'Görüntüleri tek tek karıştırmak yerine kaynak çekim kimliklerini ve mevcut konum bilgilerini kullandım. 14 sahne grubu oluşturdum. Benzer parçaların hem eğitimde hem testte bulunmasını önlemek için her grubu bir bütün olarak atadım.',
          'Yeni olay testi için Hurricane Michael’ı tamamen ayırdım. Benzer türde başka afetler eğitimde kaldı. Grafikte ID testi, eğitimde de farklı sahnesi bulunan bir olaydan geliyor. OOD testi ise eğitimde hiç kullanılmayan olay. Bu ayrım eğitim başlamadan önce sabitlendi.',
        ],
        figure: {
          file: '01-veri-bolmesi.png',
          alt: 'Eğitim 1.691, doğrulama 309, kalibrasyon 233, ID testi 223 ve OOD testi 343 görüntü çifti.',
          caption: 'Bir görüntü çifti yalnızca bir bölüme ait. Toplam 2.799 çift var.',
        },
      },
    ],
  },
];
