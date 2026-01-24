/**
 * 窗台石参数实体模块
 * 用于处理窗户窗台石的参数和实例数据
 */

import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';

/**
 * 类别信息接口
 * 定义窗台石的分类元数据
 */
export interface CategoryInfo {
  /** SeekBIM唯一标识符 */
  seekId: string;
  /** 阿里模型ID */
  aliModelId: string;
  /** 分类类型UUID */
  categoryType: string;
  /** 显示名称 */
  displayName: string;
  /** 纹理URL */
  textureUrl: string;
}

/**
 * 材质元数据接口
 * 定义建筑产品的材质信息
 */
export interface BuildingProductMeta {
  /** 材质ID */
  id: string;
  /** 材质名称 */
  name?: string;
  /** 其他元数据属性 */
  [key: string]: unknown;
}

/**
 * 材质信息接口
 * 用于存储从元数据生成的材质信息
 */
export interface MaterialInfo {
  /** 材质ID */
  id: string;
  /** 材质名称 */
  name?: string;
  /** 其他材质属性 */
  [key: string]: unknown;
}

/**
 * 窗台石位置类型
 * - inner: 内窗台
 * - outer: 外窗台
 * - both: 内外双窗台
 */
export type WindowSillSide = 'inner' | 'outer' | 'both';

/**
 * 源对象属性映射接口
 * 定义源实体的属性键值对
 */
export interface SourceProperties {
  /** 获取属性值 */
  get<T = unknown>(key: string): T | undefined;
  /** 设置属性值 */
  set<T = unknown>(key: string, value: T): void;
}

/**
 * 源实体接口
 * 表示父级窗户实体的数据结构
 */
export interface ParentSource {
  /** 实体唯一标识符 */
  id: string;
  /** 实体属性集合 */
  properties: SourceProperties;
  /** 其他源实体属性 */
  [key: string]: unknown;
}

/**
 * 父实体实例接口
 * 定义父实体的实例数据访问方法
 */
export interface ParentEntityInstance {
  /**
   * 获取实例参数
   * @param name - 参数名称
   * @returns 参数对象
   */
  getParameter(name: string): Parameter;
}

/**
 * 父实体接口
 * 表示窗台石所属的父窗户实体
 */
export interface ParentEntity {
  /** 父实体实例 */
  instance: ParentEntityInstance;
  /** 其他父实体属性 */
  [key: string]: unknown;
}

/**
 * 窗台石参数实体类
 * 继承自AcceptEntity，负责构建窗台石的实体数据和子实体
 * 
 * @remarks
 * 该类用于处理窗户上的窗台石构件，根据窗户的尺寸和配置信息
 * 自动计算窗台石的面积、长度、宽度等参数。支持内窗台、外窗台
 * 以及双窗台三种配置。
 * 
 * @example
 *