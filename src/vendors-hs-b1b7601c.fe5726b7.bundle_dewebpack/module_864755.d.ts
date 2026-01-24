/**
 * RxJS skipWhile 操作符类型定义
 * 
 * 跳过源 Observable 发出的值，直到提供的谓词函数返回 false。
 * 一旦谓词返回 false，该操作符将发出所有后续值。
 */

import { Observable } from 'rxjs';

/**
 * 谓词函数类型，用于判断是否应跳过当前值
 * 
 * @template T - Observable 发出的值的类型
 * @param value - 当前发出的值
 * @param index - 值的索引（从 0 开始）
 * @returns 如果返回 true，则跳过该值；返回 false 时停止跳过
 */
export type SkipWhilePredicate<T> = (value: T, index: number) => boolean;

/**
 * 一元操作符函数类型，用于转换 Observable
 * 
 * @template T - 输入 Observable 的值类型
 * @template R - 输出 Observable 的值类型
 */
export type MonoTypeOperatorFunction<T> = (source: Observable<T>) => Observable<T>;

/**
 * skipWhile 操作符
 * 
 * 跳过源 Observable 发出的值，直到谓词函数返回 false。
 * 从谓词首次返回 false 开始，将发出所有后续的值。
 * 
 * @template T - Observable 发出的值的类型
 * @param predicate - 谓词函数，对每个源值进行测试。接收值和索引作为参数
 * @returns 返回一个操作符函数，该函数返回一个 Observable，
 *          它在谓词函数返回 false 之前跳过所有值，之后发出所有值
 * 
 * @example
 *