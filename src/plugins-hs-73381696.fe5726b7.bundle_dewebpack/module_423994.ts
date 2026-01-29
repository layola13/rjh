import { HSCatalog, HSFPConstants, HSApp, ResourceManager, HSConstants, adskUser } from './types';
import { HSCore } from './HSCore';
import {
  getLockItem,
  getHideItem,
  getDeleteItem,
  getGroupItem,
  getDistributionItem,
  getReplaceItem,
  getFavoriteItem,
  getDuplicateItem,
  getAlignItem,
  getUnGroupItem,
  getUploadGroupItem,
  getFlipItem,
  getSmartLayoutItem,
  getArrayItem,
  getScaleItem,
  flip
} from './menuItems';
import { SvgMap } from './SvgMap';
import { Utils } from './Utils';

interface Entity {
  seekId?: string;
  contentType?: {
    isTypeOf(type: string): boolean;
  };
  metadata?: {
    categories?: unknown[];
  };
  Class?: string;
}

interface ContextMenuOptions {
  entities: Entity[];
  app?: {
    cmdManager: {
      createCommand(type: string, args: unknown[]): unknown;
      execute(command: unknown): void;
    };
  };
  is3D?: boolean;
}

interface MenuItem {
  label: string;
  id: string;
  src?: string;
  order?: number;
  uiMode?: string[];
  onClick?: () => void;
  children?: MenuItem[];
}

interface ContextMenuPlugin {
  name: string;
  isApplied(entities: Entity[]): boolean;
  getItems(options: ContextMenuOptions): MenuItem[];
}

enum WindType {
  Soft = 'Soft',
  Medium = 'Medium',
  Strong = 'Strong'
}

export const softCloth: ContextMenuPlugin = {
  name: 'softCloth',
  
  isApplied(entities: Entity[]): boolean {
    return entities.some(entity => 
      entity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_SoftCloth)
    );
  },
  
  getItems(options: ContextMenuOptions): MenuItem[] {
    const { entities } = options;
    const seekId = entities[0].seekId;
    const baseItems: MenuItem[] = [
      getLockItem(options),
      getHideItem(options),
      getDeleteItem(options)
    ];

    if (entities.length > 1) {
      return baseItems.concat([
        getGroupItem(options),
        getDistributionItem(options)
      ]);
    }

    baseItems.push(
      getReplaceItem(options),
      getFavoriteItem(options)
    );

    if (entities[0].contentType?.isTypeOf(HSCatalog.ContentTypeEnum.SoftClothCurtain)) {
      baseItems.push({
        label: ResourceManager.getString('content_contextmenu_placesoftclothcurtain'),
        id: 'place',
        src: SvgMap.place,
        order: 40,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        children: [
          {
            label: ResourceManager.getString('content_contextmenu_placesoftclothcurtain_soft'),
            id: 'soft',
            onClick: () => {
              Utils.softClothTrack(seekId, 'light');
              HSApp.Util.SoftCloth.simulateCloth(entities[0], {
                windType: WindType.Soft
              });
            }
          },
          {
            label: ResourceManager.getString('content_contextmenu_placesoftclothcurtain_medium'),
            id: 'medium',
            onClick: () => {
              Utils.softClothTrack(seekId, 'moderate');
              HSApp.Util.SoftCloth.simulateCloth(entities[0], {
                windType: WindType.Medium
              });
            }
          },
          {
            label: ResourceManager.getString('content_contextmenu_placesoftclothcurtain_strong'),
            id: 'strong',
            onClick: () => {
              Utils.softClothTrack(seekId, 'strong');
              HSApp.Util.SoftCloth.simulateCloth(entities[0], {
                windType: WindType.Strong
              });
            }
          }
        ]
      });
    } else {
      baseItems.push({
        label: ResourceManager.getString('content_contextmenu_softcloth'),
        id: 'place',
        src: SvgMap.place,
        order: 40,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        onClick: () => {
          Utils.softClothTrack(seekId);
          HSApp.Util.SoftCloth.simulateCloth(entities[0]);
        }
      });
    }

    return baseItems;
  }
};

export const group: ContextMenuPlugin = {
  name: 'group',
  
  isApplied(entities: Entity[]): boolean {
    return entities.some(entity => entity instanceof HSCore.Model.Group);
  },
  
  getItems(options: ContextMenuOptions): MenuItem[] {
    const { entities, app } = options;
    const firstEntity = entities[0];
    const baseItems: MenuItem[] = [
      getDuplicateItem(options),
      getHideItem(options),
      getDeleteItem(options)
    ];

    if (entities.length > 1) {
      if (Utils.couldAlign(entities)) {
        baseItems.push(getAlignItem(options));
      }
      return baseItems.concat([
        getGroupItem(options),
        getDistributionItem(options)
      ]);
    }

    baseItems.push(
      {
        ...flip,
        onClick: () => {
          const cmdManager = app?.cmdManager;
          if (cmdManager) {
            const command = cmdManager.createCommand(HSFPConstants.CommandType.FlipGroup, [firstEntity]);
            cmdManager.execute(command);
          }
        }
      },
      getArrayItem(options),
      getLockItem(options)
    );

    baseItems.push(getUnGroupItem(options));

    const hasCategories = firstEntity?.metadata?.categories && firstEntity.metadata.categories.length > 0;
    if (adskUser.isLogin() && Utils.canFav(firstEntity) && !hasCategories) {
      baseItems.push(getUploadGroupItem(options));
    }

    return baseItems;
  }
};

export const content: ContextMenuPlugin = {
  name: 'content',
  
  isApplied(entities: Entity[]): boolean {
    return entities.some(entity => entity instanceof HSCore.Model.Content);
  },
  
  getItems(options: ContextMenuOptions): MenuItem[] {
    const { entities, is3D } = options;
    const baseItems: MenuItem[] = [
      getDuplicateItem(options),
      getLockItem(options),
      getHideItem(options),
      getDeleteItem(options)
    ];

    if (entities.length > 1) {
      if (Utils.couldAlign(entities)) {
        baseItems.push(getAlignItem(options));
      }
      return baseItems.concat([
        getGroupItem(options),
        getDistributionItem(options)
      ]);
    }

    baseItems.push(
      getReplaceItem(options),
      getFlipItem(options),
      getSmartLayoutItem(options),
      getFavoriteItem(options)
    );

    if (Utils.isFurnish(entities)) {
      baseItems.push(getArrayItem(options));
    }

    if (is3D && entities[0].Class === HSConstants.ModelClass.NgContent) {
      baseItems.push(getScaleItem(options));
    }

    return baseItems;
  }
};