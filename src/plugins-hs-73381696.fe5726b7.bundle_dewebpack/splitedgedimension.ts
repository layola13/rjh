import { CmdMoveSplitEdge } from './CmdMoveSplitEdge';

type HSEntity = any;
type HSContext = any;
type HSCanvas = any;
type HSCoEdge = any;
type HSEdge = any;
type HSFace = any;
type Vec2 = any;
type SignalHook = any;
type GizmoManager = any;
type CommandManager = any;

const MIN_WALL_LENGTH = HSConstants.Constants.MIN_WALL_LENGTH;
const MAX_WALL_LENGTH = HSConstants.Constants.MAX_WALL_LENGTH;

const Gizmo = HSApp.View.SVG.Gizmo;
const LinearDimensionStateEnum = HSApp.View.SVG.LinearDimensionStateEnum;
const DisplayController = HSApp.View.Base.DisplayController;

interface LinearDimension {
  updateState(state: number, value: boolean): void;
  min: number;
  max: number;
  signalHook: SignalHook;
  valueChangeCommit: string;
  onActivate(): void;
  onDeactivate(): void;
  draw(): void;
  hide(): void;
  show(): void;
  active: boolean;
  activate(): void;
  start: Vec2;
  end: Vec2;
  textPosition: Vec2;
  rotation: number;
  getValue(): number;
}

interface GizmoOptions {
  fontSize: number;
  arrowSize: number;
}

interface ValueChangeEvent {
  data: {
    value: number;
    oldValue: number;
    gizmo?: LinearDimension;
  };
}

interface SplitEdge {
  coedge: HSCoEdge;
  middle: Vec2;
}

function calculateNormalVector(coedge: HSCoEdge): Vec2 | undefined {
  if (!coedge) {
    return undefined;
  }

  const face = coedge.getUniqueParent()?.getUniqueParent();
  let rotationAngle = 90;

  if (face && face instanceof HSCore.Model.Ceiling) {
    rotationAngle = 270;
  }

  const direction = new HSCore.Util.Math.Vec2(
    coedge.to.x - coedge.from.x,
    coedge.to.y - coedge.from.y
  );

  return direction.rotate(HSCore.Util.Math.toRadians(rotationAngle)).normalize();
}

class SplitEdgeDimensionController extends DisplayController {
  private _cmdMgr: CommandManager;

  constructor(entity: HSEntity, context: HSContext) {
    super(entity, context);
  }

  dispatch(event: string, entity: SplitEdge, eventData: ValueChangeEvent): void {
    if (!eventData.data.gizmo) {
      return;
    }

    if (event === 'valueLeftChanged') {
      this._moveCoEdgeHandler(entity.coedge, eventData);
    } else if (event === 'valueRightChanged') {
      this._moveCoEdgeHandler(entity.coedge.partner, eventData);
    }
  }

  canEdit(): boolean {
    if (!this._cmdMgr || !this._cmdMgr.current) {
      return true;
    }

    return this._cmdMgr.current.type !== 'hsw.cmd.layer.CmdMoveSplitEdge';
  }

  private _moveCoEdgeHandler(coedge: HSCoEdge, event: ValueChangeEvent): void {
    const gizmo = event.data.gizmo;
    const normalVector = calculateNormalVector(coedge);
    const middlePoint = coedge.middle;
    const deltaValue = -event.data.value + gizmo.getValue();
    const offset = normalVector.clone().scale(deltaValue);
    const targetPosition = middlePoint.clone().add(offset);

    const commandData = {
      entity: coedge.edge,
      position: middlePoint
    };

    const command = this._cmdMgr.createCommand(
      'hsw.cmd.layer.CmdMoveSplitEdge',
      [coedge.edge]
    );
    command.showGizmo = false;

    this._cmdMgr.execute(command, commandData);
    this._cmdMgr.receive('gizmo.mousedown', { position: middlePoint });
    this._cmdMgr.receive('gizmo.mousemove', { offset });
    this._cmdMgr.receive('gizmo.mouseup', { position: targetPosition });
    this._cmdMgr.complete();
  }
}

export class SplitEdgeDimension extends Gizmo {
  private lengthDimensionLeft: LinearDimension;
  private lengthDimensionRight: LinearDimension;
  private controller: SplitEdgeDimensionController;
  private entity: SplitEdge;
  private context: HSContext;

  constructor(context: HSContext, canvas: HSCanvas, entity: SplitEdge) {
    const controller = new SplitEdgeDimensionController(entity, context);
    super(context, canvas, entity, controller);

    this.entity = entity;
    this.context = context;
    this.controller = controller;

    const canMoveEdge = CmdMoveSplitEdge.canMoveEdge(entity);

    this.lengthDimensionLeft = this._createLinearDimension(context, canvas);
    this.lengthDimensionLeft.updateState(LinearDimensionStateEnum.editable, canMoveEdge);
    this.lengthDimensionLeft.updateState(LinearDimensionStateEnum.focus, true);
    this.lengthDimensionLeft.min = MIN_WALL_LENGTH;
    this.lengthDimensionLeft.max = MAX_WALL_LENGTH;
    this.lengthDimensionLeft.signalHook.listen(
      this.lengthDimensionLeft.valueChangeCommit,
      this._onLengthLeftValueChangeCommit.bind(this)
    );

    this.lengthDimensionRight = this._createLinearDimension(context, canvas);
    this.lengthDimensionRight.updateState(LinearDimensionStateEnum.editable, canMoveEdge);
    this.lengthDimensionRight.updateState(LinearDimensionStateEnum.focus, false);
    this.lengthDimensionRight.min = MIN_WALL_LENGTH;
    this.lengthDimensionRight.max = MAX_WALL_LENGTH;
    this.lengthDimensionRight.signalHook.listen(
      this.lengthDimensionRight.valueChangeCommit,
      this._onLengthRightValueChangeCommit.bind(this)
    );

    this.addChildGizmo(this.lengthDimensionLeft);
    this.addChildGizmo(this.lengthDimensionRight);
  }

  private _createLinearDimension(context: HSContext, canvas: HSCanvas): LinearDimension {
    return this.context.hscanvas.gizmoManager.createGizmoByName(
      'LinearDimension',
      context,
      canvas,
      this.entity,
      {
        fontSize: 27,
        arrowSize: 20
      }
    );
  }

  canDraw(): boolean {
    return true;
  }

  onActivate(): void {
    this.lengthDimensionLeft.onActivate();
    this.lengthDimensionRight.onActivate();
    this.update();
    super.onActivate();
  }

  onDeactivate(): void {
    this.lengthDimensionLeft?.onDeactivate();
    this.lengthDimensionRight?.onDeactivate();
    this.unlistenAllEvents();
    super.onDeactivate();
  }

  onCleanup(): void {
    this.lengthDimensionLeft = undefined;
    this.lengthDimensionRight = undefined;
    super.onCleanup();
  }

  private _onLengthLeftValueChangeCommit(event: ValueChangeEvent): void {
    if (HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      return;
    }

    this.controller.dispatch('valueLeftChanged', this.entity, event);
  }

  private _onLengthRightValueChangeCommit(event: ValueChangeEvent): void {
    if (HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      return;
    }

    this.controller.dispatch('valueRightChanged', this.entity, event);
  }

  draw(): void {
    if (this.canDraw()) {
      this._updateDimension();
      this.show();
    } else {
      this.hide();
    }

    this.lengthDimensionLeft.draw();
    this.lengthDimensionRight.draw();
    super.draw();
  }

  update(): void {
    this._updateDimension();
  }

  private _updateDimension(): void {
    const entity = this.entity;

    if (!entity) {
      this.reset();
      return;
    }

    const coedge = entity.coedge;

    if (!coedge) {
      this.reset();
      return;
    }

    const partnerCoedge = coedge.partner;
    const leftLoop = coedge?.getUniqueParent();
    const rightLoop = partnerCoedge?.getUniqueParent();
    const leftFace = leftLoop?.getUniqueParent();
    const rightFace = rightLoop?.getUniqueParent();
    const middlePoint = entity.middle;
    const leftNormal = calculateNormalVector(coedge);
    const rightNormal = calculateNormalVector(partnerCoedge);
    const leftIntersection = this.findIntersectionPoint(leftLoop, middlePoint, leftNormal);
    const rightIntersection = this.findIntersectionPoint(rightLoop, middlePoint, rightNormal);

    this.updateSingleDimension(
      leftFace,
      middlePoint,
      leftIntersection,
      this.lengthDimensionLeft,
      true
    );

    this.updateSingleDimension(
      rightFace,
      middlePoint,
      rightIntersection,
      this.lengthDimensionRight,
      false
    );
  }

  private findIntersectionPoint(loop: any, point: Vec2, normal: Vec2): Vec2 | undefined {
    if (!loop) {
      return undefined;
    }

    let closestIntersection: Vec2 | undefined;
    const entity = this.entity;

    loop.forEachCoEdge((loopCoedge: HSCoEdge) => {
      if (loopCoedge.edge === entity) {
        return;
      }

      const rayEnd = new HSCore.Util.Math.Vec2(point.x + normal.x, point.y + normal.y);
      const intersection = HSCore.Util.Math.raySegmentIntersection(
        point,
        rayEnd,
        loopCoedge.from,
        loopCoedge.to
      );

      if (!intersection) {
        return;
      }

      const intersectionPoint = new HSCore.Util.Math.Vec2(intersection.x, intersection.y);

      if (closestIntersection) {
        if (intersectionPoint.distanceToSquared(point) < closestIntersection.distanceToSquared(point)) {
          closestIntersection = intersectionPoint;
        }
      } else {
        closestIntersection = intersectionPoint;
      }
    });

    return closestIntersection;
  }

  private updateSingleDimension(
    face: HSFace,
    point: Vec2,
    intersection: Vec2 | undefined,
    dimension: LinearDimension,
    isFocused: boolean
  ): void {
    if (!face || !intersection || !point) {
      dimension.updateState(LinearDimensionStateEnum.focus, false);
      dimension.hide();
      return;
    }

    const clippedSegment = this.clipSegmentWithFace([point, intersection], face);

    if (!clippedSegment) {
      return;
    }

    HSApp.View.SVG.Util.ModelToScreenFactor(this.context);

    const direction = new HSCore.Util.Math.Vec2(
      intersection.x - point.x,
      intersection.y - point.y
    );
    direction.normalize();

    const perpendicular = HSCore.Util.Math.Vec2.rotateAroundPoint(
      direction,
      { x: 0, y: 0 },
      -Math.PI / 2
    );

    const baseOffset = new HSCore.Util.Math.Vec2(0, 0);
    const textOffset = perpendicular.clone().scale(0);
    const rotation = -HSCore.Util.Math.getAngleHorizontaleCCW(clippedSegment[0], clippedSegment[1]);

    const startPoint = HSCore.Util.Math.Vec2.fromCoordinate(clippedSegment[0]);
    const endPoint = HSCore.Util.Math.Vec2.fromCoordinate(clippedSegment[1]);
    const textPosition = HSCore.Util.Math.Vec2.lerp(startPoint, endPoint, 0.5);

    startPoint.add(baseOffset);
    endPoint.add(baseOffset);
    textPosition.add(baseOffset).add(textOffset);

    dimension.start = startPoint;
    dimension.end = endPoint;
    dimension.textPosition = textPosition;
    dimension.rotation = rotation;

    if (!dimension.active) {
      dimension.activate();
    }

    const canEdit = this.controller.canEdit();
    dimension.updateState(LinearDimensionStateEnum.editable, canEdit);
    dimension.updateState(LinearDimensionStateEnum.focus, isFocused);
    dimension.show();
  }

  private clipSegmentWithFace(segment: Vec2[], face: HSFace): Vec2[] | undefined {
    const faceInnerPath = HSCore.Util.Ceiling.getFaceInnerPath(face);
    const clipOptions = {
      operation: HSCore.Util.Collision.ClipType.inter,
      closed: false
    };

    const result = HSCore.Util.Collision.ClipPolygon([segment], [faceInnerPath], clipOptions);

    return result && result.length > 0 ? result[0] : undefined;
  }

  reset(): void {
    this.lengthDimensionLeft.updateState(LinearDimensionStateEnum.focus, true);
    this.lengthDimensionLeft.hide();
    this.lengthDimensionLeft.draw();

    this.lengthDimensionRight.updateState(LinearDimensionStateEnum.focus, false);
    this.lengthDimensionRight.hide();
    this.lengthDimensionRight.draw();
  }
}