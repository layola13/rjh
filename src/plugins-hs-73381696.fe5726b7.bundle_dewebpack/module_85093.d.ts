/**
 * 抽象策略基类，定义了材质刷操作的通用接口
 * 用于实现材质的吸取、应用、撤销和重做功能
 */
declare abstract class Strategy {
  /**
   * 策略类型标识
   */
  readonly type: "Strategy";

  /**
   * 判断指定对象是否可以被吸取材质
   * @param target - 待检测的目标对象
   * @returns 如果目标可以被吸取则返回 true
   */
  abstract isSuckable(target: unknown): boolean;

  /**
   * 从目标对象吸取材质信息
   * @param target - 要吸取材质的目标对象
   * @returns 吸取到的材质数据
   */
  abstract suck(target: unknown): unknown;

  /**
   * 判断材质是否可以应用到指定目标
   * @param target - 目标对象
   * @param material - 待应用的材质数据
   * @returns 如果材质可以应用到目标则返回 true
   */
  abstract isAppliable(target: unknown, material: unknown): boolean;

  /**
   * 将材质应用到目标对象
   * @param target - 目标对象
   * @param material - 要应用的材质数据
   */
  abstract apply(target: unknown, material: unknown): void;

  /**
   * 获取用于撤销操作的数据
   * @param data - 操作相关数据
   * @returns 撤销所需的数据
   */
  abstract getUndoData(data: unknown): unknown;

  /**
   * 获取用于重做操作的数据
   * @param data - 操作相关数据
   * @returns 重做所需的数据
   */
  abstract getRedoData(data: unknown): unknown;

  /**
   * 执行撤销操作
   * @param target - 目标对象
   * @param undoData - 撤销数据
   */
  abstract undo(target: unknown, undoData: unknown): void;

  /**
   * 执行重做操作
   * @param target - 目标对象
   * @param redoData - 重做数据
   */
  abstract redo(target: unknown, redoData: unknown): void;

  /**
   * 从材质对象或其他来源获取材质数据的克隆
   * @param source - 材质对象或包含 clone 方法的对象
   * @returns 克隆的材质数据
   * @internal
   */
  protected _getMaterialData(source: HSCore.Material.Material | { clone(): unknown }): unknown;

  /**
   * 从吸取信息中提取材质数据
   * @param suckInfo - 吸取操作返回的信息对象
   * @returns 克隆的材质数据，如果不存在则返回 undefined
   * @internal
   */
  protected _getMaterialDataFromSuckInfo(suckInfo: { materialData?: { clone(): unknown } }): unknown | undefined;

  /**
   * 准备砖块图案数据（异步）
   * @param pattern - 图案对象
   * @param materialData - 材质数据
   * @returns Promise，解析后返回准备好的材质数据
   * @internal
   */
  protected _prepareBrickPattern(
    pattern: HSPaveSDK.DefaultPattern | unknown,
    materialData: {
      seekId?: string;
      normalTexture?: string;
    }
  ): Promise<unknown>;

  /**
   * 提交材质刷请求到事务管理器
   * @param target - 目标对象
   * @param material - 材质数据
   */
  commitRequest(target: unknown, material: unknown): void;
}

export default Strategy;

/**
 * 全局命名空间声明
 */
declare namespace HSCore {
  namespace Material {
    interface Material {
      getMaterialData(): { clone(): unknown };
    }
  }

  namespace Doc {
    function getDocManager(): {
      transManager: TransactionManager;
    };
  }

  namespace Util {
    namespace Meta {
      function createPaveMetaFromGeneratedMaterial(material: unknown): {
        seekId: string;
      };
    }
  }
}

declare namespace HSPaveSDK {
  class DefaultPattern {}
}

declare namespace HSApp {
  namespace PaintPluginHelper {
    namespace Pave {
      namespace MixPaintPluginHelper {
        function prepareBrickPattern(pattern: unknown): Promise<unknown>;
      }
    }
  }
}

declare namespace HSFPConstants {
  enum RequestType {
    MaterialBrush = "MaterialBrush"
  }
}

interface TransactionManager {
  createRequest(type: HSFPConstants.RequestType, args: unknown[]): unknown;
  commitAsync(request: unknown): void;
}