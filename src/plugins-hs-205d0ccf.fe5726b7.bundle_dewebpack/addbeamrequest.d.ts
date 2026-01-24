/**
 * Module: AddBeamRequest
 * Provides functionality for adding customized beam elements to the scene
 */

import { HSCore, HSCatalog, HSConstants } from './HSCore';

/**
 * Represents a 3D position in space
 */
interface Position3D {
    x: number;
    y: number;
    z: number;
}

/**
 * Represents a 3D rotation, can be a single Z-axis rotation or full 3D rotation
 */
type Rotation3D = number | {
    x: number;
    y: number;
    z: number;
};

/**
 * Scale factors for X, Y, Z dimensions
 */
interface Scale3D {
    XScale: number;
    YScale: number;
    ZScale: number;
}

/**
 * Metadata for beam creation, containing type and dimensional information
 */
interface BeamMeta {
    /** Default height of the beam */
    defaultHeight?: number;
    /** Content type classification */
    contentType?: HSCatalog.ContentType;
    /** Length in Z dimension */
    ZLength?: number;
}

/**
 * Layer object that contains and manages scene elements
 */
interface Layer {
    /** Height of the layer */
    height: number;
    /** Adds a child element to the layer */
    addChild(child: unknown): void;
}

/**
 * Request class for adding a customized beam to the scene.
 * Handles beam creation with position, rotation, scale, and flip properties.
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 */
export declare class AddBeamRequest extends HSCore.Transaction.Common.StateRequest {
    /** Metadata describing the beam configuration */
    meta: BeamMeta;
    
    /** Layer where the beam will be added */
    layer: Layer;
    
    /** 3D position of the beam in world space */
    position: Position3D;
    
    /** Rotation of the beam (single angle or full 3D rotation) */
    rotation: Rotation3D;
    
    /** Host object that the beam may be attached to */
    host?: unknown;
    
    /** Scale factors for beam dimensions */
    scale?: Scale3D;
    
    /** Flip flag (0 = no flip, other values indicate flip state) */
    flip: number;
    
    /** Specification data for the beam */
    spec?: unknown;

    /**
     * Creates a new AddBeamRequest
     * 
     * @param meta - Beam metadata including type and dimensions
     * @param position - Initial position (defaults to origin with calculated Z)
     * @param rotation - Initial rotation (defaults to 0)
     * @param scale - Scale factors for X, Y, Z dimensions
     * @param host - Optional host object for attachment
     * @param flip - Flip state (defaults to 0)
     * @param spec - Additional specification data
     * @param layer - Target layer (defaults to active layer)
     */
    constructor(
        meta: BeamMeta,
        position?: Position3D,
        rotation?: Rotation3D,
        scale?: Scale3D,
        host?: unknown,
        flip?: number,
        spec?: unknown,
        layer?: Layer
    );

    /**
     * Commits the transaction by creating and adding the beam to the scene
     * 
     * @returns The created beam instance
     */
    onCommit(): HSCore.Model.NCustomizedBeam;

    /**
     * Determines if this request can participate in field transactions
     * 
     * @returns Always returns true
     */
    canTransactField(): boolean;

    /**
     * Creates and configures a new customized beam instance based on request parameters.
     * Applies position, rotation, scale, and flip transformations.
     * 
     * @returns The newly created and configured beam
     */
    createBeam(): HSCore.Model.NCustomizedBeam;
}