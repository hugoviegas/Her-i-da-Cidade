# Como integrar o Catálogo de Vídeos ao site

Estes arquivos foram adicionados de forma independente, sem alterar `App.tsx`,
`constants.tsx` ou `types.ts` existentes (para não haver risco de sobrescrever
código atual sem visibilidade do conteúdo original).

## Arquivos adicionados
- `types.video.ts` — interfaces `Video` e `VideoCategory`
- `constants.video.ts` — dados de exemplo (troque pelos vídeos reais)
- `services/videoSearch.ts` — busca sem acentuação + aproximada (fuzzy)
- `components/VideoCard.tsx` — card vertical estilo Netflix
- `components/VideoRow.tsx` — linha horizontal por categoria com scroll
- `components/SearchBar.tsx` — campo de busca
- `components/VideoPlayer.tsx` — player fullscreen vertical (substitui o popup atual)
- `components/VideoCatalog.tsx` — página completa que junta tudo

## Passo 1 — Popular os vídeos reais
Edite `constants.video.ts` e substitua o array `VIDEOS` pelos vídeos reais:
título, categoria, tags e o link do Instagram (`instagramUrl`).

Para o player funcionar em iframe, o Instagram geralmente aceita a URL do
post/reel + `/embed` (ex: `https://www.instagram.com/reel/ABC123/embed`).
Se o embed do Instagram não permitir remover a marca/UI dele, uma alternativa
é hospedar os vídeos verticais (MP4) você mesmo e usar `embedUrl` apontando
para um player HTML5 nativo — me avise se quiser essa segunda versão.

## Passo 2 — Adicionar a rota/seção no App.tsx
Se o site usa React Router:

```tsx
import { VideoCatalog } from './components/VideoCatalog';
// dentro de <Routes>:
<Route path="/videos" element={<VideoCatalog />} />
```

Se o site é uma página única (sem router), adicione um estado simples:

```tsx
const [showCatalog, setShowCatalog] = useState(false);
// ...
{showCatalog ? <VideoCatalog /> : <><Hero /><Services />...</>}
```

E adicione um link/botão no `Navbar.tsx` apontando para `/videos` ou
acionando `setShowCatalog(true)`.

## Passo 3 — Tailwind
Os componentes usam classes utilitárias no estilo Tailwind CSS. Se o projeto
já usa Tailwind (via CDN no `index.html` ou como dependência), nada a fazer.
Caso não use, me avise para eu adaptar os componentes para CSS puro.

## Próximo ajuste possível
Depois de revisar o layout, se quiser, eu removo os arquivos `.video.ts`
temporários e mesclo tudo direto em `constants.tsx` / `types.ts` — nesse
caso preciso que você cole o conteúdo atual desses dois arquivos aqui.
