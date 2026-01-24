/**
 * JSON Patch 操作类型
 * 定义了支持的补丁操作
 */
type PatchOperation = 'replace' | 'add' | 'remove';

/**
 * 数据结构类型枚举
 * 用于标识目标对象的类型
 */
const enum DataStructureType {
  /** 数组类型 */
  Array = 1,
  /** Map 类型 */
  Map = 2,
  /** Set 类型 */
  Set = 3,
  /** 普通对象类型 */
  Object = 0
}

/**
 * JSON Patch 补丁对象接口
 * 符合 RFC 6902 标准
 */
interface PatchObject {
  /** JSON Pointer 路径，指向要操作的位置 */
  path: Array<string | number>;
  
  /** 补丁操作类型 */
  op: PatchOperation;
  
  /** 
   * 操作值
   * - add: 要添加的值
   * - replace: 替换后的新值
   * - remove: 要删除的值（用于 Set）
   */
  value?: unknown;
}

/**
 * 应用 JSON Patch 操作到目标对象
 * 
 * @template T - 目标对象的类型
 * @param target - 要修改的目标对象（会被直接修改）
 * @param patches - 要应用的补丁操作数组
 * @returns 修改后的目标对象
 * 
 * @throws {Error} 当操作不安全时（如修改 __proto__ 或 constructor）
 * @throws {Error} 当路径指向的不是对象时
 * @throws {Error} 当操作类型未知时
 * 
 * @example
 *