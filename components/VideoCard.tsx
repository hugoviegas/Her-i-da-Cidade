import React from 'react';
import { Video } from '../types.video';

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(video)}
      className="group relative flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] aspect-[9/16] rounded-xl overflow-hidden bg-[#181818] transition-transform duration-300 ease-out hover:scale-105 hover:z-10 focus:outline-none focus:ring-2 focus:ring-white/60"
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
        <p className="text-white text-sm font-semibold leading-tight drop-shadow line-clamp-2">
          {video.title}
        </p>
        <p className="text-gray-300 text-[11px] mt-1 truncate">{video.tags.slice(0, 2).join(' • ')}</p>
      </div>
    </button>
  );
};
