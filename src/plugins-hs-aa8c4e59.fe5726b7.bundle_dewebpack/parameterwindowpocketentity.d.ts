import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { genEntityTypeFromContent, getPathLength, genMaterialInfoFromMeta } from './utils';

/**
 * 参数化窗口口袋实体类
 * 用于表示窗口相关的口袋型参数化实体
 */
export declare class ParameterWindowPocketEntity extends AcceptEntity {
  /**
   * 构建子实体
   * 该方法在当前实现中为空，预留给子类覆盖
   */
  buildChildren(): void;

  /**
   * 根据源数据构建实体数据
   * @param sourceData - 包含实体所有配置信息的源数据对象
   */
  buildEntityData(sourceData: SourceEntityData): void;

  /**
   * 从源数据中提取并生成实例数据
   * @param sourceData - 源实体数据对象
   * @returns 包含所有参数的实例数据对象
   */
  getInstanceData(sourceData: SourceEntityData): InstanceData;
}

/**
 * 源实体数据接口
 * 定义窗口口袋实体的完整数据结构
 */
interface SourceEntityData {
  /** 实体唯一标识符 */
  id: string;

  /** 父级实体引用 */
  parent: {
    /** 父级实体ID */
    id: string;
  };

  /** 实体参数配置 */
  parameters: {
    /** 成型路径数据 */
    moldingPaths: PathData;

    /** 轮廓配置数据 */
    profileData: {
      /** 查找标识符 */
      seekId: string;
      /** 缩略图URL */
      thumbnail: string;
      /** 轮廓X方向尺寸 */
      profileSizeX: number;
      /** 轮廓Y方向尺寸 */
      profileSizeY: number;
    };

    /** 材质数据 */
    materialData: MaterialMetaData;
  };

  /** 实体所在侧面标识 */
  side: string;
}

/**
 * 路径数据类型
 * 可根据实际业务需求进一步细化
 */
type PathData = unknown;

/**
 * 材质元数据类型
 * 可根据实际业务需求进一步细化
 */
type MaterialMetaData = unknown;

/**
 * 分类信息接口
 */
interface CategoryInfo {
  /** 查找标识符 */
  seekId: string;
  /** 阿里模型ID（可选） */
  aliModelId?: string;
  /** 分类类型（可选） */
  categoryType?: string;
  /** 显示名称（可选） */
  displayName?: string;
  /** 纹理图片URL */
  textureUrl: string;
  /** 尺寸数组 [宽度, 高度] */
  size: [number, number];
}