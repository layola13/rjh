/**
 * 对象状态接口
 * 表示一个可变状态对象，包含原始数据、修改记录和副本
 */
interface MutableState<T = any> {
  /** 原始对象/基础对象 (underlying object) */
  u: T;
  
  /** 修改标记映射 (modifications map) - 记录哪些属性被修改过 */
  N: Record<string | symbol, boolean>;
  
  /** 副本对象 (copy) - 存储修改后的值 */
  i?: T;
}

/**
 * 模块：deleteProperty
 * 
 * 从可变状态对象中删除指定属性的函数
 * 
 * @remarks
 * 该函数实现了以下逻辑：
 * 1. 检查属性是否存在于原始对象中或已被定义
 * 2. 如果存在，将其标记为已删除（设为false），并触发更新操作
 * 3. 如果不存在，直接从修改标记中移除该属性
 * 4. 同时从副本对象中删除该属性（如果副本存在）
 * 
 * @template T - 状态对象的类型
 * @param state - 可变状态对象，包含原始数据、修改标记和副本
 * @param propertyKey - 要删除的属性键（字符串或Symbol）
 * @returns 始终返回 true，表示删除操作成功（符合Proxy deleteProperty trap规范）
 * 
 * @example
 *