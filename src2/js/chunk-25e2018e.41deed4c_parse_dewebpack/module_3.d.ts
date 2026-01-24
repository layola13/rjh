/**
 * Compiler component interface for addon processing
 */
interface ICompiler {
  /**
   * Parses a condition expression and returns the evaluation result
   * @param condition - The condition string to parse
   * @returns The boolean result of the condition evaluation
   */
  parseCondition(condition: string): boolean;

  /**
   * Parses a string expression and returns the evaluated result
   * @param expression - The string expression to parse
   * @returns The parsed string value
   */
  parseString(expression: string): string;

  /**
   * Parses a numeric expression and returns the numeric value
   * @param expression - The numeric expression to parse
   * @returns The parsed numeric value
   */
  parseNumber(expression: string): number;

  /**
   * Parses a numeric expression and returns the expression representation
   * @param expression - The numeric expression to parse
   * @returns The expression string representation
   */
  parseNumberExpression(expression: string): string;
}

/**
 * Component interface for addon compilation
 */
interface IComp {
  /** Compiler instance for expression parsing */
  compiler: ICompiler;

  /**
   * Loads addon variables into the compilation context
   * @param area - The area object containing addon variables
   */
  loadAddonVar(area: IArea): void;
}

/**
 * Script type definition - can be either 'frame' or 'sash'
 */
type ScriptType = 'frame' | 'sash';

/**
 * Addon script definition with compilation properties
 */
interface IAddonScript {
  /** Unique identifier for the addon script */
  id: string | number;

  /** Addon type identifier */
  type: AddonCCType;

  /** Script type classification */
  script_type?: ScriptType;

  /** Display name of the addon */
  name?: string;

  /** Addon code identifier */
  code?: string;

  /** BOM (Bill of Materials) code */
  bom_code?: string;

  /** Condition expression for addon application */
  condition: string;

  /** Quantity count expression */
  count: string;

  /** Length expression */
  length: string;

  /** Sash number for sash-specific addons */
  sashNumber?: number;

  /** Compiled result total (internal use during compilation) */
  compiledResult?: number;

  /** Array of compiled count values (internal use during compilation) */
  compiledCounts?: number[];

  /** Array of compiled count expressions (internal use during compilation) */
  compiledCountExpressions?: string[];

  /** Array of compiled length values (internal use during compilation) */
  compiledLengths?: number[];

  /** Array of compiled length expressions (internal use during compilation) */
  compiledLengthExpressions?: string[];
}

/**
 * Compiled addon result after processing
 */
interface ICompiledAddon {
  /** Unique identifier for the addon script */
  id: string | number;

  /** Addon type identifier */
  type: AddonCCType;

  /** Script type classification */
  script_type?: ScriptType;

  /** Display name of the addon */
  name?: string;

  /** Addon code identifier */
  code?: string;

  /** BOM (Bill of Materials) code */
  bom_code?: string;

  /** Condition expression for addon application */
  condition: string;

  /** Compiled count value */
  count: number;

  /** Count expression string */
  countExpression: string;

  /** Compiled length value */
  length: number;

  /** Length expression string */
  lengthExpression: string;

  /** Sash number for sash-specific addons */
  sashNumber?: number;
}

/**
 * Area definition where addons can be applied
 */
interface IArea {
  /** Area type identifier */
  type: string;

  /** Sash number for sash-specific areas */
  sashNumber?: number;

  /** Display name of the area */
  name?: string;

  /** Area code identifier */
  code?: string;

  /** BOM code for the area */
  bom_code?: string;
}

/**
 * Grouped script with associated areas
 */
interface IScriptGroup {
  /** The addon script definition */
  script: IAddonScript;

  /** Areas where this script applies */
  areas: IArea[];
}

/**
 * Addon component type enumeration
 */
export enum AddonCCType {
  holeAddon = 'holeAddon',
  frameConnectAddon = 'frameConnectAddon',
  connectorAddon = 'connectorAddon',
  cornerJoinerAddon = 'cornerJoinerAddon',
  frameAddon = 'frameAddon',
  fixedTurningFrameAddon = 'fixedTurningFrameAddon',
  sashTurningFrameAddon = 'sashTurningFrameAddon',
  mullionAddon = 'mullionAddon',
  sashAddon = 'sashAddon',
  shadeSashAddon = 'shadeSashAddon',
  screenAddon = 'screenAddon',
  panelAddon = 'panelAddon',
  glassAddon = 'glassAddon',
  doubleSashAddon = 'doubleSashAddon',
  slideAddon = 'slideAddon',
  pushHandleAddon = 'pushHandleAddon',
  slideLockAddon = 'slideLockAddon',
  slideCollisionAddon = 'slideCollisionAddon',
  slideCollisionLeftAddon = 'slideCollisionLeftAddon',
  slideCollisionRightAddon = 'slideCollisionRightAddon',
  slideEdgeAddon = 'slideEdgeAddon',
  slideSingleAddon = 'slideSingleAddon',
  slideDoubleAddon = 'slideDoubleAddon',
  slideUpAddon = 'slideUpAddon',
  slideDownAddon = 'slideDownAddon',
  foldAddon = 'foldAddon',
  theftAddon = 'theftAddon'
}

/**
 * Addon compilation service
 * Processes addon scripts and applies them to designated areas
 */
export declare class CompileAddons {
  /** Component instance providing compilation context */
  private readonly comp: IComp;

  /**
   * Creates a new CompileAddons instance
   * @param comp - The component providing compilation context
   */
  constructor(comp: IComp);

  /**
   * Compiles addon scripts for specified areas
   * @param scripts - Array of addon scripts to compile
   * @param areas - Array of areas where addons can be applied
   * @returns Array of compiled addon results
   */
  compile(scripts: IAddonScript[], areas: IArea[]): ICompiledAddon[];

  /**
   * Groups scripts by code name and matches them with applicable areas
   * @param scripts - Array of addon scripts
   * @param areas - Array of areas
   * @returns Array of script groups with their associated areas
   */
  private groupScriptByCodeName(scripts: IAddonScript[], areas: IArea[]): IScriptGroup[];

  /**
   * Compiles a single addon script for a specific area
   * @param script - The addon script to compile
   * @param area - The target area
   */
  private compileAddon(script: IAddonScript, area: IArea): void;

  /**
   * Extracts compiled results from an addon script
   * @param script - The compiled addon script
   * @returns Array of compiled addon results
   */
  private fetchCompiledResult(script: IAddonScript): ICompiledAddon[];

  /**
   * Checks if an addon script matches a specific area
   * @param script - The addon script
   * @param area - The target area
   * @returns True if the script applies to the area, false otherwise
   */
  private matchArea(script: IAddonScript, area: IArea): boolean;

  /**
   * Converts addon type to area type string
   * @param script - The addon script
   * @returns The corresponding area type string
   */
  private toAreaType(script: IAddonScript): string;
}