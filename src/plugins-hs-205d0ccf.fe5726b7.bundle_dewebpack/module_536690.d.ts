import { Handler } from './Handler';
import { HSCore } from './HSCore';

declare namespace HSApp.Plugin {
  /**
   * 基础插件接口
   * 所有插件必须实现此接口
   */
  interface IPlugin {
    /** 插件名称 */
    name: string;
    /** 插件描述 */
    description: string;
    /** 插件依赖列表 */
    dependencies: string[];
    
    /**
     * 插件激活时的回调
     * @param context - 插件上下文，包含应用实例
     */
    onActive(context: IPluginContext): void;
  }

  /**
   * 插件上下文接口
   */
  interface IPluginContext {
    /** 应用实例 */
    app: any;
  }

  /**
   * 注册插件到系统
   * @param pluginType - 插件类型标识
   * @param pluginClass - 插件类构造函数
   */
  function registerPlugin(pluginType: string, pluginClass: new () => IPlugin): void;
}

declare namespace HSFPConstants {
  /**
   * 插件类型枚举
   */
  enum PluginType {
    /** 调整大小部件插件 */
    ResizeWidget = 'ResizeWidget'
  }
}

/**
 * 调整大小部件插件配置接口
 */
interface ResizeWidgetConfig {
  /** 调整大小部件变化信号 */
  signalResizeWidgetChanged: HSCore.Util.Signal<ResizeWidgetPlugin>;
}

/**
 * 视图更新参数接口
 */
interface ViewUpdateParams {
  /** 视图相关参数 */
  [key: string]: any;
}

/**
 * 尺寸信息接口
 */
interface SizeInfo {
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 其他尺寸相关属性 */
  [key: string]: any;
}

/**
 * 调整大小部件插件
 * 提供2D/3D子视图和切换器功能
 * 
 * @example
 *