/**
 * 商品搜索和数据提交相关的 API 模块
 * 提供店铺商品列表查询、单位配置获取、额外数据提交等功能
 */

/**
 * NWTK Mtop API 响应结构
 */
interface MtopResponse<T = any> {
  /** 返回状态码数组 */
  ret: string[];
  /** 响应数据 */
  data: {
    /** 具体业务数据 */
    data?: T;
    /** 业务结果 */
    result?: T;
  } | T;
  /** 备用结果字段 */
  result?: T;
}

/**
 * 店铺商品列表请求参数
 */
interface ShopProductListParams {
  /** 商品模型 ID 列表 */
  modelIdList: string[] | number[];
}

/**
 * 商品任务提交数据
 */
interface ShopProductTaskData {
  [key: string]: any;
}

/**
 * 额外数据提交参数
 */
interface ExtraDataParams {
  [key: string]: any;
}

/**
 * 获取店铺商品列表
 * @param modelIdList - 商品模型 ID 列表
 * @returns 返回商品列表数据
 */
export function getShopProductList(modelIdList: string[] | number[]): Promise<any> {
  return handleMtopResult(
    NWTK.mtop.Search.getShopProductListV2({
      data: {
        modelIdList
      }
    })
  );
}

/**
 * 获取单位配置信息
 * @returns 返回单位配置数据
 */
export function getUnitConfig(): Promise<any> {
  return handleMtopResult(NWTK.mtop.Bom.unitConfig());
}

/**
 * 提交店铺额外数据
 * @param extraData - 需要提交的额外数据对象
 * @returns 返回提交结果
 */
export function submitExtraData(extraData: ExtraDataParams): Promise<any> {
  return handleMtopResult(
    NWTK.mtop.Search.submitShopExtraData({
      data: {
        data: JSON.stringify(extraData)
      }
    })
  );
}

/**
 * 提交店铺商品任务
 * @param taskData - 商品任务数据对象
 * @returns 返回任务提交结果
 */
export function submitShopProductTask(taskData: ShopProductTaskData): Promise<any> {
  return handleMtopResult(
    NWTK.mtop.Search.submitShopProductTask({
      data: {
        data: JSON.stringify(taskData)
      }
    })
  );
}

/**
 * 处理 Mtop 接口返回结果
 * 验证响应状态并提取业务数据
 * @param mtopPromise - Mtop API 返回的 Promise
 * @returns 提取后的业务数据
 * @throws 当响应状态不是 SUCCESS 时抛出原始响应对象
 */
export async function handleMtopResult<T = any>(
  mtopPromise: Promise<MtopResponse<T>>
): Promise<T> {
  const response = await mtopPromise;

  // 验证响应是否成功
  if (response?.data && response.ret?.[0]?.includes("SUCCESS")) {
    // 按优先级提取数据：data.data > data.result > data > result
    return (
      (response.data as any).data ??
      (response.data as any).result ??
      response.data ??
      response.result
    ) as T;
  }

  // 响应失败，抛出原始响应
  throw response;
}