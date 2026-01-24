/**
 * Utilities for managing filler shading operations in polygons
 * @module FillerUtils
 */

import { PolyId } from './PolyId';

/**
 * Represents a filler with associated polygon
 */
interface Filler {
  /** The polygon associated with this filler */
  polygon: Polygon;
  
  /** Updates the polygon data */
  updatePoly(): void;
  
  /** Renders the filler to the view */
  draw(view: View): void;
}

/**
 * Manages filler operations for a frame
 */
interface FillerManager {
  /** Collection of all fillers in this manager */
  fillers: Filler[];
  
  /**
   * Changes the shade count for a filler on a given polygon
   * @param polygon - Target polygon
   * @param count - New shade count
   * @returns Updated filler or undefined if operation failed
   */
  changeShadeFillerCount(polygon: Polygon, count: number): Filler | undefined;
}

/**
 * Manages multiple aspects of a frame including fillers
 */
interface MulManager {
  /** Filler manager instance */
  fillerManager: FillerManager;
}

/**
 * Manages sashes within a frame
 */
interface SashManager {
  /** All sashes managed by this manager */
  allSashes: Frame[];
}

/**
 * Represents a polygon with unique identifier
 */
interface Polygon {
  /** Unique polygon identifier */
  polyId: PolyId;
}

/**
 * Represents a frame or sash that can contain fillers
 */
interface Frame {
  /** Unique identifier */
  id: string | number;
  
  /** Manager for multiple frame operations */
  mulManager: MulManager;
  
  /** Manager for sashes within this frame */
  sashManager: SashManager;
}

/**
 * Manages memento pattern for undo/redo operations
 */
interface MomentoManager {
  /** Creates a checkpoint for undo/redo */
  checkPoint(): void;
}

/**
 * Manages rendering and viewport operations
 */
interface View {
  /** Memento manager for undo/redo */
  mometoManager: MomentoManager;
  
  /** Refreshes the view */
  refresh(): void;
}

/**
 * Manages shape collections and hierarchy
 */
interface ShapeManager {
  /** Collection of managed shapes/frames */
  shapem: Frame[];
}

/**
 * Utility class for managing filler shade operations across frames and sashes
 */
export declare class FillerUtils {
  /** Shape manager instance */
  private readonly shapeManager: ShapeManager;
  
  /** View instance for rendering */
  private readonly view: View;

  /**
   * Creates a new FillerUtils instance
   * @param shapeManager - Manager for shapes and frames
   * @param view - View instance for rendering operations
   */
  constructor(shapeManager: ShapeManager, view: View);

  /**
   * Changes the shade count for a filler identified by frame and polygon IDs
   * @param frameId - ID of the frame or sash containing the filler
   * @param serializedPolyId - Serialized polygon identifier
   * @param shadeCount - New shade count to apply
   */
  changeShadeCount(frameId: string | number, serializedPolyId: string, shadeCount: number): void;

  /**
   * Retrieves the host frame by ID, searching both top-level frames and nested sashes
   * @param frameId - ID of the frame to find
   * @returns The matching frame or undefined if not found
   */
  getHostFrame(frameId: string | number): Frame | undefined;
}