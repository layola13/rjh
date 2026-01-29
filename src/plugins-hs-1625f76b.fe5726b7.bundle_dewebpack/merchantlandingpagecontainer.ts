import { useState, useEffect, ReactElement } from 'react';
import { ShopRank } from './ShopRank';
import { Scroll } from './Scroll';
import loadingIcon from './loading-icon';

interface ShopInfo {
  ownerId: string;
  shopName: string;
  picUrl: string;
  title: string;
}

interface MerchantRankResponse {
  shopInfoList: ShopInfo[];
  createRankTime: string;
}

interface CategoryData {
  name: string;
  id: string;
  shopList: ShopInfo[];
  levelChildren: unknown;
}

interface MerchantLandingResponse {
  result: CategoryData[];
}

interface MerchantLandingPageContainerProps {
  onClickMore: (categoryId: string, categoryName: string, levelChildren: unknown) => void;
  onShopClick: (ownerId: string, shopName: string, isTracked: boolean) => void;
  handleSearchShop: (category: string, searchText: string) => void;
  onHeaderBack: () => void;
}

export const MerchantLandingPageContainer = ({
  onClickMore,
  onShopClick,
  handleSearchShop,
  onHeaderBack,
}: MerchantLandingPageContainerProps): ReactElement => {
  const [rankElements, setRankElements] = useState<ReactElement[]>([]);
  const [categoryElements, setCategoryElements] = useState<ReactElement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rankUpdateDate, setRankUpdateDate] = useState<string>('');

  const apiManager = HSApp.Catalog.BaseApiManager.getInstance();
  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
  const isFpTenant = HSApp.Config.TENANT === 'fp';

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = (): void => {
    if (!isFpTenant) {
      apiManager.dataManager
        .getMerchantRankData({
          data: {
            offset: 0,
            limit: 5,
          },
        })
        .then((response: MerchantRankResponse) => {
          renderRankList(response.shopInfoList);
          const formattedDate = formatRankTime(response.createRankTime);
          setRankUpdateDate(formattedDate);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }

    apiManager.dataManager
      .getMerchantLandingData()
      .then((response: MerchantLandingResponse) => {
        renderCategoryList(response.result);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const formatRankTime = (timestamp: string): string => {
    if (!timestamp) return '';

    const date = new Date(parseInt(timestamp));
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return ResourceManager.getString('catalog_newproduct_time')
      .replace('{month}', `${month}`)
      .replace('{day}', `${day}`);
  };

  const renderRankList = (shopInfoList: ShopInfo[]): void => {
    const elements = shopInfoList.map((shopInfo, index) => (
      <ShopRank
        data={shopInfo}
        index={index}
        key={index}
        onClick={() => handleRankClick(shopInfo, index)}
      />
    ));

    setRankElements(elements);
  };

  const handleRankClick = (shopInfo: ShopInfo, index: number): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      'check_merchant_ranking_event',
      {
        merchant_no: index + 1,
      }
    );

    onShopClick(shopInfo.ownerId, shopInfo.shopName, true);
  };

  const renderCategoryList = (categories: CategoryData[]): void => {
    const elements = categories.map((category, index) => {
      const { name, id, shopList, levelChildren } = category;

      const shopImages = shopList.slice(0, 3).map((shop, shopIndex) => (
        <div
          className="merchant-img"
          onClick={() => onShopClick(shop.ownerId, shop.title, true)}
          key={shopIndex}
        >
          <img src={shop.picUrl} alt="" />
        </div>
      ));

      return (
        <div className="merchant-category-card" key={index}>
          <div className="merchant-category-card-name">{name}</div>
          <div
            className="merchant-category-more"
            onClick={() => onClickMore(id, name, levelChildren)}
          >
            {ResourceManager.getString('plugin_pano_see_more')}
          </div>
          <div className="merchant-img-container">{shopImages}</div>
        </div>
      );
    });

    setCategoryElements(elements);
  };

  const handleSearch = (searchText: string): void => {
    const trimmedText = searchText.trim();
    if (trimmedText) {
      handleSearchShop('', trimmedText);
    }
  };

  const handleScroll = (event: unknown): void => {
    apiManager.eventsManager.listenMouseEvent(event);
  };

  return (
    <div className="hsc-merchant-page-container">
      {isLoading && (
        <div className="loading">
          <img src={loadingIcon} />
        </div>
      )}

      {isFpTenant ? (
        <catalogLib.PageTitle
          mainTitle={ResourceManager.getString('catalog_model_library')}
          secondTitle={ResourceManager.getString('catalog_business_model_library')}
        />
      ) : (
        <catalogLib.BackHeader
          onBack={onHeaderBack}
          title={ResourceManager.getString('brandsIds')}
        />
      )}

      <catalogLib.SearchBox
        placeholder={ResourceManager.getString('brandsIds')}
        useDiyPlaceholder={true}
        handleSearch={handleSearch}
        notNeedAutoSuggest={true}
      />

      <Scroll
        className="high-commision"
        onScrollY={handleScroll}
        scrollYTip={true}
      >
        {!isFpTenant && (
          <div className="header">
            <span className="text">
              {ResourceManager.getString('high_commision_merchants')}
            </span>
            <span className="date">{rankUpdateDate}</span>
          </div>
        )}

        {!isFpTenant && rankElements}
        {categoryElements}
      </Scroll>
    </div>
  );
};