import { Arc3d, Plane } from './geometry';
import { Face } from './face';
import { Opening } from './opening';
import { ServiceManager } from './service-manager';
import { BaseTopoPather } from './base-topo-pather';
import { TgWallUtil } from './tg-wall-util';

interface FacePathCacheEntry {
  topoItems: BaseboardTopoItem[];
  faceRealPath: any[];
}

interface BaseboardTopoItem {
  hostFace: Face;
  index: number;
  isAux: boolean;
  curve3d: any;
  curve2d: any;
  opening?: Opening;
}

interface CurveWithId {
  curve: any;
  id: string;
  lregion?: string;
}

interface SplitParamRange {
  from: number;
  to: number;
}

interface BaseboardCutterInfo {
  cutPath: any[];
  patchLines: any[];
}

interface CuttingCandidate {
  id: string;
  z: number;
  getBaseboardCutterInfo(face: Face): BaseboardCutterInfo[];
}

interface DumpResult {
  hostFaceId: string;
  index: string;
  isAux: boolean;
  openingId?: string;
  from: number;
  to: number;
}

const EPSILON = 1e-6;
const DEFAULT_INDEX = 1e4;

export class BaseboardTopoPatherV120 extends BaseTopoPather {
  private static facePathCache = new Map<Face, FacePathCacheEntry>();

  private readonly hostFace: Face;
  private readonly index: number;
  private readonly isAux: boolean;
  private readonly opening?: Opening;

  constructor(
    hostFace: Face,
    index: number,
    isAux: boolean,
    from: number,
    to: number,
    opening?: Opening
  ) {
    super(from, to);
    this.hostFace = hostFace;
    this.index = index;
    this.isAux = isAux;
    this.opening = opening;
  }

  static faceDirty(face: unknown): void {
    if (face instanceof Face && this.facePathCache.has(face)) {
      this.facePathCache.delete(face);
    }
  }

  static calcBaseSweepPath(face: unknown): BaseboardTopoItem[] {
    if (!(face instanceof Face)) {
      return [];
    }

    if (
      this.facePathCache.has(face) &&
      this.facePathCache.get(face)!.topoItems.length > 0 &&
      !this.faceChanged(face)
    ) {
      return this.facePathCache.get(face)!.topoItems;
    }

    if (!face.parent || face.rawPath.outer.length === 0) {
      return [];
    }

    const floorCurves = this.calcFaceFloorCurves(face);
    if (!floorCurves || floorCurves.length === 0) {
      return [];
    }

    const cuttingCandidates = this.extractCuttingCandidates(face);
    const cutEdges = this.cutBaseSweepPath(floorCurves, cuttingCandidates, face);
    const patchedEdges = this.extractPatchedEdges(floorCurves, cuttingCandidates, face);

    patchedEdges.forEach((patchedEdge) => {
      for (const cutEdge of cutEdges) {
        if (cutEdge.curve3d.getStartPt().equals(patchedEdge.curve3d.getStartPt())) {
          patchedEdge.curve3d.reverse();
          patchedEdge.curve2d.reverse();
          break;
        }
        if (cutEdge.curve3d.getEndPt().equals(patchedEdge.curve3d.getEndPt())) {
          patchedEdge.curve3d.reverse();
          patchedEdge.curve2d.reverse();
          break;
        }
      }
    });

    const allTopoItems = [...cutEdges, ...patchedEdges];
    const cacheEntry: FacePathCacheEntry = {
      topoItems: allTopoItems,
      faceRealPath: face.realPath,
    };

    this.facePathCache.set(face, cacheEntry);
    return allTopoItems;
  }

  static faceChanged(face: Face): boolean {
    const currentRealPath = face.realPath;
    const cachedFaceRealPath = this.facePathCache.get(face)?.faceRealPath;

    if (!cachedFaceRealPath || currentRealPath.length === 0) {
      return true;
    }

    if (currentRealPath.length !== cachedFaceRealPath.length) {
      return true;
    }

    return currentRealPath.every((currentPath) =>
      cachedFaceRealPath.some((cachedPath) =>
        TgWallUtil.isSameBrepFace(
          {
            s: face.surfaceObj.surface,
            o: currentPath.outer,
            i: [],
            d: face.surfaceObj.sameDirWithSurface,
          },
          {
            s: face.surfaceObj.surface,
            o: cachedPath.outer,
            i: [],
            d: face.surfaceObj.sameDirWithSurface,
          }
        )
      )
    );
  }

  static calcFaceFloorCurves(face: Face): any[] | undefined {
    const floorCurves = face.wirePath.outer.filter(
      (curve) =>
        curve.getLength() > EPSILON &&
        Math.abs(curve.getStartPt().z) <= EPSILON &&
        Math.abs(curve.getStartPt().z - curve.getEndPt().z) < EPSILON
    );

    if (!floorCurves || floorCurves.length === 0) {
      return undefined;
    }

    floorCurves.forEach((curve) => {
      const startPoint = curve.getStartPt();
      if (curve instanceof Arc3d) {
        const center = curve.getCenter();
        const normal = face.surfaceObj.getNormal(startPoint);
        if (normal.dot(center.subtracted(startPoint)) <= 0) {
          curve.reverse();
        }
      } else {
        curve.reverse();
      }
    });

    return floorCurves;
  }

  static cutBaseSweepPath(
    floorCurves: any[],
    cuttingCandidates: CuttingCandidate[],
    face: Face
  ): BaseboardTopoItem[] {
    const ptInEdges = this.extractPtInEdges(floorCurves, cuttingCandidates, face);
    const booleanResult = this.PolygonTool().exbool(ptInEdges, EPSILON, {
      clean: 0,
      scaleFix: 0,
    });
    return this.extractSortedSplittedBaseEdges(booleanResult, floorCurves, face);
  }

  static extractPatchedEdges(
    floorCurves: any[],
    cuttingCandidates: CuttingCandidate[],
    face: Face
  ): BaseboardTopoItem[] {
    const patchedEdges: BaseboardTopoItem[] = [];

    cuttingCandidates.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    cuttingCandidates.forEach((candidate) => {
      const candidateIdNum = parseInt(candidate.id);
      candidate.getBaseboardCutterInfo(face).forEach((cutterInfo, infoIndex) => {
        const patchLines = cutterInfo.patchLines;

        patchLines.sort((lineA, lineB) => {
          const midPtA = lineA.getMidPt();
          const midPtB = lineB.getMidPt();
          return floorCurves[0].getParamAt(midPtA) - floorCurves[0].getParamAt(midPtB);
        });

        patchLines.forEach((line, lineIndex) => {
          const topoItem: BaseboardTopoItem = {
            hostFace: face,
            index: 2 * candidateIdNum + lineIndex + infoIndex,
            isAux: true,
            curve3d: line,
            curve2d: Plane.XOY().getCurve2d(line),
            opening: candidate instanceof Opening ? candidate : undefined,
          };
          patchedEdges.push(topoItem);
        });
      });
    });

    return patchedEdges;
  }

  static extractSortedSplittedBaseEdges(
    booleanResult: any,
    floorCurves: any[],
    face: Face
  ): BaseboardTopoItem[] {
    const baseEdges = new Set<any>();

    booleanResult.root.holes.forEach((hole: any) => {
      hole.forEach((node: any) => {
        if (node.oldId?.includes('base')) {
          baseEdges.add(node.edge);
        }
      });
    });

    booleanResult.list.forEach((polygon: any) => {
      if (polygon.outer.length !== 0) {
        polygon.outer.forEach((node: any) => {
          if (node.oldId?.includes('base')) {
            baseEdges.add(node.edge);
          }
        });
      }
    });

    const edgeArray = Array.from(baseEdges);
    const floorCurves2d = floorCurves.map((curve) => Plane.XOY().getCurve2d(curve));

    edgeArray.forEach((edge) => {
      const edgeTangent = edge.curve.getTangentAt(edge.curve.getParamAt(edge.from.point));
      const refTangent = floorCurves2d[0].getTangentAt(
        floorCurves2d[0].getParamAt(edge.from.point)
      );

      if (!edgeTangent.isSameDirection(refTangent)) {
        edge.curve.reverse();
        const tempFrom = edge.from;
        edge.from = edge.to;
        edge.to = tempFrom;
      }
    });

    edgeArray.sort(
      (edgeA, edgeB) =>
        floorCurves2d[0].getParamAt(edgeA.curve.getMidPt()) -
        floorCurves2d[0].getParamAt(edgeB.curve.getMidPt())
    );

    let currentMinIndex = DEFAULT_INDEX;
    let sequentialIndex = -1;
    const topoItems: BaseboardTopoItem[] = [];

    for (let i = 0; i < edgeArray.length; i++) {
      const edge = edgeArray[i];

      if (edge.oldId.length > 1) {
        const ids = edge.oldId
          .filter((id: string) => id !== 'base')
          .map((id: string) => parseInt(id.split('_')[0]));
        currentMinIndex = Math.min(...ids);
      } else {
        const effectiveIndex = currentMinIndex === DEFAULT_INDEX ? sequentialIndex : currentMinIndex;

        if (
          topoItems.length === 0 ||
          topoItems[topoItems.length - 1].index !== effectiveIndex
        ) {
          sequentialIndex++;
          currentMinIndex = DEFAULT_INDEX;
        }

        const finalIndex = currentMinIndex === DEFAULT_INDEX ? sequentialIndex : currentMinIndex;
        const topoItem: BaseboardTopoItem = {
          hostFace: face,
          index: finalIndex,
          isAux: false,
          curve3d: Plane.XOY().getCurve3d(edge.curve),
          curve2d: edge.curve,
        };
        topoItems.push(topoItem);
      }
    }

    return topoItems;
  }

  static extractPtInEdges(
    floorCurves: any[],
    cuttingCandidates: CuttingCandidate[],
    face: Face
  ): CurveWithId[] {
    const ptInEdges: CurveWithId[] = [];

    floorCurves
      .map((curve) => Plane.XOY().getCurve2d(curve))
      .forEach((curve2d) => {
        ptInEdges.push({
          curve: curve2d,
          id: 'base',
        });
      });

    cuttingCandidates.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    cuttingCandidates.forEach((candidate) => {
      const candidateId = candidate.id;
      candidate.getBaseboardCutterInfo(face).forEach((cutterInfo, infoIndex) => {
        cutterInfo.cutPath.forEach((path, pathIndex) => {
          ptInEdges.push({
            curve: Plane.XOY().getCurve2d(path),
            lregion: candidateId,
            id: `${candidateId}_${pathIndex}_${infoIndex}`,
          });
        });
      });
    });

    return ptInEdges;
  }

  static extractCuttingCandidates(face: Face): CuttingCandidate[] {
    const candidates = new Set<CuttingCandidate>();

    for (const opening of face.openings) {
      if (opening.z <= EPSILON) {
        candidates.add(opening);
      }
    }

    const master = face.getMaster();
    if (master instanceof HSCore.Model.Wall) {
      for (const opening of Object.values(master.openings)) {
        if (opening.z <= EPSILON) {
          candidates.add(opening);
        }
      }

      for (const parametricOpening of master.parametricOpenings.values()) {
        if (parametricOpening.getHoleZ() <= EPSILON) {
          candidates.add(parametricOpening);
        }
      }
    }

    return Array.from(candidates);
  }

  getSweepPathWithoutCutting(): any | undefined {
    const topoItem = BaseboardTopoPatherV120.calcBaseSweepPath(this.hostFace).find(
      (item) => item.index === this.index && item.isAux === this.isAux
    );

    return topoItem?.curve3d?.clone();
  }

  getSweepPath(): any | undefined {
    const sweepPath = this.getSweepPathWithoutCutting();
    if (!sweepPath) {
      return undefined;
    }

    if (this.from >= this.to) {
      return undefined;
    }

    const startParam = sweepPath.getStartParam();
    const endParam = sweepPath.getEndParam();
    const paramRange = endParam - startParam;
    const fromParam = startParam + paramRange * this.from;
    const toParam = startParam + paramRange * this.to;

    sweepPath.setRange(fromParam, toParam);
    return sweepPath;
  }

  splitByPoints(points: any[]): BaseboardTopoPatherV120[] {
    const sweepPath = this.getSweepPathWithoutCutting();
    if (!sweepPath) {
      return [];
    }

    const result: BaseboardTopoPatherV120[] = [];
    const paramRanges = this.splitParams(sweepPath, points);

    for (let i = 0; i < paramRanges.length; i++) {
      const pather = new BaseboardTopoPatherV120(
        this.hostFace,
        this.index,
        this.isAux,
        paramRanges[i].from,
        paramRanges[i].to,
        this.opening
      );
      result.push(pather);
    }

    return result;
  }

  dump(): DumpResult {
    return {
      hostFaceId: this.hostFace.id,
      index: this.index.toString(),
      isAux: this.isAux,
      openingId: this.opening?.id,
      from: this.from,
      to: this.to,
    };
  }

  clone(): BaseboardTopoPatherV120 {
    return new BaseboardTopoPatherV120(
      this.hostFace,
      this.index,
      this.isAux,
      this.from,
      this.to,
      this.opening
    );
  }

  static PolygonTool(): any {
    return ServiceManager.getMiscService().PTInstance();
  }
}