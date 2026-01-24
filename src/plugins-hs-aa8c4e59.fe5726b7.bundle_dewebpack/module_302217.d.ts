/**
 * 数据批处理管理器
 * 用于收集数据并在提交时通过回调函数批量处理
 */

/**
 * 提交回调函数类型
 * @param batch - 当前批处理实例
 */
type CommitCallbackFunc<K = unknown, V = unknown> = (batch: DataBatch<K, V>) => void;

/**
 * 数据批处理类
 * 提供数据收集、获取、提交和销毁功能
 * 
 * @template K - Map键的类型
 * @template V - Map值的类型
 * 
 * @example
 *