import type { CSSProperties, ReactElement } from 'react';

/**
 * 文本编辑输入框的属性接口
 */
export interface EditableTextInputProps {
  /**
   * 组件类名前缀,用于生成BEM风格的CSS类名
   * @example 'editable-text'
   */
  prefixCls: string;

  /**
   * ARIA无障碍标签,用于屏幕阅读器
   * @example 'Edit text input'
   */
  'aria-label'?: string;

  /**
   * 自定义CSS类名,会与prefixCls生成的类名合并
   */
  className?: string;

  /**
   * 内联样式对象
   */
  style?: CSSProperties;

  /**
   * 文本方向,支持从左到右(ltr)或从右到左(rtl)
   * @default 'ltr'
   */
  direction?: 'ltr' | 'rtl';

  /**
   * 输入框最大字符长度限制
   * @example 100
   */
  maxLength?: number;

  /**
   * 是否启用自动调整输入框大小
   * @default true
   */
  autoSize?: boolean;

  /**
   * 当前输入框的值
   */
  value: string;

  /**
   * 保存回调函数,在用户按下Enter键或输入框失焦时触发
   * @param trimmedValue - 去除首尾空格后的文本值
   */
  onSave: (trimmedValue: string) => void;

  /**
   * 取消回调函数,在用户按下ESC键时触发
   */
  onCancel: () => void;
}

/**
 * 可编辑文本输入组件
 * 
 * 功能特性:
 * - 支持键盘交互:Enter保存,ESC取消
 * - 自动去除换行符(\n, \r)
 * - 自动聚焦并选中所有文本
 * - 支持输入法组合输入(Composition Events)
 * - 失焦时自动保存
 * - 支持自动调整高度
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *