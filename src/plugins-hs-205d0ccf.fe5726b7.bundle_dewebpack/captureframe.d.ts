/**
 * CaptureFrame Component Module
 * 
 * This module provides a React component for rendering a capture frame overlay
 * that adapts to viewport dimensions and can switch between 2D and 3D view modes.
 */

import { Component, CSSProperties, ReactPortal } from 'react';

/**
 * Aspect ratio configuration for the capture frame
 */
export interface FrameProportion {
  /** Width of the frame in aspect ratio units */
  width: number;
  /** Height of the frame in aspect ratio units */
  height: number;
}

/**
 * Boundary rectangle defining the frame position and dimensions
 */
export interface FrameBounds {
  /** Left position in pixels from viewport origin */
  left: number;
  /** Top position in pixels from viewport origin */
  top: number;
  /** Frame width in pixels */
  width: number;
  /** Frame height in pixels */
  height: number;
}

/**
 * Internal style state for the frame element
 */
interface FrameStyle extends CSSProperties {
  width: number;
  height: number;
  top: number;
  left: number;
}

/**
 * State interface for CaptureFrame component
 */
interface CaptureFrameState {
  /** Computed CSS styles for the frame element */
  style?: FrameStyle;
}

/**
 * Props interface for CaptureFrame component
 */
interface CaptureFrameProps {
  /** 
   * Aspect ratio proportion configuration
   * Determines the width-to-height ratio of the capture frame
   */
  proportion: FrameProportion;

  /**
   * Optional callback invoked when frame bounds change
   * @param bounds - Current frame boundary rectangle
   */
  setBound?: (bounds: FrameBounds) => void;
}

/**
 * Computed dimensions for 2D view active state
 */
interface View2DActiveDimensions {
  /** Scaled frame width for 2D view */
  frameWidth: number;
  /** Scaled frame height for 2D view */
  frameHeight: number;
  /** Vertical border offset (top/bottom padding) */
  borderH: number;
  /** Horizontal border offset (left/right padding) */
  borderW: number;
  /** Vertical delta adjustment for frame positioning */
  deltaH: number;
  /** Horizontal delta adjustment for frame positioning */
  deltaW: number;
}

/**
 * CaptureFrame React Component
 * 
 * Renders a resizable frame overlay that maintains aspect ratio and adapts to:
 * - Window resizing
 * - 2D/3D view mode switching
 * - Canvas rectangle changes
 * 
 * The frame is positioned within the editor viewport accounting for:
 * - Top navigation bar (57px)
 * - Left sidebar (282px)
 * - Right panel (242px)
 * - Bottom toolbar (121px)
 * 
 * @remarks
 * This component integrates with HSApp application environment and only renders
 * when the active environment is SparkPicEnv.
 */
export declare class CaptureFrame extends Component<CaptureFrameProps, CaptureFrameState> {
  /**
   * Reference to the global HSApp application instance
   */
  private app: typeof HSApp.App;

  /**
   * Reference to the 3D editor DOM element
   */
  private editor3d: HTMLElement | null;

  /**
   * Constructor
   * @param props - Component props
   */
  constructor(props: CaptureFrameProps);

  /**
   * Static lifecycle method - derives state from props changes
   * 
   * Calculates frame dimensions and positioning based on:
   * - Current window dimensions
   * - Desired aspect ratio (proportion)
   * - Available viewport space (accounting for UI chrome)
   * 
   * @param props - Incoming component props
   * @param state - Current component state
   * @returns Updated state object with computed styles, or null if no update needed
   */
  static getDerivedStateFromProps(
    props: CaptureFrameProps,
    state: CaptureFrameState
  ): Partial<CaptureFrameState> | null;

  /**
   * Lifecycle method - invoked after component mounts to DOM
   * 
   * - Registers canvas rectangle change listener
   * - Schedules initial view update with 500ms delay
   */
  componentDidMount(): void;

  /**
   * Lifecycle method - invoked before component unmounts
   * 
   * - Unregisters canvas rectangle change listener to prevent memory leaks
   */
  componentWillUnmount(): void;

  /**
   * Lifecycle method - invoked after component updates
   * 
   * Triggers bound update if proportion prop changed
   * 
   * @param prevProps - Previous component props
   */
  componentDidUpdate(prevProps: CaptureFrameProps): void;

  /**
   * Force re-render and update frame boundaries
   * 
   * Callback registered to canvas rectangle change signal
   */
  private updateView: () => void;

  /**
   * Calculate and notify parent of current frame bounds
   * 
   * Adjusts bounds based on:
   * - Current view mode (2D vs 3D)
   * - UI chrome dimensions (sidebar, navbar, etc.)
   * - Frame style computed from aspect ratio
   * 
   * Invokes props.setBound callback if defined
   */
  private updateBound(): void;

  /**
   * Calculate scaled dimensions for 2D view mode
   * 
   * Accounts for:
   * - Window inner height scaling
   * - Editor 3D bounding rectangle
   * - Fixed UI element offsets (64px vertical, 40px horizontal)
   * 
   * @returns Computed 2D view dimensions and offsets
   */
  private get2DViewActiveSize(): View2DActiveDimensions;

  /**
   * Render method
   * 
   * Returns:
   * - null if editor3d not found or not in SparkPicEnv
   * - Frame border div with CameraPitchLine for 3D view
   * - Portal-rendered 2D frame overlay for 2D view
   * 
   * @returns React element, portal, or null
   */
  render(): JSX.Element | ReactPortal | null;
}