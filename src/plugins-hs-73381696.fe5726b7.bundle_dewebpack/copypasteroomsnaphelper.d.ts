import { SnapHelper, CurveType } from './snap-helper';
import type { Vector, Point2D, Line2D, Polygon } from './geometry-types';

/**
 * Snap result data structure returned by snap operations
 */
interface SnapResult {
  /** UI-related data for displaying snap feedback */
  ui: SnapUIData;
  /** Calculated offset vector from snap operation */
  offset: Vector;
}

/**
 * UI data for snap visualization (guides, highlights, etc.)
 */
interface SnapUIData {
  // Add specific UI properties based on your implementation
  [key: string]: unknown;
}

/**
 * Geometry collection for snap calculations
 */
interface SnapGeometry {
  /** Array of 2D line segments to snap against */
  lines: Line2D[];
  /** Array of point coordinates to snap against */
  points: Point2D[];
}

/**
 * Configuration options for snap behavior
 */
interface SnapOptions {
  /** Enable orthogonal mode (snap to 90° angles) */
  orthoModeOn: boolean;
  /** Type of curve to use for snapping calculations */
  curveType: CurveType;
  /** Step size/tolerance for snap detection */
  step: number;
  /** Whether to display snap point indicators */
  showPoint: boolean;
}

/**
 * Helper class for copy-paste room snapping operations.
 * Extends base SnapHelper with polygon-specific snap functionality.
 */
export declare class CopyPasteRoomSnapHelper extends SnapHelper {
  /**
   * Snap a polygon to nearby geometry elements (lines and points).
   * 
   * @param polygon - Array of geometry elements representing the polygon to snap
   * @returns Offset vector to apply for snapping, or undefined if no snap found
   * 
   * @remarks
   * - Extracts line segments and start points from polygon elements
   * - Uses non-orthogonal mode with line segment curve type
   * - Applies snap step of 2 units with point visualization enabled
   */
  snapByPolygon(polygon: Polygon[]): Vector | undefined;

  /**
   * Internal snap calculation method (inherited from SnapHelper).
   * 
   * @param geometry - Collection of lines and points to snap against
   * @param options - Configuration for snap behavior
   * @returns Snap result with UI data and offset vector, or null if no snap
   * @protected
   */
  protected _snap(
    geometry: SnapGeometry,
    options: SnapOptions
  ): SnapResult | null;

  /**
   * Process snap UI data for display updates (inherited from SnapHelper).
   * 
   * @param uiData - UI data structure to handle
   * @protected
   */
  protected _handleSnapUIData(uiData: SnapUIData): void;
}