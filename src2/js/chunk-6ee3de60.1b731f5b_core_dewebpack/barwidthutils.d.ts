import { ShapeManager } from './ShapeManager';
import { View } from './View';
import { FrameManager } from './FrameManager';
import { MullionManager } from './MullionManager';
import { SashManager } from './SashManager';
import { Polygon } from './Polygon';
import { PolyId } from './PolyId';
import { ShapeType } from './ShapeType';
import { Direction } from './Direction';
import { Note, ShadeHandleType, ExtraDimArbitrary } from './Note';
import { Segment, Point, Vector, Line } from './Geometry';

/**
 * Shape configuration for adjusting shade properties
 */
export interface ShadeAdjustmentConfig {
  /** Width of the upper track */
  up_track_width: number;
  /** Width of the lower track */
  down_track_width: number;
  /** Y-axis positions of mullions from the top frame */
  mullion_position: number[];
  /** Count of shades in each divided section */
  shade_count: number[];
}

/**
 * Utility class for managing bar and mullion widths across various window components
 */
export declare class BarWidthUtils {
  private shapeManager: ShapeManager;
  private view: View;

  constructor(shapeManager: ShapeManager, view: View);

  /**
   * Set the width of a frame bar edge
   * @param shapeIndex - Index of the shape in the shape manager
   * @param edgeIndex - Index of the edge to modify
   * @param width - New width value (must be > 0)
   */
  setFrameBarWidth(shapeIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a mullion edge
   * @param shapeIndex - Index of the shape in the shape manager
   * @param edgeIndex - Index of the mullion edge
   * @param width - New width value (must be > 0)
   */
  setMullionWidth(shapeIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a sash bar edge
   * @param shapeIndex - Index of the shape
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the edge
   * @param width - New width value (must be > 0)
   */
  setSashBarWidth(shapeIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a sash mullion edge
   * @param shapeIndex - Index of the shape
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the mullion edge
   * @param width - New width value (must be > 0)
   */
  setSashMullionWidth(shapeIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a double sash bar edge
   * @param shapeIndex - Index of the shape
   * @param doubleSashIndex - Index of the double sash
   * @param sashIndex - Index of the specific sash within the double sash
   * @param edgeIndex - Index of the edge
   * @param width - New width value (must be > 0)
   */
  setDoubleSashBarWidth(shapeIndex: number, doubleSashIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a double sash mullion edge
   * @param shapeIndex - Index of the shape
   * @param doubleSashIndex - Index of the double sash
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the mullion edge
   * @param width - New width value (must be > 0)
   */
  setDoubleSashMullionWidth(shapeIndex: number, doubleSashIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a KFC sash bar edge
   * @param shapeIndex - Index of the shape
   * @param kfcSashIndex - Index of the KFC sash
   * @param edgeIndex - Index of the edge
   * @param width - New width value (must be > 0)
   */
  setKfcSashBarWidth(shapeIndex: number, kfcSashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a KFC sash mullion edge
   * @param shapeIndex - Index of the shape
   * @param kfcSashIndex - Index of the KFC sash
   * @param edgeIndex - Index of the mullion edge
   * @param width - New width value (must be > 0)
   */
  setKfcSashMullionWidth(shapeIndex: number, kfcSashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a double KFC sash bar edge
   * @param shapeIndex - Index of the shape
   * @param doubleKfcSashIndex - Index of the double KFC sash
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the edge
   * @param width - New width value (must be > 0)
   */
  setDoubleKfcSashBarWidth(shapeIndex: number, doubleKfcSashIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a double KFC sash mullion edge
   * @param shapeIndex - Index of the shape
   * @param doubleKfcSashIndex - Index of the double KFC sash
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the mullion edge
   * @param width - New width value (must be > 0)
   */
  setDoubleKfcSashMullionWidth(shapeIndex: number, doubleKfcSashIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a shade push sash bar edge
   * @param shapeIndex - Index of the shape
   * @param shadePushSashIndex - Index of the shade push sash
   * @param edgeIndex - Index of the edge
   * @param width - New width value (must be > 0)
   */
  setShadePushSashBarWidth(shapeIndex: number, shadePushSashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a shade push sash mullion edge
   * @param shapeIndex - Index of the shape
   * @param shadePushSashIndex - Index of the shade push sash
   * @param edgeIndex - Index of the mullion edge
   * @param width - New width value (must be > 0)
   */
  setShadePushSashMullionWidth(shapeIndex: number, shadePushSashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a double shade push sash bar edge
   * @param shapeIndex - Index of the shape
   * @param doubleShadePushSashIndex - Index of the double shade push sash
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the edge
   * @param width - New width value (must be > 0)
   */
  setDoubleShadePushSashBarWidth(shapeIndex: number, doubleShadePushSashIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a double shade push sash mullion edge
   * @param shapeIndex - Index of the shape
   * @param doubleShadePushSashIndex - Index of the double shade push sash
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the mullion edge
   * @param width - New width value (must be > 0)
   */
  setDoubleShadePushSashMullionWidth(shapeIndex: number, doubleShadePushSashIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a slide bar edge
   * @param shapeIndex - Index of the shape
   * @param slideIndex - Index of the slide
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the edge
   * @param width - New width value (must be > 0)
   */
  setSlideBarWidth(shapeIndex: number, slideIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a slide mullion edge
   * @param shapeIndex - Index of the shape
   * @param slideIndex - Index of the slide
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the mullion edge
   * @param width - New width value (must be > 0)
   */
  setSlideMullionWidth(shapeIndex: number, slideIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a fold sash bar edge
   * @param shapeIndex - Index of the shape
   * @param foldIndex - Index of the fold
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the edge
   * @param width - New width value (must be > 0)
   */
  setFoldSashBarWidth(shapeIndex: number, foldIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a fold sash mullion edge
   * @param shapeIndex - Index of the shape
   * @param foldIndex - Index of the fold
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the mullion edge
   * @param width - New width value (must be > 0)
   */
  setFoldSashMullionWidth(shapeIndex: number, foldIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a fold shade bar edge
   * @param shapeIndex - Index of the shape
   * @param foldShadeIndex - Index of the fold shade
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the edge
   * @param width - New width value (must be > 0)
   */
  setFoldShadeBarWidth(shapeIndex: number, foldShadeIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the width of a fold shade mullion edge
   * @param shapeIndex - Index of the shape
   * @param foldShadeIndex - Index of the fold shade
   * @param sashIndex - Index of the sash
   * @param edgeIndex - Index of the mullion edge
   * @param width - New width value (must be > 0)
   */
  setFoldShadeMullionWidth(shapeIndex: number, foldShadeIndex: number, sashIndex: number, edgeIndex: number, width: number): void;

  /**
   * Set the count of shades in a shade push sash filler
   * @param shapeIndex - Index of the shape
   * @param shadePushSashIndex - Index of the shade push sash
   * @param fillerIdx - Index of the filler polygon
   * @param fillerPos - Position of the filler
   * @param count - New shade count (must be > 0)
   */
  setShadePushSashCount(shapeIndex: number, shadePushSashIndex: number, fillerIdx: number, fillerPos: number, count: number): void;

  /**
   * Set the count of shades in a double shade push sash filler
   * @param shapeIndex - Index of the shape
   * @param doubleShadePushSashIndex - Index of the double shade push sash
   * @param sashIndex - Index of the sash
   * @param fillerIdx - Index of the filler polygon
   * @param count - New shade count (must be > 0)
   */
  setDoubleShadePushSashCount(shapeIndex: number, doubleShadePushSashIndex: number, sashIndex: number, fillerIdx: number, count: number): void;

  /**
   * Set the count of shades in a fold shade filler
   * @param shapeIndex - Index of the shape
   * @param foldShadeIndex - Index of the fold shade
   * @param sashIndex - Index of the sash
   * @param fillerIdx - Index of the filler polygon
   * @param count - New shade count (must be > 0)
   */
  setFoldShadeCount(shapeIndex: number, foldShadeIndex: number, sashIndex: number, fillerIdx: number, count: number): void;
}

/**
 * Utility class for managing shade window configurations including tracks, mullions, and shade counts
 */
export declare class ShadeUtil {
  private shapeManager: ShapeManager;
  private view: View;
  private barWidthUtils: BarWidthUtils;

  constructor(shapeManager: ShapeManager, view: View);

  /**
   * Find the indices of the topmost and bottommost edges of a polygon
   * @param polygon - The polygon to analyze
   * @returns Tuple of [topEdgeIndex, bottomEdgeIndex]
   * @throws Error if polygon has no edges
   */
  findUpAndDownEdgeIdx(polygon: Polygon): [number, number];

  /**
   * Calculate mullion line positions within a shade push sash
   * @param sash - The shade push sash element
   * @param mullionPositions - Y-axis positions relative to the top frame
   * @returns Array of computed mullion lines
   * @throws Error if sash polygon is not rectangular or positions are out of range
   */
  getMullionLine(sash: any, mullionPositions: number[]): Line[];

  /**
   * Sort shade filler polygons by their vertical center position
   * @param fillers - Array of shade filler elements
   * @returns Array of polygon IDs sorted from top to bottom
   */
  getSortedShadeFillers(fillers: any[]): PolyId[];

  /**
   * Set the bar widths for top and bottom tracks of a shade push sash
   * @param sash - The shade push sash element
   * @param shapeIndex - Index of the shape
   * @param sashIndex - Index of the sash
   * @param upTrackWidth - Width of the upper track
   * @param downTrackWidth - Width of the lower track
   */
  setBarWidth(sash: any, shapeIndex: number, sashIndex: number, upTrackWidth: number, downTrackWidth: number): void;

  /**
   * Add mullions to a shade push sash at specified positions
   * @param sash - The shade push sash element
   * @param mullionPositions - Array of Y-axis positions for mullions
   */
  adjustMullion(sash: any, mullionPositions: number[]): void;

  /**
   * Set the shade count for each divided section in a sash
   * @param sash - The shade push sash element
   * @param shadeCounts - Array of shade counts for each section (must be > 0)
   * @param shapeIndex - Index of the shape
   * @param sashIndex - Index of the sash
   */
  setSashCount(sash: any, shadeCounts: number[], shapeIndex: number, sashIndex: number): void;

  /**
   * Remove all notes and extra dimensions from the shape manager
   */
  clearAllShapes(): void;

  /**
   * Add a text note annotation at a specific position
   * @param text - The text content of the note
   * @param position - The position point for the note
   */
  addNote(text: string, position: Point): void;

  /**
   * Add width notes for all vertical edges of a sash
   * @param sash - The sash element to annotate
   */
  addEdgeWidthNotes(sash: any): void;

  /**
   * Add extra dimension lines from mullion positions to the left edge
   * @param sash - The sash element to add dimensions to
   */
  addExtraDims(sash: any): void;

  /**
   * Update the handle type for all shades in a sash mullion manager
   * @param sash - The shade push sash element
   * @param handleType - The new handle type to apply
   */
  recoverHandleShape(sash: any, handleType: ShadeHandleType): void;

  /**
   * Apply comprehensive adjustments to all shade push sashes in the shape manager
   * @param config - Configuration object containing track widths, mullion positions, and shade counts
   * @throws Error if shade_count length doesn't match mullion_position length + 1
   */
  adjustAllShades(config: ShadeAdjustmentConfig): void;
}