interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  raw?: boolean;
  json?: boolean;
}

interface CookieDefaults {
  raw?: boolean;
  json?: boolean;
}

interface JQueryStatic {
  isFunction(obj: unknown): obj is Function;
  extend<T extends object>(...objects: Partial<T>[]): T;
  cookie(name: string): string | undefined;
  cookie(name: string, value: string | object, options?: CookieOptions): string;
  cookie(): Record<string, string>;
  removeCookie(name: string, options?: CookieOptions): boolean;
}

const PLUS_SIGN_REGEX = /\+/g;

function encodeCookieValue(value: string, config: CookieDefaults): string {
  return config.raw ? value : encodeURIComponent(value);
}

function decodeCookieValue(value: string, config: CookieDefaults): string {
  return config.raw ? value : decodeURIComponent(value);
}

function serializeCookieValue(value: unknown, config: CookieDefaults): string {
  const stringValue = config.json ? JSON.stringify(value) : String(value);
  return encodeCookieValue(stringValue, config);
}

function parseCookieValue(rawValue: string): string {
  let value = rawValue;
  
  if (value.indexOf('"') === 0) {
    value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  
  try {
    const decodedValue = decodeURIComponent(value.replace(PLUS_SIGN_REGEX, " "));
    return cookieConfig.json ? JSON.parse(decodedValue) : decodedValue;
  } catch (error) {
    return value;
  }
}

function convertCookieValue(
  rawValue: string,
  converter?: (value: string) => unknown
): unknown {
  const parsedValue = cookieConfig.raw ? rawValue : parseCookieValue(rawValue);
  return typeof converter === 'function' ? converter(parsedValue) : parsedValue;
}

const cookieConfig: CookieDefaults = {};

function cookie(name: string): string | undefined;
function cookie(name: string, value: string | object, options?: CookieOptions): string;
function cookie(): Record<string, string>;
function cookie(
  name?: string,
  value?: string | object | ((value: string) => unknown),
  options?: CookieOptions
): string | Record<string, string> | undefined {
  const $ = (globalThis as any).jQuery as JQueryStatic;

  if (value !== undefined && !$.isFunction(value)) {
    const settings: CookieOptions = $.extend({}, cookieConfig, options);

    if (typeof settings.expires === 'number') {
      const daysToExpire = settings.expires;
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + daysToExpire * 86400000);
      settings.expires = expirationDate;
    }

    const cookieParts: string[] = [
      encodeCookieValue(name!, cookieConfig),
      "=",
      serializeCookieValue(value, cookieConfig)
    ];

    if (settings.expires) {
      cookieParts.push(`;expires=${settings.expires.toUTCString()}`);
    }
    if (settings.path) {
      cookieParts.push(`;path=${settings.path}`);
    }
    if (settings.domain) {
      cookieParts.push(`;domain=${settings.domain}`);
    }
    if (settings.secure) {
      cookieParts.push(`;secure`);
    }

    return document.cookie = cookieParts.join("");
  }

  const result: Record<string, string> | undefined = name ? undefined : {};
  const cookies = document.cookie ? document.cookie.split("; ") : [];

  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split("=");
    const cookieName = decodeCookieValue(parts.shift()!, cookieConfig);
    const cookieValue = parts.join("=");

    if (name && name === cookieName) {
      return convertCookieValue(cookieValue, value as (value: string) => unknown) as string;
    }

    if (!name) {
      const parsedValue = convertCookieValue(cookieValue, undefined);
      if (parsedValue !== undefined) {
        result![cookieName] = parsedValue as string;
      }
    }
  }

  return result;
}

function removeCookie(name: string, options?: CookieOptions): boolean {
  const $ = (globalThis as any).jQuery as JQueryStatic;
  
  if (cookie(name) !== undefined) {
    cookie(name, "", $.extend({}, options, { expires: -1 }));
    return cookie(name) === undefined;
  }
  
  return false;
}

export { cookie, removeCookie, cookieConfig as defaults };