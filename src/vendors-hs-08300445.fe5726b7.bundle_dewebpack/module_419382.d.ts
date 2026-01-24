/**
 * Menu组件模块
 * 提供菜单相关的所有子组件导出
 */

import Menu from './Menu'; // 假设来自模块 562111
import SubMenu from './SubMenu'; // 假设来自模块 421787
import MenuItem from './MenuItem'; // 假设来自模块 919364
import MenuItemGroup from './MenuItemGroup'; // 假设来自模块 420745
import Divider from './Divider'; // 假设来自模块 118955

/**
 * 菜单分割线组件
 */
export { Divider };

/**
 * 菜单项组件
 * @alias MenuItem
 */
export { MenuItem as Item };

/**
 * 菜单项组组件
 * @alias MenuItemGroup
 */
export { MenuItemGroup as ItemGroup };

/**
 * 菜单项组件
 */
export { MenuItem };

/**
 * 菜单项组组件
 */
export { MenuItemGroup };

/**
 * 子菜单组件
 */
export { SubMenu };

/**
 * 默认导出主菜单组件
 */
export default Menu;

/**
 * 菜单组件命名空间
 */
export type {
  Menu,
  SubMenu,
  MenuItem,
  MenuItemGroup,
  Divider
};