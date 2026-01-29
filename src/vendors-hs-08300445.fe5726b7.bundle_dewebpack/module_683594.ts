/**
 * 下拉菜单可见性和键盘交互管理钩子
 * @module useMenuVisibility
 */

import type { RefObject } from 'react';

/**
 * 触发器引用类型，包含嵌套的triggerRef属性
 */
interface TriggerRef {
  /** 当前触发器元素 */
  current: {
    /** 嵌套的触发器引用 */
    triggerRef: {
      /** DOM元素引用 */
      current: {
        /** 聚焦方法 */
        focus?: () => void;
      } | null;
    } | null;
  } | null;
}

/**
 * 菜单引用类型
 */
interface MenuRef {
  /** 当前菜单元素 */
  current: {
    /** 聚焦方法 */
    focus?: () => void;
  } | null;
}

/**
 * Hook参数接口
 */
interface UseMenuVisibilityParams {
  /** 菜单是否可见 */
  visible: boolean;
  /** 设置触发器可见性的回调函数 */
  setTriggerVisible: (visible: boolean) => void;
  /** 触发器元素引用 */
  triggerRef: TriggerRef;
  /** 菜单元素引用 */
  menuRef: MenuRef;
  /** 可见性变化回调 */
  onVisibleChange?: (visible: boolean) => void;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
}

/**
 * 键盘按键码常量
 */
declare const ESC: number;
declare const TAB: number;

/**
 * 延迟执行函数
 * @param callback - 要执行的回调函数
 * @param delay - 延迟时间（毫秒）
 */
declare function delayExecution(callback: () => void, delay: number): void;

/**
 * 管理下拉菜单的可见性和键盘交互
 * 
 * 功能：
 * - ESC键关闭菜单并返回焦点到触发器
 * - TAB键在菜单未聚焦时先聚焦菜单，已聚焦时关闭菜单
 * - 支持自动聚焦到菜单
 * - 自动清理事件监听器
 * 
 * @param params - Hook配置参数
 * 
 * @example
 *