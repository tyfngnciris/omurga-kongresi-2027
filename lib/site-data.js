// Tüm kongre içeriği bu dosyada tutulur.
// Gerçek tarih/ücret/isim bilgileri değiştiğinde sadece burayı güncellemeniz yeterlidir.

export const site = {
  name: "17. Uluslararası Türk Omurga Kongresi",
  shortName: "Türk Omurga Kongresi",
  theme: "Omurga Sorunlarında Çözümlemeler",
  themeEn: "Remedies in Spine",
  organizer: "Türk Omurga Derneği",
  partner: "AO Spine",
  dateLabel: "6-9 Mayıs 2027",
  venue: "La Blanche Island Bodrum",
  venueDetail: "Türkbükü Mahallesi, Bodrum, Muğla, Türkiye",
  startDate: "2027-05-06T00:00:00+03:00",
  importantDates: {
    abstractDeadline: "15 Ocak 2027",
    earlyRegDeadline: "31 Aralık 2026",
    congressStart: "6 Mayıs 2027",
  },
  nav: [
    { href: "/", label: "Ana Sayfa" },
    { href: "/davet", label: "Davet" },
    { href: "/program", label: "Program" },
    { href: "/kurullar", label: "Kurullar" },
    { href: "/kayit-konaklama", label: "Kayıt & Konaklama" },
    { href: "/bildiri", label: "Bildiri Gönderimi" },
    { href: "/iletisim", label: "İletişim" },
  ],
  contact: {
    orgName: "İris İnteraktif",
    address: "2007. Sokak Vadikent 90 Sitesi, No:41 Beysukent / Ankara, Türkiye",
    phone: "+90 312 236 18 75",
    email: "dernek@turkomurga.org.tr",
    instagram: "https://www.instagram.com/turkomurga/",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3180.728859560121!2d27.553539074970246!3d37.13536524873619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14be5d64acd2d94f%3A0x1b0e88f646a1f061!2sLa%20Blanche%20Island%20Bodrum!5e0!3m2!1str!2str!4v1780487121101!5m2!1str!2str",
};

export const stats = [
  { value: "17.", label: "Kongre", detail: "Türk Omurga Derneği'nin yarım asırlık deneyimi" },
  { value: "50+", label: "Uluslararası Konuşmacı", detail: "Avrupa, ABD ve Asya'dan davetli bilim insanları" },
  { value: "30+", label: "Bilimsel Oturum", detail: "Açılış konferansı, panel, sempozyum, çalıştay" },
  { value: "20+", label: "Katılımcı Ülke", detail: "Türkiye, Avrupa, Orta Doğu ve Asya'dan" },
];

export const presidents = [
  { name: "Prof. Dr. Murat Hancı", role: "Kongre Başkanı" },
  { name: "Prof. Dr. Yetkin Söyüncü", role: "Kongre Başkanı" },
];

export const secretaries = [
  { name: "Dr. Mustafa Onur Ulu", role: "Kongre Sekreteri" },
  { name: "Dr. Burak Akesen", role: "Kongre Sekreteri" },
];

export const organizingCommittee = [
  "Dr. Alparslan Şenel",
  "Dr. Ali Dalgıç",
  "Dr. Metin Özalay",
];

export const boardMembers = {
  president: "Dr. Ali Dalgıç",
  vicePresident: "Dr. Yetkin Söyüncü",
  treasurer: "Dr. Metin Özalay",
  secretaryGeneral: "Dr. Mustafa Onur Ulu",
  members: [
    "Dr. Burak Akesen",
    "Dr. Ferhat Harman",
    "Dr. Deniz Kargın",
    "Dr. Murat Korkmaz",
    "Dr. S. Kıvanç Olguner",
    "Dr. Alparslan Şenel",
  ],
};

export const invitationLetter = {
  authors: [
    { name: "Prof. Dr. Yetkin Söyüncü", role: "Kongre Başkanı" },
    { name: "Prof. Dr. Murat Hancı", role: "Kongre Başkanı" },
  ],
  paragraphs: [
    "Sizleri, Türk Omurga Derneği tarafından düzenlenen bilimsel platformda omurga sağlığı alanındaki güncel yaklaşımları ve yenilikçi çözümleri birlikte değerlendirmeye davet etmekten büyük mutluluk duyuyoruz.",
    "Omurga hastalıkları, yaşam kalitesini doğrudan etkileyen ve her geçen gün daha fazla önem kazanan sağlık sorunları arasında yer almaktadır. Teknolojik gelişmeler, gelişmiş tanı yöntemleri, minimal invaziv uygulamalar, robotik destekli cerrahi sistemler ve biyolojik tedavi seçenekleri sayesinde omurga sorunlarının tanı ve tedavisinde önemli ilerlemeler kaydedilmektedir. Bu gelişmeler, hastalara daha güvenli, etkili ve kişiselleştirilmiş çözümler sunulmasına olanak sağlamaktadır.",
    "Bu doğrultuda hazırlanan bilimsel içerikte, omurga sorunlarının değerlendirilmesi ve çözüm yöntemleri kapsamlı bir şekilde ele alınacaktır. Amacımız, güncel bilimsel verileri paylaşmak, farklı disiplinlerden uzmanları bir araya getirmek ve hasta bakımını geliştirecek yenilikçi yaklaşımları tartışmaktır.",
    "Program boyunca dejeneratif omurga hastalıkları, deformiteler, travmalar, enfeksiyonlar ve tümörler gibi birçok konu; konservatif tedavi yöntemlerinden ileri cerrahi uygulamalara kadar geniş bir perspektifte değerlendirilecektir. Ayrıca yeni teknolojiler, klinik deneyimler ve güncel araştırmalar ışığında omurga sorunlarına yönelik etkili çözüm stratejileri paylaşılacaktır.",
    "Bilimsel ilerlemenin temelinde bilgi ve deneyim paylaşımı yer almaktadır. Bu platformun, omurga alanında çalışan uzmanlar arasında güçlü iş birliklerinin kurulmasına, yeni fikirlerin geliştirilmesine ve hasta sonuçlarının iyileştirilmesine katkı sağlayacağına inanıyoruz.",
    "Katılımınız ve değerli katkılarınızla omurga sorunlarına yönelik daha etkili çözümler geliştirebileceğimize inanıyor, sizleri aramızda görmekten memnuniyet duyacağımızı belirtmek istiyoruz.",
  ],
};

export const registrationFees = {
  before: {
    label: "1 Ocak 2027 ve öncesi",
    rows: [
      { type: "Dernek Üyesi, Asistan, Hemşire veya Fizyoterapist", price: "25.000 TL" },
      { type: "Dernek Üyesi Olmayan veya Uzman", price: "30.000 TL" },
      { type: "Firma Temsilcisi", price: "35.000 TL" },
    ],
  },
  after: {
    label: "1 Ocak 2027 ve sonrası",
    rows: [
      { type: "Dernek Üyesi, Asistan, Hemşire veya Fizyoterapist", price: "30.000 TL" },
      { type: "Dernek Üyesi Olmayan veya Uzman", price: "35.000 TL" },
      { type: "Firma Temsilcisi", price: "40.000 TL" },
    ],
  },
  includes: [
    "Tüm kayıt ücretlerine %20 KDV dahildir.",
    "Kongre süresince alınan çay-kahve molaları ve öğle yemekleri.",
    "Açılış kokteyli.",
    "Tüm bilimsel oturum ve aktivitelere katılım hakkı.",
    "Bilimsel ve ticari sergi alanlarına giriş hakkı.",
    "Kongre dokümanları: çanta, program ve bildiri özetleri kitabı, yaka kartı, katılım sertifikası.",
    "Konaklama satın almayan katılımcılar için 3 günlük tesis kullanım bedeli (08:00-18:00) dahildir.",
  ],
  note: "Kongre bilimsel programında görevi olan oturum başkanları ve konuşmacıların kongre kaydı yaptırmaları zorunludur.",
};

export const accommodationFees = {
  before: {
    label: "1 Ocak 2027 ve öncesi",
    rows: [
      { type: "Single Konaklama (6-9 Mayıs, 3 gece)", price: "800 Euro" },
      { type: "Double Konaklama (6-9 Mayıs, 3 gece)", price: "1.200 Euro" },
    ],
  },
  after: {
    label: "1 Ocak 2027 ve sonrası",
    rows: [
      { type: "Single Konaklama (6-9 Mayıs, 3 gece)", price: "900 Euro" },
      { type: "Double Konaklama (6-9 Mayıs, 3 gece)", price: "1.300 Euro" },
    ],
  },
  includes: [
    "Tüm ücretlere %20 KDV dahildir.",
    "Konaklamalı paketler 6-9 Mayıs 2027 (3 gece) her şey dahil paket fiyatlarıdır.",
    "Konaklama satın alma işlemleri kayıt sayfası üzerinden online olarak gerçekleştirilecektir.",
  ],
  transfer: {
    note:
      "6 Mayıs 2027 tarihinde Havalimanı-Otel ve 9 Mayıs 2027 tarihinde Otel-Havalimanı arası belirli saatlerde ücretsiz shuttle servisler düzenlenecektir. Kayıt ve konaklaması olan katılımcılar, uçuş detaylarını kongre sekretaryasına iletmek kaydıyla bu hizmetten ücretsiz yararlanabilir.",
    price: "La Blanche Island Otel - Milas-Bodrum Havalimanı (çift yön): 150 Euro",
  },
};

export const abstractRules = {
  deadlineNote: "Son bildiri gönderim tarihi 15 Ocak 2027'dir.",
  submissionNote:
    "Bildirilerin resmi online sistem üzerinden gönderilmesi kongrenin tek geçerli bildiri gönderim şeklidir. Faks veya e-posta yolu ile gönderilen bildiri özetleri değerlendirmeye alınmayacaktır.",
  writingRules: [
    "Yazar isimlerinde akademik unvan kullanılmamalıdır.",
    "İsmin ilk harfi büyük, soy ismin tamamı büyük harf olacak şekilde yazılmalıdır (örn. Mehmet YAVUZ).",
    "Yazarların çalıştıkları kurumların ad ve adresleri mutlaka belirtilmelidir.",
    "Özet başlığının tamamı büyük harfle yazılmalıdır.",
    "Kısaltmalar, açık adının yanında ilk kullanımda parantez içinde belirtilmelidir.",
    "Bildiri özetinde amaç ve yöntemler kısaca belirtilmeli, bulgular sayısal ayrıntıyla özetlenmeli ve sonuç açıklanmalıdır.",
    "Bildiri özeti; amaç, yöntem, bulgular ve sonuç başlıkları kullanılarak yazılmalıdır.",
    "Özetin tamamı (başlık ve yazar adları hariç) 400 kelimeyi geçmemelidir.",
    "Bu kurallardan herhangi birine uymayan özet, içeriğine bakılmaksızın değerlendirme dışı bırakılır.",
  ],
  importantPoints: [
    "Sadece İngilizce bildiriler kabul edilecektir. Sunumlar Türkçe yapılabilir.",
    "Kabul edilen bildirinin programda ve bildiri kitabında yer alabilmesi için sunucu yazarın kongre kaydını yaptırmış olması gerekir.",
    "Sunucu yazar en fazla 2 bildiri sunabilir.",
    "Kabul mektubu gönderildikten sonra yazar ekleme/çıkarma ve sunucu yazar değişikliği yapılamaz.",
    "Bildiri özetleri gönderildiği şekilde basılacağından yazım kurallarına dikkat edilmelidir.",
  ],
  review:
    "Bildiriler, araştırmacıların ad/soyad ve kurumları gizli tutularak (çift-kör) hakemler tarafından değerlendirilecektir. Değerlendirme sonucu, bildiri sahiplerine e-posta ile bildirilecektir.",
};
