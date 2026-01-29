interface Dependencies {
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [HSFPConstants.PluginType.ContextualTools]: ContextualToolsPlugin;
  [HSFPConstants.PluginType.MaterialImage]: MaterialImagePlugin;
  [HSFPConstants.PluginType.PropertyBar]: PropertyBarPlugin;
}

interface InitOptions {
  dependencies: Dependencies;
  app: HSApp.App;
}

interface MaterialData {
  textureURI: string;
  color?: number;
  seekId?: string;
}

interface Material {
  materialData: MaterialData;
  textureURI?: string;
}

interface SuckedMaterialChangedEventData {
  material: Material;
}

interface CheckEnterRightsResult {
  success: boolean;
  amount: number;
  canEnter: boolean;
}

interface PropertyBarItem {
  id: string;
  parentId: string;
  label: string;
  type: string;
  items?: PropertyBarSubItem[];
  order?: number;
  className?: string;
}

interface PropertyBarSubItem {
  id: string;
  parentId: string;
  type: string;
  order: number;
  data: {
    src: string;
    label: string;
    disabled: boolean;
    onclick: () => void;
    onerror: (event: ErrorEvent) => void;
  };
}

interface ToolbarItemConfig {
  name: string;
  type: string;
  label: string;
  order: number;
  icon: string;
  hotkey: {
    win: string[];
    mac: string[];
  };
  popover: {
    placement: string;
    trigger: string;
    imageUrl: string;
    text: string;
  };
  onclick: () => void;
}

interface EnvironmentChangeEventData {
  newEnvironmentId: string;
}

interface CommandEventData {
  cmd: Command;
}

interface Command {
  type: string;
  signalSuckedMaterialChanged?: HSCore.Util.Signal;
}

interface Strategy {
  isSuckable(mesh: unknown): boolean;
  suck(mesh: unknown): Material | null;
}

interface ToolbarPlugin {
  ToolbarIdEnum: {
    DEFAULT_TOOLBAR_ID: string;
  };
  getItem(path: string, toolbarId?: string): ToolbarItem | null;
}

interface ToolbarItem {
  add(config: ToolbarItemConfig): void;
  enable(): void;
  disable(): void;
}

interface ContextualToolsPlugin {}

interface MaterialImagePlugin {}

interface PropertyBarPlugin {
  showProperty(items: PropertyBarItem[]): void;
}

export class Handler {
  private suckedMaterial: Material | undefined;
  private _dependencies!: Dependencies;
  private _app!: HSApp.App;
  private _cmdMgr!: HSCore.Command.CommandManager;
  private _toolbarPlugin!: ToolbarPlugin;
  private _contextualToolsPlugin!: ContextualToolsPlugin;
  private _materialImagePlugin!: MaterialImagePlugin;
  private propertyBarPlugin!: PropertyBarPlugin;
  private _signalHook!: HSCore.Util.SignalHook;
  private _eventTrack!: HSApp.Util.EventTrack;
  private _strategies!: Strategy[];
  private firstLoginPlugin!: unknown;

  public init(options: InitOptions): void {
    this.suckedMaterial = undefined;
    this._dependencies = options.dependencies;
    this._app = options.app;
    this._cmdMgr = this._app.cmdManager;
    this._toolbarPlugin = this._dependencies[HSFPConstants.PluginType.Toolbar];
    this._contextualToolsPlugin = this._dependencies[HSFPConstants.PluginType.ContextualTools];
    this._materialImagePlugin = this._dependencies[HSFPConstants.PluginType.MaterialImage];
    this.propertyBarPlugin = this._dependencies[HSFPConstants.PluginType.PropertyBar];
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._eventTrack = HSApp.Util.EventTrack.instance();

    const commandType = HSFPConstants.CommandType;
    this._cmdMgr.register(commandType.MaterialBrush, l.CmdMaterialBrush);
    this._app.transManager.register(HSFPConstants.RequestType.MaterialBrush, l.MaterialBrushRequest);
    this._app.transManager.register(HSFPConstants.RequestType.ProxyMaterialBrushRequest, d.default);
    this._signalHook.listen(this._cmdMgr.signalCommandStarted, this._onCmdStart);
    this._signalHook.listen(this._cmdMgr.signalCommandTerminating, this._onCmdEnd);
    this._strategies = [new u.default(this._dependencies)];
  }

  private _injectDefaultToolbar(): void {
    this._toolbarPlugin.getItem("toolBar_assistant")!.add({
      name: "toolBar_edit_materialbrush",
      type: "image",
      label: ResourceManager.getString("toolBar_material_brush_with_hotkey"),
      order: 200,
      icon: "plugin/toolbar/res/ImgToolBar/material_brush.svg",
      hotkey: {
        win: ["ctrl+b", "b"],
        mac: ["meta+b", "b"]
      },
      popover: {
        placement: "bottomL",
        trigger: "hover",
        imageUrl: c.default,
        text: ResourceManager.getString("toolBar_material_brush_popover")
      },
      onclick: () => {
        this.enterMaterialBrush();
      }
    });
  }

  public async enterMaterialBrush(): Promise<void> {
    const checkResult = await this.checkEnterRights();
    
    if (!checkResult.canEnter) {
      this.showMarketModal("materialBrush");
      return;
    }

    if (checkResult.success && checkResult.amount > 0) {
      this.payTrialCost();
    }

    const functionKey = "house.template.material.brush";
    
    if (this._cmdMgr.current instanceof l.CmdMaterialBrush) {
      this._cmdMgr.complete();
      this._app.signalCustomFunctionTerminated?.dispatch({ key: functionKey });
      return;
    }

    this._app.signalCustomFunctionStart?.dispatch({ key: functionKey });

    const allowedCommands = [HSFPConstants.CommandType.AddMaterial];
    if (this._cmdMgr.current && !allowedCommands.includes(this._cmdMgr.current.type)) {
      this._cmdMgr.complete(this._cmdMgr.current);
    }

    const activeEnvironmentId = this._app.activeEnvironmentId;
    this._eventTrack.track(
      HSApp.Util.EventGroupEnum.Toolbar,
      "toolBar_material_brush_event",
      { sEnvironment: activeEnvironmentId }
    );

    if (!this._isValidEnvironment(activeEnvironmentId)) {
      return;
    }

    if (!this.is2DViewValidEnvironment(activeEnvironmentId)) {
      this._app.switchTo3DView();
    }

    this._app.pluginManager
      .getPlugin(HSFPConstants.PluginType.LeftMenu)
      .hideLeftMenu();

    const dependencies = this._dependencies;
    const command = this._cmdMgr.createCommand(
      HSFPConstants.CommandType.MaterialBrush,
      [dependencies, this]
    );
    this._cmdMgr.execute(command);
  }

  public needCheckBenefit(): boolean {
    const exemptEnvironments = [
      HSFPConstants.Environment.MixPaint,
      HSFPConstants.Environment.CustomizedPM,
      HSFPConstants.Environment.TPZZCabinet,
      HSFPConstants.Environment.ConcealedWorkV2
    ];
    const activeEnvironment = this._app.activeEnvironmentId;
    return (
      HSApp.Config.TENANT === "fp" &&
      !adskUser.isEnterprise &&
      !exemptEnvironments.includes(activeEnvironment)
    );
  }

  public getBenefitAmount(): number | undefined {
    if (!this.needCheckBenefit()) {
      return -1;
    }
    return adskUser.checkBenefit("materialBrush")?.payload?.amount;
  }

  public checkEnterRights(): CheckEnterRightsResult | Promise<CheckEnterRightsResult> {
    this.firstLoginPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      "hsw.brand.ezhome.firstlogin.Plugin"
    );

    if (this.needCheckBenefit()) {
      return (this.firstLoginPlugin as any).checkEnterRights("materialBrush");
    }

    return {
      success: true,
      amount: -1,
      canEnter: true
    };
  }

  public payTrialCost(): unknown {
    return (this.firstLoginPlugin as any).payTrialCost("materialBrush");
  }

  public showMarketModal(benefitType: string): void {
    const marketingBadgePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.MarketingBadge
    );
    if (marketingBadgePlugin) {
      (marketingBadgePlugin as any).showMarketModal("render", benefitType);
    }
  }

  private _onEnvironmentChange(event: { data: EnvironmentChangeEventData }): void {
    const toolbarItem = this._toolbarPlugin.getItem(
      "toolBar_assistant/toolBar_edit_materialbrush",
      this._toolbarPlugin.ToolbarIdEnum.DEFAULT_TOOLBAR_ID
    );

    if (!toolbarItem) {
      return;
    }

    const newEnvironmentId = event.data.newEnvironmentId;
    if (this._isValidEnvironment(newEnvironmentId)) {
      toolbarItem.enable();
    } else {
      toolbarItem.disable();
      if (this._cmdMgr.current instanceof l.CmdMaterialBrush) {
        this._cmdMgr.complete();
      }
    }
  }

  private _isValidEnvironment(environmentId: string): boolean {
    return environmentId !== HSFPConstants.Environment.ConcealedWorkV2;
  }

  public is2DViewValidEnvironment(environmentId: string): boolean {
    const validEnvironments = [
      HSFPConstants.Environment.NCustomizedBackgroundWall,
      HSFPConstants.Environment.NCustomizedCeilingModel,
      HSFPConstants.Environment.NCustomizedPlatform
    ];
    return validEnvironments.includes(environmentId);
  }

  private _onCmdStart = (event: { data: CommandEventData }): void => {
    const command = event.data.cmd;
    if (command instanceof l.CmdMaterialBrush) {
      this._signalHook.listen(
        command.signalSuckedMaterialChanged!,
        this._onSuckedMaterialChanged
      );
    }
  };

  private _onCmdEnd = (event: { data: CommandEventData }): void => {
    const command = event.data.cmd;
    if (command instanceof l.CmdMaterialBrush) {
      command.signalSuckedMaterialChanged!.unlisten(
        this._onSuckedMaterialChanged,
        this
      );
    }
  };

  private _onSuckedMaterialChanged = (event: { data: SuckedMaterialChangedEventData }): void => {
    if (!this._contextualToolsPlugin || !(this._cmdMgr.current instanceof l.CmdMaterialBrush)) {
      return;
    }

    if (event.data.material.materialData.textureURI === "") {
      HSApp.App.getApp()
        .materialManager.getImageFromMaterialData(event.data.material.materialData)
        .then((textureURI: string) => {
          event.data.material.textureURI = textureURI;
          const propertyBarItems = this._initPropertyBarMaterialItemsV2(event.data);
          this.propertyBarPlugin.showProperty(propertyBarItems);
        });
    } else {
      const propertyBarItems = this._initPropertyBarMaterialItemsV2(event.data);
      this.propertyBarPlugin.showProperty(propertyBarItems);
    }
  };

  private _initPropertyBarMaterialItemsV2(eventData: SuckedMaterialChangedEventData): PropertyBarItem[] {
    const materialData = eventData.material?.materialData;
    let iconUri = "";

    if (materialData) {
      if (materialData.textureURI) {
        iconUri = HSCore.Material.Util.getIconURI(materialData.textureURI);
      } else if (materialData.color != null) {
        iconUri = this._createColorImage(51, 19, materialData.color);
      }
    }

    const parameterSettingNode: PropertyBarItem = {
      id: "parameter-setting-first-level",
      parentId: "sizecard",
      label: ResourceManager.getString("plugin_propertybar_parameter_setting"),
      type: HSFPConstants.PropertyBarType.FirstLevelNode,
      items: [
        {
          id: "wallPaperButton",
          parentId: "parameter-setting-first-level",
          type: HSFPConstants.PropertyBarType.ImageButton,
          order: 100,
          data: {
            src: iconUri,
            label: ResourceManager.getString("plugin_materialbrush_sucked_material"),
            disabled: true,
            onclick: () => {},
            onerror: (event: ErrorEvent) => {
              const target = event.target as HTMLElement;
              $(target).css("visibility", "hidden");
              $(target).parent().addClass("noimg");
            }
          }
        }
      ],
      order: 1,
      className: "parameter-setting-first-level"
    };

    const propertyBarItems: PropertyBarItem[] = [
      {
        id: "sucked_material",
        label: ResourceManager.getString("plugin_right_propertybar_base_attribute"),
        type: HSFPConstants.PropertyBarType.PropertyBar
      }
    ];

    propertyBarItems.push(parameterSettingNode);
    return propertyBarItems;
  }

  private _createColorImage(width: number, height: number, color: number): string {
    const hexColor = `000000${color.toString(16)}`.slice(-6);
    const canvas = HSCore.Util.ObjectPool.getInstance().get("Canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;
    
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = `#${hexColor}`;
    context.fillRect(0, 0, width, height);
    
    const dataUrl = canvas.toDataURL("image/png");
    (canvas as any).xRelease();
    
    return dataUrl;
  }

  public uninit(): void {
    this._signalHook.unlistenAll();
  }

  public execute(options?: unknown): void {
    const activeEnvironment = this._app.activeEnvironmentId;
    this._eventTrack.track(
      HSApp.Util.EventGroupEnum.Toolbar,
      "toolBar_material_brush_event",
      { sEnvironment: activeEnvironment }
    );

    const dependencies = this._dependencies;
    const command = this._cmdMgr.createCommand(
      HSFPConstants.CommandType.MaterialBrush,
      [dependencies, this, options]
    );
    this._cmdMgr.execute(command);
  }

  public registerStrategy(strategy: Strategy): void {
    this._strategies.push(strategy);
  }

  public unregisterStrategy(strategy: Strategy): void {
    const index = this._strategies.indexOf(strategy);
    if (index !== -1) {
      this._strategies.splice(index, 1);
    }
  }

  public getStrategies(): Strategy[] {
    return this._strategies;
  }

  public suckMaterialFromMesh(mesh: unknown): Material | null {
    for (let i = 0, len = this._strategies.length; i < len; i++) {
      const strategy = this._strategies[i];
      if (strategy.isSuckable(mesh)) {
        const material = strategy.suck(mesh);
        if (material) {
          HSApp.Util.Material.getMaterialMetaData(material.materialData.seekId);
        }
        return material;
      }
    }
    return null;
  }
}