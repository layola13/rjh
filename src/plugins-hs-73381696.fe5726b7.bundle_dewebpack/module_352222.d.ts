/**
 * 柜体材质策略类
 * 用于处理柜体材质的吸取和应用操作
 */

import type { DAssembly, DExtruding, DMolding, DSweep } from 'HSCore.Model';
import type { TransactionManager, Request } from 'HSCore.Doc';

/**
 * 实体类型联合
 */
type ValidEntity = DAssembly | DExtruding | DMolding | DSweep;

/**
 * 材质数据接口
 */
interface MaterialData {
  // 具体材质属性需根据实际业务定义
  [key: string]: unknown;
}

/**
 * 吸取参数接口
 */
interface SuckParams {
  /** 目标实体 */
  entity: ValidEntity;
  /** 网格名称 */
  meshName: string;
}

/**
 * 吸取结果接口
 */
interface SuckResult {
  /** 材质数据，可能为undefined */
  materialData?: MaterialData;
}

/**
 * 应用参数接口
 */
interface ApplyParams {
  /** 目标实体 */
  entity: ValidEntity;
}

/**
 * 策略依赖项接口
 */
interface StrategyDependencies {
  // 依赖项具体结构需根据实际业务定义
  [key: string]: unknown;
}

/**
 * 材质对象接口
 */
interface Material {
  // 材质对象具体结构需根据实际业务定义
  [key: string]: unknown;
}

/**
 * 基础策略抽象类声明
 */
declare abstract class BaseStrategy {
  protected _dependencies: StrategyDependencies;
  type: string;
  
  protected _getMaterialData(material: Material): MaterialData;
}

/**
 * 柜体材质策略类
 * 继承自基础策略，实现材质的吸取、验证和应用功能
 */
export default class CabinetMaterialStrategy extends BaseStrategy {
  /**
   * 构造函数
   * @param dependencies - 策略所需的依赖项
   */
  constructor(dependencies: StrategyDependencies);

  /**
   * 验证实体是否有效
   * @param entity - 待验证的实体
   * @returns 实体是否为有效类型（DAssembly、DExtruding、DMolding或DSweep）
   */
  isVailableEnt(entity: unknown): entity is ValidEntity;

  /**
   * 判断实体是否可吸取材质
   * @param params - 包含实体和网格名称的参数对象
   * @returns 是否可吸取（需为自定义模型且存在材质）
   */
  isSuckable(params: SuckParams): boolean;

  /**
   * 吸取实体材质
   * @param params - 包含实体和网格名称的参数对象
   * @returns 包含材质数据的结果对象，材质可能为undefined
   */
  suck(params: SuckParams): SuckResult | undefined;

  /**
   * 判断实体是否可应用材质
   * @param params - 包含实体的参数对象
   * @returns 实体是否可应用材质
   */
  isAppliable(params: ApplyParams): boolean;

  /**
   * 应用材质（空实现）
   */
  apply(): void;

  /**
   * 提交材质刷请求
   * @param entity - 目标实体
   * @param materialData - 材质数据
   */
  commitRequest(entity: ValidEntity, materialData: MaterialData): void;
}