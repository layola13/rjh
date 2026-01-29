import { HSCore } from './core';
import { HSApp } from './app';
import { ResourceManager } from './resource-manager';
import { LiveHint } from './live-hint';
import { HSFPConstants } from './constants';
import { PropertyBarControlTypeEnum } from './enums';
import { adskUser } from './user';

interface PluginDependencies {
  [HSFPConstants.PluginType.Catalog]: CatalogPlugin;
  [HSFPConstants.PluginType.LeftMenu]: LeftMenuPlugin;
  [HSFPConstants.PluginType.PropertyBar]: PropertyBarPlugin;
  [HSFPConstants.PluginType.ContentManipulation]: ContentManipulationPlugin;
  [HSFPConstants.PluginType.ParametricOpening]: ParametricOpeningPlugin;
}

interface PluginInitConfig {
  dependencies: PluginDependencies;
}

interface CatalogPlugin {
  addMiniMetaProcessor(processor: (meta: unknown) => void): void;
}

interface LeftMenuPlugin {
  signalPopulateCustomizedItems: unknown;
}

interface PropertyBarPlugin {
  signalPopulatePropertyBar: unknown;
}

interface ContentManipulationPlugin {
  _handler: ContentPropertyBarHandler;
}

interface ParametricOpeningPlugin {
  handler: ParametricOpeningHandler;
}

interface ContentPropertyBarHandler {
  _onPopulatePropertyBar(event: PropertyBarEvent): void;
}

interface ParametricOpeningHandler {
  hookSizePropertyBar(opening: HSCore.Model.ParametricOpening): PropertyBarItem[];
}

interface LeftMenuEvent {
  data: {
    defaultItems: MenuItem[];
    customizedItems: MenuItem[];
  };
}

interface PropertyBarEvent {
  data: PropertyBarItem[];
}

interface MenuItem {
  id: string;
  type?: PropertyBarControlTypeEnum;
  order?: number;
  src?: string;
  disable?: boolean;
  unusable?: boolean;
  label: string;
  onClick?: (event: unknown) => void;
  children?: MenuItem[];
}

interface PropertyBarItem {
  id: string;
  type?: PropertyBarControlTypeEnum;
  order?: number;
  src?: string;
  label?: string;
  disable?: boolean;
  unusable?: boolean;
  onClick?: (event: unknown) => void;
}

import { CmdCreateWallFaceAssembly } from './commands/create-wall-face-assembly';
import { CmdApplyWallFaceAssembly } from './commands/apply-wall-face-assembly';
import { CmdMoveWFAOpening } from './commands/move-wfa-opening';
import { CreateWallFaceAssemblyRequest } from './requests/create-wall-face-assembly-request';
import { RemoveWallFaceAssemblyRequest } from './requests/remove-wall-face-assembly-request';
import { MoveWFAOpeningRequest } from './requests/move-wfa-opening-request';
import { UpdateDoorWindowInWFARequest } from './requests/update-door-window-in-wfa-request';
import { CreateNCPBgWallsInWFARequest } from './requests/create-ncp-bg-walls-in-wfa-request';
import { PropertyBarHandler } from './handlers/property-bar-handler';
import { MetaProcess } from './meta-process';
import { WFAUploadUtil } from './wfa-upload-util';
import { SvgMap } from './svg-map';

const HINT_TIMEOUT = 30000;
const REFRESH_DELAY = 400;

export default class WallFaceAssemblyPlugin {
  private _signalHook: HSCore.Util.SignalHook;
  private _contentPropertyBarHandler?: ContentPropertyBarHandler;
  private _catalogPlugin?: CatalogPlugin;
  private _parametricOpeningHandler?: ParametricOpeningHandler;

  constructor() {
    this._signalHook = new HSCore.Util.SignalHook(this);
  }

  init(config: PluginInitConfig): void {
    this._registerCmd();
    this._registerReq();
    this._catalogPlugin = config.dependencies[HSFPConstants.PluginType.Catalog];

    const leftMenuPlugin = config.dependencies[HSFPConstants.PluginType.LeftMenu];
    const propertyBarPlugin = config.dependencies[HSFPConstants.PluginType.PropertyBar];
    const contentManipulationPlugin = config.dependencies[HSFPConstants.PluginType.ContentManipulation];
    this._contentPropertyBarHandler = contentManipulationPlugin._handler;

    const parametricOpeningPlugin = config.dependencies[HSFPConstants.PluginType.ParametricOpening];
    this._parametricOpeningHandler = parametricOpeningPlugin.handler;

    this._signalHook.listen(leftMenuPlugin.signalPopulateCustomizedItems, this._onPopulateLeftmenu);
    this._signalHook.listen(propertyBarPlugin.signalPopulatePropertyBar, this._onPopulatePropertyBar);
    this._initMetaProcess();
  }

  private _initMetaProcess(): void {
    const metaProcess = new MetaProcess();
    this._catalogPlugin?.addMiniMetaProcessor(metaProcess.processMiniMeta);
  }

  private _registerCmd(): void {
    const commands: [string, unknown][] = [
      [HSFPConstants.CommandType.CreateWallFaceAssembly, CmdCreateWallFaceAssembly],
      [HSFPConstants.CommandType.ApplyWallFaceAssembly, CmdApplyWallFaceAssembly],
      [HSFPConstants.CommandType.MoveWFAOpening, CmdMoveWFAOpening]
    ];
    HSApp.App.getApp().cmdManager.register(commands);
  }

  private _registerReq(): void {
    const requests: [string, unknown][] = [
      [HSFPConstants.RequestType.CreateWallFaceAssembly, CreateWallFaceAssemblyRequest],
      [HSFPConstants.RequestType.RemoveWallFaceAssembly, RemoveWallFaceAssemblyRequest],
      [HSFPConstants.RequestType.MoveWFAOpening, MoveWFAOpeningRequest],
      [HSFPConstants.RequestType.UpdateDoorWindowInWFA, UpdateDoorWindowInWFARequest],
      [HSFPConstants.RequestType.CreateNCPBgWallsInWFA, CreateNCPBgWallsInWFARequest]
    ];
    HSApp.App.getApp().transManager.register(requests);
  }

  private _getWfAssemblyItems(
    app: HSApp.App,
    customizedItems: MenuItem[],
    wallFaceAssembly: HSCore.Model.WallFaceAssembly
  ): void {
    const selectionManager = HSApp.Selection.Manager;

    customizedItems.push({
      id: 'moveWallBoard',
      type: PropertyBarControlTypeEnum.imageButton,
      order: 11,
      src: SvgMap.move,
      disable: app.is2DViewActive(),
      label: ResourceManager.getString('plugin_wallface_assembly_leftmenu_move_wallboard'),
      children: [
        {
          id: 'moveWallBoard',
          label: ResourceManager.getString('plugin_wallface_assembly_leftmenu_move_wallboard'),
          onClick: () => {
            selectionManager.unselectAll();
            selectionManager.select(wallFaceAssembly, {
              selectionType: HSApp.View.GizmoSelectionType.RotateAndMove
            });
          }
        },
        {
          id: 'scaleWallBoard',
          label: ResourceManager.getString('plugin_wallface_assembly_leftmenu_scale_wallboard'),
          onClick: () => {
            wallFaceAssembly.backgroundWalls.forEach((backgroundWall) => {
              backgroundWall.parameters.isAutoFit = false;
              backgroundWall.isScalable = true;
            });
            selectionManager.unselectAll();
            selectionManager.select(wallFaceAssembly, {
              selectionType: HSApp.View.GizmoSelectionType.Scale
            });
          }
        }
      ]
    });

    customizedItems.push({
      id: 'removeWfa',
      type: PropertyBarControlTypeEnum.imageButton,
      order: 51,
      src: SvgMap.ungroup,
      label: ResourceManager.getString('group_contextmenu_ungroup_title'),
      onClick: () => {
        const request = app.transManager.createRequest(
          HSFPConstants.RequestType.RemoveWallFaceAssembly,
          [wallFaceAssembly]
        );
        app.transManager.commit(request);
        app.selectionManager.unselectAll();
      }
    });

    customizedItems.push({
      id: 'clearWfa',
      type: PropertyBarControlTypeEnum.imageButton,
      order: 151,
      src: SvgMap.del,
      label: ResourceManager.getString('plugin_wallface_assembly_leftmenu_clear_all'),
      onClick: () => {
        const request = app.transManager.createRequest(
          HSFPConstants.RequestType.RemoveWallFaceAssembly,
          [wallFaceAssembly, true]
        );
        app.transManager.commit(request);
        app.selectionManager.unselectAll();
      }
    });

    if (
      !adskUser.isLogin() ||
      !wallFaceAssembly?.metadata?.categories ||
      wallFaceAssembly.metadata.categories.length === 0
    ) {
      customizedItems.push({
        id: 'uploadGroupButton',
        type: PropertyBarControlTypeEnum.imageButton,
        src: SvgMap.favRemove,
        order: 162,
        label: ResourceManager.getString('plugin_favoritelist_add'),
        onClick: () => {
          this.uploadWallFaceAssembly(wallFaceAssembly);
        }
      });
    }
  }

  private _onPopulateLeftmenu = (event: LeftMenuEvent): void => {
    const menuData = event.data;
    const app = HSApp.App.getApp();
    const selectedItems = app.selectionManager.selected();
    const selectedEntity = selectedItems.length === 1 ? selectedItems[0] : undefined;

    if (
      selectedEntity &&
      selectedEntity instanceof HSCore.Model.Entity &&
      new HSCore.Model.WallFaceAssemblyDecorator().getWallFaceAssemblyParent(selectedEntity)
    ) {
      menuData.defaultItems.length = 0;
      menuData.customizedItems.length = 0;
      return;
    }

    if (!app.environmentManager.isWallCeilingPlatformEnv() && selectedEntity) {
      if (selectedEntity instanceof HSCore.Model.WallFaceAssembly) {
        menuData.defaultItems = menuData.defaultItems.filter((item) => item.id !== 'delete');
        this._getWfAssemblyItems(app, menuData.customizedItems, selectedEntity);
      }

      if (
        selectedEntity instanceof HSCore.Model.NCPBackgroundWallBase ||
        selectedEntity instanceof HSCore.Model.WallFaceAssembly
      ) {
        const isGrouped =
          selectedEntity instanceof HSCore.Model.WallFaceAssembly
            ? HSApp.Util.WallFaceAssembly.allContentsGrouped(selectedEntity)
            : HSApp.Util.WallFaceAssembly.isOnlyChildOnFace(selectedEntity);

        menuData.defaultItems.push({
          id: 'createWfa',
          type: PropertyBarControlTypeEnum.imageButton,
          order: 141,
          src: SvgMap.group,
          unusable: isGrouped,
          disable: app.is2DViewActive(),
          label: ResourceManager.getString('plugin_wallface_assembly_leftmenu_group_all'),
          onClick: (clickEvent: unknown) => {
            const command = app.cmdManager.createCommand(
              HSFPConstants.CommandType.CreateWallFaceAssembly,
              [selectedEntity, clickEvent]
            );
            app.cmdManager.execute(command);
          }
        });
      }
    }
  };

  private _onPopulatePropertyBar = (event: PropertyBarEvent): void => {
    const propertyBarItems = event.data;
    const selectedItems = HSApp.App.getApp().selectionManager.selected();

    if (!selectedItems || selectedItems.length === 0 || !(selectedItems[0] instanceof HSCore.Model.Entity)) {
      return;
    }

    const selectedEntity = selectedItems[0];
    const wallFaceAssemblyParent = new HSCore.Model.WallFaceAssemblyDecorator().getWallFaceAssemblyParent(
      selectedEntity
    );

    if (selectedEntity instanceof HSCore.Model.WallFaceAssembly) {
      const gizmoSelectionType =
        HSApp.App.getApp().getActive3DView().gizmoManager.getSelectionType() || 0;

      if (
        gizmoSelectionType &
        (HSApp.View.GizmoSelectionType.Scale | HSApp.View.GizmoSelectionType.Move)
      ) {
        propertyBarItems.length = 0;
        const backgroundWallItems = new PropertyBarHandler(
          selectedEntity.backgroundWalls,
          selectedEntity
        ).getNcpBgwPropertyBarItems();
        propertyBarItems.push(...backgroundWallItems);
        return;
      }

      propertyBarItems.length = 0;
      const wfaItems = new PropertyBarHandler().getWfaPropertyBarItems(selectedEntity);
      propertyBarItems.push(...wfaItems);
      return;
    }

    if (wallFaceAssemblyParent) {
      if (selectedItems.every((item) => item instanceof HSCore.Model.NCPBackgroundWallBase)) {
        propertyBarItems.length = 0;
        const backgroundWallItems = new PropertyBarHandler(
          selectedItems,
          wallFaceAssemblyParent
        ).getNcpBgwPropertyBarItems();
        propertyBarItems.push(...backgroundWallItems);
        return;
      }

      if (selectedItems.length === 1 && selectedEntity instanceof HSCore.Model.Opening) {
        propertyBarItems.length = 0;
        this._contentPropertyBarHandler?._onPopulatePropertyBar(event);
        return;
      }

      if (selectedItems.length === 1 && selectedEntity instanceof HSCore.Model.ParametricOpening) {
        propertyBarItems.length = 0;
        const sizePropertyBarItems = this._parametricOpeningHandler?.hookSizePropertyBar(
          selectedItems[0] as HSCore.Model.ParametricOpening
        );
        if (sizePropertyBarItems) {
          propertyBarItems.push(...sizePropertyBarItems);
        }
        return;
      }
    }
  };

  uploadWallFaceAssembly(wallFaceAssembly: HSCore.Model.WallFaceAssembly): void {
    LiveHint.show(
      ResourceManager.getString('plugin_mygroup_adding_to_mygroup'),
      HINT_TIMEOUT,
      null,
      { status: 'loading' }
    );

    WFAUploadUtil.uploadWallFaceAssembly(wallFaceAssembly)
      .then((uploadResult) => {
        LiveHint.hide();
        return WFAUploadUtil.addToFavorite(uploadResult);
      })
      .then(() => {
        setTimeout(() => {
          HSApp.Catalog.Manager.signalToCatalog(
            HSCore.EventBusType.refreshMaterialProductPage
          );
        }, REFRESH_DELAY);
      });
  }
}