/**
 * 设计模式枚举
 * 定义不同的设计状态类型
 */
export declare enum DesignMode {
  /** 主设计模式 */
  Main = "mainDesign",
  /** 原始设计模式 */
  Original = "originalDesign",
  /** 新建设计模式 */
  New = "newDesign",
  /** 已删除设计模式 */
  Removed = "removedDesign"
}

/**
 * 实体类型（假设的全局类型）
 */
declare type Entity = unknown;

/**
 * 环境对象接口
 */
export interface Environment {
  /** 环境唯一标识符 */
  id: string | number;
}

/**
 * 条件评估函数类型
 * @param entity - 要评估的实体对象
 * @param environment - 当前环境对象
 * @param designMode - 当前设计模式
 * @returns 条件是否满足
 */
declare type ConditionEvaluator = (
  entity: Entity,
  environment: Environment | undefined,
  designMode?: DesignMode
) => boolean;

/**
 * 初始化条件评估函数类型
 * @param entity - 要评估的实体对象
 * @param isHouseRemodeling - 是否为房屋改造环境
 * @param designMode - 当前设计模式
 * @returns 条件是否满足
 */
declare type InitConditionEvaluator = (
  entity: Entity,
  isHouseRemodeling: boolean,
  designMode?: DesignMode
) => boolean;

/**
 * 条件映射表接口
 * 包含所有可用的条件检查方法
 */
interface ConditionMap {
  /** 检查是否为房间且在默认环境中 */
  isRoomAndDefault: ConditionEvaluator;
  /** 检查是否为房间且在房屋改造环境中 */
  isRoomAndHouseRemodeling: ConditionEvaluator;
  /** 检查是否为默认环境 */
  isDefaultEnvironment: ConditionEvaluator;
  /** 检查是否为房屋改造环境 */
  isHouseRemodelingEnvironment: ConditionEvaluator;
  /** 检查是否为建筑信息平面模式 */
  isArchitecturalInfoPlanMode: ConditionEvaluator;
  /** 检查是否为建筑信息平面或默认模式 */
  isArchitecturalInfoPlanOrDefaultMode: ConditionEvaluator;
  /** 检查是否为原始拆除平面模式 */
  isOrignalDemolitionPlanMode: ConditionEvaluator;
  /** 检查是否为孔洞且在房屋改造环境中 */
  isHoleAndHouseRemodelingEnvironment: ConditionEvaluator;
  /** 检查是否为房间/门且在房屋改造的拆除模式下 */
  isRoomAndDoorAndHouseRemodelingAndDemolitionMode: ConditionEvaluator;
  /** 检查是否为窗户且在房屋改造的拆除模式下 */
  isWindowAndHouseRemodelingAndDemolitionMode: ConditionEvaluator;
  /** 检查是否为房间且在房屋改造的建筑信息模式下 */
  isRoomAndHouseRemodelingAndArchInfoMode: ConditionEvaluator;
  /** 检查是否为墙体且在房屋改造的建筑信息或默认模式下 */
  isWallAndHouseRemodelingAndArchInfoOrDefaultMode: ConditionEvaluator;
}

/**
 * 初始化条件映射表接口
 * 用于初始化阶段的条件检查
 */
interface InitConditionMap {
  /** 检查是否为房间且在默认环境中（初始化） */
  isRoomAndDefault: InitConditionEvaluator;
  /** 检查是否为房间且在房屋改造环境中（初始化） */
  isRoomAndHouseRemodeling: InitConditionEvaluator;
  /** 检查是否为默认环境（初始化） */
  isDefaultEnvironment: InitConditionEvaluator;
  /** 检查是否为房屋改造环境（初始化） */
  isHouseRemodelingEnvironment: InitConditionEvaluator;
  /** 检查是否为建筑信息平面模式（初始化） */
  isArchitecturalInfoPlanMode: InitConditionEvaluator;
  /** 检查是否为建筑信息平面或默认模式（初始化） */
  isArchitecturalInfoPlanOrDefaultMode: InitConditionEvaluator;
  /** 检查是否为原始拆除平面模式（初始化） */
  isOrignalDemolitionPlanMode: InitConditionEvaluator;
  /** 检查是否为孔洞且在房屋改造环境中（初始化） */
  isHoleAndHouseRemodelingEnvironment: InitConditionEvaluator;
}

/**
 * 条件评估器类
 * 用于评估房屋设计系统中各种实体和环境的条件状态
 * 
 * @example
 *