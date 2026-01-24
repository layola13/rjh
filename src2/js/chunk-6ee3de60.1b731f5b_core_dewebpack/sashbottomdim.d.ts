import { KfcSash } from './path/to/KfcSash';
import { Dimension } from './path/to/Dimension';
import { EdgeFinder, Direction } from './path/to/EdgeFinder';
import Arc from './path/to/Arc';

/**
 * Represents the bottom dimension of a sash component.
 * Extends the base Dimension class to provide specific dimension
 * calculations and editing capabilities for sash bottom edges.
 */
export class SashBottomDim extends Dimension {
  /** The sash instance this dimension is associated with */
  private sash: KfcSash;

  /** Whether this dimension should be hidden in the UI */
  private hidden: boolean;

  /**
   * Creates a new SashBottomDim instance.
   * @param sash - The sash component to measure
   * @param hidden - Whether the dimension should be initially hidden (default: true)
   */
  constructor(sash: KfcSash, hidden: boolean = true) {
    super(sash);
    this.sash = sash;
    this.hidden = hidden;
  }

  /**
   * Gets the parent double sash component.
   * @returns The parent component of the sash
   */
  get double(): unknown {
    return this.sash.parent;
  }

  /**
   * Locates and sets the start and end points of the bottom dimension.
   * Finds the upward-facing edge of the sash polygon and uses it to define
   * the dimension endpoints, if the polygon is rectangular and the edge is not an arc.
   */
  locate(): void {
    // Only process rectangular polygons
    if (!this.sash.polygon.isRectangle()) {
      return;
    }

    // Find the bottom edge (upward direction)
    const edgeIndex = EdgeFinder.Instance.findIndex(Direction.Up, this.sash.polygon);
    
    if (edgeIndex === -1) {
      return;
    }

    const edge = this.sash.polygon.edge(edgeIndex);

    // Skip arc edges, only process straight edges
    if (!(edge instanceof Arc)) {
      this.from = edge.start.clone();
      this.to = edge.end.clone();
    }
  }

  /**
   * Handles dimension editing events.
   * Updates the sash's fixed width and redraws the parent component.
   * @param newWidth - The new width value to apply
   * @param param2 - Additional parameter (usage unclear from minified code)
   */
  onEdit(newWidth: number, param2: unknown): void {
    const view = this.sash.topFrame.view;
    
    // Update the fixed width of the sash
    this.sash.fixedWidth = newWidth;
    
    // Update and redraw the parent double sash
    this.double.updatePoly();
    this.double.draw(view);
    view.refresh();
  }
}