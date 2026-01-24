/**
 * 资源管理和文件上传工具模块
 * 提供图片上传、URL解析、反馈提交等功能
 */

/**
 * 图片尺寸配置选项
 */
export interface ImageResizeOptions {
  /** 最大宽度（像素） */
  maxWidth?: number;
  /** 最大高度（像素） */
  maxHeight?: number;
}

/**
 * 上传错误响应
 */
export interface UploadErrorResponse {
  /** 错误消息键 */
  errMsg: string;
  /** 是否为无效输入 */
  isInValid: true;
}

/**
 * S3上传配置
 */
export interface S3UploadHeaders {
  /** 访问控制列表 */
  acl: string;
  /** 内容类型 */
  'content-type': string;
}

/**
 * 反馈数据参数
 */
export interface ReportDataParams {
  /** 资产ID */
  assetId: string;
  /** 其他动态属性 */
  [key: string]: unknown;
}

/**
 * MTOP API 响应结构
 */
export interface MtopResponse<T = unknown> {
  /** 返回状态码数组 */
  ret: string[];
  /** 响应数据 */
  data: T;
}

/**
 * 反馈提交响应数据
 */
export interface FeedbackResponseData {
  /** 响应结果 */
  result?: unknown;
  /** 其他动态属性 */
  [key: string]: unknown;
}

/**
 * 目录属性响应数据
 */
export interface CatalogAttributesResponse {
  /** 属性结果列表 */
  result: unknown[];
}

/**
 * 资源管理和文件上传工具类
 */
declare const module: {
  /**
   * 解析资源URL路径
   * 自动识别图片文件并添加正确的路径前缀
   * 
   * @param url - 原始资源路径
   * @returns 解析后的完整URL路径
   * 
   * @example
   *