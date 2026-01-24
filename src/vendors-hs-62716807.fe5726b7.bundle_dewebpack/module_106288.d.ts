import type { ReactNode, ReactElement, Key, MouseEvent } from 'react';

/**
 * Tab size variants
 */
export type TabSize = 'small' | 'default' | 'large';

/**
 * Tab type variants
 */
export type TabType = 'line' | 'card' | 'editable-card';

/**
 * Tab edit action types
 */
export type TabEditAction = 'add' | 'remove';

/**
 * Direction for RTL/LTR support
 */
export type DirectionType = 'ltr' | 'rtl';

/**
 * Edit handler callback type
 * @param targetKey - The key of the tab being removed, or the event for add action
 * @param action - The type of edit action performed
 */
export type TabEditHandler = (
  targetKey: MouseEvent | Key,
  action: TabEditAction
) => void;

/**
 * Tab scroll callback type
 * @param direction - The scroll direction
 */
export type TabScrollHandler = (direction: { direction: 'left' | 'right' }) => void;

/**
 * Props for the Tabs component
 */
export interface TabsProps {
  /**
   * Prefix for CSS class names
   */
  prefixCls?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Tab type variant
   * @default 'line'
   */
  type?: TabType;

  /**
   * Size of the tabs
   * @default 'default'
   */
  size?: TabSize;

  /**
   * Callback executed when tabs are added or removed in editable mode
   */
  onEdit?: TabEditHandler;

  /**
   * Whether to hide the add button in editable-card mode
   * @default false
   */
  hideAdd?: boolean;

  /**
   * Whether to center the tabs
   * @default false
   */
  centered?: boolean;

  /**
   * Custom add icon for editable-card mode
   */
  addIcon?: ReactNode;

  /**
   * Text direction for internationalization
   */
  direction?: DirectionType;

  /**
   * Active tab key
   */
  activeKey?: string;

  /**
   * Default active tab key
   */
  defaultActiveKey?: string;

  /**
   * Callback executed when active tab changes
   */
  onChange?: (activeKey: string) => void;

  /**
   * Callback executed when tab is clicked
   */
  onTabClick?: (key: string, event: MouseEvent) => void;

  /**
   * Callback executed when tab list is scrolled
   */
  onTabScroll?: TabScrollHandler;

  /**
   * Position of tabs
   * @default 'top'
   */
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Whether tabs can be destroyed when hidden
   * @default false
   */
  destroyInactiveTabPane?: boolean;

  /**
   * Tab bar extra content
   */
  tabBarExtraContent?: ReactNode | { left?: ReactNode; right?: ReactNode };

  /**
   * Tab bar style
   */
  tabBarStyle?: React.CSSProperties;

  /**
   * Tab bar gutter
   */
  tabBarGutter?: number;

  /**
   * Animated configuration
   */
  animated?: boolean | { inkBar: boolean; tabPane: boolean };

  /**
   * Render tab bar
   */
  renderTabBar?: (
    props: TabsProps,
    DefaultTabBar: React.ComponentType<any>
  ) => ReactElement;

  /**
   * Children tab panes
   */
  children?: ReactNode;

  /**
   * Custom more icon
   */
  moreIcon?: ReactNode;

  /**
   * @deprecated Use `onTabScroll` instead
   */
  onPrevClick?: () => void;

  /**
   * @deprecated Use `onTabScroll` instead
   */
  onNextClick?: () => void;
}

/**
 * Props for TabPane component
 */
export interface TabPaneProps {
  /**
   * Tab key
   */
  key: string;

  /**
   * Tab title
   */
  tab: ReactNode;

  /**
   * Whether tab is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether tab can be closed (only works when type="editable-card")
   * @default true
   */
  closable?: boolean;

  /**
   * Custom close icon
   */
  closeIcon?: ReactNode;

  /**
   * Whether to force render the content
   * @default false
   */
  forceRender?: boolean;

  /**
   * Tab content
   */
  children?: ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Editable configuration for editable-card type
 */
interface EditableConfig {
  /**
   * Edit handler
   */
  onEdit: (action: TabEditAction, options: { key: Key; event: MouseEvent }) => void;

  /**
   * Remove icon
   */
  removeIcon: ReactNode;

  /**
   * Add icon
   */
  addIcon: ReactNode;

  /**
   * Whether to show add button
   */
  showAdd: boolean;
}

/**
 * Tabs component for organizing content into separate views
 */
declare const Tabs: React.FC<TabsProps> & {
  /**
   * TabPane sub-component for defining individual tab panels
   */
  TabPane: React.FC<TabPaneProps>;
};

export default Tabs;