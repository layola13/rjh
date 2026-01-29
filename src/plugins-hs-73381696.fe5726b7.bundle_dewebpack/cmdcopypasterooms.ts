import { HSCore } from './HSCore';
import { CopyPasteRoomsGizmo } from './CopyPasteRoomsGizmo';
import { showLiveHint } from './LiveHintUtils';
import { copyFromRooms, disposeCopied } from './RoomCopyUtils';

interface CopiedRoomData {
  rooms: any[];
  slab?: any;
}

interface GizmoEventData {
  event?: MouseEvent;
  rooms?: any[];
  slab?: any;
  translation?: any;
}

interface Canvas2D {
  context: any;
  gizmoManager: {
    addGizmo(gizmo: CopyPasteRoomsGizmo): void;
    removeGizmo(gizmo: CopyPasteRoomsGizmo): void;
  };
  displayLayers: {
    temp: any;
  };
}

interface Environment {
  getCanvas2d?(): Canvas2D;
}

interface App {
  selectionManager: {
    unselectAll(): void;
  };
  floorplan: {
    scene: {
      activeLayer: {
        faces: Record<string, any>;
      };
    };
  };
  activeEnvironment?: Environment;
  getActive2DView(): Canvas2D;
  transManager: TransactionManager;
}

interface TransactionManager {
  startSession(): Session;
  createRequest(type: string, args: any[]): any;
  commit(request: any): void;
}

interface Session {
  commit(): void;
}

interface CommandContext {
  app: App;
  transManager: TransactionManager;
}

interface CommandManager {
  cancel(command: CmdCopyPasteRooms): void;
  complete(command: CmdCopyPasteRooms): void;
}

declare const HSApp: {
  Cmd: {
    Command: new (...args: any[]) => any;
  };
  App: {
    getApp(): { transManager: TransactionManager };
  };
};

declare const HSFPConstants: {
  RequestType: {
    CopyPasteRooms: string;
  };
  LogGroupTypes: {
    ExtraordinarySketch2d: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const LiveHint: {
  show(message: string, duration: number, position?: any, options?: { canclose: boolean; onClose?: () => void }): void;
  hide(): void;
};

const TOAST_DURATION = 2000;

export class CmdCopyPasteRooms extends HSApp.Cmd.Command {
  private copyFloors: any[];
  private gizmo?: CopyPasteRoomsGizmo;
  private signalHook: HSCore.Util.SignalHook;
  private _isToastShow: boolean = false;
  private session?: Session;
  private copied?: CopiedRoomData;
  protected context!: CommandContext;
  protected mgr?: CommandManager;

  constructor(copyFloors: any[]) {
    super();
    this.copyFloors = copyFloors;
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  public onExecute(): void {
    const app = this.context.app;
    app.selectionManager.unselectAll();

    const activeLayer = app.floorplan.scene.activeLayer;
    const hasFloors = Object.values(activeLayer.faces).some(
      (face) => face instanceof HSCore.Model.Floor
    );

    if (!hasFloors) {
      showLiveHint(ResourceManager.getString('ngwall_defineroomfirst'), TOAST_DURATION);
      this.mgr?.cancel(this);
      return;
    }

    this.session = this.context.transManager.startSession();

    if (this.copyFloors?.length) {
      this.copied = copyFromRooms(this.copyFloors);
    }

    this.createGizmo();
    this.showToast();
  }

  public onReceive(eventName: string, eventData: GizmoEventData): boolean {
    if (eventName === 'click') {
      if (eventData.event?.button === 2) {
        this.gizmo?.onESC();
        return true;
      }
    } else if (eventName === 'gizmo.CopyRooms') {
      const { rooms, slab } = eventData;
      if (rooms && rooms.length) {
        this.copied = copyFromRooms(rooms, slab);
      }
    } else if (eventName === 'gizmo.PasteRooms') {
      const { translation } = eventData;
      if (this.copied) {
        const transManager = HSApp.App.getApp().transManager;
        const request = transManager.createRequest(
          HSFPConstants.RequestType.CopyPasteRooms,
          [this.copied, translation]
        );
        transManager.commit(request);
        return true;
      }
    } else if (eventName === 'gizmo.Complete') {
      this.mgr?.complete(this);
      this.session?.commit();
      return true;
    }

    return super.onReceive(eventName, eventData);
  }

  private getCanvas2d(): Canvas2D | undefined {
    const app = this.context.app;
    const activeEnv = app.activeEnvironment;
    return activeEnv?.getCanvas2d?.() ?? app.getActive2DView();
  }

  private showToast(): void {
    this._isToastShow = true;

    const messageKey = this.copyFloors?.length > 0
      ? 'plugin_layeredit_mousetips_exit_copy_room'
      : 'plugin_layeredit_mousetips_exit_copy_floorPlan';

    const message = ResourceManager.getString(messageKey);

    LiveHint.show(message, 0, undefined, {
      canclose: true,
      onClose: () => {
        this._isToastShow = false;
      },
    });
  }

  private hideToast(): void {
    if (this._isToastShow) {
      LiveHint.hide();
      this._isToastShow = false;
    }
  }

  private createGizmo(): void {
    const canvas = this.getCanvas2d();
    if (!canvas) return;

    const gizmoManager = canvas.gizmoManager;
    this.gizmo = this._create2DGizmo(canvas);
    if (this.gizmo) {
      gizmoManager.addGizmo(this.gizmo);
    }
  }

  private destroyGizmo(): void {
    if (!this.gizmo) return;

    const canvas = this.getCanvas2d();
    if (canvas) {
      canvas.gizmoManager.removeGizmo(this.gizmo);
      this.gizmo.onCleanup();
      this.gizmo = undefined;
    }
  }

  private _create2DGizmo(canvas: Canvas2D): CopyPasteRoomsGizmo {
    return new CopyPasteRoomsGizmo(canvas.context, canvas.displayLayers.temp, this);
  }

  public onCleanup(): void {
    disposeCopied(this.copied);
    this.copied = undefined;
    this.destroyGizmo();
    this.signalHook.dispose();
    this.hideToast();
    super.onCleanup();
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.ExtraordinarySketch2d;
  }
}