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

## PWA (Progressive Web App)

Site artık bir PWA: `public/manifest.json`, ikon seti (`public/icons/`), `public/sw.js`
(minimal service worker — sadece statik dosyaları önbelleğe alır, HTML/API
yanıtlarını önbelleğe almaz çünkü fiyatlar ve son tarihler dinamik) ve
`components/PWARegister.jsx` (service worker kaydı) eklendi. Kullanıcılar
mobil tarayıcıda "Ana Ekrana Ekle" ile siteyi bir uygulama gibi
yükleyebilir — mağaza başvurusu gerekmez.

## Mobil Uygulama (iOS & Android Mağazaları)

Site, [Capacitor](https://capacitorjs.com) ile native bir kabuğa sarılacak şekilde
yapılandırıldı (`capacitor.config.json`). Bu kabuk, canlı siteyi (`server.url`)
doğrudan yükler — ayrı bir mobil kod tabanı yönetmenize gerek yok, içerik
güncellemeleri otomatik olarak mobil uygulamaya da yansır.

**Önemli:** iOS derlemesi Xcode gerektirdiğinden ve Xcode yalnızca macOS'te
çalıştığından, bu adımların native proje oluşturma/derleme/imzalama kısmı
kendi Mac'inizde yapılmalıdır (aşağıdaki komutlar `kongre-sitesi 3` klasöründe
çalıştırılır).

### Gereksinimler

- **iOS:** Xcode (Mac App Store, ücretsiz) + Apple Developer Program üyeliği
  (yıllık $99)
- **Android:** [Android Studio](https://developer.android.com/studio) (ücretsiz)
  + Google Play Console hesabı (tek seferlik $25)
- Node.js (zaten kurulu)

### 1. Native projeleri oluştur

```bash
npm install
npx cap add ios
npx cap add android
```

Bu komutlar projede `ios/` ve `android/` klasörleri oluşturur (Xcode/Android
Studio projeleri).

### 2. İkon ve splash ekranlarını otomatik üret

`resources/icon.png` (1024×1024), `resources/icon-foreground.png`,
`resources/icon-background.png` (Android adaptive icon) ve `resources/splash.png`
zaten hazır (kongre logosundan — lacivert/turkuaz "TO" amblemi). Tüm platform
boyutlarını tek komutla üretin:

```bash
npx capacitor-assets generate
npx cap sync
```

### 3. iOS — Xcode ile derleme ve App Store'a gönderim

```bash
npx cap open ios
```

Xcode açıldığında:
1. Sol panelden proje adına tıklayıp **Signing & Capabilities** sekmesinde
   Apple Developer hesabınızı (Team) seçin.
2. Bundle Identifier'ın `tr.org.turkomurga.kongre2027` olduğunu doğrulayın
   (App Store Connect'te önce bu ID ile bir uygulama kaydı oluşturmanız gerekir).
3. **Product → Archive** ile arşiv alın, ardından **Distribute App → App Store
   Connect** ile yükleyin.
4. App Store Connect'te (appstoreconnect.apple.com) ekran görüntüleri, açıklama
   ve inceleme bilgilerini doldurup incelemeye gönderin.

Apple'ın **Guideline 4.2 (Minimum Functionality)** kuralı nedeniyle sade bir
web sarmalayıcı reddedilebilir; onay ihtimalini artırmak için en az bir native
özellik eklemeniz önerilir (ör. push bildirim, paylaşım butonu) — bkz.
"Sonraki Aşamalar".

### 4. Android — Android Studio ile derleme ve Play Store'a gönderim

```bash
npx cap open android
```

Android Studio açıldığında:
1. **Build → Generate Signed Bundle / APK** seçin, **Android App Bundle**'ı
   işaretleyin.
2. İlk seferde yeni bir keystore oluşturun (bu dosyayı ve şifresini güvenli bir
   yerde saklayın — kaybederseniz uygulamayı güncelleyemezsiniz).
3. Oluşan `.aab` dosyasını [Google Play Console](https://play.google.com/console)
   üzerinden yeni bir uygulama olarak yükleyin, mağaza bilgilerini doldurup
   incelemeye gönderin.

### İçerik güncellemeleri

`server.url` sabit olarak canlı siteyi gösterdiği için, sitede yaptığınız her
güncelleme (Railway'e deploy sonrası) hem web hem mobil uygulamada anında
görünür — mağazalara tekrar yükleme yapmanıza gerek yoktur. Yeniden derleme
yalnızca ikon/isim/native özellik değişikliklerinde gerekir.

## Sonraki Aşamalar

- Online ödeme (kredi kartı, e-fatura) entegrasyonu — kayıt formu ve veritabanı hazır
- Komite paneline hakem/yönetici hesabı oluşturma arayüzü (şu an sadece seed script ile)
- Bildiri dosyası (opsiyonel PDF) yükleme desteği
- E-posta bildirimleri (kabul/red/revizyon durum değişikliklerinde otomatik e-posta)
- Gerçek logo, fotoğraf ve program içeriğinin eklenmesi
- Çok dilli yapı (TR/EN) için i18n altyapısının devreye alınması
- Formel Prisma migration sürecine geçiş (şu an `db push` kullanılıyor)
- iOS App Store onay ihtimalini artırmak için native özellik eklenmesi (push
  bildirim, paylaşım, vb.) — `@capacitor/push-notifications`,
  `@capacitor/share` gibi Capacitor eklentileriyle mümkün
- Gerçek kongre logosu geldiğinde `resources/` altındaki ikon/splash
  kaynaklarının ve `public/icons/` klasörünün güncellenmesi
