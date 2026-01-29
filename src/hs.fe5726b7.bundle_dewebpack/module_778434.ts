import { defineProperty } from './797560';
import { server } from './138357';
import { addParams } from './701174';

interface EmailParams {
  subject: string;
  body: string;
  from: string;
  to: string;
}

interface ShortenUrlResponse {
  er: number;
  short_url: string;
}

interface WeChatSignatureResponse {
  signature: string;
  timestamp: number;
  noncestr: string;
}

interface WeChatSignature {
  signature: string;
  timestamp: number;
  nonceStr: string;
}

interface LogEvent {
  events: unknown[];
  [key: string]: unknown;
}

interface LogData extends LogEvent {
  component: string;
}

interface TrackLogPayload {
  items: unknown[];
  type: string;
}

interface PVResponse {
  er: number;
  count?: number;
}

interface AddressItem {
  [key: string]: unknown;
}

interface AddressTemplateData {
  items: AddressItem[];
}

interface MtopResponse<T> {
  ret: string[];
  data: T;
}

interface HttpClient {
  post<T = unknown>(url: string, data: unknown, config?: { headers?: Record<string, unknown> }): Promise<T>;
  get<T = unknown>(url: string): Promise<T>;
}

declare const HSApp: {
  Config: {
    LOG_SERVICE_API_SERVER: string;
  };
};

declare const NWTK: {
  mtop: {
    Search: {
      getPublicTemplatesAddresses(): Promise<MtopResponse<AddressTemplateData>>;
    };
  };
};

function getOwnPropertySymbolsFiltered(obj: object, enumerable: boolean): symbol[] {
  const symbols = Object.getOwnPropertySymbols(obj);
  if (!enumerable) {
    return symbols;
  }
  return symbols.filter((symbol) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, symbol);
    return descriptor?.enumerable ?? false;
  });
}

function getObjectKeys(obj: object, includeSymbols: boolean): Array<string | symbol> {
  const keys: Array<string | symbol> = Object.keys(obj);
  if (Object.getOwnPropertySymbols) {
    const symbols = getOwnPropertySymbolsFiltered(obj, includeSymbols);
    keys.push(...symbols);
  }
  return keys;
}

function mergeObjects<T extends Record<string | symbol, unknown>>(target: T, ...sources: Array<Partial<T> | null | undefined>): T {
  for (let index = 0; index < sources.length; index++) {
    const source = sources[index] ?? {};
    
    if (index % 2) {
      getObjectKeys(source, true).forEach((key) => {
        defineProperty(target, key as string, source[key]);
      });
    } else {
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        getObjectKeys(source, false).forEach((key) => {
          const descriptor = Object.getOwnPropertyDescriptor(source, key);
          if (descriptor) {
            Object.defineProperty(target, key, descriptor);
          }
        });
      }
    }
  }
  return target;
}

export default function createApiService(httpClient: HttpClient) {
  return {
    sendMail(subject: string, body: string, from: string, to: string): Promise<unknown> {
      const url = `${server}/api/rest/v1.0/email`;
      const params: EmailParams = {
        subject,
        body,
        from,
        to
      };
      return httpClient.post(url, params);
    },

    shortenUrl(url: string): Promise<string> {
      const endpoint = `${server}/api/rest/v1.0/tenant/ezhome/wechat/shorturl`;
      const params = { url };
      
      return httpClient.post<ShortenUrlResponse>(endpoint, params).then((response) => {
        if (response && response.er === -1) {
          return response.short_url;
        }
        return Promise.reject(response);
      });
    },

    getWeChatSignature(url: string): Promise<WeChatSignature> {
      const endpoint = `${server}/api/rest/v1.0/tenant/ezhome/wechat/signature`;
      const params = { url };
      
      return httpClient.post<WeChatSignatureResponse>(endpoint, params).then((response) => ({
        signature: response.signature,
        timestamp: response.timestamp,
        nonceStr: response.noncestr
      }));
    },

    sendLog(logEvent: LogEvent): Promise<unknown> {
      if (!logEvent || !logEvent.events) {
        return Promise.reject("Error Parameter");
      }
      
      const logData: LogData = {
        ...logEvent,
        component: "fpweb"
      };
      const endpoint = `${HSApp.Config.LOG_SERVICE_API_SERVER}/api/rest/v2.0/log`;
      
      return httpClient.post(endpoint, { data: logData }, {
        headers: {
          "Access-Control-Allow-Credentials": true
        }
      }).then((response) => response)
        .catch(() => ({}));
    },

    sendTrackLog(items: unknown[], type: string): Promise<unknown> {
      const endpoint = `${HSApp.Config.LOG_SERVICE_API_SERVER}/api/rest/v1.0/user/track`;
      const payload: TrackLogPayload = {
        items,
        type
      };
      
      return httpClient.post(endpoint, { data: payload }, {
        headers: {
          "Access-Control-Allow-Credentials": true
        }
      }).then((response) => response);
    },

    sendUserTrackLog(items: unknown[]): Promise<unknown> {
      return this.sendTrackLog(items, "userTrack");
    },

    sendErrorLog(items: unknown[]): Promise<unknown> {
      return this.sendTrackLog(items, "error");
    },

    sendMtopApiLog(items: unknown[]): Promise<unknown> {
      return this.sendTrackLog(items, "api");
    },

    sendPerformanceLog(items: unknown[]): Promise<unknown> {
      return this.sendTrackLog(items, "performance");
    },

    getPV(pageId: string): Promise<number> {
      let url = `${server}/api/rest/v1.0/analytics/pv`;
      const params = {
        page_id: encodeURIComponent(pageId)
      };
      url = addParams(url, params);
      
      return httpClient.get<PVResponse>(url).then((response) => {
        if (response && response.er === -1) {
          return response.count ?? 1;
        }
        return Promise.reject(response);
      });
    },

    getChinaAddressInfoV2(): Promise<AddressItem[]> {
      return NWTK.mtop.Search.getPublicTemplatesAddresses()
        .then((response) => {
          const { data } = response;
          if (response && response.ret[0].includes("SUCCESS") && data?.items) {
            return data.items;
          }
          return Promise.reject(data);
        })
        .catch((error) => Promise.reject(error));
    },

    earnPointsByNoviceTask(params: unknown): void {
      // Implementation pending
    }
  };
}