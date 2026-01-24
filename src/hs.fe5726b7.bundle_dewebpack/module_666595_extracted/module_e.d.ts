/**
 * 尺寸相关的接口
 */
interface Size {
  /** 宽度（像素） */
  width: number;
  /** 高度（像素） */
  height: number;
}

/**
 * 具有原始尺寸属性的上下文对象
 */
interface SizeContext {
  /** 原始尺寸信息 */
  originalSize: Size;
}

/**
 * 计算调整后的尺寸
 * @param e - 未使用的参数（保留用于兼容性）
 * @param t - 宽度调整量（像素）
 * @returns 返回包含调整后宽度的对象
 */
declare function adjustWidth(
  this: SizeContext,
  e: unknown,
  t: number
): { width: number };