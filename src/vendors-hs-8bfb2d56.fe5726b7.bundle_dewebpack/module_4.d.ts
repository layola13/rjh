/**
 * 图像滤波器或差分编码函数
 * 对数组进行预测性差分运算，常用于PNG滤波或图像压缩算法
 * 
 * @param sourceBuffer - 源数据缓冲区（通常为像素数据）
 * @param sourceOffset - 源缓冲区的起始偏移量
 * @param length - 需要处理的数据长度
 * @param targetBuffer - 目标缓冲区（存储处理后的结果）
 * @param targetOffset - 目标缓冲区的起始偏移量
 * @param stride - 步长/跨度（通常表示每像素字节数或扫描线宽度）
 */
declare function filterDifferenceEncoder(
  sourceBuffer: number[] | Uint8Array | Int32Array,
  sourceOffset: number,
  length: number,
  targetBuffer: number[] | Uint8Array | Int32Array,
  targetOffset: number,
  stride: number
): void;

/**
 * 预测函数（未在代码中定义，需要外部提供）
 * 根据相邻像素值计算预测值，通常为平均值或其他组合
 * 
 * @param left - 左侧像素值
 * @param above - 上方像素值
 * @param upperLeft - 左上方像素值
 * @returns 预测的像素值
 */
declare function n(
  left: number,
  above: number,
  upperLeft: number
): number;