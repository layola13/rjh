import { WallIntersectResolver } from './WallIntersectResolver';
import { WallUtil } from './WallUtil';

interface Wall {
  from: THREE.Vector3;
  to: THREE.Vector3;
}

interface TrimResult {
  sourceGeom: THREE.Vector3[];
  targetGeom: THREE.Vector3[];
}

export class WallTrimResolver {
  private readonly sourceWall: Wall;
  private readonly targetWall: Wall;
  private readonly sourcePoint: THREE.Vector3;
  private readonly targetPoint: THREE.Vector3;
  private readonly sourceGeom: THREE.Vector3[];
  private readonly targetGeom: THREE.Vector3[];
  
  public sourceGeomNew: THREE.Vector3[];
  public targetGeomNew: THREE.Vector3[];

  constructor(
    sourceWall: Wall,
    sourcePoint: THREE.Vector3,
    sourceGeom: THREE.Vector3[],
    targetWall: Wall,
    targetPoint: THREE.Vector3,
    targetGeom: THREE.Vector3[]
  ) {
    this.sourceWall = sourceWall;
    this.targetWall = targetWall;
    this.sourcePoint = sourcePoint;
    this.targetPoint = targetPoint;
    this.sourceGeom = sourceGeom;
    this.targetGeom = targetGeom;
    this.sourceGeomNew = [];
    this.targetGeomNew = [];
  }

  public execute(): void {
    let result: TrimResult;

    if (WallUtil.isArcWall(this.sourceWall) && WallUtil.isArcWall(this.targetWall)) {
      result = this._arcWallTrimArcWall();
    } else if (!WallUtil.isArcWall(this.sourceWall) && WallUtil.isArcWall(this.targetWall)) {
      result = this._lineWallTrimArcWall();
    } else if (WallUtil.isArcWall(this.sourceWall) && !WallUtil.isArcWall(this.targetWall)) {
      result = this._arcWallTrimLineWall();
    } else {
      result = this._lineWallTrimLineWall();
    }

    this.sourceGeomNew = result.sourceGeom;
    this.targetGeomNew = result.targetGeom;
  }

  private _lineWallTrimLineWall(): TrimResult {
    const angle = WallIntersectResolver.calcWallAngle(
      this.sourceWall,
      this.sourcePoint,
      this.targetWall,
      this.targetPoint
    );
    const overlapAngleThreshold = WallIntersectResolver.overlapAngle;

    if (GeLib.MathUtils.largerOrEqual(angle, Math.PI - overlapAngleThreshold)) {
      return this._calcLineTrimLineWithBisector();
    }

    const sourceDirection = WallUtil.getWallDirection(this.sourceWall, undefined);
    const targetDirection = WallUtil.getWallDirection(this.targetWall, undefined);

    if (GeLib.VectorUtils.isNormalParallel(sourceDirection, targetDirection)) {
      return {
        sourceGeom: this.sourceGeom,
        targetGeom: this.targetGeom
      };
    }

    const sourceLine1 = new THREE.Line3(this.sourceGeom[0], this.sourceGeom[1]);
    const sourceLine2 = new THREE.Line3(this.sourceGeom[2], this.sourceGeom[3]);
    const targetLine1 = new THREE.Line3(this.targetGeom[0], this.targetGeom[1]);
    const targetLine2 = new THREE.Line3(this.targetGeom[2], this.targetGeom[3]);

    const intersection1 = GeLib.LineUtils.getIntersection(sourceLine1, targetLine1);
    const intersection2 = GeLib.LineUtils.getIntersection(sourceLine1, targetLine2);
    const intersection3 = GeLib.LineUtils.getIntersection(sourceLine2, targetLine1);
    const intersection4 = GeLib.LineUtils.getIntersection(sourceLine2, targetLine2);

    if (this.targetPoint !== this.targetWall.from) {
      targetDirection.negate();
    }

    const isOnLeft = GeLib.VectorUtils.isOnLeft(targetDirection, sourceDirection);
    const newSourceGeom: THREE.Vector3[] = [];
    const newTargetGeom: THREE.Vector3[] = [];

    if (this.sourcePoint === this.sourceWall.from) {
      newSourceGeom.push(this.sourceGeom[1]);
      newSourceGeom.push(this.sourceGeom[2]);

      if (isOnLeft) {
        if (this.targetPoint === this.targetWall.from) {
          newSourceGeom.push(intersection3);
          newSourceGeom.push(intersection1);
          newTargetGeom.push(intersection2);
          newTargetGeom.push(intersection1);
          newTargetGeom.push(this.targetGeom[1]);
          newTargetGeom.push(this.targetGeom[2]);
        } else {
          newSourceGeom.push(intersection4);
          newSourceGeom.push(intersection2);
          newTargetGeom.push(intersection1);
          newTargetGeom.push(intersection2);
          newTargetGeom.push(this.targetGeom[3]);
          newTargetGeom.push(this.targetGeom[0]);
        }
      } else {
        if (this.targetPoint === this.targetWall.from) {
          newSourceGeom.push(intersection4);
          newSourceGeom.push(intersection2);
          newTargetGeom.push(intersection4);
          newTargetGeom.push(intersection3);
          newTargetGeom.push(this.targetGeom[1]);
          newTargetGeom.push(this.targetGeom[2]);
        } else {
          newSourceGeom.push(intersection3);
          newSourceGeom.push(intersection1);
          newTargetGeom.push(intersection3);
          newTargetGeom.push(intersection4);
          newTargetGeom.push(this.targetGeom[3]);
          newTargetGeom.push(this.targetGeom[0]);
        }
      }
    } else {
      newSourceGeom.push(this.sourceGeom[3]);
      newSourceGeom.push(this.sourceGeom[0]);

      if (isOnLeft) {
        if (this.targetPoint === this.targetWall.from) {
          newSourceGeom.push(intersection2);
          newSourceGeom.push(intersection4);
          newTargetGeom.push(intersection2);
          newTargetGeom.push(intersection1);
          newTargetGeom.push(this.targetGeom[1]);
          newTargetGeom.push(this.targetGeom[2]);
        } else {
          newSourceGeom.push(intersection1);
          newSourceGeom.push(intersection3);
          newTargetGeom.push(intersection1);
          newTargetGeom.push(intersection2);
          newTargetGeom.push(this.targetGeom[3]);
          newTargetGeom.push(this.targetGeom[0]);
        }
      } else {
        if (this.targetPoint === this.targetWall.from) {
          newSourceGeom.push(intersection1);
          newSourceGeom.push(intersection3);
          newTargetGeom.push(intersection4);
          newTargetGeom.push(intersection3);
          newTargetGeom.push(this.targetGeom[1]);
          newTargetGeom.push(this.targetGeom[2]);
        } else {
          newSourceGeom.push(intersection2);
          newSourceGeom.push(intersection4);
          newTargetGeom.push(intersection3);
          newTargetGeom.push(intersection4);
          newTargetGeom.push(this.targetGeom[3]);
          newTargetGeom.push(this.targetGeom[0]);
        }
      }
    }

    return {
      sourceGeom: newSourceGeom,
      targetGeom: newTargetGeom
    };
  }

  private _calcLineTrimLineWithBisector(): TrimResult {
    const intersection1 = new WallIntersectResolver(
      this.sourceWall,
      true,
      this.sourcePoint,
      this.targetWall,
      this.targetPoint === this.targetWall.from,
      [this.targetPoint]
    ).calcIntersection();

    const intersection2 = new WallIntersectResolver(
      this.sourceWall,
      false,
      this.sourcePoint,
      this.targetWall,
      this.targetPoint !== this.targetWall.from,
      [this.targetPoint]
    ).calcIntersection();

    const sourceGeometry = WallUtil.unshelveredWallGeometry(this.sourceWall);
    const targetGeometry = WallUtil.unshelveredWallGeometry(this.targetWall);

    if (sourceGeometry && targetGeometry) {
      if (this.sourcePoint === this.sourceWall.from) {
        sourceGeometry[0] = intersection1.intersect;
        sourceGeometry[3] = intersection2.intersect;

        if (this.targetPoint === this.targetWall.from) {
          targetGeometry[0] = intersection2.intersect;
          targetGeometry[3] = intersection1.intersect;
        } else {
          targetGeometry[1] = intersection1.intersect;
          targetGeometry[2] = intersection2.intersect;
        }
      } else {
        sourceGeometry[1] = intersection1.intersect;
        sourceGeometry[2] = intersection2.intersect;

        if (this.targetPoint === this.targetWall.from) {
          targetGeometry[0] = intersection1.intersect;
          targetGeometry[3] = intersection2.intersect;
        } else {
          targetGeometry[1] = intersection2.intersect;
          targetGeometry[2] = intersection1.intersect;
        }
      }
    }

    return {
      sourceGeom: sourceGeometry,
      targetGeom: targetGeometry
    };
  }

  private _lineWallTrimArcWall(): TrimResult {
    return {
      sourceGeom: this.sourceGeom,
      targetGeom: this.targetGeom
    };
  }

  private _arcWallTrimLineWall(): TrimResult {
    return {
      sourceGeom: this.sourceGeom,
      targetGeom: this.targetGeom
    };
  }

  private _arcWallTrimArcWall(): TrimResult {
    return {
      sourceGeom: this.sourceGeom,
      targetGeom: this.targetGeom
    };
  }
}