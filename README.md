# 17. Uluslararası Türk Omurga Kongresi — Web Sitesi

Next.js (App Router) + Tailwind CSS ile geliştirilmiş kongre web sitesi. Bu ilk sürüm
genel bilgilendirme sayfalarını içerir; bildiri gönderim ve online kayıt/ödeme sistemleri
sonraki aşamada eklenecektir.

## Yerel Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda http://localhost:3000 adresini açın.

## İçerik Güncelleme

Kongre adı, tarih, ücretler, kurul isimleri gibi tüm metin içerikler
`lib/site-data.js` dosyasında tek bir yerden yönetilir. Sayfa bileşenleri bu dosyadan veri
okur; içerik güncellemesi için genellikle sadece bu dosyayı düzenlemeniz yeterlidir.

## Sayfa Yapısı

- `/` — Ana sayfa (geri sayım, öne çıkanlar, davet özeti)
- `/davet` — Davet mektubu
- `/program` — Bilimsel program (yakında açıklanacak)
- `/kurullar` — Düzenleme kurulu ve yönetim kurulu
- `/kayit-konaklama` — Kayıt ve konaklama ücretleri (bilgilendirme; online ödeme sonraki fazda)
- `/bildiri` — Bildiri gönderim koşulları ve yazım kuralları (bilgilendirme; gönderim sistemi sonraki fazda)
- `/iletisim` — İletişim formu, adres, harita

## Deploy (Railway önerilir)

1. Bu klasörü bir GitHub reposuna push edin.
2. [railway.app](https://railway.app) üzerinde yeni proje oluşturup repoyu bağlayın.
3. Railway otomatik olarak Next.js projesini algılar; `npm run build` ve `npm run start`
   komutlarını kullanır.
4. İleride bildiri/kayıt sistemi eklendiğinde aynı projeye bir PostgreSQL eklentisi
   (Railway → New → Database → PostgreSQL) eklenerek bağlanabilir.

Alternatif: Render.com (aynı mantıkla) veya Vercel (frontend) + Supabase/Neon
(veritabanı) kombinasyonu.

## Sonraki Aşamalar

- Bildiri gönderim ve hakem değerlendirme sistemi
- Online kayıt ve ödeme (kredi kartı, e-fatura) sistemi
- Gerçek logo, fotoğraf ve program içeriğinin eklenmesi
- Çok dilli yapı (TR/EN) için i18n altyapısının devreye alınması
