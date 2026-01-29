interface Entity {
  isbackground?: boolean;
}

interface PropertyBarItem {
  id: string;
  type: PropertyBarControlTypeEnum;
  order: number;
  uiMode: HSFPConstants.UIMode[];
  src: string;
  label: string;
  onClick: () => void;
}

interface GetItemsParams {
  entities: Entity[];
  app: {
    cmdManager: CommandManager;
  };
}

interface CommandManager {
  createCommand(commandType: string, args: Entity[]): Command;
  execute(command: Command): void;
}

interface Command {}

interface CommonItems {
  getDeleteItem(params: GetItemsParams): PropertyBarItem;
}

interface LeftMenuPlugin {
  commonItems?: CommonItems;
}

enum PropertyBarControlTypeEnum {
  imageButton = 'imageButton'
}

export const CircleArc2d = {
  name: 'CircleArc2d',

  isApplied(entities: Entity[]): boolean {
    return entities.some((entity) => {
      return entity instanceof HSCore.Model.CircleArc2d;
    });
  },

  getItems(params: GetItemsParams): PropertyBarItem[] {
    const { entities, app } = params;
    const items: PropertyBarItem[] = [];
    const firstEntity = entities[0];
    const leftMenuPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.LeftMenu
    ) as LeftMenuPlugin | null;

    if (leftMenuPlugin?.commonItems) {
      const deleteItem = leftMenuPlugin.commonItems.getDeleteItem;
      if (!firstEntity.isbackground) {
        items.push(deleteItem(params));
      }
    }

    if (
      HSApp.Util.NCustomizedFeatureModel.isNCustomizedEnv() &&
      entities.length === 1
    ) {
      items.push({
        id: 'sectionandelevationcopy',
        type: PropertyBarControlTypeEnum.imageButton,
        order: 151,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        src: SvgMap.duplicate,
        label: ResourceManager.getString('content_contextmenu_duplicate_title'),
        onClick: () => {
          const cmdManager = app.cmdManager;
          const command = cmdManager.createCommand(
            HSFPConstants.CommandType.NCustomizedFeatureModel.CmdSectionAndElevationCopy,
            [firstEntity]
          );
          cmdManager.execute(command);
        }
      });
    }

    return items;
  }
};