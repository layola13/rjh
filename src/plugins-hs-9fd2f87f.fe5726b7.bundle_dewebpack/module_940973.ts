import { HSCore } from './path/to/HSCore';

interface LightSlot {
  generateSelfHostLightBand(): boolean | void;
  deleteSelfHostLightBand(): boolean | void;
  dirtyGeometry(): void;
}

export default class LightSlotStateRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _lightSlot: LightSlot | null;
  private readonly _checked: boolean;

  constructor(lightSlot: LightSlot | null, checked: boolean) {
    super();
    this._lightSlot = lightSlot;
    this._checked = checked;
  }

  doRequest(): void {
    if (!this._lightSlot) {
      return;
    }

    const operationSucceeded = this._checked
      ? this._lightSlot.generateSelfHostLightBand()
      : this._lightSlot.deleteSelfHostLightBand();

    if (operationSucceeded) {
      this._lightSlot.dirtyGeometry();
    }
  }

  onCommit(): void {
    this.doRequest();
    super.onCommit?.();
  }

  canTransactField(): boolean {
    return true;
  }
}