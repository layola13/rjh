import { HSCore } from './path/to/HSCore';
import { HSApp } from './path/to/HSApp';
import { HSFPConstants } from './path/to/HSFPConstants';

interface AuxiliaryLine {
  // Define properties based on your line structure
  [key: string]: unknown;
}

/**
 * Request to create an auxiliary line in the floorplan
 */
export class CreateAuxiliaryLineRequest extends HSCore.Transaction.Common.StateRequest {
  private _line: AuxiliaryLine;

  constructor(line: AuxiliaryLine) {
    super();
    this._line = line;
  }

  /**
   * Commits the auxiliary line creation to the active layer
   */
  onCommit(): void {
    const activeLayer = HSApp.App.getApp().floorplan.scene.activeLayer;
    const auxiliaryLine = HSCore.Model.AuxiliaryLine.create(this._line);
    activeLayer.addChild(auxiliaryLine);
    
    super.onCommit?.();
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '绘制户型辅助线操作';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}