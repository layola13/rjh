/**
 * 3D渲染核心模块
 * 
 * 提供3D场景渲染、模型加载、批处理优化等功能。
 * 支持多种3D模型格式（OBJ、GLTF、二进制OBJ等）的加载和渲染。
 * 
 * @module module_510571
 */

/**
 * 不可绘制网格组件
 * 用于标记不需要渲染的网格对象
 */
export declare class UndrawableMeshComponent {
  constructor();
}

/**
 * 批处理组件
 * 用于优化多个相似对象的渲染性能，通过合并绘制调用减少GPU开销
 */
export declare class BatchingComponent {
  constructor();
}

/**
 * 剔除模式枚举
 */
export declare enum CullMode {
  None = 0,
  Front = 1,
  Back = 2,
}

/**
 * 批处理节点配置选项
 */
export interface BatchingNodeOptions {
  /** 最大批处理对象数量 */
  maxBatchSize?: number;
  /** 是否启用动态批处理 */
  dynamicBatching?: boolean;
  /** 材质合并策略 */
  materialMergeStrategy?: 'strict' | 'loose';
}

/**
 * 3D场景节点
 */
export interface SceneNode {
  /** 节点唯一标识 */
  id: string;
  /** 节点名称 */
  name?: string;
  /** 子节点列表 */
  children?: SceneNode[];
  /** 变换矩阵 */
  transform?: Float32Array;
}

/**
 * 创建批处理节点
 * 
 * @param options - 批处理配置选项
 * @returns 批处理场景节点
 * 
 * @example
 *