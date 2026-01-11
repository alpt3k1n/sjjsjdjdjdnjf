import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import type { RelatedItem } from '../../types';
import RelatedItemCard from './RelatedItemCard';

interface CategorySectionProps {
  title: string;
  icon: LucideIcon;
  items: RelatedItem[];
  onItemClick: (item: RelatedItem) => void;
  gradient?: 'primary' | 'secondary' | 'accent';
  defaultExpanded?: boolean;
}

export default function CategorySection({
  title,
  icon: Icon,
  items,
  onItemClick,
  gradient = 'primary',
  defaultExpanded = true,
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const gradients = {
    primary: 'from-primary-start to-primary-end',
    secondary: 'from-secondary-start to-secondary-end',
    accent: 'from-accent-start to-accent-end',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mb-4 group"
      >
        <div className="glass-card p-4 flex items-center justify-between hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[gradient]} flex items-center justify-center`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="text-sm text-white/60">{items.length} ilgili konu</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-6 h-6 text-white/60 group-hover:text-white/80 transition-colors" />
          </motion.div>
        </div>
      </button>

      {/* Category Items */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <RelatedItemCard
              key={item.id}
              item={item}
              onClick={() => onItemClick(item)}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
