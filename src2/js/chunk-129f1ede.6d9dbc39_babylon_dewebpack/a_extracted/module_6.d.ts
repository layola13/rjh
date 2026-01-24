/**
 * 字体字形数据模块
 * 包含各种字符的矢量路径定义和边界框信息
 */

/**
 * 字形边界框接口
 * 定义字形的空间范围和尺寸
 */
interface GlyphBoundingBox {
  /** 边界框左边界 (Bounding Box Left) */
  BB: number;
  /** 边界框右边界 (Character Boundary Right) */
  CB: number;
  /** 边界框底部 (Height Bottom) */
  HB: number;
  /** 边界框顶部 (Distance/Depth Top) */
  DB: number;
  /** 字形前进宽度 (Advance/Bearing) */
  AB: number;
}

/**
 * 坐标点类型
 * [x, y] 形式的二维坐标
 */
type Point = [number, number];

/**
 * 路径命令类型
 * 表示移动到点或绘制曲线的指令序列
 */
type PathCommand = number[];

/**
 * 复杂字形定义接口
 * 包含完整的矢量路径和变换参数
 */
interface ComplexGlyph extends GlyphBoundingBox {
  /** 形状路径命令集合 */
  shapeCmds: PathCommand[][];
  /** 孔洞路径命令集合（用于复合字形） */
  holeCmds: PathCommand[][];
  /** 是否反转形状绘制方向 */
  reverseShape: boolean;
  /** 是否反转孔洞绘制方向 */
  reverseHole: boolean;
  /** X轴缩放因子 */
  xFactor: number;
  /** Y轴缩放因子 */
  yFactor: number;
  /** X轴偏移量 */
  xShift: number;
  /** Y轴偏移量（可选） */
  yShift?: number;
  /** 是否显示该字形 */
  show: boolean;
}

/**
 * 字体数据配置接口
 * 定义整个字体集的全局设置和字形映射
 */
interface FontData {
  /** 是否反转孔洞路径方向 */
  reverseHoles: boolean;
  /** 是否反转形状路径方向 */
  reverseShapes: boolean;
  /** 字符 'A' 的字形数据 */
  A: GlyphBoundingBox;
  /** 字符 'B' 的字形数据 */
  B: GlyphBoundingBox;
  /** 字符 'X' 的字形数据 */
  X: GlyphBoundingBox;
  /** 字符 'Y' 的字形数据 */
  Y: GlyphBoundingBox;
  /** 字符 'Z' 的复杂字形数据 */
  Z: ComplexGlyph;
  /** 字符 'a' 的复杂字形数据 */
  a: ComplexGlyph;
  /** 字符 'á'（带重音）的复杂字形数据 */
  'á': ComplexGlyph;
  /** 字符 'b' 的字形数据 */
  b: GlyphBoundingBox;
  /** 字符 'c' 的字形数据 */
  c: GlyphBoundingBox;
  /** 字符 '4' 的字形数据 */
  '4': GlyphBoundingBox;
  /** 字符 '5' 的字形数据 */
  '5': GlyphBoundingBox;
  /** 空格字符的字形数据 */
  ' ': GlyphBoundingBox;
}

/**
 * 创建字体数据对象
 * @returns 包含所有字形定义的字体数据
 */
declare function createFontData(): FontData;

export type { 
  GlyphBoundingBox, 
  Point, 
  PathCommand, 
  ComplexGlyph, 
  FontData 
};

export { createFontData };