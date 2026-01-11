import type { SearchResult, MedicalTopic, Question } from '../types';

interface DeepSeekResponse {
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

// Serverless function URL (production'da Vercel URL, dev'de local)
const API_BASE_URL = import.meta.env.PROD
  ? '/api'
  : 'http://localhost:5173/api';

export async function searchMedicalTopic(query: string): Promise<SearchResult> {
  try {
    // Serverless function'a istek at
    const response = await fetch(`${API_BASE_URL}/search-topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const deepSeekResponse: DeepSeekResponse = await response.json();

    // SearchResult formatına dönüştür
    const mainTopic: MedicalTopic = {
      id: `topic-${Date.now()}`,
      term: deepSeekResponse.mainTopic.term,
      definition: deepSeekResponse.mainTopic.definition,
      category: deepSeekResponse.mainTopic.category as any,
      relatedTopics: deepSeekResponse.relatedTopics.map((cat) => ({
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
      clinicalPearls: deepSeekResponse.mainTopic.clinicalPearls,
      mnemonics: deepSeekResponse.mainTopic.mnemonics,
      keyPoints: deepSeekResponse.mainTopic.keyPoints,
    };

    const questions: Question[] = deepSeekResponse.questions.map((q, idx) => ({
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
      suggestedTopics: deepSeekResponse.suggestedTopics,
    };
  } catch (error) {
    console.error('AI Service error:', error);

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
      definition: `${query} hakkında detaylı bilgi. API bağlantısı kurulamadı, örnek veri gösteriliyor. Gerçek uygulamada DeepSeek API'den gelecek.`,
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
            {
              id: '3',
              title: 'Hücresel Düzey',
              relevanceScore: 7,
              relationshipType: 'prerequisite',
              briefDescription: 'Hücresel mekanizmalar ve histoloji',
              category: 'histology',
            },
          ],
        },
        {
          categoryName: 'Patofizyoloji',
          categoryIcon: 'activity',
          items: [
            {
              id: '4',
              title: 'Hastalık Mekanizması',
              relevanceScore: 10,
              relationshipType: 'consequence',
              briefDescription: 'Hastalığın gelişim süreci',
              category: 'pathology',
            },
            {
              id: '5',
              title: 'Komplikasyonlar',
              relevanceScore: 9,
              relationshipType: 'complication',
              briefDescription: 'Olası komplikasyonlar',
              category: 'pathology',
            },
          ],
        },
        {
          categoryName: 'Klinik Bulgular',
          categoryIcon: 'stethoscope',
          items: [
            {
              id: '6',
              title: 'Semptomlar',
              relevanceScore: 10,
              relationshipType: 'consequence',
              briefDescription: 'Tipik klinik prezentasyon',
              category: 'clinical',
            },
            {
              id: '7',
              title: 'Fizik Muayene',
              relevanceScore: 9,
              relationshipType: 'consequence',
              briefDescription: 'Fizik muayene bulguları',
              category: 'clinical',
            },
          ],
        },
        {
          categoryName: 'Tanı',
          categoryIcon: 'search',
          items: [
            {
              id: '8',
              title: 'Laboratuvar Testleri',
              relevanceScore: 9,
              relationshipType: 'treatment',
              briefDescription: 'Tanısal laboratuvar testleri',
              category: 'clinical',
            },
            {
              id: '9',
              title: 'Görüntüleme',
              relevanceScore: 8,
              relationshipType: 'treatment',
              briefDescription: 'Radyolojik incelemeler',
              category: 'clinical',
            },
          ],
        },
        {
          categoryName: 'Tedavi',
          categoryIcon: 'pill',
          items: [
            {
              id: '10',
              title: 'Farmakolojik Tedavi',
              relevanceScore: 9,
              relationshipType: 'treatment',
              briefDescription: 'İlaç tedavisi yaklaşımları',
              category: 'pharmacology',
            },
            {
              id: '11',
              title: 'Cerrahi Seçenekler',
              relevanceScore: 7,
              relationshipType: 'treatment',
              briefDescription: 'Cerrahi tedavi yöntemleri',
              category: 'clinical',
            },
          ],
        },
        {
          categoryName: 'İlişkili Durumlar',
          categoryIcon: 'link',
          items: [
            {
              id: '12',
              title: 'Risk Faktörleri',
              relevanceScore: 8,
              relationshipType: 'risk-factor',
              briefDescription: 'Predispozan faktörler',
              category: 'clinical',
            },
            {
              id: '13',
              title: 'Ayırıcı Tanı',
              relevanceScore: 8,
              relationshipType: 'differential',
              briefDescription: 'Benzer prezentasyonlar',
              category: 'clinical',
            },
          ],
        },
      ],
      clinicalPearls: [
        'Önemli klinik ipucu 1',
        'Önemli klinik ipucu 2',
        'Önemli klinik ipucu 3',
      ],
      keyPoints: [
        'Ana öğrenme noktası 1',
        'Ana öğrenme noktası 2',
        'Ana öğrenme noktası 3',
      ],
      mnemonics: ['Örnek mnemonik'],
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
        explanation: 'Cevap B doğrudur çünkü... (Bu örnek veridir)',
        difficulty: 'medium',
        relatedTopicId: 'mock-topic',
      },
      {
        id: 'q2',
        question: `${query} tedavisinde ilk tercih hangisidir?`,
        options: [
          'A) Tedavi A',
          'B) Tedavi B',
          'C) Tedavi C (Doğru)',
          'D) Tedavi D',
        ],
        correctAnswer: 2,
        explanation: 'İlk tercih C\'dir çünkü... (Bu örnek veridir)',
        difficulty: 'easy',
        relatedTopicId: 'mock-topic',
      },
    ],
    suggestedTopics: [
      'İlgili Konu 1',
      'İlgili Konu 2',
      'İlgili Konu 3',
      'İlgili Konu 4',
      'İlgili Konu 5',
    ],
  };
}
