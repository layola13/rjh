import React, { useRef, useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Utils } from './utils';
import { BackHeader, CatalogFilter, InfiniteLoaderContainer, ProductItemContainer } from './catalog-components';

interface Model {
  uuid: string;
  categories: string[];
  [key: string]: unknown;
}

interface ProductItem {
  uuid: string;
  categories: string[];
  [key: string]: unknown;
}

interface PageData {
  name: string;
  roomTypeName?: string;
  image: string;
  models: Model[];
}

interface CategoryFilter {
  name: string;
  id: string;
  items: ProductItem[];
}

interface ProductListState {
  items: ProductItem[];
  total: number;
  filterData: CategoryFilter[];
  isLoading: boolean;
}

interface QueryParams {
  offset: number;
  id: string;
}

interface QueryResult {
  items: ProductItem[];
  total: number;
}

interface Props {
  data: PageData;
  onSwitchPage: () => void;
}

class ModelBuilder {
  build(model: Model): ProductItem {
    return model as ProductItem;
  }
}

const CATEGORY_ALL = 'all';
const CATEGORY_ACCESSORIES = 'accessories';

const DEFAULT_CATEGORIES: CategoryFilter[] = [
  { name: '全部', id: CATEGORY_ALL, items: [] },
  { name: '家具', id: 'furniture', items: [] },
  { name: '配饰', id: CATEGORY_ACCESSORIES, items: [] },
  { name: '硬装', id: 'hard_load', items: [] },
  { name: '结构', id: 'structure', items: [] }
];

const DEFAULT_QUERY_PARAMS: QueryParams = {
  offset: 0,
  id: ''
};

const ITEMS_PER_PAGE = 30;

const modelBuilder = new ModelBuilder();

const ModelCollocationProductPage: React.FC<Props> = ({ data, onSwitchPage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();

  const calculateContainerHeight = (): number => {
    return Utils.calcHeight('height', [containerRef], [headerRef, imageRef, filterRef]);
  };

  const builtModels = data.models.map(model => modelBuilder.build(model));

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [productListState, setProductListState] = useState<ProductListState>({
    items: [],
    total: 0,
    filterData: [],
    isLoading: true
  });
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const { items, total, filterData, isLoading } = productListState;

  const fetchProducts = (params: Partial<QueryParams>, filters?: CategoryFilter[]): Promise<QueryResult> => {
    const queryParams: QueryParams = { ...DEFAULT_QUERY_PARAMS, ...params };
    const activeFilters = filters ?? filterData;
    
    let categoryItems: ProductItem[] = activeFilters[0]?.items ?? [];
    const targetCategoryId = queryParams.id || selectedCategoryId;

    for (const filter of activeFilters) {
      if (filter.id === targetCategoryId) {
        categoryItems = filter.items;
        break;
      }
    }

    const totalItems = categoryItems.length;
    const paginatedItems = categoryItems.slice(queryParams.offset, queryParams.offset + ITEMS_PER_PAGE);

    return Promise.resolve({
      items: paginatedItems,
      total: totalItems
    });
  };

  const buildFilterData = (models: ProductItem[]): CategoryFilter[] => {
    const categories = cloneDeep(DEFAULT_CATEGORIES);
    const plugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    const baseApiManager = plugin.BaseApiManager;
    const catalogTrees = baseApiManager.getFilteredCatalogTrees();
    const categoryMapping = baseApiManager.getReversedCategoryMapping(HSApp.Config.DEFAULT_CATEGORY_TREE_ID);

    models.forEach(model => {
      const firstCategory = model.categories[0];
      if (!firstCategory) return;

      const mappedCategory = categoryMapping?.get(firstCategory);
      const categoryId = mappedCategory ?? firstCategory;

      const categoryPath: unknown[] = [];
      Utils.getEntryCategoryById(categoryId, catalogTrees, categoryPath);

      categories.forEach(category => {
        if (category.id === CATEGORY_ALL) {
          category.items.push(model);
          return;
        }

        const primaryCategoryName = categoryPath[0]?.name;
        const secondaryCategoryName = categoryPath[1]?.name;

        if (!primaryCategoryName) return;

        const isMatchingSecondary = secondaryCategoryName && 
                                   category.name === secondaryCategoryName && 
                                   category.id === CATEGORY_ACCESSORIES;
        const isMatchingPrimary = category.name === primaryCategoryName;

        if (isMatchingSecondary || isMatchingPrimary) {
          category.items.push(model);
        }
      });
    });

    return categories.filter(category => category.items.length > 0);
  };

  useEffect(() => {
    const filters = buildFilterData(builtModels);

    fetchProducts(DEFAULT_QUERY_PARAMS, filters).then(result => {
      setProductListState({
        items: result.items,
        total: result.total,
        filterData: filters,
        isLoading: false
      });
      setContainerHeight(calculateContainerHeight());
    });
  }, []);

  const handleHeightChange = (): void => {
    setContainerHeight(calculateContainerHeight());
  };

  const handleCategoryClick = (categoryId: string): void => {
    setSelectedCategoryId(categoryId);
    setProductListState(prevState => ({
      ...prevState,
      isLoading: true
    }));

    fetchProducts({ id: categoryId, offset: 0 }).then(result => {
      setProductListState({
        items: result.items,
        total: result.total,
        filterData,
        isLoading: false
      });
    });
  };

  const handleLoadMore = (page: number = 1): Promise<ProductItem[]> => {
    const offset = ITEMS_PER_PAGE * (page - 1);
    return fetchProducts({ ...DEFAULT_QUERY_PARAMS, offset }).then(result => result.items);
  };

  return (
    <div className="hsc-model-collocation-product-page-container" ref={containerRef}>
      <div ref={headerRef}>
        <BackHeader title={data.name} onBack={onSwitchPage} />
      </div>

      {data.roomTypeName && (
        <span className="model-collocation-product-page-room-type-name">
          {data.roomTypeName}
        </span>
      )}

      <div ref={imageRef}>
        <img 
          src={data.image} 
          style={{ display: 'block' }} 
          alt={data.name}
        />
      </div>

      {filterData.length > 0 && (
        <div className="filters-area" ref={filterRef}>
          <CatalogFilter
            data={filterData}
            onCatalogClick={handleCategoryClick}
            changeHeight={handleHeightChange}
          />
        </div>
      )}

      <div className="model-collocation-product-page">
        <div className="hsc-model-container">
          <InfiniteLoaderContainer
            isLoading={isLoading}
            requestLimit={ITEMS_PER_PAGE}
            items={items}
            getData={handleLoadMore}
            changeHeight={handleHeightChange}
            containerHeight={containerHeight}
            total={total}
          >
            {(displayItems: ProductItem[]) =>
              displayItems.map(item => (
                <ProductItemContainer
                  key={item.uuid}
                  item={item}
                  currentConfig={DEFAULT_QUERY_PARAMS}
                />
              ))
            }
          </InfiniteLoaderContainer>
        </div>
      </div>
    </div>
  );
};

export default ModelCollocationProductPage;