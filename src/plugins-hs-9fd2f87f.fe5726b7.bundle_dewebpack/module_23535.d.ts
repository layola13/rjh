/**
 * CAD文件导入弹窗模块
 * @module CadImportDialog
 */

import type { ReactElement } from 'react';

/**
 * CAD导入回调函数类型
 * @callback CadImportCallback
 * @param result - 导入操作的结果数据
 */
export type CadImportCallback = (result?: unknown) => void;

/**
 * CAD导入对话框组件的属性接口
 */
export interface CadImportDialogProps {
  /**
   * 导入完成后的回调函数
   */
  callback: CadImportCallback;
}

/**
 * CAD导入对话框组件的状态接口
 */
export interface CadImportDialogState {
  /**
   * 当前激活的回调函数
   */
  callback: CadImportCallback;
}

/**
 * CAD导入对话框组件实例接口
 */
export interface CadImportDialogInstance {
  /**
   * 获取组件引用
   */
  refs: {
    /**
     * 根弹窗组件引用
     */
    root: {
      /**
       * 处理取消按钮点击事件
       */
      handleCancelClick: () => void;
    };
  };
  
  /**
   * 组件属性
   */
  props: CadImportDialogProps;
  
  /**
   * 组件状态
   */
  state: CadImportDialogState;
  
  /**
   * 关闭对话框
   */
  close: () => void;
  
  /**
   * 渲染组件
   */
  render: () => ReactElement;
}

/**
 * 显示CAD导入对话框
 * @param callback - 导入完成后的回调函数
 */
export function show(callback: CadImportCallback): void;

/**
 * 销毁并卸载CAD导入对话框
 */
export function destroy(): void;