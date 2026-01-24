/**
 * Base class for extraordinary sketch models with unique ID generation
 * @module ExtraordinarySketchBase
 */

import { InteractiveModel } from './InteractiveModel';
import { ExIdGenerator } from './ExIdGenerator';

/**
 * Base class for extraordinary sketch objects that extends InteractiveModel
 * with automatic ID generation capabilities
 */
export class ExtraordinarySketchBase extends InteractiveModel {
    /**
     * Internal string representation of the ID
     * @private
     */
    protected _id: string;

    /**
     * Creates a new ExtraordinarySketchBase instance
     * @param initialId - Initial ID value (defaults to empty string)
     */
    constructor(initialId: string = "") {
        super(initialId);
        this._id = initialId;
    }

    /**
     * Generates a unique ID for this instance using the ExIdGenerator singleton
     * The generated ID is stored internally as a string
     */
    generateId(): void {
        this._id = ExIdGenerator.getInstance().generateId(this.id);
    }

    /**
     * Gets the numeric ID of this instance
     * @returns The ID as an integer
     */
    get id(): number {
        return parseInt(this._id);
    }

    /**
     * Forcefully sets the internal ID without validation
     * @param newId - The new ID value to set
     */
    forceSetId(newId: number): void {
        this._id = newId.toString();
    }
}