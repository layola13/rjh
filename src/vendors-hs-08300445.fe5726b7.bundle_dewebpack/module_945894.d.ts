/**
 * TabBar navigation component for managing tab headers, scrolling, and extra content.
 * Handles horizontal/vertical tab layouts, RTL support, animations, and responsive behavior.
 */

import type { ReactNode, CSSProperties, MouseEvent, KeyboardEvent } from 'react';

/**
 * Position type for extra content placement
 */
export type ExtraPosition = 'left' | 'right';

/**
 * Tab position in the layout
 */
export type TabPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Scroll direction for tab navigation
 */
export type ScrollDirection = 'left' | 'right' | 'top' | 'bottom';

/**
 * Scroll event data
 */
export interface TabScrollEvent {
  /** Direction of the scroll */
  direction: ScrollDirection;
}

/**
 * Tab data structure
 */
export interface Tab {
  /** Unique identifier for the tab */
  key: string;
  /** Tab label content */
  label?: ReactNode;
  /** Whether the tab can be closed */
  closable?: boolean;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Custom tab content */
  children?: ReactNode;
}

/**
 * Tab dimensions and position
 */
export interface TabOffset {
  /** Width of the tab element */
  width: number;
  /** Height of the tab element */
  height: number;
  /** Left offset position */
  left: number;
  /** Right offset position */
  right: number;
  /** Top offset position */
  top: number;
}

/**
 * Animation configuration
 */
export interface AnimatedConfig {
  /** Enable ink bar animation */
  inkBar?: boolean;
  /** Enable tab pane animation */
  tabPane?: boolean;
}

/**
 * Editable configuration for tabs
 */
export interface EditableConfig {
  /** Callback when adding a new tab */
  onAdd?: () => void;
  /** Callback when removing a tab */
  onRemove?: (key: string) => void;
  /** Show add button */
  showAdd?: boolean;
  /** Remove button aria-label */
  removeAriaLabel?: string;
  /** Add button aria-label */
  addAriaLabel?: string;
}

/**
 * Locale strings for accessibility
 */
export interface TabLocale {
  /** Aria label for remove button */
  removeAriaLabel?: string;
  /** Aria label for add button */
  addAriaLabel?: string;
}

/**
 * Extra content configuration
 */
export interface ExtraContent {
  /** Content displayed on the left */
  left?: ReactNode;
  /** Content displayed on the right */
  right?: ReactNode;
}

/**
 * TabBar component props
 */
export interface TabBarProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Unique identifier for the tab bar */
  id?: string;
  /** Animation configuration */
  animated?: AnimatedConfig;
  /** Currently active tab key */
  activeKey?: string;
  /** Right-to-left mode */
  rtl?: boolean;
  /** Extra content (ReactNode or ExtraContent config) */
  extra?: ReactNode | ExtraContent;
  /** Editable configuration */
  editable?: EditableConfig;
  /** Locale strings */
  locale?: TabLocale;
  /** Tab position in layout */
  tabPosition?: TabPosition;
  /** Gap between tabs (in pixels) */
  tabBarGutter?: number;
  /** Tab items */
  tabs?: Tab[];
  /** Prefix for CSS classes */
  prefixCls?: string;
  /** Custom tab wrapper renderer */
  children?: (node: ReactNode) => ReactNode;
  
  /** Callback when a tab is clicked */
  onTabClick?: (key: string, event: MouseEvent<HTMLElement>) => void;
  /** Callback when tab bar is scrolled */
  onTabScroll?: (event: TabScrollEvent) => void;
}

/**
 * Props for rendering extra content
 */
interface ExtraContentProps {
  /** Position of the extra content */
  position: ExtraPosition;
  /** Extra content to render */
  extra?: ReactNode | ExtraContent;
  /** Prefix for CSS classes */
  prefixCls: string;
}

/**
 * Renders extra content (left or right) in the tab bar
 * @param props - Extra content configuration
 * @returns Extra content element or null
 */
declare function ExtraContent(props: ExtraContentProps): ReactNode | null;

/**
 * TabBar navigation component
 * Manages tab headers with scrolling, animations, and responsive behavior.
 * Supports horizontal/vertical layouts, RTL mode, and editable tabs.
 */
declare const TabBar: React.ForwardRefExoticComponent<
  TabBarProps & React.RefAttributes<HTMLDivElement>
>;

export default TabBar;