/**
 * 计算旋转器(Spinner)的尺寸
 * 
 * @param width - 容器宽度，默认为 0
 * @param height - 容器高度，默认为 0
 * @returns 计算后的旋转器尺寸（像素），最小值为 20，向下取整
 * 
 * @remarks
 * 计算公式：(width / height) * width
 * 如果结果为 NaN，则返回最小值 20
 */
export function getSpinSize(width?: number, height?: number): number;

/**
 * 旋转器的最小尺寸（像素）
 */
export const MIN_SPIN_SIZE: 20;