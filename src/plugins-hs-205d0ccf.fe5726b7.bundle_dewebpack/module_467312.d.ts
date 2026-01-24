/**
 * 3D性能等级选择器组件的类型定义
 * 提供三档渲染性能选择功能
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 性能状态数据
 */
export interface PerformanceData {
  /** 性能状态: 'low' | 'medium' | 'high' */
  status: 'low' | 'medium' | 'high';
  /** 是否为启动阶段 */
  startup?: boolean;
}

/**
 * 性能变化事件参数
 */
export interface PerformanceChangedEvent {
  data: PerformanceData;
}

/**
 * 性能变化信号接口
 */
export interface Signal3dPerformance {
  /**
   * 监听性能变化事件
   * @param callback 回调函数
   * @param context 上下文对象
   */
  listen(callback: (event: PerformanceChangedEvent) => void, context: unknown): void;
}

/**
 * 组件Props数据对象
 */
export interface Performance3dData {
  /** 当前选中的性能等级 (1=低, 2=中, 3=高) */
  level: number;
  /** 性能变化信号 */
  signal3dPerformanceChanged?: Signal3dPerformance;
  /** 等级选择回调函数 */
  onLevelSelected?: (level: number) => void;
  /** 会话期内不再显示启动提示的回调 */
  onSessionlyNomoreShowStartupHint?: () => void;
}

/**
 * 组件Props接口
 */
export interface Performance3dProps {
  /** 初始性能等级 (1-3) */
  level?: number;
  /** 等级选择回调 */
  onLevelSelected?: (level: number) => void;
  /** 组件数据配置 */
  data?: Performance3dData;
}

/**
 * 组件State接口
 */
export interface Performance3dState {
  /** 当前选中的性能等级 */
  selectedLevel: number;
  /** 当前悬停的性能等级 */
  hoveredLevel?: number;
  /** 是否显示工具提示 */
  showTooltip?: boolean;
}

/**
 * CSS Transform样式对象
 */
export interface TransformStyle {
  transform: string;
}

/**
 * SVG填充样式对象
 */
export interface FillStyle {
  fill: string;
}

/**
 * 3D性能等级选择器组件
 * 提供三档渲染性能的可视化选择界面
 */
export default class Performance3dSelector extends React.Component<Performance3dProps, Performance3dState> {
  /**
   * PropTypes类型验证
   */
  static propTypes: {
    level: PropTypes.Requireable<number>;
    onLevelSelected: PropTypes.Requireable<(...args: any[]) => any>;
    data: PropTypes.Requireable<object>;
  };

  /**
   * 默认Props
   */
  static defaultProps: {
    level: number;
    onLevelSelected: () => void;
    data: Record<string, never>;
  };

  /**
   * 组件状态
   */
  state: Performance3dState;

  /**
   * 启动阶段的工具提示标记
   */
  tooltipForStartup?: boolean;

  /**
   * 构造函数
   * @param props 组件属性
   */
  constructor(props: Performance3dProps);

  /**
   * 获取箭头指针的旋转角度
   * @param level 性能等级 (1-3)
   * @returns 旋转角度（度数）
   */
  private _getArrowDegree(level: number): number;

  /**
   * 根据角度生成CSS transform样式
   * @param degree 旋转角度
   * @returns Transform样式对象
   */
  private _getArrowTransformStyle(degree: number): TransformStyle;

  /**
   * 获取指定等级的箭头样式
   * @param level 性能等级
   * @returns 箭头样式对象
   */
  private _getArrowStyle(level: number): TransformStyle;

  /**
   * 获取三个等级区域的填充样式
   * @param selectedLevel 当前选中的等级
   * @param hoveredLevel 当前悬停的等级
   * @returns 三个等级的样式数组
   */
  private _getLevelStyles(selectedLevel: number, hoveredLevel?: number): [FillStyle, FillStyle, FillStyle];

  /**
   * 性能变化事件处理器
   * @param event 性能变化事件
   */
  private _onPerformanceChanged(event: PerformanceChangedEvent): void;

  /**
   * 等级点击事件处理器
   * @param level 点击的等级 (1-3)
   */
  private _onLevelClicked(level: number): void;

  /**
   * 等级悬停事件处理器
   * @param level 悬停的等级，undefined表示离开悬停
   */
  private _onLevelHovered(level?: number): void;

  /**
   * 渲染等级工具提示信息
   * @returns React元素
   */
  private _renderLevelTooltipInfo(): React.ReactElement;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}