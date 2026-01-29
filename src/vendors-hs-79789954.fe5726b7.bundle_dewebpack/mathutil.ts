import * as THREE from 'three';
import { Matrix4, Vector3, Line2d, Vector2, Quaternion, Euler } from './math-types';
import { HSCore } from './hs-core';
import { FinitePlane } from './finite-plane';
import { createHSBox3, transformHSBox } from './box-utils';
import { EN_TYPE } from './enums';

interface Entity {
  XLength: number;
  YLength: number;
  ZLength: number;
  XSize: number;
  YSize: number;
  ZSize: number;
}

interface Position {
  x: number;
  y: number;
  z: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface Face {
  surface: {
    getOrigin(): Vector3;
    getNorm(): Vector3;
  };
}

interface Box3 {
  min: Vector3;
  max: Vector3;
  clone(): Box3;
}

interface Plane {
  getCoord(): {
    getWorldToLocalMatrix(): Matrix4;
  };
}

export class MathUtil {
  /**
   * Calculate the distance between two boxes
   */
  static distanceOfBox(box1: Box3, box2: Box3): Vector3 {
    return box1.min.subtracted(box2.min);
  }

  /**
   * Check if two surfaces are equal
   */
  static isSurfaceEqual(surface1: FinitePlane, surface2: FinitePlane): boolean {
    const norm1 = surface1.getNorm();
    
    if (!HSCore.Util.Math.isSamePoint3(norm1, surface2.getNorm())) {
      return false;
    }
    
    return HSCore.Util.Math.nearlyEquals(
      norm1.dot(surface1.getOrigin()),
      norm1.dot(surface2.getOrigin())
    );
  }

  /**
   * Create a surface in root coordinate system
   */
  static createSurfaceInRootCoordSys(
    entity: Entity,
    targetEntity: unknown,
    faceType: EN_TYPE
  ): FinitePlane {
    const transformMatrix = new Matrix4().fromArray(
      HSCore.Util.Matrix3DHandler.getEntityA2BMatrix(entity, targetEntity).toArray()
    );
    
    return MathUtil.createSurface(entity, faceType, transformMatrix);
  }

  /**
   * Create a surface in root coordinate system by curve 2D
   */
  static createSurfaceInRootCoordSysByCurve2d(
    entity: Entity,
    curve: Line2d,
    targetEntity: unknown
  ): FinitePlane {
    const transformMatrix = new Matrix4().fromArray(
      HSCore.Util.Matrix3DHandler.getEntityA2BMatrix(entity, targetEntity).toArray()
    );
    
    return MathUtil.createSideSurfaceByCurve(entity, curve, transformMatrix);
  }

  /**
   * Create a side surface by curve
   */
  static createSideSurfaceByCurve(
    entity: Entity,
    curve: Line2d | unknown,
    transformMatrix?: Matrix4
  ): FinitePlane {
    if (curve instanceof Line2d) {
      const direction = curve.getDirection();
      const uDirection = new Vector3([direction.x, direction.y, 0]);
      const vDirection = new Vector3([0, 0, 1]);
      
      const midPoint = curve.getMidPt();
      const origin = new Vector3([midPoint.x, midPoint.y, entity.ZSize / 2]);
      
      const curveLength = curve.getLength();
      const height = entity.ZSize;
      
      const plane = new FinitePlane(origin, uDirection, vDirection);
      plane.setUVSize(curveLength, height);
      
      if (transformMatrix) {
        plane.transform(transformMatrix);
      }
      
      return plane;
    }
    
    return new FinitePlane(
      new Vector3(),
      new Vector3([0, 0, 1])
    );
  }

  /**
   * Create a surface for a specific face type
   */
  static createSurface(
    entity: Entity,
    faceType: EN_TYPE,
    transformMatrix?: Matrix4
  ): FinitePlane {
    const { XLength, YLength, ZLength } = entity;
    const { XSize, YSize, ZSize } = entity;
    
    const origin = new Vector3();
    const uDirection = new Vector3();
    const vDirection = new Vector3();
    let uSize = 100;
    let vSize = 100;

    switch (faceType) {
      case EN_TYPE.EN_LEFT:
        origin.resetFromArray([-XLength / 2, 0, ZLength / 2]);
        uDirection.resetFromArray([0, -1, 0]);
        vDirection.resetFromArray([0, 0, 1]);
        uSize = YSize;
        vSize = ZSize;
        break;

      case EN_TYPE.EN_RIGHT:
        origin.resetFromArray([XLength / 2, 0, ZLength / 2]);
        uDirection.resetFromArray([0, 1, 0]);
        vDirection.resetFromArray([0, 0, 1]);
        uSize = YSize;
        vSize = ZSize;
        break;

      case EN_TYPE.EN_FRONT:
        origin.resetFromArray([0, -YLength / 2, ZLength / 2]);
        uDirection.resetFromArray([1, 0, 0]);
        vDirection.resetFromArray([0, 0, 1]);
        uSize = XSize;
        vSize = ZSize;
        break;

      case EN_TYPE.EN_BACK:
        origin.resetFromArray([0, YLength / 2, ZLength / 2]);
        uDirection.resetFromArray([-1, 0, 0]);
        vDirection.resetFromArray([0, 0, 1]);
        uSize = XSize;
        vSize = ZSize;
        break;

      case EN_TYPE.EN_BOTTOM:
        origin.resetFromArray([0, 0, 0]);
        uDirection.resetFromArray([1, 0, 0]);
        vDirection.resetFromArray([0, -1, 0]);
        uSize = XSize;
        vSize = YSize;
        break;

      case EN_TYPE.EN_TOP:
        origin.resetFromArray([0, 0, ZLength]);
        uDirection.resetFromArray([1, 0, 0]);
        vDirection.resetFromArray([0, 1, 0]);
        uSize = XSize;
        vSize = YSize;
        break;
    }

    const plane = new FinitePlane(origin, uDirection, vDirection);
    plane.setUVSize(uSize, vSize);
    
    if (transformMatrix) {
      plane.transform(transformMatrix);
    }
    
    return plane;
  }

  /**
   * Get bounding box from faces
   */
  static getBoundFacesBox(faces: Face[], padding?: number): Box3 {
    let [minX, minY, minZ] = [Infinity, Infinity, Infinity];
    let [maxX, maxY, maxZ] = [-Infinity, -Infinity, -Infinity];

    faces.forEach((face) => {
      const { x, y, z } = face.surface.getOrigin();
      const { x: normX, y: normY, z: normZ } = face.surface.getNorm();

      if (HSCore.Util.Math.nearlyEquals(normY, 0)) {
        if (HSCore.Util.Math.nearlyEquals(normZ, 0)) {
          if (!HSCore.Util.Math.nearlyEquals(normX, 0)) {
            minX = Math.min(x, minX);
            maxX = Math.max(x, maxX);
          }
        } else {
          minZ = Math.min(z, minZ);
          maxZ = Math.max(z, maxZ);
        }
      } else {
        minY = Math.min(y, minY);
        maxY = Math.max(y, maxY);
      }
    });

    return createHSBox3(
      { x: minX, y: minY, z: minZ },
      { x: maxX, y: maxY, z: maxZ },
      padding
    );
  }

  /**
   * Get axis index by direction vector
   */
  static getAxisIndexByDirection(direction: Vector3): number {
    const THRESHOLD = 0.99;
    
    if (Math.abs(direction.dot(Vector3.X(1))) > THRESHOLD) {
      return 0;
    }
    
    if (Math.abs(direction.dot(Vector3.Y(1))) > THRESHOLD) {
      return 1;
    }
    
    return 2;
  }

  /**
   * Get axis name by direction vector
   */
  static getAxisNameByDirection(direction: Vector3): 'x' | 'y' | 'z' {
    const THRESHOLD = 0.99;
    
    if (Math.abs(direction.dot(Vector3.X(1))) > THRESHOLD) {
      return 'x';
    }
    
    if (Math.abs(direction.dot(Vector3.Y(1))) > THRESHOLD) {
      return 'y';
    }
    
    return 'z';
  }

  /**
   * Check if box is between two planes
   */
  static isBoxBetweenTwoPlane(box: Box3, plane1: Plane, plane2: Plane): boolean {
    const EPSILON = 1e-5;
    
    let worldToLocalMatrix = plane1.getCoord().getWorldToLocalMatrix();
    
    if (transformHSBox(box.clone(), worldToLocalMatrix).min.z < -EPSILON) {
      return false;
    }
    
    worldToLocalMatrix = plane2.getCoord().getWorldToLocalMatrix();
    
    if (transformHSBox(box.clone(), worldToLocalMatrix).min.z < -EPSILON) {
      return false;
    }
    
    return true;
  }

  /**
   * Get transformation matrix from position data
   */
  static getMatrixOf(position: Position): THREE.Matrix4 {
    const translation = new THREE.Vector3(position.x, position.y, position.z);
    const scale = new THREE.Vector3(position.XScale, position.YScale, position.ZScale);
    
    const mathUtils = THREE.MathUtils ?? THREE.Math;
    const rotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        mathUtils.degToRad(-position.XRotation),
        mathUtils.degToRad(-position.YRotation),
        mathUtils.degToRad(-position.ZRotation)
      )
    );

    return new THREE.Matrix4().compose(translation, rotation, scale);
  }

  /**
   * Get global transformation matrix from position array
   */
  static getGlobalMatrix(positions: Position[]): THREE.Matrix4 {
    const globalMatrix = new THREE.Matrix4();
    
    positions.forEach((position) => {
      globalMatrix.premultiply(MathUtil.getMatrixOf(position));
    });
    
    return globalMatrix;
  }

  /**
   * Get transformation from matrix1 to matrix2
   */
  static getM1ToM2(matrix1: THREE.Matrix4, matrix2: THREE.Matrix4): THREE.Matrix4 {
    return new THREE.Matrix4().getInverse(matrix2).multiply(matrix1);
  }
}