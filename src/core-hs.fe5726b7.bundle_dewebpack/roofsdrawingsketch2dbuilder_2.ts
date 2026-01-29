import { Loop } from './Loop';
import { ExtraordinarySketch2dBuilder } from './ExtraordinarySketch2dBuilder';
import { ExtraordinaryBackground } from './ExtraordinaryBackground';

interface Point2D {
  x: number;
  y: number;
}

interface BoundaryData {
  outer: unknown[];
  holes: unknown[];
}

export class RoofsDrawingSketch2dBuilder extends ExtraordinarySketch2dBuilder {
  static readonly RegionTopoTag: string = "region";

  public updateAppendix(): void {
    this._completeUpdate();
  }

  private _completeUpdate(): void {
    if (this._sketch2d) {
      this._sketch2d.faces = this._sketch2d.faces.filter((face) =>
        face.topos.includes(RoofsDrawingSketch2dBuilder.RegionTopoTag)
      );
      this.updateSketch2d(this._sketch2d);
    }
  }

  static createSuperLargeBackground(): ExtraordinaryBackground {
    const BOUNDARY_SIZE = 10000;
    
    const vertices: Point2D[] = [
      { x: -BOUNDARY_SIZE, y: BOUNDARY_SIZE },
      { x: -BOUNDARY_SIZE, y: -BOUNDARY_SIZE },
      { x: BOUNDARY_SIZE, y: -BOUNDARY_SIZE },
      { x: BOUNDARY_SIZE, y: BOUNDARY_SIZE }
    ];

    const boundaryData: BoundaryData = {
      outer: new Loop(vertices).getAllCurves(),
      holes: []
    };

    return new ExtraordinaryBackground([boundaryData]);
  }
}