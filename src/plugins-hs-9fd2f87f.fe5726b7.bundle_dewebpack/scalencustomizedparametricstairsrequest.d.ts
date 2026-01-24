/**
 * Module: ScaleNCustomizedParametricStairsRequest
 * Request for scaling and customizing parametric stairs model
 */

import { HSCore } from './path-to-hscore';

/**
 * Property mapping configuration for stair dimensions
 */
interface ScalePropertyConfig {
    /** Parameter key (x, y, or z) */
    paramKey: 'x' | 'y' | 'z';
    /** Scale property key on content object */
    scaleKey: 'XScale' | 'YScale' | 'ZScale';
    /** Parametric stair property type enumeration value */
    key: HSCore.Model.ParametricStairPropertyTypeEnum;
}

/**
 * Scale parameters for stair dimensions
 */
interface ScaleParameters {
    /** X-axis scale factor (width) */
    x?: number;
    /** Y-axis scale factor (length) */
    y?: number;
    /** Z-axis scale factor (height) */
    z?: number;
}

/**
 * Property value with optional constraints
 */
interface PropertyValue {
    /** Current property value */
    value: number;
    /** Optional [min, max] constraints */
    minMax?: [number, number];
}

/**
 * Content object with scalable properties
 */
interface ScalableContent {
    /** X-axis scale */
    XScale: number;
    /** Y-axis scale */
    YScale: number;
    /** Z-axis scale */
    ZScale: number;
    /** Get property map containing dimension constraints */
    getPropertyMap(): Map<HSCore.Model.ParametricStairPropertyTypeEnum, PropertyValue>;
}

/**
 * Request for scaling and customizing parametric stairs
 * Extends the base state request to handle stair dimension modifications
 * with constraint validation
 */
export declare class ScaleNCustomizedParametricStairsRequest extends HSCore.Transaction.Common.StateRequest {
    private _content: ScalableContent;
    private _param: ScaleParameters;

    /**
     * Create a new scale request for parametric stairs
     * @param content - The stair content object to be scaled
     * @param param - Scale parameters for each dimension
     */
    constructor(content: ScalableContent, param: ScaleParameters);

    /**
     * Execute the scale operation
     * Applies scale factors to stair dimensions while respecting min/max constraints
     * Converts parameters from meters to millimeters (x1000)
     * @returns Array of operations (empty) and the modified content object
     */
    onCommit(): [unknown[], ScalableContent];

    /**
     * Determine if this request can be included in a transaction field
     * @returns Always returns true
     */
    canTransactField(): boolean;

    /**
     * Get human-readable description of the operation
     * @returns Description string in Chinese
     */
    getDescription(): string;

    /**
     * Get the log category for this operation
     * @returns Content operation log group type
     */
    getCategory(): string;
}