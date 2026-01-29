import { getSelectedInJSON, isCopyPasteSupported } from './utils';

interface PasteCommandOptions {
  selectedContents?: HSCore.Model.Entity[];
  altKey: boolean;
  position?: { x: number; y: number; z: number };
}

interface ContentJSON {
  environmentId: string;
  viewMode: string;
  isComplete: boolean;
  data: ContentData[];
  material?: unknown;
  products?: ProductInfo[];
}

interface ContentData {
  id: string;
  seekId: string;
  members?: string[];
  p?: string[];
}

interface ProductInfo {
  id: string;
}

interface Product {
  id: string;
}

const INCOMPLETE_PASTE_STORAGE_KEY = 'CMDPASTE_INCOMPLETE_PASTE_NOT_SHOW_LIVEHINT';
const CROSS_VIEW_MODE_HINT_DURATION = 3000;

export default class PasteCommand extends HSApp.Cmd.Command {
  private _app: HSApp.App;
  private _floorplan: unknown;
  private _selectedContents?: HSCore.Model.Entity[];
  private _contentsJSON?: ContentJSON;
  private _contents: HSCore.Model.Entity[];
  private _altKey: boolean;
  private _localStorage: HSApp.Util.Storage;
  private _terminated: boolean;
  public position?: { x: number; y: number; z: number };
  public output?: HSCore.Model.Entity[];
  public content?: HSCore.Model.Entity;

  constructor(options: PasteCommandOptions) {
    super();
    this._app = HSApp.App.getApp();
    this._floorplan = this._app.floorplan;
    this._selectedContents = options.selectedContents;
    this._contentsJSON = this._selectedContents 
      ? getSelectedInJSON(this._selectedContents) 
      : undefined;
    this._contents = [];
    this._altKey = options.altKey;
    this.position = options.position;
    this._localStorage = new HSApp.Util.Storage('hsw.plugin.editor');
    this._terminated = false;
  }

  onExecute(): void {
    this._terminated = false;

    const userInputPlugin = this._app.pluginManager.getPlugin(
      HSFPConstants.PluginType.UserInput
    );
    
    let contentsJSON: ContentJSON | undefined = this._contentsJSON 
      ? this._contentsJSON 
      : userInputPlugin.getJSON('editor');
    
    if (!contentsJSON) {
      contentsJSON = userInputPlugin.selectedJSON;
    }

    if (!contentsJSON || contentsJSON.material) {
      this._onTerminate(true);
      return;
    }

    if (this._isNotCurrentViewMode(contentsJSON.environmentId, contentsJSON.viewMode)) {
      this._showCrossViewModeLiveHint();
      this._onTerminate(true);
      return;
    }

    if (!contentsJSON.isComplete) {
      this._showIncompleteLiveHint();
    }

    let supportedContents = this._filterSupportedContents(contentsJSON.data);
    supportedContents = this._filterOrphanedContents(supportedContents, contentsJSON);

    const catalogManager = HSApp.App.getApp().catalogManager;
    const productCache: Record<string, boolean> = {};
    
    const productPromises = supportedContents.map((content) => {
      productCache[content.seekId] = true;
      return catalogManager
        .getProductBySeekId(content.seekId)
        .catch(() => Promise.resolve(undefined));
    });

    if (this._contentsJSON?.products) {
      this._contentsJSON.products.forEach((product) => {
        if (product?.id && !productCache[product.id]) {
          productCache[product.id] = true;
          productPromises.push(
            catalogManager
              .getProductBySeekId(product.id)
              .catch(() => Promise.resolve(undefined))
          );
        }
      });
    }

    Promise.all(productPromises)
      .then((products) => {
        const productsMap = new Map<string, Product>();
        products.forEach((product) => {
          if (product) {
            productsMap.set(product.id, product);
          }
        });
        this._pasteContents(supportedContents, contentsJSON!, productsMap);
      })
      .catch((error) => {
        console.assert(false, `Duplicate content failed! Error: ${error}`);
        this._onTerminate(true);
      });
  }

  private _filterSupportedContents(data: ContentData[]): ContentData[] {
    const allMemberIds = data.reduce<string[]>((acc, item) => {
      return acc.concat(item.members ?? []);
    }, []);

    return data.filter((content) => {
      const className = HSConstants.ClassSNameToLName.get(
        HSCore.Model.Entity.getDumpedClassName(content)
      );
      
      if (!isCopyPasteSupported(className)) {
        return false;
      }

      const isMemberOfAnother = allMemberIds.find((memberId) => content.id === memberId);
      return isMemberOfAnother === undefined;
    });
  }

  private _filterOrphanedContents(
    contents: ContentData[],
    contentsJSON: ContentJSON
  ): ContentData[] {
    return contents.filter((content) => {
      const hasParentInData = contentsJSON.data.find(
        (item) => item.id === content.p?.[0]
      );
      return hasParentInData === undefined;
    });
  }

  private _pasteContents(
    contents: ContentData[],
    contentsJSON: ContentJSON,
    productsMap: Map<string, Product>
  ): void {
    for (let i = contents.length - 1; i >= 0; i--) {
      const contentData = contents[i];
      const selectedContent = this._altKey && this._selectedContents?.[i];
      let entity = this._selectedContents?.[i];

      if (
        entity instanceof HSCore.Model.Door ||
        (entity instanceof HSCore.Model.Window &&
          !entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.BayWindow))
      ) {
        entity = undefined;
      }

      const pastedContent = this._pasteContent(
        contentData,
        contentsJSON,
        productsMap,
        selectedContent,
        entity
      );

      if (this._altKey && selectedContent) {
        pastedContent.assignTo(selectedContent.getHost());
      }

      this._contents.push(pastedContent);
    }

    this._contents = this._contents.filter((content) => !content.group);

    if (this._contents.length > 0) {
      if (!this._altKey) {
        this._selectContents(this._contents);
      }
      this.output = this._contents;
      this._onTerminate(false);
    } else {
      this._onTerminate(true);
    }
  }

  private _isNotCurrentViewMode(environmentId: string, viewMode: string): boolean {
    return this._getEnvId() !== environmentId || this._getViewMode() !== viewMode;
  }

  private _getEnvId(): string {
    return this._app.activeEnvironmentId;
  }

  private _getViewMode(): string {
    return this._app.primaryViewMode;
  }

  private _showIncompleteLiveHint(): void {
    LiveHint.hide();

    if (!this._localStorage.get(INCOMPLETE_PASTE_STORAGE_KEY)) {
      const message = ResourceManager.getString('incomplete_paste_livehint');
      LiveHint.show(
        message,
        undefined,
        () => {
          this._localStorage.set(INCOMPLETE_PASTE_STORAGE_KEY, true);
          LiveHint.hide();
        },
        { canclose: true }
      );
    }
  }

  private _showCrossViewModeLiveHint(): void {
    const message = ResourceManager.getString('cross_view_mode_paste_livehint');
    LiveHint.show(
      message,
      CROSS_VIEW_MODE_HINT_DURATION,
      () => {
        LiveHint.hide();
      },
      { canclose: true }
    );
  }

  private _pasteContent(
    dataContent: ContentData,
    contentsJSON: ContentJSON,
    productsMap: Map<string, Product>,
    selectedContent?: HSCore.Model.Entity,
    entity?: HSCore.Model.Entity
  ): HSCore.Model.Entity {
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.PasteContent,
      [
        {
          dataContent,
          selectedContent,
          contentsJSON,
          floorplan: this._floorplan,
          productsMap,
          position: this.position,
          altKey: this._altKey,
          entity,
        },
      ]
    );

    this.context.transManager.commit(request);
    this.content = request.result;
    return this.content;
  }

  private _selectContents(contents: HSCore.Model.Entity[]): void {
    const selectionManager = HSApp.Selection.Manager;
    selectionManager.unselectAll();
    contents.forEach((content) => {
      selectionManager.select(content);
    });
  }

  onCleanup(): void {
    this._contents = [];
    if (!this._terminated) {
      this._terminated = true;
    }
  }

  private _onTerminate(cancel: boolean): void {
    this._terminated = true;
    if (cancel) {
      this.mgr.cancel(this);
    } else {
      this.mgr.complete(this);
    }
  }

  canUndoRedo(): boolean {
    return false;
  }

  canSuspend(): boolean {
    return false;
  }

  getDescription(): string {
    return '粘贴物品';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}