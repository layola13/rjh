/**
 * Display utility functions for managing visual elements in a CAD/window design application
 * Provides methods for highlighting, z-index sorting, and DOM hierarchy traversal
 */

import { ShapeColor } from './ShapeColor';
import { DrawParams } from './DrawParams';
import { OpenToward } from './OpenToward';
import { Frame, Sash, PushSash, DoubleSash, GuardSash } from './WindowComponents';

/**
 * Interface for objects that can be highlighted in the display
 */
export interface Highlightable {
  getAttr(key: 'data'): HighlightData;
}

/**
 * Data structure for highlight information
 */
export interface HighlightData {
  highlight?: ShapeColor;
  [key: string]: unknown;
}

/**
 * Context object for theft z-index sorting operations
 */
export interface TheftSortContext {
  /** The top-level frame containing all elements */
  topFrame: Frame;
  /** The polygon associated with the theft element */
  polygon: {
    polyId: PolyId;
  };
}

/**
 * Polygon identifier for uniquely identifying window elements
 */
export interface PolyId {
  /**
   * Compare this polygon ID with another for equality
   * @param other - The polygon ID to compare against
   * @returns True if the IDs are equal
   */
  equalTo(other: PolyId): boolean;
}

/**
 * Shape with graphical representation and z-index control
 */
export interface GraphicalShape {
  gshape?: ZIndexableShape;
}

/**
 * Shape that can be moved in the z-index stack
 */
export interface ZIndexableShape {
  /**
   * Move this shape to the bottom of the z-index stack
   */
  moveToBottom(): void;
  
  /**
   * Move this shape to the top of the z-index stack
   */
  moveToTop(): void;
}

/**
 * Vector shape with z-index positioning capabilities
 */
export interface VectorShape extends ZIndexableShape {}

/**
 * Hardware manager containing handles and dimensions
 */
export interface HardwareManager {
  handle: HandleElement;
}

/**
 * Handle element with dimension shapes
 */
export interface HandleElement {
  /** Dimension vector shapes */
  dim: {
    vshapes: VectorShape[];
  };
  /** Dimension to sash vector shapes */
  dimToSash: {
    vshapes: VectorShape[];
  };
}

/**
 * Label element with vector shape representations
 */
export interface LabelElement {
  vshapes: VectorShape[];
}

/**
 * Element with optional parent reference
 */
export interface HierarchicalElement {
  parent?: HierarchicalElement | Frame | Sash;
}

/**
 * Utility class for display operations including highlighting, z-index management,
 * and DOM hierarchy traversal in a window/door design system
 */
export declare class DisplayUtils {
  /**
   * Apply or remove highlight styling to a graphical element
   * @param shouldHighlight - Whether to apply highlight
   * @param element - The element to highlight (must have data attribute)
   * @param color - The highlight color to apply (defaults to barHighlight)
   */
  static highlight(
    shouldHighlight: boolean,
    element?: Highlightable,
    color?: ShapeColor
  ): void;

  /**
   * Check if an element is currently highlighted
   * @param element - The element to check
   * @returns True if the element has highlight data
   */
  static isHighlight(element?: Highlightable): boolean;

  /**
   * Sort z-indexes for theft/security bar elements relative to sashes and mullions
   * Ensures proper visual layering of theft bars, glasses, and slides
   * @param context - Context containing topFrame and polygon information
   * @returns Always returns -1
   */
  static sortTheftZIndexes(context: TheftSortContext): -1;

  /**
   * Sort z-indexes for sash elements based on opening direction and type
   * Handles complex layering of push sashes, double sashes, guard sashes,
   * and their associated hardware (handles, dimensions, labels)
   * @param sash - The sash element to sort (PushSash, DoubleSash, GuardSash, etc.)
   * @returns Always returns -1
   */
  static sortSashZIndexes(sash: Sash | PushSash | DoubleSash | GuardSash): -1;

  /**
   * Traverse up the parent hierarchy to find the nearest Frame or Sash ancestor
   * @param element - The starting element with parent references
   * @returns The nearest Frame or Sash parent, or undefined if none found
   */
  static parentUtilsFrameOrSash(element: HierarchicalElement): Frame | Sash | undefined;
}