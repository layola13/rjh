interface MtopResponse<T = any> {
  data?: {
    data?: T;
    result?: T;
  };
  result?: T;
  ret: string[];
}

interface ShopProductListParams {
  modelIdList: string[];
}

interface ExtraDataParams {
  data: Record<string, any>;
}

interface ShopProductTaskParams {
  data: Record<string, any>;
}

interface NWTK {
  mtop: {
    Search: {
      getShopProductListV2(params: { data: ShopProductListParams }): Promise<MtopResponse>;
      submitShopExtraData(params: { data: { data: string } }): Promise<MtopResponse>;
      submitShopProductTask(params: { data: { data: string } }): Promise<MtopResponse>;
    };
    Bom: {
      unitConfig(): Promise<MtopResponse>;
    };
  };
}

declare const NWTK: NWTK;

async function handleMtopResult<T = any>(promise: Promise<MtopResponse<T>>): Promise<T> {
  const response = await promise;

  if (response?.data && response.ret?.[0]?.includes("SUCCESS")) {
    return response.data.data ?? response.data.result ?? response.data ?? response.result;
  }

  throw response;
}

export function getShopProductList(modelIdList: string[]): Promise<any> {
  return handleMtopResult(
    NWTK.mtop.Search.getShopProductListV2({
      data: {
        modelIdList
      }
    })
  );
}

export function getUnitConfig(): Promise<any> {
  return handleMtopResult(NWTK.mtop.Bom.unitConfig());
}

export function submitExtraData(data: Record<string, any>): Promise<any> {
  return handleMtopResult(
    NWTK.mtop.Search.submitShopExtraData({
      data: {
        data: JSON.stringify(data)
      }
    })
  );
}

export function submitShopProductTask(data: Record<string, any>): Promise<any> {
  return handleMtopResult(
    NWTK.mtop.Search.submitShopProductTask({
      data: {
        data: JSON.stringify(data)
      }
    })
  );
}

export { handleMtopResult };