/**
 * Ant Design 颜色生成算法
 * 基于单一基础色生成10个梯度色板
 */

/**
 * RGB 颜色对象
 */
interface RGBColor {
  /** 红色通道 (0-255) */
  r: number;
  /** 绿色通道 (0-255) */
  g: number;
  /** 蓝色通道 (0-255) */
  b: number;
}

/**
 * HSV 颜色对象
 */
interface HSVColor {
  /** 色相 (0-360) */
  h: number;
  /** 饱和度 (0-1) */
  s: number;
  /** 明度 (0-1) */
  v: number;
}

/**
 * 颜色生成选项
 */
interface GenerateOptions {
  /** 主题模式，'dark' 为暗色模式 */
  theme?: 'dark' | 'light';
  /** 暗色模式背景色，默认 #141414 */
  backgroundColor?: string;
}

/**
 * 色板数组，包含 primary 属性指向第6个颜色
 */
interface ColorPalette extends Array<string> {
  /** 主色，指向索引5的颜色 */
  primary: string;
}

/**
 * 预设颜色映射
 */
interface PresetColors {
  red: string;
  volcano: string;
  orange: string;
  gold: string;
  yellow: string;
  lime: string;
  green: string;
  cyan: string;
  blue: string;
  geekblue: string;
  purple: string;
  magenta: string;
  grey: string;
}

/**
 * 预设色板映射
 */
interface PresetPalettes {
  red: ColorPalette;
  volcano: ColorPalette;
  orange: ColorPalette;
  gold: ColorPalette;
  yellow: ColorPalette;
  lime: ColorPalette;
  green: ColorPalette;
  cyan: ColorPalette;
  blue: ColorPalette;
  geekblue: ColorPalette;
  purple: ColorPalette;
  magenta: ColorPalette;
  grey: ColorPalette;
}

/**
 * 根据基础色生成10个梯度颜色
 * @param color - 基础颜色，支持多种格式 (HEX/RGB/HSL/HSV)
 * @param options - 生成选项
 * @returns 包含10个颜色的数组，索引5为主色
 * @example
 *