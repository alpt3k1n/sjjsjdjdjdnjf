# 🩺 MedMind - Tıp Öğrenme Asistanı

MedMind, tıp öğrencileri için geliştirilmiş modern bir **ilişkisel öğrenme platformu**dur. Her tıbbi konuyu derinlemesine analiz eder ve ilgili anatomik, fizyolojik, patolojik, farmakolojik kavramlarla bağlantılarını görselleştirir.

## ✨ Özellikler

### 🔍 İlişkisel Arama
- Bir konuyu aradığınızda, o konuyla ilgili **tüm bağlantılı kavramları** kategorize edilmiş şekilde gösterir
- 6 ana kategori: Temel Bilimler, Patofizyoloji, Klinik Bulgular, Tanı, Tedavi, İlişkili Durumlar
- Her ilişki tipi için görsel göstergeler (ön koşul, sonuç, ayırıcı tanı, komplikasyon, vb.)

### 🎨 Modern UI/UX
- **iOS Glassmorphism** tasarım dili
- Yumuşak blur efektleri ve gradient'ler
- Animasyonlu geçişler (Framer Motion)
- Dark mode optimized
- Mobil uyumlu responsive tasarım

### 🤖 DeepSeek AI Entegrasyonu
- DeepSeek-V3 ile güçlendirilmiş (son derece uygun maliyetli!)
- Güvenli serverless backend (Vercel Functions)
- Her arama için dinamik olarak ilişkisel içerik üretimi
- Klinik ipuçları ve mnemonikler
- Otomatik soru oluşturma
- API key'i frontend'de expose olmaz (güvenli!)

### 📚 Öğrenme Modları
- **Quiz Modu**: İnteraktif çoktan seçmeli sorular
- **Flashcard Modu**: Spaced repetition için kartlar
- **Klinik Senaryolar**: Vaka bazlı öğrenme (gelecek güncellemelerde)

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- DeepSeek API anahtarı (ücretsiz tier: $5 kredi)
- Vercel hesabı (ücretsiz)

### Hızlı Deploy (Önerilen - 5 dakika!)

**Canlıya almak için en kolay yol:**

1. **Vercel'e Deploy Et**
   - [vercel.com](https://vercel.com) → GitHub ile giriş yap
   - "New Project" → Bu repoyu seç → Import
   - Environment Variable ekle: `DEEPSEEK_API_KEY`
   - Deploy! ✨

2. **DeepSeek API Key Al**
   - [platform.deepseek.com](https://platform.deepseek.com) → Hesap oluştur
   - API Keys → Create API Key
   - Key'i kopyala → Vercel'de Environment Variables'a ekle

3. **Redeploy yap ve hazır!**

📖 Detaylı deployment talimatları için: [DEPLOYMENT.md](./DEPLOYMENT.md)

### Local Development

1. **Depoyu klonlayın**
```bash
git clone <repo-url>
cd sjjsjdjdjdnjf
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Development server başlatın**
```bash
npm run dev
```

**NOT:** Local'de serverless function çalışmaz, mock data gösterilir.

**Serverless functions ile test için:**
```bash
npm install -g vercel
vercel dev
```

## 📁 Proje Yapısı

```
├── api/                         # 🔒 Serverless Functions (Backend)
│   └── search-topic.ts          # DeepSeek API endpoint (güvenli!)
├── src/                         # Frontend
│   ├── components/
│   │   ├── ui/                  # Temel UI bileşenleri
│   │   │   ├── GlassCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── CategoryChip.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── search/              # Arama sayfası bileşenleri
│   │   │   ├── CategorySection.tsx
│   │   │   └── RelatedItemCard.tsx
│   │   └── quiz/                # Quiz ve flashcard bileşenleri
│   │       ├── QuizCard.tsx
│   │       └── FlashCard.tsx
│   ├── pages/
│   │   ├── Home.tsx             # Ana sayfa
│   │   └── Search.tsx           # Arama sonuçları sayfası
│   ├── services/
│   │   └── aiService.ts         # AI servisi (serverless function'a bağlanır)
│   ├── types/
│   │   └── index.ts             # TypeScript type tanımları
│   ├── App.tsx                  # Ana uygulama ve router
│   ├── index.css                # Global stiller ve glassmorphism
│   └── main.tsx                 # Giriş noktası
├── vercel.json                  # Vercel deployment config
├── DEPLOYMENT.md                # 🚀 Deployment kılavuzu
└── .env.example                 # Environment variables şablonu
```

## 🎯 Kullanım

### 1. Ana Sayfada Arama
- Ana sayfadaki arama çubuğuna bir tıbbi terim yazın (örn: "Miyokard Enfarktüsü")
- Veya popüler konulardan birini seçin

### 2. Sonuçları Keşfetme
- İlişkili konular kategorilere ayrılmış şekilde görüntülenir
- Her kategorideki kartlara tıklayarak detaylara ulaşın
- Klinik ipuçları ve mnemonikleri inceleyin

### 3. Pratik Yapma
- Sayfa sonundaki quiz sorularıyla kendinizi test edin
- Önerilen konulara tıklayarak öğrenmeye devam edin

## 🛠 Teknoloji Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Backend**: Vercel Serverless Functions
- **AI Model**: DeepSeek-V3 (OpenAI-compatible API)
- **Deployment**: Vercel (önerilen)
- **State Management**: Zustand (hazır, henüz kullanılmıyor)

### Neden DeepSeek?
- ✅ **Uygun Maliyet**: Claude'un ~1/10 fiyatı ($0.27/1M input token)
- ✅ **Güçlü Performans**: SOTA model (2024)
- ✅ **OpenAI-Compatible API**: Kolay entegrasyon
- ✅ **Ücretsiz Başlangıç**: İlk kayıtta $5 kredi

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary Gradient**: `#667eea` → `#764ba2` (Mor-Mavi)
- **Secondary Gradient**: `#f093fb` → `#f5576c` (Pembe-Kırmızı)
- **Accent Gradient**: `#4facfe` → `#00f2fe` (Mavi-Cyan)
- **Background**: Dark gradient mesh

### Glassmorphism Efektleri
- Backdrop blur: 20px
- Alpha transparency: 0.08 - 0.15
- Border: rgba(255,255,255, 0.15)
- Hover'da elevation artışı

## 📝 Geliştirme Notları

### 🔒 Güvenlik (ÇOK ÖNEMLİ!)
- ✅ **API Key Güvenliği**: DeepSeek API key'i **sadece** serverless function'da (backend)
- ✅ **Environment Variables**: `DEEPSEEK_API_KEY` (NOT: `VITE_` ile başlamıyor!)
- ✅ **CORS Protection**: API endpoint'ler CORS ile korumalı
- ✅ **No Client Exposure**: API key'i **asla** frontend koduna gömülü değil
- ❌ **Eski yöntem**: `dangerouslyAllowBrowser` kullanmıyoruz (güvensiz!)

### Mock Data
- API'ye erişilemezse otomatik olarak mock data kullanılır
- Mock data `aiService.ts` içinde tanımlıdır
- Development sırasında faydalı

### Performans
- Serverless functions: Cold start ~1-2 saniye
- DeepSeek API: ~3-5 saniye yanıt süresi
- Lazy loading planlanmıştır
- PWA desteği gelecek güncellemelerde

### 💰 Maliyet Tahmini
- Ortalama arama: ~$0.002 (2000 input + 1500 output token)
- 100 arama: ~$0.20
- 1000 arama: ~$2.00
- Ücretsiz tier: $5 kredi (~2500 arama)

## 🚧 Gelecek Özellikler

- [ ] Knowledge Graph görselleştirmesi (D3.js veya React Flow)
- [ ] Kullanıcı kaydı ve progress tracking
- [ ] Offline erişim (PWA)
- [ ] Anki formatında export
- [ ] PDF oluşturma
- [ ] Collaborative learning (diğer öğrencilerle bağlantı)
- [ ] AI Tutor modu (conversational)
- [ ] Spaced repetition algoritması
- [ ] Dark/Light mode toggle

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altındadır.

## 👨‍⚕️ Hedef Kitle

- Tıp fakültesi öğrencileri
- Tıp sınavlarına (TUS, STS) hazırlananlar
- Sürekli tıp eğitimi alanlar
- Tıbbi kavramları ilişkilendirerek öğrenmek isteyenler

## 💡 İlham Kaynakları

Bu proje, tıp eğitiminde **bağlantılı öğrenme** (connected learning) yaklaşımından ilham almıştır. Bilgileri izole olarak değil, birbirleriyle ilişkileri içinde öğrenme, uzun vadeli bellekte daha kalıcı sonuçlar verir.

## 📞 Destek

Sorularınız veya geri bildirimleriniz için GitHub Issues kullanabilirsiniz.

---

**MedMind** ile tıbbi bilgiyi keşfedin, ilişkilendirin ve unutmayın! 🎓✨
