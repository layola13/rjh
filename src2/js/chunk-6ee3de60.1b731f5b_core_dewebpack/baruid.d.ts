/**
 * Bar UID (Unique Identifier) type definitions and generator
 * Manages serial number generation for various bar types in window/door systems
 */

/**
 * Enumeration of bar types in the window system
 */
export enum BarUIDType {
  /** Main frame bar */
  frame = 0,
  /** Mullion (vertical divider) bar */
  mullion = 1,
  /** Fixed bead bar */
  fixedBead = 2,
  /** Sash frame bar */
  sashFrame = 3,
  /** Sash mullion bar */
  sashMullion = 4,
  /** Sash bead bar */
  sashBead = 5,
  /** Sub-frame bar */
  subFrame = 6
}

/**
 * Bar interface with serial number property
 */
export interface Bar {
  serial?: string;
}

/**
 * Manager interfaces for bars and components
 */
export interface BarManager {
  bars: Bar[];
}

export interface MullionManager {
  bars: Bar[];
}

/**
 * Sash component interface
 */
export interface Sash {
  frameManager: BarManager;
  mulManager: MullionManager;
}

/**
 * Sash manager interface
 */
export interface SashManager {
  allSashes: Sash[];
}

/**
 * Bead component interface
 */
export interface Bead {
  parent?: unknown;
}

/**
 * Part interface containing frame manager
 */
export interface Part {
  frameManager: BarManager;
}

/**
 * Component with parts collection
 */
export interface ComponentWithParts {
  parts: Part[];
}

/**
 * Frame component interface
 */
export interface Frame {
  frameManager: BarManager;
  mulManager: MullionManager;
  sashManager: SashManager;
}

/**
 * Singleton class for generating unique identifiers for bars
 * Manages counters and prefixes for different bar types
 */
export declare class BarUID {
  /**
   * Singleton instance accessor
   */
  static readonly Ins: BarUID;
  
  /**
   * Counter map tracking current count for each bar type
   */
  private counter: Map<BarUIDType, number>;
  
  /**
   * Prefix map defining string prefixes for each bar type
   * - frame: "bk"
   * - mullion: "zt"
   * - fixedBead: "yx"
   * - sashFrame: "sbk"
   * - sashMullion: "szt"
   * - sashBead: "syx"
   * - subFrame: "fk"
   */
  private prefix: Map<BarUIDType, string>;
  
  /**
   * Constructor initializes counters and prefixes
   */
  constructor();
  
  /**
   * Resets all counters to zero
   */
  resetCounter(): void;
  
  /**
   * Generates serial numbers for frame bars
   * Automatically detects type based on parent (Sash/Bead)
   * 
   * @param count - Number of serial numbers to generate
   * @param parent - Parent component (determines bar type)
   * @returns Array of generated serial numbers
   */
  frame(count: number, parent: unknown): string[];
  
  /**
   * Generates serial numbers for mullion bars
   * Detects sash mullion vs regular mullion based on parent
   * 
   * @param count - Number of serial numbers to generate
   * @param parent - Parent component (determines bar type)
   * @returns Array of generated serial numbers
   */
  mullion(count: number, parent: unknown): string[];
  
  /**
   * Generates a single serial number for given bar type
   * 
   * @param barType - Type of bar
   * @returns Generated serial number (prefix + incremented counter)
   */
  count(barType: BarUIDType): string;
  
  /**
   * Generates multiple serial numbers for given bar type
   * 
   * @param count - Number of serial numbers to generate
   * @param barType - Type of bar
   * @returns Array of generated serial numbers
   */
  countMulti(count: number, barType: BarUIDType): string[];
  
  /**
   * Generates serial numbers for all bars in frames and components
   * Processes frames, mullions, sashes, and sub-frames recursively
   * 
   * @param frames - Array of frame components
   * @param componentsWithParts - Array of components containing parts with sub-frames
   */
  generate(frames: Frame[], componentsWithParts: ComponentWithParts[]): void;
}