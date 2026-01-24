/**
 * Module: UpdateRoofDirectionRequest
 * Manages the transaction for updating a roof's direction by reordering its boundary curves.
 * Handles undo/redo operations and maintains the roof's geometric state.
 */

import { HSCore } from './HSCore';

/**
 * Represents a curve in the roof boundary loop
 */
interface IRoofCurve {
  /**
   * Checks if this curve is equal to another curve
   */
  equals(other: IRoofCurve): boolean;
}

/**
 * Parameters defining the room/roof structure
 */
interface IRoomParameters {
  roomLoop?: {
    /**
     * Retrieves all curves that form the boundary loop
     */
    getAllCurves(): IRoofCurve[];
  };
}

/**
 * Represents an opening (window, door, etc.) in the roof
 */
interface IRoofOpening {
  // Opening properties would be defined here
}

/**
 * Represents a parametric opening in the roof
 */
interface IParametricOpening {
  // Parametric opening properties would be defined here
}

/**
 * Roof model interface
 */
interface IRoof {
  /**
   * Parameters defining the roof structure
   */
  parameters: IRoomParameters;
  
  /**
   * Collection of standard openings in the roof
   */
  openings: IRoofOpening[];
  
  /**
   * Collection of parametric openings in the roof
   */
  parametricOpenings: IParametricOpening[];
  
  /**
   * Updates the roof direction based on provided curves
   * @param curves - Array of curves defining the new direction
   * @param flags - Configuration flags for the update operation
   */
  updateDirection(curves: IRoofCurve[], flags: number): void;
  
  /**
   * Gets the unique parent layer of this roof
   */
  getUniqueParent(): HSCore.Model.Layer | null;
  
  /**
   * Marks the clip geometry as dirty for regeneration
   */
  dirtyClipGeometry(): void;
  
  /**
   * Marks the face materials as dirty for regeneration
   */
  dirtyFaceMaterials(): void;
}

/**
 * Transaction request for updating roof direction.
 * This operation reorders the boundary curves of a roof, affecting its orientation
 * and internal structure. All existing openings are removed during this operation.
 */
export class UpdateRoofDirectionRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * Original boundary loop curves before the update
   */
  private readonly _oldLoop: IRoofCurve[] | undefined;
  
  /**
   * The reference curve that determines the new starting point of the loop
   */
  private readonly _curve: IRoofCurve;
  
  /**
   * The roof model being modified
   */
  private readonly _roof: IRoof;

  /**
   * Creates a new roof direction update request
   * @param roof - The roof model to update
   * @param curve - The curve that will become the new starting point of the boundary loop
   */
  constructor(roof: IRoof, curve: IRoofCurve) {
    super();
    this._curve = curve;
    this._roof = roof;
    this._oldLoop = roof.parameters.roomLoop?.getAllCurves();
  }

  /**
   * Refreshes the room builder after updating the roof direction.
   * If the roof's parent is a Layer, triggers a rebuild of the room structure.
   */
  private _refreshBuilder(): void {
    const parent = this._roof.getUniqueParent();
    if (parent instanceof HSCore.Model.Layer) {
      parent.roomBuilder.build();
    }
  }

  /**
   * Applies the new loop direction by reordering curves.
   * The curve specified in the constructor becomes the first curve,
   * and preceding curves are moved to the end in reverse order.
   */
  private _applyNewLoop(): void {
    if (!this._oldLoop) {
      return;
    }

    const reorderedCurves = [...this._oldLoop];
    const targetIndex = reorderedCurves.findIndex(curve => 
      curve.equals(this._curve)
    );

    // If the target curve is not at the start, reorder the array
    if (targetIndex > 0) {
      // Remove curves from target index to end, reverse them, and prepend
      const curvesToMove = reorderedCurves.splice(targetIndex, reorderedCurves.length - targetIndex);
      curvesToMove.reverse().forEach(curve => reorderedCurves.unshift(curve));
    }

    this._roof.updateDirection(reorderedCurves, 0);
    this._refreshBuilder();
  }

  /**
   * Commits the transaction by removing all openings and applying the new direction.
   * @returns The modified roof model
   */
  override onCommit(): IRoof {
    // Remove all standard openings
    this._roof.openings.forEach(opening => {
      HSCore.Util.Content.removeContent(opening);
    });

    // Remove all parametric openings
    this._roof.parametricOpenings.forEach(opening => {
      HSCore.Util.Content.removeCustomizedModel(opening);
    });

    this._applyNewLoop();
    
    // Call parent commit with empty dependencies
    super.onCommit();
    
    return this._roof;
  }

  /**
   * Undoes the roof direction change, restoring the original boundary loop.
   */
  override onUndo(): void {
    super.onUndo();
    
    if (this._oldLoop) {
      this._roof.updateDirection(this._oldLoop, 0);
      this._roof.dirtyClipGeometry();
      this._roof.dirtyFaceMaterials();
      this._refreshBuilder();
    }
  }

  /**
   * Redoes the roof direction change, reapplying the new boundary loop.
   */
  override onRedo(): void {
    super.onRedo();
    
    this._applyNewLoop();
    this._roof.dirtyClipGeometry();
    this._roof.dirtyFaceMaterials();
  }
}