/**
 * 房间风格处理器
 * 用于处理产品目录中的房间风格属性
 */

/**
 * 房间风格属性配置
 */
interface RoomStyleConfig {
  /** 房间风格属性名称 */
  roomStyleAttrName: string;
  /** 默认无风格值 */
  roomStyleNone: string;
}

/**
 * 产品属性值
 */
interface AttributeValue {
  /** 属性值ID */
  id: string;
  /** 属性值名称 */
  name?: string;
}

/**
 * 产品属性
 */
interface ProductAttribute {
  /** 属性ID */
  id: string;
  /** 属性名称 */
  name: string;
  /** 属性值列表 */
  values: AttributeValue[];
}

/**
 * 产品类型枚举
 */
declare namespace HSCatalog {
  enum ProductTypeEnum {
    StylerTemplate = 'StylerTemplate'
  }
}

/**
 * 产品信息
 */
interface Product {
  /** 产品类型 */
  productType: HSCatalog.ProductTypeEnum;
  /** 产品属性列表 */
  attributes: ProductAttribute[];
}

/**
 * 处理结果（包含房间风格）
 */
interface ProcessResult {
  /** 房间风格ID */
  roomStyle: string;
  [key: string]: unknown;
}

/**
 * 房间风格处理器类
 * 负责从产品属性中提取并设置房间风格
 */
declare class RoomStyleProcessor {
  /** 房间风格属性ID（可选） */
  private _roomStyleAttributeId?: string;
  
  /** 房间风格属性名称 */
  private readonly _roomStyleAttributeName: string;
  
  /** 默认无风格值 */
  private readonly _roomStyleNone: string;

  /**
   * 构造函数
   * @param config - 房间风格配置
   */
  constructor(config: RoomStyleConfig);

  /**
   * 设置房间风格属性ID
   * @param attributeId - 属性ID
   */
  setRoomStyleAttributeId(attributeId: string): void;

  /**
   * 处理产品数据，提取房间风格
   * @param result - 待处理的结果对象
   * @param product - 产品信息
   * @returns 包含房间风格的处理结果
   */
  process<T extends Partial<ProcessResult>>(result: T, product: Product): T & ProcessResult;
}

export default RoomStyleProcessor;