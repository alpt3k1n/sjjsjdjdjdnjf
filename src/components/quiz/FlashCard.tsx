import { motion } from 'framer-motion';
import { useState } from 'react';
import type { FlashCard as FlashCardType } from '../../types';
import GlassCard from '../ui/GlassCard';

interface FlashCardProps {
  card: FlashCardType;
  onFlip?: () => void;
}

export default function FlashCard({ card, onFlip }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <div className="perspective-1000 w-full max-w-2xl mx-auto">
      <motion.div
        className="relative h-80 cursor-pointer"
        onClick={handleFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <GlassCard className="h-full flex flex-col items-center justify-center p-8 text-center">
            <p className="text-sm text-white/40 mb-4 uppercase tracking-wider">
              Soru
            </p>
            <h3 className="text-2xl font-semibold text-white">
              {card.front}
            </h3>
            <p className="text-sm text-white/60 mt-6">
              Kartı çevirmek için tıklayın
            </p>
          </GlassCard>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <GlassCard className="h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-primary-start/10 to-primary-end/10">
            <p className="text-sm text-white/40 mb-4 uppercase tracking-wider">
              Cevap
            </p>
            <h3 className="text-xl text-white/90 leading-relaxed">
              {card.back}
            </h3>
            <div className="mt-6">
              <div className="glass-card px-4 py-2 inline-block">
                <p className="text-xs text-white/60">
                  Yeterlik: {card.mastery}%
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
}
