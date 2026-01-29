interface RecommendParams {
  designId: string;
  otherModelIds: string[];
  roomsAttribute: string;
  selectedModelId: string;
  limit?: number;
  offset?: number;
  requestId?: string;
}

interface RecommendItem {
  id: string;
  [key: string]: unknown;
}

interface RecommendStorage {
  items: RecommendItem[];
  hasGetAllItems?: boolean;
  offset?: number;
  limit?: number;
}

interface FacetResults {
  CategoryLevelTwoEnhance?: unknown[];
  [key: string]: unknown;
}

interface SearchResponse {
  items?: RecommendItem[];
  facetResults?: FacetResults;
  [key: string]: unknown;
}

interface MtopSearchResponse {
  data?: SearchResponse;
}

declare const HSApp: {
  Catalog: {
    ProductBuilder: {
      getInstance: () => unknown;
    };
  };
  Util: {
    Url: {
      getQueryStrings: () => Record<string, string>;
    };
    EventTrack: {
      instance: () => {
        track: (group: unknown, event: string, data: Record<string, unknown>) => void;
      };
    };
    EventGroupEnum: {
      Recommendation: unknown;
    };
  };
};

declare const NWTK: {
  mtop: {
    Search: {
      searchModelRecommend: (config: { data: RecommendParams }) => Promise<MtopSearchResponse>;
    };
  };
};

declare const adskUser: {
  uid: string;
};

const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 36;
const INITIAL_OFFSET = 0;
const DEFAULT_ENV = "shejijia";

class ProductDatabase {
  static getProducts(
    params: RecommendParams,
    getList: (params: RecommendParams) => Promise<SearchResponse | undefined>,
    _processor: null,
    processFilters: (response: SearchResponse) => unknown[]
  ): Promise<SearchResponse> {
    return getList(params).then((response) => {
      if (response) {
        processFilters(response);
      }
      return response ?? { items: [] };
    });
  }
}

/**
 * Generates a unique identifier string
 */
function generateUuid(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Product recommendation manager
 * Handles fetching and caching of recommended products based on design context
 */
export default class RecommendationManager {
  private storage: Map<number, RecommendStorage>;
  private builder: unknown;
  private defaultLimit: number;
  private pending: boolean;
  private currentEnv: string;

  constructor() {
    this.storage = new Map();
    this.builder = HSApp.Catalog.ProductBuilder.getInstance();
    this.pending = false;
    this.defaultLimit = DEFAULT_LIMIT;
    this.currentEnv = this.getCurrentEnv();
  }

  /**
   * Processes filter results from search response
   */
  private processFilters = (response: SearchResponse): unknown[] => {
    const facetResults = response.facetResults;
    return facetResults?.CategoryLevelTwoEnhance ?? [];
  };

  /**
   * Retrieves cached recommendation data
   */
  getRecommendStorage(params: RecommendParams): RecommendStorage | undefined {
    const key = this.getKey(params);
    return this.storage.get(key);
  }

  /**
   * Updates cached recommendation data
   */
  setRecommendStorage(params: RecommendParams, data: RecommendStorage): void {
    const key = this.getKey(params);
    let cachedData = this.getRecommendStorage(params);

    if (cachedData) {
      cachedData.items = cachedData.items.concat(data.items);
    } else {
      cachedData = data;
    }

    if (data.hasGetAllItems) {
      cachedData.hasGetAllItems = true;
    }

    cachedData.offset = params.offset;
    cachedData.limit = params.limit;
    this.storage.set(key, cachedData);
  }

  /**
   * Generates a hash key from recommendation parameters
   */
  getKey(params: RecommendParams): number {
    const keyObject = {
      designId: params.designId,
      otherModelIds: params.otherModelIds,
      roomsAttribute: params.roomsAttribute,
      selectedModelId: params.selectedModelId,
    };

    const jsonString = JSON.stringify(keyObject);
    return jsonString.split("").reduce((hash, char) => {
      hash = ((hash << 5) - hash + char.charCodeAt(0)) & hash;
      return hash;
    }, 0);
  }

  /**
   * Gets current environment from URL query parameters
   */
  getCurrentEnv(): string {
    const env = HSApp.Util.Url.getQueryStrings().env;
    return env ?? DEFAULT_ENV;
  }

  /**
   * Fetches product recommendations from remote API
   */
  getList(params: RecommendParams): Promise<SearchResponse | undefined> {
    return NWTK.mtop.Search.searchModelRecommend({ data: params }).then(
      (response) => response?.data
    );
  }

  /**
   * Retrieves recommendation data with default pagination
   */
  getData(params: RecommendParams): Promise<SearchResponse> {
    const requestParams = { ...params };
    requestParams.limit = MAX_LIMIT;
    requestParams.offset = INITIAL_OFFSET;
    requestParams.requestId = generateUuid();

    return ProductDatabase.getProducts(
      requestParams,
      this.getList,
      null,
      this.processFilters
    );
  }

  /**
   * Gets product recommendation data with caching and analytics tracking
   */
  getProductData(params: RecommendParams): Promise<SearchResponse> {
    const cachedData = this.getRecommendStorage(params);
    if (cachedData) {
      return Promise.resolve(cachedData);
    }

    const requestId = generateUuid();
    params.requestId = requestId;

    return this.getData(params).then((response) => {
      const items = response.items ?? [];

      if (response?.items && items.length > 0) {
        const productIds = items.map((item) => item.id);

        HSApp.Util.EventTrack.instance().track(
          HSApp.Util.EventGroupEnum.Recommendation,
          "plugin_right_propertybar_model_event",
          {
            uid: adskUser.uid,
            pageSize: DEFAULT_LIMIT,
            requestId,
            modelId: params.selectedModelId,
            productList: productIds,
            env: this.currentEnv,
            timestamp: Date.now(),
          }
        );
      }

      return response;
    });
  }
}