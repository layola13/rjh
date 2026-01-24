/**
 * SVG绘制瓷砖和石材的图形渲染模块
 * @module SvgPaints
 */

import { SvgBase } from './SvgBase';
import { Matrix3 } from './Matrix3';
import { Face } from './Face';
import { Layer } from './Layer';

/**
 * 瓷砖尺寸接口
 */
export interface TileSize {
  /** X轴尺寸 */
  x: number;
  /** Y轴尺寸 */
  y: number;
}

/**
 * 瓷砖和石材统计信息接口
 */
export interface TileAndStoneInfo {
  /** 产品唯一标识 */
  seekId: string;
  /** 产品名称 */
  name: string;
  /** 瓷砖尺寸 */
  size: TileSize;
  /** 数量 */
  count: number;
  /** 纹理图片URL */
  imageUrl?: string;
  /** 颜色值（可选） */
  color?: number | string;
  /** 计量单位 */
  unit: string;
}

/**
 * 材质接口
 */
export interface Material {
  /** 产品唯一标识 */
  seekId?: string;
  /** X轴瓷砖尺寸（默认1） */
  tileSize_x?: number;
  /** Y轴瓷砖尺寸（默认1） */
  tileSize_y?: number;
  /** X轴缩放比例 */
  scaleX?: number;
  /** Y轴缩放比例 */
  scaleY?: number;
  /** 颜色模式 */
  colorMode?: number;
  /** 纯色颜色值 */
  color?: number | string;
  /** 混合颜色值 */
  blendColor?: number | string;
  /** 纹理URL */
  textureUrl?: string;
}

/**
 * 接缝配置接口
 */
export interface Seam {
  /** 接缝宽度 */
  width: number;
  /** 接缝颜色 */
  color: number;
}

/**
 * 图案配置接口
 */
export interface Pattern {
  /** 接缝配置 */
  seam?: Seam;
}

/**
 * 2D坐标点接口
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 砖块几何数据接口
 */
export interface Brick {
  /** 外轮廓点集 */
  outer: Point2D[];
  /** 孔洞点集数组 */
  holes?: Point2D[][];
  /** 材质信息 */
  material: Material;
}

/**
 * 砖块组接口
 */
export interface Block {
  /** 砖块数组 */
  bricks: Brick[];
}

/**
 * 区域数据接口
 */
export interface Region {
  /** 砖块组数组 */
  blocks: Block[];
  /** 图案配置 */
  pattern?: Pattern;
}

/**
 * 水刀瓷砖接口
 */
export interface WaterJetTile {
  /** 材质信息 */
  material?: Material;
}

/**
 * 铺装绘图数据接口
 */
export interface PaveDwgData {
  /** 区域数组 */
  regions: Region[];
  /** 水刀瓷砖数组 */
  waterJetTiles: WaterJetTile[];
}

/**
 * 绘图数据接口
 */
export interface DrawingData {
  /** 世界坐标变换矩阵 */
  worldTransform: number[];
  /** 铺装绘图数据 */
  paveDwgData: PaveDwgData;
}

/**
 * 离散路径数据接口
 */
export interface DiscretePath {
  /** 外轮廓点集 */
  outer: Point2D[];
  /** 孔洞点集数组 */
  holes?: Point2D[][];
}

/**
 * SVG描边配置接口
 */
export interface StrokeConfig {
  /** 线宽 */
  width: number;
  /** 颜色（十六进制字符串） */
  color: string;
}

/**
 * SVG瓷砖绘制类
 * 负责在SVG图层上绘制瓷砖、石材等铺装材料，并收集统计信息
 * @extends SvgBase
 */
export declare class SvgPaints extends SvgBase {
  /**
   * 关联的Face对象
   * @private
   */
  private _face: Face;

  /**
   * SVG绘制节点
   * @private
   */
  private _node: SVGElement;

  /**
   * 构造函数
   * @param context - 绘图上下文
   * @param layer - 图层对象
   * @param face - Face对象
   * @param param4 - 保留参数
   * @param param5 - 保留参数
   */
  constructor(
    context: unknown,
    layer: Layer,
    face: Face,
    param4?: unknown,
    param5?: unknown
  );

  /**
   * 执行绘制操作
   * @public
   */
  draw(): void;

  /**
   * 绘制所有区域
   * @private
   */
  private _drawRegions(): void;

  /**
   * 绘制单个区域
   * @param region - 区域数据
   * @param transformMatrix - 变换矩阵
   * @private
   */
  private _drawRegion(region: Region, transformMatrix: Matrix3): void;

  /**
   * 收集砖块材质统计信息
   * @param brick - 砖块数据
   * @param material - 材质信息
   * @private
   */
  private _collectBrickMaterialTable(brick: Brick, material: Material): void;

  /**
   * 收集水刀瓷砖统计信息
   * @param waterJetTile - 水刀瓷砖数据
   * @private
   */
  private _collectWaterJetTiles(waterJetTile: WaterJetTile): void;

  /**
   * 绘制单个砖块
   * @param paths - 路径点集数组（首个为外轮廓，其余为孔洞）
   * @param seam - 接缝配置
   * @private
   */
  private _drawBrick(paths: Point2D[][], seam: Seam): void;
}