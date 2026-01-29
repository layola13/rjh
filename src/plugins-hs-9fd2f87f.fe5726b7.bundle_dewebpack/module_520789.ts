import * as THREE from 'three';

interface Cabinet {
  x: number;
  y: number;
  z: number;
  ZLength: number;
  YLength: number;
  XLength: number;
  ZRotation: number;
  rotation: number;
  contentType: {
    isTypeOf(type: string): boolean;
  };
  getUniqueParent(): Cabinet;
  compute(): void;
}

interface Entity {
  x: number;
  y: number;
  z: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  rotation: number;
  ZRotation: number;
  children: Record<string, unknown>;
  assignTo(cabinet: Cabinet): void;
  compute(): void;
}

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface CuttingSide {
  type: 'cornerCuttingLeft' | 'cornerCuttingRight' | null;
}

/**
 * Utility functions for cabinet geometry calculations
 */
declare const getDoor: (cabinet: Cabinet) => Cabinet | null;
declare const isFiveEdgsCabinet: (cabinet: Cabinet) => boolean;
declare const isRightAngleCabinet: (cabinet: Cabinet) => boolean;
declare const getLinesConnectPoints: (points: Point2D[]) => THREE.Line3[];
declare const getClosetDistLineToPoint: (point: THREE.Vector3, lines: THREE.Line3[]) => THREE.Line3;
declare const vect: (start: Point3D, end: Point3D) => THREE.Vector3;
declare const getDoorGap: (cabinet: Cabinet) => number;
declare const getCuttedSide: (cabinet: Cabinet) => string | null;
declare const isOpenLShapeCabinet: (cabinet: Cabinet) => boolean;
declare const getProfile: (cabinet: Cabinet, includeRotation?: boolean) => Point2D[];
declare const isCabinetHasCuttingCorner: (cabinet: Cabinet) => boolean;
declare const convert2Local: (point: Point3D, cabinet: Cabinet) => Point2D;

declare namespace HSCore {
  namespace Util {
    namespace Math {
      function rotatePointCW(origin: Point2D, point: Point2D, angle: number): Point2D;
      function lineLineAngleCCW(p1: Point2D, p2: Point2D, p3: Point2D, p4: Point2D): number;
      function getAngleHorizontaleCCW(p1: Point2D, p2: Point2D): number;
      function nearlyEquals(a: number, b: number): boolean;
    }
    namespace Object {
      function updateField(obj: unknown, field: string, value: unknown): void;
    }
    namespace PAssemblyBody {
      function isStrightCornerCabinet(cabinet: Cabinet): boolean;
      function isFiveCornerCabinet(cabinet: Cabinet): boolean;
    }
  }
  namespace Model {
    class PAssembly {
      x: number;
      y: number;
      z: number;
      ZRotation: number;
      children: Record<string, unknown>;
    }
  }
}

declare namespace LineUtils {
  function isSameLines(line1: THREE.Line3, line2: THREE.Line3): boolean;
}

/**
 * Manages lightboard snapping and positioning relative to cabinets
 */
export default class LightboardSnapper {
  private cabinet: Cabinet;
  private entity: Entity;

  constructor(cabinet: Cabinet, entity: Entity) {
    this.cabinet = cabinet;
    this.entity = entity;
    this.entity.assignTo(this.cabinet);
  }

  /**
   * Get the edges available for snapping
   */
  getSnapEgdes(): THREE.Line3[] {
    const profile = getProfile(this.cabinet, !isRightAngleCabinet(this.cabinet));
    const cuttedSide = getCuttedSide(this.cabinet);

    let startPoint: Point2D;
    let endPoint: Point2D;

    if (cuttedSide && cuttedSide === 'cornerCuttingLeft') {
      if (this.cabinet.contentType.isTypeOf('open cabinet')) {
        startPoint = profile[2];
        endPoint = profile[3];
      } else {
        startPoint = profile[3];
        endPoint = profile[4];
      }
    } else if (isFiveEdgsCabinet(this.cabinet)) {
      const door = getDoor(this.cabinet);
      const doorProfile = getProfile(door!);

      doorProfile.forEach((point) => {
        const rotatedPoint = HSCore.Util.Math.rotatePointCW(
          { x: 0, y: 0 },
          point,
          door!.getUniqueParent().ZRotation + this.cabinet.ZRotation
        );
        point.x = rotatedPoint.x + this.cabinet.x;
        point.y = rotatedPoint.y + this.cabinet.y;
      });

      [startPoint, endPoint] = doorProfile;
    } else {
      if (isOpenLShapeCabinet(this.cabinet)) {
        const point0 = profile[0];
        const point1 = profile[1];
        const point3 = profile[3];
        const point4 = profile[4];

        const vec0 = new THREE.Vector3(point0.x, point0.y, 0);
        const vec1 = new THREE.Vector3(point1.x, point1.y, 0);
        const vec3 = new THREE.Vector3(point3.x, point3.y, 0);
        const vec4 = new THREE.Vector3(point4.x, point4.y, 0);

        return [new THREE.Line3(vec0, vec1), new THREE.Line3(vec3, vec4)];
      }

      [startPoint, endPoint] = profile;
    }

    if (isRightAngleCabinet(this.cabinet)) {
      let firstEdge: THREE.Line3;
      let secondEdge: THREE.Line3;

      if (profile.length > 6) {
        const p7 = new THREE.Vector3(profile[7].x, profile[7].y, 0);
        const p0 = new THREE.Vector3(profile[0].x, profile[0].y, 0);
        firstEdge = new THREE.Line3(p7, p0);

        const p2 = new THREE.Vector3(profile[2].x, profile[2].y, 0);
        const p3 = new THREE.Vector3(profile[3].x, profile[3].y, 0);
        secondEdge = new THREE.Line3(p2, p3);
      } else {
        const p0 = new THREE.Vector3(profile[0].x, profile[0].y, 0);
        const p1 = new THREE.Vector3(profile[1].x, profile[1].y, 0);
        firstEdge = new THREE.Line3(p0, p1);

        const p3 = new THREE.Vector3(profile[3].x, profile[3].y, 0);
        const p4 = new THREE.Vector3(profile[4].x, profile[4].y, 0);
        secondEdge = new THREE.Line3(p3, p4);
      }

      return [firstEdge, secondEdge];
    }

    const startVec = new THREE.Vector3(startPoint.x, startPoint.y, 0);
    const endVec = new THREE.Vector3(endPoint.x, endPoint.y, 0);
    let connectLines = getLinesConnectPoints(profile);

    if (isFiveEdgsCabinet(this.cabinet)) {
      connectLines = connectLines
        .sort((a, b) => {
          const distA = a.distance();
          const distB = b.distance();
          return distA > distB ? 1 : distA < distB ? -1 : 0;
        })
        .filter((line) => !LineUtils.isSameLines(line, new THREE.Line3(startVec, endVec)))
        .splice(0, 2);
    } else {
      connectLines = getLinesConnectPoints(profile).filter(
        (line) => !LineUtils.isSameLines(line, new THREE.Line3(startVec, endVec))
      );
    }

    return [getClosetDistLineToPoint(startVec, connectLines), getClosetDistLineToPoint(endVec, connectLines)];
  }

  /**
   * Get the edge that the entity should snap to
   */
  getSnapedEdge(): THREE.Line3 {
    const edges = this.getSnapEgdes();
    const entityPosition = new THREE.Vector3(this.entity.x, this.entity.y, 0);
    return getClosetDistLineToPoint(entityPosition, edges);
  }

  /**
   * Calculate the rotation for the snapped entity
   */
  getRotation(): number {
    const snappedEdge = this.getSnapedEdge();
    const localStart = convert2Local(snappedEdge.start as Point3D, this.cabinet);
    const localEnd = convert2Local(snappedEdge.end as Point3D, this.cabinet);

    if (isFiveEdgsCabinet(this.cabinet) || isRightAngleCabinet(this.cabinet)) {
      return localStart.x < 0 && localEnd.x < 0 ? -90 : 0;
    }

    const entityProfile = getProfile(this.entity);
    const entityStart = entityProfile[0];
    const entityEnd = entityProfile[1];
    const edgeEnd = snappedEdge.end as Point2D;
    const edgeStart = snappedEdge.start as Point2D;

    return (HSCore.Util.Math.lineLineAngleCCW(entityStart, entityEnd, edgeEnd, edgeStart) + this.entity.rotation) % 180;
  }

  /**
   * Calculate the position for the snapped entity
   */
  getPosition(): THREE.Vector3 {
    const edges = this.getSnapEgdes();
    const snappedEdge = this.getSnapedEdge();
    const otherEdge = edges.find((edge) => !edge.equals(snappedEdge))!;

    const midpoint = {
      x: (snappedEdge.start.x + snappedEdge.end.x) / 2,
      y: (snappedEdge.start.y + snappedEdge.end.y) / 2,
      z: (snappedEdge.start.z + snappedEdge.end.z) / 2,
    };

    const entityMinDimension = this.entity.XLength > this.entity.YLength ? this.entity.YLength : this.entity.XLength;

    let offset: THREE.Vector3;

    if (isFiveEdgsCabinet(this.cabinet) || isOpenLShapeCabinet(this.cabinet)) {
      const edgeVector = vect(snappedEdge.start as Point3D, snappedEdge.end as Point3D).normalize();
      offset = new THREE.Vector3(edgeVector.y, -edgeVector.x, 0).multiplyScalar(entityMinDimension / 2);
    } else {
      offset = vect(otherEdge.end as Point3D, snappedEdge.start as Point3D)
        .normalize()
        .multiplyScalar(entityMinDimension / 2);
    }

    const position = new THREE.Vector3(midpoint.x, midpoint.y, midpoint.z);
    position.add(offset);

    return position;
  }

  /**
   * Update the lightboard position after snapping
   */
  updateLightboardPosAfterSnapped(params: { cabinet: Cabinet; pos: Point3D; rotation: number }): void {
    const { cabinet, pos, rotation } = params;

    if (this.entity instanceof HSCore.Model.PAssembly) {
      if (
        HSCore.Util.PAssemblyBody.isStrightCornerCabinet(cabinet) ||
        HSCore.Util.PAssemblyBody.isFiveCornerCabinet(cabinet)
      ) {
        if (Object.keys(this.entity.children).length > 1) {
          this.entity.ZRotation = cabinet.rotation + rotation + 90;
        } else {
          this.entity.ZRotation = cabinet.rotation + rotation;
        }
      } else {
        if (Object.keys(this.entity.children).length > 1) {
          this.entity.ZRotation = cabinet.rotation;
        } else {
          this.entity.ZRotation = rotation;
        }
      }
    }

    if (!isFiveEdgsCabinet(this.cabinet) && !isRightAngleCabinet(this.cabinet)) {
      const edges = this.getSnapEgdes();
      const snappedEdge = this.getSnapedEdge();
      const edgeEnd = snappedEdge.end as Point2D;
      const edgeStart = snappedEdge.start as Point2D;
      const snappedAngle = HSCore.Util.Math.getAngleHorizontaleCCW(edgeEnd, edgeStart);

      let adjacentEdge: THREE.Line3 | undefined;
      for (let i = 0; i < edges.length; i++) {
        if (!HSCore.Util.Math.nearlyEquals(edges[i].start.x - edgeStart.x, 0)) {
          adjacentEdge = edges[i];
          break;
        }
      }

      const adjacentEnd = adjacentEdge!.end as Point2D;
      const adjacentStart = adjacentEdge!.start as Point2D;
      const adjacentAngle = HSCore.Util.Math.getAngleHorizontaleCCW(adjacentEnd, adjacentStart);

      if (
        HSCore.Util.Math.nearlyEquals(snappedAngle - adjacentAngle, 90) ||
        HSCore.Util.Math.nearlyEquals(snappedAngle - adjacentAngle, -270)
      ) {
        this.entity.rotation = cabinet.rotation + 90;
      }
    }

    this.entity.x = pos.x;
    this.entity.y = pos.y;
    this.entity.z = cabinet.z;
  }

  /**
   * Update the lightboard size after snapping
   */
  updateLightboardSizeAfterSnapped(params: { cabinet: Cabinet; edge: THREE.Line3 }): void {
    const { cabinet, edge } = params;

    HSCore.Util.Object.updateField(this.entity, 'z', cabinet.z);
    HSCore.Util.Object.updateField(this.entity, 'ZLength', cabinet.ZLength);

    const door = getDoor(cabinet);
    const doorGap = getDoorGap(cabinet);
    let length = door ? cabinet.YLength + door.YLength + doorGap : cabinet.YLength;

    if (
      isFiveEdgsCabinet(cabinet) ||
      isOpenLShapeCabinet(cabinet) ||
      isCabinetHasCuttingCorner(cabinet) ||
      isRightAngleCabinet(cabinet)
    ) {
      length = edge.distance();
    }

    const dimensionField = this.entity.XLength > this.entity.YLength ? 'XLength' : 'YLength';
    HSCore.Util.Object.updateField(this.entity, dimensionField, length);
    this.entity.compute();
  }
}