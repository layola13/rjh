/**
 * DiyStrategy 模块
 * 
 * 提供自定义策略实现，用于处理 DIY 信息中的实体 ID 和分类
 */

import { Strategy } from './Strategy';

/**
 * DIY 信息项接口
 * 描述房间中的自定义信息结构
 */
export interface DiyInfoItem {
  /** DIY 项的唯一标识符 */
  id: string | number;
  /** 其他可能的属性 */
  [key: string]: unknown;
}

/**
 * 房间信息接口
 * 包含房间的 DIY 配置数据
 */
export interface Room {
  /** DIY 信息数组，包含房间的自定义配置项 */
  diy_info?: DiyInfoItem[];
  /** 其他房间属性 */
  [key: string]: unknown;
}

/**
 * 获取扁平化实体 ID 的输入参数接口
 */
export interface GetFlatEntityIdsParams {
  /** 实例 ID，用于匹配 DIY 信息 */
  instanceId: string | number;
  /** 房间对象，包含 DIY 信息 */
  room: Room;
}

/**
 * 获取扁平化实体 ID 的返回结果接口
 */
export interface GetFlatEntityIdsResult {
  /** 扁平化的实体 ID 数组 */
  flatEntityIds: Array<string | number>;
  /** 可选的分类信息 */
  category?: string;
}

/**
 * DIY 策略类
 * 
 * 继承自基础 Strategy 类，实现自定义的实体 ID 提取逻辑
 * 用于从房间的 DIY 信息中查找并返回匹配的实体 ID
 * 
 * @extends Strategy
 * 
 * @example
 *