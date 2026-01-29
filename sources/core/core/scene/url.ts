interface UrlParams {
  [key: string]: string | number | boolean | undefined;
}

interface UrlUtils {
  addParams(url: string, params: UrlParams): string;
  getCNameURL(url: string, options?: unknown): string;
  isDataUrl(url: string): boolean;
}

const Url: UrlUtils = {
  addParams: (url: string, params: UrlParams): string => 
    NWTK.url.addParams(url, params),
  
  getCNameURL: (url: string, options?: unknown): string => 
    NWTK.cdn.getCNameUrl(url, options),
  
  isDataUrl: (url: string): boolean => 
    url && url.startsWith("data:")
};

export { Url };