/**
 * 重置空间请求事务
 * 用于撤销或重置空间数据到特定状态
 */
declare module "ResetSpaceRequest" {
  import { HSCore } from "HSCore";

  /**
   * 空间重置请求类
   * 继承自 HSCore 的状态请求基类，用于处理空间数据的重置操作
   */
  export class ResetSpaceRequest extends HSCore.Transaction.Common.StateRequest {
    /**
     * 需要重置的图层对象
     */
    private _layer: unknown;

    /**
     * 是否重置 Slab（楼板/平面）数据
     */
    private _resetSlab: boolean;

    /**
     * 构造函数
     * @param layer - 要重置的图层对象
     * @param resetSlab - 是否重置 Slab 数据
     */
    constructor(layer: unknown, resetSlab: boolean);

    /**
     * 提交事务时的回调方法
     * 执行实际的空间数据重置逻辑，使用 SplitHelper 进行重置操作
     */
    onCommit(): void;

    /**
     * 判断是否可以对字段进行事务处理
     * @returns 始终返回 true，表示支持字段级事务
     */
    canTransactField(): boolean;

    /**
     * 获取操作描述文本
     * @returns 操作描述字符串
     */
    getDescription(): string;

    /**
     * 获取操作所属的日志分类
     * @returns 返回空间操作类型的日志分组标识
     */
    getCategory(): HSFPConstants.LogGroupTypes;
  }
}

/**
 * 全局常量定义（引用）
 */
declare namespace HSFPConstants {
  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /**
     * 空间操作类型
     */
    SpaceOperation = "SpaceOperation"
  }
}

/**
 * HSCore 命名空间扩展（引用）
 */
declare namespace HSCore {
  namespace Model.Geom {
    /**
     * 空间分割辅助工具类
     * 用于处理空间几何数据的分割和重置
     */
    class SplitHelper {
      /**
       * @param layer - 操作的目标图层
       */
      constructor(layer: unknown);

      /**
       * 重置空间数据
       * @param resetSlab - 是否重置 Slab 数据
       */
      reset(resetSlab: boolean): void;
    }
  }

  namespace Transaction.Common {
    /**
     * 状态请求基类
     * 所有状态变更请求的抽象基类
     */
    abstract class StateRequest {
      /**
       * 提交事务的抽象方法
       */
      abstract onCommit(): void;

      /**
       * 判断字段是否可事务化
       */
      abstract canTransactField(): boolean;

      /**
       * 获取操作描述
       */
      abstract getDescription(): string;

      /**
       * 获取操作分类
       */
      abstract getCategory(): unknown;
    }
  }
}