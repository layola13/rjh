import { useState, useEffect, useRef } from 'react';

interface Attribute {
  id: string;
  name: string;
  values: AttributeValue[];
}

interface AttributeValue {
  id: string;
  name: string;
  count?: number;
}

interface CategoryFacet {
  id: string;
  name: string;
  count?: number;
}

interface ProductItem {
  uuid: string;
  id: string;
  name?: string;
  coverUrl?: string;
  [key: string]: unknown;
}

interface ProductsResponse {
  items: ProductItem[];
  total: number;
  attributes?: Attribute[];
  categoryFacets?: CategoryFacet[];
  stylerMember: boolean;
}

interface GetProductsParams {
  poolId: string;
  categoryId?: string;
  offset: number;
  limit: number;
  disableAgg: boolean;
  attributeIds?: string;
}

interface SpecialTopicData {
  poolId: string;
  coverUrl?: string;
  attributes?: {
    COVER?: string;
    [key: string]: unknown;
  };
}

interface SpecialTopicModelPageProps {
  headerBackClick: () => void;
  data: SpecialTopicData;
  refreshNum: number;
}

interface PageState {
  isLoading: boolean;
  items: ProductItem[];
  total: number;
  stylerMember: boolean;
}

const ITEMS_PER_PAGE = 30;
const DEFAULT_BANNER_PATH = 'v2/image/logo/specialtopicbanner.png';

const SpecialTopicModelPage: React.FC<SpecialTopicModelPageProps> = ({
  headerBackClick,
  data,
  refreshNum
}) => {
  const [filterOptions, setFilterOptions] = useState<Attribute[]>([]);
  const [hasCountryAttributes, setHasCountryAttributes] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [selectedAttributeIds, setSelectedAttributeIds] = useState<string>('');
  const [pageState, setPageState] = useState<PageState>({
    isLoading: true,
    items: [],
    total: 0,
    stylerMember: false
  });
  const [hoveredFilterId, setHoveredFilterId] = useState<string>('');
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const modelListRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pageWrapperRef = useRef<HTMLDivElement>(null);
  const filtersAreaRef = useRef<HTMLDivElement>(null);

  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
  const apiManager = HSApp.Catalog.BaseApiManager.getInstance();
  const app = HSApp.App.getApp();
  const FavoriteTopicContainer = app.pluginManager.getPlugin(HSFPConstants.PluginType.Favorite).favTopicContainer;

  const searchModelTopics = (params: GetProductsParams): Promise<ProductsResponse> => {
    return apiManager.dataManager.searchModelTopics(params);
  };

  const getProducts = (page: number = 1): Promise<ProductsResponse> => {
    const params: GetProductsParams = {
      poolId: data.poolId,
      categoryId: selectedCategoryId,
      offset: ITEMS_PER_PAGE * (page - 1),
      limit: ITEMS_PER_PAGE,
      disableAgg: false,
      attributeIds: selectedAttributeIds
    };
    return catalogLib.ProductDatabase.getProducts(params, searchModelTopics);
  };

  const handleCategorySelect = (categoryId: string): void => {
    setSelectedCategoryId(categoryId !== 'all' ? categoryId : undefined);
  };

  const getElementDimension = (ref: React.RefObject<HTMLElement>, dimension: 'height' | 'width'): number => {
    return ref?.current ? ref.current.getBoundingClientRect()[dimension] : 0;
  };

  const calculateContainerHeight = (): void => {
    const pageHeight = getElementDimension(pageWrapperRef, 'height');
    const headerHeight = getElementDimension(headerRef, 'height');
    const filtersHeight = getElementDimension(filtersAreaRef, 'height');
    setContainerHeight(pageHeight - headerHeight - filtersHeight);
  };

  const trackUserAction = (actionName: string, params: Record<string, unknown>): void => {
    app.userTrackLogger.push(actionName, params);
  };

  useEffect(() => {
    setPageState(prevState => ({
      ...prevState,
      isLoading: true
    }));

    getProducts().then(response => {
      const attributes = response.attributes ?? [];
      const categoryFacets = response.categoryFacets ?? [];
      const filters: Attribute[] = [];

      if (attributes.length > 0) {
        setHasCountryAttributes(true);
        filters.push(...attributes);
        trackUserAction('catalog.model.homepage', {
          activeSection: 'catalog',
          activeSectionName: '公共库-banner-国家馆',
          description: '打开公共库-banner-国家馆',
          clicksRatio: {
            id: 'CountryML',
            name: '公共库-banner-国家馆'
          }
        });
      } else {
        trackUserAction('catalog.model.homepage', {
          activeSection: 'catalog',
          activeSectionName: '公共库-banner-活动',
          description: '打开公共库-banner-活动',
          clicksRatio: {
            id: 'XinhaoxuanML',
            name: '公共库-banner-活动'
          }
        });
      }

      filters.push({
        id: 'leimu',
        name: '类别',
        values: categoryFacets
      });

      if (filterOptions.length === 0) {
        setFilterOptions(filters);
      }

      setPageState({
        isLoading: false,
        items: response.items || [],
        total: response.total || 0,
        stylerMember: response.stylerMember
      });

      calculateContainerHeight();
    });
  }, [selectedCategoryId, refreshNum, selectedAttributeIds]);

  const handleFilterHover = (filterId: string): void => {
    setHoveredFilterId(filterId);
  };

  const handleFilterOptionClick = (attributeId: string, value?: AttributeValue): void => {
    if (!attributeId) return;

    if (attributeId === 'leimu') {
      handleCategorySelect(value?.id ?? 'all');
    } else {
      const attributeIdString = value?.id 
        ? `${attributeId}_${value.id}` 
        : '';
      setSelectedAttributeIds(attributeIdString);
    }
  };

  const handleModelItemClick = (item: ProductItem, context: unknown): void => {
    apiManager.eventsManager.handleItemClick(item, context);
    trackUserAction('specialTopic_select_model_put_into_canvas', {
      activeSection: 'catalog',
      activeSectionName: '公共库-推荐-模型专题详情页',
      description: '公共库-推荐-模型专题详情页-选用模型',
      specialTopicId: data?.poolId,
      modelId: item?.id
    });
  };

  const handleBannerClick = (): void => {
    if (HSApp.Config.TENANT === 'fp' && pageState.items?.length > 0) {
      app.pluginManager
        .getPlugin(HSFPConstants.PluginType.ModelCharge)
        .show(pageState.items[0]);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    apiManager.eventsManager.listenMouseEvent(event);
  };

  const loadMoreProducts = (page: number): Promise<ProductItem[]> => {
    const params: GetProductsParams = {
      poolId: data.poolId,
      categoryId: selectedCategoryId,
      offset: ITEMS_PER_PAGE * (page - 1),
      limit: ITEMS_PER_PAGE,
      disableAgg: false
    };
    return catalogLib.ProductDatabase.getProducts(params, searchModelTopics)
      .then(response => response.items || []);
  };

  const renderProductItems = (items: ProductItem[]): React.ReactNode => {
    return items.map(item => (
      <catalogLib.ProductItemContainer
        key={item.uuid}
        item={item}
        stylerMember={pageState.stylerMember}
        onItemClick={handleModelItemClick}
      />
    ));
  };

  const bannerImageUrl = data.coverUrl 
    || data.attributes?.COVER 
    || `${HSApp.Config.RES_BASEPATH}${DEFAULT_BANNER_PATH}`;

  const shouldShowFavorite = HSApp.Config.TENANT !== 'fp';

  return (
    <div className="special-topic-model-page-new" ref={pageWrapperRef}>
      <div ref={headerRef} className="special-topic-model-header">
        <div className="special-topic-model-first-row">
          <div className="special-topic-model-back" onClick={headerBackClick}>
            <catalogLib.IconfontView showType="hs_xian_fanhui" />
            <span className="back-tip">
              {ResourceManager.getString('catalog_header_back')}
            </span>
          </div>
          {shouldShowFavorite && (
            <FavoriteTopicContainer
              item={data}
              succeededTitle={ResourceManager.getString('catalog_model_topic_fav-popup-title')}
            />
          )}
        </div>
        <div className="banner-wrapper">
          <img
            className="banner"
            src={bannerImageUrl}
            onClick={handleBannerClick}
          />
        </div>
      </div>

      <div ref={filtersAreaRef} className="banner-filters-area">
        {!hasCountryAttributes && filterOptions[0]?.values && (
          <catalogLib.CatalogFilter
            data={filterOptions[0].values}
            onCatalogClick={handleCategorySelect}
            changeHeight={calculateContainerHeight}
          />
        )}
        {hasCountryAttributes && filterOptions.map(filter => (
          <div
            key={filter.id}
            className="banner-filter-item"
            onMouseEnter={() => handleFilterHover(filter.id)}
            onMouseLeave={() => handleFilterHover('')}
          >
            <catalogLib.FilterOption
              showFilterItem={filter}
              handleSearchPanelItemClick={handleFilterOptionClick}
              handleFilterOptionHover={handleFilterHover}
              isHovered={hoveredFilterId === filter.id}
            />
          </div>
        ))}
      </div>

      <div className="model-list" ref={modelListRef} onScroll={handleScroll}>
        {(containerHeight > 0 || pageState.items.length > 0) && (
          <catalogLib.InfiniteLoaderContainer
            isLoading={pageState.isLoading}
            requestLimit={ITEMS_PER_PAGE}
            items={pageState.items}
            getData={loadMoreProducts}
            changeHeight={calculateContainerHeight}
            containerHeight={containerHeight}
            total={pageState.total}
          >
            {renderProductItems}
          </catalogLib.InfiniteLoaderContainer>
        )}
      </div>
    </div>
  );
};

export default SpecialTopicModelPage;