/**
 * 值变化控制接口模块
 * @module IValueChange
 */

/**
 * 值变化事件数据接口
 */
export interface IValueChangeEventData {
  /** 变化后的值 */
  value: unknown;
}

/**
 * 值变化事件对象
 */
export interface IValueChangeEvent {
  /** 事件携带的数据 */
  data: IValueChangeEventData;
}

/**
 * 值变化控制器接口
 */
export interface IValueChangeController {
  /** 值变化信号 */
  singalValueChanged: unknown;
  
  /**
   * 值变化开始时触发
   * @param event - 变化事件
   */
  onValueChangeStart?(event: unknown): void;
  
  /**
   * 值变化时触发
   * @param event - 变化事件
   */
  onValueChanged?(event: unknown): void;
  
  /**
   * 值变化结束时触发
   * @param event - 变化事件
   */
  onValueChangeEnd?(event: unknown): void;
}

/**
 * 组件属性数据接口
 */
export interface IValueChangePropsData {
  /** 关联的值变化控制器 */
  controller?: IValueChangeController;
  
  /**
   * 值变化开始回调
   * @param event - 变化事件
   */
  onValueChangeStart?(event: unknown): void;
  
  /**
   * 值变化回调
   * @param event - 变化事件
   */
  onValueChange?(event: unknown): void;
  
  /**
   * 值变化结束回调
   * @param event - 变化事件
   */
  onValueChangeEnd?(event: unknown): void;
}

/**
 * 组件属性接口
 */
export interface IValueChangeProps<TBaseProps = unknown> {
  /** 组件数据配置 */
  data: IValueChangePropsData;
}

/**
 * 组件状态接口
 */
export interface IValueChangeState {
  /** 当前值 */
  value: unknown;
}

/**
 * 值变化混入类声明
 * @template TBase - 基础组件类型
 */
export declare function IValueChange<TBase extends new (...args: any[]) => any>(
  Base: TBase
): {
  new (props: IValueChangeProps): {
    /** 信号钩子实例，用于管理事件监听 */
    signalHook: any;
    
    /** 关联的值变化控制器 */
    controller?: IValueChangeController;
    
    /** 组件属性 */
    props: IValueChangeProps;
    
    /**
     * 更新关联的控制器
     * @param props - 新的属性对象
     */
    updateController(props: IValueChangeProps): void;
    
    /**
     * 组件停用时的清理方法
     */
    onDeactive(): void;
    
    /**
     * 停用回调（可选实现）
     */
    deactive?(): void;
    
    /**
     * 值变化事件处理器
     * @param event - 值变化事件
     */
    onValueChanged(event: IValueChangeEvent): void;
    
    /**
     * 设置组件状态
     * @param state - 新的状态对象
     */
    setState(state: Partial<IValueChangeState>): void;
    
    /**
     * 值变化开始处理
     * @param event - 变化事件
     */
    changeStart(event: unknown): void;
    
    /**
     * 值变化处理
     * @param event - 变化事件
     */
    changed(event: unknown): void;
    
    /**
     * 值变化结束处理
     * @param event - 变化事件
     */
    changeEnd(event: unknown): void;
  } & InstanceType<TBase>;
} & TBase;

/**
 * 模块导出对象
 */
declare const exports: {
  /** 值变化混入函数 */
  IValueChange: typeof IValueChange;
};

export default exports;