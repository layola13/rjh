/**
 * Cookie管理模块
 * 提供统一的Cookie操作接口，支持跨域同步和安全配置
 * @module CookieManager
 */

import type { CookieConfig, CookieManagerInstance } from './types';

/**
 * Cookie配置的顶级配置类型
 */
interface TopConfig {
  /** Cookie路径前缀 */
  prefix: string;
  /** 子域名 */
  subDomain: string;
  /** 主域名 */
  mainDomain: string;
  /** 页面域名 */
  pageDomain: string;
}

/**
 * 顶级配置和MTop配置的联合类型
 */
interface ConfigOptions {
  /** 顶级配置 */
  TOP_CONFIG: TopConfig;
  /** MTop配置 */
  MTOP_CONFIG: TopConfig;
}

/**
 * Homestyler配置模块
 */
interface HomestylerModule {
  /** 是否使用顶级配置 */
  useHomestylerTop?: boolean;
  default: CookieManagerInstance;
}

/**
 * Cookie管理器配置选项
 */
interface CookieManagerConfig {
  /** Cookie路径前缀 */
  prefix: string;
  /** 子域名 */
  subDomain: string;
  /** 主域名 */
  mainDomain: string;
  /** 页面域名 */
  pageDomain: string;
  /** 是否启用HTTPS安全传输 */
  secure: boolean;
  /** SameSite策略，防止CSRF攻击 */
  sameSite: 'None' | 'Lax' | 'Strict';
  /** 是否启用Cookie同步模式 */
  syncCookieMode: boolean;
}

/**
 * Cookie管理器构造函数参数
 */
interface CookieManagerOptions {
  /** Cookie管理器配置 */
  config: CookieManagerConfig;
}

/**
 * Cookie管理器类
 * 提供Cookie的读取、设置、删除等操作
 */
declare class CookieManager {
  /**
   * 创建Cookie管理器实例
   * @param options - 配置选项
   */
  constructor(options: CookieManagerOptions);

  /**
   * 获取指定名称的Cookie值
   * @param name - Cookie名称
   * @returns Cookie值，不存在则返回undefined
   */
  get(name: string): string | undefined;

  /**
   * 设置Cookie
   * @param name - Cookie名称
   * @param value - Cookie值
   * @param options - 可选的Cookie选项
   */
  set(name: string, value: string, options?: Partial<CookieManagerConfig>): void;

  /**
   * 删除指定名称的Cookie
   * @param name - Cookie名称
   */
  remove(name: string): void;

  /**
   * 清除所有Cookie
   */
  clear(): void;
}

/**
 * 默认导出的Cookie管理器实例
 * 根据Homestyler配置自动选择TOP或MTOP配置
 */
declare const cookieManager: CookieManager;

export default cookieManager;

/**
 * Cookie管理器配置导出
 */
export type {
  CookieManagerConfig,
  CookieManagerOptions,
  TopConfig,
  ConfigOptions,
  HomestylerModule
};