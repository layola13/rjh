import { HSCore } from './HSCore';

interface Beam {
  copy(): Beam;
  parent: BeamParent;
}

interface BeamParent {
  addChild(beam: Beam): void;
}

export class CopyPasteBeamRequest extends HSCore.Transaction.Common.StateRequest {
  from: Beam;
  private _newBeam?: Beam;

  constructor(from: Beam) {
    super();
    this.from = from;
  }

  onCommit(): Beam {
    const parent = this.from.parent;
    this._newBeam = this.from.copy();
    parent.addChild(this._newBeam);
    super.onCommit();
    return this._newBeam;
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "粘贴物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}