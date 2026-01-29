import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface ExCurve {
  curve: any;
  topo: string;
}

interface Region {
  outer: ExCurve[];
  holes: ExCurve[][];
  topo: string;
}

interface DrawRegionsAppendix {
  drawRegions: Region[];
}

/**
 * Base class for drawing requests in 2D sketch
 */
export class BaseDrawRequest extends HSApp.ExtraordinarySketch2d.Request.ExtraordinaryDrawRequest {
  protected _curves: ExCurve[];
  protected sketch2dBuilder: HSCore.Model.OutdoorDrawingSketch2dBuilder;

  /**
   * Execute the draw request
   */
  doRequest(): void {
    const regions: Region[] = [{
      outer: this._curves,
      holes: [],
      topo: `-1_${HSCore.Model.OutdoorDrawingSketch2dBuilder.DrawFaceTopoTag}`
    }];

    const clonedRegions: Region[] = regions.map((region) => ({
      outer: region.outer.map((exCurve) => this._cloneExCurve(exCurve)),
      holes: region.holes.map((hole) => 
        hole.map((exCurve) => this._cloneExCurve(exCurve))
      ),
      topo: region.topo
    }));

    this.sketch2dBuilder.addRegions(regions);
    this.sketch2dBuilder.updateAppendix({
      drawRegions: clonedRegions
    });
  }

  /**
   * Clone an extended curve object
   */
  protected _cloneExCurve(exCurve: ExCurve): ExCurve {
    return {
      curve: exCurve.curve.clone(),
      topo: exCurve.topo
    };
  }
}

/**
 * Request for drawing rectangles
 */
export class DrawRectangleRequest extends BaseDrawRequest {}

/**
 * Request for drawing circles
 */
export class DrawCircleRequest extends BaseDrawRequest {}

/**
 * Request for drawing regular polygons
 */
export class DrawRegularPolygonRequest extends BaseDrawRequest {}