import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  glow?: 'primary' | 'secondary' | 'accent' | 'none';
}

export default function GlassCard({
  children,
  className = '',
  hover = false,
  onClick,
  glow = 'none',
}: GlassCardProps) {
  const glowClass = glow !== 'none' ? `glow-${glow}` : '';

  return (
    <motion.div
      className={`
        ${hover ? 'glass-card-hover cursor-pointer' : 'glass-card'}
        ${glowClass}
        ${className}
      `}
      onClick={onClick}
      whileTap={hover ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
