import { Observable } from '@babylonjs/core/Misc/observable';
import { Vector3, Matrix, Axis, Space, TmpVectors } from '@babylonjs/core/Maths/math.vector';
import { VolumeBasedPanel } from './volumeBasedPanel';
import { Container3D } from './container3D';
import { Control3D } from './control3D';
import { GridNode } from './gridNode';

/**
 * Class used to create a container panel deployed on the surface of a sphere
 * @remarks
 * This panel arranges its children in a grid pattern mapped onto a spherical surface.
 * Each child control is positioned and oriented according to the sphere's curvature.
 */
export declare class SpherePanel extends VolumeBasedPanel {
    /**
     * Internal storage for the sphere radius
     */
    private _radius;

    /**
     * Gets or sets the radius of the sphere
     * @remarks
     * When the radius changes, child controls are automatically rearranged
     * to fit the new spherical surface
     */
    get radius(): number;
    set radius(value: number);

    /**
     * Creates a new SpherePanel instance
     */
    constructor();

    /**
     * Maps a grid node to a position on the spherical surface
     * @param control - The 3D control to be positioned
     * @param nodePosition - The 2D grid position to be mapped to the sphere
     * @remarks
     * This method performs spherical coordinate mapping and applies orientation
     * based on the panel's orientation setting:
     * - FACEORIGIN_ORIENTATION: Control faces toward the sphere's origin
     * - FACEORIGINREVERSED_ORIENTATION: Control faces away from the origin
     * - FACEFORWARD_ORIENTATION: Control maintains forward facing
     * - FACEFORWARDREVERSED_ORIENTATION: Control faces backward (rotated 180°)
     */
    protected _mapGridNode(control: Control3D, nodePosition: Vector3): void;

    /**
     * Converts 2D grid coordinates to 3D spherical surface coordinates
     * @param gridPosition - The 2D position in the grid (x, y components)
     * @returns A Vector3 representing the position on the sphere's surface
     * @remarks
     * Uses yaw-pitch-roll rotation to map planar coordinates onto a sphere.
     * The mapping formula:
     * - Yaw (horizontal rotation): -gridPosition.x / radius
     * - Pitch (vertical rotation): gridPosition.y / radius
     * - Starting point: (0, 0, radius) in local space
     */
    protected _sphericalMapping(gridPosition: Vector3): Vector3;
}