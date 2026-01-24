import { Strategy } from './Strategy';
import { ENUM_SINGLE_SELECT_CATEGORY } from './enums';

/**
 * 获取平面实体ID和类别的参数接口
 */
export interface GetFlatEntityIdsParams {
  /** 实例ID，可能包含"/"分隔符 */
  instanceId: string;
  /** 房间对象，包含铺装信息 */
  room: Room;
}

/**
 * 房间接口，包含铺装信息
 */
export interface Room {
  /** 铺装信息数组，可选 */
  pave_info?: PaveInfo[];
}

/**
 * 铺装信息接口
 */
export interface PaveInfo {
  /** 面ID，用于匹配实例ID */
  faceId: string;
}

/**
 * 平面实体ID和类别的返回结果
 */
export interface FlatEntityResult {
  /** 平面实体ID数组 */
  flatEntityIds: string[];
  /** 类别，仅当匹配成功时存在 */
  category?: ENUM_SINGLE_SELECT_CATEGORY;
}

/**
 * 混合绘制策略类
 * 继承自基础策略类，用于处理天花板等平面实体的选择逻辑
 */
export declare class MixPaintStrategy extends Strategy {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 获取平面实体ID和类别
   * 
   * 根据实例ID在房间的铺装信息中查找匹配项：
   * - 如果实例ID包含"/"，提取第一部分作为查找键
   * - 遍历房间的pave_info数组，匹配faceId
   * - 匹配成功返回实例ID数组和Ceiling类别
   * - 匹配失败返回空数组
   * 
   * @param params - 包含实例ID和房间信息的参数对象
   * @returns 包含平面实体ID数组和可选类别的结果对象
   * 
   * @example
   *