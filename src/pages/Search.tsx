import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Microscope,
  Activity,
  Stethoscope,
  Search as SearchIcon,
  Pill,
  Link,
  BookOpen,
  ArrowLeft,
  Lightbulb,
  Brain,
} from 'lucide-react';
import type { SearchResult, RelatedItem } from '../types';
import { searchMedicalTopic } from '../services/aiService';
import SearchBar from '../components/ui/SearchBar';
import CategorySection from '../components/search/CategorySection';
import GlassCard from '../components/ui/GlassCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import CategoryChip from '../components/ui/CategoryChip';

const iconMap: Record<string, any> = {
  microscope: Microscope,
  activity: Activity,
  stethoscope: Stethoscope,
  search: SearchIcon,
  pill: Pill,
  link: Link,
  brain: Brain,
};

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchMedicalTopic(searchQuery);
      setSearchResult(result);
    } catch (err) {
      setError('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const handleItemClick = (item: RelatedItem) => {
    navigate(`/topic/${item.id}`, { state: { item } });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen animated-mesh flex items-center justify-center">
        <LoadingSpinner size="lg" text="Bilgiler yükleniyor..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen animated-mesh flex items-center justify-center px-4">
        <GlassCard className="p-8 max-w-md text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={handleBackToHome}>Ana Sayfaya Dön</Button>
        </GlassCard>
      </div>
    );
  }

  if (!searchResult) {
    return (
      <div className="min-h-screen animated-mesh flex items-center justify-center">
        <LoadingSpinner size="lg" text="Hazırlanıyor..." />
      </div>
    );
  }

  const { mainTopic, relatedQuestions, suggestedTopics } = searchResult;

  return (
    <div className="min-h-screen animated-mesh">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfa
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary-start" />
              <span className="font-bold gradient-text-primary">MedMind</span>
            </div>
          </div>
          <SearchBar
            onSearch={handleNewSearch}
            placeholder="Başka bir terim ara..."
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Topic Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <GlassCard className="p-8">
            <h1 className="text-4xl font-bold gradient-text-primary mb-4">
              {mainTopic.term}
            </h1>
            <p className="text-lg text-white/80 mb-6">
              {mainTopic.definition}
            </p>

            {/* Key Points */}
            {mainTopic.keyPoints && mainTopic.keyPoints.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Ana Noktalar
                </h3>
                <ul className="space-y-2">
                  {mainTopic.keyPoints.map((point, index) => (
                    <li key={index} className="text-white/70 flex items-start gap-2">
                      <span className="text-accent-start mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Clinical Pearls */}
            {mainTopic.clinicalPearls && mainTopic.clinicalPearls.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Klinik İpuçları
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mainTopic.clinicalPearls.map((pearl, index) => (
                    <div
                      key={index}
                      className="glass-card p-3 text-sm text-white/80"
                    >
                      {pearl}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mnemonics */}
            {mainTopic.mnemonics && mainTopic.mnemonics.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white/60 mb-3">
                  🧠 Mnemonikler
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mainTopic.mnemonics.map((mnemonic, index) => (
                    <span
                      key={index}
                      className="glass-card px-4 py-2 text-sm font-mono text-secondary-start"
                    >
                      {mnemonic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Related Topics by Category */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">İlişkili Konular</h2>
          {mainTopic.relatedTopics.map((category, index) => {
            const Icon = iconMap[category.categoryIcon] || BookOpen;
            const gradient = index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent';

            return (
              <CategorySection
                key={index}
                title={category.categoryName}
                icon={Icon}
                items={category.items}
                onItemClick={handleItemClick}
                gradient={gradient}
                defaultExpanded={index === 0}
              />
            );
          })}
        </div>

        {/* Practice Questions */}
        {relatedQuestions && relatedQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Pratik Soruları</h2>
            <div className="space-y-4">
              {relatedQuestions.map((question, index) => (
                <GlassCard key={question.id} className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl font-bold text-primary-start">
                      {index + 1}
                    </span>
                    <p className="text-white flex-1">{question.question}</p>
                  </div>
                  <div className="space-y-2 mb-4 ml-8">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`glass-card p-3 ${
                          optIndex === question.correctAnswer
                            ? 'border-green-400 border-2'
                            : ''
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <div className="ml-8 glass-card p-4 bg-green-500/10 border border-green-500/30">
                    <p className="text-sm text-white/70">
                      <span className="font-semibold text-green-400">Açıklama:</span>{' '}
                      {question.explanation}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* Suggested Topics */}
        {suggestedTopics && suggestedTopics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Bunları da Araştırabilirsin
            </h2>
            <div className="flex flex-wrap gap-3">
              {suggestedTopics.map((topic, index) => (
                <CategoryChip
                  key={index}
                  label={topic}
                  onClick={() => handleNewSearch(topic)}
                  gradient={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}
                />
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
