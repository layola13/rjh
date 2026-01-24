/**
 * 2D 辅助线模块
 * 提供 2D 辅助线的上下文菜单和判断逻辑
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 上下文菜单项接口
 */
interface ContextMenuItem {
  /** 菜单项唯一标识 */
  id: string;
  /** 菜单项显示文本 */
  label: string;
  /** 菜单项图标（可选） */
  icon?: string;
  /** 点击回调函数 */
  action: (items: unknown[]) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 左侧菜单插件接口
 */
interface LeftMenuPlugin {
  /** 通用菜单项集合 */
  commonItems?: {
    /** 获取删除菜单项的工厂方法 */
    getDeleteItem: (items: unknown[]) => ContextMenuItem;
  };
}

/**
 * 2D 辅助线上下文菜单配置
 */
export interface GuideLine2d {
  /** 模块名称 */
  readonly name: 'GuideLine2d';

  /**
   * 判断选中项中是否包含 2D 辅助线
   * @param items - 选中的对象数组
   * @returns 如果选中项中包含至少一个 2D 辅助线实例，返回 true
   */
  isApplied(items: unknown[]): boolean;

  /**
   * 获取 2D 辅助线的上下文菜单项
   * @param items - 选中的 2D 辅助线对象数组
   * @returns 可用的上下文菜单项数组（当前仅包含删除操作）
   */
  getItems(items: unknown[]): ContextMenuItem[];
}

/**
 * 2D 辅助线上下文菜单实现
 */
export const GuideLine2d: GuideLine2d = {
  name: 'GuideLine2d',

  /**
   * 检查选中项是否包含 GuideLine2d 实例
   */
  isApplied(items: unknown[]): boolean {
    return items.some((item: unknown): boolean => {
      return item instanceof HSCore.Model.GuideLine2d;
    });
  },

  /**
   * 构建 2D 辅助线的上下文菜单
   * 从左侧菜单插件获取通用的删除菜单项
   */
  getItems(items: unknown[]): ContextMenuItem[] {
    const menuItems: ContextMenuItem[] = [];
    
    const leftMenuPlugin = HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.LeftMenu) as LeftMenuPlugin | undefined;

    if (leftMenuPlugin?.commonItems) {
      const deleteItem = leftMenuPlugin.commonItems.getDeleteItem(items);
      menuItems.push(deleteItem);
    }

    return menuItems;
  }
};