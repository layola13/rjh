interface Environment {
  showAutoGeneratePlaneRoofsConfirm(): Promise<boolean>;
}

interface Handler {
  isAllDrawingRegionsValid(): boolean;
  autoGeneratePlaneRoofs(): void;
  onApplySave(): void;
  onRecoverAll(): void;
  onAddGuideLine(): void;
  onClearGuideLines(): void;
  onMeasureTool(): void;
  onAddLine(): void;
  onAddRect(): void;
}

interface CommandManager {
  cancel(): void;
}

interface App {
  cmdManager: CommandManager;
  pluginManager: {
    getPlugin(type: string): any;
  };
  signalContextualtoolRefresh: {
    dispatch(data: { forceUpdate: boolean }): void;
  };
  activeEnvironmentId?: string;
}

interface ToolbarPlugin {
  getActiveToolbarId(): string | undefined;
  activateToolbar(id: string): void;
  showSecondToolbar(show: boolean): void;
  addLinkedToolbar(id: string, linkedId: string, config: ToolbarConfig): void;
  signalToolbarChanged: any;
  ToolbarIdEnum: {
    DEFAULT_TOOLBAR_ID: string;
  };
}

interface PageHeaderPlugin {
  beforeEnterEnv(item: PageHeaderItem, position: string): void;
  afterOuterEnv(): void;
}

interface PageHeaderItem {
  getRenderItem(): React.ReactElement;
}

interface ToolbarChangedEvent {
  data: {
    newId: string;
  };
}

interface ToolbarConfig {
  addItems: Array<[ToolbarItemConfig, string]>;
  includeItems: string[];
}

interface ToolbarItemConfig {
  type: string;
  label?: string;
  name: string;
  icon?: string;
  tooltip?: string;
  lock?: boolean;
  order: number;
  logGroup?: string;
  onclick?: () => void;
  hotkey?: { win: string[]; mac: string[] } | string;
  command?: string;
  lineType?: string;
}

export class Toolbar {
  private readonly _environment: Environment;
  private readonly toolbarPlugin: ToolbarPlugin;
  private readonly pageheaderPlugin: PageHeaderPlugin;
  private readonly handler: Handler;
  private readonly app: App;
  private readonly cmdMgr: CommandManager;
  private readonly toolbarId: string = "roofsdrawing_toolbar";
  private leftItems: any;
  private menuItems: any;
  private rightItems: any;
  private signalHook?: any;

  constructor(environment: Environment, handler: Handler, plugins: Record<string, any>) {
    this._environment = environment;
    this.toolbarPlugin = plugins[HSFPConstants.PluginType.Toolbar];
    this.pageheaderPlugin = plugins[HSFPConstants.PluginType.PageHeader];
    this.handler = handler;
    this.app = HSApp.App.getApp();
    this.cmdMgr = this.app.cmdManager;
  }

  activate(): string | undefined {
    this.init();
    const previousToolbarId = this.toolbarPlugin.getActiveToolbarId();
    this.toolbarPlugin.activateToolbar(this.toolbarId);
    this.pageheaderPlugin.beforeEnterEnv(this._getPageHeaderCompleteBtn(), "left");
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.signalHook.listen(this.toolbarPlugin.signalToolbarChanged, this._onToolbarChanged);
    this.app.signalContextualtoolRefresh.dispatch({ forceUpdate: true });
    return previousToolbarId;
  }

  private _onToolbarChanged = (event: ToolbarChangedEvent): void => {
    if (event.data.newId === this.toolbarId) {
      this.toolbarPlugin.showSecondToolbar(true);
    }
  };

  restore(toolbarId?: string): void {
    if (toolbarId) {
      this.toolbarPlugin.activateToolbar(toolbarId);
    }
    this.pageheaderPlugin.afterOuterEnv();
    HSApp.App.getApp()
      .pluginManager.getPlugin(HSFPConstants.PluginType.StatusBar)
      .update(this.leftItems, this.menuItems, this.rightItems);
    this.signalHook?.dispose();
    this.signalHook = undefined;
  }

  private _getPageHeaderCompleteBtn(): PageHeaderItem {
    const handleComplete = async (): Promise<void> => {
      let shouldContinue = true;
      if (!this.handler.isAllDrawingRegionsValid()) {
        shouldContinue = await this._environment.showAutoGeneratePlaneRoofsConfirm();
        if (shouldContinue) {
          this.handler.autoGeneratePlaneRoofs();
        }
      }
      if (!shouldContinue) {
        return;
      }
      this.app.pluginManager
        .getPlugin(HSFPConstants.PluginType.RoofsDrawing)
        .exitRoofsDrawing();
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
                className: "arrow-icon",
              })
            ),
            React.createElement(
              SmartText,
              { className: "complete-name" },
              `${ResourceManager.getString("page_header_complete")}${ResourceManager.getString("category_manually_draw_roof")}`
            )
          )
        );
      },
    };
  }

  private init(): void {
    const ORDER_SAVE = 102;
    const ORDER_CLEAR = 251;
    const ORDER_DIVIDER = 999;
    const ORDER_GUIDELINE_FOLDER = 1100;
    const ORDER_ADD_GUIDELINE = 1101;
    const ORDER_CLEAR_GUIDELINE = 1102;
    const ORDER_MEASURE = 1200;
    const ORDER_DRAW_LINE = 2100;
    const ORDER_DRAW_RECT = 2200;

    const config: ToolbarConfig = {
      addItems: [
        [
          {
            type: "button",
            label: ResourceManager.getString("toolBar_save_title"),
            name: "save",
            icon: "hs_toolbar_baocun",
            tooltip: ResourceManager.getString("toolBar_save_title"),
            lock: true,
            order: ORDER_SAVE,
            logGroup: HSFPConstants.LogGroupTypes.RoofsDrawing,
            onclick: () => {
              this.app.cmdManager.cancel();
              this.handler?.onApplySave();
            },
          },
          "",
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("toolBar_clear"),
            name: "plugin_roofs_drawing_clear",
            icon: "hs_toolbar_qingkong1",
            tooltip: ResourceManager.getString("toolBar_clear"),
            order: ORDER_CLEAR,
            logGroup: HSFPConstants.LogGroupTypes.RoofsDrawing,
            onclick: () => {
              if (this._environment) {
                HSApp.Util.EventTrack.instance().track(
                  HSApp.Util.EventGroupEnum.Toolbar,
                  "clear_click_event",
                  { IF_env: HSApp.App.getApp().activeEnvironmentId }
                );
                this._environment.onRecoverAll();
              }
            },
          },
          "",
        ],
        [
          {
            type: "divider",
            name: "toolbar_content_styler_divider_2",
            order: ORDER_DIVIDER,
          },
          "",
        ],
        [
          {
            type: "folder",
            label: ResourceManager.getString("plugin_customized_toolbar_guideline"),
            name: "toolBar_guide_line",
            icon: "hs_toolbar_fuzhuxian",
            order: ORDER_GUIDELINE_FOLDER,
          },
          "",
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_customized_toolbar_addguideline"),
            name: "plugin_edit_layer_toolBar_guideline",
            hotkey: { win: ["ctrl+u"], mac: ["meta+u"] },
            command: HSFPConstants.CommandType.RoofsDrawing.AddGuideLines,
            order: ORDER_ADD_GUIDELINE,
            logGroup: HSFPConstants.LogGroupTypes.RoofsDrawing,
            onclick: () => {
              this.app.cmdManager.cancel();
              if (this.handler) {
                HSApp.Util.EventTrack.instance().track(
                  HSApp.Util.EventGroupEnum.Toolbar,
                  "guideline_add_event",
                  { IF_env: HSApp.App.getApp().activeEnvironmentId }
                );
                this.handler.onAddGuideLine();
              }
            },
          },
          "toolBar_guide_line",
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_customized_toolbar_clearguidelines"),
            name: "toolBar_clear_guide_lines",
            command: HSFPConstants.CommandType.Guideline,
            order: ORDER_CLEAR_GUIDELINE,
            logGroup: HSFPConstants.LogGroupTypes.RoofsDrawing,
            onclick: () => {
              this.app.cmdManager.cancel();
              if (this.handler) {
                HSApp.Util.EventTrack.instance().track(
                  HSApp.Util.EventGroupEnum.Toolbar,
                  "guideline_clear_event",
                  { IF_env: HSApp.App.getApp().activeEnvironmentId }
                );
                this.handler.onClearGuideLines();
              }
            },
          },
          "toolBar_guide_line",
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
            order: ORDER_MEASURE,
            logGroup: HSFPConstants.LogGroupTypes.RoofsDrawing,
            onclick: () => {
              this.app.cmdManager.cancel();
              if (this.handler) {
                HSApp.Util.EventTrack.instance().track(
                  HSApp.Util.EventGroupEnum.Toolbar,
                  "ruler_click_event",
                  { IF_env: HSApp.App.getApp().activeEnvironmentId }
                );
                this.handler.onMeasureTool();
              }
            },
          },
          "",
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_draw_shape_L"),
            name: "plugin_roofsdrawing_edit_add_line",
            icon: "hs_toolbar_zhixian",
            hotkey: "L",
            tooltip: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_draw_shape_L"),
            order: ORDER_DRAW_LINE,
            logGroup: HSFPConstants.LogGroupTypes.RoofsDrawing,
            lineType: "second",
            command: HSFPConstants.CommandType.RoofsDrawing.DrawPolygons,
            onclick: () => {
              this.app.cmdManager.cancel();
              this.handler?.onAddLine();
            },
          },
          "",
        ],
        [
          {
            type: "button",
            label: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_draw_shape_R"),
            name: "plugin_roofsdrawing_edit_add_rect",
            icon: "hs_toolbar_fangxing",
            hotkey: "R",
            tooltip: ResourceManager.getString("plugin_cusomized_feature_modeling_catalog_draw_shape_R"),
            order: ORDER_DRAW_RECT,
            logGroup: HSFPConstants.LogGroupTypes.RoofsDrawing,
            lineType: "second",
            command: HSFPConstants.CommandType.RoofsDrawing.DrawRectangle,
            onclick: () => {
              this.app.cmdManager.cancel();
              this.handler?.onAddRect();
            },
          },
          "",
        ],
      ],
      includeItems: ["toolBar_undo", "toolBar_redo"],
    };

    this.toolbarPlugin.addLinkedToolbar(
      this.toolbarId,
      this.toolbarPlugin.ToolbarIdEnum.DEFAULT_TOOLBAR_ID,
      config
    );
  }
}