import React, { useEffect, useRef, useState } from 'react';
import { Video } from '../types.video';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose, onNext, onPrevious }) => {
  const [showInfo, setShowInfo] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrevious) onPrevious();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onNext, onPrevious]);

  const embedSrc = video.embedUrl || `${video.instagramUrl.replace(/\/$/, '')}/embed`;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-fadeIn"
      onClick={(e) => {
        if (e.target === containerRef.current) onClose();
      }}
      ref={containerRef}
    >
      <button
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md transition-all duration-200 text-white"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      {onPrevious && (
        <button
          onClick={onPrevious}
          aria-label="Vídeo anterior"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md transition-all duration-200 text-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {onNext && (
        <button
          onClick={onNext}
          aria-label="Próximo vídeo"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md transition-all duration-200 text-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div className="relative h-full w-full max-w-[500px] mx-auto flex items-center justify-center">
        <div className="relative w-full h-full sm:h-[92vh] sm:rounded-2xl overflow-hidden bg-[#111] shadow-2xl">
          <iframe
            src={embedSrc}
            title={video.title}
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            loading="eager"
          />

          {showInfo && (
            <div className="absolute bottom-0 left-0 right-0 p-5 pt-16 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none">
              <h2 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{video.title}</h2>
              <p className="text-sm text-gray-200 mb-3 line-clamp-2 drop-shadow">{video.description}</p>
              <div className="flex gap-2 flex-wrap pointer-events-auto">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[11px] font-medium text-white uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowInfo((s) => !s)}
            className="absolute bottom-3 right-3 z-10 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white text-xs transition-colors"
          >
            {showInfo ? 'Ocultar info' : 'Mostrar info'}
          </button>
        </div>
      </div>
    </div>
  );
};
