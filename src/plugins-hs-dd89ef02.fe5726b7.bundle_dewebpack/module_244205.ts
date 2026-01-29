interface Position {
  x: number;
  y: number;
}

interface MoveMessage {
  x: number;
  y: number;
}

interface Underlay {
  x: number;
  y: number;
  lock?: boolean;
}

interface Layer {
  underlay: Underlay | null;
}

interface Scene {
  activeLayer: Layer;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new () => Command;
  };
}

declare const HSApp: HSAppNamespace;

abstract class Command {
  protected mgr: { complete(cmd: Command): void };
  abstract onExecute(): void;
  abstract onCleanup(): void;
  abstract onReceive(action: string, data: unknown): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
}

export default class UnderlayMoveCommand extends Command {
  private saved: Position;
  private restored: Position;
  private fp: Floorplan;

  constructor() {
    super();
    
    this.saved = {
      x: 0,
      y: 0
    };
    
    this.restored = {
      x: 0,
      y: 0
    };
    
    const app = HSApp.App.getApp();
    this.fp = app.floorplan;
  }

  onExecute(): void {
    const underlay = this.fp.scene.activeLayer.underlay;
    
    if (!underlay) {
      this.mgr.complete(this);
      return;
    }
    
    this.saved.x = underlay.x;
    this.saved.y = underlay.y;
  }

  onCleanup(): void {
    // Cleanup implementation
  }

  onReceive(action: string, data: MoveMessage): void {
    const underlay = this.fp.scene.activeLayer.underlay;
    
    if (!underlay || underlay.lock) {
      return;
    }
    
    const deltaX = data.x;
    const deltaY = data.y;
    const currentX = underlay.x ?? 0;
    const currentY = underlay.y ?? 0;
    
    switch (action) {
      case "move": {
        const newX = currentX + deltaX;
        const newY = currentY + deltaY;
        this._move(newX, newY);
        break;
      }
      case "moveTo":
        this._move(deltaX, deltaY);
        break;
      default:
        super.onReceive(action, data);
    }
  }

  private _move(x: number, y: number): void {
    const underlay = this.fp.scene.activeLayer.underlay;
    if (underlay) {
      underlay.x = x;
      underlay.y = y;
    }
  }

  onUndo(): void {
    const underlay = this.fp.scene.activeLayer.underlay;
    if (underlay) {
      this.restored.x = underlay.x;
      this.restored.y = underlay.y;
      this._move(this.saved.x, this.saved.y);
    }
  }

  onRedo(): void {
    this._move(this.restored.x, this.restored.y);
  }
}