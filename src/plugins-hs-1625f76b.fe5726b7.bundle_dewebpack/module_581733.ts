import { useState, useEffect, useRef } from 'react';

interface CategoryFacet {
  id: string;
  name: string;
  count: number;
}

interface TraceIds {
  [key: string]: string;
}

interface SignModelCalendarConfig {
  enabled: boolean;
  [key: string]: unknown;
}

interface ProductItem {
  id: string;
  uuid: string;
  topicPoolId?: string;
  traceIds?: TraceIds;
  signModelCalendarConfig?: SignModelCalendarConfig;
  page?: number;
  [key: string]: unknown;
}

interface TopicAttributes {
  COVER?: string;
  [key: string]: unknown;
}

interface TopicData {
  poolId: string;
  topicType: string;
  coverUrl?: string;
  attributes?: TopicAttributes;
  signModelCalendarConfig?: SignModelCalendarConfig;
}

interface ProductsResponse {
  items: ProductItem[];
  total: number;
  categoryFacets?: CategoryFacet[];
  stylerMember: boolean;
  traceIds?: TraceIds;
}

interface ProductsRequest {
  poolId: string;
  categoryId?: string;
  offset: number;
  limit: number;
  disableAgg: boolean;
}

interface ListState {
  isLoading: boolean;
  items: ProductItem[];
  total: number;
  stylerMember: boolean;
}

interface SpecialTopicModelPageProps {
  headerBackClick: () => void;
  data: TopicData;
  refreshNum: number;
}

enum TopicType {
  designType = '1',
  cityType = '2'
}

const ITEMS_PER_PAGE = 30;
const DEFAULT_BANNER_PATH = 'v2/image/logo/specialtopicbanner.png';
const TENANT_FP = 'fp';

export default function SpecialTopicModelPage(props: SpecialTopicModelPageProps): JSX.Element {
  const { headerBackClick, data, refreshNum } = props;

  const [categoryFacets, setCategoryFacets] = useState<CategoryFacet[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [listState, setListState] = useState<ListState>({
    isLoading: true,
    items: [],
    total: 0,
    stylerMember: false
  });

  const modelListRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const apiManager = HSApp.Catalog.BaseApiManager.getInstance();
  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
  const trackLogger = HSApp.App.getApp().userTrackLogger;

  const getElementDimension = (ref: React.RefObject<HTMLElement>, dimension: 'height' | 'width'): number => {
    if (!ref?.current) return 0;
    return ref.current.getBoundingClientRect()[dimension];
  };

  const [containerHeight, setContainerHeight] = useState<number>(getElementDimension(modelListRef, 'height'));

  const calculateContainerHeight = (): void => {
    const totalHeight = getElementDimension(containerRef, 'height');
    const headerHeight = getElementDimension(headerRef, 'height');
    setContainerHeight(totalHeight - headerHeight);
  };

  const fetchProducts = async (pageNum: number = 1): Promise<ProductsResponse> => {
    const request: ProductsRequest = {
      poolId: data.poolId,
      categoryId: selectedCategoryId,
      offset: ITEMS_PER_PAGE * (pageNum - 1),
      limit: ITEMS_PER_PAGE,
      disableAgg: false
    };

    const searchFunction = (req: ProductsRequest) => {
      return apiManager.dataManager.searchModelTopics(req);
    };

    const response = await catalogLib.ProductDatabase.getProducts(request, searchFunction);
    const items = response.items ?? [];
    const traceIds = response.traceIds ?? {};

    items.forEach((item: ProductItem) => {
      item.topicPoolId = data.poolId;
      item.traceIds = traceIds;
      item.signModelCalendarConfig = data.signModelCalendarConfig;
    });

    trackLogger.push('catalog.special.model.list', {
      description: '专题模型列表',
      param: {
        poolId: data.poolId,
        pageNum,
        modelAmount: items.length,
        traceIds
      }
    }, {});

    return response;
  };

  const loadData = async (): Promise<void> => {
    setListState(prevState => ({
      ...prevState,
      isLoading: true
    }));

    const response = await fetchProducts();

    if (categoryFacets.length === 0) {
      setCategoryFacets(response.categoryFacets ?? []);
    }

    setListState({
      isLoading: false,
      items: response.items ?? [],
      total: response.total ?? 0,
      stylerMember: response.stylerMember
    });

    calculateContainerHeight();
  };

  useEffect(() => {
    const signalHook = new HSCore.Util.SignalHook(undefined);
    const checkInPlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.CheckIn);

    signalHook.listen(checkInPlugin.refreshTopicModelPageSignal, loadData);

    return () => {
      signalHook.unlisten(checkInPlugin.refreshTopicModelPageSignal, loadData);
      signalHook.dispose();
    };
  }, [selectedCategoryId]);

  useEffect(() => {
    loadData();
  }, [selectedCategoryId, refreshNum]);

  const handleCategoryClick = (categoryId: string): void => {
    setSelectedCategoryId(categoryId !== 'all' ? categoryId : undefined);
  };

  const handleItemClick = (event: React.MouseEvent, item: ProductItem): void => {
    trackLogger.push('catalog.special.model.click', {
      description: '专题模型点击',
      param: {
        jid: item.id,
        poolId: data.poolId,
        pageNum: item.page,
        traceIds: item.traceIds
      }
    }, {});

    apiManager.eventsManager.handleItemClick(event, item);
  };

  const handleBannerClick = (): void => {
    if (HSApp.Config.TENANT === TENANT_FP && listState.items.length > 0) {
      HSApp.App.getApp()
        .pluginManager
        .getPlugin(HSFPConstants.PluginType.ModelCharge)
        .show(listState.items[0]);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    apiManager.eventsManager.listenMouseEvent(event);
  };

  const favoriteContainer = HSApp.App.getApp()
    .pluginManager
    .getPlugin(HSFPConstants.PluginType.Favorite)
    .favTopicContainer;

  const bannerUrl = data.coverUrl ?? data.attributes?.COVER ?? `${HSApp.Config.RES_BASEPATH}${DEFAULT_BANNER_PATH}`;
  const shouldShowFavorite = HSApp.Config.TENANT !== TENANT_FP && data.topicType === TopicType.designType;

  return (
    <div className="special-topic-model-page" ref={containerRef}>
      <div ref={headerRef} className="special-topic-model-header">
        <div className="special-topic-model-first-row">
          <div className="special-topic-model-back" onClick={headerBackClick}>
            <catalogLib.IconfontView showType="hs_xian_fanhui" />
            <span className="back-tip">
              {ResourceManager.getString('catalog_header_back')}
            </span>
          </div>
          {shouldShowFavorite && (
            <favoriteContainer
              item={data}
              succeededTitle={ResourceManager.getString('catalog_model_topic_fav-popup-title')}
            />
          )}
        </div>
        <div className="banner-wrapper">
          <img
            className="banner"
            src={bannerUrl}
            onClick={handleBannerClick}
          />
        </div>
        <div className="filters-area">
          {categoryFacets.length > 0 && (
            <catalogLib.CatalogFilter
              data={categoryFacets}
              onCatalogClick={handleCategoryClick}
              changeHeight={calculateContainerHeight}
            />
          )}
        </div>
      </div>
      <div className="model-list" ref={modelListRef} onScroll={handleScroll}>
        {(containerHeight || listState.items.length > 0) && (
          <catalogLib.InfiniteLoaderContainer
            isLoading={listState.isLoading}
            requestLimit={ITEMS_PER_PAGE}
            items={listState.items}
            getData={(pageNum: number) => fetchProducts(pageNum).then(res => res.items ?? [])}
            changeHeight={calculateContainerHeight}
            containerHeight={containerHeight}
            total={listState.total}
          >
            {(items: ProductItem[]) =>
              items.map((item: ProductItem) => (
                <catalogLib.ProductItemContainer
                  key={item.uuid}
                  item={item}
                  stylerMember={listState.stylerMember}
                  onItemClick={handleItemClick}
                />
              ))
            }
          </catalogLib.InfiniteLoaderContainer>
        )}
      </div>
    </div>
  );
}