/**
 * 预测解码函数 - 使用中值预测算法处理数据
 * 
 * 此函数实现了一种差分解码算法，通常用于图像或音频数据的无损压缩。
 * 它通过计算相邻样本的平均值来预测当前值，然后存储实际值与预测值的差异。
 * 
 * @param source - 源数据数组
 * @param sourceOffset - 源数组中的起始偏移位置
 * @param length - 要处理的数据长度
 * @param destination - 目标数组，用于存储解码后的数据
 * @param destinationOffset - 目标数组中的起始偏移位置
 * @param stride - 用于预测的样本间距（步长）
 */
export declare function medianPredictiveDecode(
  source: number[],
  sourceOffset: number,
  length: number,
  destination: number[],
  destinationOffset: number,
  stride: number
): void;