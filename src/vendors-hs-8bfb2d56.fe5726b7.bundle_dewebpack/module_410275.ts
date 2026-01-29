export interface MtopConfig {
  prefix?: string;
  subDomain?: string;
  mainDomain?: string;
  [key: string]: any;
}

export interface ClientInfo {
  platform: string;
  language: string;
}

export interface MtopRequestData {
  clientInfo?: string;
  platformSystem?: string;
  needLogin?: boolean;
  [key: string]: any;
}

export interface MtopRequestOptions {
  processEmoji?: boolean;
  [key: string]: any;
}

export interface MtopParams {
  v: string;
  ecode: number;
  dataType: string;
  timeout: number;
  api: string;
  type: string;
  data: MtopRequestData;
  appKey: string;
  ext_headers: Record<string, any>;
  H5Request?: boolean;
}

export interface MtopResponse {
  data?: any;
  ret?: string[];
  [key: string]: any;
}

export interface MtopCallbackParams {
  params: MtopParams;
  opts: Record<string, any>;
  begin: number;
  res: MtopResponse;
}

export interface MtopAdapter {
  config: Record<string, any>;
  middlewares: any[];
  request(
    params: MtopParams,
    onSuccess: (response: MtopResponse) => void,
    onError: (response: MtopResponse) => void
  ): void;
}

export interface SendMtopArgs {
  url?: string;
  method?: string;
  data?: MtopRequestData;
  opts?: Record<string, any>;
  requestOptions?: MtopRequestOptions;
}

interface ConstructorArgs {
  config: MtopConfig;
}

const DEFAULT_CONFIG: MtopConfig = {
  prefix: "h5api",
  subDomain: "m",
  mainDomain: "taobao.com"
};

const APP_KEY = "24770048";
const DEFAULT_VERSION = "1.0";
const DEFAULT_ECODE = 0;
const DEFAULT_DATA_TYPE = "json";
const DEFAULT_TIMEOUT = 8000;

const searchParams = window.location.search || "";

export const useHomestylerTop = searchParams.includes("useHomestylerTop");

// Import placeholder for actual adapter implementations
declare const homestylerTopAdapter: MtopAdapter;
declare const defaultAdapter: MtopAdapter;
declare const middlewareDefault: any;
declare const cookieUtil: { get(key: string): string };
declare const modelUtil: { getModelState(name: string): any };
declare const localeUtil: { language: string };

const adapter: MtopAdapter = useHomestylerTop ? homestylerTopAdapter : defaultAdapter;

if (!useHomestylerTop) {
  adapter.middlewares.push(middlewareDefault);
}

export default class MtopService {
  static setConfig(config: MtopConfig): void {
    const mergedConfig = {
      ...DEFAULT_CONFIG,
      ...config
    };

    Object.entries(mergedConfig).forEach(([key, value]) => {
      adapter.config[key] = value;
    });
  }

  constructor(args: ConstructorArgs) {
    const { config } = args;
    MtopService.setConfig(config);
  }

  sendMtopBefore(params: MtopParams): void {
    if (params.ext_headers) {
      params.ext_headers.lang = cookieUtil.get("siteLocale");
    }
  }

  sendMtopAfter(args: MtopCallbackParams): any {
    const { res } = args;
    return res?.data;
  }

  sendMtopErrorHandler(args: MtopCallbackParams): MtopResponse {
    const { params, res } = args;

    if (
      params.needLogin &&
      (res?.ret?.[0]?.includes("FAIL_SYS_SESSION_EXPIRED") ||
        res?.data?.code === 100310004)
    ) {
      this.dispatchLoginEvent(params);
      return res;
    }

    return res;
  }

  private dispatchLoginEvent(params: MtopParams): void {
    const event = new CustomEvent("newtWorkMsg", {
      detail: {
        type: "login",
        msg: "FAIL_SYS_SESSION_EXPIRED",
        URL: params.api
      }
    });
    globalThis.dispatchEvent(event);
  }

  processEmoji(input: any): any {
    let data = input;

    if (typeof data === "object") {
      data = JSON.stringify(data);
    }

    if (typeof data === "string") {
      return data.replace(/([\ud83a-\ud83f][\u0000-\uffff])/g, (match) => {
        const char1 = match.charCodeAt(0).toString(16);
        const char2 = match.charCodeAt(1).toString(16);
        return `\\u${char1}\\u${char2}`;
      });
    }

    return data;
  }

  async sendMtop(args: SendMtopArgs): Promise<any> {
    const {
      url = "",
      method = "get",
      data = {},
      opts = {},
      requestOptions
    } = args;

    let requestData = { ...data };

    if (!requestData.clientInfo) {
      const clientInfo: ClientInfo = {
        platform: modelUtil.getModelState("comment").platform,
        language: localeUtil.language
      };
      requestData = {
        ...requestData,
        clientInfo: JSON.stringify(clientInfo)
      };
    }

    if (!requestData.platformSystem) {
      requestData = {
        ...requestData,
        platformSystem: modelUtil.getModelState("comment").platform
      };
    }

    if (requestOptions?.processEmoji) {
      requestData = this.processEmoji(requestData);
    }

    const params: MtopParams = {
      v: DEFAULT_VERSION,
      ecode: DEFAULT_ECODE,
      dataType: DEFAULT_DATA_TYPE,
      timeout: DEFAULT_TIMEOUT,
      api: url,
      type: method,
      data: requestData,
      appKey: APP_KEY,
      ext_headers: {},
      ...opts
    };

    if (useHomestylerTop) {
      params.H5Request = true;
    }

    this.sendMtopBefore(params);

    return new Promise((resolve, reject) => {
      const beginTime = Date.now();

      try {
        const onSuccess = async (response: MtopResponse): Promise<void> => {
          const result = this.sendMtopAfter?.({
            params,
            opts,
            begin: beginTime,
            res: response
          });
          resolve(result);
          console.warn(result);
        };

        const onError = async (response: MtopResponse): Promise<void> => {
          const result = this.sendMtopErrorHandler?.({
            params,
            opts,
            begin: beginTime,
            res: response
          });
          resolve(result);
        };

        adapter.request(params, onSuccess, onError);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export { MtopService };