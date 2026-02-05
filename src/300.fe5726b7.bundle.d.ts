/**
 * 应用环境配置类型定义
 * 包含设计工具、渲染服务、用户中心等各类服务端点和功能开关
 */
export interface ApplicationConfig {
  /** 引导复制设计ID */
  GUIDE_COPY_DESIGNID: string;

  /** 渲染任务管理服务器地址 */
  EZHOME_RENDER_JOB_MANAGEMENT_SERVER: string;

  /** 全局网站API地址 */
  GLOBAL_WEBSITE_API: string;

  /** 平面图服务器地址 */
  EZHOME_FLOORPLAN_SERVER: string;

  /** 全景查看器URL */
  EZHOME_PANOVIEWER_URL: string;

  /** 视频编辑器URL */
  EZHOME_VIDEOEDITOR_URL: string;

  /** 全景光混合URL */
  EZHOME_PANO_LIGHTMIX_URL: string;

  /** 光线追踪URL */
  EZHOME_RAYTRACE_URL: string;

  /** 帮助中心主页 */
  EZHOME_HELP_CENTER: string;

  /** 帮助中心-快捷键说明 */
  EZHOME_HELP_CENTER_HOTKEYS: string;

  /** 帮助中心-设计过滤器 */
  EZHOME_HELP_CENTER_DESIGN_FILTER: string;

  /** 帮助中心-视频教程 */
  EZHOME_HELP_CENTER_VIDEOS: string;

  /** 欢迎页帮助中心视频分类列表 */
  EZHOME_WELCOME_HELP_CENTER_VIDEOS: string;

  /** 设计案例页面 */
  EZHOME_DESIGN_CASE: string;

  /** 设计模型页面 */
  EZHOME_DESIGN_MODEL: string;

  /** 单点登录服务器 */
  EZHOME_SIGNIN_SERVER: string;

  /** 家居设计API服务器 */
  EZHOME_SSJ_API_SERVER: string;

  /** 家居设计BOM（物料清单）API服务器 */
  EZHOME_SSJ_BOM_API_SERVER: string;

  /** 是否启用帮助中心语言切换 */
  HELP_LANGUAGE_SWITCH: boolean;

  /** 渲染强度倍增器阈值 */
  EZHOME_RENDER_INTENSITYMULTIPLIER_THRESHOLD: number;

  /** 是否启用渲染曝光校准 */
  EZHOME_RENDER_EXPOSURE_CALIBRATION_ENABLE: boolean;

  /** 网站首页地址 */
  SITE_HOME: string;

  /** 用户中心URL */
  USERCENTER_URL: string;

  /** 我的工作台URL配置（按业务类型） */
  MY_WORKBENCH_URL: WorkbenchUrlMap;

  /** 静态验证页面URL */
  STATIC_VERIFICATION_URL: string;

  /** 消息中心URL */
  MESSAGECENTER_URL: string;

  /** S3标签URL */
  EZHOME_S3_URL_TAGGING: string;

  /** 导出场景服务器 */
  EZHOME_EXPORT_SCENE_SERVER: string;

  /** 自动样式服务器 */
  EZHOME_AUTOSTYLER_SERVER: string;

  /** 商城URL */
  MALL_URL: string;

  /** 品牌过滤器调查问卷 */
  BRAND_FILTER_SURVEY: string;

  /** 是否启用品牌过滤器调查 */
  ENABLE_BRAND_FILTER_SURVEY: boolean;

  /** 通行证服务器 */
  PASSPORT_SERVER: string;

  /** 内部通行证服务器 */
  IPASSPORT_SERVER: string;

  /** 内部通行证页面URL */
  IPASSPORT_PAGE_URL: string;

  /** 会员中心URL */
  MEMBER_CENTER_URL: string;

  /** 设计师页面 */
  DESIGNER_PAGE: string;

  /** 淘宝登出URI */
  TAOBAOLOGOUTURI: string;

  /** 家淘宝登录地址 */
  JIATAOBAO: string;

  /** 淘宝登录环境 */
  TAOBAO_LOGIN_ENV: string;

  /** OAuth Web客户端ID */
  OAUTH_WEB_CLIENT_ID: string;

  /** OAuth Token Cookie名称 */
  OAUTH_TOKEN_COOKIE_NAME: string;

  /** SSO用户Cookie名称 */
  SSO_USER_COOKIE_NAME: string;

  /** iHome编辑器URL */
  IHOME_EDITOR_URL: string;

  /** CAD自动构建墙体开口产品ID映射 */
  CAD_AUTO_BUILD_WALL_OPENING_PRODUCT: WallOpeningProductMap;

  /** 平台登出URL */
  PLATFORM_LOGOUT_URL: string;

  /** 平台登录环境 */
  PLATFORM_LOGIN_ENV: string;

  /** EA（企业账号）API主机配置 */
  EAAPIHOST: EaApiHostConfig;

  /** CNAME模式映射配置 */
  CNAME_PATTERN_MAPS: CnamePatternMap[];

  /** 模型库资源池配置 */
  MODEL_LIBRARY_POOL: ModelLibraryPoolConfig;
}

/**
 * 工作台URL映射
 * 按不同业务类型提供对应的工作台入口
 */
export interface WorkbenchUrlMap {
  /** 工厂端 */
  ihomeFactory: string;
  /** 服务商端 */
  ihomeServiceProvider: string;
  /** 智能门店 */
  ihomeStore: string;
  /** 设计师端 */
  shejishi: string;
  /** 装修端 */
  ihomeDecoration: string;
  /** X商家端 */
  ihomeXmerchant: string;
  /** 申请业务入口 */
  toApplyBiz: string;
  /** ICBU（国际站） */
  icbu: string;
  /** 设计商家端 */
  designMerchant: string;
  /** X商家SAAS端 */
  ihomeXmerchant_mpmwsaas: string;
}

/**
 * 墙体开口产品ID映射
 * 用于CAD自动构建时的门窗产品关联
 */
export interface WallOpeningProductMap {
  /** 室内门 */
  InDoor: string;
  /** 室内推拉门 */
  InDoorSliding: string;
  /** 室外门 */
  OutDoor: string;
  /** 窗户 */
  Window: string;
  /** 落地窗 */
  FloorWindow: string;
  /** 洞口（预留为空） */
  Hole: string;
}

/**
 * 企业账号API主机配置
 * 为企业版提供独立的服务端点
 */
export interface EaApiHostConfig {
  /** 渲染任务管理服务器（企业版） */
  EZHOME_RENDER_JOB_MANAGEMENT_SERVER: string;
  /** 家居设计API服务器（企业版） */
  EZHOME_SSJ_API_SERVER: string;
  /** 家居设计BOM API服务器（企业版） */
  EZHOME_SSJ_BOM_API_SERVER: string;
  /** 自动样式服务器（企业版） */
  EZHOME_AUTOSTYLER_SERVER: string;
  /** 会员中心URL（企业版） */
  MEMBER_CENTER_URL: string;
  /** 通行证服务器（企业版） */
  PASSPORT_SERVER: string;
  /** 内部通行证服务器（企业版） */
  IPASSPORT_SERVER: string;
}

/**
 * CNAME模式映射配置
 * 用于OSS资源的CDN加速域名映射
 */
export interface CnamePatternMap {
  /** 源主机列表 */
  hosts: string[];
  /** CNAME模式模板（#index#为占位符） */
  cnamePattern: string;
  /** 分片数量 */
  count: number;
}

/**
 * 模型库资源池配置
 * 定义不同类型模型库的资源池和分类ID
 */
export interface ModelLibraryPoolConfig {
  /** 高质量模型池 */
  high_quality: ModelPoolDefinition;
  /** 高佣金模型池 */
  high_commission: ModelPoolDefinition;
}

/**
 * 模型池定义
 */
export interface ModelPoolDefinition {
  /** 资源池ID */
  poolId: number;
  /** 分类ID */
  categoryId: string;
}

declare const config: ApplicationConfig;
export default config;