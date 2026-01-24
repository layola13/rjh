import React from 'react';

/**
 * 按钮组数据项接口
 */
export interface GroupButtonData {
  /** 按钮图标类型 */
  icon: string;
  /** 按钮文本 */
  text: string;
  /** 点击事件处理函数 */
  onClick: () => void;
}

/**
 * 浮动切换按钮组件的属性接口
 */
export interface FloatToggleButtonProps {
  /** 组件数据配置 */
  data: {
    /** 自定义CSS类名 */
    className?: string;
    /** 按钮组数据数组 */
    groupData: GroupButtonData[];
    /** 主图标显示类型 */
    icon: string;
  };
}

/**
 * 浮动切换按钮组件的状态接口
 */
export interface FloatToggleButtonState {
  /** 左侧按钮悬停状态 */
  hoverLeft: boolean;
  /** 右侧按钮悬停状态 */
  hoverRight: boolean;
}

/**
 * 浮动切换按钮组件
 * 支持显示一个主图标和最多两个分组按钮的浮动UI组件
 */
export default class FloatToggleButton extends React.Component<
  FloatToggleButtonProps,
  FloatToggleButtonState
> {
  constructor(props: FloatToggleButtonProps);

  /**
   * 鼠标进入分组按钮时的处理函数
   * @param event - 鼠标事件对象
   * @param buttonIndex - 按钮索引（0=左侧，1=右侧）
   */
  private _onMouseEnterGroupButton(
    event: React.MouseEvent,
    buttonIndex: number
  ): void;

  /**
   * 鼠标离开分组按钮时的处理函数
   * @param event - 鼠标事件对象
   * @param buttonIndex - 按钮索引（0=左侧，1=右侧）
   */
  private _onMouseLeaveGroupButton(
    event: React.MouseEvent,
    buttonIndex: number
  ): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}