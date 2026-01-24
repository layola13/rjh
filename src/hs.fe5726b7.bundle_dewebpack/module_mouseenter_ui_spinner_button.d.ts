/**
 * jQuery UI Spinner - 鼠标进入按钮事件处理器
 * 
 * 当鼠标进入spinner按钮（增加或减少按钮）时触发
 * 如果按钮已处于激活状态，则开始重复递增/递减操作
 * 
 * @module UISpinnerMouseEnterHandler
 */

/**
 * jQuery 元素接口
 */
interface JQueryElement {
  /**
   * 检查元素是否包含指定的CSS类
   * @param className - 要检查的CSS类名
   * @returns 如果包含该类返回true，否则返回false
   */
  hasClass(className: string): boolean;
}

/**
 * jQuery 选择器函数类型
 * @param selector - CSS选择器或DOM元素
 * @returns jQuery包装的元素对象
 */
type JQuerySelector = (selector: Element | string) => JQueryElement;

/**
 * 鼠标事件对象接口
 */
interface MouseEventObject {
  /**
   * 触发事件的当前目标元素
   */
  currentTarget: Element;
}

/**
 * UI Spinner组件接口
 */
interface UISpinner {
  /**
   * 开始spinner的递增/递减操作
   * @param event - 触发操作的事件对象
   * @returns 如果成功启动返回true，否则返回false
   */
  _start(event: MouseEventObject): boolean;

  /**
   * 重复执行spinner的递增/递减操作
   * @param delay - 重复操作的延迟时间（毫秒），null表示立即执行
   * @param direction - 操作方向：1表示增加，-1表示减少
   * @param event - 触发操作的事件对象
   * @returns void
   */
  _repeat(delay: number | null, direction: 1 | -1, event: MouseEventObject): void;

  /**
   * 鼠标进入spinner按钮时的事件处理函数
   * 
   * 处理流程：
   * 1. 检查当前按钮是否已处于激活状态（ui-state-active类）
   * 2. 如果未激活，返回false
   * 3. 如果已激活，启动spinner操作（_start）
   * 4. 根据按钮类型（ui-spinner-up或其他）确定递增/递减方向
   * 5. 开始重复执行操作（_repeat）
   * 
   * @param this - UI Spinner组件实例上下文
   * @param event - 鼠标事件对象
   * @returns 如果按钮未激活返回false，否则返回void
   */
  handleMouseEnterButton(
    this: UISpinner,
    event: MouseEventObject
  ): false | void;
}

/**
 * 鼠标进入事件处理器模块
 */
declare module "mouseenter__ui_spinner_button" {
  /**
   * 处理鼠标进入spinner按钮的事件
   * @param jQuerySelector - jQuery选择器函数
   * @param event - 鼠标事件对象
   * @this UISpinner - Spinner组件实例
   */
  export function handleMouseEnter(
    this: UISpinner,
    jQuerySelector: JQuerySelector,
    event: MouseEventObject
  ): false | void;
}