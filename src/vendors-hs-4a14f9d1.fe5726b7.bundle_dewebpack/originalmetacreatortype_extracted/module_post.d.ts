/**
 * HTTP POST 请求方法的模块导出
 * @module module_post
 */

/**
 * 执行 HTTP POST 请求
 * 
 * @template T - 响应数据的类型
 * @template D - 请求体数据的类型
 * 
 * @param url - 请求的目标 URL
 * @param data - 要发送的请求体数据
 * @param config - 请求配置选项
 * 
 * @returns Promise 对象，解析为响应数据
 * 
 * @example
 *