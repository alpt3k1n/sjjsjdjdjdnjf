import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import type { RelatedItem } from '../../types';
import GlassCard from '../ui/GlassCard';

interface RelatedItemCardProps {
  item: RelatedItem;
  onClick: () => void;
  index: number;
}

const relationshipColors = {
  prerequisite: 'text-blue-400',
  consequence: 'text-red-400',
  differential: 'text-yellow-400',
  treatment: 'text-green-400',
  complication: 'text-orange-400',
  'risk-factor': 'text-purple-400',
};

const relationshipLabels = {
  prerequisite: 'Ön Koşul',
  consequence: 'Sonuç',
  differential: 'Ayırıcı Tanı',
  treatment: 'Tedavi',
  complication: 'Komplikasyon',
  'risk-factor': 'Risk Faktörü',
};

export default function RelatedItemCard({ item, onClick, index }: RelatedItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <GlassCard hover onClick={onClick} className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-white/60">{item.relevanceScore}/10</span>
              </div>
            </div>
            <p className="text-sm text-white/70 line-clamp-2">
              {item.briefDescription}
            </p>
            <div className="mt-2">
              <span
                className={`text-xs font-medium ${relationshipColors[item.relationshipType]}`}
              >
                {relationshipLabels[item.relationshipType]}
              </span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-white/40 flex-shrink-0 mt-1" />
        </div>
      </GlassCard>
    </motion.div>
  );
}
