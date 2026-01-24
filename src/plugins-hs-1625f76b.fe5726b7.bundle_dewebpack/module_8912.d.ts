/**
 * 报告面板组件 - 用于收集和提交用户反馈/问题报告
 * @module ReportPanel
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 反馈对象接口
 */
export interface FeedbackObject {
  [key: string]: unknown;
}

/**
 * 客户端信息接口
 */
export interface ClientInfo {
  [key: string]: unknown;
}

/**
 * 反馈数据接口
 */
export interface FeedbackData {
  /** 反馈对象 */
  feedbackObject: FeedbackObject;
  /** 反馈类型 */
  feedbackType: 'BUG' | 'FEATURE' | 'OTHER';
  /** 反馈模块 */
  feedbackModule: string;
  /** 来源 */
  source: string;
  /** 问题列表 */
  problemList: string[];
  /** 客户端信息 */
  clientInfo: ClientInfo;
  /** 图片URL列表 */
  imageUrls: string[];
  /** 问题描述（可选） */
  problemDescription?: string;
}

/**
 * 图片上传组件状态接口
 */
export interface PictureComponentState {
  pictureUrl: string;
}

/**
 * 图片上传组件引用接口
 */
export interface PictureComponentRef {
  state: PictureComponentState;
}

/**
 * 页脚组件引用接口
 */
export interface FooterComponentRef {
  setState(state: { disabled: 'disabled' | '' }): void;
}

/**
 * 报告面板组件属性接口
 */
export interface ReportPanelProps {
  /** 查找ID，用于标识报告对象 */
  seekId?: string;
  /** 是否为2D模式 */
  is2d?: boolean;
  /** 反馈对象 */
  feedbackObject?: FeedbackObject;
  /** 问题列表 */
  problemList?: string[];
}

/**
 * 报告面板组件状态接口
 */
export interface ReportPanelState {
  // 当前组件使用类成员变量而非state管理状态
}

/**
 * 3D模式下"其他原因"的问题标识符
 */
declare const REPORT_3D_REASON_OTHERS: 'report-3d-reason-others';

/**
 * 2D模式下"其他原因"的问题标识符
 */
declare const REPORT_2D_REASON_OTHERS: 'report-2d-reason-others';

/**
 * 报告面板组件
 * 提供用户反馈和问题报告功能，支持2D/3D模式切换
 * 
 * @class ReportPanel
 * @extends {React.Component<ReportPanelProps, ReportPanelState>}
 */
export default class ReportPanel extends React.Component<ReportPanelProps, ReportPanelState> {
  /**
   * 属性类型定义
   */
  static propTypes: {
    seekId: PropTypes.Requireable<string>;
    is2d: PropTypes.Requireable<boolean>;
  };

  /**
   * 默认属性值
   */
  static defaultProps: {
    seekId: string;
    is2d: boolean;
  };

  /**
   * 已选择的问题列表
   */
  problemList: string[];

  /**
   * 文本原因描述
   */
  textReason: string;

  /**
   * 图片URL
   */
  pictureUrl: string;

  /**
   * 图片上传组件引用
   */
  picture: PictureComponentRef;

  /**
   * 页脚组件引用
   */
  footer: FooterComponentRef;

  /**
   * 构造函数
   * @param {ReportPanelProps} props - 组件属性
   */
  constructor(props: ReportPanelProps);

  /**
   * 上传反馈数据到服务器
   * 收集客户端信息、问题列表和图片，提交反馈报告
   * 
   * @returns {void}
   */
  uploadData(): void;

  /**
   * 关闭报告面板
   * 卸载React组件并隐藏面板容器
   * 
   * @returns {void}
   */
  closePanel(): void;

  /**
   * 处理复选框状态变化
   * 
   * @param {boolean} checked - 是否选中
   * @param {number} index - 问题在列表中的索引
   * @returns {void}
   */
  onChangeChecked(checked: boolean, index: number): void;

  /**
   * 处理文本原因输入变化
   * 
   * @param {string} text - 输入的文本内容
   * @returns {void}
   */
  onChangeTextReason(text: string): void;

  /**
   * 更新提交按钮的启用/禁用状态
   * 根据问题列表和文本原因的有效性决定是否启用提交按钮
   * 
   * @returns {void}
   */
  updateSubmitButton(): void;

  /**
   * 渲染组件
   * 
   * @returns {React.ReactElement} React元素
   */
  render(): React.ReactElement;
}