import * as THREE from 'three';
import * as lineIntersection from './line-intersection';
import * as arcIntersection from './arc-intersection';

interface IntersectionInfo {
  intersects: THREE.Vector3[];
  thisParams: number[];
  thatParams: number[];
}

interface LineLineIntersectionResult {
  intersect: THREE.Vector3;
  param1: number;
  param2: number;
}

interface ArcLineIntersectionResult {
  intersects: THREE.Vector3[];
  arcParams: number[];
  lineParams: number[];
}

interface ArcArcIntersectionResult {
  intersects: THREE.Vector3[];
  arc1Params: number[];
  arc2Params: number[];
}

export function getIntersectionInfo(
  thisGeometry: THREE.Line3 | THREE.Circle,
  thatGeometry: THREE.Line3 | THREE.Circle
): IntersectionInfo | undefined {
  let result: IntersectionInfo | undefined;

  if (thisGeometry instanceof THREE.Line3) {
    if (thatGeometry instanceof THREE.Line3) {
      const lineLineResult = lineIntersection.getIntersectionInfo2(
        thisGeometry,
        thatGeometry,
        false
      ) as LineLineIntersectionResult | undefined;

      if (lineLineResult) {
        result = {
          intersects: [lineLineResult.intersect],
          thisParams: [lineLineResult.param1],
          thatParams: [lineLineResult.param2]
        };
      }
    } else {
      const arcLineResult = arcIntersection.getArcLineIntersectionInfo(
        thatGeometry,
        thisGeometry
      ) as ArcLineIntersectionResult | undefined;

      if (arcLineResult) {
        result = {
          intersects: arcLineResult.intersects,
          thisParams: arcLineResult.lineParams,
          thatParams: arcLineResult.arcParams
        };
      }
    }
  } else {
    if (thatGeometry instanceof THREE.Line3) {
      const arcLineResult = arcIntersection.getArcLineIntersectionInfo(
        thisGeometry,
        thatGeometry
      ) as ArcLineIntersectionResult | undefined;

      if (arcLineResult) {
        result = {
          intersects: arcLineResult.intersects,
          thisParams: arcLineResult.arcParams,
          thatParams: arcLineResult.lineParams
        };
      }
    } else {
      const arcArcResult = arcIntersection.getArcArcIntersectionInfo(
        thisGeometry,
        thatGeometry
      ) as ArcArcIntersectionResult | undefined;

      if (arcArcResult) {
        result = {
          intersects: arcArcResult.intersects,
          thisParams: arcArcResult.arc1Params,
          thatParams: arcArcResult.arc2Params
        };
      }
    }
  }

  return result;
}