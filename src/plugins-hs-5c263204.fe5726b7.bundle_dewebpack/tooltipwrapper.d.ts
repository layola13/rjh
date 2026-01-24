import React, { ReactElement, useRef } from 'react';

/**
 * Tooltip placement options
 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Tooltip information configuration
 */
export interface TooltipInfo {
  /** Tooltip title text */
  title: string;
  /** Whether the tooltip can be closed by user */
  canClose: boolean;
  /** Callback function when tooltip is closed */
  onClose?: () => void;
}

/**
 * Tooltip configuration object
 */
export interface TooltipConfig {
  /** Placement position of the tooltip */
  tooltipPlacement: TooltipPlacement;
  /** Tooltip content information */
  tooltipInfo: TooltipInfo;
}

/**
 * Props for ToolTipWrapper component
 */
export interface ToolTipWrapperProps {
  /** Tooltip configuration */
  tip: TooltipConfig;
}

/**
 * Props for internal Tooltip component
 */
export interface TooltipProps {
  /** Tooltip title text */
  title: string;
  /** Placement position of the tooltip */
  placement: TooltipPlacement;
  /** Whether the tooltip can be closed */
  canClose: boolean;
  /** Callback function when close button is clicked */
  onClose?: () => void;
}

/**
 * Internal Tooltip component that renders the tooltip UI
 * @param props - Tooltip properties
 * @returns Rendered tooltip element
 */
export declare function Tooltip(props: TooltipProps): ReactElement;

/**
 * Wrapper component for rendering guide tooltips
 * @param props - Component properties containing tooltip configuration
 * @returns Rendered tooltip wrapper element
 */
export declare function ToolTipWrapper(props: ToolTipWrapperProps): ReactElement;

/**
 * Default export of the Tooltip component
 */
declare const _default: typeof Tooltip;
export default _default;