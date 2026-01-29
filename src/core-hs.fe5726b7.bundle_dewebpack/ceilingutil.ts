interface Polygon {
  x: number;
  y: number;
}

interface Loop {
  points: Polygon[];
}

interface Face {
  id: string;
  outerLoop: Loop;
  isSplitCeiling: boolean;
  getOuterLoopPolygon(): Polygon[] | null;
}

interface Ceiling extends Face {
  isSplitCeiling: boolean;
}

interface Slab {
  getFaces(faceType: number): Record<string, Face>;
}

interface Element {
  divideInfo?: Polygon[][];
  getOuterLoopPolygon(): Polygon[];
  getMaster(): Slab | null;
}

interface GeometryProvider {
  getFacePath(face: Face): Polygon[];
}

interface GeometryObject {
  provider: GeometryProvider;
}

interface GeometryManager {
  getGeometryObjectWithoutUpdate(id: string): GeometryObject | null;
}

interface DocumentManager {
  geometryManager: GeometryManager;
}

declare namespace HSCore {
  namespace Model {
    enum SlabFaceType {
      bottom = 0
    }
  }
  namespace Util {
    namespace Math {
      function isPointInPolygon(point: Polygon, polygon: Polygon[], inclusive: boolean): boolean;
    }
    namespace Loop {
      function getLoopPoints(loop: Loop): Polygon[];
    }
  }
  namespace Doc {
    function getDocManager(): DocumentManager;
  }
}

export const CeilingUtil = {
  getSplitCeilings(element: Element, slab: Slab): Face[] {
    const splitCeilings: Face[] = [];
    const bottomFaceType = HSCore.Model.SlabFaceType.bottom;
    const faces = Object.values(slab.getFaces(bottomFaceType));
    const outerPolygon = element.getOuterLoopPolygon();

    faces.forEach((face) => {
      const facePolygon = face.getOuterLoopPolygon();
      const isContained = facePolygon && facePolygon.every((point) =>
        HSCore.Util.Math.isPointInPolygon(point, outerPolygon, true)
      );

      if (face.isSplitCeiling && isContained) {
        splitCeilings.push(face);
      }
    });

    return splitCeilings;
  },

  dumpCeilingDivideInfo(element: Element | null, slab: Slab | null): void {
    if (!element || !slab) {
      return;
    }

    const divideInfo: Polygon[][] = [];
    const splitCeilings = this.getSplitCeilings(element, slab);

    if (splitCeilings.length > 1) {
      splitCeilings.forEach((face) => {
        const loopPoints = HSCore.Util.Loop.getLoopPoints(face.outerLoop);
        divideInfo.push(loopPoints);
      });
    }

    if (splitCeilings.length > 0) {
      element.divideInfo = divideInfo;
    }
  },

  getDividedCeilingPath(element: Element | null): Polygon[][] {
    if (!element) {
      return [];
    }

    const paths: Polygon[][] = [];
    const master = element.getMaster();

    if (!(master instanceof Object)) {
      return [];
    }

    const bottomFaceType = HSCore.Model.SlabFaceType.bottom;
    const faces = Object.values(master.getFaces(bottomFaceType));

    faces.forEach((face) => {
      if (face && (face as Ceiling).isSplitCeiling) {
        const innerPath = this.getFaceInnerPath(face);
        paths.push(innerPath);
      }
    });

    return paths;
  },

  getFaceInnerPath(face: Face | null): Polygon[] {
    if (!face) {
      return [];
    }

    const geometryObject = HSCore.Doc.getDocManager().geometryManager.getGeometryObjectWithoutUpdate(face.id);
    return geometryObject ? geometryObject.provider.getFacePath(face) : [];
  }
};