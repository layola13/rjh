/**
 * Fold window/door compilation script module
 * Handles compilation logic for folding sashes and screens
 */

import { Utils } from './utils';
import { AddonCCType } from './addon-types';
import { scriptTypeEnum } from './script-types';
import { CompileScriptInnerSash } from './compile-script-inner-sash';

/**
 * Sash assignment configuration containing opening direction and fold pattern
 */
export interface SashAssignWay {
  /** Pattern describing fold configuration, e.g., "2+3IO" (2 left + 3 right, inward/outward opening) */
  toString(): string;
  indexOf(searchString: string): number;
  match(regexp: RegExp): RegExpMatchArray | null;
  matchAll(regexp: RegExp): IterableIterator<RegExpMatchArray>;
}

/**
 * Install position enumeration
 */
export enum InstallPosition {
  /** Indoor installation */
  Indoor = 0,
  /** Outdoor installation */
  Outdoor = 1,
  /** Middle installation */
  Middle = 2
}

/**
 * Sash element configuration
 */
export interface SashElement {
  /** Sash type identifier */
  type?: string;
  /** Sash number/index */
  sashNumber?: number;
  /** Opening direction and fold method configuration */
  sashAssignWay?: SashAssignWay;
  /** Whether this is a door (true) or window (false) */
  isDoor?: boolean;
  /** Installation position */
  installPosition?: InstallPosition;
  /** Number of connecting gaps between sashes */
  connectGapsCount?: number;
  /** Number of touching gaps */
  touchGapsCount?: number;
  /** Number of side touching gaps */
  sideTouchGapsCount?: number;
}

/**
 * Mock sash addon configuration
 */
export interface MockSashAddon {
  /** Addon type, set to "fold" for folding elements */
  type: string;
}

/**
 * Compilation script for fold-type windows and doors
 * Extends inner sash compilation with fold-specific logic
 */
export declare class CompileScriptFold extends CompileScriptInnerSash {
  /**
   * Gets the script type identifier
   * @returns The fold script type
   */
  get scriptType(): scriptTypeEnum;

  /**
   * Gets the sash component types handled by this compiler
   * @returns Array containing "foldSash" and "foldScreen"
   */
  get sashCCType(): string[];

  /**
   * Gets the addon component type
   * @returns The fold addon type identifier
   */
  get addonType(): AddonCCType;

  /**
   * Creates mock sash addon elements with fold type
   * @param element - The sash element configuration
   * @returns Array of mock sash addon objects with type set to "fold"
   */
  mockSashAddon(element: SashElement): MockSashAddon[];

  /**
   * Loads bar-related variables into the compiler
   * @param element - The sash element containing bar configuration
   */
  loadBarVar(element: SashElement): void;

  /**
   * Loads glass-related variables into the compiler
   * Includes sash number ("扇号") variable
   * @param element - The sash element containing glass configuration
   */
  loadGlassVar(element: SashElement): void;

  /**
   * Loads addon-related variables into the compiler
   * @param element - The sash element containing addon configuration
   */
  loadAddonVar(element: SashElement): void;

  /**
   * Loads inner size variables into the compiler
   * Includes gap counts: a (connect gaps), b (touch gaps), d (side touch gaps)
   * @param element - The sash element containing size configuration
   */
  loadInnerSizeVar(element: SashElement): void;

  /**
   * Loads common fold-specific variables into the compiler
   * Includes: opening direction ("开向"), fold method ("折叠方式"),
   * door/window type ("门窗类型"), and installation position ("安装位置")
   * @param element - The sash element configuration
   */
  loadVar(element: SashElement): void;

  /**
   * Pushes left and right sash counts to compiler variables
   * Extracts counts from pattern like "2+3" → left: 2, right: 3
   * @param sashAssignWay - The sash assignment configuration string
   */
  pushSashesCount(sashAssignWay?: SashAssignWay): void;

  /**
   * Determines opening direction from sash assignment
   * @param sashAssignWay - The sash assignment configuration
   * @returns "外开" (outward opening) if contains "O", "内开" (inward opening) if contains "I", undefined otherwise
   */
  getOpenToward(sashAssignWay?: SashAssignWay): string | undefined;

  /**
   * Extracts fold method pattern from sash assignment
   * @param sashAssignWay - The sash assignment configuration
   * @returns The fold pattern (e.g., "2+3") or undefined if not found
   */
  getOpenMethod(sashAssignWay?: SashAssignWay): string | undefined;
}