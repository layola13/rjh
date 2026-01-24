/**
 * 教学能力按钮组件模块
 * 提供教学功能入口的UI组件及其配置选项
 */

import * as React from 'react';
import { Tooltip, Icons } from './Tooltip'; // 假设从某个UI库导入

/**
 * 教学能力按钮组件的属性接口
 */
export interface TeachingAbilityButtonProps {
  /**
   * 按钮点击事件处理函数
   */
  onClick?: () => void;
  
  /**
   * 主题样式
   * @default "teaching-light"
   */
  theme?: string;
  
  /**
   * 自定义CSS类名
   */
  className?: string;
  
  /**
   * 是否默认显示提示
   * @default true
   */
  defaultShowTip?: boolean;
  
  /**
   * 关闭模态框的回调函数
   */
  closeModel?: () => void;
}

/**
 * 教学能力按钮组件
 * 用于在界面中展示教学功能的入口按钮
 * 
 * @param props - 组件属性
 * @param ref - React引用对象
 * @returns React元素
 */
export const TeachingAbilityButton: React.ForwardRefExoticComponent<
  TeachingAbilityButtonProps & React.RefAttributes<HTMLDivElement>
>;

/**
 * 教学能力按钮配置选项构造函数的参数接口
 */
export interface TeachingAbilityButtonOptionsParams {
  /**
   * 显示模态框的回调函数
   */
  showModel?: () => void;
  
  /**
   * 关闭模态框的回调函数
   */
  closeModel?: () => void;
  
  /**
   * 主题样式
   * @default "teaching-light"
   */
  theme?: string;
}

/**
 * 教学能力按钮的配置选项类
 * 用于配置和管理教学能力按钮的行为和样式
 */
export class TeachingAbilityButtonOptions {
  /**
   * 显示模态框的回调函数
   */
  showModel?: () => void;
  
  /**
   * 关闭模态框的回调函数
   */
  closeModel?: () => void;
  
  /**
   * 渲染顺序
   * @default 10
   */
  order?: number;
  
  /**
   * 主题样式
   * @default "teaching-light"
   */
  theme?: string;
  
  /**
   * 构造函数
   * @param params - 配置参数
   */
  constructor(params: TeachingAbilityButtonOptionsParams);
  
  /**
   * 获取渲染项
   * 返回一个配置好的TeachingAbilityButton React元素
   * 
   * @returns React元素
   */
  getRenderItem(): React.ReactElement<TeachingAbilityButtonProps>;
}