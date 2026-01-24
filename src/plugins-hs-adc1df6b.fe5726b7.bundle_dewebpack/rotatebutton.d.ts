import React from 'react';
import { SmartText } from './SmartText';
import { Icons } from './Icons';

/**
 * 旋转按钮组件的属性数据接口
 */
export interface RotateButtonData {
  /**
   * 旋转值（角度）
   */
  rotateValue: number | string;
  
  /**
   * 按钮标签文本
   */
  label: string;
  
  /**
   * 图标类型
   * @default "hs_shuxingmianban_xuanzhuan90"
   */
  icon?: string;
  
  /**
   * 图标点击事件回调
   * @param event - 鼠标点击事件对象
   */
  onIconClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * 旋转按钮组件的属性接口
 */
export interface RotateButtonProps {
  /**
   * 组件数据配置
   */
  data: RotateButtonData;
}

/**
 * 旋转按钮组件
 * 
 * 用于显示旋转控制按钮，包含标签、旋转值显示和可点击的图标。
 * 常用于属性面板中控制元素的旋转操作。
 * 
 * @example
 *