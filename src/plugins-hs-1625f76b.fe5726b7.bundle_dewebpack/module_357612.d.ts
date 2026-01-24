/**
 * 位置坐标接口
 */
interface Position {
  x: number;
  y: number;
}

/**
 * 飘窗模型元数据接口
 */
interface BayWindowMetadata {
  userFreeData: {
    models?: unknown[];
    [key: string]: unknown;
  };
  clone(): BayWindowMetadata;
  [key: string]: unknown;
}

/**
 * 飘窗模型接口
 */
interface BayWindowModel {
  x: number;
  y: number;
  createChildModels(models: unknown[]): unknown[];
  buildPartsInfo(models: unknown[]): void;
}

/**
 * 飘窗规格接口
 */
interface BayWindowSpec {
  host: unknown;
  parent: unknown;
  models: unknown[];
  bayWindow: BayWindowModel;
}

/**
 * 复合事务请求基类
 */
declare class CompositeRequest {
  /**
   * 撤销操作时调用
   * @param args - 撤销参数
   */
  protected onUndo(args: unknown[]): void;

  /**
   * 重做操作时调用
   * @param args - 重做参数
   */
  protected onRedo(args: unknown[]): void;
}

/**
 * 创建飘窗事务请求类
 * 负责在场景中添加、撤销和重做飘窗模型
 */
declare class CreateBayWindowRequest extends CompositeRequest {
  /**
   * 飘窗元数据
   */
  private readonly _meta: BayWindowMetadata;

  /**
   * 宿主对象
   */
  private readonly _host: unknown;

  /**
   * 飘窗初始位置
   */
  private readonly _position: Position | null;

  /**
   * 飘窗规格配置（在提交后生成）
   */
  private _spec?: BayWindowSpec;

  /**
   * 构造函数
   * @param meta - 飘窗模型元数据
   * @param position - 飘窗初始位置坐标
   * @param unusedParam1 - 未使用的参数
   * @param unusedParam2 - 未使用的参数
   * @param host - 飘窗的宿主对象
   */
  constructor(
    meta: BayWindowMetadata,
    position: Position | null,
    unusedParam1: unknown,
    unusedParam2: unknown,
    host: unknown
  );

  /**
   * 提交事务，创建并添加飘窗到场景
   * @returns 创建的飘窗模型实例
   */
  onCommit(): BayWindowModel;

  /**
   * 撤销操作，从场景中移除飘窗
   */
  onUndo(): void;

  /**
   * 重做操作，将飘窗重新添加到场景
   */
  onRedo(): void;
}

/**
 * 全局命名空间
 */
declare namespace HSApp {
  namespace App {
    interface FloorplanApp {
      scene: {
        activeLayer: unknown;
      };
    }
    function getApp(): { floorplan: FloorplanApp };
  }
}

declare namespace HSCore {
  namespace Model {
    namespace BayWindow {
      function create(meta: BayWindowMetadata): BayWindowModel;
    }
  }

  namespace Util {
    namespace Content {
      /**
       * 获取飘窗规格配置
       * @param bayWindow - 飘窗模型
       * @returns 飘窗规格对象
       */
      function getBayWindowSpec(bayWindow: BayWindowModel): BayWindowSpec;

      /**
       * 向场景添加飘窗
       * @param spec - 飘窗规格配置
       */
      function addBayWindow(spec: BayWindowSpec): void;

      /**
       * 从场景移除飘窗
       * @param bayWindow - 要移除的飘窗模型
       */
      function removeBayWindow(bayWindow: BayWindowModel): void;
    }
  }

  namespace Transaction {
    namespace Common {
      export { CompositeRequest };
    }
  }
}

export default CreateBayWindowRequest;