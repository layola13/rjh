import { useState, useEffect, createElement } from 'react';
import { SmartText } from './SmartText';
import { isVip, popVip } from './vipUtils';

interface StairData {
  seekId: string;
  image: string;
  name: string;
  vipModel?: boolean;
}

interface Entity {
  seekId: string;
}

interface StairTypesProps {
  data: StairData[];
  entity?: Entity;
}

interface Plugin {
  handler?: {
    replaceStair: (entity: Entity, seekId: string) => void;
  };
  closeIndependent?: () => void;
}

interface PluginManager {
  getPlugin: (pluginType: string) => Plugin | null;
}

interface UserTrackLogger {
  push: (event: string, data: Record<string, unknown>, extra?: Record<string, unknown>) => void;
}

interface App {
  pluginManager: PluginManager;
  userTrackLogger: UserTrackLogger;
}

interface HSAppGlobal {
  App: {
    getApp: () => App;
  };
  Config: {
    TENANT: string;
  };
  Catalog: {
    Manager: {
      showPageByCategoryId: (config: { categoryId: string; menuId: string }) => void;
    };
    DataConfig: {
      MenuIdEnum: {
        modelLibrary: string;
      };
    };
  };
}

interface ResourceManagerGlobal {
  getString: (key: string) => string;
}

declare global {
  const HSApp: HSAppGlobal;
  const HSFPConstants: {
    PluginType: {
      ParametricStair: string;
      Catalog: string;
    };
  };
  const ResourceManager: ResourceManagerGlobal;
}

class StairScrollState {
  public scrollTop?: number;
}

const stairScrollState = new StairScrollState();

const WRAPPER_CLASS = 'property-bar-stairtypes-wrapper';
const INITIAL_SCROLL_THRESHOLD = 6;
const INITIAL_SCROLL_OFFSET = 70;
const MORE_TAG_ID = 'more-tag';

const FP_TENANT = 'fp';
const FP_CATEGORY_ID = '99668c03-c3dd-4210-90f1-eb5eb037047f';
const DEFAULT_CATEGORY_ID = 'f6e36a73-23ad-48ff-9f00-cf43a4bfc00f';

const StairTypes: React.FC<StairTypesProps> = ({ data, entity }) => {
  const [activeSeekId, setActiveSeekId] = useState<string | undefined>(entity?.seekId);

  const isVipModel = (stairData: StairData): boolean => {
    return !!stairData.vipModel;
  };

  const handleStairReplace = (selectedEntity: Entity, stairData: StairData): void => {
    setActiveSeekId(stairData.seekId);

    if (isVipModel(stairData) && !isVip()) {
      popVip();
      return;
    }

    const app = HSApp.App.getApp();
    const stairPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ParametricStair);
    
    stairPlugin?.handler?.replaceStair(selectedEntity, stairData.seekId);

    const wrapperElement = document.getElementsByClassName(WRAPPER_CLASS)[0] as HTMLElement;
    if (wrapperElement) {
      stairScrollState.scrollTop = wrapperElement.scrollTop;
    }

    app.userTrackLogger.push('hsw.property.stair.replace', {
      description: '替换楼梯',
      activeSection: 'StairStyleReplace',
      activeSectionName: '属性面板替换楼梯操作',
      clicksRatio: {
        id: stairData.seekId,
        name: stairData.name,
      },
    }, {});
  };

  const handleMoreStairs = (): void => {
    setActiveSeekId(MORE_TAG_ID);

    const app = HSApp.App.getApp();
    const catalogPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    catalogPlugin?.closeIndependent?.();

    const categoryId = HSApp.Config.TENANT === FP_TENANT ? FP_CATEGORY_ID : DEFAULT_CATEGORY_ID;

    HSApp.Catalog.Manager.showPageByCategoryId({
      categoryId,
      menuId: HSApp.Catalog.DataConfig.MenuIdEnum.modelLibrary,
    });

    app.userTrackLogger.push('hsw.property.stair.replace', {
      description: '修改楼梯样式',
      activeSection: 'StairStyleReplace',
      activeSectionName: '属性面板替换楼梯操作',
      clicksRatio: {
        id: MORE_TAG_ID,
        name: ResourceManager.getString('property_more_stairs'),
      },
    }, {});
  };

  const renderVipBadge = (stairData: StairData): React.ReactNode => {
    if (isVipModel(stairData) && !isVip()) {
      return createElement('div', {
        className: 'crown stair-vip',
        onClick: () => {
          if (!isVip()) {
            popVip();
          }
        },
      }, createElement('img', { src: '/path/to/crown-icon.png' }));
    }
    return null;
  };

  useEffect(() => {
    const entityIndex = data.findIndex((item) => item.seekId === entity?.seekId);
    const scrollTopValue = entityIndex < INITIAL_SCROLL_THRESHOLD ? 0 : INITIAL_SCROLL_OFFSET;

    const wrapperElement = document.getElementsByClassName(WRAPPER_CLASS)[0] as HTMLElement;
    if (wrapperElement) {
      if (stairScrollState.scrollTop === undefined) {
        wrapperElement.scrollTop = scrollTopValue;
      } else {
        wrapperElement.scrollTop = stairScrollState.scrollTop;
        stairScrollState.scrollTop = undefined;
      }
    }
  }, []);

  return createElement('div', { className: WRAPPER_CLASS },
    createElement('div', { className: 'property-bar-stairtypes-container' },
      data.map((stairData) =>
        createElement('div', {
          className: stairData.seekId === activeSeekId ? 'active' : '',
          key: stairData.seekId,
        },
          createElement('div', { className: 'stair-img' },
            createElement('img', {
              src: stairData.image,
              onClick: () => entity && handleStairReplace(entity, stairData),
            }),
            createElement('div', { className: 'stair-name' },
              createElement(SmartText, null, stairData.name)
            )
          ),
          renderVipBadge(stairData)
        )
      ),
      createElement('div', {
        className: MORE_TAG_ID === activeSeekId ? 'active' : '',
        onClick: handleMoreStairs,
      },
        createElement('div', { className: 'stair-img stair-more' },
          createElement('img', { src: '/path/to/more-icon.png' }),
          createElement('div', { className: 'stair-name' },
            createElement('span', { className: 'name' }, ResourceManager.getString('property_more_stairs')),
            createElement('span', { className: 'arrow' }, '>')
          )
        )
      )
    )
  );
};

export default StairTypes;