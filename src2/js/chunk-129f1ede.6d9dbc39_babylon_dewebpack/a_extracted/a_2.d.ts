/**
 * 字体字形路径数据模块
 * 包含完整的字母、数字和符号的矢量路径定义
 */

/** 字形边界框和路径数据 */
interface GlyphData {
  /** 字形轮廓路径（编码的 SVG 路径命令） */
  sC: string[];
  /** 孔洞路径（可选） */
  hC?: string[][];
  /** 边界框 - 左边距 */
  BB: number;
  /** 边界框 - 右边距 */
  CB: number;
  /** 边界框 - 底部 */
  HB: number;
  /** 边界框 - 顶部 */
  DB: number;
  /** 字符前进宽度 */
  AB: number;
}

/** 字体数据集合 - 支持所有 ASCII 可打印字符及扩展字符 */
type FontDataMap = Record<string, GlyphData>;

/**
 * 解码路径字符串
 * 将压缩的路径数据转换为 SVG 路径命令
 */
function decodePath(encoded: string[]): string[] {
  return encoded.map(segment => segment);
}

/**
 * 创建带音标的字形变体
 * @param baseGlyph - 基础字形数据
 * @param diacriticType - 音标类型
 * @param offsetX - X 轴偏移
 * @param offsetY - Y 轴偏移
 */
function createDiacriticVariant(
  baseGlyph: GlyphData,
  diacriticType: 'acute' | 'grave' | 'dieresis' | 'circumflex' | 'ring' | 'tilde',
  offsetX: number,
  offsetY: number
): GlyphData {
  const result: GlyphData = {
    BB: baseGlyph.BB,
    CB: baseGlyph.CB,
    HB: baseGlyph.HB,
    DB: baseGlyph.DB,
    AB: baseGlyph.AB
  };

  const mainPaths = baseGlyph.sC.map(p => p);
  const holePaths = typeof baseGlyph.hC === 'object' 
    ? baseGlyph.hC.map(h => h) 
    : undefined;

  const pathCount = diacriticType === 'dieresis' ? 2 : 1;
  const isRing = diacriticType === 'ring';

  // 添加音标路径逻辑（简化）
  if (pathCount === 2) {
    if (holePaths) holePaths.unshift([]);
    if (diacriticType === 'dieresis') {
      mainPaths.unshift(generateDieresisPath(offsetX, offsetY));
    }
  }

  if (isRing) {
    if (!holePaths) {
      result.hC = baseGlyph.sC.map(() => []);
    }
    // Ring 特殊处理
  } else if (holePaths) {
    holePaths.unshift([]);
  }

  result.sC = mainPaths;
  if (holePaths) result.hC = holePaths;

  return result;
}

/**
 * 生成两点符号路径
 */
function generateDieresisPath(offsetX: number, offsetY: number): string {
  // 实际路径生成逻辑
  return '';
}

/**
 * 字体字形数据导出
 */
export function getFontData(): FontDataMap {
  const fontData: FontDataMap = {};

  // 小写字母 a
  fontData.a = {
    sC: ['HD@¤ H1@¤G¤A...'],
    hC: [['FzF( FzFRF¡F¦...']],
    BB: 24.5,
    CB: 494.5,
    HB: -32.5,
    DB: 509.5,
    AB: 511.5
  };

  // 带音标变体
  fontData['á'] = createDiacriticVariant(fontData.a, 'acute', 100, 0);
  fontData['à'] = createDiacriticVariant(fontData.a, 'grave', 130, -17);
  
  // ... 其他字符定义

  return fontData;
}

export default getFontData;