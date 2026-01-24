/**
 * 全局OSS签名服务模块
 * 提供获取阿里云OSS全局签名的功能
 */

/**
 * OSS签名请求参数接口
 * 用于定义获取OSS签名时可传递的配置项
 */
export interface OssSignParams {
  /** 可选的额外参数，具体字段由业务需求决定 */
  [key: string]: unknown;
}

/**
 * OSS签名响应数据接口
 */
export interface OssSignResponse {
  /** 签名结果数据 */
  data?: {
    /** OSS访问密钥ID */
    accessKeyId?: string;
    /** OSS访问密钥 */
    accessKeySecret?: string;
    /** 安全令牌 */
    securityToken?: string;
    /** 签名过期时间 */
    expiration?: string;
    /** OSS存储桶名称 */
    bucket?: string;
    /** OSS区域端点 */
    region?: string;
    [key: string]: unknown;
  };
  /** 是否成功 */
  success?: boolean;
  /** 错误信息 */
  message?: string;
}

/**
 * 获取全局OSS签名
 * 
 * 通过MTOP接口获取阿里云OSS的全局访问签名凭证，
 * 用于客户端直接上传文件到OSS服务
 * 
 * @param params - OSS签名请求参数，默认为空对象
 * @returns Promise，解析为OSS签名响应数据
 * 
 * @example
 *