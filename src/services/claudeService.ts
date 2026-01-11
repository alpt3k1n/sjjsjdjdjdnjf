import Anthropic from '@anthropic-ai/sdk';
import type { SearchResult, MedicalTopic, Question } from '../types';

// API anahtarı environment variable'dan gelecek
const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  dangerouslyAllowBrowser: true, // Sadece demo için, production'da backend kullanılmalı
});

interface ClaudeResponse {
  mainTopic: {
    term: string;
    definition: string;
    category: string;
    clinicalPearls: string[];
    mnemonics?: string[];
    keyPoints?: string[];
  };
  relatedTopics: {
    categoryName: string;
    categoryIcon: string;
    items: Array<{
      title: string;
      relevanceScore: number;
      relationshipType: string;
      briefDescription: string;
      category: string;
    }>;
  }[];
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: string;
  }>;
  suggestedTopics: string[];
}

export async function searchMedicalTopic(query: string): Promise<SearchResult> {
  const prompt = `Kullanıcı şu tıbbi terimi araştırıyor: "${query}"

Bu terimle ilgili kapsamlı bir öğrenme haritası oluştur. Yanıtını SADECE JSON formatında ver, başka hiçbir metin ekleme.

JSON yapısı:
{
  "mainTopic": {
    "term": "Terim adı",
    "definition": "Detaylı tanım",
    "category": "anatomy/physiology/pathology/pharmacology/clinical/biochemistry/histology",
    "clinicalPearls": ["Önemli klinik ipucu 1", "İpucu 2"],
    "mnemonics": ["Varsa mnemonik"],
    "keyPoints": ["Ana nokta 1", "Ana nokta 2"]
  },
  "relatedTopics": [
    {
      "categoryName": "Temel Bilimler",
      "categoryIcon": "microscope",
      "items": [
        {
          "title": "İlgili konu",
          "relevanceScore": 8,
          "relationshipType": "prerequisite/consequence/differential/treatment/complication/risk-factor",
          "briefDescription": "Kısa açıklama",
          "category": "anatomy"
        }
      ]
    },
    {
      "categoryName": "Patofizyoloji",
      "categoryIcon": "activity",
      "items": []
    },
    {
      "categoryName": "Klinik Bulgular",
      "categoryIcon": "stethoscope",
      "items": []
    },
    {
      "categoryName": "Tanı",
      "categoryIcon": "search",
      "items": []
    },
    {
      "categoryName": "Tedavi",
      "categoryIcon": "pill",
      "items": []
    },
    {
      "categoryName": "İlişkili Durumlar",
      "categoryIcon": "link",
      "items": []
    }
  ],
  "questions": [
    {
      "question": "Soru metni?",
      "options": ["A) Şık 1", "B) Şık 2", "C) Şık 3", "D) Şık 4"],
      "correctAnswer": 0,
      "explanation": "Cevap açıklaması",
      "difficulty": "easy/medium/hard"
    }
  ],
  "suggestedTopics": ["Öneri 1", "Öneri 2", "Öneri 3"]
}

En az 3 kategori ve her kategoride en az 3-5 ilgili konu ekle. Tıbbi olarak doğru ve güncel bilgiler ver.`;

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // JSON'u parse et
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Claude yanıtında JSON bulunamadı');
    }

    const claudeResponse: ClaudeResponse = JSON.parse(jsonMatch[0]);

    // SearchResult formatına dönüştür
    const mainTopic: MedicalTopic = {
      id: `topic-${Date.now()}`,
      term: claudeResponse.mainTopic.term,
      definition: claudeResponse.mainTopic.definition,
      category: claudeResponse.mainTopic.category as any,
      relatedTopics: claudeResponse.relatedTopics.map((cat) => ({
        categoryName: cat.categoryName,
        categoryIcon: cat.categoryIcon,
        items: cat.items.map((item, idx) => ({
          id: `item-${Date.now()}-${idx}`,
          title: item.title,
          relevanceScore: item.relevanceScore,
          relationshipType: item.relationshipType as any,
          briefDescription: item.briefDescription,
          category: item.category as any,
        })),
      })),
      clinicalPearls: claudeResponse.mainTopic.clinicalPearls,
      mnemonics: claudeResponse.mainTopic.mnemonics,
      keyPoints: claudeResponse.mainTopic.keyPoints,
    };

    const questions: Question[] = claudeResponse.questions.map((q, idx) => ({
      id: `q-${Date.now()}-${idx}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty as any,
      relatedTopicId: mainTopic.id,
    }));

    return {
      mainTopic,
      relatedQuestions: questions,
      suggestedTopics: claudeResponse.suggestedTopics,
    };
  } catch (error) {
    console.error('Claude API hatası:', error);

    // Hata durumunda mock data dön
    return getMockSearchResult(query);
  }
}

// Mock data fallback
function getMockSearchResult(query: string): SearchResult {
  return {
    mainTopic: {
      id: 'mock-topic',
      term: query,
      definition: `${query} hakkında detaylı bilgi. Bu örnek bir tanımdır. Gerçek uygulamada Claude API'den gelecek.`,
      category: 'clinical',
      relatedTopics: [
        {
          categoryName: 'Temel Bilimler',
          categoryIcon: 'microscope',
          items: [
            {
              id: '1',
              title: 'İlgili Anatomi',
              relevanceScore: 9,
              relationshipType: 'prerequisite',
              briefDescription: 'Anatomik yapılar ve ilişkiler',
              category: 'anatomy',
            },
            {
              id: '2',
              title: 'Fizyolojik Süreçler',
              relevanceScore: 8,
              relationshipType: 'prerequisite',
              briefDescription: 'Normal fizyolojik işleyiş',
              category: 'physiology',
            },
          ],
        },
        {
          categoryName: 'Patofizyoloji',
          categoryIcon: 'activity',
          items: [
            {
              id: '3',
              title: 'Hastalık Mekanizması',
              relevanceScore: 10,
              relationshipType: 'consequence',
              briefDescription: 'Hastalığın gelişim süreci',
              category: 'pathology',
            },
          ],
        },
        {
          categoryName: 'Tedavi',
          categoryIcon: 'pill',
          items: [
            {
              id: '4',
              title: 'Farmakolojik Tedavi',
              relevanceScore: 9,
              relationshipType: 'treatment',
              briefDescription: 'İlaç tedavisi yaklaşımları',
              category: 'pharmacology',
            },
          ],
        },
      ],
      clinicalPearls: [
        'Önemli klinik ipucu 1',
        'Önemli klinik ipucu 2',
      ],
      keyPoints: [
        'Ana öğrenme noktası 1',
        'Ana öğrenme noktası 2',
      ],
    },
    relatedQuestions: [
      {
        id: 'q1',
        question: `${query} ile ilgili hangi ifade doğrudur?`,
        options: [
          'A) Örnek şık 1',
          'B) Örnek şık 2 (Doğru)',
          'C) Örnek şık 3',
          'D) Örnek şık 4',
        ],
        correctAnswer: 1,
        explanation: 'Cevap B doğrudur çünkü...',
        difficulty: 'medium',
        relatedTopicId: 'mock-topic',
      },
    ],
    suggestedTopics: [
      'İlgili Konu 1',
      'İlgili Konu 2',
      'İlgili Konu 3',
    ],
  };
}
