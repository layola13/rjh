import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { HSCatalog } from './HSCatalog';
import { HSCore } from './HSCore';
import { UI } from './UI';
import { FaceMaterialCatalog } from './FaceMaterialCatalog';

interface FaceMaterialEnvConfig {
  app: HSApp.App;
  handler: any;
  catalogPlugin: any;
  pageHeaderPlugin: any;
  toolbarPlugin: any;
  resizeWidgetPlugin: any;
  propertyBarPlugin: any;
  menuPlugin: any;
  faceMeshHandler: any;
}

interface TransactionSession {
  commit(): void;
}

interface PropertyBarEvent {
  [key: string]: any;
}

interface MenuCustomizedItemsEvent {
  [key: string]: any;
}

export class FaceMaterialEnv extends HSApp.Environment.CommonEnvironment {
  private _app: HSApp.App;
  private _handler: any;
  private _catalogPlugin: any;
  private _pageHeaderPlugin: any;
  private _toolbarPlugin: any;
  private _resizeWidgetPlugin: any;
  private _menuPlugin: any;
  private _propertyBarPlugin: any;
  private _ui: UI | null;
  private _selEntity: any | null;
  private _meshHandler: any;
  private _faceMaterialCatalogIns?: FaceMaterialCatalog;
  private _session?: TransactionSession | null;
  private _visibleContentsOnCmdStart?: any[] | null;

  constructor(config: FaceMaterialEnvConfig) {
    super(config.app);

    this._app = config.app;
    this._handler = config.handler;
    this._catalogPlugin = config.catalogPlugin;
    this._pageHeaderPlugin = config.pageHeaderPlugin;
    this._toolbarPlugin = config.toolbarPlugin;
    this._resizeWidgetPlugin = config.resizeWidgetPlugin;
    this._propertyBarPlugin = config.propertyBarPlugin;
    this._menuPlugin = config.menuPlugin;
    this._meshHandler = config.faceMeshHandler;
    this._ui = null;
    this._selEntity = null;
  }

  onPopulatePropertyBar = (event: PropertyBarEvent): void => {
    this._handler.onPopulatePropertyBar(event);
  };

  private _executeCmd = (): void => {
    if (!this._meshHandler.isCmdActive) {
      this._app.cmdManager.executeCommand(
        HSFPConstants.CommandType.AddMaterial,
        [this._handler, this._meshHandler]
      );
    }
  };

  private _completeCmd = (): void => {
    if (this._meshHandler.isCmdActive) {
      this._app.cmdManager.complete(this._app.cmdManager.current);
    }
  };

  private _hookEvents = (): void => {
    if (HSApp.Config.ENABLE_CUSTOMIZED_MODELING) {
      this._app.transManager.signalUndoRedoStateChanged.listen(this._updateToolbarResetItem);
      this._menuPlugin.signalPopulateCustomizedItems.listen(this._populateMenuCustomizedItems);
      this._propertyBarPlugin.signalPopulatePropertyBar.listen(this.onPopulatePropertyBar);
    }
  };

  private _unhookEvents = (): void => {
    this._app.transManager.signalUndoRedoStateChanged.unlisten(this._updateToolbarResetItem);
    this._menuPlugin.signalPopulateCustomizedItems.unlisten(this._populateMenuCustomizedItems);
    this._propertyBarPlugin.signalPopulatePropertyBar.unlisten(this.onPopulatePropertyBar);
  };

  private _onProductPageShown = (): void => {
    if (this._meshHandler.isCmdActive) {
      const materialData = this._meshHandler.getSelectedMaterialData();
      if (materialData?.textureURI) {
        // Material data with texture URI exists
      }
    }
  };

  private _updateToolbarResetItem = (): void => {
    this._ui?.updateToolbarResetItem();
  };

  private _populateMenuCustomizedItems = (event: MenuCustomizedItemsEvent): void => {
    this._ui?.populateMenuCustomizedItems(event);
  };

  onActivate(entity: any): void {
    this._selEntity = entity;

    if (!this._ui) {
      this._ui = new UI({
        app: this._app,
        handler: this._handler,
        faceMeshHandler: this._meshHandler,
        catalogPlugin: this._catalogPlugin,
        pageHeaderPlugin: this._pageHeaderPlugin,
        toolbarPlugin: this._toolbarPlugin,
        resizeWidgetPlugin: this._resizeWidgetPlugin,
        menuPlugin: this._menuPlugin
      });
    }

    this.registerCatalog();

    if (appSettingsUtil.showEditingContentOnly == null) {
      appSettingsUtil.showEditingContentOnly = true;
    }

    if (appSettingsUtil.showEditingContentOnly) {
      this.displayOtherContents(false);
    }

    this._handler.activate();
    this._meshHandler.init(this._selEntity);
    this._meshHandler.entity3d.groupMesh = false;
    this._ui.activate();
    this._session = this._app.transManager.startSession();
    this._ui.updateToolbarResetItem();
    this._hookEvents();
    this._executeCmd();
  }

  onDeactivate(): void {
    if (
      this._selEntity?.contentType.isTypeOf(
        HSCatalog.ContentTypeEnum.SmartCustomizedCeiling
      )
    ) {
      const entity = this._selEntity;
      entity.materialManager.updateMaterialData(entity);

      const parametricCeilingPresets = HSApp.App.getApp()
        .pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedFeatureModel)
        .getParametricCeilingPresets();

      entity.getMoldingEntities().forEach((molding: any) => {
        const profileTypeData = parametricCeilingPresets.getProfileTypeByMoldingId(
          entity,
          molding.moldingId
        );
        const profileType = profileTypeData.profileType;

        if (profileType && entity.metadata.parameters?.[profileType]) {
          const parameters = entity.metadata.parameters[profileType];
          const materialData = molding.getMaterialData();

          parameters.materialData =
            materialData instanceof HSCore.Material.MaterialData
              ? materialData.toJson()
              : materialData;

          entity.materialManager.setMoldingMaterialDirty(profileType);
        }
      });
    }

    this._selEntity = null;

    if (this._session) {
      this._session.commit();
      this._session = null;
    }

    this._unhookEvents();

    if (appSettingsUtil.showEditingContentOnly) {
      this.displayOtherContents(true);
    }

    this._visibleContentsOnCmdStart = null;
    this._handler.deactivate();

    if (this._ui) {
      this._ui.deactivate();
    }

    LiveHint.hide();
    this._meshHandler.entity3d.groupMesh = true;
    this._meshHandler.dispose();
    this._completeCmd();

    super.onDeactivate();
  }

  registerCatalog(): void {
    if (!this._faceMaterialCatalogIns) {
      this._faceMaterialCatalogIns = new FaceMaterialCatalog();
    }
    this._faceMaterialCatalogIns.init();
  }

  onSuspend(): void {
    this._unhookEvents();
    this._ui?.deactivate();
    LiveHint.hide();
    this._completeCmd();
    super.onSuspend();
  }

  onResume(): void {
    super.onResume();

    const app = this._app;
    this.registerCatalog();
    app.switchPrimaryViewMode(app.viewMode3D);
    this._ui?.activate();
    this._hookEvents();
    this._executeCmd();
    this._meshHandler.onESC();
  }

  getToolbarId(): string | undefined {
    return this._ui?.getToolbarId();
  }

  displayOtherContents(shouldShow: boolean): void {
    if (!shouldShow && !this._visibleContentsOnCmdStart) {
      this._visibleContentsOnCmdStart = [];

      const excludedContentTypes = [
        HSCatalog.ContentTypeEnum.ext_opening,
        HSCatalog.ContentTypeEnum.ext_window,
        HSCatalog.ContentTypeEnum.KitchenCeiling3d
      ];

      const processEntity = (entity: any): void => {
        const isSameEntity = entity === this._selEntity;
        const isHidden = entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden);
        const isExcludedType = entity.metadata.contentType.isTypeOf(excludedContentTypes);
        const isPocket = entity instanceof HSCore.Model.Pocket;

        if (
          !isSameEntity &&
          (this.isSpecifiedEnv() || isHidden) &&
          !isExcludedType &&
          !isPocket
        ) {
          this._visibleContentsOnCmdStart!.push(entity);
        }
      };

      const floorplan = this._app.floorplan;
      floorplan.forEachGroup(processEntity);
      floorplan.forEachContent(processEntity);
      floorplan.forEachMolding(processEntity);

      floorplan.scene.getCustomizedPms().forEach((customizedPm: any) => {
        customizedPm.getAllChildren().forEach((child: any) => {
          processEntity(child);
        });
      });
    }

    if (this._visibleContentsOnCmdStart) {
      const flagMethod = shouldShow ? 'setFlagOff' : 'setFlagOn';
      this._visibleContentsOnCmdStart.forEach((entity: any) => {
        entity[flagMethod](HSCore.Model.EntityFlagEnum.hidden, true);
      });
    }
  }

  isSpecifiedEnv(): boolean {
    return HSApp.App.getApp().environmentManager.isWallCeilingPlatformEnv(
      this._handler.fromEnvironmentId
    );
  }
}