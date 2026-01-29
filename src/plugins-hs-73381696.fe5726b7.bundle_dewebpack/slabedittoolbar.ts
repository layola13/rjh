interface CreatedState {
  outdoorspace: boolean;
  other: boolean;
}

interface PageHeaderCompleteButton {
  getRenderItem: () => React.ReactElement;
}

interface ToolbarItem {
  type: string;
  label?: string;
  name: string;
  icon?: string;
  tooltip?: string;
  lock?: boolean;
  order: number;
  logGroup?: string;
  onclick?: () => void;
  hotkey?: string | { win: string[]; mac: string[] };
  command?: string;
  lineType?: string;
}

interface ToolbarConfig {
  addItems: Array<[ToolbarItem, string]>;
  includeItems: string[];
}

interface PopulateStatusBarEvent {
  data: {
    leftItems: unknown[];
    menuItems: unknown[];
    rightItems: unknown[];
  };
}

interface ToolbarChangedEvent {
  data: {
    newId: string;
  };
}

interface Plugin {
  [key: string]: unknown;
}

interface PluginManager {
  getPlugin(type: string): Plugin;
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): unknown;
  execute(command: unknown): void;
}

interface Application {
  cmdManager: CommandManager;
  pluginManager: PluginManager;
  signalContextualtoolRefresh: {
    dispatch(data: { forceUpdate: boolean }): void;
  };
}

interface ToolbarPlugin extends Plugin {
  getActiveToolbarId(): string;
  activateToolbar(toolbarId: string): void;
  showSecondToolbar(show: boolean): void;
  getItem(name: string, toolbarId: string): ToolbarItemInstance | undefined;
  addLinkedToolbar(toolbarId: string, parentId: string, config: ToolbarConfig): void;
  signalToolbarChanged: unknown;
  ToolbarIdEnum: {
    DEFAULT_TOOLBAR_ID: string;
  };
}

interface PageHeaderPlugin extends Plugin {
  beforeEnterEnv(button: PageHeaderCompleteButton, position: string): void;
  afterOuterEnv(): void;
}

interface ContextualToolsPlugin extends Plugin {
  signalPopulateStatusBar: unknown;
}

interface StatusBarPlugin extends Plugin {
  update(leftItems: unknown[], menuItems: unknown[], rightItems: unknown[]): void;
}

interface LayerEditPlugin extends Plugin {
  exitSlabEdit(): void;
}

interface PersistencePlugin extends Plugin {
  save(): void;
}

interface ToolbarItemInstance {
  setPressed(pressed: boolean): void;
}

interface SlabEditHandler {
  onApplySave(): void;
  onResetChanges(): void;
  onAddGuideLine(): void;
  onClearGuideLines(): void;
  onMeasureTool(): void;
  onAddLine(): void;
  onAddRect(): void;
  onAddPolygon(): void;
  onAddCircle(): void;
  onFillet(): void;
  getSketchView(): { entity: unknown };
}

interface SketchBuilder {
  [key: string]: unknown;
}

export class SlabEditToolbar {
  private toolbarPlugin: ToolbarPlugin;
  private pageheaderPlugin: PageHeaderPlugin;
  private contextualToolsPlugin?: ContextualToolsPlugin;
  private created: CreatedState;
  private handler?: SlabEditHandler;
  private app: Application;
  private cmdMgr: CommandManager;
  private toolbarId?: string;
  private leftItems?: unknown[];
  private menuItems?: unknown[];
  private rightItems?: unknown[];
  private signalHook?: HSCore.Util.SignalHook;
  private sketchBuilder?: SketchBuilder;

  constructor(plugins: Record<string, Plugin>) {
    this.toolbarPlugin = plugins[HSFPConstants.PluginType.Toolbar] as ToolbarPlugin;
    this.pageheaderPlugin = plugins[HSFPConstants.PluginType.PageHeader] as PageHeaderPlugin;
    this.created = {
      outdoorspace: false,
      other: false
    };
    this.app = HSApp.App.getApp();
    this.cmdMgr = this.app.cmdManager;
  }

  activate(handler: SlabEditHandler, isOutdoorSpace: boolean, sketchBuilder: SketchBuilder): string {
    this.init(isOutdoorSpace);
    this.sketchBuilder = sketchBuilder;

    const previousToolbarId = this.toolbarPlugin.getActiveToolbarId();
    this.toolbarPlugin.activateToolbar(this.toolbarId!);
    this.pageheaderPlugin.beforeEnterEnv(this._getPageHeaderCompleteBtn(), "left");

    this.signalHook = new HSCore.Util.SignalHook(this);
    this.contextualToolsPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.ContextualTools) as ContextualToolsPlugin;

    this.signalHook
      .listen(this.contextualToolsPlugin.signalPopulateStatusBar, this._onPopulateStatusBar)
      .listen(this.toolbarPlugin.signalToolbarChanged, this._onToolbarChanged);

    this.app.signalContextualtoolRefresh.dispatch({ forceUpdate: true });
    this.handler = handler;

    return previousToolbarId;
  }

  private _onPopulateStatusBar(event: PopulateStatusBarEvent): void {
    this.leftItems = _.cloneDeep(event.data.leftItems);
    this.menuItems = event.data.menuItems;
    this.rightItems = event.data.rightItems;
    event.data.leftItems.length = 0;
  }

  private _onToolbarChanged(event: ToolbarChangedEvent): void {
    if (event.data.newId === this.toolbarId) {
      this.toolbarPlugin.showSecondToolbar(true);
    }
  }

  restore(previousToolbarId?: string): void {
    if (previousToolbarId) {
      this.toolbarPlugin.activateToolbar(previousToolbarId);
    }

    this.pageheaderPlugin.afterOuterEnv();

    const statusBarPlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.StatusBar) as StatusBarPlugin;
    statusBarPlugin.update(this.leftItems!, this.menuItems!, this.rightItems!);

    this.signalHook?.unlistenAll();
    this.signalHook = undefined;
  }

  private _getPageHeaderCompleteBtn(): PageHeaderCompleteButton {
    const handleComplete = (): void => {
      const layerEditPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.LayerEdit) as LayerEditPlugin;
      layerEditPlugin.exitSlabEdit();
    };

    return {
      getRenderItem: () => {
        return React.createElement(
          "div",
          { className: "compelete-env-btn-customized" },
          React.createElement(
            "div",
            { className: "compelete-btn", onClick: handleComplete },
            React.createElement(
              "div",
              { className: "complete-arrow" },
              React.createElement(Icons, {
                type: "hs_xian_fanhui",
                style: { fontSize: "20px" },
                className: "arrow-icon"
              })
            ),
            React.createElement(
              "div",
              { className: "complete-name" },
              ResourceManager.getString("page_header_complete"),
              ResourceManager.getString("setting_edit_slab")
            )
          )
        );
      }
    };
  }

  private init(isOutdoorSpace: boolean): void {
    const configType = isOutdoorSpace ? "outdoorspace" : "other";

    if (isOutdoorSpace) {
      this.toolbarId = "eidtoutdoorspace";
    } else {
      this.toolbarId = "editslab";
    }

    if (this.created[configType]) {
      return;
    }

    this.created[configType] = true;

    const toolbarConfig: ToolbarConfig = {
      addItems: [
        [
          {
            type: "button",
            label: ResourceManager.getString("toolBar_save_title"),
            name: "save",
            icon: "hs_toolbar_baocun",
            tooltip: ResourceManager.getString("toolBar_save_title"),
            lock: true,
            order: 102,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            onclick: () => {
              if (this.handler) {
                this.handler.onApplySave();
                const persistencePlugin = this.app.pluginManager.getPlugin("hsw.plugin.persistence.Plugin") as PersistencePlugin;
                persistencePlugin.save();
              }
            }
          },
          ""
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_layer_edit_all_recovery"),
            name: "plugin_layer_edit_all_recovery",
            icon: "hs_toolbar_quanbuhuifu",
            tooltip: ResourceManager.getString("plugin_layer_edit_all_recovery"),
            order: 251,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            onclick: () => {
              if (this.handler) {
                this.handler.onResetChanges();
              }
            }
          },
          ""
        ],
        [
          {
            type: "divider",
            name: "toolbar_content_styler_divider_2",
            order: 999
          },
          ""
        ],
        [
          {
            type: "folder",
            label: ResourceManager.getString("plugin_customized_toolbar_guideline"),
            name: "toolBar_guide_line",
            icon: "hs_toolbar_fuzhuxian",
            order: 1100
          },
          ""
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_customized_toolbar_addguideline"),
            name: "plugin_edit_layer_toolBar_guideline",
            hotkey: {
              win: ["ctrl+u"],
              mac: ["meta+u"]
            },
            command: HSFPConstants.CommandType.SlabEdit.AddGuideLines,
            order: 1101,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            onclick: () => {
              if (this.handler) {
                this.handler.onAddGuideLine();
              }
            }
          },
          "toolBar_guide_line"
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_customized_toolbar_clearguidelines"),
            name: "toolBar_clear_guide_lines",
            command: HSFPConstants.CommandType.Guideline,
            order: 1102,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            onclick: () => {
              if (this.handler) {
                this.handler.onClearGuideLines();
              }
            }
          },
          "toolBar_guide_line"
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("edit_layer_toolBar_measure"),
            name: "plugin_edit_layer_toolBar_measure",
            icon: "hs_toolbar_biaochi",
            tooltip: ResourceManager.getString("toolBar_measure"),
            hotkey: "u",
            command: HSFPConstants.CommandType.MeasureTool,
            order: 1200,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            onclick: () => {
              const item = this.toolbarPlugin.getItem("plugin_edit_layer_toolBar_measure", this.toolbarId!);
              if (item) {
                item.setPressed(true);
                if (this.handler) {
                  this.handler.onMeasureTool();
                }
              }
            }
          },
          ""
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_layer_edit_add_point"),
            name: "plugin_layer_edit_add_point",
            icon: "hs_icon_add",
            tooltip: ResourceManager.getString("plugin_layer_edit_add_point"),
            order: 1300,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            onclick: () => {
              const command = this.app.cmdManager.createCommand(
                HSFPConstants.CommandType.SlabEdit.AddSplitPoints,
                [this.sketchBuilder, this.handler!.getSketchView().entity]
              );
              this.app.cmdManager.execute(command);
            }
          },
          ""
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_slab_edit_add_line"),
            name: "plugin_slab_edit_add_line",
            icon: "hs_toolbar_zhixian",
            hotkey: "L",
            tooltip: ResourceManager.getString("plugin_slab_edit_add_line"),
            order: 2100,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            lineType: "second",
            command: HSFPConstants.CommandType.SlabEdit.DrawPolygons,
            onclick: () => {
              if (this.handler) {
                this.handler.onAddLine();
              }
            }
          },
          ""
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_slab_edit_add_rect"),
            name: "plugin_slab_edit_add_rect",
            icon: "hs_toolbar_fangxing",
            hotkey: "R",
            tooltip: ResourceManager.getString("plugin_slab_edit_add_rect"),
            order: 2200,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            lineType: "second",
            command: HSFPConstants.CommandType.SlabEdit.DrawRectangle,
            onclick: () => {
              if (this.handler) {
                this.handler.onAddRect();
              }
            }
          },
          ""
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_slab_edit_add_polygon"),
            name: "plugin_slab_edit_add_polygon",
            icon: "hs_toolbar_duobianxing",
            hotkey: "P",
            tooltip: ResourceManager.getString("plugin_slab_edit_add_polygon"),
            order: 2300,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            lineType: "second",
            command: HSFPConstants.CommandType.SlabEdit.DrawRegularPolygon,
            onclick: () => {
              if (this.handler) {
                this.handler.onAddPolygon();
              }
            }
          },
          ""
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_slab_edit_add_circle"),
            name: "plugin_slab_edit_add_circle",
            icon: "hs_toolbar_yuan",
            hotkey: "C",
            tooltip: ResourceManager.getString("plugin_slab_edit_add_circle"),
            order: 2400,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            lineType: "second",
            command: HSFPConstants.CommandType.SlabEdit.DrawCircle,
            onclick: () => {
              if (this.handler) {
                this.handler.onAddCircle();
              }
            }
          },
          ""
        ],
        [
          {
            type: "divider",
            name: "toolbar_content_styler_divider_2",
            lineType: "second",
            order: 2500
          },
          ""
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_slab_edit_fillet"),
            name: "plugin_slab_edit_fillet",
            icon: "hs_toolbar_daojiao",
            hotkey: "F",
            tooltip: ResourceManager.getString("plugin_slab_edit_fillet"),
            order: 2600,
            logGroup: HSFPConstants.LogGroupTypes.SlabEdit,
            lineType: "second",
            command: HSFPConstants.CommandType.SlabEdit.DrawFillet,
            onclick: () => {
              if (this.handler) {
                this.handler.onFillet();
              }
            }
          },
          ""
        ]
      ],
      includeItems: ["toolBar_undo", "toolBar_redo"]
    };

    this.toolbarPlugin.addLinkedToolbar(
      this.toolbarId,
      this.toolbarPlugin.ToolbarIdEnum.DEFAULT_TOOLBAR_ID,
      toolbarConfig
    );
  }
}