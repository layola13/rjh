/**
 * 模型使用事件跟踪模块
 * 
 * @module trackUseModel
 * @description 用于跟踪用户在目录中选择使用模型的行为事件
 */

/**
 * 模型数据接口
 * 描述需要跟踪的模型信息
 */
export interface ModelData {
  /** 模型的唯一标识符 */
  id: string;
}

/**
 * 事件分组枚举
 * 定义事件所属的业务类别
 */
export enum EventGroupEnum {
  /** 目录相关事件 */
  Catalog = 'Catalog',
  // 可能还有其他事件分组...
}

/**
 * 事件追踪参数接口
 * 定义发送到追踪系统的数据结构
 */
export interface TrackEventParams {
  /** 模型ID（字段名称使用了特定的命名约定） */
  sModelID: string;
}

/**
 * 追踪工具接口
 * 定义追踪系统的核心方法
 */
export interface TrackingUtility {
  /**
   * 追踪事件
   * 
   * @param eventGroup - 事件分组类别
   * @param eventName - 具体的事件名称
   * @param params - 事件参数数据
   * @returns void
   */
  track(
    eventGroup: EventGroupEnum,
    eventName: string,
    params: TrackEventParams
  ): void;
}

/**
 * 应用工具集接口
 * 包含事件分组枚举的工具对象
 */
export interface AppUtil {
  /** 事件分组枚举 */
  EventGroupEnum: typeof EventGroupEnum;
}

/**
 * 全局应用对象接口
 * HSApp（可能代表 HuaSheng App 或类似名称）
 */
export interface HSAppGlobal {
  /** 工具集合 */
  Util: AppUtil;
}

/**
 * 全局追踪对象接口
 * T（追踪系统的简写标识符）
 */
declare global {
  /** 全局追踪工具实例 */
  const T: TrackingUtility;
  
  /** 全局应用实例 */
  const HSApp: HSAppGlobal;
}

/**
 * 追踪模型使用事件的函数
 * 
 * @description 当用户在目录中选择并使用某个模型时调用此函数，
 * 将使用行为上报到追踪系统进行数据分析
 * 
 * @param modelData - 包含模型ID的数据对象
 * @returns void
 * 
 * @example
 *