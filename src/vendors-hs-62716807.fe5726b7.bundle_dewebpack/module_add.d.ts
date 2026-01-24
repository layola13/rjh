/**
 * 链表节点接口
 * 表示链表中的单个节点结构
 */
interface LinkedListNode<T> {
  /** 节点存储的数据项 */
  item: T;
  /** 指向下一个节点的引用，如果是尾节点则为null */
  next: LinkedListNode<T> | null;
}

/**
 * 向链表尾部添加新元素
 * 
 * @template T - 链表中存储的元素类型
 * @param e - 要添加到链表的元素
 * @returns void
 * 
 * @remarks
 * 该方法维护链表的头节点(head)和尾节点(tail)：
 * - 如果链表为空（tail为null），新节点将成为头节点
 * - 如果链表不为空，新节点将链接到当前尾节点之后
 * - 新节点始终成为新的尾节点
 * 
 * @example
 *