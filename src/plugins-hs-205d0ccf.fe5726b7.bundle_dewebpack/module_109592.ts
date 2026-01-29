class RoomPropertyPlugin extends HSApp.Plugin.IPlugin {
    private _handler?: RoomPropertyHandler;

    constructor() {
        super({
            name: "Room Property plugin",
            description: "Room properties",
            dependencies: [
                HSFPConstants.PluginType.LeftMenu,
                HSFPConstants.PluginType.RightMenu,
                HSFPConstants.PluginType.ContextualTools,
                HSFPConstants.PluginType.PropertyBar
            ]
        });
    }

    onActive(context: unknown, options: unknown): void {
        this._handler = new RoomPropertyHandler(context, options);
        this._handler.init();
    }

    onDeactive(): void {
        this._handler?._uninit();
    }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.RoomProperty, RoomPropertyPlugin);