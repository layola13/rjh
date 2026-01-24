/**
 * Module: ArcCurve
 * Represents an arc curve with center point and clockwise direction
 */

import { Curve, Curve_IO } from './Curve';
import * as THREE from 'three';

/**
 * Serialization handler for ArcCurve instances
 */
export declare class ArcCurve_IO extends Curve_IO {
    /**
     * Serializes an ArcCurve instance to a plain object
     * @param entity - The ArcCurve instance to serialize
     * @param callback - Optional callback to modify the serialized data
     * @param includeDefaults - Whether to include default values in output
     * @param context - Additional serialization context
     * @returns Serialized representation of the ArcCurve
     */
    dump(
        entity: ArcCurve,
        callback?: (serialized: any, original: ArcCurve) => void,
        includeDefaults?: boolean,
        context?: Record<string, any>
    ): any;

    /**
     * Deserializes a plain object into an ArcCurve instance
     * @param entity - The target ArcCurve instance to populate
     * @param data - The serialized data
     * @param context - Deserialization context
     * @param metadata - Additional metadata for deserialization
     */
    load(
        entity: ArcCurve,
        data: any,
        context: any,
        metadata: any
    ): void;

    /**
     * Gets the singleton instance of ArcCurve_IO
     */
    static instance(): ArcCurve_IO;
}

/**
 * Represents a 2D arc curve defined by a center point and clockwise direction
 */
export declare class ArcCurve extends Curve {
    /** X-coordinate of the arc center */
    cx: number;

    /** Y-coordinate of the arc center */
    cy: number;

    /** Whether the arc travels in a clockwise direction */
    clockwise: boolean;

    constructor();

    /**
     * Mirrors the arc across a horizontal or vertical axis
     * @param axisValue - The axis coordinate to mirror across
     * @param isHorizontal - True to mirror across vertical axis (X), false for horizontal axis (Y)
     */
    mirror(axisValue: number, isHorizontal: boolean): void;

    /**
     * Reverses the arc direction (toggles clockwise/counterclockwise)
     */
    flip(): void;

    /**
     * Calculates the sagitta (height of the arc segment)
     * @param startPoint - Start point of the arc
     * @param endPoint - End point of the arc
     * @returns The sagitta value
     */
    getSagitta(startPoint: { x: number; y: number }, endPoint: { x: number; y: number }): number;

    /**
     * Gets the 3D center point of the arc
     */
    get center(): THREE.Vector3;

    /**
     * Calculates the radius of the arc
     * @param startPoint - Start point of the arc
     * @param endPoint - End point of the arc (unused but kept for interface consistency)
     * @returns The arc radius
     */
    getRadius(startPoint: { x: number; y: number }, endPoint: { x: number; y: number }): number;

    /**
     * Creates an ArcCurve from start point, end point, and sagitta
     * @param startPoint - Start point of the arc
     * @param endPoint - End point of the arc
     * @param sagitta - Height of the arc segment
     * @param clockwise - Whether the arc is clockwise
     * @returns New ArcCurve instance
     */
    static createBySagitta(
        startPoint: { x: number; y: number },
        endPoint: { x: number; y: number },
        sagitta: number,
        clockwise?: boolean
    ): ArcCurve;

    /**
     * Creates an ArcCurve from a center point and direction
     * @param center - Center point of the arc
     * @param clockwise - Whether the arc is clockwise
     * @returns New ArcCurve instance
     */
    static create(center: THREE.Vector3, clockwise: boolean): ArcCurve;

    /**
     * Gets the serialization handler for this curve type
     */
    getIO(): ArcCurve_IO;

    /**
     * Converts this curve to a THREE.js curve representation
     * @param startPoint - Start point of the arc
     * @param endPoint - End point of the arc
     * @returns THREE.js curve object
     */
    toTHREECurve(startPoint: { x: number; y: number }, endPoint: { x: number; y: number }): any;

    /**
     * Creates a clone of this arc with the same properties
     */
    clone(): ArcCurve;

    /**
     * Creates a clone of this arc with reversed direction
     */
    reverseClone(): ArcCurve;
}

/**
 * Global namespace for geometry utilities
 */
declare global {
    const GeLib: {
        ArcUtils: {
            getSagitta(
                start: THREE.Vector3,
                end: THREE.Vector3,
                center: THREE.Vector3,
                radius: number,
                clockwise: boolean
            ): number;
            getCenterRadiusBySagitta(
                start: THREE.Vector3,
                end: THREE.Vector3,
                sagitta: number
            ): { center: THREE.Vector3; radius: number };
            createArcFromPoints(
                start: THREE.Vector3,
                end: THREE.Vector3,
                center: THREE.Vector3,
                radius: number,
                clockwise: boolean
            ): any;
        };
    };

    const HSConstants: {
        ModelClass: {
            ArcCurve: string;
        };
    };
}