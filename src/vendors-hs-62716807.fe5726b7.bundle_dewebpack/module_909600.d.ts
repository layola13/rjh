/**
 * Collapse Panel Component
 * A panel component that wraps antd Collapse.Panel with additional features
 */

import type { ReactElement } from 'react';
import type { CollapsePanelProps as AntdCollapsePanelProps } from 'antd/es/collapse';

/**
 * Props for the Collapse Panel component
 */
export interface CollapsePanelProps extends AntdCollapsePanelProps {
  /**
   * Custom CSS class prefix for the component
   */
  prefixCls?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Whether to show the arrow icon
   * @default true
   */
  showArrow?: boolean;

  /**
   * @deprecated Use `collapsible="disabled"` instead
   * Whether the panel is disabled
   */
  disabled?: boolean;

  /**
   * Controls whether the panel can be collapsed
   * Use "disabled" to disable the panel
   */
  collapsible?: 'header' | 'disabled';
}

/**
 * Collapse Panel component that extends antd's Collapse.Panel
 * 
 * @param props - The component props
 * @returns A Collapse Panel element
 * 
 * @example
 *