/**
 * 管理下拉菜单的键盘交互和焦点控制
 * @module useMenuKeyboardInteraction
 */

import { useRef, useEffect } from 'react';
import KeyCode from './KeyCode'; // 假设 730722 模块导出键盘码常量
import { scheduleTask } from './scheduleTask'; // 假设 967297 模块导出任务调度函数

/**
 * 菜单触发器引用接口
 */
interface TriggerRef {
  /** 触发器DOM引用 */
  current: {
    /** 触发器元素引用 */
    triggerRef?: {
      current?: {
        /** 聚焦方法 */
        focus?: () => void;
      };
    };
  } | null;
}

/**
 * 菜单引用接口
 */
interface MenuRef {
  current: {
    /** 菜单聚焦方法 */
    focus?: () => void;
  } | null;
}

/**
 * 钩子函数参数接口
 */
interface UseMenuKeyboardInteractionProps {
  /** 菜单可见状态 */
  visible: boolean;
  /** 设置触发器可见状态的函数 */
  setTriggerVisible: (visible: boolean) => void;
  /** 触发器元素引用 */
  triggerRef: TriggerRef;
  /** 菜单元素引用 */
  menuRef: MenuRef;
  /** 可见状态变化回调 */
  onVisibleChange?: (visible: boolean) => void;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
}

/**
 * 处理菜单的键盘交互和焦点管理
 * 
 * 功能：
 * - ESC键关闭菜单并返回焦点到触发器
 * - TAB键在菜单内外切换焦点
 * - 支持自动聚焦到菜单
 * 
 * @param props - 钩子参数
 */
declare function useMenuKeyboardInteraction(props: UseMenuKeyboardInteractionProps): void;

export default useMenuKeyboardInteraction;

/**
 * 键盘码枚举（从 KeyCode 模块导入）
 */
declare enum KeyCodeEnum {
  /** ESC键码 */
  ESC = 27,
  /** TAB键码 */
  TAB = 9
}