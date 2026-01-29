import { HSCore } from './HSCore';
import { Utils } from './Utils';

export class ReplaceRoofRequest extends HSCore.Transaction.Common.StateRequest {
  private _meta: any;
  public oldRoof: HSCore.Model.NCustomizedParametricRoof;
  public roof?: HSCore.Model.NCustomizedParametricRoof;

  constructor(
    oldRoof: HSCore.Model.NCustomizedParametricRoof,
    meta: any
  ) {
    super();
    this.oldRoof = oldRoof;
    this._meta = meta;
  }

  public onCommit(): HSCore.Model.NCustomizedParametricRoof {
    super.onCommit();
    const content = this._createContent();
    return content;
  }

  private _createContent(): HSCore.Model.NCustomizedParametricRoof {
    const previewParams = this.oldRoof.previewParams;
    const roomHeight = this.oldRoof.parameters.roomHeight;
    const linkWallIds = this.oldRoof.parameters.linkWallIds;
    const roomLoop = this.oldRoof.parameters.roomLoop.clone().scale(0.001);
    const parent = this.oldRoof.getUniqueParent();

    this.oldRoof.openings.forEach((opening: any) => {
      HSCore.Util.Content.removeContent(opening);
    });

    this.oldRoof.parametricOpenings.forEach((parametricOpening: any) => {
      HSCore.Util.Content.removeCustomizedModel(parametricOpening);
    });

    HSCore.Util.Content.removeCustomizedModel(this.oldRoof);

    const newRoof = new HSCore.Model.NCustomizedParametricRoof();
    newRoof.initByMeta(this._meta, undefined, undefined, undefined, {
      roomHeight: roomHeight,
      linkWallIds: linkWallIds
    });

    const sortedLoop = Utils.sortLoopByType(roomLoop, newRoof.parameters.roofType);
    newRoof.previewParams = previewParams;
    newRoof.initRoof(sortedLoop);

    HSCore.Util.Content.addContent({
      content: newRoof,
      host: null,
      parent: parent
    });

    this.roof = newRoof;

    if (parent instanceof HSCore.Model.Layer) {
      parent.roomBuilder.build();
    }

    return newRoof;
  }

  public canTransactField(): boolean {
    return true;
  }
}