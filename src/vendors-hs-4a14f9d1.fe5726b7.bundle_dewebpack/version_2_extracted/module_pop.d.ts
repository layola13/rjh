/**
 * 队列节点类型
 * 使用元组表示链表节点：[当前值, 下一个节点]
 */
type QueueNode<T> = [T, QueueNode<T> | null];

/**
 * 队列接口定义
 * 实现了基于链表的FIFO（先进先出）数据结构
 */
interface Queue<T> {
  /**
   * 队列头节点（第一个元素）
   */
  h: QueueNode<T> | null;

  /**
   * 队列尾节点（最后一个元素）
   */
  q: QueueNode<T> | null;

  /**
   * 队列当前长度
   */
  length: number;

  /**
   * 从队列头部移除并返回第一个元素
   * 
   * @returns 队列头部的元素值，如果队列为空则返回 null
   * 
   * @remarks
   * - 时间复杂度：O(1)
   * - 会自动更新队列长度
   * - 当移除最后一个元素时，会将尾指针 q 设置为 null
   */
  pop(): T | null;
}