import { HSCore } from './HSCore';
import { PropertyBarControlTypeEnum } from './PropertyBarControlTypeEnum';
import { SvgMap } from './SvgMap';
import { MenuBuilder } from './MenuBuilder';
import {
  getDeleteItem,
  getHideItem,
  getLockItem,
  getReplaceItem,
  getDuplicateItem,
  getFavoriteItem,
  flip,
  duplicate
} from './commonItems';

interface Entity {
  eId?: string;
  metadata?: {
    isFromEnterprise?: boolean;
    aliModelId?: string;
    categories?: string[];
    extension?: {
      objInfo?: {
        axis?: unknown;
      };
    };
  };
  isOpened?: boolean;
  getUniqueParent?: () => Entity | null;
}

interface ContextMenuOptions {
  entities: Entity[];
  app: Application;
  is3D: boolean;
}

interface Application {
  activeEnvironmentId: string;
  cmdManager: CommandManager;
  cmdMgr: CommandManager;
  pluginManager: PluginManager;
  switchPrimaryViewMode: (mode: string, options: Record<string, unknown>) => void;
  is3DViewActive: () => boolean;
}

interface CommandManager {
  createCommand: (type: string, args: unknown[]) => Command;
  execute: (command: Command) => void;
  complete: (command: Command) => void;
}

interface Command {}

interface PluginManager {
  getPlugin: (type: string) => Plugin | null;
}

interface Plugin {
  handler?: {
    handleWallPaper: () => void;
  };
  startStyler?: (entity: Entity) => void;
  onOpenDoor?: (entity: Entity) => void;
  onCloseDoor?: (entity: Entity) => void;
}

interface MenuItem {
  id: string;
  type?: PropertyBarControlTypeEnum;
  order: number;
  src?: string;
  label: string;
  onClick: () => void;
  hideAfterClick?: boolean;
  stateReducer?: (state: MenuItem) => MenuItem;
}

interface ContextMenu {
  name: string;
  isApplied: (entities: Entity[]) => boolean;
  getItems: (options: ContextMenuOptions) => MenuItem[];
}

const LIVE_HINT_DURATION = 3000;

const replaceMaterialButton: MenuItem = {
  id: "replacematerial",
  type: PropertyBarControlTypeEnum.imageButton,
  order: 103,
  src: SvgMap.replaceMaterial,
  label: ResourceManager.getString("mixpaint_replace_material"),
  onClick: (): void => {
    const app = HSApp.App.getApp();
    const environmentId = app.activeEnvironmentId;
    const eventTrack = HSApp.Util.EventTrack.instance();
    const viewType = app.is3DViewActive() ? "3D" : "2D";

    eventTrack.track(HSApp.Util.EventGroupEnum.Rightmenu, "mixpaint_replace_material_event", {
      IF_env: environmentId,
      viewType
    });

    const wallDecorationPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.WallDecoration);
    wallDecorationPlugin?.handler?.handleWallPaper();
  }
};

export const wall: ContextMenu = {
  name: "wall",
  isApplied: (entities: Entity[]): boolean => {
    return entities.some((entity) => entity instanceof HSCore.Model.Wall);
  },
  getItems: (options: ContextMenuOptions): MenuItem[] => {
    const { entities, app } = options;
    const items: MenuItem[] = [getDeleteItem(options)];

    if (entities.length === 1) {
      items.push({
        ...getHideItem(options),
        onClick: (): void => {
          const entitiesToHide: Entity[] = [];

          entities.forEach((entity) => {
            if (HSApp.Util.Content.canHide(entity)) {
              HSApp.Util.Content.getHideWallEntitys(entity).forEach((hiddenEntity: Entity) => {
                entitiesToHide.push(hiddenEntity);
              });
              entitiesToHide.push(entity);
            } else {
              LiveHint.show(ResourceManager.getString("plugin_leftmenu_hide_wall"), LIVE_HINT_DURATION, null, {
                status: LiveHint.statusEnum.warning,
                canclose: true
              });
            }
          });

          const cmdManager = app.cmdManager;
          const command = cmdManager.createCommand(HSFPConstants.CommandType.DisplayContents, [entitiesToHide, false]);
          cmdManager.execute(command);
          cmdManager.complete(command);
        }
      });
    }

    return items;
  }
};

export const opening: ContextMenu = {
  name: "opening",
  isApplied: (entities: Entity[]): boolean => {
    return entities.some((entity) => entity instanceof HSCore.Model.Opening);
  },
  getItems: (options: ContextMenuOptions): MenuItem[] => {
    const { entities, is3D, app } = options;
    const items: MenuItem[] = [getDeleteItem(options), getLockItem(options)];

    if (entities.length > 1) {
      return items;
    }

    const entity = entities[0];

    items.push(
      getReplaceItem(options),
      getDuplicateItem(options),
      {
        ...flip,
        onClick: (): void => {
          const cmdManager = app.cmdManager;
          const command = cmdManager.createCommand(HSFPConstants.CommandType.FlipOpening, [entity]);
          cmdManager.execute(command);
        }
      },
      getFavoriteItem(options)
    );

    items.push({
      label: ResourceManager.getString("plugin_contentstyler_attibutes"),
      id: "applystyle",
      src: SvgMap.copy_attribute,
      order: 141,
      onClick: (): void => {
        const contentStylerPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ContentStyler);
        contentStylerPlugin?.startStyler?.(entity);
      }
    });

    if (is3D) {
      items.push(replaceMaterialButton);

      if (
        entity instanceof HSCore.Model.Door &&
        entity.metadata?.extension?.objInfo?.axis
      ) {
        let isDoorOpened = entity.isOpened ?? false;
        const getOpenCloseLabel = (isOpened: boolean): string =>
          ResourceManager.getString(isOpened ? "plugin_opendoor_close" : "plugin_opendoor_open");

        items.push({
          label: getOpenCloseLabel(isDoorOpened),
          id: "openDoor",
          src: isDoorOpened ? SvgMap.door_close : SvgMap.door_open,
          order: 106,
          hideAfterClick: false,
          stateReducer: (state: MenuItem): MenuItem => {
            const label = getOpenCloseLabel(isDoorOpened);
            const src = isDoorOpened ? SvgMap.door_close : SvgMap.door_open;
            return { ...state, label, src };
          },
          onClick: (): void => {
            const openDoorPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.OpenDoor);
            if (openDoorPlugin) {
              if (isDoorOpened) {
                openDoorPlugin.onCloseDoor?.(entity);
                isDoorOpened = false;
              } else {
                openDoorPlugin.onOpenDoor?.(entity);
                isDoorOpened = true;
              }
            }
          }
        });
      }
    }

    return items;
  }
};

export const hole: ContextMenu = {
  name: "hole",
  isApplied: (entities: Entity[]): boolean => {
    return entities.some((entity) => entity instanceof HSCore.Model.Hole);
  },
  getItems: (options: ContextMenuOptions): MenuItem[] => {
    const { entities, is3D } = options;
    const items: MenuItem[] = [getDeleteItem(options), getLockItem(options)];

    if (entities.length === 1) {
      items.push(getDuplicateItem(options), getReplaceItem(options));

      if (is3D) {
        items.push(replaceMaterialButton);
      }
    }

    return items;
  }
};

export const parametricOpening: ContextMenu = {
  name: "parametricOpening",
  isApplied: (entities: Entity[]): boolean => {
    return entities.some((entity) => entity instanceof HSCore.Model.ParametricOpening);
  },
  getItems: (options: ContextMenuOptions): MenuItem[] => {
    const { entities, is3D, app } = options;
    const items: MenuItem[] = [getDuplicateItem(options), getLockItem(options)];

    if (entities.length > 1) {
      return items;
    }

    items.push(
      {
        ...getReplaceItem(options),
        onClick: (): void => {
          const { entities, app } = options;
          const entity = entities[0];
          const replaceOptions: Record<string, unknown> = {};

          if (entity.metadata?.isFromEnterprise) {
            Object.assign(replaceOptions, {
              parentModelId: entity.metadata.aliModelId,
              eId: entity.eId,
              sceneType: "hardcover_params_backdrop_product",
              categoryIds: entity.metadata.categories ? [entity.metadata.categories[0]] : [],
              customizedTabs: MenuBuilder.getInstance().getEnterpriseTabData(entity)
            });
          }

          const cmdManager = app.cmdManager;
          const executeReplace = (): void => {
            const command = app.cmdMgr.createCommand(HSFPConstants.CommandType.SmartReplaceContent, [entity, replaceOptions]);
            app.cmdMgr.execute(command);
          };

          if (!HSApp.PaintPluginHelper.Util.MixPaintUtil.disconnectFaceGroupWithPrompt([entity], undefined, executeReplace)) {
            const command = cmdManager.createCommand(HSFPConstants.CommandType.SmartReplaceContent, [entity, replaceOptions]);
            cmdManager.execute(command);
          }
        }
      },
      getDeleteItem(options),
      getFavoriteItem(options)
    );

    const entity = entities[0];

    if (
      entities[0] instanceof HSCore.Model.ParametricDoor &&
      !HSCore.Util.Content.isParametricWindow(entities[0]?.metadata)
    ) {
      items.push({
        ...flip,
        onClick: (): void => {
          const cmdManager = app.cmdManager;
          const command = cmdManager.createCommand(HSFPConstants.CommandType.FlipOpening, [entity]);
          cmdManager.execute(command);
        }
      });
    }

    if (is3D) {
      items.push(replaceMaterialButton);

      if (entities[0].getUniqueParent?.() instanceof HSCore.Model.ParametricOpening) {
        return [];
      }
    }

    return items;
  }
};

export const NCustomizedStructure: ContextMenu = {
  name: "NCustomizedStructure",
  isApplied: (entities: Entity[]): boolean => {
    return entities.some(
      (entity) =>
        entity instanceof HSCore.Model.NCustomizedBeam ||
        entity instanceof HSCore.Model.NCustomizedStructure
    );
  },
  getItems: (options: ContextMenuOptions): MenuItem[] => {
    const { is3D, app, entities } = options;
    const items: MenuItem[] = [getLockItem(options), getDeleteItem(options)];

    const excludedEnvironments = [
      HSFPConstants.Environment.NCustomizedCeilingModel,
      HSFPConstants.Environment.NCustomizedBackgroundWall,
      HSFPConstants.Environment.NCustomizedPlatform
    ];

    if (!excludedEnvironments.includes(app.activeEnvironmentId)) {
      items.unshift({
        ...duplicate,
        onClick: (): void => {
          const areAllBeams = entities.every((entity) => entity instanceof HSCore.Model.NCustomizedBeam);

          if (areAllBeams) {
            HSApp.App.getApp().switchPrimaryViewMode(HSApp.View.ViewModeEnum.RCP, {});
          } else {
            HSApp.App.getApp().switchPrimaryViewMode(HSApp.View.ViewModeEnum.Plane, {});
          }

          const cmdManager = app.cmdManager;
          const command = cmdManager.createCommand(HSFPConstants.CommandType.Duplicate, [{}]);
          cmdManager.execute(command);
        }
      });
    }

    if (is3D) {
      const hasOutlet = entities.some((entity) => entity instanceof HSCore.Model.NCustomizedOutlet);
      if (hasOutlet) {
        return items;
      }
      items.push(replaceMaterialButton);
    }

    return items;
  }
};