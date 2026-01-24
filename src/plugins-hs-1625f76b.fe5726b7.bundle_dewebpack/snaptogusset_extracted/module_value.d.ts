/**
 * 模块: module_value
 * 原始ID: value
 * 
 * 内容移动操作的配置和执行函数
 * 处理3D场景中实体的拖拽移动，包括吸附、约束和方向自适应等功能
 */

/**
 * 3D坐标点接口
 */
interface Point3D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标（高度） */
  z: number;
}

/**
 * 移动操作配置选项
 */
interface MoveOperationOptions {
  /** 是否约束在房间内 */
  constraintInRoom?: boolean;
  /** 是否忽略吸附偏移 */
  ignoreSnapOffset?: boolean;
  /** 是否保持Z轴不变 */
  keepZAxis?: boolean;
  /** 是否自动选中对象 */
  select?: boolean;
  /** 是否启用自动方向适配 */
  autoFitDirectionEnable?: boolean;
}

/**
 * 会话管理器接口
 */
interface TransactionSession {
  /** 创建事务请求 */
  createRequest(requestType: string, params: unknown[]): unknown;
  /** 提交事务 */
  commit(request: unknown): void;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /** 开始新的事务会话 */
  startSession(): TransactionSession;
}

/**
 * 内容类型接口
 */
interface ContentType {
  /** 检查是否为指定类型 */
  isTypeOf(type: string): boolean;
}

/**
 * 可移动内容实体接口
 */
interface MovableContent {
  /** 是否需要更新标记（针对CornerWindow类型） */
  needUpdate?: boolean;
  /** 内容类型 */
  contentType: ContentType;
  /** X坐标位置 */
  x: number;
  /** Y坐标位置 */
  y: number;
  /** Z坐标位置（相对高度） */
  z: number;
  /** 是否为模拟状态 */
  isSimulated: boolean;
  /** 获取唯一父级对象 */
  getUniqueParent(): unknown;
}

/**
 * 3D视图接口
 */
interface View3D {
  /** 设置跟踪实体 */
  setTrackingEntity(entity: MovableContent): void;
  /** 设置拖拽移动实体的中心位置 */
  setDragMoveEntityCenterPos(position: Point3D): void;
}

/**
 * 应用设置接口
 */
interface AppSettings {
  /** 获取视图配置项 */
  getViewItem(key: string): unknown;
  /** 设置视图配置项 */
  setViewItem(key: string, value: unknown): void;
}

/**
 * 场景接口
 */
interface Scene {
  /** 获取图层高度 */
  getLayerAltitude(parent: unknown): number;
}

/**
 * 平面图接口
 */
interface FloorPlan {
  /** 场景对象 */
  scene: Scene;
}

/**
 * 应用程序接口
 */
interface Application {
  /** 当前激活的环境ID */
  activeEnvironmentId: string;
  /** 应用设置 */
  appSettings: AppSettings;
  /** 平面图对象 */
  floorplan: FloorPlan;
  /** 获取激活的3D视图 */
  getActive3DView(): View3D | null;
}

/**
 * 吸附辅助器接口
 */
interface SnappingHelper {
  /** 吸附策略列表 */
  strategies: unknown[];
}

/**
 * 选择管理器接口
 */
interface SelectionManager {
  /** 取消选择所有对象 */
  unselectAll(): void;
  /** 选中指定对象 */
  select(content: MovableContent): void;
}

/**
 * 移动操作上下文
 */
declare class MoveOperationContext {
  /** 操作的内容对象 */
  content: MovableContent;
  
  /** 上下文对象 */
  context: {
    /** 事务管理器 */
    transManager: TransactionManager;
  };
  
  /** 应用程序实例 */
  private _app: Application;
  
  /** 当前会话 */
  private _session: TransactionSession | null;
  
  /** 目标位置 */
  private _targetPosition: Point3D | null;
  
  /** 配置选项 */
  private _option: MoveOperationOptions | null;
  
  /** 是否约束在房间内 */
  constraintInRoom: boolean;
  
  /** 是否忽略吸附偏移 */
  ignoreSnapOffset: boolean;
  
  /** 是否保持Z轴不变 */
  keepZAxis: boolean;
  
  /** 是否启用自动方向适配 */
  autoFitDirectionEnable: boolean;
  
  /** 基准点位置 */
  basePoint: Point3D | null;
  
  /** 开始拖拽时的点位置 */
  beginPoint: Point3D | null;
  
  /** 吸附辅助器 */
  snappingHelper: SnappingHelper | null;
  
  /** 2D草图输入控件是否可见 */
  sketch2dInputControlVisible: unknown;
  
  /**
   * 执行移动操作
   * @param options - 移动操作的配置选项
   */
  execute(options?: MoveOperationOptions): void;
  
  /**
   * 移动到指定位置
   * @param position - 目标3D坐标
   */
  moveto(position: Point3D): void;
  
  /**
   * 保存和恢复数据
   */
  private _saveRestoreData(): void;
  
  /**
   * 完成移动操作回调
   * @param position - 最终位置
   */
  private _onComplete(position: Point3D): void;
  
  /**
   * 获取实体中心位置
   * @returns 实体的中心3D坐标
   */
  private _getEntityCenterPos(): Point3D;
  
  /**
   * 获取吸附策略列表
   * @param helper - 吸附辅助器实例
   * @returns 策略数组
   */
  private _getSnappingStrategies(helper: SnappingHelper): unknown[];
  
  /**
   * 开始移动天花板内容时的回调
   */
  private _onBeginMoveCeilingContent(): void;
  
  /**
   * 创建操作手柄（Gizmo）
   */
  private _createGizmo(): void;
  
  /**
   * 获取可替换的内容列表
   * @param content - 当前内容对象
   */
  private _getReplaceContents(content: MovableContent): void;
}

/**
 * HSFPConstants 命名空间 - 常量定义
 */
declare namespace HSFPConstants {
  /**
   * 环境类型枚举
   */
  enum Environment {
    /** 自定义天花板模型环境 */
    CustomizedCeilingModel = 'CustomizedCeilingModel',
    /** N自定义天花板模型环境 */
    NCustomizedCeilingModel = 'NCustomizedCeilingModel'
  }
  
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /** 恢复柔性布料 */
    RestoreSoftCloth = 'RestoreSoftCloth'
  }
}

/**
 * HSCatalog 命名空间 - 内容类型目录
 */
declare namespace HSCatalog {
  /**
   * 内容类型枚举
   */
  enum ContentTypeEnum {
    /** 外部天花板附着照明 */
    ext_CeilingAttachedLighting = 'ext_CeilingAttachedLighting'
  }
}

/**
 * HSCore 命名空间 - 核心模型定义
 */
declare namespace HSCore {
  namespace Model {
    /**
     * 转角窗模型类
     */
    class CornerWindow {
      /** 是否需要更新 */
      needUpdate: boolean;
    }
  }
}

/**
 * HSApp 命名空间 - 应用程序工具和服务
 */
declare namespace HSApp {
  namespace Util {
    /**
     * 内容工具类
     */
    namespace Content {
      /**
       * 检查内容是否启用自动方向适配
       * @param content - 内容对象
       * @returns 是否启用
       */
      function isContentAutoFitEnable(content: MovableContent): boolean;
    }
    
    /**
     * 选择工具类
     */
    namespace Selection {
      /**
       * 检查是否只选中了指定内容
       * @param content - 内容对象
       * @returns 是否仅选中该对象
       */
      function hasOnlySelected(content: MovableContent): boolean;
    }
  }
  
  /**
   * 吸附功能命名空间
   */
  namespace Snapping {
    /**
     * 吸附辅助器类
     */
    class Helper {
      /** 吸附策略列表 */
      strategies: unknown[];
      
      /**
       * 构造函数
       * @param content - 要吸附的内容对象
       */
      constructor(content: MovableContent);
    }
  }
  
  /**
   * 选择管理命名空间
   */
  namespace Selection {
    /**
     * 选择管理器单例
     */
    const Manager: SelectionManager;
  }
}

/**
 * 模块导出的主函数类型
 * 执行内容移动操作的核心逻辑
 */
export type ModuleValueFunction = (this: MoveOperationContext, options?: MoveOperationOptions) => void;