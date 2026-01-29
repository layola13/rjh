interface CornerWindowParameters {
  sideA?: number;
  sideB?: number;
  sideC?: number;
  sideD?: number;
}

interface Vector2D {
  x: number;
  y: number;
}

interface GizmoParameter {
  Dir: Vector2D;
  EditFlag: number;
}

interface DragMoveEvent {
  offset: [number, number];
}

interface SliderDragEvent {
  parameters?: CornerWindowParameters;
}

interface TransactionSession {
  commit(): void;
  abort(): void;
}

interface TransactionManager {
  startSession(options: { undoRedo: boolean }): TransactionSession;
  createRequest(type: number, params: unknown[]): unknown;
  commit(request: unknown, sync: boolean): void;
}

interface Context {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

/**
 * Command for editing corner window parameters through drag interactions or slider controls.
 * Supports both immediate commits and session-based transactions.
 */
export default class EditCornerWindowCommand extends HSApp.Cmd.Command {
  private readonly _cornerWindow: any;
  private readonly _parametersInitial: CornerWindowParameters;
  private readonly _xInitial: number;
  private readonly _yInitial: number;
  private readonly _requestType: number;
  private _parameters: CornerWindowParameters;
  private readonly _targetSize?: unknown;
  private readonly _gizmoParam?: GizmoParameter;
  private _session?: TransactionSession;

  constructor(
    cornerWindow: any,
    parameters: CornerWindowParameters,
    targetSize: unknown,
    gizmoParam: GizmoParameter,
    reserved: unknown
  ) {
    super();
    
    this._cornerWindow = cornerWindow;
    this._parametersInitial = this._cornerWindow.parameters;
    this._xInitial = this._cornerWindow.x;
    this._yInitial = this._cornerWindow.y;
    this._requestType = HSFPConstants.RequestType.EditCornerWindow;
    this._parameters = parameters;
    this._targetSize = targetSize;
    this._gizmoParam = gizmoParam;
  }

  onExecute(): void {
    if (this._targetSize) {
      this._commitRequest();
      this.mgr.complete(this);
    } else {
      const transManager = this.context.transManager;
      this._session = transManager.startSession({ undoRedo: false });
    }
  }

  private _commitRequest(offset?: Vector2D): void {
    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      this._requestType,
      [this._cornerWindow, this._parameters, this._gizmoParam, offset]
    );
    transManager.commit(request, true);
  }

  canUndoRedo(): boolean {
    return false;
  }

  onCleanup(): void {
    this._session?.abort();
  }

  onReceive(eventType: string, eventData?: DragMoveEvent | SliderDragEvent): boolean {
    let shouldContinue = true;

    switch (eventType) {
      case 'dragmove':
        if (this._gizmoParam && 'offset' in eventData!) {
          const targetSizeAndOffset = this._getTargetSizeAndOffset(
            (eventData as DragMoveEvent).offset
          );
          this._commitRequest(targetSizeAndOffset);
        }
        break;

      case 'dragend':
        this._session!.commit();
        this._session = undefined;
        this.mgr.complete(this);
        break;

      case 'sliderdragmove':
        this._parameters = (eventData as SliderDragEvent)?.parameters ?? this._parameters;
        this._commitRequest();
        break;

      case 'sliderdragend':
        this._parameters = (eventData as SliderDragEvent)?.parameters ?? this._parameters;
        this._commitRequest();
        this._session!.commit();
        this._session = undefined;
        this.mgr.complete(this);
        break;

      default:
        shouldContinue = super.onReceive(eventType, eventData);
    }

    return shouldContinue;
  }

  private _getTargetSizeAndOffset(offset: [number, number]): Vector2D {
    let targetOffset: Vector2D = { x: 0, y: 0 };
    const dragOffset: Vector2D = { x: offset[0], y: offset[1] };
    const direction = this._gizmoParam!.Dir;

    let offsetMagnitude = 0;
    if (GeLib.MathUtils.largerOrEqual(Math.abs(direction.x), Math.abs(direction.y))) {
      offsetMagnitude = GeLib.MathUtils.largerOrEqual(direction.x, 0) 
        ? -dragOffset.x 
        : dragOffset.x;
    } else {
      offsetMagnitude = GeLib.MathUtils.largerOrEqual(direction.y, 0) 
        ? dragOffset.y 
        : -dragOffset.y;
    }

    if (
      this._cornerWindow.instanceOf(HSConstants.ModelClass.NgBayWindow) ||
      this._cornerWindow.instanceOf(HSConstants.ModelClass.NgPOrdinaryWindow)
    ) {
      const innerBound = this._cornerWindow.partsInfo.boundings.innerBound;
      const normalizedDirection = new HSCore.Util.Math.Vec2(
        innerBound[1].x - innerBound[0].x,
        innerBound[1].y - innerBound[0].y
      );
      normalizedDirection.normalize();

      switch (this._gizmoParam!.EditFlag) {
        case HSCore.Model.CornerWindowParamsEnum.sideB:
          this._parameters.sideA = this._parametersInitial.sideA! - offsetMagnitude;
          this._parameters.sideC = this._parameters.sideA;
          break;

        case HSCore.Model.CornerWindowParamsEnum.sideA:
          this._parameters.sideB = this._parametersInitial.sideB! + offsetMagnitude;
          targetOffset.x = this._xInitial - (offsetMagnitude / 2) * normalizedDirection.x;
          targetOffset.y = this._yInitial - (offsetMagnitude / 2) * normalizedDirection.y;
          targetOffset = this._getMaxMoveOffsetLeftOrRight(true, targetOffset);
          break;

        case HSCore.Model.CornerWindowParamsEnum.sideC:
          this._parameters.sideB = this._parametersInitial.sideB! + offsetMagnitude;
          targetOffset.x = this._xInitial + (offsetMagnitude / 2) * normalizedDirection.x;
          targetOffset.y = this._yInitial + (offsetMagnitude / 2) * normalizedDirection.y;
          targetOffset = this._getMaxMoveOffsetLeftOrRight(false, targetOffset);
          break;
      }
    } else {
      switch (this._gizmoParam!.EditFlag) {
        case HSCore.Model.CornerWindowParamsEnum.sideA:
          this._parameters.sideA = this._parametersInitial.sideA! + offsetMagnitude;
          break;

        case HSCore.Model.CornerWindowParamsEnum.sideB:
          this._parameters.sideB = this._parametersInitial.sideB! + offsetMagnitude;
          const secondHostWall = HSApp.Util.Opening.getSecondHostWallForCornerWindow(
            this._cornerWindow
          );
          if (secondHostWall) {
            const wallDimension = HSCore.Util.Geometry.getWallDimension(secondHostWall);
            const firstWindowHole = this._cornerWindow.getWindowHoles()[0];
            const maxMoveLength = this._getMaxMoveLength(firstWindowHole, wallDimension);
            if (this._parameters.sideB! > maxMoveLength) {
              this._parameters.sideB = maxMoveLength;
            }
          }
          break;

        case HSCore.Model.CornerWindowParamsEnum.sideC:
          this._parameters.sideC = this._parametersInitial.sideC! - offsetMagnitude;
          const hostWall = this._cornerWindow.getHost();
          if (hostWall) {
            const hostWallDimension = HSCore.Util.Geometry.getWallDimension(hostWall);
            const secondWindowHole = this._cornerWindow.getWindowHoles()[1];
            const maxMoveLengthC = this._getMaxMoveLength(secondWindowHole, hostWallDimension);
            if (this._parameters.sideC! > maxMoveLengthC) {
              this._parameters.sideC = maxMoveLengthC;
            }
          }
          break;

        case HSCore.Model.CornerWindowParamsEnum.sideD:
          this._parameters.sideD = this._parametersInitial.sideD! - offsetMagnitude;
          break;
      }
    }

    return targetOffset;
  }

  private _getMaxMoveLength(windowHole: any, wallDimension: any): number {
    const adjacentPoint = HSApp.Util.Opening.getClosestAdjacentPointOnWall(
      windowHole,
      HSApp.App.DimensionTypeEnum.inner,
      wallDimension.walls
    );

    if (!adjacentPoint) {
      return Number.MAX_VALUE;
    }

    const startPoint = adjacentPoint.start;
    const endPoint = adjacentPoint.end;
    const distanceVector = HSCore.Util.Math.Vec2.fromCoordinate(startPoint).subtract(endPoint);
    
    return distanceVector.magnitude();
  }

  private _getMaxMoveOffsetLeftOrRight(isLeft: boolean, targetOffset: Vector2D): Vector2D {
    const adjacentPoint = HSApp.Util.Opening.getClosestAdjacentPointOnWall(
      this._cornerWindow,
      HSApp.App.DimensionTypeEnum.inner
    );

    if (!adjacentPoint) {
      return targetOffset;
    }

    const startPoint = adjacentPoint.start;
    const endPoint = adjacentPoint.end;
    const directionVector = HSCore.Util.Math.Vec2.fromCoordinate(startPoint).subtract(endPoint);
    directionVector.normalize();

    if (isLeft) {
      const scaledDirection = directionVector.clone().scale(-this._parameters.sideB! / 2);
      const offsetFromEnd = HSCore.Util.Math.Vec2.fromCoordinate(targetOffset)
        .add(scaledDirection)
        .subtract(endPoint);

      if (HSCore.Util.Math.Vec2.dot(offsetFromEnd, directionVector) < 0) {
        const initialPosition = new HSCore.Util.Math.Vec2(this._xInitial, this._yInitial);
        initialPosition.add(directionVector.scale(this._parametersInitial.sideB! / 2));
        this._parameters.sideB = HSCore.Util.Math.Vec2.distance(initialPosition, endPoint);
        targetOffset = HSCore.Util.Math.Vec2.lerp(initialPosition, endPoint, 0.5);
      }
    } else {
      const scaledDirection = directionVector.clone().scale(this._parameters.sideB! / 2);
      const offsetFromStart = HSCore.Util.Math.Vec2.fromCoordinate(targetOffset)
        .add(scaledDirection)
        .subtract(startPoint);

      if (HSCore.Util.Math.Vec2.dot(offsetFromStart, directionVector) > 0) {
        const initialPosition = new HSCore.Util.Math.Vec2(this._xInitial, this._yInitial);
        initialPosition.subtract(directionVector.scale(this._parametersInitial.sideB! / 2));
        this._parameters.sideB = HSCore.Util.Math.Vec2.distance(initialPosition, startPoint);
        targetOffset = HSCore.Util.Math.Vec2.lerp(initialPosition, startPoint, 0.5);
      }
    }

    return targetOffset;
  }

  getDescription(): string {
    const parameterKeys = Object.keys(this._parameters);
    const description = parameterKeys.length >= 6 
      ? '恢复默认' 
      : parameterKeys.join(', ');
    
    return `编辑窗户的${description}`;
  }

  getCategory(): number {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  canSuspend(): boolean {
    return false;
  }
}