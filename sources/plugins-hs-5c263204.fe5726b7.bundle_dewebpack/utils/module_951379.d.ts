/**
 * 组件位置变更事务请求类型定义
 * 用于处理家居设计应用中组件位置变更的撤销/重做操作
 */

declare module HSCore.Transaction {
  /**
   * 组件位置信息接口
   */
  interface Position {
    /** X轴坐标 */
    x: number;
    /** Y轴坐标 */
    y: number;
    /** Z轴坐标 */
    z: number;
  }

  /**
   * 尺寸标注对象接口
   */
  interface Dimension {
    /** 标注类型: 顶部/底部/左侧/右侧/到地板 */
    type: 'top' | 'bottom' | 'left' | 'right' | 'toFloor';
    /** 父级尺寸标注对象（可选） */
    parent?: Dimension;
    /** 绘制标注 */
    draw(): void;
  }

  /**
   * 状态对象接口
   */
  interface State {
    /** 状态唯一标识 */
    localId: string;
    /** 状态值 */
    value: number;
    /** 内部值 */
    __value?: number;
  }

  /**
   * 约束配置接口
   */
  interface ConstraintConfig {
    /** 约束方程式 */
    equation: string;
    /** 约束唯一标识 */
    localId: string;
    /** 约束类型 */
    type: 'position';
    /** 约束描述 */
    _des: string;
  }

  /**
   * 组件位置变更事务请求
   * 继承自 HSCore.Transaction.Request
   */
  class ComponentPositionChangeRequest extends Request {
    /** 被操作的组件实例 */
    private _component: HSCore.Model.PExtruding | HSCore.Model.PBox | HSCore.Model.PAssembly;
    
    /** 目标位置 */
    private _position: Position;
    
    /** 父级装配体 */
    private _parentPassembly: HSCore.Model.PAssembly;
    
    /** 应用实例 */
    private _app: HSApp.App;
    
    /** 尺寸标注对象 */
    private dim: Dimension;
    
    /** Gizmo管理器 */
    private gizmoManager: any;
    
    /** 是否为添加的组件（垂直/水平/灯带板） */
    private isAddedComponent: boolean;
    
    /** 操作前的位置 */
    private _prePosition?: Position;
    
    /** 组件索引号 */
    private componentIndex: string;
    
    /** 组件名称字符串 */
    private componentNameStr: string;
    
    /** 是否为上背板 */
    private isBackBoardUp?: boolean;
    
    /** 是否为下背板 */
    private isBackBoardBottom?: boolean;

    /**
     * 构造函数
     * @param component - 要移动的组件
     * @param position - 目标位置
     * @param dimension - 关联的尺寸标注对象
     */
    constructor(
      component: HSCore.Model.PExtruding | HSCore.Model.PBox | HSCore.Model.PAssembly,
      position: Position,
      dimension: Dimension
    );

    /**
     * 提交事务操作
     * 执行组件位置变更，更新约束和状态
     */
    onCommit(): void;

    /**
     * 撤销操作
     * 将组件位置恢复到变更前的状态
     */
    onUndo(): void;

    /**
     * 重做操作
     * 重新应用位置变更
     */
    onRedo(): void;

    /**
     * 获取Z轴状态对象
     * @returns Z轴状态对象或undefined
     * @private
     */
    private _getZState(): State | undefined;

    /**
     * 修改装配体状态
     * @param zValue - 新的Z轴值
     * @private
     */
    private _changePAssemblyState(zValue: number): void;

    /**
     * 添加状态到装配体
     * @param stateId - 状态标识符
     * @param value - 状态值
     * @param description - 状态描述
     * @param passembly - 目标装配体
     */
    addState(
      stateId: string,
      value: number,
      description: string,
      passembly: HSCore.Model.PAssembly
    ): void;
  }
}

declare namespace HSCore.Model {
  /**
   * 挤出模型组件
   */
  class PExtruding {
    /** 组件唯一标识 */
    localId: string;
    /** X坐标 */
    x: number;
    /** Y坐标 */
    y: number;
    /** Z坐标 */
    z: number;
    /** 父级组件映射 */
    parents: Record<string, any>;
    /** 路径集合 */
    paths: Array<{ children: Array<{ z: number }> }>;
  }

  /**
   * 盒子模型组件
   */
  class PBox {
    /** 组件唯一标识 */
    localId: string;
    /** X坐标 */
    x: number;
    /** Y坐标 */
    y: number;
    /** Z坐标 */
    z: number;
    /** 父级组件映射 */
    parents: Record<string, any>;
  }

  /**
   * 装配体组件
   */
  class PAssembly {
    /** 组件唯一标识 */
    localId: string;
    /** X坐标 */
    x: number;
    /** Y坐标 */
    y: number;
    /** Z坐标 */
    z: number;
    /** 父级组件映射 */
    parents: Record<string, any>;
    /** 约束集合 */
    constraints: Record<string, HSCore.Constraint.EquationConstraint>;
    /** 状态集合 */
    states: Record<string, HSCore.Transaction.State>;

    /**
     * 根据ID获取状态
     * @param stateId - 状态标识符
     */
    getStateById(stateId: string): HSCore.Transaction.State | undefined;

    /**
     * 移除指定状态ID的约束
     * @param stateId - 状态标识符
     * @param cascade - 是否级联删除
     */
    removeConstraintsByStateId(stateId: string, cascade: boolean): void;

    /**
     * 添加约束
     * @param constraint - 约束对象
     */
    addConstraint(constraint: HSCore.Constraint.EquationConstraint): void;

    /**
     * 计算装配体状态
     */
    compute(): void;
  }
}

declare namespace HSCore.Constraint {
  /**
   * 方程约束类
   */
  class EquationConstraint {
    /**
     * 初始化约束
     * @param config - 约束配置
     * @param states - 状态集合
     */
    init(
      config: HSCore.Transaction.ConstraintConfig,
      states: Record<string, HSCore.Transaction.State>
    ): void;
  }
}

declare namespace HSApp {
  /**
   * 应用类
   */
  class App {
    /** 活动视图 */
    activeView: {
      /** Gizmo管理器 */
      gizmoManager: {
        /** 选择变更事件处理 */
        _onSelectionChanged(): void;
      };
    };

    /**
     * 获取应用实例
     */
    static getApp(): App;
  }
}

/**
 * 获取或创建状态的工具函数
 * @param stateId - 状态标识符
 * @param value - 状态值
 * @param description - 状态描述
 * @param passembly - 装配体对象
 * @returns 状态对象
 */
declare function getState(
  stateId: string,
  value: number,
  description: string,
  passembly: HSCore.Model.PAssembly
): HSCore.Transaction.State;

export default HSCore.Transaction.ComponentPositionChangeRequest;