import React from 'react';
import PropTypes from 'prop-types';

/**
 * 设计风格类型枚举
 */
type DesignStyle = 
  | 'ASAN'          // 东南亚
  | 'Nordic'        // 北欧
  | 'Japan'         // 日式
  | 'european'      // 欧式
  | 'mediterranean' // 地中海
  | 'chinese'       // 新中式
  | 'modern'        // 现代
  | 'neoclassical'  // 新古典
  | 'US'            // 美式
  | 'Korea';        // 韩式

/**
 * 组件属性接口
 */
interface DesignStyleDialogProps {
  data: {
    /** 取消按钮点击回调 */
    cancelClick: () => void;
    /** 确认按钮点击回调，传入选中的风格 */
    confirmClick: (style: DesignStyle) => void;
  };
}

/**
 * 组件状态接口
 */
interface DesignStyleDialogState {
  /** 对话框是否关闭 */
  close: boolean;
  /** 当前选中的设计风格 */
  activeStyle?: DesignStyle;
}

/**
 * 设计风格选择对话框组件
 * 用于让用户选择室内设计风格
 */
declare class DesignStyleDialog extends React.Component<DesignStyleDialogProps, DesignStyleDialogState> {
  /**
   * PropTypes 类型验证
   */
  static propTypes: {
    data: PropTypes.Validator<object>;
  };

  /**
   * 取消点击回调函数引用
   */
  private cancelClickCallback: () => void;

  /**
   * 确认点击回调函数引用
   */
  private confirmClickCallback: (style: DesignStyle) => void;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: DesignStyleDialogProps);

  /**
   * 组件接收新属性时的生命周期钩子（已废弃）
   * @param nextProps - 新的属性
   * @deprecated 使用 componentDidUpdate 或 getDerivedStateFromProps 替代
   */
  UNSAFE_componentWillReceiveProps(nextProps: DesignStyleDialogProps): void;

  /**
   * 处理设计风格项点击事件
   * @param style - 被点击的设计风格
   */
  onItemClick(style: DesignStyle): void;

  /**
   * 隐藏对话框
   */
  onHide(): void;

  /**
   * 取消按钮点击处理
   */
  cancelClick(): void;

  /**
   * 确认按钮点击处理
   * 仅当选中风格后才会触发确认回调
   */
  confirmClick(): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

export default DesignStyleDialog;