import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface CurveWrapper {
  curve: unknown;
}

interface Region {
  outer: CurveWrapper[];
  holes: CurveWrapper[][];
  topo: string;
}

interface InputRegion {
  outer: unknown[];
  holes: unknown[][];
}

export class DrawLineRequest extends HSApp.ExtraordinarySketch2d.Request.ExtraordinaryDrawRequest {
  private sketch2dBuilder: HSCore.Model.OutdoorDrawingSketch2dBuilder;
  private _regions: Region[];

  constructor(
    builder: HSCore.Model.OutdoorDrawingSketch2dBuilder,
    inputRegions: InputRegion[]
  ) {
    super(builder, []);

    this.sketch2dBuilder = builder;
    this._regions = inputRegions.map((region) => ({
      outer: region.outer.map((curve) => ({
        curve: curve
      })),
      holes: region.holes.map((hole) =>
        hole.map((curve) => ({
          curve: curve
        }))
      ),
      topo: `-1_${HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag}`
    }));
  }

  doRequest(): void {
    this.sketch2dBuilder.addRegions(this._regions);
    this.sketch2dBuilder.updateAppendix();
  }
}