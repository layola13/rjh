/**
 * Module: module_483619
 * Original ID: 483619
 * 
 * File name mapping module that collects and manages file paths from different source directories.
 */

/**
 * Context module interface representing webpack's require.context return type
 */
interface RequireContext {
  /** Returns an array of all possible requests that the context module can handle */
  keys(): string[];
  /** Resolves a request to a module id */
  (id: string): string;
  /** The module id of the context module */
  id: string;
}

/**
 * Cache map storing normalized file paths
 * Key: prefixed path (e.g., "plugin/filename.js")
 * Value: resolved file path without leading "./"
 */
const filesNameCache: Map<string, string> = new Map();

/**
 * Processes and caches file paths from a require context
 * 
 * @param context - The webpack require.context function
 * @param filePath - The relative file path from the context
 * @param prefix - The prefix to prepend to the cached key (e.g., "plugin/", "ui/", "res/svgs/")
 */
function processAndCacheFilePath(
  context: RequireContext,
  filePath: string,
  prefix: string
): void {
  const resolvedPath = context(filePath);
  
  // Normalize paths by removing leading "./"
  const normalizedFilePath = filePath.startsWith("./") 
    ? filePath.substring(2) 
    : filePath;
  
  const normalizedResolvedPath = resolvedPath.startsWith("./")
    ? resolvedPath.substring(2)
    : resolvedPath;
  
  // Store with prefixed key
  const cacheKey = `${prefix}${normalizedFilePath}`;
  filesNameCache.set(cacheKey, normalizedResolvedPath);
}

// Import require.context modules for different directories
const pluginContext: RequireContext = require.context(/* webpackMode: "eager" */ './plugin', true, /.*/);
const uiContext: RequireContext = require.context(/* webpackMode: "eager" */ './ui', true, /.*/);
const svgContext: RequireContext = require.context(/* webpackMode: "eager" */ './res/svgs', true, /.*/);

// Process all files from plugin directory
pluginContext.keys().forEach((filePath: string) => {
  processAndCacheFilePath(pluginContext, filePath, "plugin/");
});

// Process all files from ui directory
uiContext.keys().forEach((filePath: string) => {
  processAndCacheFilePath(uiContext, filePath, "ui/");
});

// Process all files from res/svgs directory
svgContext.keys().forEach((filePath: string) => {
  processAndCacheFilePath(svgContext, filePath, "res/svgs/");
});

/**
 * Returns the map containing all processed file names and their resolved paths
 * 
 * @returns A Map where keys are prefixed normalized paths and values are resolved paths
 */
export function getFilesName(): Map<string, string> {
  return filesNameCache;
}

export default {
  getFilesName
};