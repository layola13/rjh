/**
 * 左侧菜单项点击事件数据接口
 */
interface LeftMenuItemClickEvent {
  /** 菜单项数据 */
  item?: {
    /** 菜单项唯一标识 */
    id?: string;
    /** 菜单项来源标识 */
    src?: string;
  };
}

/**
 * 提醒按钮配置接口
 */
interface RemindButtonConfig {
  /** 国际化键名 */
  key: string;
}

/**
 * 信号对象接口
 */
interface Signal<T = unknown> {
  /** 添加信号监听器 */
  add(listener: (data: T) => void): void;
  /** 移除信号监听器 */
  remove(listener: (data: T) => void): void;
  /** 触发信号 */
  dispatch(data: T): void;
}

/**
 * 左侧菜单插件接口
 */
interface LeftMenuPlugin {
  /** 左侧菜单项点击信号 */
  signalLeftMenuItemClick: Signal<LeftMenuItemClickEvent>;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取指定类型的插件实例
   * @param pluginType - 插件类型标识
   * @returns 插件实例或undefined
   */
  getPlugin(pluginType: string): LeftMenuPlugin | undefined;
}

/**
 * 应用实例接口
 */
interface AppInstance {
  /** 插件管理器 */
  pluginManager?: PluginManager;
}

/**
 * HSApp全局对象接口
 */
interface HSApp {
  App: {
    /**
     * 获取应用实例
     * @returns 应用实例或undefined
     */
    getApp(): AppInstance | undefined;
  };
}

/**
 * 全局HSFPConstants常量对象
 */
declare const HSFPConstants: {
  PluginType: {
    /** 左侧菜单插件类型标识 */
    LeftMenu: string;
  };
};

/**
 * 全局HSApp对象
 */
declare const HSApp: HSApp;

/**
 * 信号监听器配置接口
 */
interface SignalListenerConfig {
  /**
   * 获取要监听的信号对象
   * @returns 信号对象或undefined
   */
  getSignal(): Signal<LeftMenuItemClickEvent> | undefined;
  
  /**
   * 监听信号并返回按钮配置
   * @param event - 左侧菜单项点击事件
   * @returns 按钮配置对象或undefined
   */
  listen(event: LeftMenuItemClickEvent): RemindButtonConfig | undefined;
}

/**
 * 提醒信号处理器基类
 * 用于处理各种UI交互信号并返回相应的提醒配置
 */
declare abstract class RemindSignalHandle {
  /**
   * 获取需要监听的信号列表
   * @returns 信号监听器配置数组
   */
  abstract getRemindSignalList(): SignalListenerConfig[];
}

/**
 * 左侧菜单特定的提醒信号处理器
 * 监听左侧菜单点击事件并返回对应的UI提醒配置
 * 
 * @example
 *