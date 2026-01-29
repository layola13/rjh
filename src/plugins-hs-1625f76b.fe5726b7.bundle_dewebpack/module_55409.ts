import React from 'react';
import { BaseApiManager } from 'HSApp/Catalog';
import { PageController } from './PageController';
import { MerchantListPageContainer } from './MerchantListPageContainer';
import { MerchantLandingPageContainer } from './MerchantLandingPageContainer';
import { EventBusType } from './EventBusTypes';
import noResultIcon from './assets/noResultIcon';

/**
 * Page types for merchant-related pages
 */
const MERCHANT_PAGE_TYPE = {
  SHOP_LIST_PAGE: 'SHOP_LIST_PAGE',
  PRODUCT_PAGE: 'PRODUCT_PAGE',
} as const;

type MerchantPageType = typeof MERCHANT_PAGE_TYPE[keyof typeof MERCHANT_PAGE_TYPE];

/**
 * Merchant category item structure
 */
interface CategoryItem {
  id: string;
  [key: string]: unknown;
}

/**
 * Merchant catalog response
 */
interface MerchantCatalogResponse {
  items?: CategoryItem[];
}

/**
 * Level children data structure
 */
interface LevelChild {
  [key: string]: unknown;
}

/**
 * Merchant page controller props
 */
interface MerchantPageControllerProps {
  onHeaderBack?: () => void;
  exclude2DOr3D?: string;
}

/**
 * Catalog configuration for product page
 */
interface CatalogConfig {
  categoriesIds: string;
  shopId: string;
  offset: number;
  limit: number;
}

/**
 * Header back data configuration
 */
interface HeaderBackData {
  onHeaderBack: () => void;
  backTitle: string;
}

/**
 * Favorite shop data configuration
 */
interface FavShopData {
  isShopCollected: boolean;
  ownerId: string;
}

/**
 * Product page configuration
 */
interface ProductPageConfig {
  headerBackData: HeaderBackData;
  showHeaderBack: boolean;
  config: CatalogConfig;
  subMenuId: string;
  searchData: (query: string) => Promise<unknown>;
  catalogData: {
    categories?: CategoryItem[];
  };
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

/**
 * Favorite plugin interface
 */
interface FavoritePlugin {
  initMerchantFavIds: () => void;
  getAllMerchantFavIds: () => string[];
}

/**
 * Data manager interface
 */
interface DataManager {
  searchProducts: (query: string) => Promise<unknown>;
  getMerchantCatalog: (params: { data: { shopIds: string; type?: string } }) => Promise<MerchantCatalogResponse>;
}

/**
 * App catalog API manager interface
 */
interface AppCatalogApiManager {
  dataManager: DataManager;
}

const DEFAULT_PRODUCT_LIMIT = 30;
const DEFAULT_OFFSET = 0;

/**
 * Merchant page controller managing shop groups, shop lists, and product pages
 */
class MerchantPageController extends PageController {
  private shopGroupId: string = '';
  private shopGroupName: string = '';
  private shopName: string = '';
  private levelChildren: LevelChild[] = [];
  private readonly appCatalogApiManager: AppCatalogApiManager;
  private readonly favoritePlugin: FavoritePlugin;
  private readonly onHeaderBack?: () => void;
  private defaultSearchKey: string = '';

  constructor(props: MerchantPageControllerProps) {
    super(props);

    this.appCatalogApiManager = HSApp.Catalog.BaseApiManager.getInstance();
    this.favoritePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Favorite);
    this.onHeaderBack = props.onHeaderBack;

    this.handleClickMore = this.handleClickMore.bind(this);
    this.handleSearchShop = this.handleSearchShop.bind(this);
    this.resetListPageParams = this.resetListPageParams.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.handleSearchBack = this.handleSearchBack.bind(this);
    this.getProductPage = this.getProductPage.bind(this);
    this.getMerchantListPage = this.getMerchantListPage.bind(this);
    this.getLandingPage = this.getLandingPage.bind(this);
  }

  componentDidMount(): void {
    this.favoritePlugin.initMerchantFavIds();
  }

  /**
   * Get the first page content (landing page)
   */
  getFirstPageContent = (): React.ReactElement => {
    return this.getLandingPage();
  };

  /**
   * Handle click on "More" button to navigate to shop list page
   */
  handleClickMore = (shopGroupId: string, shopGroupName: string, levelChildren: LevelChild[]): void => {
    this.shopGroupId = shopGroupId;
    this.shopGroupName = shopGroupName;
    this.levelChildren = levelChildren;
    this.gotoPage(
      MERCHANT_PAGE_TYPE.SHOP_LIST_PAGE,
      this.getMerchantListPage(MERCHANT_PAGE_TYPE.SHOP_LIST_PAGE)
    );
  };

  /**
   * Handle shop search
   */
  handleSearchShop = (shopName: string, searchKey: string): void => {
    this.shopName = shopName;
    this.defaultSearchKey = searchKey;
    HSApp.Catalog.Manager.signalToCatalog(EventBusType.showSubMenuItemSelectedState, false);
    this.gotoPage(
      `${MERCHANT_PAGE_TYPE.SHOP_LIST_PAGE}_search`,
      this.getMerchantListPage(`${MERCHANT_PAGE_TYPE.SHOP_LIST_PAGE}_search`)
    );
  };

  /**
   * Reset all list page parameters to default values
   */
  resetListPageParams = (): void => {
    this.shopName = '';
    this.shopGroupId = '';
    this.shopGroupName = '';
    this.levelChildren = [];
    this.defaultSearchKey = '';
  };

  /**
   * Search products by query
   */
  searchProducts = (query: string): Promise<unknown> => {
    return this.appCatalogApiManager.dataManager.searchProducts(query);
  };

  /**
   * Handle back action from search
   */
  handleSearchBack = (): void => {
    HSApp.Catalog.Manager.signalToCatalog(EventBusType.showSubMenuItemSelectedState, true);
    this.resetListPageParams();
    this.backtoPage();
  };

  /**
   * Get product page for a specific shop
   */
  getProductPage = (shopId: string, shopTitle: string): Promise<void> => {
    const { exclude2DOr3D } = this.props as MerchantPageControllerProps;
    const requestData = {
      shopIds: shopId,
      type: exclude2DOr3D,
    };

    return this.appCatalogApiManager.dataManager
      .getMerchantCatalog({ data: requestData })
      .then((response: MerchantCatalogResponse) => {
        const catalogManager = HSApp.Catalog.Manager;
        const categoryIds = response?.items
          ? response.items.map((item: CategoryItem) => item.id).join(', ')
          : '';

        const catalogConfig: CatalogConfig = {
          categoriesIds: categoryIds,
          shopId,
          offset: DEFAULT_OFFSET,
          limit: DEFAULT_PRODUCT_LIMIT,
        };

        const allFavIds = this.favoritePlugin.getAllMerchantFavIds();
        const isFpTenant = HSApp.Config.TENANT !== 'fp';

        const productPageConfig: ProductPageConfig = {
          headerBackData: {
            onHeaderBack: this.handleSearchBack,
            backTitle: shopTitle,
          },
          showHeaderBack: true,
          config: catalogConfig,
          subMenuId: HSApp.Catalog.DataConfig.MenuIdEnum.modelLibrary,
          searchData: this.searchProducts,
          catalogData: {
            categories: response.items,
          },
          defaultExpandCatalogTree: true,
          isExpandTree: true,
          noResultHint: ResourceManager.getString('business_shop_with_no_catalog_tip'),
          noResultIcon,
          showFavShopIcon: isFpTenant,
          favShopData: {
            isShopCollected: allFavIds.includes(shopId),
            ownerId: shopId,
          },
          useDiyPlaceholder: true,
          placeholder: `${ResourceManager.getString('catalog_search_placeholder_1')} ${shopTitle} ${ResourceManager.getString('catalog_search_placeholder_2')}`,
          backIconType: 'back',
          showBackIcon: true,
          uncontrolled: true,
          showSearchPicture: false,
        };

        const productPage = catalogManager.getDefaultProductPage(productPageConfig);
        this.gotoPage(MERCHANT_PAGE_TYPE.PRODUCT_PAGE, productPage);
      });
  };

  /**
   * Get merchant list page component
   */
  getMerchantListPage = (pageType: string): React.ReactElement => {
    return React.createElement(MerchantListPageContainer, {
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
      defaultSearchKey: this.defaultSearchKey,
    });
  };

  /**
   * Get merchant landing page component
   */
  getLandingPage = (): React.ReactElement => {
    return React.createElement(MerchantLandingPageContainer, {
      onClickMore: this.handleClickMore,
      onShopClick: this.getProductPage,
      handleSearchShop: this.handleSearchShop,
      onHeaderBack: this.onHeaderBack,
    });
  };
}

export default MerchantPageController;