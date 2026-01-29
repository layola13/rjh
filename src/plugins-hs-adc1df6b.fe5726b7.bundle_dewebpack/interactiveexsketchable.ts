import { HSCore } from './HSCore';

interface SketchData {
  background: any;
  faces: any[];
  guidelines: any[];
}

export class InteractiveExSketchable {
  private _sketchData: SketchData;

  constructor() {
    this._sketchData = {
      background: HSCore.Model.RoofsDrawingSketch2dBuilder.createSuperLargeBackground(),
      faces: [],
      guidelines: []
    };
  }

  getSketch(): SketchData {
    return this._sketchData;
  }

  setSketch(sketch: SketchData): void {
    this._sketchData = sketch;
  }

  updateSketch(partialSketch: Partial<SketchData>): void {
    this._sketchData = {
      ...this._sketchData,
      ...partialSketch
    };
  }
}