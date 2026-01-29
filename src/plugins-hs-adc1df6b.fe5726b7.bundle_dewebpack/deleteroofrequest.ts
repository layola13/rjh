import { HSCore } from './HSCore';
import { ENParamRoofType } from './ENParamRoofType';

export class DeleteRoofRequest extends HSCore.Transaction.Common.StateRequest {
  roof: HSCore.Model.Roof;

  constructor(roof: HSCore.Model.Roof) {
    super();
    this.roof = roof;
  }

  onCommit(): HSCore.Model.Roof {
    const parent = this.roof.getUniqueParent();
    const openings: HSCore.Model.Opening[] = [
      ...this.roof.openings,
      ...this.roof.parametricOpenings
    ];

    HSCore.Util.Content.removeCustomizedModel(this.roof);

    openings.forEach((opening: HSCore.Model.Opening) => {
      opening.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
      if (opening.parent) {
        opening.parent.removeChild(opening, true, true);
      }
    });

    if (
      parent instanceof HSCore.Model.Layer &&
      this.roof.parameters.roofType !== ENParamRoofType.Plane
    ) {
      parent.roomBuilder.build();
    }

    super.onCommit([]);
    return this.roof;
  }

  onUndo(): void {
    super.onUndo([]);
    this.roof.dirtyClipGeometry();
    this.roof.dirtyFaceMaterials();
  }

  getDescription(): string {
    return "删除参数化屋顶";
  }

  canTransactField(): boolean {
    return true;
  }
}