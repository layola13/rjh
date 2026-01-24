/**
 * 粘贴内容事务类型声明
 * 负责处理复制粘贴操作中的内容添加、撤销和重做
 */

import { HSCore } from '../path/to/HSCore';
import { HSCatalog } from '../path/to/HSCatalog';
import { HSFPConstants } from '../path/to/HSFPConstants';

/**
 * 粘贴内容构造参数
 */
export interface PasteContentOptions {
  /** 要粘贴的数据内容 */
  dataContent: any;
  
  /** 当前选中的内容 */
  selectedContent?: {
    contents?: Record<string, any>;
    [key: string]: any;
  };
  
  /** 内容的JSON序列化数据 */
  contentsJSON: ContentJSON;
  
  /** 楼层平面图实例 */
  floorplan: any;
  
  /** 产品映射表 */
  productsMap?: Map<string, any>;
  
  /** 粘贴位置坐标 */
  position?: Position;
  
  /** 是否按下Alt键（影响粘贴行为） */
  altKey?: boolean;
  
  /** 目标实体 */
  entity?: any;
  
  /** 旋转角度 */
  rotation?: number;
}

/**
 * 三维坐标位置
 */
export interface Position {
  x: number;
  y: number;
  z: number;
}

/**
 * 内容JSON数据结构
 */
export interface ContentJSON {
  /** 实体数据数组 */
  data: Array<{ id: string; [key: string]: any }>;
  
  /** 状态数据数组 */
  states: Array<{ id: string; [key: string]: any }>;
  
  /** 约束数据数组 */
  constraints: Array<{ id: string; [key: string]: any }>;
  
  /** 材质数据数组（可选） */
  materials?: Array<{ id: string; [key: string]: any }>;
  
  /** 产品数据数组 */
  products: Array<{ 
    id: string; 
    productType?: string;
    [key: string]: any;
  }>;
}

/**
 * 内容生成上下文
 */
export interface ContentContext {
  /** 实体数据映射 */
  data: Record<string, any>;
  
  /** 状态原始数据映射 */
  statesData: Record<string, any>;
  
  /** 约束原始数据映射 */
  constraintsData: Map<string, any>;
  
  /** 材质原始数据映射 */
  materialsData: Map<string, any>;
  
  /** 产品映射表 */
  productsMap: Map<string, any>;
  
  /** 实体实例映射 */
  entities: Record<string, any>;
  
  /** 材质实例映射 */
  materials: Map<string, any>;
  
  /** 状态实例映射 */
  states: Record<string, any>;
  
  /** 约束实例映射 */
  constraints: Record<string, any>;
  
  /** 实体ID生成器 */
  idGenerator: any;
  
  /** 材质ID生成器 */
  materialIdGenerator: any;
  
  /** 状态ID生成器 */
  stateIdGenerator: any;
  
  /** 约束ID生成器 */
  constraintIdGenerator: any;
}

/**
 * 内容规格（用于添加/移除操作）
 */
export interface ContentSpec {
  /** 内容实体 */
  content: any;
  
  /** 宿主对象 */
  host: any;
  
  /** 父级容器 */
  parent: any;
}

/**
 * 粘贴内容事务类
 * 继承自HSCore状态请求基类，实现内容的粘贴、撤销和重做
 */
export default class PasteContentTransaction extends HSCore.Transaction.Common.StateRequest {
  /** 要粘贴的原始数据内容 */
  protected dataContent: any;
  
  /** 当前选中的内容对象 */
  protected selectedContent: { contents?: Record<string, any>; [key: string]: any };
  
  /** 选中内容的子内容数组 */
  protected childContents: any[];
  
  /** 内容的JSON序列化数据 */
  protected contentsJSON: ContentJSON;
  
  /** 关联的楼层平面图实例 */
  protected floorplan: any;
  
  /** 产品元数据映射表 */
  protected productsMap: Map<string, any>;
  
  /** 粘贴的目标位置 */
  protected position?: Position;
  
  /** 是否按下Alt键 */
  protected altKey: boolean;
  
  /** 粘贴后生成的内容实例 */
  protected pasteContent: any | null;
  
  /** 目标实体 */
  protected entity?: any;
  
  /** 旋转角度 */
  protected rotation?: number;
  
  /** 内容规格（用于PAssembly类型的移除操作） */
  protected contentSpec?: ContentSpec;

  /**
   * 构造函数
   * @param options 粘贴内容选项参数
   */
  constructor(options: PasteContentOptions);

  /**
   * 生成内容加载上下文
   * 从JSON数据构建完整的内容上下文，包括实体、状态、约束、材质和产品信息
   * @returns 生成的上下文对象，如果contentsJSON不存在则返回null
   */
  protected generateContext(): ContentContext | null;

  /**
   * 提交事务（执行粘贴操作）
   * 1. 生成上下文并从dump数据加载实体
   * 2. 应用位置和旋转
   * 3. 添加内容到场景
   * 4. 处理子内容的关联
   * 5. 针对特殊类型（PAssembly/CornerWindow）进行额外处理
   * @returns 粘贴后的内容实体
   */
  onCommit(): any;

  /**
   * 检查是否可以处理字段事务
   * @returns 总是返回true
   */
  canTransactField(): boolean;

  /**
   * 撤销粘贴操作
   * 1. 移除粘贴的内容（标记为已移除或调用移除方法）
   * 2. 如果按下Alt键，将子内容重新分配给原选中内容
   * 3. 调用父类撤销逻辑
   */
  onUndo(): void;

  /**
   * 重做粘贴操作
   * 1. 如果存在contentSpec，重新添加PAssembly
   * 2. 如果按下Alt键，将子内容重新分配给粘贴内容
   * 3. 调用父类重做逻辑
   */
  onRedo(): void;

  /**
   * 将内容添加到当前活动图层
   * 如果内容已存在于图层中，先移除再添加
   * @param content 要添加的内容实体
   */
  protected addContentToActiveLayer(content: any): void;

  /**
   * 递归添加内容及其所有成员
   * @param content 要添加的内容实体
   */
  protected addContent(content: any): void;

  /**
   * 获取内容规格对象
   * 包含内容本身、宿主和父级图层信息
   * @param content 内容实体
   * @returns 内容规格对象
   */
  protected getContentSpec(content: any): ContentSpec;

  /**
   * 获取事务描述文本
   * @returns 返回"粘贴物品"
   */
  getDescription(): string;

  /**
   * 获取事务分类
   * @returns 返回内容操作分类常量
   */
  getCategory(): string;
}