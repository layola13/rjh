import { Line2d } from './Line2d';
import { Circle2d } from './Circle2d';
import { CircleArc2d } from './CircleArc2d';
import { Logger } from './Logger';

interface Point2D {
  x: number;
  y: number;
}

interface Curve2D {
  // Base interface for 2D curves
}

interface Wire {
  curves: Curve2D[];
}

interface Face2D {
  id: string;
  ID: string;
  getWires(): Wire[];
}

interface Sketch {
  faces: Face2D[];
  getExtrusionValue(faceId: string): number | null;
}

interface EncodedSketchFace {
  face2d: Face2D;
  value: number;
  id: string;
}

export class SketchEncoder {
  private static _instance: SketchEncoder | null = null;
  private readonly _MINEXTRUSION: number = 0;

  private constructor() {}

  /**
   * Gets the singleton instance of SketchEncoder
   */
  static getInstance(): SketchEncoder {
    if (!this._instance) {
      this._instance = new SketchEncoder();
    }
    return this._instance;
  }

  /**
   * Generates encoded representations for all faces in a sketch
   */
  generateEncodedSketchFaces(sketch: Sketch): EncodedSketchFace[] {
    const encodedFaces: EncodedSketchFace[] = [];
    const faces = sketch.faces;

    for (const face of faces) {
      const extrusionValue = sketch.getExtrusionValue(face.ID) ?? this._MINEXTRUSION;
      const encodedId = this.encodeSketchFace(face, extrusionValue);
      
      encodedFaces.push({
        face2d: face,
        value: extrusionValue,
        id: encodedId
      });
    }

    return encodedFaces;
  }

  /**
   * Encodes a sketch face with its extrusion value
   */
  encodeSketchFace(face: Face2D, extrusionValue: number): string {
    let encoded = `f2d-${face.id}-${extrusionValue}`;
    const wires = face.getWires();

    for (const wire of wires) {
      const curves = wire.curves;
      for (const curve of curves) {
        encoded += `-${this.encodeSketchCurve(curve)}`;
      }
    }

    return encoded;
  }

  /**
   * Encodes a sketch curve based on its type
   */
  encodeSketchCurve(curve: Curve2D): string {
    if (curve instanceof Line2d) {
      return this.encodeSketchLine2d(curve);
    } else if (curve instanceof Circle2d) {
      return this.encodeSketchCircle2d(curve);
    } else if (curve instanceof CircleArc2d) {
      return this.encodeSketchCircleArc2d(curve);
    } else {
      Logger.console.assert(false, 'sketch curve编码错误：不可识别的线条类型.');
      return '';
    }
  }

  /**
   * Encodes a 2D line
   */
  encodeSketchLine2d(line: Line2d): string {
    const start = line.start;
    const end = line.end;
    
    let encoded = 'l2d-';
    encoded += `${start.x.toFixed(3)}, ${start.y.toFixed(3)}`;
    encoded += `-${end.x.toFixed(3)}, ${end.y.toFixed(3)}`;
    
    return encoded;
  }

  /**
   * Encodes a 2D circle
   */
  encodeSketchCircle2d(circle: Circle2d): string {
    const center = circle.center;
    const radius = circle.radius;
    
    let encoded = 'c2d-';
    encoded += `${center.x.toFixed(3)}, ${center.y.toFixed(3)}`;
    encoded += `-${radius.toFixed(3)}`;
    
    return encoded;
  }

  /**
   * Encodes a 2D circular arc
   */
  encodeSketchCircleArc2d(arc: CircleArc2d): string {
    const center = arc.center;
    const radius = arc.radius;
    const start = arc.start;
    const end = arc.end;
    const direction = arc.clockwise ? 'cw' : 'ccw';
    
    let encoded = 'ca2d-';
    encoded += `${center.x.toFixed(3)}, ${center.y.toFixed(3)}`;
    encoded += `-${radius.toFixed(3)}`;
    encoded += `-${start.x.toFixed(3)}${start.y.toFixed(3)}`;
    encoded += `-${end.x.toFixed(3)}${end.y.toFixed(3)}`;
    encoded += `-${direction}`;
    
    return encoded;
  }
}