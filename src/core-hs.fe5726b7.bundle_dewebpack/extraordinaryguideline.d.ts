/**
 * Module: ExtraordinaryGuideline
 * Original ID: 39593
 * Exports: ExtraordinaryGuideline
 */

import { ExtraordinarySketchBase } from './ExtraordinarySketchBase';

/**
 * Represents a guideline in an extraordinary sketch system.
 * Manages curve data and anchor points with associated type information.
 */
export declare class ExtraordinaryGuideline extends ExtraordinarySketchBase {
    private readonly _curve: unknown;
    private readonly _fromAnchor: unknown;
    private readonly _endAnchor: unknown;
    private _type: unknown;

    /**
     * Creates a new ExtraordinaryGuideline instance.
     * @param curve - The curve data associated with this guideline
     * @param fromAnchor - The starting anchor point
     * @param endAnchor - The ending anchor point
     * @param type - The type classification of the guideline
     * @param baseParam - Parameter passed to ExtraordinarySketchBase constructor
     */
    constructor(
        curve: unknown,
        fromAnchor: unknown,
        endAnchor: unknown,
        type: unknown,
        baseParam: unknown
    );

    /**
     * Factory method to create a new ExtraordinaryGuideline instance.
     * @param curve - The curve data associated with this guideline
     * @param fromAnchor - The starting anchor point
     * @param endAnchor - The ending anchor point
     * @param type - The type classification of the guideline
     * @param baseParam - Parameter passed to ExtraordinarySketchBase constructor
     * @returns A new ExtraordinaryGuideline instance
     */
    static create(
        curve: unknown,
        fromAnchor: unknown,
        endAnchor: unknown,
        type: unknown,
        baseParam: unknown
    ): ExtraordinaryGuideline;

    /**
     * Gets the starting anchor point of the guideline.
     */
    get fromAnchor(): unknown;

    /**
     * Gets the ending anchor point of the guideline.
     */
    get endAnchor(): unknown;

    /**
     * Gets the curve data associated with this guideline.
     */
    get curve(): unknown;

    /**
     * Gets the current type classification of the guideline.
     */
    get type(): unknown;

    /**
     * Updates the type classification of the guideline.
     * @param newType - The new type to assign to this guideline
     */
    changeType(newType: unknown): void;
}