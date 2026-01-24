/**
 * 资源管理器模块
 * 用于处理国际化资源字符串的加载和获取
 * @module ResourceManager
 */

/**
 * 支持的语言区域代码
 */
type LocaleCode = 
  | 'ja_JP'
  | 'en_US'
  | 'fr_FR'
  | 'ru_RU'
  | 'it_IT'
  | 'es_ES'
  | 'pt_PT'
  | 'zh_CN'
  | 'id_ID'
  | 'de_DE'
  | 'zh_TW'
  | 'pl_PL'
  | 'ko_KR'
  | 'ar_SA';

/**
 * 资源字符串映射表
 * 键为资源标识符，值为对应语言的字符串
 */
type ResourceMap = Record<string, string>;

/**
 * 全局资源管理器接口
 * 用于与浏览器环境中的全局ResourceManager交互
 */
interface GlobalResourceManager {
  /**
   * 获取指定键的资源字符串
   * @param key - 资源键
   * @returns 对应的资源字符串
   */
  getString(key: string): string | undefined;
}

/**
 * HSApp应用参数接口
 */
interface AppParams {
  /** 当前应用的语言区域设置 */
  locale: LocaleCode;
}

/**
 * HSApp应用实例接口
 */
interface HSAppInstance {
  /** 应用参数 */
  appParams: AppParams;
}

/**
 * HSApp全局对象接口
 */
interface HSApp {
  App: {
    /**
     * 获取应用实例
     * @returns 应用实例
     */
    getApp(): HSAppInstance;
  };
}

/**
 * 扩展的Window接口
 */
declare global {
  interface Window {
    /** 全局资源管理器实例（可选） */
    ResourceManager?: GlobalResourceManager;
    /** HSApp全局对象（可选） */
    HSApp?: HSApp;
  }

  /** HSApp全局变量 */
  const HSApp: HSApp;
}

/**
 * 资源管理器类
 * 负责加载和管理应用程序的国际化资源
 */
export declare class ResourceManager {
  /**
   * 全局资源管理器实例（如果存在）
   * 优先使用浏览器环境中的全局ResourceManager
   */
  private globalResourceManager?: GlobalResourceManager;

  /**
   * 当前加载的资源映射表
   */
  private resourceMap?: ResourceMap;

  /**
   * 初始化资源管理器
   * @param locale - 可选的语言区域代码，如未提供则从HSApp获取
   * @returns Promise，初始化完成后resolve
   * @remarks
   * - 如果已经初始化，直接返回resolved Promise
   * - 如果存在全局ResourceManager，则使用全局实例
   * - 否则根据locale加载对应的资源映射表，默认回退到en_US
   */
  init(locale?: LocaleCode): Promise<void>;

  /**
   * 获取指定键的资源字符串
   * @param key - 资源键
   * @returns 对应的资源字符串，如果不存在则返回undefined
   * @remarks
   * - 如果存在全局ResourceManager，优先使用全局实例
   * - 否则从本地resourceMap中查找
   */
  getString(key: string): string | undefined;
}

/**
 * 资源管理器单例实例
 * 应用程序应使用此实例访问资源管理功能
 */
export declare const resourceManager: ResourceManager;