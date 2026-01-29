interface CookieUtils {
  write(name: string, value: string, expires?: number, path?: string, domain?: string, secure?: boolean): void;
  read(name: string): string | null;
  remove(name: string): void;
}

interface Utils {
  isStandardBrowserEnv(): boolean;
  isNumber(value: unknown): value is number;
  isString(value: unknown): value is string;
}

declare const utils: Utils;

const MILLISECONDS_PER_DAY = 86400000;

const cookieUtils: CookieUtils = utils.isStandardBrowserEnv() ? {
  write(name: string, value: string, expires?: number, path?: string, domain?: string, secure?: boolean): void {
    const cookieParts: string[] = [];
    cookieParts.push(`${name}=${encodeURIComponent(value)}`);
    
    if (utils.isNumber(expires)) {
      cookieParts.push(`expires=${new Date(expires).toGMTString()}`);
    }
    
    if (utils.isString(path)) {
      cookieParts.push(`path=${path}`);
    }
    
    if (utils.isString(domain)) {
      cookieParts.push(`domain=${domain}`);
    }
    
    if (secure === true) {
      cookieParts.push('secure');
    }
    
    document.cookie = cookieParts.join('; ');
  },

  read(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
    return match ? decodeURIComponent(match[3]) : null;
  },

  remove(name: string): void {
    this.write(name, '', Date.now() - MILLISECONDS_PER_DAY);
  }
} : {
  write(): void {},
  read(): null {
    return null;
  },
  remove(): void {}
};

export default cookieUtils;