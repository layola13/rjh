interface CookieAttributes {
  expires?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  [key: string]: any;
}

interface CookieConverter {
  read(value: string, name: string): string;
  write(value: string, name: string): string;
}

interface CookieStore {
  set(name: string, value: string, attributes?: CookieAttributes): string | undefined;
  get(name?: string): string | Record<string, string> | undefined;
  remove(name: string, attributes?: CookieAttributes): void;
  withAttributes(attributes: CookieAttributes): CookieStore;
  withConverter(converter: Partial<CookieConverter>): CookieStore;
  readonly attributes: CookieAttributes;
  readonly converter: CookieConverter;
}

function assign<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    for (const key in source) {
      target[key] = source[key] as T[Extract<keyof T, string>];
    }
  }
  return target;
}

function createCookieStore(
  converter: CookieConverter,
  defaultAttributes: CookieAttributes
): CookieStore {
  function set(name: string, value: string, attributes?: CookieAttributes): string | undefined {
    if (typeof document === 'undefined') {
      return;
    }

    const options = assign({}, defaultAttributes, attributes ?? {});

    if (typeof options.expires === 'number') {
      const millisecondsPerDay = 864e5;
      options.expires = new Date(Date.now() + millisecondsPerDay * options.expires);
    }

    if (options.expires) {
      options.expires = (options.expires as Date).toUTCString();
    }

    const encodedName = encodeURIComponent(name)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    let cookieString = '';
    for (const attributeName in options) {
      if (!options[attributeName]) {
        continue;
      }
      cookieString += '; ' + attributeName;
      if (options[attributeName] !== true) {
        cookieString += '=' + String(options[attributeName]).split(';')[0];
      }
    }

    return document.cookie = encodedName + '=' + converter.write(value, name) + cookieString;
  }

  function get(name?: string): string | Record<string, string> | undefined {
    if (typeof document === 'undefined' || (arguments.length > 0 && !name)) {
      return;
    }

    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const result: Record<string, string> = {};

    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split('=');
      const cookieValue = parts.slice(1).join('=');

      try {
        const cookieName = decodeURIComponent(parts[0]);
        result[cookieName] = converter.read(cookieValue, cookieName);

        if (name === cookieName) {
          break;
        }
      } catch (error) {
        // Ignore malformed cookies
      }
    }

    return name ? result[name] : result;
  }

  function remove(name: string, attributes?: CookieAttributes): void {
    set(name, '', assign({}, attributes ?? {}, { expires: -1 }));
  }

  function withAttributes(attributes: CookieAttributes): CookieStore {
    return createCookieStore(converter, assign({}, defaultAttributes, attributes));
  }

  function withConverter(newConverter: Partial<CookieConverter>): CookieStore {
    return createCookieStore(assign({}, converter, newConverter), defaultAttributes);
  }

  return Object.create(
    {
      set,
      get,
      remove,
      withAttributes,
      withConverter
    },
    {
      attributes: {
        value: Object.freeze(defaultAttributes)
      },
      converter: {
        value: Object.freeze(converter)
      }
    }
  );
}

const defaultConverter: CookieConverter = {
  read(value: string, name: string): string {
    let result = value;
    if (result[0] === '"') {
      result = result.slice(1, -1);
    }
    return result.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write(value: string, name: string): string {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};

const defaultAttributes: CookieAttributes = {
  path: '/'
};

const cookieStore: CookieStore = createCookieStore(defaultConverter, defaultAttributes);

export default cookieStore;