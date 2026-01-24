/**
 * 从数组创建可观察对象的工厂函数
 * @module observableFromArray
 */

import { Observable } from './Observable';
import { Subscription } from './Subscription';
import { subscribeToArray } from './subscribeToArray';

/**
 * 从数组创建一个 Observable
 * 
 * @template T - 数组元素的类型
 * @param array - 源数组，将按顺序发射其中的元素
 * @param scheduler - 可选的调度器，用于控制值的发射时机
 * @returns 返回一个 Observable，它会发射数组中的每个元素
 * 
 * @remarks
 * - 如果提供了 scheduler，将使用调度器异步发射值
 * - 如果未提供 scheduler，将同步发射所有值
 * 
 * @example
 *