import React, { Component, ReactNode } from 'react';
import { Switch, Tooltip } from 'antd';
import { Icons } from './Icons';
import { createComponentByType } from './ComponentFactory';

/**
 * Icon configuration with tooltip or popover
 */
interface IconConfig {
  /** Icon type identifier */
  type?: string;
  /** Simple tooltip text */
  tooltip?: string;
  /** Popover configuration with image */
  popover?: {
    /** Popover placement position */
    placement?: 'top' | 'bottom' | 'left' | 'right';
    /** Trigger type for popover */
    trigger?: 'hover' | 'click';
    /** Custom CSS class name */
    className?: string;
    /** Offset position */
    offset?: { x: number; y: number };
    /** Image URL for popover content */
    imgUrl?: string;
  };
}

/**
 * Custom icon configuration
 */
interface CustomIconConfig {
  /** Image URL for custom icon */
  imgUrl?: string;
  /** Click handler for custom icon */
  onClick?: () => void;
}

/**
 * Reset button configuration
 */
interface ResetItemConfig {
  /** Text label for reset button */
  text?: string;
  /** Click handler for reset action */
  onResetClick?: () => void;
}

/**
 * Child item configuration (recursive structure)
 */
interface ChildItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label?: string;
  /** Item type for component creation */
  type: string;
  /** Additional properties */
  [key: string]: unknown;
}

/**
 * Level 3 property bar item configuration
 */
interface PropertyBarLevel3Item {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label?: string;
  /** Icon configuration */
  icon?: IconConfig;
  /** Left switch status */
  status?: boolean;
  /** Right switch status */
  rightStatus?: boolean;
  /** Status change callback for left switch */
  onStatusChange?: (checked: boolean) => void;
  /** Status change callback for right switch */
  onRightStatusChange?: (checked: boolean) => void;
  /** Callback when status click is disabled */
  disableStatusClick?: () => void;
  /** Reset button configuration */
  resetItem?: ResetItemConfig;
  /** Disable collapse/expand functionality */
  disableClose?: boolean;
  /** Hide the entire component */
  disableShow?: boolean;
  /** Disable switch interactions */
  disabled?: boolean;
  /** Custom icon configuration */
  customIcon?: CustomIconConfig;
  /** Child items to render */
  items: ChildItem[];
}

/**
 * Component props
 */
interface PropertyBarLevel3Props {
  /** Configuration object for the level 3 item */
  item: PropertyBarLevel3Item;
}

/**
 * Component state
 */
interface PropertyBarLevel3State {
  /** Current status of left switch */
  status: boolean;
  /** Current status of right switch */
  rightStatus?: boolean;
  /** Whether content area is expanded */
  isOpened: boolean;
}

/**
 * Level 3 Property Bar Component
 * 
 * A collapsible property panel with dual switch controls, reset functionality,
 * and support for nested child components. Commonly used in property panels
 * for detailed configuration sections.
 * 
 * @example
 *