import { HSCore } from './HSCore';

interface RotateEventData {
  delta: number;
  offset?: number;
}

interface AngleSnapConfig {
  angle: number;
  offset: number;
  mark: number;
}

type RotateEventType = 
  | 'mouseup' 
  | 'sliderdragend' 
  | 'hotkeyend' 
  | 'sliderdragmove' 
  | 'dragmove' 
  | 'hotkey';

interface Beam {
  ZRotation: number;
  rebuild(): void;
}

declare global {
  const THREE: {
    Vector3: new (x: number, y: number, z: number) => Vector3;
  };
  
  const HSApp: {
    View: {
      T3d: {
        Util: {
          snapToAngle(config: AngleSnapConfig): number | undefined;
        };
      };
    };
  };
  
  const HSFPConstants: {
    LogGroupTypes: {
      ContentOperation: string;
    };
  };
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export class RotateBeamRequest extends HSCore.Transaction.Common.StateRequest {
  private beam: Beam;
  private originalZAngle: number;
  private lastZAngle: number;

  constructor(beam: Beam) {
    super();
    
    this.beam = beam;
    this.originalZAngle = this.beam.ZRotation;
    this.lastZAngle = this.beam.ZRotation;
    
    const layer = HSCore.Util.Layer.getEntityLayer(this.beam);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);
  }

  onCommit(): void {
    this.beam.rebuild();
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
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
        if (isNaN(delta)) {
          break;
        }
        
        let rotationAngle = (this.lastZAngle + delta) % 360;
        this.lastZAngle = rotationAngle;
        
        const snapConfig: AngleSnapConfig = {
          angle: rotationAngle,
          offset: isNaN(eventData.offset ?? NaN) ? 10 : 0,
          mark: 45
        };
        
        const snappedAngle = HSApp.View.T3d.Util.snapToAngle(snapConfig);
        if (snappedAngle !== undefined) {
          rotationAngle = snappedAngle;
        }
        
        this.beam.ZRotation = this.originalZAngle;
        this.rotateAroundWorldAxis(
          new THREE.Vector3(0, 0, 1), 
          rotationAngle - this.originalZAngle
        );
        break;
        
      default:
        super.onReceive(eventType, eventData);
    }
    
    return true;
  }

  private rotateAroundWorldAxis(axis: Vector3, angle: number): void {
    HSCore.Util.Content.rotateAroundWorldAxis(this.beam, axis, angle);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '旋转梁';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}