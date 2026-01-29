enum CommandMessageEnum {
  Cancel = "cancel",
  Complete = "complete",
  Reset = "reset",
  EditComponent = "editcomponent",
  ShowComponent = "showcomponent",
  HideComponent = "hidecomponent"
}

interface KeydownEvent {
  keyCode: number;
}

interface CommandPayload {
  component?: HSCore.Model.CurtainComponentEnum;
  productType?: HSCatalog.ProductTypeEnum;
  [key: string]: unknown;
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

interface CommandContext {
  app: {
    switchPrimaryViewMode(mode: HSApp.View.ViewModeEnum): void;
  };
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: CmdEditCurtainCloth): void;
}

interface CurtainModel {
  getMaterial(component: HSCore.Model.CurtainComponentEnum): unknown;
  isComponentEnabled(component: HSCore.Model.CurtainComponentEnum): boolean;
  disableComponentNumber(): number;
}

interface CatalogPlugin {
  [key: string]: unknown;
}

/**
 * Command for editing curtain cloth components
 */
class CmdEditCurtainCloth extends HSApp.Cmd.Command {
  private curtain: CurtainModel;
  private _catalogPlugin: CatalogPlugin;
  private _editingComponent?: HSCore.Model.CurtainComponentEnum;
  private _session!: TransactionSession;
  
  protected context!: CommandContext;
  protected mgr!: CommandManager;

  constructor(curtain: CurtainModel, catalogPlugin: CatalogPlugin) {
    super();
    this.curtain = curtain;
    this._catalogPlugin = catalogPlugin;
    this._editingComponent = undefined;
  }

  canUndoRedo(): boolean {
    return false;
  }

  onExecute(): void {
    this.context.app.switchPrimaryViewMode(HSApp.View.ViewModeEnum.FirstPerson);
    this._session = this.context.transManager.startSession();
  }

  onReceive(message: string, payload: CommandPayload | KeydownEvent): boolean {
    let handled = false;

    switch (message) {
      case "keydown": {
        const event = payload as KeydownEvent;
        if (event.keyCode === HSApp.Util.Keyboard.KeyCodes.ESC) {
          this._cancelEdit();
        } else if (
          event.keyCode === HSApp.Util.Keyboard.KeyCodes.DELETE ||
          event.keyCode === HSApp.Util.Keyboard.KeyCodes.TAB
        ) {
          this._applyEdit();
        }
        break;
      }

      case CommandMessageEnum.Complete:
        this._applyEdit();
        break;

      case CommandMessageEnum.Cancel:
        this._cancelEdit();
        break;

      case CommandMessageEnum.Reset:
        this._resetCurtain();
        handled = true;
        break;

      case CommandMessageEnum.EditComponent: {
        const data = payload as CommandPayload;
        this._editingComponent = data.component;
        handled = true;
        break;
      }

      case CommandMessageEnum.HideComponent: {
        const data = payload as CommandPayload;
        if (data.component) {
          this._isHideComponent(data.component, true);
        }
        handled = true;
        break;
      }

      case CommandMessageEnum.ShowComponent: {
        const data = payload as CommandPayload;
        if (data.component) {
          this._isHideComponent(data.component, false);
        }
        handled = true;
        break;
      }

      case HSFPConstants.CommandMessage.Content: {
        const data = payload as CommandPayload;
        if (data.productType === HSCatalog.ProductTypeEnum.Material) {
          this._applyComponentMaterial(data);
          handled = true;
        }
        break;
      }

      default:
        handled = super.onReceive?.(message, payload) ?? false;
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

  private _applyComponentMaterial(material: CommandPayload): void {
    if (!this._editingComponent) {
      return;
    }

    const currentMaterial = this.curtain.getMaterial(this._editingComponent);
    
    if (!currentMaterial || !(currentMaterial as any).isSame?.(material)) {
      const request = this.context.transManager.createRequest(
        HSFPConstants.RequestType.ChangeComponentMaterial,
        [this.curtain, this._editingComponent, material]
      );
      this.context.transManager.commit(request);
    }
  }

  private _resetCurtain(): void {
    const allComponents = Object.keys(HSCore.Model.CurtainComponentEnum).map(
      (key) => HSCore.Model.CurtainComponentEnum[key as keyof typeof HSCore.Model.CurtainComponentEnum]
    );

    const hasEnabledMaterials = allComponents.some((component) => {
      return this.curtain.isComponentEnabled(component) && !!this.curtain.getMaterial(component);
    });

    if (hasEnabledMaterials || this.curtain.disableComponentNumber() !== 0) {
      const request = this.context.transManager.createRequest(
        HSFPConstants.RequestType.ResetCurtain,
        [this.curtain]
      );
      this.context.transManager.commit(request);
    }
  }

  private _isHideComponent(component: HSCore.Model.CurtainComponentEnum, isHidden: boolean): void {
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ShowHideCurtainComponent,
      [this.curtain, component, isHidden]
    );
    this.context.transManager.commit(request);
  }
}

export { CommandMessageEnum, CmdEditCurtainCloth };