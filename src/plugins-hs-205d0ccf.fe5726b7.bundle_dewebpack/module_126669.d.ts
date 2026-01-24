/**
 * 右键菜单插件模块
 * 提供鼠标右键菜单功能的插件实现
 */

/**
 * 右键菜单状态映射接口
 * 用于配置菜单项的启用/禁用状态
 */
export interface RightMenuStatusMap {
  [key: string]: boolean;
}

/**
 * 右键菜单状态枚举或类型
 */
export type RightMenuStatus = string | number | boolean;

/**
 * 右键菜单配置选项
 */
export interface RightMenuOptions {
  /** 菜单项配置 */
  items?: unknown;
  /** 是否启用菜单 */
  enabled?: boolean;
  /** 其他自定义配置 */
  [key: string]: unknown;
}

/**
 * 右键菜单处理器类
 * 负责菜单的显示、隐藏和交互逻辑
 */
declare class RightMenuHandler {
  /**
   * 初始化右键菜单处理器
   * @param app - 应用实例
   * @param options - 菜单配置选项
   * @param plugin - 插件实例引用
   */
  init(app: unknown, options: RightMenuOptions, plugin: RightMenuPlugin): void;

  /**
   * 卸载右键菜单处理器，清理资源
   */
  uninit(): void;

  /**
   * 显示右键菜单栏
   * @param event - 触发事件
   * @param target - 目标元素
   * @param force - 是否强制显示
   */
  showRightMenuBar(event: Event, target: HTMLElement, force: boolean): void;

  /**
   * 显示右键菜单
   */
  showRightMenu(): void;

  /**
   * 隐藏右键菜单
   */
  hideRightMenu(): void;

  /**
   * 启用右键菜单功能
   */
  enableRightmenu(): void;

  /**
   * 禁用右键菜单功能
   */
  disableRightmenu(): void;

  /**
   * 检查右键菜单当前是否显示
   * @returns 菜单显示状态
   */
  isRightMenuShowed(): boolean;

  /**
   * 设置右键菜单状态映射
   * @param statusMap - 状态映射对象
   */
  setRightMenuStatusMap(statusMap: RightMenuStatusMap): void;

  /**
   * 设置右键菜单状态
   * @param status - 菜单状态值
   */
  setRightMenuStatus(status: RightMenuStatus): void;
}

/**
 * 右键菜单插件类
 * 继承自HSApp插件基类，提供右键菜单功能
 */
export declare class RightMenuPlugin extends HSApp.Plugin.IPlugin {
  /** 插件名称 */
  readonly name: "rightmenu plugin";
  
  /** 插件描述 */
  readonly description: "right menu for mouse";
  
  /** 插件依赖项 */
  readonly dependencies: string[];

  /**
   * 右键菜单处理器实例
   */
  handler: RightMenuHandler;

  /**
   * 最小化菜单栏填充信号
   * 用于通知需要填充最小化菜单栏内容
   */
  signalPopulateMinBar: HSCore.Util.Signal<RightMenuPlugin>;

  /**
   * 自定义菜单项填充信号
   * 用于通知需要填充自定义菜单项
   */
  signalPopulateCustomizedItems: HSCore.Util.Signal<RightMenuPlugin>;

  /**
   * 菜单项点击事件追踪信号
   * 用于追踪和分析菜单项的点击行为
   */
  signalItemClickEventTrack: HSCore.Util.Signal<RightMenuPlugin>;

  /**
   * 插件激活时的回调
   * @param context - 插件上下文，包含app实例
   * @param options - 插件配置选项
   */
  onActive(context: { app: unknown }, options: RightMenuOptions): void;

  /**
   * 插件停用时的回调
   * 清理资源和事件监听
   */
  onDeactive(): void;

  /**
   * 显示右键菜单栏
   * @param event - 触发事件
   * @param target - 目标元素
   */
  showRightMenuBar(event: Event, target: HTMLElement): void;

  /**
   * 显示右键菜单
   */
  showRightMenu(): void;

  /**
   * 隐藏右键菜单
   */
  hideRightMenu(): void;

  /**
   * 启用右键菜单功能
   */
  enableRightMenu(): void;

  /**
   * 禁用右键菜单功能
   */
  disableRightMenu(): void;

  /**
   * 检查右键菜单当前是否显示
   * @returns 菜单显示状态
   */
  isRightMenuShowed(): boolean;

  /**
   * 批量设置右键菜单状态映射
   * @param statusMap - 菜单项状态映射表
   */
  setRightMenuStatusMap(statusMap: RightMenuStatusMap): void;

  /**
   * 设置右键菜单的整体状态
   * @param status - 菜单状态值
   */
  setRightMenuStatus(status: RightMenuStatus): void;
}

/**
 * 全局命名空间扩展
 */
declare global {
  namespace HSApp {
    namespace Plugin {
      /**
       * 插件基类接口
       */
      class IPlugin {
        name: string;
        description: string;
        dependencies: string[];
      }

      /**
       * 注册插件到应用
       * @param pluginType - 插件类型标识
       * @param pluginClass - 插件类构造函数
       */
      function registerPlugin(
        pluginType: string,
        pluginClass: new () => IPlugin
      ): void;
    }
  }

  namespace HSCore {
    namespace Util {
      /**
       * 信号类，用于事件通知和订阅
       */
      class Signal<T> {
        constructor(context: T);
      }
    }
  }

  namespace HSFPConstants {
    /**
     * 插件类型常量
     */
    enum PluginType {
      RightMenu = "RightMenu"
    }
  }
}

export {};