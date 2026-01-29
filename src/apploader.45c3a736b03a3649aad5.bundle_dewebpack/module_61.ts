export default function escapeUrl(url: string | { __esModule?: boolean; default?: string } | null | undefined, options?: { hash?: string; needQuotes?: boolean }): string {
  const opts = options || {};
  
  if (!url) {
    return url as string;
  }
  
  let processedUrl = String(typeof url === 'object' && '__esModule' in url ? url.default : url);
  
  if (/^['"].*['"]$/.test(processedUrl)) {
    processedUrl = processedUrl.slice(1, -1);
  }
  
  if (opts.hash) {
    processedUrl += opts.hash;
  }
  
  const needsQuotes = /["'() \t\n]|(%20)/.test(processedUrl) || opts.needQuotes;
  
  if (needsQuotes) {
    return `"${processedUrl.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  
  return processedUrl;
}