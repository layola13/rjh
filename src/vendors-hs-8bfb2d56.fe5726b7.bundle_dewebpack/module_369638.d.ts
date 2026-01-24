/**
 * 应用配置模块
 * 包含 Homestyler 平台的核心配置信息，包括业务代码、环境设置、OSS 存储路径、支付配置等
 * @module Config
 */

/**
 * MTOP API 配置接口
 * 定义移动端 API 网关的域名配置结构
 */
export interface MtopConfig {
  /** API 前缀标识符 */
  prefix: string;
  /** 子域名 */
  subDomain: string;
  /** 主域名 */
  mainDomain: string;
  /** 完整页面域名 */
  pageDomain: string;
}

/**
 * TOP API 配置接口
 * 定义服务端 API 网关的域名配置结构
 */
export interface TopConfig {
  /** API 前缀标识符 */
  prefix: string;
  /** 子域名 */
  subDomain: string;
  /** 主域名 */
  mainDomain: string;
  /** 完整页面域名 */
  pageDomain: string;
}

/**
 * 应用配置接口
 * 定义 Homestyler 应用的完整配置结构
 */
export interface AppConfig {
  /** 业务代码标识 */
  bizCode: string;
  /** 运行环境（如 prod, dev, test） */
  env: string;
  /** 主站 URL */
  homeUrl: string;
  /** OSS 存储桶路径 */
  ossBucketPath: string;
  /** OSS 模型文件路径 */
  ossModelPath: string;
  /** OSS 主机地址 */
  ossHost: string;
  /** OSS CDN 加速地址 */
  ossCdn: string;
  /** PayPal 应用 ID */
  paypalAppId: string;
  /** PayPal 支付回调 URL */
  paypalReturnUrl: string;
  /** PayPal 认证端点 */
  paypalAuthend: string;
  /** 图库服务主机地址 */
  galleryHost: string;
  /** MTOP API 配置 */
  MTOP_CONFIG: MtopConfig;
  /** TOP API 配置 */
  TOP_CONFIG: TopConfig;
}

/**
 * 生产环境配置对象
 * 包含 Homestyler 平台在生产环境下的所有配置参数
 */
export const config: AppConfig;