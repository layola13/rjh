import { HSCore } from './HSCore';

export class ToggleGenerateRoofRequest extends HSCore.Transaction.Common.StateRequest {
  private _meta: any;
  private _layer: any;
  private _loopInfo: any;
  private _roomHeight: number;
  private _linkWallIds: string[];
  public oldRoof: HSCore.Model.NCustomizedParametricRoof;
  public roof?: HSCore.Model.NCustomizedParametricRoof;

  constructor(
    oldRoof: HSCore.Model.NCustomizedParametricRoof,
    meta: any,
    layer: any,
    loopInfo: any,
    roomHeight: number,
    linkWallIds: string[]
  ) {
    super();
    this._meta = meta;
    this._layer = layer;
    this._loopInfo = loopInfo;
    this._roomHeight = roomHeight;
    this._linkWallIds = linkWallIds;
    this.oldRoof = oldRoof;
  }

  public onCommit(): HSCore.Model.NCustomizedParametricRoof {
    this.oldRoof.openings.forEach((opening) => {
      HSCore.Util.Content.removeContent(opening);
    });

    this.oldRoof.parametricOpenings.forEach((parametricOpening) => {
      HSCore.Util.Content.removeCustomizedModel(parametricOpening);
    });

    HSCore.Util.Content.removeCustomizedModel(this.oldRoof);

    super.onCommit?.();

    const content = this._createContent();
    return content;
  }

  private _createContent(): HSCore.Model.NCustomizedParametricRoof {
    const roof = new HSCore.Model.NCustomizedParametricRoof();
    
    roof.initByMeta(this._meta, undefined, undefined, undefined, {
      roomHeight: this._roomHeight,
      linkWallIds: this._linkWallIds
    });

    roof.previewParams = {};
    roof.initRoof(this._loopInfo.loop.loop);

    const layer = this._layer;
    
    HSCore.Util.Content.addContent({
      content: roof,
      host: null,
      parent: layer
    });

    this.roof = roof;
    return roof;
  }

  public canTransactField(): boolean {
    return true;
  }
}