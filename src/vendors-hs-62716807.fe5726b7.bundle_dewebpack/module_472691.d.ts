/**
 * 进度条组件的属性接口
 */
interface CircleProgressProps {
  /** 组件样式类名前缀 */
  prefixCls: string;
  
  /** 进度条宽度(像素) */
  width?: number;
  
  /** 进度条线条宽度(像素) */
  strokeWidth?: number;
  
  /** 轨道颜色 */
  trailColor?: string;
  
  /** 线条端点样式: 'round' | 'butt' | 'square' */
  strokeLinecap?: 'round' | 'butt' | 'square';
  
  /** 缺口位置: 'top' | 'bottom' | 'left' | 'right' */
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  
  /** 缺口角度(度数) */
  gapDegree?: number;
  
  /** 进度条类型 */
  type?: 'circle' | 'dashboard';
  
  /** 子元素 */
  children?: React.ReactNode;
  
  /** 当前进度百分比(0-100) */
  percent?: number;
  
  /** 成功状态配置 */
  success?: SuccessConfig;
  
  /** 成功进度百分比(0-100) */
  successPercent?: number;
  
  /** 进度条颜色,支持字符串、对象(渐变)或数组(分段颜色) */
  strokeColor?: string | StrokeColorObject | StrokeColorArray;
}

/**
 * 成功状态配置接口
 */
interface SuccessConfig {
  /** 成功进度百分比 */
  percent?: number;
  
  /** 成功状态的进度条颜色 */
  strokeColor?: string;
  
  [key: string]: unknown;
}

/**
 * 渐变色对象接口
 */
interface StrokeColorObject {
  /** 渐变方向 */
  direction?: string;
  
  /** 其他渐变属性 */
  [key: string]: unknown;
}

/**
 * 分段颜色数组类型(例如: [成功色, 普通色])
 */
type StrokeColorArray = [string, string];

/**
 * 预设主题色常量
 */
declare const presetPrimaryColors: {
  green: string;
  [key: string]: string;
};

/**
 * 验证并规范化进度值(确保在0-100范围内)
 * @param progress - 原始进度值
 * @returns 规范化后的进度值
 */
declare function validProgress(progress: number | undefined): number;

/**
 * 获取成功进度百分比
 * @param config - 包含success和successPercent的配置对象
 * @returns 成功进度百分比,若未配置则返回0
 */
declare function getSuccessPercent(config: {
  success?: SuccessConfig;
  successPercent?: number;
}): number;

/**
 * Circle组件内部使用的进度百分比计算接口
 */
interface CirclePercentConfig {
  /** 当前进度百分比 */
  percent?: number;
  
  /** 成功状态配置 */
  success?: SuccessConfig;
  
  /** 成功进度百分比 */
  successPercent?: number;
}

/**
 * 计算Circle组件的进度数组
 * - 若有成功进度,返回[成功进度, 剩余进度]
 * - 否则返回当前进度值
 * @param config - 进度配置
 * @returns 进度值或进度数组
 */
declare function calculateCirclePercent(config: CirclePercentConfig): number | [number, number];

/**
 * 计算Circle组件的颜色数组
 * - 若有成功进度,返回[绿色, 主色]
 * - 否则返回原始颜色配置
 * @param props - 组件属性
 * @returns 颜色配置
 */
declare function calculateStrokeColor(props: CircleProgressProps): string | StrokeColorObject | StrokeColorArray;

/**
 * 圆形/仪表盘进度条组件
 * 
 * @description
 * 用于显示圆形或仪表盘样式的进度指示器。支持成功状态分段显示、自定义颜色和缺口配置。
 * 
 * @example
 *