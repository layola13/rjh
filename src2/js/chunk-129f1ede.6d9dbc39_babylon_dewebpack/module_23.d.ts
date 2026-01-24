/**
 * 从数组创建Observable的调度函数
 * 
 * 此模块提供了一个工厂函数，用于将数组转换为Observable流。
 * 支持可选的调度器参数来控制值的发射时机。
 * 
 * @module fromArray
 */

import { Observable } from 'rxjs';
import { SchedulerLike } from 'rxjs';

/**
 * 从数组创建Observable
 * 
 * 根据是否提供调度器，采用不同的策略：
 * - 有调度器：使用调度器控制异步发射数组中的每个元素
 * - 无调度器：同步发射所有元素
 * 
 * @template T 数组元素的类型
 * @param array 要转换为Observable的源数组
 * @param scheduler 可选的调度器，用于控制值的发射时机
 * @returns 发射数组中所有元素的Observable
 * 
 * @example
 *