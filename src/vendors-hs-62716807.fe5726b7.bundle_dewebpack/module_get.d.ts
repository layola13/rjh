/**
 * 从链表头部获取并移除一个元素
 * 
 * 该方法实现了队列的出队操作（FIFO）:
 * 1. 获取头节点
 * 2. 将头指针移动到下一个节点
 * 3. 如果链表为空，同时清空尾指针
 * 4. 返回原头节点的数据
 * 
 * @template T 链表中存储的元素类型
 * @returns 头节点的数据项，如果链表为空则返回 undefined
 */
declare function get<T>(): T | undefined;

/**
 * 链表节点接口
 * @template T 节点存储的数据类型
 */
interface LinkedListNode<T> {
  /** 节点存储的数据项 */
  item: T;
  /** 指向下一个节点的引用 */
  next: LinkedListNode<T> | null;
}

/**
 * 链表上下文接口（this 的类型定义）
 * @template T 链表中存储的元素类型
 */
interface LinkedListContext<T> {
  /** 链表头节点 */
  head: LinkedListNode<T> | null;
  /** 链表尾节点 */
  tail: LinkedListNode<T> | null;
}