/**
 * 切换天花板可见性请求
 * 用于控制天花板及其关联板面（Slab）的显示/隐藏状态
 */
declare module HSCore.Transaction {
  /**
   * 切换天花板可见性的事务请求类
   * 继承自 HSCore.Transaction.Request，支持撤销/重做操作
   */
  export class ToggleCeilingVisibilityRequest extends Request {
    /**
     * 目标天花板实体
     * @private
     */
    private _ceiling: HSCore.Model.Entity;

    /**
     * 天花板所属的板面（Slab）主体
     * @private
     */
    private _slab: HSCore.Model.Slab;

    /**
     * 目标可见性状态
     * true - 显示天花板
     * false - 隐藏天花板
     */
    visible: boolean;

    /**
     * 构造函数
     * @param ceiling - 要操作的天花板实体
     * @param visible - 目标可见性状态（true为显示，false为隐藏）
     */
    constructor(ceiling: HSCore.Model.Entity, visible: boolean);

    /**
     * 切换板面可见性的内部方法
     * 遍历板面的所有面，根据面类型和条件设置隐藏标志
     * @param visible - true时移除隐藏标志，false时添加隐藏标志
     * @private
     */
    private _toggleSlab(visible: boolean): void;

    /**
     * 提交事务时执行
     * 应用目标可见性状态
     */
    onCommit(): void;

    /**
     * 撤销事务时执行
     * 恢复到操作前的可见性状态
     */
    onUndo(): void;

    /**
     * 重做事务时执行
     * 重新应用目标可见性状态
     */
    onRedo(): void;
  }
}

/**
 * HSCore 模型相关类型定义（用于类型推导）
 */
declare namespace HSCore.Model {
  /**
   * 板面面类型枚举
   */
  export enum SlabFaceType {
    /** 底面 */
    bottom = 0,
    // 其他面类型...
  }

  /**
   * 实体标志枚举
   */
  export enum EntityFlagEnum {
    /** 隐藏标志 */
    hidden = 0,
    // 其他标志...
  }

  /**
   * 板面实体接口
   */
  export interface Slab {
    /**
     * 遍历板面的所有面
     * @param callback - 对每个面执行的回调函数
     */
    forEachFace(callback: (face: Entity) => void): void;

    /**
     * 获取指定面的类型
     * @param face - 面实体
     * @returns 面类型枚举值
     */
    getFaceType(face: Entity): SlabFaceType;
  }

  /**
   * 通用实体接口
   */
  export interface Entity {
    /**
     * 获取实体的主体对象（例如天花板的板面）
     * @returns 板面对象
     */
    getMaster(): Slab;

    /**
     * 设置实体标志为开启状态
     * @param flag - 标志枚举值
     * @param propagate - 是否传播到子对象
     */
    setFlagOn(flag: EntityFlagEnum, propagate: boolean): void;

    /**
     * 设置实体标志为关闭状态
     * @param flag - 标志枚举值
     * @param propagate - 是否传播到子对象
     */
    setFlagOff(flag: EntityFlagEnum, propagate: boolean): void;
  }
}

/**
 * HSCore 事务系统命名空间
 */
declare namespace HSCore.Transaction {
  /**
   * 事务请求基类
   * 所有可撤销/重做的操作都应继承此类
   */
  export abstract class Request {
    /**
     * 提交事务时调用
     */
    abstract onCommit(): void;

    /**
     * 撤销事务时调用
     */
    abstract onUndo(): void;

    /**
     * 重做事务时调用
     */
    abstract onRedo(): void;
  }
}