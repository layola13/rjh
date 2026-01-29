import { Utils } from './Utils';
import { SvgMap } from './SvgMap';
import { HSCore } from './HSCore';
import {
  getLockItem,
  getHideItem,
  getDeleteItem,
  getGroupItem,
  getDistributionItem,
  getUnGroupItem,
  getUploadGroupItem,
  getAlignItem,
  getSmartLayoutItem,
  replace
} from './menuItems';

interface Entity {
  isScalable?: boolean;
  isFlagOn(flag: number): boolean;
  metadata?: {
    categories?: unknown[];
  };
  Class?: string;
  getProxyObject(): unknown;
}

interface App {
  cmdManager: {
    createCommand(type: string, args: unknown[]): unknown;
    execute(command: unknown): void;
  };
  environmentManager: {
    activeEnvironmentId: string;
  };
  pluginManager: {
    getPlugin(type: string): Plugin;
  };
  getActive3DView(): {
    gizmoManager: {
      setSelectionType(type: string): void;
    };
  };
}

interface Plugin {
  uploadGroup?(entity: Entity): void;
  enterCustomizedProductsEnv?(room: unknown): void;
  getBenefitAmount?(): number | undefined;
  showMarketModal?(): void;
}

interface MenuContext {
  entities: Entity[];
  is3D?: boolean;
  app: App;
}

interface MenuItem {
  id: string;
  label: string;
  order: number;
  src?: string;
  type?: string;
  uiMode?: string[];
  disable?: boolean;
  onClick?: () => void;
  getBenefitAmount?: () => number | undefined;
  showMarketModal?: () => void;
}

interface MenuConfig {
  name: string;
  isApplied(entities: Entity[]): boolean;
  getItems(context: MenuContext): MenuItem[];
}

export const meshContent: MenuConfig = {
  name: 'meshContent',
  
  isApplied(entities: Entity[]): boolean {
    return entities.some(entity => entity instanceof HSCore.Model.MeshContent);
  },
  
  getItems(context: MenuContext): MenuItem[] {
    const { entities, is3D, app } = context;
    
    const baseItems: MenuItem[] = [
      getLockItem(context),
      getHideItem(context),
      getDeleteItem(context)
    ];
    
    if (entities.length > 1) {
      return baseItems.concat([
        getGroupItem(context),
        getDistributionItem(context)
      ]);
    }
    
    if (is3D) {
      const entity = entities[0];
      
      baseItems.push({
        label: ResourceManager.getString('plugin_style_material_replace_card_scale'),
        order: 25,
        id: 'content_scale',
        src: SvgMap.scale,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        disable: !entity.isScalable || entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed),
        onClick: () => {
          const selectionType = HSApp.View.GizmoSelectionType.Scale;
          app.getActive3DView().gizmoManager.setSelectionType(selectionType);
        }
      });
      
      baseItems.push({
        ...replace,
        id: 'zowee_rr_replace_content',
        order: 32,
        onClick: () => {
          const command = app.cmdManager.createCommand(
            HSFPConstants.CommandType.CmdReplaceZooWeeRRModel,
            []
          );
          app.cmdManager.execute(command);
        }
      });
    }
    
    return baseItems;
  }
};

export const tpzz: MenuConfig = {
  name: 'tpzz',
  
  isApplied(entities: Entity[]): boolean {
    return entities.some(entity => Utils.isCustomizedProduct(entity));
  },
  
  getItems(context: MenuContext): MenuItem[] {
    const { entities, app } = context;
    const isDefaultEnvironment = 
      app.environmentManager.activeEnvironmentId === HSFPConstants.Environment.Default;
    
    const items: MenuItem[] = [
      getDeleteItem(context),
      getSmartLayoutItem(context)
    ];
    
    if (!isDefaultEnvironment) {
      items.push(getHideItem(context));
    }
    
    const firstEntity = entities[0];
    
    if (entities.length > 1) {
      if (Utils.couldAlign(entities)) {
        items.push(getAlignItem(context));
      }
      return items.concat([
        getGroupItem(context),
        getDistributionItem(context)
      ]);
    }
    
    if (isDefaultEnvironment || firstEntity instanceof HSCore.Model.Group) {
      items.push(getUnGroupItem(context));
      
      const canUpload = adskUser.isLogin() &&
        Utils.canFav(entities) &&
        !(entities[0]?.metadata?.categories?.length > 0);
      
      if (canUpload) {
        items.push(getUploadGroupItem(context));
      }
    }
    
    if (!isDefaultEnvironment && 
        HSApp.Util.Entity.isRootEntity(firstEntity) && 
        Utils.canFav(firstEntity)) {
      const validClasses = [
        HSConstants.ModelClass.DAssembly,
        HSConstants.ModelClass.DExtruding,
        HSConstants.ModelClass.DContent
      ];
      
      if (validClasses.includes(firstEntity.Class) && firstEntity.getProxyObject()) {
        items.push({
          id: 'uploadProductButton',
          type: PropertyBarControlTypeEnum.imageButton,
          src: SvgMap.favRemove,
          order: 162,
          label: ResourceManager.getString('plugin_favoritelist_add'),
          onClick: () => {
            app.pluginManager
              .getPlugin(HSFPConstants.PluginType.MyGroup)
              .uploadGroup?.(firstEntity);
          }
        });
      }
    }
    
    if (isDefaultEnvironment) {
      const roomContent = HSCore.Util.Room.getRoomContentIn(firstEntity);
      const customizedPlugin = app.pluginManager.getPlugin(
        HSFPConstants.PluginType.CustomizedProducts
      );
      
      items.push({
        id: 'customizedProductsEdit',
        type: PropertyBarControlTypeEnum.imageButton,
        label: ResourceManager.getString('plugin_customizedproducts_edit'),
        src: SvgMap.editCabinet,
        order: 10,
        onClick: () => {
          customizedPlugin.enterCustomizedProductsEnv?.(roomContent);
        },
        getBenefitAmount: () => {
          return customizedPlugin.getBenefitAmount?.();
        },
        showMarketModal: () => {
          customizedPlugin.showMarketModal?.();
        }
      });
    }
    
    return items;
  }
};