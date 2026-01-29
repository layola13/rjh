interface ParametricModel {
  parameters?: {
    frame?: {
      width: number;
      materialData?: MaterialData;
    };
    materialData?: MaterialData;
    profileData?: {
      seekId: string;
    };
  };
  dirtyGeometry(): void;
  getUniqueParent(): ParametricModel;
  instanceOf(modelClass: string): boolean;
}

interface MaterialData {
  seekId: string;
}

interface ContentMessageData {
  productType: string;
  seekId?: string;
}

interface TransactionSession {
  abort(): void;
  commit(): void;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, args: unknown[]): unknown;
  commit(request: unknown): void;
}

interface Context {
  transManager: TransactionManager;
  app: {
    signalContextualtoolRefresh: { dispatch(): void };
    signalPropertyBarRefresh: { dispatch(): void };
  };
}

interface CommandManager {
  complete(command: EditCornerWindowCommand): void;
}

interface KeyboardEvent {
  keyCode: number;
}

abstract class BaseCommand {
  protected context!: Context;
  protected mgr!: CommandManager;
}

const ESC_KEY_CODE = 27;
const DELETE_KEY_CODE = 46;
const TAB_KEY_CODE = 9;

class EditCornerWindowCommand extends BaseCommand {
  private _parametricmodels: ParametricModel[];
  private _editingComponent: unknown;
  private _actionType: string = "";
  private _session!: TransactionSession;
  private _oldWidth?: number;

  constructor(parametricModels: ParametricModel[]) {
    super();
    this._parametricmodels = parametricModels;
    this._editingComponent = undefined;
  }

  canUndoRedo(): boolean {
    return false;
  }

  onExecute(): void {
    this._session = this.context.transManager.startSession();
    
    this._parametricmodels?.forEach((model) => {
      if (model?.parameters && this._isWindowInstance(model)) {
        this._oldWidth = model.parameters.frame?.width;
      }
    });
  }

  getCornerWindow(): ParametricModel | null {
    return this._parametricmodels.length > 0 
      ? this._parametricmodels[0].getUniqueParent() 
      : null;
  }

  onReceive(message: string, data: unknown): boolean {
    let handled = false;

    switch (message) {
      case "keydown":
        this._handleKeyDown(data as KeyboardEvent);
        break;

      case "hideChild":
        this._isHideCornerWindow(true);
        handled = true;
        this._actionType = "隐藏窗台石/窗套";
        break;

      case "showChild":
        this._isHideCornerWindow(false);
        handled = true;
        this._actionType = "显示窗台石/窗套";
        break;

      case "materialSameToHost":
        this._changeMaterialTohost(true);
        handled = true;
        this._actionType = "材质跟墙一致";
        break;

      case "changeWindowFrameNumber":
        this._changeWindowFrameNumber(data as number);
        handled = true;
        this._actionType = "单元数";
        break;

      case "changeWindowFrameWidth":
        this._changeWindowFrameWidth(data as number);
        handled = true;
        this._actionType = "宽度";
        break;

      case "changeWindowFrameWidthOnValueChange":
        this._changeWindowFrameWidthOnValueChange(data as number);
        handled = true;
        break;

      case "changeMaterialRotation":
        this._changeMaterialRotation();
        handled = true;
        this._actionType = "材质旋转";
        break;

      case "changeCornerWindowPocketWidth":
        this._changeCornerWindowPocketWidth(data as number);
        handled = true;
        this._actionType = "窗洞宽度";
        break;

      case "changeCornerWindowPocketThickness":
        this._changeCornerWindowPocketThickness(data as number);
        handled = true;
        this._actionType = "窗洞厚度";
        break;

      case "changeCornerWindowPocketOuterWidth":
        this._changeCornerWindowPocketOuterWidth(data as number);
        handled = true;
        this._actionType = "窗洞宽度";
        break;

      case "changeCornerWindowPocketOuterThickness":
        this._changeCornerWindowPocketOuterThickness(data as number);
        handled = true;
        this._actionType = "窗洞厚度";
        break;

      case "complete":
        this._applyEdit();
        break;

      case "Content":
        handled = this._handleContentMessage(data as ContentMessageData);
        this.context.app.signalContextualtoolRefresh.dispatch();
        this.context.app.signalPropertyBarRefresh.dispatch();
        break;

      default:
        handled = super.onReceive?.(message, data) ?? false;
    }

    return handled;
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === ESC_KEY_CODE) {
      this._cancelEdit();
    } else if (event.keyCode === DELETE_KEY_CODE || event.keyCode === TAB_KEY_CODE) {
      this._applyEdit();
    }
  }

  private _handleContentMessage(data: ContentMessageData): boolean {
    if (data.productType === "Material") {
      this._applyMaterial(data);
      return true;
    } else if (data.productType === "Profile") {
      const currentSeekId = this._parametricmodels[0]?.parameters?.profileData?.seekId;
      
      if (data.seekId && data.seekId !== currentSeekId) {
        const request = this.context.transManager.createRequest(
          "ChangeCornerWindowPocketStyleRequest",
          [this._parametricmodels, data]
        );
        this.context.transManager.commit(request);
      }
      return true;
    }
    return false;
  }

  private _cancelEdit(): void {
    this._session.abort();
    this.mgr.complete(this);
  }

  private _applyEdit(): void {
    this._session.commit();
    this.mgr.complete(this);
  }

  private _applyMaterial(materialData: ContentMessageData): void {
    const currentMaterial = this._getCurrentMaterialData();
    
    if (!currentMaterial || !materialData || currentMaterial.seekId !== materialData.seekId) {
      const request = this.context.transManager.createRequest(
        "ChangeCornerWindowMaterial",
        [this._parametricmodels, materialData]
      );
      this.context.transManager.commit(request);
    }
  }

  private _getCurrentMaterialData(): MaterialData | undefined {
    const firstModel = this._parametricmodels[0];
    if (!firstModel) return undefined;

    return this._isNgParametricWindow(firstModel)
      ? firstModel.parameters?.frame?.materialData
      : firstModel.parameters?.materialData;
  }

  private _isHideCornerWindow(hide: boolean): void {
    const request = this.context.transManager.createRequest(
      "ShowHideCornerWindowChild",
      [this._parametricmodels, hide]
    );
    this.context.transManager.commit(request);
  }

  private _changeMaterialTohost(sameToHost: boolean): void {
    const request = this.context.transManager.createRequest(
      "ChangeMaterialTohost",
      [this._parametricmodels, sameToHost]
    );
    this.context.transManager.commit(request);
  }

  private _changeMaterialRotation(): void {
    const request = this.context.transManager.createRequest(
      "ChangeCornerWindowMaterialRotation",
      [this._parametricmodels]
    );
    this.context.transManager.commit(request);
  }

  private _changeWindowFrameNumber(count: number): void {
    const MILLIMETER_MULTIPLIER = 1000;
    const request = this.context.transManager.createRequest(
      "ChangeWindowFrameNumber",
      [this._parametricmodels, count * MILLIMETER_MULTIPLIER]
    );
    this.context.transManager.commit(request);
  }

  private _changeWindowFrameWidth(width: number): void {
    const request = this.context.transManager.createRequest(
      "ChangeWindowFrameWidth",
      [this._parametricmodels, width, this._oldWidth]
    );
    this.context.transManager.commit(request);
  }

  private _changeWindowFrameWidthOnValueChange(width: number): void {
    this._parametricmodels.forEach((model) => {
      if (model?.parameters?.frame) {
        model.parameters.frame.width = width;
        model.dirtyGeometry();
        model.getUniqueParent().dirtyGeometry();
      }
    });
  }

  private _changeCornerWindowPocketWidth(width: number): void {
    const request = this.context.transManager.createRequest(
      "ChangeCornerWindowPocketWidth",
      [this._parametricmodels, width]
    );
    this.context.transManager.commit(request);
  }

  private _changeCornerWindowPocketThickness(thickness: number): void {
    const request = this.context.transManager.createRequest(
      "ChangeCornerWindowPocketThickness",
      [this._parametricmodels, thickness]
    );
    this.context.transManager.commit(request);
  }

  private _changeCornerWindowPocketOuterWidth(width: number): void {
    const request = this.context.transManager.createRequest(
      "ChangeCornerWindowPocketOuterWidth",
      [this._parametricmodels, width]
    );
    this.context.transManager.commit(request);
  }

  private _changeCornerWindowPocketOuterThickness(thickness: number): void {
    const request = this.context.transManager.createRequest(
      "ChangeCornerWindowPocketOuterThickness",
      [this._parametricmodels, thickness]
    );
    this.context.transManager.commit(request);
  }

  getDescription(): string {
    return `编辑窗户${this._actionType}`;
  }

  getCategory(): string {
    return "ContentOperation";
  }

  private _isWindowInstance(model: ParametricModel): boolean {
    return model.instanceOf("Window");
  }

  private _isNgParametricWindow(model: ParametricModel): boolean {
    return model.instanceOf("NgParametricWindow");
  }
}

export default EditCornerWindowCommand;