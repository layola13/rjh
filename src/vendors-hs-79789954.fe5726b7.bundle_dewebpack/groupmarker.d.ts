/**
 * 组合标记器模块
 * 用于评估和验证设计元素的组合关系
 */

import { Loader } from './loader';
import { 
  JudgeBase, 
  SingleJudge, 
  DoubleJudge, 
  defaultJudge, 
  configs, 
  getJudgeClass 
} from './judge';
import { EntityType, EntityTypeChecker } from './entity-type';
import { GroupUtil } from './group-util';
import Logger from './logger';

/**
 * 设计元素信息接口
 */
export interface ElementInfo {
  /** 元素唯一标识 */
  id: string;
  /** 元素标签 */
  tag: string;
  /** 查找标识 */
  seekId: string;
  /** 元素分类 */
  categories: string[];
  /** 内容类型字符串 */
  contentType: string;
  /** 是否忽略包围盒 */
  ignoreBox: boolean;
}

/**
 * 组合候选项接口
 */
export interface Candidate {
  /** 设计元素对象 */
  co: DesignElement;
  /** 关联元素信息列表 */
  linkedCoInfos: LinkedElementInfo[];
}

/**
 * 关联元素信息接口
 */
export interface LinkedElementInfo {
  /** 设计元素对象 */
  co: DesignElement;
}

/**
 * 设计元素接口
 */
export interface DesignElement {
  /** 元素ID */
  id: string;
  /** 元素标签 */
  tag: string;
  /** 查找ID */
  seekId: string;
  /** 分类列表 */
  categories: string[];
  /** 内容类型 */
  contentType: {
    getTypeString(): string;
  };
}

/**
 * 类型化候选项接口
 */
export interface TypedCandidate {
  /** 实体类型 */
  type: EntityType;
  /** 候选项数据 */
  candidate: Candidate;
}

/**
 * 候选项集合接口
 */
export interface CandidateSet {
  /** 主要候选项列表 */
  mainCandidates: Candidate[];
  /** 非主要候选项列表 */
  noMainCandidates: Candidate[];
}

/**
 * 判断结果接口
 */
export interface JudgeResult {
  /** 是否有效 */
  valid: boolean;
  /** 评分 */
  score: number;
}

/**
 * 评分原因接口
 */
export interface ScoreReason extends JudgeResult {
  /** 原因描述（可选） */
  reason?: string;
}

/**
 * 标记结果接口
 */
export interface MarkResult {
  /** 是否有效 */
  valid: boolean;
  /** 总评分 */
  score: number;
  /** 评分原因列表 */
  reasons: ScoreReason[];
  /** 组合类型 */
  type: EntityType;
  /** 主要元素信息 */
  mainEleInfo: ElementInfo;
  /** 关联元素信息列表 */
  relatedEleInfos: ElementInfo[];
}

/**
 * 评审器配置接口
 */
export interface JudgeConfig {
  /** 实体类型组合 */
  types: EntityType[][];
  /** 评审器实例 */
  judge: JudgeBase;
}

/**
 * 世界路径数据接口
 */
export interface WorldPathData {
  worldRawPath2dDump: {
    outer: Array<{
      curve: unknown;
    }>;
  };
}

/**
 * 组合标记器
 * 负责评估设计元素组合的有效性和评分
 */
export declare class GroupMarker {
  /** 注册的评审器列表 */
  private static _judges: JudgeConfig[];

  /** 墙体线段列表 */
  private wallLines: unknown[];

  /** 已计算记录集合，避免重复计算 */
  private _calculatedRecordSet: Set<string>;

  /**
   * 检查评审器配置是否有重复
   * @private
   */
  private static _checkJudges(): void;

  /**
   * 注册评审器
   * @param types - 实体类型组合
   * @param judge - 评审器实例
   */
  static registerJudge(types: EntityType[][], judge: JudgeBase): void;

  /**
   * 检查两个类型数组是否相同
   * @param typeArray1 - 类型数组1
   * @param typeArray2 - 类型数组2
   * @returns 是否相同
   * @private
   */
  private static _isSameTypes(typeArray1: EntityType[][], typeArray2: EntityType[][]): boolean;

  /**
   * 根据类型获取对应的评审器列表
   * @param types - 实体类型组合
   * @returns 评审器列表
   */
  static getJudgesByType(types: EntityType[][]): JudgeBase[];

  /**
   * 构造函数
   * @param pathData - 世界路径数据
   */
  constructor(pathData: WorldPathData);

  /**
   * 创建元素信息对象
   * @param element - 设计元素
   * @param groupType - 组合类型（可选）
   * @returns 元素信息
   * @private
   */
  private _createEleInfo(element: DesignElement, groupType?: EntityType): ElementInfo;

  /**
   * 单元素评审
   * @param element - 设计元素
   * @returns 评分原因列表
   * @private
   */
  private _judgeSingle(element: DesignElement): ScoreReason[];

  /**
   * 双元素评审
   * @param element1 - 设计元素1
   * @param element2 - 设计元素2
   * @returns 评分原因列表
   * @private
   */
  private _judgeDouble(element1: DesignElement, element2: DesignElement): ScoreReason[];

  /**
   * 计算有效性和评分
   * @param typedCandidate - 类型化候选项
   * @returns 判断结果及原因
   * @private
   */
  private _calcValidAndScore(typedCandidate: TypedCandidate): {
    valid: boolean;
    score: number;
    reasons: ScoreReason[];
  };

  /**
   * 标记候选项
   * @param typedCandidate - 类型化候选项
   * @returns 标记结果
   * @private
   */
  private _mark(typedCandidate: TypedCandidate): MarkResult;

  /**
   * 执行组合标记
   * @param candidateSets - 候选项集合列表
   * @returns 标记结果列表
   */
  execute(candidateSets: CandidateSet[]): MarkResult[];
}