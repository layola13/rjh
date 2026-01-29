import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

interface Layer {
  slabThickness: number;
}

export class ChangeLayerThicknessRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _layer: Layer;
  private readonly _thickness: number;

  constructor(layer: Layer, thickness: number) {
    super();
    this._layer = layer;
    this._thickness = thickness;
  }

  onCommit(): void {
    this._layer.slabThickness = this._thickness;
    HSCore.Util.TgSlab.updateLayerSlabFaces(this._layer);
    super.onCommit();
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "编辑楼板厚度";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}