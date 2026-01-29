class ContentManipulationPlugin extends HSApp.Plugin.IPlugin {
    public signalContextualtoolElevationRefresh: HSCore.Util.Signal<ContentManipulationPlugin>;
    private _handler: ContentManipulationHandler;

    constructor() {
        super({
            name: "Content Manipulation plugin",
            description: "Content manipulation functions: move, resize, rotate",
            dependencies: [
                HSFPConstants.PluginType.ContextualTools,
                HSFPConstants.PluginType.PropertyBar,
                HSFPConstants.PluginType.LeftMenu
            ]
        });

        this.signalContextualtoolElevationRefresh = new HSCore.Util.Signal(this);
        this._handler = new ContentManipulationHandler();
    }

    public onActive(context: unknown, options: unknown): void {
        this._handler.init_(context, options);
    }

    public showSizecard(): void {
        this._handler.showsizecard_();
    }

    public hideSizecard(): void {
        this._handler.hidesizecard_();
    }

    public onDeactive(): void {
        // Intentionally empty
    }

    public replaceCustomizedMoldingType(moldingType: unknown, options: unknown): void {
        this._handler.getPropertyBarV2Handlers().replaceCustomizedMoldingType(moldingType, options);
    }

    public replaceNCustomizedMoldingType(moldingTypes: unknown): void {
        this._handler.getPropertyBarV2Handlers().replaceNCustomizedMoldingType(moldingTypes);
    }

    public registerGizmo(gizmo: unknown): unknown {
        return this._handler._registerGizmo(gizmo);
    }

    public unregisterGizmo(gizmo: unknown, options: unknown): void {
        this._handler._unregisterGizmo(gizmo, options);
    }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.ContentManipulation, ContentManipulationPlugin);