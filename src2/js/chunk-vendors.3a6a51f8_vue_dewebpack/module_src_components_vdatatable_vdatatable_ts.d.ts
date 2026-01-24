/**
 * VDataTable 组件类型定义
 * Vuetify 数据表格组件，提供排序、分页、分组、选择等功能
 */

import { VNode, PropType } from 'vue';
import { VDataIterator } from '../VDataIterator';

/**
 * 表头配置接口
 */
export interface DataTableHeader {
  /** 显示文本 */
  text: string;
  /** 对应数据字段的键名 */
  value: string;
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否可筛选 */
  filterable?: boolean;
  /** 列宽度 */
  width?: string | number;
  /** 是否显示分隔线 */
  divider?: boolean;
  /** 文本对齐方式 */
  align?: 'start' | 'center' | 'end';
  /** 自定义排序函数 */
  sort?: (a: any, b: any) => number;
  /** 自定义过滤函数 */
  filter?: (value: any, search: string | null, item: any) => boolean;
  /** 单元格CSS类名 */
  class?: string | string[];
  /** 单元格样式 */
  cellClass?: string | string[];
}

/**
 * 数据项属性接口
 */
export interface DataTableItemProps<T = any> {
  /** 数据项 */
  item: T;
  /** 索引 */
  index: number;
  /** 是否选中 */
  isSelected: boolean;
  /** 是否展开 */
  isExpanded: boolean;
  /** 选择/取消选择方法 */
  select: (value: boolean) => void;
  /** 展开/收起方法 */
  expand: (value: boolean) => void;
  /** 表头配置 */
  headers: DataTableHeader[];
}

/**
 * 分页信息接口
 */
export interface DataTablePagination {
  /** 当前页码 */
  page: number;
  /** 每页显示数量 */
  itemsPerPage: number;
  /** 总页数 */
  pageCount: number;
  /** 数据总数 */
  itemsLength: number;
}

/**
 * 排序选项接口
 */
export interface DataTableOptions {
  /** 当前页码 */
  page: number;
  /** 每页显示数量 */
  itemsPerPage: number;
  /** 排序字段 */
  sortBy: string[];
  /** 排序方向（降序） */
  sortDesc: boolean[];
  /** 分组字段 */
  groupBy: string[];
  /** 分组排序方向 */
  groupDesc: boolean[];
  /** 是否支持多列排序 */
  multiSort: boolean;
  /** 是否必须排序 */
  mustSort: boolean;
}

/**
 * 分组数据接口
 */
export interface DataTableGroup<T = any> {
  /** 分组名称 */
  name: string;
  /** 分组内的数据项 */
  items: T[];
}

/**
 * VDataTable 组件属性接口
 */
export interface VDataTableProps<T = any> {
  /** 表头配置数组 */
  headers: DataTableHeader[];
  /** 数据源 */
  items: T[];
  /** 唯一标识字段名 */
  itemKey: string;
  /** 是否显示选择列 */
  showSelect: boolean;
  /** 是否显示展开列 */
  showExpand: boolean;
  /** 是否显示分组功能 */
  showGroupBy: boolean;
  /** 表格高度 */
  height?: number | string;
  /** 是否隐藏默认表头 */
  hideDefaultHeader: boolean;
  /** 是否隐藏默认页脚 */
  hideDefaultFooter: boolean;
  /** 表格标题 */
  caption?: string;
  /** 是否紧凑模式 */
  dense: boolean;
  /** 表头属性配置 */
  headerProps?: Record<string, any>;
  /** 页脚属性配置 */
  footerProps?: Record<string, any>;
  /** 是否计算列宽 */
  calculateWidths: boolean;
  /** 是否固定表头 */
  fixedHeader: boolean;
  /** 表头列数（用于跨列） */
  headersLength?: number;
  /** 展开图标 */
  expandIcon: string;
  /** 自定义过滤函数 */
  customFilter: (value: any, search: string | null, item: T) => boolean;
  /** 自定义排序函数 */
  customSort: (items: T[], sortBy: string[], sortDesc: boolean[], locale: string, customSorters?: Record<string, (a: any, b: any) => number>) => T[];
  /** 数据项CSS类名（字符串或函数） */
  itemClass: string | ((item: T) => string);
  /** 加载条高度 */
  loaderHeight: number | string;
  /** 是否加载中 */
  loading: boolean | string;
  /** 搜索关键词 */
  search?: string;
  /** 是否单选 */
  singleSelect: boolean;
  /** 是否禁用排序 */
  disableSort: boolean;
  /** 是否禁用分页 */
  disablePagination: boolean;
  /** 是否禁用筛选 */
  disableFiltering: boolean;
  /** 选项配置 */
  options: DataTableOptions;
  /** 每页显示数量 */
  itemsPerPage: number;
  /** 当前页码 */
  page: number;
  /** 排序字段 */
  sortBy: string | string[];
  /** 排序方向 */
  sortDesc: boolean | boolean[];
  /** 分组字段 */
  groupBy: string | string[];
  /** 分组排序方向 */
  groupDesc: boolean | boolean[];
  /** 服务端分页总数 */
  serverItemsLength: number;
}

/**
 * VDataTable 组件事件接口
 */
export interface VDataTableEvents<T = any> {
  /** 选项变更事件 */
  'update:options': (options: DataTableOptions) => void;
  /** 页码变更事件 */
  'update:page': (page: number) => void;
  /** 每页数量变更事件 */
  'update:items-per-page': (itemsPerPage: number) => void;
  /** 排序字段变更事件 */
  'update:sort-by': (sortBy: string[]) => void;
  /** 排序方向变更事件 */
  'update:sort-desc': (sortDesc: boolean[]) => void;
  /** 分组字段变更事件 */
  'update:group-by': (groupBy: string[]) => void;
  /** 分组方向变更事件 */
  'update:group-desc': (groupDesc: boolean[]) => void;
  /** 分页信息变更事件 */
  'pagination': (pagination: DataTablePagination) => void;
  /** 当前页数据变更事件 */
  'current-items': (items: T[]) => void;
  /** 总页数变更事件 */
  'page-count': (count: number) => void;
  /** 行点击事件 */
  'click:row': (item: T, props: DataTableItemProps<T>) => void;
  /** 行右键菜单事件 */
  'contextmenu:row': (event: MouseEvent, props: DataTableItemProps<T>) => void;
  /** 行双击事件 */
  'dblclick:row': (event: MouseEvent, props: DataTableItemProps<T>) => void;
}

/**
 * VDataTable 作用域插槽接口
 */
export interface VDataTableScopedSlots<T = any> {
  /** 顶部插槽 */
  top?: (props: { items: T[]; pagination: DataTablePagination; options: DataTableOptions }) => VNode[];
  /** 表格标题插槽 */
  caption?: (props: { items: T[]; pagination: DataTablePagination }) => VNode[];
  /** 表头插槽 */
  header?: (props: {
    headers: DataTableHeader[];
    options: DataTableOptions;
    mobile: boolean;
    showGroupBy: boolean;
    someItems: boolean;
    everyItem: boolean;
    singleSelect: boolean;
    disableSort: boolean;
  }) => VNode[];
  /** 表头列插槽（动态插槽：header.<column-name>） */
  [key: `header.${string}`]: (props: { header: DataTableHeader }) => VNode[];
  /** 主体前置内容插槽 */
  'body.prepend'?: (props: {
    items: T[];
    pagination: DataTablePagination;
    options: DataTableOptions;
    headers: DataTableHeader[];
  }) => VNode[];
  /** 主体插槽 */
  body?: (props: {
    items: T[];
    pagination: DataTablePagination;
    options: DataTableOptions;
    headers: DataTableHeader[];
    expand: (item: T, value: boolean) => void;
    isExpanded: (item: T) => boolean;
    isSelected: (item: T) => boolean;
    select: (item: T, value: boolean) => void;
    isMobile: boolean;
  }) => VNode[];
  /** 主体后置内容插槽 */
  'body.append'?: (props: {
    items: T[];
    pagination: DataTablePagination;
    options: DataTableOptions;
    headers: DataTableHeader[];
  }) => VNode[];
  /** 数据项插槽 */
  item?: (props: DataTableItemProps<T>) => VNode;
  /** 数据项列插槽（动态插槽：item.<column-name>） */
  [key: `item.${string}`]: (props: { item: T; value: any; header: DataTableHeader }) => VNode[];
  /** 展开项插槽 */
  'expanded-item'?: (props: { item: T; headers: DataTableHeader[] }) => VNode;
  /** 分组插槽 */
  group?: (props: {
    group: string;
    options: DataTableOptions;
    items: T[];
    headers: DataTableHeader[];
  }) => VNode;
  /** 分组头部插槽 */
  'group.header'?: (props: {
    group: string;
    groupBy: string[];
    items: T[];
    headers: DataTableHeader[];
    isOpen: boolean;
    toggle: () => void;
    remove: () => void;
  }) => VNode[];
  /** 分组汇总插槽 */
  'group.summary'?: (props: {
    group: string;
    groupBy: string[];
    items: T[];
    headers: DataTableHeader[];
    isOpen: boolean;
    toggle: () => void;
  }) => VNode[];
  /** 页脚插槽 */
  footer?: (props: {
    options: DataTableOptions;
    pagination: DataTablePagination;
    headers: DataTableHeader[];
    widths: number[];
  }) => VNode[];
  /** 页脚分页插槽（动态插槽：footer.page-text） */
  [key: `footer.${string}`]: (props: any) => VNode[];
  /** 底部插槽 */
  bottom?: (props: { items: T[]; pagination: DataTablePagination; options: DataTableOptions }) => VNode[];
  /** 无数据插槽 */
  'no-data'?: () => VNode[];
  /** 无结果插槽 */
  'no-results'?: () => VNode[];
  /** 加载中插槽 */
  loading?: () => VNode;
  /** 进度条插槽 */
  progress?: () => VNode;
}

/**
 * VDataTable 组件定义
 * 
 * @example
 *