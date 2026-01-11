# 🚀 MedMind - Deployment Kılavuzu

## ⚡ Hızlı Deploy (Vercel - Önerilen)

### 1. Vercel Hesabı Oluştur
- [vercel.com](https://vercel.com) adresine git
- GitHub hesabınla giriş yap (ücretsiz)

### 2. Projeyi Deploy Et

#### Yöntem A: Vercel Dashboard (En Kolay)
1. Vercel dashboard'a git
2. **"Add New Project"** tıkla
3. GitHub reposunu seç (sjjsjdjdjdnjf)
4. **"Import"** tıkla
5. Environment Variables ekle:
   ```
   DEEPSEEK_API_KEY = your_actual_deepseek_key_here
   ```
6. **"Deploy"** tıkla
7. 2-3 dakika bekle ✨
8. Canlı URL'ni al! (örn: `medmind-xyz.vercel.app`)

#### Yöntem B: Komut Satırı
```bash
# Vercel CLI'yi kur
npm install -g vercel

# Login ol
vercel login

# Deploy et
vercel

# Environment variable ekle
vercel env add DEEPSEEK_API_KEY

# Production deploy
vercel --prod
```

### 3. DeepSeek API Key Al
1. [platform.deepseek.com](https://platform.deepseek.com) git
2. Hesap oluştur / Giriş yap
3. API Keys bölümüne git
4. **"Create API Key"** tıkla
5. Key'i kopyala ve güvenli bir yere kaydet

### 4. Vercel'de Environment Variable Ayarla
1. Vercel dashboard → Projen → Settings → Environment Variables
2. Yeni değişken ekle:
   - **Name:** `DEEPSEEK_API_KEY`
   - **Value:** (kopyaladığın key)
   - **Environment:** Production, Preview, Development (hepsini seç)
3. Save

### 5. Redeploy (Environment Variables Uygulamak İçin)
1. Deployments sekmesine git
2. En son deployment'ın yanındaki **"..."** → **"Redeploy"**
3. Veya yeni bir commit push et

---

## 🔧 Local Development (Geliştirme)

### 1. Environment Variables
```bash
# .env dosyası oluştur
cp .env.example .env

# .env dosyasını düzenle
nano .env
```

`.env` içeriği:
```env
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. Development Server
```bash
# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev
```

**NOT:** Local'de serverless function çalışmaz. Mock data gösterilir.

### 3. Vercel Dev (Serverless Functions ile Local Test)
```bash
# Vercel CLI yükle
npm install -g vercel

# Vercel dev server başlat (serverless functions ile)
vercel dev
```

Bu şekilde local'de API çalışır!

---

## 🌐 Alternatif Deployment Seçenekleri

### Netlify
```bash
# Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Environment variables
netlify env:set DEEPSEEK_API_KEY your_key_here
```

`netlify.toml` dosyası ekle:
```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "api"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Cloudflare Pages
1. Cloudflare dashboard → Pages
2. GitHub repo bağla
3. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
4. Environment variables:
   - `DEEPSEEK_API_KEY`
5. Deploy

**NOT:** Cloudflare Pages için serverless function'lar Workers formatında olmalı (farklı syntax).

---

## 🔒 Güvenlik Kontrol Listesi

✅ **YAPILMASI GEREKENLER:**
- [ ] `.env` dosyası `.gitignore`'da
- [ ] API key'i Vercel Environment Variables'da
- [ ] Environment variable adı `VITE_` ile başlamıyor (frontend'e leak olmaması için)
- [ ] Serverless function CORS headers doğru ayarlanmış
- [ ] Production'da API rate limiting düşün (DeepSeek API limitleri)

❌ **YAPILMAMASI GEREKENLER:**
- API key'i **asla** frontend koduna yazma
- `.env` dosyasını **asla** commit etme
- `VITE_` ile başlayan environment variable kullanma (bunlar frontend'e expose olur)

---

## 📊 DeepSeek API Fiyatlandırma

| Model | Input (1M token) | Output (1M token) |
|-------|------------------|-------------------|
| DeepSeek-V3 | $0.27 | $1.10 |

**Örnek maliyet:**
- Ortalama bir arama: ~2000 input + ~1500 output token
- Maliyet: ~$0.00215 per arama
- 1000 arama: ~$2.15

**Ücretsiz Tier:** İlk kayıtta genellikle $5 kredi veriliyor.

---

## 🐛 Troubleshooting

### Sorun: "API key not configured"
**Çözüm:**
1. Vercel dashboard → Settings → Environment Variables
2. `DEEPSEEK_API_KEY` eklenmiş mi kontrol et
3. Redeploy yap

### Sorun: CORS hatası
**Çözüm:**
`api/search-topic.ts` dosyasında CORS headers doğru ayarlanmış. Eğer hala hata varsa:
```typescript
res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.vercel.app');
```

### Sorun: Mock data görünüyor
**Çözüm:**
1. Browser console'u aç (F12)
2. Network tab'ında `/api/search-topic` isteğini kontrol et
3. Hata mesajını oku
4. DeepSeek API key'i doğru mu kontrol et

### Sorun: Build hatası
**Çözüm:**
```bash
# Local'de build test et
npm run build

# Hataları düzelt
npm run build
```

---

## 🎯 Production Checklist

Canlıya almadan önce:
- [ ] Local'de test edildi (`npm run dev`)
- [ ] Build başarılı (`npm run build`)
- [ ] DeepSeek API key alındı
- [ ] Vercel hesabı oluşturuldu
- [ ] Environment variables ayarlandı
- [ ] İlk deployment başarılı
- [ ] Canlıda arama testi yapıldı
- [ ] Mobile responsive kontrol edildi
- [ ] Performance test edildi

---

## 📞 Yardım

- **Vercel Docs:** https://vercel.com/docs
- **DeepSeek Docs:** https://platform.deepseek.com/docs
- **MedMind Issues:** GitHub Issues kullan

---

**Başarılar!** 🎓✨
