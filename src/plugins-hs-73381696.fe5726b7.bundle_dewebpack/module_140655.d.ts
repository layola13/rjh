/**
 * 左侧菜单点击事件监听器配置模块
 * 用于追踪和记录用户在左侧菜单中的点击行为
 */

import { createLogData, LogData } from './module_858122';

/**
 * 菜单项配置接口
 */
interface MenuItem {
  /** 菜单项唯一标识 */
  id: string;
  /** 菜单项显示标签 */
  label: string;
  /** 菜单项排序顺序 */
  order: number;
}

/**
 * 子菜单项配置接口
 */
interface SubMenuItem {
  /** 子菜单项显示标签 */
  label: string;
}

/**
 * 监听器事件参数接口
 */
interface ListenEventParams {
  /** 主菜单项 */
  item: MenuItem;
  /** 子菜单项（可选） */
  subItem?: SubMenuItem;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取指定类型的插件实例
   * @param pluginType - 插件类型标识
   */
  getPlugin(pluginType: string): LeftMenuPlugin;
}

/**
 * 左侧菜单插件接口
 */
interface LeftMenuPlugin {
  /** 左侧菜单项点击信号 */
  signalLeftMenuItemClick: unknown;
}

/**
 * 信号获取参数接口
 */
interface GetListenSignalParams {
  /** 插件管理器实例 */
  pluginManager: PluginManager;
}

/**
 * 日志参数信息接口
 */
interface LogArgInfo {
  /** 菜单项ID */
  id: string;
  /** 菜单项标签 */
  label: string;
  /** 菜单项顺序 */
  order: number;
  /** 子菜单项标签（可选） */
  subLabel?: string;
}

/**
 * 点击率统计子项接口
 */
interface ClicksRatioSubItem {
  /** 实体类型ID */
  id: string;
  /** 实体类型名称 */
  name: string;
}

/**
 * 点击率统计接口
 */
interface ClicksRatio {
  /** 菜单项ID */
  id: string;
  /** 菜单项名称 */
  name: string;
  /** 子项信息 */
  subItem: ClicksRatioSubItem;
}

/**
 * 事件监听器配置接口
 */
interface EventListenerConfig {
  /**
   * 获取需要监听的信号
   * @param params - 包含插件管理器的参数对象
   * @returns 左侧菜单项点击信号
   */
  getListenSignal(params: GetListenSignalParams): unknown;

  /**
   * 监听事件处理函数
   * @param params - 事件参数，包含菜单项和可选的子菜单项
   * @returns 日志数据数组
   */
  listen(params: ListenEventParams): LogData[];
}

/**
 * 左侧菜单点击事件监听器配置
 * 导出一个监听器配置数组，用于追踪左侧菜单的点击行为
 */
declare const leftMenuListenerConfig: EventListenerConfig[];

export default leftMenuListenerConfig;