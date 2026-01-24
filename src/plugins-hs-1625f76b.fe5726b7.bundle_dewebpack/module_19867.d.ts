/**
 * 房间类型映射配置接口
 */
interface RoomTypeMapping {
  /** 新的本地化资源键 */
  newValue?: string;
  /** 房间类型枚举数组 */
  roomTypeMap: number[];
}

/**
 * 房间类型映射配置对象
 */
interface RoomTypeMappings {
  LivingDiningRoom: RoomTypeMapping;
  DiningRoom: RoomTypeMapping;
  Bedroom: RoomTypeMapping;
  KidsRoom: RoomTypeMapping;
  Kitchen: RoomTypeMapping;
  Bathroom: RoomTypeMapping;
  Library: RoomTypeMapping;
}

/**
 * 产品信息输入参数
 */
interface ProductItemInfo {
  /** 供应商信息 */
  v?: string;
  /** 供应商信息（别名） */
  vendor?: string;
  /** 内容类型 */
  contentType?: {
    isTypeOf(type: number): boolean;
  };
  /** 产品类型 */
  productType?: number;
  /** 房间类型名称 */
  roomTypeName?: string;
  /** 面积 */
  area?: string;
  /** 卧室数量 */
  bedroomCount?: number;
  /** 客厅数量 */
  livingroomCount?: number;
  /** 浴室数量 */
  bathroomCount?: number;
  /** 卧室信息（字符串格式） */
  bedroom?: string;
  /** 客厅信息 */
  livingroom?: string;
  /** 浴室信息 */
  bathroom?: string;
  /** 产品名称 */
  name: string;
}

/**
 * 产品文本信息输出
 */
interface ProductTextInfo {
  /** 主标题 */
  title: string;
  /** 副标题 */
  secondtitle: string;
}

/**
 * 模板房间设计详情
 */
interface TemplateDesignDetail {
  /** 设计版本 */
  version: string;
  /** 版权信息 */
  copyright: string;
  /** 图片URL */
  imageUrl: string;
  /** 缩略图URL */
  miniImageUrl: string;
  /** 房间类型标签 */
  label: string;
  /** 是否为全景图 */
  isPano: boolean;
  /** 房间ID */
  id: string;
}

/**
 * 后端返回的设计数据
 */
interface BackendDesignData {
  /** 图片渲染类型 */
  imageRenderingType: string;
  /** 图片URL */
  image: string;
  /** 设计版本 */
  imageDesignVersion: string;
  /** 版权信息 */
  copyright: string;
  /** 房间类型 */
  roomType: string;
  /** 房间ID */
  roomId: string;
}

/**
 * 属性值对象
 */
interface AttributeValue {
  /** 属性值ID */
  id: string;
  /** 属性值名称 */
  name?: string;
  /** 属性值显示文本 */
  value?: string;
}

/**
 * 属性对象
 */
interface Attribute {
  /** 新名称（用于缓存标识） */
  newName?: string;
  /** 属性值列表 */
  values: AttributeValue[];
}

/**
 * 筛选结果
 */
interface FacetResults {
  /** 属性列表 */
  attributes: Attribute[];
}

/**
 * 筛选器查询参数
 */
interface FilterQueryParams {
  /** 卧室数量 */
  bedroomNum?: number;
  /** 面积范围 */
  areaRange?: string;
  /** 房间风格 */
  roomStyle?: string;
  /** 房间类型ID */
  roomType?: string;
  /** 房间类型枚举数组 */
  roomTypes?: number[];
}

/**
 * 处理后的筛选器结果
 */
interface ProcessedFilters {
  /** 外层筛选器（前3个） */
  outerFilters: Attribute[];
  /** 剩余筛选器 */
  restFilters: Attribute[];
  /** 所有筛选器 */
  allFilters: Attribute[];
}

/**
 * 房间模板数据管理类
 * 提供房间模板、产品搜索、筛选器处理等功能
 */
export default class TemplateRoomDataManager {
  /**
   * 获取完整的产品项文本信息
   * @param productInfo - 产品信息对象
   * @returns 包含标题和副标题的文本信息
   */
  static getWholeProductItemTextInfo(productInfo: ProductItemInfo): ProductTextInfo;

  /**
   * 获取模板设计详情数据
   * @param params - 包含房间ID的参数对象
   * @returns Promise，返回设计详情数组
   */
  static getTemplateDesignDetailData(params: { id: string }): Promise<TemplateDesignDetail[]>;

  /**
   * 从后端或缓存获取筛选器数据
   * @param roomCategory - 房间分类（默认为1）
   * @returns Promise，返回筛选结果
   */
  static getFilterDataFromBackendOrCache(roomCategory?: number): Promise<{ facetResults: FacetResults }>;

  /**
   * 获取公共模板房间数据
   * @param params - 查询参数
   * @returns Promise，返回房间数据
   */
  static getPublicTemplateRoom(params: unknown): Promise<unknown>;

  /**
   * 获取模型频道搜索结果
   * @param params - 搜索参数
   * @returns Promise，返回搜索结果
   */
  static getModelChannelSearch(params: unknown): Promise<unknown>;

  /**
   * 获取商户公共样式产品
   * @param params - 查询参数
   * @returns Promise，返回产品数据
   */
  static getMerchentPublicStylerProduct(params: unknown): Promise<unknown>;

  /**
   * 获取我的样式产品
   * @param params - 查询参数
   * @returns Promise，返回产品数据
   */
  static getMyStylerProduct(params: unknown): Promise<unknown>;

  /**
   * 构建筛选器查询参数
   * @param filters - 筛选器Map，键为筛选器ID，值为选中的属性值
   * @returns 查询参数对象
   */
  static buildFiltersQueryParams(filters: Map<string, AttributeValue>): FilterQueryParams;

  /**
   * 处理筛选器数据
   * @param filterData - 包含facetResults的筛选数据
   * @returns 处理后的筛选器对象
   */
  static processFilters(filterData: { facetResults: FacetResults }): ProcessedFilters;

  /**
   * 获取房屋数据URL
   * @param roomId - 房间ID
   * @returns Promise，返回数据URL字符串
   */
  static getHouseDataUrl(roomId: string): Promise<string>;

  /**
   * 获取房屋数据
   * @param dataUrl - 数据URL
   * @returns Promise，返回房屋数据对象
   */
  static getHouseData(dataUrl: string): Promise<unknown>;
}