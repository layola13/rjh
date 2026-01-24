/**
 * PUT请求模块
 * 
 * 用于发送HTTP PUT请求的函数包装器
 * 
 * @module module_put
 * @see A.put - 底层PUT请求实现
 */

/**
 * 发送HTTP PUT请求
 * 
 * @template T - 响应数据的类型
 * @param url - 请求的URL地址
 * @param data - 要发送的数据体
 * @param config - 请求配置选项
 * @returns Promise，解析为响应数据
 * 
 * @example
 *