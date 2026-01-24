import { Component, ReactNode, CSSProperties, ComponentType } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

/**
 * Perfect Scrollbar event handler type
 * Receives the container element as parameter
 */
type ScrollEventHandler = (container: HTMLElement) => void;

/**
 * Sync handler type
 * Receives the PerfectScrollbar instance for manual updates
 */
type SyncHandler = (ps: PerfectScrollbar) => void;

/**
 * Container reference callback type
 */
type ContainerRefHandler = (element: HTMLElement | null) => void;

/**
 * Perfect Scrollbar configuration options
 * @see https://github.com/mdbootstrap/perfect-scrollbar#options
 */
interface PerfectScrollbarOptions {
  /** Handlers for scrollbar events */
  handlers?: string[];
  /** Maximum scrollbar length */
  maxScrollbarLength?: number;
  /** Minimum scrollbar length */
  minScrollbarLength?: number;
  /** Threshold for scroll updates */
  scrollingThreshold?: number;
  /** Threshold for reaching edges */
  scrollXMarginOffset?: number;
  scrollYMarginOffset?: number;
  /** Suppress scroll events */
  suppressScrollX?: boolean;
  suppressScrollY?: boolean;
  /** Swap axes behavior */
  swipeEasing?: boolean;
  useBothWheelAxes?: boolean;
  wheelPropagation?: boolean;
  wheelSpeed?: number;
}

/**
 * Props for the ScrollbarContainer component
 * A React wrapper for perfect-scrollbar library providing custom scrollbars
 */
interface ScrollbarContainerProps {
  /** Child elements to be rendered inside the scrollable container */
  children: ReactNode;
  
  /** Additional CSS class name for the container */
  className?: string;
  
  /** Inline styles for the container */
  style?: CSSProperties;
  
  /** 
   * @deprecated Use 'options' instead
   * Legacy prop for perfect-scrollbar configuration 
   */
  option?: PerfectScrollbarOptions;
  
  /** Perfect-scrollbar configuration options */
  options?: PerfectScrollbarOptions;
  
  /** Callback to receive reference to the container element */
  containerRef?: ContainerRefHandler;
  
  /** Fired on vertical scroll */
  onScrollY?: ScrollEventHandler;
  
  /** Fired on horizontal scroll */
  onScrollX?: ScrollEventHandler;
  
  /** Fired when scrolling up */
  onScrollUp?: ScrollEventHandler;
  
  /** Fired when scrolling down */
  onScrollDown?: ScrollEventHandler;
  
  /** Fired when scrolling left */
  onScrollLeft?: ScrollEventHandler;
  
  /** Fired when scrolling right */
  onScrollRight?: ScrollEventHandler;
  
  /** Fired when vertical scrollbar reaches start */
  onYReachStart?: ScrollEventHandler;
  
  /** Fired when vertical scrollbar reaches end */
  onYReachEnd?: ScrollEventHandler;
  
  /** Fired when horizontal scrollbar reaches start */
  onXReachStart?: ScrollEventHandler;
  
  /** Fired when horizontal scrollbar reaches end */
  onXReachEnd?: ScrollEventHandler;
  
  /** 
   * Sync callback providing access to PerfectScrollbar instance
   * Called on component updates to synchronize scroll state
   */
  onSync?: SyncHandler;
  
  /** HTML tag name or React component to use as container element */
  component?: string | ComponentType<any>;
}

/**
 * Mapping of perfect-scrollbar DOM events to React prop names
 * @internal
 */
interface EventHandlerMap {
  'ps-scroll-y': 'onScrollY';
  'ps-scroll-x': 'onScrollX';
  'ps-scroll-up': 'onScrollUp';
  'ps-scroll-down': 'onScrollDown';
  'ps-scroll-left': 'onScrollLeft';
  'ps-scroll-right': 'onScrollRight';
  'ps-y-reach-start': 'onYReachStart';
  'ps-y-reach-end': 'onYReachEnd';
  'ps-x-reach-start': 'onXReachStart';
  'ps-x-reach-end': 'onXReachEnd';
}

/**
 * React component wrapper for perfect-scrollbar
 * 
 * Provides a customizable scrollbar with extensive event hooks for scroll interactions.
 * Automatically manages the lifecycle of the PerfectScrollbar instance.
 * 
 * @example
 *