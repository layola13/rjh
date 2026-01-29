interface Position {
  x: number;
  y: number;
}

interface Camera {
  x: number;
  y: number;
  target_x: number;
  target_y: number;
  type: number;
}

interface ExecuteParams {
  x?: number;
  y?: number;
  target_x?: number;
  target_y?: number;
}

interface CommandManager {
  complete(command: CameraCommand): void;
}

/**
 * Camera movement command with smooth animation
 */
export default class CameraCommand extends HSApp.Cmd.Command {
  private camera: Camera;
  private originalPos!: Position;
  private end!: Position;
  private distance: number = 0;
  private withTarget?: boolean;
  private mgr!: CommandManager;

  constructor(camera: Camera) {
    super();
    this.camera = camera;
  }

  /**
   * Move camera to specified position
   */
  moveTo(x: number, y: number): void {
    const camera = this.camera;
    const previousX = camera.x;
    const previousY = camera.y;

    camera.x = x;
    camera.y = y;

    if (this.withTarget !== true || camera.type !== HSCore.Model.CameraTypeEnum.FirstPerson) {
      camera.target_x += camera.x - previousX;
      camera.target_y += camera.y - previousY;
    }
  }

  /**
   * Animate camera movement over time
   * @returns true when animation is complete
   */
  move(deltaTime: number): boolean {
    let isComplete = false;
    
    this.distance += HSApp.Camera.CameraConstants.FIRSTPERSON_AUTOMOVE_SPEED * deltaTime;
    
    if (this.distance > 1) {
      this.distance = 1;
      isComplete = true;
    }

    const deltaX = this.distance * this.end.x + (1 - this.distance) * this.originalPos.x - this.camera.x;
    const deltaY = this.distance * this.end.y + (1 - this.distance) * this.originalPos.y - this.camera.y;

    this.camera.target_x += deltaX;
    this.camera.target_y += deltaY;
    this.camera.x += deltaX;
    this.camera.y += deltaY;

    return isComplete;
  }

  onExecute(params: ExecuteParams): void {
    if (params.x !== undefined && params.y !== undefined) {
      this.originalPos = {
        x: this.camera.x,
        y: this.camera.y
      };
      this.end = {
        x: params.x,
        y: params.y
      };
    } else if (params.target_x !== undefined && params.target_y !== undefined) {
      this.originalPos = {
        x: this.camera.x,
        y: this.camera.y
      };
      this.end = {
        x: this.camera.x + (params.target_x - this.camera.target_x),
        y: this.camera.y + (params.target_y - this.camera.target_y)
      };
    }

    this.distance = 0;
  }

  onReceive(event: string, data: unknown): void {
    if (event === "newframe") {
      if (this.move(data as number)) {
        this.mgr.complete(this);
      }
    } else {
      super.onReceive?.(event, data);
    }
  }

  canUndoRedo(): boolean {
    return false;
  }

  isTransient(): boolean {
    return true;
  }
}