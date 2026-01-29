import { HSCore } from './path/to/HSCore';

export class ChangeBeamTypeRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _beam: IBeam;
  private readonly _isPrimaryBeam: boolean;

  constructor(beam: IBeam, isPrimaryBeam: boolean) {
    super();
    this._beam = beam;
    this._isPrimaryBeam = isPrimaryBeam;
  }

  onCommit(): void {
    this._beam.setBeamType(this._isPrimaryBeam);
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }
}

interface IBeam {
  setBeamType(isPrimaryBeam: boolean): void;
}