import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { ModelClassName } from './ModelClassName';
import { Utils } from './Utils';

/**
 * 自定义PM安装模型实体类型
 */
type CustomizedModelType = 'lightband' | 'lightslot' | string;

/**
 * 装饰器信息接口
 */
interface DecoratorInfo {
  /** 混合铺设标识 */
  mixPave?: boolean;
  /** 查找ID */
  seekId?: string;
  /** 阿里模型ID */
  aliModelId?: string;
  /** 类别类型 */
  categoryType?: string;
  /** 显示名称 */
  name?: string;
  /** 纹理URI */
  textureURI?: string;
}

/**
 * 路径点数据结构
 */
interface PathPoint {
  x: number;
  y: number;
  z: number;
}

/**
 * 尺寸数据结构
 */
interface Size {
  width: number;
  height: number;
  depth: number;
}

/**
 * 实体数据接口
 */
interface EntityData {
  /** 路径类型 */
  type: CustomizedModelType;
  /** 路径字符串 */
  path: string;
  /** 路径点集合 */
  pathPts: PathPoint[];
  /** 尺寸信息 */
  size: Size;
  /** 长度（单位：mm） */
  length: number;
  /** 高度（单位：mm） */
  height: number;
  /** 宽度（单位：mm） */
  width: number;
  /** 装饰器信息 */
  decoratorInfo?: DecoratorInfo;
}

/**
 * 材质类别信息
 */
interface MaterialCategory {
  /** 查找ID */
  seekId: string;
  /** 阿里模型ID */
  aliModelId: string;
  /** 类别类型 */
  categoryType: string;
  /** 显示名称 */
  displayName: string;
  /** 纹理URL */
  textureUrl: string;
}

/**
 * 材质数据结构
 */
interface MaterialData {
  /** 材质类别（可选） */
  category?: MaterialCategory;
}

/**
 * 类型配置接口
 */
interface TypeConfig {
  /** 类类型 */
  classType: ModelClassName;
  /** 内容类型描述 */
  contentType: string;
}

/**
 * 自定义PM安装模型实体类
 * 用于处理灯带(lightband)和灯槽(lightslot)等自定义模型
 * 
 * @extends AcceptEntity
 */
export declare class CustomizedPMInsMoldingEntity extends AcceptEntity {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 构建子元素
   * 当前实现为空，子类可重写此方法添加子元素构建逻辑
   */
  buildChildren(): void;

  /**
   * 构建实体数据
   * 根据传入的实体数据配置模型类型和实例数据
   * 
   * @param entityData - 实体数据对象
   * 
   * @remarks
   * - 对于 'lightband' 类型：使用 CustomizedModelLightBand 类型
   * - 对于 'lightslot' 类型：使用 CustomizedModelLightSlot 类型
   * - 默认使用 CustomizedModelMolding 类型
   */
  buildEntityData(entityData: EntityData): void;

  /**
   * 获取实例数据
   * 将实体数据转换为InstanceData对象，包含路径、尺寸、材质等参数
   * 
   * @param entityData - 实体数据对象
   * @returns 包含所有必要参数的实例数据对象
   * 
   * @remarks
   * 参数说明：
   * - path: 路径点集合
   * - size: 格式化后的尺寸信息（3D点数组）
   * - material: 材质信息（包含装饰器类别数据）
   * - length: 格式化后的长度值
   * - height: 格式化后的高度值
   * - width: 格式化后的宽度值
   * 
   * @note 材质数据仅在decoratorInfo有效且非本地/生成类型时添加
   */
  getInstanceData(entityData: EntityData): InstanceData;

  /**
   * 设置实例数据
   * @param instanceData - 实例数据对象
   */
  protected setInstanceData(instanceData: InstanceData): void;

  /**
   * 设置类型配置
   * @param typeConfig - 类型配置对象
   */
  protected setType(typeConfig: TypeConfig): void;
}