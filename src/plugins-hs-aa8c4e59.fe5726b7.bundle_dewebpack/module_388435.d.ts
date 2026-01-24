/**
 * BOM实体数据序列化/反序列化模块
 * 提供Entity、InstanceData和Parameter对象的导入导出功能
 */

/**
 * 参数序列化对象
 * 用于JSON传输的参数数据结构
 */
export interface SerializedParameter {
  /** 参数名称 */
  n: string;
  /** 参数值 */
  v: unknown;
  /** 参数类型标识 */
  t: string;
}

/**
 * 实例数据序列化对象
 * 包含实例ID及其关联的参数集合
 */
export interface SerializedInstanceData {
  /** 实例唯一标识符 */
  id: string;
  /** 参数列表 */
  parameters: SerializedParameter[];
}

/**
 * 实体类别信息
 * 描述实体的分类属性
 */
export interface CategoryInfo {
  [key: string]: unknown;
}

/**
 * 实体类型信息
 * 描述实体的类型元数据
 */
export interface TypeInfo {
  [key: string]: unknown;
}

/**
 * 实体序列化对象
 * 用于JSON传输的完整实体树结构
 */
export interface SerializedEntity {
  /** 实体前缀（可选） */
  prefix?: string;
  /** 子实体数组 */
  children: SerializedEntity[];
  /** 实体类别信息（可选） */
  category?: CategoryInfo;
  /** 实体类型信息 */
  type: TypeInfo;
  /** 实例数据（可选） */
  instance?: SerializedInstanceData;
}

/**
 * 将Parameter对象序列化为可传输格式
 * @param parameter - 要序列化的参数对象
 * @returns 序列化后的参数数据
 */
export function dumpParameter(parameter: Parameter): SerializedParameter;

/**
 * 将InstanceData对象序列化为可传输格式
 * @param instanceData - 要序列化的实例数据对象
 * @returns 序列化后的实例数据
 */
export function dumpInstanceData(instanceData: InstanceData): SerializedInstanceData;

/**
 * 将Entity对象序列化为可传输格式（递归处理子实体）
 * @param entity - 要序列化的实体对象
 * @returns 序列化后的实体数据
 */
export function dumpEntity(entity: Entity): SerializedEntity;

/**
 * 从序列化数据加载Parameter对象
 * @param serialized - 序列化的参数数据
 * @returns 重构的Parameter实例
 */
export function loadParameter(serialized: SerializedParameter): Parameter;

/**
 * 从序列化数据加载InstanceData对象
 * @param serialized - 序列化的实例数据
 * @returns 重构的InstanceData实例
 */
export function loadInstanceData(serialized: SerializedInstanceData): InstanceData;

/**
 * 从序列化数据加载Entity对象（递归处理子实体）
 * @param serialized - 序列化的实体数据
 * @returns 重构的Entity实例及其完整子树
 */
export function loadEntity(serialized: SerializedEntity): Entity;

/**
 * 参数类
 * 表示BOM实体的单个命名参数
 */
declare class Parameter {
  /**
   * 创建参数实例
   * @param name - 参数名称
   * @param value - 参数值
   * @param type - 参数类型标识
   */
  constructor(name: string, value: unknown, type: string);
  
  /** 参数名称 */
  readonly name: string;
  /** 参数值 */
  readonly value: unknown;
  /** 参数类型 */
  readonly type: string;
}

/**
 * 实例数据类
 * 存储实体实例的ID及其关联的参数集合
 */
declare class InstanceData {
  /**
   * 创建实例数据
   * @param id - 实例唯一标识符
   */
  constructor(id: string);
  
  /** 实例ID */
  readonly id: string;
  
  /** 参数映射表（键为参数名） */
  readonly parameters: Map<string, Parameter>;
  
  /**
   * 添加参数到实例
   * @param parameter - 要添加的参数对象
   */
  addParameter(parameter: Parameter): void;
}

/**
 * 实体类
 * BOM树结构的核心节点，支持层级结构和元数据
 */
declare class Entity {
  /** 实体前缀 */
  prefix: string;
  
  /** 子实体列表 */
  readonly children: Entity[];
  
  /** 实体类别信息 */
  category?: CategoryInfo;
  
  /** 实体类型信息 */
  type: TypeInfo;
  
  /** 关联的实例数据 */
  instance?: InstanceData;
  
  /**
   * 设置实体前缀
   * @param prefix - 前缀字符串
   */
  setPrefix(prefix: string): void;
  
  /**
   * 设置实例数据
   * @param data - 实例数据对象
   */
  setInstanceData(data: InstanceData): void;
  
  /**
   * 设置实体类型
   * @param type - 类型信息对象
   */
  setType(type: TypeInfo): void;
  
  /**
   * 设置实体类别
   * @param category - 类别信息对象
   */
  setCategory(category: CategoryInfo): void;
  
  /**
   * 添加子实体
   * @param child - 子实体对象
   */
  addChild(child: Entity): void;
}

/**
 * BOM数据容器
 * 管理顶层实体根节点集合
 */
declare class BomData {
  /**
   * 获取所有根级实体
   * @returns 根实体数组
   */
  getRootEntities(): Entity[];
}

/**
 * 全局窗口扩展
 * 在浏览器环境中注入BOM数据导出功能
 */
declare global {
  interface Window {
    /**
     * 将BOM数据导出为JSON可序列化格式
     * @param bomData - BOM数据容器
     * @returns 序列化的实体树数组
     */
    dumpBomData(bomData: BomData): SerializedEntity[];
  }
}

export {};