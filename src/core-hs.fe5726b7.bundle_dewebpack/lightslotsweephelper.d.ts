import { SweepHelper } from './SweepHelper';
import { Coordinate3 } from './Coordinate3';

/**
 * Light slot sweep helper for generating sweep geometries along paths.
 * Implements singleton pattern to provide a shared instance.
 */
export declare class LightSlotSweepHelper extends SweepHelper {
    /**
     * Singleton instance cache.
     * @private
     */
    private static _lightslotInstance?: LightSlotSweepHelper;

    /**
     * Calculate the local coordinate system at a specific point on the sweep path.
     * 
     * @param paths - Array of sweep path segments
     * @param point - The 3D point where the coordinate system is calculated
     * @param surface - The surface object providing UV mapping and normal information
     * @returns The local coordinate system at the given point, or undefined if paths array is empty
     */
    getLocalCoordinateBySweepPath(
        paths: Array<{ getStartTangent(): any }>,
        point: any,
        surface: { 
            getSurface(): { getUVAt(point: any): any };
            getNormAt(uv: any): any;
        }
    ): Coordinate3 | undefined;

    /**
     * Get the singleton instance of LightSlotSweepHelper.
     * Creates a new instance on first call, then returns the cached instance.
     * 
     * @returns The singleton LightSlotSweepHelper instance
     */
    static getInstance(): LightSlotSweepHelper;
}