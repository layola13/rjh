/**
 * Tab component module
 * Exports the main Tab component and TabPane subcomponent
 */

import Tab from './Tab';
import TabPane from './TabPane';

/**
 * Tab pane subcomponent for organizing tab content
 */
export { TabPane };

/**
 * Main Tab component for creating tabbed interfaces
 * @default Tab
 */
export default Tab;

/**
 * Type definitions for the Tab module
 */
declare module 'Tab' {
  /**
   * Main Tab component properties
   */
  export interface TabProps {
    /** Active tab key */
    activeKey?: string | number;
    /** Default active tab key */
    defaultActiveKey?: string | number;
    /** Callback when tab is changed */
    onChange?: (activeKey: string | number) => void;
    /** Tab position */
    tabPosition?: 'top' | 'right' | 'bottom' | 'left';
    /** Tab type */
    type?: 'line' | 'card' | 'editable-card';
    /** Additional CSS class name */
    className?: string;
    /** Inline styles */
    style?: React.CSSProperties;
    /** Child TabPane components */
    children?: React.ReactNode;
  }

  /**
   * TabPane component properties
   */
  export interface TabPaneProps {
    /** Unique key for the tab pane */
    key: string | number;
    /** Tab title */
    tab: React.ReactNode;
    /** Whether the tab is disabled */
    disabled?: boolean;
    /** Whether the tab can be closed (for editable-card type) */
    closable?: boolean;
    /** Additional CSS class name */
    className?: string;
    /** Inline styles */
    style?: React.CSSProperties;
    /** Tab pane content */
    children?: React.ReactNode;
  }

  /**
   * Main Tab component
   */
  const Tab: React.FC<TabProps>;

  /**
   * TabPane subcomponent
   */
  export const TabPane: React.FC<TabPaneProps>;

  export default Tab;
}