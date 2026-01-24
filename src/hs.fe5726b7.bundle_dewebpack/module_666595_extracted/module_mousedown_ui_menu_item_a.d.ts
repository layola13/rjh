/**
 * 菜单项点击事件处理器
 * 
 * 阻止菜单项链接的默认行为（如跳转），通常用于自定义菜单交互逻辑。
 * 原始模块: module_mousedown__ui_menu_item___a
 * 选择器: mousedown .ui-menu-item > a
 * 
 * @param event - 鼠标按下事件对象
 */
export type MenuItemMouseDownHandler = (event: MouseEvent) => void;

/**
 * 菜单项鼠标按下事件处理函数
 * 
 * 当用户在菜单项的链接元素上按下鼠标时触发，阻止默认的链接行为。
 * 这允许应用程序实现自定义的菜单选择逻辑而不触发页面跳转。
 * 
 * @param event - DOM 鼠标事件对象
 * 
 * @example
 *