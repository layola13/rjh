/**
 * Profile size management for window/door manufacturing system
 * Manages dimensions of various frame components (mullions, sashes, screens, etc.)
 */

import type { ShapeType } from './ShapeType';

/**
 * Host object that contains polygon, frame, mullion, and sash management
 */
interface ProfileSizeHost {
  /** Polygon geometry with edges and mullion edge indexes */
  polygon: {
    edges: Array<any>;
    asMulEdgeIndexes: number[];
    box: {
      center: Point;
    };
  };
  /** Frame edge width manager */
  frameManager: {
    _edgeWidth: Record<number, number>;
    allProfileSize: number;
    edgeWidth: Record<number, number>;
  };
  /** Mullion manager */
  mulManager: {
    allProfileSize: number;
    glasses: Array<{
      bead?: {
        frameManager: {
          allProfileSize: number;
        };
      };
    }>;
    toJSON(): void;
  };
  /** Sash manager */
  sashManager: {
    allSashes: Array<Sash>;
    slides: Array<{
      sashes: Array<SlideSash>;
    }>;
    kfcSashes: Array<KfcSash>;
    doubleKfcSashes: Array<{
      sashes: Array<KfcSash>;
    }>;
    thefts: Array<TheftSash>;
  };
}

/**
 * Point in 2D space with translation capability
 */
interface Point {
  translate(x: number, y: number): Point;
}

/**
 * Base sash (window panel) interface
 */
interface Sash {
  type: ShapeType;
  polygon: {
    edges: Array<any>;
    box: {
      center: Point;
    };
  };
  frameManager: {
    allProfileSize: number;
    edgeWidth: Record<number, number>;
  };
  mulManager: {
    allProfileSize: number;
    glasses: Array<{
      bead?: {
        frameManager: {
          allProfileSize: number;
        };
      };
    }>;
    toJSON(): void;
  };
}

/**
 * Sliding sash with interlock features
 */
interface SlideSash extends Sash {
  interlockOnRight: boolean;
  interlockOnLeft: boolean;
}

/**
 * KFC (Kentucky Fried Chicken style) sash variant
 */
interface KfcSash extends Sash {}

/**
 * Anti-theft security sash
 */
interface TheftSash extends Sash {
  shutManager: {
    allProfileSize: number;
  };
}

/**
 * View configuration parameters
 */
interface ProfileSizeParams {
  frame: number;
  frameMullion: number;
  frameMullionLg: number;
  reinforcedFrameMullion: number;
  sash: number;
  guardSash: number;
  upSash: number;
  downSash: number;
  interlock: number;
  screen: number;
  sashMullion: number;
  kfcWaist: number;
  bead: number;
  antiTheft: number;
  antiTheftMullion: number;
  antiTheftHoleHeight: number;
  antiTheftGap: number;
  antiTheftHandleW: number;
  shadeSash: number;
  shadeSashMullion: number;
  shadeMullion: number;
  millingFrame: number;
  millingSash: number;
  glassGap: number;
}

/**
 * View object containing configuration parameters
 */
interface ProfileSizeView {
  params: ProfileSizeParams;
}

/**
 * Serialized profile size data (compact JSON format)
 */
interface SerializedProfileSize {
  f: number;          // frame
  fm: number;         // frameMullion
  sa: number;         // sash
  usa?: number;       // upSash
  dsa?: number;       // downSash
  il?: number;        // interlock
  sc: number;         // screen
  sm: number;         // sashMullion
  kw: number;         // kfcWaist
  b: number;          // bead
  a: number;          // antiTheft
  am: number;         // antiTheftMullion
  ahh: number;        // antiTheftHoleHeight
  ag: number;         // antiTheftGap
  ahw: number;        // antiTheftHandleW
  mf: number;         // millingFrame
  ms: number;         // millingSash
  gg: number;         // glassGap
}

/**
 * Output format for profile sizes (human-readable)
 */
interface ProfileSizeOutput {
  frame: number;
  frameMullion: number;
  frameMullionLg: number;
  sash: number;
  upSash: number;
  downSash: number;
  interlock: number;
  screen: number;
  sashMullion: number;
  kfcWaist: number;
  bead: number;
  antiTheft: number;
  antiTheftMullion: number;
  millingFrame: number;
  millingSash: number;
  glassGap: number;
  shadeSash: number;
  shadeMullion: number;
}

/**
 * Manages profile sizes for all components in a window/door system
 * 
 * Coordinates dimensions across frames, mullions, sashes, screens, beads,
 * and security features. Automatically propagates size changes to related components.
 */
export declare class ProfileSizeManager {
  /** Host object containing geometry and component managers */
  readonly host: ProfileSizeHost;
  
  /** View configuration */
  readonly view: ProfileSizeView;

  /** Map of shape types to their size getter functions */
  private readonly sizeMap: Map<ShapeType, () => number>;

  // Private backing fields
  private _frame: number;
  private _frameMullion: number;
  private _frameMullionLg: number;
  private _reinforcedFrameMullion: number;
  private _sash: number;
  private _guardSash: number;
  private _upSash: number;
  private _downSash: number;
  private _interlock: number;
  private _screen: number;
  private _sashMullion: number;
  private _kfcWaist: number;
  private _bead: number;
  private _antiTheft: number;
  private _antiTheftMullion: number;
  private _antiTheftHoleHeight: number;
  private _antiTheftGap: number;
  private _antiTheftHandleW: number;
  private _shadeSash: number;
  private _shadeSashMullion: number;
  private _shadeMullion: number;
  private _millingFrame: number;
  private _millingSash: number;
  private _glassGap: number;

  /**
   * Creates a new ProfileSizeManager
   * @param host - Host object containing component managers
   * @param view - View configuration with default parameters
   */
  constructor(host: ProfileSizeHost, view: ProfileSizeView);

  /** 
   * Frame profile size (excludes mullion edges)
   * Setting this updates all non-mullion frame edges
   */
  get frame(): number;
  set frame(value: number);

  /** 
   * Frame mullion profile size
   * Setting this updates mullion manager and mullion edges
   */
  get frameMullion(): number;
  set frameMullion(value: number);

  /** 
   * Large frame mullion profile size
   * Falls back to frameMullion if not set
   */
  get frameMullionLg(): number;
  set frameMullionLg(value: number);

  /** Reinforced frame mullion profile size */
  get reinforcedFrameMullion(): number;
  set reinforcedFrameMullion(value: number);

  /** 
   * Guard sash profile size
   * Setting this updates all guard sashes
   */
  get guardSash(): number;
  set guardSash(value: number);

  /** 
   * Standard sash profile size
   * Setting this updates all sashes and KFC sashes
   */
  get sash(): number;
  set sash(value: number);

  /** 
   * Upper sash profile size
   * Setting this updates top edges of sashes
   */
  get upSash(): number;
  set upSash(value: number);

  /** 
   * Lower sash profile size
   * Setting this updates bottom edges of sashes
   */
  get downSash(): number;
  set downSash(value: number);

  /** 
   * Interlock profile size (for sliding windows)
   * Setting this updates left/right edges where interlocks exist
   */
  get interlock(): number;
  set interlock(value: number);

  /** 
   * Screen profile size
   * Setting this updates all screen sashes
   */
  get screen(): number;
  set screen(value: number);

  /** 
   * Sash mullion profile size
   * Setting this updates mullions in all non-KFC sashes
   */
  get sashMullion(): number;
  set sashMullion(value: number);

  /** 
   * KFC waist profile size
   * Setting this updates mullions in KFC and double-KFC sashes
   */
  get kfcWaist(): number;
  set kfcWaist(value: number);

  /** 
   * Bead (glazing bead) profile size
   * Setting this updates beads in host and all sash glasses
   */
  get bead(): number;
  set bead(value: number);

  /** 
   * Anti-theft frame profile size
   * Setting this updates all theft prevention sashes
   */
  get antiTheft(): number;
  set antiTheft(value: number);

  /** 
   * Anti-theft mullion profile size
   * Setting this updates shutter managers in theft sashes
   */
  get antiTheftMullion(): number;
  set antiTheftMullion(value: number);

  /** Anti-theft hole height dimension */
  get antiTheftHoleHeight(): number;
  set antiTheftHoleHeight(value: number);

  /** Anti-theft gap dimension */
  get antiTheftGap(): number;
  set antiTheftGap(value: number);

  /** Anti-theft handle width dimension */
  get antiTheftHandleW(): number;
  set antiTheftHandleW(value: number);

  /** 
   * Shade push sash profile size
   * Setting this updates all shade push sashes
   */
  get shadeSash(): number;
  set shadeSash(value: number);

  /** 
   * Shade sash mullion profile size
   * Setting this updates mullions in shade push sashes
   */
  get shadeSashMullion(): number;
  set shadeSashMullion(value: number);

  /** Shade mullion profile size */
  get shadeMullion(): number;
  set shadeMullion(value: number);

  /** Milling sash dimension */
  get millingSash(): number;
  set millingSash(value: number);

  /** Milling frame dimension */
  get millingFrame(): number;
  set millingFrame(value: number);

  /** Glass gap dimension */
  get glassGap(): number;
  set glassGap(value: number);

  /** View parameters (read-only accessor) */
  get params(): ProfileSizeParams;

  /**
   * Gets the profile size for a specific shape type
   * @param shapeType - The shape type to query
   * @returns The profile size for the given shape type
   */
  get(shapeType: ShapeType): number;

  /**
   * Exports all profile sizes in human-readable format
   * @returns Object containing all profile dimensions
   */
  output(): ProfileSizeOutput;

  /**
   * Serializes profile sizes to compact JSON format
   * @returns Serialized profile size data with abbreviated keys
   */
  toJSON(): SerializedProfileSize;

  /**
   * Deserializes and applies profile sizes from saved data
   * @param data - Serialized profile size data (uses defaults if undefined)
   */
  deserialize(data?: SerializedProfileSize): void;
}