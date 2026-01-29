import { useState, useEffect, useRef } from 'react';

interface MerchantListPageContainerProps {
  shopGroupId: string;
  shopGroupName: string;
  shopName: string;
  levelChildren?: LevelChild[];
  allFavIds: string[];
  onBack: () => void;
  onShopCardClick: (shopId: string, shopName: string, flag: boolean) => void;
  handleSearchBack: () => void;
  handleSearchShop: (groupName: string, searchKey: string) => void;
  type: 'shop_list_page' | 'shop_list_page_search' | string;
  defaultSearchKey?: string;
}

interface LevelChild {
  id: string;
  name: string;
}

interface ShopItem {
  ownerId: string;
  brandId: string;
  shopName: string;
  brandName: string;
  active?: boolean;
}

interface ShopListState {
  firstPageShopList: ShopItem[];
  total: number;
}

interface MerchantShopListParams {
  offset: number;
  limit: number;
  levelOne: string;
  levelTwo: string;
  shopName: string;
}

interface ApiResponse<T> {
  data: T;
  total: number;
}

declare const HSApp: {
  Catalog: {
    BaseApiManager: {
      getInstance(): {
        dataManager: {
          getMerchantShopList(params: { data: MerchantShopListParams }): Promise<ApiResponse<ShopItem[]>>;
        };
        eventsManager: {
          listenMouseEvent(event: React.UIEvent): void;
        };
      };
    };
    Manager: {
      getHSCatalogLib(): {
        BackHeader: React.ComponentType<BackHeaderProps>;
        SearchBox: React.ComponentType<SearchBoxProps>;
        CatalogFilter: React.ComponentType<CatalogFilterProps>;
        InfiniteLoaderContainer: React.ComponentType<InfiniteLoaderContainerProps>;
        ShopCard: React.ComponentType<ShopCardProps>;
      };
    };
  };
  Config: {
    TENANT: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

interface BackHeaderProps {
  title: string;
  onBack: () => void;
  showBackIcon: boolean;
}

interface SearchBoxProps {
  useDiyPlaceholder: boolean;
  placeholder: string;
  handleSearch: (searchKey: string) => void;
  backIconType: string;
  notNeedAutoSuggest: boolean;
  handleBack: () => void;
  showBackIcon: boolean;
  isInSearchState: boolean;
  defaultSearchKey?: string;
}

interface CatalogFilterProps {
  data: LevelChild[];
  onCatalogClick: (levelId: string) => void;
  changeHeight: () => void;
}

interface InfiniteLoaderContainerProps {
  isLoading: boolean;
  requestLimit: number;
  items: ShopItem[];
  itemHeight: number;
  itemWidth: number;
  getData: (page?: number) => Promise<ShopItem[]>;
  changeHeight: () => void;
  containerHeight: number;
  total: number;
  noResultHint: string;
  noResultIcon: string;
  children: (items: ShopItem[]) => React.ReactNode;
}

interface ShopCardProps {
  key: string;
  item: ShopItem;
  onClick: () => void;
}

const ITEMS_PER_PAGE = 30;
const ITEM_HEIGHT = 154;
const ITEM_WIDTH = 255;
const HEADER_MARGIN = 12;

export const MerchantListPageContainer: React.FC<MerchantListPageContainerProps> = ({
  shopGroupId,
  shopGroupName,
  shopName,
  levelChildren,
  allFavIds,
  onBack,
  onShopCardClick,
  handleSearchBack,
  handleSearchShop,
  type,
  defaultSearchKey
}) => {
  const queryParams: MerchantShopListParams = {
    offset: 0,
    limit: ITEMS_PER_PAGE,
    levelOne: shopGroupId,
    levelTwo: '',
    shopName: defaultSearchKey || shopName
  };

  const [shopListState, setShopListState] = useState<ShopListState>({
    firstPageShopList: [],
    total: 0
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiManager = HSApp.Catalog.BaseApiManager.getInstance();
  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
  const isFpTenant = HSApp.Config.TENANT === 'fp';

  const { firstPageShopList, total } = shopListState;

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [listHeight, setListHeight] = useState<number>(0);

  const getElementDimension = (ref: React.RefObject<HTMLElement>, dimension: 'height' | 'width'): number => {
    return ref?.current ? ref.current.getBoundingClientRect()[dimension] : 0;
  };

  const calculateListHeight = (): void => {
    const containerHeight = getElementDimension(containerRef, 'height');
    const headerHeight = getElementDimension(headerRef, 'height');
    setListHeight(containerHeight - headerHeight - HEADER_MARGIN);
  };

  const markFavoriteShops = (shops: ShopItem[]): void => {
    shops.forEach((shop) => {
      shop.active = allFavIds.includes(shop.ownerId);
    });
  };

  const fetchMerchantShopList = async (params: MerchantShopListParams): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await apiManager.dataManager.getMerchantShopList({ data: params });
      markFavoriteShops(response.data);
      setShopListState({
        firstPageShopList: response.data || [],
        total: response.total
      });
    } catch (error) {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchantShopList(queryParams);
  }, [shopGroupId, shopName, defaultSearchKey]);

  useEffect(() => {
    calculateListHeight();
  }, []);

  const handleCatalogFilterClick = async (levelId: string): Promise<void> => {
    const updatedParams = {
      ...queryParams,
      levelTwo: levelId !== 'all' ? levelId : ''
    };

    try {
      const response = await apiManager.dataManager.getMerchantShopList({ data: updatedParams });
      if (response.data) {
        markFavoriteShops(response.data);
        setShopListState({
          firstPageShopList: response.data || [],
          total: response.total
        });
      }
    } catch (error) {
      // Error handling
    }
  };

  const handleGetData = async (page: number = 1): Promise<ShopItem[]> => {
    const paginatedParams = {
      ...queryParams,
      offset: ITEMS_PER_PAGE * (page - 1)
    };

    const response = await apiManager.dataManager.getMerchantShopList({ data: paginatedParams });
    return response.data || [];
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    apiManager.eventsManager.listenMouseEvent(event);
  };

  const buildSearchPlaceholder = (title: string): string => {
    const searchPrefix = ResourceManager.getString('catalog_search_placeholder_1');
    const searchSuffix = ResourceManager.getString('catalog_search_placeholder_2');
    return `${searchPrefix} ${title} ${searchSuffix}`;
  };

  const renderShopCards = (items: ShopItem[]): React.ReactNode => {
    return items.map((item) => {
      const shopId = isFpTenant ? item.brandId : item.ownerId;
      const shopDisplayName = isFpTenant ? item.brandName : item.shopName;

      return (
        <catalogLib.ShopCard
          key={item.ownerId}
          item={item}
          onClick={() => onShopCardClick(shopId, shopDisplayName, false)}
        />
      );
    });
  };

  const headerTitle = shopGroupName || ResourceManager.getString('brandsIds');
  const shouldShowFilter = type === 'shop_list_page' && (levelChildren?.length ?? 0) > 0;
  const isSearchMode = type === 'shop_list_page_search';

  return (
    <div className="hsc-merchant-page-container" ref={containerRef}>
      <div className="header-area" ref={headerRef}>
        {type === 'shop_list_page' ? (
          <catalogLib.BackHeader
            title={shopGroupName}
            onBack={onBack}
            showBackIcon={true}
          />
        ) : (
          <catalogLib.BackHeader
            title={headerTitle}
            onBack={onBack}
            showBackIcon={false}
          />
        )}

        <div className="merchant-list-searchbox">
          <catalogLib.SearchBox
            useDiyPlaceholder={true}
            placeholder={buildSearchPlaceholder(headerTitle)}
            handleSearch={(searchKey) => handleSearchShop(shopGroupName, searchKey)}
            backIconType="back"
            notNeedAutoSuggest={true}
            handleBack={handleSearchBack}
            showBackIcon={isSearchMode}
            isInSearchState={isSearchMode}
            defaultSearchKey={defaultSearchKey}
          />
        </div>

        <div style={{ display: shouldShowFilter ? 'block' : 'none' }}>
          <catalogLib.CatalogFilter
            data={levelChildren!}
            onCatalogClick={handleCatalogFilterClick}
            changeHeight={calculateListHeight}
          />
        </div>
      </div>

      <div className="shop-list" style={{ height: 'inherit' }} onScroll={handleScroll}>
        <catalogLib.InfiniteLoaderContainer
          isLoading={isLoading}
          requestLimit={ITEMS_PER_PAGE}
          items={firstPageShopList}
          itemHeight={ITEM_HEIGHT}
          itemWidth={ITEM_WIDTH}
          getData={handleGetData}
          changeHeight={calculateListHeight}
          containerHeight={listHeight}
          total={total}
          noResultHint={ResourceManager.getString('business_catalog_brands_search_empty_tip')}
          noResultIcon={''}
        >
          {renderShopCards}
        </catalogLib.InfiniteLoaderContainer>
      </div>
    </div>
  );
};