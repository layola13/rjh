/**
 * AIGC (AI Generated Content) 相关接口模块
 * 提供纹理识别、计数查询和任务状态更新功能
 */

/**
 * AIGC 纹理识别上传参数
 */
export interface AigcIdentifyParams {
  /** 纹理图片数据或URL */
  textureData?: string;
  /** 图片格式 */
  format?: string;
  /** 其他业务参数 */
  [key: string]: unknown;
}

/**
 * AIGC 权益计数查询参数
 */
export interface FetchAigcCountParams {
  /** 用户ID */
  userId?: string;
  /** 查询类型 */
  type?: string;
  /** 其他业务参数 */
  [key: string]: unknown;
}

/**
 * 任务状态更新参数
 */
export interface UpdateTaskStatusParams {
  /** 任务ID */
  taskId?: string;
  /** 任务状态 */
  status?: number | string;
  /** 其他业务参数 */
  [key: string]: unknown;
}

/**
 * MTOP 接口响应结构
 */
export interface MtopResponse<T = unknown> {
  /** 响应数据 */
  data?: T;
  /** 是否成功 */
  success?: boolean;
  /** 错误信息 */
  message?: string;
  /** 响应码 */
  code?: string | number;
}

/**
 * 上传并识别 AIGC 纹理
 * @param params - 纹理识别参数
 * @returns Promise 返回识别结果
 */
export function aigcIdentify(params: AigcIdentifyParams): Promise<MtopResponse>;

/**
 * 查询 AIGC 权益使用计数
 * @param params - 查询参数
 * @returns Promise 返回计数信息
 */
export function fetchAigcCount(params: FetchAigcCountParams): Promise<MtopResponse>;

/**
 * 更新任务状态
 * @param params - 任务状态参数
 * @returns Promise 返回更新结果
 */
export function updateTaskStatus(params: UpdateTaskStatusParams): Promise<MtopResponse>;