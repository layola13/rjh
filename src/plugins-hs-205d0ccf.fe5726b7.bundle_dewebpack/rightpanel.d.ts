/**
 * RightPanel Module
 * Provides the right panel UI for Spark Picture environment with camera settings
 */

import { Component, ReactNode, RefObject } from 'react';

/**
 * Props for RightPanel component
 */
export interface RightPanelProps {
  /** Whether the panel is visible */
  visible?: boolean;
  /** Frame boundary information for camera positioning */
  frameBound?: FrameBound;
}

/**
 * Frame boundary data structure
 */
export interface FrameBound {
  /** Left coordinate */
  left?: number;
  /** Top coordinate */
  top?: number;
  /** Width of the frame */
  width?: number;
  /** Height of the frame */
  height?: number;
}

/**
 * Internal state for RightPanel component
 */
interface RightPanelState {
  /** Whether to show the larger view mode */
  showLargerView: boolean;
  /** Operation function name ('add' | 'remove') for class manipulation */
  opeFunc?: 'add' | 'remove';
}

/**
 * Layout constraint callback data
 */
interface LayoutConstraintData {
  /** Whether the view is in modal mode */
  isModal?: boolean;
  /** Left position of the element */
  left?: number;
}

/**
 * Imperative handle for RightPanelContainer
 */
export interface RightPanelHandle {
  // Reserved for future imperative methods
}

/**
 * Main right panel component for Spark Picture environment
 * Displays camera settings including clip, tilt correction, general settings, and position
 * @class RightPanel
 * @extends {Component<RightPanelProps, RightPanelState>}
 */
export declare class RightPanel extends Component<RightPanelProps, RightPanelState> {
  /** Reference to the resize widget container element */
  private resizeWidget: Element | null;

  constructor(props: RightPanelProps);

  /**
   * Lifecycle: Register panel with layout manager and set up constraints
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Apply CSS class changes based on state updates
   * @param prevProps - Previous props
   * @param prevState - Previous state
   */
  componentDidUpdate(prevProps: RightPanelProps, prevState: RightPanelState): void;

  /**
   * Lifecycle: Clean up layout manager registration
   */
  componentWillUnmount(): void;

  /**
   * Render the right panel with camera settings
   * @returns React element representing the panel UI
   */
  render(): ReactNode;
}

/**
 * Container component for RightPanel with forward ref support
 * Provides imperative handle for parent component interactions
 * 
 * @param props - RightPanel props
 * @param ref - Forwarded ref for imperative handle
 * @returns RightPanel component wrapped with ref handling
 * 
 * @example
 *