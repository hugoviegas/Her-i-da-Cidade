import React, { useRef } from 'react';
import { VideoCategory, Video } from '../types.video';
import { VideoCard } from './VideoCard';

interface VideoRowProps {
  category: VideoCategory;
  onVideoSelect: (video: Video) => void;
}

export const VideoRow: React.FC<VideoRowProps> = ({ category, onVideoSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (!category.videos.length) return null;

  return (
    <section className="relative group/row">
      <h3 className="text-lg md:text-xl font-bold text-white mb-3 px-1">{category.name}</h3>

      <button
        onClick={() => scrollBy(-600)}
        aria-label="Rolar para a esquerda"
        className="hidden md:flex opacity-0 group-hover/row:opacity-100 transition-opacity absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full items-center justify-center bg-gradient-to-r from-black/80 to-transparent text-white"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-2 px-1 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {category.videos.map((video) => (
          <VideoCard key={video.id} video={video} onSelect={onVideoSelect} />
        ))}
      </div>

      <button
        onClick={() => scrollBy(600)}
        aria-label="Rolar para a direita"
        className="hidden md:flex opacity-0 group-hover/row:opacity-100 transition-opacity absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full items-center justify-center bg-gradient-to-l from-black/80 to-transparent text-white"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
};
