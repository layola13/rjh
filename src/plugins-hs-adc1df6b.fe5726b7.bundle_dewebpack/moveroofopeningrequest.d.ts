/**
 * Module: MoveRoofOpeningRequest
 * Request handler for moving roof openings (windows, doors, skylights, etc.) on roof surfaces.
 * Handles drag operations, collision detection, host assignment, and validation.
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSDevice } from './HSDevice';
import { PerformanceLogCategory, PerformanceOperationTypes } from './PerformanceLog';

/**
 * Mouse position in 3D space
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Scale factors for opening transformations
 */
export interface ScaleFactors {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * Resize parameters for opening dimensions
 */
export interface ResizeParams {
  x?: number;
  y?: number;
  z?: number;
  archHeight?: number;
}

/**
 * Event data passed to onReceive method
 */
export interface MoveEventData {
  newHostRoof?: HSCore.Model.NCustomizedParametricRoof;
  newHostFaceTag?: string;
  ignoreValidate?: boolean;
  position?: Position3D | number[];
  entity?: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  host?: HSCore.Model.NCustomizedParametricRoof;
  event?: MouseEvent & { screenX: number; screenY: number };
  pointOnRoofFace?: Position3D;
  viewType?: '2d' | '3d';
}

/**
 * Internal state tracking for validation
 */
interface ValidationState {
  hostId: string;
  opening: Array<{
    viewObject: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
    isInvalid: boolean;
  }>;
}

/**
 * Transaction request for moving roof openings.
 * Manages the complete lifecycle of moving an opening on a roof surface including:
 * - Mouse drag handling
 * - Host roof assignment
 * - Collision detection with other openings
 * - Validation and visual feedback
 * - Undo/redo support
 */
export declare class MoveRoofOpeningRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  private _mouseStart?: Position3D;
  private readonly _openingStart: Position3D;
  private _replaceTarget?: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  private readonly initScales: ScaleFactors;
  private readonly _bottomMaterial?: HSCore.Model.Material;
  private _hostRoof: HSCore.Model.NCustomizedParametricRoof;
  private _hostFaceTag: string;
  private _preStatus?: ValidationState;
  private readonly _preHost?: HSCore.Model.NCustomizedParametricRoof;

  /**
   * Creates a new move roof opening request
   * @param opening - The opening (window, door, skylight) to be moved
   * @param hostRoof - The roof that will host the opening
   * @param hostFaceTag - Identifier of the specific roof face
   * @param bottomMaterial - Optional material for the opening's bottom face
   */
  constructor(
    opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening,
    hostRoof: HSCore.Model.NCustomizedParametricRoof,
    hostFaceTag: string,
    bottomMaterial?: HSCore.Model.Material
  );

  /**
   * Handles incoming events during the move operation
   * @param event - Event type (DragStart, Move, DragMove, Click, Down, Up, 'moveto', 'resize', 'assignto')
   * @param data - Event-specific data payload
   * @returns True if event was handled successfully
   */
  onReceive(event: string, data: MoveEventData): boolean;

  /**
   * Validates opening placement and updates visual feedback for overlapping openings.
   * Checks for collisions with walls and other openings, dispatching validity signals.
   * @param showHint - Whether to display user-facing hint messages for invalid placements
   */
  private _validate(showHint?: boolean): void;

  /**
   * Resizes the opening to new dimensions
   * @param params - New dimensions (x=width, y=height, z=depth) and optional arch height
   */
  private _resize(params: ResizeParams): void;

  /**
   * Extracts 3D mouse position from event data
   * @param data - Event data containing position information
   * @returns 3D coordinates in model space
   */
  private getMousePos(data: MoveEventData): Position3D;

  /**
   * Moves the opening to a specific position
   * @param position - Target position (partial updates allowed)
   */
  private _moveTo(position: Partial<Position3D>): void;

  /**
   * Commits the move operation, rebuilding geometry and updating dependencies
   * Triggers room builder, material updates, and UI refresh signals
   */
  onCommit(): void;

  /**
   * Reverts the move operation
   */
  onUndo(): void;

  /**
   * Re-applies the move operation
   */
  onRedo(): void;

  /**
   * Indicates this request supports field-level transactions
   * @returns Always true
   */
  canTransactField(): boolean;

  /**
   * Marks host roof geometry as dirty and triggers regeneration.
   * Handles both current and previous host roofs if they differ.
   */
  private _dirtyHostRoof(): void;
}