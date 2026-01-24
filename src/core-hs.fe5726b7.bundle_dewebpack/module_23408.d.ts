/**
 * PAssembly工具类 - 提供柜体装配相关的实用方法
 * 用于处理柜体的边界计算、门板管理、门芯板操作等功能
 */

import type { PAssembly } from 'HSCore/Model/PAssembly';
import type { Entity } from 'HSCore/Util/Entity';
import type { BoundInternal } from 'HSCore/BoundInternal';
import type { State } from 'HSCore/State/State';
import type { EquationConstraint } from 'HSCore/Constraint/EquationConstraint';
import type { ContentTypeEnum } from 'HSCatalog/ContentTypeEnum';

/**
 * 三维空间坐标点
 */
interface Point3D {
  x: number;
  y: number;
  z?: number;
}

/**
 * 门芯板布局信息
 */
interface LayoutInfo {
  /** 起始位置（余数部分的长度） */
  start: number;
  /** 布局方向：'x' 表示水平方向，'z' 表示垂直方向 */
  direction: 'x' | 'z';
}

/**
 * 门芯板参数配置
 */
interface DoorCoreBoardParameters {
  x: string;
  y: string;
  z: string;
  XLength: string;
  YLength: string;
  ZLength: string;
}

/**
 * 门芯板实体扩展属性
 */
interface DoorCoreBoardEntity {
  parameters: DoorCoreBoardParameters;
  localId: string;
  layoutInfo?: LayoutInfo;
  needClip: boolean;
}

/**
 * 状态初始化配置
 */
interface StateConfig {
  _des: string;
  isEditable: boolean;
  localId: string;
  value: number;
}

/**
 * 约束初始化配置
 */
interface ConstraintConfig {
  _des: string;
  localId: string;
  type: string;
  equation: string;
}

/**
 * PAssembly工具类
 * 提供柜体装配相关的静态方法集合
 */
export declare const PAssemblyUtil: {
  /**
   * 获取挤出件的实际高度（包含路径偏移和父级装配偏移）
   * @param entity - 挤出件实体
   * @returns 计算后的总高度值
   */
  getPExtrudingHeight(entity: Entity): number;

  /**
   * 获取装配体中的所有平开门子装配
   * @param assembly - 父级装配体
   * @returns 平开门装配体数组
   */
  getSwingDoor(assembly: PAssembly): PAssembly[];

  /**
   * 计算装配体的边界盒（包含门板厚度和轮廓）
   * @param assembly - 目标装配体
   * @param expansion - 可选的边界扩展值
   * @returns 更新后的内部边界对象
   */
  getBounding(assembly: PAssembly, expansion?: number): BoundInternal;

  /**
   * 判断是否为框架内的单元衣柜
   * @param assembly - 待检测的装配体
   * @returns 如果是框架内单元衣柜返回true
   */
  isUnitWardrobeInFrame(assembly: Entity): boolean;

  /**
   * 根据本地ID移除子实体
   * @param parent - 父级装配体
   * @param localId - 子实体的本地标识符
   */
  removeChildByLocalId(parent: PAssembly, localId: string): void;

  /**
   * 操作门芯板（添加、更新或删除）
   * @param parent - 父级装配体
   * @param entity - 门芯板实体
   * @param index - 门芯板索引编号
   * @param shouldAdd - 是否添加该门芯板
   * @param needClip - 是否需要裁剪
   * @param startPosition - 起始位置（余数）
   * @param direction - 布局方向 ('x' 或 'z')
   */
  operateDoorCoreBoard(
    parent: PAssembly,
    entity: DoorCoreBoardEntity,
    index: number,
    shouldAdd: boolean,
    needClip: boolean,
    startPosition: number | undefined,
    direction: 'x' | 'z'
  ): void;

  /**
   * 调整参数化角撑门的门芯板布局（根据尺寸动态增减门芯板数量）
   * @param parent - 父级装配体（门板）
   * @param coreBoardSize - 单个门芯板的尺寸
   * @param entity - 门芯板模板实体
   */
  resizeParamGussetDoor(
    parent: PAssembly,
    coreBoardSize: { XLength: number; YLength: number; ZLength: number },
    entity: DoorCoreBoardEntity
  ): void;
};