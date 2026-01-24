/**
 * Collapse motion configuration for Ant Design animations
 * Provides motion settings for collapse/expand animations with height and opacity transitions
 */

/**
 * Motion state representing collapsed state
 */
interface CollapsedState {
  /** Element height in pixels */
  height: number;
  /** Element opacity (0-1) */
  opacity: number;
}

/**
 * Motion state representing expanded state
 */
interface ExpandedState {
  /** Element height in pixels */
  height: number;
  /** Element opacity (0-1) */
  opacity: number;
}

/**
 * Motion state for leave animation start
 */
interface LeaveStartState {
  /** Element height in pixels */
  height: number;
}

/**
 * HTML element with scrollHeight property
 */
interface ScrollableElement extends HTMLElement {
  scrollHeight: number;
  offsetHeight: number;
}

/**
 * Transition event with propertyName
 */
interface MotionTransitionEvent {
  propertyName: string;
}

/**
 * Collapse motion configuration object
 */
interface CollapseMotionConfig {
  /** CSS class name prefix for motion */
  motionName: string;
  
  /** Returns initial state when element appears */
  onAppearStart: () => CollapsedState;
  
  /** Returns initial state when element enters */
  onEnterStart: () => CollapsedState;
  
  /** Returns active state during appear animation */
  onAppearActive: (element: ScrollableElement) => ExpandedState;
  
  /** Returns active state during enter animation */
  onEnterActive: (element: ScrollableElement) => ExpandedState;
  
  /** Returns initial state when element starts leaving */
  onLeaveStart: (element: ScrollableElement) => LeaveStartState;
  
  /** Returns active state during leave animation */
  onLeaveActive: () => CollapsedState;
  
  /** Checks if appear animation has ended */
  onAppearEnd: (element: ScrollableElement, event: MotionTransitionEvent) => boolean;
  
  /** Checks if enter animation has ended */
  onEnterEnd: (element: ScrollableElement, event: MotionTransitionEvent) => boolean;
  
  /** Checks if leave animation has ended */
  onLeaveEnd: (element: ScrollableElement, event: MotionTransitionEvent) => boolean;
  
  /** Maximum duration for motion in milliseconds */
  motionDeadline: number;
}

/**
 * Default collapse motion configuration for Ant Design
 */
declare const collapseMotion: CollapseMotionConfig;

export default collapseMotion;