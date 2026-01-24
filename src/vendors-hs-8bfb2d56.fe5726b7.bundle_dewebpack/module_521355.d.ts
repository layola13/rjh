/**
 * 设计家平台配置模块
 * @module Config
 */

/**
 * 应用配置接口
 * 定义了设计家平台的核心配置项
 */
export interface AppConfig {
  /**
   * 业务代码标识符
   * @example "shejijia"
   */
  bizCode: string;

  /**
   * 运行环境
   * @example "prod" | "dev" | "test"
   */
  env: string;

  /**
   * 首页URL地址（不含协议）
   * @example "www.shejijia.com"
   */
  homeUrl: string;

  /**
   * 页面主域名
   * @example "shejijia.com"
   */
  pageDomain: string;

  /**
   * OSS存储桶路径前缀
   * @example "i"
   */
  ossBucketPath: string;

  /**
   * OSS模型文件路径前缀
   * @example "i"
   */
  ossModelPath: string;

  /**
   * OSS服务主机地址（不含尾部斜杠）
   * @example "https://hs-prod-pim-products.oss-us-east-1.aliyuncs.com"
   */
  ossHost: string;

  /**
   * OSS CDN加速地址（含尾部斜杠）
   * @example "https://hs-prod-pim-products.oss-us-east-1.aliyuncs.com/"
   */
  ossCdn: string;
}

/**
 * 应用配置实例
 * 包含设计家平台生产环境的所有配置项
 */
export declare const config: AppConfig;