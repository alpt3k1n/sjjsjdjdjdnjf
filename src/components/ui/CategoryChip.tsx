import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface CategoryChipProps {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  active?: boolean;
  gradient?: 'primary' | 'secondary' | 'accent';
}

export default function CategoryChip({
  label,
  icon: Icon,
  onClick,
  active = false,
  gradient = 'primary',
}: CategoryChipProps) {
  const gradients = {
    primary: 'from-primary-start to-primary-end',
    secondary: 'from-secondary-start to-secondary-end',
    accent: 'from-accent-start to-accent-end',
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium
        transition-all duration-200
        ${active ? `bg-gradient-to-r ${gradients[gradient]} text-white` : 'glass-card text-white/70'}
        hover:scale-105
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{label}</span>
      </div>
    </motion.button>
  );
}
