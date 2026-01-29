enum BrandIdEnum {
  Zhibang = "zhibang"
}

interface QueryStrings {
  env?: string;
  [key: string]: unknown;
}

interface SearchParams {
  tenant: string;
  lang: string;
  sort: string;
  order: string;
  offset: number;
  limit: number;
  status: number;
  attributeIds?: string;
  brandsIds?: string;
  treeId?: string;
  env?: string;
}

interface ApiResponse<T> {
  data: T;
  ret: string[];
}

interface CategoryItem {
  id: string;
  cabinetDetail?: Product;
  [key: string]: unknown;
}

interface CategoriesData {
  items: CategoryItem[];
  [key: string]: unknown;
}

interface Product {
  id: string;
  [key: string]: unknown;
}

interface ProductsMap {
  [seekId: string]: Product;
}

interface DeleteParams {
  productId: string;
}

interface DeleteResult {
  result: boolean;
}

interface StyleItem {
  categoryId?: string;
  value: string;
  meta?: Product;
}

interface CatalogManager {
  getProductsBySeekIds(seekIds: string[], flag?: boolean): Promise<ProductsMap>;
  getProductBySeekId(seekId: string): Promise<Product>;
}

interface HSApp {
  Util: {
    Url: {
      getQueryStrings(): QueryStrings;
    };
  };
  App: {
    getApp(): {
      catalogManager: CatalogManager;
    };
  };
}

interface HSCatalog {
  Manager: {
    instance(): CatalogManager;
  };
}

interface NWTK {
  mtop: {
    Search: {
      searchModel(options: { data: SearchParams }): Promise<ApiResponse<CategoriesData>>;
    };
    Catalog: {
      delete(options: { data: DeleteParams }): Promise<ApiResponse<DeleteResult>>;
    };
  };
  api: {
    catalog: {
      getMiniProductsForMe(id: string, offset: number, limit: number): Promise<CategoriesData>;
    };
  };
}

declare const HSApp: HSApp;
declare const HSCatalog: HSCatalog;
declare const NWTK: NWTK;

const DEFAULT_USER_CATEGORY_ID = "b8dc6fff-1b49-429f-a08c-bbc197c26f66";
const DEFAULT_ATTRIBUTE_IDS = "dbd9b78c-fbae-4931-ac30-ff218059b3c6_44dbc810-eaa0-40c1-9223-b6b9a8d5a1a2";
const ZHIBANG_BRAND_ID = "37478a77-5390-46ab-b703-5992ff57b4b2";
const GENERIC_BRAND_ID = "brand-generic";
const FRONT_CATEGORY_TREE_ID = "front-category-root-ezhome";
const TENANT_NAME = "ezhome";
const DEFAULT_LANG = "zh_CN";
const DEFAULT_SORT = "rank";
const DEFAULT_ORDER = "desc";
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 30;
const ACTIVE_STATUS = 1;
const USER_CATEGORIES_LIMIT = 40;

const catalogService = {
  getCategories(brandId: string): Promise<CategoriesData> {
    const searchParams: SearchParams = {
      tenant: TENANT_NAME,
      lang: DEFAULT_LANG,
      sort: DEFAULT_SORT,
      order: DEFAULT_ORDER,
      offset: DEFAULT_OFFSET,
      limit: DEFAULT_LIMIT,
      status: ACTIVE_STATUS,
      attributeIds: DEFAULT_ATTRIBUTE_IDS,
      brandsIds: brandId === BrandIdEnum.Zhibang ? ZHIBANG_BRAND_ID : GENERIC_BRAND_ID
    };

    const queryStrings = HSApp.Util.Url.getQueryStrings();
    if (queryStrings.env) {
      Object.assign(searchParams, { env: queryStrings.env });
    }

    return NWTK.mtop.Search.searchModel({ data: searchParams })
      .then((response) => {
        const { data } = response;
        return response && response.ret[0].includes("SUCCESS") 
          ? data 
          : Promise.reject(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  getProduct(seekId: string): Promise<Product> {
    return HSCatalog.Manager.instance().getProductBySeekId(seekId);
  },

  getUserCategories(): Promise<CategoriesData> {
    return NWTK.api.catalog.getMiniProductsForMe(
      DEFAULT_USER_CATEGORY_ID, 
      DEFAULT_OFFSET, 
      USER_CATEGORIES_LIMIT
    );
  },

  getSampleCabinetsInDetail(brandId: string): Promise<CategoriesData> {
    return new Promise((resolve, reject) => {
      catalogService.getCategories(brandId)
        .then((categories) => {
          const productIds = categories.items
            .filter((item) => item.id)
            .map((item) => item.id);

          return {
            categories,
            products: productIds
          };
        })
        .then((result) => {
          HSApp.App.getApp().catalogManager.getProductsBySeekIds(result.products)
            .then((productsMap) => {
              Object.keys(productsMap).forEach((productId) => {
                const categoryItem = result.categories.items.find(
                  (item) => item.id === productId
                );
                if (categoryItem) {
                  const product = productsMap[productId];
                  categoryItem.cabinetDetail = product;
                }
              });
              resolve(result.categories);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getUserCabinetsInDetail(): Promise<CategoriesData> {
    return new Promise((resolve, reject) => {
      catalogService.getUserCategories()
        .then((categories) => {
          const productIds = categories.items
            .filter((item) => item.id)
            .map((item) => item.id);

          return {
            categories,
            products: productIds
          };
        })
        .then((result) => {
          HSApp.App.getApp().catalogManager.getProductsBySeekIds(result.products)
            .then((productsMap) => {
              Object.keys(productsMap).forEach((productId) => {
                const categoryItem = result.categories.items.find(
                  (item) => item.id === productId
                );
                if (categoryItem) {
                  const product = productsMap[productId];
                  categoryItem.cabinetDetail = product;
                }
              });
              resolve(result.categories);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  delUserStyle(productId: string): Promise<boolean> {
    const deleteParams: DeleteParams = {
      productId
    };

    return NWTK.mtop.Catalog.delete({ data: deleteParams })
      .then((response) => {
        const { data } = response;
        return response && response.ret[0].includes("SUCCESS") && data?.result
          ? data.result
          : Promise.reject(data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  getStylesBySeekIds(styles: StyleItem[]): Promise<void> {
    const catalogManager = HSApp.App.getApp().catalogManager;
    const seekIds = styles
      .filter((style) => style.categoryId && style.value)
      .map((style) => style.value);

    return catalogManager.getProductsBySeekIds(seekIds, true)
      .then((productsMap) => {
        styles.forEach((style) => {
          style.meta = productsMap[style.value];
        });
      })
      .catch((error) => {
        console.error(error.stack);
      });
  },

  getUserDefaultBrand(userId?: string): Promise<string> {
    return Promise.resolve("shejijia");
  },

  setUserDefaultBrand(userId: string, brandId: string): Promise<boolean> {
    return Promise.resolve(true);
  },

  getProductsByTag(tag: string): Promise<CategoriesData> {
    const searchParams: SearchParams = {
      tenant: TENANT_NAME,
      lang: DEFAULT_LANG,
      sort: DEFAULT_SORT,
      order: DEFAULT_ORDER,
      offset: DEFAULT_OFFSET,
      limit: DEFAULT_LIMIT,
      status: ACTIVE_STATUS,
      treeId: FRONT_CATEGORY_TREE_ID,
      attributeIds: `attr-product-tags_${tag}`
    };

    const queryStrings = HSApp.Util.Url.getQueryStrings();
    if (queryStrings.env) {
      Object.assign(searchParams, { env: queryStrings.env });
    }

    return NWTK.mtop.Search.searchModel({ data: searchParams })
      .then((response) => {
        const { data } = response;
        return response && response.ret[0].includes("SUCCESS")
          ? data
          : Promise.reject(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
};

export default catalogService;