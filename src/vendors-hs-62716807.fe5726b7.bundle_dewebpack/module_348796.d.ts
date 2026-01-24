/**
 * Wave effect component for click animations
 * Provides ripple/wave animation effect for interactive elements
 */

import * as React from 'react';
import { ConfigConsumerProps } from './ConfigContext';

/**
 * Props for the Wave component
 */
export interface WaveProps {
  /**
   * Whether to insert an extra DOM node for the animation effect
   * @default true
   */
  insertExtraNode?: boolean;
  
  /**
   * Child element to apply wave effect to
   */
  children?: React.ReactElement;
}

/**
 * State for the Wave component
 */
export interface WaveState {
  // Wave component is stateless
}

/**
 * Context type for Wave component
 */
export interface WaveContext {
  /**
   * Get prefix for CSS class names
   * @param suffixCls - Optional suffix for the class name
   * @returns Prefixed class name
   */
  getPrefixCls: (suffixCls?: string) => string;
}

/**
 * CSP (Content Security Policy) configuration
 */
export interface CSPConfig {
  /**
   * Nonce value for inline styles
   */
  nonce?: string;
}

/**
 * Animation event cancellation interface
 */
export interface AnimationEventBinding {
  /**
   * Cancel the animation event listener
   */
  cancel: () => void;
}

/**
 * Wave component class
 * Provides click animation effects (ripple/wave) for child components
 * 
 * @example
 *