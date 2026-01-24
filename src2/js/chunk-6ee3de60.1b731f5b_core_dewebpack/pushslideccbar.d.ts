/**
 * PushSlideCCBar module - handles push slide screen calculations and bar identification
 * 
 * This module is responsible for analyzing sash configurations and identifying
 * which bars are involved in push-slide operations, including slide bars, 
 * push slide bars, and push track bars.
 */

import type { OpenDirection } from './module-13';
import type { PushSash } from './module-1';
import type { EdgeFinder, Direction } from './module-81';

/**
 * Represents a bar in the screen with slide-related properties
 */
export interface ScreenBar {
  /** Unique identifier of the shape */
  shapeId: number | string;
  
  /** Indicates if this bar is part of a sliding mechanism */
  isSlide: boolean;
  
  /** Indicates if this bar is a push-slide bar */
  isPushSlide: boolean;
  
  /** Indicates if this bar is a push-track bar */
  isPushTrack: boolean;
}

/**
 * Represents a screen element with polygon geometry
 */
export interface ScreenElement {
  /** Unique identifier */
  id: number | string;
  
  /** Polygon geometry data */
  polygon: Polygon;
}

/**
 * Polygon with edge docking information
 */
export interface Polygon {
  /** Edge docking configuration */
  edDock: EdgeDock;
}

/**
 * Edge docking container
 */
export interface EdgeDock {
  /** Array of dock points on polygon edges */
  docks: Dock[];
}

/**
 * Dock point on a polygon edge
 */
export interface Dock {
  /**
   * Gets the bar associated with this dock point
   * @param frame - The frame context
   * @returns The docked bar element
   */
  dockBar(frame: Frame): { id: number | string };
}

/**
 * Frame context containing sash manager
 */
export interface Frame {
  /** Manages all sashes in the frame */
  sashManager: SashManager;
}

/**
 * Manages collection of sashes
 */
export interface SashManager {
  /** Array of all sashes in the frame */
  sashes: PushSash[];
}

/**
 * PushSlideCCBar - Main class for analyzing push-slide configurations
 * 
 * This class processes frame data to identify and mark bars that participate
 * in push-slide operations, including the slide bars themselves and their
 * associated track bars.
 */
export declare class PushSlideCCBar {
  /** Collection of frame contexts to analyze */
  readonly frames: Frame[];

  /**
   * Creates a new PushSlideCCBar instance
   * @param frames - Array of frame contexts to process
   */
  constructor(frames: Frame[]);

  /**
   * Parses and identifies slide-related bars in the screen
   * 
   * This method:
   * 1. Filters push sashes that have slide directions
   * 2. Identifies connected screen elements
   * 3. Marks bars as isSlide, isPushSlide, or isPushTrack based on their role
   * 4. For horizontal slides, also identifies vertical track bars
   * 
   * @param frame - The frame context containing sash and geometry data
   * @param bars - Array of bars to analyze and mark with slide properties
   * @param screenElements - Array of screen elements to check for connections
   */
  parseScreenSlide(
    frame: Frame,
    bars: ScreenBar[],
    screenElements: ScreenElement[]
  ): void;
}

export default PushSlideCCBar;