import { PModel } from './PModel';
import { WebCadDocument } from './WebCadDocument';
import { Logger } from './Logger';

/**
 * Represents a segment loft model in the CAD system.
 * Handles extrusion of 2D profiles along a path to create 3D geometry.
 */
export declare class PSegmentLoft extends PModel {
    /**
     * Internal CAD document for managing geometry operations.
     * @private
     */
    private _webCadDocument: WebCadDocument;

    /**
     * Cached serialized state to detect changes and avoid redundant updates.
     * @private
     */
    private _cache?: string;

    /**
     * Original path data used for the loft operation.
     * @protected
     */
    protected originalPaths?: GeLib.Polygon[];

    /**
     * Keys identifying snappable faces for user interaction.
     * @protected
     */
    protected snappingFaceKeys?: string[];

    /**
     * Creates a new PSegmentLoft instance.
     * @param e - First constructor parameter (type from PModel base class)
     * @param t - Second constructor parameter (type from PModel base class)
     * @param o - Third constructor parameter (type from PModel base class)
     */
    constructor(e: unknown, t: unknown, o: unknown);

    /**
     * Updates the loft geometry based on current entity state.
     * Retrieves profile path and extrusion length, validates the geometry plane,
     * and regenerates the extruded body if parameters have changed.
     * 
     * Logs an error if the profile path cannot be converted to a valid plane.
     * @protected
     */
    protected onUpdate(): void;
}

/**
 * Configuration for extrusion path data.
 */
interface PathData {
    /** Array of polygon paths defining the profile */
    paths: GeLib.Polygon[];
    /** Geometric plane containing the profile */
    plane: GeLib.Plane;
    /** X-axis ray in the profile plane */
    xRay: GeLib.Ray;
    /** Normal vector of the extrusion direction */
    targetNormal: GeLib.Vector3;
}

/**
 * Parameters for creating an extruded body.
 */
interface ExtrusionParams {
    /** Path configuration for the extrusion */
    pathData: PathData;
    /** Extrusion length/distance */
    value: number;
}

/**
 * Global GeLib namespace providing geometric utilities.
 */
declare namespace GeLib {
    interface Polygon {
        // Polygon definition (placeholder)
    }

    interface Plane {
        xRay: Ray;
        normal: Vector3;
    }

    interface Ray {
        // Ray definition (placeholder)
    }

    interface Vector3 {
        // 3D vector definition (placeholder)
    }

    namespace PolygonUtils {
        /**
         * Extracts the geometric plane from a polygon.
         * @param polygon - The polygon to analyze
         * @returns The plane containing the polygon, or null if invalid
         */
        function getPlaneFromPolygon(polygon: Polygon): Plane | null;
    }
}