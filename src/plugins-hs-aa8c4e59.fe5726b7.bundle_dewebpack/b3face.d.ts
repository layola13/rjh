import { B3Entity } from './B3Entity';
import { B3Pave } from './B3Pave';

/**
 * 表示面积区域的参数值
 */
interface AreaParameter {
  /** 有效面积（平方单位） */
  validArea: number;
  /** 总面积（平方单位） */
  totalArea?: number;
}

/**
 * 材质尺寸信息
 */
interface MaterialSize {
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 厚度 */
  thickness?: number;
}

/**
 * 材质类别信息
 */
interface MaterialCategory {
  /** 材质唯一标识 */
  seekId: string;
  /** 材质名称 */
  name?: string;
  /** 材质类型 */
  type?: string;
}

/**
 * 区域材质信息
 */
interface RegionMaterialInfo {
  /** 应用面积 */
  area: number;
  /** 区域材质查找ID（格式：实例ID,材质seekId） */
  regionMaterialSeekID: string;
  /** 材质尺寸 */
  size?: MaterialSize;
}

/**
 * 材质数据
 */
interface MaterialData {
  /** 材质类别 */
  category: MaterialCategory;
  /** 材质详细信息 */
  materialInfo: RegionMaterialInfo;
}

/**
 * 2D参数值
 */
interface TwoDimensionalParameter {
  /** 铺装ID引用 */
  paveId?: string;
  /** 材质信息 */
  material?: MaterialCategory & { size?: MaterialSize };
}

/**
 * 2D BOM数据
 */
interface TwoDimensionalBomData {
  /** 材质数据 */
  material?: MaterialData;
  /** 其他属性（当引用pave时） */
  [key: string]: unknown;
}

/**
 * 开口信息
 */
interface Opening {
  /** 开口ID */
  id: string;
  /** 开口类型 */
  type?: string;
  /** 开口尺寸 */
  dimensions?: unknown;
}

/**
 * 3D BOM数据
 */
interface ThreeDimensionalBomData {
  /** 开口列表 */
  openings: Opening[];
}

/**
 * 实体接口
 */
interface Entity {
  /** 实例对象 */
  instance: EntityInstance;
  /** 获取实例ID */
  getInstanceId(): string;
  /** 获取参数值 */
  getParameterValue<T = unknown>(paramName: string): T;
}

/**
 * 实体实例接口
 */
interface EntityInstance {
  /** 获取参数值 */
  getParameterValue<T = unknown>(paramName: string): T;
}

/**
 * 转换后的BOM3实体数据
 */
interface Bom3Entity {
  /** 实体ID */
  id: string;
  /** 实体类型 */
  type: string;
  /** 其他实体属性 */
  [key: string]: unknown;
}

/**
 * 完整的BOM3数据结构
 */
interface Bom3Data {
  /** 实体基础数据 */
  entity: Bom3Entity;
  /** 面积信息 */
  area: AreaParameter;
  /** 2D数据（材质、铺装等） */
  "2D": TwoDimensionalBomData;
  /** 3D数据（开口等） */
  "3D": ThreeDimensionalBomData;
  /** 面组ID（可选） */
  faceGroupId?: string;
}

/**
 * 数据库API接口
 */
interface DbApi {
  /** 根据ID获取实体 */
  getEntity(entityId: string): Entity | null;
}

/**
 * 上下文接口
 */
interface Context {
  /** 数据库API */
  dbApi: DbApi;
}

/**
 * B3Face - 表示3D建模中的面实体
 * 
 * 负责构建面的BOM（物料清单）数据，包括：
 * - 面积计算
 * - 材质信息（直接材质或通过铺装引用）
 * - 开口信息
 * 
 * @extends B3Entity
 */
export declare class B3Face extends B3Entity {
  /** 上下文对象，包含数据库访问API */
  protected context: Context;

  /**
   * 构造函数
   * @param context - 包含数据库API的上下文对象
   */
  constructor(context: Context);

  /**
   * 构建BOM3数据
   * 
   * 从实体中提取并组织面的完整BOM数据，包括：
   * 1. 基础实体信息
   * 2. 面积参数（有效面积）
   * 3. 2D数据：
   *    - 如果存在paveId，则加载铺装数据
   *    - 否则使用直接材质信息
   * 4. 3D数据：开口列表
   * 5. 面组ID（如果存在）
   * 
   * @param entity - 要处理的实体对象
   * @returns 完整的BOM3数据结构
   * 
   * @example
   * const face = new B3Face(context);
   * const bomData = face.buildBom3Data(entity);
   * console.log(bomData.area.validArea); // 输出有效面积
   */
  buildBom3Data(entity: Entity): Bom3Data;
}