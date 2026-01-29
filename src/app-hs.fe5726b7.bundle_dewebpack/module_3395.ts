import utils from './utils';

interface CookieStorage {
  write(name: string, value: string, expires?: number, path?: string, domain?: string, secure?: boolean): void;
  read(name: string): string | null;
  remove(name: string): void;
}

const browserCookies: CookieStorage = {
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
    const pattern = new RegExp(`(^|;\\s*)(${name})=([^;]*)`);
    const match = document.cookie.match(pattern);
    return match ? decodeURIComponent(match[3]) : null;
  },

  remove(name: string): void {
    const oneDayAgo = Date.now() - 86400000;
    this.write(name, '', oneDayAgo);
  }
};

const noopCookies: CookieStorage = {
  write(): void {},
  read(): null {
    return null;
  },
  remove(): void {}
};

const cookies: CookieStorage = utils.isStandardBrowserEnv() ? browserCookies : noopCookies;

export default cookies;