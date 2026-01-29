import { SweepHelper } from './SweepHelper';
import { Coordinate3 } from './Coordinate3';

interface SweepPath {
  getStartTangent(): Vector3;
}

interface Vector3 {
  clone(): Vector3;
  cross(other: Vector3): Vector3;
}

interface UVCoordinate {
  u: number;
  v: number;
}

interface SweepContext {
  getSurface(): Surface;
  getNormAt(uv: UVCoordinate): Vector3;
}

interface Surface {
  getUVAt(point: Vector3): UVCoordinate;
}

export class LightSlotSweepHelper extends SweepHelper {
  private static _lightslotInstance?: LightSlotSweepHelper;

  getLocalCoordinateBySweepPath(
    sweepPaths: SweepPath[],
    point: Vector3,
    context: SweepContext
  ): Coordinate3 | undefined {
    if (sweepPaths.length === 0) {
      return undefined;
    }

    const uvCoordinate = context.getSurface().getUVAt(point);
    const normal = context.getNormAt(uvCoordinate);
    const tangent = sweepPaths[0].getStartTangent().clone().cross(normal);

    return new Coordinate3(point, normal, tangent);
  }

  static getInstance(): LightSlotSweepHelper {
    if (!this._lightslotInstance) {
      this._lightslotInstance = new LightSlotSweepHelper();
    }
    return this._lightslotInstance;
  }
}