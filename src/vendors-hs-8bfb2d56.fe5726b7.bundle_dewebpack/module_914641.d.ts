/**
 * 配置模块
 * 包含应用的环境配置、OSS存储配置和API域名配置
 */

/**
 * MTOP API配置接口
 * 用于配置阿里MTOP接口的域名相关参数
 */
interface MtopConfig {
  /** API前缀 */
  prefix: string;
  /** 子域名 */
  subDomain: string;
  /** 主域名 */
  mainDomain: string;
  /** 页面域名 */
  pageDomain: string;
}

/**
 * TOP API配置接口
 * 用于配置TOP接口的域名相关参数
 */
interface TopConfig {
  /** API前缀 */
  prefix: string;
  /** 子域名 */
  subDomain: string;
  /** 主域名 */
  mainDomain: string;
  /** 页面域名 */
  pageDomain: string;
}

/**
 * 应用配置接口
 * 定义整个应用的核心配置项
 */
interface AppConfig {
  /** 业务代码标识 */
  bizCode: string;
  /** 运行环境 (dev/pre/prod) */
  env: string;
  /** 首页URL地址 */
  homeUrl: string;
  /** OSS存储桶路径 */
  ossBucketPath: string;
  /** OSS模型文件路径 */
  ossModelPath: string;
  /** OSS服务主机地址 */
  ossHost: string;
  /** OSS CDN加速地址 */
  ossCdn: string;
  /** MTOP接口配置 */
  MTOP_CONFIG: MtopConfig;
  /** TOP接口配置 */
  TOP_CONFIG: TopConfig;
}

/**
 * 应用配置对象
 * 包含家居设计应用的预发布环境配置
 */
export const config: AppConfig;