/**
 * 月份选择器列数常量
 */
export const MONTH_COL_COUNT = 3;

/**
 * 日期生成器配置接口
 * 提供日期操作和格式化的抽象方法
 */
export interface GenerateConfig<DateType = any> {
  /** 获取月份（0-11） */
  getMonth(date: DateType): number;
  /** 设置月份 */
  setMonth(date: DateType, month: number): DateType;
  /** 添加月份偏移 */
  addMonth(date: DateType, offset: number): DateType;
  /** 本地化配置 */
  locale: {
    /** 获取短月份名称数组 */
    getShortMonths?: (locale: string) => string[];
  };
}

/**
 * 本地化配置接口
 */
export interface Locale {
  /** 当前语言环境标识 */
  locale: string;
  /** 短月份名称数组（例如：['Jan', 'Feb', ...]） */
  shortMonths?: string[];
  /** 月份格式化模板 */
  monthFormat?: string;
}

/**
 * 范围上下文值接口
 */
export interface RangeContextValue<DateType = any> {
  /** 选中的日期范围 */
  rangedValue?: [DateType | null, DateType | null] | null;
  /** 悬停时的日期范围 */
  hoverRangedValue?: [DateType | null, DateType | null] | null;
}

/**
 * 单元格渲染函数类型
 */
export type MonthCellRender<DateType = any> = (
  date: DateType,
  locale: Locale
) => React.ReactNode;

/**
 * 月份面板属性接口
 */
export interface MonthPanelProps<DateType = any> {
  /** 样式类名前缀 */
  prefixCls: string;
  /** 本地化配置 */
  locale: Locale;
  /** 当前选中的日期值 */
  value?: DateType | null;
  /** 当前视图显示的日期 */
  viewDate: DateType;
  /** 日期生成器配置 */
  generateConfig: GenerateConfig<DateType>;
  /** 自定义月份单元格渲染函数 */
  monthCellRender?: MonthCellRender<DateType>;
}

/**
 * 月份选择面板组件
 * 
 * 渲染一个4行3列的月份选择网格，用于日期选择器的月份视图。
 * 支持范围选择、悬停效果和自定义渲染。
 * 
 * @template DateType - 日期对象类型
 * @param props - 组件属性
 * @returns 月份面板React元素
 */
declare function MonthPanel<DateType = any>(
  props: MonthPanelProps<DateType>
): React.ReactElement;

export default MonthPanel;