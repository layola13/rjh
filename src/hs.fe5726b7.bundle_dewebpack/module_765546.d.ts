/**
 * React组件：链接按钮
 * 支持禁用状态和自定义点击事件
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 链接按钮数据配置接口
 */
interface LinkButtonData {
  /** 按钮文本 */
  text?: string;
  /** 按钮唯一标识 */
  id?: string;
  /** 自定义CSS类名 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击事件处理函数 */
  onclick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * 链接按钮组件属性接口
 */
interface LinkButtonProps {
  /** 按钮配置数据 */
  data?: LinkButtonData;
}

/**
 * 链接按钮组件状态接口
 */
interface LinkButtonState {}

/**
 * 链接按钮组件
 * 渲染一个可交互的span元素，支持禁用状态和点击事件
 */
declare class LinkButton extends React.Component<LinkButtonProps, LinkButtonState> {
  /**
   * PropTypes类型验证
   */
  static propTypes: {
    data: PropTypes.Requireable<object>;
  };

  /**
   * 默认属性值
   */
  static defaultProps: {
    data: {};
  };

  /**
   * 组件构造函数
   * @param props - 组件属性
   */
  constructor(props: LinkButtonProps);

  /**
   * 组件状态
   */
  state: LinkButtonState;

  /**
   * 处理按钮点击事件
   * @param event - 鼠标点击事件对象
   * @param data - 按钮配置数据
   */
  onItemClick(event: React.MouseEvent<HTMLSpanElement>, data: LinkButtonData): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

export default LinkButton;