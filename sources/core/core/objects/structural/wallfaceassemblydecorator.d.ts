/**
 * WallFaceAssemblyDecorator - 墙面组装装饰器
 * 
 * 用于处理墙面组装相关的操作，包括尺寸限制计算、产品数据获取等功能
 */

import { Box3, Vector3, Coordinate3 } from './geometry'; // 假设几何类型模块
import { 
  NCPBackgroundWallBase, 
  Opening, 
  ParametricOpening, 
  Layer,
  Door,
  Window,
  BayWindow,
  ParametricDoor,
  OpeningDecorator,
  PODecorator
} from './wall-components'; // 假设墙体组件模块
import { NCPBackgroundWallBaseDecorator } from './decorators'; // 假设装饰器模块
import { LayerUtil } from './utils'; // 假设工具模块

/**
 * 墙面组装实体接口
 */
interface WallFaceAssembly {
  /** X轴尺寸 */
  xSize: number;
  /** Y轴尺寸 */
  ySize: number;
  /** Z轴尺寸 */
  zSize: number;
  /** Z轴位置 */
  z: number;
  /** 背景墙列表 */
  backgroundWalls: NCPBackgroundWallBase[];
  /** 墙面对象 */
  wallFace: WallFace;
  /** 关联的内容实体 */
  associatedContents: AssociatedContent[];
  /** 关联的ID列表 */
  associatedIds: string[];
}

/**
 * 墙面对象接口
 */
interface WallFace {
  /** 表面对象 */
  surfaceObj: {
    surface: {
      getCoord(): Coordinate3;
    };
  };
  /** 内容对象集合 */
  contents: Record<string, AssociatedContent>;
  /** 开口列表 */
  openings: Opening[];
  /** 参数化开口列表 */
  parametricOpenings: ParametricOpening[];
}

/**
 * 关联内容类型（背景墙、门窗等实体）
 */
type AssociatedContent = NCPBackgroundWallBase | Opening | ParametricOpening | Door | Window | BayWindow | ParametricDoor;

/**
 * 具有ID的实体接口
 */
interface Entity {
  id: string;
  seekId?: string;
  x?: number;
  y?: number;
  z?: number;
}

/**
 * 路径数据接口
 */
interface PathData {
  /** 外部路径 */
  outer: Array<{
    transformed(matrix: unknown): {
      getBoundingBox(): Box3;
    };
  }>;
}

/**
 * 原始路径接口
 */
interface RawPath {
  rawPath: PathData;
}

/**
 * X轴尺寸限制结果
 */
interface XSizeLimit {
  /** 最大X轴尺寸 */
  maxXSize: number;
  /** 最小X轴尺寸 */
  minXSize: number;
}

/**
 * 尺寸范围接口
 */
interface SizeRange {
  /** 最小值（单位：毫米） */
  minValue: number;
  /** 最大值（单位：毫米） */
  maxValue: number;
}

/**
 * 产品数据接口
 */
interface ProductData {
  /** X轴尺寸 */
  xSize: number;
  /** Y轴尺寸 */
  ySize: number;
  /** Z轴尺寸 */
  zSize: number;
  /** Z轴位置 */
  z: number;
  /** 原始空间X轴长度 */
  originalSpaceXLength: number;
  /** 原始空间Y轴长度 */
  originalSpaceYLength: number;
  /** 原始空间Z轴长度 */
  originalSpaceZLength: number;
  /** 资产列表 */
  assets: AssetData[];
  /** 最大X轴尺寸 */
  maxXSize: number;
  /** 最小X轴尺寸 */
  minXSize: number;
}

/**
 * 资产数据接口
 */
interface AssetData {
  /** 查找ID */
  seekId?: string;
  /** 记录数据 */
  recordData: Record<string, unknown>;
  /** 位置坐标 */
  position: { x: number; y: number; z: number };
}

/**
 * 墙面组装装饰器类
 * 
 * 提供墙面组装相关的辅助功能，包括尺寸计算、数据导出等
 */
export declare class WallFaceAssemblyDecorator {
  /** 私有属性：墙面组装实体 */
  private readonly _wfa: WallFaceAssembly;

  /**
   * 构造函数
   * @param wallFaceAssembly - 墙面组装实体
   */
  constructor(wallFaceAssembly: WallFaceAssembly);

  /**
   * 获取墙面组装的X轴尺寸限制
   * 
   * 基于所有背景墙的尺寸约束计算整体的最大和最小X轴尺寸
   * 
   * @returns X轴尺寸的最大值和最小值
   */
  getWFALimitedXSize(): XSizeLimit;

  /**
   * 获取墙面组装的产品数据
   * 
   * 导出完整的产品数据，包括尺寸、位置、关联资产等信息
   * 
   * @param pathDataArray - 路径数据数组
   * @returns 产品数据对象
   */
  getWFAProductData(pathDataArray: RawPath[]): ProductData;

  /**
   * 获取实体所属的墙面组装父对象
   * 
   * @param entity - 要查询的实体
   * @returns 所属的墙面组装对象，如果不存在则返回undefined
   */
  getWallFaceAssemblyParent(entity: Entity): WallFaceAssembly | undefined;

  /**
   * 判断实体是否为有效的子实体
   * 
   * 有效子实体包括：背景墙、门、窗、飘窗、参数化门、非角窗类型的参数化开口
   * 
   * @param entity - 要判断的实体
   * @returns 如果是有效子实体返回true，否则返回false
   */
  isValidChild(entity: AssociatedContent): boolean;

  /**
   * 获取墙面上所有有效的子实体
   * 
   * @param wallFace - 墙面对象
   * @returns 有效子实体数组
   */
  getAllValidChildrenOnFace(wallFace: WallFace): AssociatedContent[];

  /**
   * 获取墙面的局部坐标系
   * 
   * 基于墙面表面的方向向量计算局部坐标系
   * 
   * @param wallFace - 墙面对象
   * @returns 三维坐标系对象
   */
  getFaceLocalCoordinate(wallFace: WallFace): Coordinate3;
}