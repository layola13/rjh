export async function getWebsocketToken(): Promise<WebsocketTokenData> {
  const response = await NWTK.mtop.MessageCenter.getWebsocketToken();
  
  if (response?.ret?.[0]?.includes("SUCCESS")) {
    return Promise.resolve(response.data);
  }
  
  return Promise.reject(response);
}

interface WebsocketTokenData {
  [key: string]: unknown;
}

interface MtopResponse<T = unknown> {
  ret: string[];
  data: T;
}

declare global {
  const NWTK: {
    mtop: {
      MessageCenter: {
        getWebsocketToken(): Promise<MtopResponse<WebsocketTokenData>>;
      };
    };
  };
}