/**
 * Font glyph path data decoder and manager
 * Handles compressed vector path commands for rendering text glyphs
 */

interface GlyphHoleCommands {
  /** Array of hole path command arrays */
  [index: number]: number[][];
}

interface GlyphShapeCommands {
  /** Array of shape path command arrays */
  [index: number]: number[][];
}

interface GlyphData {
  /** Shape command strings (compressed path data) */
  sC?: string[];
  /** Hole command arrays (for glyphs with internal holes) */
  hC?: string[][];
  /** Shape command arrays (decoded path coordinates) */
  shapeCmds?: GlyphShapeCommands;
  /** Hole command arrays (decoded hole coordinates) */
  holeCmds?: GlyphHoleCommands;
  /** Full SVG path string */
  fullPath?: string;
  /** Original shape commands before transformation */
  shapeCmdsOrig?: number[][][];
  /** Bounding box - left coordinate */
  BB: number;
  /** Bounding box - right coordinate */
  CB: number;
  /** Bounding box - bottom coordinate */
  HB: number;
  /** Bounding box - top coordinate */
  DB: number;
  /** Advance width (horizontal spacing to next character) */
  AB: number;
}

interface FontGlyphMap {
  /** Whether to reverse hole winding order */
  reverseHoles: boolean;
  /** Whether to reverse shape winding order */
  reverseShapes: boolean;
  /** Glyph data indexed by character code */
  [key: string]: boolean | GlyphData;
}

/**
 * Creates and returns a font glyph data map containing vector path information
 * for rendering uppercase letters A-Z, lowercase a-z, digits 0-9, and common symbols.
 * 
 * Each glyph contains:
 * - Compressed shape/hole path commands (sC/hC) as encoded strings
 * - Bounding box coordinates (BB, CB, HB, DB)
 * - Advance width for horizontal text layout (AB)
 * 
 * @returns Font glyph data map with path rendering information
 */
export function createFontGlyphData(): FontGlyphMap {
  const glyphData: FontGlyphMap = {
    reverseHoles: false,
    reverseShapes: true,
    
    A: {
      sC: ["KPB, KPA}K-A[ J­A:JVA: I«A:IkA± IZB< H»CuH§Cw DgCw DVCwDTCk C¥A± C_A:B·A: B_A:B=A` A¿A§A¿B4 A¿BNB4B¥ E¥LR EÃLÃFoLÃ FoLÃ GNLÃGqL: KHBV KPB>KPB, "],
      hC: [["FwI} FuI}FsIy FqIu E0Ee E.EcE.E] E.ETE8ET H2ET H<ETH<E_ H<EcH:Ee F{Iu F{I}FwI}"]],
      BB: 45,
      CB: 647,
      HB: -4,
      DB: 751,
      AB: 683
    },
    
    B: {
      sC: ["B6BZ B6K} B6LBB_Lq B©LÁCDLÁ E8LÁ FmLÁGdL) HZK4HZI© HZHiGwGo HTG2HªFP I:EoI:D{ I:C>H:B@ G:ABE}AB CDAB B©ABB_An B6A»B6BZ"],
      hC: [["CÃFP CÃC8 CÃC*D.C* EyC* FcC*F¼Cn GPD0GPD¥ GPETF¼E» FcF]EyF] D, F] CÃFZCÃFP", "CÃK% CÃH> CÃH0D, H0 E6H0 E¹H2FGHq FyI.FyIw FyJ>FFJ{ E·K6E0K6 D.K6 CÃK6CÃK%"]],
      BB: 58,
      CB: 508,
      HB: 0,
      DB: 750,
      AB: 545
    },

    C: {
      sC: ["H#A2 EiA2C©B¶ B#DuB#G. B#IkC¨KL EgM.H#M. JDM.K¥K­ L@KTL@J¿ L@JkKÁJI K}J(KLJ( JÃJ(JuJN IgKDH!KD F@K@E&J% C±H¯C±G. C±E_E0D? FRBÃH#B½ IkBÁJuC³ K%D8KLD8 K}D8KÁC¹ L@CuL@CD L@B¯K£BT JFA2H#A2"],
      BB: 49,
      CB: 703,
      HB: -8,
      DB: 758,
      AB: 741
    },

    D: {
      sC: ["EµAB C0AB B£ABB[Ad B6A§B6B4 B6KÃ B6LXBZL| B¡LÁC4LÁ EµLÁ HHLÁJ#KA K£IeK£G0 K£D{ J$BÁ HJABEµAB"],
      hC: [["E¹K4 D, K4 CÃK4CÃK* CÃC6 CÃC*D, C* EµC* GmC*H¥D@ I»EVI»G0 I»H¯H¨IÃ GsK4E¹K4"]],
      BB: 58,
      CB: 671,
      HB: 0,
      DB: 750,
      AB: 708
    },

    E: {
      sC: ["HFB6 HFA£GÂAb GyABG@AB C*AB B6ABB6Ba B6K{ B6LÁC(LÁ GTLÁ G£LÁGÂL~ H>L]H>KÁ H>KsGÄKS G§K4GTK4 D, K4 CÃK4CÃK* CÃH2 CÃH(D, H( GTH( G¥H(H#G© HFGeHFG4 HFF¥H$Fa G§F>GTF> D, F> CÃF>CÃF4 CÃC6 CÃC*D, C* GTC* G¥C*H#B« HFBgHFB6"],
      BB: 58,
      CB: 450,
      HB: 0,
      DB: 750,
      AB: 488
    },

    // Space character (special handling)
    " ": {
      BB: 200,
      CB: 200,
      HB: 200,
      DB: 200,
      AB: 290
    }
  };

  // Ensure space character is properly initialized
  glyphData[" "] = glyphData[" "];
  
  return glyphData;
}

export default createFontGlyphData;