interface Loop {
  curves: Curve[];
  getDiscretePoints(): Point[];
}

interface Curve {
  id: string;
  isbackground: boolean;
  parents: Record<string, Parent>;
}

interface Parent {
  getUniqueParent(): Face2d;
}

interface Face2d {
  outerLoop: Loop;
}

interface Point {
  x: number;
  y: number;
  z?: number;
}

interface Bounds {
  min: Point;
  max: Point;
}

function getBounds(points: Point[]): Bounds | null {
  if (points.length === 0) return null;
  
  const min = { ...points[0] };
  const max = { ...points[0] };
  
  for (const point of points) {
    min.x = Math.min(min.x, point.x);
    min.y = Math.min(min.y, point.y);
    max.x = Math.max(max.x, point.x);
    max.y = Math.max(max.y, point.y);
  }
  
  return { min, max };
}

function isPolygonInBound(points: Point[], bounds: Bounds): boolean {
  for (const point of points) {
    if (point.x < bounds.min.x || point.x > bounds.max.x ||
        point.y < bounds.min.y || point.y > bounds.max.y) {
      return false;
    }
  }
  return true;
}

export class Face2dDecorator {
  private readonly _face2d: Face2d;

  constructor(face2d: Face2d) {
    this._face2d = face2d;
  }

  /**
   * Finds curves that should be removed from the face
   * @returns Array of curves to remove
   */
  findCurvesToRemove(): Curve[] {
    const face = this._face2d;
    const { curves } = face.outerLoop;
    const candidateCurves: Curve[] = [];
    const parentCurveMap = new Map<Face2d, Curve[]>();

    for (const curve of curves) {
      if (curve.isbackground) continue;

      const parents = Object.values(curve.parents)
        .map(parent => parent.getUniqueParent())
        .filter(parent => parent !== face)
        .filter(parent => this.isPolygonOuterWireHasIdenticalCurve(parent) === true);

      const firstParent = parents.length > 0 ? parents[0] : undefined;

      if (firstParent) {
        if (!parentCurveMap.has(firstParent)) {
          parentCurveMap.set(firstParent, []);
        }
        parentCurveMap.get(firstParent)?.push(curve);
      } else {
        candidateCurves.push(curve);
      }
    }

    if (candidateCurves.length > 0) {
      return candidateCurves;
    }

    const innerParents: Face2d[] = [];
    const outerParents: Face2d[] = [];

    for (const parent of parentCurveMap.keys()) {
      const parentBounds = getBounds(parent.outerLoop.getDiscretePoints());
      if (parentBounds && isPolygonInBound(face.outerLoop.getDiscretePoints(), parentBounds)) {
        innerParents.push(parent);
      } else {
        outerParents.push(parent);
      }
    }

    if (innerParents.length > 0) {
      const parentCount = innerParents.length;
      const nestingLevels = new Array(parentCount).fill(0);

      for (let i = 0; i < parentCount; ++i) {
        const currentBounds = getBounds(innerParents[i].outerLoop.getDiscretePoints());
        for (let j = 0; j < parentCount; ++j) {
          if (i !== j && currentBounds && isPolygonInBound(innerParents[j].outerLoop.getDiscretePoints(), currentBounds)) {
            nestingLevels[i]++;
          }
        }
      }

      const uniqueLevels = Array.from(new Set(nestingLevels)).sort();

      for (const level of uniqueLevels) {
        const curvesAtLevel: Curve[] = [];
        for (let i = 0; i < parentCount; i++) {
          if (nestingLevels[i] === level) {
            curvesAtLevel.push(...(parentCurveMap.get(innerParents[i]) ?? []));
          }
        }
        if (curvesAtLevel.length > 0) {
          return curvesAtLevel;
        }
      }
    }

    if (outerParents.length > 0) {
      const outerCurves: Curve[] = [];
      for (const parent of outerParents) {
        outerCurves.push(...(parentCurveMap.get(parent) ?? []));
      }
      if (outerCurves.length > 0) {
        return outerCurves;
      }
    }

    return [];
  }

  /**
   * Checks if the given polygon's outer wire has any curve with identical ID to this face's curves
   * @param polygon - The face to check against
   * @returns True if an identical curve is found
   */
  isPolygonOuterWireHasIdenticalCurve(polygon: Face2d): boolean {
    const face = this._face2d;
    for (const polygonCurve of polygon.outerLoop.curves) {
      for (const faceCurve of face.outerLoop.curves) {
        if (polygonCurve.id === faceCurve.id) {
          return true;
        }
      }
    }
    return false;
  }
}