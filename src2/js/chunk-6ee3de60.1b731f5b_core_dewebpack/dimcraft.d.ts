/**
 * DimCraft - 尺寸标注绘制模块
 * 用于在画布上创建和渲染尺寸标注（Dimension）图形
 */

import type Konva from 'konva';
import type { Vector2d } from 'konva/lib/types';

/**
 * 线段数据结构
 */
export interface Segment {
  /** 起点坐标 */
  start: Point;
  /** 终点坐标 */
  end: Point;
  /** 线段长度 */
  length: number;
  /** 获取线段中点 */
  middle(): Point;
  /** 变换线段坐标 */
  transform(matrix: Matrix): Segment;
  /** 克隆线段 */
  clone(): Segment;
  /** 计算与多边形的交点 */
  intersect(polygon: Polygon): Point[];
  /** 获取起点处的切线方向 */
  tangentInStart(): Vector;
}

/**
 * 点坐标
 */
export interface Point {
  x: number;
  y: number;
  /** 平移点坐标 */
  translate(dx: number | Vector, dy?: number): Point;
  /** 判断点是否在直线左侧 */
  leftTo(line: Line): boolean;
}

/**
 * 向量
 */
export interface Vector {
  x: number;
  y: number;
  /** 反转向量方向 */
  invert(): Vector;
}

/**
 * 变换矩阵
 */
export interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
  tx: number;
  ty: number;
}

/**
 * 直线
 */
export interface Line {
  start: Point;
  end: Point;
}

/**
 * 多边形
 */
export interface Polygon {
  /** 克隆多边形 */
  clone(): Polygon;
  /** 应用变换矩阵 */
  transform(matrix: Matrix): Polygon;
  /** 计算与线段的交点 */
  intersect(segment: Segment): Point[];
}

/**
 * 尺寸类型枚举
 */
export enum DimType {
  /** 内部空间标注 */
  InnerSpace = 'InnerSpace',
  // 可能还有其他类型...
}

/**
 * 尺寸标注模式枚举
 */
export enum DimModeEnum {
  /** 计算模式 */
  calculate = 'calculate',
  // 可能还有其他模式...
}

/**
 * 尺寸信息
 */
export interface DimInfo {
  /** 显示长度 */
  displayLength?: number;
  /** 标注类型 */
  type: DimType;
  /** 标注名称（用于计算模式） */
  name?: string;
}

/**
 * 尺寸标注数据
 */
export interface DimCraftData {
  /** 组成标注的线段数组（至少3个：两条引线+一条尺寸线） */
  segs: Segment[];
  /** 描边颜色 */
  stroke: string;
  /** 是否可拖拽 */
  drag?: boolean;
  /** 高亮颜色（覆盖默认颜色） */
  highlight?: string;
  /** 描边宽度 */
  strokeWidth?: number;
  /** 尺寸信息 */
  dimInfo: DimInfo;
  /** 自定义显示文本（覆盖长度值） */
  displayText?: string;
}

/**
 * 标注字体信息（用于hitFunc检测）
 */
export interface DimFont {
  /** 显示文本 */
  text: string;
  /** 起始点 */
  startPt: Point;
  /** 偏移向量 */
  offVec: Vector;
}

/**
 * 视图管理器接口
 */
export interface View {
  /** 尺寸标注管理器 */
  dimManager: {
    /** 当前模式 */
    mode: DimModeEnum;
  };
}

/**
 * 尺寸标注图形创建器
 */
export declare class DimCraft {
  /**
   * 是否可以绘制标注
   * @default false
   */
  static canDraw: boolean;

  /**
   * 创建尺寸标注图形
   * @param segments - 标注的线段数组（包括两条引线和一条尺寸线）
   * @param view - 视图对象
   * @returns Konva.Shape 图形对象
   */
  static create(segments: Segment[], view: View): Konva.Shape;

  /**
   * 碰撞检测函数（用于交互）
   * 绘制标注文本的碰撞区域（矩形包围盒）
   * @param context - 画布上下文
   * @param shape - Konva图形对象
   */
  static hitFunc(context: Konva.Context, shape: Konva.Shape): void;

  /**
   * 字体碰撞检测函数
   * 针对标注字体部分的精确碰撞检测
   * @param context - 画布上下文
   * @param shape - Konva图形对象
   */
  static hitFuncFont(context: Konva.Context, shape: Konva.Shape): void;

  /**
   * 场景渲染函数
   * 负责实际绘制标注的引线、尺寸线和文本
   * @param context - 画布上下文
   * @param shape - Konva图形对象
   */
  static sceneFunc(context: Konva.Context, shape: Konva.Shape): void;
}

/**
 * 扩展Konva.Shape属性类型
 */
declare module 'konva/lib/Shape' {
  interface Shape {
    attrs: {
      /** 标注数据 */
      data?: DimCraftData & { dimFont?: DimFont };
      /** 视图对象 */
      view?: View;
      /** 描边颜色 */
      stroke?: string;
      /** 描边宽度 */
      strokeWidth?: number;
    };
  }
}