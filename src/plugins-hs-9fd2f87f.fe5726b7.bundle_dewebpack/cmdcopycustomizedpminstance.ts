interface Position3D {
  x: number;
  y: number;
  z: number;
}

interface MouseEvent {
  position?: number[];
  keyCode?: number;
}

interface CustomizedPMEntity {
  x: number;
  y: number;
  z: number;
  dump(): unknown[];
  getUniqueParent(): ParentModel;
}

interface ParentModel {
  removeChild(child: CustomizedPMInstanceModel): void;
}

interface CustomizedPMInstanceModel extends CustomizedPMEntity {
  x: number;
  y: number;
  z: number;
}

interface TransactionSession {
  end(): void;
  commit(): void;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(type: string, args: unknown[]): unknown;
  commit(request: unknown): void;
}

interface UserInputPlugin {
  getMousePosition(): unknown;
}

interface View {
  pick(position: unknown): Position3D;
}

interface App {
  activeView: View;
  selectionManager: SelectionManager;
  cmdManager: CommandManager;
}

interface SelectionManager {
  unselectAll(): void;
  select(entity: CustomizedPMInstanceModel): void;
}

interface CommandManager {
  cancel(command: CmdCopyCustomizedPMInstance): void;
  complete(command: CmdCopyCustomizedPMInstance): void;
}

interface CommandContext {
  transManager: TransactionManager;
  app: App;
}

type CreateType = 'leftmenu' | string;

const CREATE_TYPE_LEFTMENU = 'leftmenu';
const KEY_CODE_ESCAPE = 27;
const KEY_CODE_DELETE = 46;
const KEY_CODE_BACKSPACE = 8;

export class CmdCopyCustomizedPMInstance extends HSApp.Cmd.Command {
  private readonly _app: App;
  private readonly _entities: CustomizedPMEntity[];
  private readonly _createType: CreateType;
  private readonly _userInputPlugin: UserInputPlugin;
  private _session?: TransactionSession;
  private _pasted: boolean = false;
  private _previewEntities: CustomizedPMInstanceModel[] = [];
  private _originMousePos: Position3D = { x: 0, y: 0, z: 0 };
  private _preMousePos?: Position3D;

  protected context!: CommandContext;
  protected mgr!: CommandManager;

  constructor(
    entities: CustomizedPMEntity[],
    createType: CreateType,
    userInputPlugin: UserInputPlugin
  ) {
    super();
    this._app = HSApp.App.getApp();
    this._entities = entities;
    this._createType = createType;
    this._userInputPlugin = userInputPlugin;
  }

  private _getLastMousePosition = (): Position3D => {
    const mousePosition = this._userInputPlugin.getMousePosition();
    return this._app.activeView.pick(mousePosition);
  };

  public onExecute(): void {
    if (this._createType === CREATE_TYPE_LEFTMENU) {
      this._onPaste();
    }
  }

  public onReceive(eventType: string, eventData?: MouseEvent): boolean {
    switch (eventType) {
      case 'mousemove':
        this._onMove(eventData);
        break;
      case 'click':
        if (this._pasted) {
          this._onComplete();
        }
        break;
      case 'paste':
        this._app.selectionManager.unselectAll();
        this._onPaste();
        break;
      case 'keydown':
        if (eventData?.keyCode) {
          if (eventData.keyCode === KEY_CODE_ESCAPE) {
            this._onCancel();
          }
          if (
            eventData.keyCode === KEY_CODE_DELETE ||
            eventData.keyCode === KEY_CODE_BACKSPACE
          ) {
            this._onCancel();
            return true;
          }
        }
        break;
    }

    const parentResult = super.onReceive?.(eventType, eventData);
    return parentResult ?? false;
  }

  private _onPaste(): void {
    const transManager = this.context.transManager;
    this._session = transManager.startSession();

    this._entities.forEach((entity) => {
      this._originMousePos.x += entity.x;
      this._originMousePos.y += entity.y;
      this._originMousePos.z += entity.z;
    });

    this._originMousePos.x /= this._entities.length;
    this._originMousePos.y /= this._entities.length;
    this._originMousePos.z /= this._entities.length;

    this._makePreview();
    this._pasted = true;
  }

  private _onMove(eventData?: MouseEvent): void {
    if (this._previewEntities.length === 0) {
      return;
    }

    let currentMousePos: Position3D;

    if (!this._preMousePos) {
      currentMousePos = this._getLastMousePosition();
      this._preMousePos = this._originMousePos;
    } else if (eventData?.position) {
      currentMousePos = {
        x: eventData.position[0],
        y: eventData.position[1],
        z: eventData.position.length > 2 ? eventData.position[2] : this._preMousePos.z,
      };
    } else {
      currentMousePos = {
        x: this._preMousePos.x,
        y: this._preMousePos.y,
        z: this._preMousePos.z,
      };
    }

    currentMousePos.x = currentMousePos.x ?? this._preMousePos.x;
    currentMousePos.y = currentMousePos.y ?? this._preMousePos.y;
    currentMousePos.z = currentMousePos.z ?? this._preMousePos.z;

    const deltaX = currentMousePos.x - this._preMousePos.x;
    const deltaY = currentMousePos.y - this._preMousePos.y;
    const deltaZ = currentMousePos.z - this._preMousePos.z;

    this._preMousePos = currentMousePos;

    this._previewEntities.forEach((entity) => {
      entity.x += deltaX;
      entity.y += deltaY;
      entity.z += deltaZ;
    });
  }

  private _onCancel(): void {
    HSApp.Selection.Manager.unselectAll();
    this._clearPreview();

    if (this._session) {
      this._session.end();
    }

    this.context.app.cmdManager.cancel(this);
  }

  private async _onComplete(): Promise<void> {
    this._clearPreview();

    const offset: Position3D = {
      x: this._preMousePos!.x - this._originMousePos.x,
      y: this._preMousePos!.y - this._originMousePos.y,
      z: this._preMousePos!.z - this._originMousePos.z,
    };

    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.CopyCustomizedPMInstanceModel,
      [this._entities, offset]
    );

    transManager.commit(request);
    this.mgr.complete(this);

    if (this._session) {
      this._session.commit();
    }
  }

  private _makePreview(): void {
    this._previewEntities = this._entities.map((entity) => {
      const parent = entity.getUniqueParent();
      const instanceModel = HSApp.Util.CustomizedPMModel.createCustomizedPMInstanceModel(
        entity.dump()[0]
      );

      HSApp.Util.CustomizedPMModel.addCustomizedPMInstance({
        insModel: instanceModel,
        rootModel: parent,
      });

      return instanceModel;
    });

    const selectionManager = HSApp.Selection.Manager;
    selectionManager.unselectAll();

    this._previewEntities.forEach((entity) => {
      selectionManager.select(entity);
    });
  }

  private _clearPreview(): void {
    this._previewEntities.forEach((entity) => {
      entity.getUniqueParent().removeChild(entity);
    });
  }

  public getDescription(): string {
    return '复制自由造型';
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}