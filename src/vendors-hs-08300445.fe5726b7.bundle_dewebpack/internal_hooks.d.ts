/**
 * Internal hooks identifier for rc-table
 * Used to differentiate internal API calls from external usage
 */
export const INTERNAL_HOOKS = "rc-table-internal-hook";

/**
 * Direction for table layout (LTR/RTL)
 */
type Direction = "ltr" | "rtl";

/**
 * Table layout mode
 */
type TableLayout = "auto" | "fixed";

/**
 * Expandable type indicator
 */
type ExpandableType = false | "row" | "nest";

/**
 * Scroll configuration for the table
 */
interface ScrollConfig {
  /** Horizontal scroll width */
  x?: number | true | string;
  /** Vertical scroll height */
  y?: number | string;
}

/**
 * Sticky configuration for table headers/scrollbars
 */
interface StickyConfig {
  /** Offset from top for sticky header */
  offsetHeader?: number;
  /** Offset for sticky scrollbar */
  offsetScroll?: number;
  /** Custom class name for sticky elements */
  className?: string;
  /** Container element for sticky positioning */
  container?: () => HTMLElement;
}

/**
 * Column configuration
 */
interface ColumnType<RecordType = unknown> {
  /** Column width */
  width?: number | string;
  /** Fixed column position */
  fixed?: boolean | "left" | "right";
  /** Enable text ellipsis */
  ellipsis?: boolean;
  /** Other column properties */
  [key: string]: unknown;
}

/**
 * Expandable configuration
 */
interface ExpandableConfig<RecordType = unknown> {
  /** Custom expand icon renderer */
  expandIcon?: (props: ExpandIconProps<RecordType>) => React.ReactNode;
  /** Controlled expanded row keys */
  expandedRowKeys?: React.Key[];
  /** Default expanded row keys */
  defaultExpandedRowKeys?: React.Key[];
  /** Expand all rows by default */
  defaultExpandAllRows?: boolean;
  /** Custom expanded row renderer */
  expandedRowRender?: (record: RecordType, index: number, indent: number, expanded: boolean) => React.ReactNode;
  /** Expand callback */
  onExpand?: (expanded: boolean, record: RecordType) => void;
  /** Expanded rows change callback */
  onExpandedRowsChange?: (expandedKeys: React.Key[]) => void;
  /** Allow row expand by clicking */
  expandRowByClick?: boolean;
  /** Determine if row is expandable */
  rowExpandable?: (record: RecordType) => boolean;
  /** Column index for expand icon */
  expandIconColumnIndex?: number;
  /** Class name for expanded rows */
  expandedRowClassName?: (record: RecordType, index: number, indent: number) => string;
  /** Children column name in data */
  childrenColumnName?: string;
  /** Indent size for nested rows */
  indentSize?: number;
  /** Internal parent render icon flag */
  __PARENT_RENDER_ICON__?: boolean;
}

/**
 * Expand icon component props
 */
interface ExpandIconProps<RecordType = unknown> {
  prefixCls: string;
  expanded: boolean;
  record: RecordType;
  onExpand: (record: RecordType, event: React.MouseEvent) => void;
  expandable: boolean;
}

/**
 * Table components override configuration
 */
interface ComponentsType {
  table?: React.ComponentType<unknown>;
  header?: {
    wrapper?: React.ComponentType<unknown>;
    row?: React.ComponentType<unknown>;
    cell?: React.ComponentType<unknown>;
  };
  body?: React.ComponentType<unknown> | ((data: readonly unknown[], props: BodyProps) => React.ReactNode);
}

/**
 * Body component render props
 */
interface BodyProps {
  scrollbarSize: number;
  ref: React.RefObject<HTMLDivElement>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

/**
 * Internal references for table DOM elements
 */
interface InternalRefs {
  body: {
    current: HTMLDivElement | null;
  };
}

/**
 * Fixed info for cells
 */
interface FixedInfo {
  fixLeft?: number;
  fixRight?: number;
  lastFixLeft?: boolean;
  firstFixRight?: boolean;
  isSticky?: boolean;
}

/**
 * Table context value
 */
interface TableContextValue {
  prefixCls: string;
  getComponent: (path: string[], defaultComponent: React.ComponentType) => React.ComponentType;
  scrollbarSize: number;
  direction: Direction;
  fixedInfoList: FixedInfo[];
  isSticky: boolean;
}

/**
 * Body context value
 */
interface BodyContextValue {
  columns: ColumnType[];
  flattenColumns: ColumnType[];
  tableLayout: TableLayout;
  rowClassName?: string | ((record: unknown, index: number) => string);
  expandedRowClassName?: (record: unknown, index: number, indent: number) => string;
  componentWidth: number;
  fixHeader: boolean;
  fixColumn: boolean;
  horizonScroll: boolean;
  expandIcon: (props: ExpandIconProps) => React.ReactNode;
  expandableType: ExpandableType;
  expandRowByClick?: boolean;
  expandedRowRender?: (record: unknown, index: number, indent: number, expanded: boolean) => React.ReactNode;
  onTriggerExpand: (record: unknown) => void;
  expandIconColumnIndex?: number;
  indentSize?: number;
}

/**
 * Resize context value
 */
interface ResizeContextValue {
  onColumnResize: (columnKey: React.Key, width: number) => void;
}

/**
 * Main table component props
 */
interface TableProps<RecordType = unknown> {
  /** CSS class prefix */
  prefixCls?: string;
  /** Additional CSS class name */
  className?: string;
  /** Row class name (string or function) */
  rowClassName?: string | ((record: RecordType, index: number) => string);
  /** Inline styles */
  style?: React.CSSProperties;
  /** Data source */
  data?: readonly RecordType[];
  /** Row key extractor */
  rowKey?: string | ((record: RecordType, index: number) => React.Key);
  /** Scroll configuration */
  scroll?: ScrollConfig;
  /** Table layout mode */
  tableLayout?: TableLayout;
  /** Text direction */
  direction?: Direction;
  /** Table title renderer */
  title?: (data: readonly RecordType[]) => React.ReactNode;
  /** Table footer renderer */
  footer?: (data: readonly RecordType[]) => React.ReactNode;
  /** Summary row renderer */
  summary?: (data: readonly RecordType[]) => React.ReactNode;
  /** Table DOM id */
  id?: string;
  /** Show table header */
  showHeader?: boolean;
  /** Custom table components */
  components?: ComponentsType;
  /** Empty state text/node */
  emptyText?: React.ReactNode | (() => React.ReactNode);
  /** Row props getter */
  onRow?: (record: RecordType, index: number) => React.HTMLAttributes<HTMLTableRowElement>;
  /** Header row props getter */
  onHeaderRow?: (columns: ColumnType[], index: number) => React.HTMLAttributes<HTMLTableRowElement>;
  /** Internal hooks identifier */
  internalHooks?: string;
  /** Transform columns function */
  transformColumns?: (columns: ColumnType[]) => ColumnType[];
  /** Internal DOM references */
  internalRefs?: InternalRefs;
  /** Sticky configuration */
  sticky?: boolean | StickyConfig;
  /** Expandable configuration */
  expandable?: ExpandableConfig<RecordType>;
}

/**
 * Memoized children wrapper component
 * Only re-renders when props change or ping state changes
 */
declare const MemoizedChildrenWrapper: React.MemoExoticComponent<
  (props: {
    children: React.ReactNode;
    props: TableProps;
    pingLeft: boolean;
    pingRight: boolean;
  }) => JSX.Element
>;

/**
 * Main Table component
 * @template RecordType - Type of data records
 */
declare function Table<RecordType = unknown>(props: TableProps<RecordType>): JSX.Element;

declare namespace Table {
  /** Column component for JSX-style column definition */
  const Column: React.ComponentType<ColumnType>;
  
  /** Column group component */
  const ColumnGroup: React.ComponentType<{ title?: React.ReactNode }>;
  
  /** Summary components (for table footer summaries) */
  const Summary: {
    Cell: React.ComponentType<unknown>;
    Row: React.ComponentType<unknown>;
  };
  
  /** Default props */
  const defaultProps: {
    rowKey: string;
    prefixCls: string;
    emptyText: () => string;
  };
}

export default Table;