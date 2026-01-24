/**
 * Spark Pic Image Plugin - 图片管理插件
 * 提供图片浏览、上传、管理等功能
 */

import { HSApp } from './HSApp';

declare namespace HSFPConstants {
  enum PluginType {
    Toolbar = 'Toolbar',
    ResizeWidget = 'ResizeWidget',
    SingleRoom = 'SingleRoom',
    Catalog = 'Catalog',
    LeftMenu = 'LeftMenu',
    ContextualTools = 'ContextualTools',
    PropertyBar = 'PropertyBar',
    PageHeader = 'PageHeader',
    LayerEdit = 'LayerEdit',
    TeachingAbility = 'TeachingAbility',
    UserInfo = 'UserInfo',
    Feedback = 'Feedback',
    SparkPicImage = 'SparkPicImage'
  }
}

/**
 * 图片浏览器配置选项
 */
export interface ImageBrowserOptions {
  /** 选择模式：单选或多选 */
  mode?: 'single' | 'multiple';
  /** 允许的文件类型 */
  acceptedFileTypes?: string[];
  /** 最大文件大小（字节） */
  maxFileSize?: number;
  /** 是否显示上传按钮 */
  showUpload?: boolean;
}

/**
 * 插件激活参数
 */
export interface PluginActivationParams {
  /** 插件上下文 */
  context: unknown;
  /** 配置选项 */
  options?: Record<string, unknown>;
}

/**
 * 图片处理器接口
 */
interface IImageHandler {
  /** 初始化处理器 */
  init(config: unknown): void;
  /** 停用处理器 */
  onDeactive(): void;
  /** 打开图片列表 */
  openImageList(): void;
  /** 轻量级图片浏览器 */
  imageBrowserLite(options: ImageBrowserOptions): Promise<unknown>;
}

/**
 * Spark Pic 图片插件
 * 用于在编辑器中管理和操作图片资源
 */
export declare class SparkPicImagePlugin extends HSApp.Plugin.IPlugin {
  /** 插件名称 */
  readonly name: string;
  
  /** 插件描述 */
  readonly description: string;
  
  /** 依赖的插件列表 */
  readonly dependencies: string[];
  
  /** 内部图片处理器实例 */
  private _handler: IImageHandler;
  
  /**
   * 构造函数
   * 初始化插件及其依赖项
   */
  constructor();
  
  /**
   * 插件激活时调用
   * @param activationContext - 激活上下文
   * @param config - 配置对象
   */
  onActive(activationContext: unknown, config: unknown): void;
  
  /**
   * 插件停用时调用
   * 清理资源和事件监听器
   */
  onDeactive(): void;
  
  /**
   * 打开图片列表界面
   * 显示所有可用的图片资源
   */
  openImageList(): void;
  
  /**
   * 启动轻量级图片浏览器
   * @param options - 浏览器配置选项
   * @returns Promise，解析为选中的图片数据
   */
  imageBrowserLite(options: ImageBrowserOptions): Promise<unknown>;
}

/**
 * 插件注册声明
 * 将 SparkPicImagePlugin 注册到插件系统
 */
declare module './HSApp' {
  namespace HSApp.Plugin {
    /**
     * 注册插件到系统
     * @param pluginType - 插件类型标识符
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: HSFPConstants.PluginType.SparkPicImage,
      pluginClass: typeof SparkPicImagePlugin
    ): void;
  }
}