/**
 * 隐蔽工程数据提供者模块
 * 用于收集和处理场景中的隐蔽工程实体数据
 */

declare module 'concealedWorkProvider' {
  import { HSCWSDK } from 'hscw-sdk';
  import { PromiseEntities } from 'promise-entities';
  import { CWEntity } from 'cw-entity';

  /**
   * 场景图层接口
   */
  export interface FloorplanLayer {
    /** 隐蔽工程数据 */
    concealedWork?: unknown;
  }

  /**
   * 场景对象接口
   */
  export interface FloorplanScene {
    /**
     * 遍历场景中的每个图层
     * @param callback - 对每个图层执行的回调函数
     */
    forEachLayer(callback: (layer: FloorplanLayer) => void): void;
  }

  /**
   * 平面图应用接口
   */
  export interface FloorplanApp {
    /** 场景对象 */
    scene: FloorplanScene;
  }

  /**
   * 应用程序接口
   */
  export interface AppInstance {
    /** 平面图应用 */
    floorplan: FloorplanApp;
  }

  /**
   * 全局应用程序接口
   */
  export interface HSApp {
    App: {
      /**
       * 获取应用程序实例
       * @returns 应用程序实例
       */
      getApp(): AppInstance;
    };
  }

  /**
   * 资源管理器接口
   */
  export interface ResourceManager {
    /**
     * 获取本地化字符串
     * @param key - 字符串键值
     * @returns 本地化后的字符串
     */
    getString(key: string): string;
  }

  /**
   * BOM4 装饰器类型定义
   */
  export type Bom4Decorator = HSCWSDK.Bom4Decorator;

  /**
   * 隐蔽工程BOM4数据接口
   */
  export interface CWBom4Data {
    [key: string]: unknown;
  }

  /**
   * 数据提供者配置接口
   */
  export interface ProviderConfig {
    /** 提供者类型标识 */
    type: 'concealedWork';
  }

  /**
   * 数据提供者实现接口
   */
  export interface ProviderImplementation {
    /**
     * 收集隐蔽工程实体
     * @returns Promise 包装的实体集合
     */
    collectEntity: () => PromiseEntities<CWEntity>;
  }

  /**
   * 注册数据提供者
   * @param config - 提供者配置
   * @param implementation - 提供者实现
   */
  export function registerProvider(
    config: ProviderConfig,
    implementation: ProviderImplementation
  ): void;

  /**
   * 收集场景中所有隐蔽工程实体
   * @returns Promise 包装的隐蔽工程实体数组
   */
  export function collectEntity(): PromiseEntities<CWEntity>;

  /**
   * 将 Promise 数组包装为统一的 Promise 实体集合
   * @param entities - 实体数组
   * @returns Promise 包装的实体集合
   */
  export function wrapPromiseEntities<T>(entities: T[]): PromiseEntities<T>;

  // 全局声明
  global {
    const HSApp: HSApp;
    const ResourceManager: ResourceManager;
  }
}