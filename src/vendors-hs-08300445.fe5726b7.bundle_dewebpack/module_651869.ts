/**
 * Tab content panel container component
 * Manages the display and animation of tab panes
 */

import type { ReactElement, CSSProperties } from 'react';

/**
 * Position of the tabs relative to content
 */
export type TabPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Animation configuration for tab transitions
 */
export interface TabAnimationConfig {
  /** Enable tab pane content animation */
  tabPane: boolean;
}

/**
 * Tab item metadata
 */
export interface TabItem {
  /** Unique identifier for the tab */
  key: string;
  /** React element representing the tab pane */
  node: ReactElement;
}

/**
 * Context value provided to tab components
 */
export interface TabsContextValue {
  /** CSS class prefix for styling */
  prefixCls: string;
  /** List of all tab items */
  tabs: TabItem[];
}

/**
 * Props for the TabContentContainer component
 */
export interface TabContentContainerProps {
  /** Unique identifier for the tab group */
  id: string;
  /** Currently active tab key */
  activeKey: string;
  /** Animation configuration */
  animated: TabAnimationConfig;
  /** Position of tabs relative to content */
  tabPosition: TabPosition;
  /** Enable right-to-left layout */
  rtl: boolean;
  /** Destroy inactive tab pane content when switching tabs */
  destroyInactiveTabPane: boolean;
}

/**
 * Container component that manages tab content panels with animation support.
 * Handles sliding animations and conditional rendering of inactive panes.
 * 
 * @param props - Component properties
 * @returns React element containing all tab panes with animation wrapper
 */
export default function TabContentContainer(props: TabContentContainerProps): ReactElement;