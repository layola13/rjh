/**
 * 收藏输入组件类型定义
 * @module FavInput
 */

import { CSSProperties, FocusEvent, KeyboardEvent, ChangeEvent } from 'react';

/**
 * 收藏分组接口
 */
export interface FavoriteGroup {
  /** 分组ID */
  id: string;
  /** 分组名称 */
  name: string;
  /** 其他分组属性 */
  [key: string]: unknown;
}

/**
 * FavInput 组件属性接口
 */
export interface FavInputProps {
  /** 自定义样式类名 */
  className?: string;
  
  /** 输入框类型（用于区分不同场景的样式） */
  type?: string;
  
  /** 现有收藏分组列表，用于重复性校验 */
  favoriteGroups?: FavoriteGroup[];
  
  /** 提交回调函数 */
  onSubmit: (value: string) => void;
  
  /** 输入框占位符文本 */
  placeholder?: string;
  
  /** 失焦回调函数 */
  onBlur?: (event?: FocusEvent<HTMLInputElement>) => void;
  
  /** 是否自动聚焦 */
  primaryFocus?: boolean;
  
  /** 最大输入长度 */
  maxLength?: number;
  
  /** 输入框初始值 */
  value?: string;
  
  /** 自定义校验函数 */
  checkValid?: (value: string) => boolean | undefined;
  
  /** 获取当前值的回调 */
  getValue?: (value: string) => void;
  
  /** 初始校验状态 */
  initialValid?: boolean;
  
  /** 错误提示文本 */
  errorTips?: string;
}

/**
 * 收藏输入组件
 * 
 * @description 用于收藏夹分组名称输入，支持实时校验、重复检测等功能
 * 
 * @example
 *