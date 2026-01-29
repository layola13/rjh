import { FurnitureDimension } from './FurnitureDimension';

interface Point2D {
  x: number;
  y: number;
}

interface WallSegment {
  rotation: number;
  height3d: number;
  from: Point2D;
  to: Point2D;
  width: number;
}

interface Entity {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XSize: number;
}

interface LinearDimensionGizmoData {
  startPoint: Point2D;
  endPoint: Point2D;
}

declare const HSCore: {
  Util: {
    Math: {
      nearlyEquals(a: number, b: number, tolerance: number): boolean;
      getPerpendicularIntersect(entity: Entity, from: Point2D, to: Point2D): Point2D;
      isPointInLineSegment(point: Point2D, from: Point2D, to: Point2D): boolean;
      isSamePoint(p1: Point2D, p2: Point2D): boolean;
    };
  };
};

declare const THREE: {
  Vector2: new (x?: number, y?: number) => {
    x: number;
    y: number;
    length(): number;
    copy(v: { x: number; y: number }): void;
    setLength(length: number): { x: number; y: number; setLength(l: number): any; add(v: any): any };
    add(v: Entity | Point2D): { x: number; y: number };
  };
};

export class RoofObstacleDimension extends FurnitureDimension {
  public isEnable: boolean = true;
  protected entity!: Entity;
  protected angle_tolerance!: number;
  protected linearDimensionGizmoDatas!: LinearDimensionGizmoData[];

  constructor(param1: unknown, param2: unknown, param3: unknown) {
    super(param1, param2, param3);
    this.isEnable = true;
  }

  protected _isParallel(obj1: { rotation: number }, obj2: { rotation: number }): boolean {
    const normalizedRotation1 = (obj1.rotation + 90 + 180) % 180;
    const normalizedRotation2 = (obj2.rotation + 180) % 180;
    return HSCore.Util.Math.nearlyEquals(normalizedRotation1, normalizedRotation2, this.angle_tolerance);
  }

  protected _isPerpendicular(obj1: { rotation: number }, obj2: { rotation: number }): boolean {
    const normalizedRotation1 = (obj1.rotation + 90 + 180) % 180;
    const normalizedRotation2 = (obj2.rotation + 180) % 180;
    const angleDifference = Math.abs(normalizedRotation1 - normalizedRotation2);
    return (
      HSCore.Util.Math.nearlyEquals(90, angleDifference, this.angle_tolerance) ||
      HSCore.Util.Math.nearlyEquals(normalizedRotation1, 90 - normalizedRotation2, this.angle_tolerance)
    );
  }

  protected _computeParallelWallDimension(walls: WallSegment[]): void {
    walls.forEach((wall: WallSegment) => {
      if (this.entity.z > wall.height3d) {
        return;
      }

      const intersectionPoint = HSCore.Util.Math.getPerpendicularIntersect(
        this.entity,
        wall.from,
        wall.to
      );

      if (!HSCore.Util.Math.isPointInLineSegment(intersectionPoint, wall.from, wall.to)) {
        return;
      }

      const directionVector = new THREE.Vector2(
        intersectionPoint.x - this.entity.x,
        intersectionPoint.y - this.entity.y
      );
      const distanceToIntersection = directionVector.length();

      const offsetVector = new THREE.Vector2();
      offsetVector.copy(directionVector);
      const halfEntitySize = this.entity.XSize / 2;
      const startPoint: Point2D = {
        x: offsetVector.setLength(halfEntitySize).add(this.entity).x,
        y: offsetVector.setLength(halfEntitySize).add(this.entity).y
      };

      const adjustedDistance = distanceToIntersection - wall.width / 2;
      const endPointVector = directionVector.setLength(adjustedDistance).add(this.entity);
      const endPoint: Point2D = {
        x: endPointVector.x,
        y: endPointVector.y
      };

      const measurementLength = new THREE.Vector2(
        endPoint.x - startPoint.x,
        endPoint.y - startPoint.y
      ).length();

      if (!this._isLegalValue(measurementLength)) {
        return;
      }

      const existingDimension = this.linearDimensionGizmoDatas.find(
        (data: LinearDimensionGizmoData) =>
          HSCore.Util.Math.isSamePoint(data.startPoint, startPoint) &&
          HSCore.Util.Math.isSamePoint(data.endPoint, endPoint)
      );

      if (!existingDimension) {
        this.linearDimensionGizmoDatas.push({
          startPoint,
          endPoint
        });
      }
    });
  }

  protected _isLegalValue(value: number): boolean {
    // Implementation should be provided by base class or overridden
    return true;
  }
}