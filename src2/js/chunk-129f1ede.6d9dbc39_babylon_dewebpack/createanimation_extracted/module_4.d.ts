/**
 * 坐标点接口
 * 表示具有 x 和 y 坐标的二维点
 */
interface Point {
  /** X 坐标值 */
  x: number;
  /** Y 坐标值 */
  y: number;
}

/**
 * 计算点的坐标乘积（面积）
 * 
 * @param point - 包含 x 和 y 坐标的点对象
 * @returns x 和 y 坐标的乘积
 * 
 * @example
 *