/**
 * 删除屋顶请求
 * @module DeleteRoofRequest
 */

import { HSCore } from './HSCore';
import { ENParamRoofType } from './ENParamRoofType';

/**
 * 删除参数化屋顶的请求类
 * @extends {HSCore.Transaction.Common.StateRequest}
 */
export declare class DeleteRoofRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 要删除的屋顶实体
   */
  roof: HSCore.Model.Roof;

  /**
   * 构造函数
   * @param roof - 要删除的屋顶对象
   */
  constructor(roof: HSCore.Model.Roof);

  /**
   * 提交删除操作
   * @returns 被删除的屋顶对象
   * @description 执行以下操作：
   * 1. 移除定制化模型
   * 2. 删除屋顶上的所有开口（包括参数化开口）
   * 3. 如果父级是Layer且不是平面屋顶类型，则重建房间
   */
  onCommit(): HSCore.Model.Roof;

  /**
   * 撤销删除操作
   * @description 恢复屋顶状态并标记几何和材质为脏数据需要重新计算
   */
  onUndo(): void;

  /**
   * 获取操作描述
   * @returns 操作的中文描述文本
   */
  getDescription(): string;

  /**
   * 是否可以对字段进行事务处理
   * @returns 始终返回true，表示支持字段级事务
   */
  canTransactField(): boolean;
}

/**
 * HSCore命名空间扩展 - 屋顶相关类型定义
 */
declare module './HSCore' {
  namespace HSCore.Model {
    /**
     * 屋顶实体接口
     */
    interface Roof extends Entity {
      /** 普通开口集合 */
      openings: Opening[];
      /** 参数化开口集合 */
      parametricOpenings: ParametricOpening[];
      /** 屋顶参数配置 */
      parameters: RoofParameters;
      /** 标记裁剪几何需要更新 */
      dirtyClipGeometry(): void;
      /** 标记面材质需要更新 */
      dirtyFaceMaterials(): void;
    }

    /**
     * 屋顶参数接口
     */
    interface RoofParameters {
      /** 屋顶类型 */
      roofType: ENParamRoofType;
    }

    /**
     * 开口基础接口
     */
    interface Opening extends Entity {
      /** 设置实体标志 */
      setFlagOn(flag: EntityFlagEnum): void;
      /** 父级实体 */
      parent?: Entity;
    }

    /**
     * 参数化开口接口
     */
    interface ParametricOpening extends Opening {}

    /**
     * 图层接口
     */
    interface Layer extends Entity {
      /** 房间构建器 */
      roomBuilder: RoomBuilder;
    }

    /**
     * 房间构建器接口
     */
    interface RoomBuilder {
      /** 构建房间 */
      build(): void;
    }

    /**
     * 实体基础接口
     */
    interface Entity {
      /** 获取唯一父级实体 */
      getUniqueParent(): Entity | Layer;
      /** 移除子实体 */
      removeChild(child: Entity, immediate: boolean, dispose: boolean): void;
    }

    /**
     * 实体标志枚举
     */
    enum EntityFlagEnum {
      /** 已移除标志 */
      removed = 'removed'
    }
  }

  namespace HSCore.Util.Content {
    /**
     * 移除定制化模型
     * @param model - 要移除的模型实体
     */
    function removeCustomizedModel(model: HSCore.Model.Roof): void;
  }

  namespace HSCore.Transaction.Common {
    /**
     * 状态请求基类
     */
    abstract class StateRequest {
      /** 提交操作 */
      abstract onCommit(): unknown;
      /** 撤销操作 */
      abstract onUndo(): void;
      /** 获取操作描述 */
      abstract getDescription(): string;
      /** 是否可以对字段进行事务处理 */
      abstract canTransactField(): boolean;
    }
  }
}