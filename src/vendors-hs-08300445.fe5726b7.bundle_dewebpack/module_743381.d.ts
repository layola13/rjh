/**
 * Mask component for modal/dialog overlays
 * Renders a semi-transparent backdrop with configurable animations
 */

import type { CSSProperties, ReactElement } from 'react';

/**
 * Motion configuration for mask animations
 */
export interface MaskMotionConfig {
  /** Animation motion name */
  motionName?: string;
  /** Motion appear animation */
  motionAppear?: boolean;
  /** Motion enter animation */
  motionEnter?: boolean;
  /** Motion leave animation */
  motionLeave?: boolean;
  /** Callback when motion appears */
  onAppearStart?: () => void;
  /** Callback when motion ends */
  onLeaveEnd?: () => void;
}

/**
 * Props for the Mask component
 */
export interface MaskProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Whether the mask is visible */
  visible: boolean;
  
  /** Z-index value for layering */
  zIndex?: number;
  
  /** Whether to show the mask backdrop */
  mask?: boolean;
  
  /** Motion configuration object for animations */
  maskMotion?: MaskMotionConfig;
  
  /** CSS animation class name */
  maskAnimation?: string;
  
  /** CSS transition class name */
  maskTransitionName?: string;
}

/**
 * Render props for motion wrapper
 */
export interface MotionRenderProps {
  /** Generated className from motion state */
  className?: string;
}

/**
 * Result of getMotion utility function
 */
export interface MotionResult {
  /** Motion configuration name */
  motionName?: string;
  /** Additional motion properties */
  [key: string]: unknown;
}

/**
 * Renders a mask overlay with optional animations
 * Returns null if mask prop is false
 * 
 * @param props - Mask component properties
 * @returns React element or null
 * 
 * @example
 *