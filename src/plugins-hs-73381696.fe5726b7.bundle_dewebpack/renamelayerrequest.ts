import { HSCore } from './path/to/HSCore';
import { HSFPConstants } from './path/to/HSFPConstants';

interface Layer {
  displayName: string;
}

export class RenameLayerRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _layer: Layer;
  private readonly _name: string;

  constructor(layer: Layer, name: string) {
    super();
    this._layer = layer;
    this._name = name;
  }

  onCommit(): void {
    if (this._name) {
      this._layer.displayName = this._name;
    }
    super.onCommit?.();
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "重命名楼层";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.LayerOperation;
  }
}