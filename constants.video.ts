// Dados de exemplo do catálogo de vídeos.
// Substitua pelos vídeos reais (título, categoria, tags e link do Instagram).
// Depois de validar o layout, você pode mover esses dados para dentro de constants.tsx.

import { Video, VideoCategory } from './types.video';

export const VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Tour pelo Centro Histórico',
    description: 'Um passeio rápido pelos pontos mais icônicos da cidade.',
    instagramUrl: 'https://www.instagram.com/reel/EXEMPLO1/',
    thumbnailUrl: 'https://via.placeholder.com/405x720/1a1a1a/ffffff?text=Video+1',
    category: 'Passeios',
    tags: ['centro', 'historia', 'turismo'],
    featured: true,
  },
  {
    id: 'v2',
    title: 'Melhores Restaurantes',
    description: 'Dica rápida dos lugares imperdíveis para comer.',
    instagramUrl: 'https://www.instagram.com/reel/EXEMPLO2/',
    thumbnailUrl: 'https://via.placeholder.com/405x720/1a1a1a/ffffff?text=Video+2',
    category: 'Gastronomia',
    tags: ['comida', 'restaurante', 'dica'],
  },
  {
    id: 'v3',
    title: 'Vista Aérea da Cidade',
    description: 'Imagens de drone dos principais mirantes.',
    instagramUrl: 'https://www.instagram.com/reel/EXEMPLO3/',
    thumbnailUrl: 'https://via.placeholder.com/405x720/1a1a1a/ffffff?text=Video+3',
    category: 'Passeios',
    tags: ['drone', 'vista', 'paisagem'],
  },
];

export const VIDEO_CATEGORIES: VideoCategory[] = Array.from(
  new Set(VIDEOS.map((v) => v.category))
).map((categoryName) => ({
  id: categoryName.toLowerCase().replace(/\s+/g, '-'),
  name: categoryName,
  videos: VIDEOS.filter((v) => v.category === categoryName),
}));
