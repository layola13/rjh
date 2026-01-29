import { WallMolding_IO, WallMolding } from './WallMolding';
import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Entity } from './Entity';
import { Loader, MathAlg, Vector3, Line3d, Arc3d, Curve3d } from './MathLibrary';
import { EntityField } from './EntityField';
import { BaseboardTopoPather } from './BaseboardTopoPather';
import { Face } from './Face';
import { SweepPathRelationHandlers } from './SweepPathRelationHandlers';
import { BaseboardTopoPatherV120 } from './BaseboardTopoPatherV120';
import { Logger } from './Logger';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadContext {
  version: string;
}

interface BaseboardDumpData {
  offset: number;
  topoPathers: Array<{
    hostFaceId?: string;
    openingId?: string;
    index: string | number;
    isAux: boolean;
    from: unknown;
    to: unknown;
    curve?: unknown;
  }>;
}

interface TopoPatherData {
  hostFaceId?: string;
  openingId?: string;
  index: string | number;
  isAux: boolean;
  from: unknown;
  to: unknown;
  curve?: unknown;
}

interface CurveUserData {
  face: Face;
}

interface PathSegment {
  start: Vector3;
  end: Vector3;
  curve: Curve3d;
}

const EPSILON = 1e-6;

export class Baseboard_IO extends WallMolding_IO {
  private static _instance: Baseboard_IO;

  static instance(): Baseboard_IO {
    if (!Baseboard_IO._instance) {
      Baseboard_IO._instance = new Baseboard_IO();
    }
    return Baseboard_IO._instance;
  }

  dump(
    entity: Baseboard,
    callback?: (dumpData: unknown[], entity: Baseboard) => void,
    includeRelations: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumpData = super.dump(entity, undefined, includeRelations, options);
    const baseData = dumpData[0] as BaseboardDumpData;
    
    baseData.offset = entity.offset;
    baseData.topoPathers = [];
    
    entity.topoPathers.map((pather) => {
      baseData.topoPathers.push(pather.dump());
    });

    if (callback) {
      callback(dumpData, entity);
    }

    return dumpData;
  }

  load(entity: WallMolding, data: BaseboardDumpData, context: LoadContext): void {
    super.load(entity, data, context);
    
    const baseboard = entity as Baseboard;
    baseboard.offset = data.offset;
    
    baseboard.topoPathers = data.topoPathers 
      ? data.topoPathers.reduce((acc: BaseboardTopoPather[], patherData: TopoPatherData) => {
          let pather: BaseboardTopoPather | undefined;

          if (HSCore.Util.Version.isEarlierThan(context.version, "1.3")) {
            const hostFace = Entity.loadFromDumpById(patherData.hostFaceId!, context);
            const opening = patherData.openingId 
              ? Entity.loadFromDumpById(patherData.openingId, context) 
              : undefined;
            pather = new BaseboardTopoPatherV120(
              hostFace,
              parseInt(patherData.index as string),
              patherData.isAux,
              patherData.from,
              patherData.to,
              opening
            );
          } else if (patherData.curve) {
            const curve = Loader.load(patherData.curve);
            pather = new BaseboardTopoPather(
              patherData.index,
              patherData.isAux,
              patherData.from,
              patherData.to,
              curve
            );
          }

          if (pather) {
            acc.push(pather);
          }
          return acc;
        }, []) 
      : [];
  }
}

export class Baseboard extends WallMolding {
  @EntityField()
  offset: number = 0;

  @EntityField()
  topoPathers: BaseboardTopoPather[] = [];

  constructor(name: string = "", parent?: unknown) {
    super(name, parent);
    this.type = MoldingTypeEnum.Baseboard;
  }

  getStartTopoPather(): BaseboardTopoPather | undefined {
    const sweepPaths = this.calcSweepPath(false);
    if (sweepPaths.length === 0) return undefined;

    const firstPath = sweepPaths[0];
    
    for (const topoPather of this.topoPathers) {
      const sweepPath = topoPather.getSweepPath();
      if (sweepPath && 
          sweepPath.getStartPt().equals(firstPath.getStartPt()) && 
          sweepPath.getEndPt().equals(firstPath.getEndPt())) {
        return topoPather;
      }
    }
  }

  getEndTopoPather(): BaseboardTopoPather | undefined {
    const sweepPaths = this.calcSweepPath(false);
    if (sweepPaths.length === 0) return undefined;

    const lastPath = sweepPaths[sweepPaths.length - 1];
    
    for (const topoPather of this.topoPathers) {
      const sweepPath = topoPather.getSweepPath();
      if (sweepPath && 
          sweepPath.getStartPt().equals(lastPath.getStartPt()) && 
          sweepPath.getEndPt().equals(lastPath.getEndPt())) {
        return topoPather;
      }
    }
  }

  split(point: Vector3): Baseboard[] {
    if (this.topoPathers.length === 0) {
      Logger.console.assert(false, "所切割的踢脚线不合理，不存在扫掠路径!");
      return [];
    }

    const sweepPaths = this.calcSweepPath(false);
    const pathGroups: BaseboardTopoPather[][] = [[]];

    for (const path of sweepPaths) {
      const startParam = path.getStartParam();
      const endParam = path.getEndParam();
      const splitParam = path.getParamAt(point);
      
      const matchingPather = this.topoPathers.find((pather) => {
        const patherPath = pather.getSweepPath();
        return patherPath && 
               patherPath.getStartPt().equals(path.getStartPt()) && 
               patherPath.getEndPt().equals(path.getEndPt());
      });

      if (!matchingPather) continue;

      if (startParam - splitParam < EPSILON && endParam - splitParam > EPSILON) {
        const splitPathers = matchingPather.splitByPoints([point]);
        if (splitPathers.length === 2) {
          pathGroups[pathGroups.length - 1].push(splitPathers[0]);
          pathGroups.push([]);
          pathGroups[pathGroups.length - 1].push(splitPathers[1]);
        } else {
          Logger.console.assert(false, "切割踢脚线：切割段数不等于2，不太合理！");
          pathGroups[pathGroups.length - 1].push(matchingPather);
        }
      } else {
        pathGroups[pathGroups.length - 1].push(matchingPather);
      }
    }

    const result: Baseboard[] = [];
    for (const group of pathGroups) {
      const cloned = this.clone();
      cloned.topoPathers = group;
      result.push(cloned);
    }

    return result;
  }

  addTopoPather(pather: BaseboardTopoPather): boolean {
    if (!pather.getSweepPath()) {
      Logger.console.assert(false, "踢脚线：添加的路径为空！");
      return false;
    }

    if (this.topoPathers.length === 0) {
      this.topoPathers.push(pather);
      return true;
    }

    const allPaths = [...this.topoPathers, pather]
      .map((p) => p.getSweepPath())
      .filter((p): p is Curve3d => !!p);

    if (this.sortpaths(allPaths).length > 1) {
      Logger.console.assert(false, "踢脚线：新添加的路径不连续！");
      return false;
    }

    this.topoPathers.push(pather);
    this.topoPathers = [...this.topoPathers];
    return true;
  }

  getIO(): Baseboard_IO {
    return Baseboard_IO.instance();
  }

  get sweepPath(): Curve3d[] {
    return this.doc.relationshipManager.getSweepPathRelation().getData(this) || 
           this.calcSweepPath(true);
  }

  get isInWall(): boolean {
    return Math.abs(this.offset) > EPSILON;
  }

  calcSweepPath(applyOffset: boolean = true): Curve3d[] {
    if (!this.topoPathers.length) {
      return [];
    }

    const paths = this.topoPathers
      .map((pather) => pather.getSweepPath())
      .filter((path): path is Curve3d => !!path);

    if (!paths.length) {
      Logger.console.assert(false, "扫掠路径为空!");
      return [];
    }

    const sortedPaths = this.sortpaths(paths).flat();
    if (!sortedPaths.length) {
      Logger.console.assert(false, "扫掠路径为空!");
      return [];
    }

    if (!applyOffset || !this.offset || Math.abs(this.offset) < EPSILON) {
      return sortedPaths;
    }

    const connectedPaths = this.getConnectedPath(sortedPaths);
    const pathsWithUserData = connectedPaths.filter((path) => path.userData);

    const offsetResult = MathAlg.Offset.offsetCurve3dList(
      connectedPaths,
      this.offset,
      Vector3.Z()
    );

    return offsetResult.curveList.filter((offsetCurve) =>
      pathsWithUserData.every((originalPath) => {
        if (offsetCurve instanceof Line3d && originalPath instanceof Line3d) {
          if (offsetCurve.getDirection().isParallel(originalPath.getDirection()) &&
              Math.abs(MathAlg.CalculateDistance.curve3dToCurve3d(offsetCurve, originalPath) - 
                       Math.abs(this.offset)) < EPSILON) {
            return false;
          }
        } else if (offsetCurve instanceof Arc3d && originalPath instanceof Arc3d &&
                   offsetCurve.getCenter().equals(originalPath.getCenter())) {
          return false;
        }
        return true;
      })
    );
  }

  getConnectedPath(paths: Curve3d[]): Curve3d[] {
    if (this.topoPathers.length === 0 || paths.length === 0) {
      return paths;
    }

    const parentFace = this.parent as Face;
    const adjacentFacePaths = parentFace.roomInfos
      .map((info) => info.faces)
      .flat()
      .filter((face) => face !== parentFace)
      .filter((face) => {
        const baseboards = face.moldings[MoldingTypeEnum.Baseboard];
        return baseboards && baseboards.length > 0;
      })
      .map((face) => {
        const bottomPath = face.wirePath.outer.find((curve) =>
          Math.abs(curve.getStartPt().z) < EPSILON && 
          Math.abs(curve.getEndPt().z) < EPSILON
        );
        if (bottomPath) {
          bottomPath.userData = { face } as CurveUserData;
        }
        return bottomPath;
      })
      .filter((path): path is Curve3d => !!path);

    let startConnected = false;
    let endConnected = false;

    for (const adjacentPath of adjacentFacePaths) {
      const startClone = adjacentPath.clone();
      startClone.userData = adjacentPath.userData;

      if (!startConnected && 
          adjacentPath.getEndPt().equals(paths[0].getStartPt()) && 
          !MathAlg.Overlap.curve3dsColinear(adjacentPath, paths[0])) {
        paths.unshift(startClone);
        startConnected = true;
      } else if (!startConnected && 
                 adjacentPath.getStartPt().equals(paths[0].getStartPt()) && 
                 !MathAlg.Overlap.curve3dsColinear(adjacentPath, paths[0])) {
        paths.unshift(startClone.reverse());
        startConnected = true;
      }

      const endClone = adjacentPath.clone();
      endClone.userData = adjacentPath.userData;

      if (!endConnected && 
          adjacentPath.getStartPt().equals(paths[paths.length - 1].getEndPt()) && 
          !MathAlg.Overlap.curve3dsColinear(adjacentPath, paths[paths.length - 1])) {
        paths.push(endClone);
        endConnected = true;
      } else if (!endConnected && 
                 adjacentPath.getEndPt().equals(paths[paths.length - 1].getEndPt()) && 
                 !MathAlg.Overlap.curve3dsColinear(adjacentPath, paths[paths.length - 1])) {
        endClone.reverse();
        paths.push(endClone);
        endConnected = true;
      }
    }

    return paths;
  }

  sortpaths(curves: Curve3d[]): Curve3d[][] {
    const segments: PathSegment[] = [];
    
    for (const curve of curves) {
      const start = curve.getStartPt();
      const end = curve.getEndPt();
      segments.push({ start, end, curve });
    }

    const groups: PathSegment[][] = [];

    for (const segment of segments) {
      if (groups.flat().includes(segment)) {
        continue;
      }

      const chain: PathSegment[] = [segment];
      let found: boolean;

      do {
        found = false;
        for (const candidate of segments) {
          if (chain[0].curve !== candidate.curve && 
              chain[0].start.equals(candidate.end)) {
            chain.unshift(candidate);
            found = true;
            break;
          }
        }
      } while (found);

      do {
        found = false;
        for (const candidate of segments) {
          if (chain[chain.length - 1].curve !== candidate.curve && 
              chain[chain.length - 1].end.equals(candidate.start)) {
            chain.push(candidate);
            found = true;
            break;
          }
        }
      } while (found);

      groups.push(chain);
    }

    return groups.map((group) => group.map((segment) => segment.curve));
  }

  existCheck(): boolean {
    if (this.calcSweepPath(false).length === 0 && this.parent instanceof Face) {
      return false;
    }
    return true;
  }

  clone(): Baseboard {
    const cloned = new Baseboard();
    cloned._copyFrom(this);
    
    if (this.offset) {
      cloned.offset = this.offset;
    }

    return cloned;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgBaseboard, Baseboard);
SweepPathRelationHandlers.registerHandler(
  HSConstants.ModelClass.NgBaseboard,
  (entity: Baseboard) => entity.calcSweepPath(true)
);