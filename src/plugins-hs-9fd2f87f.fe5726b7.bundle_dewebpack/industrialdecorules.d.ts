/**
 * 房间类型装饰规则模块
 * 用于根据家具/装饰品类别判断房间类型
 */

import { RoomTypeEnum } from 'HSCore.Model';

/**
 * 内容信息接口
 * 描述场景中的家具/装饰品元素
 */
export interface ContentInfo {
  /** 类别ID */
  categoryId: string;
  /** 内容类型 */
  contentType?: string[];
  /** 查找ID（用于去重计数） */
  seekId?: string;
}

/**
 * 类别定义
 * 描述特定家具/装饰品的分类
 */
export interface CategoryDefinition {
  /** 分组名称 */
  name: string;
  /** 类别唯一标识 */
  categoryId: string;
  /** 内容类型列表 */
  contentType: string[];
}

/**
 * 类别组配置
 * 定义一组相关类别及其权重
 */
export interface CategoryGroup {
  /** 类别定义列表 */
  categories: CategoryDefinition[];
  /** 匹配权重（用于计算房间类型得分） */
  weight: number;
  /** 最小匹配数量（可选，用于批量场景如办公室） */
  minimalCount?: number;
}

/**
 * 匹配结果信息
 * 记录成功匹配的内容及其所属分组
 */
export interface MatchInfo {
  /** 匹配到的内容信息 */
  contentInfo: ContentInfo;
  /** 匹配到的分组名称 */
  matchedGroupName: string;
}

/**
 * 房间匹配结果
 * 包含匹配详情、房间类型和得分
 */
export interface RoomMatchResult {
  /** 所有匹配项详情 */
  matchInfo: MatchInfo[];
  /** 房间类型枚举值 */
  roomType: RoomTypeEnum | string;
  /** 总得分（权重累加） */
  score: number;
}

/**
 * 房间类型规则类
 * 根据场景中的家具类别判断房间类型
 */
export declare class RoomTypeRules {
  /** 房间类型 */
  readonly roomType: RoomTypeEnum | string;
  
  /** 类别组配置列表 */
  readonly categories: CategoryGroup[];

  /**
   * 构造函数
   * @param roomType - 房间类型枚举值
   * @param categories - 该房间类型的类别组规则
   */
  constructor(roomType: RoomTypeEnum | string, categories: CategoryGroup[]);

  /**
   * 根据类别或内容类型匹配内容信息
   * @param contentInfos - 待匹配的内容信息列表
   * @returns 房间匹配结果（包含匹配详情和得分）
   */
  matchByCategoryOrContentType(contentInfos: ContentInfo[]): RoomMatchResult;

  /**
   * 私有方法：检查类别组是否被内容信息列表匹配
   * @param group - 类别组配置
   * @param contentInfos - 内容信息列表
   * @returns 是否匹配成功
   */
  private _matchGroupByContentInfos(
    group: CategoryGroup,
    contentInfos: ContentInfo[]
  ): boolean;
}

/**
 * 家装房间类型规则列表
 * 包含客餐厅、客厅、餐厅、厨房、卫生间、卧室、儿童房、书房、过道、阳台、户外、家庭影院、电竞房等
 */
export declare const RoomTypeRules: RoomTypeRules[];

/**
 * 工装装饰规则列表
 * 包含办公空间、餐饮空间、体育空间、会议室、门头、教育空间等
 */
export declare const IndustrialDecoRules: RoomTypeRules[];

/**
 * 房间类型规则字典
 * 以房间类型为键的快速查找映射
 * @example
 *