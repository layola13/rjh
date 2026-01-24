import React from 'react';
import PropTypes from 'prop-types';

/**
 * Placement position for the tooltip
 */
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * Trigger type for showing/hiding the tooltip
 */
export type TooltipTrigger = 'click' | 'hover' | 'manual' | 'new';

/**
 * Offset configuration for tooltip positioning
 */
export interface TooltipOffset {
  /** Horizontal offset in pixels */
  x: number;
  /** Vertical offset in pixels */
  y: number;
}

/**
 * Component state interface
 */
export interface TooltipState {
  /** Whether the tooltip should remain open */
  keepOpen: boolean;
}

/**
 * Props for the Tooltip component
 */
export interface TooltipProps {
  /** Additional CSS class name */
  className?: string;
  /** Placement position of the tooltip */
  placement?: TooltipPlacement;
  /** Trigger type for the tooltip */
  trigger?: TooltipTrigger;
  /** Tooltip content/title (required) */
  title: string;
  /** General delay in milliseconds */
  delay?: number;
  /** Delay before opening in milliseconds */
  delayOpen?: number | null;
  /** Delay before closing in milliseconds */
  delayClose?: number | null;
  /** Callback fired when tooltip opens */
  onOpen?: () => void;
  /** Callback fired when tooltip closes */
  onClose?: () => void;
  /** Callback fired on mouse enter */
  onMouseEnter?: () => void;
  /** Callback fired on mouse leave */
  onMouseLeave?: () => void;
  /** Whether to use parent location for positioning */
  isParentLocation?: boolean;
  /** Whether to show a dot indicator */
  showDot?: boolean;
  /** Whether the tooltip can be removed/closed */
  canRemove?: boolean;
  /** Offset configuration for positioning */
  offset?: TooltipOffset;
  /** Tooltip type/variant */
  type?: string;
  /** Child elements that trigger the tooltip */
  children?: React.ReactNode;
}

/**
 * Trigger component instance interface
 */
export interface TriggerInstance {
  /** Check if the tooltip is currently opened */
  isOpened: () => boolean;
  /** Open the tooltip */
  open: () => void;
  /** Close the tooltip */
  close: (immediate?: boolean) => void;
  /** Toggle the tooltip open/close state */
  toggle: () => void;
}

/**
 * Tooltip component that displays contextual information
 * 
 * @example
 *