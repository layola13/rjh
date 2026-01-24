import { Resource, Loader as BaseLoader, LoaderOptions } from '@pixi/loaders';
import { EventEmitter } from '@pixi/utils';
import { Texture } from '@pixi/core';

/**
 * 纹理加载器插件
 * 用于将加载的图片资源自动转换为 PIXI Texture 对象
 */
export class TextureLoader {
  /**
   * 加载器中间件函数
   * 当资源类型为 IMAGE 时，自动创建 Texture 并附加到资源对象上
   * @param resource - 加载的资源对象
   * @param next - 调用下一个中间件的回调函数
   */
  static use(resource: LoaderResource, next: () => void): void;
}

/**
 * 加载器插件配置接口
 */
export interface LoaderPlugin {
  /** 在加载前执行的中间件函数 */
  pre?: (resource: LoaderResource, next: () => void) => void;
  /** 在加载时执行的中间件函数 */
  use?: (resource: LoaderResource, next: () => void) => void;
  /** 插件注册时执行的初始化函数 */
  add?: () => void;
}

/**
 * 应用加载器插件初始化选项
 */
export interface AppLoaderPluginOptions {
  /** 是否使用共享的加载器实例 */
  sharedLoader?: boolean;
}

/**
 * 增强的资源加载器
 * 扩展基础 Loader，集成 EventEmitter 支持事件监听
 */
export class Loader extends BaseLoader {
  /** 注册的插件列表 */
  protected static _plugins: LoaderPlugin[];
  
  /** 共享的加载器实例 */
  protected static _shared: Loader | null;
  
  /** 是否受保护（不可销毁） */
  protected _protected: boolean;

  /**
   * 创建加载器实例
   * @param baseUrl - 资源基础 URL
   * @param concurrency - 并发加载数量
   */
  constructor(baseUrl?: string, concurrency?: number);

  /**
   * 销毁加载器实例
   * 移除所有监听器并重置加载器状态
   * 受保护的实例无法销毁
   */
  destroy(): void;

  /**
   * 获取共享的加载器实例（单例模式）
   * 如果不存在则创建一个受保护的实例
   */
  static get shared(): Loader;

  /**
   * 注册加载器插件
   * @param plugin - 要注册的插件对象
   * @returns 返回 Loader 类以支持链式调用
   */
  static registerPlugin(plugin: LoaderPlugin): typeof Loader;

  // EventEmitter 事件方法
  emit(event: 'start', loader: Loader): boolean;
  emit(event: 'progress', loader: Loader, resource: LoaderResource): boolean;
  emit(event: 'error', error: Error, loader: Loader, resource: LoaderResource): boolean;
  emit(event: 'load', loader: Loader, resource: LoaderResource): boolean;
  emit(event: 'complete', loader: Loader, resources: Record<string, LoaderResource>): boolean;
  
  on(event: 'start', fn: (loader: Loader) => void, context?: unknown): this;
  on(event: 'progress', fn: (loader: Loader, resource: LoaderResource) => void, context?: unknown): this;
  on(event: 'error', fn: (error: Error, loader: Loader, resource: LoaderResource) => void, context?: unknown): this;
  on(event: 'load', fn: (loader: Loader, resource: LoaderResource) => void, context?: unknown): this;
  on(event: 'complete', fn: (loader: Loader, resources: Record<string, LoaderResource>) => void, context?: unknown): this;
  
  once(event: 'start', fn: (loader: Loader) => void, context?: unknown): this;
  once(event: 'progress', fn: (loader: Loader, resource: LoaderResource) => void, context?: unknown): this;
  once(event: 'error', fn: (error: Error, loader: Loader, resource: LoaderResource) => void, context?: unknown): this;
  once(event: 'load', fn: (loader: Loader, resource: LoaderResource) => void, context?: unknown): this;
  once(event: 'complete', fn: (loader: Loader, resources: Record<string, LoaderResource>) => void, context?: unknown): this;
  
  off(event: string, fn?: Function, context?: unknown): this;
  removeAllListeners(event?: string): this;
}

/**
 * PIXI Application 加载器插件
 * 为 PIXI.Application 提供资源加载能力
 */
export class AppLoaderPlugin {
  /** 加载器实例 */
  loader: Loader | null;

  /**
   * 初始化应用加载器插件
   * @param options - 插件配置选项
   */
  static init(options?: AppLoaderPluginOptions): void;

  /**
   * 销毁加载器插件
   * 清理加载器实例并释放资源
   */
  static destroy(): void;
}

/**
 * 加载器资源对象
 * 表示单个加载的资源及其元数据
 */
export interface LoaderResource extends Resource {
  /** 关联的 Texture 对象（图片资源专用） */
  texture?: Texture;
  /** 资源数据 */
  data?: unknown;
  /** 资源类型 */
  type?: number;
  /** 资源 URL */
  url?: string;
  /** 资源名称 */
  name?: string;
}

export { LoaderResource, Loader, TextureLoader, AppLoaderPlugin };