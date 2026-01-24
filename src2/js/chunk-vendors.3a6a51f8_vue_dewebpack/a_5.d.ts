/**
 * Service Worker注册模块
 * 提供Service Worker的注册、更新、卸载等功能
 */

/**
 * Service Worker事件类型
 */
export type ServiceWorkerEventType =
  | 'registered'  // Service Worker已注册
  | 'updated'     // Service Worker已更新
  | 'cached'      // 内容已缓存
  | 'updatefound' // 发现更新
  | 'ready'       // Service Worker已就绪
  | 'offline'     // 离线状态
  | 'error';      // 发生错误

/**
 * Service Worker事件回调函数
 */
export interface ServiceWorkerCallbacks {
  /** Service Worker注册成功回调 */
  registered?: (registration: ServiceWorkerRegistration) => void;
  /** Service Worker更新回调 */
  updated?: (registration: ServiceWorkerRegistration) => void;
  /** 内容缓存完成回调 */
  cached?: (registration: ServiceWorkerRegistration) => void;
  /** 发现Service Worker更新回调 */
  updatefound?: (registration: ServiceWorkerRegistration) => void;
  /** Service Worker就绪回调 */
  ready?: (registration: ServiceWorkerRegistration) => void;
  /** 离线状态回调 */
  offline?: () => void;
  /** 错误处理回调 */
  error?: (error: Error) => void;
}

/**
 * Service Worker注册选项
 */
export interface ServiceWorkerRegistrationOptions extends RegistrationOptions {
  /** 注册选项（继承自浏览器原生RegistrationOptions） */
  scope?: string;
  type?: WorkerType;
  updateViaCache?: ServiceWorkerUpdateViaCache;
}

/**
 * Service Worker配置选项
 */
export interface ServiceWorkerConfig extends ServiceWorkerCallbacks {
  /** Service Worker注册选项 */
  registrationOptions?: ServiceWorkerRegistrationOptions;
}

/**
 * 注册Service Worker
 * @param url - Service Worker脚本文件的URL路径
 * @param config - Service Worker配置选项，包含事件回调和注册选项
 * @returns void
 * 
 * @example
 *