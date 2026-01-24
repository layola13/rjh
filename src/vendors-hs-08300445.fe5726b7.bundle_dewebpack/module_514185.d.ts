/**
 * Selector组件的TypeScript类型定义
 * 用于Select组件的选择器部分，支持单选和多选模式
 */

import { RefObject, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 选择器模式类型
 */
export type SelectorMode = 'combobox' | 'tags' | 'multiple' | 'single';

/**
 * 键盘按键码接口
 */
export interface KeyCode {
  /** 上箭头键 */
  UP: number;
  /** 下箭头键 */
  DOWN: number;
  /** 回车键 */
  ENTER: number;
  /** Shift键 */
  SHIFT: number;
  /** Tab键 */
  TAB: number;
  /** 退格键 */
  BACKSPACE: number;
  /** ESC键 */
  ESC: number;
}

/**
 * Selector组件的Props接口
 */
export interface SelectorProps {
  /** 样式类名前缀 */
  prefixCls: string;
  
  /** 是否为多选模式 */
  multiple: boolean;
  
  /** 下拉菜单是否展开 */
  open: boolean;
  
  /** 选择器模式 */
  mode: SelectorMode;
  
  /** 是否显示搜索功能 */
  showSearch: boolean;
  
  /** 是否支持回车键分词 */
  tokenWithEnter?: boolean;
  
  /**
   * 搜索回调函数
   * @param searchValue - 搜索关键词
   * @param fromTyping - 是否来自用户输入
   * @param isComposing - 是否处于IME输入法组合状态
   * @returns 返回false可阻止默认行为
   */
  onSearch: (searchValue: string, fromTyping: boolean, isComposing: boolean) => boolean | void;
  
  /**
   * 搜索提交回调（tags模式下按回车触发）
   * @param value - 提交的值
   */
  onSearchSubmit?: (value: string) => void;
  
  /**
   * 切换下拉菜单展开状态的回调
   * @param open - 新的展开状态，如果未传参则切换当前状态
   */
  onToggleOpen: (open?: boolean) => void;
  
  /**
   * 输入框键盘按下事件回调
   * @param event - 键盘事件对象
   */
  onInputKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  
  /** DOM引用，指向外层容器 */
  domRef?: RefObject<HTMLDivElement>;
}

/**
 * Selector组件暴露的实例方法
 */
export interface SelectorRef {
  /**
   * 使输入框获得焦点
   */
  focus: () => void;
  
  /**
   * 使输入框失去焦点
   */
  blur: () => void;
}

/**
 * 单选输入框组件的Props（继承部分基础Props）
 */
export interface SingleSelectorProps extends Omit<SelectorProps, 'multiple'> {
  // 单选特有的属性可在此扩展
}

/**
 * 多选输入框组件的Props（继承部分基础Props）
 */
export interface MultipleSelectorProps extends Omit<SelectorProps, 'multiple'> {
  // 多选特有的属性可在此扩展
}

/**
 * 内部共享的输入事件处理器接口
 */
export interface InputEventHandlers {
  /** 输入框引用 */
  inputRef: RefObject<HTMLInputElement>;
  
  /**
   * 键盘按下事件处理器
   */
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  
  /**
   * 鼠标按下事件处理器
   */
  onInputMouseDown: () => void;
  
  /**
   * 输入变化事件处理器
   */
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * 粘贴事件处理器
   */
  onInputPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  
  /**
   * IME输入法组合开始事件处理器
   */
  onInputCompositionStart: () => void;
  
  /**
   * IME输入法组合结束事件处理器
   */
  onInputCompositionEnd: (event: React.CompositionEvent<HTMLInputElement>) => void;
}

/**
 * Selector选择器组件
 * 根据multiple属性自动渲染单选或多选输入框
 * 
 * @example
 *