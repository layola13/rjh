/**
 * PolyCraft 模块 - 用于创建和渲染多边形图形的工具类
 * 提供多边形的创建、场景渲染、样式处理等功能
 */

import type Konva from 'konva';
import type { Geometry } from './geometry';
import type { DrawParams } from './draw-params';
import type { DisplayUtils, FillPattern } from './display-utils';
import type { 
  ScreenFiller, 
  Glass, 
  ExtraPersonImage, 
  Bar, 
  Frame, 
  Sash,
  HoleStyle,
  ShapeType 
} from './shape-types';

/**
 * 多边形数据接口
 */
interface PolygonData {
  /** 多边形几何对象 */
  poly: Polygon;
  /** 填充颜色或图案 */
  fcolor: string | HTMLImageElement | 'none';
  /** 是否虚线 */
  dashed: boolean;
  /** 是否可拖拽 */
  drag?: boolean;
  /** 高亮颜色或图案 */
  highlight?: string | HTMLImageElement;
  /** 描边颜色 */
  stroke?: string;
  /** 描边宽度 */
  strokeWidth?: number;
  /** 孔洞数组 */
  holes?: Hole[];
}

/**
 * 孔洞接口
 */
interface Hole {
  /** 孔洞样式（方形/圆形/自定义） */
  style: HoleStyle;
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 尺寸（半径或半边长） */
  size: number;
  /** 高度（矩形孔洞专用） */
  height?: number;
  /** 自定义边缘（多边形孔洞） */
  edges?: Array<Geometry.Segment | Geometry.Arc>;
}

/**
 * 多边形几何对象接口
 */
interface Polygon {
  /** 多边形边缘集合 */
  edges: Array<Geometry.Segment | Geometry.Arc>;
  /** 包围盒 */
  box: {
    center: Geometry.Point;
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
  };
  /** 获取环形多边形（如果是环形） */
  ringPolygon(): RingPolygon | undefined;
}

/**
 * 环形多边形接口
 */
interface RingPolygon {
  /** 中心点 */
  pc: Geometry.Point;
  /** 内半径 */
  ir: number;
  /** 外半径 */
  or: number;
}

/**
 * 扩展的 Konva Shape 属性
 */
interface PolyCraftShapeAttrs extends Konva.ShapeConfig {
  /** 多边形数据 */
  data: PolygonData;
  /** 视图对象 */
  view: unknown;
  /** 机器人/特殊对象类型 */
  robot?: ScreenFiller | Glass | ExtraPersonImage | Bar;
}

/**
 * PolyCraft - 多边形图形创建与渲染工具类
 * 
 * 提供创建 Konva 多边形图形、自定义渲染逻辑的静态方法
 */
export declare class PolyCraft {
  /**
   * 创建多边形图形对象
   * 
   * @param polygon - 多边形几何数据
   * @param view - 视图对象
   * @returns Konva Shape 实例
   * 
   * @example
   *