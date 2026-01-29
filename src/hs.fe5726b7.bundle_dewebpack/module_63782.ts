interface ImageResizePattern {
  pattern: RegExp;
  target: string;
}

interface ProcessOptions {
  enableWebP: boolean;
  qualityLevel: string;
}

interface ProcessedUrlParams {
  actions?: string[];
  qLevel?: string;
}

interface ImageResizeParams {
  [key: string]: string | number;
}

const defaultOptions: ProcessOptions = {
  enableWebP: false,
  qualityLevel: "H"
};

const DEFAULT_RESIZE_PATTERNS: ImageResizePattern[] = [
  {
    pattern: /(juran-prod-assets\.s3\.cn-north-1\.amazonaws\.com\.cn|s3\d?.homestyler\.com\/juran-prod-assets)/i,
    target: "juran-prod-assets.oss-cn-beijing.aliyuncs.com"
  },
  {
    pattern: /(juran-prod-contents\.s3\.cn-north-1\.amazonaws\.com\.cn|s3\d?.homestyler\.com\/juran-prod-contents)/i,
    target: "juran-prod-contents.oss-cn-beijing.aliyuncs.com"
  }
];

/**
 * Adds query parameters to a URL
 */
function addParams(url: string, params: ImageResizeParams): string {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.append(key, String(value));
  });
  return urlObj.toString();
}

/**
 * Adds a single parameter to a URL
 */
function addParam(url: string, key: string, value: string): string {
  const urlObj = new URL(url);
  urlObj.searchParams.append(key, value);
  return urlObj.toString();
}

/**
 * Gets a resized image URL with parameter transformations
 */
export function getImageResized(imageUrl: string, params: ImageResizeParams): string {
  const patterns: ImageResizePattern[] = (globalThis as any).imageResizePatternMaps || DEFAULT_RESIZE_PATTERNS;
  
  let processedUrl = imageUrl;
  
  for (let i = 0; i < patterns.length; i++) {
    if (patterns[i].pattern.test(processedUrl)) {
      processedUrl = processedUrl.replace(patterns[i].pattern, patterns[i].target);
      break;
    }
  }
  
  return addParams(processedUrl, params);
}

/**
 * Sets global image processing options
 */
export function setOptions(options: Partial<ProcessOptions>): void {
  if (typeof options.enableWebP === "boolean") {
    defaultOptions.enableWebP = options.enableWebP;
  }
  
  if (typeof options.qualityLevel === "string") {
    defaultOptions.qualityLevel = options.qualityLevel;
  }
}

/**
 * Gets a processed URL with OSS image processing parameters
 */
export function getProcessedUrl(imageUrl: string, params?: ProcessedUrlParams): string {
  const config = params ?? {};
  let actions = config.actions ? config.actions.slice() : [];
  let qualityLevel = config.qLevel && config.qLevel === "auto" 
    ? defaultOptions.qualityLevel 
    : config.qLevel;
  
  if (defaultOptions.enableWebP && !actions.some(action => action.startsWith("format,"))) {
    actions.push("format,webp");
  }
  
  if (qualityLevel === "M" && !actions.some(action => action.startsWith("resize,"))) {
    actions.push("resize,p_50");
  }
  
  if (actions.length > 0) {
    return addParam(imageUrl, "x-oss-process", "image/" + actions.join("/"));
  }
  
  return imageUrl;
}