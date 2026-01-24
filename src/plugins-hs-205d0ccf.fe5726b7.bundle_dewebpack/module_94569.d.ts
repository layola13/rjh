/**
 * 几何图形尺寸标注工具模块
 * 提供弧线尺寸线计算、角度弧创建、单位转换和宽度选项生成等功能
 */

/**
 * 二维点坐标接口
 */
export interface Point2d {
  x: number;
  y: number;
  clone(): Point2d;
  added(vector: Vector2d): Point2d;
}

/**
 * 二维向量接口
 */
export interface Vector2d {
  x: number;
  y: number;
  multiplied(scalar: number): Vector2d;
}

/**
 * 二维线段类接口
 */
export interface Line2d {
  new(start: Point2d, end: Point2d): Line2d;
  getDirection(): Vector2d;
  getProjectedPtBy(point: Point2d): Point2d;
  reverse(): void;
  getStartPt(): Point2d;
  getEndPt(): Point2d;
  getLength(): number;
  angleTo(direction: Vector2d): number;
}

/**
 * 二维圆弧类接口
 */
export interface Arc2d {
  getStartPt(): Point2d;
  getMidPt(): Point2d;
  getEndPt(): Point2d;
  getDirection(): Vector2d;
  getLength(): number;
  
  /**
   * 通过起点、中间点和终点创建圆弧
   * @param start - 起点
   * @param middle - 中间点
   * @param end - 终点
   * @param isClockwise - 是否顺时针
   */
  makeArcByStartEndPoints(
    start: Point2d,
    middle: Point2d,
    end: Point2d,
    isClockwise: boolean
  ): Arc2d;
}

/**
 * 长度单位枚举
 */
export enum LengthUnitTypeEnum {
  kilometer = 'kilometer',
  meter = 'meter',
  centimeter = 'centimeter',
  millimeter = 'millimeter',
  foot = 'foot',
  inch = 'inch'
}

/**
 * 楼层平面图接口
 */
export interface FloorPlan {
  /** 显示长度单位 */
  displayLengthUnit: LengthUnitTypeEnum;
}

/**
 * 应用实例接口
 */
export interface AppInstance {
  floorplan: FloorPlan;
}

/**
 * 弧线尺寸线结果
 */
export interface ArcDimensionLines {
  /** 长度线（从起点到终点的直线） */
  length: Line2d;
  /** 高度线（从直线到中点的垂直线） */
  height: Line2d;
}

/**
 * 宽度选项
 */
export interface WidthOption {
  /** 选项ID（字符串形式的数值） */
  id: string;
  /** 选项标题（格式化后的数值） */
  title: string;
}

/**
 * 获取圆弧的尺寸标注线
 * 返回表示弧长度和高度的两条线段
 * 
 * @param arc - 输入的二维圆弧对象
 * @returns 包含长度线和高度线的对象
 * 
 * @example
 * const arc = new Arc2d(...);
 * const { length, height } = getArcDimensionLines(arc);
 */
export function getArcDimensionLines(arc: Arc2d): ArcDimensionLines;

/**
 * 根据线段创建角度弧
 * 用于创建直角标注或角度指示弧
 * 
 * @param line - 输入的二维线段
 * @returns 创建的圆弧对象，如果方向接近水平或垂直则返回undefined
 * 
 * @remarks
 * 仅当线段方向的x和y分量都不接近0时才创建弧线
 */
export function getRadianArc(line: Line2d): Arc2d | undefined;

/**
 * 获取当前应用的长度单位转换参数
 * 将米转换为当前显示单位的乘数
 * 
 * @returns 单位转换系数
 * 
 * @remarks
 * - 千米: 0.001
 * - 米: 1
 * - 厘米: 100
 * - 毫米: 1000
 * - 英尺: 3.2808399
 * - 英寸: 39.3700787
 * 
 * @example
 * const param = getUnitParam(); // 如果当前单位是厘米，返回100
 * const displayValue = valueInMeters * param;
 */
export function getUnitParam(): number;

/**
 * 根据单位参数生成宽度选项列表
 * 提供预设的宽度值（100, 120, 200, 240, 300毫米）转换为当前单位
 * 
 * @param unitParam - 单位转换参数（通常由getUnitParam获取）
 * @returns 宽度选项数组
 * 
 * @example
 * const unitParam = getUnitParam();
 * const options = getWidthOptions(unitParam);
 * // 返回: [{ id: "0.10", title: "0.10" }, { id: "0.12", title: "0.12" }, ...]
 */
export function getWidthOptions(unitParam: number): WidthOption[];