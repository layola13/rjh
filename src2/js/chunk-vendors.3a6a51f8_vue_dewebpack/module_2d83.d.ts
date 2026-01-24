/**
 * 错误增强工具函数
 * 创建一个新的 Error 实例并通过辅助函数进行增强
 * 
 * @module ErrorEnhancer
 */

/**
 * 创建并增强错误对象
 * 
 * @param message - 错误消息
 * @param config - 配置对象或上下文信息
 * @param code - 错误代码或类型标识符
 * @param request - 相关的请求对象或请求信息
 * @param response - 相关的响应对象或响应信息
 * @returns 增强后的 Error 实例，包含额外的元数据
 * 
 * @example
 *