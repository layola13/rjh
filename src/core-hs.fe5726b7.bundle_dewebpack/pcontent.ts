import { PModel } from './PModel';
import { TransUtil } from './TransUtil';

export class PContent extends PModel {
  private _matrixLocal: any;

  constructor(
    entity: unknown,
    options: unknown,
    config: unknown
  ) {
    super(entity, options, config);
  }

  onUpdatePosition(position: unknown): void {
    this._matrixLocal = TransUtil.computeLocalTransform(this.entity, position);
    TransUtil.convertMatrixUnit(this._matrixLocal, undefined);
  }
}