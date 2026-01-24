/**
 * API 配置接口定义
 * 描述单个 API 端点的配置信息
 */
interface ApiConfig {
  /** HTTP 请求方法 */
  method: 'post' | 'get' | 'put' | 'delete';
  /** API 端点 URL */
  url: string;
  /** API 功能描述 */
  description: string;
  /** 是否为基础 API（可选） */
  baseApi?: boolean;
}

/**
 * API 配置集合接口
 * 包含所有可用的 API 端点配置
 */
interface ApiConfigs {
  /** 检查用户登录状态 */
  checkUserLoginStatus: ApiConfig;
  /** 检查用户是否拥有 3D 工具许可证 */
  checkUserLicenceStatus: ApiConfig;
  /** 获取用户灰度版本信息 */
  getUserGrayVersion: ApiConfig;
  /** 获取用户会员信息 */
  getUserMemberInfo: ApiConfig;
  /** 获取资源位配置 */
  resourceConfigs: ApiConfig;
}

/**
 * 默认导出的 API 配置对象
 * 用于管理 Homestyler 应用中所有 API 端点的配置
 */
declare const apiConfigs: ApiConfigs;

export default apiConfigs;