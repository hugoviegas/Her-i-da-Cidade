import React, { useMemo, useState } from 'react';
import { VIDEO_CATEGORIES } from '../constants.video';
import { Video, VideoCategory } from '../types.video';
import { searchVideos } from '../services/videoSearch';
import { VideoRow } from './VideoRow';
import { VideoPlayer } from './VideoPlayer';
import { SearchBar } from './SearchBar';

export const VideoCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const allVideos = useMemo(() => VIDEO_CATEGORIES.flatMap((c) => c.videos), []);

  const featuredVideo = useMemo(() => allVideos.find((v) => v.featured) || allVideos[0], [allVideos]);

  const filteredCategories: VideoCategory[] = useMemo(() => {
    if (!searchQuery.trim()) return VIDEO_CATEGORIES;

    const results = searchVideos(allVideos, searchQuery);
    const grouped: Record<string, VideoCategory> = {};
    results.forEach((video) => {
      if (!grouped[video.category]) {
        grouped[video.category] = { id: video.category, name: video.category, videos: [] };
      }
      grouped[video.category].videos.push(video);
    });
    return Object.values(grouped);
  }, [searchQuery, allVideos]);

  const openVideo = (video: Video) => {
    const idx = allVideos.findIndex((v) => v.id === video.id);
    setSelectedIndex(idx);
    setSelectedVideo(video);
  };

  const goToOffset = (offset: number) => {
    const newIndex = selectedIndex + offset;
    if (newIndex >= 0 && newIndex < allVideos.length) {
      setSelectedIndex(newIndex);
      setSelectedVideo(allVideos[newIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-40 bg-gradient-to-b from-black/95 via-black/80 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Catálogo de Vídeos</h1>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar por título, categoria ou tag..."
          />
        </div>
      </header>

      {featuredVideo && !searchQuery && (
        <section className="relative h-[60vh] md:h-[70vh] flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredVideo.thumbnailUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/10" />
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 pb-10 md:pb-14">
            <span className="inline-block px-3 py-1 bg-red-600 text-xs font-bold rounded mb-3 tracking-wide">
              EM DESTAQUE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 max-w-xl leading-tight">
              {featuredVideo.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base mb-5 max-w-lg">{featuredVideo.description}</p>
            <button
              onClick={() => openVideo(featuredVideo)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="black">
                <path d="M8 5v14l11-7z" />
              </svg>
              Assistir Agora
            </button>
          </div>
        </section>
      )}

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10">
        {filteredCategories.length === 0 && (
          <p className="text-gray-400 text-center py-16">Nenhum vídeo encontrado para "{searchQuery}".</p>
        )}
        {filteredCategories.map((category) => (
          <VideoRow key={category.id} category={category} onVideoSelect={openVideo} />
        ))}
      </main>

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onNext={selectedIndex < allVideos.length - 1 ? () => goToOffset(1) : undefined}
          onPrevious={selectedIndex > 0 ? () => goToOffset(-1) : undefined}
        />
      )}
    </div>
  );
};

export default VideoCatalog;
