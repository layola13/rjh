import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

/**
 * Region data structure for sketch operations
 */
interface IRegion {
  outer: any[];
  holes: any[];
  topo: string;
}

/**
 * Base class for slab editing draw requests
 */
export class SlabEditDrawRequest extends HSApp.ExtraordinarySketch2d.Request.ExtraordinaryDrawRequest {
  protected sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder;
  protected _curves: any[];

  constructor(sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder, curves: any[]) {
    super(sketch2dBuilder, curves);
    this.sketch2dBuilder = sketch2dBuilder;
  }

  /**
   * Execute the draw request by adding regions and updating the layer
   */
  doRequest(): void {
    const regions: IRegion[] = [
      {
        outer: this._curves,
        holes: [],
        topo: `-1_${HSCore.Model.LayerSketch2dBuilder.HoleTopoTag}`
      }
    ];
    
    this.sketch2dBuilder.addRegions(regions);
    this.sketch2dBuilder.updateLayer();
  }
}

/**
 * Request for drawing rectangle shapes
 */
export class DrawRectangleRequest extends SlabEditDrawRequest {
  constructor(sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder, curves: any[]) {
    super(sketch2dBuilder, curves);
  }
}

/**
 * Request for drawing circle shapes
 */
export class DrawCircleRequest extends SlabEditDrawRequest {
  constructor(sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder, curves: any[]) {
    super(sketch2dBuilder, curves);
  }
}

/**
 * Request for drawing regular polygon shapes
 */
export class DrawRegularPolygonRequest extends SlabEditDrawRequest {
  constructor(sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder, curves: any[]) {
    super(sketch2dBuilder, curves);
  }
}