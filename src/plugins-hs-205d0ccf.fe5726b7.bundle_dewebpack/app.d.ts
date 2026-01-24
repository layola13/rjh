/**
 * App module for Spark Picture plugin
 * Provides the main application component with image management functionality
 */

import { Layout, LayoutProps } from 'antd';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Tab configuration for switching between folder view and all images view
 */
interface TabItem {
  /** Unique identifier for the tab */
  value: string;
  /** Display label for the tab */
  label: string;
}

/**
 * State management for the App component
 */
interface AppState {
  /** Whether the view is disabled/hidden */
  disable: boolean;
  /** Currently active tab identifier ('1' for folders, '2' for all images) */
  activeTab: '1' | '2';
  /** Number of available Spark Picture coupons */
  sparkPicCoupon: number;
  /** Default task to be displayed (optional) */
  defaultTask?: unknown;
}

/**
 * Props for the App component
 */
interface AppProps {
  /** Callback function invoked when user quits the image list view */
  quitImageList?: () => void;
}

/**
 * Imperative handle methods exposed via ref
 */
interface AppHandle {
  /**
   * Enable or disable the view
   * @param disabled - True to disable the view, false to enable
   */
  disableView(disabled: boolean): void;
  
  /**
   * Set the default task to be displayed
   * @param task - Task object or identifier
   */
  setDefaultTask(task: unknown): void;
}

/**
 * Main application component for Spark Picture plugin
 * Manages image browsing with folder organization and coupon tracking
 * 
 * @remarks
 * This component provides:
 * - Tab-based navigation between favorite folders and all images
 * - Coupon balance display and updates
 * - Task view panel for folder management
 * - Grid viewer for browsing all images
 */
export const App: ForwardRefExoticComponent<AppProps & RefAttributes<AppHandle>>;

/**
 * Default export of the App component
 */
export default App;