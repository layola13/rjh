/**
 * 切换语言插件类型定义
 * @module SwitchLanguagePlugin
 */

/**
 * 语言配置接口
 */
export interface LanguageConfig {
  /** 语言代码（如 'en', 'zh-CN'） */
  code: string;
  /** 显示名称 */
  displayName: string | Record<string, string>;
}

/**
 * 区域配置接口
 */
export interface RegionConfig {
  /** 区域代码（如 'us', 'cn', 'global'） */
  code: string;
  /** 显示名称（支持多语言或默认字符串） */
  displayName: string | Record<string, string>;
  /** 该区域支持的语言列表 */
  langs: LanguageConfig[];
}

/**
 * 应用参数接口
 */
export interface AppParams {
  /** 当前区域信息 */
  region: RegionConfig;
  /** 当前语言代码 */
  locale: string;
  /** 所有可用区域列表 */
  allRegions: RegionConfig[];
  /** 租户标识 */
  tenant: string;
}

/**
 * 当前语言区域状态接口
 */
export interface CurrentLanguageState {
  /** 当前区域代码 */
  regioncode: string;
  /** 当前语言代码 */
  langcode: string;
  /** 完整显示名称（区域 + 语言） */
  displayName: string;
}

/**
 * 语言切换事件数据接口
 */
export interface LanguageSwitchEventData {
  /** 目标URL */
  url: string;
  /** 管理器实例引用 */
  data: typeof LanguageManager;
  /** 目标区域代码 */
  regioncode: string;
  /** 目标语言代码 */
  langcode: string;
}

/**
 * 切换语言组件属性接口
 */
export interface SwitchLanguageComponentProps {
  /** 组件配置选项 */
  options: Record<string, unknown>;
  /** 当前语言区域状态 */
  current: CurrentLanguageState;
  /** 语言切换回调函数 */
  onSelectedChange: (regionCode: string, langCode: string) => void;
  /** 所有可用区域列表 */
  regions: RegionConfig[];
}

/**
 * 插件基类接口
 */
export interface IPlugin {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 依赖的其他插件 */
  dependencies: string[];
  
  /** 插件激活时调用 */
  onActive(context: PluginContext): void;
  /** 插件停用时调用 */
  onDeactive(): void;
}

/**
 * 插件上下文接口
 */
export interface PluginContext {
  /** 应用实例 */
  app: {
    /** 应用参数 */
    appParams: AppParams;
  };
}

/**
 * 信号类接口（观察者模式）
 */
export interface Signal<T = unknown> {
  /** 派发信号 */
  dispatch(data: T): void;
  /** 添加监听器 */
  add(callback: (data: T) => void): void;
  /** 移除监听器 */
  remove(callback: (data: T) => void): void;
}

/**
 * 切换语言插件类
 * 提供多语言、多区域切换功能
 */
export declare class SwitchLanguagePlugin implements IPlugin {
  /** 插件名称 */
  readonly name: "switchlanguage plugin";
  /** 插件描述 */
  readonly description: "provide switchlanguage component";
  /** 插件依赖 */
  readonly dependencies: [];
  
  /** 区域语言变更信号，用于通知订阅者 */
  signalRegionLanguageChanged: Signal<LanguageSwitchEventData>;

  constructor();

  /**
   * 插件激活时调用
   * 初始化语言管理器和信号
   * @param context - 插件上下文对象
   */
  onActive(context: PluginContext): void;

  /**
   * 插件停用时调用
   * 清理资源
   */
  onDeactive(): void;

  /**
   * 渲染切换语言组件到指定DOM节点
   * @param container - 目标DOM容器
   * @param options - 组件配置选项
   */
  render(container: HTMLElement, options: Record<string, unknown>): void;

  /**
   * 获取切换语言React元素（非ezhome租户返回null）
   * @param options - 组件配置选项
   * @returns React元素或undefined
   */
  getRenderItem(options: Record<string, unknown>): React.ReactElement<SwitchLanguageComponentProps> | undefined;

  /**
   * 切换语言和区域
   * @param regionCode - 目标区域代码
   * @param langCode - 目标语言代码
   */
  switchLanguage(regionCode: string, langCode: string): void;
}

/**
 * 语言管理器（内部单例）
 * 负责语言切换逻辑和状态管理
 */
declare const LanguageManager: {
  /** 插件实例引用 */
  plugin: SwitchLanguagePlugin;
  /** 当前页面路径 */
  path: string;
  /** 应用参数 */
  appParam: AppParams;
  /** 所有可用区域（已本地化） */
  allRegions: RegionConfig[];
  /** 当前语言区域状态 */
  current: CurrentLanguageState;

  /**
   * 初始化语言管理器
   * @param appParams - 应用参数
   * @param pluginInstance - 插件实例
   */
  init(appParams: AppParams, pluginInstance: SwitchLanguagePlugin): void;

  /**
   * 导航到指定语言和区域
   * 构建新URL并触发页面跳转
   * @param regionCode - 目标区域代码
   * @param langCode - 目标语言代码
   */
  navigate(regionCode: string, langCode: string): void;
};

/**
 * 全局HSApp命名空间扩展
 */
declare global {
  namespace HSApp {
    namespace Plugin {
      /**
       * 注册插件到全局注册表
       * @param name - 插件唯一标识名称
       * @param pluginClass - 插件类构造函数
       */
      function registerPlugin(name: "hsw.plugin.switchlanguage.Plugin", pluginClass: typeof SwitchLanguagePlugin): void;
    }
  }

  namespace HSCore {
    namespace Util {
      /**
       * 信号类构造函数
       */
      class Signal<T = unknown> implements Signal<T> {
        dispatch(data: T): void;
        add(callback: (data: T) => void): void;
        remove(callback: (data: T) => void): void;
      }
    }
  }
}

export default SwitchLanguagePlugin;