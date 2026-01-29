export interface Circle2dEntity {
  isbackground?: boolean;
}

export interface Circle2dContext {
  entities: Circle2dEntity[];
  app: {
    cmdManager: CommandManager;
  };
}

export interface CommandManager {
  createCommand(commandType: string, args: unknown[]): Command;
  execute(command: Command): void;
}

export interface Command {
  type: string;
  args: unknown[];
}

export interface PropertyBarItem {
  id: string;
  type: PropertyBarControlTypeEnum;
  order: number;
  uiMode: string[];
  src?: string;
  label?: string;
  onClick?: () => void;
}

export interface LeftMenuPlugin {
  commonItems?: {
    getDeleteItem: (context: Circle2dContext) => PropertyBarItem;
  };
}

export enum PropertyBarControlTypeEnum {
  imageButton = 'imageButton'
}

export namespace HSCore.Model {
  export class Circle2d {}
}

export const Circle2d = {
  name: "Circle2d",

  isApplied(entities: unknown[]): boolean {
    return entities.some((entity) => {
      return entity instanceof HSCore.Model.Circle2d;
    });
  },

  getItems(context: Circle2dContext): PropertyBarItem[] {
    const { entities, app } = context;
    const items: PropertyBarItem[] = [];
    const firstEntity = entities[0];

    const leftMenuPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.LeftMenu
    ) as LeftMenuPlugin | undefined;

    if (leftMenuPlugin?.commonItems) {
      const deleteItem = leftMenuPlugin.commonItems.getDeleteItem;
      if (!firstEntity.isbackground) {
        items.push(deleteItem(context));
      }
    }

    if (HSApp.Util.NCustomizedFeatureModel.isNCustomizedEnv() && entities.length === 1) {
      items.push({
        id: "sectionandelevationcopy",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 151,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        src: SvgMap.duplicate,
        label: ResourceManager.getString("content_contextmenu_duplicate_title"),
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