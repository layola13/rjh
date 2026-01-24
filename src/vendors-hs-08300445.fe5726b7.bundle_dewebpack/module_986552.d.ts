/**
 * Align Component - Provides element alignment functionality
 * Handles alignment of elements relative to a target element or point
 */

import type { ReactElement, ReactNode, Ref } from 'react';

/**
 * Alignment configuration object
 * Defines how the source element should align relative to the target
 */
export interface AlignConfig {
  /**
   * Alignment points for source and target
   * Format: [sourcePoint, targetPoint]
   * Points use two-letter codes: tl (top-left), tr (top-right), bl (bottom-left), br (bottom-right), tc (top-center), bc (bottom-center), cl (center-left), cr (center-right), cc (center-center)
   */
  points?: [string, string];
  
  /**
   * Offset adjustment [x, y] in pixels
   */
  offset?: [number, number];
  
  /**
   * Target offset adjustment [x, y] in pixels
   */
  targetOffset?: [number, number];
  
  /**
   * Enable overflow adjustment to keep element in viewport
   */
  overflow?: {
    adjustX?: boolean | number;
    adjustY?: boolean | number;
  };
  
  /**
   * Use CSS right/bottom properties instead of left/top
   */
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
}

/**
 * Alignment result after alignment operation
 */
export interface AlignResult {
  /**
   * Final alignment points used
   */
  points: [string, string];
  
  /**
   * Final offset applied
   */
  offset: [number, number];
  
  /**
   * Target element or point offset
   */
  targetOffset: [number, number];
  
  /**
   * Whether overflow adjustment occurred
   */
  overflow: {
    adjustX: boolean;
    adjustY: boolean;
  };
}

/**
 * Point alignment target (x, y coordinates)
 */
export interface AlignPoint {
  pageX: number;
  pageY: number;
  clientX?: number;
  clientY?: number;
}

/**
 * Target can be an element getter function, HTMLElement, or point coordinates
 */
export type AlignTarget = 
  | (() => HTMLElement | null) 
  | HTMLElement 
  | AlignPoint 
  | null;

/**
 * Props for the Align component
 */
export interface AlignProps {
  /**
   * Single child element to be aligned
   */
  children: ReactElement;
  
  /**
   * Disable alignment updates
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Target element or point to align to
   * Can be a function returning HTMLElement, HTMLElement, or point coordinates
   */
  target: AlignTarget;
  
  /**
   * Alignment configuration
   */
  align: AlignConfig;
  
  /**
   * Callback fired after alignment completes
   * @param source - The aligned element
   * @param result - Alignment result details
   */
  onAlign?: (source: HTMLElement, result: AlignResult) => void;
  
  /**
   * Monitor window resize events and re-align
   * @default false
   */
  monitorWindowResize?: boolean;
  
  /**
   * Debounce time in milliseconds for alignment updates
   * @default 0
   */
  monitorBufferTime?: number;
}

/**
 * Imperative handle interface exposed via ref
 */
export interface AlignHandle {
  /**
   * Force immediate alignment update
   * @returns true if alignment was performed, false otherwise
   */
  forceAlign(): boolean;
}

/**
 * Align component
 * 
 * A declarative wrapper for element alignment functionality.
 * Automatically monitors target and source element changes, window resizes,
 * and triggers re-alignment as needed.
 * 
 * @example
 *