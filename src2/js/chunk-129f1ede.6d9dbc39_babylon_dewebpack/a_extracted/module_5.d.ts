/**
 * Font glyph data for a vector font system
 * Contains path data and metrics for alphanumeric and special characters
 */

/**
 * Represents a single glyph (character) in the font
 */
interface GlyphData {
  /** 
   * Shape contours - array of SVG-style path strings defining the character outline
   * Uses compressed coordinate notation
   */
  sC: string[];
  
  /** 
   * Hole contours - array of path strings defining interior holes (for letters like 'o', 'B')
   * Each element is an array containing one or more path strings
   */
  hC?: string[][];
  
  /** Bounding box - minimum X coordinate */
  BB: number;
  
  /** Bounding box - center X coordinate */
  CB: number;
  
  /** Bounding box - minimum Y coordinate (height baseline) */
  HB: number;
  
  /** Bounding box - maximum Y coordinate (height top) */
  DB: number;
  
  /** Advance width - horizontal space occupied by the character */
  AB: number;
}

/**
 * Complete font glyph collection
 * Maps character keys to their glyph data
 */
interface FontGlyphMap {
  [character: string]: GlyphData;
}

/**
 * Font metrics and glyph data module
 * Provides vector path definitions for rendering text
 */
const fontGlyphData: FontGlyphMap = {
  reverseHoles: true,
  reverseShapes: false,
  
  a: {
    sC: ['F&E¸ CgE¸B9EWB9C= B9AÄB½ABCÀAB ESAB F`ABGaA`H2B" H2A¯ H2A@H^A4HzA4 HµA4I?A>I?A© I?FH I?GwH·HFGiHF E9HF CUHFB9G¾B9Fn B9F"BcE¸B~E¸ C8E¸CEF<CEFn CEG%CwG9EGG9 GZG9 GÄG9H2G(H2Fh H2E¸'],
    hC: [["H2D¬ H2C«G¸BNESBN CÀBN CyBNCEB|CEC4 CEDvC²D¬F&D¬"]],
    BB: 59.5,
    CB: 510.5,
    HB: -7,
    DB: 450,
    AB: 580
  },
  
  b: {
    sC: ['CbGe CbJP CbJ³CAK)B¹K) BpK)BTJ³BTJP BTA© BTA>B¤A4B½A4 CSA4CbA`CbA¯ CbB" D3AbE4ABFBAB F|AB I?ABJhA}JhCÀ JhEk JhG®I?HFF|HF FBHF E4HFD3H&CbGe'],
    hC: [['FBG9 F|G9 H¯G9IZG(IZEe IZD" IZBaH¯BNF|BN FBBN D"BNCbC`CbD¢ CbDª CbF)D"G9FBG9']],
    BB: 73,
    CB: 594.5,
    HB: -7,
    DB: 627.5,
    AB: 654
  },
  
  c: {
    sC: ['H:AB IwABI´B;I´C. I´CoIwC«IKC« I/C«H§CyH§C4 H§BgHtBNH, BN F&BN C²BNCEBcCED" CEEe CEG%C²G9F&G9 H, G9 HtG9H§G!H§FT H§E²I/E£IKE£ IgE£I´E®I´FX I´GKIwHFH:HF F&HF CbHFB9G®B9Ek B9CÀ B9A}CbABF&AB'],
    BB: 59.5,
    CB: 551.5,
    HB: 0,
    DB: 450,
    AB: 609
  },
  
  // ... additional glyphs follow the same structure
  
  " ": {
    sC: [],
    BB: 10000,
    CB: -10000,
    HB: 10000,
    DB: -10000,
    AB: 253.5
  }
};

export default fontGlyphData;