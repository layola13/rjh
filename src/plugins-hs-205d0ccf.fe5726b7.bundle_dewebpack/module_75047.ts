import { HSApp } from './518193';
import ResourceManager from './739227';

enum LiveHintStatus {
  loading = 'loading',
  completed = 'completed',
  warning = 'warning'
}

interface LiveHint {
  statusEnum: typeof LiveHintStatus;
  show(message: string, duration?: number, position?: unknown, options?: { status: LiveHintStatus }): void;
  hide(): void;
}

declare const LiveHint: LiveHint;

interface HSFPConstants {
  PluginType: {
    Toolbar: string;
    PageHeader: string;
  };
}

declare const HSFPConstants: HSFPConstants;

interface ToolbarPlugin {
  ToolbarIdEnum: {
    DEFAULT_TOOLBAR_ID: string;
  };
  addLinkedToolbar(id: string, baseId: string, config: ToolbarConfig): void;
  activateToolbar(id: string): void;
}

interface ToolbarConfig {
  excludeItems: string[];
  addItems: Array<[ToolbarItem, string]>;
}

interface ToolbarItem {
  name: string;
  type: string;
  order: number;
  label: string;
  icon: string;
  hotkey: {
    win: string;
    mac: string;
  };
  onclick: () => void;
}

interface PageHeaderButton {
  envName: string;
  handleClick: () => void;
}

interface PageHeaderRenderConfig {
  getRenderItem: () => JSX.Element;
}

interface ActivateParams {
  originalAccessoryAssetId?: string;
  preEnvironmentId?: string;
  preAssetId?: string;
  escEnvironment?: () => void;
  executeSaveOriginExtend?: (assetId: string, onSave: () => void | Promise<void>, onCancel?: () => void) => void;
}

interface SaveResult {
  isSave: boolean;
}

interface ViewOption {
  id: string;
  enableSwitchTip?: boolean;
  icons?: Array<{ id: string; fieldName: string }>;
  strings?: Array<{ id: string; fieldName: string; hotKey?: string }>;
  view?: string;
}

interface ViewModeDropdownData {
  options: ViewOption[];
  defaultKey: string;
  onchange?: (viewType: string, viewMode: string, callback: (type: string, mode: string) => void) => void;
  isExtendsChange?: boolean;
}

interface ViewOptionsConfig {
  type: string;
  id: string;
  order: number;
  data: ViewModeDropdownData;
}

interface CatalogLeftItem {
  id: string;
}

const LIVE_HINT_HANDLERS: Record<LiveHintStatus, () => void> = {
  [LiveHintStatus.loading]: () => {
    const message = ResourceManager.getString("plugin_spacerebuild_save_origin_design_inprogress");
    LiveHint.show(message, undefined, undefined, { status: LiveHintStatus.loading });
  },
  [LiveHintStatus.completed]: () => {
    const message = ResourceManager.getString("plugin_spacerebuild_save_origin_design_success");
    LiveHint.show(message, 3000, undefined, { status: LiveHintStatus.completed });
  },
  [LiveHintStatus.warning]: () => {
    const message = ResourceManager.getString("plugin_spacerebuild_save_origin_design_fail");
    LiveHint.show(message, 5000, undefined, { status: LiveHintStatus.warning });
  }
};

export default class OriginDesignEnvironment extends HSApp.Environment.CommonEnvironment {
  protected menuIdEnum = HSApp.Catalog.DataConfig.MenuIdEnum;
  protected toolbarPlugin?: ToolbarPlugin;
  protected appCatalogManager = HSApp.Catalog.Manager;
  protected toolbarId?: string;
  protected originalAccessoryAssetId?: string;
  protected preEnvironmentId?: string;
  protected preAssetId?: string;
  protected escEnvironment?: () => void;
  protected executeSaveOriginExtend?: (assetId: string, onSave: () => void | Promise<void>, onCancel?: () => void) => void;
  protected toolbarCreated?: boolean;
  protected laster2DdefaultKey?: string;
  protected viewMode3D?: string;
  protected lasterViewMode3D?: string;

  constructor(app: unknown, plugins: Record<string, ToolbarPlugin>) {
    super(app);
    this.toolbarPlugin = plugins[HSFPConstants.PluginType.Toolbar];
    this.toolbarId = this.id;
    this.save = this.save.bind(this);
  }

  onActivate(params: ActivateParams): void {
    const { originalAccessoryAssetId, preEnvironmentId, preAssetId, escEnvironment, executeSaveOriginExtend } = params;
    
    super.onActivate([]);
    
    if (originalAccessoryAssetId) {
      this.originalAccessoryAssetId = originalAccessoryAssetId;
    }
    if (preEnvironmentId) {
      this.preEnvironmentId = preEnvironmentId;
    }
    if (preAssetId) {
      this.preAssetId = preAssetId;
    }
    if (escEnvironment) {
      this.escEnvironment = escEnvironment;
    }
    if (executeSaveOriginExtend) {
      this.executeSaveOriginExtend = executeSaveOriginExtend;
    }
    
    this.activateAfterOpen();
  }

  protected activateAfterOpen(): void {
    if (this.id === this._app.activeEnvironmentId) {
      this.initToolbar();
      this.initCatalog();
      this._app.pluginManager.getPlugin(HSFPConstants.PluginType.PageHeader).beforeEnterEnv(
        this.getPageHeaderCompleteBtn(),
        "left"
      );
      this.toolbarPlugin?.activateToolbar(this.toolbarId!);
    }
  }

  initCatalog(): void {
    const envId = this.id;
    
    if (!this.appCatalogManager.registerEnv(envId)) {
      this.appCatalogManager.registerPageMap(this.getCatalogPageMap());
      this.appCatalogManager.setMenuData(this.getEntryData());
    }
    
    const container = document.querySelector(".catalogLibContainer");
    this.appCatalogManager.showCatalog(container);
  }

  initToolbar(): void {
    if (this.toolbarCreated) {
      return;
    }

    const toolbarConfig: ToolbarConfig = {
      excludeItems: [
        "toolBar_file",
        "toolBar_save",
        "toolBar_root_divider1",
        "toolBar_material_brush",
        "toolBar_assistant",
        "toolBar_create_room",
        "toolBar_root_divider2",
        "toolBar_construction",
        "toolBar_export",
        "toolBar_snapshot_render",
        "toolBar_view_render_results",
        "toolBar_root_divider_render",
        "toolbar_viewOptions/toolBar_toggle2DPrecisionLocationMode",
        "toolbar_viewOptions/toolBar_toggle3DPrecisionLocationMode"
      ],
      addItems: [
        [
          {
            name: "toolBar_origin_design_save",
            type: "button",
            order: 150,
            label: ResourceManager.getString("toolBar_save"),
            icon: "hs_toolbar_baocun",
            hotkey: {
              win: "ctrl+s",
              mac: "meta+s"
            },
            onclick: this.save
          },
          ""
        ],
        [
          {
            name: "toolBar_origin_design_save",
            type: "button",
            order: 600,
            label: ResourceManager.getString("toolBar_save"),
            icon: "hs_toolbar_baocun",
            hotkey: {
              win: "ctrl+s",
              mac: "meta+s"
            },
            onclick: this.save
          },
          "toolBar_file"
        ]
      ]
    };

    this.toolbarPlugin?.addLinkedToolbar(
      this.toolbarId!,
      this.toolbarPlugin.ToolbarIdEnum.DEFAULT_TOOLBAR_ID,
      toolbarConfig
    );
    
    this.toolbarCreated = true;
  }

  save(): void {
    this.executeSaveOriginExtend?.(
      this.originalAccessoryAssetId!,
      this.saveOriginDesgin.bind(this)
    );
  }

  onDeactivate(): void {
    super.onDeactivate([]);
    this._app.pluginManager.getPlugin("hsw.plugin.persistence.Plugin").setAutoSaveOn(true);
    this._app.pluginManager.getPlugin(HSFPConstants.PluginType.PageHeader).afterOuterEnv();
  }

  saveOriginDesgin(): Promise<{ saveOK: boolean }> {
    this.showLiveHint(LiveHintStatus.loading);
    
    return new Promise((resolve, reject) => {
      ResourceManager.save(this.originalAccessoryAssetId!)
        .then((result: SaveResult) => {
          if (result.isSave) {
            this.showLiveHint(LiveHintStatus.completed);
          } else {
            this.showLiveHint(LiveHintStatus.warning);
          }
          resolve({ saveOK: true });
        })
        .catch(() => {
          this.showLiveHint(LiveHintStatus.warning);
          reject({ saveOK: false });
        });
    });
  }

  filterLeftItems(items: CatalogLeftItem[]): CatalogLeftItem[] {
    const excludeItems: Record<string, boolean> = {
      platformAdvanced: true,
      contentmaterialreplace: true,
      ceilingAdvanced: true,
      editMaterialButton: true,
      customizedFeatureModel: true,
      walldecorationAdvanced: true,
      applystyle: true,
      replace: true
    };

    return items.filter(item => !excludeItems[item.id]);
  }

  esc(): void {
    const message = ResourceManager.getString("load_product_start");
    LiveHint.show(message, 6000, undefined, { status: LiveHintStatus.loading });
    
    setTimeout(() => {
      this._app.activateEnvironment(this.preEnvironmentId!);
      this.escEnvironment?.();
      LiveHint.hide();
    }, 20);
  }

  protected getPageHeaderCompleteBtn(): PageHeaderRenderConfig {
    const buttonData: PageHeaderButton = {
      envName: ResourceManager.getString("plugin_spacerebuild_menuitem_edit_origin_design_done"),
      handleClick: () => {
        this.executeSaveOriginExtend?.(
          this.originalAccessoryAssetId!,
          () => {
            this.saveOriginDesgin().then(() => {
              this.esc();
            });
          },
          () => {
            this.esc();
          }
        );
      }
    };

    return {
      getRenderItem: () => {
        // Assuming there's a React component for this
        return React.createElement(PageHeaderCompleteButton, { data: buttonData }, " ");
      }
    };
  }

  showLiveHint(status: LiveHintStatus): void {
    const handler = LIVE_HINT_HANDLERS[status];
    handler?.();
  }

  protected getCatalogPageMap(): Map<string, JSX.Element> {
    const pageMap = new Map<string, JSX.Element>();
    pageMap.set(this.menuIdEnum.draw, React.createElement(DrawCatalogPage, null));
    return pageMap;
  }

  protected getEntryData(): unknown[] {
    return [
      {
        id: this.menuIdEnum.draw,
        icon: "hs_catalog_cebianlan_huahuxing1",
        text: ResourceManager.getString("catalog_draw_room"),
        data: [
          {
            id: this.menuIdEnum.draw,
            name: ""
          }
        ],
        selectCategoryId: this.menuIdEnum.draw,
        isSelected: true
      }
    ];
  }

  getViewOptions(): unknown {
    if (!this.active) {
      return [];
    }

    return {
      viewOptions2D: this.get2DViewOptions(),
      viewOptions3D: this.get3DViewOptions(),
      secondaryViewOptions: this.getSecondaryViewOptions(),
      showTip: true,
      showPopOver: true
    };
  }

  get2DViewOptions(): ViewOptionsConfig[] {
    const appSettings = this._app.appSettings;
    const primaryViewMode = this._app.primaryViewMode;

    const viewOptions: ViewOption[] = [
      {
        id: HSApp.View.ViewModeEnum.Plane,
        enableSwitchTip: primaryViewMode === HSApp.View.ViewModeEnum.Plane,
        icons: [
          { id: "planeIcon", fieldName: "icon" },
          { id: "planeActiveIcon", fieldName: "iconActive" }
        ],
        strings: [
          { id: "contextmenu_viewmode_plane", fieldName: "label", hotKey: "1" },
          { id: "contextmenu_switch_viewmode_plane", fieldName: "autoSwitchTip" }
        ]
      },
      {
        id: HSApp.View.ViewModeEnum.RCP,
        enableSwitchTip: primaryViewMode === HSApp.View.ViewModeEnum.RCP,
        icons: [
          { id: "rcpIcon", fieldName: "icon" },
          { id: "rcpActiveIcon", fieldName: "iconActive" }
        ],
        strings: [
          { id: "contextmenu_viewmode_rcp", fieldName: "label", hotKey: "2" },
          { id: "contextmenu_switch_viewmode_rcp", fieldName: "autoSwitchTip" }
        ]
      },
      {
        id: HSApp.View.ViewModeEnum.Elevation,
        enableSwitchTip: primaryViewMode === HSApp.View.ViewModeEnum.Elevation,
        view: "3D",
        strings: [
          { id: "contextmenu_viewmode_elevation", fieldName: "label", hotKey: "5" },
          { id: "contextmenu_switch_viewmode_elevation", fieldName: "autoSwitchTip" }
        ]
      }
    ].filter(option => appSettings.viewModeOptions.includes(option.id));

    const priorityMap: Record<string, number> = {};

    if (this._app.is3DViewActive() && primaryViewMode !== HSApp.View.ViewModeEnum.Elevation) {
      priorityMap[this.laster2DdefaultKey!] = 1;
    } else {
      priorityMap[primaryViewMode] = 1;
      this.laster2DdefaultKey = primaryViewMode;
    }

    viewOptions.sort((a, b) => (priorityMap[b.id] || 0) - (priorityMap[a.id] || 0));

    return [
      {
        type: "nottoplevel",
        id: "viewModeDropdown",
        order: 50,
        data: {
          options: viewOptions,
          defaultKey: primaryViewMode,
          onchange: (viewType: string, viewMode: string, callback: (type: string, mode: string) => void) => {
            if (viewMode !== HSApp.View.ViewModeEnum.Elevation) {
              return callback(viewType, viewMode);
            }
            this.toElevation(viewType, viewMode, callback);
          },
          isExtendsChange: true
        }
      }
    ];
  }

  get3DViewOptions(): ViewOptionsConfig[] {
    const primaryViewMode = this._app.primaryViewMode;

    const firstPersonOption: ViewOption = {
      id: HSApp.View.ViewModeEnum.FirstPerson,
      enableSwitchTip: primaryViewMode === HSApp.View.ViewModeEnum.FirstPerson,
      icons: [
        { id: "roamingIcon", fieldName: "icon" },
        { id: "roamingActiveIcon", fieldName: "iconActive" }
      ],
      strings: [
        { id: "view_resizeWidget_roam", fieldName: "label", hotKey: "4" },
        { id: "view_switch_firstperson_tooltip", fieldName: "autoSwitchTip" }
      ]
    };

    const orbitViewOption: ViewOption = {
      id: HSApp.View.ViewModeEnum.OrbitView,
      enableSwitchTip: primaryViewMode === HSApp.View.ViewModeEnum.OrbitView,
      icons: [
        { id: "firstpersonIcon", fieldName: "icon" },
        { id: "firstpersonActiveIcon", fieldName: "iconActive" }
      ],
      strings: [
        { id: "view_resizeWidget_resize_3D", fieldName: "label", hotKey: "3" },
        { id: "view_switch_orbitview_tooltip", fieldName: "autoSwitchTip" }
      ]
    };

    let currentViewMode3D = this.viewMode3D;

    if (currentViewMode3D === HSApp.View.ViewModeEnum.Elevation) {
      currentViewMode3D = this.lasterViewMode3D || currentViewMode3D;
    } else {
      this.lasterViewMode3D = this.viewMode3D;
    }

    const options = currentViewMode3D === HSApp.View.ViewModeEnum.OrbitView
      ? [orbitViewOption, firstPersonOption]
      : [firstPersonOption, orbitViewOption];

    return [
      {
        type: "nottoplevel",
        id: "viewModeDropdown",
        order: 55,
        data: {
          options,
          defaultKey: primaryViewMode
        }
      }
    ];
  }
}