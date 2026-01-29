type WebpackRequireContext = {
  (id: string): string;
  keys(): string[];
};

const pluginContext: WebpackRequireContext = require.context('plugin/', true, /\.(js|ts|tsx)$/);
const uiContext: WebpackRequireContext = require.context('ui/', true, /\.(js|ts|tsx)$/);
const svgContext: WebpackRequireContext = require.context('res/svgs/', true, /\.svg$/);

const filesCache = new Map<string, string>();

function registerFile(
  context: WebpackRequireContext,
  filePath: string,
  prefix: string
): void {
  const normalizedPath = filePath.startsWith('./') ? filePath.substring(2) : filePath;
  
  if (!filesCache.has(normalizedPath)) {
    const resolvedPath = context(filePath);
    const normalizedResolved = resolvedPath.startsWith('./') 
      ? resolvedPath.substring(2) 
      : resolvedPath;
    
    const cacheKey = `${prefix}${normalizedPath}`;
    filesCache.set(cacheKey, normalizedResolved);
  }
}

pluginContext.keys().forEach((filePath: string) => {
  registerFile(pluginContext, filePath, 'plugin/');
});

uiContext.keys().forEach((filePath: string) => {
  registerFile(uiContext, filePath, 'ui/');
});

svgContext.keys().forEach((filePath: string) => {
  registerFile(svgContext, filePath, 'res/svgs/');
});

export function getFilesName(): Map<string, string> {
  return filesCache;
}