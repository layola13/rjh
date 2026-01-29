import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

export class DeleteBeamRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _beam: HSCore.Model.Beam;
  public layer: HSCore.Model.Layer | undefined;

  constructor(beam: HSCore.Model.Beam) {
    super();
    this._beam = beam;
    this.layer = this._beam.parent;
  }

  public onCommit(): HSCore.Model.Beam {
    if (this.layer) {
      HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(this.layer);
      this.layer.removeChild(this._beam);

      const host = this._beam.getHost();
      if (host instanceof HSCore.Model.Face) {
        host.removeContent(this._beam);
      }

      HSCore.Util.TgSlab.updateCeilingAfterBeamChanged(this.layer);
      this.layer.beamBuilder.build();
      HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();

      super.onCommit([]);
    }

    return this._beam;
  }

  public getDescription(): string {
    return "删除梁";
  }

  public canTransactField(): boolean {
    return true;
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}