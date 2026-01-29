import { useState, useEffect, createElement } from 'react';
import React from 'react';

export enum PoolEnum {
  HighQualityPool = 'high_quality_pool',
  HighCommissionPool = 'high_commission_pool',
}

export enum PageType {
  LandingPage = 'landingPage',
  ProductPage = 'ProductPage',
  ModelPage = 'ModelPage',
}

interface PoolConfig {
  poolId: string;
  categoryId: string;
}

interface ModelLibraryPool {
  high_quality: PoolConfig;
  high_commission: PoolConfig;
}

interface SearchConfig {
  offset: number;
  limit: number;
  treeId: string;
  text?: string;
  categoriesIds?: string;
  poolId?: string;
  attrPoolTagId?: string;
}

interface CategoryAttribute {
  typeId: string;
  free?: string[];
}

interface Category {
  id: string;
  custAttr?: string;
  attributes?: CategoryAttribute[];
}

interface CategoriesResponse {
  categories: Category[];
}

interface MenuData {
  id: string;
  data?: Category[];
  custAttr?: string;
}

interface HeaderBackData {
  onHeaderBack: () => void;
  backTitle: string;
}

interface ProductPageConfig {
  headerBackData: HeaderBackData;
  showTreeControl: boolean;
  catalogData: CategoriesResponse;
  showHeaderBack: boolean;
  config: SearchConfig;
  title: string;
  searchData: (config: SearchConfig) => Promise<unknown>;
  subMenuId: string;
  subMenuDataList: Category[];
}

interface SpecialTopicProps {
  pageType?: PageType;
  refreshNum?: number;
  catalogData?: { id: string };
  fromMyPaid?: boolean;
  entryText?: string;
  title?: string;
  poolId?: string;
  [key: string]: unknown;
}

interface LandingPageProps {
  entryText?: string;
  title?: string;
  searchProducts: (params: { categoriesIds?: string; text?: string }) => void;
  onPoolClick: (pool: PoolEnum) => void;
  specialTopicModelClick: (data: unknown) => void;
  fromMyPaid?: boolean;
  cacheTabsValue: (value: number) => void;
  tabsValue: number;
}

interface ModelPageProps {
  data: unknown;
  headerBackClick: () => void;
  refreshNum?: number;
}

declare global {
  const HSApp: {
    PartnerConfig: {
      MODEL_LIBRARY_POOL: ModelLibraryPool;
    };
    Util: {
      EventTrack: {
        instance: () => {
          track: (group: string, event: string) => void;
        };
      };
      EventGroupEnum: {
        Catalog: string;
      };
    };
    Catalog: {
      EventTrackManager: {
        getInstance: () => {
          signalCatalogToLog: (params: {
            logType: string;
            targetType: string;
            action: string;
            area: string;
            searchType: string;
          }) => void;
        };
      };
      Manager: {
        getCurrentMenuData: () => MenuData[];
        getDefaultProductPage: (config: ProductPageConfig) => React.ReactElement;
      };
      DataConfig: {
        MenuIdEnum: {
          modelLibrary: string;
        };
        CustomAttributeIdEnum: {
          specialTopic: string;
          merchantModelLibrary: string;
        };
      };
    };
    App: {
      getApp: () => {
        activeEnvironmentId: string;
      };
    };
  };
  const HSFPConstants: {
    Environment: {
      TPZZ: string;
    };
  };
  const ResourceManager: {
    getString: (key: string) => string;
  };
}

const ATTR_POOL_TAG_ID = 'attr-pool-tag-id';
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 30;

const TreeIdEnum = {
  GeneralCategoryRoot: 'general_category_root',
};

const ResourceApi = {
  getCategories: (params: { poolId: string; categoryId: string }): Promise<CategoriesResponse> => {
    return Promise.resolve({ categories: [] });
  },
  searchProducts: (config: SearchConfig): Promise<unknown> => {
    return Promise.resolve({});
  },
  searchActivities: (config: SearchConfig): Promise<unknown> => {
    return Promise.resolve({});
  },
};

let currentProductPage: React.ReactElement | null = null;

const LandingPage: React.FC<LandingPageProps> = () => React.createElement('div');
const ModelPage: React.FC<ModelPageProps> = () => React.createElement('div');

export default function SpecialTopicContainer(props: SpecialTopicProps): React.ReactElement {
  const {
    pageType = PageType.LandingPage,
    refreshNum,
    catalogData,
    fromMyPaid,
    entryText,
    title,
    ...restProps
  } = props;

  const [currentPageType, setCurrentPageType] = useState<PageType>(pageType);
  const [modelData, setModelData] = useState<unknown>(restProps);
  const [tabsValue, setTabsValue] = useState<number>(1);

  const modelLibraryPool = HSApp.PartnerConfig.MODEL_LIBRARY_POOL;
  let activePool = modelLibraryPool.high_quality;

  const eventTracker = HSApp.Util.EventTrack.instance();

  const handleBackToLanding = (): void => {
    setCurrentPageType(PageType.LandingPage);
    HSApp.Catalog.EventTrackManager.getInstance().signalCatalogToLog({
      logType: 'search',
      targetType: 'model',
      action: 'end',
      area: 'specialTopicPage',
      searchType: 'text',
    });
  };

  const handlePoolClick = (pool: PoolEnum): void => {
    let eventName = 'high_quality_model_library';

    if (pool === PoolEnum.HighCommissionPool) {
      activePool = modelLibraryPool.high_commission;
      eventName = 'high_commission_model_library';
    }

    if (eventName) {
      eventTracker.track(HSApp.Util.EventGroupEnum.Catalog, eventName);
    }

    loadPoolProducts(activePool, pool);
  };

  const handleModelClick = (data: unknown): void => {
    setModelData(data);
    setCurrentPageType(PageType.ModelPage);
  };

  const handleCacheTabsValue = (value: number): void => {
    setTabsValue(value);
  };

  const getCurrentMenuData = (): Category[] => {
    const menuData = HSApp.Catalog.Manager.getCurrentMenuData() ?? [];
    const modelLibraryMenu = menuData.find(
      (item) => item.id === HSApp.Catalog.DataConfig.MenuIdEnum.modelLibrary
    );
    return modelLibraryMenu?.data ?? [];
  };

  const getCategoryIds = (): string => {
    const categoryIds: string[] = [];
    const menuData = getCurrentMenuData();

    menuData.forEach((category) => {
      const isSpecialTopic = category.custAttr === HSApp.Catalog.DataConfig.CustomAttributeIdEnum.specialTopic;
      const isMerchantLibrary = category.custAttr === HSApp.Catalog.DataConfig.CustomAttributeIdEnum.merchantModelLibrary;

      if (!isSpecialTopic && !isMerchantLibrary) {
        categoryIds.push(category.id);
      }
    });

    return categoryIds.join(', ');
  };

  const getBackTitle = (isTextSearch: boolean, pool: PoolEnum): string => {
    if (isTextSearch) {
      return ResourceManager.getString('catalog_model_library');
    }

    const isTPZZEnvironment = HSApp.App.getApp().activeEnvironmentId === HSFPConstants.Environment.TPZZ;
    const highCommissionKey = isTPZZEnvironment ? 'high_commission_pool_tpzz' : 'high_commission_pool';

    return pool === PoolEnum.HighCommissionPool
      ? ResourceManager.getString(highCommissionKey)
      : ResourceManager.getString('high_quality_pool');
  };

  const handleTextSearch = (params: { categoriesIds?: string; text?: string }): void => {
    const { categoriesIds, text } = params;
    const searchConfig: SearchConfig = {
      offset: DEFAULT_OFFSET,
      limit: DEFAULT_LIMIT,
      treeId: TreeIdEnum.GeneralCategoryRoot,
      text: text ?? '',
      categoriesIds: categoriesIds ?? getCategoryIds(),
    };

    loadProducts(searchConfig, true);
    setCurrentPageType(PageType.ProductPage);
  };

  const loadPoolProducts = (pool: PoolConfig, poolType: PoolEnum): void => {
    const params = {
      poolId: pool.poolId,
      categoryId: pool.categoryId,
    };

    ResourceApi.getCategories(params).then((response) => {
      const category = response.categories[0];
      const poolTagAttribute = category?.attributes?.find(
        (attr) => attr.typeId === ATTR_POOL_TAG_ID
      );

      const searchConfig: SearchConfig = {
        offset: DEFAULT_OFFSET,
        limit: DEFAULT_LIMIT,
        treeId: TreeIdEnum.GeneralCategoryRoot,
        poolId: pool.poolId,
        attrPoolTagId: '',
        categoriesIds: category?.id,
      };

      if (poolTagAttribute?.free) {
        const tags = poolTagAttribute.free;
        searchConfig.attrPoolTagId = tags.length > 1 ? tags.join(', ') : tags[0];
      }

      loadProducts(searchConfig, false, response, poolType);
      setCurrentPageType(PageType.ProductPage);
    });
  };

  const loadProducts = (
    config: SearchConfig,
    isTextSearch: boolean,
    catalogResponse: CategoriesResponse = { categories: [] },
    pool: PoolEnum = PoolEnum.HighQualityPool
  ): void => {
    const hasCategories = catalogResponse.categories.length > 0;

    const productPageConfig: ProductPageConfig = {
      headerBackData: {
        onHeaderBack: handleBackToLanding,
        backTitle: getBackTitle(isTextSearch, pool),
      },
      showTreeControl: hasCategories,
      catalogData: catalogResponse,
      showHeaderBack: true,
      config,
      title: config.text || ResourceManager.getString('new_catalog_all_category'),
      searchData: isTextSearch ? ResourceApi.searchProducts : ResourceApi.searchActivities,
      subMenuId: HSApp.Catalog.DataConfig.MenuIdEnum.modelLibrary,
      subMenuDataList: isTextSearch ? getCurrentMenuData() : [],
    };

    currentProductPage = HSApp.Catalog.Manager.getDefaultProductPage(productPageConfig);
  };

  useEffect(() => {
    if (props.poolId !== undefined && !fromMyPaid) {
      setCurrentPageType(PageType.ModelPage);
    }
  }, [refreshNum, catalogData?.id]);

  const renderPage = (): React.ReactElement => {
    switch (currentPageType) {
      case PageType.LandingPage:
        return createElement(LandingPage, {
          entryText,
          title,
          searchProducts: handleTextSearch,
          onPoolClick: handlePoolClick,
          specialTopicModelClick: handleModelClick,
          fromMyPaid,
          cacheTabsValue: handleCacheTabsValue,
          tabsValue,
        });

      case PageType.ProductPage:
        return currentProductPage ?? createElement('div');

      case PageType.ModelPage:
        return createElement(ModelPage, {
          data: modelData,
          headerBackClick: handleBackToLanding,
          refreshNum,
        });

      default:
        return createElement(LandingPage, {
          entryText,
          title,
          searchProducts: handleTextSearch,
          onPoolClick: handlePoolClick,
          specialTopicModelClick: handleModelClick,
          fromMyPaid,
          cacheTabsValue: handleCacheTabsValue,
          tabsValue,
        });
    }
  };

  return createElement('div', { className: 'special-topic-container' }, renderPage());
}