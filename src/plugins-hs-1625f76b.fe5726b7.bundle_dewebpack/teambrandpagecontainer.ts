import React from 'react';
import { PageController, EventBusType } from './PageController';
import { TeamBrandListPageContainer } from './TeamBrandListPageContainer';
import { TEAM_BRAND_PAGE_TYPE } from './constants';
import noResultIcon from './assets/noResultIcon';

interface SearchParams {
  brandsIds?: number | string;
  categoriesIds?: number | string;
  offset: number;
  limit: number;
}

interface CategoryItem {
  id: number;
  name: string;
}

interface CategoryResponse {
  items: CategoryItem[];
}

interface BrandCategoryData {
  data: {
    brandIdList: number[];
  };
}

interface HeaderBackData {
  onHeaderBack: () => void;
  backTitle: string;
}

interface FavShopData {
  isShopCollected: boolean;
  ownerId: number;
}

interface CatalogData {
  categories: CategoryItem[];
}

interface ProductPageConfig {
  headerBackData: HeaderBackData;
  showHeaderBack: boolean;
  config: SearchParams;
  subMenuId: number;
  searchData: (params: SearchParams) => Promise<unknown>;
  catalogData: CatalogData;
  defaultExpandCatalogTree: boolean;
  isExpandTree: boolean;
  noResultHint: string;
  noResultIcon: string;
  showFavShopIcon: boolean;
  favShopData: FavShopData;
  useDiyPlaceholder: boolean;
  placeholder: string;
  backIconType: string;
  showBackIcon: boolean;
  uncontrolled: boolean;
  showSearchPicture: boolean;
}

interface LevelChild {
  id: number;
  name: string;
}

interface AppCatalogApiManager {
  dataManager: {
    teamBrandSearch: (params: SearchParams) => Promise<unknown>;
    teamBrandCategory: (data: BrandCategoryData) => Promise<CategoryResponse>;
  };
}

interface FavoritePlugin {
  initMerchantFavIds: () => void;
  getAllMerchantFavIds: () => number[];
}

interface CatalogManager {
  signalToCatalog: (eventType: string, state: boolean) => void;
  getDefaultProductPage: (config: ProductPageConfig) => React.ReactElement;
}

interface TeamBrandPageContainerProps {
  [key: string]: unknown;
}

export class TeamBrandPageContainer extends PageController {
  private shopGroupId: string = '';
  private shopGroupName: string = '';
  private shopName: string = '';
  private levelChildren: LevelChild[] = [];
  private brandsId: number | string = 0;
  private appCatalogApiManager: AppCatalogApiManager;
  private favoritePlugin: FavoritePlugin;
  private defaultSearchKey: string = '';
  private allFirstLevelIds: number[] = [];

  constructor(props: TeamBrandPageContainerProps) {
    super(props);

    this.appCatalogApiManager = HSApp.Catalog.BaseApiManager.getInstance();
    this.favoritePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Favorite);

    this.handleSearchShop = this.handleSearchShop.bind(this);
    this.resetListPageParams = this.resetListPageParams.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.handleSearchBack = this.handleSearchBack.bind(this);
    this.getProductPage = this.getProductPage.bind(this);
    this.getMerchantListPage = this.getMerchantListPage.bind(this);
  }

  componentDidMount(): void {
    this.favoritePlugin.initMerchantFavIds();
  }

  getFirstPageContent = (): React.ReactElement => {
    return this.getMerchantListPage();
  };

  handleSearchShop = (shopName: string, searchKey: string): void => {
    this.shopName = shopName;
    this.defaultSearchKey = searchKey;
    
    const catalogManager = HSApp.Catalog.Manager as CatalogManager;
    catalogManager.signalToCatalog(EventBusType.showSubMenuItemSelectedState, false);
    
    this.gotoPage(
      TEAM_BRAND_PAGE_TYPE.BRAND_LIST_PAGE_SEARCH,
      this.getMerchantListPage(TEAM_BRAND_PAGE_TYPE.BRAND_LIST_PAGE_SEARCH)
    );
  };

  resetListPageParams = (): void => {
    this.shopName = '';
    this.shopGroupId = '';
    this.shopGroupName = '';
    this.levelChildren = [];
    this.defaultSearchKey = '';
    this.brandsId = '';
    this.allFirstLevelIds = [];
  };

  searchProducts = (params: SearchParams): Promise<unknown> => {
    if (!params.brandsIds) {
      params.brandsIds = this.brandsId;
    }
    
    if (params.categoriesIds === HSApp.Catalog.DataConfig.CustomAttributeIdEnum.teamBrandPage) {
      params.categoriesIds = this.allFirstLevelIds.join(', ');
    }
    
    return this.appCatalogApiManager.dataManager.teamBrandSearch(params);
  };

  handleSearchBack = (): void => {
    const catalogManager = HSApp.Catalog.Manager as CatalogManager;
    catalogManager.signalToCatalog(EventBusType.showSubMenuItemSelectedState, true);
    
    this.resetListPageParams();
    this.backtoPage();
  };

  getProductPage = (brandId: number, brandTitle: string): Promise<void> => {
    const requestData: BrandCategoryData = {
      data: {
        brandIdList: [brandId]
      }
    };

    this.brandsId = brandId;

    return this.appCatalogApiManager.dataManager.teamBrandCategory(requestData).then((response: CategoryResponse) => {
      const catalogManager = HSApp.Catalog.Manager as CatalogManager;
      
      this.allFirstLevelIds = response?.items ? response.items.map((item: CategoryItem) => item.id) : [];

      const searchConfig: SearchParams = {
        categoriesIds: this.allFirstLevelIds.join(', '),
        brandsIds: brandId,
        offset: 0,
        limit: 30
      };

      const allFavIds = this.favoritePlugin.getAllMerchantFavIds();

      const productPageConfig: ProductPageConfig = {
        headerBackData: {
          onHeaderBack: this.handleSearchBack,
          backTitle: brandTitle
        },
        showHeaderBack: true,
        config: searchConfig,
        subMenuId: HSApp.Catalog.DataConfig.MenuIdEnum.enterpriseModelLibrary,
        searchData: this.searchProducts,
        catalogData: {
          categories: response.items
        },
        defaultExpandCatalogTree: true,
        isExpandTree: true,
        noResultHint: ResourceManager.getString('business_shop_with_no_catalog_tip'),
        noResultIcon: noResultIcon,
        showFavShopIcon: HSApp.Config.TENANT !== 'fp',
        favShopData: {
          isShopCollected: allFavIds.includes(brandId),
          ownerId: brandId
        },
        useDiyPlaceholder: true,
        placeholder: `${ResourceManager.getString('catalog_search_placeholder_1')} ${brandTitle} ${ResourceManager.getString('catalog_search_placeholder_2')}`,
        backIconType: 'back',
        showBackIcon: true,
        uncontrolled: true,
        showSearchPicture: false
      };

      const productPage = catalogManager.getDefaultProductPage(productPageConfig);
      this.gotoPage(TEAM_BRAND_PAGE_TYPE.PRODUCT_PAGE, productPage);
    });
  };

  getMerchantListPage = (pageType: string = 'shop_list_page'): React.ReactElement => {
    return React.createElement(TeamBrandListPageContainer, {
      shopGroupId: this.shopGroupId,
      shopGroupName: this.shopGroupName,
      shopName: this.shopName,
      levelChildren: this.levelChildren,
      onBack: this.handleSearchBack,
      onShopCardClick: this.getProductPage,
      handleSearchBack: this.handleSearchBack,
      handleSearchShop: this.handleSearchShop,
      allFavIds: this.favoritePlugin.getAllMerchantFavIds(),
      type: pageType,
      defaultSearchKey: this.defaultSearchKey
    });
  };
}