interface SearchParams {
  [key: string]: unknown;
}

interface Category {
  categories: Category[];
  categoryTypes?: unknown[];
}

interface ActivityCategory {
  categories: Category[];
  [key: string]: unknown;
}

interface ActivityCategoriesResponse {
  result: ActivityCategory[];
}

interface CatalogPoolResponse {
  categories: Category[];
}

interface DataManager {
  searchTopicList(params: SearchParams): Promise<unknown>;
  getActivityCategories(params: SearchParams): Promise<ActivityCategoriesResponse>;
  getCatalogPool(params: SearchParams): Promise<CatalogPoolResponse>;
  searchProducts(params: SearchParams): Promise<unknown>;
  searchActivities(params: SearchParams): Promise<unknown>;
  searchModelTopics(params: SearchParams): Promise<unknown>;
  getPaidPackageList(params: SearchParams): Promise<unknown>;
}

class CatalogApiManager {
  static dataManager: DataManager;

  /**
   * Search for topic list based on provided parameters
   */
  static searchTopicList(params: SearchParams): Promise<unknown> {
    return this.dataManager.searchTopicList(params);
  }

  /**
   * Get activity categories and initialize empty categories array
   */
  static getActivityCategories(params: SearchParams): Promise<ActivityCategory[]> {
    return this.dataManager.getActivityCategories(params).then((response) => {
      return response.result.map((category) => {
        category.categories = [];
        return category;
      });
    });
  }

  /**
   * Get categories from catalog pool and initialize category types
   */
  static getCategories(params: SearchParams): Promise<CatalogPoolResponse> {
    return this.dataManager.getCatalogPool(params).then((response) => {
      response.categories.forEach((category) => {
        if (category.categories && category.categories.length > 0) {
          category.categories.forEach((subCategory) => {
            this.initCategoryTypes(subCategory);
          });
        }
      });
      return response;
    });
  }

  /**
   * Recursively initialize category types for a category and its subcategories
   */
  static initCategoryTypes(category: Category): void {
    category.categoryTypes = [];
    const subCategories = category.categories;
    if (subCategories) {
      subCategories.forEach((subCategory) => {
        this.initCategoryTypes(subCategory);
      });
    }
  }

  /**
   * Search for products using the base API manager instance
   */
  static searchProducts(params: SearchParams): Promise<unknown> {
    return HSApp.Catalog.BaseApiManager.getInstance().dataManager.searchProducts(params);
  }

  /**
   * Search for activities using the base API manager instance
   */
  static searchActivities(params: SearchParams): Promise<unknown> {
    return HSApp.Catalog.BaseApiManager.getInstance().dataManager.searchActivities(params);
  }

  /**
   * Search for model topics based on provided parameters
   */
  static searchModelTopics(params: SearchParams): Promise<unknown> {
    return this.dataManager.searchModelTopics(params);
  }

  /**
   * Get list of paid packages
   */
  static getPaidPackageList(params: SearchParams): Promise<unknown> {
    return this.dataManager.getPaidPackageList(params);
  }
}

export default CatalogApiManager;