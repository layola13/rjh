/**
 * 订阅者接口定义
 * 表示可观察对象的订阅者状态和目标
 */
interface Subscriber<T> {
  /** 订阅是否已关闭 */
  closed: boolean;
  
  /** 是否已停止接收值 */
  isStopped: boolean;
  
  /** 下一个目标订阅者（用于订阅链） */
  destination: Subscriber<T> | null;
}

/**
 * 检查订阅者是否未停止
 * 
 * 遍历订阅者链，检查链中的每个订阅者是否处于活跃状态（未关闭且未停止）。
 * 如果链中任何订阅者已关闭或已停止，则返回 false。
 * 
 * @template T - 订阅者处理的数据类型
 * @param subscriber - 要检查的订阅者实例
 * @returns 如果订阅者及其目标链都处于活跃状态则返回 true，否则返回 false
 * 
 * @example
 *