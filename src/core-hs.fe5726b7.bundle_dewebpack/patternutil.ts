/**
 * 图案工具类 - 用于处理铺装图案的几何计算和多边形生成
 * @module PatternUtil
 */

import type { BoundingBox2D } from './BoundingBox2D';
import type { DiscretePolygon2d } from './DiscretePolygon2d';
import type { Logger } from './Logger';

/**
 * 二维点坐标
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 砖块图案选项
 */
interface BrickPatternOption {
  [key: string]: unknown;
}

/**
 * 锚点信息
 */
interface AnchorPoint {
  /** 锚点偏移坐标 */
  offsetPoint: THREE.Vector2;
  /** 垂直方向索引 */
  vIndex: number;
  /** 水平方向索引 */
  uIndex: number;
  /** 是否在内部区域 */
  isInside: boolean;
}

/**
 * 铺装配置选项
 */
interface PavingOption {
  /** 铺装参考点 */
  point: Point2D;
  /** X轴默认偏移量 */
  defaultOffsetX: number;
  /** Y轴默认偏移量 */
  defaultOffsetY: number;
  /** 旋转角度(角度制) */
  rotation: number;
}

/**
 * 图案路径对象
 */
interface PathObject {
  /** 外轮廓 */
  outline: Point2D[][];
  /** 砖块图案选项 */
  brickPatternOption?: BrickPatternOption;
  /** 旋转角度(角度制) */
  rotation?: number;
  /** 子多边形集合 */
  subPolygons?: BlockOutline[];
}

/**
 * 图案定义
 */
interface Pattern {
  /** 图案ID */
  id: string;
  /** 接缝配置 */
  seam: {
    /** 接缝宽度 */
    seamWidth?: number;
  };
  /** 锚点定义 */
  anchorPoints: {
    /** 第一锚点 */
    anchorPoint1: Point2D;
    /** 第一基准点 */
    basePoint1: Point2D;
    /** 第二锚点 */
    anchorPoint2: Point2D;
    /** 第二基准点 */
    basePoint2: Point2D;
  };
  /** 按产品分类的路径集合 */
  pathsByProduct: PathObject[];
}

/**
 * 多边形定义(包含外轮廓和孔洞)
 */
interface Polygon {
  /** 外轮廓点集 */
  outer: Point2D[];
  /** 孔洞点集数组 */
  holes: Point2D[][];
}

/**
 * 块轮廓输出结果
 */
interface BlockOutline {
  /** 路径点集 */
  path: THREE.Vector2[];
  /** 孔洞点集数组 */
  holes: THREE.Vector2[][];
  /** 是否完整未破损 */
  isUnbroken: boolean;
  /** 砖块图案选项 */
  brickPatternOption: BrickPatternOption;
  /** 锚点索引(v,u坐标) */
  anchorPointIndex: THREE.Vector2;
  /** 锚点偏移量 */
  anchorPointOffset: THREE.Vector2;
  /** 块旋转角度 */
  blockRotation: number;
  /** 绝对质心坐标 */
  absoluteMass: THREE.Vector2;
  /** 铺装选项 */
  pavingOption: PavingOption;
  /** 唯一标识键 */
  key: THREE.Vector2;
}

/**
 * 块轮廓生成配置
 */
interface BlockOutlineConfig {
  /** 偏移后的外轮廓 */
  offsetOutline: Point2D[];
  /** 砖块图案选项 */
  brickPatternOption?: BrickPatternOption;
  /** 原始路径对象中心点 */
  originalPathObjCenter: Point2D;
  /** 锚点信息 */
  anchorPoint: AnchorPoint;
  /** 块旋转角度 */
  blockRotation: number;
  /** 铺装旋转角度(角度制) */
  pavementRotationInDegree: number;
}

/**
 * 图案工具类 - 提供图案铺装的几何计算功能
 */
export declare class PatternUtil {
  /**
   * 生成块轮廓
   * @param path - 外轮廓路径点集
   * @param holes - 孔洞点集数组
   * @param config - 块轮廓生成配置
   * @returns 块轮廓对象
   * @private
   */
  private static _getBlockOutline(
    path: Point2D[],
    holes: Point2D[][],
    config: BlockOutlineConfig
  ): BlockOutline;

  /**
   * 获取所有锚点位置
   * @param pattern - 图案定义
   * @param polygons - 多边形数组
   * @param pavingOption - 铺装选项
   * @returns 锚点数组
   * @description
   * 根据图案的锚点定义和铺装选项,计算所有可能的锚点位置。
   * 会考虑边界、孔洞和旋转等因素,返回有效的锚点集合。
   */
  static getAnchorPoints(
    pattern: Pattern,
    polygons: Polygon[],
    pavingOption: PavingOption
  ): AnchorPoint[];

  /**
   * 创建铺装多边形
   * @param pattern - 图案定义
   * @param polygons - 目标多边形数组
   * @param pavingOption - 铺装选项
   * @returns 按产品分类的路径集合
   * @description
   * 根据图案定义和目标区域,生成完整的铺装多边形集合。
   * 会自动处理裁剪、旋转、接缝等复杂几何运算。
   */
  static createPolygons(
    pattern: Pattern,
    polygons: Polygon[],
    pavingOption: PavingOption
  ): PathObject[];
}