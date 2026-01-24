/**
 * Sash (window/door panel) script compilation module
 * Handles compilation of sash-related scripts including bars, glasses, and addons
 */

import { Utils } from './utils';
import { CompileBars } from './compile-bars';
import { CompileComponent } from './compile-component';
import { ErrorTag, ErrorMessage } from './errors';
import { CompileAddons, AddonCCType } from './compile-addons';
import { scriptPurposeEnum, scriptTypeEnum } from './enums';
import { CompileGlasses, GlassCCType } from './compile-glasses';

/**
 * Script object from database/input
 */
interface Script {
  /** Script identifier */
  script_type: string;
  /** Purpose of the script (size, bar, etc.) */
  script_purpose: string;
  /** Type identifier (sash, screen, etc.) */
  type: string;
  /** Script condition expression */
  condition: string;
  /** Length/size expression */
  length: string;
}

/**
 * Sash element in the window/door structure
 */
interface SashElement {
  /** Unique identifier */
  id: string;
  /** Element type */
  type: string;
  /** Sash assignment/opening method */
  sashAssignWay: string;
  /** Whether this is a door (vs window) */
  isDoor: boolean;
  /** Parent frame identifier */
  frameId: string;
  /** Parent frame unique identifier */
  frameUid?: string;
  /** Size type (0 = width, 1 = height) */
  sizeType: number;
  /** Calculated center-to-center dimension */
  cc: number;
  /** Additional dimension parameter */
  aa?: number;
  /** Equipment identifier */
  eq?: string;
  /** Serial number */
  serial?: string;
  /** Distance from sash to element */
  distanceToSash?: number;
  /** Lock position */
  lockPosition?: string;
  /** Whether multiple lock points exist */
  multiLockPoints?: boolean;
  /** Number of hinges */
  hingeCount?: number;
  /** Maximum opening degree */
  openDegree?: number;
  /** Whether turning frame is present */
  withTurningFrame?: boolean;
  /** Whether element slides */
  isSlide?: boolean;
  /** Number of docking points */
  dockCount?: number;
  /** Number of reinforced docking points */
  reinforcedDockCount?: number;
  /** Push/slide direction */
  pushSlide?: 'left' | 'right' | 'up' | 'down';
  /** Installation position */
  installPosition?: string;
  /** Whether belongs to down frame */
  belongsToDownFrame?: boolean;
}

/**
 * Calculated sash size information
 */
interface SashSize {
  /** Sash identifier */
  id: string;
  /** Element type */
  type: string;
  /** Sash assignment/opening method */
  sashAssignWay: string;
  /** Whether this is a door */
  isDoor: boolean;
  /** Parent frame identifier */
  frameId: string;
  /** Parent frame unique identifier */
  frameUid?: string;
  /** Host script type */
  hostType: string;
  /** Width dimension */
  width?: number;
  /** Height dimension */
  height?: number;
  /** Width calculation expression */
  widthExpression?: string;
  /** Height calculation expression */
  heightExpression?: string;
  /** Whether element slides */
  isSlide?: boolean;
  /** Equipment identifier */
  eq?: string;
  /** Serial number */
  serial?: string;
  /** Distance from sash */
  distanceToSash?: number;
  /** Lock position */
  lockPosition?: string;
  /** Multiple lock points flag */
  multiLockPoints?: boolean;
  /** Hinge count */
  hingeCount?: number;
  /** Opening degree */
  openDegree?: number;
  /** Turning frame flag */
  withTurningFrame?: boolean;
  /** Calculated weight */
  weight?: number;
}

/**
 * Opening cell (空格) information
 */
interface OpenCell {
  /** Cell identifier */
  id: string;
  /** Type identifier */
  type: 'openCell';
  /** Sash assignment method */
  sashAssignWay: string;
  /** Door flag */
  isDoor: boolean;
  /** Frame identifier */
  frameId: string;
  /** Host script type */
  hostType: string;
  /** Width dimension */
  width?: number;
  /** Height dimension */
  height?: number;
  /** Slide flag */
  isSlide?: boolean;
}

/**
 * Shade size information
 */
interface ShadeSize {
  /** Shade glass identifier */
  id: string;
  /** Width dimension */
  width: number;
  /** Height dimension */
  height: number;
  /** Type identifier */
  type: string;
}

/**
 * Bar element for compilation
 */
interface BarElement {
  /** Bar type */
  type: string;
  /** Sash identifier this bar belongs to */
  isashId: string;
  /** Compiled result data */
  [key: string]: unknown;
}

/**
 * Glass compilation result
 */
interface GlassCompilationResult {
  /** Glass type */
  type: string;
  /** Compiled glass items */
  compiledResult: CompiledGlassItem[];
  /** Glass specifications */
  specs?: string;
  /** Glass thickness */
  thickness?: number;
}

/**
 * Compiled glass item detail
 */
interface CompiledGlassItem {
  /** Width dimension */
  width: number;
  /** Height dimension */
  height: number;
  /** Original glass data */
  glass: {
    /** Glass identifier */
    id: string;
    /** Glass type */
    type: string;
    /** Frame identifier */
    frameId: string;
    /** Door flag */
    isDoor: boolean;
  };
  /** Item type */
  type?: string;
  /** Frame identifier */
  frameId?: string;
  /** Glass specifications */
  specs?: string;
  /** Glass thickness */
  thickness?: number;
  /** Door flag */
  isDoor?: boolean;
}

/**
 * Addon compilation result
 */
interface AddonCompilationResult {
  /** Addon type */
  type: string;
  /** Compiled addon data */
  [key: string]: unknown;
}

/**
 * Compilation result for sash scripts
 */
interface SashCompilationResult {
  /** Compiled bar elements */
  bar: unknown[];
  /** Compiled glass elements */
  glass: GlassCompilationResult[];
  /** Compiled addon elements */
  addon: AddonCompilationResult[];
  /** Additional calculated elements (sizes, cells) */
  addition: Array<SashSize | OpenCell | ShadeSize>;
  /** Source data for addon compilation */
  addonSource: Array<SashSize | CompiledGlassItem | BarElement>;
}

/**
 * Compiler interface for script evaluation
 */
interface ICompiler {
  /**
   * Push a temporary key-value pair for script evaluation
   * @param key - Variable key name
   * @param value - Variable value
   */
  pushTmpKey(key: string, value: unknown): void;
  
  /**
   * Parse and evaluate a condition expression
   * @param condition - Condition string to evaluate
   * @returns Whether condition is met
   */
  parseCondition(condition: string): boolean;
  
  /**
   * Parse a numeric value from expression
   * @param expression - Expression to parse
   * @returns Numeric result
   */
  parseNumber(expression: string): number;
  
  /**
   * Parse numeric expression without evaluation
   * @param expression - Expression to parse
   * @returns Expression string
   */
  parseNumberExpression(expression: string): string;
}

/**
 * ICC Bar interface for retrieving bar configurations
 */
interface IICCBar {
  /**
   * Get bar configurations for sashes
   * @param sashes - Sash size array
   * @returns Bar elements
   */
  getSashCcBars(sashes: SashSize[]): BarElement[];
  
  /**
   * Get bar configurations for shades
   * @param shades - Shade size array
   * @returns Bar elements
   */
  getShadeCcBars(shades: ShadeSize[]): BarElement[];
}

/**
 * Sash script compiler component
 * Handles compilation of sash-related manufacturing scripts including bars, glasses, and addons
 */
export declare class CompileScriptSash extends CompileComponent {
  /** Bar compilation sub-component */
  protected compileBars: CompileBars;
  
  /** Glass compilation sub-component */
  protected compileGlasses: CompileGlasses;
  
  /** Addon compilation sub-component */
  protected compileAddons: CompileAddons;
  
  /** Script compiler instance */
  protected compiler: ICompiler;
  
  /** ICC bar configuration provider */
  protected iccBar: IICCBar;
  
  /**
   * Create a new sash script compiler
   * @param compiler - Script compiler instance
   * @param iccBar - ICC bar configuration provider
   * @param glassConfig - Glass configuration data
   */
  constructor(compiler: ICompiler, iccBar: IICCBar, glassConfig: unknown);
  
  /**
   * Compile all sash-related scripts
   * @param scripts - Array of script objects to compile
   * @param sashElements - Array of sash elements from structure
   * @returns Compilation result with bars, glasses, addons, and additions
   */
  compile(scripts: Script[], sashElements: SashElement[]): SashCompilationResult;
  
  /**
   * Calculate shade sizes from glass compilation results
   * @param shadeGlasses - Array of shade glass compilation results
   * @returns Array of shade sizes
   */
  protected calcShadeSize(shadeGlasses: GlassCompilationResult[]): ShadeSize[];
  
  /**
   * Load bar-specific variables into compiler context
   * @param barElement - Bar element data
   */
  loadBarVar(barElement: unknown): void;
  
  /**
   * Load glass-specific variables into compiler context
   * @param glassElement - Glass element data
   */
  loadGlassVar(glassElement: unknown): void;
  
  /**
   * Load addon-specific variables into compiler context
   * @param addonData - Addon data (sash size or glass item)
   */
  loadAddonVar(addonData: SashSize | CompiledGlassItem | BarElement): void;
  
  /**
   * Load common sash variables into compiler context
   * @param element - Sash element data
   */
  protected loadVar(element: SashElement | SashSize): void;
  
  /**
   * Process and filter bar scripts for compilation
   * @param scripts - Array of bar scripts
   * @returns Processed scripts with ignore flags set
   */
  protected handleScript(scripts: Script[]): Script[];
  
  /**
   * Process and filter size scripts for compilation
   * @param scripts - Array of size scripts
   * @returns Processed scripts with ignore flags set
   */
  protected handleSizeScript(scripts: Script[]): Script[];
  
  /**
   * Calculate opening cell (空格) dimensions from sash elements
   * @param sashElements - Array of sash elements
   * @returns Array of opening cells
   */
  protected calcOpenCell(sashElements: SashElement[]): OpenCell[];
  
  /**
   * Calculate sash sizes from elements and size scripts
   * @param sashElements - Array of sash elements
   * @param sizeScripts - Array of size calculation scripts
   * @returns Array of calculated sash sizes
   */
  protected calcSashSize(sashElements: SashElement[], sizeScripts: Script[]): SashSize[];
  
  /**
   * Get the script type identifier for sash scripts
   * @returns Script type enum value
   */
  get scriptType(): string;
  
  /**
   * Get the allowed sash CC (center-to-center) types
   * @returns Array of type identifiers
   */
  get sashCCType(): string[];
  
  /**
   * Convert push/slide direction enum to Chinese text
   * @param direction - Direction enum value
   * @returns Chinese direction text
   */
  protected pushSlideText(direction?: 'left' | 'right' | 'up' | 'down'): string;
  
  /**
   * Calculate sash weight from bars and glasses
   * @param bars - Compiled bar array
   * @param glasses - Compiled glass array
   * @param filter - Filter function for relevant items
   * @returns Calculated weight
   */
  protected sashWeight(
    bars: unknown[],
    glasses: GlassCompilationResult[],
    filter: (item: unknown) => boolean
  ): number;
  
  /**
   * Set specifications for bead bars based on glass data
   * @param bars - Bar elements
   * @param glasses - Glass compilation results
   */
  protected setSpecForBead(bars: BarElement[], glasses: GlassCompilationResult[]): void;
}