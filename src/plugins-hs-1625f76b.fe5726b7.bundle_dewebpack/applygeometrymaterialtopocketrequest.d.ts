/**
 * 应用几何材质到套线的请求模块
 * 原始模块ID: 561622
 */

declare namespace HSCore.Model {
  interface Pocket {
    metadata: any;
    material: HSCore.Material.Material;
    height: number;
    thickness: number;
    outerHeight: number;
    outerThickness: number;
    side: any;
    getMaterial(): HSCore.Material.Material;
  }

  namespace Pocket {
    function create(metadata?: any): Pocket;
  }
}

declare namespace HSCore.Material {
  interface Material {
    seekId: string;
    rotation: number;
    clone(): Material;
  }

  namespace Material {
    function create(source?: Material): Material;
  }
}

declare namespace HSCore.Transaction {
  class Request {
    protected context: any;
  }
}

declare namespace HSApp.Cmd {
  class Command {
    protected mgr: any;
    protected context: any;
  }
}

declare namespace HSConstants {
  enum ModelClass {
    NgDoor = "NgDoor",
    NgWindow = "NgWindow",
    NgHole = "NgHole"
  }
}

declare namespace HSFPConstants {
  enum RequestType {
    ApplyGeometryMaterialToPocket = "ApplyGeometryMaterialToPocket"
  }

  enum LogGroupTypes {
    ContentOperation = "ContentOperation"
  }
}

/**
 * 实体接口，表示可以添加套线的几何实体
 */
interface IPocketEntity {
  /** 实体唯一标识符 */
  ID: string;
  /** 实体类型 */
  Class: HSConstants.ModelClass;
  
  /**
   * 获取当前套线配置
   * @returns 套线对象
   */
  getPocket(): HSCore.Model.Pocket;
  
  /**
   * 添加套线到实体
   * @param pocket 套线对象
   */
  addPocket(pocket: HSCore.Model.Pocket): void;
  
  /**
   * 从实体移除套线
   */
  removePocket(): void;
  
  /**
   * 检查实体是否可以添加套线
   * @returns 是否可添加
   */
  canAddPocket(): boolean;
}

/**
 * 应用几何材质到套线的事务请求
 * 用于批量应用模板实体的套线配置到多个目标实体
 */
export declare class ApplyGeometryMaterialToPocketRequest extends HSCore.Transaction.Request {
  /** 模板实体，提供套线配置来源 */
  private readonly templateEntity: IPocketEntity;
  
  /** 目标实体列表，将应用套线配置 */
  private readonly entities: IPocketEntity[];
  
  /** 保存的原始套线映射表，用于撤销操作 */
  private readonly savedPocketMap: Map<string, HSCore.Model.Pocket | undefined>;
  
  /** 恢复的新套线映射表，用于重做操作 */
  private readonly restoredPocketMap: Map<string, HSCore.Model.Pocket>;

  /**
   * 构造函数
   * @param templateEntity 模板实体，作为套线配置的来源
   * @param entities 目标实体数组，将应用模板的套线配置
   */
  constructor(templateEntity: IPocketEntity, entities: IPocketEntity[]);

  /**
   * 提交事务时执行
   * 将模板实体的套线配置应用到所有目标实体
   */
  onCommit(): void;

  /**
   * 撤销操作
   * 恢复所有实体到原始套线状态
   */
  onUndo(): void;

  /**
   * 重做操作
   * 重新应用套线配置到所有目标实体
   */
  onRedo(): void;
}

/**
 * 应用几何材质到套线的命令
 * 用于交互式地将实体的套线配置应用到场景中的同类实体
 */
export default class ApplyGeometryMaterialToPocketCommand extends HSApp.Cmd.Command {
  /** 源实体，提供套线配置 */
  private readonly entity: IPocketEntity;

  /**
   * 构造函数
   * @param entity 源实体，其套线配置将被应用到其他同类实体
   */
  constructor(entity: IPocketEntity);

  /**
   * 执行命令
   * @param targetEntities 可选的目标实体列表。如果未提供，将自动查找场景中所有同类可应用的实体
   */
  onExecute(targetEntities?: IPocketEntity[]): void;

  /**
   * 判断命令是否支持撤销/重做
   * @returns 始终返回false，表示不支持
   */
  canUndoRedo(): boolean;

  /**
   * 显示操作提示
   * 根据实体类型显示相应的本地化提示消息
   */
  showLiveHint(): void;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 全局声明扩展
 */
declare global {
  namespace HSApp {
    namespace App {
      interface Application {
        floorplan: {
          scene: {
            forEachLayer(callback: (layer: Layer) => void): void;
          };
        };
      }
      function getApp(): Application;
    }

    namespace PaintPluginHelper {
      namespace Util {
        const MixPaintUtil: {
          disconnectFaceGroupWithPrompt(
            entities: IPocketEntity[],
            options: any,
            callback: () => void
          ): boolean;
        } | undefined;
      }
    }

    interface Layer {
      forEachOpening(callback: (opening: IPocketEntity) => void): void;
    }

    namespace Cmd {
      class Command {
        protected mgr: any;
        protected context: {
          transManager: TransactionManager;
        };
      }
    }

    interface TransactionManager {
      createRequest(
        type: HSFPConstants.RequestType,
        args: [IPocketEntity, IPocketEntity[]]
      ): ApplyGeometryMaterialToPocketRequest;
      commit(request: ApplyGeometryMaterialToPocketRequest): void;
    }
  }

  const LiveHint: {
    show(message: string, duration: number, position?: any, options?: { canclose: boolean }): void;
  };

  const ResourceManager: {
    getString(key: string): string;
  };
}