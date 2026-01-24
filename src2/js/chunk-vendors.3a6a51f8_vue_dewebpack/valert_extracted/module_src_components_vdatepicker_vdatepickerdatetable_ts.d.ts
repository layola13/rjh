/**
 * VDatePickerDateTable 组件类型定义
 * 用于日期选择器的日期表格视图组件
 */

import Vue from 'vue';
import { VNode } from 'vue/types/umd';

/**
 * 日期格式化函数类型
 * @param date - ISO格式的日期字符串
 * @returns 格式化后的日期字符串
 */
type DateFormatter = (date: string) => string;

/**
 * 星期格式化函数类型
 * @param date - ISO格式的日期字符串
 * @returns 格式化后的星期字符串
 */
type WeekdayFormatter = (date: string) => string;

/**
 * 日期表格组件的属性接口
 */
interface VDatePickerDateTableProps {
  /**
   * 一周的第一天（0=周日，1=周一，...，6=周六）
   * @default 0
   */
  firstDayOfWeek: string | number;

  /**
   * 本地化设置中一年的第一天
   * @default 0
   */
  localeFirstDayOfYear: string | number;

  /**
   * 是否显示周数列
   * @default false
   */
  showWeek: boolean;

  /**
   * 自定义星期名称格式化函数
   */
  weekdayFormat?: WeekdayFormatter;

  /**
   * 自定义日期格式化函数
   */
  format?: DateFormatter;

  /**
   * 当前使用的语言环境
   */
  currentLocale: string;

  /**
   * 当前显示的表格日期
   */
  tableDate: string;

  /**
   * 当前显示的年份
   */
  displayedYear: number;

  /**
   * 当前显示的月份（0-11）
   */
  displayedMonth: number;
}

/**
 * 日期表格组件的计算属性接口
 */
interface VDatePickerDateTableComputed {
  /**
   * 日期格式化器
   * 如果未提供自定义格式化函数，则使用默认的本地化格式化器
   */
  formatter: DateFormatter;

  /**
   * 星期名称格式化器
   * 如果未提供自定义格式化函数，则使用默认的本地化格式化器
   */
  weekdayFormatter: WeekdayFormatter;

  /**
   * 星期名称数组（从firstDayOfWeek开始排列）
   */
  weekDays: string[];
}

/**
 * 日期表格组件的方法接口
 */
interface VDatePickerDateTableMethods {
  /**
   * 计算切换月份后的表格日期
   * @param direction - 切换方向（正数为下个月，负数为上个月）
   * @returns 新的日期字符串
   */
  calculateTableDate(direction: number): string;

  /**
   * 生成表格头部（星期行）
   * @returns 表格头部VNode
   */
  genTHead(): VNode;

  /**
   * 计算本月第一天之前需要显示的空白天数
   * @returns 空白天数
   */
  weekDaysBeforeFirstDayOfTheMonth(): number;

  /**
   * 获取指定日期的周数
   * @param day - 月份中的日期（1-31）
   * @returns 一年中的周数
   */
  getWeekNumber(day: number): number;

  /**
   * 生成周数单元格
   * @param weekNumber - 周数
   * @returns 周数单元格VNode
   */
  genWeekNumber(weekNumber: number): VNode;

  /**
   * 生成表格主体（日期单元格）
   * @returns 表格主体VNode
   */
  genTBody(): VNode;

  /**
   * 生成表格行
   * @param children - 单元格VNode数组
   * @returns 表格行VNode数组
   */
  genTR(children: VNode[]): VNode[];

  /**
   * 生成按钮（继承自date-picker-table mixin）
   * @param value - 日期值
   * @param isAllowed - 是否允许选择
   * @param type - 按钮类型
   * @param formatter - 格式化函数
   * @returns 按钮VNode
   */
  genButton(
    value: string,
    isAllowed: boolean,
    type: string,
    formatter: DateFormatter
  ): VNode;

  /**
   * 生成表格（继承自date-picker-table mixin）
   * @param className - 表格CSS类名
   * @param children - 子元素VNode数组
   * @param tableDate - 表格日期计算函数
   * @returns 表格VNode
   */
  genTable(
    className: string,
    children: VNode[],
    tableDate: (direction: number) => string
  ): VNode;
}

/**
 * VDatePickerDateTable 组件类型定义
 * 继承自 date-picker-table mixin
 */
declare const VDatePickerDateTable: Vue.extend<
  Vue,
  Record<string, never>,
  VDatePickerDateTableMethods,
  VDatePickerDateTableComputed,
  VDatePickerDateTableProps
>;

export default VDatePickerDateTable;