// @ts-nocheck
import { ContentLift, ContentLiftController } from './ContentLift';

interface TubePickOffset {
  x: number;
  y: number;
  z: number;
}

export class TubeLift extends ContentLift {
  protected tubePosition!: THREE.Vector3;

  get contentPosition(): THREE.Vector3 {
    return new THREE.Vector3(
      this.tubePosition.x,
      this.tubePosition.y,
      this.tubePosition.z
    );
  }

  protected _updateGizmoShow(): void {
    this.tubePosition = this.controller.contentPosition;
    super._updateGizmoShow();
  }
}

export class TubeLiftController extends ContentLiftController {
  private tubePickOffset?: TubePickOffset;

  constructor(
    entity: any,
    scene: any,
    camera: any,
    renderer: any,
    controls: any,
    pickPoint: THREE.Vector3
  ) {
    super(entity, scene, camera, renderer, controls);

    const center = entity.getCenter();
    this.tubePickOffset = {
      x: pickPoint.x - center.x,
      y: pickPoint.y - center.y,
      z: pickPoint.z - center.z
    };
  }

  get contentPosition(): THREE.Vector3 {
    const center = this.entity.getCenter();
    
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