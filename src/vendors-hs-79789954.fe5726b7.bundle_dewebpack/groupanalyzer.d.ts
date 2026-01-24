/**
 * 空间分析与分组模块
 * 
 * 本模块提供了对三维空间中内容对象（Content Objects）进行智能分组和关系分析的功能。
 * 主要用于识别和组织场景中的家具、装饰品等实体之间的空间关系。
 */

import type { ContentDump } from './ContentDump';
import type { ContentConstraintObject } from './ContentConstraintObject';
import type { GroupRule } from './GroupRule';
import type { Loop, Box2, Box3, Vector2 } from './MathTypes';
import type { RegionType } from './RegionType';

/**
 * 分组策略枚举
 * 定义了对象归属主品时采用的不同判断策略
 */
export enum GroupStrategy {
  /** 主品本身 */
  Main = 0,
  /** 根据关联因子（距离、方向等综合评分） */
  ByRelatedFactor = 1,
  /** 根据预配置的关联规则 */
  ByConfiguredRelated = 2,
  /** 根据相交面积比例 */
  ByInterArea = 3,
  /** 根据外围距离 */
  ByOutDistance = 4
}

/**
 * 候选对象关系类型
 */
export enum CandidateRelationType {
  /** 主品 */
  Main = "main",
  /** 归属于某主品 */
  ToMain = "toMain"
}

/**
 * 空间位置关系信息
 */
export interface SpatialRelation {
  /** 涉及的对象ID对 */
  ids: [string, string];
  /** 空间位置类型（相交、包含、相离等） */
  positionType: number;
  /** 相交区域面积 */
  interArea: number;
  /** 面积比率（相交面积 / 较小对象面积） */
  areaRatio?: number;
}

/**
 * 空间对象基本信息
 */
interface SpatialObjectInfo {
  /** 对象唯一标识 */
  id: string;
  /** 对象的定向包围盒轮廓 */
  obbLoop: Loop;
}

/**
 * 归属信息（用于追踪对象如何被分配到主品）
 */
interface ContainmentInfo {
  /** 包含的对象ID列表 */
  ids: string[];
  /** 分组策略类型 */
  type?: GroupStrategy;
  /** 主品ID（如果已确定归属） */
  mainId?: string;
}

/**
 * 关联对象详细信息
 */
export interface LinkedCoInfo {
  /** 关联的内容约束对象 */
  co: ContentConstraintObject;
  /** 包围盒 */
  box: Box2;
  /** 定向包围盒轮廓 */
  obbLoop: Loop;
  /** 是否为配置关联 */
  isConfiguredRelated: boolean;
  /** 关联因子（数值越小关联度越高） */
  relatedFactor: number;
}

/**
 * 候选分组信息
 */
export interface CandidateInfo {
  /** 主对象 */
  co: ContentConstraintObject;
  /** 包围盒 */
  box: Box2;
  /** 定向包围盒轮廓 */
  obbLoop: Loop;
  /** 偏移后的定向包围盒（可选） */
  offsetObbLoop?: Loop;
  /** 关联的子对象列表 */
  linkedCoInfos: LinkedCoInfo[];
  /** 弱关联的子对象列表 */
  weakLinkedCoInfos: LinkedCoInfo[];
  /** 是否为配置关联 */
  isConfiguredRelated: boolean;
  /** 关联因子 */
  relatedFactor: number;
}

/**
 * 规则执行结果
 */
export interface RuleResult {
  /** 区域类型（如卧室、客厅等） */
  type: RegionType;
  /** 主候选对象列表（有明确主品的分组） */
  mainCandidates: CandidateInfo[];
  /** 无主候选对象列表（无明确主品的零散对象组合） */
  noMainCandidates: CandidateInfo[];
  /** 不相关候选对象列表（不应分组的对象） */
  disrelatedCandidates: CandidateInfo[];
}

/**
 * 候选对象使用信息（用于冲突解决）
 */
interface CandidateUsageInfo {
  /** 使用类型 */
  type: CandidateRelationType;
  /** 候选信息 */
  info: CandidateInfo;
  /** 所属规则结果 */
  ruleRet: RuleResult;
}

/**
 * 对象使用记录
 */
interface ObjectUsageRecord {
  /** 内容约束对象 */
  co: ContentConstraintObject;
  /** 使用情况列表（可能被多个规则引用） */
  use: CandidateUsageInfo[];
}

/**
 * 标记元素信息
 */
interface MarkedElementInfo {
  /** 对象ID */
  id: string;
  /** 是否忽略包围盒计算 */
  ignoreBox: boolean;
}

/**
 * 分组标记信息
 */
interface GroupMark {
  /** 是否有效 */
  valid: boolean;
  /** 评分 */
  score: number;
  /** 类型 */
  type: RegionType;
  /** 主元素信息 */
  mainEleInfo: MarkedElementInfo;
  /** 关联元素信息列表 */
  relatedEleInfos: MarkedElementInfo[];
  /** 原因列表 */
  reasons: Array<{
    /** 原因描述 */
    reason: string;
    /** 涉及的对象ID */
    ids: string[];
  }>;
}

/**
 * 提取的分组信息（最终输出格式）
 */
export interface ExtractedGroupInfo {
  /** 是否有效 */
  valid: boolean;
  /** 评分 */
  score: number;
  /** 区域类型 */
  type: RegionType;
  /** 实体ID */
  id: string;
  /** 标签 */
  tag: string;
  /** 是否忽略包围盒 */
  ignoreBox: boolean;
  /** 子对象列表 */
  children: Array<{
    id: string;
    tag: string;
    type: RegionType;
    ignoreBox: boolean;
  }>;
  /** 分组原因 */
  reasons: Array<{
    reason: string;
    ids: string[];
  }>;
}

/**
 * 输出的内容转储数据
 */
interface OutputContentDump extends ContentDump {
  /** 分组类型 */
  groupType: RegionType;
  /** 子对象列表 */
  children: ContentDump[];
  /** 三维空间位置 */
  x: number;
  y: number;
  z: number;
  /** 尺寸 */
  XLength: number;
  YLength: number;
  ZLength: number;
  /** 缩放（固定为1） */
  XScale: number;
  YScale: number;
  ZScale: number;
  /** 旋转（固定为0） */
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

/**
 * 执行结果
 */
export interface GroupAnalysisResult {
  /** 分组后的内容转储数据 */
  dumps: (OutputContentDump | ContentDump)[];
  /** 提取的分组信息 */
  extractInfos: ExtractedGroupInfo[];
}

/**
 * 分组分析器
 * 
 * 负责分析场景中内容对象之间的空间关系，并根据配置的规则进行智能分组。
 * 主要功能包括：
 * - 计算对象间的空间关系（包含、相交、相离等）
 * - 根据多种策略确定对象归属
 * - 解决分组冲突
 * - 生成最终的分组结果
 */
export declare class GroupAnalyzer {
  /** 内容转储数据列表 */
  private readonly _contentDumps: ContentDump[];
  
  /** 内容约束对象列表 */
  private readonly _cos: ContentConstraintObject[];
  
  /** 分组规则列表 */
  private readonly _rules: GroupRule[];
  
  /** 分组标记器 */
  private readonly _marker: unknown;

  /**
   * 构造函数
   * @param categoryMap - 类别映射表
   * @param contentDumps - 内容转储数据数组
   * @param rules - 可选的自定义规则数组，若不提供则使用默认规则
   */
  constructor(
    categoryMap: Map<string, unknown>,
    contentDumps: ContentDump[],
    rules?: GroupRule[]
  );

  /**
   * 根据ID查找内容约束对象
   * @param id - 对象ID
   * @returns 找到的对象或undefined
   */
  private _findCoById(id: string): ContentConstraintObject | undefined;

  /**
   * 获取原始空间关系
   * 计算所有对象两两之间的空间位置关系（相交、包含、相离等）
   * @returns 空间关系数组
   */
  private _getOriginRelation(): SpatialRelation[];

  /**
   * 根据原始关系构建初步的包含关系列表
   * 将有空间重叠的对象初步归为一组
   * @param relations - 空间关系数组
   * @returns 初步的归属信息列表
   */
  private _getOriginContainList(relations: SpatialRelation[]): ContainmentInfo[];

  /**
   * 更新归属信息
   * 记录对象通过何种策略归属到哪个主品
   * @param containList - 归属信息列表
   * @param update - 更新信息
   */
  private _updateOriginContainList(
    containList: ContainmentInfo[],
    update: { coId: string; type: GroupStrategy; mainId: string }
  ): void;

  /**
   * 获取剩余未分组对象的结果
   * 将未被任何规则处理的对象作为独立单元
   * @param ruleResults - 规则执行结果数组
   * @returns 剩余对象的规则结果数组
   */
  private _getRestResults(ruleResults: RuleResult[]): RuleResult[];

  /**
   * 修复混合在一起的特殊情况
   * 例如洗手盆和衣柜高度重叠的情况
   * @param ruleResults - 规则执行结果数组
   */
  private _fixMixedTogether(ruleResults: RuleResult[]): void;

  /**
   * 执行规则并获取结果
   * 这是核心方法，处理规则应用、冲突解决、归属确定等逻辑
   * @param rules - 分组规则数组
   * @returns 最终的规则执行结果数组
   */
  private _getRulesResults(rules: GroupRule[]): RuleResult[];

  /**
   * 根据规则结果生成内容转储数据
   * 将分组结果转换为可序列化的数据格式
   * @param ruleResults - 规则执行结果数组
   * @returns 输出的内容转储数据数组
   */
  private _getCDumpsByResults(ruleResults: RuleResult[]): (OutputContentDump | ContentDump)[];

  /**
   * 开发环境下检查结果有效性
   * 确保没有对象被重复使用
   * @param ruleResults - 规则执行结果数组
   * @throws 如果发现重复使用的对象则抛出错误
   */
  private _devCheckResults(ruleResults: RuleResult[]): void;

  /**
   * 记录日志（调试用）
   * @param ruleResults - 规则执行结果数组
   */
  private _logRets(ruleResults: RuleResult[]): void;

  /**
   * 根据标记提取分组信息
   * 将内部数据结构转换为最终输出格式
   * @param marks - 分组标记数组
   * @returns 提取的分组信息数组
   */
  private _extractByMarks(marks: GroupMark[]): ExtractedGroupInfo[];

  /**
   * 执行分组分析
   * 
   * 执行完整的分组流程：
   * 1. 初始化所有规则
   * 2. 执行规则获取分组结果
   * 3. 生成输出数据
   * 4. 提取分组信息
   * 
   * @returns 分组分析结果，包含转储数据和提取信息
   */
  execute(): GroupAnalysisResult;
}