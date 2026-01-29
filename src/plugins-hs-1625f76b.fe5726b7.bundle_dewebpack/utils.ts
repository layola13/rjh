export interface RoomAttribute {
  values: Array<{ id: string; value: string }>;
}

export interface Category {
  id: string;
  categories?: Category[];
  attributes?: Array<{ id: string; typeId?: string }>;
  categoryTypes?: string[];
  length?: number;
}

export interface FilterOptions {
  notFilter?: boolean;
  query?: {
    categoryId?: string;
  };
}

export interface FilterResult {
  categoriesResult: Category[][];
  selectedCategory: Category[];
}

export interface FavoriteTopicData {
  sourceId: string;
  favoritesType: number;
}

export interface FavTopicFolderData {
  whetherDefault: number;
  favoritesType: number;
}

const CATEGORY_TYPE_NEW_PRODUCT_PAGE = "NewProductPage";
const CATEGORY_TYPE_MY_FAVORITES = "MyFavorites";
const CATEGORY_TYPE_MERCHANT = "Merchant";
const CATEGORY_TYPE_PRIVATE_CATALOG = "PrivateCatalog";
const SPECIAL_CATEGORY_ID = "55d5456e-a5d9-4725-970d-1404f8a8f6ab";
const ATTR_ALLIANCE = "attr-aliance";
const ATTR_ACTIVITY_POOL_ID = "attr-activity-pool-id";
const ATTR_ACTIVITY = "attr-activity";
const MAGIC_VALUE = "u6tklt3u60yg";
const FILTER_CATEGORY_ID = "5be1accc-34b8-314e-9992-4b6c2e281b84";
const EXCLUDED_CATEGORY_ID = "43b5283e-18c8-3f39-9203-f00d281a1e3c";
const ENVIRONMENT_CUSTOMIZED_MODELING = "CustomizedModeling";
const COMMAND_TYPE_SMART_REPLACE = "SmartReplaceContent";
const COMMAND_TYPE_CHANGE_SMART_MOLDING = "hsw.cmd.customizemodel.CmdChangeSmartMoldingType";
const COMMAND_TYPE_CHANGE_MOLDING = "hsw.cmd.customizemodel.CmdChangeMoldingType";
const COMMAND_TYPE_CHANGE_PARAMETRIC = "hsw.cmd.customizemodel.CmdChangeParametricOpeningMeta";
const ENVIRONMENT_DEFAULT = "Default";
const FAVORITES_TYPE = 4;

const stylerFilterMap = new Map<string, unknown>();
let filteredCategories: Category[] = [];

export const Utils = {
  setRoomAttribute(key: string, value: RoomAttribute): void {
    (this as Record<string, unknown>)[key] = value;
  },

  getRoomNameAttribute(key: string, id: string): string {
    const attribute = (this as Record<string, RoomAttribute>)[key];
    if (attribute) {
      const foundValue = attribute.values.find((item) => item.id === id);
      return foundValue?.value ?? id;
    }
    return id;
  },

  setPublicStylerFilter(key: string, filter: unknown): void {
    stylerFilterMap.set(key, filter);
  },

  getPublicStylerFilter(key: string): unknown {
    return stylerFilterMap.get(key);
  },

  findCategoryById(
    categories: Category[],
    targetId: string,
    includeAlliance = false,
    includeActivity = false
  ): Category | undefined {
    if (!targetId || !categories) return undefined;

    const searchInCategory = (category: Category): Category | undefined => {
      if (category.id === targetId) return category;

      const subCategories = category.categories;
      if (!subCategories) return undefined;

      for (let i = 0; i < subCategories.length; i++) {
        const subCategory = subCategories[i];

        if (!includeAlliance && subCategory.attributes) {
          const allianceAttrs = subCategory.attributes.filter(
            (attr) => attr.id === ATTR_ALLIANCE
          );
          if (allianceAttrs.length > 0) continue;
        }

        if (!includeActivity && subCategory.attributes) {
          const activityPoolAttrs = subCategory.attributes.filter(
            (attr) =>
              attr.id === ATTR_ACTIVITY_POOL_ID ||
              attr.typeId === ATTR_ACTIVITY_POOL_ID
          );
          if (activityPoolAttrs.length > 0) continue;
        }

        const found = searchInCategory(subCategory);
        if (found) return found;
      }

      return undefined;
    };

    for (let i = 0; i < categories.length; i++) {
      if (!includeActivity) {
        const activityAttrs = categories[i].attributes?.filter(
          (attr) => attr.id === ATTR_ACTIVITY
        );
        if (activityAttrs && activityAttrs.length > 0) continue;
      }

      const result = searchInCategory(categories[i]);
      if (result) return result;
    }

    return undefined;
  },

  getSelectedCategoryV1(categories: Category[] | undefined): Category[] {
    const path: Category[] = [];
    this.getSelectedCategoryPathV1(categories?.[0], path);
    return path;
  },

  getSelectedCategoryPathV1(category: Category | undefined, path: Category[]): boolean {
    if (category) {
      path.push(category);
    }

    if (
      category?.categories &&
      category.categories.length > 0
    ) {
      this.getSelectedCategoryPathV1(category.categories[0], path);
      return true;
    }

    return false;
  },

  filterCategories(categoriesArray: Category[][], options?: FilterOptions): FilterResult {
    const processedCategories = options?.notFilter
      ? categoriesArray
      : this.filterByTypes(categoriesArray);

    const selectedCategory = this.getSelectedCategory(processedCategories[0], options);
    const categoriesResult: Category[][] = [];

    processedCategories.forEach((categoryGroup) => {
      const relatedCategories =
        categoryGroup.length > 0
          ? this.getRelatedCategories(selectedCategory, options, categoryGroup)
          : categoryGroup;
      categoriesResult.push(relatedCategories);
    });

    return {
      categoriesResult,
      selectedCategory,
    };
  },

  filterByTypes(categoriesArray: Category[][]): Category[][] {
    const result: Category[][] = [];

    categoriesArray.forEach((categoryGroup) => {
      filteredCategories = [];
      categoryGroup.forEach(this.filterAndBuildCategories);
      result.push(filteredCategories);
    });

    return result;
  },

  filterAndBuildCategories(category: Category): void {
    if (
      !category.categories ||
      category.id === SPECIAL_CATEGORY_ID ||
      category.categoryTypes?.includes(CATEGORY_TYPE_NEW_PRODUCT_PAGE)
    ) {
      return;
    }

    const shouldInclude =
      category.categories.length === 0 ||
      (category.categoryTypes?.includes(CATEGORY_TYPE_MY_FAVORITES) &&
        category.categories.length !== 1) ||
      category.categoryTypes?.includes(CATEGORY_TYPE_MERCHANT) ||
      category.categoryTypes?.includes(CATEGORY_TYPE_PRIVATE_CATALOG);

    filteredCategories = filteredCategories.concat(
      shouldInclude ? category : category.categories
    );
  },

  getRelatedCategories(
    selectedPath: Category[],
    options: FilterOptions | undefined,
    fallbackCategories: Category[]
  ): Category[] {
    const app = (window as any).HSApp?.App?.getApp();
    const currentCommand = app?.cmdManager?.current;
    const activeEnvironmentId = app?.activeEnvironmentId;

    let relatedCategories: Category[] = [];
    const pathLength = selectedPath.length;

    if (
      (this.isReplaceModelCmd() || activeEnvironmentId === ENVIRONMENT_CUSTOMIZED_MODELING) &&
      pathLength >= 2
    ) {
      relatedCategories = selectedPath[pathLength - 2].categories ?? [];
    }

    if (
      relatedCategories.length === 0 &&
      pathLength > 0 &&
      currentCommand?.type === COMMAND_TYPE_CHANGE_PARAMETRIC
    ) {
      relatedCategories = [selectedPath[pathLength - 1]];
    }

    const result = this.getRelatedCategoriesRes(selectedPath, relatedCategories);
    return result.length ? result : fallbackCategories;
  },

  getRelatedCategoriesRes(selectedPath: Category[], categories: Category[]): Category[] {
    let result = categories;

    const floorplanMagic = (window as any).HSCore?.Doc?.FloorplanMeta?.magic;
    if (floorplanMagic === MAGIC_VALUE) {
      const filtered = selectedPath.filter((cat) => cat.id === FILTER_CATEGORY_ID);
      if (filtered.length > 0) {
        result = categories.filter((cat) => cat.id !== EXCLUDED_CATEGORY_ID);
      }
    }

    return result;
  },

  getSelectedCategory(categories: Category | Category[], options?: FilterOptions): Category[] {
    const path: Category[] = [];
    const categoriesArray = Array.isArray(categories) ? categories : [categories];

    if (options?.query?.categoryId) {
      this.getEntryCategoryById(options.query.categoryId, categoriesArray, path);
    }

    return path;
  },

  getEntryCategoryById(targetId: string, categories: Category[], path: Category[]): boolean {
    if (!targetId) return false;

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      if (category?.id === targetId) {
        path.push(category);
        return true;
      }

      if (category?.categories && category.categories.length > 0) {
        path.push(category);
        if (this.getEntryCategoryById(targetId, category.categories, path)) {
          return true;
        }
        path.pop();
      }
    }

    return false;
  },

  getUserSessionId(): Promise<string> {
    const sessionId = (window as any).adskUser?.getUserSessionId();
    return sessionId ? Promise.resolve(sessionId) : Promise.reject("not loggedin");
  },

  getRefRect(ref: React.RefObject<HTMLElement> | undefined, property: string): number {
    if (ref?.current) {
      return (ref.current.getBoundingClientRect() as Record<string, number>)[property] ?? 0;
    }
    return 0;
  },

  calcHeight(
    property: string,
    positiveRefs: Array<React.RefObject<HTMLElement>>,
    negativeRefs: Array<React.RefObject<HTMLElement>>
  ): number {
    let positiveSum = 0;
    for (let i = 0; i < positiveRefs.length; i++) {
      positiveSum += this.getRefRect(positiveRefs[i], property);
    }

    let negativeSum = 0;
    for (let i = 0; i < negativeRefs.length; i++) {
      negativeSum += this.getRefRect(negativeRefs[i], property);
    }

    return positiveSum - negativeSum;
  },

  addFavoriteTopic(sourceId: string): Promise<Record<string, unknown>> {
    return (window as any).NWTK.mtop.Catalog.addFavoriteTopic({
      data: {
        sourceId,
        favoritesType: FAVORITES_TYPE,
      },
    })
      .then((response: any) => {
        const data = response.data;
        if (response?.ret?.[0]?.includes("SUCCESS") && data) {
          return data ?? {};
        }
        return Promise.reject();
      })
      .catch((error: unknown) => Promise.reject(error));
  },

  getFavTopicFolderId(): Promise<unknown> {
    return (window as any).NWTK.mtop.Catalog.getFavTopicFolderId({
      data: {
        whetherDefault: 0,
        favoritesType: FAVORITES_TYPE,
      },
    })
      .then((response: any) => {
        const data = response.data;
        if (response?.ret?.[0]?.includes("SUCCESS") && data) {
          return data;
        }
        return Promise.reject();
      })
      .catch((error: unknown) => Promise.reject(error));
  },

  isReplaceModelCmd(): boolean {
    const app = (window as any).HSApp?.App?.getApp();
    const currentCommand = app?.cmdManager?.current;
    const commandType = currentCommand?.type;

    return (
      commandType === COMMAND_TYPE_SMART_REPLACE ||
      commandType === COMMAND_TYPE_CHANGE_SMART_MOLDING ||
      commandType === COMMAND_TYPE_CHANGE_MOLDING
    );
  },

  getModelRecovery(): boolean {
    const app = (window as any).HSApp?.App?.getApp();
    return (
      this.isReplaceModelCmd() &&
      app?.activeEnvironmentId === ENVIRONMENT_DEFAULT
    );
  },

  showMakeCustomMenuRedPoint(): boolean {
    const storageKey = "NEW_STATUS_FOR_CUSTOMIZE_CW";
    return localStorage.getItem(storageKey) !== "false";
  },

  showMenuItemNewIcon(storageKey: string): boolean {
    return localStorage.getItem(storageKey) !== "false";
  },

  recordHideMenuItemNewIcon(storageKey: string): void {
    localStorage.setItem(storageKey, "false");
  },
};