import { useState, useEffect, useRef } from 'react';

interface ShopItem {
  ownerId: string;
  brandId: string;
  shopName: string;
  brandName: string;
  active?: boolean;
}

interface ShopListData {
  firstPageShopList: ShopItem[];
  total: number;
}

interface LevelChild {
  id: string;
  name: string;
}

interface TeamBrandListPageContainerProps {
  shopGroupId: string;
  shopGroupName: string;
  shopName: string;
  levelChildren: LevelChild[];
  allFavIds: string[];
  onBack: () => void;
  onShopCardClick: (id: string, name: string, flag: boolean) => void;
  handleSearchBack: () => void;
  handleSearchShop: (groupName: string, searchKey: string) => void;
  type: string;
  defaultSearchKey?: string;
}

interface QueryParams {
  offset: number;
  limit: number;
  levelOne: string;
  levelTwo: string;
  brandName: string;
}

const ITEM_HEIGHT = 154;
const ITEM_WIDTH = 255;
const PAGE_LIMIT = 30;
const HEADER_MARGIN = 20;

const TEAM_BRAND_PAGE_TYPE = {
  BRAND_LIST_PAGE_SEARCH: 'brand_list_page_search',
  SHOP_LIST_PAGE: 'shop_list_page'
};

export const TeamBrandListPageContainer: React.FC<TeamBrandListPageContainerProps> = ({
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
  const queryParams: QueryParams = {
    offset: 0,
    limit: PAGE_LIMIT,
    levelOne: shopGroupId,
    levelTwo: '',
    brandName: defaultSearchKey || shopName
  };

  const [shopListData, setShopListData] = useState<ShopListData>({
    firstPageShopList: [],
    total: 0
  });

  const [searchKey, setSearchKey] = useState<string | undefined>(defaultSearchKey);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiManager = HSApp.Catalog.BaseApiManager.getInstance();
  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
  const isFpTenant = HSApp.Config.TENANT === 'fp';

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [containerHeight, setContainerHeight] = useState<number>(0);

  const getBoundingClientRectValue = (
    ref: React.RefObject<HTMLElement>,
    property: keyof DOMRect
  ): number => {
    return ref?.current ? ref.current.getBoundingClientRect()[property] as number : 0;
  };

  const calculateContainerHeight = (): void => {
    const totalHeight = getBoundingClientRectValue(containerRef, 'height');
    const headerHeight = getBoundingClientRectValue(headerRef, 'height');
    setContainerHeight(totalHeight - headerHeight - HEADER_MARGIN);
  };

  const markFavoriteShops = (shops: ShopItem[]): void => {
    shops.forEach(shop => {
      shop.active = allFavIds.includes(shop.ownerId);
    });
  };

  const fetchTeamBrandList = async (params: QueryParams): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await apiManager.dataManager.getTeamBrandList({ data: params });
      markFavoriteShops(response.data);
      setShopListData({
        firstPageShopList: response.data || [],
        total: response.total
      });
    } catch (error) {
      console.error('Failed to fetch team brand list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamBrandList(queryParams);
  }, [shopGroupId, shopName, defaultSearchKey]);

  useEffect(() => {
    calculateContainerHeight();
  }, []);

  const handleCatalogFilterClick = async (catalogId: string): Promise<void> => {
    const updatedParams = {
      ...queryParams,
      levelTwo: catalogId !== 'all' ? catalogId : ''
    };

    try {
      const response = await apiManager.dataManager.getTeamBrandList({ data: updatedParams });
      if (response.data) {
        markFavoriteShops(response.data);
        setShopListData({
          firstPageShopList: response.data || [],
          total: response.total
        });
      }
    } catch (error) {
      console.error('Failed to filter catalog:', error);
    }
  };

  const handleSearch = (keyword: string): void => {
    const newSearchKey = type === TEAM_BRAND_PAGE_TYPE.BRAND_LIST_PAGE_SEARCH ? keyword : '';
    setSearchKey(keyword);
    setTimeout(() => {
      setSearchKey(newSearchKey);
      handleSearchShop(shopGroupName, keyword);
    }, 0);
  };

  const getDataForPage = async (page: number = 1): Promise<ShopItem[]> => {
    const params = {
      ...queryParams,
      offset: PAGE_LIMIT * (page - 1)
    };

    try {
      const response = await apiManager.dataManager.getTeamBrandList({ data: params });
      return response.data || [];
    } catch (error) {
      console.error('Failed to load page data:', error);
      return [];
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    apiManager.eventsManager.listenMouseEvent(event);
  };

  const renderShopCards = (items: ShopItem[]): React.ReactNode => {
    return items.map(item => {
      const { ownerId, brandId, shopName: itemShopName, brandName } = item;
      const id = isFpTenant ? brandId : ownerId;
      const name = isFpTenant ? brandName : itemShopName;

      return (
        <catalogLib.ShopCard
          key={ownerId}
          item={item}
          onClick={() => onShopCardClick(id, name, false)}
        />
      );
    });
  };

  const searchPlaceholder = `${ResourceManager.getString('catalog_search_placeholder_1')} ${
    shopGroupName || ResourceManager.getString('brandsIds')
  } ${ResourceManager.getString('catalog_search_placeholder_2')}`;

  const showCatalogFilter =
    type === TEAM_BRAND_PAGE_TYPE.SHOP_LIST_PAGE && levelChildren?.length > 0;

  const isSearchState = type === TEAM_BRAND_PAGE_TYPE.BRAND_LIST_PAGE_SEARCH;

  return (
    <div className="hsc-team-brand-page-container" ref={containerRef}>
      <div className="header-area" ref={headerRef}>
        <catalogLib.BackHeader
          title={ResourceManager.getString('brandsIds')}
          onBack={onBack}
          showBackIcon={false}
        />
        <div className="brand-list-searchbox">
          <catalogLib.SearchBox
            useDiyPlaceholder={true}
            placeholder={searchPlaceholder}
            handleSearch={handleSearch}
            backIconType="back"
            notNeedAutoSuggest={true}
            handleBack={handleSearchBack}
            showBackIcon={isSearchState}
            isInSearchState={isSearchState}
            defaultSearchKey={searchKey}
          />
        </div>
        <div style={{ display: showCatalogFilter ? 'block' : 'none' }}>
          <catalogLib.CatalogFilter
            data={levelChildren}
            onCatalogClick={handleCatalogFilterClick}
            changeHeight={calculateContainerHeight}
          />
        </div>
      </div>
      <div className="shop-list" style={{ height: 'inherit' }} onScroll={handleScroll}>
        <catalogLib.InfiniteLoaderContainer
          isLoading={isLoading}
          requestLimit={PAGE_LIMIT}
          items={shopListData.firstPageShopList}
          itemHeight={ITEM_HEIGHT}
          itemWidth={ITEM_WIDTH}
          getData={getDataForPage}
          changeHeight={calculateContainerHeight}
          containerHeight={containerHeight}
          total={shopListData.total}
          noResultHint={ResourceManager.getString('business_catalog_brands_search_empty_tip')}
          noResultIcon={undefined}
        >
          {renderShopCards}
        </catalogLib.InfiniteLoaderContainer>
      </div>
    </div>
  );
};