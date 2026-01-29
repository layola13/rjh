interface CookieOptions {
  maxage?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
}

interface CookieMap {
  [key: string]: string;
}

interface QueryParams {
  lang?: string;
  locale?: string;
}

interface AppParams {
  tenant: string;
}

interface AppContext {
  appParams: AppParams;
}

declare const HSApp: {
  Config: {
    LOCAL_SUPPORT_LANGUAGE: string[];
  };
};

export const getCookies = (): CookieMap => {
  let cookieString: string;
  
  try {
    cookieString = document.cookie;
  } catch (error) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error((error as Error).stack || error);
    }
    return {};
  }

  return parseCookieString(cookieString);
};

const parseCookieString = (cookieString: string): CookieMap => {
  const cookies: CookieMap = {};
  const cookiePairs = cookieString.split(/ *; */);
  
  if (cookiePairs[0] === "") {
    return cookies;
  }

  for (let i = 0; i < cookiePairs.length; i++) {
    const pair = cookiePairs[i].split("=");
    cookies[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }

  return cookies;
};

export const setCookie = (name: string, value: string | null, options: CookieOptions = {}): void => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value ?? "")}`;

  if (value === null) {
    options.maxage = -1;
  }

  if (options.maxage) {
    options.expires = new Date(Date.now() + options.maxage);
  }

  if (options.path) {
    cookieString += `;path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `;domain=${options.domain}`;
  }

  if (options.expires) {
    cookieString += `;expires=${options.expires.toUTCString()}`;
  }

  if (options.secure) {
    cookieString += `;secure`;
  }

  document.cookie = cookieString;
};

const ONE_YEAR_IN_MILLISECONDS = 31536000;
const HOMESTYLER_DOMAIN = ".homestyler.com";

export const cacheSourcePage = (sourcePage: string | null | undefined): void => {
  if (!sourcePage) {
    return;
  }

  setCookie("source_page", sourcePage, {
    maxage: ONE_YEAR_IN_MILLISECONDS,
    domain: HOMESTYLER_DOMAIN
  });

  setCookie("sourcepage", sourcePage, {
    maxage: ONE_YEAR_IN_MILLISECONDS,
    domain: HOMESTYLER_DOMAIN
  });
};

export const getLocale = (
  appContext: AppContext,
  queryParams: QueryParams,
  defaultLocale: string
): string => {
  let locale = defaultLocale;
  const cookies = getCookies();

  if (queryParams.lang || queryParams.locale) {
    locale = queryParams.lang || queryParams.locale || defaultLocale;
  } else if (appContext.appParams.tenant === "fp" && cookies.siteLocale) {
    locale = cookies.siteLocale;
  }

  if (HSApp.Config.LOCAL_SUPPORT_LANGUAGE.includes(locale)) {
    return locale;
  }

  const domain = appContext.appParams.tenant === "fp" 
    ? HOMESTYLER_DOMAIN 
    : ".shejishi.com";

  setCookie("siteLocale", defaultLocale, {
    maxage: ONE_YEAR_IN_MILLISECONDS,
    domain
  });

  return defaultLocale;
};