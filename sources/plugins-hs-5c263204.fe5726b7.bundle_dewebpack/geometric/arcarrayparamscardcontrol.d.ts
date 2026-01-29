/**
 * 圆弧阵列参数卡片控制器
 * 用于管理圆弧阵列参数设置面板的创建、更新和销毁
 * @module ArcArrayParamsCardControl
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { ArcArrayParamsCard } from './ArcArrayParamsCard';

/**
 * 圆弧阵列参数数据接口
 */
export interface ArcArrayParamsData {
  /** 阵列数量 */
  count?: number;
  /** 圆弧半径 */
  radius?: number;
  /** 起始角度（度） */
  startAngle?: number;
  /** 结束角度（度） */
  endAngle?: number;
  /** 是否均匀分布 */
  uniform?: boolean;
  /** 其他参数 */
  [key: string]: unknown;
}

/**
 * 圆弧阵列参数卡片控制器
 * 提供静态方法来管理圆弧阵列参数设置UI组件的生命周期
 */
export declare class ArcArrayParamsCardControl {
  /**
   * 创建或渲染圆弧阵列参数设置面板
   * 如果容器不存在则自动创建，然后渲染React组件
   * @param data - 圆弧阵列参数数据
   */
  static create(data: ArcArrayParamsData): void;

  /**
   * 更新圆弧阵列参数设置面板
   * 内部调用create方法重新渲染组件
   * @param data - 更新后的圆弧阵列参数数据
   */
  static update(data: ArcArrayParamsData): void;

  /**
   * 销毁圆弧阵列参数设置面板
   * 卸载React组件并从DOM中移除容器元素
   */
  static destroy(): void;
}

/**
 * 容器元素ID常量
 * @internal
 */
export declare const ARC_ARRAY_PARAMS_CONTAINER_ID = 'arc-array-params-setting-container';

/**
 * UI根容器ID常量
 * @internal
 */
export declare const UI_CONTAINER_ID = 'ui-container';