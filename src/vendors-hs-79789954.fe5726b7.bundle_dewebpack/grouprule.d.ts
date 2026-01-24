/**
 * 分组规则模块
 * 用于处理家居设计中的空间区域分组逻辑
 */

import { RegionType, BaseRegionType } from './RegionType';
import { Loop, Box2, Vector2, Line2d, MathAlg, MathUtil, Loader, Tolerance } from './MathLibrary';
import { GroupUtil } from './GroupUtil';
import { EntityType, EntityTypeChecker, groupRules, TypeConfigs, defaultRuleConfig } from './EntityConfig';
import { ContentUtils } from './ContentUtils';

/**
 * 内容对象信息，包含空间位置、关联关系等
 */
interface CoInfo {
  /** 内容对象实例 */
  co: ContentObject;
  /** 包围盒 */
  box: Box2;
  /** 面向包围盒的轮廓 */
  obbLoop: Loop;
  /** 偏移后的轮廓（可选） */
  offsetObbLoop?: Loop;
  /** 强关联的对象列表 */
  linkedCoInfos: CoInfo[];
  /** 弱关联的对象列表 */
  weakLinkedCoInfos: CoInfo[];
  /** 是否为配置中的关联类型 */
  isConfiguredRelated: boolean;
  /** 关联因子，0表示主对象，Infinity表示未关联 */
  relatedFactor: number;
}

/**
 * 内容对象接口
 */
interface ContentObject {
  id: string;
  categories: string[];
  contentType: EntityType;
  rotation: { x: number; y: number; z: number };
  content: {
    bound: {
      width: number;
      height: number;
      center: () => Vector2;
    };
    outline: Array<{ x: number; y: number }>;
  };
}

/**
 * 楼层数据转储接口
 */
interface FloorDump {
  worldRawPath2dDump: {
    outer: Array<{ curve: unknown }>;
  };
}

/**
 * 分组规则配置
 */
interface GroupRuleConfig {
  /** 区域类型 */
  type: RegionType | BaseRegionType;
  /** 主内容类型列表 */
  mainContentTypes: Array<{ category: string; contentType: string }>;
  /** 主对象偏移距离 */
  mainOffsetDistance?: number;
  /** 是否仅包含自身 */
  selfOnly?: boolean;
  /** 主对象是否仅通过相同宿主关联自身 */
  mainRelatedSelfBySameHostOnly?: boolean;
  /** 是否忽略未关联对象 */
  ignoreNotRelated?: boolean;
  /** 是否忽略不同旋转角度的对象 */
  ignoreDifferentRotation?: boolean;
  /** 关联内容类型配置列表 */
  relatedContentTypes: Array<{
    types: Array<{ category: string; contentType: string }>;
    /** 偏移距离 */
    offsetDistance?: number;
    /** 是否比较偏移 */
    compareOffset?: boolean;
    /** 是否仅与主对象比较 */
    compareMainOnly?: boolean;
    /** 是否要求与主对象旋转角度相同 */
    sameRotationAsMainOnly?: boolean;
    /** 是否使用原始轮廓 */
    useOriginOutline?: boolean;
    /** 是否仅关联主对象 */
    relatedMainOnly?: boolean;
  }>;
  /** 不关联的内容类型列表 */
  disrelatedContentTypes?: Array<{ category: string; contentType: string }>;
  /** 是否仅在自身范围内关联 */
  relatedInSelfOnly?: boolean;
}

/**
 * 关联类型与偏移距离的映射
 */
interface RelatedOffsetDistanceMapping {
  type: EntityType;
  distance: number;
}

/**
 * 分组结果
 */
interface GroupResult {
  /** 区域类型 */
  type: RegionType | BaseRegionType;
  /** 主候选对象列表 */
  mainCandidates: CoInfo[];
  /** 无主对象的候选列表 */
  noMainCandidates: CoInfo[];
  /** 不关联的候选对象列表 */
  disrelatedCandidates: CoInfo[];
}

/**
 * 关联映射信息
 */
interface RelationMapping {
  maybe: boolean;
}

/**
 * 关联分组信息
 */
interface RelationGroup {
  main: string[];
  related: string[];
}

/**
 * 分组规则类
 * 负责根据配置规则对空间内的内容对象进行分组
 */
export declare class GroupRule {
  /** 楼层数据转储 */
  private readonly floorDump: FloorDump;
  
  /** 区域类型 */
  readonly type: RegionType | BaseRegionType;
  
  /** 主内容类型列表 */
  private readonly mainContentTypes: EntityType[];
  
  /** 关联内容类型列表（二维数组） */
  private readonly relatedContentTypes: EntityType[][];
  
  /** 不关联的内容类型列表 */
  private readonly disrelatedContentTypes: EntityType[];
  
  /** 关联类型的偏移距离映射 */
  private readonly relatedOffsetDistanceTypes: RelatedOffsetDistanceMapping[];
  
  /** 需要比较偏移的关联类型 */
  private readonly relatedCompareOffsetTypes: EntityType[];
  
  /** 仅与主对象比较的关联类型 */
  private readonly relatedCompareMainOnlyTypes: EntityType[];
  
  /** 要求与主对象旋转角度相同的关联类型 */
  private readonly relatedSameRotationAsMainOnlyTypes: EntityType[];
  
  /** 使用原始轮廓的关联类型 */
  private readonly relatedUseOriginOutlineTypes: EntityType[];
  
  /** 仅关联主对象的类型 */
  private readonly relatedMainOnlyTypes: EntityType[];
  
  /** 主对象ID列表 */
  private readonly mainIds: string[];
  
  /** 关联对象ID列表 */
  private readonly relatedIds: string[];
  
  /** 不关联对象ID列表 */
  private readonly disrelatedIds: string[];
  
  /** 未知类型对象ID列表 */
  private readonly unknownIds: string[];
  
  /** 主对象偏移距离 */
  private readonly mainOffsetDistance?: number;
  
  /** 是否仅包含自身 */
  private readonly selfOnly: boolean;
  
  /** 主对象是否仅通过相同宿主关联自身 */
  private readonly mainRelatedSelfBySameHostOnly: boolean;
  
  /** 是否忽略未关联对象 */
  private readonly ignoreNotRelated: boolean;
  
  /** 是否忽略不同旋转角度的对象 */
  private readonly ignoreDifferentRotation: boolean;
  
  /** 是否仅在自身范围内关联 */
  private relatedInSelfOnly: boolean;

  /**
   * 构造函数
   * @param floorDump - 楼层数据转储
   * @param config - 分组规则配置
   */
  constructor(floorDump: FloorDump, config: GroupRuleConfig);

  /**
   * 初始化内容对象，将其分类到对应的ID列表中
   * @param contentObject - 内容对象
   */
  init(contentObject: ContentObject): void;

  /**
   * 根据偏移距离扩展对象信息的包围盒
   * @param coInfo - 对象信息
   * @param distance - 偏移距离
   */
  private _extendBoxConInfoByDistance(coInfo: CoInfo, distance?: number): void;

  /**
   * 获取关联类型的偏移距离
   * @param entityType - 实体类型
   * @returns 偏移距离（如果配置了）
   */
  private _getRelatedOffsetDistance(entityType: EntityType): number | undefined;

  /**
   * 判断是否为主对象
   * @param contentObjectOrId - 内容对象或其ID
   * @returns 是否为主对象
   */
  isMainCo(contentObjectOrId: ContentObject | string): boolean;

  /**
   * 判断是否为不关联对象
   * @param contentObjectOrId - 内容对象或其ID
   * @returns 是否为不关联对象
   */
  private _isDisrelatedCo(contentObjectOrId: ContentObject | string): boolean;

  /**
   * 判断是否为关联对象
   * @param contentObjectOrId - 内容对象或其ID
   * @returns 是否为关联对象
   */
  private _isRelatedCo(contentObjectOrId: ContentObject | string): boolean;

  /**
   * 创建对象信息结构
   * @param contentObject - 内容对象
   * @returns 对象信息
   */
  private _createCoInfo(contentObject: ContentObject): CoInfo;

  /**
   * 获取内容对象的旋转角度（归一化到0-360度）
   * @param contentObject - 内容对象
   * @returns 旋转角度
   */
  private _getCoRotation(contentObject: ContentObject): number;

  /**
   * 计算分组结果
   * @param coInfos - 所有对象信息列表
   * @returns 分组结果
   */
  private _calcResult(coInfos: CoInfo[]): GroupResult;

  /**
   * 获取最终的分组结果
   * @param getContentObjectById - 根据ID获取内容对象的函数
   * @returns 分组结果
   */
  getResult(getContentObjectById: (id: string) => ContentObject): GroupResult;
}

/**
 * 分组规则创建器
 * 提供静态方法用于批量创建不同场景的分组规则
 */
export declare class GroupRuleCreator {
  /**
   * 创建所有标准分组规则
   * @param floorDump - 楼层数据转储
   * @returns 分组规则数组
   */
  static create(floorDump: FloorDump): GroupRule[];

  /**
   * 为客厅场景创建特定的分组规则
   * 会排除地毯相关的不关联配置
   * @param floorDump - 楼层数据转储
   * @returns 分组规则数组（包含默认规则）
   */
  static createForLivingRoom(floorDump: FloorDump): GroupRule[];
}