/**
 * Bead settings module
 * Manages joint way settings for bead objects
 */

import type { Bead } from './Bead';
import type { View } from './View';

/**
 * Joint way type - defines how edges are connected
 */
export type JointWay = number | string;

/**
 * Interface for frame manager that handles joint ways
 */
interface FrameManager {
  /** Edge joint way configuration array */
  ejw: JointWay[];
  
  /**
   * Get joint way for a specific edge index
   * @param index - Edge index
   * @returns Joint way configuration
   */
  getJointWay(index: number): JointWay;
  
  /**
   * Recreate frame with updated polygon and view
   * @param polygon - Polygon object
   * @param view - View object
   */
  recreated(polygon: Polygon, view: View): void;
}

/**
 * Interface for polygon with edges
 */
interface Polygon {
  /** Array of polygon edges */
  edges: unknown[];
}

/**
 * Interface for layer that can be batch drawn
 */
interface Layer {
  /**
   * Perform batch draw operation
   */
  batchDraw(): void;
}

/**
 * Interface for memento manager (undo/redo)
 */
interface MomentoManager {
  /**
   * Create a checkpoint for undo/redo
   */
  checkPoint(): void;
}

/**
 * Extended bead interface with required properties
 */
interface BeadWithManager {
  frameManager: FrameManager;
  polygon: Polygon;
}

/**
 * Extended view interface with required properties
 */
interface ViewWithManagers {
  activeLayer: Layer;
  mometoManager: MomentoManager;
}

/**
 * Bead settings class
 * Manages configuration and joint way settings for bead objects
 */
export class BeadSettings {
  private readonly bead: BeadWithManager;
  private readonly view: ViewWithManagers;

  /**
   * Creates a new BeadSettings instance
   * @param bead - The bead object to manage settings for
   * @param view - The view object associated with the bead
   */
  constructor(bead: BeadWithManager, view: ViewWithManagers) {
    this.bead = bead;
    this.view = view;
  }

  /**
   * Gets the joint way configuration for the first edge
   * @returns Current joint way setting
   */
  get jointWay(): JointWay {
    return this.bead.frameManager.getJointWay(0);
  }

  /**
   * Sets the joint way for all edges of the bead polygon
   * Updates frame manager, redraws the view, and creates an undo checkpoint
   * @param newJointWay - New joint way value to apply to all edges
   */
  set jointWay(newJointWay: JointWay) {
    this.bead.polygon.edges.forEach((_edge, edgeIndex) => {
      this.bead.frameManager.ejw[edgeIndex] = newJointWay;
    });
    
    this.bead.frameManager.recreated(this.bead.polygon, this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }
}