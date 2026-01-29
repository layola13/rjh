import { HSApp } from './HSApp';
import { Loop, Vector2, MathAlg } from './MathTypes';
import { outdoorTolerance } from './Constants';

interface PositionNearResult {
  to: { x: number; y: number };
}

interface SketchRegion {
  outer: unknown;
}

interface SketchBackground {
  regions: SketchRegion[];
}

interface Sketch {
  background: SketchBackground;
}

interface SketchBuilder {
  getSketch(): Sketch;
}

interface PositionDimension {
  hide(): void;
  draw(): void;
}

export class Line2dDimension extends HSApp.ExtraordinarySketch2d.Gizmo.Line2dDimension {
  protected positionNearResult: PositionNearResult | null = null;
  protected sketchBuilder!: SketchBuilder;
  protected positionDimension!: PositionDimension;

  /**
   * Updates the position dimension based on the provided parameter
   * @param parameter - The parameter used to update the dimension
   */
  protected _updatePositionDimension(parameter: unknown): void {
    super._updatePositionDimension(parameter);

    if (!this.positionNearResult) {
      return;
    }

    const sketch = this.sketchBuilder.getSketch();
    
    if (sketch.background.regions.length === 0) {
      return;
    }

    const outerLoop = new Loop(sketch.background.regions[0].outer);
    const targetPoint = new Vector2(this.positionNearResult.to);
    const positionResult = MathAlg.PositionJudge.ptToLoop(
      targetPoint,
      outerLoop,
      outdoorTolerance
    );

    if (positionResult.type !== MathAlg.PtLoopPositonType.IN) {
      this.positionDimension.hide();
      this.positionDimension.draw();
    }
  }
}