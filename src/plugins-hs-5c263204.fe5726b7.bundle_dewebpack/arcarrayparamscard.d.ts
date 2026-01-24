/**
 * ArcArrayParamsCard Component
 * 圆弧阵列参数卡片组件，用于显示和编辑圆弧阵列的角度和数量参数
 */

import * as React from 'react';
import { NumberInput, SmartText } from './ui-components';

/**
 * 位置信息接口
 */
export interface Position {
  /** 是否显示 */
  isShow: boolean;
  /** 宽度 */
  width: number;
  /** 左边距 */
  left: number;
  /** 顶部距离 */
  top?: number;
  /** 高度 */
  height?: number;
  /** 是否为模态 */
  isModal?: boolean;
}

/**
 * 位置更新参数接口
 */
export interface PositionUpdateParams {
  /** 左边距（像素） */
  left: number;
  /** 最大宽度（像素） */
  maxWidth: number;
}

/**
 * 阵列参数更新接口
 */
export interface ArrayParamUpdate {
  /** 角度值（度） */
  angle?: number;
  /** 阵列数量 */
  arrayNum?: number;
}

/**
 * ArcArrayParamsCard 组件属性接口
 */
export interface ArcArrayParamsCardProps {
  data: {
    /** 当前角度值 */
    angle: number;
    /** 当前阵列数量 */
    num: number;
    /** 是否显示输入卡片，默认为 true */
    isShow?: boolean;
    /** 提示文本 */
    tip: string;
    /** 位置信息（可选） */
    position?: Position;
    /** 参数更新回调函数 */
    updateParam?: (params: ArrayParamUpdate) => void;
    /** 预览回调函数 */
    onPreview?: () => void;
  };
}

/**
 * ArcArrayParamsCard 组件状态接口（内部使用）
 */
export interface ArcArrayParamsCardState {
  /** 角度输入框引用 */
  angleInputRef?: NumberInput;
  /** 数量输入框引用 */
  numberInputRef?: NumberInput;
  /** 是否选中角度输入框 */
  selectAngle: boolean;
  /** 位置信息 */
  position?: Position;
  /** 约束ID */
  constrainId?: string | number;
}

/**
 * 圆弧阵列参数卡片组件
 * 
 * @description
 * 用于在界面上显示和编辑圆弧阵列的参数，包括：
 * - 角度设置（0-360度）
 * - 阵列数量（2-20个）
 * - 支持键盘快捷键操作（Tab切换输入框，Alt+/- 调整数量）
 * - 自动定位管理，响应布局变化
 * 
 * @example
 *