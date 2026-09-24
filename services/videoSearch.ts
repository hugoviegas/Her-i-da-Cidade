// Busca inteligente: ignora acentuação, maiúsculas/minúsculas e aceita termos aproximados.

import { Video } from '../types.video';

// Remove acentos e normaliza para minúsculas
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// Distância de Levenshtein simples, usada para aproximação de termos
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

// Similaridade entre 0 (nada parecido) e 1 (idêntico)
function similarity(a: string, b: string): number {
  if (!a.length || !b.length) return 0;
  const distance = levenshtein(a, b);
  return 1 - distance / Math.max(a.length, b.length);
}

// Verifica se algum termo da query aparece (exato ou aproximado) em um texto
function matchesText(query: string, text: string, threshold = 0.75): boolean {
  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);

  if (normalizedText.includes(normalizedQuery)) return true;

  const words = normalizedText.split(/\s+/);
  return words.some((word) => similarity(word, normalizedQuery) >= threshold);
}

export function searchVideos(videos: Video[], query: string): Video[] {
  const trimmed = query.trim();
  if (!trimmed) return videos;

  return videos.filter((video) => {
    if (matchesText(trimmed, video.title)) return true;
    if (matchesText(trimmed, video.description)) return true;
    if (matchesText(trimmed, video.category)) return true;
    if (video.tags.some((tag) => matchesText(trimmed, tag))) return true;
    return false;
  });
}
