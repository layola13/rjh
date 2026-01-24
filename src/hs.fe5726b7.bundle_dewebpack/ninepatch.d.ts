/**
 * NinePatch组件模块
 * 提供九宫格选择器UI组件，常用于对齐、定位等场景
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * 九宫格数据配置接口
 */
export interface NinePatchData {
  /** 当前选中的索引 (0-8) */
  index: number;
  /** 提示文本 */
  tooltip?: string;
  /** 选择变化时的回调函数 */
  onSelectionChanged?: (index: number) => void;
}

/**
 * NinePatch组件属性接口
 */
export interface NinePatchProps {
  /** 当前选中的索引 (0-8，从左到右、从上到下) */
  index: number;
  /** 提示文本 */
  tooltip?: string;
  /** 选择变化回调 */
  onSelectionChanged?: (index: number) => void;
}

/**
 * 渲染九宫格的一行（3个格子）
 * @param rowIndex - 行索引 (0-2)
 * @param selectedIndex - 当前选中的全局索引
 * @param _reserved - 保留参数（未使用）
 * @param onSelect - 点击回调函数
 * @returns React元素数组
 */
declare function renderNinePatchRow(
  rowIndex: number,
  selectedIndex: number,
  _reserved: number,
  onSelect: (index: number) => void
): React.ReactElement[];

/**
 * 九宫格选择器组件
 * 渲染一个3x3的网格，用户可以点击选择其中一个位置
 */
export declare const NinePatch: React.FC<NinePatchProps> & {
  propTypes: {
    index: PropTypes.Validator<number>;
    tooltip: PropTypes.Requireable<string>;
    onSelectionChanged: PropTypes.Requireable<(...args: any[]) => any>;
  };
  defaultProps: {
    tooltip: string;
    onSelectionChanged: () => void;
  };
};

/**
 * NinePatch小部件类
 * 提供命令式API来管理NinePatch组件的生命周期
 */
export declare class NinePatchWidget {
  /** 容器DOM元素 */
  private _containerElement: HTMLElement;
  
  /** 组件数据 */
  private _data: NinePatchData;

  /**
   * 构造函数
   * @param data - 初始化数据
   * @param container - 挂载容器元素
   */
  constructor(data: NinePatchData, container: HTMLElement);

  /**
   * 更新组件数据并重新渲染
   * @param data - 部分数据更新
   */
  update(data: Partial<NinePatchData>): void;

  /**
   * 销毁组件，卸载React节点
   */
  destroy(): void;

  /**
   * @deprecated 已废弃，请使用 destroy 方法
   */
  destory(): void;

  /**
   * 渲染组件到容器
   * @param data - 渲染数据
   * @param container - 目标容器
   * @private
   */
  private _render(data: NinePatchData, container: HTMLElement): void;

  /**
   * 静态工厂方法：创建NinePatchWidget实例
   * @param data - 初始化数据
   * @param container - 挂载容器元素
   * @returns NinePatchWidget实例
   */
  static create(data: NinePatchData, container: HTMLElement): NinePatchWidget;
}