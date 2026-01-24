/**
 * VDatePickerDateTable 组件类型定义
 * 日期选择器的日期表格组件，用于显示月份视图中的日期网格
 */

import Vue from 'vue';
import { VNode } from 'vue/types/vnode';

/**
 * 日期格式化函数类型
 * @param date - ISO 8601 格式的日期字符串
 * @returns 格式化后的日期字符串
 */
type DateFormatter = (date: string) => string;

/**
 * 星期格式化函数类型
 * @param date - ISO 8601 格式的日期字符串
 * @returns 格式化后的星期字符串
 */
type WeekdayFormatter = (date: string) => string;

/**
 * VDatePickerDateTable 组件属性
 */
interface VDatePickerDateTableProps {
  /**
   * 一周的第一天（0 = 周日, 1 = 周一, ...）
   * @default 0
   */
  firstDayOfWeek: string | number;

  /**
   * 本地化设置中一年的第一天
   * 用于计算周数
   * @default 0
   */
  localeFirstDayOfYear: string | number;

  /**
   * 是否显示周数列
   * @default false
   */
  showWeek: boolean;

  /**
   * 自定义星期格式化函数
   * 如果未提供，将使用默认的本地化格式化器
   */
  weekdayFormat?: WeekdayFormatter;
}

/**
 * VDatePickerDateTable 组件计算属性
 */
interface VDatePickerDateTableComputed {
  /**
   * 日期格式化器
   * 返回用于格式化日期单元格的函数
   */
  formatter: DateFormatter;

  /**
   * 星期格式化器
   * 返回用于格式化星期标题的函数
   */
  weekdayFormatter: WeekdayFormatter;

  /**
   * 星期标题数组
   * 根据 firstDayOfWeek 排序的星期名称
   */
  weekDays: string[];
}

/**
 * VDatePickerDateTable 组件方法
 */
interface VDatePickerDateTableMethods {
  /**
   * 计算表格日期（用于月份导航）
   * @param direction - 方向值（正数向前，负数向后）
   * @returns 新的表格日期字符串
   */
  calculateTableDate(direction: number): string;

  /**
   * 生成表头元素
   * @returns 包含星期标题的 thead VNode
   */
  genTHead(): VNode;

  /**
   * 计算当月第一天之前的星期天数
   * 用于确定日期网格中的空白单元格数量
   * @returns 空白单元格数量
   */
  weekDaysBeforeFirstDayOfTheMonth(): number;

  /**
   * 获取指定日期的周数
   * @param day - 月份中的日期（1-31）
   * @returns ISO 周数
   */
  getWeekNumber(day: number): number;

  /**
   * 生成周数单元格
   * @param weekNumber - 周数值
   * @returns 包含周数的 td VNode
   */
  genWeekNumber(weekNumber: number): VNode;

  /**
   * 生成表体元素
   * @returns 包含日期单元格的 tbody VNode
   */
  genTBody(): VNode;

  /**
   * 生成表格行元素
   * @param children - 行内的单元格 VNode 数组
   * @returns 包含 tr 的 VNode 数组
   */
  genTR(children: VNode[]): VNode[];
}

/**
 * VDatePickerDateTable 组件
 * 继承自日期选择器表格混入，显示月份视图的日期网格
 */
declare const VDatePickerDateTable: Vue.extend<
  Vue,
  Record<string, unknown>,
  VDatePickerDateTableMethods,
  VDatePickerDateTableComputed,
  VDatePickerDateTableProps
> & {
  /**
   * 渲染函数
   * @returns 日期选择器表格的 VNode
   */
  render(): VNode;
};

export default VDatePickerDateTable;