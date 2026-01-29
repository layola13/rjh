/**
 * Module: RoofsDrawingSketch2dBuilder
 * Provides builder functionality for creating and managing 2D sketch representations of roofs
 */

import { Loop } from './path/to/Loop';
import { ExtraordinarySketch2dBuilder } from './path/to/ExtraordinarySketch2dBuilder';
import { ExtraordinaryBackground } from './path/to/ExtraordinaryBackground';

/**
 * Interface representing a 2D curve in the sketch
 */
interface Curve {
  // Define curve properties based on your domain model
}

/**
 * Interface representing a face in the 2D sketch
 */
interface Sketch2dFace {
  /** Topological tags associated with this face */
  topos: string[];
  // Additional face properties
}

/**
 * Interface representing a 2D sketch
 */
interface Sketch2d {
  /** Collection of faces that make up the sketch */
  faces: Sketch2dFace[];
  // Additional sketch properties
}

/**
 * Interface representing a boundary region with outer loop and optional holes
 */
interface BoundaryRegion {
  /** The outer boundary curves */
  outer: Curve[];
  /** Array of hole boundaries within the outer boundary */
  holes: Curve[][];
}

/**
 * Interface representing a 2D point
 */
interface Point2D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Builder class for constructing 2D sketches of roof drawings.
 * Extends ExtraordinarySketch2dBuilder to provide specialized functionality
 * for roof-specific sketch operations.
 */
export class RoofsDrawingSketch2dBuilder extends ExtraordinarySketch2dBuilder {
  /** Tag identifier for region topology */
  static readonly RegionTopoTag: string = 'region';

  /** The current 2D sketch being built */
  protected _sketch2d?: Sketch2d;

  /**
   * Updates the appendix of the sketch.
   * Triggers a complete update of the sketch data.
   */
  updateAppendix(): void {
    this._completeUpdate();
  }

  /**
   * Performs a complete update of the sketch.
   * Filters faces to only include those with the RegionTopoTag
   * and updates the sketch accordingly.
   * @private
   */
  private _completeUpdate(): void {
    if (!this._sketch2d) {
      return;
    }

    this._sketch2d.faces = this._sketch2d.faces.filter((face: Sketch2dFace) =>
      face.topos.includes(RoofsDrawingSketch2dBuilder.RegionTopoTag)
    );

    this.updateSketch2d(this._sketch2d);
  }

  /**
   * Creates a super large background boundary for the sketch.
   * Generates a square boundary with dimensions from -10000 to 10000 units.
   * @returns An ExtraordinaryBackground instance with the large boundary region
   */
  static createSuperLargeBackground(): ExtraordinaryBackground {
    const BOUNDARY_SIZE = 10000;

    const boundaryPoints: Point2D[] = [
      { x: -BOUNDARY_SIZE, y: BOUNDARY_SIZE },
      { x: -BOUNDARY_SIZE, y: -BOUNDARY_SIZE },
      { x: BOUNDARY_SIZE, y: -BOUNDARY_SIZE },
      { x: BOUNDARY_SIZE, y: BOUNDARY_SIZE }
    ];

    const region: BoundaryRegion = {
      outer: new Loop(boundaryPoints).getAllCurves(),
      holes: []
    };

    return new ExtraordinaryBackground([region]);
  }

  /**
   * Updates the internal sketch2d object.
   * This method should be implemented by the parent class.
   * @param sketch - The sketch to update
   * @protected
   */
  protected updateSketch2d(sketch: Sketch2d): void {
    // Implementation provided by parent class
  }
}