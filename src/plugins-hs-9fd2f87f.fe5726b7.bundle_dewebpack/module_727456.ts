class CurtainPlugin extends HSApp.Plugin.IPlugin {
    private _handler: CurtainHandler;

    constructor() {
        super({
            name: "Curtain plugin",
            description: "Curtain Plugin",
            dependencies: [
                HSFPConstants.PluginType.ContextualTools,
                HSFPConstants.PluginType.PropertyBar,
                HSFPConstants.PluginType.Catalog,
                HSFPConstants.PluginType.Toolbar,
                HSFPConstants.PluginType.ResizeWidget
            ]
        });
        this._handler = new CurtainHandler();
    }

    onActive(context: HSApp.Plugin.IPluginContext, options: unknown): void {
        this._handler.init(context.app, options);
    }

    onDeactive(): void {
        this._handler.uninit();
    }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.Curtain, CurtainPlugin);