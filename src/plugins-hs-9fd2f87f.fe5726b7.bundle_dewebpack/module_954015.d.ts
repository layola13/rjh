/**
 * 显示对象轮廓绘制 Gizmo
 * 用于在图层上绘制实体的轮廓和填充路径
 */

import type { HSApp } from './app-types';
import type { HSFPConstants } from './constants-types';
import type { HSCore } from './core-types';

/**
 * 颜色配置接口
 */
interface GizmoColorConfig {
  /** 填充颜色 */
  fillColor: string;
  /** 描边颜色 */
  strokeColor: string;
  /** 描边虚线数组 */
  strokeDashArray?: string | null;
}

/**
 * 点坐标接口
 */
interface Point {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 弧线信息（可选） */
  arcInfo?: ArcInfo;
}

/**
 * 弧线信息接口
 */
interface ArcInfo {
  /** 圆心坐标 */
  center: Point;
  /** 半径 */
  radius: number;
  /** 是否顺时针 */
  clockwise: boolean;
}

/**
 * 显示对象接口
 */
interface DisplayObject {
  /** 轮廓点集合数组 */
  outline: Point[][];
  /** 关联的实体对象 */
  entity: Entity;
}

/**
 * 实体对象接口
 */
interface Entity {
  /**
   * 检查实体是否为指定类的实例
   * @param modelClass 模型类标识
   */
  instanceOf(modelClass: string): boolean;
}

/**
 * SVG 路径元素接口
 */
interface SVGPathElement extends SVGElement {
  /**
   * 设置元素属性
   * @param attrs 属性对象
   */
  attr(attrs: Record<string, string | number | null | undefined>): this;
}

/**
 * SVG 上下文接口
 */
interface SVGContext {
  /**
   * 创建路径元素
   * @param pathData SVG 路径数据字符串
   */
  path(pathData: string): SVGPathElement;
}

/**
 * 图层接口
 */
interface Layer {
  /**
   * 添加子元素
   * @param element SVG 元素
   */
  appendChild(element: SVGElement): void;
  /**
   * 移除子元素
   * @param element SVG 元素
   */
  removeChild(element: SVGElement): void;
}

/**
 * 应用程序接口
 */
interface Application {
  // 应用程序相关属性和方法
}

/**
 * 轮廓绘制 Gizmo 类
 * 继承自 HSApp.View.Base.Gizmo
 */
export default class OutlineGizmo extends HSApp.View.Base.Gizmo {
  /** 显示对象引用 */
  displayObj: DisplayObject;
  
  /** 应用程序实例 */
  app: Application;
  
  /** 颜色配置 */
  color: GizmoColorConfig;
  
  /** SVG 元素集合 */
  elements: SVGElement[];
  
  /** SVG 绘图上下文 */
  context: SVGContext;
  
  /** 渲染图层 */
  layer?: Layer;

  /**
   * 构造函数
   * @param viewer 视图对象
   * @param param2 第二个参数
   * @param displayObj 显示对象
   * @param color 颜色配置
   */
  constructor(
    viewer: { application: Application },
    param2: unknown,
    displayObj: DisplayObject,
    color: GizmoColorConfig
  );

  /**
   * 清理方法
   * 移除所有已绘制的 SVG 元素
   */
  onCleanup(): void;

  /**
   * 绘制轮廓
   * 根据 displayObj 的轮廓数据绘制填充和描边路径
   */
  draw(): void;

  /**
   * 构建 SVG 填充路径字符串
   * @param points 点坐标数组
   * @returns SVG 路径数据字符串
   */
  buildFillPath(points: Point[]): string;
}

/**
 * 数学工具类型
 */
declare namespace MathUtils {
  /**
   * 判断两个数值是否近似相等
   * @param a 第一个数值
   * @param b 第二个数值
   * @returns 是否近似相等
   */
  function nearlyEqual(a: number, b: number): boolean;
}

/**
 * 墙体工具类型
 */
declare namespace WallUtil {
  /**
   * 将两点之间的弧线转换为 SVG 弧线路径
   * @param startPoint 起点
   * @param endPoint 终点
   * @param center 圆心
   * @param radius 半径
   * @param clockwise 是否顺时针
   * @param scaleFactor 缩放因子
   * @returns SVG 路径片段数组
   */
  function toSvgArc(
    startPoint: Point,
    endPoint: Point,
    center: Point,
    radius: number,
    clockwise: boolean,
    scaleFactor: number
  ): string[];
}