/**
 * Double sash compilation script module
 * Handles compilation logic for double sash window/door configurations
 */

import { Utils } from './utils';
import { AddonCCType } from './addon-types';
import { scriptTypeEnum } from './script-type-enum';
import { CompileScriptInnerSash } from './compile-script-inner-sash';

/**
 * Sash addon configuration interface
 */
interface SashAddon {
  /** Type identifier for the sash addon */
  type: string;
  // Additional properties would be defined based on actual usage
}

/**
 * Sash configuration interface with dimensional and behavioral properties
 */
interface SashConfig {
  /** Width of the sash in millimeters */
  width?: number;
  /** Height of the sash in millimeters */
  height?: number;
  /** Distance from component to sash */
  distanceToSash?: number;
  /** Whether multiple lock points are present */
  multiLockPoints?: boolean;
  /** Number of hinges on the sash */
  hingeCount?: number;
  /** Whether the sash includes a turning frame */
  withTurningFrame?: boolean;
  /** Method of sash assignment/opening */
  sashAssignWay: number;
  /** Whether this is a door (true) or window (false) */
  isDoor: boolean;
  /** Installation position code */
  installPosition?: number;
}

/**
 * Compiler interface for pushing temporary key-value pairs
 */
interface Compiler {
  /** Add a temporary key-value pair to the compilation context */
  pushTmpKey(key: string, value: string | number): void;
}

/**
 * Compilation script handler for double sash configurations
 * Extends inner sash functionality with double-specific logic
 */
export declare class CompileScriptDoubleSash extends CompileScriptInnerSash {
  /** Reference to the compiler instance */
  protected compiler: Compiler;

  /**
   * Gets the script type identifier
   * @returns The double sash script type enum value
   */
  get scriptType(): scriptTypeEnum;

  /**
   * Gets the compatible sash CC types
   * @returns Array of compatible type identifiers
   */
  get sashCCType(): string[];

  /**
   * Gets the addon type for double sash configurations
   * @returns The double sash addon type
   */
  get addonType(): AddonCCType;

  /**
   * Creates mock sash addon configurations
   * @param config - Sash configuration parameters
   * @returns Array of mocked sash addon objects with type set to "doubleSash"
   */
  mockSashAddon(config: SashConfig): SashAddon[];

  /**
   * Loads bar-related variables into the compiler context
   * @param config - Sash configuration containing bar properties
   */
  loadBarVar(config: SashConfig): void;

  /**
   * Loads glass-related variables into the compiler context
   * @param config - Sash configuration containing glass properties
   */
  loadGlassVar(config: SashConfig): void;

  /**
   * Loads addon-related variables into the compiler context
   * Includes distance to sash, lock points, hinge count, perimeter, and turning frame
   * @param config - Sash configuration containing addon properties
   */
  loadAddonVar(config: SashConfig): void;

  /**
   * Loads common variables into the compiler context
   * Includes opening direction, opening method, door/window type, and installation position
   * @param config - Sash configuration containing common properties
   */
  protected loadVar(config: SashConfig): void;
}