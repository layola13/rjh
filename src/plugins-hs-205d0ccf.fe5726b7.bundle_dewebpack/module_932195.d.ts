/**
 * 下拉选择组件的类型定义
 * @module PureTextDropdown
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 下拉选项接口
 */
export interface DropdownOption {
  /** 选项唯一标识 */
  id: string;
  /** 选项显示文本 */
  label: string;
}

/**
 * 组件数据属性接口
 */
export interface DropdownData {
  /** 下拉选项列表 */
  options: DropdownOption[];
  /** 默认选中的选项ID */
  defaultKey: string;
  /** 提示文本 */
  tooltip?: string;
  /** 选项变化回调函数 */
  onchange?: (selectedId: string) => void;
}

/**
 * 组件Props接口
 */
export interface PureTextDropdownProps {
  /** 下拉组件配置数据 */
  data: DropdownData;
}

/**
 * 组件State接口
 */
export interface PureTextDropdownState {
  /** 当前鼠标悬停的选项ID */
  hoverItemId: string;
  /** 当前选中的选项ID */
  selectItemId: string;
  /** 当前选中的选项文本 */
  selectItemLabel: string;
  /** 是否隐藏下拉列表 */
  hideList: boolean;
}

/**
 * 纯文本下拉选择组件
 * @class PureTextDropdown
 * @extends {React.Component<PureTextDropdownProps, PureTextDropdownState>}
 */
export default class PureTextDropdown extends React.Component<
  PureTextDropdownProps,
  PureTextDropdownState
> {
  /** PropTypes类型验证 */
  static propTypes: {
    data: PropTypes.Requireable<object>;
  };

  /** 默认Props */
  static defaultProps: {
    data: {
      option: Array<{ id: string; label: string }>;
      defaultKey: string;
      tooltip: string;
      onChange: () => void;
    };
  };

  /** 延迟隐藏列表的定时器ID */
  private timer: ReturnType<typeof setTimeout> | undefined;

  /**
   * 构造函数
   * @param {PureTextDropdownProps} props - 组件属性
   */
  constructor(props: PureTextDropdownProps);

  /**
   * 点击列表项处理函数
   * @param {string} itemId - 选项ID
   * @param {string} itemLabel - 选项文本
   */
  onClickListItem(itemId: string, itemLabel: string): void;

  /**
   * 鼠标进入列表项处理函数
   * @param {string} itemId - 选项ID
   */
  onEnterListItem(itemId: string): void;

  /**
   * 隐藏下拉列表
   * 延迟100ms执行，允许用户移动到列表区域
   */
  onHidePopup(): void;

  /**
   * 显示下拉列表
   * 清除隐藏定时器，并将悬停项设置为当前选中项
   */
  onShowPopup(): void;

  /**
   * 清除隐藏下拉列表的定时器
   */
  clearPopupTimeout(): void;

  /**
   * 渲染组件
   * @returns {React.ReactElement} React元素
   */
  render(): React.ReactElement;
}