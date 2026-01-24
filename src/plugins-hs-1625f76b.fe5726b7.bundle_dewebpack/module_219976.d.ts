/**
 * 模型搭配构建器模块
 * 用于将房间模型搭配数据转换为产品迷你对象
 */

/**
 * 房间模型搭配原始数据接口
 */
interface RoomModelCollocationData {
  /** 模型搭配ID */
  modelCollocationId: string | number;
  /** 搭配名称 */
  name: string;
  /** 搭配描述 */
  description: string;
  /** 封面图片URL */
  coverUrl: string;
  /** 在线状态 */
  onlineStatus: number | boolean;
  /** 房间面积（原始值） */
  roomArea: number;
  /** 房间风格代码 */
  roomStyle: string | number;
  /** 房间类型代码 */
  roomType: string | number;
  /** 房间ID */
  roomId: string | number;
  /** 模型列表 */
  models: Array<unknown>;
}

/**
 * 产品迷你对象接口
 */
interface ProductMini {
  /** 产品ID */
  id: string | number;
  /** 产品名称 */
  name: string;
  /** 产品描述 */
  description: string;
  /** 产品图片URL */
  image: string;
  /** 产品状态 */
  status: number | boolean;
  /** 内容类型对象 */
  contentType: ContentType;
  /** 是否为迷你产品 */
  isMiniProduct: boolean;
  /** 是否可定制 */
  canCustomized: boolean;
}

/**
 * 扩展的产品迷你对象，包含房间相关信息
 */
interface ExtendedProductMini extends ProductMini {
  /** 格式化后的面积显示字符串 */
  area: string;
  /** 房间风格名称 */
  roomStyleName: string;
  /** 房间类型名称 */
  roomTypeName: string;
  /** 房间ID */
  roomId: string | number;
  /** 模型列表 */
  models: Array<unknown>;
}

/**
 * 内容类型枚举
 */
declare enum ContentTypeEnum {
  /** 模型搭配类型 */
  ModelCollocation = "ModelCollocation"
}

/**
 * 内容类型类
 */
declare class ContentType {
  /**
   * 构造函数
   * @param type - 内容类型枚举值
   */
  constructor(type: ContentTypeEnum);
}

/**
 * HSCatalog命名空间
 */
declare namespace HSCatalog {
  export { ContentType, ContentTypeEnum };
}

/**
 * 应用配置接口
 */
interface FloorplanConfig {
  /** 显示面积单位 */
  displayAreaUnit: string;
  /** 显示面积精度位数 */
  displayAreaPrecisionDigits: number;
}

/**
 * 应用实例接口
 */
interface AppInstance {
  /** 户型图配置 */
  floorplan: FloorplanConfig;
}

/**
 * HSApp命名空间（全局）
 */
declare namespace HSApp {
  /**
   * 应用管理器
   */
  namespace App {
    /**
     * 获取应用实例
     * @returns 应用实例对象
     */
    function getApp(): AppInstance;
  }

  /**
   * 工具类集合
   */
  namespace Util {
    /**
     * 单位格式化工具
     */
    namespace UnitFormater {
      /**
       * 将面积值转换为格式化的显示字符串
       * @param area - 原始面积值
       * @param unit - 显示单位
       * @param precision - 精度位数
       * @param includeUnit - 是否包含单位
       * @returns 格式化后的面积字符串
       */
      function toAreaDisplayString(
        area: number,
        unit: string,
        precision: number,
        includeUnit: boolean
      ): string;
    }
  }
}

/**
 * Utils工具类（来自936885模块）
 */
declare namespace Utils {
  /**
   * 获取房间名称属性
   * @param attributeType - 属性类型（如"roomStyleAttribute"或"roomTypeAttribute"）
   * @param code - 房间风格/类型代码
   * @returns 房间风格/类型的名称
   */
  function getRoomNameAttribute(
    attributeType: "roomStyleAttribute" | "roomTypeAttribute",
    code: string | number
  ): string;
}

/**
 * 模型搭配构建器类
 * 用于将房间模型搭配数据转换为扩展的产品迷你对象
 */
declare class ModelCollocationBuilder {
  /**
   * 构建扩展的产品迷你对象
   * @param data - 房间模型搭配原始数据
   * @returns 包含房间信息的扩展产品迷你对象
   */
  static build(data: RoomModelCollocationData): ExtendedProductMini;

  /**
   * 将房间模型搭配数据转换为基础产品迷你对象
   * @param data - 房间模型搭配原始数据
   * @returns 基础产品迷你对象
   * @private
   */
  private static _toProductMini(data: RoomModelCollocationData): ProductMini;
}

export default ModelCollocationBuilder;