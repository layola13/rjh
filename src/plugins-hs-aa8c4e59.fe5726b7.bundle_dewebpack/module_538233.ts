interface CameraMoveSavedState {
  x: number;
  y: number;
  target_x: number;
  target_y: number;
}

interface CameraMoveExecuteOptions {
  wallSnapEnable?: boolean;
  withTarget?: boolean;
}

interface DragMoveEventData {
  offset?: number[];
}

interface KeyEventData {
  keyCode: number;
}

interface MoveToEventData {
  position: {
    x: number;
    y: number;
  };
}

interface CameraStrategy {
  moveEyeCalc?: () => void;
}

type CameraMoveEventData = DragMoveEventData | KeyEventData | MoveToEventData | number;

const MAX_VERTEX_MARGIN_FACTOR = 0.5;
const DEFAULT_MODEL_TO_SCREEN_FACTOR = 2;
const MOVE_SPEED_FACTOR = 10;

const ARROW_KEY_OFFSETS: Record<number, number> = {
  38: 0, // Up
  40: 1, // Down
  39: 2, // Right
  37: 3  // Left
};

export default class CameraMoveCommand extends HSApp.Cmd.Command {
  private camera: HSCore.Model.Camera;
  private saved: CameraMoveSavedState;
  private keyMoveOffset: [number, number];
  private pressedKey: number[];
  private _modelToScreen: number;
  private strategy: CameraStrategy;
  private wallSnapEnable: boolean = false;
  private withTarget: boolean = true;
  private _frameMoved: boolean = false;

  constructor(camera: HSCore.Model.Camera, svgElement?: SVGElement) {
    super();
    
    this.camera = camera;
    this.saved = {
      x: 0,
      y: 0,
      target_x: 0,
      target_y: 0
    };
    this.keyMoveOffset = [0, 0];
    this.pressedKey = [];

    if (svgElement) {
      this._modelToScreen = HSApp.View.SVG.Util.ModelToScreenFactor(svgElement);
    } else {
      this._modelToScreen = DEFAULT_MODEL_TO_SCREEN_FACTOR;
    }

    switch (camera.type) {
      case HSCore.Model.CameraTypeEnum.FirstPerson:
        this.strategy = new HSApp.Camera.FirstpersonCamera(this.camera);
        break;
      case HSCore.Model.CameraTypeEnum.OrbitView:
        this.strategy = new HSApp.Camera.OrbitCamera(this.camera);
        break;
      default:
        this.strategy = {};
    }
  }

  public moveTo(targetX: number, targetY: number): void {
    const deltaX = targetX - this.saved.x;
    const deltaY = targetY - this.saved.y;
    this.move(deltaX, deltaY);
  }

  public move(deltaX: number, deltaY: number): void {
    const camera = this.camera;
    const saved = this.saved;
    
    const newX = saved.x + deltaX;
    const newY = saved.y + deltaY;

    const floorplan = HSApp.App.getApp().floorplan;
    const sceneBound = new HSCore.Util.BrepBound();
    sceneBound.copy(floorplan.scene.activeLayer.bound);

    const margin = MAX_VERTEX_MARGIN_FACTOR * HSConstants.Constants.Max_Vertex_Value;
    const expandedBound = sceneBound.expandMargin(margin, margin);
    
    const minX = expandedBound.left;
    const maxX = minX + expandedBound.width;
    const minY = expandedBound.top;
    const maxY = minY + expandedBound.height;

    if (newX < minX || newX > maxX || newY < minY || newY > maxY) {
      return;
    }

    const newTargetX = saved.target_x + deltaX;
    const newTargetY = saved.target_y + deltaY;

    camera.x = newX;
    camera.y = newY;

    if (this.withTarget || camera.type === HSCore.Model.CameraTypeEnum.FirstPerson) {
      camera.target_x = newTargetX;
      camera.target_y = newTargetY;
    }

    this.strategy.moveEyeCalc?.();

    if (this.wallSnapEnable) {
      let hasCollision = false;
      
      floorplan.forEachWall((wall: HSCore.Model.Wall) => {
        if (wall.bound.isValid()) {
          if (!hasCollision && HSCore.Util.Collision.AABBIntersect(camera.bound, wall.bound)) {
            hasCollision = HSCore.Util.Collision.outlineIntersect(camera.outline, wall.outline);
          }
        }
      });

      if (hasCollision) {
        camera.x = newX - deltaX;
        camera.y = newY - deltaY;
        
        if (this.withTarget || camera.type === HSCore.Model.CameraTypeEnum.FirstPerson) {
          camera.target_x = newTargetX - deltaX;
          camera.target_y = newTargetY - deltaY;
        }
      }
    }
  }

  public onExecute(options?: CameraMoveExecuteOptions): void {
    this.wallSnapEnable = options?.wallSnapEnable ?? false;
    this.withTarget = options?.withTarget ?? true;

    const saved = this.saved;
    saved.x = this.camera.x;
    saved.y = this.camera.y;
    saved.target_x = this.camera.target_x;
    saved.target_y = this.camera.target_y;
  }

  public onReceive(eventType: string, eventData: CameraMoveEventData): void | ((args: unknown[]) => unknown) {
    if (eventType === "dragmove" && (eventData as DragMoveEventData).offset?.length > 1) {
      const offset = (eventData as DragMoveEventData).offset!;
      this.move(offset[0], offset[1]);
    } else if (eventType === "dragend") {
      this.mgr.complete();
    } else if (eventType === "keydown") {
      const keyCode = (eventData as KeyEventData).keyCode;
      if (HSDevice.Key.isPureArrowKey(keyCode) && !this.pressedKey.includes(keyCode)) {
        this.pressedKey.push(keyCode);
      }
    } else if (eventType === "keyup") {
      if (!this._frameMoved) {
        this._moveCameraEachFrame(30);
      }
      this.pressedKey.xRemove((eventData as KeyEventData).keyCode);
      this.mgr.complete();
    } else if (eventType === "moveto") {
      const moveData = eventData as MoveToEventData;
      this.moveTo(moveData.position.x, moveData.position.y);
      this.mgr.complete();
    } else if (eventType === "newframe") {
      this._frameMoved = true;
      this._moveCameraEachFrame(eventData as number);
    } else {
      return super.onReceive?.(eventType, eventData);
    }
  }

  private _moveCameraEachFrame(deltaTime: number): void {
    if (this.pressedKey.length === 0) {
      return;
    }

    const moveSpeed = (DEFAULT_MODEL_TO_SCREEN_FACTOR / this._modelToScreen) * (deltaTime / MOVE_SPEED_FACTOR);
    const offsetMap = this.calculateOffset(moveSpeed);

    for (const keyCode of this.pressedKey) {
      const offset = offsetMap[keyCode];
      if (offset) {
        this.keyMoveOffset[0] += offset[0];
        this.keyMoveOffset[1] += offset[1];
      }
    }

    this.move(this.keyMoveOffset[0], this.keyMoveOffset[1]);
  }

  private calculateOffset(speed: number): Record<number, [number, number]> {
    const direction = new HSCore.Util.Math.Vec2();
    direction.x = this.camera.target_x - this.camera.x;
    direction.y = this.camera.target_y - this.camera.y;
    direction.normalize();

    return {
      38: [direction.x * speed, direction.y * speed],       // Up
      40: [-direction.x * speed, -direction.y * speed],     // Down
      39: [direction.y * speed, -direction.x * speed],      // Right
      37: [-direction.y * speed, direction.x * speed]       // Left
    };
  }

  public canUndoRedo(): boolean {
    return false;
  }

  public isTransient(): boolean {
    return true;
  }
}