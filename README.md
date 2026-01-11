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

### 🤖 Claude AI Entegrasyonu
- Anthropic Claude 3.5 Sonnet ile güçlendirilmiş
- Her arama için dinamik olarak ilişkisel içerik üretimi
- Klinik ipuçları ve mnemonikler
- Otomatik soru oluşturma

### 📚 Öğrenme Modları
- **Quiz Modu**: İnteraktif çoktan seçmeli sorular
- **Flashcard Modu**: Spaced repetition için kartlar
- **Klinik Senaryolar**: Vaka bazlı öğrenme (gelecek güncellemelerde)

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Anthropic API anahtarı

### Adımlar

1. **Depoyu klonlayın**
```bash
git clone <repo-url>
cd sjjsjdjdjdnjf
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment variables ayarlayın**
```bash
cp .env.example .env
```

`.env` dosyasını açın ve API anahtarınızı ekleyin:
```env
VITE_ANTHROPIC_API_KEY=your_actual_api_key_here
```

API anahtarı almak için: [https://console.anthropic.com/](https://console.anthropic.com/)

4. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── ui/                 # Temel UI bileşenleri
│   │   ├── GlassCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Button.tsx
│   │   ├── CategoryChip.tsx
│   │   └── LoadingSpinner.tsx
│   ├── search/             # Arama sayfası bileşenleri
│   │   ├── CategorySection.tsx
│   │   └── RelatedItemCard.tsx
│   └── quiz/               # Quiz ve flashcard bileşenleri
│       ├── QuizCard.tsx
│       └── FlashCard.tsx
├── pages/
│   ├── Home.tsx            # Ana sayfa
│   └── Search.tsx          # Arama sonuçları sayfası
├── services/
│   └── claudeService.ts    # Claude API entegrasyonu
├── types/
│   └── index.ts            # TypeScript type tanımları
├── App.tsx                 # Ana uygulama ve router
├── index.css               # Global stiller ve glassmorphism
└── main.tsx                # Giriş noktası
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

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v6
- **AI Service**: Anthropic Claude API
- **State Management**: Zustand (hazır, henüz kullanılmıyor)

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

### Mock Data
- API anahtarı yoksa veya Claude API'de hata oluşursa, otomatik olarak mock data kullanılır
- Mock data `claudeService.ts` içinde tanımlıdır

### Güvenlik
- **ÖNEMLİ**: `dangerouslyAllowBrowser: true` sadece demo amaçlıdır
- Production'da API çağrıları **backend'den** yapılmalıdır
- API anahtarlarını asla client-side'da expose etmeyin

### Performans
- Lazy loading için React.lazy kullanımı planlanmıştır
- Image optimization eklenecek
- PWA desteği gelecek güncellemelerde

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
