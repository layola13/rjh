/**
 * 页面加载相关工具模块
 * 用于设置页面标题、图标和加载动画
 */

/**
 * 加载配置选项
 */
interface LoadingConfig {
  /** 页面标题 */
  title?: string;
  /** 网站图标URL */
  favIcon?: string;
  /** 加载图片URL */
  loadingImg?: string;
  /** 加载描述文本 */
  loadingDescription?: string;
  /** Logo图片URL */
  logoImg?: string;
  /** Logo标题文本 */
  logoTitle?: string;
}

/**
 * 企业定制配置请求参数
 */
interface EnterpriseCustomRequest {
  /** 企业代码 */
  enterpriseCode: string;
  /** 定制类型列表 */
  customTypeList: Array<'3D_TOOL_LOADING_LOGO' | 'TITLE_IMAGE'>;
}

/**
 * API请求配置
 */
interface APIRequestConfig {
  headers: {
    /** 企业业务域名 */
    'ea-business-domain': string;
  };
}

/**
 * 企业定制数据项
 */
interface CustomDataItem {
  /** 定制类型 */
  customType: '3D_TOOL_LOADING_LOGO' | 'TITLE_IMAGE';
  /** 第一张图片名称 */
  firstImageName?: string;
  /** 第一张图片URL */
  firstImage?: string;
}

/**
 * API响应数据
 */
interface APIResponse {
  /** 返回状态码数组 */
  ret?: string[];
  /** 响应数据 */
  data?: {
    /** 定制配置结果列表 */
    result?: CustomDataItem[];
  };
}

/**
 * URL查询参数
 */
interface QueryStrings {
  /** 业务标签 */
  biz_tag?: string;
  /** 企业域名 */
  mpdomain?: string;
  [key: string]: string | undefined;
}

/**
 * 设置网站favicon图标
 * @param iconUrl - 图标文件URL
 */
export declare function loadFavIcon(iconUrl: string): void;

/**
 * 设置页面标题
 * @param title - 页面标题文本
 */
export declare function loadTitle(title: string | undefined): void;

/**
 * 加载默认或自定义的加载动画图片
 * @param useNewStyle - 是否使用新样式
 * @param isProduction - 是否为生产环境
 * @param isHaixun - 是否为海迅品牌
 */
export declare function LoadingImage(
  useNewStyle: boolean,
  isProduction: boolean,
  isHaixun: boolean
): void;

/**
 * 根据用户企业配置加载自定义页面元素
 * 从API获取企业定制配置并应用到页面
 * @param apiEndpoint - API端点地址
 * @param requestParams - 请求参数
 */
export declare function loadIndexByUser(
  apiEndpoint: string,
  requestParams: unknown
): void;

/**
 * 从常量模块导入的默认配置
 */
declare module './constants' {
  export default interface Constants {
    /** 默认页面标题 */
    DEFAULT_TITLE: string;
    /** 默认favicon URL */
    DEFAULT_FAV_ICON: string;
    /** 默认加载图片URL */
    DEFAULT_LOADING_IMG: string;
    /** 默认加载描述文本 */
    DEFAULT_LOADING_DESCRIPTION: string;
    /** 默认Logo图片URL */
    DEFAULT_LOGO_IMG: string;
  }
}

/**
 * 从工具模块导入的辅助函数
 */
declare module './utils' {
  /**
   * 从URL中解析查询参数
   * @param search - URL search字符串
   * @returns 查询参数对象
   */
  export function getQueryStringsFromUrl(search: string): QueryStrings | null;

  /**
   * 发起API请求并返回Promise
   * @param apiName - API名称
   * @param endpoint - 端点地址
   * @param params - 请求参数
   * @param data - 请求数据
   * @param config - 请求配置
   * @returns API响应Promise
   */
  export function getAPIPromise(
    apiName: string,
    endpoint: string,
    params: unknown,
    data: EnterpriseCustomRequest,
    config: APIRequestConfig
  ): Promise<APIResponse>;
}