/**
 * 协作编辑锁状态数据结构
 */
interface LockStateData {
  /** 设计ID */
  designId?: string;
  /** 其他锁状态相关属性 */
  [key: string]: unknown;
}

/**
 * MTOP API 响应结构
 */
interface MtopResponse<T = unknown> {
  /** 响应返回码数组，包含状态信息（如 "SUCCESS::调用成功"） */
  ret?: string[];
  /** 响应数据 */
  data?: T | { result: T };
  /** 是否为模拟API */
  mockApi?: boolean;
}

/**
 * 协作编辑设计检查结果
 */
interface CollaborateEditDesignResult {
  /** 设计ID */
  designId: string;
  /** 是否为协作模式 */
  collaborate: boolean;
}

/**
 * 清除锁状态
 * 
 * @param data - 锁状态数据
 * @returns 返回处理后的响应Promise
 * 
 * @example
 *