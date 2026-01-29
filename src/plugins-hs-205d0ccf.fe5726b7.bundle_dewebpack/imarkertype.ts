import { Vector2 } from './Vector2';

export enum IMarkerType {
  Dimension = "dimensionMarker",
  DimensionShadow = "dimensionShadowMarker"
}

interface SvgPoint {
  x: number;
  y: number;
}

interface MarkerContext {
  node: {
    id: string;
    getElementById(id: string): { instance: any } | null;
  };
  defs(): {
    marker(width: number, height: number, callback: (element: any) => void): any;
  };
  getScaleFactor(): number;
}

interface Curve {
  getStartPt(): any;
  getMidPt(): any;
  getLength(): number;
}

interface MarkerAttributes {
  x?: number;
  y?: number;
  transform?: any;
}

function toSvgPoint(point: any): SvgPoint {
  return { x: point.x, y: point.y };
}

class Matrix {
  scale(scaleX: number, scaleY: number, centerX: number, centerY: number): this {
    return this;
  }
  
  translate(x: number, y: number): this {
    return this;
  }
}

export class MarkerItem {
  private context: MarkerContext;
  private node: any;

  constructor(context: MarkerContext, markerType: IMarkerType = IMarkerType.Dimension) {
    this.context = context;
    this.node = undefined;

    const markerId = markerType + context.node.id;
    const existingMarker = context.node.getElementById(markerId);

    if (existingMarker) {
      this.node = existingMarker.instance;
    } else {
      const isDimensionType = markerType === IMarkerType.Dimension;
      const scale = isDimensionType ? 1 : 0.6;
      const strokeColor = isDimensionType ? "#60646F" : "#f3f3f3";
      const center: SvgPoint = { x: 8, y: 8 };
      const verticalLength = 8 * scale;
      const diagonalLength = 4 * scale;
      const angleInRadians = 40 / 180 * Math.PI;
      const diagonalOffsetY = Math.sin(angleInRadians) * diagonalLength;
      const diagonalOffsetX = Math.cos(angleInRadians) * diagonalLength;
      
      const pathData = `M8, ${center.x - verticalLength} L8, ${center.x + verticalLength} M${center.x - diagonalOffsetY}, ${center.y - diagonalOffsetX} L${center.x + diagonalOffsetY}, ${center.y + diagonalOffsetX}`;

      this.node = context.defs().marker(16, 16, (element: any) => {
        element.path(pathData).stroke(strokeColor);
      });
      
      this.node.id(markerId);
    }
  }

  setCurve(curve: Curve): void {
    const points = [curve.getStartPt(), curve.getMidPt()].map(toSvgPoint);
    const startPoint = points[0];
    const midPoint = points[1];
    
    let angleInDegrees = Vector2.X().angleTo(
      new Vector2(midPoint.x - startPoint.x, midPoint.y - startPoint.y)
    ) / Math.PI * 180;
    
    if (angleInDegrees > 90 && angleInDegrees < 270) {
      angleInDegrees += 180;
    }

    const inverseScale = 1 / this.context.getScaleFactor();
    const transform = new Matrix()
      .scale(inverseScale, inverseScale, midPoint.x, midPoint.y)
      .translate(0, -16);

    this.attr({
      x: midPoint.x,
      y: midPoint.y,
      transform: transform
    });

    const lengthInMillimeters = (1000 * curve.getLength()).toFixed();
    this.node.text(lengthInMillimeters);
  }

  getNode(): any {
    return this.node;
  }

  attr(attributes: MarkerAttributes): this {
    this.node.attr(attributes);
    return this;
  }

  show(): void {
    this.node.show();
  }

  hide(): void {
    this.node.hide();
  }

  dispose(): void {
    this.node.remove();
  }
}