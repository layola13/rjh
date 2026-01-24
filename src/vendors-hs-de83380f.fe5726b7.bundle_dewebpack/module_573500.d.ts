/**
 * 颜色输入处理模块
 * 提供颜色格式解析和验证功能
 */

/**
 * RGB颜色对象
 */
export interface RGBColor {
  /** 红色通道 (0-255) */
  r: number;
  /** 绿色通道 (0-255) */
  g: number;
  /** 蓝色通道 (0-255) */
  b: number;
}

/**
 * RGBA颜色对象
 */
export interface RGBAColor extends RGBColor {
  /** 透明度 (0-1) */
  a: number;
}

/**
 * HSL颜色对象
 */
export interface HSLColor {
  /** 色相 (0-360) */
  h: number;
  /** 饱和度 (0-100%) */
  s: number | string;
  /** 亮度 (0-100%) */
  l: number | string;
}

/**
 * HSLA颜色对象
 */
export interface HSLAColor extends HSLColor {
  /** 透明度 (0-1) */
  a?: number;
}

/**
 * HSV颜色对象
 */
export interface HSVColor {
  /** 色相 (0-360) */
  h: number;
  /** 饱和度 (0-100%) */
  s: number | string;
  /** 明度 (0-100%) */
  v: number | string;
}

/**
 * HSVA颜色对象
 */
export interface HSVAColor extends HSVColor {
  /** 透明度 (0-1) */
  a?: number;
}

/**
 * 颜色输入类型
 * 支持字符串或各种颜色对象格式
 */
export type ColorInput = 
  | string 
  | RGBAColor 
  | HSLAColor 
  | HSVAColor;

/**
 * 颜色格式类型
 */
export type ColorFormat = 
  | 'rgb' 
  | 'prgb' 
  | 'hex' 
  | 'hex8' 
  | 'hsl' 
  | 'hsv' 
  | 'name';

/**
 * 解析后的颜色对象
 */
export interface ParsedColor {
  /** 是否成功解析 */
  ok: boolean;
  /** 颜色格式 */
  format?: ColorFormat | false;
  /** 红色通道 (0-255) */
  r: number;
  /** 绿色通道 (0-255) */
  g: number;
  /** 蓝色通道 (0-255) */
  b: number;
  /** 透明度 (0-1) */
  a: number;
}

/**
 * 字符串解析后的颜色对象（中间格式）
 */
export interface StringColorObject {
  /** 红色通道 */
  r?: number | string;
  /** 绿色通道 */
  g?: number | string;
  /** 蓝色通道 */
  b?: number | string;
  /** 色相 */
  h?: number | string;
  /** 饱和度 */
  s?: number | string;
  /** 亮度 */
  l?: number | string;
  /** 明度 */
  v?: number | string;
  /** 透明度 */
  a?: number | string;
  /** 颜色格式 */
  format?: ColorFormat;
}

/**
 * 将各种格式的颜色输入转换为标准RGB对象
 * 
 * @param input - 颜色输入，可以是字符串（如 "#fff", "rgb(255,0,0)"）或颜色对象
 * @returns 标准化的RGB颜色对象，包含解析状态和格式信息
 * 
 * @example
 *