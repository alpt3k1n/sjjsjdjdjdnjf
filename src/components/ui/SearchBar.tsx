import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Tıbbi bir terim arayın...',
  suggestions = [],
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowSuggestions(isFocused && suggestions.length > 0 && query.length > 0);
  }, [isFocused, suggestions, query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.form
        onSubmit={handleSubmit}
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="glass-card relative overflow-visible">
          <div className="flex items-center gap-3 p-4">
            <Search className="w-6 h-6 text-white/60 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-lg"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            )}
          </div>

          {isFocused && (
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '100%' }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-start to-primary-end"
            />
          )}
        </div>
      </motion.form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-50"
        >
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 transition-colors flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-white/40" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
