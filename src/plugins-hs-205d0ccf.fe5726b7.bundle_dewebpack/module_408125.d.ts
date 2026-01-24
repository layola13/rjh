/**
 * 家具信息和推荐数据处理工具类
 * @module FurnitureRecommendationUtil
 */

/**
 * 三维坐标/尺寸/缩放元组类型 [x, y, z]
 */
type Vector3 = [number, number, number];

/**
 * 家具信息对象接口
 */
interface FurnitureInfo {
  /** 家具唯一标识ID */
  id: string | number;
  
  /** 内容类型字符串 */
  type: string;
  
  /** 产品样式 */
  style: string;
  
  /** 尺寸 [X, Y, Z] */
  size: Vector3;
  
  /** 缩放比例 [X, Y, Z] */
  scale: Vector3;
  
  /** 位置坐标 [x, y, z] */
  position: Vector3;
  
  /** 旋转角度 [XRotation, YRotation, rotation] */
  rotation: Vector3;
}

/**
 * 房间实体接口（来自HSCore.Model）
 */
interface RoomEntity {
  /** 房间ID */
  id: string | number;
  
  /** 房间类型 */
  roomType?: string;
  
  /** 其他房间属性 */
  [key: string]: any;
}

/**
 * 实体标志枚举（来自HSCore.Model）
 */
declare enum EntityFlagEnum {
  removed = 'removed'
}

/**
 * 参数化开口对象接口（来自HSCore.Model）
 */
interface ParametricOpening {
  /** 实体ID */
  seekId: string | number;
  
  /** 内容类型 */
  contentType: ContentType;
  
  /** 元数据 */
  metadata: FurnitureMetadata;
  
  /** X轴尺寸 */
  XSize: number;
  
  /** Y轴尺寸 */
  YSize: number;
  
  /** Z轴尺寸 */
  ZSize: number;
  
  /** X轴缩放 */
  XScale: number;
  
  /** Y轴缩放 */
  YScale: number;
  
  /** Z轴缩放 */
  ZScale: number;
  
  /** X坐标 */
  x: number;
  
  /** Y坐标 */
  y: number;
  
  /** Z坐标 */
  z: number;
  
  /** X轴旋转角度 */
  XRotation: number;
  
  /** Y轴旋转角度 */
  YRotation: number;
  
  /** 主旋转角度 */
  rotation: number;
  
  /**
   * 获取孔洞的Z坐标
   * @returns Z轴坐标值
   */
  getHoleZ(): number;
  
  /**
   * 检查实体标志
   * @param flag 标志枚举值
   * @returns 是否设置了该标志
   */
  isFlagOn(flag: EntityFlagEnum): boolean;
}

/**
 * 内容类型接口
 */
interface ContentType {
  /**
   * 获取类型字符串表示
   * @returns 类型字符串
   */
  getTypeString(): string;
  
  /**
   * 检查是否为指定类型
   * @param type 要检查的内容类型枚举
   * @returns 是否匹配
   */
  isTypeOf(type: any): boolean;
}

/**
 * 家具元数据接口
 */
interface FurnitureMetadata {
  /** 产品样式 */
  productStyle: string;
  
  /** 其他元数据属性 */
  [key: string]: any;
}

/**
 * 推荐数据接口
 */
interface RecommendationData {
  /** 推荐ID，格式为 "{roomType}-{id}" */
  id: string;
  
  /** 房间类型 */
  type: string;
  
  /** 样式 */
  style: string;
  
  /** 房间面积 */
  area: number;
  
  /** 家具信息列表 */
  furniture_info: FurnitureInfo[];
}

/**
 * 家具推荐工具类
 * 用于处理家具信息和生成推荐数据
 */
declare class FurnitureRecommendationUtil {
  /**
   * 构造函数
   */
  constructor();
  
  /**
   * 从参数化开口对象提取家具信息
   * @param furniture 参数化开口对象
   * @returns 家具信息数组
   */
  static getFurnitureInfo(furniture: ParametricOpening): FurnitureInfo[];
  
  /**
   * 检查应用是否在默认环境下运行
   * @returns 是否为默认环境
   */
  static isDefaultEnv(): boolean;
  
  /**
   * 准备推荐数据
   * @param room 房间实体对象
   * @param furniture 参数化开口对象
   * @param style 样式字符串
   * @returns 格式化的推荐数据
   */
  static prepareRecommendData(
    room: RoomEntity,
    furniture: ParametricOpening,
    style: string
  ): RecommendationData;
  
  /**
   * 检查内容数组中是否存在有效的未删除实体
   * @param entities 实体数组
   * @returns 是否存在有效内容
   */
  static isContentExist(entities: Array<ParametricOpening | null | undefined>): boolean;
}

export default FurnitureRecommendationUtil;

/**
 * 全局HSApp命名空间（来自外部依赖）
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用实例
     * @returns 应用实例
     */
    function getApp(): {
      /**
       * 检查是否在默认环境下
       * @returns 是否为默认环境
       */
      isUnderDefaultEnvironment(): boolean;
    };
  }
}

/**
 * 全局HSCore命名空间（来自外部依赖）
 */
declare namespace HSCore {
  namespace Model {
    /** 参数化开口类 */
    class ParametricOpening implements ParametricOpening {}
    
    /** 实体标志枚举 */
    enum EntityFlagEnum {
      removed = 'removed'
    }
  }
  
  namespace Util {
    namespace Room {
      /**
       * 计算房间面积
       * @param room 房间实体
       * @returns 房间面积
       */
      function getArea(room: RoomEntity): number;
    }
  }
}

/**
 * 全局HSCatalog命名空间（来自外部依赖）
 */
declare namespace HSCatalog {
  /** 内容类型枚举 */
  enum ContentTypeEnum {
    /** 飘窗类型 */
    BayWindow = 'BayWindow'
  }
}