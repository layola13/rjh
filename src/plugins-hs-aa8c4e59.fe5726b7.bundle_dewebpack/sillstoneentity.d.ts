import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { HSCore } from './HSCore';
import { Utils } from './Utils';

/**
 * 窗台石实体类型定义
 * 表示材料边的位置
 */
type SideType = 'single' | 'both';

/**
 * 原始内容中的边类型（包含已弃用的"double"）
 */
type RawSideType = 'single' | 'double' | 'both';

/**
 * 二维点坐标
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 材料元数据信息
 */
interface MaterialMetadata {
  [key: string]: unknown;
}

/**
 * 材料数据结构
 */
interface MaterialData {
  metadata?: MaterialMetadata;
}

/**
 * 窗台石参数
 */
interface SillStoneParameters {
  /** 定义窗台石轮廓的点集合 */
  points: Point[];
  /** 材料数据（包含元数据） */
  materialData?: MaterialData;
}

/**
 * 窗台石内容数据（从外部系统传入）
 */
interface SillStoneContent {
  /** 实体唯一标识符 */
  id: string;
  /** 边的位置类型 */
  side: RawSideType;
  /** 窗台石参数 */
  parameters: SillStoneParameters;
}

/**
 * 分类信息
 */
interface CategoryInfo {
  /** Seek系统ID */
  seekId: string;
  /** 阿里模型ID */
  aliModelId: string;
  /** 分类类型ID */
  categoryType: string;
  /** 显示名称 */
  displayName: string;
  /** 纹理URL */
  textureUrl: string;
}

/**
 * 窗台石实体类
 * 用于表示室内设计中的窗台石构件，继承自AcceptEntity基类
 * 
 * @remarks
 * 窗台石是安装在窗台上的装饰性石材，具有面积、长度、宽度等属性
 * 支持单面和双面材料配置
 */
declare class SillStoneEntity extends AcceptEntity {
  /**
   * 构建实体数据
   * 从原始内容数据初始化窗台石实体的类型、分类和实例数据
   * 
   * @param content - 窗台石原始内容数据
   */
  buildEntityData(content: SillStoneContent): void;

  /**
   * 构建子实体
   * 窗台石实体不包含子实体，此方法为空实现
   */
  buildChildren(): void;

  /**
   * 从内容数据提取并构建实例数据
   * 计算窗台石的几何参数（面积、长度、宽度）和材料信息
   * 
   * @param content - 窗台石原始内容数据
   * @returns 包含所有参数的实例数据对象
   * 
   * @remarks
   * 计算逻辑：
   * - 面积：由points多边形计算
   * - 长度：前两个点之间的距离
   * - 宽度：面积除以长度
   * - 边类型：将"double"转换为"both"以保持向后兼容
   */
  getInstanceData(content: SillStoneContent): InstanceData;

  /**
   * 设置实例数据
   * @param data - 实例数据对象
   */
  protected setInstanceData(data: InstanceData): void;

  /**
   * 设置实体类型
   * @param type - 实体类型标识符
   */
  protected setType(type: string): void;

  /**
   * 设置分类信息
   * @param category - 分类信息对象
   */
  protected setCategory(category: CategoryInfo): void;
}

/**
 * 从内容数据生成实体类型标识符
 * @param content - 实体内容数据
 * @returns 类型标识符字符串
 */
declare function genEntityTypeFromContent(content: SillStoneContent): string;

/**
 * 计算多边形面积
 * @param points - 多边形顶点数组
 * @returns 面积值（平方单位）
 */
declare function getArea(points: Point[]): number;

/**
 * 从材料元数据生成材料信息对象
 * @param metadata - 材料元数据
 * @returns 格式化的材料信息对象
 */
declare function genMaterialInfoFromMeta(metadata?: MaterialMetadata): Record<string, unknown>;

export { SillStoneEntity };