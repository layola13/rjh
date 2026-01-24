/**
 * Module: module_onClick
 * Original ID: onClick
 * 
 * 显示替换材料面板的处理函数
 */

/**
 * 应用程序全局接口
 */
interface HSApp {
  App: {
    /**
     * 获取应用程序实例
     * @returns 应用程序实例对象
     */
    getApp(): AppInstance;
  };
}

/**
 * 应用程序实例接口
 */
interface AppInstance {
  /**
   * 插件管理器
   */
  pluginManager: PluginManager;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 根据插件类型获取插件实例
   * @param pluginType 插件类型标识符
   * @returns 插件实例
   */
  getPlugin(pluginType: string): Plugin;
}

/**
 * 插件接口
 */
interface Plugin {
  /**
   * 插件处理器
   */
  handler: PluginHandler;
}

/**
 * 插件处理器接口
 */
interface PluginHandler {
  /**
   * 显示替换材料面板
   */
  showReplaceMaterialPanel(): void;
}

/**
 * 常量定义接口
 */
interface HSFPConstants {
  /**
   * 插件类型枚举
   */
  PluginType: {
    /**
     * 参数化屋顶插件类型
     */
    ParametricRoof: string;
  };
}

/**
 * HSApp 全局对象声明
 */
declare const HSApp: HSApp;

/**
 * HSFPConstants 全局常量声明
 */
declare const HSFPConstants: HSFPConstants;

/**
 * 点击事件处理函数
 * 用于触发参数化屋顶插件的材料替换面板
 */
declare function onClick(): void;

export { onClick, HSApp, HSFPConstants, AppInstance, PluginManager, Plugin, PluginHandler };