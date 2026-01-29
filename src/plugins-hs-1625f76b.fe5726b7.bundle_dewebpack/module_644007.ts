import { HSApp } from './types/HSApp';
import { HSCore } from './types/HSCore';
import { HSFPConstants } from './types/HSFPConstants';

interface CatalogOpenOption {
  seekId?: string;
  query?: {
    seekId?: string;
    categoryId?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface CommandContext {
  cmdMgr?: HSApp.Cmd.CommandManager;
  [key: string]: unknown;
}

interface PanelHiddenEventData {
  keepOpening?: boolean;
}

interface PanelHiddenEvent {
  data?: PanelHiddenEventData;
}

interface UndoRedoEventData {
  request?: unknown;
}

interface UndoRedoEvent {
  data?: UndoRedoEventData;
}

interface CatalogPlugin {
  signalIndependentHidden: {
    listen(handler: (event: PanelHiddenEvent) => void, context: unknown): void;
    unlisten(handler: (event: PanelHiddenEvent) => void, context: unknown): void;
  };
  openIndependentPanel(option: CatalogOpenOption, treeId: string): void;
  closeIndependent(): void;
}

type ProductSelectedHandler = (product: unknown, context: CommandContext) => void;
type PanelShownHandler = (context: CommandContext) => void;
type PanelHiddenHandler = (context: CommandContext) => void;
type UndoRedoHandler = (request: unknown, isRedo?: boolean) => void;

interface CatalogCommandOptions {
  productSelectedHandler?: ProductSelectedHandler;
  panelShownHandler?: PanelShownHandler;
  panelHiddenHandler?: PanelHiddenHandler;
  undoRedoHandler?: UndoRedoHandler;
}

export default class CatalogCommand extends HSApp.Cmd.Command {
  private treeId: string;
  private catalogPlugin: CatalogPlugin;
  private openOption: CatalogOpenOption;
  private productSelectedHandler: ProductSelectedHandler;
  private panelShownHandler: PanelShownHandler;
  private panelHiddenHandler: PanelHiddenHandler;
  private undoRedoHandler: UndoRedoHandler;

  constructor(
    catalogPlugin: CatalogPlugin,
    openOption: CatalogOpenOption,
    options: CatalogCommandOptions,
    treeId: string = ''
  ) {
    super();

    const {
      productSelectedHandler = () => {},
      panelShownHandler = () => {},
      panelHiddenHandler = () => {},
      undoRedoHandler = () => {}
    } = options;

    this.treeId = treeId;
    this.catalogPlugin = catalogPlugin;
    this.openOption = openOption;
    this.productSelectedHandler = productSelectedHandler;
    this.panelShownHandler = panelShownHandler;
    this.panelHiddenHandler = panelHiddenHandler;
    this.undoRedoHandler = undoRedoHandler;
  }

  onExecute(): void {
    const app = HSApp.App.getApp();
    
    app.transManager.signalUndone.listen(this.handleUndoInCommand, this);
    app.transManager.signalRedone.listen(this.handleRedoInCommand, this);
    this.catalogPlugin.signalIndependentHidden.listen(this.onPanelHidden, this);

    const localMaterialIds = [
      HSCore.Material.MaterialIdEnum.local,
      HSCore.Material.MaterialIdEnum.customized
    ];

    if (this.openOption.seekId && !localMaterialIds.includes(this.openOption.seekId)) {
      app.catalogManager
        .getProductBySeekId(this.openOption.seekId)
        .then((product) => {
          const queryData = {
            seekId: this.openOption.seekId!,
            categoryId: product && product.categories ? product.categories[0] : ''
          };

          if (this.openOption.query) {
            Object.assign(this.openOption.query, queryData);
          } else {
            this.openOption.query = queryData;
          }

          this.catalogPlugin.openIndependentPanel(this.openOption, this.treeId);
        })
        .catch(() => {
          this.catalogPlugin.openIndependentPanel(this.openOption, this.treeId);
        });
    } else {
      this.catalogPlugin.openIndependentPanel(this.openOption, this.treeId);
    }

    this.panelShownHandler(this.context);
  }

  onCleanup(): void {
    const app = HSApp.App.getApp();
    
    app.transManager.signalUndone.unlisten(this.handleUndoInCommand, this);
    app.transManager.signalRedone.unlisten(this.handleRedoInCommand, this);
    this.catalogPlugin.signalIndependentHidden.unlisten(this.onPanelHidden, this);

    if (!this.undoRedoHandler) {
      this.catalogPlugin.closeIndependent();
      this.panelHiddenHandler(this.context);
    }
  }

  onReceive(messageType: string, data: unknown): boolean {
    let handled = false;

    if (messageType === HSFPConstants.CommandMessage.Content) {
      const context: CommandContext = {
        cmdMgr: this.mgr,
        ...this.context
      };

      this.productSelectedHandler(data, context);
      handled = true;
    } else {
      handled = super.onReceive?.(messageType, data) ?? false;
    }

    return handled;
  }

  private onPanelHidden(event: PanelHiddenEvent): void {
    if (event.data?.keepOpening) {
      return;
    }

    this.undoRedoHandler = () => {};
    this.panelHiddenHandler(this.context);
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }

  canUndoRedoInCommand(): boolean {
    return true;
  }

  private handleUndoInCommand(event: UndoRedoEvent): void {
    const request = event?.data?.request;
    if (request) {
      this.undoRedoHandler(request);
    }
  }

  private handleRedoInCommand(event: UndoRedoEvent): void {
    const request = event?.data?.request;
    if (request) {
      this.undoRedoHandler(request, true);
    }
  }
}