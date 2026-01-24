/**
 * API 配置模块
 * 定义系统中所有 API 接口的请求配置
 */

/**
 * API 请求配置接口
 */
export interface ApiConfig {
  /** HTTP 请求方法 */
  method: 'post' | 'get' | 'put' | 'delete';
  /** API 接口地址 */
  url: string;
  /** 接口功能描述 */
  description: string;
  /** 是否为 TPZZ 环境接口 */
  isTpzz?: boolean;
  /** 是否移除 EA 后缀 */
  removeEaSuffix?: boolean;
}

/**
 * API 配置集合接口
 */
export interface ApiConfigCollection {
  /** 检查用户登录状态 */
  checkUserLoginStatus: ApiConfig;
  /** 检查用户许可证状态 */
  checkUserLicenceStatus: ApiConfig;
  /** 获取用户灰度版本 */
  getUserGrayVersion: ApiConfig;
  /** 获取 TPZZ 环境配置 */
  getTpzzEnv: ApiConfig;
  /** 获取资源位配置 */
  resourceConfigs: ApiConfig;
  /** 根据企业代码获取信息 */
  getEnterpriseCode: ApiConfig;
}

/**
 * 默认导出的 API 配置对象
 */
declare const apiConfigs: ApiConfigCollection;

export default apiConfigs;