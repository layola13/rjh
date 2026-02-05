// @ts-nocheck
import { CoordinateAxis } from './CoordinateAxis';

interface TubePickOffset {
  x: number;
  y: number;
  z: number;
}

interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

export default class TubeCoordinateAxis extends CoordinateAxis {
  private tubePickOffset?: TubePickOffset;

  constructor(
    param1: unknown,
    param2: unknown,
    entity: { getCenter: () => Vector3Like },
    param4: unknown,
    pickPoint: Vector3Like
  ) {
    super(param1, param2, entity, param4);

    const center = entity.getCenter();
    this.tubePickOffset = {
      x: pickPoint.x - center.x,
      y: pickPoint.y - center.y,
      z: pickPoint.z - center.z
    };
  }

  get contentPosition(): THREE.Vector3 {
    const center = (this.entity as { getCenter: () => Vector3Like }).getCenter();
    
    if (this.tubePickOffset) {
      return new THREE.Vector3(
        center.x + this.tubePickOffset.x,
        center.y + this.tubePickOffset.y,
        center.z + this.tubePickOffset.z
      );
    }
    
    return new THREE.Vector3(center.x, center.y, center.z);
  }
}