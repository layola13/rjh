import { Vector3, Plane, Coordinate3 } from './Vector3Module';
import * as THREE from 'three';

interface SubPath {
  indices: number[];
}

interface CustomData {
  uvBasePoint?: Vector3;
  smoothEdge?: number[];
  isSmoothFace?: number;
  xDirection?: Vector3;
}

interface FaceData {
  targetNormal: [number, number, number];
  subPaths: SubPath[];
  customData?: CustomData;
}

interface UVConfig {
  uvBasePoint?: Vector3;
  floor?: boolean;
  xDirection?: Vector3;
}

interface XRayPlane {
  xRay: [number, number, number];
  plane: {
    constant: number;
  };
}

interface UVAxes {
  xAxis: THREE.Ray;
  yAxis: THREE.Ray;
}

interface BoundingBox2D {
  square: {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    minZ: number;
    maxZ: number;
  };
  center: {
    x: number;
    y: number;
  };
  area: number;
  lefttop: {
    x: number;
    y: number;
  };
}

interface BoundingBox3D {
  square: {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    minZ: number;
    maxZ: number;
  };
  center: {
    x: number;
    y: number;
    z: number;
  };
  XSize: number;
  YSize: number;
  ZSize: number;
}

export class UVCoordHelper {
  private globalCoordinateSystem: unknown;

  constructor(globalCoordinateSystem: unknown) {
    this.globalCoordinateSystem = globalCoordinateSystem;
  }

  /**
   * Get UV local coordinate system (X and Y axes)
   */
  public getUVLocalXY(
    faceData: FaceData,
    xRayPlane: XRayPlane,
    vertices: Vector3[],
    config?: UVConfig,
    faceType?: string
  ): UVAxes {
    let xRayDirection = new Vector3(xRayPlane.xRay[0], xRayPlane.xRay[1], xRayPlane.xRay[2]);
    const paths3D = this.get3DPath(faceData, vertices);
    const targetNormal = new Vector3(
      faceData.targetNormal[0],
      faceData.targetNormal[1],
      faceData.targetNormal[2]
    );
    const projectionNormal = this.needReverseProjectionPlane(targetNormal, faceType)
      ? targetNormal.clone().reverse()
      : targetNormal.clone();

    xRayDirection = this.getReasonableXRay(projectionNormal, paths3D[0]);

    let shouldReverseYAxis = true;
    let basePoint = paths3D[0][0];

    const reasonablePlane = this.getReasonablePlane(targetNormal, paths3D[0], faceType);
    if (reasonablePlane) {
      reasonablePlane.getCoord().setDx(xRayDirection);
      const projected2DPaths = this.projectTo2dPath(reasonablePlane, xRayPlane.plane.constant, paths3D);
      const boundingBox = this.getPolygonBoundingBox(projected2DPaths[0]);

      if (boundingBox) {
        const leftTopPoint2D = new THREE.Vector3(boundingBox.lefttop.x, boundingBox.lefttop.y, 0);
        basePoint = this.projection3DPoint(reasonablePlane, xRayPlane.plane.constant, leftTopPoint2D);
      }
    }

    if (faceData.customData?.uvBasePoint) {
      xRayDirection = new Vector3(xRayPlane.xRay[0], xRayPlane.xRay[1], xRayPlane.xRay[2]);
      shouldReverseYAxis = false;
      basePoint = faceData.customData.uvBasePoint;
    } else if (this.isSmoothFace(faceData)) {
      const smoothEdge = faceData.customData!.smoothEdge!;
      basePoint = vertices[smoothEdge[0]];
      shouldReverseYAxis = false;
      const edgeEndPoint = vertices[smoothEdge[1]];
      if (basePoint && edgeEndPoint) {
        xRayDirection = edgeEndPoint.clone().subtract(basePoint).normalize();
      }
    }

    if (config?.uvBasePoint) {
      xRayDirection = new Vector3(xRayPlane.xRay);
      basePoint = config.uvBasePoint;
      shouldReverseYAxis = false;
    }

    if (config?.floor) {
      xRayDirection = new Vector3(1, 0, 0);
    }

    let yRayDirection = projectionNormal.clone().cross(xRayDirection).normalize();
    if (shouldReverseYAxis) {
      yRayDirection.reverse();
    }

    if (config?.floor) {
      yRayDirection = new Vector3(0, -1, 0);
    }

    const yAxisRay = new THREE.Ray(
      new THREE.Vector3(basePoint.x, basePoint.y, basePoint.z),
      new THREE.Vector3(yRayDirection.x, yRayDirection.y, yRayDirection.z)
    );

    if (faceData.customData?.xDirection) {
      xRayDirection = faceData.customData.xDirection;
    }

    if (config?.xDirection) {
      xRayDirection = config.xDirection;
    }

    return {
      xAxis: new THREE.Ray(
        new THREE.Vector3(basePoint.x, basePoint.y, basePoint.z),
        new THREE.Vector3(xRayDirection.x, xRayDirection.y, xRayDirection.z)
      ),
      yAxis: yAxisRay
    };
  }

  /**
   * Extract 3D paths from face data using vertex indices
   */
  private get3DPath(faceData: FaceData, vertices: Vector3[]): Vector3[][] {
    const paths: Vector3[][] = [];
    for (const subPath of faceData.subPaths) {
      const path: Vector3[] = [];
      for (const index of subPath.indices) {
        path.push(vertices[index]);
      }
      paths.push(path);
    }
    return paths;
  }

  /**
   * Check if projection plane needs to be reversed (for ceiling faces)
   */
  private needReverseProjectionPlane(normal: Vector3, faceType?: string): boolean {
    return !!(faceType?.includes('ceiling') && normal.isSameDirection(new Vector3(0, 0, -1)));
  }

  /**
   * Check if face is a smooth face
   */
  private isSmoothFace(faceData: FaceData): boolean {
    return !!(
      faceData.customData &&
      faceData.customData.isSmoothFace === 1 &&
      faceData.customData.smoothEdge &&
      faceData.customData.smoothEdge.length > 0
    );
  }

  /**
   * Project a 2D point back to 3D space using plane coordinate system
   */
  private projection3DPoint(plane: Plane, planeConstant: number, point2D: THREE.Vector3): Vector3 {
    const offset = plane.getNorm().clone().multiply(-planeConstant);
    let xDirection = plane.getCoord().getDx().clone().normalize();
    const zDirection = plane.getNorm().clone().normalize();
    const yDirection = zDirection.clone().cross(xDirection).normalize();
    xDirection = yDirection.clone().cross(zDirection).normalize();

    const localPoint = new THREE.Vector3(point2D.x, point2D.y, 0);
    const x = offset.x + localPoint.x * xDirection.x + localPoint.y * yDirection.x + localPoint.z * zDirection.x;
    const y = offset.y + localPoint.x * xDirection.y + localPoint.y * yDirection.y + localPoint.z * zDirection.y;
    const z = offset.z + localPoint.x * xDirection.z + localPoint.y * yDirection.z + localPoint.z * zDirection.z;

    return new Vector3(x, y, z);
  }

  /**
   * Project 3D paths to 2D using the given plane
   */
  private projectTo2dPath(plane: Plane, planeConstant: number, paths3D: Vector3[][]): Vector3[][] {
    return this.projection2DPaths(plane, planeConstant, paths3D, this.globalCoordinateSystem);
  }

  /**
   * Project 3D paths to 2D coordinate system
   */
  private projection2DPaths(
    plane: Plane,
    planeConstant: number,
    paths3D: Vector3[][],
    coordinateSystem: unknown
  ): Vector3[][] {
    const offset = plane.getNorm().clone().multiply(planeConstant);
    let xDirection = plane.getCoord().getDx().clone().normalize();
    const zDirection = plane.getCoord().getDz().clone().normalize();
    const yDirection = zDirection.clone().cross(xDirection).normalize();
    xDirection = yDirection.clone().cross(zDirection).normalize();

    const origin = new THREE.Vector3(0, 0, 0);
    const xRay = new THREE.Ray(origin, new THREE.Vector3(xDirection.x, xDirection.y, xDirection.z));
    const yRay = new THREE.Ray(origin, new THREE.Vector3(yDirection.x, yDirection.y, yDirection.z));
    const zRay = new THREE.Ray(origin, new THREE.Vector3(zDirection.x, zDirection.y, zDirection.z));

    const projectedPaths: Vector3[][] = [];
    for (let pathIndex = 0; pathIndex < paths3D.length; pathIndex++) {
      const path3D = paths3D[pathIndex];
      const projectedPath: Vector3[] = [];

      for (let pointIndex = 0; pointIndex < path3D.length; pointIndex++) {
        const point3D = path3D[pointIndex].clone().add(offset);
        const xCoord = this.directionDistance(xRay, new THREE.Vector3(point3D.x, point3D.y, point3D.z));
        const yCoord = this.directionDistance(yRay, new THREE.Vector3(point3D.x, point3D.y, point3D.z));
        const zCoord = this.directionDistance(zRay, new THREE.Vector3(point3D.x, point3D.y, point3D.z));
        const point2D = new Vector3(xCoord, yCoord, zCoord);
        projectedPath.push(point2D);
      }
      projectedPaths.push(projectedPath);
    }
    return projectedPaths;
  }

  /**
   * Calculate distance along a ray direction from ray origin to a point
   */
  private directionDistance(ray: THREE.Ray, point: THREE.Vector3, target?: THREE.Vector3): number {
    const vector = target ?? new THREE.Vector3();
    vector.subVectors(point, ray.origin);
    return vector.dot(ray.direction);
  }

  /**
   * Get a reasonable plane from polygon, ensuring it matches the target normal
   */
  private getReasonablePlane(normal: Vector3, polygon: Vector3[], faceType?: string): Plane | undefined {
    let plane = this.getPlaneFromPolygon(polygon);
    if (plane) {
      plane = plane.clone();
      if (!plane.getNorm().isSameDirection(normal)) {
        plane.reverse();
      }
      if (this.needReverseProjectionPlane(normal, faceType)) {
        plane.reverse();
      }
      return plane;
    }
    return undefined;
  }

  /**
   * Get a reasonable X-ray direction based on normal and polygon
   */
  private getReasonableXRay(normal: Vector3, polygon?: Vector3[]): Vector3 {
    const directionPairs: [THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)],
      [new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, -1, 0)],
      [new THREE.Vector3(0, 1, 0), new THREE.Vector3(-1, 0, 0)],
      [new THREE.Vector3(0, -1, 0), new THREE.Vector3(1, 0, 0)],
      [new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0)],
      [new THREE.Vector3(0, 0, -1), new THREE.Vector3(-1, 0, 0)]
    ];

    const bestPair = directionPairs.reduce((prev, curr) => 
      normal.dot(prev[0]) < normal.dot(curr[0]) ? curr : prev
    );

    let xRayDirection = normal.cross(bestPair[1]).cross(normal).normalize();

    if (polygon) {
      const plane = this.getPlaneFromPolygon(polygon);
      if (plane) {
        if (!plane.getNorm().isSameDirection(normal)) {
          plane.reverse();
        }
        const centerPoint = this.getPolygonBoundingBox3d(polygon).center;
        const testPoint = new Vector3(centerPoint).clone().add(xRayDirection);
        xRayDirection = plane.getProjectedPtBy(testPoint).clone().subtract(centerPoint).normalize();
      }
    }

    return xRayDirection;
  }

  /**
   * Get 2D bounding box of a polygon
   */
  private getPolygonBoundingBox(polygon: Vector3[]): BoundingBox2D | undefined {
    if (!polygon || polygon.length <= 2) {
      return undefined;
    }

    let maxX = -Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let minY = Infinity;

    for (let i = 0, length = polygon.length; i < length; i++) {
      maxX = Math.max(polygon[i].x, maxX);
      minX = Math.min(polygon[i].x, minX);
      maxY = Math.max(polygon[i].y, maxY);
      minY = Math.min(polygon[i].y, minY);
    }

    return {
      square: {
        maxX,
        maxY,
        minX,
        minY,
        minZ: 0,
        maxZ: 0
      },
      center: {
        x: (minX + maxX) / 2,
        y: (maxY + minY) / 2
      },
      area: (maxX - minX) * (maxY - minY),
      lefttop: {
        x: minX,
        y: maxY
      }
    };
  }

  /**
   * Get 3D bounding box of a polygon
   */
  private getPolygonBoundingBox3d(polygon: Vector3[]): BoundingBox3D | undefined {
    if (!polygon || polygon.length <= 2) {
      return undefined;
    }

    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;

    for (let i = 0, length = polygon.length; i < length; i++) {
      maxX = Math.max(polygon[i].x, maxX);
      minX = Math.min(polygon[i].x, minX);
      maxY = Math.max(polygon[i].y, maxY);
      minY = Math.min(polygon[i].y, minY);
      maxZ = Math.max(polygon[i].z, maxZ);
      minZ = Math.min(polygon[i].z, minZ);
    }

    return {
      square: {
        maxX,
        maxY,
        minX,
        minY,
        minZ,
        maxZ
      },
      center: {
        x: (minX + maxX) / 2,
        y: (maxY + minY) / 2,
        z: (maxZ + minZ) / 2
      },
      XSize: maxX - minX,
      YSize: maxY - minY,
      ZSize: maxZ - minZ
    };
  }

  /**
   * Create a plane from a polygon using three non-collinear points
   */
  private getPlaneFromPolygon(polygon: Vector3[]): Plane | undefined {
    const threePoints = this.getThreeQualifiedPoints(polygon);
    if (!threePoints) {
      return undefined;
    }

    const firstPoint = threePoints[0];
    const secondPoint = threePoints[1];
    const thirdPoint = threePoints[2];

    const plane = Plane.makePlaneByTreePoints(firstPoint, secondPoint, thirdPoint);
    let xDirection = firstPoint.clone().subtract(secondPoint);
    const yDirection = plane.getNorm().clone().cross(xDirection);
    const coordinate = new Coordinate3(plane.getOrigin(), xDirection, yDirection);

    plane.setCoord(coordinate);
    return plane;
  }

  /**
   * Find three non-collinear points from a polygon
   */
  private getThreeQualifiedPoints(polygon: Vector3[]): [Vector3, Vector3, Vector3] | undefined {
    const firstPoint = polygon[0];
    let secondPoint: Vector3 | undefined;
    let thirdPoint: Vector3 | undefined;

    for (let i = 1; i < polygon.length; i++) {
      if (!firstPoint.equals(polygon[i])) {
        secondPoint = polygon[i];
        break;
      }
    }

    if (secondPoint) {
      for (let i = 2; i < polygon.length; i++) {
        const candidatePoint = polygon[i];
        if (!firstPoint.equals(candidatePoint) && !secondPoint.equals(candidatePoint)) {
          const vector1 = candidatePoint.clone().subtract(firstPoint);
          const vector2 = candidatePoint.clone().subtract(secondPoint);
          const vector3 = secondPoint.clone().subtract(firstPoint);

          if (!vector1.isParallel(vector2) || !vector1.isParallel(vector3)) {
            thirdPoint = candidatePoint;
            break;
          }
        }
      }

      if (thirdPoint) {
        return [firstPoint, secondPoint, thirdPoint];
      }
    }

    return undefined;
  }
}