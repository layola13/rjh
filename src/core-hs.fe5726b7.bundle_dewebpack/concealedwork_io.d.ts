/**
 * 隐蔽工程模块
 * 提供隐蔽工程实体的I/O操作和业务逻辑
 */

import { Entity, Entity_IO } from './Entity';
import { ConcealedWorkLightTree } from './ConcealedWorkLightTree';
import { ConcealedWorkTubeTree } from './ConcealedWorkTubeTree';
import { StrongElecComp } from './StrongElecComp';
import { WeakElecComp } from './WeakElecComp';
import { HotWaterComp } from './HotWaterComp';
import { ColdWaterComp } from './ColdWaterComp';
import { ConcealedWorkPowerSys } from './ConcealedWorkPowerSys';
import { ConcealedWorkCompEntity } from './ConcealedWorkCompEntity';
import { ConcealedWorkLightControlSys } from './ConcealedWorkLightControlSys';

/**
 * 隐蔽工程I/O处理器
 * 负责隐蔽工程数据的序列化和反序列化
 */
export declare class ConcealedWork_IO extends Entity_IO {
  /**
   * 导出隐蔽工程数据
   * @param entity - 要导出的实体
   * @param target - 导出目标对象
   * @param includeChildren - 是否包含子实体，默认true
   * @param options - 导出选项
   * @returns 导出的数据对象
   */
  dump(
    entity: Entity,
    target: Record<string, unknown>,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): Record<string, unknown>;

  /**
   * 加载隐蔽工程数据
   * @param entity - 目标实体
   * @param source - 数据源对象
   * @param context - 加载上下文
   */
  load(
    entity: Entity,
    source: Record<string, unknown>,
    context: unknown
  ): void;

  /**
   * 获取I/O处理器单例
   */
  static instance(): ConcealedWork_IO;
}

/**
 * 隐蔽工程实体
 * 管理电力系统、灯光控制系统、管道树和灯光树
 */
export declare class ConcealedWork extends ConcealedWorkCompEntity {
  /**
   * 获取I/O处理器实例
   */
  getIO(): ConcealedWork_IO;

  /**
   * 电力系统列表
   */
  get powerSystems(): ConcealedWorkPowerSys[];

  /**
   * 灯光控制系统（单例）
   */
  get lightControlSystem(): ConcealedWorkLightControlSys | undefined;

  /**
   * 管道树列表
   */
  get tubeTrees(): ConcealedWorkTubeTree[];

  /**
   * 灯光树列表
   */
  get lightTrees(): ConcealedWorkLightTree[];

  /**
   * 强电管道树列表
   */
  get strongElecTrees(): ConcealedWorkTubeTree[];

  /**
   * 弱电管道树列表
   */
  get weakElecTrees(): ConcealedWorkTubeTree[];

  /**
   * 热水管道树列表
   */
  get hotWaterTrees(): ConcealedWorkTubeTree[];

  /**
   * 冷水管道树列表
   */
  get coldWaterTrees(): ConcealedWorkTubeTree[];

  /**
   * 添加电力系统
   * @param powerSys - 要添加的电力系统
   */
  addPowerSys(powerSys: ConcealedWorkPowerSys): void;

  /**
   * 移除电力系统
   * @param powerSys - 要移除的电力系统
   */
  removePowerSys(powerSys: ConcealedWorkPowerSys): void;

  /**
   * 获取指定电力系统
   * @param id - 电力系统ID
   */
  getPowerSys(id: string): ConcealedWorkPowerSys | undefined;

  /**
   * 添加灯光控制系统
   * @param lightControlSys - 要添加的灯光控制系统
   */
  addLightControlSys(lightControlSys: ConcealedWorkLightControlSys): void;

  /**
   * 移除灯光控制系统
   * @param lightControlSys - 要移除的灯光控制系统
   */
  removeLightControlSys(lightControlSys: ConcealedWorkLightControlSys): void;

  /**
   * 根据组件类型获取管道树
   * @param componentType - 组件类型
   */
  getTubeTreesByComp(componentType: string): ConcealedWorkTubeTree[];

  /**
   * 添加管道树
   * @param tubeTree - 要添加的管道树
   */
  addTubeTree(tubeTree: ConcealedWorkTubeTree): void;

  /**
   * 移除管道树
   * @param tubeTree - 要移除的管道树
   */
  removeTubeTree(tubeTree: ConcealedWorkTubeTree): void;

  /**
   * 获取指定管道树
   * @param id - 管道树ID
   */
  getTubeTree(id: string): ConcealedWorkTubeTree | undefined;

  /**
   * 添加灯光树
   * @param lightTree - 要添加的灯光树
   */
  addLightTree(lightTree: ConcealedWorkLightTree): void;

  /**
   * 移除灯光树
   * @param lightTree - 要移除的灯光树
   */
  removeLightTree(lightTree: ConcealedWorkLightTree): void;

  /**
   * 获取指定灯光树
   * @param id - 灯光树ID
   */
  getLightTree(id: string): ConcealedWorkLightTree | undefined;

  /**
   * 移除树（管道树或灯光树）
   * @param tree - 要移除的树，可以是单个或数组
   */
  removeTree(
    tree: ConcealedWorkTubeTree | ConcealedWorkLightTree | Array<ConcealedWorkTubeTree | ConcealedWorkLightTree>
  ): void;

  /**
   * 添加隐蔽工程实体（内部方法）
   * @internal
   */
  protected _addCWEntity<T>(collection: T[], entity: T): void;

  /**
   * 移除隐蔽工程实体（内部方法）
   * @internal
   */
  protected _removeCWEntity<T>(collection: T[], entity: T): void;

  /**
   * 获取隐蔽工程实体（内部方法）
   * @internal
   */
  protected _getCWEntity<T extends { id?: string }>(
    collection: T[],
    id: string
  ): T | undefined;

  /**
   * 子实体集合（内部属性）
   * @internal
   */
  protected _children: Record<string, Entity>;
}