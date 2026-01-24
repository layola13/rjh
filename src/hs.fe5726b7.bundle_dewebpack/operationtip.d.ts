/**
 * 操作提示组件模块
 * 用于在UI中显示临时的操作提示信息
 */

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 操作提示组件的属性接口
 */
interface OperationTipProps {
  /** 要显示的提示文本 */
  text: string;
}

/**
 * 操作提示类
 * 提供静态方法用于创建和销毁操作提示UI组件
 */
export declare class OperationTip {
  /**
   * 创建并显示操作提示
   * @param text - 要显示的提示文本内容
   * @description 在页面中渲染一个提示文本，如果容器不存在则自动创建
   */
  static create(text: string): void;

  /**
   * 销毁操作提示
   * @description 卸载React组件并从DOM中移除提示容器元素
   */
  static destroy(): void;
}

/**
 * 内部渲染的提示文本组件
 * @param props - 组件属性
 * @returns React元素
 * @internal
 */
declare const OperationTipComponent: React.FC<OperationTipProps>;

export { OperationTip };