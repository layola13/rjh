import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

export class SplitSpaceRequest extends HSCore.Transaction.Common.StateRequest {
  private _layer: any;
  private _lines: any;
  private _floor: any;

  constructor(layer: any, lines: any, floor: any) {
    super();
    this._layer = layer;
    this._lines = lines;
    this._floor = floor;
  }

  onCommit(): void {
    if (this._layer === HSApp.App.getApp().floorplan.scene.outdoorLayer) {
      const outdoorFaces = Object.values(
        HSCore.Doc.getDocManager().activeDocument.scene.outdoorLayer.faces
      )
        .filter((face: any) => face instanceof HSCore.Model.Floor)
        .map((face: any) => face.worldRawPath2d);

      HSCore.Util.Slab.updateOutdoorLayerSlabsByCurves(
        [
          ...outdoorFaces,
          {
            outer: this._lines,
            holes: []
          }
        ],
        false
      );
    } else {
      new HSCore.Model.Geom.SplitHelper(this._layer).splitRegion(
        this._floor,
        this._lines
      );
    }

    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "划分空间数据";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SpaceOperation;
  }
}