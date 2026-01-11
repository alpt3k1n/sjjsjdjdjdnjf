import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import type { Question } from '../../types';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

interface QuizCardProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
}

export default function QuizCard({ question, onAnswer }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setShowResult(true);
    const isCorrect = selectedOption === question.correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 2000);
  };

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <GlassCard className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-xl font-semibold text-white flex-1">
            {question.question}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              question.difficulty === 'easy'
                ? 'bg-green-500/20 text-green-400'
                : question.difficulty === 'medium'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {question.difficulty === 'easy'
              ? 'Kolay'
              : question.difficulty === 'medium'
              ? 'Orta'
              : 'Zor'}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`
              w-full text-left p-4 rounded-xl transition-all duration-200
              ${
                selectedOption === index
                  ? 'bg-white/20 border-2 border-primary-start'
                  : 'glass-card hover:bg-white/15'
              }
              ${
                showResult && index === question.correctAnswer
                  ? 'border-2 border-green-400 bg-green-500/10'
                  : ''
              }
              ${
                showResult &&
                selectedOption === index &&
                index !== question.correctAnswer
                  ? 'border-2 border-red-400 bg-red-500/10'
                  : ''
              }
            `}
            whileHover={!showResult ? { scale: 1.02 } : undefined}
            whileTap={!showResult ? { scale: 0.98 } : undefined}
            disabled={showResult}
          >
            <div className="flex items-center justify-between">
              <span className="text-white">{option}</span>
              {showResult && index === question.correctAnswer && (
                <Check className="w-5 h-5 text-green-400" />
              )}
              {showResult &&
                selectedOption === index &&
                index !== question.correctAnswer && (
                  <X className="w-5 h-5 text-red-400" />
                )}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-xl mb-4 ${
              isCorrect
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-red-500/10 border border-red-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={`font-semibold mb-2 ${
                    isCorrect ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {isCorrect ? 'Doğru!' : 'Yanlış!'}
                </p>
                <p className="text-white/80 text-sm">{question.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          variant="primary"
          className="w-full"
        >
          Cevapla
        </Button>
      )}
    </GlassCard>
  );
}
