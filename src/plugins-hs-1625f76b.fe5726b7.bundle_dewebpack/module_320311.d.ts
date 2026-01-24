import React, { useState, useEffect, Fragment } from 'react';

// ============================================================================
// Type Definitions
// ============================================================================

/** 颜色配置项 */
interface ColorItem {
  color: string;
}

/** 分类面（材质、3D维度等） */
interface CategoryFacets {
  material: string[];
  threeDimensional: string[];
}

/** 产品项数据 */
interface ProductItem {
  id: string | number;
  frontCategoryIdList: string[];
  [key: string]: unknown;
}

/** 推荐模型API响应 */
interface RecommendationResponse {
  items: ProductItem[];
  categoryFacets: CategoryFacets;
}

/** 缓存数据结构 */
interface CacheData {
  data: {
    id: string | number;
  };
  colorList: ColorItem[];
}

/** 组件Props */
interface TemplateRecommendModelPageProps {
  /** 返回回调函数 */
  back: (cacheData: CacheData) => void;
  /** 缓存的数据 */
  cacheData: CacheData;
}

/** MTOP API返回结构 */
interface MtopResponse<T> {
  ret?: string[];
  data?: T;
}

/** 推荐模型请求参数 */
interface RecommendationRequestParams {
  limit: number;
  inspirationId: number;
  colorList: string[];
  lang: string;
}

// ============================================================================
// Constants
// ============================================================================

const ALL_CATEGORY = 'all';
const DEFAULT_PRODUCT_LIMIT = 120;
const SUCCESS_CODE = 'SUCCESS';

const DEFAULT_CATEGORY_FACETS: CategoryFacets = {
  material: [],
  threeDimensional: [],
};

const NO_RESULT_IMAGE_URL = 'https://img.alicdn.com/imgextra/i1/O1CN01K6vDyB1xflvwSBKM9_!!6000000006471-55-tps-82-81.svg';

// ============================================================================
// Component
// ============================================================================

/**
 * 推荐模型模板页面组件
 * 根据灵感ID和颜色列表展示推荐的3D模型产品
 */
const TemplateRecommendModelPage: React.FC<TemplateRecommendModelPageProps> = (props) => {
  const { back, cacheData } = props;
  const { data, colorList } = cacheData;
  const inspirationId = data.id;

  // 获取全局依赖
  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
  const locale = HSApp.App.getApp().appParams.locale;

  // ============================================================================
  // State Management
  // ============================================================================

  /** 当前选中的颜色过滤器 */
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>(ALL_CATEGORY);

  /** 产品推荐数据 */
  const [recommendationData, setRecommendationData] = useState<RecommendationResponse>({
    items: [],
    categoryFacets: DEFAULT_CATEGORY_FACETS,
  });

  /** 过滤后的产品列表 */
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);

  /** 加载状态 */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 解构推荐数据
  const { items: allProducts, categoryFacets = DEFAULT_CATEGORY_FACETS } = recommendationData;
  const { material = [], threeDimensional = [] } = categoryFacets;
  const allCategories = [...material, ...threeDimensional];

  // ============================================================================
  // API Functions
  // ============================================================================

  /**
   * 调用MTOP接口获取推荐模型
   * @param params - 请求参数
   * @returns 推荐数据或Promise.reject
   */
  const fetchRecommendationModels = async (
    params: RecommendationRequestParams
  ): Promise<RecommendationResponse> => {
    try {
      const response: MtopResponse<RecommendationResponse> = await NWTK.mtop.Catalog.InspirationModelRecommend({
        data: params,
      });

      const isSuccess = response?.ret?.[0]?.includes(SUCCESS_CODE);
      
      if (isSuccess && response.data) {
        return response.data;
      }
      
      return Promise.reject(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * 加载推荐产品
   * @param colors - 颜色列表
   */
  const loadRecommendedProducts = (colors: string[]): void => {
    const requestParams: RecommendationRequestParams = {
      limit: DEFAULT_PRODUCT_LIMIT,
      inspirationId: parseInt(String(inspirationId)),
      colorList: colors,
      lang: locale,
    };

    setIsLoading(true);

    catalogLib.ProductDatabase.getProducts(requestParams, fetchRecommendationModels)
      .then((data: RecommendationResponse) => {
        setIsLoading(false);
        setRecommendationData(data);
        setFilteredProducts(data.items || []);
      });
  };

  // ============================================================================
  // Event Handlers
  // ============================================================================

  /**
   * 处理颜色过滤器变化
   * @param colorFilter - 颜色值或'all'
   */
  const handleColorFilterChange = (colorFilter: string): void => {
    setSelectedColorFilter(colorFilter);

    const colors = colorFilter === ALL_CATEGORY
      ? colorList.map((item) => item.color)
      : [colorFilter];

    loadRecommendedProducts(colors);
  };

  /**
   * 处理分类点击
   * @param categoryId - 分类ID或'all'
   */
  const handleCategoryClick = (categoryId: string): void => {
    if (categoryId === ALL_CATEGORY) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.frontCategoryIdList.includes(categoryId)
      );
      setFilteredProducts(filtered);
    }
  };

  /**
   * 处理返回按钮点击
   */
  const handleBackClick = (): void => {
    back(cacheData);
  };

  // ============================================================================
  // Effects
  // ============================================================================

  useEffect(() => {
    handleColorFilterChange(ALL_CATEGORY);
  }, []);

  // ============================================================================
  // Render Helpers
  // ============================================================================

  /** 渲染颜色选择器 */
  const renderColorBar = (): JSX.Element => (
    <div className="color-bar">
      <div
        className={`color-item all-color ${selectedColorFilter === ALL_CATEGORY ? 'active' : ''}`}
        onClick={() => handleColorFilterChange(ALL_CATEGORY)}
      />
      {colorList.map((colorItem) => (
        <div
          key={colorItem.color}
          onClick={() => handleColorFilterChange(colorItem.color)}
          className={`color-item ${selectedColorFilter === colorItem.color ? 'active' : ''}`}
          style={{ background: colorItem.color }}
        />
      ))}
    </div>
  );

  /** 渲染分类过滤器 */
  const renderCategories = (): JSX.Element | null => {
    if (allCategories.length === 0 || isLoading) {
      return null;
    }

    return (
      <div className="categories">
        <catalogLib.CatalogFilter
          data={allCategories}
          onCatalogClick={handleCategoryClick}
        />
      </div>
    );
  };

  /** 渲染加载状态 */
  const renderLoading = (): JSX.Element => (
    <div className="loading">
      <img src={require('./loading.svg').default} alt="Loading" />
    </div>
  );

  /** 渲染空结果 */
  const renderEmptyState = (): JSX.Element => (
    <div className="no-result">
      <img className="image" src={NO_RESULT_IMAGE_URL} alt="No results" />
      <div>{ResourceManager.getString('publish.design.add.norelated')}</div>
    </div>
  );

  /** 渲染产品列表 */
  const renderProductList = (): JSX.Element => (
    <catalogLib.Scroll className="product-list">
      {filteredProducts.map((product) => (
        <catalogLib.ProductItemContainer key={product.id} item={product} />
      ))}
    </catalogLib.Scroll>
  );

  /** 渲染内容区域 */
  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return renderLoading();
    }

    if (filteredProducts.length === 0) {
      return renderEmptyState();
    }

    return <Fragment>{renderProductList()}</Fragment>;
  };

  // ============================================================================
  // Main Render
  // ============================================================================

  return (
    <div className="template-recommend-model-page">
      {/* 返回按钮 */}
      <div onMouseDown={handleBackClick} className="back">
        <catalogLib.IconfontView
          showType="hs_xian_fanhui"
          customStyle={{ fontSize: '20px' }}
        />
        <span className="back-tip">
          {ResourceManager.getString('catalog_header_back')}
        </span>
      </div>

      {/* 描述文本 */}
      <div className="description">
        {ResourceManager.getString('publish.design.add.recommendedmodels')}
      </div>

      {/* 颜色选择栏 */}
      {renderColorBar()}

      {/* 分类过滤器 */}
      {renderCategories()}

      {/* 内容区域 */}
      {renderContent()}
    </div>
  );
};

export default TemplateRecommendModelPage;