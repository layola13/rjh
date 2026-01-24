import React from 'react';
import PropTypes from 'prop-types';

/**
 * 气泡提示组件的属性接口
 */
interface BubbleTipsProps {
  /** 自定义样式对象 */
  styles?: React.CSSProperties;
  /** 提示文本内容 */
  text?: string;
  /** 点击"知道了"按钮的回调函数 */
  onGotIt: () => void;
  /** 是否显示反馈链接 */
  showLink?: boolean;
  /** 箭头方向：'left' | 'right' | 'top' | 'bottom' */
  arrowDirection?: string;
  /** 是否显示蓝色线条 */
  isShowBlue?: boolean;
  /** 反馈链接的URL */
  linkUrl?: string;
  /** 自定义CSS类名 */
  className?: string;
  /** 子元素内容 */
  children?: React.ReactNode;
}

/**
 * 气泡提示组件的状态接口
 */
interface BubbleTipsState {
  /** 组件是否可见 */
  visible: boolean;
}

/**
 * 气泡提示组件
 * 用于显示带箭头的提示气泡，支持自定义方向、样式和反馈链接
 */
declare class BubbleTips extends React.Component<BubbleTipsProps, BubbleTipsState> {
  /**
   * PropTypes类型验证
   */
  static propTypes: {
    styles: PropTypes.Requireable<object>;
    text: PropTypes.Requireable<string>;
    onGotIt: PropTypes.Validator<(...args: any[]) => any>;
    showLink: PropTypes.Requireable<boolean>;
  };

  /**
   * 默认属性值
   */
  static defaultProps: {
    styles: {};
    arrowDirection: string;
    isShowBlue: boolean;
  };

  /**
   * 组件状态
   */
  state: BubbleTipsState;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: BubbleTipsProps);

  /**
   * 点击"知道了"按钮的事件处理函数
   * @param event - 鼠标点击事件对象
   */
  onClickGotIt(event: React.MouseEvent<HTMLSpanElement>): void;

  /**
   * 显示气泡提示
   */
  show(): void;

  /**
   * 隐藏气泡提示
   */
  hide(): void;

  /**
   * 渲染组件
   * @returns React元素或null
   */
  render(): React.ReactElement | null;
}

export default BubbleTips;