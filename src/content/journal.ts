export type Entry = {
  slug: string;
  stage: string;
  target: string;
  title: string;
  intro: string;
  facts: { value: string; label: string }[];
  sections: { title: string; paragraphs: string[] }[];
};

export const journal: Entry[] = [
  {
    slug: 'm0-cekirdek', stage: 'M0 · G3', target: '3 Aralık',
    title: 'İki görüntüden çalışan bir hat',
    intro: 'Temiz bir CPU kurulumunda iki RGB görüntüyü verdik. Çıkarım komutu 97 bina adayı, bir JSON kaydı ve iki piksel maskesi üretti.',
    facts: [{value:'97',label:'CPU çıktısındaki bina adayı'},{value:'309',label:'Doğrulama görüntüsü'},{value:'92',label:'Geçen test'}],
    sections: [
      {title:'Modeli yeniden kurduk',paragraphs:[
        'Paketi proje klasörü dışında, temiz bir Python ortamına kurduk. Afet öncesi ve sonrası iki RGB görüntüyle seçilen iki model ağırlığını kullandık. Çıkarım komutu, adayların piksel kutularını ve dört sınıfın ham skorlarını JSON’a yazdı.',
        'Bina sınırları ve sınıf değerleri üretilen PNG’lerle karşılaştırıldı. Çıktıdaki güven alanı ham softmax olasılığıdır. İnsan inceleme eşiği kalibrasyon aşamasında belirlenecek.'
      ]},
      {title:'Aynı sahnede tekrar ölçtük',paragraphs:[
        'Hurricane Florence doğrulama bölümündeki 309 görüntü yeniden işlendi. Üretilen 1.854 maske ve skorlar önceki doğrulamayla birebir eşleşti. Dondurulmuş veri bölmesi ve 2.799 görüntü çiftinin bütünlüğü tekrar denetlendi.',
        'Tahmin edilen bina sınırlarıyla piksel hasar F1’i 0,090. Gerçek bina sınırları verildiğinde 0,118. Bu iki ölçüm, bina tespiti ve hasar sınıflandırmasının hatalarını ayrı ayrı incelememizi sağlıyor.'
      ]},
    ],
  },
  {
    slug: 'uctan-uca', stage: 'İki aşamalı hat', target: '29–30 Kasım',
    title: 'Bina sınırından hasar maskesine',
    intro: 'Lokalizasyon ve hasar ağını bağladık. Modelin bulduğu binalarla gerçek poligonları aynı doğrulama sahnesinde karşılaştırdık.',
    facts: [{value:'%61,7',label:'Bire bir bina yakalama'},{value:'330',label:'Birleşik aday'},{value:'0,296',label:'xView2 uyumlu toplam skor'}],
    sections: [
      {title:'Bir piksel maskesinden bina adayı',paragraphs:[
        '0,40 bina olasılığı eşiğiyle oluşan maske, sekiz komşuluklu bağlı bileşenlere ayrıldı. Doğrulama üzerinde karşılaştırılan beş alan sınırı arasında 32 piksel seçildi.',
        'Her aday için afet sonrası görüntüden bir kırpım alındı. Hasar sınıfı, adayın piksel maskesine geri yazıldı. Ortaya çıkan dosyalar resmî xView2 puanlayıcısıyla karşılaştırıldı ve yedi referans skor alanı eşleşti.'
      ]},
      {title:'Birleşen ve kaçırılan binalar',paragraphs:[
        '5.770 gerçek binanın 3.561’i bir adayla bire bir eşleşti. 330 birleşik aday 784 farklı binayı kapsadı. Birleşme ve bulunamama, ağır hasar tablosunda ayrı ayrı sayıldı.',
        '1.299 ağır hasarlı ya da yıkılmış binanın 661’i hasarsız tahmin edildi. Bu hata, görünür hasarın uydu görüntüsünden sınıflandırılmasının model için hâlâ güç olduğunu gösteriyor.'
      ]},
    ],
  },
  {
    slug: 'hasar-siniflandirma', stage: 'G1–G2 · Hasar modeli', target: '27–28 Kasım',
    title: 'Dört sınıf, dengesiz bir dağılım',
    intro: 'ResNet18’i afet sonrası bina kırpımlarıyla eğittik. Örnekleme kararının ağır ve hafif hasar üzerindeki etkisini ayrı ayrı ölçtük.',
    facts: [{value:'5.508',label:'Doğrulama binası'},{value:'0,077',label:'Bina düzeyi harmonik F1'},{value:'292 MiB',label:'Tepe PyTorch bellek rezervi'}],
    sections: [
      {title:'Gerçek poligonlarla eğitim',paragraphs:[
        'Hasar sınıflandırıcısı afet sonrası RGB görüntüden çıkarılan 160 × 160 bina kırpımları üzerinde çalışıyor. Kırpımda binanın çevresinde %25 bağlam bırakıldı. Eğitim kaybı sınıf frekanslarına göre ağırlıklandırıldı.',
        '24.000 örnekli ilk koşu sınıfları ayırmakta zorlandı. İkinci koşuda sınıf başına 6.000 örnek üst sınırı uygulanarak eğitimdeki 3.149 uygun hafif hasar örneğinin tamamı korundu.'
      ]},
      {title:'Doğrulama sonucu',paragraphs:[
        'Seçilen koşu, gerçek bina poligonlarıyla hazırlanmış 5.508 kırpımda harmonik F1’i 0,054’ten 0,077’ye çıkardı. Modelin en zayıf kaldığı alan hasar sınıflarını birbirinden ayırmaktı.',
        'Checkpoint yeniden yüklenerek ham skorlar ve karışıklık matrisi doğrulandı. Bu ölçüm bina düzeyinde yapıldı. Uçtan uca koşunun piksel skorları ayrıca hesaplandı.'
      ]},
    ],
  },
  {
    slug: 'lokalizasyon', stage: 'Bina segmentasyonu', target: '25–26 Kasım',
    title: 'İlk bina maskeleri',
    intro: '32 yamalık aşırı öğrenme kontrolünden, 320 gerçek görüntüyle eğitilen ilk bina segmentasyon modeline geçtik.',
    facts: [{value:'0,778',label:'Piksel lokalizasyon F1'},{value:'0,636',label:'Piksel IoU'},{value:'0,40',label:'Bina olasılığı eşiği'}],
    sections: [
      {title:'Eğitim hattını sınadık',paragraphs:[
        'ResNet18 encoder’lı U-Net’i aynı 32 eğitim yamasında tekrar koşturduk. Başlangıçta F1 sıfırdı. En iyi checkpoint aynı yamalarda 0,931’e ulaştı.',
        'Veri bekleme süresi ölçülünce RGB ve maskeler için yerel önbellek eklendi. Küçük koşunun medyan epoch süresi 0,605 saniyeden 0,351 saniyeye düştü.'
      ]},
      {title:'Ayrı bir sahnede ilk sonuç',paragraphs:[
        'Dondurulmuş eğitim bölümünden 320 görüntü seçildi. Model, ayrılmış Hurricane Florence sahnesindeki 309 görüntüden oluşan validation bölümünde değerlendirildi.',
        'Beşinci epoch ve 0,40 olasılık eşiği seçildi. 309 tam görüntü maskesi PNG olarak yazıldı. Sayımlar dosyalardan yeniden hesaplandığında kayıtlı skorla eşleşti.'
      ]},
    ],
  },
  {
    slug: 'veri-ve-bolme', stage: 'G0 · Veri', target: '24 Kasım',
    title: 'Veriyi bölmeden önce denetim',
    intro: 'xBD görüntü çiftlerini, bina poligonlarını ve hedef maskelerini doğruladık. Sahne gruplarını koruyan bir veri bölmesini eğitimden önce dondurduk.',
    facts: [{value:'2.799',label:'Görüntü çifti'},{value:'10',label:'Afet olayı'},{value:'14',label:'Bağımsız sahne grubu'}],
    sections: [
      {title:'Kaynak dosyalarının kontrolü',paragraphs:[
        'xView2 Challenge train arşivinin özeti doğrulandı. 5.598 RGB görüntü, bunların anotasyonları ve hedef maskeleri eşleştirildi. Kaynak dosya özetleri manifestte saklandı.',
        'Poligon rasterizasyonumuz ve arşivdeki hedef PNG’ler piksel düzeyinde karşılaştırıldı. Resmî puanlamada paketin verdiği hedef PNG’ler kullanıldı.'
      ]},
      {title:'Görülmemiş bir afet',paragraphs:[
        'Hurricane Michael, görülmemiş afet testi için tamamen ayrıldı. Aynı afet türünden başka sahneler eğitimde kaldı. Eğitim, validation, kalibrasyon ve ID testindeki gruplar eşleşen görüntü ya da mekân anahtarları taşımıyor.',
        'M0 ölçümleri Hurricane Florence validation sahnesine ait. ID ve OOD testleri, model ile kalibrasyon kararları dondurulduktan sonra çalıştırılacak.'
      ]},
    ],
  },
];

export const latest = journal[0];
