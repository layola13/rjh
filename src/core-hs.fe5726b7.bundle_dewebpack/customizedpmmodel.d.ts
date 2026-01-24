/**
 * CustomizedPM模型类
 * 用于处理自定义PM（Product Model）实例的视图模型创建和图形数据生成
 */

import { BaseObject } from './BaseObject';
import { CustomizedPMInstanceModel } from './CustomizedPMInstanceModel';
import { Entity } from './Entity';
import { Context } from './Context';

/**
 * 图形对象数据结构
 */
export interface GraphicsObject {
  // 具体属性根据实际使用情况定义
  [key: string]: unknown;
}

/**
 * 网格定义数据结构
 */
export interface MeshDefinition {
  // 具体属性根据实际使用情况定义
  [key: string]: unknown;
}

/**
 * 边缘信息数据结构
 */
export interface EdgeInfo {
  // 具体属性根据实际使用情况定义
  [key: string]: unknown;
}

/**
 * 异步图形数据结构
 */
export interface GraphicsDataAsync {
  /** 图形对象列表 */
  objects: GraphicsObject[];
  /** 网格定义列表 */
  meshDefs: MeshDefinition[];
  /** 边缘信息列表 */
  edgeInfos: EdgeInfo[];
}

/**
 * 同步图形数据结构
 */
export interface GraphicsData {
  /** 图形对象列表 */
  objects: GraphicsObject[];
  /** 网格定义列表 */
  meshDefs: MeshDefinition[];
}

/**
 * 子节点添加事件数据
 */
export interface ChildAddedEventData {
  /** 事件相关数据 */
  data: {
    /** 被添加的实体 */
    entity: Entity | null;
  };
}

/**
 * 子节点移除事件数据
 */
export interface ChildRemovedEventData {
  /** 事件相关数据 */
  data: {
    /** 被移除的实体ID */
    entityId: string;
  };
}

/**
 * 自定义PM模型类
 * 继承自BaseObject，用于管理自定义产品模型的视图层表示
 */
export declare class CustomizedPMModel extends BaseObject {
  /**
   * 构造函数
   * @param entity - 关联的实体对象
   * @param context - 上下文对象
   * @param parent - 父级对象
   */
  constructor(entity: Entity, context: Context, parent?: BaseObject);

  /**
   * 创建视图模型
   * 根据实体类型创建对应的视图模型实例
   * @param entity - 需要创建视图模型的实体
   * @returns 创建的视图模型实例，如果不是CustomizedPMInstanceModel类型则返回父类方法结果
   */
  createViewModel(entity: Entity): CustomizedPMInstanceModel | BaseObject | undefined;

  /**
   * 初始化方法
   * 遍历实体的所有子元素并创建对应的视图模型
   */
  onInit(): void;

  /**
   * 子节点添加事件处理
   * 当有新的子节点被添加时触发，创建对应的视图模型并标记几何数据为脏
   * @param event - 子节点添加事件数据
   */
  onChildAdded(event: ChildAddedEventData): void;

  /**
   * 子节点移除事件处理
   * 当子节点被移除时触发，标记几何数据为脏
   * @param event - 子节点移除事件数据
   */
  onChildRemoved(event: ChildRemovedEventData): void;

  /**
   * 异步生成图形数据
   * @returns Promise，resolve为包含图形对象、网格定义和边缘信息的数据结构
   */
  toGraphicsDataAsync(): Promise<GraphicsDataAsync>;

  /**
   * 同步生成图形数据
   * @returns 包含图形对象和网格定义的数据结构
   */
  toGraphicsData(): GraphicsData;

  /**
   * 清理方法
   * 执行清理操作，释放资源
   */
  onCleanup(): void;
}