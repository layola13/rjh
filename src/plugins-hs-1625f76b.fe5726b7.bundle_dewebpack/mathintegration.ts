import { Vector2, Line3d, MathUtil, Matrix3 } from './math-module';

interface Path {
  outer: PathPoint[];
  holes?: PathPoint[][];
}

interface PathPoint {
  transform(matrix: Matrix3): PathPoint;
}

interface TransformedPath {
  outer: Vector2[];
  holes: Vector2[][];
}

export class MathIntegration {
  static ins: MathIntegration = new MathIntegration();

  /**
   * Transforms a path using the provided matrix
   * @param path - The path to transform
   * @param matrix - The transformation matrix
   * @returns The transformed path
   */
  transformPath(path: Path, matrix: Matrix3): Path {
    const transformPoints = (points: PathPoint[]): void => {
      points.forEach((point) => point.transform(matrix));
    };

    transformPoints(path.outer);
    
    if (path.holes) {
      path.holes.forEach((hole) => transformPoints(hole));
    }

    return path;
  }

  /**
   * Transforms point arrays using the provided matrix
   * @param points - Object containing outer points and optional holes
   * @param matrix - The transformation matrix
   * @returns Transformed points as Vector2 arrays
   */
  transformPts(
    points: { outer: unknown[]; holes?: unknown[][] },
    matrix: Matrix3
  ): TransformedPath {
    const transformPointArray = (pointArray: unknown[]): Vector2[] => {
      return pointArray.map((point) => new Vector2(point).transform(matrix));
    };

    return {
      outer: transformPointArray(points.outer),
      holes: points.holes 
        ? points.holes.map((hole) => transformPointArray(hole)) 
        : []
    };
  }

  /**
   * Converts an array of points to an array of 3D line segments
   * @param points - Array of points to convert
   * @returns Array of Line3d segments forming a closed loop
   */
  convertToCurve3d(points: unknown[]): Line3d[] {
    const lines: Line3d[] = [];

    for (let current = 0, next = 1; next < points.length; current = next++) {
      lines.push(new Line3d(points[current], points[next]));
    }

    const startPoint = lines[0].getStartPt();
    const endPoint = lines[lines.length - 1].getEndPt();

    if (!startPoint.equals(endPoint)) {
      lines.push(new Line3d(endPoint, startPoint));
    }

    return lines;
  }

  /**
   * Converts a 4x4 matrix to a 3x3 matrix if the transformation is 2D
   * @param matrix4 - The 4x4 matrix to convert
   * @returns The converted 3x3 matrix or undefined if conversion is not possible
   */
  convertMatrix4ToMatrix3(matrix4: { data: number[][] }): Matrix3 | undefined {
    const data = matrix4.data;
    const tolerance = 0.001;

    const isZero = (value: number): boolean => 
      MathUtil.isNearlyEqual(value, 0, tolerance);

    if (
      isZero(data[0][2]) &&
      isZero(data[1][2]) &&
      isZero(data[2][0]) &&
      isZero(data[2][1])
    ) {
      const matrix3Data = [
        data[0][0], data[0][1], data[0][3],
        data[1][0], data[1][1], data[1][3],
        data[3][0], data[3][1], data[3][3]
      ];

      return new Matrix3().fromArray(matrix3Data);
    }

    return undefined;
  }
}