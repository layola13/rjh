import { DataModelConvertor } from './DataModelConvertor';
import { Vector2 } from './Vector2';
import * as THREE from 'three';

interface Sketch2D {
  faces: any[];
}

interface SketchData {
  sketch2d: Sketch2D;
}

interface WireLoops {
  outerLoop: any;
  innerLoops: any[];
}

interface Path {
  outer: Vector2[];
  holes?: Vector2[][];
}

interface Point2D {
  x: number;
  y: number;
}

/**
 * Computes and transforms coordinates between sketch space and pave space.
 */
export class CoordinateComputerV3 {
  private readonly _matrix: any;

  constructor(sketchData: SketchData) {
    this._matrix = DataModelConvertor.computeSketchToPaveMatrix(sketchData.sketch2d.faces);
  }

  /**
   * Converts the internal matrix to a THREE.js Matrix3 format.
   */
  toTHREEMatrix(): THREE.Matrix3 {
    return new THREE.Matrix3().fromArray(this._matrix.toArray());
  }

  /**
   * Converts wire loops to a path using the transformation matrix.
   */
  getPathFromWires(wireLoops: WireLoops): any {
    return DataModelConvertor.convertPathFromWires(
      wireLoops.outerLoop,
      wireLoops.innerLoops,
      this._matrix
    );
  }

  /**
   * Converts points to a path using the transformation matrix.
   */
  getPathFromPoints(points: any, isClosed: boolean): any {
    return DataModelConvertor.convertPathFromPoints(points, isClosed, this._matrix);
  }

  /**
   * Transforms a point with x, y coordinates.
   */
  transformd(point: Point2D): Vector2 {
    return new Vector2(point.x, point.y).transform(this._matrix);
  }

  /**
   * Transforms a Vector2 instance.
   */
  transform(vector: Vector2): Vector2 {
    return vector.transform(this._matrix);
  }

  /**
   * Transforms all points in a path (outer contour and holes).
   */
  transformPath(path: Path): Path {
    path.outer.forEach(point => point.transform(this._matrix));
    path.holes?.forEach(hole => 
      hole.forEach(point => point.transform(this._matrix))
    );
    return path;
  }
}