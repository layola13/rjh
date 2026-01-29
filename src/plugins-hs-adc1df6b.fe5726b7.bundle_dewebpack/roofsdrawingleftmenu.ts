enum PropertyBarControlTypeEnum {
  imageButton = "imageButton"
}

interface PropertyBarItem {
  id: string;
  type: PropertyBarControlTypeEnum;
  order: number;
  src: string;
  label: string;
  onClick: () => void;
  uiMode?: string[];
  disable?: boolean;
}

interface Entity {
  id: string;
  parameters: {
    roofType: number;
    roomLoop?: {
      getAllCurves: () => unknown[];
    };
  };
}

interface SelectionContext {
  entities: Entity[];
}

interface RoofsDrawingLeftMenuModule {
  name: string;
  isApplied: (entities: Entity[]) => boolean;
  getItems: (context?: SelectionContext) => PropertyBarItem[];
}

export const RoofsDrawingLeftMenu: RoofsDrawingLeftMenuModule = {
  name: "RoofsDrawingLeftMenu",

  isApplied(entities: Entity[]): boolean {
    return entities.some((entity) => {
      return entity instanceof HSCore.Model.NCustomizedParametricRoof;
    });
  },

  getItems(context?: SelectionContext): PropertyBarItem[] {
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
        }
      },
      {
        label: ResourceManager.getString("content_contextmenu_dete_title"),
        id: "delete",
        src: "delete",
        order: 166,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        disable: undefined,
        onClick(): void {
          const app = HSApp.App.getApp();
          const roofEntity = context?.entities.find((entity) => {
            return entity instanceof HSCore.Model.NCustomizedParametricRoof;
          });
          const drawingRegion = app.floorplan.scene.activeLayer.roofsDrawing.getDrawingRegionByRoofId(roofEntity?.id);
          const commandManager = app.cmdManager;

          if (drawingRegion) {
            const command = commandManager.createCommand(
              HSFPConstants.CommandType.RoofsDrawing.DeleteRoofRegion,
              [drawingRegion]
            );
            commandManager.execute(command);
            commandManager.complete();
          }
        }
      }
    ];

    const roofEntity = context?.entities?.find((entity) => {
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
        }
      });
    }

    return items;
  }
};