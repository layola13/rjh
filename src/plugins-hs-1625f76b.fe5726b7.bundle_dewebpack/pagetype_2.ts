export enum PoolEnum {
  HighQualityPool = "high_quality_pool",
  HighCommissionPool = "high_commission_pool",
}

export enum PageType {
  LandingPage = "landingPage",
  ProductPage = "ProductPage",
  ModelPage = "ModelPage",
}

const TreeIdEnum = HSApp.Catalog.Manager.TreeIdEnum;

interface CategoryData {
  id: string;
  custAttr: string;
  data?: CategoryData[];
}

interface MenuData {
  id: string;
  data?: CategoryData[];
}

interface SearchConfig {
  offset: number;
  limit: number;
  treeId: string;
  text: string;
  categoriesIds: string;
}

interface HeaderBackData {
  onHeaderBack?: () => void;
  backTitle: string;
}

interface CatalogData {
  categories: unknown[];
}

interface ProductPageConfig {
  headerBackData: HeaderBackData;
  showTreeControl: boolean;
  catalogData: CatalogData;
  showHeaderBack: boolean;
  config: SearchConfig;
  title: string;
  searchData: unknown;
  subMenuId: string;
  subMenuDataList: CategoryData[];
}

interface SpecialTopicProps {
  pageType?: PageType;
  refreshNum?: number;
  catalogData?: unknown;
  fromMyPaid?: boolean;
  entryText?: string;
  onHeaderBack?: () => void;
  title?: string;
}

interface SearchParams {
  categoriesIds?: string;
  text?: string;
}

/**
 * Get current menu category data from catalog manager
 */
const getCurrentCategoryData = (): CategoryData[] => {
  const menuData = HSApp.Catalog.Manager.getCurrentMenuData() || [];
  const modelLibraryMenu = menuData.find(
    (item: MenuData) => item.id === HSApp.Catalog.DataConfig.MenuIdEnum.modelLibrary
  );
  return modelLibraryMenu?.data || [];
};

/**
 * Get header title based on context
 */
const getHeaderTitle = (isFromModelLibrary: boolean, poolType: PoolEnum): string => {
  if (isFromModelLibrary) {
    return ResourceManager.getString("catalog_model_library");
  }

  const isTPZZEnvironment = 
    HSApp.App.getApp().activeEnvironmentId === HSFPConstants.Environment.TPZZ;
  
  if (poolType === PoolEnum.HighCommissionPool) {
    const key = isTPZZEnvironment ? "high_commission_pool_tpzz" : "high_commission_pool";
    return ResourceManager.getString(key);
  }
  
  return ResourceManager.getString("high_quality_pool");
};

/**
 * Build category IDs string from menu data
 */
const buildCategoryIds = (categories: CategoryData[]): string => {
  const categoryIds: string[] = [];
  categories.forEach((category) => {
    const isSpecialTopic = 
      category.custAttr === HSApp.Catalog.DataConfig.CustomAttributeIdEnum.specialTopic;
    const isMerchantLibrary = 
      category.custAttr === HSApp.Catalog.DataConfig.CustomAttributeIdEnum.merchantModelLibrary;
    
    if (!isSpecialTopic && !isMerchantLibrary) {
      categoryIds.push(category.id);
    }
  });
  return categoryIds.join(", ");
};

export default function SpecialTopicContainer(props: SpecialTopicProps): JSX.Element {
  const {
    pageType = PageType.LandingPage,
    refreshNum,
    entryText,
    onHeaderBack,
    title,
    ...restProps
  } = props;

  const [currentPageType, setCurrentPageType] = useState<PageType>(pageType);
  const [modelPageData, setModelPageData] = useState<unknown>(restProps);

  /**
   * Handle model click navigation
   */
  const handleModelClick = (data: unknown): void => {
    setModelPageData(data);
    setCurrentPageType(PageType.ModelPage);
  };

  /**
   * Handle product search with categories
   */
  const handleSearchProducts = (params: SearchParams): void => {
    const { categoriesIds, text } = params;
    const categoryData = getCurrentCategoryData();

    const searchConfig: SearchConfig = {
      offset: 0,
      limit: 30,
      treeId: TreeIdEnum.GeneralCategoryRoot,
      text: text || "",
      categoriesIds: categoriesIds ?? buildCategoryIds(categoryData),
    };

    showProductPage(searchConfig, true);
    setCurrentPageType(PageType.ProductPage);
  };

  /**
   * Show product page with configuration
   */
  const showProductPage = (
    config: SearchConfig,
    isFromModelLibrary = false,
    catalogData: CatalogData = { categories: [] },
    poolType: PoolEnum = PoolEnum.HighQualityPool
  ): void => {
    const hasCategories = catalogData.categories.length > 0;
    const categoryData = getCurrentCategoryData();

    const productPageConfig: ProductPageConfig = {
      headerBackData: {
        onHeaderBack,
        backTitle: getHeaderTitle(isFromModelLibrary, poolType),
      },
      showTreeControl: hasCategories,
      catalogData,
      showHeaderBack: true,
      config,
      title: config.text || ResourceManager.getString("new_catalog_all_category"),
      searchData: isFromModelLibrary 
        ? HSApp.Catalog.SearchData.searchProducts 
        : HSApp.Catalog.SearchData.searchActivities,
      subMenuId: HSApp.Catalog.DataConfig.MenuIdEnum.modelLibrary,
      subMenuDataList: isFromModelLibrary ? categoryData : [],
    };

    const catalogManager = HSApp.Catalog.Manager;
    catalogManager.getDefaultProductPage(productPageConfig);
  };

  /**
   * Handle back navigation to landing page
   */
  const handleBackToLanding = (): void => {
    setCurrentPageType(PageType.LandingPage);
  };

  /**
   * Render page content based on current page type
   */
  const renderPageContent = (): JSX.Element => {
    switch (currentPageType) {
      case PageType.LandingPage:
        return (
          <LandingPage
            entryText={entryText}
            title={title}
            searchProducts={handleSearchProducts}
            specialTopicModelClick={handleModelClick}
            onHeaderBack={onHeaderBack}
          />
        );

      case PageType.ModelPage:
        return (
          <ModelPage
            data={modelPageData}
            refreshNum={refreshNum}
            headerBackClick={handleBackToLanding}
          />
        );

      default:
        return (
          <LandingPage
            entryText={entryText}
            title={title}
            searchProducts={handleSearchProducts}
            specialTopicModelClick={handleModelClick}
          />
        );
    }
  };

  return (
    <div className="special-topic-container-new">
      {renderPageContent()}
    </div>
  );
}