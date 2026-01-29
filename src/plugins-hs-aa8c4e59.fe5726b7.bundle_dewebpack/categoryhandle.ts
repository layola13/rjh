interface BackCategory {
  id: string;
}

interface Category {
  id: string;
  backCategories: BackCategory[];
}

interface CategoryGroup {
  id: string;
  categories: Category[];
}

interface CategoryConfig extends Array<CategoryGroup> {}

interface CategoryMapValue {
  parent: CategoryGroup;
  category: Category;
  index: number;
}

interface BackCategoryMapValue {
  category: Category;
}

interface Entity {
  category?: {
    categoryType?: string | string[];
  };
}

interface MatchListItem {
  id: string;
  match(entity: Entity): boolean;
}

interface CatalogTree {
  items?: Category[];
  [key: string]: unknown;
}

declare const HSApp: {
  Config: {
    BOM: {
      CATEGORY_LANG_CONFIG_URLS?: string;
    };
  };
};

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

class CodeMatchCategory {
  private matchList: MatchListItem[];

  constructor() {
    this.matchList = [];
  }

  match(entity: Entity): string | undefined {
    const matched = this.matchList.find((item) => item.match(entity));
    return matched?.id;
  }
}

export class CategoryHandle {
  private backCatalogTreeMap: Map<string, string[]>;
  private backCategoryMap: Map<string, BackCategoryMapValue>;
  private categoryMap: Map<string, CategoryMapValue>;
  private categoryConfig?: CategoryConfig;
  private codeMatchCategory: CodeMatchCategory;

  constructor() {
    this.backCatalogTreeMap = new Map();
    this.backCategoryMap = new Map();
    this.categoryMap = new Map();
    this.codeMatchCategory = new CodeMatchCategory();
  }

  async init(catalogTree: CatalogTree, param: unknown, language: string): Promise<void> {
    await this.initCategoryTreeMap(catalogTree, param, language);
  }

  getCategoryJonsUrl(language: string): string | undefined {
    return HSApp.Config.BOM.CATEGORY_LANG_CONFIG_URLS?.replace("{lang}", language);
  }

  private async initCategoryTreeMap(catalogTree: CatalogTree, param: unknown, language: string): Promise<void> {
    const config = await this.fetchCategoryConfig(param, language);
    this.categoryConfig = config;

    const { backCategoryMap, categoryMap } = this.categoryToNameMap(config);
    this.backCategoryMap = backCategoryMap;
    this.categoryMap = categoryMap;

    const treeMap = new Map<string, string[]>();

    const buildTree = (categories: Category[], parentPath: string[]): void => {
      categories.forEach((category) => {
        const currentPath = [...parentPath, category.id];
        treeMap.set(category.id, currentPath);
        buildTree((category as unknown as CategoryGroup).categories || [], currentPath);
      });
    };

    buildTree((catalogTree.items || catalogTree) as Category[], []);
    this.backCatalogTreeMap = treeMap;
  }

  private async fetchCategoryConfig(param: unknown, language: string): Promise<CategoryConfig> {
    const url = this.getCategoryJonsUrl(language);
    return await fetchJSON<CategoryConfig>(url!);
  }

  private categoryToNameMap(config: CategoryConfig): {
    backCategoryMap: Map<string, BackCategoryMapValue>;
    categoryMap: Map<string, CategoryMapValue>;
  } {
    const backCategoryMap = new Map<string, BackCategoryMapValue>();
    const categoryMap = new Map<string, CategoryMapValue>();

    config.forEach((group) => {
      group.categories.forEach((category, index) => {
        categoryMap.set(category.id, {
          parent: group,
          category,
          index,
        });

        category.backCategories.forEach((backCategory) => {
          backCategoryMap.set(backCategory.id, {
            category,
          });
        });
      });
    });

    return { backCategoryMap, categoryMap };
  }

  getCategoryConfig(): CategoryConfig | undefined {
    return this.categoryConfig;
  }

  getCategoryMap(): Map<string, CategoryMapValue> {
    return this.categoryMap;
  }

  getValidBackCategoryId(categoryId: string | string[]): string | undefined {
    if (Array.isArray(categoryId)) {
      return categoryId.find((id) => !!this.backCatalogTreeMap.get(id));
    }
    return categoryId;
  }

  getBackCategoryBomCategory(backCategoryId: string): Category | undefined {
    const path = this.backCatalogTreeMap.get(backCategoryId) || [];
    const validId = [...path, backCategoryId].find((id) => !!this.backCategoryMap.get(id));

    if (validId) {
      return this.backCategoryMap.get(validId)?.category;
    }
  }

  getCategoryByEntity(entity: Entity): Category | undefined {
    const categoryType = entity.category?.categoryType;

    if (categoryType) {
      const category = this.getCategory(categoryType);
      if (category) {
        return category;
      }
    }

    const matchedId = this.codeMatchCategory.match(entity);
    if (matchedId) {
      return this.categoryMap.get(matchedId)?.category;
    }
  }

  getCategory(categoryId: string | string[]): Category | undefined {
    const validId = this.getValidBackCategoryId(categoryId);
    if (validId) {
      return this.getBackCategoryBomCategory(validId);
    }
  }

  getCategoryGroup(categoryId: string | string[]): CategoryGroup | undefined {
    const category = this.getCategory(categoryId);
    if (category) {
      return this.categoryMap.get(category.id)?.parent;
    }
  }

  getCategoryGroupByCategoryId(categoryId: string): CategoryGroup | undefined {
    return this.categoryMap.get(categoryId)?.parent;
  }
}

export const categoryHandle = new CategoryHandle();