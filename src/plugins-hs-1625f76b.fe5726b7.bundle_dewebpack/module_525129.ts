import { Handler } from './Handler';

class ContentTagPlugin extends HSApp.Plugin.IPlugin {
    private _handler: Handler;

    constructor() {
        super({
            name: "Content Tag plugin",
            description: "Content Tag functions",
            dependencies: [
                HSFPConstants.PluginType.ContextualTools,
                HSFPConstants.PluginType.PropertyBar,
                HSFPConstants.PluginType.CommonUI
            ]
        });
        this._handler = new Handler();
    }

    onActive(editor: unknown, config: unknown): void {
        this._handler.init(editor, config);
    }

    onDeactive(): void {
        // No cleanup needed
    }

    initFloorplan(floorplan: unknown, editor: unknown, config: unknown): void {
        this._handler.initFloorplan(floorplan, editor, config);
    }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.ContentTag, ContentTagPlugin);