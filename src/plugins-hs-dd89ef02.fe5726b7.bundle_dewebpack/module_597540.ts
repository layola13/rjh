interface Wall {
  forEachContent(callback: (content: Content) => void): void;
  forEachOpening(callback: (opening: Opening) => void): void;
  getUniqueParent(): Layer | null;
  setFlagOff(flag: WallFlagEnum): void;
}

interface Content {
  instanceOf(modelClass: string): boolean;
  contentType: {
    isTypeOf(type: string): boolean;
  };
}

interface Opening {
  instanceOf(modelClass: string): boolean;
  getUniqueParent(): Assembly | null;
}

interface Assembly {
  instanceOf(modelClass: string): boolean;
}

interface Layer {
  // Layer properties
}

interface Room {
  // Room properties
}

interface SelectionManager {
  unselect(item: Wall): void;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): Request;
  startSession(): Session;
  commit(request: Request): void;
}

interface Request {
  // Request properties
}

interface Session {
  commit(): void;
}

interface Context {
  transManager: TransactionManager;
  selectionManager: SelectionManager;
}

interface Manager {
  cancel(): void;
  complete(command: CmdDeleteNGWalls): void;
}

interface EventData {
  room?: Room;
  source?: string;
}

interface RelatedContents {
  toBeReassign: Content[];
  toBeRemoved: Content[];
}

enum WallFlagEnum {
  hoverOn = 'hoverOn'
}

abstract class Command {
  protected context: Context;
  protected mgr: Manager;

  constructor() {
    this.context = null as unknown as Context;
    this.mgr = null as unknown as Manager;
  }

  abstract onExecute(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

class CmdDeleteNGWalls extends Command {
  private walls: Wall[];
  private room?: Room;
  private partnerRoom?: Room;

  constructor(walls: Wall[]) {
    super();
    this.walls = walls;
  }

  getRelateContents(): RelatedContents {
    const toBeRemoved: Content[] = [];
    const toBeReassign: Content[] = [];

    this.walls.forEach((wall: Wall) => {
      wall.forEachContent((content: Content) => {
        if (content && content.instanceOf(HSConstants.ModelClass.NgContent)) {
          if (content.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
            return;
          }

          if (
            content.instanceOf(HSConstants.ModelClass.NgOpening) ||
            content.instanceOf(HSConstants.ModelClass.NgCustomizedModel) ||
            content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_WallAttached)
          ) {
            toBeRemoved.push(content);
          } else {
            toBeReassign.push(content);
          }
        }
      });

      wall.forEachOpening((opening: Opening) => {
        const parent = opening.getUniqueParent();
        if (
          opening.instanceOf(HSConstants.ModelClass.DHole) &&
          parent &&
          parent.instanceOf(HSConstants.ModelClass.DAssembly)
        ) {
          toBeRemoved.push(parent as unknown as Content);
        }
      });

      const associatedCornerWindows = HSCore.Util.Wall.getAssociatedCornerWindow(wall);
      if (associatedCornerWindows && associatedCornerWindows.length > 0) {
        associatedCornerWindows.forEach((window: Content) => {
          toBeRemoved.push(window);
        });
      }
    });

    return {
      toBeReassign,
      toBeRemoved
    };
  }

  onCleanup(event?: EventData): void {
    if (event && event.source === 'ESC') {
      this.mgr.cancel();
    }
  }

  private _onComplete(): void {
    this.mgr.complete(this);
  }

  onExecute(): void {
    const mixPaintUtil = HSApp.PaintPluginHelper?.Util?.MixPaintUtil;
    
    if (mixPaintUtil && !mixPaintUtil.disconnectFaceGroupWithPrompt(this.walls, undefined, this._executeCmd.bind(this))) {
      this._executeCmd();
      const app = HSApp.App.getApp();
      if (app.activeView?.pixiContext) {
        app.activeView.pixiContext.dirty = true;
      }
    }
  }

  private _executeCmd(): void {
    const { transManager, selectionManager } = this.context;

    this.walls.forEach((wall: Wall) => {
      selectionManager.unselect(wall);
      wall.setFlagOff(HSCore.Model.WallFlagEnum.hoverOn);
    });

    const relatedContents = this.getRelateContents();
    const requests: Request[] = [];

    relatedContents.toBeRemoved.forEach((content: Content) => {
      let request: Request;
      if (content.instanceOf(HSConstants.ModelClass.NgGroup)) {
        request = transManager.createRequest(HSFPConstants.RequestType.DeleteAssembly, [content]);
      } else {
        request = transManager.createRequest(HSFPConstants.RequestType.DeleteProduct, [content]);
      }
      requests.push(request);
    });

    const compositeRequest = new HSCore.Transaction.Common.CompositeRequest(requests);
    const session = transManager.startSession();
    transManager.commit(compositeRequest);

    const parent = this.walls[0]?.getUniqueParent() || HSApp.App.getApp().floorplan.scene.activeLayer;
    const deleteWallsRequest = transManager.createRequest(HSFPConstants.RequestType.DeleteTGWalls, [this.walls, parent]);
    transManager.commit(deleteWallsRequest);
    
    session.commit();
    this._onComplete();
  }

  onReceive(event: string, data: EventData): void | ((args: unknown[]) => unknown) {
    if (event === 'gizmo.mouseup') {
      const room = data.room;
      if (!room) {
        return;
      }

      console.assert(room === this.room || room === this.partnerRoom);
      const otherRoom = data.room === this.room ? this.partnerRoom : this.room;
      
      if (otherRoom) {
        HSCore.Util.Room.mergeRooms(room, [otherRoom]);
      }
      this._onComplete();
      return;
    }

    const parent = Command.prototype;
    const superMethod = parent.onReceive;
    if (typeof superMethod === 'function') {
      return superMethod.call(this, event, data);
    }
  }

  canUndoRedo(): boolean {
    return false;
  }

  isInteractive(): boolean {
    return true;
  }

  getDescription(): string {
    return '删除多处墙体';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}

export { CmdDeleteNGWalls };