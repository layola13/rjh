import { HSCore } from './HSCore';
import { Vector2, Polygon, MathAlg } from './MathUtils';

export class SwitchArcWallRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _wall: HSCore.Model.Wall;
  private readonly _toArc: boolean;
  private readonly _wallAttachItemPosition: Map<HSCore.Model.Content, Vector2>;
  private readonly _allWallBeforeData: Map<string, WallBeforeData>;
  private readonly _changedWalls: Set<HSCore.Model.Wall>;
  private readonly _openingUpdater: Map<string, OpeningUpdater>;

  constructor(wall: HSCore.Model.Wall, toArc: boolean) {
    super();
    this._wall = wall;
    this._toArc = toArc;
    this._wallAttachItemPosition = new Map();
    this._changedWalls = new Set();
    this._openingUpdater = new Map();

    const uniqueParent = this._wall.getUniqueParent();
    this._allWallBeforeData = HSCore.Util.TgWall.getWallBeforeData(
      Object.values(uniqueParent.walls)
    );

    HSCore.Util.TgWall.getJointLinkWalls(this._wall).forEach((linkedWall) => {
      this._changedWalls.add(linkedWall);
    });

    this._wall.forEachFace((face) => {
      face.forEachContent((content) => {
        if (
          !(content instanceof HSCore.Model.CustomizedFeatureModel) &&
          !(content instanceof HSCore.Model.NCustomizedSketchModel)
        ) {
          this._wallAttachItemPosition.set(content, new Vector2(content.x, content.y));
        }
      });
    });
  }

  onCommit(): HSCore.Model.Wall[] {
    const newCurve = HSCore.Util.TgWall.getWallCurve(
      this._wall.fromPoint,
      this._wall.toPoint,
      this._toArc
    );

    if (!newCurve) {
      return [];
    }

    const uniqueParent = this._wall.getUniqueParent();
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(uniqueParent);
    HSCore.Util.Joint.convertDIYTypeToXTypeJoints([this._wall]);

    const oldCurve = this._wall.curve;
    this._wall.curve = HSCore.Util.TgWall.getCurveByPositionCurve(this._wall, newCurve);

    if (
      (this._wall.isArcWall() && !this._wall.midPoint) ||
      (!this._wall.isArcWall() && this._wall.midPoint)
    ) {
      console.error('Middle point is wrong!');
    }

    HSCore.Util.Joint.covertJointsForArcSwitch(this._wall);
    HSCore.Util.TgWall.processWallsJoints([this._wall]);

    HSCore.Util.TgWall.getJointLinkWalls(this._wall).forEach((linkedWall) => {
      this._changedWalls.add(linkedWall);
    });

    this.updateContentsPosition(oldCurve, this._wall.curve);
    this._updateOpenings();

    HSCore.Util.TgWall.updateLayer(this._wall.getUniqueParent(), {
      preHoleBuild: () => {
        this._getPOpenings().forEach((opening) => {
          opening.updateOpeningPos();
        });
      },
    });

    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    super.onCommit();

    return [this._wall];
  }

  onUndo(): void {
    super.onUndo();
    const uniqueParent = this._wall.getUniqueParent();

    if (uniqueParent instanceof HSCore.Model.Layer) {
      Object.values(uniqueParent.openings)
        .filter((opening) => HSCore.Util.Content.isSlabOpening(opening))
        .forEach((opening) => {
          opening.dirtyGeometry();
        });
    }
  }

  onRedo(): void {
    super.onRedo();
    const uniqueParent = this._wall.getUniqueParent();

    if (uniqueParent instanceof HSCore.Model.Layer) {
      Object.values(uniqueParent.openings)
        .filter((opening) => HSCore.Util.Content.isSlabOpening(opening))
        .forEach((opening) => {
          opening.dirtyGeometry();
        });
    }
  }

  private _getPOpenings(): Set<HSCore.Model.ParametricOpening> {
    const parametricOpenings = new Set<HSCore.Model.ParametricOpening>();

    this._changedWalls.forEach((wall) => {
      wall.forEachContent((content) => {
        if (content instanceof HSCore.Model.ParametricOpening) {
          parametricOpenings.add(content);
        }
      });
    });

    return parametricOpenings;
  }

  private _updateOpenings(): void {
    this._changedWalls.forEach((wall) => {
      wall.forEachContent((content) => {
        if (
          content instanceof HSCore.Model.Opening ||
          (content instanceof HSCore.Model.ParametricOpening &&
            content.relatedWalls.length === 1)
        ) {
          if (!this._openingUpdater.has(content.id)) {
            const wallBeforeData = this._allWallBeforeData.get(wall.id);
            if (wallBeforeData) {
              this._openingUpdater.set(
                content.id,
                HSCore.Util.Opening.getWallChangeUpdater(
                  content,
                  {
                    wallCurve: wallBeforeData.curve,
                    openingPos: new Vector2(content),
                  },
                  wall
                )
              );
            }
          }
        }
      });
    });

    this._openingUpdater.forEach((updater) => {
      updater.update();
    });
  }

  private getSagitta(
    curve: Curve2d,
    tangent: Vector2,
    content: HSCore.Model.Content
  ): number {
    let sagittaValue = 0;
    let parallelCurve: Curve2d | undefined;

    const outlineLoop = this.getContentOffsetOutLineLoop(content);
    if (content.bound && outlineLoop) {
      outlineLoop.getAllCurves().some((outlineCurve) => {
        const curveVector = new Vector2(
          outlineCurve.getStartPt(),
          outlineCurve.getEndPt()
        );
        if (curveVector.isParallel(tangent)) {
          parallelCurve = outlineCurve;
          return true;
        }
        return false;
      });
    }

    if (parallelCurve) {
      const halfLength = 0.5 * parallelCurve.getLength();
      const radius = curve.getA() - this._wall.width / 2;
      sagittaValue = radius - Math.sqrt(radius * radius - halfLength * halfLength);
    }

    return sagittaValue;
  }

  private getContentOffsetOutLineLoop(
    content: HSCore.Model.Content,
    offset: number = 0
  ): Polygon {
    const outline = content.outline;
    return MathAlg.PolygonOffset.execute(new Polygon(outline), offset).offsetPolygon;
  }

  private updateContentsPosition(oldCurve: Curve2d, newCurve: Curve2d): void {
    const oldCurveLength = oldCurve.getRange().getLength();
    const oldStartParam = oldCurve.getStartParam();
    const newCurveLength = newCurve.getRange().getLength();
    const newStartParam = newCurve.getStartParam();

    this._wallAttachItemPosition.forEach((originalPosition, content) => {
      const oldParam = oldCurve.getParamAt(originalPosition);
      const oldPoint = oldCurve.getPtAt(oldParam);
      const newParam = newCurveLength * ((oldParam - oldStartParam) / oldCurveLength) + newStartParam;
      const newPoint = newCurve.getPtAt(newParam);
      const newTangent = newCurve.getTangentAt(newParam);
      const angle = HSCore.Util.Math.getAngleHorizontaleCCW(
        new HSCore.Util.Math.Vec2(0, 0),
        newTangent
      );

      content.rotation = -angle;

      let sagittaAdjustment = 0;
      if (newCurve.isArc2d()) {
        sagittaAdjustment = this.getSagitta(newCurve, newTangent, content);
      } else if (oldCurve.isArc2d()) {
        sagittaAdjustment = -this.getSagitta(oldCurve, newTangent, content);
      }

      const distanceFromCurve = originalPosition.distanceTo(oldPoint) + sagittaAdjustment;
      const isPositiveSide = MathAlg.CalculateDistance.pointToCurve2dSigned(originalPosition, oldCurve) > 0;
      const normalAngle = isPositiveSide ? -Math.PI / 2 : Math.PI / 2;
      const normalVector = newTangent.rotated(Vector2.O(), normalAngle).normalized();
      const finalPosition = newPoint.added(normalVector.multiply(distanceFromCurve));

      content.x = finalPosition.x;
      content.y = finalPosition.y;
    });
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '转直墙或者弧形墙操作';
  }

  getCurrentParams(): LogParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: '墙体操作',
      clicksRatio: {
        id: 'switchArcWall',
        name: '转为弧墙',
      },
    };
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}

interface WallBeforeData {
  curve: Curve2d;
}

interface OpeningUpdater {
  update(): void;
}

interface Curve2d {
  getRange(): { getLength(): number };
  getStartParam(): number;
  getParamAt(position: Vector2): number;
  getPtAt(param: number): Vector2;
  getTangentAt(param: number): Vector2;
  isArc2d(): boolean;
  getA(): number;
  getLength(): number;
  getStartPt(): Vector2;
  getEndPt(): Vector2;
}

interface LogParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}