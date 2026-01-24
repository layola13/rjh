import { PureComponent, ReactNode, CSSProperties, RefObject } from 'react';

/**
 * 渲染项数据结构
 */
export interface RenderedItem<T = any> {
  /** 渲染的文本内容 */
  renderedText: string;
  /** 渲染的元素 */
  renderedEl: ReactNode;
  /** 原始数据项 */
  item: TransferItem<T>;
}

/**
 * Transfer 数据项
 */
export interface TransferItem<T = any> {
  /** 唯一标识 */
  key: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 其他自定义属性 */
  [key: string]: any;
}

/**
 * 自定义渲染返回值
 */
export interface CustomRenderResult {
  /** 显示值 */
  value: string;
  /** 显示标签 */
  label: ReactNode;
}

/**
 * 选择所有标签参数
 */
export interface SelectAllLabelParams {
  /** 已选数量 */
  selectedCount: number;
  /** 总数量 */
  totalCount: number;
}

/**
 * 列表主体渲染函数参数
 */
export interface ListBodyProps<T = any> {
  /** 过滤后的数据项 */
  filteredItems: TransferItem<T>[];
  /** 过滤后的渲染项 */
  filteredRenderItems: RenderedItem<T>[];
  /** 已选中的 key 列表 */
  selectedKeys: string[];
}

/**
 * TransferList 组件属性
 */
export interface TransferListProps<T = any> {
  /** 样式前缀 */
  prefixCls: string;
  /** 数据源 */
  dataSource?: TransferItem<T>[];
  /** 标题文本 */
  titleText?: string;
  /** 已选中的 key 列表 */
  checkedKeys: string[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 底部渲染函数 */
  footer?: (props: TransferListProps<T>) => ReactNode;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 搜索框占位符 */
  searchPlaceholder?: string;
  /** 空状态提示文本 */
  notFoundContent?: ReactNode;
  /** "全选"文本 */
  selectAll?: ReactNode;
  /** "选择当前页"文本 */
  selectCurrent?: ReactNode;
  /** "反选"文本 */
  selectInvert?: ReactNode;
  /** "清空全部"文本 */
  removeAll?: ReactNode;
  /** "清空当前页"文本 */
  removeCurrent?: ReactNode;
  /** 自定义列表渲染函数 */
  renderList?: (props: ListBodyProps<T>) => ReactNode;
  /** 自定义单项渲染函数 */
  render?: (item: TransferItem<T>) => ReactNode | CustomRenderResult;
  /** 项目选择/取消选择回调 */
  onItemSelectAll?: (keys: string[], selected: boolean) => void;
  /** 项目移除回调 */
  onItemRemove?: (keys: string[]) => void;
  /** 是否显示全选复选框 */
  showSelectAll?: boolean;
  /** 是否显示移除按钮 */
  showRemove?: boolean;
  /** 分页配置 */
  pagination?: any;
  /** 自定义过滤函数 */
  filterOption?: (filterValue: string, item: TransferItem<T>) => boolean;
  /** 过滤事件处理 */
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 清空过滤处理 */
  handleClear: () => void;
  /** 单位文本（复数） */
  itemsUnit?: string;
  /** 单位文本（单数） */
  itemUnit?: string;
  /** 自定义全选标签 */
  selectAllLabel?: ReactNode | ((params: SelectAllLabelParams) => ReactNode);
}

/**
 * TransferList 组件状态
 */
export interface TransferListState {
  /** 当前过滤值 */
  filterValue: string;
}

/**
 * 检查状态类型
 */
export type CheckStatus = 'none' | 'part' | 'all';

/**
 * Transfer 列表面板组件
 * 用于展示穿梭框的单侧列表，支持搜索、全选、分页等功能
 */
export default class TransferList<T = any> extends PureComponent<
  TransferListProps<T>,
  TransferListState
> {
  /** 默认属性 */
  static defaultProps: Partial<TransferListProps>;

  /** 默认列表主体引用 */
  defaultListBodyRef: RefObject<any>;

  /** 滚动触发定时器 */
  triggerScrollTimer?: number;

  /**
   * 处理过滤输入
   */
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * 清空过滤
   */
  handleClear: () => void;

  /**
   * 匹配过滤条件
   */
  matchFilter: (text: string, item: TransferItem<T>) => boolean;

  /**
   * 获取当前页项目
   */
  getCurrentPageItems: () => void;

  /**
   * 渲染列表主体
   */
  renderListBody: (
    renderList: ((props: ListBodyProps<T>) => ReactNode) | undefined,
    props: ListBodyProps<T>
  ) => { customize: boolean; bodyContent: ReactNode };

  /**
   * 渲染单个项目
   */
  renderItem: (item: TransferItem<T>) => RenderedItem<T>;

  /**
   * 获取全选标签
   */
  getSelectAllLabel: (selectedCount: number, totalCount: number) => ReactNode;

  /**
   * 获取选中状态
   */
  getCheckStatus: (items: TransferItem<T>[]) => CheckStatus;

  /**
   * 获取过滤后的项目
   */
  getFilteredItems: (
    items: TransferItem<T>[],
    filterValue: string
  ) => {
    filteredItems: TransferItem<T>[];
    filteredRenderItems: RenderedItem<T>[];
  };

  /**
   * 获取列表主体元素
   */
  getListBody: (
    prefixCls: string,
    searchPlaceholder: string | undefined,
    filterValue: string,
    filteredItems: TransferItem<T>[],
    notFoundContent: ReactNode,
    filteredRenderItems: RenderedItem<T>[],
    selectedKeys: string[],
    renderList: ((props: ListBodyProps<T>) => ReactNode) | undefined,
    showSearch: boolean,
    disabled: boolean
  ) => ReactNode;

  /**
   * 获取复选框元素
   */
  getCheckBox: (
    items: TransferItem<T>[],
    onSelectAll: (keys: string[], selected: boolean) => void,
    showSelectAll: boolean | undefined,
    disabled: boolean
  ) => ReactNode | false;
}

/**
 * 提取未禁用项的 key 列表
 */
export declare function getEnabledKeys<T = any>(items: TransferItem<T>[]): string[];