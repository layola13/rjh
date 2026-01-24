/**
 * UI模块类型声明
 * @module UI
 * @description 负责属性栏UI组件的初始化、显示、隐藏和折叠等操作
 */

/**
 * 事件信号接口，用于通知属性栏填充完成
 */
interface Signal {
  /**
   * 触发信号，通知所有订阅者
   */
  dispatch(): void;
}

/**
 * UI处理器接口
 * @description 包含与UI交互所需的信号处理器
 */
interface UIHandler {
  /**
   * 属性栏填充完成的信号
   * @description 当属性栏数据填充完成时触发此信号
   */
  signalPopulatePropertyBarTeminated: Signal;
}

/**
 * 属性栏数据项接口
 * @description 描述属性栏中展示的数据模型结构
 */
interface PropertyBarItem {
  [key: string]: unknown;
}

/**
 * 属性栏React组件节点接口
 * @description 通过ref引用获取的属性栏组件实例
 */
interface PropertyBarNode {
  /**
   * 右侧视图模态框控制器
   */
  rightViewModal: {
    /**
     * 切换模态框显示状态
     * @param show - true为显示，false为隐藏
     */
    toggleModalShow(show: boolean): void;

    /**
     * 控制切换按钮的显示状态
     * @param show - true为显示按钮，false为隐藏按钮
     */
    showToggleModalBtn(show: boolean): void;
  };
}

/**
 * UI管理类
 * @description 管理插件UI组件的生命周期，包括属性栏的初始化、显示控制等功能
 */
export declare class UI {
  /**
   * UI事件处理器实例
   * @private
   */
  private handler: UIHandler;

  /**
   * 属性栏DOM容器元素
   * @private
   */
  private propertyBarElement: HTMLDivElement | undefined;

  /**
   * 属性栏当前显示状态
   * @private
   */
  private _isShow: boolean;

  /**
   * 属性栏React组件实例引用
   * @private
   */
  private propertyBarNode: PropertyBarNode | undefined;

  /**
   * 构造函数
   * @param handler - UI事件处理器，用于处理属性栏相关的信号通知
   */
  constructor(handler: UIHandler);

  /**
   * 初始化UI组件
   * @description 创建属性栏容器和消息包装器，并将其插入到插件容器中
   */
  init(): void;

  /**
   * 显示属性栏
   * @param item - 要在属性栏中显示的数据项
   * @param isReadonly - 是否为只读模式，默认为false
   * @description 使用React渲染属性栏组件，并在渲染完成后触发完成信号
   */
  show(item: PropertyBarItem, isReadonly?: boolean): void;

  /**
   * 折叠属性栏
   * @description 切换属性栏的折叠状态，并显示切换按钮
   */
  foldPropertybar(): void;

  /**
   * 隐藏属性栏
   * @description 隐藏属性栏容器，更新内部显示状态
   */
  hide(): void;
}