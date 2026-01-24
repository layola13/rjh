/**
 * 添加新楼层请求事务类
 * 用于处理在场景中添加新楼层的操作，支持地下室和普通楼层的创建
 */

import { StateRequest } from 'HSCore/Transaction/Common/StateRequest';
import { Layer } from 'HSCore/Model/Layer';
import { LayerTypeEnum } from 'HSCore/Model/LayerTypeEnum';
import { EntityFlagEnum } from 'HSCore/Model/EntityFlagEnum';
import { WallFlagEnum } from 'HSCore/Model/WallFlagEnum';
import { Wall } from 'HSCore/Model/Wall';
import { Structure } from 'HSCore/Model/Structure';
import { Scene } from 'HSCore/Model/Scene';

/**
 * 楼层编辑器接口
 */
interface FloorPlanEditor {
  /** 场景对象 */
  scene: Scene;
  /** 全局墙体高度 */
  global_wall_height3d: number;
}

/**
 * 添加新楼层请求类
 * 继承自StateRequest，实现楼层的添加、复制和初始化逻辑
 */
export declare class AddNewLayerRequest extends StateRequest {
  /** 楼层编辑器实例 */
  private readonly _fp: FloorPlanEditor;
  
  /** 楼层类型（普通楼层或地下室） */
  private readonly _layerType: LayerTypeEnum;
  
  /** 是否需要从上一层复制墙体 */
  private readonly _needCopyWall: boolean;
  
  /** 操作前数据快照，用于撤销 */
  private _beforeData: Record<string, unknown>;
  
  /** 操作后数据快照，用于重做 */
  private _afterData: Record<string, unknown>;

  /**
   * 构造函数
   * @param fp - 楼层编辑器实例
   * @param layerType - 要创建的楼层类型
   * @param needCopyWall - 是否需要复制上一层的墙体和结构
   */
  constructor(
    fp: FloorPlanEditor,
    layerType: LayerTypeEnum,
    needCopyWall: boolean
  );

  /**
   * 执行添加楼层的核心逻辑
   * - 创建新楼层并添加到场景
   * - 根据需要复制墙体和结构件
   * - 重建房间拓扑关系
   * - 更新跨楼层开口
   * - 刷新相关几何和材质数据
   * @private
   */
  private _doRequest(): void;

  /**
   * 提交事务，执行添加楼层操作
   * 调用_doRequest并触发父类的提交流程
   */
  onCommit(): void;

  /**
   * 指示该事务是否可以参与字段级事务合并
   * @returns true - 支持事务字段追踪
   */
  canTransactField(): boolean;
}