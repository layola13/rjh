/**
 * Select组件图标配置模块
 * 用于处理Select组件的各种图标（后缀图标、清除图标、选中图标、移除图标等）
 */

import type { ReactElement, ReactNode } from 'react';

/**
 * 图标配置输入参数
 */
export interface IconConfig {
  /** 后缀图标（下拉箭头等） */
  suffixIcon?: ReactNode;
  /** 清除图标 */
  clearIcon?: ReactNode;
  /** 菜单项选中图标 */
  menuItemSelectedIcon?: ReactNode;
  /** 移除图标（多选模式下的标签移除） */
  removeIcon?: ReactNode;
  /** 是否处于加载状态 */
  loading?: boolean;
  /** 是否多选模式 */
  multiple?: boolean;
  /** 组件CSS类名前缀 */
  prefixCls?: string;
}

/**
 * 后缀图标函数参数
 */
export interface SuffixIconProps {
  /** 下拉框是否打开 */
  open: boolean;
  /** 是否显示搜索 */
  showSearch: boolean;
}

/**
 * 图标配置输出结果
 */
export interface IconConfigResult {
  /** 清除图标节点 */
  clearIcon: ReactNode;
  /** 后缀图标节点或函数 */
  suffixIcon: ReactNode | ((props: SuffixIconProps) => ReactElement);
  /** 菜单项图标节点 */
  itemIcon: ReactNode;
  /** 移除图标节点 */
  removeIcon: ReactNode;
}

/**
 * 获取Select组件的图标配置
 * 
 * @param config - 图标配置参数
 * @returns 处理后的图标配置对象
 * 
 * @remarks
 * 该函数根据传入的配置和状态，生成Select组件所需的各种图标：
 * - clearIcon: 使用自定义图标或默认清除图标
 * - suffixIcon: 根据loading状态显示加载图标或下拉箭头
 * - itemIcon: 多选模式下显示复选框图标
 * - removeIcon: 使用自定义图标或默认关闭图标
 */
export default function getIcons(config: IconConfig): IconConfigResult;