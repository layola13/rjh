interface Environment {
  onRecoverAll(): void;
  getSketchBuilder(): unknown;
  getSketchView(): { entity: unknown };
}

interface Handler {
  onApplySave(): void;
  onAddGuideLine(): void;
  onClearGuideLines(): void;
  onMeasureTool(): void;
  onAddLine(): void;
  onAddRect(): void;
  onAddPolygon(): void;
  onAddCircle(): void;
  onFillet(): void;
}

interface ToolbarPlugin {
  getActiveToolbarId(): string;
  activateToolbar(toolbarId: string): void;
  showSecondToolbar(show: boolean): void;
  addLinkedToolbar(toolbarId: string, parentToolbarId: string, config: ToolbarConfig): void;
  signalToolbarChanged: unknown;
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

interface CmdManager {
  cancel(): void;
  createCommand(commandType: string, args: unknown[]): unknown;
  execute(command: unknown): void;
}

interface App {
  cmdManager: CmdManager;
  pluginManager: {
    getPlugin(pluginType: string): any;
  };
  signalContextualtoolRefresh: {
    dispatch(data: { forceUpdate: boolean }): void;
  };
  activeEnvironmentId?: string;
}

interface ToolbarButton {
  type: 'button';
  label: string;
  name: string;
  icon?: string;
  tooltip?: string;
  lock?: boolean;
  order: number;
  logGroup?: string;
  hotkey?: string | { win: string[]; mac: string[] };
  command?: string;
  lineType?: string;
  onclick(): void;
}

interface ToolbarDivider {
  type: 'divider';
  name: string;
  order: number;
  lineType?: string;
}

interface ToolbarFolder {
  type: 'folder';
  label: string;
  name: string;
  icon: string;
  order: number;
}

type ToolbarItem = ToolbarButton | ToolbarDivider | ToolbarFolder;

interface ToolbarConfig {
  addItems: Array<[ToolbarItem, string]>;
  includeItems: string[];
}

interface ToolbarChangedEvent {
  data: {
    newId: string;
  };
}

interface PluginMap {
  [key: string]: any;
}

export class Toolbar {
  private readonly _environment: Environment;
  private readonly toolbarPlugin: ToolbarPlugin;
  private readonly pageheaderPlugin: PageHeaderPlugin;
  private readonly handler: Handler;
  private readonly app: App;
  private readonly cmdMgr: CmdManager;
  private readonly toolbarId: string = 'outdoordrawing_toolbar';
  private leftItems?: unknown;
  private menuItems?: unknown;
  private rightItems?: unknown;
  private signalHook?: any;

  constructor(environment: Environment, handler: Handler, plugins: PluginMap) {
    this._environment = environment;
    this.toolbarPlugin = plugins[HSFPConstants.PluginType.Toolbar];
    this.pageheaderPlugin = plugins[HSFPConstants.PluginType.PageHeader];
    this.handler = handler;
    this.app = HSApp.App.getApp();
    this.cmdMgr = this.app.cmdManager;
  }

  public activate(): string {
    this.init();
    const previousToolbarId = this.toolbarPlugin.getActiveToolbarId();
    this.toolbarPlugin.activateToolbar(this.toolbarId);
    this.pageheaderPlugin.beforeEnterEnv(this._getPageHeaderCompleteBtn(), 'left');
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.signalHook.listen(this.toolbarPlugin.signalToolbarChanged, this._onToolbarChanged);
    this.app.signalContextualtoolRefresh.dispatch({ forceUpdate: true });
    return previousToolbarId;
  }

  private _onToolbarChanged(event: ToolbarChangedEvent): void {
    if (event.data.newId === this.toolbarId) {
      this.toolbarPlugin.showSecondToolbar(true);
    }
  }

  public restore(previousToolbarId?: string): void {
    if (previousToolbarId) {
      this.toolbarPlugin.activateToolbar(previousToolbarId);
    }
    this.pageheaderPlugin.afterOuterEnv();
    this.signalHook?.dispose();
    this.signalHook = undefined;
  }

  private _getPageHeaderCompleteBtn(): PageHeaderItem {
    const handleComplete = async (): Promise<void> => {
      HSApp.Util.EventTrack.instance().track(
        HSApp.Util.EventGroupEnum.Outdoor,
        'exit_draw_env_event'
      );
      this.app.pluginManager
        .getPlugin(HSFPConstants.PluginType.OutdoorDrawing)
        .exitOutdoorDrawing();
      this.app.pluginManager
        .getPlugin(HSFPConstants.PluginType.Persistence)
        .autoSave(true);
    };

    return {
      getRenderItem: () => {
        return React.createElement(
          'div',
          { className: 'compelete-env-btn-customized' },
          React.createElement(
            'div',
            { className: 'compelete-btn', onClick: handleComplete },
            React.createElement(
              'div',
              { className: 'complete-arrow' },
              React.createElement(Icons, {
                type: 'hs_xian_fanhui',
                style: { fontSize: '20px' },
                className: 'arrow-icon'
              })
            ),
            React.createElement(
              SmartText,
              { className: 'complete-name' },
              `${ResourceManager.getString('page_header_complete')}${ResourceManager.getString('category_draw_area')}`
            )
          )
        );
      }
    };
  }

  private init(): void {
    const toolbarConfig: ToolbarConfig = {
      addItems: [
        [
          {
            type: 'button',
            label: ResourceManager.getString('toolBar_save_title'),
            name: 'save',
            icon: 'hs_toolbar_baocun',
            tooltip: ResourceManager.getString('toolBar_save_title'),
            lock: true,
            order: 102,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            onclick: () => {
              this.app.cmdManager.cancel();
              this.handler?.onApplySave();
            }
          },
          ''
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('toolBar_clear'),
            name: 'plugin_roofs_drawing_clear',
            icon: 'hs_toolbar_qingkong1',
            tooltip: ResourceManager.getString('toolBar_clear'),
            order: 251,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            onclick: () => {
              if (this._environment) {
                HSApp.Util.EventTrack.instance().track(
                  HSApp.Util.EventGroupEnum.Toolbar,
                  'clear_click_event',
                  { IF_env: HSApp.App.getApp().activeEnvironmentId }
                );
                this._environment.onRecoverAll();
              }
            }
          },
          ''
        ],
        [
          {
            type: 'divider',
            name: 'toolbar_content_styler_divider_2',
            order: 999
          },
          ''
        ],
        [
          {
            type: 'folder',
            label: ResourceManager.getString('plugin_customized_toolbar_guideline'),
            name: 'toolBar_guide_line',
            icon: 'hs_toolbar_fuzhuxian',
            order: 1100
          },
          ''
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('plugin_customized_toolbar_addguideline'),
            name: 'plugin_edit_layer_toolBar_guideline',
            hotkey: { win: ['ctrl+u'], mac: ['meta+u'] },
            command: HSFPConstants.CommandType.OutdoorDrawing.AddGuideLines,
            order: 1101,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            onclick: () => {
              this.app.cmdManager.cancel();
              if (this.handler) {
                HSApp.Util.EventTrack.instance().track(
                  HSApp.Util.EventGroupEnum.Toolbar,
                  'guideline_add_event',
                  { IF_env: HSApp.App.getApp().activeEnvironmentId }
                );
                this.handler.onAddGuideLine();
              }
            }
          },
          'toolBar_guide_line'
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('plugin_customized_toolbar_clearguidelines'),
            name: 'toolBar_clear_guide_lines',
            command: HSFPConstants.CommandType.Guideline,
            order: 1102,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            onclick: () => {
              this.app.cmdManager.cancel();
              if (this.handler) {
                HSApp.Util.EventTrack.instance().track(
                  HSApp.Util.EventGroupEnum.Toolbar,
                  'guideline_clear_event',
                  { IF_env: HSApp.App.getApp().activeEnvironmentId }
                );
                this.handler.onClearGuideLines();
              }
            }
          },
          'toolBar_guide_line'
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('edit_layer_toolBar_measure'),
            name: 'plugin_edit_layer_toolBar_measure',
            icon: 'hs_toolbar_biaochi',
            tooltip: ResourceManager.getString('toolBar_measure'),
            hotkey: 'u',
            command: HSFPConstants.CommandType.MeasureTool,
            order: 1200,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            onclick: () => {
              this.app.cmdManager.cancel();
              if (this.handler) {
                HSApp.Util.EventTrack.instance().track(
                  HSApp.Util.EventGroupEnum.Toolbar,
                  'ruler_click_event',
                  { IF_env: HSApp.App.getApp().activeEnvironmentId }
                );
                this.handler.onMeasureTool();
              }
            }
          },
          ''
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('plugin_layer_edit_add_point'),
            name: 'plugin_layer_edit_add_point',
            icon: 'hs_icon_add',
            tooltip: ResourceManager.getString('plugin_layer_edit_add_point'),
            order: 1300,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            onclick: () => {
              HSApp.Util.EventTrack.instance().track(
                HSApp.Util.EventGroupEnum.Outdoor,
                'draw_env_add_point_event',
                { src: 'toolbar' }
              );
              const sketchBuilder = this._environment.getSketchBuilder();
              const entity = this._environment.getSketchView().entity;
              const command = this.app.cmdManager.createCommand(
                HSFPConstants.CommandType.OutdoorDrawing.AddSplitPoints,
                [sketchBuilder, entity]
              );
              this.app.cmdManager.execute(command);
            }
          },
          ''
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('plugin_outdoor_drawing_shape_L'),
            name: 'plugin_outdoor_drawing_shape_L',
            icon: 'hs_toolbar_zhixian',
            hotkey: 'L',
            tooltip: ResourceManager.getString('plugin_outdoor_drawing_shape_L'),
            order: 2100,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            lineType: 'second',
            command: HSFPConstants.CommandType.OutdoorDrawing.DrawPolygons,
            onclick: () => {
              HSApp.Util.EventTrack.instance().track(
                HSApp.Util.EventGroupEnum.Outdoor,
                'draw_env_draw_line_event'
              );
              this.handler?.onAddLine();
            }
          },
          ''
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('plugin_outdoor_drawing_shape_R'),
            name: 'plugin_outdoor_drawing_shape_R',
            icon: 'hs_toolbar_fangxing',
            hotkey: 'R',
            tooltip: ResourceManager.getString('plugin_outdoor_drawing_shape_R'),
            order: 2200,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            lineType: 'second',
            command: HSFPConstants.CommandType.OutdoorDrawing.DrawRectangle,
            onclick: () => {
              HSApp.Util.EventTrack.instance().track(
                HSApp.Util.EventGroupEnum.Outdoor,
                'draw_env_draw_rect_event'
              );
              this.handler?.onAddRect();
            }
          },
          ''
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('plugin_outdoor_drawing_shape_P'),
            name: 'plugin_outdoor_drawing_shape_P',
            icon: 'hs_toolbar_duobianxing',
            hotkey: 'P',
            tooltip: ResourceManager.getString('plugin_outdoor_drawing_shape_P'),
            order: 2300,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            lineType: 'second',
            command: HSFPConstants.CommandType.OutdoorDrawing.DrawRegularPolygon,
            onclick: () => {
              HSApp.Util.EventTrack.instance().track(
                HSApp.Util.EventGroupEnum.Outdoor,
                'draw_env_draw_regular_event'
              );
              this.handler?.onAddPolygon();
            }
          },
          ''
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('plugin_outdoor_drawing_shape_C'),
            name: 'plugin_outdoor_drawing_shape_C',
            icon: 'hs_toolbar_yuan',
            hotkey: 'C',
            tooltip: ResourceManager.getString('plugin_outdoor_drawing_shape_C'),
            order: 2400,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            lineType: 'second',
            command: HSFPConstants.CommandType.OutdoorDrawing.DrawCircle,
            onclick: () => {
              HSApp.Util.EventTrack.instance().track(
                HSApp.Util.EventGroupEnum.Outdoor,
                'draw_env_draw_circle_event'
              );
              this.handler?.onAddCircle();
            }
          },
          ''
        ],
        [
          {
            type: 'divider',
            name: 'toolbar_content_styler_divider_2',
            lineType: 'second',
            order: 2500
          },
          ''
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('plugin_outdoor_drawing_shape_F'),
            name: 'plugin_outdoor_drawing_shape_F',
            icon: 'hs_toolbar_daojiao',
            hotkey: 'F',
            tooltip: ResourceManager.getString('plugin_outdoor_drawing_shape_F'),
            order: 2600,
            logGroup: HSFPConstants.LogGroupTypes.OutdoorDrawing,
            lineType: 'second',
            command: HSFPConstants.CommandType.OutdoorDrawing.DrawFillet,
            onclick: () => {
              HSApp.Util.EventTrack.instance().track(
                HSApp.Util.EventGroupEnum.Outdoor,
                'draw_env_draw_fillet_event'
              );
              this.handler?.onFillet();
            }
          },
          ''
        ]
      ],
      includeItems: ['toolBar_undo', 'toolBar_redo']
    };

    this.toolbarPlugin.addLinkedToolbar(
      this.toolbarId,
      this.toolbarPlugin.ToolbarIdEnum.DEFAULT_TOOLBAR_ID,
      toolbarConfig
    );
  }
}