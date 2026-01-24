/**
 * 认证弹窗类
 * 用于在页面中动态显示和隐藏认证弹窗组件
 * @module AuthPopup
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { AuthPopupComponent } from './AuthPopupComponent';

/**
 * 认证弹窗的属性接口
 */
export interface AuthPopupProps {
  /** 弹窗标题 */
  title?: string;
  /** 认证回调函数 */
  onAuth?: (result: unknown) => void;
  /** 关闭回调函数 */
  onClose?: () => void;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 认证弹窗类
 * 负责管理认证弹窗的渲染、显示和隐藏
 */
export declare class AuthPopup {
  /**
   * React组件的渲染容器DOM元素
   */
  private renderContainer?: HTMLDivElement;

  /**
   * 弹窗组件的属性
   */
  private props: AuthPopupProps;

  /**
   * 构造函数
   * @param props - 弹窗组件的属性配置
   */
  constructor(props: AuthPopupProps);

  /**
   * 显示认证弹窗
   * 如果容器不存在则创建，并渲染AuthPopupComponent组件
   */
  show(): void;

  /**
   * 隐藏认证弹窗
   * 卸载React组件并清理容器引用
   */
  hide(): void;

  /**
   * 创建弹窗容器DOM元素
   * 在#ui-container元素下创建#auth-popup-container容器
   * @returns 创建的容器元素，如果父容器不存在则返回undefined
   */
  private createContainer(): HTMLDivElement | undefined;
}