/**
 * INFLATE算法的快速解码函数
 * 用于高效解压缩DEFLATE压缩数据的核心循环
 * 
 * 该函数实现了inflate算法的"快速路径"，直接操作位流和滑动窗口，
 * 避免了状态机的开销，适用于有足够输入输出缓冲区的情况。
 */

/**
 * Inflate状态对象
 * 维护解压缩过程中的所有状态信息
 */
interface InflateState {
  /** 解码模式（16191表示完成，16209表示错误） */
  mode: number;
  
  /** 最大回溯距离限制 */
  dmax: number;
  
  /** 滑动窗口大小 */
  wsize: number;
  
  /** 窗口中有效数据量 */
  whave: number;
  
  /** 窗口中下一个写入位置 */
  wnext: number;
  
  /** 滑动窗口缓冲区 */
  window: Uint8Array;
  
  /** 位缓冲区（累积的位数据） */
  hold: number;
  
  /** 位缓冲区中的有效位数 */
  bits: number;
  
  /** 字面量/长度码霍夫曼表 */
  lencode: Uint32Array;
  
  /** 距离码霍夫曼表 */
  distcode: Uint32Array;
  
  /** 字面量/长度码的位宽 */
  lenbits: number;
  
  /** 距离码的位宽 */
  distbits: number;
  
  /** 是否启用安全检查 */
  sane: boolean;
}

/**
 * Inflate流对象
 * 描述输入输出缓冲区和解压缩状态
 */
interface InflateStream {
  /** 输入缓冲区中下一个读取位置 */
  next_in: number;
  
  /** 输入缓冲区 */
  input: Uint8Array;
  
  /** 可用输入字节数 */
  avail_in: number;
  
  /** 输出缓冲区中下一个写入位置 */
  next_out: number;
  
  /** 输出缓冲区 */
  output: Uint8Array;
  
  /** 可用输出空间字节数 */
  avail_out: number;
  
  /** 错误消息 */
  msg: string;
  
  /** 解压缩状态对象 */
  state: InflateState;
}

/**
 * INFLATE快速解码函数
 * 
 * 在有足够输入和输出缓冲区的情况下，快速解码DEFLATE压缩数据。
 * 要求至少5字节输入和257字节输出空间。
 * 
 * 该函数直接操作霍夫曼编码表和滑动窗口，实现LZ77解压缩：
 * - 解码字面量：直接输出字节
 * - 解码长度-距离对：从历史窗口复制数据
 * 
 * @param stream - Inflate流对象，包含输入输出缓冲区和状态
 * @param startOutputAvailable - 初始可用输出空间大小
 * 
 * @remarks
 * 性能关键路径，避免函数调用和条件分支以提高效率。
 * 模式常量：16191 = TYPE (完成), 16209 = BAD (错误)
 */
export default function inflateFast(
  stream: InflateStream,
  startOutputAvailable: number
): void;