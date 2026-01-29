import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface Region {
  topo: string;
}

export class DrawPolygonsRequest extends HSApp.ExtraordinarySketch2d.Request.ExDrawLinesRequest {
  private sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder;
  protected _regions: Region[];

  constructor(
    sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder,
    regions: Region[]
  ) {
    super(sketch2dBuilder, regions);
    this.sketch2dBuilder = sketch2dBuilder;
    
    this._regions.forEach((region: Region) => {
      region.topo = `-1_${HSCore.Model.LayerSketch2dBuilder.HoleTopoTag}`;
    });
  }

  doRequest(): void {
    super.doRequest();
    this.sketch2dBuilder.updateLayer();
  }
}