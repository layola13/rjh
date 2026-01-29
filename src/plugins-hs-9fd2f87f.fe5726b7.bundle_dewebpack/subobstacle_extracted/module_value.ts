import { Vector2 } from 'three';
import _ from 'lodash';

interface Point {
  x: number;
  y: number;
}

interface Offsets {
  front: number;
  right: number;
  back: number;
  left: number;
}

function _acos90(v1: Vector2, v2: Vector2): boolean {
  // Check if angle between vectors is approximately 90 degrees
  const dotProduct = v1.dot(v2);
  return Math.abs(dotProduct) < Math.cos(Math.PI / 2 + 0.001);
}

function adjustPointsByBoundary(
  points: Point[],
  boundaryPoints: Point[],
  offsets: Offsets,
  applyCornerCorrection: boolean = false
): void {
  const frontEdge = new Vector2(
    boundaryPoints[0].x - boundaryPoints[1].x,
    boundaryPoints[0].y - boundaryPoints[1].y
  ).normalize();

  const rightEdge = new Vector2(
    boundaryPoints[1].x - boundaryPoints[2].x,
    boundaryPoints[1].y - boundaryPoints[2].y
  ).normalize();

  const backEdge = new Vector2(
    boundaryPoints[2].x - boundaryPoints[3].x,
    boundaryPoints[2].y - boundaryPoints[3].y
  ).normalize();

  const leftEdge = new Vector2(
    boundaryPoints[3].x - boundaryPoints[0].x,
    boundaryPoints[3].y - boundaryPoints[0].y
  ).normalize();

  const originalPoints = _.cloneDeep(points);
  const frontAffectedIndices: number[] = [];

  for (let currentIndex = 0; currentIndex < points.length; currentIndex++) {
    const nextIndex = (currentIndex + 1) % points.length;
    
    const edgeVector = new Vector2(
      originalPoints[currentIndex].x - originalPoints[nextIndex].x,
      originalPoints[currentIndex].y - originalPoints[nextIndex].y
    ).normalize();

    if (_acos90(frontEdge, edgeVector)) {
      points[currentIndex].y = originalPoints[currentIndex].y - offsets.front;
      points[nextIndex].y = originalPoints[nextIndex].y - offsets.front;
      frontAffectedIndices.push(currentIndex, nextIndex);
    }

    if (_acos90(rightEdge, edgeVector)) {
      points[currentIndex].x = originalPoints[currentIndex].x + offsets.right;
      points[nextIndex].x = originalPoints[nextIndex].x + offsets.right;
    }

    if (_acos90(backEdge, edgeVector)) {
      points[currentIndex].y = originalPoints[currentIndex].y + offsets.back;
      points[nextIndex].y = originalPoints[nextIndex].y + offsets.back;
    }

    if (_acos90(leftEdge, edgeVector)) {
      points[currentIndex].x = originalPoints[currentIndex].x - offsets.left;
      points[nextIndex].x = originalPoints[nextIndex].x - offsets.left;
    }
  }

  if (applyCornerCorrection) {
    const EPSILON = 0.001;
    
    for (let i = 0; i < frontAffectedIndices.length - 1; i++) {
      const currentIdx = frontAffectedIndices[i];
      const nextIdx = frontAffectedIndices[i + 1];
      
      const currentY = points[currentIdx].y;
      const nextY = points[nextIdx].y;
      const yDifference = Math.abs(currentY - nextY);
      
      const isConsecutive = (currentIdx + 1) % points.length === nextIdx;
      
      if (isConsecutive && yDifference > EPSILON) {
        points[currentIdx].x = originalPoints[currentIdx].x - offsets.front;
        points[nextIdx].x = originalPoints[nextIdx].x - offsets.front;
      }
    }
  }
}