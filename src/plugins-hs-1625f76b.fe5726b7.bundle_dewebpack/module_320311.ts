import { useState, useEffect } from 'react';
import React from 'react';

interface ColorItem {
  color: string;
}

interface CatalogItem {
  id: string;
  frontCategoryIdList: string[];
}

interface CategoryFacet {
  material: string[];
  threeDimensional: string[];
}

interface CatalogData {
  items: CatalogItem[];
  categoryFacets: CategoryFacet;
}

interface CacheData {
  data: {
    id: string;
  };
  colorList: ColorItem[];
}

interface TemplateRecommendModelPageProps {
  back: (data: CacheData) => void;
  cacheData: CacheData;
}

interface MtopRequestParams {
  limit: number;
  inspirationId: number;
  colorList: string[];
  lang: string;
}

interface MtopResponse {
  ret?: string[];
  data?: CatalogData;
}

const PRODUCT_LIMIT = 120;
const DEFAULT_CATEGORY_FACETS: CategoryFacet = {
  material: [],
  threeDimensional: []
};

const fetchInspirationModelRecommend = (params: MtopRequestParams): Promise<CatalogData> => {
  return NWTK.mtop.Catalog.InspirationModelRecommend({ data: params })
    .then((response: MtopResponse) => {
      const responseData = response.data;
      if (response?.ret?.[0]?.includes('SUCCESS') && responseData) {
        return responseData;
      }
      return Promise.reject(response);
    })
    .catch((error: unknown) => {
      return Promise.reject(error);
    });
};

const TemplateRecommendModelPage: React.FC<TemplateRecommendModelPageProps> = ({ back, cacheData }) => {
  const { data, colorList } = cacheData;
  const inspirationId = data.id;
  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();
  const locale = HSApp.App.getApp().appParams.locale;

  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [catalogData, setCatalogData] = useState<CatalogData>({
    items: [],
    categoryFacets: DEFAULT_CATEGORY_FACETS
  });
  const [filteredItems, setFilteredItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { items, categoryFacets = DEFAULT_CATEGORY_FACETS } = catalogData;
  const { material = [], threeDimensional = [] } = categoryFacets;
  const allCategories = [...material, ...threeDimensional];

  const loadProducts = (colors: string[]): void => {
    const requestParams: MtopRequestParams = {
      limit: PRODUCT_LIMIT,
      inspirationId: parseInt(inspirationId),
      colorList: colors,
      lang: locale
    };

    setIsLoading(true);
    catalogLib.ProductDatabase.getProducts(requestParams, fetchInspirationModelRecommend)
      .then((responseData: CatalogData) => {
        setIsLoading(false);
        setCatalogData(responseData);
        setFilteredItems(responseData.items || []);
      });
  };

  const handleColorChange = (color: string): void => {
    setSelectedColor(color);
    const colors = color === 'all' 
      ? colorList.map((item: ColorItem) => item.color)
      : [color];
    loadProducts(colors);
  };

  const handleCatalogClick = (categoryId: string): void => {
    if (categoryId === 'all') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item: CatalogItem) =>
        item.frontCategoryIdList.includes(categoryId)
      );
      setFilteredItems(filtered);
    }
  };

  const handleBackClick = (): void => {
    back(cacheData);
  };

  useEffect(() => {
    handleColorChange('all');
  }, []);

  return (
    <div className="template-recommend-model-page">
      <div onMouseDown={handleBackClick} className="back">
        <catalogLib.IconfontView
          showType="hs_xian_fanhui"
          customStyle={{ fontSize: '20px' }}
        />
        <span className="back-tip">
          {ResourceManager.getString('catalog_header_back')}
        </span>
      </div>

      <div className="description">
        {ResourceManager.getString('publish.design.add.recommendedmodels')}
      </div>

      <div className="color-bar">
        <div
          className={`color-item all-color ${selectedColor === 'all' ? 'active' : ''}`}
          onClick={() => handleColorChange('all')}
        />
        {colorList.map((colorItem: ColorItem) => (
          <div
            key={colorItem.color}
            onClick={() => handleColorChange(colorItem.color)}
            className={`color-item ${selectedColor === colorItem.color ? 'active' : ''}`}
            style={{ background: colorItem.color }}
          />
        ))}
      </div>

      <div className="categories">
        {allCategories.length > 0 && !isLoading && (
          <catalogLib.CatalogFilter
            data={allCategories}
            onCatalogClick={handleCatalogClick}
          />
        )}
      </div>

      {isLoading ? (
        <div className="loading">
          <img src={require('./loading-icon.svg')} alt="Loading" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="no-result">
          <img
            className="image"
            src="https://img.alicdn.com/imgextra/i1/O1CN01K6vDyB1xflvwSBKM9_!!6000000006471-55-tps-82-81.svg"
            alt="No results"
          />
          <div>{ResourceManager.getString('publish.design.add.norelated')}</div>
        </div>
      ) : (
        <catalogLib.Scroll className="product-list">
          {filteredItems.map((item: CatalogItem) => (
            <catalogLib.ProductItemContainer key={item.id} item={item} />
          ))}
        </catalogLib.Scroll>
      )}
    </div>
  );
};

export default TemplateRecommendModelPage;