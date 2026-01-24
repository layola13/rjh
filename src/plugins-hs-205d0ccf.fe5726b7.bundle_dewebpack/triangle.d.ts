import { Matrix } from 'svg.js';

/**
 * Triangle shape drawing options
 */
interface TriangleOptions {
  /** Width of the triangle in pixels */
  width: number;
  /** Height of the triangle in pixels */
  height: number;
  /** Position of the triangle */
  position: {
    x?: number;
    y?: number;
  };
  /** Rotation angle in radians */
  rotation?: number;
}

/**
 * SVG context interface for drawing operations
 */
interface SVGContext {
  polygon(points: string): SVGElement;
}

/**
 * SVG element interface with matrix transformation support
 */
interface SVGElement {
  fill(color: string): this;
  matrix(matrix: Matrix): this;
}

/**
 * Layer interface for managing child elements
 */
interface Layer {
  appendChild(element: SVGElement): void;
  hasChild(element: SVGElement): boolean;
}

/**
 * Triangle class for rendering triangular shapes in SVG
 * Extends the base HSApp.View.SVG.Temp class
 */
export class Triangle extends HSApp.View.SVG.Temp {
  private _options: TriangleOptions;
  
  /** The SVG polygon element representing the triangle */
  protected element?: SVGElement;
  
  /** The SVG context for drawing operations */
  protected context: SVGContext;
  
  /** The layer where the triangle is rendered */
  protected layer: Layer;
  
  /** The drawing element associated with this triangle */
  protected drawing?: SVGElement;

  /**
   * Creates a new Triangle instance
   * @param context - SVG drawing context
   * @param layer - Layer to render the triangle on
   * @param options - Configuration options for the triangle
   */
  constructor(context: SVGContext, layer: Layer, options: TriangleOptions) {
    super(context, layer, undefined, false);
    this._options = options;
  }

  /**
   * Renders the triangle on the SVG canvas
   * Converts pixel coordinates to meters and applies transformations
   */
  public onDraw(): void {
    const context = this.context;
    const PIXEL_TO_M_FACTOR = HSFPConstants.Constants.PIXEL_TO_M_FACTOR;

    if (!this.element) {
      const halfWidth = (this._options.width / 2) * PIXEL_TO_M_FACTOR;
      const halfHeight = (this._options.height / 2) * PIXEL_TO_M_FACTOR;

      // Create an isosceles triangle pointing right
      const points = `${-halfWidth}, ${-halfHeight} ${halfWidth}, 0 ${-halfWidth}, ${halfHeight}`;
      this.element = context.polygon(points).fill(
        HSFPConstants.Constants.ELEVATION_WALL_HOVOR_COLOR
      );

      // Apply position transformation
      const posX = (this._options.position.x ?? 0) * PIXEL_TO_M_FACTOR;
      const posY = -(this._options.position.y ?? 0) * PIXEL_TO_M_FACTOR;
      
      let transformMatrix = new Matrix().translate(posX, posY);
      
      // Apply rotation transformation (convert radians to degrees)
      const rotationDegrees = (180 * -(this._options.rotation ?? 0)) / Math.PI;
      transformMatrix = transformMatrix.rotate(rotationDegrees, 0, 0);
      
      this.element.matrix(transformMatrix);
      this.layer.appendChild(this.element);
    }

    // Ensure drawing element is attached to layer if it exists
    if (this.drawing && !this.layer.hasChild(this.drawing)) {
      this.layer.appendChild(this.drawing);
    }
  }
}