import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { genEntityTypeFromContent, genMaterialInfoFromMeta } from './EntityUtils';
import { Utils } from './Utils';

/**
 * 参数窗口口袋实体类
 * 用于处理和构建窗口口袋相关的实体数据
 */
export class ParameterWindowPocketEntity extends AcceptEntity {
  constructor() {
    super();
  }

  /**
   * 构建子元素
   * @remarks 当前实现为空，由子类根据需要实现具体逻辑
   */
  buildChildren(): void {
    // 空实现
  }

  /**
   * 构建实体数据
   * @param entity - 包含实体信息的源数据对象
   */
  buildEntityData(entity: EntitySourceData): void {
    // 设置实例数据
    this.setInstanceData(this.getInstanceData(entity));
    
    // 从内容生成并设置实体类型
    this.setType(genEntityTypeFromContent(entity));

    // 提取元数据
    const metadata = entity.metadata;

    // 设置分类信息
    this.setCategory({
      seekId: metadata.seekId,
      aliModelId: metadata.aliModelId,
      categoryType: metadata.categories?.join(', '),
      displayName: metadata.name,
      textureUrl: entity.parameters.iconSmall,
      size: Utils.formatNumberPoints([
        entity.parameters.profileWidth,
        entity.parameters.profileHeight
      ])
    });
  }

  /**
   * 获取实例数据
   * @param entity - 实体源数据
   * @returns 包含所有参数的实例数据对象
   */
  getInstanceData(entity: EntitySourceData): InstanceData {
    const instanceData = new InstanceData(entity.id);

    // 获取父级模具BOM数据
    const moldingBomData = entity.parent.getMoldingBomData();
    
    // 计算总路径长度
    let totalLength = 0;
    if (moldingBomData && moldingBomData.length > 0) {
      moldingBomData.forEach((bomItem) => {
        totalLength += bomItem.path.reduce((accumulator, pathSegment) => {
          return accumulator + (pathSegment?.getLength() ?? 0);
        }, 0);
      });
    }

    // 添加各项参数
    instanceData.addParameter(
      new Parameter('parentId', entity.parent.id, DataType.String),
      new Parameter('width', entity.parameters.profileWidth, DataType.Number),
      new Parameter('thickness', entity.parameters.profileHeight, DataType.Number),
      new Parameter(
        'material',
        genMaterialInfoFromMeta(entity.parameters.materialData?.metadata),
        DataType.Object
      ),
      new Parameter('path', moldingBomData, DataType.Object),
      new Parameter('length', Utils.formatNumberPoints(totalLength), DataType.Number),
      new Parameter('side', 'inner', DataType.String)
    );

    return instanceData;
  }
}

/**
 * 实体源数据接口
 */
interface EntitySourceData {
  /** 实体唯一标识符 */
  id: string;
  /** 实体元数据 */
  metadata: EntityMetadata;
  /** 实体参数 */
  parameters: EntityParameters;
  /** 父级实体 */
  parent: ParentEntity;
}

/**
 * 实体元数据接口
 */
interface EntityMetadata {
  /** Seek平台标识符 */
  seekId: string;
  /** 阿里模型标识符 */
  aliModelId: string;
  /** 分类列表 */
  categories?: string[];
  /** 显示名称 */
  name: string;
}

/**
 * 实体参数接口
 */
interface EntityParameters {
  /** 小图标URL */
  iconSmall: string;
  /** 轮廓宽度 */
  profileWidth: number;
  /** 轮廓高度 */
  profileHeight: number;
  /** 材质数据 */
  materialData?: {
    metadata?: unknown;
  };
}

/**
 * 父级实体接口
 */
interface ParentEntity {
  /** 父级实体标识符 */
  id: string;
  /**
   * 获取模具BOM数据
   * @returns BOM数据数组
   */
  getMoldingBomData(): MoldingBomItem[];
}

/**
 * 模具BOM项接口
 */
interface MoldingBomItem {
  /** 路径段数组 */
  path: PathSegment[];
}

/**
 * 路径段接口
 */
interface PathSegment {
  /**
   * 获取路径段长度
   * @returns 路径段的长度值
   */
  getLength(): number;
}