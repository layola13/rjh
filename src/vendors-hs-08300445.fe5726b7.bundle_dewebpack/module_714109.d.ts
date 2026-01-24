/**
 * 表格行组件的类型定义
 * @module BodyRow
 */

/**
 * 行记录数据类型
 */
export type RecordType = Record<string, any>;

/**
 * 行键类型
 */
export type RowKey = string | number;

/**
 * 获取行键的函数类型
 */
export type GetRowKey<T = RecordType> = (record: T, index: number) => RowKey;

/**
 * 行可展开判断函数类型
 */
export type RowExpandable<T = RecordType> = (record: T) => boolean;

/**
 * onRow 回调函数返回的属性类型
 */
export interface RowEventHandlers {
  onClick?: (event: React.MouseEvent<HTMLElement>, ...args: any[]) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

/**
 * onRow 回调函数类型
 */
export type OnRow<T = RecordType> = (record: T, index: number) => RowEventHandlers | undefined;

/**
 * 行类名回调函数类型
 */
export type RowClassName<T = RecordType> = string | ((record: T, index: number, indent: number) => string);

/**
 * 展开的行类名回调函数类型
 */
export type ExpandedRowClassName<T = RecordType> = (record: T, index: number, indent: number) => string;

/**
 * 展开图标渲染函数的参数类型
 */
export interface ExpandIconProps<T = RecordType> {
  prefixCls: string;
  expanded: boolean;
  expandable: boolean | any[];
  record: T;
  onExpand: TriggerExpandFunc<T>;
}

/**
 * 展开图标渲染函数类型
 */
export type ExpandIcon<T = RecordType> = (props: ExpandIconProps<T>) => React.ReactNode;

/**
 * 触发展开的回调函数类型
 */
export type TriggerExpandFunc<T = RecordType> = (record: T, event: React.MouseEvent<HTMLElement>) => void;

/**
 * 展开行渲染函数类型
 */
export type ExpandedRowRender<T = RecordType> = (
  record: T,
  index: number,
  indent: number,
  expanded: boolean
) => React.ReactNode;

/**
 * 表格可展开类型
 */
export type ExpandableType = 'row' | 'nest';

/**
 * 列固定信息类型
 */
export interface ColumnFixedInfo {
  fixLeft?: boolean | number;
  fixRight?: boolean | number;
  lastFixLeft?: boolean;
  firstFixRight?: boolean;
  isSticky?: boolean;
}

/**
 * 列定义类型
 */
export interface ColumnType<T = RecordType> {
  key?: RowKey;
  dataIndex?: string | string[];
  title?: React.ReactNode;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  className?: string;
  ellipsis?: boolean;
  align?: 'left' | 'center' | 'right';
  onCell?: (record: T, index: number) => React.TdHTMLAttributes<HTMLTableCellElement>;
  shouldCellUpdate?: (record: T, prevRecord: T) => boolean;
  width?: number | string;
  fixed?: 'left' | 'right' | boolean;
}

/**
 * 表格行组件的属性类型
 */
export interface BodyRowProps<T = RecordType> {
  /** 行的 CSS 类名 */
  className?: string;
  
  /** 行的样式 */
  style?: React.CSSProperties;
  
  /** 行记录数据 */
  record: T;
  
  /** 行索引 */
  index: number;
  
  /** 行的唯一键值 */
  rowKey: RowKey;
  
  /** 行记录的键值（用于展开控制） */
  recordKey: RowKey;
  
  /** 获取行键的函数 */
  getRowKey: GetRowKey<T>;
  
  /** 判断行是否可展开的函数 */
  rowExpandable?: RowExpandable<T>;
  
  /** 已展开的行键集合 */
  expandedKeys?: Set<RowKey>;
  
  /** 行事件处理函数 */
  onRow?: OnRow<T>;
  
  /** 缩进层级（默认: 0） */
  indent?: number;
  
  /** 行组件类型（通常是 'tr'） */
  rowComponent: React.ComponentType<any>;
  
  /** 单元格组件类型（通常是 'td'） */
  cellComponent: React.ComponentType<any>;
  
  /** 子节点的字段名称（用于嵌套展开） */
  childrenColumnName: string;
}

/**
 * 表格上下文类型
 */
export interface TableContextValue {
  /** CSS 类名前缀 */
  prefixCls: string;
  
  /** 列固定信息列表 */
  fixedInfoList: ColumnFixedInfo[];
}

/**
 * 表格体上下文类型
 */
export interface BodyContextValue<T = RecordType> {
  /** 是否固定表头 */
  fixHeader: boolean;
  
  /** 是否固定列 */
  fixColumn: boolean;
  
  /** 是否水平滚动 */
  horizonScroll: boolean;
  
  /** 组件宽度 */
  componentWidth: number;
  
  /** 扁平化的列配置 */
  flattenColumns: ColumnType<T>[];
  
  /** 可展开类型 */
  expandableType: ExpandableType;
  
  /** 是否点击行展开 */
  expandRowByClick: boolean;
  
  /** 触发展开的回调 */
  onTriggerExpand: TriggerExpandFunc<T>;
  
  /** 行类名 */
  rowClassName: RowClassName<T>;
  
  /** 展开行的类名 */
  expandedRowClassName: ExpandedRowClassName<T>;
  
  /** 缩进大小（像素） */
  indentSize: number;
  
  /** 展开图标渲染函数 */
  expandIcon: ExpandIcon<T>;
  
  /** 展开行渲染函数 */
  expandedRowRender: ExpandedRowRender<T>;
  
  /** 展开图标所在列的索引 */
  expandIconColumnIndex: number;
}

/**
 * 表格行组件
 * 
 * @description
 * 渲染表格的单行，支持：
 * - 行展开/收起（'row' 类型）
 * - 嵌套子行（'nest' 类型）
 * - 自定义行事件处理
 * - 行类名自定义
 * - 固定列支持
 * 
 * @template T - 行记录数据类型
 * @param {BodyRowProps<T>} props - 组件属性
 * @returns {JSX.Element} 表格行元素
 */
declare function BodyRow<T = RecordType>(props: BodyRowProps<T>): JSX.Element;

declare namespace BodyRow {
  const displayName: 'BodyRow';
}

export default BodyRow;