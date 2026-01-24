/**
 * 重置图层索引请求
 * 用于调整图层在图层链表中的位置，重新建立图层间的前后关系
 */

import { HSCore } from './HSCore';

/**
 * 图层对象接口
 */
interface Layer {
  /** 前一个图层 */
  prev: Layer | null;
  /** 后一个图层 */
  next: Layer | null;
  /** 房间构建器 */
  roomBuilder: RoomBuilder;
  /** 标记位置为脏数据 */
  dirtyPosition(): void;
}

/**
 * 房间构建器接口
 */
interface RoomBuilder {
  /**
   * 构建房间几何体
   * @param options - 构建选项
   */
  build(options: BuildOptions): void;
}

/**
 * 构建选项
 */
interface BuildOptions {
  /** 楼板选项 */
  slabOption: SlabOption;
}

/**
 * 楼板选项
 */
interface SlabOption {
  /** 清理向上构建 */
  cleanBuildUp: boolean;
  /** 清理向下构建 */
  cleanBuildDown: boolean;
}

/**
 * 场景对象接口
 */
interface Scene {
  /** 根图层 */
  rootLayer: Layer;
  /** 天花板图层 */
  ceilingLayer: Layer;
  /**
   * 遍历所有图层
   * @param callback - 回调函数
   */
  forEachLayer(callback: (layer: Layer) => void): void;
}

/**
 * 平面图对象接口
 */
interface Floorplan {
  /** 场景对象 */
  scene: Scene;
}

/**
 * 应用程序接口
 */
interface App {
  /** 平面图对象 */
  floorplan: Floorplan;
}

/**
 * 全局HSApp命名空间
 */
declare global {
  namespace HSApp {
    class App {
      static getApp(): App;
    }
  }
}

/**
 * 重置图层索引请求类
 * 继承自状态请求基类，用于处理图层顺序调整的事务操作
 */
export declare class ResetLayerIndexRequest extends HSCore.Transaction.Common.StateRequest {
  /** 目标图层（需要移动的图层） */
  targetLayer: Layer;

  /** 新的前置图层（私有） */
  private _newPreLayer: Layer | null;

  /** 新的后置图层（私有） */
  private _newNextLayer: Layer | null;

  /** 平面图引用 */
  floorplan: Floorplan;

  /** 场景引用 */
  scene: Scene;

  /** 目标图层的原前置图层 */
  targetPreLayer: Layer | null;

  /** 目标图层的原后置图层 */
  targetNextLayer: Layer | null;

  /** 新的前置图层（计算后） */
  newPreLayer: Layer | null;

  /** 新的后置图层（计算后） */
  newNextLayer: Layer | null;

  /** 需要重置的根图层 */
  resetRootLayer: Layer | undefined;

  /** 需要重置天花板的图层缓存 */
  resetCeilingLayerCache: Layer[];

  /** 需要重置地板的图层缓存 */
  resetFloorLayerCache: Layer[];

  /** 排序后的图层列表 */
  sortedLayers: Layer[];

  /**
   * 构造函数
   * @param targetLayer - 需要移动的目标图层
   * @param newPreLayer - 新的前置图层（可选）
   * @param newNextLayer - 新的后置图层（可选）
   */
  constructor(
    targetLayer: Layer,
    newPreLayer: Layer | null,
    newNextLayer: Layer | null
  );

  /**
   * 清理图层的天花板和地板几何体
   * 标记受影响的图层以便后续重建
   */
  clean(): void;

  /**
   * 重置图层间的前后关系
   * 更新链表指针，建立新的图层顺序
   */
  resetRelationship(): void;

  /**
   * 重建受影响图层的几何体
   * 包括楼板、贴图、跨层开口等
   */
  build(): void;

  /**
   * 撤销操作回调
   * 恢复图层位置并标记为脏数据
   */
  onUndo(): void;

  /**
   * 重做操作回调
   * 重新应用图层位置并标记为脏数据
   */
  onRedo(): void;

  /**
   * 检查是否可以进行字段事务
   * @returns 始终返回true
   */
  canTransactField(): boolean;

  /**
   * 提交事务时的回调
   * 执行清理、重置关系和重建操作
   */
  onCommit(): void;
}

/**
 * 图层工具函数命名空间
 */
declare namespace LayerUtils {
  /**
   * 清理图层天花板几何体
   * @param layer - 目标图层
   */
  function cleanLayerCeiling(layer: Layer): void;

  /**
   * 清理图层地板几何体
   * @param layer - 目标图层
   */
  function cleanLayerFloor(layer: Layer): void;
}