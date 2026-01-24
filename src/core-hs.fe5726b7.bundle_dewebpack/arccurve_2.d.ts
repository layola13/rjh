/**
 * ArcCurve module - Defines arc curve geometry and serialization
 * Provides 2D arc curve representation with center point and direction
 */

import { Curve, Curve_IO } from './Curve';
import { Point2D } from './types';

/**
 * Serialization handler for ArcCurve instances
 * Handles dump/load operations for persistence and network transfer
 */
export class ArcCurve_IO extends Curve_IO {
    /**
     * Serializes an ArcCurve instance to a plain object
     * @param curve - The ArcCurve instance to serialize
     * @param callback - Optional callback for custom serialization logic
     * @param includeMetadata - Whether to include metadata in output
     * @param options - Additional serialization options
     * @returns Serialized representation of the arc curve
     */
    dump(
        curve: ArcCurve,
        callback?: (serialized: SerializedArcCurve, source: ArcCurve) => void,
        includeMetadata: boolean = true,
        options: Record<string, unknown> = {}
    ): SerializedArcCurve {
        const serialized = super.dump(curve, undefined, includeMetadata, options) as SerializedArcCurve;
        serialized.cx = curve.cx;
        serialized.cy = curve.cy;
        serialized.clockwise = curve.clockwise;
        
        if (callback) {
            callback(serialized, curve);
        }
        
        return serialized;
    }

    /**
     * Deserializes a plain object into an ArcCurve instance
     * @param target - The ArcCurve instance to populate
     * @param data - Serialized arc curve data
     * @param options - Deserialization options
     */
    load(
        target: ArcCurve,
        data: SerializedArcCurve,
        options?: unknown
    ): void {
        super.load(target, data, options);
        target.cx = data.cx;
        target.cy = data.cy;
        target.clockwise = data.clockwise;
    }

    /**
     * Gets singleton instance of ArcCurve_IO
     * @returns Shared instance for serialization operations
     */
    static instance(): ArcCurve_IO {
        // Implementation would return singleton
        return new ArcCurve_IO();
    }
}

/**
 * Represents a 2D arc curve defined by center point and direction
 * Used for geometric modeling and CAD operations
 */
export class ArcCurve extends Curve {
    /** X-coordinate of arc center */
    cx: number;
    
    /** Y-coordinate of arc center */
    cy: number;
    
    /** Whether arc travels clockwise from start to end point */
    clockwise: boolean;

    constructor() {
        super();
        this.cx = 0;
        this.cy = 0;
        this.clockwise = false;
    }

    /**
     * Mirrors the arc curve across a horizontal or vertical axis
     * @param axisPosition - Position of the mirror axis
     * @param isVertical - True for vertical axis, false for horizontal
     */
    mirror(axisPosition: number, isVertical: boolean): void {
        if (isVertical) {
            this.cx = axisPosition - this.cx;
        } else {
            this.cy = axisPosition - this.cy;
        }
        this.clockwise = !this.clockwise;
    }

    /**
     * Reverses the direction of the arc curve
     */
    flip(): void {
        this.clockwise = !this.clockwise;
    }

    /**
     * Calculates the sagitta (perpendicular distance from chord to arc)
     * @param startPoint - Start point of the arc
     * @param endPoint - End point of the arc
     * @returns Sagitta value
     */
    getSagitta(startPoint: Point2D, endPoint: Point2D): number {
        const start3D = convertToVector3(startPoint);
        const end3D = convertToVector3(endPoint);
        const centerPoint = this.center;
        const radius = this.getRadius(startPoint, endPoint);
        
        return GeLib.ArcUtils.getSagitta(start3D, end3D, centerPoint, radius, this.clockwise);
    }

    /**
     * Gets the center point of the arc as a 3D vector
     * @returns Center point with z=0
     */
    get center(): THREE.Vector3 {
        return new THREE.Vector3(this.cx, this.cy, 0);
    }

    /**
     * Calculates the radius of the arc
     * @param startPoint - Start point on the arc
     * @param endPoint - End point on the arc (unused but kept for API consistency)
     * @returns Arc radius
     */
    getRadius(startPoint: Point2D, endPoint: Point2D): number {
        const centerPoint = new THREE.Vector3(this.cx, this.cy, 0);
        const start3D = convertToVector3(startPoint);
        return centerPoint.distanceTo(start3D);
    }

    /**
     * Creates an arc curve from two points and sagitta value
     * @param startPoint - Start point of the arc
     * @param endPoint - End point of the arc
     * @param sagitta - Perpendicular distance from chord to arc
     * @param clockwise - Arc direction, defaults to false (counter-clockwise)
     * @returns New ArcCurve instance
     */
    static createBySagitta(
        startPoint: Point2D,
        endPoint: Point2D,
        sagitta: number,
        clockwise: boolean = false
    ): ArcCurve {
        const start3D = convertToVector3(startPoint);
        const end3D = convertToVector3(endPoint);
        const result = GeLib.ArcUtils.getCenterRadiusBySagitta(start3D, end3D, sagitta);
        
        return ArcCurve.create(result.center, clockwise);
    }

    /**
     * Creates an arc curve from center point and direction
     * @param center - Center point of the arc
     * @param clockwise - Arc direction
     * @returns New ArcCurve instance
     */
    static create(center: THREE.Vector3, clockwise: boolean): ArcCurve {
        const arc = new ArcCurve();
        arc.cx = center.x;
        arc.cy = center.y;
        arc.clockwise = clockwise;
        return arc;
    }

    /**
     * Gets the IO handler for serialization
     * @returns ArcCurve_IO instance
     */
    getIO(): ArcCurve_IO {
        return ArcCurve_IO.instance();
    }

    /**
     * Converts to THREE.js curve representation
     * @param startPoint - Start point of the arc
     * @param endPoint - End point of the arc
     * @returns THREE.js curve object
     */
    toTHREECurve(startPoint: Point2D, endPoint: Point2D): THREE.Curve<THREE.Vector3> {
        const centerPoint = this.center;
        const start3D = convertToVector3(startPoint);
        const end3D = convertToVector3(endPoint);
        const radius = this.getRadius(startPoint, endPoint);
        
        return GeLib.ArcUtils.createArcFromPoints(start3D, end3D, centerPoint, radius, this.clockwise);
    }

    /**
     * Creates a deep copy of this arc curve
     * @returns New ArcCurve instance with same properties
     */
    clone(): ArcCurve {
        return ArcCurve.create(this.center, this.clockwise);
    }

    /**
     * Creates a copy with reversed direction
     * @returns New ArcCurve instance with opposite direction
     */
    reverseClone(): ArcCurve {
        return ArcCurve.create(this.center, !this.clockwise);
    }
}

/**
 * Converts a 2D point to a 3D vector with z=0
 * @param point - 2D point with x and y coordinates
 * @returns 3D vector representation
 */
function convertToVector3(point: Point2D): THREE.Vector3 {
    return new THREE.Vector3(point.x, point.y, 0);
}

/**
 * Serialized representation of an ArcCurve
 */
interface SerializedArcCurve {
    cx: number;
    cy: number;
    clockwise: boolean;
    [key: string]: unknown;
}

// Register the ArcCurve class with the model system
Curve.registerClass(HSConstants.ModelClass.ArcCurve, ArcCurve);