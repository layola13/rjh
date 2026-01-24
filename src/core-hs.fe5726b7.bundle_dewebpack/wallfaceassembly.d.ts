import { Vector3 } from './Vector3';
import { NCPBackgroundWallBase } from './NCPBackgroundWallBase';
import { Door } from './Door';
import { ParametricWindow } from './ParametricWindow';
import { Window } from './Window';
import { ParametricDoor } from './ParametricDoor';
import { SpaceAssembly } from './SpaceAssembly';
import { Entity } from './Entity';
import { WallFaceAssemblyDecorator } from './WallFaceAssemblyDecorator';

/**
 * 墙面组件装配体
 * 用于管理墙面及其关联的门窗等构件
 */
export declare class WallFaceAssembly extends SpaceAssembly {
  /**
   * 创建墙面组件装配体实例
   * @param metadata - 可选的元数据用于初始化
   * @returns 新创建的墙面组件装配体实例
   */
  static create(metadata?: unknown): WallFaceAssembly;

  /**
   * 获取墙面对象
   * @returns 墙面对象，如果没有背景墙则返回undefined
   */
  get wallFace(): unknown | undefined;

  /**
   * 获取所有背景墙构件
   * @returns 背景墙构件数组
   */
  get backgroundWalls(): NCPBackgroundWallBase[];

  /**
   * 获取所有门构件（包括参数化门）
   * @returns 门构件数组
   */
  get doors(): Array<Door | ParametricDoor>;

  /**
   * 获取所有窗构件（包括参数化窗）
   * @returns 窗构件数组
   */
  get windows(): Array<Window | ParametricWindow>;

  /**
   * 刷新装配体的尺寸和位置
   * 根据关联构件的边界计算整体包围盒
   * @internal
   */
  protected _refreshSizeAndPosition(): void;
}