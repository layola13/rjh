/**
 * B2Context 模块 - BOM数据上下文管理器
 * 用于管理和查询建筑/室内设计中的业务实体数据
 */

/**
 * 参数名称枚举
 */
export declare namespace ParameterNames {
  /** 图层ID参数 */
  export const layerId: string;
  /** 房间ID参数 */
  export const roomId: string;
}

/**
 * 内容类型枚举
 */
export declare namespace HSCatalog {
  export enum ContentTypeEnum {
    /** 自定义家具类型 */
    ext_CustomizedFurniture = "ext_CustomizedFurniture"
  }
}

/**
 * 业务实体基础接口
 */
export interface BusinessEntity {
  /** 实例对象 */
  instance: {
    /**
     * 获取参数值
     * @param paramName 参数名称
     * @returns 参数值
     */
    getParameterValue(paramName: string): string | undefined;
  };
  /** 实体类型信息 */
  type?: {
    /** 内容类型 */
    contentType?: string;
  };
}

/**
 * 内容实体接口
 */
export interface ContentEntity extends BusinessEntity {
  type: {
    contentType: string;
  };
}

/**
 * BOM数据接口
 */
export interface BomData {
  /**
   * 获取指定类型的业务实体集合
   * @param options 查询选项
   * @returns 业务实体数组
   */
  getBusinessEntities(options: { type: string }): BusinessEntity[];
}

/**
 * 元数据映射接口
 */
export interface MetaMap {
  [key: string]: unknown;
}

/**
 * 谓词接口 - 用于实体过滤
 */
export interface Predicate<T = BusinessEntity> {
  /**
   * 测试实体是否满足条件
   * @param entity 业务实体
   * @returns 是否满足条件
   */
  test(entity: T): boolean;
  
  /**
   * 与另一个谓词进行逻辑与操作
   * @param other 另一个谓词
   * @returns 组合谓词
   */
  and(other: Predicate<T>): Predicate<T>;
  
  /**
   * 与另一个谓词进行逻辑或操作
   * @param other 另一个谓词
   * @returns 组合谓词
   */
  or(other: Predicate<T>): Predicate<T>;
  
  /**
   * 对当前谓词取反
   * @returns 反向谓词
   */
  not(): Predicate<T>;
}

/**
 * 类型谓词 - 按实体类型过滤
 */
export declare class TypePredicate implements Predicate {
  constructor(type: string);
}

/**
 * 房间谓词 - 过滤房间实体
 */
export declare class RoomPredicate implements Predicate {}

/**
 * 图层谓词 - 过滤图层实体
 */
export declare class LayerPredicate implements Predicate {}

/**
 * 面谓词 - 过滤面实体
 */
export declare class FacePredicate implements Predicate {}

/**
 * 内容谓词 - 过滤内容实体
 */
export declare class ContentPredicate implements Predicate<ContentEntity> {}

/**
 * 开口谓词 - 过滤开口实体
 */
export declare class OpeningPredicate implements Predicate {}

/**
 * 参数化窗户谓词
 */
export declare class ParametricWindowPredicate implements Predicate {}

/**
 * 参数化开口谓词
 */
export declare class ParametricOpeningPredicate implements Predicate {}

/**
 * 普通装饰线谓词
 */
export declare class NormalMoldingPredicate implements Predicate {}

/**
 * 铺装谓词 - 过滤铺装实体
 */
export declare class PavePredicate implements Predicate {}

/**
 * 表达式谓词 - 使用自定义函数过滤
 */
export declare class ExpressionPredicate<T = BusinessEntity> implements Predicate<T> {
  constructor(predicate: (entity: T) => boolean);
}

/**
 * BOM数据库API接口
 */
export interface BomDataBase {
  /**
   * 查找第一个匹配的实体
   * @param entities 实体数组
   * @param predicate 过滤谓词
   * @returns 匹配的实体或undefined
   */
  find<T extends BusinessEntity>(entities: T[], predicate: Predicate<T>): T | undefined;
  
  /**
   * 查找所有匹配的实体
   * @param entities 实体数组
   * @param predicate 过滤谓词
   * @returns 匹配的实体数组
   */
  findAll<T extends BusinessEntity>(entities: T[], predicate: Predicate<T>): T[];
}

/**
 * BOM数据库类
 */
export declare class BomDataBase {
  constructor(bomData: BomData);
}

/**
 * 按字符串键分组
 * @param entities 实体数组
 * @param keyExtractor 键提取函数
 * @returns 分组后的Map对象
 */
export declare function groupByStringKey<T>(
  entities: T[],
  keyExtractor: (entity: T) => string | undefined
): Map<string, T[]>;

/**
 * 检查内容类型是否匹配
 * @param contentType 内容类型
 * @param targetType 目标类型
 * @returns 是否匹配
 */
export declare function contentTypeIsTypeOf(
  contentType: string,
  targetType: string
): boolean;

/**
 * 设计实体接口
 */
export interface DesignEntity extends BusinessEntity {
  /** 设计相关属性 */
  [key: string]: unknown;
}

/**
 * B2Context - BOM数据上下文主类
 * 负责初始化和管理所有业务实体数据
 */
export declare class B2Context {
  /** BOM原始数据 */
  readonly bomData: BomData;
  
  /** 元数据映射 */
  readonly metaMap: MetaMap;
  
  /** 数据库API实例 */
  dbApi: BomDataBase;
  
  /** 图层实体集合 */
  layers: BusinessEntity[];
  
  /** 铺装实体集合 */
  paves: BusinessEntity[];
  
  /** 房间实体集合 */
  rooms: BusinessEntity[];
  
  /** 按图层ID分组的房间映射 */
  layerRooms: Map<string, BusinessEntity[]>;
  
  /** 按房间ID分组的面映射 */
  roomFaces: Map<string, BusinessEntity[]>;
  
  /** 内容实体集合(不包含自定义家具) */
  contents: ContentEntity[];
  
  /** 开口实体集合(包含窗户和门等) */
  openings: BusinessEntity[];
  
  /** 自定义实体集合 */
  customizedEntities: BusinessEntity[];
  
  /** 自定义参数化模型实体集合 */
  customizationPMEntities: BusinessEntity[];
  
  /** 装饰线实体集合 */
  moldings: BusinessEntity[];
  
  /** 设计信息实体 */
  designEntity: DesignEntity | undefined;
  
  /**
   * 构造函数
   * @param bomData BOM数据对象
   * @param metaMap 元数据映射
   */
  constructor(bomData: BomData, metaMap: MetaMap);
  
  /**
   * 初始化上下文
   * 加载并分类所有业务实体数据
   */
  init(): void;
  
  /**
   * 获取设计信息
   * 查询并设置设计实体
   */
  getDesignInfo(): void;
  
  /**
   * 获取平面图业务实体
   * 查询并分类房间、图层、面、内容、开口等实体
   */
  getFloorPlanBusinessEntities(): void;
  
  /**
   * 获取铺装业务实体
   * 查询所有铺装相关的实体
   */
  getPaveBusinessEntities(): void;
}