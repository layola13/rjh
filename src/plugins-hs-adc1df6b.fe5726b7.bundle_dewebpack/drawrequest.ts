import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface Region {
  outer: any[];
  holes: any[];
  topo: string;
}

interface Sketch {
  faces: any[];
}

interface Sketch2dBuilder {
  addRegions(regions: Region[]): void;
  updateAppendix(): void;
  getSketch(): Sketch;
}

interface RoofsDrawing {
  addChild(child: HSCore.Model.RoofDrawingRegion): void;
}

interface ActiveLayer {
  roofsDrawing?: RoofsDrawing;
}

interface Scene {
  activeLayer: ActiveLayer;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

export class DrawRequest extends HSApp.ExtraordinarySketch2d.Request.ExtraordinaryDrawRequest {
  private sketch2dBuilder: Sketch2dBuilder;
  protected _curves: any[];

  constructor(sketch2dBuilder: Sketch2dBuilder, curves: any[]) {
    super(sketch2dBuilder, curves);
    this.sketch2dBuilder = sketch2dBuilder;
  }

  public doRequest(): void {
    const regions: Region[] = [{
      outer: this._curves,
      holes: [],
      topo: `-1_${HSCore.Model.RoofsDrawingSketch2dBuilder.RegionTopoTag}`
    }];

    this.sketch2dBuilder.addRegions(regions);
    this.sketch2dBuilder.updateAppendix();
    this._addRoofDrawingRegion();
  }

  private _addRoofDrawingRegion(): void {
    const sketch = this.sketch2dBuilder.getSketch();
    
    if (sketch.faces.length === 1) {
      const roofDrawingRegion = new HSCore.Model.RoofDrawingRegion();
      roofDrawingRegion.setSketch({ ...sketch });

      const app: App = HSApp.App.getApp();
      const roofsDrawing = app.floorplan.scene.activeLayer.roofsDrawing;
      
      if (roofsDrawing) {
        roofsDrawing.addChild(roofDrawingRegion);
      }
    }
  }
}