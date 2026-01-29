import { WallMolding_IO, WallMolding } from './WallMolding';
import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { Loader, Matrix4, Vector3, Vector2 } from './GeometryCore';
import { CorniceTopoPather } from './CorniceTopoPather';
import { SweepPathRelationHandlers } from './SweepPathRelationHandlers';
import { CorniceTopoPatherV120 } from './CorniceTopoPatherV120';
import { Logger } from './Logger';

interface DumpOptions {
  version?: string;
  [key: string]: unknown;
}

interface TopoPatherDump {
  hostFaceId?: string;
  index: number;
  isAux: boolean;
  from: number;
  to: number;
  curve?: unknown;
}

interface CorniceDump {
  topoPathers: TopoPatherDump[];
  offset: number;
  autoFit: boolean;
  [key: string]: unknown;
}

interface CurveSegment {
  start: Vector3;
  end: Vector3;
  curve: Curve;
}

interface Curve {
  getStartPt(): Vector3;
  getEndPt(): Vector3;
  getStartParam(): number;
  getEndParam(): number;
  getParamAt(point: Vector3): number;
  transform(matrix: Matrix4): void;
  equals(other: Vector3): boolean;
}

interface TopoPather {
  getSweepPath(): Curve | null;
  splitByPoints(points: Vector3[]): TopoPather[];
  dump(): TopoPatherDump;
}

class Cornice_IO extends WallMolding_IO {
  dump(
    entity: Cornice,
    callback?: (dump: unknown[], entity: Cornice) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumpResult = super.dump(entity, undefined, includeMetadata, options);
    const dumpData = dumpResult[0] as CorniceDump;

    dumpData.topoPathers = [];
    entity.topoPathers.map((topoPather: TopoPather) => {
      dumpData.topoPathers.push(topoPather.dump());
    });

    dumpData.offset = entity.offset;
    dumpData.autoFit = entity.autoFit;

    if (callback) {
      callback(dumpResult, entity);
    }

    return dumpResult;
  }

  load(entity: Cornice, dumpData: CorniceDump, options: DumpOptions): void {
    super.load(entity, dumpData, options);

    entity.topoPathers = dumpData.topoPathers
      ? dumpData.topoPathers.reduce((result: TopoPather[], topoPatherDump: TopoPatherDump) => {
          let topoPather: TopoPather | undefined;

          if (HSCore.Util.Version.isEarlierThan(options.version, "1.3")) {
            const hostEntity = Entity.loadFromDumpById(topoPatherDump.hostFaceId!, options);
            topoPather = new CorniceTopoPatherV120(
              hostEntity,
              parseInt(String(topoPatherDump.index)),
              topoPatherDump.isAux,
              topoPatherDump.from,
              topoPatherDump.to
            );
          } else if (topoPatherDump.curve) {
            const curve = Loader.load(topoPatherDump.curve);
            topoPather = new CorniceTopoPather(
              topoPatherDump.index,
              topoPatherDump.isAux,
              topoPatherDump.from,
              topoPatherDump.to,
              curve
            );
          }

          if (topoPather) {
            result.push(topoPather);
          }
          return result;
        }, [])
      : [];

    entity.offset = dumpData.offset;
    entity.autoFit = dumpData.autoFit;
  }
}

class Cornice extends WallMolding {
  @EntityField()
  topoPathers: TopoPather[] = [];

  @EntityField()
  offset: number = 0;

  @EntityField()
  autoFit: boolean = true;

  constructor(name: string = "", document?: unknown) {
    super(name, document);
    this.type = MoldingTypeEnum.Cornice;
  }

  clone(): Cornice {
    const cloned = new Cornice();
    cloned._copyFrom(this);
    return cloned;
  }

  protected _copyFrom(source: Cornice): void {
    super._copyFrom(source);
    this.offset = source.offset;
    this.autoFit = source.autoFit;
  }

  getIO(): Cornice_IO {
    return Cornice_IO.instance();
  }

  isSameMolding(other: Cornice): boolean {
    return super.isSameMolding(other);
  }

  getStartTopoPather(): TopoPather | undefined {
    const startCurve = this.sweepPath[0];

    for (const topoPather of this.topoPathers) {
      const sweepPath = topoPather.getSweepPath();
      if (!sweepPath) continue;

      if (this.offset) {
        sweepPath.transform(Matrix4.makeTranslate({ x: 0, y: 0, z: -this.offset }));
      }

      if (sweepPath.getStartPt().equals(startCurve.getStartPt()) && 
          sweepPath.getEndPt().equals(startCurve.getEndPt())) {
        return topoPather;
      }
    }

    return undefined;
  }

  getEndTopoPather(): TopoPather | undefined {
    const endCurve = this.sweepPath[this.sweepPath.length - 1];

    for (const topoPather of this.topoPathers) {
      const sweepPath = topoPather.getSweepPath();
      if (!sweepPath) continue;

      if (this.offset) {
        sweepPath.transform(Matrix4.makeTranslate({ x: 0, y: 0, z: -this.offset }));
      }

      if (sweepPath.getStartPt().equals(endCurve.getStartPt()) && 
          sweepPath.getEndPt().equals(endCurve.getEndPt())) {
        return topoPather;
      }
    }

    return undefined;
  }

  split(splitPoint: Vector3): Cornice[] {
    const EPSILON = 1e-4;
    const PARAM_EPSILON = 1e-6;

    if (this.topoPathers.length === 0) {
      Logger.console.assert(false, "所切割的踢脚线不合理，不存在扫掠路径!");
      return [];
    }

    let adjustedSplitPoint = splitPoint;
    if (Math.abs(this.offset) > EPSILON) {
      adjustedSplitPoint = new Vector3(splitPoint).transformed(
        Matrix4.makeTranslate({ x: 0, y: 0, z: this.offset })
      );
    }

    const sweepPaths = this.sweepPath;
    const segmentGroups: TopoPather[][] = [[]];

    for (const curve of sweepPaths) {
      const startParam = curve.getStartParam();
      const endParam = curve.getEndParam();
      const splitParam = curve.getParamAt(adjustedSplitPoint);

      const matchingTopoPather = this.topoPathers.find((topoPather: TopoPather) => {
        const topoPatherPath = topoPather.getSweepPath();
        if (!topoPatherPath) return false;

        if (Math.abs(this.offset) > EPSILON) {
          topoPatherPath.transform(Matrix4.makeTranslate({ x: 0, y: 0, z: -this.offset }));
        }

        return topoPatherPath.getStartPt().equals(curve.getStartPt()) && 
               topoPatherPath.getEndPt().equals(curve.getEndPt());
      });

      if (!matchingTopoPather) continue;

      if (startParam - splitParam < PARAM_EPSILON && endParam - splitParam > PARAM_EPSILON) {
        const splitSegments = matchingTopoPather.splitByPoints([adjustedSplitPoint]);

        if (splitSegments.length === 2) {
          segmentGroups[segmentGroups.length - 1].push(splitSegments[0]);
          segmentGroups.push([]);
          segmentGroups[segmentGroups.length - 1].push(splitSegments[1]);
        } else {
          Logger.console.assert(false, "切割踢脚线：切割段数不等于2，不太合理！");
          segmentGroups[segmentGroups.length - 1].push(matchingTopoPather);
        }
      } else {
        segmentGroups[segmentGroups.length - 1].push(matchingTopoPather);
      }
    }

    const resultCornices: Cornice[] = [];
    for (const segments of segmentGroups) {
      const clonedCornice = this.clone();
      clonedCornice.topoPathers = segments;
      resultCornices.push(clonedCornice);
    }

    return resultCornices;
  }

  addTopoPather(topoPather: TopoPather): boolean {
    if (!topoPather.getSweepPath()) {
      Logger.console.assert(false, "踢脚线：添加的路径为空！");
      return false;
    }

    if (this.topoPathers.length === 0) {
      this.topoPathers.push(topoPather);
      return true;
    }

    const allPaths = [...this.topoPathers, topoPather]
      .map((tp: TopoPather) => tp.getSweepPath())
      .filter((path): path is Curve => !!path);

    if (this.sortpaths(allPaths).length > 1) {
      Logger.console.assert(false, "踢脚线：新添加的路径不连续！");
      return false;
    }

    this.topoPathers.push(topoPather);
    this.topoPathers = [...this.topoPathers];
    return true;
  }

  get sweepPath(): Curve[] {
    return this.doc.relationshipManager.getSweepPathRelation().getData(this) || this.calcSweepPath();
  }

  calcSweepPath(): Curve[] {
    const OFFSET_EPSILON = 1e-6;

    if (!this.topoPathers.length) {
      return [];
    }

    const curves = this.topoPathers
      .map((topoPather: TopoPather) => topoPather.getSweepPath())
      .filter((curve): curve is Curve => !!curve);

    if (!curves.length) {
      Logger.console.assert(false, "扫掠路径为空!");
      return [];
    }

    const sortedPaths = this.sortpaths(curves).flat();

    if (Math.abs(this.offset) > OFFSET_EPSILON) {
      sortedPaths.forEach((curve: Curve) =>
        curve.transform(Matrix4.makeTranslate({ x: 0, y: 0, z: -this.offset }))
      );
    }

    return sortedPaths;
  }

  private sortpaths(curves: Curve[]): Curve[][] {
    const segments: CurveSegment[] = [];
    for (const curve of curves) {
      const startPoint = curve.getStartPt();
      const endPoint = curve.getEndPt();
      segments.push({
        start: startPoint,
        end: endPoint,
        curve: curve
      });
    }

    const pathGroups: CurveSegment[][] = [];

    for (const segment of segments) {
      if (pathGroups.flat().includes(segment)) {
        continue;
      }

      const currentGroup: CurveSegment[] = [segment];

      let foundConnection: boolean;
      do {
        foundConnection = false;
        for (const candidateSegment of segments) {
          if (currentGroup[0].curve !== candidateSegment.curve && 
              new Vector2(currentGroup[0].start).equals(candidateSegment.end)) {
            currentGroup.unshift(candidateSegment);
            foundConnection = true;
            break;
          }
        }
      } while (foundConnection);

      do {
        foundConnection = false;
        for (const candidateSegment of segments) {
          if (currentGroup[currentGroup.length - 1].curve !== candidateSegment.curve && 
              new Vector2(currentGroup[currentGroup.length - 1].end).equals(candidateSegment.start)) {
            currentGroup.push(candidateSegment);
            foundConnection = true;
            break;
          }
        }
      } while (foundConnection);

      pathGroups.push(currentGroup);
    }

    return pathGroups.map((group: CurveSegment[]) => group.map((seg: CurveSegment) => seg.curve));
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    if (fieldName === "offset") {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, oldValue, newValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.NgCornice, Cornice);
SweepPathRelationHandlers.registerHandler(
  HSConstants.ModelClass.NgCornice,
  (entity: Cornice) => entity.calcSweepPath()
);

export { Cornice_IO, Cornice };