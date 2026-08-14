export const DEMO_VIDEO_ID = 'M7lc1UVf-VE';

export function parseYouTubeId(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const input = value.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input.startsWith('http') ? input : `https://${input}`);
    const host = url.hostname.replace(/^www\./, '').replace(/^m\./, '');
    let candidate = null;
    if (host === 'youtu.be') candidate = url.pathname.split('/')[1];
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      if (url.pathname === '/watch') candidate = url.searchParams.get('v');
      else candidate = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/)?.[1] ?? null;
    }
    return candidate && /^[a-zA-Z0-9_-]{11}$/.test(candidate) ? candidate : null;
  } catch { return null; }
}

export function buildEmbedUrl(videoId, startSeconds = 0) {
  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) throw new Error('Invalid YouTube video ID');
  const params = new URLSearchParams({ rel: '0', modestbranding: '1' });
  if (Number.isFinite(startSeconds) && startSeconds > 0) params.set('start', String(Math.floor(startSeconds)));
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
}

export function demoMetrics(step = 0) {
  const cycle = Math.abs(Math.trunc(step)) % 7;
  return { viewers: (12842 + cycle * 137).toLocaleString('en-US'), engagement: `${(8.7 + cycle * .1).toFixed(1)}%`, sentiment: `${84 + cycle % 3}%`, watchTime: `18:${String(42 + cycle * 2).padStart(2, '0')}` };
}
