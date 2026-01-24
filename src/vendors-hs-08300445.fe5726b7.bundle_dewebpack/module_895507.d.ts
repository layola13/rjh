import React from 'react';

/**
 * Tooltip placement options
 */
export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

/**
 * Trigger actions that can show/hide the tooltip
 */
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'contextMenu';

/**
 * Alignment configuration for tooltip positioning
 */
export interface TooltipAlignConfig {
  /** Horizontal alignment points */
  points?: string[];
  /** Horizontal offset */
  offset?: [number, number];
  /** Target offset */
  targetOffset?: [number, number];
  /** Overflow configuration */
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
  /** Use CSS right property */
  useCssRight?: boolean;
  /** Use CSS bottom property */
  useCssBottom?: boolean;
  /** Use CSS transform property */
  useCssTransform?: boolean;
}

/**
 * Configuration for destroying tooltip on hide
 */
export interface DestroyTooltipConfig {
  /** Whether to keep parent element when destroying */
  keepParent?: boolean;
}

/**
 * Props for the Tooltip component
 */
export interface TooltipProps {
  /** Custom class name for the overlay */
  overlayClassName?: string;

  /** Trigger actions to show/hide tooltip */
  trigger?: TooltipTrigger[];

  /** Delay in seconds before showing tooltip on mouse enter */
  mouseEnterDelay?: number;

  /** Delay in seconds before hiding tooltip on mouse leave */
  mouseLeaveDelay?: number;

  /** Style object for the overlay */
  overlayStyle?: React.CSSProperties;

  /** Prefix class name for tooltip elements */
  prefixCls?: string;

  /** Child element that triggers the tooltip */
  children?: React.ReactElement;

  /** Callback fired when visibility changes */
  onVisibleChange?: (visible: boolean) => void;

  /** Callback fired after visibility animation completes */
  afterVisibleChange?: (visible: boolean) => void;

  /** CSS transition name for show/hide animations */
  transitionName?: string;

  /** Animation name for show/hide */
  animation?: string;

  /** Placement position of the tooltip relative to target */
  placement?: TooltipPlacement;

  /** Alignment configuration for fine-tuning position */
  align?: TooltipAlignConfig;

  /** Whether to destroy tooltip DOM when hidden */
  destroyTooltipOnHide?: boolean | DestroyTooltipConfig;

  /** Whether tooltip is visible by default */
  defaultVisible?: boolean;

  /** Function to get the container element for tooltip portal */
  getTooltipContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /** Style object for the inner overlay content */
  overlayInnerStyle?: React.CSSProperties;

  /** Content to render inside the arrow element */
  arrowContent?: React.ReactNode;

  /** Content to render in the tooltip overlay */
  overlay: React.ReactNode | (() => React.ReactNode);

  /** ID attribute for the tooltip element */
  id?: string;

  /** Controlled visibility state */
  visible?: boolean;

  /** Additional popup-related props from rc-trigger */
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  onPopupVisibleChange?: (visible: boolean) => void;
  destroyPopupOnHide?: boolean;
  autoDestroy?: boolean;
  popupStyle?: React.CSSProperties;
  popupClassName?: string;
  popupPlacement?: string;
  popupAlign?: TooltipAlignConfig;
  popupTransitionName?: string;
  popupAnimation?: string;
  action?: string | string[];
  builtinPlacements?: Record<string, TooltipAlignConfig>;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  afterPopupVisibleChange?: (visible: boolean) => void;
}

/**
 * Tooltip component ref handle
 */
export interface TooltipRef {
  /** Force update tooltip position */
  forcePopupAlign: () => void;
  /** Get popup DOM node */
  getPopupDomNode: () => HTMLElement | null;
  /** Get trigger DOM node */
  getRootDomNode: () => HTMLElement | null;
}

/**
 * rc-tooltip: React Tooltip component
 * 
 * A flexible tooltip component that supports multiple trigger modes,
 * customizable positioning, and animations.
 * 
 * @example
 *