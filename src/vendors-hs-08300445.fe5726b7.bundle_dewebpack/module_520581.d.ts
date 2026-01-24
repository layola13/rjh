/**
 * Portal component for rendering React components outside the main DOM hierarchy.
 * Manages scroll locking, container mounting, and visibility state.
 */

import React, { ReactNode, ComponentType, RefObject } from 'react';

/**
 * Global counter tracking the number of open portals
 */
export function getOpenCount(): number;

/**
 * Container element type - can be HTMLElement, selector string, or function returning element
 */
export type ContainerType = HTMLElement | string | (() => HTMLElement | null) | null | undefined;

/**
 * Configuration object passed to children render function
 */
export interface PortalContext {
  /**
   * Returns the current number of open portals
   */
  getOpenCount: () => number;
  
  /**
   * Gets the container element where portal content is mounted
   */
  getContainer: () => HTMLElement | null;
  
  /**
   * Toggles body scroll locking based on portal count
   */
  switchScrollingEffect: () => void;
  
  /**
   * Scroll locker instance for managing scroll behavior
   */
  scrollLocker: ScrollLocker;
}

/**
 * Scroll locker configuration
 */
export interface ScrollLockerOptions {
  /**
   * Container element to lock scrolling on
   */
  container?: HTMLElement | null;
}

/**
 * Scroll locker class for managing scroll state
 */
export declare class ScrollLocker {
  constructor(options?: ScrollLockerOptions);
  
  /**
   * Gets the current locked container
   */
  getContainer(): HTMLElement | null;
  
  /**
   * Re-locks scrolling with new options
   */
  reLock(options: ScrollLockerOptions): void;
}

/**
 * Portal component props
 */
export interface PortalProps {
  /**
   * Render function that receives portal context
   */
  children: (context: PortalContext) => ReactNode;
  
  /**
   * Whether the portal content is visible
   */
  visible?: boolean;
  
  /**
   * Force render even when not visible
   */
  forceRender?: boolean;
  
  /**
   * Container element or selector where portal should be mounted
   * @default document.body
   */
  getContainer?: ContainerType;
  
  /**
   * CSS class name for the wrapper container element
   */
  wrapperClassName?: string;
}

/**
 * Portal component state (if needed for typing)
 */
export interface PortalState {}

/**
 * Portal component for mounting content outside the React component tree.
 * 
 * Features:
 * - Dynamically creates and manages container elements
 * - Handles scroll locking when portals are open
 * - Supports custom container mounting
 * - Manages multiple portal instances with reference counting
 * 
 * @example
 *