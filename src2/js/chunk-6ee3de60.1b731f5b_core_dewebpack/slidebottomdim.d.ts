import { Dimension } from './Dimension';
import { Direction, EdgeFinder } from './EdgeFinder';

/**
 * Represents a dimension control for the bottom edge of a slide column.
 * This class handles the measurement and editing of column bottom boundaries
 * in a slide layout system that can expand either horizontally or vertically.
 */
export declare class SlideBottomDim extends Dimension {
  /**
   * Reference to the parent slide containing this dimension.
   */
  readonly slide: Slide;

  /**
   * Zero-based index of the column this dimension controls.
   */
  readonly columnIndex: number;

  /**
   * Whether this dimension is hidden from view.
   */
  readonly hidden: boolean;

  /**
   * Start point of the dimension line.
   */
  from: Point;

  /**
   * End point of the dimension line.
   */
  to: Point;

  /**
   * Creates a new SlideBottomDim instance.
   * 
   * @param slide - The parent slide containing this dimension
   * @param columnIndex - The zero-based index of the column to control
   * @param hidden - Whether the dimension should be hidden (defaults to false)
   */
  constructor(slide: Slide, columnIndex: number, hidden?: boolean);

  /**
   * Calculates and sets the position of this dimension based on the column's
   * polygon geometry. Determines the appropriate edge based on whether the
   * slide expands horizontally (uses bottom edge) or vertically (uses right edge).
   */
  locate(): void;

  /**
   * Handles dimension editing events. Updates the column's fixed width,
   * recalculates polygon geometry, and refreshes the visual display.
   * 
   * @param value - The new dimension value
   * @param delta - The change amount from the previous value
   */
  onEdit(value: number, delta: number): void;
}

/**
 * Represents a 2D point with x and y coordinates.
 */
interface Point {
  clone(): Point;
}

/**
 * Represents a line segment edge with start and end points.
 */
interface Edge {
  start: Point;
  end: Point;
}

/**
 * Represents a polygonal boundary with multiple edges.
 */
interface Polygon {
  edge(index: number): Edge;
}

/**
 * Represents a visual frame containing a view for rendering.
 */
interface Frame {
  view: View;
}

/**
 * Represents a view that can be refreshed to update the display.
 */
interface View {
  refresh(): void;
}

/**
 * Represents a slide with columns that can be resized and redrawn.
 */
interface Slide {
  /**
   * Array of polygon boundaries for each column.
   */
  columnPolygons: Polygon[];

  /**
   * Whether the slide expands horizontally (true) or vertically (false).
   */
  expandHorizontally: boolean;

  /**
   * The top-level frame containing the view for this slide.
   */
  topFrame: Frame;

  /**
   * Sets a fixed width for the specified column.
   * 
   * @param width - The new fixed width value
   * @param columnIndex - The zero-based column index
   */
  setFixedWidthForColumn(width: number, columnIndex: number): void;

  /**
   * Recalculates polygon geometries after dimension changes.
   */
  updatePoly(): void;

  /**
   * Redraws the slide in the specified view.
   * 
   * @param view - The view to render into
   */
  draw(view: View): void;
}