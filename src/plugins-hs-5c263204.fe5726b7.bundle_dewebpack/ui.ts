interface UIOptions {
  app: any;
  handler: any;
  catalogPlugin: any;
  pageHeaderPlugin: any;
  toolbarPlugin: any;
  resizeWidgetPlugin: any;
  menuPlugin: any;
  faceMeshHandler: any;
}

interface PageHeaderCompleteButton {
  getRenderItem: () => React.ReactElement;
}

interface PageHeaderButtonData {
  envName: string;
  handleClick: () => void;
}

interface ToolbarOptions {
  excludeItems: string[];
  addItems: ToolbarItem[][];
}

interface ToolbarItem {
  type: string;
  name?: string;
  order: number;
  icon?: string;
  label?: string;
  enable?: boolean;
  onclick?: () => void;
  command?: string;
  tooltip?: string;
  hotkey?: {
    win: string[];
    mac: string[];
  };
}

interface LeftMenuItem {
  id: string;
  type: PropertyBarControlTypeEnum;
  src?: string;
  order: number;
  label: string;
  disable?: boolean;
  onClick: (event: Event) => void;
}

interface MenuCustomizedData {
  defaultItems: any[];
  customizedItems: LeftMenuItem[];
}

interface MenuCustomizedEvent {
  data: MenuCustomizedData;
}

const FACE_MATERIAL_TOOLBAR_ID = "face_material";

export class UI {
  private readonly _app: any;
  private readonly _handler: any;
  private readonly _catalogPlugin: any;
  private readonly _pageHeaderPlugin: any;
  private readonly _toolbarPlugin: any;
  private readonly _resizeWidgetPlugin: any;
  private readonly _menuPlugin: any;
  private readonly _faceMeshHandler: any;
  private _toolbarCreated: boolean;
  private _hidden2DView: any;

  constructor(options: UIOptions = {} as UIOptions) {
    this._app = options.app;
    this._handler = options.handler;
    this._catalogPlugin = options.catalogPlugin;
    this._pageHeaderPlugin = options.pageHeaderPlugin;
    this._toolbarPlugin = options.toolbarPlugin;
    this._resizeWidgetPlugin = options.resizeWidgetPlugin;
    this._menuPlugin = options.menuPlugin;
    this._faceMeshHandler = options.faceMeshHandler;
    this._toolbarCreated = false;
    this._hidden2DView = undefined;
  }

  activate(): void {
    let skipAnimation: boolean | undefined;
    const app = this._app;
    const pendingEnvironment = app.getPendingSuspendedEnvironment();

    if (pendingEnvironment?.getCanvas2d) {
      this._hidden2DView = pendingEnvironment.getCanvas2d();
    } else {
      this._hidden2DView = app.secondaryActiveView;
    }

    this._hidden2DView?.hide();

    const active3DView = app.getActive3DView();
    active3DView?.setOptions({
      hideCameraMovementIndicators: true
    });

    app.hotkey.disable("tab");
    this.createToolbar();

    if (pendingEnvironment && [HSFPConstants.Environment.FaceMaterial].includes(pendingEnvironment.id)) {
      skipAnimation = false;
    }

    this._resizeWidgetPlugin.animateHide(skipAnimation);
    this._pageHeaderPlugin.beforeEnterEnv(this._getPageHeaderCompleteBtn(), "left");
    app.activeEnvironment.activateToolbar();
  }

  deactivate(): void {
    let skipAnimation: boolean | undefined;
    const app = this._app;
    const pendingEnvironment = app.getPendingSuspendedEnvironment();

    if (this._hidden2DView) {
      this._hidden2DView.show();
      this._hidden2DView = undefined;
    }

    const active3DView = app.getActive3DView();
    active3DView?.setOptions({
      hideCameraMovementIndicators: false
    });

    this._app.hotkey.enable("tab");
    this._pageHeaderPlugin.afterOuterEnv();

    if (pendingEnvironment && [HSFPConstants.Environment.FaceMaterial].includes(pendingEnvironment.id)) {
      skipAnimation = false;
    }

    this._resizeWidgetPlugin.animateShow(skipAnimation);
    this._catalogPlugin?.closeIndependent();
  }

  getToolbarId(): string {
    return FACE_MATERIAL_TOOLBAR_ID;
  }

  createToolbar(): void {
    if (this._toolbarCreated) {
      return;
    }

    this._toolbarCreated = true;
    const app = this._app;

    const toolbarOptions: ToolbarOptions = {
      excludeItems: [
        "toolBar_file",
        "toolBar_save",
        "toolBar_edit",
        "toolBar_share",
        "toolBar_enter_cabinet_app",
        "toolBar_autostyler",
        "toolBar_snapshot_render",
        "toolBar_view_render_results",
        "toolBar_customized_model",
        "toolBar_bomlistdata",
        "plugin_bomlist_menu_divider",
        "toolBar_settings",
        "toolBar_snapshot_screenshot",
        "toolBar_help",
        "toolBar_upload_data",
        "toolbar_viewOptions/toolbar_toggleArea",
        "toolbar_viewOptions/toolbar_toggleDimension",
        "toolbar_viewOptions/toolbar_toggleGrid",
        "toolbar_viewOptions/toolbar_toggleRoomType",
        "toolbar_viewOptions/toolbar_toggleBackground",
        "toolbar_viewOptions/toolbar_toggleNoWallMode",
        "toolbar_viewOptions/toolbar_viewOptions_divider1",
        "toolbar_viewOptions/toolBar_toggle2DPrecisionLocationMode",
        "toolbar_viewOptions/toolbar_toggleShowAll",
        "toolbar_viewOptions/toolbar_viewOptions_divider2",
        "toolbar_viewOptions/toolbar_toggleCustomizedFurniture",
        "toolbar_viewOptions/toolbar_toggleCustomizedAccessory",
        "toolbar_viewOptions/toolbar_toggleHardModelling",
        "toolbar_viewOptions/toolbar_toggleWaterAndElec",
        "toolbar_viewOptions/toolbar_toggleFurniture",
        "toolbar_viewOptions/toolBar_toggle3DPrecisionLocationMode",
        "toolbar_viewOptions/toolbar_viewOptions_divider5",
        "toolbar_viewOptions/toolbar_toggleCustomizedFurniture_folder",
        "toolbar_viewOptions/toolbar_toggleWaterHole",
        "toolbar_viewOptions/toolbar_toggleDIY2",
        "toolBar_debuger",
        "toolBar_assistant",
        "toolBar_export",
        "toolBar_construction",
        "toolBar_root_divider2",
        "toolBar_measure"
      ],
      addItems: [
        [
          {
            type: "button",
            name: "customized_model_reset",
            order: 300,
            icon: "hs_toolbar_quanbuhuifu",
            label: ResourceManager.getString("customizedtiles_all_recovery"),
            enable: false,
            onclick: () => {
              const undoStackLength = app.transManager._activeSession._undoStack.length;
              for (let i = 0; i < undoStackLength; i++) {
                setTimeout(() => {
                  app.transManager.undo();
                }, 0);
              }
            }
          }
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_facematerial_replacesamematerial"),
            name: "customizedtiles_replace",
            icon: "hs_toolbar_tihuanxiangtongcaizhi",
            order: 400,
            command: HSFPConstants.CommandType.ChooseMutiMaterials,
            onclick: () => {
              this._handler.onFaceSameMaterialReplace();
            }
          },
          ""
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("toolBar_material_brush"),
            name: "toolBar_material_brush",
            icon: "hs_toolbar_caizhishua",
            tooltip: ResourceManager.getString("toolBar_material_brush"),
            order: 700,
            command: HSFPConstants.CommandType.MaterialBrush,
            hotkey: {
              win: ["b", "ctrl+b"],
              mac: ["b", "meta+b"]
            },
            onclick: () => {
              HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.MaterialBrush).enterMaterialBrush();
            }
          },
          ""
        ]
      ]
    };

    this._toolbarPlugin.addLinkedToolbar(FACE_MATERIAL_TOOLBAR_ID, "default", toolbarOptions);
  }

  updateToolbarResetItem(): void {
    const resetItem = this._toolbarPlugin.getItem("customized_model_reset", FACE_MATERIAL_TOOLBAR_ID);
    
    if (!resetItem) {
      return;
    }

    const canUndo = this._app.transManager.canUndo();
    
    if (resetItem.data.enable !== canUndo) {
      if (canUndo) {
        resetItem.enable();
      } else {
        resetItem.disable();
      }
    }
  }

  private _getPageHeaderCompleteBtn(): PageHeaderCompleteButton {
    const buttonData: PageHeaderButtonData = {
      envName: ResourceManager.getString("plugin_customizedmodeling_edit_material_done"),
      handleClick: () => {
        this._handler.complete();
      }
    };

    return {
      getRenderItem: () => {
        return React.createElement(s.default, {
          data: buttonData
        });
      }
    };
  }

  populateMenuCustomizedItems(event: MenuCustomizedEvent): void {
    const menuData = event.data;
    menuData.defaultItems.length = 0;
    menuData.customizedItems.length = 0;

    if (this._faceMeshHandler.isSingleGroupSelected) {
      menuData.customizedItems.push(this._getLeftMenuGroupEditItem());
    } else if (this._faceMeshHandler.isCmdActive && this._faceMeshHandler.selectOnFaceCanDoMixpaint()) {
      menuData.customizedItems.push(...this._getLeftMenuEntryItem());
    } else {
      this._menuPlugin.hideLeftMenu();
    }
  }

  private _getLeftMenuGroupEditItem(): LeftMenuItem {
    return {
      id: "ungroupButton",
      type: PropertyBarControlTypeEnum.imageButton,
      src: "ungroup",
      order: 120,
      label: ResourceManager.getString("customized_model_facematerial_edit_group"),
      onClick: () => {
        return this._faceMeshHandler.unGroup();
      }
    };
  }

  private _getLeftMenuEntryItem(): LeftMenuItem[] {
    return [
      {
        id: "walldecorationAdvanced",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 40,
        src: "wall_decoration_advanced",
        disable: !this._faceMeshHandler.hasFaceSelected(),
        label: ResourceManager.getString("plugin_walldecoration_advanced"),
        onClick: (event: Event) => {
          const app = this._app;
          const eventTracker = HSApp.Util.EventTrack.instance();
          const viewType = app.is3DViewActive() ? "3D" : "2D";

          eventTracker.track(HSApp.Util.EventGroupEnum.Rightmenu, "plugin_walldecoration_advanced_event", {
            entrance: "leftmenu",
            IF_env: app.activeEnvironmentId,
            viewType: viewType
          });

          this._faceMeshHandler.doMixpaint();
          event.stopPropagation();
        }
      },
      {
        id: "clearmaterial",
        type: PropertyBarControlTypeEnum.imageButton,
        label: ResourceManager.getString("mixpaint_clearshape_material"),
        src: "clearmaterial",
        disable: !this._faceMeshHandler.hasFaceSelected(),
        order: 50,
        onClick: (event: Event) => {
          this._faceMeshHandler.clearMaterial();
          event.stopPropagation();
        }
      }
    ];
  }
}