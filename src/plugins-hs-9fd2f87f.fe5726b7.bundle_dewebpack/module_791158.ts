class CustomizedModelingPlugin extends HSApp.Plugin.IPlugin {
    private app: HSApp.Application;
    private cmdMgr: HSApp.CommandManager;
    private transMgr: HSApp.TransactionManager;
    private catalogMgr: HSApp.CatalogManager;
    private toolbarPlugin: any;
    private dependencies: Record<string, any>;
    private _freezedContents: any[];
    private _unselectedContents: any[];

    constructor() {
        super({
            name: "Customized modeling plugin",
            description: "support Customized modeling",
            dependencies: [
                "hsw.plugin.contextmenu.Plugin",
                HSFPConstants.PluginType.Toolbar,
                HSFPConstants.PluginType.ResizeWidget,
                HSFPConstants.PluginType.SingleRoom,
                HSFPConstants.PluginType.Catalog,
                HSFPConstants.PluginType.PropertyBar,
                HSFPConstants.PluginType.ContextualTools,
                HSFPConstants.PluginType.LeftMenu,
                HSFPConstants.PluginType.RightMenu,
                HSFPConstants.PluginType.PageHeader,
                "hsw.plugin.userguide.Plugin"
            ]
        });

        this._freezedContents = [];
        this._unselectedContents = [];
    }

    onActive(context: any, dependencies: Record<string, any>): void {
        const app = context.app;
        this.app = app;
        this.cmdMgr = app.cmdManager;
        this.transMgr = app.transManager;
        this.catalogMgr = app.catalogManager;
        this.toolbarPlugin = dependencies[HSFPConstants.PluginType.Toolbar];

        const catalogPlugin = dependencies[HSFPConstants.PluginType.Catalog];
        this.dependencies = dependencies;

        const moduleNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");
        const commandNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling.cmd");

        HSCatalog.Builder.addMetaProcessor(moduleNamespace.MetaProcess.process);
        catalogPlugin.addMiniMetaProcessor(moduleNamespace.MetaProcess.miniProcess);

        if (!HSApp.Config.ENABLE_CUSTOMIZED_MODELING) {
            return;
        }

        this.cmdMgr.register(HSFPConstants.CommandType.CreateWallAttachedCustomizedModel, commandNamespace.CmdCreateWallAttachedCustomizedModel);
        this.cmdMgr.register(HSFPConstants.CommandType.CreateRoomAttachedCustomizedModel, commandNamespace.CmdCreateRoomAttachedCustomizedModel);
        this.cmdMgr.register(HSFPConstants.CommandType.EditCustomizedModel, commandNamespace.CmdEditCustomizedModel);
        this.cmdMgr.register(HSFPConstants.CommandType.EditCustomizedModelType, commandNamespace.CmdEditCustomizedModelType);
        this.cmdMgr.register(HSFPConstants.CommandType.EditParametricCeiling, commandNamespace.CmdEditParametricCeiling);
        this.cmdMgr.register(HSFPConstants.CommandType.EditCustomizedMolding, commandNamespace.CmdEditCustomizedMolding);
        this.cmdMgr.register(HSFPConstants.CommandType.AddCustomizedModelMolding, commandNamespace.CmdAddCustomizedModelMolding);
        this.cmdMgr.register(HSFPConstants.CommandType.DeleteCustomizedModelMolding, commandNamespace.CmdDeleteCustomizedModelMolding);
        this.cmdMgr.register(HSFPConstants.CommandType.AddCustomizedModelLightSlot, commandNamespace.CmdAddCustomizedModelLightSlot);
        this.cmdMgr.register(HSFPConstants.CommandType.DeleteCustomizedModelLightSlot, commandNamespace.CmdDeleteCustomizedModelLightSlot);
        this.cmdMgr.register(HSFPConstants.CommandType.EditCustomizedModelLightSlot, commandNamespace.CmdEditCustomizedModelLightSlot);
        this.cmdMgr.register(HSFPConstants.CommandType.EditCustomizedModelLightBand, commandNamespace.CmdEditCustomizedModelLightBand);
        this.cmdMgr.register(HSFPConstants.CommandType.EditNCustomizedModelLightBand, commandNamespace.CmdEditNCustomizedModelLightBand);
        this.cmdMgr.register(HSFPConstants.CommandType.EditNCustomizedModelLightSlot, commandNamespace.CmdEditNCustomizedModelLightSlot);
        this.cmdMgr.register(HSFPConstants.CommandType.ToggleSelfHostLightBand, commandNamespace.CmdToggleSelfHostLightBand);
        this.cmdMgr.register(HSFPConstants.CommandType.DeleteCustomizedModelLightBand, commandNamespace.CmdDeleteCustomizedModelLightBand);
        this.cmdMgr.register(HSFPConstants.CommandType.NEditParametricCeiling, commandNamespace.CmdNEditParametricCeiling);
        this.cmdMgr.register(HSFPConstants.CommandType.EditNCPBackgroundWallBase, commandNamespace.CmdEditNCPBackgroundWallBase);
        this.cmdMgr.register(HSFPConstants.CommandType.EditNCPBackgroundWallUnitSelfMolding, commandNamespace.CmdEditNCPBackgroundWallUnitSelfMolding);
        this.cmdMgr.register(HSFPConstants.CommandType.ReplaceNCPBackgroundWallUnitSelfMolding, HSFPConstants.CommandType.OpenIndependentPanel, commandNamespace.ReplaceNCPBackgroundWallUnitSelfMoldingAdapter);
        this.cmdMgr.register(HSFPConstants.CommandType.EditParametricContentBase, commandNamespace.CmdEditParametricContentBase);

        moduleNamespace.ModelingMsgHandler.init();
        this.transMgr.signalCommitted.listen(this.onReqCommitted, this);

        const main2DView = app.getMain2DView();
        if (main2DView) {
            main2DView.registerGizmoFactory(new moduleNamespace.GizmoFactory(main2DView, context));
        }

        const aux2DView = app.getAux2DView();
        if (aux2DView) {
            aux2DView.registerGizmoFactory(new moduleNamespace.GizmoFactory(aux2DView, context));
        }

        this.init();
    }

    onDeactive(): void {
        // Cleanup logic if needed
    }

    init(): void {
        if (!HSApp.Config.ENABLE_CUSTOMIZED_MODELING) {
            return;
        }

        const moduleNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");
        moduleNamespace.Handler.init(this.cmdMgr, this.transMgr, this.catalogMgr, this.dependencies);
    }

    uninit(): void {
        const moduleNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");
        moduleNamespace.Handler.uninit();
    }

    uploadCustomizedContent(content: any): void {
        const moduleNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");
        moduleNamespace.Handler.uploadCustomizedContent(content);
    }

    modifyModelType(): void {
        const moduleNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");
        moduleNamespace.Handler.onUIEditTypeBtnClk();
    }

    onReqCommitted(event: any): void {
        const request = event.data.request;
        let shouldShowTooltip = false;

        if (request?.type === HSFPConstants.RequestType.AddProduct) {
            const result = request.result;
            const contentType = result.metadata.contentType;

            if (
                contentType.isTypeOf(HSCatalog.ContentTypeEnum.GypsumCeiling) ||
                contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedCeiling) ||
                contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedCeiling)
            ) {
                shouldShowTooltip = true;
            }
        }

        if (shouldShowTooltip) {
            const moduleNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");
            moduleNamespace.UI.showCeilingTooltip();
        }
    }

    enterCustomizedModel(model: any): void {
        const app = HSApp.App.getApp();
        const singleRoomPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.SingleRoom);
        
        singleRoomPlugin.cancelSingleRoom();
        app.selectionManager.unselectAll();
        this.cmdMgr.cancel();
        app.switchTo2DView();

        const commandType = HSFPConstants.CommandType.CreateRoomAttachedCustomizedModel;
        const command = this.cmdMgr.createCommand(commandType, [model]);

        if (command) {
            this.cmdMgr.execute(command);
        }
    }

    onUIAddMaterialBtnClk(material: any): void {
        const moduleNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");
        moduleNamespace.Handler.onUIAddMaterialBtnClk(material);
    }

    onUIEditBtnClk(): void {
        const moduleNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");
        moduleNamespace.Handler.onUIEditBtnClk();
    }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.CustomizedModeling, CustomizedModelingPlugin);