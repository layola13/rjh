import { HSApp } from './518193';
import { Line2d } from './815362';

interface Anchor {
  // Define anchor properties based on your application
}

interface Point2D {
  // Define point properties based on your application
}

interface Guideline {
  fromAnchor: Anchor;
  endAnchor: Anchor;
}

interface Curve {
  getStartPt(): Point2D;
  getEndPt(): Point2D;
}

interface Loop {
  getAllCurves(): Curve[];
}

interface DrawingRegion {
  outerLoop: Loop | null;
}

interface Sketch {
  guidelines: Guideline[];
}

interface RoofsDrawing {
  getSketch(): Sketch;
  drawingRegions: DrawingRegion[];
}

interface Layer {
  roofsDrawing: RoofsDrawing;
}

interface Scene {
  activeLayer: Layer;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

export class DrawLine extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExLinesWithAngle {
  constructor() {
    super();
  }

  protected _getCustomizedLines(): Array<[Anchor | Point2D, Anchor | Point2D]> {
    const activeLayer = HSApp.App.getApp().floorplan.scene.activeLayer;
    const lines: Array<[Anchor | Point2D, Anchor | Point2D]> = [];

    activeLayer.roofsDrawing.getSketch().guidelines.forEach((guideline) => {
      lines.push([guideline.fromAnchor, guideline.endAnchor]);
    });

    activeLayer.roofsDrawing.drawingRegions.forEach((region) => {
      const outerLoop = region.outerLoop;
      outerLoop?.getAllCurves().forEach((curve) => {
        if (curve instanceof Line2d) {
          lines.push([curve.getStartPt(), curve.getEndPt()]);
        }
      });
    });

    return lines;
  }

  public updatePickPointDimension(): void {
    // Implementation placeholder
  }
}