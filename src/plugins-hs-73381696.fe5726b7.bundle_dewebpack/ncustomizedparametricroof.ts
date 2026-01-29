import { SvgMap } from './SvgMap';
import { HSCore } from './HSCore';
import { getLockItem, getHideItem, getDeleteItem } from './CommonItems';
import { isFunction } from './Utils';
import { ENParamRoofType } from './ENParamRoofType';

interface Entity {
  id: string;
  [key: string]: unknown;
}

interface SelectionContext {
  entities: Entity[];
}

interface PropertyBarItem {
  id: string;
  type: PropertyBarControlTypeEnum;
  label: string;
  src: string;
  order: number;
  onClick: () => void;
}

interface DisplayListItem {
  getChoiceFaceName?: () => string | null;
}

interface RoomLoop {
  getAllCurves(): unknown[];
}

interface RoofParameters {
  roofType: ENParamRoofType;
  roomLoop?: RoomLoop;
}

interface ParametricRoofEntity extends Entity {
  parameters: RoofParameters;
}

interface ParametricRoofPlugin {
  handler: {
    clearFaceMaterial(): void;
    showReplaceMaterialPanel(): void;
  };
}

interface Command {
  execute(command: unknown): void;
  createCommand(commandType: string, args: unknown[]): unknown;
}

interface CommandManager {
  createCommand(commandType: string, args: unknown[]): unknown;
  execute(command: unknown): void;
}

interface PluginManager {
  getPlugin(pluginType: string): ParametricRoofPlugin;
}

interface View3D {
  displayList: Record<string, DisplayListItem>;
}

interface Application {
  getActive3DView(): View3D;
  pluginManager: PluginManager;
  cmdManager: CommandManager;
}

declare const PropertyBarControlTypeEnum: {
  imageButton: string;
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const HSApp: {
  App: {
    getApp(): Application;
  };
};

declare const HSFPConstants: {
  PluginType: {
    ParametricRoof: string;
  };
  CommandType: {
    UpdateRoofDirection: string;
  };
};

export const NCustomizedParametricRoof = {
  name: "NCustomizedParametricRoof",

  isApplied(entities: Entity[]): boolean {
    return entities.some((entity) => {
      return entity instanceof HSCore.Model.NCustomizedParametricRoof;
    });
  },

  getItems(context?: SelectionContext): PropertyBarItem[] {
    const hasChoiceFace = context?.entities.findIndex((entity) => {
      const displayItem = HSApp.App.getApp().getActive3DView().displayList[entity.id];
      return !!(
        isFunction(displayItem?.getChoiceFaceName) &&
        displayItem.getChoiceFaceName()
      );
    });

    if (hasChoiceFace !== -1) {
      return [
        {
          id: "clearmaterial",
          type: PropertyBarControlTypeEnum.imageButton,
          label: ResourceManager.getString("mixpaint_clearshape_material"),
          src: SvgMap.clearmaterial,
          order: 165,
          onClick(): void {
            HSApp.App.getApp()
              .pluginManager.getPlugin(HSFPConstants.PluginType.ParametricRoof)
              .handler.clearFaceMaterial();
          },
        },
      ];
    }

    const items: PropertyBarItem[] = [
      {
        id: "replacematerial",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 103,
        src: SvgMap.replaceMaterial,
        label: ResourceManager.getString("roof_replace_material"),
        onClick(): void {
          HSApp.App.getApp()
            .pluginManager.getPlugin(HSFPConstants.PluginType.ParametricRoof)
            .handler.showReplaceMaterialPanel();
        },
      },
      getLockItem(context),
      getHideItem(context),
      getDeleteItem(context),
    ];

    const roofEntity = context?.entities?.find((entity): entity is ParametricRoofEntity => {
      return entity instanceof HSCore.Model.NCustomizedParametricRoof;
    });

    if (
      roofEntity &&
      (roofEntity.parameters.roofType === ENParamRoofType.HerringBone ||
        roofEntity.parameters.roofType === ENParamRoofType.SaltBox ||
        roofEntity.parameters.roofType === ENParamRoofType.BoxGable)
    ) {
      items.push({
        id: "directionchange",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 200,
        src: "hs_mian_directionchange",
        label: ResourceManager.getString("roof_direction_change"),
        onClick(): void {
          const commandManager = HSApp.App.getApp().cmdManager;
          if (roofEntity?.parameters.roomLoop) {
            const curve = roofEntity.parameters.roomLoop.getAllCurves()[1];
            if (curve) {
              const command = commandManager.createCommand(
                HSFPConstants.CommandType.UpdateRoofDirection,
                [roofEntity, curve]
              );
              commandManager.execute(command);
            }
          }
        },
      });
    }

    return items;
  },
};