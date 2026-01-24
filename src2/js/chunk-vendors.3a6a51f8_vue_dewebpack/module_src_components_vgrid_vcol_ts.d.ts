/**
 * VCol 组件类型定义
 * Vuetify Grid 系统的列组件
 */

/**
 * 断点尺寸类型
 */
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

/**
 * 列宽度值类型
 * - boolean: true 表示自动宽度，false 表示不设置
 * - string: 列数的字符串形式 (例如 '6', '12')
 * - number: 列数 (1-12)
 */
type ColSize = boolean | string | number;

/**
 * 偏移量类型
 * - string: 偏移列数的字符串形式
 * - number: 偏移列数 (0-11)
 * - null: 不设置偏移
 */
type OffsetSize = string | number | null;

/**
 * 排序值类型
 * - string: 排序值的字符串形式
 * - number: 排序值
 * - null: 不设置排序
 */
type OrderSize = string | number | null;

/**
 * 自对齐方式
 */
type AlignSelfValue = 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';

/**
 * 响应式断点属性映射
 */
interface BreakpointProps {
  /** 小屏幕断点列宽 */
  sm?: ColSize;
  /** 中等屏幕断点列宽 */
  md?: ColSize;
  /** 大屏幕断点列宽 */
  lg?: ColSize;
  /** 超大屏幕断点列宽 */
  xl?: ColSize;
}

/**
 * 响应式偏移属性映射
 */
interface BreakpointOffsetProps {
  /** 小屏幕断点偏移量 */
  offsetSm?: OffsetSize;
  /** 中等屏幕断点偏移量 */
  offsetMd?: OffsetSize;
  /** 大屏幕断点偏移量 */
  offsetLg?: OffsetSize;
  /** 超大屏幕断点偏移量 */
  offsetXl?: OffsetSize;
}

/**
 * 响应式排序属性映射
 */
interface BreakpointOrderProps {
  /** 小屏幕断点排序 */
  orderSm?: OrderSize;
  /** 中等屏幕断点排序 */
  orderMd?: OrderSize;
  /** 大屏幕断点排序 */
  orderLg?: OrderSize;
  /** 超大屏幕断点排序 */
  orderXl?: OrderSize;
}

/**
 * VCol 组件属性
 */
export interface VColProps extends BreakpointProps, BreakpointOffsetProps, BreakpointOrderProps {
  /**
   * 默认列宽 (1-12 的栅格系统)
   * @default false
   */
  cols?: ColSize;

  /**
   * 默认偏移量
   * @default null
   */
  offset?: OffsetSize;

  /**
   * Flexbox 排序
   * @default null
   */
  order?: OrderSize;

  /**
   * align-self CSS 属性
   * @default null
   */
  alignSelf?: AlignSelfValue;

  /**
   * 渲染的 HTML 标签
   * @default 'div'
   */
  tag?: string;
}

/**
 * VCol 函数式组件
 * 
 * @example
 *