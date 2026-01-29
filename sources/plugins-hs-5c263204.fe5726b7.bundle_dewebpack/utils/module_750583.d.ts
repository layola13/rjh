/**
 * 3D组件位置移动事务请求类
 * 用于实现组件Z轴位置移动的可撤销/重做操作
 * @module ComponentMoveTransaction
 */

/**
 * 3D位置坐标接口
 */
interface Position3D {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标 */
  z: number;
}

/**
 * 组件状态接口
 */
interface ComponentState {
  /** 状态的本地唯一标识符 */
  localId: string;
  /** 状态值 */
  value: number;
}

/**
 * 父装配体接口
 */
interface ParentAssembly {
  /** 状态集合,键为状态ID */
  states: Record<string, ComponentState>;
  /** 计算装配体约束 */
  compute(): void;
  /** 根据输出状态ID移除约束 */
  removeConstraintsByOutputStateId(stateId: string): void;
}

/**
 * 3D组件接口
 */
interface Component3D {
  /** 组件唯一标识符 */
  ID: string;
  /** 组件本地标识符 */
  localId: string;
  /** 父装配体集合 */
  parents: Record<string, ParentAssembly>;
  /** Z轴位置 */
  z: number;
  /** 内部Z轴状态 */
  __z: ComponentState;
}

/**
 * Gizmo管理器接口
 */
interface GizmoManager {
  /** 当选择变化时调用 */
  _onSelectionChanged(): void;
}

/**
 * 应用视图接口
 */
interface AppView {
  /** Gizmo管理器实例 */
  gizmoManager: GizmoManager;
}

/**
 * 应用实例接口
 */
interface AppInstance {
  /** 当前激活的视图 */
  activeView: AppView;
}

/**
 * 全局HSApp命名空间
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用实例
     */
    function getApp(): AppInstance;
  }
}

/**
 * 全局HSCore命名空间
 */
declare namespace HSCore {
  namespace Transaction {
    /**
     * 事务请求基类
     */
    class Request {
      /**
       * 提交事务时调用
       */
      onCommit(): void;
      /**
       * 撤销事务时调用
       */
      onUndo(): void;
      /**
       * 重做事务时调用
       */
      onRedo(): void;
    }
  }
}

/**
 * 组件移动事务请求类
 * 继承自HSCore.Transaction.Request,实现组件Z轴位置变更的事务管理
 */
declare class ComponentMoveTransactionRequest extends HSCore.Transaction.Request {
  /** 关联的3D组件 */
  private _component: Component3D;
  
  /** 目标位置 */
  private _position: Position3D;
  
  /** 父装配体引用 */
  private parentPassembly: ParentAssembly;
  
  /** 应用实例引用 */
  private _app: AppInstance;
  
  /** 维度标识 */
  private dim: unknown;
  
  /** 组件索引 */
  private componentIndex: string;
  
  /** Gizmo管理器引用 */
  private gizmoManager: GizmoManager;
  
  /** 移动前的原始Z轴位置 */
  private prePrePosition: number;

  /**
   * 创建组件移动事务请求实例
   * @param component - 要移动的3D组件
   * @param position - 目标位置坐标
   * @param dimension - 维度参数
   */
  constructor(component: Component3D, position: Position3D, dimension: unknown);

  /**
   * 提交事务
   * 保存当前位置,执行移动操作,重新计算约束并更新Gizmo
   */
  onCommit(): void;

  /**
   * 撤销事务
   * 将组件恢复到移动前的位置
   */
  onUndo(): void;

  /**
   * 重做事务
   * 将组件移动到目标位置
   */
  onRedo(): void;

  /**
   * 执行组件移动操作
   * 根据组件类型(抽屉或普通组件)更新对应的状态值
   * @param zPosition - 目标Z轴位置
   * @private
   */
  private _move(zPosition: number): void;
}

export default ComponentMoveTransactionRequest;