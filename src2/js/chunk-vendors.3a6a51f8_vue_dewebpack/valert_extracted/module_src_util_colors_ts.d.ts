/**
 * Material Design 颜色调色板类型定义
 * 提供完整的 Material Design 颜色系统，包含所有主色、辅助色及其变体
 */

/**
 * 标准颜色变体接口
 * 包含基础色、5个浅色变体、4个深色变体和4个强调色变体
 */
export interface ColorVariants {
  /** 基础颜色 */
  base: string;
  /** 最浅色调（5级） */
  lighten5: string;
  /** 浅色调4级 */
  lighten4: string;
  /** 浅色调3级 */
  lighten3: string;
  /** 浅色调2级 */
  lighten2: string;
  /** 浅色调1级 */
  lighten1: string;
  /** 深色调1级 */
  darken1: string;
  /** 深色调2级 */
  darken2: string;
  /** 深色调3级 */
  darken3: string;
  /** 最深色调（4级） */
  darken4: string;
  /** 强调色1级（最浅） */
  accent1: string;
  /** 强调色2级 */
  accent2: string;
  /** 强调色3级 */
  accent3: string;
  /** 强调色4级（最深） */
  accent4: string;
}

/**
 * 非强调色变体接口
 * 用于棕色和蓝灰色等无强调色的颜色系列
 */
export interface ColorVariantsWithoutAccent {
  /** 基础颜色 */
  base: string;
  /** 最浅色调（5级） */
  lighten5: string;
  /** 浅色调4级 */
  lighten4: string;
  /** 浅色调3级 */
  lighten3: string;
  /** 浅色调2级 */
  lighten2: string;
  /** 浅色调1级 */
  lighten1: string;
  /** 深色调1级 */
  darken1: string;
  /** 深色调2级 */
  darken2: string;
  /** 深色调3级 */
  darken3: string;
  /** 最深色调（4级） */
  darken4: string;
}

/**
 * 色度变体接口
 * 用于灰色等无基础色的颜色系列
 */
export interface ShadeVariants {
  /** 黑色 */
  black: string;
  /** 白色 */
  white: string;
  /** 透明色 */
  transparent: string;
}

/**
 * Material Design 完整颜色调色板接口
 * 包含所有 Material Design 标准颜色系列
 */
export interface MaterialColors {
  /** 红色系列 (#f44336) */
  red: Readonly<ColorVariants>;
  /** 粉色系列 (#e91e63) */
  pink: Readonly<ColorVariants>;
  /** 紫色系列 (#9c27b0) */
  purple: Readonly<ColorVariants>;
  /** 深紫色系列 (#673ab7) */
  deepPurple: Readonly<ColorVariants>;
  /** 靛蓝色系列 (#3f51b5) */
  indigo: Readonly<ColorVariants>;
  /** 蓝色系列 (#2196f3) */
  blue: Readonly<ColorVariants>;
  /** 浅蓝色系列 (#03a9f4) */
  lightBlue: Readonly<ColorVariants>;
  /** 青色系列 (#00bcd4) */
  cyan: Readonly<ColorVariants>;
  /** 蓝绿色系列 (#009688) */
  teal: Readonly<ColorVariants>;
  /** 绿色系列 (#4caf50) */
  green: Readonly<ColorVariants>;
  /** 浅绿色系列 (#8bc34a) */
  lightGreen: Readonly<ColorVariants>;
  /** 黄绿色系列 (#cddc39) */
  lime: Readonly<ColorVariants>;
  /** 黄色系列 (#ffeb3b) */
  yellow: Readonly<ColorVariants>;
  /** 琥珀色系列 (#ffc107) */
  amber: Readonly<ColorVariants>;
  /** 橙色系列 (#ff9800) */
  orange: Readonly<ColorVariants>;
  /** 深橙色系列 (#ff5722) */
  deepOrange: Readonly<ColorVariants>;
  /** 棕色系列 (#795548) */
  brown: Readonly<ColorVariantsWithoutAccent>;
  /** 蓝灰色系列 (#607d8b) */
  blueGrey: Readonly<ColorVariantsWithoutAccent>;
  /** 灰色系列 (#9e9e9e) */
  grey: Readonly<ColorVariantsWithoutAccent>;
  /** 基础色度（黑/白/透明） */
  shades: Readonly<ShadeVariants>;
}

/**
 * 导出 Material Design 颜色调色板
 * 所有颜色对象均为冻结（只读）状态
 */
declare const colors: Readonly<MaterialColors>;

export default colors;