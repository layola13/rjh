import { Vector2, Line2d, CONST } from './geometry';
import { HSCore } from './core';
import { HSApp } from './app';
import { HSFPConstants } from './constants';

const JointPointType = HSCore.Model.JointPointType;

interface WallInfo {
  curve: any;
  jointCurve: any;
}

interface BeforeData {
  point: Vector2;
}

interface LinkWallInfo {
  wall: any;
  type: HSCore.Model.JointPointType;
}

export class MoveTGWallPointRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _wall: any;
  private readonly _pointType: HSCore.Model.JointPointType;
  private readonly _dragPoint: any;
  private _moveBeginPos!: Vector2;
  private readonly _beginWallInfo: Map<string, WallInfo> = new Map();
  private _rotateCenter!: Vector2;
  private readonly _wallAttachItemPosition: Map<any, Vector2> = new Map();
  private readonly _beforeData: Map<string, BeforeData> = new Map();
  private _allWallBeforeData!: Map<string, any>;
  private readonly _changedWalls: Set<any> = new Set();
  private readonly _openingUpdater: Map<string, any> = new Map();

  constructor(wall: any, pointType: HSCore.Model.JointPointType, dragPoint: any) {
    super();
    
    this._wall = wall;
    this._pointType = pointType;
    this._dragPoint = dragPoint;

    switch (pointType) {
      case JointPointType.from:
        this._moveBeginPos = this._wall.positionCurve.getStartPt().clone();
        this._rotateCenter = this._wall.positionCurve.getEndPt().clone();
        break;
      case JointPointType.to:
        this._moveBeginPos = this._wall.positionCurve.getEndPt().clone();
        this._rotateCenter = this._wall.positionCurve.getStartPt().clone();
        break;
      default:
        this._moveBeginPos = this._wall.positionCurve.getMidPt().clone();
        this._rotateCenter = this._wall.positionCurve.getMidPt().clone();
    }

    this._allWallBeforeData = HSCore.Util.TgWall.getWallBeforeData(
      Object.values(this._wall.getUniqueParent().walls)
    );

    HSCore.Util.TgWall.getJointLinkWalls(this._wall).forEach((linkedWall: any) => {
      this._changedWalls.add(linkedWall);
    });

    const connectedWalls = HSCore.Util.TgWall.getWallConnectedWalls(this._wall);
    for (const currentWall of [this._wall, ...connectedWalls]) {
      this._beginWallInfo.set(currentWall.id, {
        curve: currentWall.curve.clone(),
        jointCurve: currentWall.jointCurve.clone()
      });
    }

    this._wall.forEachFace((face: any) => {
      if (face.getMaster().id === this._wall.id) {
        face.forEachContent((content: any) => {
          if (
            !(content instanceof HSCore.Model.CustomizedFeatureModel) &&
            !(content instanceof HSCore.Model.NCustomizedSketchModel)
          ) {
            this._wallAttachItemPosition.set(content, new Vector2(content.x, content.y));
          }
        });
      }
    });

    this._convertDIYJoints();

    const layer = HSCore.Util.Layer.getEntityLayer(wall);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);
  }

  override onReceive(event: string, data: any): boolean {
    if (event !== 'gizmo.mousemove') {
      return super.onReceive(event, data);
    }

    const offset = new Vector2(data.offset);
    this._move(offset);
    return true;
  }

  private _move(offset: Vector2): void {
    const originalWallDump = this._wall.dump();

    if (
      this._pointType === JointPointType.from ||
      this._pointType === JointPointType.to
    ) {
      this._moveWallEndPoint(offset);
      this._moveWallAttachmentItem(offset);
    } else {
      this._moveArcWallMiddlePoint(offset);
    }

    this._convertJoint();
    this._updateLinkedWalls(this._wall, this._beginWallInfo);
    HSCore.Util.TgWall.processWallsJoints([this._wall]);

    HSCore.Util.TgWall.getJointLinkWalls(this._wall).forEach((linkedWall: any) => {
      this._changedWalls.add(linkedWall);
    });

    this._updateOpenings();

    if (this._wall.curve.getLength() === 0) {
      HSApp.App.getApp().errorLogger.push('wall length is zero!', {
        errorStack: new Error('wall length is zero!'),
        description: '墙体修改后长度为零',
        errorInfo: {
          info: 'wall length is zero!',
          path: {
            file: '/homestyler-tools-web/web/plugin/walledit/request/movetgwallpointrequest.ts',
            functionName: '_move()',
            functionParams: {
              originWall: originalWallDump,
              newWall: this._wall.dump(),
              changedWalls: Array.from(this._changedWalls).map((wall: any) => wall.dump()),
              offset
            }
          }
        }
      });
    }
  }

  private _updateLinkedWalls(wall: any, beginWallInfo: Map<string, WallInfo>): void {
    const joints = HSApp.App.getApp().floorplan.wallJointManager.getWallJoints(wall);

    for (const joint of joints) {
      const wallPointType = joint.getWallPointType(wall);
      const linkWallInfo: LinkWallInfo | undefined = joint.getLinkWallInfo(wall);

      if (!linkWallInfo) continue;

      const { wall: linkedWall, type: linkType } = linkWallInfo;

      if (joint.type & HSCore.Model.JointType.Tangent && linkType !== JointPointType.between) {
        const tangentLine = wallPointType === JointPointType.from
          ? new Line2d(wall.from, wall.to).rotate(CONST.PI_2, wall.from)
          : new Line2d(wall.to, wall.from).rotate(CONST.PI_2, wall.to);

        HSCore.Util.TgWall.updateTangentWalls(linkedWall, linkType, tangentLine);
      } else if (
        wallPointType &&
        wallPointType === JointPointType.between &&
        linkType !== JointPointType.between
      ) {
        const wallInfo = beginWallInfo.get(linkedWall.id);
        if (!wallInfo) continue;

        const { curve, jointCurve } = wallInfo;
        const positionCurve = HSCore.Util.TgWall.getPositionCurveByCurve(linkedWall, curve);
        const jointPoint = joint.point;

        if (jointPoint) {
          const offset = HSCore.Util.Joint.isFromPointType(linkType)
            ? jointPoint.subtracted(jointCurve.getStartPt())
            : jointPoint.subtracted(jointCurve.getEndPt());

          switch (linkType) {
            case JointPointType.from:
              linkedWall.updateFromPoint(positionCurve.getStartPt().add(offset));
              break;
            case JointPointType.to:
              linkedWall.updateToPoint(positionCurve.getEndPt().add(offset));
              break;
          }
        }
      }
    }
  }

  private _updateOpenings(): void {
    this._changedWalls.forEach((wall: any) => {
      wall.forEachContent((content: any) => {
        const isOpening = content instanceof HSCore.Model.Opening;
        const isParametricOpeningWithSingleWall =
          content instanceof HSCore.Model.ParametricOpening &&
          content.relatedWalls.length === 1;

        if (isOpening || isParametricOpeningWithSingleWall) {
          if (!this._openingUpdater.has(content.id)) {
            const updater = HSCore.Util.Opening.getWallChangeUpdater(
              content,
              {
                wallCurve: this._allWallBeforeData.get(wall.id).curve,
                openingPos: new Vector2(content)
              },
              wall
            );
            this._openingUpdater.set(content.id, updater);
          }
        }
      });
    });

    this._openingUpdater.forEach((updater: any) => updater.update());
  }

  private _moveWallAttachmentItem(offset: Vector2): void {
    this._wallAttachItemPosition.forEach((originalPos: Vector2, item: any) => {
      const wall = this._wall;
      const beginPos = this._moveBeginPos;

      if (wall && item && beginPos) {
        item.rotation = HSCore.Util.Math.getNearestParallelAngle(
          item.rotation,
          wall.rotation
        );

        if (!this._beforeData.get(item.id)) {
          this._beforeData.set(item.id, { point: beginPos });
        }

        const beforePoint = this._beforeData.get(item.id)?.point;
        if (beforePoint) {
          const lerpFactor = HSCore.Util.Math.getLerpNumber(
            this._rotateCenter,
            beforePoint,
            originalPos
          );
          const scaledOffset = offset.multiplied(lerpFactor);
          item.x = originalPos.x + scaledOffset.x;
          item.y = originalPos.y + scaledOffset.y;
        }
      }
    });
  }

  private _moveArcWallMiddlePoint(offset: Vector2): void {
    const sagittaComponent = offset.dot(this._wall.sagittaDirection);
    const sagittaOffset = this._wall.sagittaDirection.multiplied(sagittaComponent);
    const newMidPoint = this._moveBeginPos.added(sagittaOffset);
    this._wall.updateMidPoint(newMidPoint);
  }

  override onCommit(): any[] {
    const layer = HSCore.Util.Layer.getEntityLayer(this._wall);
    if (!layer) return [];

    const modifiedWalls = new Set([this._wall]);

    if (this._pointType !== JointPointType.between) {
      HSCore.Util.TgWall.unlinkWallJoints([this._wall]).forEach((wall: any) => {
        modifiedWalls.add(wall);
      });

      this._convertTShapeToLShape();
      HSCore.Util.TgWall.createWallJoints(this._wall, Object.values(layer.walls));
    }

    HSCore.Util.TgWall.processWallsJoints(Array.from(modifiedWalls));

    HSCore.Util.TgWall.getJointLinkWalls(this._wall).forEach((linkedWall: any) => {
      this._changedWalls.add(linkedWall);
    });

    this._updateOpenings();

    HSCore.Util.TgWall.updateLayerByWalls(Object.values(layer.walls), layer, {
      preHoleBuild: () => {
        this._getPOpenings().forEach((opening: any) => opening.updateOpeningPos());
      }
    });

    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    super.onCommit();

    const affectedWalls = HSApp.App.getApp()
      .floorplan.wallJointManager.getWallJoints(this._wall)
      .map((joint: any) => joint.walls)
      .flat();

    return Array.from(new Set(affectedWalls));
  }

  override onUndo(): void {
    super.onUndo();
    const parent = this._wall.getUniqueParent();
    if (parent instanceof HSCore.Model.Layer) {
      Object.values(parent.openings)
        .filter((opening: any) => HSCore.Util.Content.isSlabOpening(opening))
        .forEach((opening: any) => opening.dirtyGeometry());
    }
  }

  override onRedo(): void {
    super.onRedo();
    const parent = this._wall.getUniqueParent();
    if (parent instanceof HSCore.Model.Layer) {
      Object.values(parent.openings)
        .filter((opening: any) => HSCore.Util.Content.isSlabOpening(opening))
        .forEach((opening: any) => opening.dirtyGeometry());
    }
  }

  private _convertJoint(): void {
    this._convertTangentJoint();
  }

  private _convertTShapeToLShape(): void {
    const betweenJoint = HSApp.App.getApp()
      .floorplan.wallJointManager.getWallJoints(this._wall)
      .find((joint: any) => {
        return joint.getWallPointType(this._wall) === JointPointType.between;
      });

    if (betweenJoint) {
      const linkInfo = betweenJoint.getLinkWallInfo(this._wall);
      if (
        linkInfo &&
        linkInfo.type !== JointPointType.between &&
        this._pointType !== JointPointType.between
      ) {
        HSCore.Util.Joint.convertTShapeToLShape(
          linkInfo.wall,
          linkInfo.type,
          this._pointType,
          true
        );
      }
    }
  }

  private _convertTangentJoint(): void {
    if (this._pointType !== JointPointType.between) {
      const oppositePointType =
        this._pointType === JointPointType.from
          ? JointPointType.to
          : JointPointType.from;

      HSCore.Util.Joint.convertTangentShapeToLShape(this._wall, oppositePointType);
      HSCore.Util.Joint.convertLShapeToTangentShape(this._wall, oppositePointType);
    }
  }

  private _getPOpenings(): Set<any> {
    const parametricOpenings = new Set();
    this._changedWalls.forEach((wall: any) => {
      wall.forEachContent((content: any) => {
        if (content instanceof HSCore.Model.ParametricOpening) {
          parametricOpenings.add(content);
        }
      });
    });
    return parametricOpenings;
  }

  private _moveWallEndPoint(offset: Vector2): void {
    if (this._pointType !== JointPointType.between) {
      const isFromPoint = this._pointType === JointPointType.from;
      const newPoint = this._moveBeginPos.added(offset);

      if (isFromPoint) {
        this._wall.updateFromPoint(newPoint);
      } else {
        this._wall.updateToPoint(newPoint);
      }
    }
  }

  private _disconnectWallJoints(): void {
    if (this._pointType !== JointPointType.between && this._dragPoint) {
      const wallJointManager = HSApp.App.getApp().floorplan.wallJointManager;
      const endJoints = wallJointManager.getWallEndJoints(this._wall, this._pointType);
      const connectedWalls = HSCore.Util.TgWall.getPointConnectedWalls(
        this._wall,
        this._pointType
      );
      connectedWalls.push(this._wall);

      endJoints.forEach((joint: any) => joint.destroy());

      const wallLinks = connectedWalls.map((wall: any) =>
        wallJointManager.getWallLink(wall)
      );
      const allJoints = connectedWalls
        .map((wall: any) => wallJointManager.getWallJoints(wall))
        .flat();

      HSCore.Util.TgWall.buildJoint(Array.from(new Set(allJoints)), wallLinks);
    }
  }

  override canTransactField(): boolean {
    return true;
  }

  override getDescription(): string {
    return '通过墙体连接点移动墙体';
  }

  override getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }

  override onActivate(): void {
    this._disconnectWallJoints();
    this._convertDIYJoints();
  }

  private _convertDIYJoints(): void {
    const joints = HSApp.App.getApp().floorplan.wallJointManager.getWallJoints(
      this._wall
    );

    for (const joint of joints) {
      if (joint.type === HSCore.Model.JointType.DIYJoint) {
        joint.type = HSCore.Model.JointType.XMiter;
      }
    }
  }
}