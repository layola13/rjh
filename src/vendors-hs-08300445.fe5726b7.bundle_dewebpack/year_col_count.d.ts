/**
 * 年份选择面板的列数常量
 */
export const YEAR_COL_COUNT = 3;

/**
 * 年份面板单元格属性接口
 */
interface YearPanelCellProps {
  /** 样式类名前缀 */
  prefixCls: string;
  /** 当前选中的日期值 */
  value?: Date | null;
  /** 当前视图显示的日期 */
  viewDate: Date;
  /** 国际化配置 */
  locale: Locale;
  /** 日期生成配置对象 */
  generateConfig: GenerateConfig;
}

/**
 * 国际化配置接口
 */
interface Locale {
  locale: string;
  // 其他国际化相关字段
  [key: string]: unknown;
}

/**
 * 日期生成配置接口
 */
interface GenerateConfig {
  /** 获取年份 */
  getYear(date: Date): number;
  /** 设置年份 */
  setYear(date: Date, year: number): Date;
  /** 添加年份 */
  addYear(date: Date, offset: number): Date;
  // 其他日期操作方法
  [key: string]: unknown;
}

/**
 * 范围上下文接口
 */
interface RangeContextValue {
  /** 已选择的范围值 */
  rangedValue?: [Date | null, Date | null] | null;
  /** 鼠标悬停时的范围值 */
  hoverRangedValue?: [Date | null, Date | null] | null;
}

/**
 * 单元格工具函数参数接口
 */
interface CellUtilParams {
  /** 单元格样式类名前缀 */
  cellPrefixCls: string;
  /** 当前值 */
  value?: Date | null;
  /** 日期生成配置 */
  generateConfig: GenerateConfig;
  /** 范围值 */
  rangedValue?: [Date | null, Date | null] | null;
  /** 悬停范围值 */
  hoverRangedValue?: [Date | null, Date | null] | null;
  /** 判断两个单元格是否相同 */
  isSameCell: (date1: Date, date2: Date) => boolean;
  /** 判断日期是否在视图范围内 */
  isInView: (date: Date) => boolean;
  /** 偏移单元格日期 */
  offsetCell: (date: Date, offset: number) => Date;
}

/**
 * 格式化选项接口
 */
interface FormatOptions {
  /** 国际化配置 */
  locale: Locale;
  /** 格式化模板 */
  format: string;
  /** 日期生成配置 */
  generateConfig: GenerateConfig;
}

/**
 * 年份面板默认导出函数
 * 渲染年份选择面板，显示十年内的年份网格
 * 
 * @param props - 年份面板属性
 * @returns React 元素
 */
declare function YearPanel(props: YearPanelCellProps): JSX.Element;

export default YearPanel;

/**
 * 判断两个日期是否为同一年
 */
declare function isSameYear(
  generateConfig: GenerateConfig,
  date1: Date,
  date2: Date
): boolean;

/**
 * 格式化日期值
 */
declare function formatValue(
  date: Date,
  options: FormatOptions
): string;

/**
 * 获取单元格样式类名的工具函数
 */
declare function useCellClassName(params: CellUtilParams): (date: Date) => string;

/**
 * 年份面板基础组件属性
 */
interface PanelBodyProps extends YearPanelCellProps {
  /** 行数 */
  rowNum: number;
  /** 列数 */
  colNum: number;
  /** 基准日期 */
  baseDate: Date;
  /** 获取单元格文本 */
  getCellText: (date: Date) => number;
  /** 获取单元格样式类名 */
  getCellClassName: (date: Date) => string;
  /** 获取单元格日期 */
  getCellDate: (baseDate: Date, offset: number) => Date;
  /** 获取单元格标题 */
  titleCell: (date: Date) => string;
}