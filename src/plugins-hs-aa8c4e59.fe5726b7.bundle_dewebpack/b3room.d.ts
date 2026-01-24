import type { B3Entity } from './B3Entity';
import type { B3Face } from './B3Face';
import type { B3Molding } from './B3Molding';
import type { B3CustomizedModel, CuztomizedMoadlResultType } from './B3CustomizedModel';
import type { B3NCustomizedFeatureModel, NCustomizedModelResultType } from './B3NCustomizedFeatureModel';
import type { NCustomizedFeatureModelEntity } from './NCustomizedFeatureModelEntity';

/**
 * 房间类型信息
 */
interface RoomTypeInfo {
  /** 房间实例ID */
  id: string;
  /** 房间类型 */
  type: string;
  /** 显示名称 */
  displayName: string;
  /** 自定义显示名称 */
  displayNameCustom: string;
}

/**
 * 房间基本信息
 */
interface RoomInfo {
  /** 房间ID */
  id: string;
  /** 房间类型 */
  type?: string;
  /** 显示名称 */
  displayName?: string;
  /** 自定义显示名称 */
  displayNameCustom?: string;
  /** 关联的房间列表 */
  relationRooms?: RoomTypeInfo[];
}

/**
 * 实体类型信息
 */
interface EntityType {
  /** 类型分类 */
  classType: string;
}

/**
 * BOM3实体数据
 */
interface Bom3Entity {
  /** 实体类型 */
  type: EntityType;
  /** 其他实体属性 */
  [key: string]: unknown;
}

/**
 * 自定义建模数据集合
 */
interface CustomizedModelings {
  /** 结构信息列表 */
  structures: unknown[];
  /** 参数化模型列表 */
  paramaterModels: unknown[];
  /** 草图模型列表 */
  sketchModels: unknown[];
  /** DIY模型列表 */
  diyModels: unknown[];
}

/**
 * BOM3数据结构
 */
interface Bom3Data {
  /** 实体信息 */
  entity: Bom3Entity;
  /** 房间信息 */
  roomInfo: RoomInfo;
  /** 面数据集合 */
  faces: unknown[];
  /** 内容物列表 */
  contents: unknown[];
  /** 造型线条数据 */
  moldings: unknown[];
  /** 自定义项列表 */
  customizations: unknown[];
  /** 自定义建模数据 */
  customizedModelings: CustomizedModelings;
  /** 空间周长 */
  spaceGirth?: number;
}

/**
 * 实体接口 - 表示3D场景中的房间实体
 */
interface Entity {
  /** 获取实例ID */
  getInstanceId(): string;
  /** 获取参数值 */
  getParameterValue(paramName: string): unknown;
  /** 房间类型 */
  roomType?: string;
  /** 房间类型显示名称 */
  roomTypeDisplayName?: string;
  /** 其他实体属性 */
  [key: string]: unknown;
}

/**
 * 构建上下文 - 包含房间相关的所有数据集合
 */
interface BuildContext {
  /** 房间面数据映射 */
  roomFaces: Map<string, unknown[]>;
  /** 房间造型线条映射 */
  roomMoldings: Map<string, unknown[]>;
  /** 房间内容物映射 */
  roomContents: Map<string, unknown[]>;
  /** 房间自定义项映射 */
  roomCustomizations: Map<string, unknown[]>;
  /** 房间自定义模型映射 */
  roomCustomizedModels: Map<string, unknown[]>;
}

/**
 * B3Room类 - BOM3房间数据构建器
 * 
 * 负责将3D场景中的房间实体转换为BOM3格式的数据结构，
 * 包括房间的几何信息、内容物、造型线条和自定义建模等。
 * 
 * @extends B3Entity - 继承自BOM3实体基类
 */
export declare class B3Room extends B3Entity {
  /** 构建上下文 */
  protected context: BuildContext;

  /**
   * 构造函数
   * @param context - 包含房间数据的构建上下文
   */
  constructor(context: BuildContext);

  /**
   * 构建BOM3数据
   * 
   * 将房间实体转换为完整的BOM3数据结构，包括：
   * - 实体基本信息（类型、名称等）
   * - 房间信息（ID、类型、关联房间）
   * - 几何数据（面、造型线条）
   * - 内容物和自定义项
   * - 自定义建模数据
   * 
   * @param entity - 要转换的房间实体
   * @returns 完整的BOM3数据结构
   */
  buildBom3Data(entity: Entity): Bom3Data;

  /**
   * 构建造型线条数据
   * 
   * 从上下文中提取指定房间的所有造型线条（如踢脚线、顶角线等），
   * 并转换为BOM3格式。
   * 
   * @param entity - 房间实体
   * @returns 造型线条数据数组
   */
  buildMoldingData(entity: Entity): unknown[];

  /**
   * 构建内容物数据
   * 
   * 获取房间内的所有内容物（如家具、设备等），
   * 并生成内容物信息列表。
   * 
   * @param entity - 房间实体
   * @returns 内容物信息数组
   */
  buildContentData(entity: Entity): unknown[];

  /**
   * 构建自定义项数据
   * 
   * 提取房间的自定义项（用户定制的特殊元素），
   * 并序列化为BOM3格式。
   * 
   * @param entity - 房间实体
   * @returns 自定义项数据数组
   */
  buildCustomizationData(entity: Entity): unknown[];

  /**
   * 构建自定义建模数据
   * 
   * 处理房间中的所有自定义建模元素，根据类型分类为：
   * - 结构信息（墙体、梁柱等结构元素）
   * - 参数化天花板（基于参数生成的吊顶）
   * - 草图造型线条（用户绘制的线条）
   * - DIY模型（用户自定义的3D模型）
   * 
   * 支持两种自定义模型实体类型：
   * - NCustomizedFeatureModelEntity - 新版参数化特征模型
   * - 传统CustomizedModel - 旧版自定义模型
   * 
   * @param entity - 房间实体
   * @returns 按类型分组的自定义建模数据
   */
  buildCustomizedData(entity: Entity): CustomizedModelings;
}