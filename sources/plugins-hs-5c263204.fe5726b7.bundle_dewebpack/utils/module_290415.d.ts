/**
 * 3D坐标位置接口
 */
interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D尺寸接口
 */
interface Dimension3D {
  width: number;
  height: number;
  depth: number;
}

/**
 * 组件状态值包装器
 */
interface StateValue<T = unknown> {
  __value: T;
}

/**
 * 组件状态集合
 */
interface ComponentStates {
  /** 门板厚度状态 */
  ID_door_thickness: StateValue<number>;
  [key: string]: StateValue<unknown>;
}

/**
 * 父组件装配接口
 */
interface ParentAssembly {
  /** Z轴长度 */
  ZLength: number;
  /** 组件状态集合 */
  states: ComponentStates;
}

/**
 * 3D组件接口
 */
interface Component3D {
  /** Z轴长度 */
  ZLength: number;
  /** 父级组件映射 */
  parents: Record<string, ParentAssembly>;
}

/**
 * Gizmo管理器接口
 */
interface GizmoManager {
  /**
   * 选择状态变更时的内部处理方法
   */
  _onSelectionChanged(): void;
}

/**
 * 活动视图接口
 */
interface ActiveView {
  /** Gizmo操作管理器 */
  gizmoManager: GizmoManager;
}

/**
 * 应用程序实例接口
 */
interface AppInstance {
  /** 当前活动视图 */
  activeView: ActiveView;
}

/**
 * 全局应用对象
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用实例
     */
    function getApp(): AppInstance;
  }
  
  namespace Cmd {
    /**
     * 命令基类
     */
    class Command {
      /** 命令上下文 */
      context: CommandContext;
      /** 命令管理器 */
      mgr: CommandManager;
      
      /**
       * 执行命令的核心逻辑
       */
      onExecute(): void;
      
      /**
       * 判断命令是否支持撤销/重做
       */
      canUndoRedo(): boolean;
    }
  }
}

/**
 * 事务会话接口
 */
interface TransactionSession {
  /**
   * 提交事务会话
   */
  commit(): void;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 启动事务会话
   * @param options - 会话配置选项
   * @returns 事务会话对象
   */
  startSession(options: { undoRedo: boolean }): TransactionSession;
  
  /**
   * 创建请求对象
   * @param requestType - 请求类型常量
   * @param params - 请求参数数组
   * @returns 请求对象
   */
  createRequest(requestType: string, params: unknown[]): unknown;
  
  /**
   * 提交请求
   * @param request - 待提交的请求对象
   */
  commit(request: unknown): void;
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 完成命令执行
   * @param command - 已完成的命令实例
   */
  complete(command: HSApp.Cmd.Command): void;
}

/**
 * HSF平台常量
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  namespace RequestType {
    /** 改变抽屉位置请求类型 */
    const ChangeDrawerPositionRequest: string;
  }
}

/**
 * 提示状态枚举
 */
enum LiveHintStatus {
  warning = "warning",
  canops = "canops"
}

/**
 * 提示选项接口
 */
interface LiveHintOptions {
  /** 提示状态类型 */
  status: LiveHintStatus;
  /** 是否可关闭 */
  canclose: boolean;
}

/**
 * 实时提示工具
 */
declare namespace LiveHint {
  /** 状态枚举 */
  const statusEnum: typeof LiveHintStatus;
  
  /**
   * 显示提示消息
   * @param message - 提示文本内容
   * @param duration - 显示时长（毫秒），可选
   * @param callback - 回调函数，可选
   * @param options - 提示选项
   */
  function show(
    message: string,
    duration?: number,
    callback?: (() => void) | null,
    options?: LiveHintOptions
  ): void;
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 根据键获取本地化字符串
   * @param key - 资源键名
   * @returns 本地化后的字符串
   */
  function getString(key: string): string;
}

/**
 * 改变抽屉位置命令类
 * 
 * 用于处理自定义柜体中抽屉组件的位置变更操作，包含边界检查和事务管理。
 */
declare class ChangeDrawerPositionCommand extends HSApp.Cmd.Command {
  /** 目标3D组件 */
  private _component: Component3D;
  
  /** 新的3D位置坐标 */
  private _position: Position3D;
  
  /** 组件尺寸信息 */
  private _dim: Dimension3D;
  
  /** 父级组件装配对象 */
  private parentPassembly: ParentAssembly;
  
  /** Gizmo操作管理器引用 */
  private gizmoManager: GizmoManager;
  
  /**
   * 构造函数
   * @param component - 待移动的3D组件
   * @param position - 目标位置坐标
   * @param dimension - 组件尺寸
   */
  constructor(component: Component3D, position: Position3D, dimension: Dimension3D);
  
  /**
   * 执行抽屉位置变更
   * 
   * 验证新位置是否在允许的Z轴范围内：
   * - 最小值：0
   * - 最大值：父组件Z长度 - 当前组件Z长度
   * 
   * 若超出范围，显示警告并中止操作；
   * 若合法，创建事务并提交位置变更请求。
   */
  onExecute(): void;
  
  /**
   * 判断该命令是否支持撤销/重做
   * @returns 始终返回 false
   */
  canUndoRedo(): boolean;
}

export default ChangeDrawerPositionCommand;