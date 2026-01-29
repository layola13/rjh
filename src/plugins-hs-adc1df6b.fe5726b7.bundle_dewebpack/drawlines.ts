import { HSApp } from './HSApp';
import { Line2d, Vector2 } from './geometry';
import { HSCore } from './HSCore';
import { Util } from './util';
import { Styles } from './styles';

interface SnapResult {
  indicateLines?: any[];
  offset?: { x: number; y: number };
}

interface Point2D {
  x: number;
  y: number;
}

interface PathRegion {
  paths: any[];
}

export class DrawLines extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExLinesWithAngle {
  private _isPathClosed: boolean | undefined;

  constructor(...args: any[]) {
    super(...args);
    this._isPathClosed = undefined;
  }

  get currentPathCurves(): Line2d[] {
    const curves: Line2d[] = [];
    for (let currentIndex = 1, previousIndex = 0; currentIndex < this._currentPath.length; previousIndex = currentIndex++) {
      curves.push(new Line2d(this._currentPath[previousIndex], this._currentPath[currentIndex]));
    }
    return curves;
  }

  protected _initInference(): void {
    this.inference = new HSApp.View.SVG.PointInference(this.context);
    this.inference.snapPixelOffset = 15;
  }

  getPenIndicatorStyle(): any {
    return this._isCurrentIntersect 
      ? Styles.intersectIndicatorStyle 
      : super.getPenIndicatorStyle();
  }

  protected _isCurrentStrokeIntersect(): boolean {
    return !!super._isCurrentStrokeIntersect() || !!Util.isPointInSideRootSlab(this.pos);
  }

  updateIntersectPath(): void {
    // Empty implementation
  }

  doSnapping(point: Point2D, snapTarget: any): SnapResult {
    const snapResult: SnapResult = {};
    
    if (this.inference.solve(point, snapResult, snapTarget)) {
      this.snappedLines = snapResult.indicateLines ?? [];
      if (snapResult.offset) {
        this.pos.x += snapResult.offset.x;
        this.pos.y += snapResult.offset.y;
      }
    } else {
      this.snappedLines = [];
    }
    
    return snapResult;
  }

  protected _updateInference(): void {
    const snapLines = this._getSnapLines();
    this.inference.setSnapLines(snapLines);
    this.inference.setCornerPoints(this._getSnapPoints());
  }

  protected _getSnapPoints(): Point2D[] {
    const referencePoints = HSCore.Util.ExtraordinarySketch2d.getReferencePoints(
      this.cmd.sketch2dBuilder.getSketch()
    );
    referencePoints.push(...Util.getRootSlabReferencePoints());
    return referencePoints;
  }

  protected _getSnapLines(): [Point2D, Point2D][] {
    let snapLines: [Point2D, Point2D][] = [];
    
    snapLines = snapLines.concat(this._getSlabSnapLines());
    snapLines = snapLines.concat(this._getOutdoorLayerSlabSnapLines());
    snapLines = snapLines.concat(this._getGuildLines());
    
    if (this._currentPath.length > 0) {
      const inferenceLines = this.inference.getSnapLines(this._currentPath);
      snapLines.push(...inferenceLines);
    }
    
    return snapLines;
  }

  protected _getGuildLines(): [Point2D, Point2D][] {
    const guideLines: [Point2D, Point2D][] = [];
    
    this._cmd.sketch2dBuilder.getSketch().guidelines.forEach((guideline: any) => {
      guideLines.push([guideline.fromAnchor, guideline.endAnchor]);
    });
    
    return guideLines;
  }

  protected _getSlabSnapLines(): [Point2D, Point2D][] {
    const slabLines: [Point2D, Point2D][] = [];
    
    HSCore.Doc.getDocManager()
      .activeDocument.scene.rootLayer.slabBuilder.getGlobalPaths()
      .forEach((path: any) => {
        path.outer.forEach((curve: any) => {
          if (curve.isLine()) {
            slabLines.push([curve.getStartPt(), curve.getEndPt()]);
          }
        });
      });
    
    return slabLines;
  }

  protected _getOutdoorLayerSlabSnapLines(): [Point2D, Point2D][] {
    let outdoorLines: [Point2D, Point2D][] = [];
    const outdoorLayer = HSCore.Doc.getDocManager().activeDocument.scene.outdoorLayer;
    
    HSCore.Util.Layer.getLayerProfileEdges(outdoorLayer).forEach((edge: any) => {
      const fromPoint = edge.from;
      const toPoint = edge.to;
      
      if (!new Vector2(fromPoint).equals(toPoint, Util.outdoorTolerance)) {
        outdoorLines.push([
          { x: fromPoint.x, y: fromPoint.y },
          { x: toPoint.x, y: toPoint.y }
        ]);
      }
      
      const inferenceLines = this.inference.getSnapLines([fromPoint]);
      outdoorLines = outdoorLines.concat(inferenceLines);
    });
    
    return outdoorLines;
  }

  addPoint(point: Point2D): void {
    this._isPreview = true;
    this._activeDimension = undefined;
    this._currentPath.push(point);
    this.tryToGenerateRegion();
    this._updateInference();
    this.dirtyGraph();
  }

  tryToGenerateRegion(): boolean {
    if (!this.isCurrentPathClosed()) {
      return false;
    }
    
    const closedRegions = Util.isClosedRegionsWithSlab(this.currentPathCurves);
    
    if (closedRegions.length === 0) {
      if (this._isPathClosed) {
        this._currentPath = this._currentPath.slice(-1);
      }
      return false;
    }
    
    this.cmd.onReceive('gizmo.completeSinglePath', {
      paths: closedRegions
    });
    
    this._currentPath = [];
    return true;
  }

  isCurrentPathClosed(): boolean {
    const currentPath = this._currentPath;
    this._isPathClosed = false;
    
    if (currentPath.length < 2) {
      return false;
    }
    
    if (currentPath[0].equals(currentPath[currentPath.length - 1])) {
      this._isPathClosed = true;
      return true;
    }
    
    const currentPos = this.pos;
    return !!(Util.isPointOnRootSlab(currentPos) || Util.isPointIntersectWithOuterLayerSlab(currentPos));
  }

  protected _completeCurrentPath(): void {
    this._currentPath = [];
    this.dirtyGraph();
  }

  updatePickPointDimension(): void {
    // Empty implementation
  }

  protected _getNormalTipKey(): string {
    return 'mixpaint_drawLine_tip';
  }
}