/**
 * 创建观察者或监听器的工厂函数
 * 
 * @remarks
 * 该函数支持两种调用模式：
 * 1. 单参数模式：直接传入源对象
 * 2. 双参数模式：传入源对象和配置对象
 * 
 * 通常用于响应式编程或事件监听场景
 */
export function a<T>(...args: [source: T]): ReturnType<typeof import('./module_21').a>;
export function a<T, TConfig>(...args: [source: T, config: TConfig]): ReturnType<typeof import('./module_81').a>;
export function a<T>(...args: T[]): unknown;

/**
 * 判断给定值是否为普通对象
 * 
 * @param value - 要检查的值
 * @returns 如果是普通对象返回 true，否则返回 false
 */
declare function isPlainObject(value: unknown): value is Record<string, unknown>;

/**
 * 创建单源观察者
 * 
 * @param source - 观察源对象
 * @returns 观察者实例
 */
declare function createSingleSourceObserver<T>(source: T): unknown;

/**
 * 合并多个参数并创建复合观察者
 * 
 * @param args - 可变参数列表
 * @returns 合并后的观察者实例
 */
declare function mergeArguments<T extends unknown[]>(...args: T): unknown;

/**
 * 高阶函数工厂，返回处理合并参数的函数
 * 
 * @returns 合并参数的处理函数
 */
declare function createMergeFactory(): (...args: unknown[]) => unknown;