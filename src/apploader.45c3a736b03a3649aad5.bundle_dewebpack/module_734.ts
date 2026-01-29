interface QueryStrings {
  [key: string]: string;
}

interface EnvConfig {
  configEnv: 'prod' | 'alpha' | 'daily' | 'pre';
  biz: 'homestyler' | 'ea' | 'global';
}

interface APIRequestData {
  [key: string]: unknown;
}

interface APIRequestOptions {
  headers?: Record<string, string>;
  [key: string]: unknown;
}

interface APIConfig {
  url: string;
  baseApi?: boolean;
  isTpzz?: boolean;
  removeEaSuffix?: boolean;
}

interface MtopConfig {
  MTOPPREFIX: string;
  MTOPSUBDOMAIN: string;
  MTOPMAINDOMIAN: string;
  PAGEDOMAIN: string;
  HOST: string;
  PASSPORT_SERVER: string;
  LOG_SERVICE_API_SERVER: string;
  HINT_ON_LOGIN_ERROR: string;
  HINT_ON_NULL_VERSION: string;
}

interface CookieOptions {
  maxage?: number;
  path?: string;
  domain?: string;
  expires?: Date;
  secure?: boolean;
}

interface HSInfo {
  adid?: string;
  hsi?: string;
  hsb: string;
}

interface UserInfo {
  userId: string;
  biz: string;
  env: string;
  caseId?: string;
  assetId?: string;
  packageId?: string;
}

interface LogEntry {
  actionType: string;
  currentTime: number;
  logName: string;
  traceId: string;
  customizedInfo: {
    caseId?: string;
    designId?: string;
    packageId?: string;
    description: string;
    group: string;
    groupName: string;
    apiInfo: string;
    state: string;
    errInfo: string;
  };
  userInfo: {
    userId: string;
    biz: string;
    domain: string;
  };
}

interface FetchOptions {
  contentType?: string | false;
  headers?: Record<string, unknown>;
}

interface MtopInstance {
  config: {
    prefix: string;
    subDomain: string;
    mainDomain: string;
    pageDomain: string;
    secure: boolean;
    sameSite: string;
    syncCookieMode: boolean;
  };
  request: (options: unknown, onSuccess: (data: unknown) => void, onError: (error: unknown) => void) => void;
}

declare const lib: {
  mtop: MtopInstance;
};

const CONFIG: MtopConfig = {} as MtopConfig;
const API_CONFIG_HOMESTYLER: Record<string, APIConfig> = {};
const API_CONFIG_GLOBAL: Record<string, APIConfig> = {};

export function getQueryStringsFromUrl(url: string): QueryStrings {
  const result: QueryStrings = {};
  url.replace("?", "").split("&").forEach((pair) => {
    const parts = pair.split("=");
    if (parts.length === 2) {
      result[parts[0]] = decodeURIComponent(parts[1].replace(/\+/g, "%20"));
    }
  });
  return result;
}

export function getEnvByAppconfig(appConfigUrl?: string, bizParam?: string): EnvConfig {
  let configEnv: EnvConfig['configEnv'] = "prod";
  let biz: EnvConfig['biz'] = "homestyler";

  if (!appConfigUrl) {
    return { biz, configEnv };
  }

  if (appConfigUrl.includes("alpha")) {
    configEnv = "alpha";
  } else if (appConfigUrl.includes("daily")) {
    configEnv = "daily";
  } else if (appConfigUrl.includes("pre")) {
    configEnv = "pre";
  }

  if (isZhiZao() || (bizParam && !["shejishi", "icbu"].includes(bizParam))) {
    biz = "ea";
  } else if (appConfigUrl.includes("global")) {
    biz = "global";
  }

  return { configEnv, biz };
}

export function getAPIPromise(
  apiKey: string,
  bizEnv: string,
  platformEnv?: string,
  data: APIRequestData = {},
  options?: APIRequestOptions
): Promise<unknown> {
  let apiUrl = "";

  if (bizEnv === "global") {
    apiUrl = API_CONFIG_GLOBAL[apiKey].url;
    if (API_CONFIG_GLOBAL[apiKey].baseApi) {
      return fetch(`${CONFIG.PASSPORT_SERVER}${apiUrl}`, {
        credentials: "include"
      }).then((response) => response.json());
    }
  } else {
    apiUrl = API_CONFIG_HOMESTYLER[apiKey].url;
    if (
      bizEnv === "ea" &&
      !API_CONFIG_HOMESTYLER[apiKey].isTpzz &&
      API_CONFIG_HOMESTYLER[apiKey].removeEaSuffix !== true
    ) {
      apiUrl = `${apiUrl}.ea`;
    }
  }

  return createMtopRequest(apiUrl, bizEnv, platformEnv)({ data, options });
}

function createMtopRequest(apiUrl: string, bizEnv: string, platformEnv?: string) {
  const mtop = lib.mtop;
  const config = CONFIG;

  mtop.config.prefix = config.MTOPPREFIX;
  mtop.config.subDomain = config.MTOPSUBDOMAIN;
  mtop.config.mainDomain = config.MTOPMAINDOMIAN;
  mtop.config.pageDomain = config.PAGEDOMAIN;
  mtop.config.secure = true;
  mtop.config.sameSite = "None";
  mtop.config.syncCookieMode = true;

  return function({ data = {}, options }: { data?: APIRequestData; options?: APIRequestOptions } = {}) {
    return new Promise((resolve, reject) => {
      const processedData = { ...data };

      if (data && Object.keys(data).length !== 0) {
        for (const [key, value] of Object.entries(data)) {
          if (isObject(value)) {
            processedData[key] = JSON.stringify(value);
          }
        }
      }

      const requestOptions = {
        api: apiUrl,
        v: "1.0",
        data: processedData,
        ecode: 0,
        type: "post",
        dataType: "json",
        headers: {
          "platform-env": platformEnv || (bizEnv === "fp" ? "global" : "sjj"),
          "env-domain": platformEnv && !["shejishi", "icbu"].includes(platformEnv) ? platformEnv : "sjj"
        },
        ...options
      };

      if (options?.headers) {
        requestOptions.headers = { ...requestOptions.headers, ...options.headers };
      }

      mtop.request(requestOptions, resolve, reject);
    });
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return !!(value && typeof value === "object");
}

function addSingleParam(url: string, key: string, value: string): string {
  let result = url;
  result += url.includes("?") ? "&" : "?";
  return result + `${key}=${value}`;
}

export function addParams(url: string, params: Record<string, string>): string {
  let result = url;
  for (const [key, value] of Object.entries(params)) {
    result = addSingleParam(result, key, value);
  }
  return result;
}

export function getDateString(): string {
  return new Date().toISOString().split("T")[0].replace(/-/g, "");
}

export function getCookies(): Record<string, string> {
  let cookieString: string;
  try {
    cookieString = document.cookie;
  } catch (error) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error((error as Error).stack || error);
    }
    return {};
  }

  return parseCookies(cookieString);
}

function parseCookies(cookieString: string): Record<string, string> {
  const result: Record<string, string> = {};
  const pairs = cookieString.split(/\s*;\s*/);

  if (pairs[0] === "") {
    return result;
  }

  for (const pair of pairs) {
    const parts = pair.split("=");
    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return result;
}

export function setCookie(name: string, value: string | null, options: CookieOptions = {}): void {
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
    cookieString += ";secure";
  }

  document.cookie = cookieString;
}

const COOKIE_MAX_AGE = 94608000000;
const COOKIE_DOMAIN = ".homestyler.com";

export function createHSInfo(): void {
  const queryParams = getQueryStringsFromUrl(location.search);
  const adid = queryParams.adid;

  if (!getCookies().hsi) {
    const hsiValue = `${getDateString()}-${getUUID()}`;
    setCookie("hsi", hsiValue, {
      maxage: COOKIE_MAX_AGE,
      domain: COOKIE_DOMAIN
    });
  }

  if (adid) {
    setCookie("adid", adid, {
      maxage: COOKIE_MAX_AGE,
      domain: COOKIE_DOMAIN
    });
  }
}

export function getHSInfo(): HSInfo {
  const cookies = getCookies();
  const { adid, hsi } = cookies;
  let { hsb } = cookies;
  let hsbParams = "";

  try {
    const hsbObj = JSON.parse(hsb);
    hsb = Object.keys(hsbObj)
      .map((key) => {
        hsbParams = `${hsbParams}&${key}=${hsbObj[key]}`;
        return `${key}_${hsbObj[key]}`;
      })
      .join("-");
  } catch {
    hsb = "";
  }

  return {
    adid,
    hsi,
    hsb: `${hsb}${hsbParams}`
  };
}

export function getUUID(): string {
  function randomHex(): string {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  return `${randomHex()}${randomHex()}-${randomHex()}-${randomHex()}-${randomHex()}-${randomHex()}${randomHex()}${randomHex()}`;
}

export function check32BitBrowser(): Promise<boolean> {
  if (typeof globalThis === "undefined") {
    window.location.href = `${CONFIG.HOST}browsercheck.html`;
    return Promise.reject();
  }

  const userAgent = globalThis.navigator?.userAgent;
  const isWindows = !!userAgent?.match(/(Windows)/i);
  const is64Bit = !!userAgent?.match(/(x64)/i);

  return Promise.resolve(!(!isWindows || is64Bit));
}

export function postAPI(url: string, body?: unknown, options?: FetchOptions): Promise<unknown> {
  return fetchJSON(url, Object.assign(buildFetchOptions(options, body, url.startsWith("http")), {
    method: "POST"
  }));
}

function fetchJSON(url: string, options: RequestInit): Promise<unknown> {
  return fetch(url, options).then((response) => response.json());
}

function buildFetchOptions(options: FetchOptions = {}, body?: unknown, isAbsoluteUrl = false): RequestInit {
  const { contentType = "application/json", headers: customHeaders, ...rest } = options;

  const fetchOptions: RequestInit = {
    headers: {
      Accept: "application/json",
      "Content-Type": contentType || "",
      ...customHeaders
    },
    compress: true,
    ...rest
  } as RequestInit;

  if (!isAbsoluteUrl) {
    fetchOptions.mode = "cors";
    fetchOptions.credentials = "include";
  }

  if (body) {
    fetchOptions.body = serializeBody(body, contentType);
  }

  return fetchOptions;
}

function serializeBody(data: unknown, contentType: string | false): string {
  if (contentType === false || (contentType && !contentType.includes("application/json")) || typeof data === "string") {
    return data as string;
  }
  return JSON.stringify(data);
}

export function sendLog(logEntry: LogEntry): void {
  postAPI(CONFIG.LOG_SERVICE_API_SERVER, {
    data: {
      items: [logEntry],
      type: "api"
    }
  }, {
    headers: {
      "Access-Control-Allow-Credentials": true
    }
  });
}

export function hintOnLoginError(userInfo: UserInfo, state: string, apiInfo: string, errorInfo: string): void {
  const logEntry: LogEntry = {
    actionType: CONFIG.HINT_ON_LOGIN_ERROR,
    currentTime: Date.now(),
    logName: "userTrackLogger",
    traceId: getUUID(),
    customizedInfo: {
      caseId: userInfo.caseId,
      designId: userInfo.assetId,
      packageId: userInfo.packageId,
      description: "登录状态异常",
      group: "tool",
      groupName: "灰度版本处理",
      apiInfo,
      state,
      errInfo: errorInfo
    },
    userInfo: {
      userId: userInfo.userId,
      biz: userInfo.biz,
      domain: userInfo.env
    }
  };

  sendLog(logEntry);
  alert(`登陆状态异常，请重新登录。${errorInfo.split("::")[1] || ""}`);
}

export function hintOnNullVersion(userInfo: UserInfo, state: string, apiInfo: string, errorInfo: string): void {
  const logEntry: LogEntry = {
    actionType: CONFIG.HINT_ON_NULL_VERSION,
    currentTime: Date.now(),
    logName: "userTrackLogger",
    traceId: getUUID(),
    customizedInfo: {
      caseId: userInfo.caseId,
      designId: userInfo.assetId,
      packageId: userInfo.packageId,
      description: "通过后端接口获取版本失败报错",
      group: "tool",
      groupName: "灰度版本处理",
      apiInfo,
      state,
      errInfo: errorInfo
    },
    userInfo: {
      userId: userInfo.userId,
      biz: userInfo.biz,
      domain: userInfo.env
    }
  };

  sendLog(logEntry);
  alert(`未获取到软件版本，请刷新后重试。错误信息：${errorInfo.split("::")[1] || "未知错误"}`);
}

export function isNewFpTool(version: string, bizEnv: string, domain: string): boolean {
  if (!["homestyler", "ea"].includes(bizEnv) || domain.includes("tpzz")) {
    return false;
  }

  return parseInt(version.split(".")[0]) > 0;
}

export function jumpToTargetUrl(url: string): void {
  if (window.self === window.top) {
    window.location.href = url;
  } else {
    window.parent.location.href = url;
  }
}

export function isZhiZao(): boolean {
  const queryParams = getQueryStringsFromUrl(location.search);
  return queryParams?.biz === "tpzz";
}

export function isEarlierThan(version1: string, version2: string): boolean {
  if (!version1) {
    return false;
  }

  return compareVersions(version1, version2) < 0;
}

function compareVersions(version1: string, version2: string): number {
  let result = 0;

  if (typeof version1 === "string" && typeof version2 === "string") {
    const parts1 = version1.split(".");
    const parts2 = version2.split(".");

    if (parts1.length === 3 && parts2.length === 3) {
      for (let i = 0; i < parts1.length; i++) {
        const num1 = parseInt(parts1[i], 10);
        const num2 = parseInt(parts2[i], 10);

        if (isNaN(num1) || isNaN(num2)) {
          break;
        }

        if (num1 !== num2) {
          result = num1 - num2 > 0 ? 1 : -1;
          break;
        }
      }
    }
  }

  return result;
}