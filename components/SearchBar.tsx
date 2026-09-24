import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Buscar...'}
        className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Limpar busca"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};
