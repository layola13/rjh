/**
 * Module: MoveCustomizedPMInstanceRequest
 * Represents a transaction request for moving a customized PM instance in 3D space
 */

import { HSCore } from './HSCore';

/**
 * Position and rotation data structure
 */
interface PositionData {
    /** X coordinate */
    x?: number;
    /** Y coordinate */
    y?: number;
    /** Z coordinate */
    z?: number;
    /** Rotation around Z axis */
    rotation?: number;
    /** Rotation around X axis */
    XRotation?: number;
    /** Rotation around Y axis */
    YRotation?: number;
}

/**
 * Entity interface with spatial properties
 */
interface SpatialEntity {
    x: number;
    y: number;
    z: number;
    rotation: number;
    XRotation: number;
    YRotation: number;
}

/**
 * Request class for moving a customized PM instance
 * Extends the base HSCore Transaction Request to support undo/redo operations
 */
export declare class MoveCustomizedPMInstanceRequest extends HSCore.Transaction.Request {
    /** The entity being moved */
    private _entity: SpatialEntity | undefined;
    
    /** Target X coordinate */
    private _targetX: number | undefined;
    
    /** Target Y coordinate */
    private _targetY: number | undefined;
    
    /** Target Z coordinate */
    private _targetZ: number | undefined;
    
    /** X coordinate before move */
    private _beforeX: number | undefined;
    
    /** Y coordinate before move */
    private _beforeY: number | undefined;
    
    /** Z coordinate before move */
    private _beforeZ: number | undefined;
    
    /** X coordinate after commit */
    private _afterX: number | undefined;
    
    /** Y coordinate after commit */
    private _afterY: number | undefined;
    
    /** Z coordinate after commit */
    private _afterZ: number | undefined;
    
    /** Previous position and rotation state */
    private _previous: PositionData | undefined;
    
    /** Next position and rotation state */
    private _next: PositionData | undefined;

    /**
     * Creates a new move request
     * @param entity - The entity to move
     * @param previousPosition - The position before the move
     * @param targetPosition - The target position after the move
     */
    constructor(
        entity: SpatialEntity,
        previousPosition: PositionData,
        targetPosition: PositionData
    );

    /**
     * Commits the move operation by applying target coordinates to the entity
     */
    onCommit(): void;

    /**
     * Moves the entity to the next position state
     * @private
     */
    private _moveContent(): void;

    /**
     * Saves the current entity state for restore operations
     * @private
     */
    private _saveRestoreData(): void;

    /**
     * Internal handler for undo/redo operations
     * @private
     */
    private _onUndoRedo(): void;

    /**
     * Reverts the move operation
     */
    onUndo(): void;

    /**
     * Reapplies the move operation
     */
    onRedo(): void;
}