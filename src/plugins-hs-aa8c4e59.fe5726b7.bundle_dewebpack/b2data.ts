export class B2Data {
  private bomData: any;
  private context: B2Context;
  private categoryHandle: CategoryHandle;

  constructor(bomData: any) {
    this.bomData = bomData;
    this.context = new B2Context(this.bomData);
    this.categoryHandle = categoryHandle;
  }

  async genBom2Data(param: any, options?: BuildOptions): Promise<Bom2DataResult> {
    await this.initCategoryData(options);
    return this.buildData("", options);
  }

  async buildData(prefix: string, options?: BuildOptions): Promise<Bom2DataResult> {
    const layerList = new B2Layer(this.context).buildBom2Data();
    const roomList = new B2Room(this.context).buildBom2Data();
    const contentData = new B2Content(this.context).buildBom2Data();
    const materialData = new B2Material(this.context).buildBom2Data(options);
    const designInfo = new B2Design(this.context).buildBom2Data();
    const moldingData = new B2Molding(this.context).buildBom2Data(options);
    
    const mergedData = [...contentData, ...moldingData, ...materialData];
    const contentInfo = await this.organizeData(mergedData, options);
    
    const categoryConfig = this.categoryHandle.getCategoryConfig();
    const config = categoryConfig?.map((category) => ({
      id: category.id,
      name: category.name,
      nickName: category.nickName
    }));

    return {
      layerList,
      roomList,
      designInfo,
      contentInfo,
      config
    };
  }

  async getData(catalogData: any, catalogId: string, options?: BuildOptions): Promise<Bom2DataResult> {
    backendCatalogHelper.setCatalogData(catalogData, catalogId);
    await this.categoryHandle.init(catalogData, catalogId, options?.lang);
    const result = await this.buildData(catalogId, options);
    return result;
  }

  async genBom2DataWithStus(param?: any): Promise<StatusResponse<Bom2DataResult>> {
    const status: StatusInfo = {
      code: -1,
      message: "OK"
    };
    const data = await this.genBom2Data(param);
    return {
      status,
      data
    };
  }

  initCategoryData(options?: BuildOptions): Promise<void> {
    return HSApp.Catalog.BaseApiManager.getInstance()
      .getCategoryTree({ treeId: "backend-category-root" })
      .then(async (categoryTree) => {
        backendCatalogHelper.setCatalogData(categoryTree);
        await this.categoryHandle.init(categoryTree, undefined, options?.lang);
      });
  }

  filterItem(params: FilterItemParams): boolean {
    const { item, bomCategory, categoryGroup, filterOptions, seekBelong } = params;

    if (!(filterOptions?.hardload || filterOptions?.appliance || filterOptions?.furniture)) {
      return true;
    }

    if (seekBelong && filterOptions?.belongTypes) {
      const seekId = item.seekId;
      const belongMatches = filterOptions.belongTypes.some((belongType) => 
        seekBelong[seekId]?.includes(belongType)
      );
      if (!belongMatches) {
        return false;
      }
    }

    const categoryTypeMap: Record<string, string> = {
      material: "tiles",
      door: "door",
      opening: "window",
      backgroundWall: "background_wall"
    };

    const groupId = categoryGroup.id;
    if (groupId !== "hardload") {
      return filterOptions?.[groupId] ?? false;
    }

    const hardloadFilter = filterOptions.hardload;
    if (typeof hardloadFilter === "boolean") {
      return hardloadFilter;
    }

    if (!Array.isArray(hardloadFilter)) {
      return false;
    }

    return hardloadFilter.some((filterType) => {
      if (filterType !== "others") {
        return bomCategory.id === categoryTypeMap[filterType];
      }

      const knownCategoryIds = Object.keys(categoryTypeMap).reduce((acc, key) => {
        return [...acc, categoryTypeMap[key]];
      }, [] as string[]);

      return !knownCategoryIds.includes(bomCategory.id);
    });
  }

  async getSeekBelong(
    seekIds: string[],
    filterOptions?: FilterOptions,
    seekBelongFn?: SeekBelongFunction
  ): Promise<SeekBelongMap> {
    if (!seekIds.length || !filterOptions?.belongTypes || !seekBelongFn) {
      return {};
    }

    const result = await seekBelongFn({
      umsId: filterOptions.umsId,
      jidList: seekIds,
      enterpriseId: filterOptions.enterpriseId,
      poolId: filterOptions.poolId
    });

    return result;
  }

  async organizeData(items: BomItem[], options?: BuildOptions): Promise<OrganizedData> {
    const organizedData: OrganizedData = {};
    const filterOptions = options?.filterOptions;
    
    let seekBelongMap: SeekBelongMap = {};
    if (filterOptions) {
      const seekIds = items.map((item) => item.seekId).filter((id) => !!id);
      seekBelongMap = await this.getSeekBelong(seekIds, filterOptions, options?.seekBelong) || {};
    }

    const categoryConfig = this.categoryHandle.getCategoryConfig();
    categoryConfig?.forEach((category) => {
      organizedData[category.id] = [];
    });

    const categoryMap = this.categoryHandle.getCategoryMap();
    
    items.forEach((item) => {
      const categoryTypeId = item.categoryTypeId;
      const categoryName = item.category;
      const categoryHandle = this.categoryHandle;
      
      let categoryType: Category | undefined;
      if (categoryTypeId) {
        categoryType = categoryMap.get(categoryTypeId)?.category;
      } else {
        categoryType = categoryHandle.getCategory(categoryName);
      }

      if (categoryType) {
        item.categoryType = categoryType.nickName || categoryType.name;
        item.categoryTypeId = categoryType.id;
      }
    });

    const processedItems = await elementHandle.before(items);
    this._classifyDatas(processedItems, organizedData, filterOptions, seekBelongMap);

    const entries = Object.entries(organizedData);
    for (let index = 0; index < entries.length; index++) {
      const [groupId, groupItems] = entries[index];
      const sortedItems = await elementHandle.after(groupItems);
      
      sortedItems.sort((itemA, itemB) => {
        const indexA = categoryMap.get(itemA.categoryTypeId)?.index || 0;
        const indexB = categoryMap.get(itemB.categoryTypeId)?.index || 0;
        return indexA - indexB;
      });

      organizedData[groupId] = sortedItems;
    }

    return organizedData;
  }

  private _classifyDatas(
    items: BomItem[],
    organizedData: OrganizedData,
    filterOptions?: FilterOptions,
    seekBelongMap?: SeekBelongMap
  ): void {
    const itemMap = new Map<string, BomItem>();
    const categoryMap = this.categoryHandle.getCategoryMap();

    items.forEach((item) => {
      const seekId = item.seekId;
      const classifyKey = this._getClassifyKey(seekId, item.roomId, item.locationName);
      const existingItem = itemMap.get(classifyKey);

      if (existingItem) {
        existingItem.count += item.count;
        
        if (existingItem.locationFaceArea && item.locationFaceArea) {
          existingItem.locationFaceArea += item.locationFaceArea;
        }

        if (existingItem.realSizeList && item.realSizeList) {
          existingItem.realSizeList = [...existingItem.realSizeList, ...item.realSizeList];
        }
        return;
      }

      if (item.categoryTypeId) {
        const bomCategory = categoryMap.get(item.categoryTypeId)?.category;
        const categoryGroup = categoryHandle.getCategoryGroupByCategoryId(item.categoryTypeId);

        if (categoryGroup && this.filterItem({
          item,
          bomCategory,
          categoryGroup,
          filterOptions,
          seekBelong: seekBelongMap
        })) {
          itemMap.set(classifyKey, item);
        }
      }
    });

    itemMap.forEach((item) => {
      if (item.categoryTypeId) {
        if (item.keepInteger) {
          const floorCount = Math.floor(item.count);
          if (MathUtil.isNearlyEqual(item.count, floorCount)) {
            item.count = floorCount;
          } else {
            const ceilCount = Math.ceil(item.count);
            item.count = ceilCount;
          }
          delete item.keepInteger;
        }

        const categoryGroup = categoryHandle.getCategoryGroupByCategoryId(item.categoryTypeId);
        if (categoryGroup) {
          organizedData[categoryGroup.id] = organizedData[categoryGroup.id] || [];
          organizedData[categoryGroup.id].push(item);
        }
      }
    });
  }

  private _getClassifyKey(
    seekId: string,
    roomId: string,
    locationName: string = "",
    extraKey: string = ""
  ): string {
    return `${seekId}${roomId}${locationName}${extraKey}`;
  }
}

interface BuildOptions {
  lang?: string;
  filterOptions?: FilterOptions;
  seekBelong?: SeekBelongFunction;
}

interface FilterOptions {
  hardload?: boolean | string[];
  appliance?: boolean;
  furniture?: boolean;
  belongTypes?: string[];
  umsId?: string;
  enterpriseId?: string;
  poolId?: string;
}

interface FilterItemParams {
  item: BomItem;
  bomCategory: Category;
  categoryGroup: CategoryGroup;
  filterOptions?: FilterOptions;
  seekBelong?: SeekBelongMap;
}

interface BomItem {
  seekId: string;
  roomId: string;
  locationName?: string;
  categoryTypeId?: string;
  category?: string;
  categoryType?: string;
  count: number;
  locationFaceArea?: number;
  realSizeList?: any[];
  keepInteger?: boolean;
}

interface Category {
  id: string;
  name: string;
  nickName?: string;
  index?: number;
}

interface CategoryGroup {
  id: string;
  name: string;
  nickName?: string;
}

interface Bom2DataResult {
  layerList: any[];
  roomList: any[];
  designInfo: any;
  contentInfo: OrganizedData;
  config?: CategoryConfig[];
}

interface CategoryConfig {
  id: string;
  name: string;
  nickName?: string;
}

interface StatusInfo {
  code: number;
  message: string;
}

interface StatusResponse<T> {
  status: StatusInfo;
  data: T;
}

interface OrganizedData {
  [categoryGroupId: string]: BomItem[];
}

interface SeekBelongMap {
  [seekId: string]: string[];
}

interface SeekBelongParams {
  umsId?: string;
  jidList: string[];
  enterpriseId?: string;
  poolId?: string;
}

type SeekBelongFunction = (params: SeekBelongParams) => Promise<SeekBelongMap>;

interface CategoryHandle {
  init(catalogData: any, catalogId?: string, lang?: string): Promise<void>;
  getCategory(categoryName: string): Category | undefined;
  getCategoryConfig(): Category[] | undefined;
  getCategoryMap(): Map<string, { category: Category; index?: number }>;
  getCategoryGroupByCategoryId(categoryId: string): CategoryGroup | undefined;
}