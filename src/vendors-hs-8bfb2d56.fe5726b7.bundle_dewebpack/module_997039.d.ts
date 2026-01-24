/**
 * 设计家平台配置模块
 * 包含业务代码、环境配置、OSS存储路径及MTOP/TOP接口配置
 */

/**
 * MTOP接口配置
 * MTOP (Mobile Taobao Open Platform) 移动端开放平台配置
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
 * TOP接口配置
 * TOP (Taobao Open Platform) 淘宝开放平台配置
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
 */
export interface Config {
  /** 业务代码标识 */
  bizCode: string;
  /** 运行环境: 'dev' | 'test' | 'prod' */
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
  /** MTOP移动端接口配置 */
  MTOP_CONFIG: MtopConfig;
  /** TOP开放平台接口配置 */
  TOP_CONFIG: TopConfig;
}

/**
 * 设计家平台生产环境配置
 * 包含OSS存储、CDN加速及API网关配置
 */
export const config: Config = {
  bizCode: "shejijia",
  env: "prod",
  homeUrl: "www.shejijia.com",
  ossBucketPath: "i",
  ossModelPath: "i",
  ossHost: "https://hs-prod-pim-products.oss-us-east-1.aliyuncs.com",
  ossCdn: "https://hs-prod-pim-products.oss-us-east-1.aliyuncs.com/",
  MTOP_CONFIG: {
    prefix: "acs",
    subDomain: "m",
    mainDomain: "shejijia.com",
    pageDomain: "shejijia.com"
  },
  TOP_CONFIG: {
    prefix: "api",
    subDomain: "shejijia",
    mainDomain: "com",
    pageDomain: "shejijia.com"
  }
};