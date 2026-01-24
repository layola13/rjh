/**
 * Immer Draft State 内部符号
 * 用于标记和访问代理对象的内部状态
 */
declare const DRAFT_STATE: unique symbol;

/**
 * 属性描述符工厂函数类型
 * @param propertyKey - 属性键名
 * @param enumerable - 是否可枚举
 * @returns 属性描述符对象
 */
type PropertyDescriptorFactory = (
  propertyKey: string | number,
  enumerable: boolean
) => PropertyDescriptor;

/**
 * Draft 内部状态接口
 * 用于追踪代理对象的修改状态
 */
interface DraftState<T = any> {
  /** 状态类型标识: 4=对象代理, 5=数组代理 */
  t: 4 | 5;
  
  /** 作用域标识符 */
  A: symbol;
  
  /** 是否已完成（finalized） */
  g: boolean;
  
  /** 是否已撤销（revoked） */
  R: boolean;
  
  /** 已修改的属性集合 */
  N: Record<string | number, any>;
  
  /** 父级 Draft 状态 */
  l: DraftState | null;
  
  /** 原始基础对象 */
  u: T;
  
  /** 代理对象本身 */
  k: T;
  
  /** 复制的对象（写时复制） */
  i: T | null;
  
  /** 是否为手动创建的 Draft */
  O: boolean;
  
  /** 是否已修改 */
  C: boolean;
}

/**
 * 获取所有属性描述符的辅助函数类型
 * @param obj - 目标对象
 * @returns 属性描述符映射表
 */
type GetOwnPropertyDescriptorsFunction = (
  obj: any
) => Record<string | number, PropertyDescriptor>;

/**
 * 获取所有属性键的辅助函数类型
 * @param descriptors - 属性描述符映射表
 * @returns 属性键数组
 */
type GetPropertyKeysFunction = (
  descriptors: Record<string | number, PropertyDescriptor>
) => Array<string | number>;

/**
 * 创建 Draft 代理对象
 * 该函数为 Immer 库的核心工厂方法，用于创建可追踪修改的代理对象
 * 
 * @template T - 原始对象类型
 * @param base - 原始基础对象（数组或普通对象）
 * @param parent - 父级 Draft 状态（可选）
 * @returns 包含内部状态的代理对象
 * 
 * @remarks
 * - 对于数组：创建类型为 5 的 Draft
 * - 对于对象：创建类型为 4 的 Draft
 * - 使用 Object.create 创建原型链继承
 * - 通过 DRAFT_STATE 符号存储内部状态
 * 
 * @example
 *