import Vue from 'vue';

/**
 * Measurable mixin - 提供尺寸相关的props和计算属性
 * 用于为组件添加标准化的尺寸控制能力
 */
export interface MeasurableProps {
  /** 组件高度 - 支持数字(px)或字符串(如 '100%', '50vh') */
  height?: number | string;
  
  /** 最大高度 - 支持数字(px)或字符串 */
  maxHeight?: number | string;
  
  /** 最大宽度 - 支持数字(px)或字符串 */
  maxWidth?: number | string;
  
  /** 最小高度 - 支持数字(px)或字符串 */
  minHeight?: number | string;
  
  /** 最小宽度 - 支持数字(px)或字符串 */
  minWidth?: number | string;
  
  /** 组件宽度 - 支持数字(px)或字符串(如 '100%', '50vw') */
  width?: number | string;
}

/**
 * 尺寸样式对象
 */
export interface MeasurableStyles {
  height?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  width?: string;
}

/**
 * Measurable mixin 计算属性
 */
export interface MeasurableComputed {
  /**
   * 根据props生成的CSS样式对象
   * 自动将数字转换为px单位，保留字符串单位
   */
  measurableStyles: MeasurableStyles;
}

/**
 * Measurable Mixin
 * 
 * 为Vue组件提供标准化的尺寸控制能力
 * 
 * @example
 *