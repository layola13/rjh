/**
 * 删除图层请求类
 * 用于处理楼层平面图中图层的删除操作，包括撤销/重做支持
 */

import { HSCore } from './HSCore';

/**
 * 代理对象的撤销/重做数据接口
 */
interface ProxyUndoRedoData {
  /** 准备重做操作 */
  prepareRedo(): void;
}

/**
 * 代理对象接口
 */
interface ProxyObject {
  /**
   * 准备撤销数据
   * @param content - 内容对象
   * @returns 撤销/重做数据对象，如果不需要则返回null
   */
  prepareUndoData(content: unknown): ProxyUndoRedoData | null;
  
  /**
   * 从楼层平面图中移除
   * @param content - 要移除的内容对象
   */
  removeFromFloorplan(content: unknown): void;
}

/**
 * 图层内容项接口
 */
interface LayerContent {
  /**
   * 获取关联的代理对象
   * @returns 代理对象实例，如果不存在则返回null
   */
  getProxyObject(): ProxyObject | null;
}

/**
 * 楼板集合接口
 */
interface FloorSlabs {
  [key: string]: unknown;
}

/**
 * 房间构建器接口
 */
interface RoomBuilder {
  /**
   * 构建房间
   * @param options - 构建选项
   */
  build(options?: {
    slabOption?: {
      cleanBuildUp?: boolean;
    };
  }): void;
}

/**
 * 图层接口
 */
interface Layer {
  /** 上一个图层 */
  prev: Layer | null;
  
  /** 下一个图层 */
  next: Layer | null;
  
  /** 楼板集合 */
  floorSlabs: FloorSlabs;
  
  /** 房间构建器 */
  roomBuilder: RoomBuilder;
  
  /**
   * 遍历图层中的所有内容
   * @param callback - 对每个内容项执行的回调函数
   */
  forEachContent(callback: (content: LayerContent) => void): void;
  
  /**
   * 标记位置为脏状态（需要重新计算）
   */
  dirtyPosition(): void;
}

/**
 * 天花板图层接口
 */
interface CeilingLayer extends Layer {
  /** 天花板图层的楼板集合 */
  floorSlabs: FloorSlabs;
}

/**
 * 场景接口
 */
interface Scene {
  /** 根图层（第一层，不可删除） */
  rootLayer: Layer;
  
  /** 最后一个图层 */
  lastLayer: Layer;
  
  /** 当前激活的图层 */
  activeLayer: Layer;
  
  /** 天花板图层 */
  ceilingLayer: CeilingLayer;
  
  /**
   * 移除指定图层
   * @param layer - 要移除的图层
   */
  removeLayer(layer: Layer): void;
}

/**
 * 楼层平面图接口
 */
interface Floorplan {
  /** 场景对象 */
  scene: Scene;
}

/**
 * 应用实例接口
 */
interface AppInstance {
  /** 楼层平面图对象 */
  floorplan: Floorplan;
}

/**
 * 全局应用对象接口
 */
interface HSApp {
  App: {
    /**
     * 获取应用实例
     * @returns 应用实例
     */
    getApp(): AppInstance;
  };
}

declare const HSApp: HSApp;

/**
 * 删除图层请求类
 * 继承自状态请求基类，实现图层删除的完整流程
 * 
 * @remarks
 * - 自动处理图层链表的重新连接
 * - 清理图层中的所有内容对象
 * - 支持撤销/重做操作
 * - 自动重建相邻图层的房间结构
 * - 根图层（一楼）不可删除
 */
export declare class DeleteLayerRequest extends HSCore.Transaction.Common.StateRequest {
  /** 要删除的图层 */
  private _layer: Layer;
  
  /** 存储代理对象的撤销/重做数据集合 */
  proxyUndoRedoObjs: Set<ProxyUndoRedoData>;
  
  /**
   * 构造函数
   * @param layer - 要删除的图层对象
   */
  constructor(layer: Layer);
  
  /**
   * 执行删除图层的核心逻辑
   * 
   * @remarks
   * 执行步骤：
   * 1. 检查是否为根图层（不可删除）
   * 2. 遍历并清理图层中的所有内容对象
   * 3. 重新连接前后图层的链表关系
   * 4. 处理天花板图层的楼板数据
   * 5. 重建相邻图层的房间结构
   * 6. 更新相关图层的位置状态
   */
  doRequest(): void;
  
  /**
   * 提交请求并执行操作
   * 
   * @param args - 可选参数数组
   */
  onCommit(args?: unknown[]): void;
  
  /**
   * 判断是否可以进行事务字段操作
   * 
   * @returns 始终返回true，表示支持事务
   */
  canTransactField(): boolean;
}