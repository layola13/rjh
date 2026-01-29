import { Handler } from './Handler';
import { NWTKUser } from './NWTKUser';

class RoofsDrawingPlugin extends HSApp.Plugin.IPlugin {
    private _handler?: Handler;

    constructor() {
        super({
            name: "layer editing",
            description: "Process layer edit commands and its gizmos.",
            dependencies: [
                HSFPConstants.PluginType.Toolbar,
                HSFPConstants.PluginType.ContextualTools,
                HSFPConstants.PluginType.PropertyBar,
                HSFPConstants.PluginType.LeftMenu,
                HSFPConstants.PluginType.RightMenu,
                HSFPConstants.PluginType.PageHeader,
                HSFPConstants.PluginType.ParametricRoof
            ]
        });
    }

    onActive(context: { app: HSApp.Application }, config: unknown): void {
        this._handler = new Handler();
        this._handler.init(context.app, config);
    }

    onDeactive(): void {
        // Cleanup logic if needed
    }

    enterRoofsDrawing(environment: unknown): void {
        this._handler?.enterEnvironment(environment);
    }

    exitRoofsDrawing(): void {
        this._handler?.exitEnvironment();
    }

    canDrawRoofs(): boolean {
        return this._handler?.canDrawRoofs() ?? false;
    }

    showLayerChooseDialog(): unknown {
        return this._handler?.showLayerChooseDialog();
    }

    getSelectedRoof(): unknown {
        const selectedRegion = this._handler?.getSelectedRoofRegion();
        return selectedRegion?.roof ?? this._handler?.getSelectedRoof();
    }

    async checkEnterRights(shouldCheck: boolean = false): Promise<unknown> {
        return NWTKUser.instance().checkEnterRights(shouldCheck);
    }

    async payTrialCost(): Promise<unknown> {
        return NWTKUser.instance().payTrialCost();
    }

    async showRoofsDrawingMarketModal(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            const app = HSApp.App.getApp();
            const marketingBadgePlugin = app.pluginManager.getPlugin(
                HSFPConstants.PluginType.MarketingBadge
            );

            if (marketingBadgePlugin?.showMarketModal) {
                marketingBadgePlugin.showMarketModal("render", "roofs_drawing", {
                    onClose: () => {
                        resolve(true);
                    }
                });
            } else {
                resolve(true);
            }
        });
    }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.RoofsDrawing, RoofsDrawingPlugin);