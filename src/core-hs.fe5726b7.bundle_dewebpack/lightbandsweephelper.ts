import { SweepHelper } from './SweepHelper';
import { Coordinate3 } from './Coordinate3';

interface SweepPath {
  getStartTangent(): Vector3;
}

interface Vector3 {
  clone(): Vector3;
  cross(other: Vector3): Vector3;
}

interface UV {
  // UV coordinate type
}

interface Surface {
  getUVAt(point: Vector3): UV;
}

interface SweepContext {
  getSurface(): Surface;
  getNormAt(uv: UV): Vector3;
}

export class LightBandSweepHelper extends SweepHelper {
  private static _lightbandInstance?: LightBandSweepHelper;

  /**
   * Gets local coordinate system by sweep path
   * @param sweepPaths - Array of sweep paths
   * @param point - Point in 3D space
   * @param context - Sweep context containing surface information
   * @returns Local coordinate system or undefined if no paths
   */
  getLocalCoordinateBySweepPath(
    sweepPaths: SweepPath[],
    point: Vector3,
    context: SweepContext
  ): Coordinate3 | undefined {
    if (sweepPaths.length === 0) {
      return;
    }

    const uv = context.getSurface().getUVAt(point);
    const normal = context.getNormAt(uv);
    const tangent = sweepPaths[0].getStartTangent().clone().cross(normal);

    return new Coordinate3(point, normal, tangent);
  }

  /**
   * Gets singleton instance of LightBandSweepHelper
   * @returns The singleton instance
   */
  static getInstance(): LightBandSweepHelper {
    if (!this._lightbandInstance) {
      this._lightbandInstance = new LightBandSweepHelper();
    }
    return this._lightbandInstance;
  }
}