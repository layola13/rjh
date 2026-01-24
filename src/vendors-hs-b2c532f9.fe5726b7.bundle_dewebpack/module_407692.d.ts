/**
 * Mixin工具库 - 提供JavaScript类的组合式继承能力
 * @module MixinUtilities
 */

/**
 * 缓存的应用引用符号
 * 用于在对象上存储mixin应用后的缓存实例
 */
declare const _cachedApplicationRef: unique symbol;

/**
 * Mixin引用符号
 * 标识对象所应用的mixin
 */
declare const _mixinRef: unique symbol;

/**
 * 原始Mixin符号
 * 存储未被包装的原始mixin函数
 */
declare const _originalMixin: unique symbol;

/**
 * Mixin函数类型定义
 * @template TBase - 基类类型
 * @template TResult - 返回的扩展类型
 */
type MixinFunction<TBase = any, TResult = any> = (base: TBase) => TResult;

/**
 * 构造函数类型
 * @template T - 实例类型
 */
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * 包装mixin函数,设置原型链并保留原始引用
 * @param originalMixin - 原始的mixin函数
 * @param wrappedMixin - 包装后的mixin函数
 * @returns 包装后的mixin函数,带有正确的原型链
 */
export function wrap<T extends MixinFunction>(
  originalMixin: T,
  wrappedMixin: T
): T;

/**
 * 创建带缓存能力的mixin
 * 确保同一个mixin在同一个对象上只会被应用一次,后续调用返回缓存的结果
 * 
 * @param mixinFunction - 要缓存的mixin函数
 * @returns 带缓存能力的mixin函数
 * 
 * @example
 * const CachedMixin = Cached((Base) => class extends Base {
 *   // 扩展逻辑
 * });
 */
export function Cached<TBase, TResult>(
  mixinFunction: (base: TBase) => TResult
): (base: TBase) => TResult;

/**
 * 为mixin添加Symbol.hasInstance支持
 * 使instanceof操作符能够正确识别应用了该mixin的实例
 * 
 * @param mixinFunction - 要添加instanceof支持的mixin函数
 * @returns 支持instanceof检测的mixin函数
 * 
 * @example
 * const MyMixin = HasInstance((Base) => class extends Base {});
 * const instance = new (MyMixin(Object))();
 * console.log(instance instanceof MyMixin); // true
 */
export function HasInstance<T extends MixinFunction>(
  mixinFunction: T
): T;

/**
 * 创建基础的mixin函数
 * 在返回的类原型上标记mixin引用,用于后续的instanceof检测
 * 
 * @param mixinFunction - 原始mixin函数
 * @returns 标记了引用的mixin函数
 */
export function BareMixin<TBase extends Constructor, TResult extends Constructor>(
  mixinFunction: (base: TBase) => TResult
): (base: TBase) => TResult;

/**
 * 完整的Mixin工厂函数
 * 组合了Cached、HasInstance和BareMixin的所有功能
 * 
 * @param mixinFunction - 要转换为完整mixin的函数
 * @returns 功能完整的mixin函数(带缓存、instanceof支持和引用标记)
 * 
 * @example
 * const LoggableMixin = Mixin((Base) => 
 *   class Loggable extends Base {
 *     log(message: string): void {
 *       console.log(`[${this.constructor.name}] ${message}`);
 *     }
 *   }
 * );
 */
export function Mixin<TBase extends Constructor, TResult extends Constructor>(
  mixinFunction: (base: TBase) => TResult
): (base: TBase) => TResult;

/**
 * 创建mixin组合构建器
 * 提供链式API来组合多个mixin
 * 
 * @param superclass - 基类
 * @returns MixinBuilder实例,支持链式调用
 * 
 * @example
 * class Base {}
 * const Mixin1 = (Base) => class extends Base { method1() {} };
 * const Mixin2 = (Base) => class extends Base { method2() {} };
 * 
 * const Combined = mix(Base).with(Mixin1, Mixin2);
 * const instance = new Combined();
 */
export function mix<T extends Constructor>(superclass: T): MixinBuilder<T>;

/**
 * Mixin组合构建器
 * 用于以声明式方式组合多个mixin
 */
export class MixinBuilder<TBase extends Constructor> {
  /**
   * 当前的基类
   */
  readonly superclass: TBase;

  /**
   * @param superclass - 要扩展的基类
   */
  constructor(superclass: TBase);

  /**
   * 将一个或多个mixin应用到基类上
   * 
   * @param mixins - 要应用的mixin函数列表
   * @returns 应用了所有mixin的新类
   * 
   * @example
   * const Result = new MixinBuilder(Base).with(Mixin1, Mixin2, Mixin3);
   */
  with<M1>(
    mixin1: (base: TBase) => M1
  ): M1;
  
  with<M1, M2>(
    mixin1: (base: TBase) => M1,
    mixin2: (base: M1) => M2
  ): M2;
  
  with<M1, M2, M3>(
    mixin1: (base: TBase) => M1,
    mixin2: (base: M1) => M2,
    mixin3: (base: M2) => M3
  ): M3;
  
  with<M1, M2, M3, M4>(
    mixin1: (base: TBase) => M1,
    mixin2: (base: M1) => M2,
    mixin3: (base: M2) => M3,
    mixin4: (base: M3) => M4
  ): M4;

  /**
   * 通用重载,支持任意数量的mixin
   */
  with(...mixins: Array<MixinFunction>): any;
}

/**
 * 扩展对象接口以支持内部符号
 */
declare global {
  interface Object {
    /**
     * 缓存的mixin应用结果
     * @internal
     */
    [_cachedApplicationRef]?: symbol;
    
    /**
     * 应用到此对象的mixin引用
     * @internal
     */
    [_mixinRef]?: MixinFunction;
  }
  
  interface Function {
    /**
     * 原始未包装的mixin函数
     * @internal
     */
    [_originalMixin]?: MixinFunction;
  }
}

export {
  _cachedApplicationRef,
  _mixinRef,
  _originalMixin
};