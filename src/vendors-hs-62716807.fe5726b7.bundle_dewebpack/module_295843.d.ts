/**
 * 工具函数类型声明
 * 提供常用的类型检查、对象操作和迭代功能
 */

/**
 * 迭代器回调函数类型
 * @template T - 被迭代元素的类型
 * @template K - 键的类型（数组为number，对象为string）
 */
type ForEachCallback<T = any, K extends string | number = any> = (
  value: T,
  key: K,
  collection: T[] | Record<string, T>
) => void;

/**
 * 对象扩展回调函数类型
 */
type ExtendCallback = (value: any, key: string) => any;

/**
 * 工具函数模块接口
 */
interface UtilsModule {
  /**
   * 检查值是否为数组
   * @param value - 待检查的值
   * @returns 如果是数组返回 true，否则返回 false
   */
  isArray(value: any): value is any[];

  /**
   * 检查值是否为 ArrayBuffer
   * @param value - 待检查的值
   * @returns 如果是 ArrayBuffer 返回 true，否则返回 false
   */
  isArrayBuffer(value: any): value is ArrayBuffer;

  /**
   * 检查值是否为 Buffer（Node.js Buffer 对象）
   * @param value - 待检查的值
   * @returns 如果是 Buffer 返回 true，否则返回 false
   * @description 检查对象是否具有 constructor.isBuffer 方法
   */
  isBuffer(value: any): boolean;

  /**
   * 检查值是否为 FormData
   * @param value - 待检查的值
   * @returns 如果是 FormData 返回 true，否则返回 false
   */
  isFormData(value: any): value is FormData;

  /**
   * 检查值是否为 ArrayBuffer 视图（TypedArray 或 DataView）
   * @param value - 待检查的值
   * @returns 如果是 ArrayBufferView 返回 true，否则返回 false
   */
  isArrayBufferView(value: any): value is ArrayBufferView;

  /**
   * 检查值是否为字符串
   * @param value - 待检查的值
   * @returns 如果是字符串返回 true，否则返回 false
   */
  isString(value: any): value is string;

  /**
   * 检查值是否为数字
   * @param value - 待检查的值
   * @returns 如果是数字返回 true，否则返回 false
   */
  isNumber(value: any): value is number;

  /**
   * 检查值是否为对象（非 null 的对象类型）
   * @param value - 待检查的值
   * @returns 如果是对象返回 true，否则返回 false
   */
  isObject(value: any): value is Record<string, any>;

  /**
   * 检查值是否为 undefined
   * @param value - 待检查的值
   * @returns 如果是 undefined 返回 true，否则返回 false
   */
  isUndefined(value: any): value is undefined;

  /**
   * 检查值是否为 Date 对象
   * @param value - 待检查的值
   * @returns 如果是 Date 返回 true，否则返回 false
   */
  isDate(value: any): value is Date;

  /**
   * 检查值是否为 File 对象
   * @param value - 待检查的值
   * @returns 如果是 File 返回 true，否则返回 false
   */
  isFile(value: any): value is File;

  /**
   * 检查值是否为 Blob 对象
   * @param value - 待检查的值
   * @returns 如果是 Blob 返回 true，否则返回 false
   */
  isBlob(value: any): value is Blob;

  /**
   * 检查值是否为函数
   * @param value - 待检查的值
   * @returns 如果是函数返回 true，否则返回 false
   */
  isFunction(value: any): value is Function;

  /**
   * 检查值是否为 Stream（具有 pipe 方法的对象）
   * @param value - 待检查的值
   * @returns 如果是 Stream 返回 true，否则返回 false
   * @description 检查对象是否同时满足 isObject 和具有 pipe 函数
   */
  isStream(value: any): boolean;

  /**
   * 检查值是否为 URLSearchParams 对象
   * @param value - 待检查的值
   * @returns 如果是 URLSearchParams 返回 true，否则返回 false
   */
  isURLSearchParams(value: any): value is URLSearchParams;

  /**
   * 检查是否在标准浏览器环境中运行
   * @returns 如果是标准浏览器环境（非 ReactNative/NativeScript）返回 true
   * @description 排除 ReactNative、NativeScript、NS 等非标准浏览器环境
   */
  isStandardBrowserEnv(): boolean;

  /**
   * 遍历数组或对象的每个元素/属性
   * @param collection - 要遍历的数组或对象
   * @param callback - 对每个元素/属性调用的回调函数
   * @description 对数组按索引顺序遍历，对对象遍历自有属性（hasOwnProperty）
   */
  forEach<T = any>(
    collection: T[] | Record<string, T> | null | undefined,
    callback: ForEachCallback<T>
  ): void;

  /**
   * 浅合并多个对象（后面的对象属性会覆盖前面的）
   * @param sources - 要合并的源对象
   * @returns 合并后的新对象
   * @description 对于对象类型的属性，会递归调用 merge
   */
  merge<T extends Record<string, any> = Record<string, any>>(
    ...sources: Array<Partial<T> | null | undefined>
  ): T;

  /**
   * 深度合并多个对象（递归合并所有嵌套对象）
   * @param sources - 要合并的源对象
   * @returns 深度合并后的新对象
   * @description 与 merge 不同，会为对象类型的值创建新的副本
   */
  deepMerge<T extends Record<string, any> = Record<string, any>>(
    ...sources: Array<Partial<T> | null | undefined>
  ): T;

  /**
   * 将源对象的属性扩展到目标对象
   * @param target - 目标对象
   * @param source - 源对象
   * @param thisArg - 可选的 this 绑定上下文（用于函数属性）
   * @returns 扩展后的目标对象
   * @description 如果提供 thisArg 且属性值为函数，会将函数绑定到该上下文
   */
  extend<T extends Record<string, any>, S extends Record<string, any>>(
    target: T,
    source: S,
    thisArg?: any
  ): T & S;

  /**
   * 去除字符串首尾的空白字符
   * @param str - 要处理的字符串
   * @returns 去除首尾空白后的字符串
   */
  trim(str: string): string;
}

/**
 * 默认导出的工具函数模块
 */
declare const utils: UtilsModule;

export = utils;