import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface Region {
  topo: string;
}

export class DrawPolygonsRequest extends HSApp.ExtraordinarySketch2d.Request.ExDrawLinesRequest {
  sketch2dBuilder: HSCore.Model.OutdoorDrawingSketch2dBuilder;
  protected _regions: Region[];

  constructor(
    sketch2dBuilder: HSCore.Model.OutdoorDrawingSketch2dBuilder,
    regions: Region[]
  ) {
    super(sketch2dBuilder, regions);
    
    this.sketch2dBuilder = sketch2dBuilder;
    
    this._regions.forEach((region: Region) => {
      region.topo = `-1_${HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag}`;
    });
  }

  doRequest(): void {
    super.doRequest([]);
    this.sketch2dBuilder.updateAppendix();
  }
}