/**
 * MTOP API响应结果处理模块
 * 用于处理阿里MTOP接口的标准化响应格式
 */

/**
 * MTOP接口返回状态
 */
interface MtopReturnStatus {
  /** 返回码，SUCCESS表示成功 */
  code: string;
  /** 返回消息 */
  message?: string;
}

/**
 * MTOP接口响应数据结构
 */
interface MtopResponseData {
  /** 业务数据（多种可能的数据字段） */
  data?: any;
  /** 业务结果（备选字段） */
  result?: any;
}

/**
 * MTOP接口完整响应结构
 */
interface MtopResponse {
  /** 返回状态数组，第一个元素包含SUCCESS表示成功 */
  ret: string[];
  /** 响应数据对象 */
  data: MtopResponseData;
  /** 备选结果字段 */
  result?: any;
}

/**
 * 处理MTOP接口响应结果
 * 
 * @description
 * 该函数用于标准化处理MTOP接口返回的数据：
 * 1. 等待Promise解析
 * 2. 验证响应结构和状态码（ret[0]必须包含"SUCCESS"）
 * 3. 按优先级提取业务数据：data.data > data.result > data > result
 * 
 * @param response - MTOP接口响应的Promise或响应对象
 * @returns 提取的业务数据
 * @throws {MtopResponse} 当响应结构不完整或状态码不为SUCCESS时抛出原始响应对象
 * 
 * @example
 *