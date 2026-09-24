// Tipos para o Catálogo de Vídeos
// Adicione este arquivo ao projeto. Se preferir, migre estas interfaces para o types.ts principal.

export interface Video {
  id: string;
  title: string;
  description: string;
  instagramUrl: string;   // link do post/reel no Instagram
  embedUrl?: string;      // URL de embed, se disponível (ex: https://www.instagram.com/reel/XXXX/embed)
  thumbnailUrl: string;   // imagem de capa (vertical, 9:16 recomendado)
  category: string;
  tags: string[];
  duration?: string;
  featured?: boolean;     // usado para destaque no topo da página
}

export interface VideoCategory {
  id: string;
  name: string;
  videos: Video[];
}
