/**
 * 房型按钮组件模块
 * @module HouseTypeButton
 */

import React from 'react';
import { SmartText } from './SmartText';
import { IconfontView } from './IconfontView';

/**
 * 房型按钮组件的属性接口
 */
export interface HouseTypeButtonProps {
  /** 组件唯一标识符 */
  id?: string;
  
  /** 图标字体类型/图片URL */
  iconfontType: string;
  
  /** 按钮显示文本 */
  text: string;
  
  /** 按钮点击事件处理函数 */
  btnClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 房型提示文本 */
  houseTypeTip?: string;
  
  /** 是否显示"新"标签 */
  showNew?: boolean;
  
  /** 自定义CSS类名 */
  className?: string;
  
  /** 是否显示红点提示 */
  showDot?: boolean;
}

/**
 * 房型按钮组件
 * 用于展示房型信息的可点击按钮，支持图标、文本、提示和标记显示
 * 
 * @param props - 组件属性
 * @returns React函数组件
 * 
 * @example
 *