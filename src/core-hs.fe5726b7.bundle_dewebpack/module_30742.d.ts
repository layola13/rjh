/**
 * 创建自定义错误类的工厂函数
 * 
 * @param errorPath - 错误构造函数的路径，如 "TypeError" 或 "AggregateError"
 * @param wrapper - 包装函数，用于创建错误实例的工厂
 * @param forceInstall - 是否强制安装/覆盖现有实现
 * @param isAggregateError - 是否为聚合错误（需要额外的 errors 参数）
 * @returns 增强的错误构造函数
 * 
 * @example
 *