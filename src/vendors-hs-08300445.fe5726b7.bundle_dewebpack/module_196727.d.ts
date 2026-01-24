import { useMemo } from 'react';

/**
 * 选项项接口，包含键和数据值
 */
interface OptionItem<T = unknown> {
  /** 唯一标识键 */
  key: string | number;
  /** 选项数据 */
  data: {
    /** 选项的实际值 */
    value: T;
  };
}

/**
 * 创建选项映射的Hook返回类型
 * @template T - 选项值的类型
 */
type OptionMaps<T = unknown> = [
  /** 按key索引的Map */
  Map<string | number, OptionItem<T>>,
  /** 按value索引的Map */
  Map<T, OptionItem<T>>
];

/**
 * 根据选项列表创建双向映射表的Hook
 * 
 * 该Hook接收一个选项数组，返回两个Map：
 * - 第一个Map以选项的key为键，选项对象为值
 * - 第二个Map以选项的data.value为键，选项对象为值
 * 
 * 使用useMemo缓存结果，仅在选项列表变化时重新计算
 * 
 * @template T - 选项值的类型
 * @param options - 选项列表数组
 * @returns 包含两个Map的元组：[keyMap, valueMap]
 * 
 * @example
 *