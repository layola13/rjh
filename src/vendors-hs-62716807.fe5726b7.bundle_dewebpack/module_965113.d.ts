/**
 * 表格过滤器模块类型定义
 * 提供表格列过滤、筛选状态管理等功能
 */

/**
 * 列定义接口
 */
export interface ColumnType<RecordType = any> {
  /** 列的唯一标识 */
  key?: string | number;
  /** 列标题 */
  title?: React.ReactNode | ((props: any) => React.ReactNode);
  /** 过滤器配置 */
  filters?: FilterItem[];
  /** 自定义过滤下拉菜单 */
  filterDropdown?: React.ReactNode;
  /** 过滤函数 */
  onFilter?: (value: any, record: RecordType) => boolean;
  /** 受控的过滤值 */
  filteredValue?: string[] | null;
  /** 默认过滤值 */
  defaultFilteredValue?: string[];
  /** 是否支持多选 */
  filterMultiple?: boolean;
  /** 强制显示过滤状态 */
  filtered?: boolean;
  /** 子列 */
  children?: ColumnType<RecordType>[];
}

/**
 * 过滤项配置
 */
export interface FilterItem {
  /** 过滤项的值 */
  value: string | number | boolean;
  /** 过滤项显示文本 */
  text?: React.ReactNode;
  /** 子过滤项 */
  children?: FilterItem[];
}

/**
 * 过滤状态
 */
export interface FilterState<RecordType = any> {
  /** 关联的列配置 */
  column: ColumnType<RecordType>;
  /** 过滤器唯一键 */
  key: string;
  /** 当前过滤的值列表 */
  filteredKeys?: string[] | null;
  /** 强制显示过滤状态 */
  forceFiltered?: boolean;
}

/**
 * 过滤后的数据映射
 * key为列标识，value为过滤值数组
 */
export type FilteredValues = Record<string, (string | number | boolean)[] | null>;

/**
 * Hook返回值类型
 */
export type UseFilterResult<RecordType = any> = [
  /** 转换列配置函数 */
  (columns: ColumnType<RecordType>[]) => ColumnType<RecordType>[],
  /** 当前过滤状态列表 */
  FilterState<RecordType>[],
  /** 获取过滤数据的函数 */
  () => FilteredValues
];

/**
 * Hook参数配置
 */
export interface UseFilterProps<RecordType = any> {
  /** 组件前缀类名 */
  prefixCls: string;
  /** 下拉菜单前缀类名 */
  dropdownPrefixCls: string;
  /** 合并后的列配置 */
  mergedColumns: ColumnType<RecordType>[];
  /** 过滤变化回调 */
  onFilterChange: (filters: FilteredValues, filterStates: FilterState<RecordType>[]) => void;
  /** 获取弹出容器的函数 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 国际化配置 */
  locale: Record<string, string>;
}

/**
 * 根据过滤状态过滤数据
 * @param data 原始数据数组
 * @param filterStates 过滤状态列表
 * @returns 过滤后的数据数组
 */
export function getFilterData<RecordType = any>(
  data: RecordType[],
  filterStates: FilterState<RecordType>[]
): RecordType[];

/**
 * 表格过滤Hook
 * 管理列过滤状态、过滤器UI渲染和数据过滤逻辑
 * 
 * @param props Hook配置参数
 * @returns [转换列函数, 过滤状态列表, 获取过滤值函数]
 * 
 * @example
 *