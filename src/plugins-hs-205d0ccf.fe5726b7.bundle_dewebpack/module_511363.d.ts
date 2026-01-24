/**
 * ImageButton Component Type Definitions
 * A customizable image button component with hover, active states, tooltip, and signal support
 */

import { Component, MouseEvent } from 'react';
import PropTypes from 'prop-types';

/**
 * Signal interface for component communication
 */
export interface Signal<T = any> {
  /**
   * Subscribe to signal updates
   */
  listen(callback: (data: T) => void, context: any): void;
  
  /**
   * Unsubscribe from signal updates
   */
  unlisten(callback: (data: T) => void, context: any): void;
}

/**
 * Signal data payload for state updates
 */
export interface SignalData {
  data?: {
    /** Active state to apply */
    isActive?: boolean;
  };
}

/**
 * ImageButton component props data configuration
 */
export interface ImageButtonData {
  /** Additional CSS class name */
  className?: string;
  
  /** Tooltip overlay CSS class name */
  tooltipClassName?: string;
  
  /** Tooltip background color theme ('light' | 'dark' | custom color) */
  tooltipColor?: string;
  
  /** Tooltip text content */
  tooltip?: string;
  
  /** Whether to show a small triangle indicator at bottom */
  hasBottomTriangle?: boolean;
  
  /** Whether to maintain visual click/active state */
  keepClickStatus?: boolean;
  
  /** Icon identifier for display */
  imgShowType?: string;
  
  /** Dynamic icon type getter function */
  getImageShowType?: () => string;
  
  /** Icon color in normal state */
  imgNormalColor?: string;
  
  /** Icon color on hover state */
  imgHoverColor?: string;
  
  /** Icon color in active/clicked state */
  imgClickColor?: string;
  
  /** Whether button is in active state */
  isActive?: boolean;
  
  /** Whether to keep hover state visuals when active */
  keepHoverStatus?: boolean;
  
  /** Whether button is disabled */
  disable?: boolean;
  
  /** Click event handler */
  onclick?: (event: MouseEvent<HTMLDivElement>) => void;
  
  /** Signal instance for external state control */
  signal?: Signal<SignalData>;
  
  /** Whether to show red dot indicator (new feature badge) */
  showRedDot?: boolean;
}

/**
 * ImageButton component props
 */
export interface ImageButtonProps {
  /** Component configuration data */
  data: ImageButtonData;
}

/**
 * ImageButton component internal state
 */
export interface ImageButtonState {
  /** Whether mouse is hovering over button */
  isHover: boolean;
  
  /** Whether button is in active/clicked state */
  isActive: boolean;
  
  /** Whether to display red dot notification indicator */
  showRedDot?: boolean;
}

/**
 * ImageButton Component
 * 
 * A versatile button component featuring:
 * - Customizable icon with color states (normal, hover, active)
 * - Optional tooltip with positioning
 * - Signal-based external state control
 * - Red dot notification badge
 * - Bottom triangle indicator
 * - Click state persistence
 * 
 * @example
 *