/**
 * React组件：提示视图组件
 * 用于显示带图标的提示信息，通常用于空状态或无结果场景
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 提示视图组件的属性接口
 */
export interface HintViewProps {
  /**
   * 提示文本内容，可以是字符串、React节点或元素
   */
  hint?: string | React.ReactNode | React.ReactElement;
  
  /**
   * 图标路径或标识符（必需）
   * 支持SVG文件路径或普通图片URL
   */
  icon: string;
  
  /**
   * 附加的CSS类名
   * @default ""
   */
  className?: string;
  
  /**
   * 是否显示提示视图
   * @default false
   */
  show?: boolean;
}

/**
 * 组件内部状态接口
 */
interface HintViewState {
  /**
   * 内部状态值（当前未使用）
   */
  value: string;
}

/**
 * 提示视图组件类
 * 使用React.createClass模式创建的传统组件
 */
declare class HintView extends React.Component<HintViewProps, HintViewState> {
  /**
   * 属性类型验证
   */
  static propTypes: {
    hint: PropTypes.Requireable<string | React.ReactNode | React.ReactElement>;
    icon: PropTypes.Validator<string>;
    className: PropTypes.Requireable<string>;
    show: PropTypes.Requireable<boolean>;
  };

  /**
   * 获取默认属性值
   * @returns 默认属性对象
   */
  static getDefaultProps(): Required<Omit<HintViewProps, 'icon'>> & Pick<HintViewProps, 'icon'>;

  /**
   * 获取初始状态
   * @returns 初始状态对象
   */
  getInitialState(): HintViewState;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

/**
 * 导出提示视图组件
 * @default HintView
 */
export default HintView;