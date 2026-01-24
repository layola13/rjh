/**
 * BOM服务插件 - 用于从实体计算几何属性并生成物料清单
 * @module BomServicePlugin
 */

/**
 * BOM过滤选项配置
 */
export interface BomFilterOptions {
  /** 是否获取障碍物路径 */
  isGetObstaclePath?: boolean;
  /** 铺装配置 */
  pave?: {
    /** 是否启用图案自适应材料尺寸 */
    isPatternAdaptiveMaterialSize?: boolean;
  };
}

/**
 * BOM数据处理选项
 */
export interface Bom2ProcessOptions {
  /** 过滤选项 */
  filterOptions?: BomFilterOptions;
  /** 语言环境代码 */
  lang?: string;
}

/**
 * BOM数据获取选项
 */
export interface Bom2DataOptions {
  /** 语言环境代码 */
  lang?: string;
}

/**
 * 实体类型配置
 */
export interface EntityConfig {
  /** 实体类名 */
  Class: string;
  /** 实体扩展属性 */
  [key: string]: unknown;
}

/**
 * BOM数据结构
 */
export interface BomData {
  /**
   * 获取根实体列表
   * @returns 根实体数组
   */
  getRootEntities(): Entity[];
}

/**
 * 实体基类
 */
export interface Entity {
  /** 实体唯一标识 */
  id?: string;
  /** 实体类型 */
  type?: string;
  /** 实体属性集合 */
  properties?: Record<string, unknown>;
}

/**
 * BOM3格式数据结构
 */
export interface Bom3Data {
  /** BOM项目列表 */
  items?: Bom3Item[];
  /** 元数据信息 */
  metadata?: Record<string, unknown>;
}

/**
 * BOM3项目条目
 */
export interface Bom3Item {
  /** 产品ID */
  productId?: string;
  /** 数量 */
  quantity?: number;
  /** 单位 */
  unit?: string;
  /** 规格属性 */
  specifications?: Record<string, unknown>;
}

/**
 * BOM2格式数据结构
 */
export interface Bom2Data {
  /** 材料列表 */
  materials?: Bom2Material[];
  /** 汇总信息 */
  summary?: Record<string, unknown>;
}

/**
 * BOM2材料条目
 */
export interface Bom2Material {
  /** 材料名称 */
  name?: string;
  /** 材料编码 */
  code?: string;
  /** 用量 */
  usage?: number;
  /** 单价 */
  price?: number;
}

/**
 * BOM2状态数据
 */
export interface Bom2DataWithStatus extends Bom2Data {
  /** 处理状态 */
  status?: 'success' | 'error' | 'partial';
  /** 错误信息 */
  errors?: string[];
  /** 警告信息 */
  warnings?: string[];
}

/**
 * BOM4格式数据（原始数据格式）
 */
export type Bom4Data = BomData;

/**
 * 实体序列化结果
 */
export interface SerializedEntity {
  /** 实体类型 */
  type: string;
  /** 实体数据 */
  data: Record<string, unknown>;
  /** 子实体 */
  children?: SerializedEntity[];
}

/**
 * 配对映射表
 */
export type MateMap = Map<string, unknown>;

/**
 * 房屋建模结果
 */
export interface HouseModelingResult {
  /** 建模数据 */
  data?: Record<string, unknown>;
  /** 建模状态 */
  status?: string;
}

/**
 * BOM服务插件类
 * 提供物料清单的生成、转换和处理功能
 */
export default class BomServicePlugin extends HSApp.Plugin.IPlugin {
  /**
   * 构造函数
   * 初始化BOM服务插件
   */
  constructor();

  /**
   * 插件激活时的回调
   * @param app - 应用实例
   * @param config - 配置参数
   */
  onActive(app: unknown, config: unknown): void;

  /**
   * 处理并生成BOM3格式数据
   * @returns BOM3格式的物料清单数据
   */
  process(): Promise<Bom3Data>;

  /**
   * 处理单个实体
   * @param entityConfig - 实体配置对象
   * @returns 创建的实体实例
   */
  processOneEntity(entityConfig: EntityConfig): Promise<Entity>;

  /**
   * 生成BOM2格式数据
   * @param options - 过滤和处理选项
   * @returns BOM2格式的物料清单数据
   */
  processBom2(options?: BomFilterOptions): Promise<Bom2Data>;

  /**
   * 获取BOM2数据（自定义参数）
   * @param param1 - 参数1
   * @param param2 - 参数2
   * @param param3 - 参数3
   * @param options - 数据获取选项
   * @returns BOM2格式数据
   */
  getBom2Data(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    options?: Bom2DataOptions
  ): Promise<Bom2Data>;

  /**
   * 生成带状态信息的BOM2数据
   * @returns 包含状态的BOM2数据
   */
  processBom2WithStatus(): Promise<Bom2DataWithStatus>;

  /**
   * 生成BOM4格式数据（原始数据）
   * @param param - 处理参数
   * @param options - 过滤选项
   * @returns BOM4原始数据
   */
  processBom4(param: unknown, options?: BomFilterOptions): Promise<Bom4Data>;

  /**
   * 生成BOM4 JSON格式数据
   * @returns 序列化后的实体JSON数组
   */
  processBom4Json(): Promise<SerializedEntity[]>;

  /**
   * 将BOM数据转换为BOM3格式
   * @param bomData - 原始BOM数据
   * @returns BOM3格式数据
   */
  bomDataToBom3(bomData: BomData): Bom3Data;

  /**
   * 设置调试环境标志
   * @param isDebug - 是否启用调试模式
   */
  setDubugEnv(isDebug: boolean): void;

  /**
   * 加载实体
   * @param entityData - 实体数据
   * @returns 加载的实体实例
   */
  loadEntity(entityData: unknown): Entity;

  /**
   * 序列化实体为JSON对象
   * @param entity - 要序列化的实体
   * @returns 序列化后的实体数据
   */
  dumpEntity(entity: Entity): SerializedEntity;

  /**
   * 处理房屋建模
   * @returns 房屋建模结果
   */
  processHouseModeling(): Promise<HouseModelingResult>;

  /**
   * 根据面收集涂料产品ID
   * @param face - 面数据
   * @returns 产品ID集合
   */
  collectPaintsProductIdsByFace(face: unknown): Set<string> | string[];
}

/**
 * 插件注册声明
 * 将BOM服务插件注册到HSApp插件系统
 */
declare module 'HSApp' {
  namespace Plugin {
    /**
     * 插件基类接口
     */
    interface IPlugin {
      /** 插件名称 */
      name: string;
      /** 插件描述 */
      description: string;
      /** 依赖项列表 */
      dependencies: string[];
    }

    /**
     * 注册插件到系统
     * @param pluginType - 插件类型标识
     * @param pluginClass - 插件类构造函数
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: new () => IPlugin
    ): void;
  }
}

declare module 'HSFPConstants' {
  namespace PluginType {
    /** BOM服务插件类型常量 */
    const BomService: string;
  }
}