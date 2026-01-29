import { ContentMovement, ContentMovementController } from './ContentMovement';

interface TubePickOffset {
  x: number;
  y: number;
  z: number;
}

export class TubeMovement extends ContentMovement {
  tubePosition!: THREE.Vector3;

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

export class TubeMovementController extends ContentMovementController {
  private tubePickOffset?: TubePickOffset;

  constructor(
    entity: any,
    param2: any,
    param3: any,
    param4: any,
    param5: any,
    pickPosition: THREE.Vector3
  ) {
    super(entity, param2, param3, param4, param5);

    const center = entity.getCenter();
    this.tubePickOffset = {
      x: pickPosition.x - center.x,
      y: pickPosition.y - center.y,
      z: pickPosition.z - center.z
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