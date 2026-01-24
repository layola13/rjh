/**
 * 函数重命名和元数据管理模块
 * 
 * 提供函数重命名、length/name属性配置、原型管理等功能。
 * 重写 Function.prototype.toString 以支持自定义源码输出。
 */

import type { Callable } from './types/callable';
import type { PropertyDescriptor } from './types/property-descriptor';

/**
 * 函数重命名配置选项
 */
interface RenameFunctionOptions {
  /** 期望的函数参数数量（arity） */
  arity?: number;
  /** 是否为 getter 访问器 */
  getter?: boolean;
  /** 是否为 setter 访问器 */
  setter?: boolean;
  /** 是否为构造函数 */
  constructor?: boolean;
}

/**
 * 内部状态存储结构
 */
interface FunctionInternalState {
  /** 函数的源码表示 */
  source?: string;
}

/**
 * 从工具模块导入的函数类型
 */
type Uncurried<T> = (thisArg: T, ...args: any[]) => any;

/**
 * 原生函数引用（避免被篡改）
 */
declare const stringSlice: Uncurried<string>;
declare const stringReplace: Uncurried<string>;
declare const arrayJoin: Uncurried<any[]>;

/**
 * 对象属性定义函数
 */
declare const defineProperty: typeof Object.defineProperty;

/**
 * 检查对象是否拥有指定属性
 */
declare function hasOwnProperty(obj: unknown, prop: PropertyKey): boolean;

/**
 * 检查值是否为可调用函数
 */
declare function isCallable(value: unknown): value is Callable;

/**
 * 获取函数的内部检查函数（用于输出源码）
 */
declare function inspectSource(fn: Function): string;

/**
 * 内部状态管理器
 */
declare const internalState: {
  /** 设置对象的内部状态 */
  enforce: <T extends object>(target: T) => FunctionInternalState;
  /** 获取对象的内部状态 */
  get: <T extends object>(target: T) => FunctionInternalState | undefined;
};

/**
 * 环境特性检测
 */
declare const DESCRIPTORS: boolean; // 是否支持属性描述符
declare const CONFIGURABLE_FUNCTION_NAME: boolean; // name 属性是否可配置

/**
 * 是否支持正确配置 length 属性
 * 某些引擎中 length 属性可能无法正确设置
 */
declare const CONFIGURABLE_LENGTH: boolean;

/**
 * 用于存储原始模板的数组
 * 格式：["String"] 用于生成 "String" 占位符
 */
declare const TEMPLATE_PARTS: string[];

/**
 * 重命名函数并配置其元数据属性
 * 
 * @param target - 要重命名的目标函数
 * @param newName - 新的函数名称（支持 Symbol 格式）
 * @param options - 配置选项
 * @returns 返回配置后的函数
 * 
 * @example
 *