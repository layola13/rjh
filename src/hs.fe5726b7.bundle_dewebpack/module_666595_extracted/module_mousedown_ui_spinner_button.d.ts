/**
 * jQuery UI Spinner 按钮鼠标按下事件处理模块
 * @module SpinnerMouseDownHandler
 */

/**
 * jQuery 元素接口扩展
 */
interface JQuerySpinnerElement extends JQuery {
  /** 当前元素的DOM节点数组 */
  [index: number]: Element;
  
  /** 获取或设置输入框的值 */
  val(): string;
  val(value: string): this;
  
  /** 设置元素焦点 */
  focus(): this;
}

/**
 * Spinner 组件实例接口
 */
interface SpinnerInstance {
  /** Spinner 的 DOM 元素 */
  element: JQuerySpinnerElement;
  
  /** 当前文档对象 */
  document: JQuery<Document>;
  
  /** 保存的前一个值 */
  previous?: string;
  
  /** 取消模糊标志 */
  cancelBlur?: boolean;
  
  /**
   * 延迟执行函数
   * @param callback - 要延迟执行的回调函数
   */
  _delay(callback: () => void): void;
  
  /**
   * 启动值变化操作
   * @param event - 鼠标事件对象
   * @returns 是否成功启动
   */
  _start(event: MouseEvent): boolean;
  
  /**
   * 重复执行值变化
   * @param _unused - 未使用的参数
   * @param direction - 方向：1表示向上，-1表示向下
   * @param event - 鼠标事件对象
   */
  _repeat(_unused: null, direction: 1 | -1, event: MouseEvent): void;
}

/**
 * jQuery 静态方法扩展（假设存在 e 方法用于选择器）
 */
interface JQueryStatic {
  /**
   * 根据目标元素创建 jQuery 对象
   * @param target - DOM 元素或选择器
   */
  (target: EventTarget | Element | string): JQuery;
}

/**
 * Spinner 按钮鼠标按下事件处理函数
 * 
 * 功能说明：
 * 1. 保存当前输入值并设置焦点
 * 2. 根据点击的按钮（上/下）触发值的增减
 * 3. 处理连续点击的重复操作
 * 
 * @param this - Spinner 实例上下文
 * @param event - 鼠标按下事件对象
 */
declare function handleSpinnerButtonMouseDown(
  this: SpinnerInstance,
  event: MouseEvent
): void;

/**
 * 内部辅助函数：聚焦元素并恢复前一个值
 * @param this - Spinner 实例上下文
 */
declare function focusAndRestorePrevious(this: SpinnerInstance): void;

export { SpinnerInstance, JQuerySpinnerElement, handleSpinnerButtonMouseDown, focusAndRestorePrevious };