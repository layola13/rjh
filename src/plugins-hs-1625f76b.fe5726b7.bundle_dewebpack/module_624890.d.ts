/**
 * 角窗创建事务请求类型定义
 * @module CornerFlatWindowTransaction
 */

import { CompositeRequest } from 'HSCore.Transaction.Common';
import { Model } from 'HSCore.Model';

/**
 * 角窗元数据接口
 */
interface CornerFlatWindowMeta {
  /**
   * 克隆当前元数据
   */
  clone(): CornerFlatWindowMeta;
  
  /**
   * 用户自由数据
   */
  userFreeData: {
    /**
     * 子模型数据
     */
    models?: unknown[];
    [key: string]: unknown;
  };
  
  [key: string]: unknown;
}

/**
 * 角窗规格配置接口
 */
interface CornerFlatWindowSpec {
  /**
   * 角窗实例
   */
  cornerFlatWindow: HSCore.Model.CornerFlatWindow;
  
  /**
   * 宿主对象
   */
  host: unknown;
  
  /**
   * 父级图层
   */
  parent: HSCore.Scene.Layer;
  
  /**
   * 子模型集合
   */
  models: unknown[];
  
  [key: string]: unknown;
}

/**
 * 角窗模型命名空间
 */
declare namespace HSCore.Model {
  /**
   * 角窗模型类
   */
  class CornerFlatWindow {
    /**
     * 创建角窗实例
     * @param meta - 角窗元数据
     */
    static create(meta: CornerFlatWindowMeta): CornerFlatWindow;
    
    /**
     * 创建子模型
     * @param modelsData - 子模型数据数组
     * @returns 创建的子模型集合
     */
    createChildModels(modelsData: unknown[]): unknown[];
  }
}

/**
 * 场景图层命名空间
 */
declare namespace HSCore.Scene {
  /**
   * 图层接口
   */
  interface Layer {
    [key: string]: unknown;
  }
}

/**
 * 工具函数命名空间
 */
declare namespace HSCore.Util.Content {
  /**
   * 获取角窗规格配置
   * @param cornerFlatWindow - 角窗实例
   * @returns 角窗规格配置对象
   */
  function getCornerFlatWindowSpec(
    cornerFlatWindow: HSCore.Model.CornerFlatWindow
  ): CornerFlatWindowSpec;
  
  /**
   * 添加角窗到场景
   * @param spec - 角窗规格配置
   */
  function addCornerFlatWindow(spec: CornerFlatWindowSpec): void;
  
  /**
   * 从场景移除角窗
   * @param cornerFlatWindow - 要移除的角窗实例
   */
  function removeCornerFlatWindow(cornerFlatWindow: HSCore.Model.CornerFlatWindow): void;
}

/**
 * 应用程序命名空间
 */
declare namespace HSApp.App {
  /**
   * 获取应用实例
   */
  function getApp(): {
    /**
     * 平面图管理器
     */
    floorplan: {
      /**
       * 场景对象
       */
      scene: {
        /**
         * 当前激活的图层
         */
        activeLayer: HSCore.Scene.Layer;
      };
    };
  };
}

/**
 * 角窗创建事务请求类
 * @extends CompositeRequest
 */
declare class CornerFlatWindowCreateRequest extends CompositeRequest {
  /**
   * 角窗元数据
   */
  private _meta: CornerFlatWindowMeta;
  
  /**
   * 宿主对象引用
   */
  private _host: unknown;
  
  /**
   * 角窗规格配置（用于撤销/重做）
   */
  private _spec: CornerFlatWindowSpec;
  
  /**
   * 构造函数
   * @param meta - 角窗元数据
   * @param param1 - 保留参数
   * @param param2 - 保留参数
   * @param param3 - 保留参数
   * @param host - 宿主对象
   */
  constructor(
    meta: CornerFlatWindowMeta,
    param1: unknown,
    param2: unknown,
    param3: unknown,
    host: unknown
  );
  
  /**
   * 提交事务：创建并添加角窗到场景
   * @returns 创建的角窗实例
   */
  onCommit(): HSCore.Model.CornerFlatWindow;
  
  /**
   * 撤销事务：从场景移除角窗
   */
  onUndo(): void;
  
  /**
   * 重做事务：重新添加角窗到场景
   */
  onRedo(): void;
}

export default CornerFlatWindowCreateRequest;