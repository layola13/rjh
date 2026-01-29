import { useRef, useState, useEffect } from 'react';
import { Tooltip } from 'antd';

interface MyAiModelerPageProps {
  closePanel?: () => void;
  showBack?: boolean;
  backClick?: () => void;
  searchModel?: (params: any) => Promise<ProductResponse>;
  getPreConfig?: () => Promise<ProductQueryParams>;
  isRefreshModeler?: boolean;
  setRefreshModeler?: (value: boolean) => void;
  stopPolling?: () => void;
  isGenerating?: boolean;
  setIsGenerating?: (value: boolean) => void;
  noResultHint?: string;
  noResultHintAction?: () => void;
  categoryId?: string;
  pageRef?: React.RefObject<HTMLDivElement>;
}

interface ProductItem {
  uuid: string;
  traceIds?: Record<string, unknown>;
  [key: string]: unknown;
}

interface ProductResponse {
  items?: ProductItem[];
  total?: number;
  traceIds?: Record<string, unknown>;
}

interface ProductQueryParams {
  offset?: number;
  limit?: number;
  category?: string;
  processStatus?: number;
}

interface ProductListState {
  isLoading: boolean;
  items: ProductItem[];
  total: number;
}

const PAGE_SIZE = 30;
const HEADER_HEIGHT = 60;
const PROCESS_STATUS_COMPLETED = 1;

export const MyAiModelerPage: React.FC<MyAiModelerPageProps> = ({
  closePanel,
  showBack,
  backClick,
  searchModel,
  getPreConfig,
  isRefreshModeler,
  setRefreshModeler,
  stopPolling,
  isGenerating,
  setIsGenerating,
  noResultHint,
  noResultHintAction,
  categoryId,
  pageRef
}) => {
  const modelListRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [productListState, setProductListState] = useState<ProductListState>({
    isLoading: true,
    items: [],
    total: 0
  });

  const { isLoading, items, total } = productListState;

  const apiManager = HSApp.Catalog.BaseApiManager.getInstance();

  const defaultSearchModel = (params: ProductQueryParams): Promise<ProductResponse> => {
    return apiManager.dataManager.getCustomizedProducts(params);
  };

  const queryParamsRef = useRef<ProductQueryParams>({
    category: categoryId,
    processStatus: PROCESS_STATUS_COMPLETED
  });

  const loadProducts = (): Promise<void> => {
    setProductListState(prevState => ({
      ...prevState,
      isLoading: true
    }));

    return fetchProducts().then(response => {
      setProductListState({
        isLoading: false,
        items: response.items || [],
        total: response.total || 0
      });
      calculateContainerHeight();
    });
  };

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = (source?: string): void => {
    if (source === 'manual') {
      setIsGenerating?.(false);
    }

    setIsRefreshing(true);
    loadProducts().finally(() => {
      setIsRefreshing(false);
    });

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      'ai_moodboard_refresh_event'
    );
  };

  useEffect(() => {
    if (isRefreshModeler) {
      handleRefresh();
      setRefreshModeler?.(false);
    }
  }, [isRefreshModeler]);

  useEffect(() => {
    if (getPreConfig) {
      getPreConfig().then(config => {
        queryParamsRef.current = config;
        loadProducts();
      });
    } else {
      loadProducts();
    }
  }, []);

  const fetchProducts = (page: number = 1): Promise<ProductResponse> => {
    const params: ProductQueryParams = {
      offset: PAGE_SIZE * (page - 1),
      limit: PAGE_SIZE,
      ...queryParamsRef.current
    };

    const searchFunction = searchModel || defaultSearchModel;

    return HSApp.Util.ProductDatabase.getProducts(params, searchFunction).then(
      (response: ProductResponse) => {
        const products = response.items || [];
        const traceIds = response.traceIds || {};

        products.forEach(product => {
          product.traceIds = traceIds;
        });

        return response;
      }
    );
  };

  const getElementDimension = (
    ref: React.RefObject<HTMLElement>,
    dimension: keyof DOMRect
  ): number => {
    return ref?.current ? ref.current.getBoundingClientRect()[dimension] as number : 0;
  };

  const [containerHeight, setContainerHeight] = useState<number>(
    getElementDimension(modelListRef, 'height')
  );

  const calculateContainerHeight = (): void => {
    const totalHeight = getElementDimension(pageRef || containerRef, 'height');
    setContainerHeight(totalHeight - HEADER_HEIGHT);
  };

  const handleItemClick = (item: ProductItem, index: number): void => {
    apiManager.eventsManager.handleItemClick(item, index);
  };

  return (
    <div
      className="my-ai-modeler-page"
      style={{
        width: '280px',
        height: '100%',
        background: 'white'
      }}
      ref={containerRef}
    >
      <div className="my-ai-modeler-page-header" ref={headerRef}>
        <div className="left">
          {showBack && (
            <div onClick={backClick}>
              <HSApp.Util.IconfontRadiusView
                showType="hs_xian_fanhui"
                mouseDownColor="#396efe"
                mouseUpColor="#1c1c1c"
                background={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '30px',
                  background: '#F5F5F5'
                }}
              />
            </div>
          )}
          <div className="title">
            {ResourceManager.getString('ai_modeler_list_title')}
          </div>
        </div>

        <div className="right">
          <div className="refresh-container" onClick={() => handleRefresh('manual')}>
            {isRefreshing ? (
              <div className="refresh-icon">
                <img src={require('./loading.gif')} />
              </div>
            ) : (
              <Tooltip
                title={ResourceManager.getString('model_charge_pay_refresh')}
                placement="top"
                color="dark"
              >
                <div>
                  <HSApp.Util.IconfontRadiusView
                    showType="hs_icon_chongshi"
                    customStyle={{ fontSize: '20px' }}
                    background={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#F5F5F5'
                    }}
                  />
                </div>
              </Tooltip>
            )}
          </div>

          {closePanel && (
            <div onClick={closePanel}>
              <HSApp.Util.IconfontRadiusView
                showType="hs_xian_guanbi"
                customStyle={{ fontSize: '20px', color: 'black' }}
                mouseDownColor="#396efe"
                mouseUpColor="#1c1c1c"
                background={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '30px',
                  background: '#F5F5F5'
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="model-list" ref={modelListRef}>
        {isGenerating && (
          <div className="is-generating">
            <HSApp.Util.Loading />
          </div>
        )}

        {containerHeight > 0 ? (
          <HSApp.Util.InfiniteLoaderContainer
            isLoading={isLoading}
            requestLimit={PAGE_SIZE}
            items={items}
            getData={(page: number) =>
              fetchProducts(page).then(response => response.items || [])
            }
            changeHeight={calculateContainerHeight}
            containerHeight={containerHeight}
            total={total}
            noResultHint={noResultHint}
            noResultHintAction={noResultHintAction}
          >
            {(products: ProductItem[]) =>
              products.map(product => (
                <HSApp.Util.ProductItemContainer
                  key={product.uuid}
                  item={product}
                  onItemClick={handleItemClick}
                  stopPolling={stopPolling}
                />
              ))
            }
          </HSApp.Util.InfiniteLoaderContainer>
        ) : (
          <HSApp.Util.Loading />
        )}
      </div>
    </div>
  );
};