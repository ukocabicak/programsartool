# YÖKAK — Program Öz Değerlendirme Raporu Sistemi

**Programme Self-Assessment Report (SAR) System**

Yükseköğretim programlarının, Yükseköğretim Kalite Kurulu'nun **Program
Akreditasyonu Ölçütleri** karşısında kendi durumlarını değerlendirdiği,
sekme ve adım tabanlı HTML raporlama uygulaması.

Ölçüt kümesi **9 ana ölçüt · 57 alt ölçüt · 179 indikatör** içerir. Her alt
ölçüt için program; mevcut durumunu anlatır, **üç düzeyli uyum ölçeğinde**
kendini değerlendirir ve kanıt bağlar.

Türkçe ve İngilizce çalışır. Kurulum, derleme adımı ve sunucu gerektirmez.

---

## Hızlı başlangıç / Quick start

`index.html` dosyasını doğrudan tarayıcıda açmanız yeterlidir.

```bash
# veya yerel bir sunucu ile
python3 -m http.server 8000
# → http://localhost:8000
```

Derleme, paket kurulumu veya ağ bağlantısı gerekmez — tüm varlıklar yereldir.

### Tek dosyalık sürüm / Single-file build

Depoyu kopyalamak istemeyen kullanıcılar için tüm uygulama tek bir HTML
dosyasına paketlenebilir. CSS, JavaScript ve logo dosyanın içine gömülür;
ortaya çıkan dosya çift tıklanarak açılır, internet bağlantısı istemez ve
e-posta veya USB ile taşınabilir.

Hazır paket: [`dist/yokak-odr.html`](dist/yokak-odr.html)

```bash
# kaynaktan yeniden üretmek için
python3 tools/bundle.py dist/yokak-odr.html
```

Rapor verisi tarayıcının `localStorage` alanında tutulur; tek dosyalık
sürümde de **Dışa aktar** / **İçe aktar** çalışır. Kaynak dosyaları
değiştirdiğinizde paketi yeniden üretmeniz gerekir.

---

## Uyum ölçeği

Her alt ölçüt üç düzeyli bir ölçekte değerlendirilir. Dördüncü seçenek
yalnızca **koşullu** alt ölçütlerde açılır.

| Düzey | Anlamı | Puan |
|---|---|---|
| **Uygun** · *Compatible* | Gerekler tanımlı, uygulanmakta ve kanıtlarla gösterilmektedir. | 1 |
| **Kısmen Uygun** · *Partially Compatible* | Gerekler kısmen karşılanmaktadır; uygulama veya kanıt bakımından eksikler vardır. | 0,5 |
| **Uygun Değil** · *Non-Compatible* | Gerekler karşılanmamaktadır. | 0 |
| **Uygulanamaz** · *Not Applicable* | Alt ölçüt programın niteliği gereği uygulanmamaktadır. | hesaba katılmaz |

**Uyum oranı**, puanların ortalamasıdır. *Uygulanamaz* işaretlenen alt
ölçütler paya da paydaya da girmez: programın niteliği gereği istenmeyen bir
gerek, karşılanmamış sayılmamalıdır.

### Koşullu alt ölçütler

Dört alt ölçüt programın niteliğine bağlıdır ve yalnızca bunlarda
*Uygulanamaz* seçilebilir. Seçildiğinde anlatım ve kanıt alanları kapanır,
yerine **gerekçe** alanı açılır ve zorunlu tamamlanma toplamı kendiliğinden
küçülür.

| Alt ölçüt | Koşul |
|---|---|
| **1.6** | Staj ve uygulamalı eğitimin olduğu programlar için geçerlidir. |
| **5.7** | Staj ve uygulamalı eğitimin olduğu programlar için geçerlidir. |
| **6.3** | Uygulamalı eğitimin olduğu programlar için geçerlidir. |
| **9.4** | İlk defa dış değerlendirmeye giren programlar için geçerli değildir. |

---

## Alt ölçüt adımı

Her alt ölçüt tek bir adımdır ve şunları sırayla ister:

1. **Ölçüt kartı** (salt okunur) — alt ölçüt metni her iki dilde, koşulluluk
   notu, **indikatörler**, katlanabilir *beklenen kanıt örnekleri* ve *YÖKAK
   rubrik ilişkisi*.
2. **Mevcut durum** — 200–6000 karakter. İndikatörlerin her birine
   değinilmesi beklenir.
3. **Öz değerlendirme** — üç (koşulluysa dört) düzeyli uyum ölçeği.
4. **Gelişmeye açık yönler** — *Kısmen Uygun* veya *Uygun Değil* seçildiğinde
   zorunlu olur; tam uyumda istenmez.
5. **Kanıtlar** — merkezî koleksiyondan seçilir veya buradan eklenir.

Yardım metinlerinde raporun konusu olan programdan söz edilen yerler,
yeterlilik adı girildiğinde o adla anılır: *"Programın mevcut durumu"* →
*"Makine Mühendisliği Lisans Diploması'nın mevcut durumu"*. Metinde
`{program}` imi kullanılır ve `I18N.pick` çözer; Türkçe ekler adın son
ünlüsüne göre üretilir (`:in` tamlayan, `:e` yönelme, `:i` belirtme, `:de`
bulunma, `:den` ayrılma), İngilizcede `{programme:s}` iyelik. İm **yalnızca**
raporun konusu olan programı anlatan cümlelere konur; ölçüt ve indikatör
metinleri resmî metindir ve imsizdir.

---

## Kanıt koleksiyonu

Rapordaki **tüm kanıtlar tek bir koleksiyonda** tutulur (`evidence.library`).
Her kanıt bir bağlantı, yüklenmiş bir dosya ya da her ikisi olabilir; adı
zorunludur ve en az bir erişim yolu (bağlantı veya dosya) taşımalıdır.

Kanıta üstveri olarak bir veya birden çok **alt ölçüt etiketi** verilir. Alt
ölçüt adımları kendi kanıt listelerini tutmaz — koleksiyondan etikete göre
okurlar. Bağ bu yüzden iki yönlü çalışır:

| Nereden | Ne olur |
|---|---|
| **Belgeler → Alt ölçüt** | Koleksiyonda bir kanıta `3.5` etiketi vermek, kanıtı 3.5 adımında anında görünür kılar. |
| **Alt ölçüt → Belgeler** | Alt ölçüt adımında kanıt eklemek, kanıtı koleksiyona yazar ve o adımın etiketini iliştirir. |
| **Alt ölçüt ↔ Alt ölçüt** | Aynı kanıt birden çok alt ölçüte bağlanabilir; kayıt kopyalanmaz, yalnızca etiket eklenir. |

Hiçbir alt ölçüte bağlanmayan kanıtlar **Tasnif dışı** olarak işaretlenebilir;
koleksiyonda dururlar ama hiçbir alt ölçüt adımına girmezler.

### Beklenen kanıt örnekleri

Her alt ölçütün kendi *beklenen kanıt örnekleri* listesi ölçüt veri
kümesinden gelir. Kanıt alanının altında öneri çipleri olarak listelenir;
bir öneriye tıklamak **adı doldurulmuş** yeni bir kanıt penceresi açar ve
kaydedilen kanıt o alt ölçüte bağlanır. Koleksiyonda aynı adla bir kanıt
zaten varsa öneri *eklendi* olarak işaretlenir.

### Form adımlarından gelen belgeler

Program Belgeleri adımı kendi belge alanlarını taşır. Bu belgeler alt ölçüt
tasnifine girmediğinden koleksiyona **kopyalanmaz** — dizinde kendi
klasörleriyle *türetilerek* listelenir:

| Klasör | Kaynak alan | Adım |
|---|---|---|
| **Program Tanıtım ve Müfredat Belgeleri** | `programme.documents` | Program Tanımı · Program Belgeleri |
| **Önceki Dış Değerlendirme Belgeleri** | `programme.priorReviews` | Program Tanımı · Program Belgeleri |

Kayıt tek yerde durduğu için eşitleme sorunu doğmaz. Bu klasörler kesik
çerçeveyle ve **Form adımından** rozetiyle işaretlenir; satırlarında düzenleme
ve silme yoktur, yerine belgenin girildiği adıma götüren bir bağlantı vardır.
Alan gizliyse klasör de listelenmez — önceki dış değerlendirme sorusuna
*hayır* denince ikinci klasör düşer, daha önce girilmiş değerler kalmış olsa
bile.

Kaynak listeleri `assets/js/evidence.js` içindeki `SOURCES` tablosundadır; yeni
bir belge alanı eklemek için tabloya bir satır yazmak yeterlidir.

### Dizin görünümü

Belgeler bölümü kanıtları bir dosya sistemi gibi listeler: klasörler alt ölçüt
kodlarıdır, satırlar kanıtlardır. Bir kanıt kaç alt ölçüte bağlıysa **o kadar
klasörde görünür** — kayıt tektir, yalnızca satır tekrarlanır.

Böyle bir kanıtın yanında **zincir rozeti** çıkar; üzerine gelindiğinde kanıtın
başka hangi tasniflerde yer aldığı listelenir. Rozet bulunulan klasörü
dışarıda bırakır, dolayısıyla her satırda farklı bir liste gösterir.

Aynı kayıt birden çok yerde göründüğü için silmenin kapsamı önemlidir; bu
yüzden sil düğmesi doğrudan silmez, bir onay penceresi açar ve iki ayrı işlem
sunar:

| İşlem | Etkisi |
|---|---|
| **Yalnızca *x.y* tasnifinden çıkar** | Sadece o etiketi kaldırır. Kanıt koleksiyonda kalır, öteki tasniflerde görünmeyi sürdürür; hiç etiketi kalmazsa **Tasnif dışı** klasörüne düşer. |
| **Kanıtı tamamen sil** | Kaydı koleksiyondan kaldırır; bağlı olduğu bütün tasniflerden birden düşer. |

Pencere, kanıtın o an başka hangi tasniflerde yer aldığını da yazar; böylece
silmenin nereye dokunacağı işlemden önce görünür. **Tasnif dışı** klasöründe
çıkarılacak bir etiket bulunmadığından yalnızca tamamen silme sunulur.

Ekleme ve düzenleme, **Kaydet** ve **Vazgeç** düğmeleri olan bir pencerede
yapılır. Kaydedilmeden koleksiyona hiçbir şey yazılmaz; vazgeçmek boş kayıt
bırakmaz. Kaydetme, kanıt adı **ve** en az bir erişim yolu (bağlantı veya
dosya) verilmeden tamamlanmaz.

Doğrulama da koleksiyondan beslenir: bir alt ölçüt adımı, o alt ölçüte bağlı
**ve erişim yolu olan** en az bir kanıt yoksa tamamlanmış sayılmaz.

---

## Rapor yapısı

Sekmeler (`tabs`) → adımlar (`steps`) → alanlar (`fields`):

| # | Sekme | Adımlar |
|---|-------|---------|
| 1 | **Program Tanımı** | Kurum ve akademik birim · **Program seçimi** (ISCED-F 2013) · **Yeterlilik formu — zorunlu alanlar** · Yeterlilik formu — seçmeli alanlar · **Program belgeleri** · Hazırlık ekibi ve iletişim |
| 2 | **Belgeler** | **Kanıt koleksiyonu** — tüm kanıtlar, alt ölçüt etiketleriyle |
| 3–11 | **Ölçüt 1 … Ölçüt 9** | Ana ölçüt başına bir sekme; her alt ölçüt bir adım (toplam 57 adım) |
| 12 | **Sonuç** | Genel değerlendirme ve **uyum özeti** · **Beyan ve taahhüt** · Önizleme ve gönderim |

### Yeterlilik formu

Program tanımı, Türkiye Yeterlilikler Çerçevesi yeterlilik formunun bilgi
alanlarını izler. Zorunlu ve seçmeli alanlar ayrı adımlardadır:

| Zorunlu | Seçmeli |
|---|---|
| Yeterlilik adı · Sorumlu kurum · Amaç · Yönelim (Genel / Akademik / Mesleki) · Seviye (TYÇ, AYÇ, ISCO, ISCED 2013) · Kategori (Ana / Destekleyici / Birim / Özel amaçlı) · Öğrenme kazanımları · Anahtar yetkinlikler · Ölçme ve değerlendirme yöntemleri · Giriş şartları · Başarma şartları · İlerleme yolları · Yasal dayanağı | Kredi değeri · Öğrenme ortamları · Kalite güvencesi · Geçerlilik süresi (varsa) · Diğer bilgiler · Yeterliliğe erişim için internet adresi |

**ISCED kodu**, program seçicide işaretlenen programın ISCED-F 2013 ayrıntılı
alanından önerilir: alanın altında çıkan öneri satırına tıklamak kodu yazar.
Kullanıcı yine de kendi kodunu girebilir; öneri bir kısayoldur, kilit değil.

### Program seçici

Öz değerlendirme raporu **tek bir program** içindir. Seçici, ISCED-F 2013 alan
sınıflamasına göre ön lisans ve lisans programlarını listeler; yeni bir program
işaretlemek öncekinin **yerini alır**, seçim birikmez.

| Düzey | Program | Gruplama |
|---|---|---|
| Ön Lisans | 299 | ISCED-F geniş alan → ayrıntılı alan |
| Lisans | 491 | ISCED-F geniş alan → ayrıntılı alan |
| Yüksek Lisans | — | liste henüz tanımlanmadı |
| Doktora | — | liste henüz tanımlanmadı |

Düzey bir **filtre**dir, kip değildir: varsayılan **Tümü** görünümünde bütün
düzeyler kendi başlıkları ve kendi gruplamalarıyla listelenir. Arama kutusu
program adı, geniş alan adı ve ayrıntılı alan adı üzerinde birlikte çalışır.

### Uyum özeti

Sonuç sekmesindeki uyum özeti, 57 alt ölçütün dağılımını ve ana ölçüt bazında
uyum oranını gösterir. Her satırda yığılmış bir çubuk, o ölçütteki alt
ölçütlerin uyum dağılımını verir; satıra tıklamak ilgili ölçüt sekmesine
götürür. Aynı özet rapor önizlemesinin başında da yer alır.

### Beyanlar ve tamamlama

Rapor, **altı beyanın tamamı** onaylanmadan tamamlanamaz. Önizleme adımındaki
**Raporu Tamamla** düğmesi, tüm zorunlu alanlar geçerli olmadan raporu
tamamlamaz; eksik varsa kullanıcıyı ilk eksik adıma götürür. Tamamlandığında
`SAR-<yıl>-<6 karakter>` biçiminde bir rapor numarası üretilir
(`crypto.getRandomValues`, karışmaya açık harfler alfabede yok) ve tamamlama
ekranı açılır: numarayı kopyalama, raporu JSON olarak dışa aktarma ve
yazdırma. Numara bir kez üretilir ve raporla saklanır; ekran yeniden açılsa da
değişmez.

---

## Özellikler

| | |
|---|---|
| **İki dil** | Tüm arayüz ve ölçüt içeriği TR/EN. Başlıktaki `TR · EN` düğmesiyle anında geçiş; tercih saklanır. Ölçüt metinleri kartta her iki dilde birlikte gösterilir. |
| **Tamamlanma çubuğu** | Sekme çubuğunun altında kalıcı yüzde göstergesi (`%` ve `tamamlanan/toplam`), ayrıca kenar çubuğunda özet. |
| **Yarıda bırak, sonra devam et** | Her değişiklik `localStorage`'a otomatik kaydedilir; kaldığınız sekme ve adım da saklanır. JSON olarak dışa/içe aktarılabilir. |
| **Koşullu zorunluluk** | `requiredIf` / `requiredUnless` ile bir alanın zorunluluğu başka bir alanın değerine bağlanır. Uyum düzeyi değiştikçe zorunlu alan toplamı kendiliğinden değişir. |
| **Doğrulama** | Alan bazlı kurallar, adım geçişinde engelleme, sekme/adım üzerinde tamamlanma ve hata rozetleri. Metin alanlarında kural **alandan çıkılınca** uygulanır — yarım yazılmış değer henüz hata sayılmaz; hata bir kez görüldükten sonra düzeltildiği anda kalkar. |
| **Erişilebilirlik** | WAI-ARIA sekme/adım örüntüleri, klavye gezinmesi (`Alt+←/→`, sekme çubuğunda ok tuşları), `prefers-reduced-motion`, `forced-colors`, odak halkaları. Uyum düzeyi seçiminde renk tek ayırt edici işaret değildir. |
| **Görsel dil** | Liquid glass yüzeyler, imleci izleyen parlama, aurora arka plan, mikro animasyonlar. Açık/koyu tema. |
| **Baskı** | Rapor tarayıcının **Yazdır → PDF olarak kaydet** akışıyla üretilir; ekran kromu basılmaz, ölçüt blokları sayfa ortasından bölünmez. |

---

## Dosya düzeni

```
index.html                  Uygulama kabuğu
assets/
  css/
    tokens.css              ← Tasarım jetonları (renk, tipografi, boşluk, cam)
    base.css                Reset, erişilebilirlik, yazdırma
    components.css          Buton, form, sekme, adım, kart, rozet, tablo…
    glass.css               Liquid glass yüzeyler + mikro animasyonlar
    app.css                 Düzen ve uygulamaya özgü bileşenler
    sar.css                 Ölçüt kartı, uyum ölçeği, uyum özeti, öneriler
  js/
    i18n.js                 TR/EN arayüz metinleri + {program} imi
    store.js                Kalıcılık, otomatik kayıt, içe/dışa aktarma
    evidence.js             Kanıt koleksiyonu ve türetilmiş klasörler
    validate.js             Doğrulama, tamamlanma ve uyum hesabı
    schema.js               ← Form şeması (sekme → adım → alan)
    fields.js               Alan render motoru
    app.js                  Gezinme, ilerleme, önizleme
  img/
    logo.png                YÖKAK markası (başlık ve favicon)
  data/
    sar-criteria.js         ← Program Akreditasyonu Ölçütleri (TR + EN)
    programs.js             ← Program listesi (ISCED-F alan → ön lisans/lisans)
tools/
  bundle.py                 Tek dosyalık paketleyici (--source ile kaynak seçilir)
```

`←` işaretli dosyalar, içerik güncellemesi için düzenlemeniz gereken yerlerdir.

---

## Uyarlama

### Ölçüt kümesi

`assets/data/sar-criteria.js` ölçütlerin tek kaynağıdır. Ölçüt sekmeleri ve
alt ölçüt adımları elle yazılmaz; şema (`schema.js`) bu dosyadan üretir. Bir
alt ölçüt eklemek için tek yapılacak, ilgili ana ölçütün `subs` dizisine bir
kayıt yazmaktır:

```js
{
  code: "3.9",
  text: { tr: "…", en: "…" },
  optional: true,                          // "Uygulanamaz" seçeneğini açar
  scopeNote: { tr: "…", en: "…" },          // koşulluluk notu
  rubric: "B.2.2",                          // birincil YÖKAK rubrik karşılığı
  rubrics: ["B.2.2", "B.2.3"],              // tüm rubrik karşılıkları
  indicators: [{ tr: "…", en: "…" }],
  evidence: { tr: "…", en: "…" },           // beklenen kanıt örnekleri, düz metin
  suggestions: { tr: ["…"], en: ["…"] },    // öneri çipleri
}
```

Uyum ölçeği de aynı dosyadadır (`complianceScale`). Bir düzeyin puanı `score`
alanındadır; `optionalOnly: true` taşıyan düzey yalnızca koşullu alt
ölçütlerde listelenir.

### Kurumsal renkler

`assets/css/tokens.css` içindeki **BRAND PRIMITIVES** bloğunda yalnızca
`--yk-blue-*` ve `--yk-teal-*` ölçeklerini değiştirin. Bileşenler semantik
katmanı (`--color-brand`, `--color-accent` …) kullandığı için tüm uygulama
otomatik uyum sağlar; koyu tema dâhil.

### Program listesi

`assets/data/programs.js` üç düzeyli bir veri seti içerir:

```js
areas       // ISCED-F 2013 geniş alan (2 haneli) — 10 adet, açılır başlıklar
fields      // ISCED-F 2013 ayrıntılı alan (4 haneli) — 78 adet, alt başlıklar
programmes  // 491 lisans programı
associate   // 299 ön lisans programı
```

Yüksek lisans ve doktora listeleri `byLevel()` fonksiyonuna eklenerek
etkinleştirilir.

---

## Veri biçimi

Dışa aktarılan JSON, üstveri ve veriyi ayırır:

```json
{
  "_meta": {
    "format": "YOKAK-Programme-SAR",
    "version": 1,
    "scope": "programme-self-assessment",
    "criteria": "2026-programme-criteria",
    "exportedAt": "2026-06-01T09:00:00.000Z"
  },
  "data": {
    "institution": { "name": "…", "department": "…" },
    "qualification": { "name": "…", "tyc": "6", "isced": "0715" },
    "programme": { "selected": ["0715.209"] },
    "sar": { "3": { "5": { "compliance": "partial", "narrative": "…" } } },
    "evidence": { "library": [ { "id": "EV-1", "name": "…", "tags": ["3.5"] } ] }
  }
}
```

İçe aktarma hem sarmalanmış (`{_meta, data}`) hem de düz nesne kabul eder.
Yüklenen dosyalar kanıt kaydının içine `data:` URI olarak gömülür; böylece
dışa aktarılan rapor kendi kendine yeterli kalır. Dosya başına sınır 4 MB'dir;
daha büyük belgeler için bağlantı alanı kullanılır.

---

## Tasarım

Görsel dil ve etkileşim örüntüleri
[theqcagencyapplication](https://github.com/rumiexile/theqcagencyapplication)
projesinden devralınmıştır: aynı tasarım jetonları, aynı cam yüzeyler, aynı
sekme/adım gezinmesi, aynı kanıt koleksiyonu mantığı. İki uygulama yan yana
kullanıldığında tek bir sistemin parçası gibi okunur.
