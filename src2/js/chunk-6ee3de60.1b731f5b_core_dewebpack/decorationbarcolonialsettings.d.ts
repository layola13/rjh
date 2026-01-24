/**
 * Decoration bar colonial settings module
 * Extends base decoration bar settings with horizontal and vertical edge count controls
 */

import { DecorationBarSettings } from './DecorationBarSettings';

/**
 * Interface for decoration bar component
 */
interface IDecorationBar {
  /** Horizontal edge count */
  horEdgeCount: number;
  /** Vertical edge count */
  verEdgeCount: number;
  /** Recreate internal components after configuration change */
  recreateComponents(): void;
}

/**
 * Interface for decoration shape
 */
interface IDecorationShape {
  /** Update polygon geometry */
  updatePoly(): void;
  /** Draw the shape on the given view */
  draw(view: IView): void;
}

/**
 * Interface for memento manager (undo/redo)
 */
interface IMomentoManager {
  /** Create a checkpoint for undo/redo */
  checkPoint(): void;
}

/**
 * Interface for view context
 */
interface IView {
  /** Refresh the view */
  refresh(): void;
  /** Undo/redo manager */
  mometoManager: IMomentoManager;
}

/**
 * Settings class for colonial-style decoration bars
 * Provides configuration for horizontal and vertical edge counts
 * @extends DecorationBarSettings
 */
export class DecorationBarColonialSettings extends DecorationBarSettings {
  protected decorationBar?: IDecorationBar;
  protected decorationShape!: IDecorationShape;
  protected view!: IView;

  /**
   * Get the horizontal edge count of the decoration bar
   * @returns The number of horizontal edges, or 0 if decoration bar is undefined
   */
  get horEdgeCount(): number {
    return this.decorationBar?.horEdgeCount ?? 0;
  }

  /**
   * Set the horizontal edge count of the decoration bar
   * Updates the component, redraws the shape, and creates an undo checkpoint
   * @param value - The new horizontal edge count (must be non-negative)
   */
  set horEdgeCount(value: number) {
    if (value < 0 || !this.decorationBar) {
      return;
    }

    if (this.decorationBar.horEdgeCount !== value) {
      this.decorationBar.horEdgeCount = value;
      this.decorationBar.recreateComponents();
      this.decorationShape.updatePoly();
      this.decorationShape.draw(this.view);
      this.view.refresh();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Get the vertical edge count of the decoration bar
   * @returns The number of vertical edges, or 0 if decoration bar is undefined
   */
  get verEdgeCount(): number {
    return this.decorationBar?.verEdgeCount ?? 0;
  }

  /**
   * Set the vertical edge count of the decoration bar
   * Updates the component, redraws the shape, and creates an undo checkpoint
   * @param value - The new vertical edge count (must be non-negative)
   */
  set verEdgeCount(value: number) {
    if (value < 0 || !this.decorationBar) {
      return;
    }

    if (this.decorationBar.verEdgeCount !== value) {
      this.decorationBar.verEdgeCount = value;
      this.decorationBar.recreateComponents();
      this.decorationShape.updatePoly();
      this.decorationShape.draw(this.view);
      this.view.refresh();
      this.view.mometoManager.checkPoint();
    }
  }
}