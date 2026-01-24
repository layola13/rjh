/**
 * Module: module_value
 * Original ID: value
 */

/**
 * 表示可被所有者管理的对象接口
 */
interface Detachable {
  /**
   * 从当前所有者分离此对象
   * @returns 如果成功分离返回 true，否则返回 false
   */
  detach(target: Ownable): void;
}

/**
 * 可拥有的对象，具有所有者引用和分离能力
 */
interface Ownable {
  /**
   * 此对象的所有者引用，可能为 null
   */
  _owner: Detachable | null;

  /**
   * 尝试从当前所有者分离
   * @returns 如果有所有者且成功分离返回 true，如果没有所有者返回 false
   */
  detachFromOwner(): boolean;
}

declare module 'module_value' {
  export type { Detachable, Ownable };
  
  /**
   * 执行分离操作的工具函数
   * @param context - 包含 _owner 属性的上下文对象
   * @returns 分离操作的结果
   */
  export function detachFromOwner(this: Ownable): boolean;
}