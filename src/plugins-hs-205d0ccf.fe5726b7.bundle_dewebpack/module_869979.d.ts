/**
 * SparkPic API 模块
 * 提供图片处理、任务管理、批量下载等功能的类型定义
 */

/**
 * MTOP API 响应结构
 */
interface MtopResponse<T = unknown> {
  /** 返回状态码数组 */
  ret: string[];
  /** 响应数据 */
  data: T;
}

/**
 * MTOP API 请求参数结构
 */
interface MtopRequestParams {
  /** 请求数据 */
  data: unknown;
}

/**
 * MTOP API 调用函数类型
 */
type MtopApiFunction<TRequest = unknown, TResponse = unknown> = (
  params: MtopRequestParams
) => Promise<MtopResponse<TResponse>>;

/**
 * 根据任务获取图片
 * @param params - 请求参数
 * @returns Promise，包含图片数据
 */
export function fetchImageByTask<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 获取所有图片列表
 * @param params - 请求参数
 * @returns Promise，包含图片列表数据
 */
export function fetchAllImage<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 删除图片
 * @param params - 请求参数，包含待删除图片标识
 * @returns Promise，包含删除结果
 */
export function deleteImage<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 标记图片
 * @param params - 请求参数，包含图片标记信息
 * @returns Promise，包含标记结果
 */
export function markImage<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 查看图片
 * @param params - 请求参数，包含图片查看信息
 * @returns Promise，包含图片详情
 */
export function viewImage<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 更新任务信息
 * @param params - 请求参数，包含任务更新数据
 * @returns Promise，包含更新结果
 */
export function updateTaskInfo<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 获取总数统计
 * @param params - 请求参数
 * @returns Promise，包含统计数据
 */
export function getTotal<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 获取优惠券数量
 * @returns Promise，包含优惠券数量信息
 */
export function getCouponNum<TResponse = unknown>(): Promise<TResponse>;

/**
 * 通过子任务提交
 * @param params - 请求参数，包含子任务信息
 * @returns Promise，包含提交结果
 */
export function submitBySubTask<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 重新提交任务
 * @param params - 请求参数，包含重新提交的任务信息
 * @returns Promise，包含提交结果
 */
export function reSubmit<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 批量下载提交
 * @param params - 请求参数，包含批量下载信息
 * @returns Promise，包含提交结果
 */
export function batchDownloadSubmit<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 批量下载请求
 * @param params - 请求参数，包含下载请求信息
 * @returns Promise，包含下载链接或结果
 */
export function batchDownloadRequest<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 升级分辨率
 * @param params - 请求参数，包含分辨率升级信息
 * @returns Promise，包含升级结果
 */
export function upgradeResolution<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 移除水印
 * @param params - 请求参数，包含水印移除信息
 * @returns Promise，包含处理结果
 */
export function removeWatermark<TRequest = unknown, TResponse = unknown>(
  params: TRequest
): Promise<TResponse>;

/**
 * 处理 MTOP Promise 请求
 * 封装统一的错误处理逻辑，检查响应状态并返回数据或拒绝
 * @param apiFunction - MTOP API 函数
 * @param requestData - 请求数据
 * @returns Promise，成功时返回响应数据，失败时拒绝
 */
export function handlePromise<TRequest = unknown, TResponse = unknown>(
  apiFunction: MtopApiFunction<TRequest, TResponse>,
  requestData: TRequest
): Promise<TResponse>;