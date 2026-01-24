/**
 * 计算图像或元素的居中偏移量
 * @module ImageCenterOffset
 */

/**
 * 坐标点接口
 */
interface Position {
  x: number;
  y: number;
}

/**
 * 客户端尺寸接口
 */
interface ClientSize {
  width: number;
  height: number;
}

/**
 * 计算单个轴向的偏移量
 * @param axis - 轴向标识 ('x' 或 'y')
 * @param offset - 当前偏移量
 * @param dimension - 元素尺寸（宽度或高度）
 * @param viewportSize - 视口尺寸（宽度或高度）
 * @returns 包含偏移量的部分坐标对象
 */
declare function calculateAxisOffset(
  axis: 'x' | 'y',
  offset: number,
  dimension: number,
  viewportSize: number
): Partial<Position>;

/**
 * 计算内容相对于视口的居中偏移量
 * 当内容尺寸小于等于视口时，返回零偏移
 * 当内容尺寸大于视口时，计算适当的偏移以保持内容在视口内居中
 * 
 * @param width - 内容宽度
 * @param height - 内容高度
 * @param offsetX - X轴初始偏移量
 * @param offsetY - Y轴初始偏移量
 * @returns 计算后的偏移坐标，如果不需要调整则返回null
 */
declare function calculateCenterOffset(
  width: number,
  height: number,
  offsetX: number,
  offsetY: number
): Position | null;

export default calculateCenterOffset;