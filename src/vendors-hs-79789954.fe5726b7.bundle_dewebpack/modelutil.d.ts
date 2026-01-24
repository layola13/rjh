/**
 * 模型工具类 - 提供实体对象的移动性、适配性和层级关系判断功能
 * @module ModelUtil
 */

import type { EntityObject } from './EntityObject';
import type { Matrix4, Vector3 } from 'three';

/**
 * 实体对象的灵魂数据接口，包含新增状态和吸附信息
 */
interface SoulData {
  /** 标记实体是否为新添加的对象 */
  newAdded?: boolean;
  /** 吸附信息配置 */
  adsorbInfo?: AdsorbInfo;
}

/**
 * 吸附信息接口，定义功能性吸附的配置
 */
interface AdsorbInfo {
  /** 功能性吸附配置 */
  functionAdsorb?: FunctionAdsorb;
}

/**
 * 功能性吸附配置接口，定义各轴向的适配规则
 */
interface FunctionAdsorb {
  /** X轴吸附配置 */
  x?: AxisAdsorb;
  /** Y轴吸附配置 */
  y?: AxisAdsorb;
  /** Z轴吸附配置 */
  z?: AxisAdsorb;
}

/**
 * 轴向吸附配置接口
 */
interface AxisAdsorb {
  /** 是否允许在该轴向上进行适配 */
  adapt?: boolean;
}

/**
 * 扩展的实体对象接口，包含灵魂数据
 */
interface ExtendedEntityObject extends EntityObject {
  /** 实体的灵魂数据，包含业务逻辑相关属性 */
  soulData?: SoulData;
}

/**
 * 模型工具类
 * 提供实体对象的移动性判断、PM模型识别、层级遍历等核心功能
 */
export declare class ModelUtil {
  /**
   * 判断实体是否可以在指定轴向上移动
   * @param entity - 待检查的实体对象
   * @param axis - 轴向索引（0=X, 1=Y, 2=Z）
   * @returns 1表示可移动，-1表示不可移动，0表示非实体对象
   */
  static couldMove(entity: unknown, axis: number): 1 | 0 | -1;

  /**
   * 检查实体对象是否可在指定轴向上移动
   * @param entity - 实体对象
   * @param axis - 轴向索引（0=X, 1=Y, 2=Z）
   * @returns 如果实体可移动则返回true
   */
  static isEntityMoveable(entity: ExtendedEntityObject, axis: number): boolean;

  /**
   * 判断实体是否为刚性实体
   * @returns 始终返回true
   */
  static isRigidEntity(): true;

  /**
   * 判断实体是否为固定实体（非新添加的实体）
   * @param entity - 实体对象
   * @returns 如果实体不是新添加的则返回true
   */
  static isFixedEntity(entity: ExtendedEntityObject): boolean;

  /**
   * 判断实体是否为PM模型实体（新添加的实体）
   * @param entity - 实体对象
   * @returns 如果实体是新添加的则返回true
   */
  static isPmModelEntity(entity: ExtendedEntityObject): boolean;

  /**
   * 判断实体是否为PM模型的子对象
   * @param entity - 实体对象
   * @returns 如果实体的任一父级是PM模型则返回true
   */
  static isPmModelChild(entity: EntityObject): boolean;

  /**
   * 判断实体是否为PM模型或其子对象
   * @param entity - 实体对象
   * @returns 如果实体是PM模型或其子对象则返回true
   */
  static isPmModelOrHisChildren(entity: ExtendedEntityObject): boolean;

  /**
   * 获取实体所属的PM模型根对象
   * @param entity - 实体对象
   * @returns PM模型根对象，如果不存在则返回undefined
   */
  static getPmModel(entity: EntityObject): ExtendedEntityObject | undefined;

  /**
   * 将实体树扁平化为Map集合
   * @param entity - 根实体对象
   * @param keyExtractor - 键提取函数，用于生成Map的键
   * @returns 包含所有遍历到的实体的Map集合
   */
  static getFlatEntities<K>(
    entity: EntityObject,
    keyExtractor: (entity: EntityObject) => K
  ): Map<K, EntityObject>;

  /**
   * 判断实体是否为新添加的实体
   * @param entity - 实体对象
   * @returns 如果实体标记为新添加则返回true
   */
  static isNewAddEntity(entity: ExtendedEntityObject): boolean;

  /**
   * 检查实体是否允许在X轴方向上进行适配
   * @param entity - 实体对象
   * @returns 如果允许X轴适配则返回true
   */
  static couldXAdapt(entity: ExtendedEntityObject): boolean | undefined;

  /**
   * 检查实体是否允许在Y轴方向上进行适配（映射到Z轴吸附配置）
   * @param entity - 实体对象
   * @returns 如果允许Y轴适配则返回true
   */
  static couldYAdapt(entity: ExtendedEntityObject): boolean | undefined;

  /**
   * 检查实体是否允许在Z轴方向上进行适配（映射到Y轴吸附配置）
   * @param entity - 实体对象
   * @returns 如果允许Z轴适配则返回true
   */
  static couldZAdapt(entity: ExtendedEntityObject): boolean | undefined;

  /**
   * 获取从实体到根节点的完整路径
   * @param entity - 起始实体对象
   * @param idMap - 可选的ID到实体的映射表，用于替换路径中的节点
   * @returns 从当前实体到根节点的实体数组（从子到父排序）
   */
  static getToRootNodes(
    entity: EntityObject,
    idMap?: Map<string, EntityObject>
  ): EntityObject[];
}