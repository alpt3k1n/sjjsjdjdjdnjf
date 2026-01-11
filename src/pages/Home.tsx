import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import CategoryChip from '../components/ui/CategoryChip';
import { BookOpen, Microscope, Activity, Pill, Stethoscope, Brain } from 'lucide-react';

const popularTopics = [
  { label: 'Miyokard Enfarktüsü', icon: Activity },
  { label: 'Diyabetes Mellitus', icon: Pill },
  { label: 'Akut Apandisit', icon: Stethoscope },
  { label: 'Hipertansiyon', icon: Activity },
  { label: 'Pnömoni', icon: Microscope },
  { label: 'İnme', icon: Brain },
];

const recentSearches = [
  'Koroner Arter Hastalığı',
  'Kalp Yetmezliği',
  'Astım',
];

export default function Home() {
  const [suggestions] = useState<string[]>([
    'Miyokard Enfarktüsü',
    'Miyokardiyopati',
    'Miyokardit',
  ]);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen animated-mesh flex flex-col">
      {/* Header */}
      <motion.header
        className="p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary-start" />
            <h1 className="text-3xl font-bold gradient-text-primary">
              MedMind
            </h1>
          </div>
          <p className="mt-2 text-white/60">
            İlişkisel Tıp Öğrenme Platformu
          </p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-5xl font-bold mb-4 gradient-text-accent">
              Tıbbi Bilgiyi Keşfet
            </h2>
            <p className="text-xl text-white/70">
              Her konuyu derinlemesine incele, ilişkilerini anla, unutma.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchBar
              onSearch={handleSearch}
              suggestions={suggestions}
              placeholder="Bir hastalık, organ veya semptom arayın..."
            />
          </motion.div>

          {/* Popular Topics */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-white/60 text-sm mb-4">Popüler Konular</p>
            <div className="flex flex-wrap gap-3">
              {popularTopics.map((topic, index) => (
                <CategoryChip
                  key={index}
                  label={topic.label}
                  icon={topic.icon}
                  onClick={() => handleSearch(topic.label)}
                  gradient={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}
                />
              ))}
            </div>
          </motion.div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-white/60 text-sm mb-4">Son Aramalar</p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <CategoryChip
                    key={index}
                    label={search}
                    onClick={() => handleSearch(search)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        className="p-6 text-center text-white/40 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <p>MedMind - Tıp Eğitiminde Yeni Bir Yaklaşım</p>
      </motion.footer>
    </div>
  );
}
