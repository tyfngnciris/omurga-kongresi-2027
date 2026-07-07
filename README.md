# 17. Uluslararası Türk Omurga Kongresi — Web Sitesi

Next.js (App Router) + Tailwind CSS + PostgreSQL (Prisma) ile geliştirilmiş kongre web
sitesi. Genel bilgilendirme sayfalarının yanı sıra hakem değerlendirmeli bildiri gönderim
sistemi ve kayıt formu (online ödeme hariç) bu sürümde aktif. Online ödeme entegrasyonu
sonraki aşamada eklenecektir.

## Yerel Çalıştırma

Yerel geliştirme için bir PostgreSQL veritabanı bağlantısı (`DATABASE_URL`) ve bir
`AUTH_SECRET` gereklidir — proje kökünde bir `.env` dosyası oluşturun:

```
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/omurga"
AUTH_SECRET="rastgele-uzun-bir-metin"
```

```bash
npm install
npx prisma db push
node prisma/seed.js
npm run dev
```

Tarayıcıda http://localhost:3000 adresini açın.

## Bildiri Sistemi — Test Hesapları

`prisma/seed.js` ilk çalıştırmada iki test hesabı oluşturur (üretimde şifreleri
değiştirin):

- Yönetici: `admin@turkomurga.org.tr` / `OmurgaAdmin2027!`
- Örnek Hakem: `hakem1@turkomurga.org.tr` / `OmurgaHakem2027!`

Yazar hesapları `/bildiri/kayit` üzerinden herkes tarafından oluşturulabilir. Hakem ve
komite/yönetici hesapları güvenlik nedeniyle herkese açık kayıt formuna dahil değildir;
yeni bir hakem eklemek için `prisma/seed.js` içine ekleyip tekrar çalıştırabilir veya
veritabanında doğrudan bir `User` satırı oluşturabilirsiniz (rol: `REVIEWER`).

## İçerik Güncelleme

Kongre adı, tarih, ücretler, kurul isimleri gibi tüm metin içerikler
`lib/site-data.js` dosyasında tek bir yerden yönetilir. Sayfa bileşenleri bu dosyadan veri
okur; içerik güncellemesi için genellikle sadece bu dosyayı düzenlemeniz yeterlidir.

## Sayfa Yapısı

- `/` — Ana sayfa (geri sayım, öne çıkanlar, davet özeti)
- `/davet` — Davet mektubu
- `/program` — Bilimsel program (yakında açıklanacak)
- `/kurullar` — Düzenleme kurulu ve yönetim kurulu
- `/kayit-konaklama` — Kayıt ve konaklama ücretleri (bilgilendirme + kayıt formuna yönlendirme)
- `/kayit-konaklama/basvuru` — Kayıt formu (herkese açık, hesap gerektirmez)
- `/kayit-konaklama/basvuru/[id]` — Kayıt özeti ve takip kodu
- `/bildiri` — Bildiri gönderim koşulları, yazım kuralları, giriş/kayıt bağlantıları
- `/bildiri/kayit`, `/bildiri/giris` — Yazar hesabı oluşturma / giriş
- `/bildiri/basvuru` — Yeni bildiri gönderme formu (AUTHOR)
- `/bildiri/basvurularim` — Yazarın kendi bildirilerini takip ettiği panel (AUTHOR)
- `/hakem` — Hakem paneli, atanan bildiriler (REVIEWER, çift-kör)
- `/admin/bildiriler` — Komite/yönetici paneli: tüm bildiriler, hakem atama, nihai karar (ADMIN/COMMITTEE)
- `/admin/kayitlar` — Komite/yönetici paneli: tüm kongre kayıtları, kategori filtreleri (ADMIN/COMMITTEE)
- `/iletisim` — İletişim formu, adres, harita

## Bildiri Sistemi Mimarisi

- **Veritabanı:** PostgreSQL, Prisma ORM (`prisma/schema.prisma`). Modeller: `User`,
  `Abstract`, `Review`, `Registration`.
- **Kimlik doğrulama:** E-posta/şifre, bcrypt hash, imzalı JWT httpOnly cookie
  (`lib/auth.js`). Roller: `AUTHOR`, `REVIEWER`, `COMMITTEE`, `ADMIN`.
- **İş mantığı:** Next.js Server Actions (`lib/actions/*.js`) — form gönderimleri
  doğrudan sunucuda çalışır, ayrı bir REST API katmanı yoktur.
- **Çift-kör değerlendirme:** Hakem ekranı (`/hakem/[id]`) yazar adı/kurumu göstermez,
  sadece başlık/kategori/özet metnini gösterir.
- Şema değişikliği dağıtımda `prisma db push` ile otomatik uygulanır (bkz.
  `package.json` → `start` script). Üretim ölçeğinde büyüdükçe `prisma migrate`
  tabanlı formel migration sürecine geçilmesi önerilir.

## Deploy (Railway önerilir)

1. Bu klasörü bir GitHub reposuna push edin.
2. [railway.app](https://railway.app) üzerinde yeni proje oluşturup repoyu bağlayın.
3. Projeye bir PostgreSQL eklentisi ekleyin (Add → Database → PostgreSQL).
4. Next.js servisinin Variables bölümüne şunları ekleyin:
   - `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` (referans)
   - `AUTH_SECRET` = rastgele, uzun bir metin
5. Railway otomatik olarak `npm install` (postinstall: `prisma generate`) ve
   `npm run start` (`prisma db push` + seed + `next start`) komutlarını çalıştırır.
6. Settings → Networking → Generate Domain ile herkese açık adresi oluşturun.

Alternatif: Render.com (aynı mantıkla) veya Vercel (frontend) + Supabase/Neon
(veritabanı) kombinasyonu — bu durumda `start` scriptindeki `prisma db push` adımını
Vercel'in build/deploy adımına taşımak gerekir.

## Kayıt Sistemi

Kayıt formu (`/kayit-konaklama/basvuru`) hesap gerektirmez; herkes kategori (üye/üye
olmayan/firma temsilcisi), konaklama seçimi (yok/single/double) ve fatura bilgileriyle
kayıt oluşturabilir. Ücretler `lib/registration-constants.js` üzerinden
`lib/site-data.js`'teki tablolardan otomatik hesaplanır (erken kayıt tarihi: 1 Ocak
2027). Online ödeme adımı henüz yok; kayıt "Kayıt Alındı" durumunda oluşturulur, admin
paneli (`/admin/kayitlar`) üzerinden tüm kayıtlar görüntülenebilir. Ödeme entegrasyonu
eklendiğinde `RegistrationStatus` enum'undaki `ODEME_ONAYLANDI` durumu kullanılabilir.

## Sonraki Aşamalar

- Online ödeme (kredi kartı, e-fatura) entegrasyonu — kayıt formu ve veritabanı hazır
- Komite paneline hakem/yönetici hesabı oluşturma arayüzü (şu an sadece seed script ile)
- Bildiri dosyası (opsiyonel PDF) yükleme desteği
- E-posta bildirimleri (kabul/red/revizyon durum değişikliklerinde otomatik e-posta)
- Gerçek logo, fotoğraf ve program içeriğinin eklenmesi
- Çok dilli yapı (TR/EN) için i18n altyapısının devreye alınması
- Formel Prisma migration sürecine geçiş (şu an `db push` kullanılıyor)
