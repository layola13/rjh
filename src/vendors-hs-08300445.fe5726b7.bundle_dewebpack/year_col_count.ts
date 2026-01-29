/**
 * 年份列数常量
 * 定义年份选择器面板中每行显示的列数
 */
export const YEAR_COL_COUNT = 3;

/**
 * 日期生成配置接口
 * 用于处理日期的创建、格式化和计算
 */
export interface GenerateConfig<DateType> {
  /**
   * 获取年份
   */
  getYear(date: DateType): number;
  
  /**
   * 设置年份
   */
  setYear(date: DateType, year: number): DateType;
  
  /**
   * 增加年份
   */
  addYear(date: DateType, offset: number): DateType;
}

/**
 * 区域配置接口
 */
export interface Locale {
  locale: string;
  [key: string]: unknown;
}

/**
 * 范围值类型
 */
export type RangedValue<DateType> = [DateType | null, DateType | null] | null;

/**
 * 年份面板上下文
 */
export interface YearPanelContext<DateType> {
  /**
   * 选中的范围值
   */
  rangedValue?: RangedValue<DateType>;
  
  /**
   * 鼠标悬停时的范围值
   */
  hoverRangedValue?: RangedValue<DateType>;
}

/**
 * 年份面板组件属性
 */
export interface YearPanelProps<DateType> {
  /**
   * 样式类名前缀
   */
  prefixCls: string;
  
  /**
   * 当前选中的日期值
   */
  value?: DateType | null;
  
  /**
   * 当前视图显示的日期
   */
  viewDate: DateType;
  
  /**
   * 区域配置
   */
  locale: Locale;
  
  /**
   * 日期生成配置
   */
  generateConfig: GenerateConfig<DateType>;
}

/**
 * 单元格类名生成器类型
 */
export type GetCellClassName<DateType> = (date: DateType) => string;

/**
 * 单元格配置选项
 */
export interface CellOptions<DateType> {
  /**
   * 单元格样式类名前缀
   */
  cellPrefixCls: string;
  
  /**
   * 当前选中值
   */
  value?: DateType | null;
  
  /**
   * 日期生成配置
   */
  generateConfig: GenerateConfig<DateType>;
  
  /**
   * 选中的范围值
   */
  rangedValue?: RangedValue<DateType>;
  
  /**
   * 鼠标悬停时的范围值
   */
  hoverRangedValue?: RangedValue<DateType>;
  
  /**
   * 判断两个单元格是否相同
   */
  isSameCell: (date1: DateType, date2: DateType) => boolean;
  
  /**
   * 判断日期是否在当前视图范围内
   */
  isInView: (date: DateType) => boolean;
  
  /**
   * 偏移单元格日期
   */
  offsetCell: (date: DateType, offset: number) => DateType;
}

/**
 * 格式化选项
 */
export interface FormatOptions<DateType> {
  /**
   * 区域配置
   */
  locale: Locale;
  
  /**
   * 格式化字符串
   */
  format: string;
  
  /**
   * 日期生成配置
   */
  generateConfig: GenerateConfig<DateType>;
}

/**
 * 年份面板组件
 * 用于显示和选择年份的面板组件
 * 
 * @template DateType - 日期类型泛型
 * @param props - 组件属性
 * @returns React 元素
 * 
 * @example
 *