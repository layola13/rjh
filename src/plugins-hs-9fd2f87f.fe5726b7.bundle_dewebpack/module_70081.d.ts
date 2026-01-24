import React from 'react';

/**
 * 导出SVG对话框的属性接口
 */
export interface ExportSvgDialogProps {
  /**
   * 当用户点击"导出"按钮时触发的回调函数
   * @param includeFurniture - true表示导出图纸带家具，false表示不带家具
   */
  onSelected: (includeFurniture: boolean) => void;
  
  /**
   * 关闭对话框的回调函数
   */
  close: () => void;
}

/**
 * 导出SVG对话框的状态接口
 */
export interface ExportSvgDialogState {
  /**
   * 当前选中的选项索引
   * 0 - 图纸带家具
   * 1 - 图纸不带家具
   */
  index: 0 | 1;
  
  /**
   * 对话框是否隐藏
   */
  hide: boolean;
}

/**
 * 导出SVG对话框组件
 * 允许用户选择导出带家具或不带家具的图纸
 */
export default class ExportSvgDialog extends React.Component<ExportSvgDialogProps, ExportSvgDialogState> {
  constructor(props: ExportSvgDialogProps);
  
  /**
   * 当前选中的选项索引
   */
  state: ExportSvgDialogState;
  
  /**
   * 处理用户点击"导出"按钮的事件
   * 根据当前选中的索引调用onSelected回调，并关闭对话框
   */
  onSelected(): void;
  
  /**
   * 处理用户点击"取消"按钮的事件
   * 关闭对话框而不执行导出操作
   */
  onConcaled(): void;
  
  /**
   * 处理用户选择不同选项的事件
   * @param index - 选中的选项索引（0或1）
   */
  onItemSelect(index: 0 | 1): void;
  
  /**
   * 渲染对话框UI
   */
  render(): React.ReactElement;
}