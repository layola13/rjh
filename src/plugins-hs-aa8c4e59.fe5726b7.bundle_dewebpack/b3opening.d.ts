/**
 * B3Opening 模块
 * 处理建筑开口元素（门、窗等）的BOM3数据构建
 * @module B3Opening
 */

import { B3Entity, IEntityContext } from './B3Entity';
import { B3Pocket } from './B3Pocket';
import { B3ParametricPocket } from './B3ParametricPocket';
import { B3Face } from './B3Face';
import { B3Stone } from './B3Stone';
import { Entity } from './Entity';

/**
 * 实体类别信息
 */
interface ICategoryInfo {
  /** 唯一标识符 */
  seekId: string;
  /** 阿里模型ID */
  aliModelId: string;
  /** 类别类型ID */
  categoryType: string;
  /** 显示名称 */
  displayName: string;
  /** 纹理URL */
  textureUrl: string;
  /** 属性ID（可选，用于材料数量计算） */
  attributeId?: string;
}

/**
 * 材料信息
 */
interface IMaterialInfo {
  /** 材料类别 */
  category?: ICategoryInfo;
  /** 其他材料属性 */
  [key: string]: unknown;
}

/**
 * 铺装信息
 */
interface IPaveInfo {
  /** 材料列表 */
  material: IMaterialInfo[];
}

/**
 * 区域信息
 */
interface IRegion {
  /** 铺装信息 */
  paveInfo?: IPaveInfo;
}

/**
 * 草图信息
 */
interface ISketch {
  /** 区域列表 */
  regions: IRegion[];
}

/**
 * 2D数据结构
 */
interface I2DData {
  /** 草图列表 */
  sketches: ISketch[];
}

/**
 * 实体实例信息
 */
interface IEntityInstance {
  /** 实例ID */
  id: string;
  /** 尺寸数组 */
  size?: number[];
}

/**
 * BOM3实体信息
 */
interface IBom3Entity {
  /** 实体实例 */
  instance: IEntityInstance;
  /** 类别信息 */
  category?: ICategoryInfo;
}

/**
 * 面数据
 */
interface IFaceData {
  /** 实体信息 */
  entity: IBom3Entity;
  /** 2D数据 */
  "2D"?: I2DData;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 凹槽/口袋数据
 */
interface IPocketData {
  /** 实体信息 */
  entity: IBom3Entity;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 石材/窗台石数据
 */
interface IStoneData {
  /** 实体信息 */
  entity: IBom3Entity;
  /** 材料信息 */
  material?: IMaterialInfo;
  /** 侧面类型 */
  side?: 'inner' | 'outer';
  /** 长度 */
  length?: number;
}

/**
 * BOM3开口数据结构
 */
interface IBom3OpeningData {
  /** 实体信息 */
  entity: IBom3Entity;
  /** 是否为弧形孔 */
  arcHole?: boolean;
  /** 宿主ID */
  hostId?: string;
  /** 凹槽/造型列表 */
  moldings?: IPocketData[];
  /** 面列表 */
  faces?: IFaceData[];
  /** 石材列表（过门石、窗台石等） */
  stones?: IStoneData[];
}

/**
 * B3Opening 类
 * 继承自B3Entity，专门处理建筑开口元素的BOM3数据构建
 * 支持：门、窗、参数化开口等类型
 */
export declare class B3Opening extends B3Entity {
  /**
   * 构造函数
   * @param context - 实体上下文，包含数据库API等
   */
  constructor(context: IEntityContext);

  /**
   * 构建BOM3开口数据
   * 
   * 处理流程：
   * 1. 转换基础实体信息
   * 2. 提取arcHole、hostId等参数
   * 3. 查找并处理子元素：
   *    - Pocket（凹槽）
   *    - ParametricPocket（参数化凹槽）
   *    - Face（面，过滤侧面）
   * 4. 处理特殊元素：
   *    - 过门石（从stoneFaceId标识的面生成）
   *    - 窗台石（从NParametricWindowSill生成）
   * 
   * @param entity - 要处理的实体对象
   * @returns BOM3格式的开口数据
   * 
   * @example
   *