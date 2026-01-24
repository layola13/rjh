/**
 * 百分比统计模块
 * 
 * 用于记录和上报百分比类型的性能或业务指标数据
 * @module module_percent
 * @originalId percent
 */

/**
 * 记录百分比类型的统计数据
 * 
 * @param key - 主键，标识统计指标的类别（如：页面加载、接口调用等）
 * @param subkey - 子键，标识统计指标的具体项（如：具体页面名称、接口名称等）
 * @param value - 百分比数值，默认为 0。通常表示完成度、成功率等百分比指标
 * @param options - 附加配置选项，用于传递额外的上报参数或行为控制
 * @returns 返回日志记录的结果，具体类型取决于 _lg 方法的实现
 * @throws 当数据解析失败时会捕获异常并通过 warn 方法输出警告日志
 * 
 * @example
 *