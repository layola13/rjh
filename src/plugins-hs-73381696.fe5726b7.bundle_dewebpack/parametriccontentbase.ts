import { HSCore } from './HSCore';
import { getReplaceItem, getDuplicateItem, getLockItem, getHideItem, getFavoriteItem, getDeleteItem, getScaleItem } from './menuItemHelpers';

interface Entity {
  metadata: {
    aliModelId: string;
    categories: string[];
  };
  eId: string;
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
}

interface Command {}

interface App {
  cmdManager: CommandManager;
}

interface GetItemsParams {
  entities: Entity[];
  is3D: boolean;
  app: App;
}

interface MenuItem {
  onClick?: () => void;
  [key: string]: unknown;
}

interface ReplaceSceneConfig {
  parentModelId: string;
  eId: string;
  sceneType: string;
  categoryIds: string[];
}

export const ParametricContentBase = {
  name: "ParametricContentBase",

  isApplied(entities: Entity[]): boolean {
    return entities.some((entity) => {
      return entity instanceof HSCore.Model.ParametricContentBase;
    });
  },

  getItems(params: GetItemsParams): MenuItem[] {
    const { entities, is3D, app } = params;

    const items: MenuItem[] = [
      {
        ...getReplaceItem(params),
        onClick() {
          const entity = entities[0];
          const sceneConfig: ReplaceSceneConfig = {
            parentModelId: entity.metadata.aliModelId,
            eId: entity.eId,
            sceneType: "hardcover_params_backdrop_product",
            categoryIds: [entity.metadata.categories[0]]
          };

          const commandManager = app.cmdManager;
          const command = commandManager.createCommand(
            HSFPConstants.CommandType.SmartReplaceContent,
            [entity, sceneConfig]
          );
          commandManager.execute(command);
        }
      },
      getDuplicateItem(params),
      getLockItem(params),
      getHideItem(params),
      getFavoriteItem(params),
      getDeleteItem(params)
    ];

    if (is3D) {
      items.push(getScaleItem(params));
    }

    return items;
  }
};