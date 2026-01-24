/**
 * 用户认证和设计元数据工具类
 * 提供用户登录状态、会话管理和设计信息访问的静态方法
 */

/**
 * 设计元数据接口
 * 包含设计相关的基本信息
 */
interface DesignMetadata {
  /**
   * 获取元数据字段值
   * @param key - 元数据字段名
   * @returns 字段值
   */
  get(key: 'designId'): string;
  get(key: 'designVersion'): string | number;
  get(key: 'designName'): string;
  get(key: 'userId'): string;
  get(key: string): unknown;
}

/**
 * 应用实例接口
 * 表示HSApp应用的主实例
 */
interface AppInstance {
  /** 设计元数据对象 */
  designMetadata: DesignMetadata;
}

/**
 * 全局用户对象接口
 * 提供Autodesk用户认证相关功能
 */
interface AdskUser {
  /** 用户ADA ID */
  adaId?: string;
  /** 用户GUID */
  guid?: string;
  /** 登录回调事件名称 */
  EVENT_CALLBACK_FUN: string;
  
  /**
   * 获取用户会话ID
   * @returns 会话ID
   */
  getUserSessionId(): string;
  
  /**
   * 检查用户是否已登录
   * @returns 登录状态
   */
  isLogin(): boolean;
  
  /**
   * 用户登出
   */
  logOut(): void;
  
  /**
   * 打开登录窗口
   */
  openLoginWindow(): void;
}

/**
 * HSApp全局对象接口
 */
interface HSAppGlobal {
  App: {
    /**
     * 获取应用实例
     * @returns 应用实例
     */
    getApp(): AppInstance;
  };
}

/**
 * 全局声明
 */
declare global {
  const adskUser: AdskUser;
  const HSApp: HSAppGlobal;
  interface JQueryStatic {
    (selector: string): {
      unbind(eventType: string): { bind(eventType: string, handler: () => void): void };
    };
  }
  const $: JQueryStatic;
}

/**
 * 用户和设计信息工具类
 * 提供静态方法访问用户认证状态和设计元数据
 */
export default class UserDesignUtils {
  /**
   * 获取登录用户ID
   * 优先返回adaId，若不存在则返回guid
   * @returns 用户唯一标识符
   */
  static getLoginUserId(): string | undefined;

  /**
   * 获取当前会话ID
   * @returns 会话标识符
   */
  static getSessionId(): string;

  /**
   * 获取设计ID
   * @param app - 应用实例
   * @returns 设计唯一标识符
   */
  static getDesignId(app: AppInstance): string;

  /**
   * 获取设计版本号
   * @param app - 应用实例
   * @returns 设计版本
   */
  static getDesignVersion(app: AppInstance): string | number;

  /**
   * 获取设计名称
   * @param app - 应用实例
   * @returns 设计名称
   */
  static getDesignName(app: AppInstance): string;

  /**
   * 检查用户是否已登录
   * @returns 登录状态
   */
  static isLogin(): boolean;

  /**
   * 检查当前用户是否为设计所有者
   * 比较当前登录用户ID与设计元数据中的userId
   * @returns 是否为所有者
   */
  static isOwner(): boolean;

  /**
   * 执行用户登出操作
   */
  static logOut(): void;

  /**
   * 打开登录窗口
   * @param callback - 登录成功后的回调函数（可选）
   */
  static openLoginWindow(callback?: () => void): void;
}