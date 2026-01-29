export enum Curve2dType {
  line = 0,
  arc = 1,
  ellipse = 2,
  bezier2d3 = 3,
  hyperbola = 4,
  any = 5
}

interface Point2D {
  x: number;
  y: number;
}

export class Curve2d {
  static curveSizeWasm: number = 0;

  start: Point2D;
  end: Point2D;
  id: number;

  constructor(start?: Point2D, end?: Point2D, id: number = -1) {
    this.start = start ? { x: start.x, y: start.y } : { x: 0, y: 0 };
    this.end = end ? { x: end.x, y: end.y } : { x: 0, y: 0 };
    this.id = id;
  }

  _toBuffer(
    curveType: number,
    intBuffer: number[] | Int32Array,
    floatBuffer: number[] | Float32Array,
    intStride: number,
    floatStride: number,
    bufferIndex: number
  ): number {
    intBuffer[bufferIndex * intStride] = curveType;
    intBuffer[bufferIndex * intStride + 1] = this.id;

    let floatIndex = bufferIndex * floatStride + 1;
    floatBuffer[floatIndex++] = this.start.x;
    floatBuffer[floatIndex++] = this.start.y;
    floatBuffer[floatIndex++] = this.end.x;
    floatBuffer[floatIndex++] = this.end.y;

    return floatIndex;
  }
}