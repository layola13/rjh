/**
 * 自定义特征模型模块
 * 提供自定义模型的结果类型定义和特征模型构建功能
 */

import { B3Entity } from './B3Entity';
import { B3Face } from './B3Face';
import { NCustomizedMoldingPredicate, FacePredicate } from './Predicates';
import { 
  turnEntityToBom3Entity, 
  setObjectParameterValues 
} from './EntityUtils';

/**
 * 自定义模型结果类型枚举
 */
export enum NCustomizedModelResultType {
  /** 结构信息 */
  StructureInfo = 'ncustomized structure info',
  /** 草图造型信息 */
  SketchMolding = 'ncustomized sketch molding info',
  /** 参数化吊顶信息 */
  ParametricCeiling = 'ncustomized parametric ceiling info',
  /** DIY模型信息 */
  DIYModel = 'ncustomized diy model info'
}

/**
 * 实体接口
 */
interface Entity {
  /** 实体唯一标识符 */
  getId(): string;
  /** 子实体集合 */
  children: Entity[];
  /** 表面积 */
  surfaceArea?: number;
  /** 投影面积 */
  projectionArea?: number;
  /** 投影长度 */
  projectionLength?: number;
  /** 圆角半径 */
  cornerRadius?: number;
  /** 宿主面 */
  hostFace?: unknown;
  /** 底面集合 */
  bottomFaces?: unknown[];
  /** 默认面积 */
  defaultFaceArea?: number;
  /** 自定义类型 */
  customizedType?: string;
  /** 吊顶类型 */
  ceilingType?: string;
  /** 吊顶高度 */
  ceilingHeight?: number;
  /** 吊顶宽度 */
  ceilingWidth?: number;
  /** 吊顶外弧半径 */
  ceilingOutArcRadius?: number;
  /** 转角矩形宽度 */
  cornerRectWidth?: number;
  /** 内吊顶高度 */
  innerCeilingHeight?: number;
  /** 内部距离 */
  innerDistance?: number;
  /** 转角尺寸 */
  cornerSize?: number;
  /** 弧线半径 */
  arcRadius?: number;
  /** 弧线步长 */
  arcStep?: number;
  /** 层叠宽度 */
  cascadeWidth?: number;
  /** 层叠高度 */
  cascadeHeight?: number;
  /** 间隔宽度 */
  intervalWidth?: number;
  /** 宽度1 */
  w1?: number;
  /** 高度1 */
  h1?: number;
  /** 宽度2 */
  w2?: number;
  /** 高度2 */
  h2?: number;
  /** 宽度3 */
  w3?: number;
  /** 高度3 */
  h3?: number;
  /** 梁宽度 */
  beamWidth?: number;
  /** 梁高度 */
  beamHeight?: number;
  /** 梁长度 */
  beamLength?: number;
  /** 梁数量 */
  beamCount?: number;
  /** 梁表面积 */
  beamSurfaceArea?: number;
}

/**
 * 上下文接口
 */
interface Context {
  /** 数据库API */
  dbApi: {
    /**
     * 查找所有符合条件的实体
     * @param entities - 实体集合
     * @param predicate - 查询谓词
     * @returns 符合条件的实体数组
     */
    findAll(entities: Entity[], predicate: unknown): Entity[];
  };
}

/**
 * 基础模型数据
 */
interface BasicModelData {
  /** 转换后的BOM3实体 */
  entity: unknown;
  /** 表面积 */
  surfaceArea?: number;
  /** 投影面积 */
  projectionArea?: number;
  /** 投影长度 */
  projectionLength?: number;
  /** 圆角半径 */
  cornerRadius?: number;
  /** 宿主面 */
  hostFace?: unknown;
  /** 底面集合 */
  bottomFaces?: unknown[];
  /** 默认面积 */
  defaultFaceArea?: number;
  /** 造型ID集合 */
  moldings?: string[];
  /** 面数据集合 */
  faces?: unknown[];
}

/**
 * 参数数据
 */
interface ParametersData {
  /** 自定义类型 */
  customizedType?: string;
  /** 吊顶类型 */
  ceilingType?: string;
  /** 吊顶高度 */
  ceilingHeight?: number;
  /** 吊顶宽度 */
  ceilingWidth?: number;
  /** 吊顶外弧半径 */
  ceilingOutArcRadius?: number;
  /** 转角矩形宽度 */
  cornerRectWidth?: number;
  /** 内吊顶高度 */
  innerCeilingHeight?: number;
  /** 内部距离 */
  innerDistance?: number;
  /** 转角尺寸 */
  cornerSize?: number;
  /** 弧线半径 */
  arcRadius?: number;
  /** 弧线步长 */
  arcStep?: number;
  /** 层叠宽度 */
  cascadeWidth?: number;
  /** 层叠高度 */
  cascadeHeight?: number;
  /** 间隔宽度 */
  intervalWidth?: number;
  /** 宽度1 */
  w1?: number;
  /** 高度1 */
  h1?: number;
  /** 宽度2 */
  w2?: number;
  /** 高度2 */
  h2?: number;
  /** 宽度3 */
  w3?: number;
  /** 高度3 */
  h3?: number;
  /** 梁宽度 */
  beamWidth?: number;
  /** 梁高度 */
  beamHeight?: number;
  /** 梁长度 */
  beamLength?: number;
  /** 梁数量 */
  beamCount?: number;
  /** 梁表面积 */
  beamSurfaceArea?: number;
}

/**
 * BOM3数据结构
 */
interface Bom3Data {
  /** 基础模型数据 */
  basicModel: BasicModelData;
  /** 参数数据 */
  parameters: ParametersData;
}

/**
 * 自定义特征模型类
 * 继承自B3Entity，用于处理自定义模型特征的BOM数据构建
 */
export declare class B3NCustomizedFeatureModel extends B3Entity {
  /**
   * 构建BOM3数据
   * @param entity - 源实体对象
   * @returns BOM3格式的数据对象
   */
  buildBom3Data(entity: Entity): Bom3Data;

  /**
   * 获取造型ID集合
   * @param entity - 源实体对象
   * @returns 造型ID数组
   */
  getMoldingIds(entity: Entity): string[];

  /**
   * 获取面数据集合
   * @param entity - 源实体对象
   * @returns 面数据数组
   */
  geFaces(entity: Entity): unknown[];
}