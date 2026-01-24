/**
 * 进度条线性渐变处理模块
 * 提供渐变色排序、处理和进度条渲染功能
 */

import type { CSSProperties, ReactNode, ReactElement } from 'react';

/**
 * 渐变色配置项
 */
export interface GradientConfig {
  /** 起始颜色 */
  from?: string;
  /** 结束颜色 */
  to?: string;
  /** 渐变方向 */
  direction?: string;
  /** 渐变色阶映射，键为百分比（如 "0%", "100%"），值为颜色 */
  [percent: string]: string | undefined;
}

/**
 * 成功状态配置
 */
export interface SuccessConfig {
  /** 成功状态的进度百分比 */
  percent?: number;
  /** 成功状态的描边颜色 */
  strokeColor?: string;
}

/**
 * 进度条组件属性
 */
export interface ProgressLineProps {
  /** 样式类名前缀 */
  prefixCls: string;
  /** 文本方向（RTL/LTR） */
  direction?: 'ltr' | 'rtl';
  /** 进度百分比 (0-100) */
  percent?: number;
  /** 进度条线宽 */
  strokeWidth?: number;
  /** 进度条尺寸 */
  size?: 'default' | 'small';
  /** 进度条颜色，支持字符串或渐变配置 */
  strokeColor?: string | GradientConfig;
  /** 线帽样式 */
  strokeLinecap?: 'round' | 'square';
  /** 子元素 */
  children?: ReactNode;
  /** 轨道颜色 */
  trailColor?: string;
  /** 成功状态配置 */
  success?: SuccessConfig;
}

/**
 * 渐变色阶项
 */
interface GradientStep {
  /** 位置百分比 */
  key: number;
  /** 颜色值 */
  value: string;
}

/**
 * 对渐变色阶进行排序并生成CSS渐变字符串
 * @param gradient - 渐变色阶配置对象
 * @returns CSS渐变色值字符串，格式如 "color1 0%, color2 50%, color3 100%"
 * 
 * @example
 * sortGradient({ "0%": "#1890ff", "100%": "#096dd9" })
 * // 返回 "#1890ff 0%, #096dd9 100%"
 */
export declare function sortGradient(gradient: Record<string, string>): string;

/**
 * 处理渐变配置并生成对应的CSS样式
 * @param gradient - 渐变配置对象
 * @param direction - 文本方向
 * @returns 包含backgroundImage属性的样式对象
 * 
 * @example
 * handleGradient({ from: "#1890ff", to: "#096dd9" }, "ltr")
 * // 返回 { backgroundImage: "linear-gradient(to right, #1890ff, #096dd9)" }
 */
export declare function handleGradient(
  gradient: GradientConfig,
  direction?: 'ltr' | 'rtl'
): { backgroundImage: string };

/**
 * 进度条线性渲染组件（默认导出）
 * @param props - 进度条属性
 * @returns React元素
 * 
 * @remarks
 * 渲染包含主进度条和成功状态进度条的完整进度条UI
 */
export default function ProgressLine(props: ProgressLineProps): ReactElement;