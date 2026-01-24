/**
 * Loading icon component for buttons with motion animation support.
 * Displays a loading spinner with smooth enter/leave transitions.
 */

import React from 'react';

/**
 * Motion state for component animations
 */
interface MotionState {
  /** Width of the loading icon container */
  width: number | string;
  /** Opacity value for fade effect */
  opacity: number;
  /** CSS transform property for scale animation */
  transform: string;
}

/**
 * Props for the loading icon component
 */
interface LoadingIconProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  /** Whether the loading state is active */
  loading?: boolean;
  /** Whether an icon already exists (skip motion wrapper) */
  existIcon?: boolean;
}

/**
 * Render function props for motion component children
 */
interface MotionRenderProps {
  /** Generated className from motion component */
  className?: string;
  /** Inline styles from motion component */
  style?: React.CSSProperties;
}

/**
 * Motion component props
 */
interface MotionComponentProps {
  /** Whether the component is visible */
  visible: boolean;
  /** CSS class name for motion animations */
  motionName: string;
  /** Remove DOM element when leave animation completes */
  removeOnLeave: boolean;
  /** Callback when appear animation starts */
  onAppearStart: () => MotionState;
  /** Callback when appear animation is active */
  onAppearActive: (element: HTMLElement) => MotionState;
  /** Callback when enter animation starts */
  onEnterStart: () => MotionState;
  /** Callback when enter animation is active */
  onEnterActive: (element: HTMLElement) => MotionState;
  /** Callback when leave animation starts */
  onLeaveStart: (element: HTMLElement) => MotionState;
  /** Callback when leave animation is active */
  onLeaveActive: () => MotionState;
  /** Render function for motion children */
  children: (props: MotionRenderProps, ref: React.Ref<HTMLSpanElement>) => React.ReactElement;
}

/**
 * Returns initial hidden state for motion start
 * @returns Motion state with zero opacity and scale
 */
declare function getMotionStartState(): MotionState;

/**
 * Returns fully visible state for motion completion
 * @param element - The DOM element to measure
 * @returns Motion state with full opacity and scale
 */
declare function getMotionActiveState(element: HTMLElement): MotionState;

/**
 * Loading icon component with optional motion animation.
 * Renders either a static loading icon or an animated one based on props.
 * 
 * @param props - Component properties
 * @returns React element containing the loading icon
 */
declare function LoadingIcon(props: LoadingIconProps): React.ReactElement;

export default LoadingIcon;

/**
 * Motion wrapper component for animations
 * (Imported from external module)
 */
declare const CSSMotion: React.ComponentType<MotionComponentProps>;

/**
 * Loading spinner icon component
 * (Imported from external module)
 */
declare const LoadingOutlined: React.ComponentType<{ className?: string }>;