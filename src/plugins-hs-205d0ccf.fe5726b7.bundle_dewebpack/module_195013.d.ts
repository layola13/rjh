/**
 * Pagination properties interface
 * Defines the configuration options for pagination component
 */
export interface PaginationProps {
  /** Total number of items */
  total?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Current page number */
  current?: number;
  /** Callback when page changes */
  onChange?: (page: number, pageSize?: number) => void;
  /** Show size changer */
  showSizeChanger?: boolean;
  /** Show quick jumper */
  showQuickJumper?: boolean;
  /** Total text renderer */
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}

/**
 * Teaching view component props
 */
export interface TeachingViewProps {
  /** Top section content */
  top?: React.ReactNode;
  /** Main content children */
  children?: React.ReactNode;
  /** Loading state indicator */
  loading?: boolean;
  /** Whether to show pagination */
  showPagination?: boolean;
  /** Pagination configuration */
  paginationProps?: PaginationProps;
  /** Additional CSS class name */
  className?: string;
  /** Callback when content scrolls */
  onContentScroll?: (event: React.UIEvent<HTMLElement>) => void;
  /** Callback when content scrolls down */
  onContentScrollDown?: () => void;
  /** Callback when content scrolls up */
  onContentScrollUp?: () => void;
}

/**
 * Teaching view component state
 */
export interface TeachingViewState {
  /** Whether to show "back to top" button */
  showToTop: boolean;
  /** Scrollable element reference */
  scrollElement?: HTMLElement | null;
}

/**
 * Teaching view component
 * A content container with scroll handling, loading state, and optional pagination
 */
export default class TeachingView extends React.Component<TeachingViewProps, TeachingViewState> {
  /**
   * Theme context type from ThemeContext
   */
  static contextType: React.Context<any>;
  
  /**
   * Component state
   */
  state: TeachingViewState;
  
  /**
   * Constructor
   * @param props - Component props
   */
  constructor(props: TeachingViewProps);
  
  /**
   * Scrolls the content to the top
   */
  toTop(): void;
  
  /**
   * Renders the component
   */
  render(): React.ReactElement;
}

/**
 * Re-export PaginationProps for convenience
 */
export { PaginationProps };