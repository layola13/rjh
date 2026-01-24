/**
 * Dropdown component for displaying a list of actions or options
 * Supports various placements, triggers, and arrow configurations
 */

import type { ReactElement, ReactNode } from 'react';
import type { RenderFunction } from 'rc-dropdown/lib/Dropdown';
import type { AlignType } from '@rc-component/trigger';

/**
 * Placement options for the dropdown
 */
export type DropdownPlacement =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

/**
 * Trigger actions that can open the dropdown
 */
export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';

/**
 * Arrow configuration for dropdown
 */
export interface DropdownArrowConfig {
  /** Whether to show arrow */
  pointAtCenter?: boolean;
}

/**
 * Base props for Dropdown component
 */
export interface DropdownProps {
  /** Custom CSS class prefix */
  prefixCls?: string;
  
  /** Child element that triggers the dropdown */
  children?: ReactElement;
  
  /** Dropdown menu content */
  overlay: ReactNode | (() => ReactNode);
  
  /** Trigger actions */
  trigger?: DropdownTrigger | DropdownTrigger[];
  
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  
  /** Additional class name for overlay */
  overlayClassName?: string;
  
  /** Placement of the dropdown */
  placement?: DropdownPlacement;
  
  /** Arrow configuration, true to show default arrow */
  arrow?: boolean | DropdownArrowConfig;
  
  /** Custom container for the dropdown portal */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** Custom transition name */
  transitionName?: string;
  
  /** Delay in seconds before showing dropdown on mouse enter */
  mouseEnterDelay?: number;
  
  /** Delay in seconds before hiding dropdown on mouse leave */
  mouseLeaveDelay?: number;
  
  /** Whether dropdown is visible */
  visible?: boolean;
  
  /** Callback when visibility changes */
  onVisibleChange?: (visible: boolean) => void;
  
  /** Alignment configuration */
  align?: AlignType;
  
  /** Destroy tooltip when hidden */
  destroyPopupOnHide?: boolean;
  
  /** Whether point to the center of target */
  alignPoint?: boolean;
}

/**
 * Props for DropdownButton component
 */
export interface DropdownButtonProps extends Omit<DropdownProps, 'children'> {
  /** Button type */
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  
  /** Button size */
  size?: 'large' | 'middle' | 'small';
  
  /** Button content */
  children?: ReactNode;
  
  /** Click handler for main button */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  
  /** Button HTML type */
  htmlType?: 'button' | 'submit' | 'reset';
  
  /** Icon for the button */
  icon?: ReactNode;
  
  /** Whether button is loading */
  loading?: boolean;
  
  /** Dropdown button text direction */
  direction?: 'ltr' | 'rtl';
}

/**
 * Dropdown component with static Button property
 */
interface DropdownComponent {
  (props: DropdownProps): ReactElement;
  
  /** Button variant of Dropdown */
  Button: React.ComponentType<DropdownButtonProps>;
  
  /** Default props */
  defaultProps: {
    mouseEnterDelay: number;
    mouseLeaveDelay: number;
  };
}

/**
 * Dropdown component for displaying overlay menus
 * 
 * @example
 *