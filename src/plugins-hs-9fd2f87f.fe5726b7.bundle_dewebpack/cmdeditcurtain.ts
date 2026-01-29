enum EditCurtainCommandMessageEnum {
  Cancel = "cancel",
  Complete = "complete",
  Reset = "reset",
  EditComponent = "editcomponent",
  ShowComponent = "showcomponent",
  HideComponent = "hidecomponent"
}

interface EditingComponent {
  // Define specific component properties based on your domain
  [key: string]: unknown;
}

interface Material {
  isSame(other: Material): boolean;
  [key: string]: unknown;
}

interface Curtain {
  getMaterial(component: EditingComponent): Material | null | undefined;
  [key: string]: unknown;
}

interface CatalogPlugin {
  [key: string]: unknown;
}

interface KeyboardEvent {
  keyCode: number;
}

interface ContentMessage {
  productType: string;
  component?: EditingComponent;
  [key: string]: unknown;
}

interface TransactionSession {
  abort(): void;
  commit(): void;
}

interface TransactionRequest {
  [key: string]: unknown;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandContext {
  app: unknown;
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: CmdEditCurtain): void;
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr!: CommandManager;
  
  abstract canUndoRedo(): boolean;
  abstract onExecute(): void;
  abstract onReceive(message: string, data: unknown): boolean;
}

class CmdEditCurtain extends Command {
  private readonly curtain: Curtain;
  private readonly _catalogPlugin: CatalogPlugin;
  private _editingComponent: EditingComponent | undefined;
  private _session!: TransactionSession;

  constructor(curtain: Curtain, catalogPlugin: CatalogPlugin) {
    super();
    this.curtain = curtain;
    this._catalogPlugin = catalogPlugin;
    this._editingComponent = undefined;
  }

  canUndoRedo(): boolean {
    return false;
  }

  onExecute(): void {
    this.context.app;
    this._session = this.context.transManager.startSession();
  }

  onReceive(message: string, data: unknown): boolean {
    let handled = false;

    switch (message) {
      case "keydown": {
        const keyEvent = data as KeyboardEvent;
        if (keyEvent.keyCode === HSApp.Util.Keyboard.KeyCodes.ESC) {
          this._cancelEdit();
        } else if (
          keyEvent.keyCode !== HSApp.Util.Keyboard.KeyCodes.DELETE &&
          keyEvent.keyCode !== HSApp.Util.Keyboard.KeyCodes.TAB
        ) {
          this._applyEdit();
        }
        break;
      }

      case EditCurtainCommandMessageEnum.Complete:
        this._applyEdit();
        break;

      case EditCurtainCommandMessageEnum.EditComponent: {
        const editData = data as { component: EditingComponent };
        this._editingComponent = editData.component;
        handled = true;
        break;
      }

      case EditCurtainCommandMessageEnum.HideComponent: {
        const hideData = data as { component: EditingComponent };
        this._isHideComponent(hideData.component, true);
        handled = true;
        break;
      }

      case EditCurtainCommandMessageEnum.ShowComponent: {
        const showData = data as { component: EditingComponent };
        this._isHideComponent(showData.component, false);
        handled = true;
        break;
      }

      case HSFPConstants.CommandMessage.Content: {
        const contentData = data as ContentMessage;
        if (contentData.productType === HSCatalog.ProductTypeEnum.Material) {
          this._applyComponentMaterial(contentData);
          handled = true;
        }
        break;
      }

      default:
        handled = super.onReceive(message, data);
    }

    return handled;
  }

  private _cancelEdit(): void {
    this._session.abort();
    this.mgr.complete(this);
  }

  private _applyEdit(): void {
    this._session.commit();
    this.mgr.complete(this);
  }

  private _applyComponentMaterial(material: ContentMessage): void {
    const currentMaterial = this.curtain.getMaterial(this._editingComponent!);
    
    if (!currentMaterial || !currentMaterial.isSame(material as unknown as Material)) {
      const request = this.context.transManager.createRequest(
        HSFPConstants.RequestType.ChangeComponentMaterial,
        [this.curtain, this._editingComponent, material]
      );
      this.context.transManager.commit(request);
    }
  }

  private _isHideComponent(component: EditingComponent, hide: boolean): void {
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ShowHideCurtainComponent,
      [this.curtain, component, hide]
    );
    this.context.transManager.commit(request);
  }
}

export { EditCurtainCommandMessageEnum, CmdEditCurtain };