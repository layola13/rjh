/**
 * 3D建模器插件模块
 * 提供3D建模相关功能支持
 */

/**
 * 获取3D建模器实例
 * @returns Promise that resolves to the modeler instance
 */
export declare function getModeler(): Promise<Modeler>;

/**
 * 3D建模器实例接口
 * 封装了与3D建模器Worker通信的能力
 */
export interface Modeler {
  /**
   * 向建模器发送消息
   * @param message - 要发送的消息对象
   * @returns Promise that resolves with the response
   */
  postMessage(message: ModelerMessage): Promise<unknown>;
}

/**
 * 建模器消息接口
 */
export interface ModelerMessage {
  /**
   * 消息方法名称
   */
  method: string;
  
  /**
   * 可选的消息参数
   */
  [key: string]: unknown;
}

/**
 * 插件元数据接口
 */
export interface PluginMetadata {
  /**
   * 插件名称
   */
  name: string;
  
  /**
   * 插件描述
   */
  description: string;
  
  /**
   * 插件依赖列表
   */
  dependencies: string[];
}

/**
 * 3D建模器插件类
 * 继承自HSApp插件系统的IPlugin接口
 */
export declare class ThreeDModelerPlugin extends HSApp.Plugin.IPlugin {
  /**
   * 构造函数
   * 初始化插件元数据
   */
  constructor();

  /**
   * 插件激活时的回调
   * @param context - 插件上下文对象
   * @returns void or Promise<void>
   */
  onActive(context: unknown): void | Promise<void>;

  /**
   * 插件停用时的回调
   * 执行清理工作
   */
  onDeactive(): void;
}

/**
 * 全局扩展：在window.HSApp.Plugin上注册getModeler方法
 */
declare global {
  interface Window {
    HSApp: {
      Plugin: {
        /**
         * 插件基类接口
         */
        IPlugin: new (metadata: PluginMetadata) => any;
        
        /**
         * 注册插件到系统
         * @param id - 插件唯一标识符
         * @param plugin - 插件类构造函数
         * @param initializer - 插件初始化函数
         */
        registerPlugin(
          id: string,
          plugin: typeof ThreeDModelerPlugin,
          initializer: () => Promise<void>
        ): void;
        
        /**
         * 获取3D建模器实例（通过初始化器注入）
         */
        getModeler?: typeof getModeler;
      };
    };
  }
}

/**
 * 模块导出
 * 插件已注册到全局命名空间 "hsw.plugin.3dmodeler.Plugin"
 */
export {};