import { Vector2 } from './Vector2';
import { HSConstants } from './constants';

interface DisplayObject {
  entity: Entity;
}

interface Entity {
  _Class: string;
  XSize: number;
  YSize: number;
  x: number;
  y: number;
  rotation: number;
  flip: number;
}

interface ColorConfig {
  strokeColor: string;
  fillColor: string;
  strokeDashArray: string;
  fillOpacity?: number;
}

interface BaseSize {
  width: number;
  height: number;
}

interface SVGAttributes {
  stroke?: string;
  'stroke-width'?: number;
  'stroke-linejoin'?: string;
  fill?: string | { color: string; opacity: number };
  'fill-opacity'?: number;
  opacity?: number;
  'stroke-opacity'?: number;
  'stroke-dasharray'?: string;
  'pointer-events'?: string;
  transform?: Matrix;
  x?: number;
  y?: number;
  width?: string | number;
  height?: string | number;
}

interface SVGElement {
  attr(attributes: SVGAttributes): SVGElement;
  fill(config: SVGAttributes | string): SVGElement;
  show(): SVGElement;
  hide(): SVGElement;
  center(x: number, y: number): SVGElement;
  appendChild(child: SVGElement, zIndex: number): void;
  removeAllChildren(): void;
  children(): SVGElement[];
}

interface Layer {
  removeChild(element: SVGElement): void;
  appendChild(element: SVGElement, zIndex: number): void;
}

interface Context {
  group(): SVGElement;
  rect(width: number, height: number): SVGElement;
  circle(diameter: number): SVGElement;
  path(pathData: string): SVGElement;
  polyline(points: string): SVGElement;
}

interface Matrix {
  rotate(angle: number, cx: number, cy: number): Matrix;
  translate(tx: number, ty: number): Matrix;
  scale(sx: number, sy: number, cx?: number, cy?: number): Matrix;
  multiply(matrix: Matrix): Matrix;
}

interface Point {
  x: number;
  y: number;
}

interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

declare const HSApp: {
  View: {
    Base: {
      Gizmo: new (context: Context, layer: Layer, displayObj: DisplayObject) => void;
    };
    SVG: {
      Util: {
        buildSVGContentGlobalBound(entity: Entity): Bounds;
        ModelPointToCanvas(entityOrPoint: Entity | Vector2): Point;
        ModelLengthToCanvas(length: number): number;
      };
    };
  };
};

declare const SVG: {
  Matrix: new () => Matrix;
};

export default class CustomGizmo extends HSApp.View.Base.Gizmo {
  private displayObj: DisplayObject;
  private color: ColorConfig;
  private _borderElements: SVGElement[];
  private _borderFillElements: SVGElement[];
  private _baseSize: BaseSize;
  private _node: SVGElement;

  constructor(
    context: Context,
    layer: Layer,
    displayObj: DisplayObject,
    color: ColorConfig
  ) {
    super(context, layer, displayObj.entity);
    this.displayObj = displayObj;
    this.color = color;
    this._borderElements = [];
    this._borderFillElements = [];
    this._baseSize = {
      width: 100,
      height: 100
    };
    this._node = this.context.group();
  }

  onCleanup(): void {
    if (this.layer && (this._borderElements.length > 0 || this._borderFillElements.length > 0)) {
      this._borderElements.forEach((element) => {
        this.layer.removeChild(element);
      });
      this._borderFillElements.forEach((element) => {
        this.layer.removeChild(element);
      });
      this._borderElements = [];
      this._borderFillElements = [];
      this._node.removeAllChildren();
      this.layer.removeChild(this._node);
    }
  }

  draw(): void {
    if (this._node.children().length === 0) {
      this.addSVGIcon();
    }
  }

  show(): void {
    this._node.show();
    super.show();
  }

  hide(): void {
    this._node.hide();
    super.hide();
  }

  addSVGIcon(): void {
    const strokeAttributes: SVGAttributes = {
      stroke: this.color.strokeColor,
      'stroke-width': 1,
      'stroke-linejoin': 'round',
      fill: this.color.fillColor,
      'fill-opacity': 1,
      'stroke-dasharray': this.color.strokeDashArray,
      'pointer-events': 'none'
    };

    const fillAttributes: SVGAttributes = {
      'fill-opacity': this.color.fillOpacity ?? 0.7,
      opacity: this.color.fillOpacity ?? 1,
      'stroke-opacity': 0,
      fill: this.color.fillColor,
      'pointer-events': 'none'
    };

    switch (this.displayObj.entity._Class) {
      case HSConstants.ModelClass.NCustomizedSquareColumn:
        this._baseSize.width = 27;
        this._baseSize.height = 27;
        this.squareColumn(strokeAttributes, fillAttributes);
        this.layer.appendChild(this._node, 100);
        break;

      case HSConstants.ModelClass.NCustomizedCircleColumn:
        this._baseSize.width = 27;
        this._baseSize.height = 27;
        this.circleColumn(strokeAttributes, fillAttributes);
        this.layer.appendChild(this._node, 100);
        break;

      case HSConstants.ModelClass.NCustomizedFlue:
        this._baseSize.width = 52;
        this._baseSize.height = 70;
        this.flue(strokeAttributes, fillAttributes);
        this.layer.appendChild(this._node, 100);
        break;

      case HSConstants.ModelClass.NCustomizedRiser:
        this._baseSize.width = 51;
        this._baseSize.height = 69;
        this.riser(strokeAttributes, fillAttributes);
        this.layer.appendChild(this._node, 100);
        break;

      default:
        this.content(strokeAttributes, fillAttributes);
        this.layer.appendChild(this._node, 100);
    }
  }

  squareColumn(strokeAttributes: SVGAttributes, fillAttributes: SVGAttributes): void {
    if (this.displayObj.entity) {
      if (this._borderElements.length === 0 && this._borderFillElements.length === 0) {
        const rect = this.context
          .rect(this._baseSize.width, this._baseSize.height)
          .attr(strokeAttributes)
          .fill(fillAttributes)
          .show();
        this._borderFillElements.push(rect);
        this._node.appendChild(rect, 100);
      }

      const transform = this._worldMatrix();
      this._node.attr({ transform });
    }
  }

  circleColumn(strokeAttributes: SVGAttributes, fillAttributes: SVGAttributes): void {
    if (this.displayObj.entity) {
      if (this._borderElements.length === 0 && this._borderFillElements.length === 0) {
        const circle = this.context
          .circle(this._baseSize.width)
          .center(this._baseSize.width / 2, this._baseSize.width / 2)
          .attr(strokeAttributes)
          .fill(fillAttributes)
          .show();
        this._borderFillElements.push(circle);
        this._node.appendChild(circle, 100);
      }

      const transform = this._worldMatrix();
      this._node.attr({ transform });
    }
  }

  flue(strokeAttributes: SVGAttributes, fillAttributes: SVGAttributes): void {
    if (this.displayObj.entity) {
      if (this._borderElements.length === 0 && this._borderFillElements.length === 0) {
        const outerPath = this.context
          .path('M52, 0 L52, 70 L0, 70 L0, 0 L52, 0 Z M14, 14 L14, 57 L39, 57 L39, 14 L14, 14 Z')
          .attr(strokeAttributes)
          .fill(fillAttributes)
          .show();

        const innerPath = this.context
          .path('M14, 14 L14, 57 L39, 57 L39, 14 L14, 14 Z')
          .attr(strokeAttributes)
          .fill({ color: '#fff', opacity: 0 })
          .show();

        const polyline = this.context
          .polyline('14 56 23.1371507 24.215579 38.5739014 14')
          .attr(strokeAttributes)
          .fill({ color: '#fff', opacity: 0 })
          .show();

        this._borderFillElements.push(outerPath);
        this._borderElements.push(innerPath);
        this._borderElements.push(polyline);

        const group = this.context.group().attr({
          width: '52px',
          height: '70px'
        });

        group.appendChild(outerPath, 100);
        group.appendChild(innerPath, 101);
        group.appendChild(polyline, 102);
        this._node.appendChild(group, 100);
      }

      const transform = this._worldMatrix();
      this._node.attr({ transform });
    }
  }

  riser(strokeAttributes: SVGAttributes, fillAttributes: SVGAttributes): void {
    if (this.displayObj.entity) {
      if (this._borderElements.length === 0 && this._borderFillElements.length === 0) {
        const outerPath = this.context
          .path('M51, 0 L51, 69 L0, 69 L0, 0 L51, 0 Z M13, 13 L13, 56 L38, 56 L38, 13 L13, 13 Z')
          .attr(strokeAttributes)
          .fill(fillAttributes)
          .show();

        const innerPath = this.context
          .path('M13, 13 L13, 56 L38, 56 L38, 13 L13, 13 Z')
          .attr(strokeAttributes)
          .fill({ color: '#fff', opacity: 0 })
          .show();

        this._borderFillElements.push(outerPath);
        this._borderElements.push(innerPath);

        const group = this.context.group().attr({
          width: '51px',
          height: '69px'
        });

        group.appendChild(outerPath, 100);
        group.appendChild(innerPath, 100);
        this._node.appendChild(group, 100);
      }

      const transform = this._worldMatrix();
      this._node.attr({ transform });
    }
  }

  content(strokeAttributes: SVGAttributes, fillAttributes: SVGAttributes): void {
    if (this.displayObj.entity) {
      const bounds = HSApp.View.SVG.Util.buildSVGContentGlobalBound(this.displayObj.entity);

      if (this._borderElements.length === 0 && this._borderFillElements.length === 0) {
        const rect = this.context
          .rect(bounds.width, bounds.height)
          .attr(strokeAttributes)
          .fill(fillAttributes)
          .show();

        this._applyTransform(rect, bounds);
        this._borderFillElements.push(rect);
        this._node.appendChild(rect, 100);
      }
    }
  }

  private _applyTransform(element: SVGElement, bounds: Bounds): void {
    if (bounds) {
      const canvasPoint = HSApp.View.SVG.Util.ModelPointToCanvas(this.displayObj.entity);
      const flipScale = this.displayObj.entity.flip === 0 ? 1 : -1;

      element.attr({
        x: bounds.left,
        y: bounds.top,
        width: bounds.width,
        height: bounds.height
      });

      const matrix = new SVG.Matrix()
        .rotate(this.displayObj.entity.rotation, canvasPoint.x, canvasPoint.y)
        .translate(2 * this.displayObj.entity.flip * canvasPoint.x, 0)
        .scale(flipScale, 1, 0, 0);

      element.attr({ transform: matrix });
    }
  }

  private _worldMatrix(): Matrix {
    const entityXSize = this.displayObj.entity.XSize;
    const entityYSize = this.displayObj.entity.YSize;
    const canvasWidth = HSApp.View.SVG.Util.ModelLengthToCanvas(entityXSize);
    const canvasHeight = HSApp.View.SVG.Util.ModelLengthToCanvas(entityYSize);

    const modelPoint = new Vector2({
      x: this.displayObj.entity.x,
      y: this.displayObj.entity.y
    });
    const canvasPoint = HSApp.View.SVG.Util.ModelPointToCanvas(modelPoint);

    const rotationMatrix = new SVG.Matrix().rotate(
      this.displayObj.entity.rotation,
      canvasWidth / 2,
      canvasHeight / 2
    );

    const translationMatrix = new SVG.Matrix().translate(
      canvasPoint.x - canvasWidth / 2,
      canvasPoint.y - canvasHeight / 2
    );

    const scaleMatrix = new SVG.Matrix().scale(
      canvasWidth / this._baseSize.width,
      canvasHeight / this._baseSize.height
    );

    return translationMatrix.multiply(rotationMatrix).multiply(scaleMatrix);
  }
}