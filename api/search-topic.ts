import type { VercelRequest, VercelResponse } from '@vercel/node';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    console.error('DEEPSEEK_API_KEY environment variable is not set');
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = `Kullanıcı şu tıbbi terimi araştırıyor: "${query}"

Bu terimle ilgili kapsamlı bir öğrenme haritası oluştur. Yanıtını SADECE JSON formatında ver, başka hiçbir metin ekleme.

JSON yapısı:
{
  "mainTopic": {
    "term": "Terim adı",
    "definition": "Detaylı tanım (2-3 cümle)",
    "category": "anatomy/physiology/pathology/pharmacology/clinical/biochemistry/histology",
    "clinicalPearls": ["Önemli klinik ipucu 1", "İpucu 2", "İpucu 3"],
    "mnemonics": ["Varsa mnemonik 1", "Varsa mnemonik 2"],
    "keyPoints": ["Ana nokta 1", "Ana nokta 2", "Ana nokta 3"]
  },
  "relatedTopics": [
    {
      "categoryName": "Temel Bilimler",
      "categoryIcon": "microscope",
      "items": [
        {
          "title": "İlgili konu başlığı",
          "relevanceScore": 8,
          "relationshipType": "prerequisite",
          "briefDescription": "Kısa açıklama (1 cümle)",
          "category": "anatomy"
        }
      ]
    },
    {
      "categoryName": "Patofizyoloji",
      "categoryIcon": "activity",
      "items": [...]
    },
    {
      "categoryName": "Klinik Bulgular",
      "categoryIcon": "stethoscope",
      "items": [...]
    },
    {
      "categoryName": "Tanı",
      "categoryIcon": "search",
      "items": [...]
    },
    {
      "categoryName": "Tedavi",
      "categoryIcon": "pill",
      "items": [...]
    },
    {
      "categoryName": "İlişkili Durumlar",
      "categoryIcon": "link",
      "items": [...]
    }
  ],
  "questions": [
    {
      "question": "Soru metni?",
      "options": ["A) Şık 1", "B) Şık 2", "C) Şık 3", "D) Şık 4"],
      "correctAnswer": 1,
      "explanation": "Cevap açıklaması (2-3 cümle)",
      "difficulty": "medium"
    }
  ],
  "suggestedTopics": ["Öneri 1", "Öneri 2", "Öneri 3", "Öneri 4", "Öneri 5"]
}

KURALLAR:
- En az 6 kategori olmalı
- Her kategoride en az 3-4 ilgili konu olmalı
- Tıbbi olarak doğru ve güncel bilgiler ver
- Türkçe dilbilgisine dikkat et
- Sadece JSON yanıtı ver, başka metin yok`;

  try {
    const messages: DeepSeekMessage[] = [
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', response.status, errorText);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    const content = data.choices[0]?.message?.content || '';

    // JSON'u çıkar
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON bulunamadı');
    }

    const result = JSON.parse(jsonMatch[0]);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in search-topic:', error);
    return res.status(500).json({
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
