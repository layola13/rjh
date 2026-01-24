/**
 * 更改口袋侧面相关的请求和命令类型定义
 * @module ChangePocketSideRequest
 */

declare namespace HSCore {
  namespace Model {
    /**
     * 窗户模型
     */
    class Window {
      /**
       * 构建部件信息
       */
      buildPartsInfo(): void;
      
      /**
       * 标记几何体为脏状态（需要重新计算）
       */
      dirtyGeometry(): void;
      
      /**
       * 获取宿主对象
       */
      getHost(): Host | null;
    }

    /**
     * 门模型
     */
    class Door {
      /**
       * 标记几何体为脏状态（需要重新计算）
       */
      dirtyGeometry(): void;
      
      /**
       * 获取宿主对象
       */
      getHost(): Host | null;
    }

    /**
     * 口袋模型
     */
    class Pocket {
      /**
       * 口袋的侧面类型
       */
      side: PocketSideType;
      
      /**
       * 父对象（可能是窗户或门）
       */
      parent: Window | Door;
    }

    /**
     * 面类型
     */
    class Face {
      /**
       * 标记几何体为脏状态（需要重新计算）
       */
      dirtyGeometry(): void;
    }

    /**
     * 墙面类型枚举
     */
    enum WallFaceType {
      /** 后面 */
      back = 'back',
      /** 前面 */
      front = 'front',
      /** 左侧 */
      left = 'left',
      /** 右侧 */
      right = 'right',
    }
  }

  namespace Util {
    namespace Face {
      /**
       * 获取面的类型
       * @param face - 面对象
       * @returns 墙面类型
       */
      function getFaceType(face: Model.Face): Model.WallFaceType;
    }
  }

  namespace Transaction {
    /**
     * 事务请求基类
     */
    abstract class Request {
      /**
       * 提交时执行
       */
      abstract onCommit(): void;

      /**
       * 撤销时执行
       */
      abstract onUndo(): void;

      /**
       * 重做时执行
       */
      abstract onRedo(): void;
    }
  }
}

declare namespace HSApp {
  namespace Cmd {
    /**
     * 命令基类
     */
    abstract class Command {
      /**
       * 命令上下文
       */
      context: CommandContext;
      
      /**
       * 命令管理器
       */
      mgr: CommandManager;

      /**
       * 执行命令
       */
      abstract onExecute(): void;
    }

    /**
     * 命令上下文
     */
    interface CommandContext {
      /**
       * 事务管理器
       */
      transManager: TransactionManager;
    }

    /**
     * 命令管理器
     */
    interface CommandManager {
      /**
       * 完成命令执行
       * @param command - 要完成的命令
       */
      complete(command: Command): void;
    }

    /**
     * 事务管理器
     */
    interface TransactionManager {
      /**
       * 创建请求
       * @param requestType - 请求类型
       * @param args - 请求参数
       * @returns 创建的请求对象
       */
      createRequest(requestType: string, args: unknown[]): HSCore.Transaction.Request;

      /**
       * 提交请求
       * @param request - 要提交的请求
       */
      commit(request: HSCore.Transaction.Request): void;
    }
  }
}

/**
 * 宿主对象接口（可能包含面列表）
 */
interface Host {
  /**
   * 面列表
   */
  faceList?: HSCore.Model.Face[];
}

/**
 * 口袋侧面类型
 */
type PocketSideType = 'left' | 'right' | 'inside' | 'outside';

declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /** 更改口袋侧面 */
    ChangePocketSide = 'ChangePocketSide',
  }
}

/**
 * 更改口袋侧面的事务请求
 * @description 负责处理口袋侧面更改的提交、撤销和重做操作
 */
export declare class ChangePocketSideRequest extends HSCore.Transaction.Request {
  /**
   * 目标口袋对象
   */
  private readonly _pocket: HSCore.Model.Pocket;

  /**
   * 新的侧面类型
   */
  private readonly _side: PocketSideType;

  /**
   * 更改前的侧面类型（用于撤销）
   */
  private readonly _beforeSide: PocketSideType;

  /**
   * 构造函数
   * @param pocket - 要修改的口袋对象
   * @param newSide - 新的侧面类型
   */
  constructor(pocket: HSCore.Model.Pocket, newSide: PocketSideType);

  /**
   * 提交更改时执行
   * @description 应用新的侧面类型
   */
  onCommit(): void;

  /**
   * 撤销更改时执行
   * @description 恢复到原始侧面类型
   */
  onUndo(): void;

  /**
   * 重做更改时执行
   * @description 重新应用新的侧面类型
   */
  onRedo(): void;

  /**
   * 应用侧面更改
   * @param side - 要应用的侧面类型
   * @description 更新口袋侧面并触发相关几何体更新
   * @private
   */
  private _apply(side: PocketSideType): void;
}

/**
 * 更改口袋侧面的命令
 * @description 用于创建并执行更改口袋侧面的事务请求
 */
export default class ChangePocketSideCommand extends HSApp.Cmd.Command {
  /**
   * 目标口袋对象
   */
  private readonly _pocket: HSCore.Model.Pocket;

  /**
   * 新的侧面类型
   */
  private readonly _side: PocketSideType;

  /**
   * 构造函数
   * @param pocket - 要修改的口袋对象
   * @param newSide - 新的侧面类型
   */
  constructor(pocket: HSCore.Model.Pocket, newSide: PocketSideType);

  /**
   * 执行命令
   * @description 创建并提交更改口袋侧面的事务请求
   */
  onExecute(): void;
}

/**
 * 更新门侧面材质的工具函数
 * @param door - 门对象
 * @param side - 侧面类型
 */
declare function updateDoorSideFaceMaterial(
  door: HSCore.Model.Door,
  side: PocketSideType
): void;