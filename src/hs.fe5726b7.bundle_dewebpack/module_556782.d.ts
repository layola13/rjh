/**
 * 图片按钮组件模块
 * 支持异步加载图片和文本，可配置颜色、样式和禁用状态
 */

import React from 'react';

/**
 * 异步参数返回的图片数据
 */
interface AsyncImageResult {
  /** 图片源地址 */
  imgSrc: string;
}

/**
 * 异步参数返回的文本数据
 */
interface AsyncTextResult {
  /** 显示的文本内容 */
  text: string;
}

/**
 * 图片按钮组件的数据配置
 */
interface ImageButtonData {
  /** 图片源地址 */
  src?: string;
  /** 背景颜色（十进制数值） */
  color?: number | null;
  /** 底部标签文本 */
  label?: string;
  /** 提示文本（tooltip） */
  tooltip?: string;
  /** 自定义样式类名 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否禁用（别名） */
  disable?: boolean;
  /** 点击事件处理函数 */
  onclick: (event: React.MouseEvent) => void;
  /** 异步加载图片的Promise */
  asyncParam?: Promise<AsyncImageResult>;
  /** 异步加载文本的Promise */
  asyncTextParam?: Promise<AsyncTextResult>;
}

/**
 * 图片按钮组件的Props
 */
interface ImageButtonProps {
  /** 组件ID */
  id?: string;
  /** 组件数据配置 */
  data: ImageButtonData;
  /** 自定义图片样式 */
  imageCustom?: string;
}

/**
 * 图片按钮组件的State
 */
interface ImageButtonState {
  /** 组件数据配置 */
  data: ImageButtonData;
  /** 当前图片源地址 */
  src?: string;
  /** 组件ID */
  id?: string;
  /** 背景颜色（十进制数值） */
  color?: number | null;
  /** 显示的文本内容 */
  text: string;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义图片样式 */
  imageCustom?: string;
}

/**
 * 图片按钮组件的Refs
 */
interface ImageButtonRefs {
  /** 图片按钮元素引用 */
  imgbtn: HTMLElement;
}

/**
 * 图片按钮组件
 * 支持异步加载图片和文本，可自定义颜色、样式和交互行为
 */
declare class ImageButtonComponent extends React.Component<ImageButtonProps, ImageButtonState> {
  /** 组件引用 */
  refs: ImageButtonRefs;

  /**
   * 获取组件初始状态
   */
  getInitialState(): ImageButtonState;

  /**
   * 组件接收新Props时的生命周期（不安全的遗留API）
   * @param nextProps 新的Props
   */
  UNSAFE_componentWillReceiveProps(nextProps: ImageButtonProps): void;

  /**
   * 组件挂载后的生命周期
   * 处理异步参数并应用背景颜色
   */
  componentDidMount(): void;

  /**
   * 组件更新后的生命周期
   * 更新背景颜色
   */
  componentDidUpdate(): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

/**
 * 默认导出的图片按钮组件
 */
declare const ImageButton: typeof ImageButtonComponent;

export default ImageButton;