/**
 * 相机快照和位置管理模块
 * 提供截图裁剪、相机位置更新等功能
 */

/**
 * 快照宽度（像素）
 * @constant
 */
export const snapshotWidth: 508;

/**
 * 快照高度（像素）
 * @constant
 */
export const snapshotHeight: 288;

/**
 * 裁剪边界矩形
 * 格式：[x偏移, y偏移, 宽度, 高度]
 */
export type ClipBound = [number, number, number, number];

/**
 * 计算裁剪区域的边界
 * 
 * @param sourceWidth - 源图像宽度
 * @param sourceHeight - 源图像高度
 * @param apply3DScaling - 是否应用3D视图的DPI缩放
 * @returns 裁剪边界 [x, y, width, height]
 * 
 * @remarks
 * - 自动按快照比例（508:288）裁剪源图像
 * - 在3D视图激活时会应用 devicePixelRatio 缩放
 */
export function getClipBound(
  sourceWidth: number,
  sourceHeight: number,
  apply3DScaling: boolean
): ClipBound;

/**
 * 裁剪并缩放图像数据
 * 
 * @param sourceCanvas - 源Canvas或图像对象（会被释放）
 * @param sourceWidth - 源图像宽度
 * @param sourceHeight - 源图像高度
 * @param targetWidth - 目标图像宽度
 * @param targetHeight - 目标图像高度
 * @param offsetX - X轴额外偏移量
 * @returns Base64编码的PNG图像数据URL
 * 
 * @remarks
 * - 会自动释放传入的源Canvas资源
 * - 使用对象池优化临时Canvas创建
 */
export function getClipData(
  sourceCanvas: HTMLCanvasElement | HTMLImageElement,
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
  offsetX: number
): string;

/**
 * 更新指定相机位置的名称
 * 
 * @param cameraPositionId - 相机位置的唯一标识符
 * @param newName - 新的名称
 * 
 * @remarks
 * 会查找匹配的相机位置并更新其名称，然后持久化到存储
 */
export function updateCameraPositionName(
  cameraPositionId: string | number,
  newName: string
): void;