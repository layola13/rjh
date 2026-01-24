/**
 * Module: ChangeStructureModeRequest
 * Transaction request for changing structure mode between wall part and column
 */

import { HSCore } from './HSCore';

declare namespace HSCore.Transaction.Common {
  /**
   * Request to change structure mode (wall part <-> column conversion)
   * Handles bidirectional conversion between columns and customized structures
   */
  class ChangeStructureModeRequest extends StateRequest {
    /** The structure to be converted */
    private _structure: HSCore.Model.NCustomizedStructure | HSCore.Model.Column;
    
    /** Target mode: true for wall part, false for standalone column */
    private _isWallPart: boolean;

    /**
     * Creates a new structure mode change request
     * @param structure - The structure entity to convert (column or customized structure)
     * @param isWallPart - Whether to convert to wall part mode (true) or column mode (false)
     */
    constructor(
      structure: HSCore.Model.NCustomizedStructure | HSCore.Model.Column,
      isWallPart: boolean
    );

    /**
     * Executes the structure mode change transaction
     * Determines conversion direction and delegates to appropriate method:
     * - Column -> Customized Structure (when isWallPart = true)
     * - Customized Structure -> Column (when isWallPart = false)
     * Calls parent onCommit with empty array
     */
    onCommit(): void;

    /**
     * Converts a customized structure back to a standard column
     * Process:
     * 1. Creates new Column instance
     * 2. Transfers metadata and dimensions (XSize, YSize, ZSize)
     * 3. Copies position (x, y, z) and rotation (ZRotation)
     * 4. Removes original structure from parent
     * 5. Rebuilds room geometry
     * 6. Adds new column and updates selection
     */
    private generateColumnFromStructure(): void;

    /**
     * Converts a standard column to a customized structure (wall part)
     * Determines target type based on column content:
     * - ColumnDiyRound -> NCustomizedCircleColumn
     * - ColumnDiySquare -> NCustomizedSquareColumn
     * Process:
     * 1. Creates appropriate customized structure subtype
     * 2. Transfers metadata and lengths (XLength, YLength, ZLength)
     * 3. Copies position (x, y, z) and rotation (ZRotation)
     * 4. Removes original column from parent
     * 5. Adds new structure, syncs layer height
     * 6. Applies scale factors (XScale, YScale, ZScale)
     * 7. Rebuilds room geometry and updates selection
     */
    private generateStructureFromColumn(): void;

    /**
     * Indicates whether this transaction can be recorded for undo/redo
     * @returns Always true - this operation is transactable
     */
    canTransactField(): boolean;
  }
}

export { ChangeStructureModeRequest };