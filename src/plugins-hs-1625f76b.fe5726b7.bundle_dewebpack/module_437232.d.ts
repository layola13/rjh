/**
 * HSCore事务类型定义
 * 用于处理实体显示/隐藏状态的事务请求
 */

import { HSCore } from 'HSCore';

/**
 * 实体类型联合
 * 可能的操作目标实体
 */
type SupportedEntity = 
  | HSCore.Model.Wall 
  | HSCore.Model.Opening 
  | HSCore.Model.ParametricOpening
  | HSCore.Model.NCustomizedStructure
  | HSCore.Model.NCustomizedParametricModel
  | HSCore.Model.NCustomizedParametricRoof
  | HSCore.Model.ParametricDoor;

/**
 * 显示/隐藏状态事务请求类
 * 继承自HSCore的通用状态请求基类
 * 
 * @description 负责管理3D模型实体的可见性状态，支持撤销/重做操作
 * @extends {HSCore.Transaction.Common.StateRequest}
 */
declare class VisibilityStateRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 要操作的内容实体
   * @private
   */
  private readonly _content: SupportedEntity;

  /**
   * 目标显示状态
   * @private
   */
  private readonly _show: boolean;

  /**
   * 受影响的楼层集合（需要重新计算几何的楼层）
   * @private
   */
  private readonly _dirtyFloors: Set<HSCore.Model.Floor>;

  /**
   * 构造函数
   * 
   * @param content - 需要改变显示状态的实体对象
   * @param show - 目标显示状态，true为显示，false为隐藏
   */
  constructor(content: SupportedEntity, show: boolean);

  /**
   * 获取当前目标显示状态
   * 
   * @readonly
   * @returns {boolean} true表示显示，false表示隐藏
   */
  get show(): boolean;

  /**
   * 提交事务：执行显示/隐藏操作
   * 
   * @description 
   * - 根据_show设置实体的hidden标志
   * - 处理墙体、开口、参数化模型等不同类型实体的特殊逻辑
   * - 更新关联面和子模型的状态
   * - 标记需要重新计算几何的楼层
   * 
   * @override
   * @returns {void}
   */
  onCommit(): void;

  /**
   * 撤销事务：恢复实体的原始显示状态
   * 
   * @description 
   * - 调用父类的onUndo方法
   * - 触发标志变更处理
   * - 重新计算受影响楼层的几何
   * 
   * @override
   * @returns {void}
   */
  onUndo(): void;

  /**
   * 重做事务：重新应用显示/隐藏操作
   * 
   * @description 
   * - 调用父类的onRedo方法
   * - 触发标志变更处理
   * - 重新计算受影响楼层的几何
   * 
   * @override
   * @returns {void}
   */
  onRedo(): void;

  /**
   * 判断是否可以对字段进行事务操作
   * 
   * @returns {boolean} 始终返回true，表示支持事务操作
   */
  canTransactField(): boolean;

  /**
   * 获取事务描述信息
   * 
   * @returns {string} 返回"显示隐藏物品"
   */
  getDescription(): string;

  /**
   * 获取事务所属日志分类
   * 
   * @returns {HSFPConstants.LogGroupTypes} 返回内容操作分类
   */
  getCategory(): HSFPConstants.LogGroupTypes;

  /**
   * 处理标志变更的内部方法
   * 
   * @private
   * @description
   * 根据实体类型执行不同的处理逻辑：
   * 
   * - **墙体(Wall)**：更新墙面状态
   * - **开口(Opening/ParametricOpening)**：同步更新关联面列表的hidden标志
   * - **自定义结构(NCustomizedStructure)**：处理主面和辅助面的可见性
   * - **参数化模型(NCustomizedParametricModel)**：
   *   - 标记子模型为脏状态
   *   - 参数化屋顶需额外处理开口、几何裁剪和材质
   * 
   * 最后触发所有脏楼层的几何重算
   * 
   * @returns {void}
   */
  private _onFlagChanged(): void;
}

/**
 * 模块默认导出
 */
export default VisibilityStateRequest;

/**
 * 外部依赖的命名空间声明
 */
declare namespace HSCore {
  namespace Model {
    /**
     * 实体标志枚举
     */
    enum EntityFlagEnum {
      /** 隐藏标志 */
      hidden
    }

    /** 基础实体接口 */
    interface Entity {
      /** 所属分组 */
      group?: Group;
      /** 检查标志是否开启 */
      isFlagOn(flag: EntityFlagEnum): boolean;
      /** 检查标志是否关闭 */
      isFlagOff(flag: EntityFlagEnum): boolean;
      /** 开启标志 */
      setFlagOn(flag: EntityFlagEnum): void;
      /** 关闭标志 */
      setFlagOff(flag: EntityFlagEnum): void;
    }

    /** 墙体类 */
    class Wall extends Entity {
      /** 获取唯一父级容器 */
      getUniqueParent(): Layer | unknown;
    }

    /** 图层类 */
    class Layer {}

    /** 开口类 */
    class Opening extends Entity {
      /** 关联的面列表 */
      faceList: Face[];
      /** 获取需要刷新的楼层 */
      getRefreshFloors(): Floor[];
    }

    /** 参数化开口类 */
    class ParametricOpening extends Entity {
      faceList: Face[];
      getRefreshFloors(): Floor[];
    }

    /** 参数化门类 */
    class ParametricDoor extends ParametricOpening {}

    /** 自定义结构类 */
    class NCustomizedStructure extends Entity {
      faceList: Face[];
      auxFaceList: Face[];
      /** 判断是否为墙体部件 */
      isWallPart(): boolean;
    }

    /** 自定义参数化模型类 */
    class NCustomizedParametricModel extends Entity {
      /** 标记子模型为脏状态 */
      dirtyChildModels(): void;
    }

    /** 自定义参数化屋顶类 */
    class NCustomizedParametricRoof extends NCustomizedParametricModel {
      openings: Opening[];
      parametricOpenings: ParametricOpening[];
      /** 标记裁剪几何为脏状态 */
      dirtyClipGeometry(): void;
      /** 标记面材质为脏状态 */
      dirtyFaceMaterials(): void;
    }

    /** 面类 */
    class Face extends Entity {
      /** 获取主实体 */
      getMaster(): Entity | null;
    }

    /** 楼层类 */
    class Floor {
      /** 标记几何为脏状态，触发重算 */
      dirtyGeometry(): void;
    }

    /** 分组类 */
    class Group {}
  }

  namespace Transaction {
    namespace Common {
      /** 状态请求基类 */
      class StateRequest {
        /** 提交事务 */
        onCommit(): void;
        /** 撤销事务 */
        onUndo(): void;
        /** 重做事务 */
        onRedo(): void;
      }
    }
  }

  namespace Util {
    namespace TgWall {
      /** 更新墙面状态工具方法 */
      function updateWallsFaceState(layer: Model.Layer, walls: Model.Wall[]): void;
    }
  }
}

/**
 * 全局选择管理器
 */
declare namespace HSApp {
  namespace Selection {
    namespace Manager {
      /** 取消选择实体 */
      function unselect(entity: HSCore.Model.Entity): void;
    }
  }
}

/**
 * 全局常量
 */
declare namespace HSFPConstants {
  /** 日志分组类型枚举 */
  enum LogGroupTypes {
    /** 内容操作分类 */
    ContentOperation
  }
}