/**
 * 房间类型规则模块
 * 用于根据房间内的家具和物品类别判断房间类型
 */

import { RoomTypeEnum } from './HSCore/Model/RoomTypeEnum';
import * as Categories from './Categories';

/**
 * 内容信息接口
 * 描述房间中的单个物品或家具
 */
interface ContentInfo {
  /** 类别ID */
  categoryId: string;
  /** 查找ID，用于统计同类物品数量 */
  seekId?: string;
}

/**
 * 类别定义接口
 */
interface CategoryDefinition {
  /** 类别名称（中文） */
  name: string;
  /** 类别唯一标识符 */
  categoryId: string;
  /** 内容类型数组，用于更精确的分类 */
  contentType?: string[];
}

/**
 * 类别组接口
 * 定义一组相关的类别及其匹配规则
 */
interface CategoryGroup {
  /** 类别定义数组 */
  categories: CategoryDefinition[];
  /** 权重值，用于计算房间类型匹配度 */
  weight: number;
  /** 最小数量要求，可选。若设置，则需要至少该数量的物品才算匹配 */
  minimalCount?: number;
}

/**
 * 匹配结果接口
 */
interface MatchResult {
  /** 匹配的房间类型 */
  roomType: RoomTypeEnum;
  /** 匹配得分，分数越高表示匹配度越高 */
  score: number;
}

/**
 * 房间类型规则类
 * 用于判断给定的内容信息列表是否匹配特定房间类型
 */
declare class RoomTypeRules {
  /** 房间类型枚举值 */
  readonly roomType: RoomTypeEnum;
  
  /** 类别组数组，定义该房间类型的特征物品 */
  readonly categories: CategoryGroup[];

  /**
   * 构造函数
   * @param roomType - 房间类型
   * @param categories - 类别组数组
   */
  constructor(roomType: RoomTypeEnum, categories: CategoryGroup[]);

  /**
   * 根据类别或内容类型匹配房间
   * @param contentInfos - 待匹配的内容信息数组
   * @returns 匹配结果，包含房间类型和得分
   */
  matchByCategoryOrContentType(contentInfos: ContentInfo[]): MatchResult;

  /**
   * 私有方法：判断类别组是否与内容信息匹配
   * @param group - 类别组
   * @param contentInfos - 内容信息数组
   * @returns 是否匹配
   */
  private _matchGroupByContentInfos(
    group: CategoryGroup,
    contentInfos: ContentInfo[]
  ): boolean;
}

/**
 * 房间类型规则数组
 * 包含所有预定义的房间类型及其识别规则
 */
export declare const RoomTypeRules: RoomTypeRules[];

/**
 * 房间类型规则字典
 * 以房间类型为键，快速查找对应的规则
 */
export declare const RoomTypeRulesDict: Record<RoomTypeEnum, RoomTypeRules>;