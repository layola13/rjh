/**
 * Deflate树操作模块 - 用于DEFLATE压缩算法中的霍夫曼编码树构建和管理
 * 
 * 该模块实现了DEFLATE算法（RFC 1951）中的树操作，包括：
 * - 霍夫曼树的构建和优化
 * - 动态和静态霍夫曼编码
 * - 位流操作
 * - 块压缩和刷新
 */

/** 字面量/长度字母表大小 */
declare const LITERALS: 256;

/** 字面量/长度码的最大数量 */
declare const L_CODES: 286;

/** 距离码的最大数量 */
declare const D_CODES: 30;

/** 最大位长度 */
declare const MAX_BITS: 15;

/** 长度码的额外位数 */
declare const LENGTH_EXTRA_BITS: Uint8Array;

/** 距离码的额外位数 */
declare const DISTANCE_EXTRA_BITS: Uint8Array;

/** 码长度码的额外位数 */
declare const BL_CODE_EXTRA_BITS: Uint8Array;

/** 码长度码的顺序 */
declare const BL_CODE_ORDER: Uint8Array;

/**
 * 静态树描述符
 * 定义霍夫曼树的静态结构和属性
 */
interface StaticTreeDescriptor {
  /** 静态树数组或null（用于动态树） */
  static_tree: Int16Array | null;
  
  /** 每个码的额外位数 */
  extra_bits: Uint8Array | null;
  
  /** 额外位的基础值 */
  extra_base: number;
  
  /** 树中的元素数量 */
  elems: number;
  
  /** 树的最大位长度 */
  max_length: number;
  
  /** 是否有静态树 */
  has_stree: boolean;
}

/**
 * 树描述符
 * 包含动态霍夫曼树及其统计信息
 */
interface TreeDescriptor {
  /** 动态树数组 */
  dyn_tree: Uint16Array;
  
  /** 树中最大的码值 */
  max_code: number;
  
  /** 静态树描述符的引用 */
  stat_desc: StaticTreeDescriptor;
}

/**
 * DEFLATE状态对象
 * 包含压缩过程中的所有状态信息
 */
interface DeflateState {
  /** 输入流引用 */
  strm: DeflateStream;
  
  /** 压缩级别 (0-9) */
  level: number;
  
  /** 压缩策略 */
  strategy: number;
  
  /** 输入数据类型 (0=binary, 1=text, 2=unknown) */
  data_type: number;
  
  /** 滑动窗口 */
  window: Uint8Array;
  
  /** 输出缓冲区 */
  pending_buf: Uint8Array;
  
  /** 待输出的字节数 */
  pending: number;
  
  /** 位缓冲区 */
  bi_buf: number;
  
  /** 位缓冲区中的有效位数 */
  bi_valid: number;
  
  /** 动态字面量/长度树 */
  dyn_ltree: Uint16Array;
  
  /** 动态距离树 */
  dyn_dtree: Uint16Array;
  
  /** 位长度树 */
  bl_tree: Uint16Array;
  
  /** 字面量/长度树描述符 */
  l_desc: TreeDescriptor;
  
  /** 距离树描述符 */
  d_desc: TreeDescriptor;
  
  /** 位长度树描述符 */
  bl_desc: TreeDescriptor;
  
  /** 每个位长度的码数量 */
  bl_count: Uint16Array;
  
  /** 堆数组，用于构建最优树 */
  heap: Uint16Array;
  
  /** 堆中的元素数量 */
  heap_len: number;
  
  /** 堆的最大索引 */
  heap_max: number;
  
  /** 每个树节点的深度 */
  depth: Uint8Array;
  
  /** 符号缓冲区 */
  sym_buf: number;
  
  /** 符号缓冲区中的下一个位置 */
  sym_next: number;
  
  /** 符号缓冲区的结束位置 */
  sym_end: number;
  
  /** 当前块的最优长度（字节） */
  opt_len: number;
  
  /** 当前块的静态长度（字节） */
  static_len: number;
  
  /** 匹配的数量 */
  matches: number;
}

/**
 * DEFLATE流对象
 */
interface DeflateStream {
  /** 数据类型标志 */
  data_type: number;
}

/**
 * 将数组清零
 * @param array - 要清零的数组
 */
declare function zeroArray(array: Uint8Array | Uint16Array | Int16Array): void;

/**
 * 获取距离码
 * @param distance - 距离值
 * @returns 对应的距离码
 */
declare function getDistanceCode(distance: number): number;

/**
 * 向输出缓冲区写入16位值（小端序）
 * @param state - DEFLATE状态
 * @param value - 要写入的值
 */
declare function putShort(state: DeflateState, value: number): void;

/**
 * 向位缓冲区写入指定位数的值
 * @param state - DEFLATE状态
 * @param value - 要写入的值
 * @param length - 位数
 */
declare function sendBits(state: DeflateState, value: number, length: number): void;

/**
 * 发送树中的一个码
 * @param state - DEFLATE状态
 * @param code - 码值
 * @param tree - 树数组
 */
declare function sendCode(state: DeflateState, code: number, tree: Uint16Array): void;

/**
 * 反转位序
 * @param code - 要反转的码
 * @param length - 位长度
 * @returns 反转后的码
 */
declare function reverseBits(code: number, length: number): number;

/**
 * 生成树的位长度码
 * @param tree - 树数组
 * @param maxCode - 最大码值
 * @param bitLengthCount - 位长度计数数组
 */
declare function generateCodes(tree: Uint16Array, maxCode: number, bitLengthCount: Uint16Array): void;

/**
 * 初始化树状态
 * @param state - DEFLATE状态
 */
declare function initTreeState(state: DeflateState): void;

/**
 * 刷新位缓冲区
 * @param state - DEFLATE状态
 */
declare function flushBitBuffer(state: DeflateState): void;

/**
 * 比较树节点
 * @param tree - 树数组
 * @param node1 - 第一个节点索引
 * @param node2 - 第二个节点索引
 * @param depth - 深度数组
 * @returns 如果node1小于node2返回true
 */
declare function smallerNode(
  tree: Uint16Array,
  node1: number,
  node2: number,
  depth: Uint8Array
): boolean;

/**
 * 下沉堆操作
 * @param state - DEFLATE状态
 * @param tree - 树数组
 * @param index - 堆索引
 */
declare function siftDown(state: DeflateState, tree: Uint16Array, index: number): void;

/**
 * 发送所有码
 * @param state - DEFLATE状态
 * @param literalTree - 字面量/长度树
 * @param distanceTree - 距离树
 */
declare function sendAllCodes(
  state: DeflateState,
  literalTree: Uint16Array,
  distanceTree: Uint16Array
): void;

/**
 * 构建霍夫曼树
 * @param state - DEFLATE状态
 * @param treeDesc - 树描述符
 */
declare function buildTree(state: DeflateState, treeDesc: TreeDescriptor): void;

/**
 * 扫描树以确定频率
 * @param state - DEFLATE状态
 * @param tree - 树数组
 * @param maxCode - 最大码值
 */
declare function scanTree(state: DeflateState, tree: Uint16Array, maxCode: number): void;

/**
 * 发送树
 * @param state - DEFLATE状态
 * @param tree - 树数组
 * @param maxCode - 最大码值
 */
declare function sendTree(state: DeflateState, tree: Uint16Array, maxCode: number): void;

/**
 * 构建位长度树
 * @param state - DEFLATE状态
 * @returns 位长度码的最大索引
 */
declare function buildBitLengthTree(state: DeflateState): number;

/**
 * 发送所有树
 * @param state - DEFLATE状态
 * @param literalCodes - 字面量码数量
 * @param distanceCodes - 距离码数量
 * @param blCodes - 位长度码数量
 */
declare function sendAllTrees(
  state: DeflateState,
  literalCodes: number,
  distanceCodes: number,
  blCodes: number
): void;

/**
 * 存储未压缩块
 * @param state - DEFLATE状态
 * @param blockStart - 块起始位置
 * @param blockLength - 块长度
 * @param lastBlock - 是否为最后一个块
 */
declare function storeBlock(
  state: DeflateState,
  blockStart: number,
  blockLength: number,
  lastBlock: boolean
): void;

/**
 * 检测数据类型
 * @param state - DEFLATE状态
 * @returns 数据类型 (0=binary, 1=text)
 */
declare function detectDataType(state: DeflateState): number;

/**
 * 双字节对齐
 * @param state - DEFLATE状态
 */
declare function alignToByte(state: DeflateState): void;

/**
 * 初始化树结构
 * 必须在压缩开始前调用
 * @param state - DEFLATE状态
 */
export declare function _tr_init(state: DeflateState): void;

/**
 * 存储块而不进行压缩
 * @param state - DEFLATE状态
 * @param blockStart - 块起始位置
 * @param blockLength - 块长度
 * @param lastBlock - 是否为最后一个块
 */
export declare function _tr_stored_block(
  state: DeflateState,
  blockStart: number,
  blockLength: number,
  lastBlock: boolean
): void;

/**
 * 刷新当前块
 * 确定最佳编码方式并输出块
 * @param state - DEFLATE状态
 * @param blockStart - 块起始位置（-1表示从上次刷新开始）
 * @param blockLength - 块长度
 * @param lastBlock - 是否为最后一个块
 */
export declare function _tr_flush_block(
  state: DeflateState,
  blockStart: number,
  blockLength: number,
  lastBlock: boolean
): void;

/**
 * 记录匹配或字面量
 * @param state - DEFLATE状态
 * @param distance - 匹配距离（0表示字面量）
 * @param length - 匹配长度或字面量值
 * @returns 如果当前块应该被刷新则返回true
 */
export declare function _tr_tally(
  state: DeflateState,
  distance: number,
  length: number
): boolean;

/**
 * 对齐输出到字节边界
 * 在存储块之前调用
 * @param state - DEFLATE状态
 */
export declare function _tr_align(state: DeflateState): void;