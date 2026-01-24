/**
 * RxJS操作符：withLatestFrom
 * 将源Observable与其他Observable组合，每当源发出值时，
 * 发出源值和所有其他Observable的最新值的组合
 */

import { Observable, OperatorFunction, ObservedValueOf } from 'rxjs';

/**
 * 结果选择器函数类型
 * @template T 源Observable的值类型
 * @template R 其他Observable的值类型数组
 * @template Result 最终结果类型
 */
type ResultSelector<T, R extends unknown[], Result> = (
  sourceValue: T,
  ...otherValues: R
) => Result;

/**
 * withLatestFrom操作符
 * 
 * 组合源Observable与多个其他Observable，当源发出值时，
 * 将源值与所有其他Observable的最新值组合在一起发出。
 * 
 * @template T 源Observable的值类型
 * @template O 其他Observable类型的元组
 * @template R 结果类型
 * 
 * @param observables 要组合的其他Observable数组
 * @returns 返回一个操作符函数，用于转换Observable
 * 
 * @example
 *