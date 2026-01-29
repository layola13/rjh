export enum CategoryGroupEnum {
  HARD_MATERISL = "HARD_MATERISL",
  FURNITURE = "FURNITURE",
  ELECTRICAL_APPLIANCE = "ELECTRICAL_APPLIANCE",
  EXCLUDE_CATEGORY = "EXCLUDE_CATEGORY",
  OTHER = "OTHER"
}

export enum GlobalCategoryGroupEnum {
  HARD_MATERISL = "interior finish",
  FURNITURE = "furnishing",
  ELECTRICAL_APPLIANCE = "electrical",
  EXCLUDE_CATEGORY = "EXCLUDE_CATEGORY",
  OTHER = "OTHER"
}

const HARD_MATERIAL_NAMES = [
  "涂料", "壁纸", "壁布", "壁画", "瓷砖", "地板", "马赛克", "石材",
  "背景墙", "护墙板", "吊顶", "装饰线条", "天窗", "石膏线材质",
  "镜面&玻璃", "金属", "木皮", "烤漆", "吸塑", "双饰面", "亚克力",
  "UV耐磨漆", "填缝剂", "布料", "膜压", "包覆膜", "皮革", "黑板漆",
  "PET", "防火板", "户外地面材质", "外墙材质", "门", "窗",
  "扶手/护栏", "楼梯/地台"
];

const FURNITURE_NAMES = [
  "床", "沙发", "床榻/榻", "柜/架/几", "桌几", "椅类", "墩/凳",
  "隔断/屏风", "户外家具", "定制品", "厨房", "卫浴", "吸顶灯", "吊灯",
  "厨卫灯具", "落地灯", "台灯", "壁灯", "筒灯", "射灯", "轨道灯",
  "其它灯饰", "装饰画", "墙壁饰品", "摆饰", "地面摆饰", "儿童饰品",
  "玩具", "绿植", "植物", "布艺软饰", "窗帘", "文体", "配饰",
  "春节特辑", "圣诞特辑"
];

const ELECTRICAL_APPLIANCE_NAMES = [
  "大家电", "数码影像", "厨卫电器", "水电煤", "吊顶电器", "生活电器",
  "配电箱", "开关", "插座"
];

const EXCLUDE_CATEGORY_NAMES = [
  "结构部件", "门洞", "地洞", "墙龛", "地龛", "外景", "办公空间",
  "宾馆酒店餐饮", "商场超市", "人物", "临时", "品牌Logo", "定制衣柜"
];

interface CategoryItem {
  id: number;
  name: string;
  categories: CategoryItem[];
}

interface CatalogData {
  items?: CategoryItem[];
  [key: string]: unknown;
}

type IDGroupMap = Record<string, number[]>;

type PlatformType = "fp" | string;

class BackendCatalogHelper {
  private categoryTreeMap: Map<number, string> = new Map();
  private iDGroup?: IDGroupMap;
  private hardMaterialId: number[] = [];
  private furnitureId: number[] = [];
  private electricalApplianceId: number[] = [];
  private excludeCategory: number[] = [];
  private categoryTypeMap: Map<number, string> = new Map();

  setCatalogData(catalogData: CatalogData, platform: PlatformType): void {
    this.categoryTreeMap = this.initCategoryTreeMap(catalogData, platform);
  }

  private initCategoryTreeMap(catalogData: CatalogData, platform: PlatformType): Map<number, string> {
    const categoryTreeMap = new Map<number, string>();
    const categoryTypeMap = new Map<number, string>();
    const hardMaterialIds: number[] = [];
    const furnitureIds: number[] = [];
    const electricalApplianceIds: number[] = [];
    const excludeCategoryIds: number[] = [];
    const otherIds: number[] = [];

    const enumGroup = platform === "fp" ? GlobalCategoryGroupEnum : CategoryGroupEnum;

    this.iDGroup = {
      [enumGroup.HARD_MATERISL]: hardMaterialIds,
      [enumGroup.FURNITURE]: furnitureIds,
      [enumGroup.ELECTRICAL_APPLIANCE]: electricalApplianceIds,
      [enumGroup.OTHER]: otherIds
    };

    const traverseCategories = (categories: CategoryItem[], parentPath: string): void => {
      categories.forEach((category) => {
        const currentPath = `${parentPath}/${category.id}`;
        categoryTreeMap.set(category.id, currentPath);

        const categoryTypeName = this.getCategoryTypeNameByPlatform(category.name, platform);

        if (HARD_MATERIAL_NAMES.includes(category.name)) {
          hardMaterialIds.push(category.id);
          categoryTypeMap.set(category.id, categoryTypeName);
        } else if (FURNITURE_NAMES.includes(category.name)) {
          furnitureIds.push(category.id);
          categoryTypeMap.set(category.id, categoryTypeName);
        } else if (ELECTRICAL_APPLIANCE_NAMES.includes(category.name)) {
          electricalApplianceIds.push(category.id);
          categoryTypeMap.set(category.id, categoryTypeName);
        } else if (EXCLUDE_CATEGORY_NAMES.includes(category.name)) {
          excludeCategoryIds.push(category.id);
          categoryTypeMap.set(category.id, categoryTypeName);
        } else {
          otherIds.push(category.id);
        }

        traverseCategories(category.categories, currentPath);
      });
    };

    traverseCategories(catalogData.items || (catalogData as unknown as CategoryItem[]), "");

    this.hardMaterialId = hardMaterialIds;
    this.furnitureId = furnitureIds;
    this.electricalApplianceId = electricalApplianceIds;
    this.excludeCategory = excludeCategoryIds;
    this.categoryTypeMap = categoryTypeMap;

    return categoryTreeMap;
  }

  private getCategoryTypeNameByPlatform(name: string, platform: PlatformType): string {
    if (this.isGlobal()) {
      return this.getEnCategoryTypeName(name);
    }
    return name;
  }

  private isGlobal(): boolean {
    return false;
  }

  private getEnCategoryTypeName(name: string): string {
    return name;
  }

  getValidCategory(categoryId: number | number[]): number | undefined {
    if (Array.isArray(categoryId)) {
      return categoryId.find((id) => this.categoryTreeMap.get(id));
    }
    return categoryId;
  }

  getValidCategoryType(categoryString?: string): number | undefined {
    if (!categoryString) {
      return undefined;
    }
    const categoryIds = categoryString.split(", ").map(Number);
    return this.getValidCategory(categoryIds);
  }

  getCategoryTreePath(categoryId: number): string | undefined {
    return this.categoryTreeMap.get(categoryId);
  }

  getCategoryTypeName(categoryId?: number): string | undefined {
    if (!categoryId) {
      return undefined;
    }

    const treePath = this.getCategoryTreePath(categoryId);
    if (!treePath) {
      return undefined;
    }

    const allCategoryIds = [
      ...this.hardMaterialId,
      ...this.furnitureId,
      ...this.electricalApplianceId
    ];

    const matchedId = allCategoryIds.find((id) => treePath.includes(String(id)));
    return matchedId ? this.categoryTypeMap.get(matchedId) : undefined;
  }

  getGroupLevelType(categoryId: number, platform: PlatformType): string {
    const enumGroup = platform === "fp" ? GlobalCategoryGroupEnum : CategoryGroupEnum;
    const treePath = this.getCategoryTreePath(categoryId);

    if (!treePath) {
      return enumGroup.OTHER;
    }

    const pathIncludesAny = (ids: number[], path: string): boolean => {
      return ids.some((id) => path.includes(String(id)));
    };

    if (pathIncludesAny(this.hardMaterialId, treePath)) {
      return enumGroup.HARD_MATERISL;
    }
    if (pathIncludesAny(this.furnitureId, treePath)) {
      return enumGroup.FURNITURE;
    }
    if (pathIncludesAny(this.electricalApplianceId, treePath)) {
      return enumGroup.ELECTRICAL_APPLIANCE;
    }
    if (pathIncludesAny(this.excludeCategory, treePath)) {
      return enumGroup.EXCLUDE_CATEGORY;
    }

    return enumGroup.OTHER;
  }

  getGroupLevelIndex(categoryId: number, platform: PlatformType): number {
    const groupType = this.getGroupLevelType(categoryId, platform);
    const treePath = this.getCategoryTreePath(categoryId);

    if (!treePath) {
      return Number.MAX_VALUE;
    }

    if (!this.iDGroup || !this.iDGroup[groupType]) {
      return 0;
    }

    const index = this.iDGroup[groupType].findIndex((id) => treePath.includes(String(id)));
    return index >= 0 ? index : 0;
  }
}

export const backendCatalogHelper = new BackendCatalogHelper();