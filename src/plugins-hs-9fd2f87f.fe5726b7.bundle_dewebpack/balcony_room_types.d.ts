/**
 * 阳台房间类型枚举
 * 定义了系统中所有阳台相关的房间类型
 */
export const BALCONY_ROOM_TYPES: ReadonlyArray<RoomTypeEnum>;

/**
 * 类别定义接口
 * 描述家具、建材等物品的分类信息
 */
export interface Category {
  /** 类别显示名称（中文） */
  name: string;
  /** 类别唯一标识符（UUID格式） */
  categoryId: string;
  /** 关联的内容类型（JSON字符串数组） */
  contentType?: string;
  /** 子内容类型 */
  subContentType?: string;
}

// ==================== 窗户类别 ====================

/**
 * 窗户类别集合
 * 包含普通窗、推拉窗、平开窗、落地窗、飘窗等所有窗户类型
 */
export const windowCategories: ReadonlyArray<Category>;

// ==================== 门类别 ====================

/**
 * 门类别集合
 * 包含单开门、双开门、推拉门、折叠门、子母门等所有门类型
 */
export const doorCategories: ReadonlyArray<Category>;

// ==================== 建筑结构类别 ====================

/**
 * 楼板开洞类别
 * 用于楼板开口、孔洞等结构处理
 */
export const slabOpeningCategory: Category;

/**
 * 地面下沉类别
 * 用于卫生间、阳台等区域的地面高度调整
 */
export const slabNicheCategory: Category;

/**
 * 墙体门洞类别
 * 用于门窗开口等墙体洞口处理
 */
export const wallOpeningCategory: Category;

/**
 * 墙龛类别
 * 用于墙体内嵌式收纳空间
 */
export const wallNicheCategory: Category;

/**
 * 烟道类别
 * 用于厨房油烟排放通道
 */
export const flueCategory: Category;

/**
 * 梁类别
 * 用于建筑结构梁
 */
export const beamCategory: Category;

/**
 * 方形柱子类别
 * 用于建筑方形承重柱
 */
export const squareColumnCategory: Category;

/**
 * 圆形柱子类别
 * 用于建筑圆形承重柱
 */
export const roundColumnCategory: Category;

/**
 * 包立管类别
 * 用于管道包裹装饰
 */
export const riserCategory: Category;

/**
 * 排污口类别
 * 用于排水管道出口
 */
export const outletCategory: Category;

/**
 * 楼梯类别
 * 包含直梯、转角梯、螺旋梯等
 */
export const stairsCategory: Category;

// ==================== 家具类别 ====================

/**
 * 装饰配件类别集合
 * 包含装饰画、挂饰、摆件、植物、镜子、窗帘等所有装饰类物品
 */
export const accessoryCategories: ReadonlyArray<Category>;

/**
 * 床类别集合
 * 包含单人床、双人床、儿童床、婴儿床、高低床等所有床类家具
 */
export const bedCategories: ReadonlyArray<Category>;

/**
 * 沙发类别集合
 * 包含单人沙发、双人沙发、L型沙发、U型沙发等所有沙发类家具
 */
export const sofaCategories: ReadonlyArray<Category>;

/**
 * 柜架几类别集合
 * 包含电视柜、衣柜、书柜、鞋柜、茶几等所有储物及台面家具
 */
export const cabinetShelfTableCategories: ReadonlyArray<Category>;

/**
 * 桌几类别集合
 * 包含书桌、餐桌、梳妆台等所有桌台类家具
 */
export const tableCategories: ReadonlyArray<Category>;

/**
 * 椅类类别集合
 * 包含书椅、餐椅、休闲椅、吧椅等所有座椅类家具
 */
export const chairCategories: ReadonlyArray<Category>;

// ==================== 卫浴类别 ====================

/**
 * 卫浴设备类别集合
 * 包含浴室柜、淋浴房、浴缸、马桶、台盆等所有卫浴设施
 */
export const bathCategories: ReadonlyArray<Category>;

// ==================== 厨房设备类别 ====================

/**
 * 厨房电器类别集合
 * 包含油烟机、热水器、洗碗机、灶具等所有厨房电器设备
 */
export const kitchenApplianceCategories: ReadonlyArray<Category>;

/**
 * 厨房岛台/吧台类别集合
 * 用于开放式厨房的岛台、吧台等
 */
export const kitchenIslandCategories: ReadonlyArray<Category>;

// ==================== 照明类别 ====================

/**
 * 吊灯类别集合
 * 包含各类吊顶式照明灯具
 */
export const chandelierCategories: ReadonlyArray<Category>;

/**
 * 吸顶灯类别集合
 * 包含各类吸顶式照明灯具
 */
export const ceilingLightCategories: ReadonlyArray<Category>;

/**
 * 射灯类别集合
 * 包含筒灯、射灯、轨道灯等局部照明设备
 */
export const spotlightCategories: ReadonlyArray<Category>;

// ==================== 家电类别 ====================

/**
 * 家用电器类别集合
 * 包含冰箱、洗衣机、空调、电视等所有大小家电
 */
export const applianceCategories: ReadonlyArray<Category>;

// ==================== BOM实体相关接口 ====================

/**
 * BOM实体接口
 * 描述物料清单中的实体对象
 */
export interface BomEntity {
  /** 类别信息 */
  category: {
    /** 类别类型ID */
    categoryType: string;
  };
}

/**
 * 内容元数据接口
 * 描述内容对象的元数据结构
 */
export interface ContentMetadata {
  /** 关联的类别ID列表 */
  categories: string[];
}

/**
 * 内容对象接口
 * 描述系统中的内容对象
 */
export interface Content {
  /** 元数据信息 */
  metadata: ContentMetadata;
}

/**
 * 家具信息接口
 * 描述家具对象的基本信息
 */
export interface FurnitureInfo {
  /** 关联的类别ID列表（可选） */
  categories?: string[];
}

// ==================== 匹配判断函数 ====================

/**
 * 判断BOM实体是否匹配指定类别
 * @param entity - BOM实体对象
 * @param category - 目标类别
 * @returns 是否匹配
 */
export function isBomEntityMatchCategory(entity: BomEntity, category: Category): boolean;

/**
 * 判断内容对象是否匹配指定类别集合中的任意一个
 * @param content - 内容对象
 * @param categories - 目标类别集合
 * @returns 是否匹配任意类别
 */
export function isContentMatchCategories(content: Content, categories: ReadonlyArray<Category>): boolean;

/**
 * 判断内容对象是否匹配指定类别
 * @param content - 内容对象
 * @param category - 目标类别
 * @returns 是否匹配
 */
export function isContentMatchCategory(content: Content, category: Category): boolean;

/**
 * 判断家具信息是否匹配指定类别集合中的任意一个
 * @param furniture - 家具信息对象
 * @param categories - 目标类别集合
 * @returns 是否匹配任意类别
 */
export function isFurnitureInfoMatchCategories(furniture: FurnitureInfo, categories: ReadonlyArray<Category>): boolean;

/**
 * 判断家具信息是否匹配指定类别
 * @param furniture - 家具信息对象
 * @param category - 目标类别
 * @returns 是否匹配
 */
export function isFurnitureInfoMatchCategory(furniture: FurnitureInfo, category: Category): boolean;