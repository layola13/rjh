interface MoveContentRequest {
  x: number;
  y: number;
  rotation: number;
}

interface TransactionSession {
  commit(): void;
}

interface TransactionManager {
  startSession(options: { undoRedo: boolean }): TransactionSession;
  createRequest(requestType: string, params: any[]): any;
  commit(request: any): void;
}

interface Context {
  transManager: TransactionManager;
}

interface KeyEventData {
  event: KeyboardEvent;
  keyCode: number;
}

interface Wall extends HSCore.Model.Wall {
  from: HSCore.Util.Math.Vec2;
  to: HSCore.Util.Math.Vec2;
  openings: Record<string, any>;
  curve: any;
}

interface ModelContent {
  instanceOf(className: string): boolean;
  _host?: Wall;
  x: number;
  y: number;
  rotation?: number;
  XSize: number;
  build?(): void;
  dirtyGeometry?(): void;
  hostFace?: any;
  refreshFloorGeometry?(): void;
  refreshBothWallFaceGeometry?(): void;
  getHost(): any;
  host?: any;
}

interface AdjacentPoint {
  overlapped: boolean;
  start: HSCore.Util.Math.Vec2;
  end: HSCore.Util.Math.Vec2;
}

type OffsetMap = Record<number, [number, number]>;

const KEYCODE_LEFT = 37;
const KEYCODE_UP = 38;
const KEYCODE_RIGHT = 39;
const KEYCODE_DOWN = 40;

const DEFAULT_OFFSET_SCALE = 2;
const SHIFT_OFFSET_SCALE = 0.001;

export default class MoveContentByKeyCommand extends HSApp.Cmd.Command {
  private _contents: ModelContent[];
  private _modelToScreen: number;
  private _session!: TransactionSession;

  constructor(contents: ModelContent[], modelToScreen: number) {
    super();
    this._contents = contents;
    this._modelToScreen = modelToScreen;
  }

  onExecute(): void {
    this._session = this.context.transManager.startSession({
      undoRedo: false
    });
  }

  onCleanup(): void {
    this._session.commit();
  }

  canUndoRedo(): boolean {
    return false;
  }

  /**
   * Check if the model is hosted to a wall (opening, customized model, or bay window on wall)
   */
  private isHostToWall(model: ModelContent): boolean {
    return (
      (model.instanceOf(HSConstants.ModelClass.NgOpening) ||
        model instanceof HSCore.Model.CustomizedModel ||
        model.instanceOf(HSConstants.ModelClass.NgBayWindow)) &&
      model._host?.instanceOf(HSConstants.ModelClass.NgWall)
    );
  }

  /**
   * Calculate offset maps for each content based on offset distance
   */
  private calculateOffset(offsetDistance: number): OffsetMap[] {
    const offsetMaps: OffsetMap[] = [];

    this._contents.forEach((content) => {
      if (this.isHostToWall(content)) {
        const host = content._host as Wall;

        if (HSCore.Util.Math.nearlyEquals(host.to.x, host.from.x)) {
          // Vertical wall
          offsetMaps.push({
            [KEYCODE_UP]: [0, offsetDistance],
            [KEYCODE_DOWN]: [0, -offsetDistance]
          });
        } else if (HSCore.Util.Math.nearlyEquals(host.to.y, host.from.y)) {
          // Horizontal wall
          offsetMaps.push({
            [KEYCODE_LEFT]: [-offsetDistance, 0],
            [KEYCODE_RIGHT]: [offsetDistance, 0]
          });
        } else {
          // Diagonal wall
          const slope = (host.to.y - host.from.y) / (host.to.x - host.from.x);
          const offsetMap: OffsetMap = {
            [KEYCODE_LEFT]: [-offsetDistance, -offsetDistance * slope],
            [KEYCODE_RIGHT]: [offsetDistance, offsetDistance * slope]
          };

          if (slope > 0) {
            offsetMap[KEYCODE_UP] = offsetMap[KEYCODE_RIGHT];
            offsetMap[KEYCODE_DOWN] = offsetMap[KEYCODE_LEFT];
          } else {
            offsetMap[KEYCODE_UP] = offsetMap[KEYCODE_LEFT];
            offsetMap[KEYCODE_DOWN] = offsetMap[KEYCODE_RIGHT];
          }

          offsetMaps.push(offsetMap);
        }
      } else {
        // Not hosted to wall - allow all directions
        offsetMaps.push({
          [KEYCODE_UP]: [0, offsetDistance],
          [KEYCODE_DOWN]: [0, -offsetDistance],
          [KEYCODE_LEFT]: [-offsetDistance, 0],
          [KEYCODE_RIGHT]: [offsetDistance, 0]
        });
      }
    });

    return offsetMaps;
  }

  onReceive(eventType: string, eventData: KeyEventData): boolean {
    switch (eventType) {
      case "keyup":
        this.mgr.complete(this);

        // Rebuild and refresh geometry for all contents
        for (let i = 0; i < this._contents.length; i++) {
          const content = this._contents[i];
          if (HSApp.Util.Opening.isOpening(content)) {
            content.build?.();
            content.dirtyGeometry?.();
            content.hostFace?.dirtyGeometry();
            content.refreshFloorGeometry?.();
            content.refreshBothWallFaceGeometry?.();
          }
        }
        break;

      case "keydown":
        const baseOffset = DEFAULT_OFFSET_SCALE / this._modelToScreen;
        const offsetDistance = eventData.event.shiftKey ? SHIFT_OFFSET_SCALE : baseOffset;

        const moveRequests: MoveContentRequest[] = [];
        const offsetMaps = this.calculateOffset(offsetDistance);

        for (let i = 0; i < offsetMaps.length; i++) {
          const content = this._contents[i];
          const offset = offsetMaps[i][eventData.keyCode];

          if (offset) {
            const restrictedPosition = this._restrictOffset(content, offset);
            moveRequests.push({
              x: restrictedPosition.x,
              y: restrictedPosition.y,
              rotation: restrictedPosition.rotation ?? content.rotation ?? 0
            });
          }
        }

        if (moveRequests.length > 0 && moveRequests.length === this._contents.length) {
          const transManager = this.context.transManager;
          const request = transManager.createRequest(
            HSFPConstants.RequestType.MoveContent,
            [this._contents, moveRequests]
          );
          transManager.commit(request);
        }
        break;

      default:
        return super.onReceive(eventType, eventData);
    }

    return true;
  }

  /**
   * Restrict offset to valid range for opening on wall
   */
  private _restrictOffset(
    content: ModelContent,
    offset: [number, number]
  ): { x: number; y: number; rotation?: number } {
    const targetPosition = new HSCore.Util.Math.Vec2(
      content.x + offset[0],
      content.y + offset[1]
    );

    if (!HSApp.Util.Opening.isOpening(content)) {
      return targetPosition;
    }

    const adjacentPoint = HSApp.Util.Opening.getClosestAdjacentPointOnWall(
      content,
      HSApp.App.DimensionTypeEnum.inner
    ) as AdjacentPoint | null;

    if (!adjacentPoint) {
      const host = content.host;
      if (!(host instanceof HSCore.Model.Wall)) {
        return { x: content.x, y: content.y };
      }

      if (host.curve.isArc2d()) {
        return this._handleArcWallRestriction(content, host, targetPosition);
      }

      return targetPosition;
    }

    if (adjacentPoint.overlapped) {
      return targetPosition;
    }

    return this._handleLinearWallRestriction(content, adjacentPoint, targetPosition);
  }

  private _handleArcWallRestriction(
    content: ModelContent,
    host: Wall,
    targetPosition: HSCore.Util.Math.Vec2
  ): { x: number; y: number; rotation?: number } {
    const curve = host.curve;
    const projectedPoint = curve.getProjectedPtBy(targetPosition);
    let startParam = curve.getStartParam();
    let endParam = curve.getEndParam();
    const currentParam = curve.getParamAt(projectedPoint);

    Object.values(host.openings).forEach((opening: any) => {
      if (opening !== content) {
        const openingGeometry = HSApp.Util.Opening._computeOpeningGeometry(opening);
        const openingStartParam = curve.getParamAt(openingGeometry[0]);
        const openingEndParam = curve.getParamAt(openingGeometry[3]);

        if (currentParam < openingStartParam) {
          endParam = endParam > openingStartParam ? openingStartParam : endParam;
        } else {
          startParam = startParam < openingEndParam ? openingEndParam : startParam;
        }
      }
    });

    const startPoint = curve.getPtAt(startParam);
    const endPoint = curve.getPtAt(endParam);

    const contentGeometry = HSApp.Util.Opening._computeOpeningGeometry({
      getHost: () => content.getHost(),
      XSize: content.XSize,
      x: projectedPoint.x,
      y: projectedPoint.y
    });

    const geometryStartProjected = curve.getProjectedPtBy(contentGeometry[0]);
    const geometryEndProjected = curve.getProjectedPtBy(contentGeometry[3]);

    if (
      curve.IsInRangeInner(geometryStartProjected, startPoint, endPoint) &&
      curve.IsInRangeInner(geometryEndProjected, startPoint, endPoint)
    ) {
      const tangent = curve.getTangentAt(curve.getParamAt(projectedPoint));
      const rotation = tangent.angleTo({ x: -1, y: 0 }) / Math.PI * 180;

      return {
        x: projectedPoint.x,
        y: projectedPoint.y,
        rotation
      };
    }

    return { x: content.x, y: content.y };
  }

  private _handleLinearWallRestriction(
    content: ModelContent,
    adjacentPoint: AdjacentPoint,
    targetPosition: HSCore.Util.Math.Vec2
  ): HSCore.Util.Math.Vec2 {
    let start = adjacentPoint.start;
    let end = adjacentPoint.end;

    const direction = HSCore.Util.Math.Vec2.fromCoordinate(end).subtract(start);
    direction.normalize();

    const line = new HSCore.Util.Math.Line(start.x, start.y, end.x, end.y);
    const closestPoint = line.getClosestPoint(content.x, content.y);
    const perpendicular = HSCore.Util.Math.Vec2.fromCoordinate(content).subtract(closestPoint);

    let halfSize = direction.clone().scale(this._contents[0].XSize / 2);

    if (
      this._contents[0] instanceof HSCore.Model.POrdinaryWindow ||
      this._contents[0] instanceof HSCore.Model.BayWindow
    ) {
      const windowHoles = (this._contents[0] as any).getWindowHoles();
      halfSize = direction.clone().scale(windowHoles[0].XSize / 2);
    }

    start = start.add(halfSize).add(perpendicular);
    end = end.subtract(halfSize).add(perpendicular);

    let result = targetPosition;

    if (direction.dot(result.clone().subtract(start)) < 0) {
      result = start;
    }

    if (direction.dot(result.clone().subtract(end)) > 0) {
      result = end;
    }

    return result;
  }

  getDescription(): string {
    return "2D视图通过上下左右键移动物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}