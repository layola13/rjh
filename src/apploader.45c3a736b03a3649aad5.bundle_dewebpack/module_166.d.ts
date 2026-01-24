/**
 * 平台配置模块
 * 包含不同环境的API域名、登录地址、资源路径等核心配置信息
 */

/**
 * MTOP API配置接口
 * 用于配置阿里系API网关相关域名信息
 */
interface MtopConfig {
  /** MTOP API前缀，通常为 "acs" */
  MTOPPREFIX: string;
  /** MTOP子域名，通常为 "m" */
  MTOPSUBDOMAIN: string;
  /** MTOP主域名 */
  MTOPMAINDOMIAN: string;
  /** 页面域名 */
  PAGEDOMAIN: string;
}

/**
 * 平台登录URL配置
 * 定义不同业务场景的登录地址
 */
interface PlatformLoginUrls {
  /** 家装装修平台登录地址 */
  ihomeDecoration: string;
  /** 企业平台登录地址 */
  enterprise: string;
  /** 家装服务商平台登录地址 */
  ihomeServiceProvider: string;
  /** 家装门店平台登录地址 */
  ihomeStore: string;
  /** 家装供应商平台登录地址 */
  ihomeSupplier: string;
  /** 家装淘宝商户平台登录地址 */
  ihomeXmerchant: string;
  /** 商家申请平台登录地址 */
  toApplyBiz: string;
  /** 家装工厂平台登录地址 */
  ihomeFactory: string;
  /** 设计商户平台登录地址 */
  designMerchant: string;
}

/**
 * 应用配置接口
 * 包含所有平台级别的配置项
 */
interface AppConfig {
  /** Homestyler平台MTOP配置 */
  homestyler: MtopConfig;
  /** EA（企业应用）平台MTOP配置 */
  ea: MtopConfig;
  /** 3D服务主机地址 */
  HOST: string;
  /** 工具许可失败跳转页面 */
  TOOL_LICENSE_FAILURE: string;
  /** 海讯工具许可失败跳转页面 */
  HAI_XUN_TOOL_LICENSE_FAILURE: string;
  /** 各平台登录URL映射表 */
  PLATFORM_LOGIN_URL: PlatformLoginUrls;
  /** iPassport服务器地址 */
  IPASSPORT_SERVER: string;
  /** Passport服务器地址 */
  PASSPORT_SERVER: string;
  /** 网络检测图片URL */
  NETWORK_CHECK_IMG: string;
  /** 日志服务API地址 */
  LOG_SERVICE_API_SERVER: string;
  /** 3D资源部署的OSS Bucket名称 */
  DEPLOY_3D_RES_BUCKET: string;
  /** 版本号为空时的提示标识 */
  HINT_ON_NULL_VERSION: string;
  /** 登录错误提示标识 */
  HINT_ON_LOGIN_ERROR: string;
  /** 默认页面标题 */
  DEFAULT_TITLE: string;
  /** 默认网站图标URL */
  DEFAULT_FAV_ICON: string;
  /** 默认加载动画图片URL */
  DEFAULT_LOADING_IMG: string;
  /** 默认加载提示文案 */
  DEFAULT_LOADING_DESCRIPTION: string;
  /** 默认Logo图片URL */
  DEFAULT_LOGO_IMG: string;
}

/**
 * 导出应用配置对象
 */
declare const config: AppConfig;

export default config;