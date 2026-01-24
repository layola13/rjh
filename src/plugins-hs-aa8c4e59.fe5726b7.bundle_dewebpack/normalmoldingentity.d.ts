import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { getEntityLayer, genEntityTypeFromContent, genCategoryDataFromContent, getPathLength, genMaterialInfoFromMeta } from './EntityUtils';
import { Utils } from './Utils';

/**
 * 表示路径点的三维坐标
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 材质元数据信息
 */
interface MaterialMeta {
  /** 阿里模型ID */
  aliModelId?: string;
  /** 搜索ID */
  seekId?: string;
  [key: string]: unknown;
}

/**
 * 图层信息
 */
interface LayerInfo {
  /** 图层唯一标识 */
  id: string;
  [key: string]: unknown;
}

/**
 * 实体内容数据结构
 */
interface EntityContent {
  /** 实体唯一标识 */
  id: string;
  /** X轴尺寸 */
  XSize: number;
  /** Y轴尺寸 */
  YSize: number;
  /** 材质信息 */
  material: MaterialMeta;
  /** 父级实体 */
  parent?: {
    id: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * 普通造型实体类
 * 用于表示具有路径、尺寸和材质属性的三维造型实体
 * 继承自AcceptEntity基类
 */
export declare class NormalMoldingEntity extends AcceptEntity {
  /**
   * 所属房间的唯一标识符
   */
  roomId: string;

  /**
   * 构造函数
   * @param roomId - 房间ID，可选参数，默认为空字符串
   */
  constructor(roomId?: string);

  /**
   * 构建子实体集合
   * 用于初始化或更新当前实体的子实体
   */
  protected buildChildren(): void;

  /**
   * 根据实体内容构建实体数据
   * 设置实例数据、类型和分类信息
   * @param content - 包含实体属性的内容对象
   */
  protected buildEntityData(content: EntityContent): void;

  /**
   * 从实体内容提取并生成实例数据
   * 包含房间ID、图层ID、路径、尺寸、材质、父级ID和长度等参数
   * @param content - 实体内容数据
   * @returns 包含完整参数的实例数据对象
   */
  protected getInstanceData(content: EntityContent): InstanceData;
}