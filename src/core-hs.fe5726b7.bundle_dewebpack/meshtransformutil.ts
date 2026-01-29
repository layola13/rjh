interface Point3D {
  x: number;
  y: number;
  z: number;
}

export class MeshTransformUtil {
  /**
   * Transforms 3D positions in place using a 4x4 transformation matrix.
   * @param positions - Flat array of 3D coordinates [x1, y1, z1, x2, y2, z2, ...]
   * @param matrix - 4x4 transformation matrix in column-major order (16 elements)
   */
  static transformPositions3d(positions: number[], matrix: number[]): void {
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      positions[i] = x * matrix[0] + y * matrix[4] + z * matrix[8] + matrix[12];
      positions[i + 1] = x * matrix[1] + y * matrix[5] + z * matrix[9] + matrix[13];
      positions[i + 2] = x * matrix[2] + y * matrix[6] + z * matrix[10] + matrix[14];
    }
  }

  /**
   * Transforms 3D positions to 2D using a 4x4 transformation matrix.
   * @param positions3d - Flat array of 3D coordinates [x1, y1, z1, x2, y2, z2, ...]
   * @param positions2d - Output flat array of 2D coordinates [x1, y1, x2, y2, ...]
   * @param matrix - 4x4 transformation matrix in column-major order (16 elements)
   */
  static transformPositions3dTo2d(
    positions3d: number[],
    positions2d: number[],
    matrix: number[]
  ): void {
    for (let i = 0, outIndex = 0; i < positions3d.length; i += 3, ++outIndex) {
      positions2d[2 * outIndex] = 
        positions3d[i] * matrix[0] + 
        positions3d[i + 1] * matrix[4] + 
        positions3d[i + 2] * matrix[8] + 
        matrix[12];
      
      positions2d[2 * outIndex + 1] = 
        positions3d[i] * matrix[1] + 
        positions3d[i + 1] * matrix[5] + 
        positions3d[i + 2] * matrix[9] + 
        matrix[13];
    }
  }

  /**
   * Transforms 2D positions in place using a 3x3 transformation matrix.
   * @param positions - Flat array of 2D coordinates [x1, y1, x2, y2, ...]
   * @param matrix - 3x3 transformation matrix in column-major order (9 elements)
   */
  static transformPositions2d(positions: number[], matrix: number[]): void {
    for (let i = 0; i < positions.length; i += 2) {
      const x = positions[i];
      const y = positions[i + 1];
      
      positions[i] = x * matrix[0] + y * matrix[3] + matrix[6];
      positions[i + 1] = x * matrix[1] + y * matrix[4] + matrix[7];
    }
  }

  /**
   * Transforms a 3D point in place using a 4x4 transformation matrix.
   * @param point - Point with x, y, z coordinates (modified in place)
   * @param matrix - 4x4 transformation matrix in column-major order (16 elements)
   * @returns The same point object after transformation
   */
  static transformXYZ(point: Point3D, matrix: number[]): Point3D {
    const transformedX = point.x * matrix[0] + point.y * matrix[4] + point.z * matrix[8] + matrix[12];
    const transformedY = point.x * matrix[1] + point.y * matrix[5] + point.z * matrix[9] + matrix[13];
    const transformedZ = point.x * matrix[2] + point.y * matrix[6] + point.z * matrix[10] + matrix[14];
    
    point.x = transformedX;
    point.y = transformedY;
    point.z = transformedZ;
    
    return point;
  }

  /**
   * Transforms a 3D point and returns a new point without modifying the original.
   * @param point - Point with x, y, z coordinates (unchanged)
   * @param matrix - 4x4 transformation matrix in column-major order (16 elements)
   * @returns A new transformed point
   */
  static transformedXYZ(point: Point3D, matrix: number[]): Point3D {
    return MeshTransformUtil.transformXYZ(
      {
        x: point.x,
        y: point.y,
        z: point.z
      },
      matrix
    );
  }
}