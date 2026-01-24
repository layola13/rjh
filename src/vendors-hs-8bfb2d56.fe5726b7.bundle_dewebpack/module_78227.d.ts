/**
 * 设计家应用配置模块
 * @module config
 */

/**
 * MTOP服务配置接口
 * 用于阿里云MTOP网关的域名配置
 */
export interface MtopConfig {
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
 * TOP服务配置接口
 * 用于淘宝开放平台API的域名配置
 */
export interface TopConfig {
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
 * 包含业务代码、环境、OSS存储等核心配置
 */
export interface AppConfig {
  /** 业务代码标识 */
  bizCode: string;
  /** 运行环境：dev(开发) | test(测试) | pre(预发) | prod(生产) */
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
  /** MTOP服务配置 */
  MTOP_CONFIG: MtopConfig;
  /** TOP服务配置 */
  TOP_CONFIG: TopConfig;
}

/**
 * 设计家应用配置对象
 * 包含所有环境和服务的配置信息
 */
export declare const config: AppConfig;