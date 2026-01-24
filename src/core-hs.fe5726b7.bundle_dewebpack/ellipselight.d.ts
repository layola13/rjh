import type { VirtualAreaLight, VirtualAreaLight_IO } from './VirtualAreaLight';
import type { LightTypeEnum } from './LightTypeEnum';
import type { Entity } from './Entity';
import type * as THREE from 'three';

/**
 * Default dimension value for ellipse light width and height
 */
declare const DEFAULT_ELLIPSE_DIMENSION: 0.2;

/**
 * IO handler for EllipseLight serialization and deserialization
 * Extends VirtualAreaLight_IO to provide specific handling for ellipse lights
 */
export declare class EllipseLight_IO extends VirtualAreaLight_IO {
    /**
     * Gets the singleton instance of EllipseLight_IO
     */
    static instance(): EllipseLight_IO;
}

/**
 * Ellipse-shaped area light source
 * Provides soft, diffused lighting with an elliptical emission pattern
 */
export declare class EllipseLight extends VirtualAreaLight {
    /**
     * Light type identifier
     */
    type: LightTypeEnum.EllipseLight;

    /**
     * Width of the ellipse (major or minor axis)
     */
    width: number;

    /**
     * Height of the ellipse (major or minor axis)
     */
    height: number;

    /**
     * Whether the light emits from both sides of the surface
     */
    double_flat: boolean;

    /**
     * Creates a new EllipseLight instance
     * @param name - Optional name for the light
     * @param parent - Optional parent entity
     */
    constructor(name?: string, parent?: Entity | undefined);

    /**
     * Factory method to create and initialize an EllipseLight
     * @returns A new, reset EllipseLight instance
     */
    static create(): EllipseLight;

    /**
     * Resets the light to default values
     * Sets width and height to default dimension and double_flat to false
     */
    reset(): void;

    /**
     * Gets the IO handler for this light type
     * @returns The EllipseLight_IO singleton instance
     */
    getIO(): EllipseLight_IO;

    /**
     * Calculates the surface area of the ellipse
     * Uses the formula: π × height × width / 4
     * @returns The area in square units
     */
    getArea(): number;

    /**
     * Constructs a path representing the ellipse perimeter
     * Generates vertices along the ellipse curve using parametric equations
     * @param segments - Number of segments to divide the ellipse into (must be >= 4)
     * @returns Array of 3D points forming the ellipse, or empty array if segments < 4
     */
    constructPath(segments: number): THREE.Vector3[];
}

/**
 * Global declarations
 */
declare global {
    namespace HSConstants {
        enum ModelClass {
            NgEllipseLight = 'NgEllipseLight'
        }
    }
}