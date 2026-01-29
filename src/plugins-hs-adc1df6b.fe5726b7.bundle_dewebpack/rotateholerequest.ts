import { HSCore } from './HSCore';

interface RotateEventData {
  delta: number;
  offset?: number;
}

type RotateEventType = 
  | 'mouseup' 
  | 'sliderdragend' 
  | 'hotkeyend' 
  | 'sliderdragmove' 
  | 'dragmove' 
  | 'hotkey';

interface SnapAngleOptions {
  angle: number;
  offset: number;
  mark: number;
}

interface Hole {
  ZRotation: number;
  build(): void;
}

declare global {
  const HSApp: {
    View: {
      T3d: {
        Util: {
          snapToAngle(options: SnapAngleOptions): number | undefined;
        };
      };
    };
  };
  const HSFPConstants: {
    LogGroupTypes: {
      ContentOperation: string;
    };
  };
  const THREE: {
    Vector3: new (x: number, y: number, z: number) => THREE.Vector3;
  };
  namespace THREE {
    interface Vector3 {
      x: number;
      y: number;
      z: number;
    }
  }
}

export class RotateHoleRequest extends HSCore.Transaction.Common.StateRequest {
  private hole: Hole;
  private originalZAngle: number;
  private lastZAngle: number;

  constructor(hole: Hole) {
    super();
    this.hole = hole;
    this.originalZAngle = hole.ZRotation;
    this.lastZAngle = hole.ZRotation;
  }

  onCommit(): void {
    this.hole.build();
    super.onCommit();
  }

  onReceive(eventType: RotateEventType, eventData: RotateEventData): boolean {
    switch (eventType) {
      case 'mouseup':
      case 'sliderdragend':
      case 'hotkeyend':
      case 'sliderdragmove':
        break;

      case 'dragmove':
      case 'hotkey':
        const delta = eventData.delta;
        if (isNaN(delta)) break;

        let newAngle = (this.lastZAngle + delta) % 360;
        this.lastZAngle = newAngle;

        const snapOptions: SnapAngleOptions = {
          angle: newAngle,
          offset: isNaN(eventData.offset ?? NaN) ? 10 : 0,
          mark: 45
        };

        const snappedAngle = HSApp.View.T3d.Util.snapToAngle(snapOptions);
        if (snappedAngle !== undefined) {
          newAngle = snappedAngle;
        }

        this.hole.ZRotation = this.originalZAngle;
        this.rotateAroundWorldAxis(
          new THREE.Vector3(0, 0, 1),
          newAngle - this.originalZAngle
        );
        break;

      default:
        super.onReceive(eventType, eventData);
    }

    return true;
  }

  private rotateAroundWorldAxis(axis: THREE.Vector3, angle: number): void {
    HSCore.Util.Content.rotateAroundWorldAxis(this.hole, axis, angle);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '旋转地洞';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}