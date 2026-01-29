import * as THREE from 'three';

interface PlaneWithNormal extends THREE.Plane {
  normal: THREE.Vector3;
  constant: number;
  xRay?: THREE.Vector3;
}

interface PlaneAxes {
  xAxis: THREE.Vector3;
  yAxis: THREE.Vector3;
  zAxis: THREE.Vector3;
}

interface GeometryUtils {
  isNormalParallel(normal1: THREE.Vector3, normal2: THREE.Vector3): boolean;
}

const geometryUtils: GeometryUtils = require('./geometry-utils'); // Replace with actual import path

/**
 * Utility class for coordinate system transformations and plane-related matrix operations
 */
const CoordinateTransformUtils = {
  /**
   * Converts world coordinates to plane local coordinates matrix
   * @param plane - The plane to convert to local space
   * @returns Transformation matrix from world to plane local space
   */
  worldToPlaneLocalMatrix(plane: PlaneWithNormal): THREE.Matrix4 {
    const planeOrigin = plane.normal.clone().multiplyScalar(-plane.constant);
    const axes = this._getPlaneAxes(plane);
    const { xAxis, yAxis, zAxis } = axes;
    return this.worldToLocalMatrix(planeOrigin, xAxis, yAxis, zAxis);
  },

  /**
   * Gets transformation matrix between two coordinate systems
   * @param sourceAxes - Source coordinate system axes
   * @param targetAxes - Target coordinate system axes
   * @returns Transformation matrix
   */
  getTranformMatrix(
    sourceAxes: [THREE.Vector3, THREE.Vector3, THREE.Vector3?],
    targetAxes: [THREE.Vector3, THREE.Vector3, THREE.Vector3?]
  ): THREE.Matrix4 {
    const createMatrix = (axes: [THREE.Vector3, THREE.Vector3, THREE.Vector3?]): THREE.Matrix4 => {
      const axis1 = axes[0];
      const axis2 = axes[1];
      const axis3 = axes[2] ?? new THREE.Vector3();
      const crossAxis = new THREE.Vector3().crossVectors(axis1, axis2);
      
      const matrix = new THREE.Matrix4();
      matrix.set(
        axis3.x, axis3.y, axis3.z, 1,
        axis1.x, axis1.y, axis1.z, 0,
        axis2.x, axis2.y, axis2.z, 0,
        crossAxis.x, crossAxis.y, crossAxis.z, 0
      );
      matrix.transpose();
      return matrix;
    };

    const sourceMatrix = createMatrix(sourceAxes);
    const targetMatrix = createMatrix(targetAxes);
    const sourceInverse = new THREE.Matrix4().getInverse(sourceMatrix);
    return new THREE.Matrix4().multiplyMatrices(targetMatrix, sourceInverse);
  },

  /**
   * Creates world to local coordinate transformation matrix
   */
  worldToLocalMatrix(
    origin: THREE.Vector3,
    xAxis: THREE.Vector3,
    yAxis: THREE.Vector3,
    zAxis: THREE.Vector3
  ): THREE.Matrix4 {
    const alignMatrix = this.alignCoordinateSystemMatrix(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1),
      origin,
      xAxis,
      yAxis,
      zAxis
    );
    return new THREE.Matrix4().getInverse(alignMatrix);
  },

  /**
   * Creates local to world coordinate transformation matrix
   */
  localToWorldMatrix(
    origin: THREE.Vector3,
    xAxis: THREE.Vector3,
    yAxis: THREE.Vector3,
    zAxis: THREE.Vector3
  ): THREE.Matrix4 {
    return this.alignCoordinateSystemMatrix(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1),
      origin,
      xAxis,
      yAxis,
      zAxis
    );
  },

  /**
   * Aligns one coordinate system to another
   */
  alignCoordinateSystemMatrix(
    sourceOrigin: THREE.Vector3,
    sourceXAxis: THREE.Vector3,
    sourceYAxis: THREE.Vector3,
    sourceZAxis: THREE.Vector3,
    targetOrigin: THREE.Vector3,
    targetXAxis: THREE.Vector3,
    targetYAxis: THREE.Vector3,
    targetZAxis: THREE.Vector3
  ): THREE.Matrix4 {
    const sourceBasis = new THREE.Matrix4().makeBasis(sourceXAxis, sourceYAxis, sourceZAxis);
    const targetBasis = new THREE.Matrix4().makeBasis(targetXAxis, targetYAxis, targetZAxis);
    const sourceInverse = new THREE.Matrix4().getInverse(sourceBasis);
    
    targetBasis.multiply(sourceInverse);
    
    const translation = targetOrigin.clone().sub(sourceOrigin);
    const translationMatrix = new THREE.Matrix4().makeTranslation(translation.x, translation.y, translation.z);
    
    translationMatrix.multiply(targetBasis);
    return translationMatrix;
  },

  /**
   * Gets orthonormal axes for a plane
   * @param plane - The plane to compute axes for
   * @returns Object containing xAxis, yAxis, and zAxis vectors
   */
  _getPlaneAxes(plane: PlaneWithNormal): PlaneAxes {
    let xAxis: THREE.Vector3;
    let yAxis: THREE.Vector3;
    const zAxis = plane.normal.clone();

    if (plane.xRay) {
      xAxis = plane.xRay.clone().normalize();
      yAxis = zAxis.clone().cross(xAxis);
    } else {
      xAxis = new THREE.Vector3(1, 0, 0);
      
      if (geometryUtils.isNormalParallel(zAxis, xAxis)) {
        xAxis = new THREE.Vector3(0, 1, 0);
      }
      
      yAxis = zAxis.clone().cross(xAxis);
      xAxis = yAxis.clone().cross(zAxis);
    }

    return {
      xAxis,
      yAxis,
      zAxis
    };
  }
};

export default CoordinateTransformUtils;