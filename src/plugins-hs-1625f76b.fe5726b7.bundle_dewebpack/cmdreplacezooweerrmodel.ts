import { Message } from './utils/Message';

interface CatalogPlugin {
  signalIndependentHidden: {
    listen(handler: (data: { data?: { keepOpening?: boolean } }) => void, context: any): void;
    unlisten(handler: (data: { data?: { keepOpening?: boolean } }) => void, context: any): void;
  };
  openReverseRenderReplacePanel(options: ReplacePanelOptions): void;
  closeIndependent(): void;
}

interface ReplacePanelOptions {
  source: string;
  customTitle: string;
  queryProducts: () => Promise<any>;
}

interface App {
  pluginManager: {
    getPlugin(type: string): CatalogPlugin;
  };
  selectionManager: SelectionManager;
}

interface SelectionManager {
  selected(): any[];
  unselect(item: any): void;
  select(item: any): void;
}

interface TransactionManager {
  createRequest(type: string, params: any[]): any;
  commit(request: any): any;
}

interface Context {
  selectionManager: SelectionManager;
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

interface Command {
  context: Context;
  mgr: CommandManager;
  onExecute(): void;
  onCleanup(): void;
  onReceive(messageType: string, data: any): boolean;
  canUndoRedo(): boolean;
  canUndoRedoInCommand(): boolean;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new () => Command;
  };
};

declare const HSFPConstants: {
  PluginType: {
    Catalog: string;
  };
  CommandMessage: {
    Content: string;
  };
  RequestType: {
    ReplaceProduct: string;
  };
};

declare const NWTK: {
  mtop: {
    Catalog: {
      customedRenderEnterPriseModelSearch(): Promise<any>;
    };
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

const MESSAGE_SUCCESS_DURATION = 4000;

export class CmdReplaceZooWeeRRModel extends HSApp.Cmd.Command {
  private _catalogPlugin?: CatalogPlugin;
  private _app: App;
  private _hiddenHandlerCalled: boolean = false;

  constructor() {
    super();
    this._app = HSApp.App.getApp();
    this._catalogPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
  }

  public onExecute(): void {
    this._catalogPlugin?.signalIndependentHidden.listen(this._onPanelHidden, this);
    this._showReplacePanel();
  }

  public onCleanup(): void {
    this._catalogPlugin?.signalIndependentHidden.unlisten(this._onPanelHidden, this);
    
    if (!this._hiddenHandlerCalled) {
      this._catalogPlugin?.closeIndependent();
      this._panelHiddenHandler();
    }
  }

  private _showReplacePanel(): void {
    this._catalogPlugin!.openReverseRenderReplacePanel({
      source: "customedRender",
      customTitle: "替换模型",
      queryProducts: () => {
        return NWTK.mtop.Catalog.customedRenderEnterPriseModelSearch();
      }
    });
  }

  public onReceive(messageType: string, data: any): boolean {
    if (messageType === HSFPConstants.CommandMessage.Content) {
      this._replaceSelectedModel(this.context, data);
      return true;
    }
    
    return super.onReceive?.(messageType, data) ?? false;
  }

  private _onPanelHidden(event: { data?: { keepOpening?: boolean } }): void {
    if (event.data?.keepOpening) {
      return;
    }
    
    this._hiddenHandlerCalled = true;
    this._panelHiddenHandler();
    this.mgr.complete(this);
  }

  public canUndoRedo(): boolean {
    return false;
  }

  public canUndoRedoInCommand(): boolean {
    return true;
  }

  private _panelHiddenHandler(): void {
    const selectionManager = this._app.selectionManager;
    const selectedItem = selectionManager.selected()[0];
    
    if (selectedItem) {
      selectionManager.unselect(selectedItem);
    }
  }

  private _replaceSelectedModel(context: Context, productData: any): void {
    const selectionManager = context.selectionManager;
    const transManager = context.transManager;
    const selectedItem = selectionManager.selected()[0];
    
    const request = transManager.createRequest(
      HSFPConstants.RequestType.ReplaceProduct,
      [selectedItem, productData, {}]
    );
    
    const result = transManager.commit(request);
    
    if (result) {
      selectionManager.select(result);
      Message.success(ResourceManager.getString("successfully_replace"), {
        duration: MESSAGE_SUCCESS_DURATION
      });
    }
  }
}