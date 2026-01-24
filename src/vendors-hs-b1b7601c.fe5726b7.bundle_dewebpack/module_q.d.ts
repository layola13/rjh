/**
 * 表示一个二维坐标点
 */
interface Point {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
}

/**
 * SVG 路径二次贝塞尔曲线命令的参数数组
 * @description
 * 索引说明：
 * - [0]: 控制点 X 坐标
 * - [1]: 控制点 Y 坐标
 * - [2]: 终点 X 坐标
 * - [3]: 终点 Y 坐标
 */
type QuadraticBezierParams = [
  controlX: number,
  controlY: number,
  endX: number,
  endY: number
];

/**
 * SVG 路径二次贝塞尔曲线命令元组
 * @description
 * 格式：["Q", 控制点X, 控制点Y, 终点X, 终点Y]
 * @example ["Q", 100, 50, 200, 100]
 */
type QuadraticBezierCommand = [
  command: "Q",
  controlX: number,
  controlY: number,
  endX: number,
  endY: number
];

/**
 * 构建 SVG 路径的二次贝塞尔曲线（Q）命令
 * 
 * @description
 * 该函数用于生成 SVG 路径中的二次贝塞尔曲线命令。
 * 二次贝塞尔曲线由一个控制点和一个终点定义，从当前点绘制平滑曲线。
 * 
 * @param params - 包含控制点和终点坐标的参数数组
 *   - params[0]: 控制点的 X 坐标
 *   - params[1]: 控制点的 Y 坐标
 *   - params[2]: 终点的 X 坐标
 *   - params[3]: 终点的 Y 坐标
 * 
 * @param targetPoint - 目标点对象，函数会将终点坐标写入该对象
 *   - targetPoint.x: 将被设置为 params[2]（终点 X 坐标）
 *   - targetPoint.y: 将被设置为 params[3]（终点 Y 坐标）
 * 
 * @returns SVG 路径二次贝塞尔曲线命令数组
 *   格式：["Q", controlX, controlY, endX, endY]
 * 
 * @example
 *