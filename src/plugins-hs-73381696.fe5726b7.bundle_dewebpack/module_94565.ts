import { HSCore } from './HSCore';
import { 
  getDuplicateItem, 
  getLockItem, 
  getHideItem, 
  getDeleteItem, 
  getReplaceItem, 
  getFlipItem,
  favoriteRemove,
  duplicate
} from './propertyBarItems';
import { SvgMap } from './svgMap';
import { Utils } from './utils';
import { replaceEvent } from './events';

interface Entity {
  contentType?: {
    isTypeOf(type: string): boolean;
  };
  metadata?: {
    categories?: unknown[];
    creator?: string;
  };
  creator?: string;
  isFlagOff(flag: number): boolean;
}

interface App {
  selectionManager: {
    selected(includeAll: boolean): Entity[];
  };
  pluginManager: {
    getPlugin(pluginType: string): Plugin | null;
  };
  cmdManager: {
    createCommand(commandType: string, args: unknown[]): Command;
    execute(command: Command): void;
  };
}

interface Plugin {
  onUIAddMaterialBtnClk?(): void;
  onUIEditBtnClk?(): void;
  uploadCustomizedContent?(entity: Entity): void;
  getBenefitAmount?(): number | undefined;
  showMarketModal?(): void;
}

interface Command {
  // Command implementation details
}

interface PropertyBarContext {
  entities: Entity[];
  app: App;
}

interface PropertyBarItem {
  id?: string;
  type?: string;
  order?: number;
  src?: string;
  label?: string;
  onClick?(): void;
  getBenefitAmount?(): number | undefined;
  showMarketModal?(): void;
}

interface OpenOption {
  isWainScot?: boolean;
  customizedmodel?: boolean;
}

interface ReplaceEventContext extends PropertyBarContext {
  openOption?: OpenOption;
}

interface PropertyBarConfig {
  name: string;
  isApplied(entities: Entity[]): boolean;
  getItems(context: PropertyBarContext): PropertyBarItem[];
}

declare const HSCatalog: {
  ContentTypeEnum: {
    ext_Wainscot: string;
  };
};

declare const PropertyBarControlTypeEnum: {
  imageButton: string;
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const HSFPConstants: {
  PluginType: {
    CustomizedModeling: string;
    UserInput: string;
    CustomizedPm: string;
  };
  CommandType: {
    CopyCustomizedPMInstanceModel: string;
  };
};

declare const adskUser: {
  uid: string;
};

export const wainScot: PropertyBarConfig = {
  name: 'wainScot',
  
  isApplied(entities: Entity[]): boolean {
    return entities.some((entity) => {
      return entity?.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot);
    });
  },
  
  getItems(context: PropertyBarContext): PropertyBarItem[] {
    if (context.entities.length > 1) {
      return [];
    }
    
    return [
      getDuplicateItem(context),
      getLockItem(context),
      getHideItem(context),
      getDeleteItem(context),
      {
        ...getReplaceItem(context),
        onClick(): void {
          replaceEvent({
            ...context,
            openOption: {
              isWainScot: true
            }
          });
        }
      },
      getFlipItem(context)
    ];
  }
};

export const customizedModel: PropertyBarConfig = {
  name: 'customizedModel',
  
  isApplied(entities: Entity[]): boolean {
    return entities.some((entity) => {
      return entity instanceof HSCore.Model.CustomizedModel;
    });
  },
  
  getItems(context: PropertyBarContext): PropertyBarItem[] {
    const { entities, app } = context;
    const firstEntity = entities[0];
    
    const items: PropertyBarItem[] = [
      getLockItem(context),
      getHideItem(context),
      getDeleteItem(context)
    ];
    
    if (firstEntity.isFlagOff(HSCore.Model.EntityFlagEnum.freezed)) {
      items.push(getDuplicateItem(context));
    }
    
    if (entities.length === 1) {
      if (firstEntity.isFlagOff(HSCore.Model.EntityFlagEnum.freezed)) {
        if (firstEntity?.metadata?.categories && firstEntity.metadata.categories.length !== 0) {
          items.push({
            ...getReplaceItem(context),
            onClick(): void {
              replaceEvent({
                ...context,
                openOption: {
                  customizedmodel: true
                }
              });
            }
          });
        }
        
        items.push(getFlipItem(context));
      }
      
      if (!Utils.isMoldingSelected()) {
        items.push({
          id: 'editMaterialButton',
          type: PropertyBarControlTypeEnum.imageButton,
          order: 10,
          src: 'edit_material',
          label: ResourceManager.getString('customizedtiles_edit_material'),
          onClick(): void {
            const plugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedModeling);
            plugin?.onUIAddMaterialBtnClk?.();
          }
        });
      }
      
      const isCreator = firstEntity.contentType && firstEntity.metadata?.creator === adskUser.uid 
        || firstEntity.creator === adskUser.uid;
      
      if (isCreator) {
        items.push({
          ...favoriteRemove,
          id: 'saveCustomizedModelButton',
          onClick(): void {
            const selectedEntity = app.selectionManager.selected(true)[0];
            const plugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedModeling);
            plugin?.uploadCustomizedContent?.(selectedEntity);
          }
        });
      }
      
      if (!Utils.isMoldingSelected() && !Utils.isParametricopeningSelected()) {
        items.push({
          id: 'editFeatureWallButton',
          type: PropertyBarControlTypeEnum.imageButton,
          order: 20,
          src: SvgMap.editModeling,
          label: ResourceManager.getString('plugin_right_propertybar_edit_model'),
          onClick(): void {
            const plugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedModeling);
            plugin?.onUIEditBtnClk?.();
          }
        });
      }
    }
    
    return items;
  }
};

export const customizedPMInstanceModel: PropertyBarConfig = {
  name: 'customizedPMInstanceModel',
  
  isApplied(entities: Entity[]): boolean {
    return entities.some((entity) => {
      return entity instanceof HSCore.Model.CustomizedPMInstanceModel;
    });
  },
  
  getItems(context: PropertyBarContext): PropertyBarItem[] {
    const { entities, app } = context;
    const firstEntity = entities[0];
    
    const items: PropertyBarItem[] = [
      getLockItem(context),
      getHideItem(context),
      getDeleteItem(context)
    ];
    
    if (firstEntity.isFlagOff(HSCore.Model.EntityFlagEnum.freezed)) {
      items.push({
        ...duplicate,
        onClick(): void {
          Utils.showDuplicateTip();
          const userInputPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.UserInput);
          const command = app.cmdManager.createCommand(
            HSFPConstants.CommandType.CopyCustomizedPMInstanceModel,
            [entities, 'leftmenu', userInputPlugin]
          );
          app.cmdManager.execute(command);
        }
      });
    }
    
    if (entities.length === 1) {
      const isCreator = firstEntity.contentType && firstEntity.metadata?.creator === adskUser.uid 
        || firstEntity.creator === adskUser.uid;
      
      if (isCreator) {
        items.push({
          ...favoriteRemove,
          id: 'saveCustomizedModelButton',
          onClick(): void {
            const selectedEntity = app.selectionManager.selected(true)[0];
            const plugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedPm);
            plugin?.uploadCustomizedContent?.(selectedEntity);
          }
        });
      }
      
      if (!Utils.isMoldingSelected() && !Utils.isParametricopeningSelected()) {
        items.push({
          id: 'editFeatureWallButton',
          type: PropertyBarControlTypeEnum.imageButton,
          order: 20,
          src: SvgMap.editModeling,
          label: ResourceManager.getString('plugin_right_propertybar_edit_model'),
          onClick(): void {
            const plugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedPm);
            plugin?.onUIEditBtnClk?.();
          },
          getBenefitAmount(): number | undefined {
            const plugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedPm);
            return plugin?.getBenefitAmount?.();
          },
          showMarketModal(): void {
            const plugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedPm);
            plugin?.showMarketModal?.();
          }
        });
      }
    }
    
    return items;
  }
};