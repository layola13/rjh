/**
 * VSparkline 组件类型定义
 * 用于渲染迷你图表（趋势线或柱状图）
 */

import Vue, { VNode, PropType } from 'vue';
import { Colorable } from '../../mixins/colorable';

/** 渐变方向 */
export type GradientDirection = 'top' | 'bottom' | 'left' | 'right';

/** 图表类型 */
export type SparklineType = 'trend' | 'bar';

/** 数据点值类型 */
export type SparklineValue = number | { value: number; [key: string]: any };

/** 边界坐标 */
export interface Boundary {
  /** 最小 X 坐标 */
  minX: number;
  /** 最大 X 坐标 */
  maxX: number;
  /** 最小 Y 坐标 */
  minY: number;
  /** 最大 Y 坐标 */
  maxY: number;
}

/** 解析后的标签 */
export interface ParsedLabel {
  /** X 坐标 */
  x: number;
  /** 标签文本值 */
  value: string;
}

/** 数据点坐标 */
export interface DataPoint {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 高度（柱状图使用） */
  height?: number;
  /** 原始值 */
  value?: number;
}

/** 标签作用域插槽参数 */
export interface LabelSlotProps {
  /** 数据点索引 */
  index: number;
  /** 标签值 */
  value: string;
}

/**
 * VSparkline 组件
 * 提供轻量级的数据可视化功能，支持趋势线和柱状图两种模式
 */
export default interface VSparkline extends Vue, Colorable {
  /** 组件名称 */
  readonly name: 'VSparkline';

  // Props
  /** 是否启用自动绘制动画 */
  autoDraw: boolean;
  
  /** 自动绘制动画持续时间（毫秒） */
  autoDrawDuration: number;
  
  /** 自动绘制动画缓动函数 */
  autoDrawEasing: string;
  
  /** 是否自动计算线条宽度 */
  autoLineWidth: boolean;
  
  /** 线条颜色 */
  color: string;
  
  /** 是否填充区域（趋势图） */
  fill: boolean;
  
  /** 渐变色数组 */
  gradient: string[];
  
  /** 渐变方向 */
  gradientDirection: GradientDirection;
  
  /** 图表高度 */
  height: string | number;
  
  /** 标签数组 */
  labels: Array<string | number>;
  
  /** 标签字体大小 */
  labelSize: number | string;
  
  /** 线条宽度 */
  lineWidth: string | number;
  
  /** 内边距 */
  padding: string | number;
  
  /** 是否显示标签 */
  showLabels: boolean;
  
  /** 平滑程度（false 为不平滑，true 或数字为平滑半径） */
  smooth: boolean | number | string;
  
  /** 图表类型 */
  type: SparklineType;
  
  /** 数据值数组 */
  value: SparklineValue[];
  
  /** 图表宽度 */
  width: number | string;

  // Data
  /** 上次路径长度（用于动画） */
  lastLength: number;

  // Computed
  /** 解析后的内边距 */
  readonly parsedPadding: number;
  
  /** 解析后的宽度 */
  readonly parsedWidth: number;
  
  /** 解析后的高度 */
  readonly parsedHeight: number;
  
  /** 解析后的标签大小 */
  readonly parsedLabelSize: number;
  
  /** 总高度（包含标签） */
  readonly totalHeight: number;
  
  /** 总宽度 */
  readonly totalWidth: number;
  
  /** 数据点总数 */
  readonly totalValues: number;
  
  /** 计算后的线条宽度 */
  readonly _lineWidth: number;
  
  /** 图表边界 */
  readonly boundary: Boundary;
  
  /** 是否有标签 */
  readonly hasLabels: boolean;
  
  /** 解析后的标签数组 */
  readonly parsedLabels: ParsedLabel[];
  
  /** 标准化的数值数组 */
  readonly normalizedValues: number[];
  
  /** 计算后的数据点坐标 */
  readonly _values: DataPoint[];
  
  /** 文本 Y 坐标 */
  readonly textY: number;
  
  /** 平滑半径 */
  readonly _radius: number;

  // Methods
  /**
   * 生成渐变定义元素
   * @returns VNode
   */
  genGradient(): VNode;
  
  /**
   * 生成 SVG g 元素
   * @param children - 子元素数组
   * @returns VNode
   */
  genG(children: VNode[]): VNode;
  
  /**
   * 生成趋势线路径
   * @returns VNode
   */
  genPath(): VNode;
  
  /**
   * 生成标签组
   * @param offset - X 轴偏移量
   * @returns VNode
   */
  genLabels(offset: number): VNode;
  
  /**
   * 生成单个标签
   * @param label - 标签数据
   * @param index - 索引
   * @returns VNode 或字符串
   */
  genLabel(label: ParsedLabel, index: number): VNode | string;
  
  /**
   * 生成柱状图
   * @returns VNode 或 undefined
   */
  genBars(): VNode | undefined;
  
  /**
   * 生成裁剪路径
   * @param bars - 柱状数据点数组
   * @param offset - 偏移量
   * @param lineWidth - 线条宽度
   * @param id - 元素 ID
   * @returns VNode
   */
  genClipPath(bars: DataPoint[], offset: number, lineWidth: number, id: string): VNode;
  
  /**
   * 生成趋势图
   * @returns VNode
   */
  genTrend(): VNode;
  
  /**
   * 渲染函数
   * @param h - createElement 函数
   * @returns VNode 或 undefined
   */
  render(h: typeof Vue.prototype.$createElement): VNode | undefined;

  // Scoped Slots
  $scopedSlots: {
    /** 自定义标签插槽 */
    label?: (props: LabelSlotProps) => VNode | VNode[];
  };
}

/**
 * 组件导出
 */
declare const VSparklineComponent: {
  new (): VSparkline;
};

export { VSparklineComponent as VSparkline };