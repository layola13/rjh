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

interface CatalogPoolResponse {
  categories: Category[];
}

interface ActivityCategoriesResponse {
  result: ActivityCategory[];
}

class DataManager {
  searchTopicList(params: SearchParams): Promise<unknown> {
    throw new Error('Method not implemented');
  }

  getActivityCategories(params: SearchParams): Promise<ActivityCategoriesResponse> {
    throw new Error('Method not implemented');
  }

  getCatalogPool(params: SearchParams): Promise<CatalogPoolResponse> {
    throw new Error('Method not implemented');
  }

  searchProducts(params: SearchParams): Promise<unknown> {
    throw new Error('Method not implemented');
  }

  searchActivities(params: SearchParams): Promise<unknown> {
    throw new Error('Method not implemented');
  }

  searchModelTopics(params: SearchParams): Promise<unknown> {
    throw new Error('Method not implemented');
  }

  getPaidPackageList(params: SearchParams): Promise<unknown> {
    throw new Error('Method not implemented');
  }
}

class CatalogApiManager {
  static dataManager = new DataManager();

  static searchTopicList(params: SearchParams): Promise<unknown> {
    return this.dataManager.searchTopicList(params);
  }

  static getActivityCategories(params: SearchParams): Promise<ActivityCategory[]> {
    return this.dataManager.getActivityCategories(params).then((response) => {
      return response.result.map((category) => {
        category.categories = [];
        return category;
      });
    });
  }

  static getCategories(params: SearchParams): Promise<CatalogPoolResponse> {
    return this.dataManager.getCatalogPool(params).then((response) => {
      response.categories.forEach((category) => {
        if (category.categories?.length > 0) {
          category.categories.forEach((subCategory) => {
            this.initCategoryTypes(subCategory);
          });
        }
      });
      return response;
    });
  }

  static initCategoryTypes(category: Category): void {
    category.categoryTypes = [];
    const subCategories = category.categories;
    subCategories?.forEach((subCategory) => {
      this.initCategoryTypes(subCategory);
    });
  }

  static searchProducts(params: SearchParams): Promise<unknown> {
    return this.dataManager.searchProducts(params);
  }

  static searchActivities(params: SearchParams): Promise<unknown> {
    return this.dataManager.searchActivities(params);
  }

  static searchModelTopics(params: SearchParams): Promise<unknown> {
    return this.dataManager.searchModelTopics(params);
  }

  static getPaidPackageList(params: SearchParams): Promise<unknown> {
    return this.dataManager.getPaidPackageList(params);
  }
}

export default CatalogApiManager;