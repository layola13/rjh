/**
 * 坐标轴边界配置接口
 * 定义图表绘制区域的最小/最大坐标值
 */
export interface Boundary {
  /** X轴最小值 */
  minX: number;
  /** X轴最大值 */
  maxX: number;
  /** Y轴最小值 */
  minY: number;
  /** Y轴最大值 */
  maxY: number;
}

/**
 * 折线图数据点接口
 * 表示折线图上的单个坐标点
 */
export interface Point {
  /** 数据点的X坐标 */
  x: number;
  /** 数据点的Y坐标 */
  y: number;
  /** 数据点的原始值 */
  value: number;
}

/**
 * 柱状图数据点接口
 * 表示柱状图上的单个柱子
 */
export interface Bar {
  /** 柱子的X坐标（左边缘） */
  x: number;
  /** 柱子的Y坐标（顶部） */
  y: number;
  /** 柱子的高度 */
  height: number;
  /** 柱子对应的原始值 */
  value: number;
}

/**
 * 生成折线图的坐标点数组
 * 将原始数据映射到指定边界内的坐标点
 * 
 * @param data - 原始数值数组
 * @param boundary - 坐标轴边界配置
 * @returns 转换后的坐标点数组
 * 
 * @example
 *