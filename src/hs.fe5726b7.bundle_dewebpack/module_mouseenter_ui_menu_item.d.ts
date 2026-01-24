/**
 * 处理菜单项鼠标进入事件的处理函数
 * 当鼠标进入菜单项时，移除其他菜单项的激活状态并聚焦当前项
 * 
 * @module MenuItemMouseEnterHandler
 */

/**
 * jQuery元素选择器函数类型
 */
type JQuerySelector = (selector: string | Element) => JQueryElement;

/**
 * jQuery元素接口，提供DOM操作方法
 */
interface JQueryElement {
  /**
   * 获取当前元素的所有兄弟元素
   */
  siblings(): JQueryElement;
  
  /**
   * 获取当前元素的子元素
   * @param selector - CSS选择器
   */
  children(selector: string): JQueryElement;
  
  /**
   * 移除指定的CSS类名
   * @param className - 要移除的类名
   */
  removeClass(className: string): JQueryElement;
}

/**
 * 菜单事件对象接口
 */
interface MenuEvent {
  /**
   * 触发事件的当前DOM元素
   */
  currentTarget: Element;
}

/**
 * 菜单组件上下文接口
 */
interface MenuContext {
  /**
   * 聚焦指定的菜单项
   * @param event - 菜单事件对象
   * @param element - 要聚焦的jQuery元素
   */
  focus(event: MenuEvent, element: JQueryElement): void;
}

/**
 * 菜单项鼠标进入事件处理函数
 * 
 * 功能：
 * 1. 移除所有兄弟菜单项的激活状态（.ui-state-active类）
 * 2. 将焦点设置到当前鼠标悬停的菜单项
 * 
 * @param this - 菜单组件上下文
 * @param jQuerySelector - jQuery选择器函数
 * @param event - 鼠标进入事件对象
 */
declare function handleMenuItemMouseEnter(
  this: MenuContext,
  jQuerySelector: JQuerySelector,
  event: MenuEvent
): void;