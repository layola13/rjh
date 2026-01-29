import { HSCore } from './path/to/HSCore';

interface MouseEvent {
  delta: number;
  offset?: number;
}

interface AngleSnapConfig {
  angle: number;
  offset: number;
  mark: number;
}

interface Structure {
  ZRotation: number;
  isWallPart(): boolean;
  rebuild(): void;
}

declare const HSApp: {
  View: {
    T3d: {
      Util: {
        snapToAngle(config: AngleSnapConfig): number | undefined;
      };
    };
  };
};

declare const HSFPConstants: {
  LogGroupTypes: {
    ContentOperation: string;
  };
};

declare const THREE: {
  Vector3: new (x: number, y: number, z: number) => Vector3;
};

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export class RotateStructureRequest extends HSCore.Transaction.Common.StateRequest {
  private structure: Structure;
  private originalZAngle: number;
  private lastZAngle: number;

  constructor(structure: Structure) {
    super();
    this.structure = structure;
    this.originalZAngle = this.structure.ZRotation;
    this.lastZAngle = this.structure.ZRotation;

    const layer = HSCore.Util.Layer.getEntityLayer(this.structure);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);
  }

  onCommit(): void {
    if (this.structure.isWallPart()) {
      this.structure.rebuild();
      HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    }
    super.onCommit([]);
  }

  onReceive(eventType: string, eventData: MouseEvent): boolean {
    switch (eventType) {
      case 'mouseup':
      case 'sliderdragend':
      case 'hotkeyend':
      case 'sliderdragmove':
        break;

      case 'dragmove':
      case 'hotkey': {
        const delta = eventData.delta;
        if (isNaN(delta)) break;

        let angle = (this.lastZAngle + delta) % 360;
        this.lastZAngle = angle;

        const snapConfig: AngleSnapConfig = {
          angle: angle,
          offset: isNaN(eventData.offset ?? NaN) ? 10 : 0,
          mark: 45
        };

        const snappedAngle = HSApp.View.T3d.Util.snapToAngle(snapConfig);
        angle = snappedAngle !== undefined ? snappedAngle : angle;

        this.structure.ZRotation = this.originalZAngle;
        this.rotateAroundWorldAxis(
          new THREE.Vector3(0, 0, 1),
          angle - this.originalZAngle
        );
        break;
      }

      default:
        super.onReceive([eventType, eventData]);
    }

    return true;
  }

  private rotateAroundWorldAxis(axis: Vector3, angle: number): void {
    HSCore.Util.Content.rotateAroundWorldAxis(this.structure, axis, angle);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '旋转结构体';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}