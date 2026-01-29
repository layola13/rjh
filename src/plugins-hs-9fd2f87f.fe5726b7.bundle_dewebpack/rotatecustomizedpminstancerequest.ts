interface Instance {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

type RotationTuple = [number, number, number];

abstract class TransactionRequest {
  abstract onCommit(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
}

/**
 * Request for rotating a customized PM instance
 * Manages rotation state and supports undo/redo operations
 */
export class RotateCustomizedPMInstanceRequest extends TransactionRequest {
  private readonly _instance: Instance;
  private readonly _oldRotation_xz: number;
  private readonly _oldRotation_yz: number;
  private readonly _oldRotation_xy: number;
  private _newRotation_xz: number;
  private _newRotation_yz: number;
  private _newRotation_xy: number;

  constructor(instance: Instance, oldRotation: RotationTuple, newRotation: RotationTuple) {
    super();
    this._instance = instance;
    this._oldRotation_xz = oldRotation[0];
    this._oldRotation_yz = oldRotation[1];
    this._oldRotation_xy = oldRotation[2];
    this._newRotation_xz = newRotation[0];
    this._newRotation_yz = newRotation[1];
    this._newRotation_xy = newRotation[2];
  }

  onCommit(): void {
    this._instance.XRotation = this._newRotation_xz;
    this._instance.YRotation = this._newRotation_yz;
    this._instance.ZRotation = this._newRotation_xy;
  }

  onUndo(): void {
    this._instance.XRotation = this._oldRotation_xz;
    this._instance.YRotation = this._oldRotation_yz;
    this._instance.ZRotation = this._oldRotation_xy;
  }

  onRedo(): void {
    this._instance.XRotation = this._newRotation_xz;
    this._instance.YRotation = this._newRotation_yz;
    this._instance.ZRotation = this._newRotation_xy;
  }

  updateNewRotation(rotation: RotationTuple): void {
    this._newRotation_xz = rotation[0];
    this._newRotation_yz = rotation[1];
    this._newRotation_xy = rotation[2];
  }

  getComposeSpec(): [Instance, RotationTuple, RotationTuple] {
    return [
      this._instance,
      [this._oldRotation_xz, this._oldRotation_yz, this._oldRotation_xy],
      [this._newRotation_xz, this._newRotation_yz, this._newRotation_xy]
    ];
  }
}