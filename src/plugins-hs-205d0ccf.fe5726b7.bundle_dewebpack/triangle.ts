import { View } from './View';
import { Matrix } from './Matrix';

interface TriangleOptions {
  width: number;
  height: number;
  position: {
    x?: number;
    y?: number;
  };
  rotation?: number;
}

interface Context {
  polygon(points: string): SVGElement;
}

interface SVGElement {
  fill(color: string): SVGElement;
  matrix(matrix: Matrix): void;
}

interface Layer {
  appendChild(element: SVGElement): void;
  hasChild(element: SVGElement): boolean;
}

const PIXEL_TO_M_FACTOR = HSFPConstants.Constants.PIXEL_TO_M_FACTOR;
const ELEVATION_WALL_HOVER_COLOR = HSFPConstants.Constants.ELEVATION_WALL_HOVOR_COLOR;

export class Triangle extends HSApp.View.SVG.Temp {
  private _options: TriangleOptions;
  protected element?: SVGElement;
  protected context: Context;
  protected layer: Layer;
  protected drawing?: SVGElement;

  constructor(
    context: Context,
    layer: Layer,
    options: TriangleOptions
  ) {
    super(context, layer, undefined, false);
    this._options = options;
  }

  onDraw(): void {
    const context = this.context;
    const pixelToMeterFactor = PIXEL_TO_M_FACTOR;

    if (!this.element) {
      const halfWidth = (this._options.width / 2) * pixelToMeterFactor;
      const halfHeight = (this._options.height / 2) * pixelToMeterFactor;

      this.element = context
        .polygon(`${-halfWidth}, ${-halfHeight} ${halfWidth}, 0 ${-halfWidth}, ${halfHeight}`)
        .fill(ELEVATION_WALL_HOVER_COLOR);

      const posX = (this._options.position.x ?? 0) * pixelToMeterFactor;
      const posY = -(this._options.position.y ?? 0) * pixelToMeterFactor;

      let transformMatrix = new Matrix().translate(posX, posY);
      const rotationDegrees = (180 * -(this._options.rotation ?? 0)) / Math.PI;
      transformMatrix = transformMatrix.rotate(rotationDegrees, 0, 0);

      this.element.matrix(transformMatrix);
      this.layer.appendChild(this.element);
    }

    if (this.drawing && !this.layer.hasChild(this.drawing)) {
      this.layer.appendChild(this.drawing);
    }
  }
}