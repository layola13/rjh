interface OpeningStylerConfig {
  app: any;
  handler: any;
  toolbarPlugin: any;
  displayList: any;
}

interface ToolbarItem {
  type: string;
  name: string;
  order: number;
  label?: string;
  icon?: string;
  tooltip?: string;
  onclick?: (event: any) => void;
}

declare const HSCore: any;
declare const HSConstants: any;
declare const LiveHint: any;
declare const ResourceManager: any;

export default class OpeningStyler {
  private _app: any;
  private _handler: any;
  private _toolbarPlugin: any;
  private _displayList: any;
  private _selectionMgr: any;
  private _selectedEntities: Set<any>;
  private _toolbarId: string;
  private _signalHook: any;

  constructor(config: OpeningStylerConfig) {
    this._app = config.app;
    this._handler = config.handler;
    this._toolbarPlugin = config.toolbarPlugin;
    this._displayList = config.displayList;
    this._selectionMgr = this._app.selectionManager;
    this._selectedEntities = new Set();
    this._toolbarId = "openingstyler";
    this.initToolbar();
    this._signalHook = new HSCore.Util.SignalHook(this);
  }

  enterStyler(): void {
    this.activateToolbar();
    this._selectedEntities.clear();
    this._signalHook.listen(
      this._selectionMgr.signalSelectionChanged,
      this._onSelectionChanged
    );
    this.showLiveHint();
  }

  exitStyler(): void {
    this._signalHook.unlistenAll();
    this._selectionMgr.unselectAll();
  }

  showLiveHint(): void {
    let hintKey: string | undefined;
    
    switch (this._handler.getTemplateEntity().Class) {
      case HSConstants.ModelClass.NgDoor:
        hintKey = "plugin_contentstyler_select_door_to_replace";
        break;
      case HSConstants.ModelClass.NgWindow:
        hintKey = "plugin_contentstyler_select_window_to_replace";
        break;
      case HSConstants.ModelClass.NgHole:
        hintKey = "plugin_contentstyler_select_hole_to_replace";
        break;
    }

    if (hintKey) {
      LiveHint.show(ResourceManager.getString(hintKey), undefined, undefined, {
        canclose: true
      });
    }
  }

  hideLiveHint(): void {
    LiveHint.hide();
  }

  initToolbar(): void {
    const toolbarItems: ToolbarItem[] = [
      {
        type: "divider",
        name: "toolbar_content_styler_divider",
        order: 200
      },
      {
        type: "button",
        label: ResourceManager.getString("cancel"),
        name: "toolbar_content_styler_cancel",
        icon: "hs_xian_guanbi",
        tooltip: ResourceManager.getString("cancel"),
        order: 300,
        onclick: () => {
          this.hideLiveHint();
          this._handler.exitStyler();
        }
      }
    ];

    this._toolbarPlugin.addToolbar(this._toolbarId, toolbarItems);
  }

  activateToolbar(): void {
    this._toolbarPlugin.activateToolbar(this._toolbarId);
  }

  getTargetEntities(): any[] {
    return Array.from(this._selectedEntities);
  }

  isOpeningContent(entity: any): boolean {
    return entity.instanceOf(HSConstants.ModelClass.NgOpening);
  }

  isOpeningStylerContent(entity: any): boolean {
    const templateEntity = this._handler.getTemplateEntity();
    return entity.Class === templateEntity.Class && entity.ID !== templateEntity.ID;
  }

  private _onSelectionChanged = (): void => {
    const selected = this._selectionMgr.selected();
    
    if (selected.length === 1) {
      const entity = selected[0];
      
      if (this._selectedEntities.has(entity)) {
        entity.setFlagOff(HSCore.Model.ContentFlagEnum.replace, true);
        this._selectedEntities.delete(entity);
      } else {
        entity.setFlagOn(HSCore.Model.ContentFlagEnum.replace, true);
        this._selectedEntities.add(entity);
      }
      
      this._displayList.get(entity.ID).draw();
    }
  };
}