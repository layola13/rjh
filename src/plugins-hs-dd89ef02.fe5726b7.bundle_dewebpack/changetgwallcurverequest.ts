import { HSCore } from './HSCore';

interface Wall {
  curve: any;
  prototype?: any;
}

interface Layer {
  walls: Record<string, Wall>;
}

interface ReceiveData {
  curve: any;
}

export class ChangeTgWallCurveRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _wall: Wall;

  constructor(wall: Wall) {
    super();
    this._wall = wall;
    
    const layer: Layer = HSCore.Util.Layer.getEntityLayer(this._wall);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);
  }

  onReceive(action: string, data: ReceiveData): boolean {
    if (action !== 'change') {
      return super.onReceive(action, data);
    }
    
    this._wall.curve = data.curve;
    return true;
  }

  onCommit(): void {
    HSCore.Util.TgWall.processWallsJoints([this._wall]);
    
    const layer: Layer = HSCore.Util.Layer.getEntityLayer(this._wall);
    const walls: Wall[] = Object.values(layer.walls);
    
    HSCore.Util.TgWall.updateLayerByWalls(walls, layer);
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    
    super.onCommit();
  }

  canTransactField(): boolean {
    return true;
  }
}