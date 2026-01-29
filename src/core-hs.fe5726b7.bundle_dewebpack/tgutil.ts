import { Face } from './Face';
import { Vector2, Vector3, Plane, Loop, Box2, PolyCurve, MathAlg, EN_GEO_ELEMENT_TYPE, MathUtil, Tolerance } from './math';
import { ServiceManager, ClipMode } from './services';
import { TgWallUtil } from './TgWallUtil';
import { LayerUtil } from './LayerUtil';
import { SlabFaceType } from './SlabFaceType';

interface StructureFaceInfo {
  face: Face;
}

interface StructureFaceInfos {
  outer: StructureFaceInfo[];
  holes: StructureFaceInfo[][];
}

interface StructureData {
  structureFaceInfos: StructureFaceInfo[] | StructureFaceInfos;
}

interface FaceBaseInfo {
  outerPath: any[];
  innerPaths: any[][];
  surface: any;
  sameDirWithSurface: boolean;
}

interface Polygon2d {
  outer: any[];
  holes: any[][];
}

interface Polygon3d {
  outer: any[];
  holes: any[][];
}

interface IPath {
  outer: any[];
  holes?: any[][];
}

interface IPolygon {
  outer: any[];
  holes: any[];
}

interface BrepFacePath {
  outer: any[];
  holes: any[][];
  reversed: boolean;
}

interface OldFaceInfo {
  outerPath: any[];
  surfaceObj: any;
  material?: any;
}

export class TgUtil {
  static getPrevWallFace(targetFace: Face, structureData: StructureData): Face | undefined {
    const faceInfoGroups = structureData.structureFaceInfos instanceof Array
      ? [structureData.structureFaceInfos]
      : [structureData.structureFaceInfos.outer].concat(structureData.structureFaceInfos.holes);

    for (let groupIndex = 0; groupIndex < faceInfoGroups.length; groupIndex++) {
      const faceInfos = faceInfoGroups[groupIndex];
      const currentIndex = faceInfos.findIndex((info) => info.face === targetFace);

      if (currentIndex >= 0) {
        const prevIndex = (currentIndex - 1 + faceInfos.length) % faceInfos.length;
        return faceInfos[prevIndex]?.face;
      }
    }

    return undefined;
  }

  static getNextWallFace(targetFace: Face, structureData: StructureData): Face | undefined {
    const faceInfoGroups = structureData.structureFaceInfos instanceof Array
      ? [structureData.structureFaceInfos]
      : [structureData.structureFaceInfos.outer].concat(structureData.structureFaceInfos.holes);

    for (let groupIndex = 0; groupIndex < faceInfoGroups.length; groupIndex++) {
      const faceInfos = faceInfoGroups[groupIndex];
      const currentIndex = faceInfos.findIndex((info) => info.face === targetFace);

      if (currentIndex >= 0) {
        const nextIndex = (currentIndex + 1) % faceInfos.length;
        return faceInfos[nextIndex]?.face;
      }
    }

    return undefined;
  }

  static getBrepFacePath2d(face: Face): Polygon2d {
    const { outerPath, innerPaths, sameDirWithSurface } = TgUtil.getFaceBaseInfo(face);
    
    let shouldReverse = sameDirWithSurface;
    if (face.getNormAt(Vector2.O()).equals(Vector3.Z(-1))) {
      shouldReverse = !sameDirWithSurface;
    }

    return TgUtil.convert3dPolygonTo2dPolygon(
      { outer: outerPath, holes: innerPaths },
      shouldReverse
    );
  }

  static convert3dCurvesTo2dCurves(curves3d: any[]): any[] {
    return curves3d.map((curve) => TgUtil.convert3dCurveTo2dCurve(curve));
  }

  static convert3dCurveTo2dCurve(curve3d: any): any {
    return Plane.XOY().getCurve2d(curve3d);
  }

  static convert2dCurvesTo3dCurves(curves2d: any[], height: number): any[] {
    return curves2d.map((curve) => TgUtil.convert2dCurveTo3dCurve(curve, height));
  }

  static convert2dCurveTo3dCurve(curve2d: any, height: number): any {
    return Plane.XOY(height).getCurve3d(curve2d);
  }

  static convert2dPolygonTo3dPolygon(
    polygon2d: Polygon2d,
    height: number,
    shouldReverse?: boolean
  ): Polygon3d {
    let processedPolygon = polygon2d;

    if (!shouldReverse) {
      processedPolygon = TgUtil.reversedPath({
        outer: polygon2d.outer,
        holes: polygon2d.holes,
      });
    }

    return {
      outer: TgUtil.convert2dCurvesTo3dCurves(processedPolygon.outer, height),
      holes: processedPolygon.holes.map((hole) =>
        TgUtil.convert2dCurvesTo3dCurves(hole, height)
      ),
    };
  }

  static convert3dPolygonTo2dPolygon(polygon3d: Polygon3d, shouldReverse?: boolean): Polygon2d {
    let processedPolygon = polygon3d;

    if (!shouldReverse) {
      processedPolygon = TgUtil.reversedPath({
        outer: polygon3d.outer,
        holes: polygon3d.holes,
      });
    }

    return {
      outer: TgUtil.convert3dCurvesTo2dCurves(processedPolygon.outer),
      holes: processedPolygon.holes.map((hole) => TgUtil.convert3dCurvesTo2dCurves(hole)),
    };
  }

  static convertIpathToIPolygon(path: IPath): IPolygon {
    return {
      outer: path.outer,
      holes: path.holes || [],
    };
  }

  static convertIpathsToIPolygons(paths: IPath[]): IPolygon[] {
    return paths.map((path) => TgUtil.convertIpathToIPolygon(path));
  }

  static reversePath<T extends { outer: any[]; holes: any[][] }>(path: T): T {
    [path.outer].concat(path.holes).forEach((curves) => {
      curves.reverse();
      curves.forEach((curve) => curve.reverse());
    });

    return path;
  }

  static reversedPath<T extends { outer: any[]; holes: any[][] }>(path: T): T {
    return {
      outer: path.outer.map((curve) => curve.reversed()).reverse(),
      holes: path.holes.map((hole) => hole.map((curve) => curve.reversed()).reverse()),
    } as T;
  }

  static clip(
    subjects: IPolygon[],
    clips: IPolygon[],
    clipMode: ClipMode,
    options?: any
  ): IPolygon[] {
    const fixPolygon = (polygon: IPolygon): IPolygon => ({
      outer: TgWallUtil.curvesFix(polygon.outer),
      holes: polygon.holes?.map((hole) => TgWallUtil.curvesFix(hole)),
    });

    const fixedSubjects = subjects.map((subject) => fixPolygon(subject));
    const fixedClips = clips.map((clip) => fixPolygon(clip));

    return ServiceManager.getClipperService().clip(fixedSubjects, fixedClips, clipMode, options);
  }

  static curvePathIntersect(curve: any, path: any[]): boolean {
    const fixedCurve = TgWallUtil.curvesFix([curve]);
    const fixedPath = TgWallUtil.curvesFix(path);
    const loop = new Loop(fixedPath);

    return MathAlg.BoolOperate2d.polylineIntersect(new PolyCurve(fixedCurve), [loop], true).length > 0;
  }

  static getBBoxCenter(curves: any[]): Vector2 {
    if (!curves || !curves.length) {
      return Vector2.O();
    }

    const boundingBox = new Box2();
    curves.forEach((curve) => boundingBox.union(curve.getBoundingBox()));

    return boundingBox.getCenter();
  }

  static getFaceBaseInfo(face: any): FaceBaseInfo {
    if (face instanceof Face) {
      let sameDirWithSurface = face.surfaceObj.sameDirWithSurface;
      const master = face.getMaster();

      if (master instanceof HSCore.Model.Slab && master.getFaceType(face) === SlabFaceType.bottom) {
        sameDirWithSurface = !sameDirWithSurface;
      }

      return {
        outerPath: face.wirePath.outer,
        innerPaths: face.wirePath.holes,
        surface: face.surfaceObj.surface,
        sameDirWithSurface,
      };
    }

    let paths: any[][] = [];
    if (face.getType() === EN_GEO_ELEMENT_TYPE.EN_BREP_FACE) {
      paths = face.getWires().map((wire: any) => wire.toPath());
    } else if (face.getType() === EN_GEO_ELEMENT_TYPE.EN_TRIM) {
      paths = face.getLoops();
    }

    const surface = face.getSurface();
    const sameDirWithSurface = face.getSameDirWithSurface();

    return {
      outerPath: paths[0],
      innerPaths: paths.slice(1),
      surface,
      sameDirWithSurface,
    };
  }

  static getOldFaceInfo(face: any): OldFaceInfo {
    return {
      outerPath: face.rawPath.outer,
      surfaceObj: face.surfaceObj,
      material: face.material?.clone(),
    };
  }

  static getBrepFacePath(faceInfo: { outerPath: any[]; innerPaths: any[][] }, surfaceObj: any): BrepFacePath {
    const { outerPath, innerPaths } = faceInfo;

    const result: BrepFacePath = {
      outer: surfaceObj.getCurve2ds(outerPath),
      holes: innerPaths.map((innerPath) => surfaceObj.getCurve2ds(innerPath)),
      reversed: false,
    };

    if (ServiceManager.getMathService().isClockWise(result.outer)) {
      result.outer.reverse().forEach((curve) => curve.reverse());
      result.holes.forEach((hole) => hole.reverse().forEach((curve: any) => curve.reverse()));
      result.reversed = true;
    }

    return result;
  }

  static getUnionFacePath(faces: any[]): Polygon3d {
    if (!faces.length) {
      return { outer: [], holes: [] };
    }

    const surfaceObj = faces[0].surfaceObj;
    const facePaths: BrepFacePath[] = [];

    faces.map((face) => {
      const rawPath = face.rawPath;
      const facePath = TgUtil.getBrepFacePath(
        { outerPath: rawPath.outer, innerPaths: rawPath.holes || [] },
        surfaceObj
      );
      facePaths.push(facePath);
    });

    const clippedPaths = TgUtil.clip(facePaths, [], ClipMode.Union);

    if (clippedPaths.length === 1) {
      const result: Polygon3d = {
        outer: surfaceObj.getCurve3ds(clippedPaths[0].outer),
        holes: (clippedPaths[0].holes || []).map((hole) => surfaceObj.getCurve3ds(hole)),
      };

      const shouldReverse = !surfaceObj.sameDirWithSurface;

      if (shouldReverse) {
        result.outer = result.outer.map((curve) => curve.reversed()).reverse();
        result.holes = result.holes.map((hole) => hole.map((curve) => curve.reversed()).reverse());
      }

      faces.forEach((face) => {
        let faceReverse = !shouldReverse;

        if (face.surfaceObj.sameDirWithSurface !== surfaceObj.sameDirWithSurface) {
          faceReverse = !faceReverse;
        }

        face.holesPath.forEach((holePath: any) => {
          let holeOuter = holePath.outer;
          if (faceReverse) {
            holeOuter = holeOuter.map((curve: any) => curve.reversed()).reverse();
          }
          result.holes.push(holeOuter);
        });
      });

      return result;
    }

    return { outer: [], holes: [] };
  }

  static isCurvesOverLap(curves1: any[], curves2: any[]): boolean {
    const overlapTypes = [
      MathAlg.CurveCuvePositonType.OVERLAP,
      MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP,
    ];

    const TOLERANCE = 1e-5;

    return curves1.some((curve1) =>
      curves2.some((curve2) =>
        overlapTypes.includes(MathAlg.PositionJudge.curveCurveOverlap(curve1, curve2, TOLERANCE, TOLERANCE))
      )
    );
  }

  static isPathPathOverlap(path1: IPolygon, path2: IPolygon): boolean {
    const intersections = TgUtil.clip([path1], [path2], ClipMode.Inter);

    if (intersections.length === 0) {
      return false;
    }

    const AREA_THRESHOLD = 1e-6;
    const totalArea = intersections.reduce((sum, intersection) => {
      return sum + new Loop(intersection.outer).calcArea();
    }, 0);

    return totalArea > AREA_THRESHOLD;
  }

  static simplifyPath(path: IPolygon): IPolygon[] {
    return TgUtil.clip([path], [], ClipMode.Union);
  }

  static setMap<K, V>(map: Map<K, V>, key: K, value: V): Map<K, V> {
    const newMap = new Map(map);
    newMap.set(key, value);
    return newMap;
  }

  static getFaceHorizonPlaneIntersect(face: any, zHeight: number): any[] {
    return face.wirePath.outer.filter((curve: any) => {
      const startZ = curve.getStartPt().z;
      const endZ = curve.getEndPt().z;
      return MathUtil.isNearlyEqual(startZ, zHeight) && MathUtil.isNearlyEqual(endZ, zHeight);
    });
  }

  static computeSlabFaceLinkedStructFaces(slabFace: any, structFaces: Set<Face>): Face[] {
    if (slabFace instanceof HSCore.Model.Floor || slabFace instanceof HSCore.Model.Ceiling) {
      return [];
    }

    const parent = slabFace.getUniqueParent();
    if (!parent) {
      return [];
    }

    if (!LayerUtil.getUnderLayer(parent)) {
      return [];
    }

    const getNormal = (face: any, point: Vector3): Vector3 => {
      return face.surfaceObj.getNormal(point);
    };

    const linkedFaces: Face[] = [];
    const slabIntersectCurve = TgUtil.getFaceHorizonPlaneIntersect(slabFace, 0)[0];

    if (!slabIntersectCurve) {
      return [];
    }

    const processedFaces: Face[] = [];

    for (const structFace of [...structFaces]) {
      if (processedFaces.includes(structFace)) {
        continue;
      }

      const structIntersectCurve = TgUtil.getFaceHorizonPlaneIntersect(structFace, 0)[0];
      if (!structIntersectCurve) {
        continue;
      }

      const OVERLAP_TOLERANCE = 0.001;
      const tolerance = new Tolerance(OVERLAP_TOLERANCE);
      const overlaps = MathAlg.CalculateOverlap.curve3ds(slabIntersectCurve, structIntersectCurve, tolerance);

      if (overlaps.length !== 1) {
        continue;
      }

      const overlapRange = overlaps[0].range1;
      if (MathUtil.isNearlyZero(overlapRange.getLength(), OVERLAP_TOLERANCE)) {
        continue;
      }

      const midPoint = slabIntersectCurve.clone().setRange(overlaps[0].range1).getMidPt();
      const slabNormal = getNormal(slabFace, midPoint);
      const structNormal = getNormal(structFace, midPoint);

      if (MathUtil.isNearlyBigger(slabNormal.dot(structNormal), 0)) {
        linkedFaces.push(structFace);
        structFaces.xRemove(structFace);
        processedFaces.push(structFace);
      }
    }

    return linkedFaces;
  }
}