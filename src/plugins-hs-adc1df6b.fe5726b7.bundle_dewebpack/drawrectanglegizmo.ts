import { HSApp } from './HSApp';
import { Line2d } from './Line2d';

interface Point2D {
  x: number;
  y: number;
}

interface PathStyle {
  'stroke-dasharray': string;
  'vector-effect': string;
  'stroke-width': number;
  'stroke-opacity': number;
  stroke: string;
  fill: string;
  opacity: number;
  'pointer-events': string;
}

interface SVGPathElement {
  attr(attrs: Record<string, string | number>): void;
  show(): void;
  hide(): void;
  remove(): void;
}

interface DrawContext {
  path(pathData: string): SVGPathElement;
}

interface Anchor {
  x: number;
  y: number;
}

interface Guideline {
  fromAnchor: Anchor;
  endAnchor: Anchor;
}

export class DrawRectangleGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRectangleGizmo {
  private strokeLine?: SVGPathElement;
  protected path: Point2D[];
  protected context: DrawContext;
  protected styles: { pathStyle: PathStyle };

  constructor(
    firstParam: unknown,
    secondParam: unknown,
    thirdParam: unknown
  ) {
    super(firstParam, secondParam, thirdParam);
    
    this.strokeLine = undefined;
    this.styles.pathStyle = {
      'stroke-dasharray': 'none',
      'vector-effect': 'non-scaling-stroke',
      'stroke-width': 1,
      'stroke-opacity': 1,
      stroke: '#000000',
      fill: '#6211ff',
      opacity: 0.1,
      'pointer-events': 'none'
    };
  }

  onDraw(): void {
    super.onDraw();
    
    if (this.strokeLine) {
      this.updateStrokeLine();
    } else {
      const pathElement = this.context.path('').attr({
        stroke: '#5f5f5f',
        'vector-effect': 'non-scaling-stroke',
        'pointer-events': 'none'
      });
      this.strokeLine = pathElement;
    }
  }

  updateStrokeLine(): void {
    if (this.path.length === 2) {
      const rectanglePath = this._getPathsSvg([
        [
          { x: this.path[1].x, y: this.path[0].y },
          { x: this.path[1].x, y: this.path[1].y },
          { x: this.path[0].x, y: this.path[1].y }
        ]
      ]);
      
      if (rectanglePath && rectanglePath !== '') {
        this.strokeLine?.attr({ d: rectanglePath });
        this.strokeLine?.show();
      } else {
        this.strokeLine?.hide();
      }
    } else {
      this.strokeLine?.hide();
    }
  }

  getInferenceGuideLines(param: unknown): Array<[Anchor, Anchor]> {
    const activeLayer = HSApp.App.getApp().floorplan.scene.activeLayer;
    const guideLines: Array<[Anchor, Anchor]> = [];
    
    activeLayer.roofsDrawing.getSketch().guidelines.forEach((guideline: Guideline) => {
      guideLines.push([guideline.fromAnchor, guideline.endAnchor]);
    });
    
    return guideLines;
  }

  onCleanup(): void {
    if (this.strokeLine) {
      this.strokeLine.remove();
      this.strokeLine = undefined;
    }
    super.onCleanup();
  }

  onESC(): void {
    super.onESC();
    this.dirtyGraph();
  }

  getConstructInferenceLines(): Array<[Point2D, Point2D]> {
    const inferenceLines = HSApp.ExtraordinarySketch2d.Util.getConstructWithHolesInferenceLines();
    
    const activeLayer = HSApp.App.getApp().floorplan.scene.activeLayer;
    activeLayer.roofsDrawing.drawingRegions.forEach((region: { outerLoop: any }) => {
      const outerLoop = region.outerLoop;
      
      outerLoop?.getAllCurves().forEach((curve: unknown) => {
        if (curve instanceof Line2d) {
          inferenceLines.push([curve.getStartPt(), curve.getEndPt()]);
        }
      });
    });
    
    return inferenceLines;
  }

  protected _getNormalTipKey(): string {
    return 'mixpaint_drawRegion_tip';
  }

  protected _getPathsSvg(paths: Point2D[][]): string {
    // Implementation delegated to parent class
    return '';
  }

  protected dirtyGraph(): void {
    // Implementation delegated to parent class or context
  }
}