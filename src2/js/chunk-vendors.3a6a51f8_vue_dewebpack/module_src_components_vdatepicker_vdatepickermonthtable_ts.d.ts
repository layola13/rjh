/**
 * VDatePicker 月份表格组件类型定义
 * 用于在日期选择器中显示月份选择表格
 */

import type { VueConstructor } from 'vue';
import type { VNode } from 'vue';
import type DatePickerTable from './mixins/date-picker-table';

/**
 * 月份格式化函数类型
 * @param date - ISO 8601格式的日期字符串 (YYYY-MM)
 * @returns 格式化后的月份字符串
 */
type MonthFormatter = (date: string) => string;

/**
 * VDatePickerMonthTable 组件实例接口
 * 继承自 DatePickerTable mixin
 */
interface VDatePickerMonthTable extends InstanceType<typeof DatePickerTable> {
  /**
   * 组件名称
   */
  readonly name: 'v-date-picker-month-table';

  /**
   * 当前区域设置
   */
  currentLocale: string;

  /**
   * 自定义格式化函数（可选）
   */
  format?: MonthFormatter;

  /**
   * 当前表格显示的日期（年份字符串）
   */
  tableDate: string;

  /**
   * 显示的年份（数字）
   */
  displayedYear: number;

  // ========== 计算属性 ==========

  /**
   * 月份格式化器
   * 如果提供了自定义format则使用，否则使用原生区域格式化器
   */
  readonly formatter: MonthFormatter;

  // ========== 方法 ==========

  /**
   * 计算表格日期（用于上一年/下一年导航）
   * @param offset - 年份偏移量（+1表示下一年，-1表示上一年）
   * @returns 新的年份字符串
   */
  calculateTableDate(offset: number): string;

  /**
   * 生成表格主体内容
   * 创建3行4列的月份选择网格（共12个月）
   * @returns 表格主体VNode
   */
  genTBody(): VNode;

  /**
   * 生成月份按钮
   * （继承自DatePickerTable mixin）
   * @param date - ISO日期字符串
   * @param isFloating - 是否为浮动状态
   * @param type - 按钮类型
   * @param formatter - 格式化函数
   * @returns 按钮VNode
   */
  genButton(date: string, isFloating: boolean, type: string, formatter: MonthFormatter): VNode;

  /**
   * 生成表格容器
   * （继承自DatePickerTable mixin）
   * @param cssClass - CSS类名
   * @param children - 子节点数组
   * @param calculateTableDate - 日期计算函数
   * @returns 表格VNode
   */
  genTable(cssClass: string, children: VNode[], calculateTableDate: (offset: number) => string): VNode;

  /**
   * 渲染函数
   * @returns 完整的月份表格VNode
   */
  render(): VNode;
}

/**
 * VDatePickerMonthTable 组件构造函数
 */
declare const VDatePickerMonthTable: VueConstructor<VDatePickerMonthTable>;

export default VDatePickerMonthTable;