/**
 * 通用工具函数库
 * 提供类型检查、对象操作等常用功能
 */

/**
 * 遍历回调函数类型
 * @template T - 数组元素或对象值的类型
 */
type ForEachCallback<T = any> = (value: T, index: number | string, collection: T[] | Record<string, T>) => void;

/**
 * 检查值是否为数组
 * @param value - 待检查的值
 * @returns 如果是数组返回true，否则返回false
 */
export function isArray(value: any): value is any[];

/**
 * 检查值是否为ArrayBuffer
 * @param value - 待检查的值
 * @returns 如果是ArrayBuffer返回true，否则返回false
 */
export function isArrayBuffer(value: any): value is ArrayBuffer;

/**
 * 检查值是否为Buffer对象
 * @param value - 待检查的值
 * @returns 如果是Buffer返回true，否则返回false
 */
export function isBuffer(value: any): boolean;

/**
 * 检查值是否为FormData对象
 * @param value - 待检查的值
 * @returns 如果是FormData返回true，否则返回false
 */
export function isFormData(value: any): value is FormData;

/**
 * 检查值是否为ArrayBufferView（TypedArray或DataView）
 * @param value - 待检查的值
 * @returns 如果是ArrayBufferView返回true，否则返回false
 */
export function isArrayBufferView(value: any): value is ArrayBufferView;

/**
 * 检查值是否为字符串
 * @param value - 待检查的值
 * @returns 如果是字符串返回true，否则返回false
 */
export function isString(value: any): value is string;

/**
 * 检查值是否为数字
 * @param value - 待检查的值
 * @returns 如果是数字返回true，否则返回false
 */
export function isNumber(value: any): value is number;

/**
 * 检查值是否为对象（不包括null）
 * @param value - 待检查的值
 * @returns 如果是对象返回true，否则返回false
 */
export function isObject(value: any): value is object;

/**
 * 检查值是否为undefined
 * @param value - 待检查的值
 * @returns 如果是undefined返回true，否则返回false
 */
export function isUndefined(value: any): value is undefined;

/**
 * 检查值是否为Date对象
 * @param value - 待检查的值
 * @returns 如果是Date返回true，否则返回false
 */
export function isDate(value: any): value is Date;

/**
 * 检查值是否为File对象
 * @param value - 待检查的值
 * @returns 如果是File返回true，否则返回false
 */
export function isFile(value: any): value is File;

/**
 * 检查值是否为Blob对象
 * @param value - 待检查的值
 * @returns 如果是Blob返回true，否则返回false
 */
export function isBlob(value: any): value is Blob;

/**
 * 检查值是否为函数
 * @param value - 待检查的值
 * @returns 如果是函数返回true，否则返回false
 */
export function isFunction(value: any): value is Function;

/**
 * 检查值是否为Stream对象（Node.js环境）
 * @param value - 待检查的值
 * @returns 如果是Stream返回true，否则返回false
 */
export function isStream(value: any): boolean;

/**
 * 检查值是否为URLSearchParams对象
 * @param value - 待检查的值
 * @returns 如果是URLSearchParams返回true，否则返回false
 */
export function isURLSearchParams(value: any): value is URLSearchParams;

/**
 * 检查当前环境是否为标准浏览器环境
 * @returns 如果是标准浏览器环境返回true，否则返回false（如Node.js、React Native等）
 */
export function isStandardBrowserEnv(): boolean;

/**
 * 遍历数组或对象
 * @template T - 元素或值的类型
 * @param collection - 要遍历的数组或对象
 * @param callback - 每次迭代调用的回调函数
 */
export function forEach<T = any>(
  collection: T[] | Record<string, T> | null | undefined,
  callback: ForEachCallback<T>
): void;

/**
 * 浅合并多个对象（后面的对象属性会覆盖前面的）
 * @template T - 返回对象的类型
 * @param objects - 要合并的对象列表
 * @returns 合并后的新对象
 */
export function merge<T = any>(...objects: any[]): T;

/**
 * 深度合并多个对象（递归合并嵌套对象）
 * @template T - 返回对象的类型
 * @param objects - 要合并的对象列表
 * @returns 深度合并后的新对象
 */
export function deepMerge<T = any>(...objects: any[]): T;

/**
 * 将源对象的属性扩展到目标对象
 * @template T - 目标对象的类型
 * @template U - 源对象的类型
 * @param target - 目标对象
 * @param source - 源对象
 * @param thisArg - 可选的函数绑定上下文，用于绑定源对象中的函数方法
 * @returns 扩展后的目标对象
 */
export function extend<T extends object, U extends object>(
  target: T,
  source: U,
  thisArg?: any
): T & U;

/**
 * 去除字符串首尾的空白字符
 * @param str - 要处理的字符串
 * @returns 去除空白后的字符串
 */
export function trim(str: string): string;

/**
 * 默认导出：包含所有工具函数的对象
 */
declare const utils: {
  isArray: typeof isArray;
  isArrayBuffer: typeof isArrayBuffer;
  isBuffer: typeof isBuffer;
  isFormData: typeof isFormData;
  isArrayBufferView: typeof isArrayBufferView;
  isString: typeof isString;
  isNumber: typeof isNumber;
  isObject: typeof isObject;
  isUndefined: typeof isUndefined;
  isDate: typeof isDate;
  isFile: typeof isFile;
  isBlob: typeof isBlob;
  isFunction: typeof isFunction;
  isStream: typeof isStream;
  isURLSearchParams: typeof isURLSearchParams;
  isStandardBrowserEnv: typeof isStandardBrowserEnv;
  forEach: typeof forEach;
  merge: typeof merge;
  deepMerge: typeof deepMerge;
  extend: typeof extend;
  trim: typeof trim;
};

export default utils;