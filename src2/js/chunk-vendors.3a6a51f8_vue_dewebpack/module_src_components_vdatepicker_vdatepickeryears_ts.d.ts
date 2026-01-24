/**
 * VDatePickerYears 组件类型定义
 * 用于日期选择器中的年份选择列表
 */

import { VNode } from 'vue';
import { PropType } from 'vue';

/**
 * 年份格式化函数类型
 * @param year - 年份字符串
 * @returns 格式化后的年份字符串
 */
type YearFormatterFunction = (year: string) => string;

/**
 * 原生事件监听器配置
 */
interface NativeListeners {
  [key: string]: Function | Function[];
}

/**
 * 组件数据接口
 */
interface VDatePickerYearsData {
  /** 默认颜色主题 */
  defaultColor: string;
}

/**
 * 组件计算属性接口
 */
interface VDatePickerYearsComputed {
  /** 年份格式化函数 */
  formatter: YearFormatterFunction;
}

/**
 * 组件属性接口
 */
interface VDatePickerYearsProps {
  /** 自定义年份格式化函数 */
  format?: YearFormatterFunction;
  
  /** 最小可选年份 */
  min?: number | string;
  
  /** 最大可选年份 */
  max?: number | string;
  
  /** 是否只读模式 */
  readonly?: boolean;
  
  /** 当前选中的年份值 */
  value?: number | string;
  
  /** 颜色主题 */
  color?: string;
}

/**
 * 组件方法接口
 */
interface VDatePickerYearsMethods {
  /**
   * 生成单个年份列表项
   * @param year - 年份值
   * @returns 年份列表项 VNode
   */
  genYearItem(year: number): VNode;
  
  /**
   * 生成所有年份列表项
   * @returns 年份列表项数组
   */
  genYearItems(): VNode[];
}

/**
 * VDatePickerYears 组件
 * 
 * 日期选择器的年份选择列表组件，支持：
 * - 自定义年份范围（min/max）
 * - 自定义格式化函数
 * - 自动滚动到选中年份
 * - 主题颜色定制
 * 
 * @example
 *