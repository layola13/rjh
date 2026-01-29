import { Vector2 } from './Vector2';
import { HSApp } from './HSApp';

interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
}

interface ScreenBound {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Entity {
  xSize: number;
  ySize: number;
  x: number;
  y: number;
  wallFace?: {
    surfaceObj: {
      getNormal(): Vector2;
    };
  };
}

interface SignalHook {
  listen(signal: unknown, callback: () => void): void;
}

interface Context {
  rect(width: number, height: number): SVGElement;
}

interface SVGElement {
  move(x: number, y: number): SVGElement;
  attr(attributes: Record<string, unknown>): SVGElement;
  remove(): void;
}

interface Layer {
  appendChild(element: SVGElement): void;
  removeChild(element: SVGElement): void;
}

interface GizmoOptions {
  signalFieldChanged: unknown;
}

export class WFASelectBound extends HSApp.View.Base.Gizmo {
  private element?: SVGElement;
  protected dirty: boolean = false;
  protected readonly entity: Entity;
  protected readonly context: Context;
  protected readonly layer: Layer;
  protected readonly signalHook: SignalHook;

  constructor(entity: Entity, context: Context, options: GizmoOptions) {
    super(entity, context, options);
    
    this.signalHook.listen(options.signalFieldChanged, () => {
      this.dirty = true;
    });
  }

  public draw(): void {
    super.draw();
    
    const bound = this._getBound();
    const screenBound = this._boundToScreen(bound);
    
    if (!this.element) {
      this.element = this.context
        .rect(screenBound.width, screenBound.height)
        .move(screenBound.left, screenBound.top)
        .attr({
          stroke: HSApp.View.SVG.Constants.COLOR_CONTENT_STROKE_SELECTED,
          'stroke-width': 2,
          'fill-opacity': 1,
          'pointer-events': 'none',
          'vector-effect': 'non-scaling-stroke'
        });
      
      this.layer.appendChild(this.element);
    }
    
    const centerX = screenBound.left + 0.5 * screenBound.width;
    const centerY = screenBound.top + 0.5 * screenBound.height;
    const transform = new HSApp.View.SVG.Matrix().rotate(bound.rotation, centerX, centerY);
    
    this.element.attr({
      x: screenBound.left,
      y: screenBound.top,
      width: screenBound.width,
      height: screenBound.height,
      transform
    });
  }

  public onCleanup(): void {
    if (this.element) {
      this.layer.removeChild(this.element);
      this.element.remove();
      this.element = undefined;
    }
    
    super.onCleanup();
  }

  private _getBound(): Bound {
    const width = this.entity.xSize;
    const height = this.entity.ySize;
    const left = this.entity.x - width / 2;
    const top = this.entity.y - height / 2;
    
    let rotation = 0;
    
    if (this.entity.wallFace) {
      const normal = this.entity.wallFace.surfaceObj.getNormal();
      rotation = (180 * -Vector2.Y(-1).angleTo(normal)) / Math.PI;
    }
    
    return {
      left,
      top,
      width,
      height,
      rotation
    };
  }

  private _boundToScreen(bound: Bound): ScreenBound {
    const topLeft = HSApp.View.SVG.Util.ModelPointToCanvas([
      bound.left,
      bound.top + bound.height
    ]);
    
    const bottomRight = HSApp.View.SVG.Util.ModelPointToCanvas([
      bound.left + bound.width,
      bound.top
    ]);
    
    return {
      left: topLeft[0],
      top: topLeft[1],
      width: bottomRight[0] - topLeft[0],
      height: bottomRight[1] - topLeft[1]
    };
  }
}