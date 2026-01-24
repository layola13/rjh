/**
 * 应用参数到所有窗口命令
 * 
 * 该模块提供了一个命令类，用于将模板实体的参数应用到场景中所有相同类型的窗口实体（排除自身）。
 */

import { HSApp } from './518193';

declare namespace ApplyParamsToAllWindowCommand {
  /**
   * 窗口实体接口
   * 表示场景中的窗口对象
   */
  interface WindowEntity {
    /** 实体唯一标识符 */
    id: string | number;
    
    /** 查找标识符，用于匹配同类型实体 */
    seekId: string | number;
  }

  /**
   * 事务管理器接口
   * 负责处理命令请求的提交和执行
   */
  interface TransactionManager {
    /**
     * 创建事务请求
     * @param requestType - 请求类型（如 ApplyParamsToAllWindow）
     * @param args - 请求参数数组
     * @returns 创建的请求对象
     */
    createRequest(requestType: string, args: unknown[]): unknown;
    
    /**
     * 提交事务请求
     * @param request - 要提交的请求对象
     */
    commit(request: unknown): void;
  }

  /**
   * 图层接口
   * 表示场景中的一个图层
   */
  interface Layer {
    /**
     * 遍历图层中的所有内容
     * @param callback - 对每个内容执行的回调函数
     */
    forEachContent(callback: (content: WindowEntity) => void): void;
  }

  /**
   * 场景接口
   * 表示户型图场景
   */
  interface Scene {
    /**
     * 遍历场景中的所有图层
     * @param callback - 对每个图层执行的回调函数
     */
    forEachLayer(callback: (layer: Layer) => void): void;
  }

  /**
   * 户型图应用接口
   */
  interface FloorplanApp {
    /** 场景对象 */
    scene: Scene;
  }

  /**
   * 应用程序接口
   */
  interface Application {
    /** 事务管理器实例 */
    transManager: TransactionManager;
    
    /** 户型图应用实例 */
    floorplan: FloorplanApp;
  }
}

/**
 * 应用参数到所有窗口命令类
 * 
 * 该命令用于将模板窗口实体的参数（如离地高度）应用到场景中所有相同类型的窗口实体。
 * 继承自 HSApp.Cmd.Command 基类。
 * 
 * @example
 *