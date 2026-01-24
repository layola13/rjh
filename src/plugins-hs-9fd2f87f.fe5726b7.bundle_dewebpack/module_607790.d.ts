/**
 * Cabinet Service Plugin - Type Definitions
 * Provides comprehensive cabinet creation, styling, and accessory placement functionality
 */

import type { IPlugin } from 'HSApp.Plugin';
import type { Room } from 'HSApp.Room';
import type { Design } from 'HSApp.Design';
import type { Cabinet, CabinetStyle, CabinetStyleMap } from 'HSApp.Cabinet';

/**
 * Cabinet type enumeration
 */
export enum CabinetType {
  Base = 'base',
  Wall = 'wall',
  Tall = 'tall',
  Corner = 'corner',
  Island = 'island',
}

/**
 * Detailed cabinet type enumeration
 */
export enum CabinetDetailType {
  Standard = 'standard',
  Drawer = 'drawer',
  Sink = 'sink',
  Oven = 'oven',
  Refrigerator = 'refrigerator',
  Dishwasher = 'dishwasher',
}

/**
 * Cabinet creation parameters by type and size
 */
export interface CabinetCreationParams {
  type: CabinetType;
  width: number;
  height: number;
  depth: number;
  position?: { x: number; y: number; z: number };
  rotation?: number;
  style?: CabinetStyle;
}

/**
 * Cabinet creation parameters by detail type
 */
export interface CabinetDetailCreationParams {
  detailType: CabinetDetailType;
  width: number;
  height: number;
  depth: number;
  position?: { x: number; y: number; z: number };
  style?: CabinetStyle;
}

/**
 * Countertop creation parameters
 */
export interface CountertopParams {
  cabinets: Cabinet[];
  thickness?: number;
  overhang?: number;
  material?: string;
}

/**
 * Toekick creation parameters
 */
export interface ToekickParams {
  cabinets: Cabinet[];
  height?: number;
  depth?: number;
  material?: string;
}

/**
 * Topline/Crown molding creation parameters
 */
export interface ToplineParams {
  cabinets: Cabinet[];
  height?: number;
  profile?: string;
  material?: string;
}

/**
 * Light rail/strip creation parameters
 */
export interface LightlineParams {
  cabinets: Cabinet[];
  type?: 'rail' | 'strip';
  brightness?: number;
  color?: string;
}

/**
 * Accessory placement options
 */
export interface AccessoryPlacementOptions {
  /** Target room for accessory placement. If undefined, uses all applicable rooms */
  targetRoom?: Room;
  /** Whether to force placement even if space is occupied */
  forcePlace?: boolean;
  /** Whether to automatically adjust accessories for optimal fit */
  autoAdjust?: boolean;
}

/**
 * Grid adjustment parameters for interior organization
 */
export interface GridAdjustmentParams {
  cabinet: Cabinet;
  rows?: number;
  columns?: number;
  spacing?: number;
}

/**
 * Rod adjustment parameters for hanging storage
 */
export interface RodAdjustmentParams {
  cabinet: Cabinet;
  height?: number;
  type?: 'single' | 'double';
  material?: string;
}

/**
 * Cabinet style serialization result
 */
export interface CabinetStylePlain {
  doorStyle: string;
  drawerStyle: string;
  handleStyle: string;
  material: string;
  finish: string;
  color: string;
}

/**
 * Customized Cabinet Service Plugin
 * Provides comprehensive functionality for creating, styling, and managing cabinets,
 * countertops, accessories, and related components in kitchen and wardrobe designs.
 */
export declare class CustomizedCabinetServicePlugin extends IPlugin {
  /**
   * Plugin metadata
   */
  readonly name: 'Customized Cabinet Service plugin';
  readonly description: 'Customized Cabinet Service Plugin';
  readonly dependencies: string[];

  /**
   * Currently active room context for cabinet operations
   */
  activeRoom: Room | undefined;

  /**
   * Internal handler for plugin operations
   * @internal
   */
  private handler: unknown;

  /**
   * Called when plugin is activated
   * @param appContext - Application context
   * @param config - Plugin configuration
   */
  onActive(appContext: unknown, config: unknown): void;

  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Creates a cabinet by specifying type and dimensions
   * @param type - Cabinet type (base, wall, tall, etc.)
   * @param width - Cabinet width in units
   * @param height - Cabinet height in units
   * @param depth - Cabinet depth in units
   * @param position - 3D position coordinates
   * @param rotation - Rotation angle in degrees
   * @param style - Cabinet style configuration
   * @returns Created cabinet instance
   */
  createCabinetByTypeAndSize(
    type: CabinetType,
    width: number,
    height: number,
    depth: number,
    position?: { x: number; y: number; z: number },
    rotation?: number,
    style?: CabinetStyle
  ): Cabinet;

  /**
   * Creates a cabinet by specifying detailed type (e.g., sink base, oven cabinet)
   * @param detailType - Detailed cabinet type
   * @param width - Cabinet width in units
   * @param height - Cabinet height in units
   * @param depth - Cabinet depth in units
   * @param position - 3D position coordinates
   * @param style - Cabinet style configuration
   * @returns Created cabinet instance
   */
  createCabinetByDetailType(
    detailType: CabinetDetailType,
    width: number,
    height: number,
    depth: number,
    position?: { x: number; y: number; z: number },
    style?: CabinetStyle
  ): Cabinet;

  /**
   * Creates a countertop surface over specified cabinets
   * @param params - Countertop parameters (cabinets, thickness, overhang, material)
   * @param room - Target room (defaults to activeRoom)
   * @returns Created countertop instance
   */
  createCountertop(params: CountertopParams, room?: Room): unknown;

  /**
   * Generates toekick/base trim for specified cabinets
   * @param params - Toekick parameters (cabinets, height, depth, material)
   * @param room - Target room (defaults to activeRoom)
   * @returns Created toekick instance
   */
  createToekick(params: ToekickParams, room?: Room): unknown;

  /**
   * Creates a wrapped toekick that automatically follows cabinet layout
   * @param cabinets - Array of cabinets to wrap
   * @returns Created wrap toekick instance
   */
  createWrapToekick(cabinets: Cabinet[]): unknown;

  /**
   * Creates topline/crown molding for specified cabinets
   * @param params - Topline parameters (cabinets, height, profile, material)
   * @param room - Target room (defaults to activeRoom)
   * @returns Created topline instance
   */
  createTopline(params: ToplineParams, room?: Room): unknown;

  /**
   * Creates light rail or LED strip under cabinets
   * @param params - Lightline parameters (cabinets, type, brightness, color)
   * @param type - Light type (rail or strip)
   * @param brightness - Light brightness level
   * @returns Created lightline instance
   */
  createLightline(params: LightlineParams, type?: string, brightness?: number): unknown;

  /**
   * Loads cabinet style configuration from a design file
   * @param design - Source design instance
   * @param styleId - Style identifier to load
   * @returns Loaded cabinet style
   */
  loadStyleFromDesign(design: Design, styleId: string): Promise<CabinetStyle>;

  /**
   * Loads a cabinet style by style identifier
   * @param styleId - Style identifier
   * @returns Loaded cabinet style
   */
  loadCabinetStyle(styleId: string): Promise<CabinetStyle>;

  /**
   * Loads the default cabinet style
   * @returns Default cabinet style
   */
  loadDefaultStyle(): Promise<CabinetStyle>;

  /**
   * Returns the CabinetType enumeration
   * @returns CabinetType enum
   */
  cabinetType(): typeof CabinetType;

  /**
   * Returns the CabinetDetailType enumeration
   * @returns CabinetDetailType enum
   */
  cabinetDetailType(): typeof CabinetDetailType;

  /**
   * Returns the grid adjustment function for interior organization
   * @returns Grid adjustment function
   */
  adjustGrid(): (params: GridAdjustmentParams) => void;

  /**
   * Returns the rod adjustment function for hanging storage
   * @returns Rod adjustment function
   */
  adjustRod(): (params: RodAdjustmentParams) => void;

  /**
   * Serializes cabinet style to plain object format
   * @param style - Cabinet style to serialize
   * @returns Plain object representation of style
   */
  getCabinetStyleToPlain(style: CabinetStyle): CabinetStylePlain;

  /**
   * Collects and maps all cabinet styles in a design
   * @param design - Design instance to analyze
   * @returns Map of style IDs to style metadata
   */
  collectCabinetStylesMap(design: Design): CabinetStyleMap;

  /**
   * Places accessories (handles, knobs, hinges) in kitchen cabinets
   * @param targetRoom - Target room (defaults to all kitchen rooms)
   * @param forcePlace - Force placement even if space occupied (default: false)
   * @param autoAdjust - Auto-adjust for optimal fit (default: true)
   * @returns Promise that resolves when placement is complete
   */
  placeAccessoriesInKitchen(
    targetRoom?: Room,
    forcePlace?: boolean,
    autoAdjust?: boolean
  ): Promise<void>;

  /**
   * Places accessories (rods, hooks, organizers) in wardrobe cabinets
   * @param targetRoom - Target room (defaults to all wardrobe rooms)
   * @param forcePlace - Force placement even if space occupied (default: true)
   * @param autoAdjust - Auto-adjust for optimal fit (default: true)
   * @returns Promise that resolves when placement is complete
   */
  placeAccessoriesInWardrobes(
    targetRoom?: Room,
    forcePlace?: boolean,
    autoAdjust?: boolean
  ): Promise<void>;

  /**
   * Places accessories in specified cabinets with full control
   * @param cabinets - Array of cabinets to place accessories in
   * @returns Promise that resolves when placement is complete
   */
  placeAccessoriesInCabinets(cabinets: Cabinet[]): Promise<void>;

  /**
   * Refreshes thumbnail images for product assemblies
   * @param assembly - Product assembly to refresh
   * @returns Promise that resolves when thumbnail is updated
   */
  refreshPAssemblyThumbnail(assembly: unknown): Promise<void>;

  /**
   * Retrieves handles placed on top doors/drawers
   * @returns Array of handle instances on top doors
   */
  getHandleOnTopDoors(): unknown[];

  /**
   * Retrieves handles placed on bottom doors/drawers
   * @returns Array of handle instances on bottom doors
   */
  getHandleOnBottomDoors(): unknown[];
}

/**
 * Plugin registration with HSApp framework
 */
declare module 'HSApp.Plugin' {
  interface PluginRegistry {
    'hsw.plugin.customizedcabinetservice.Plugin': typeof CustomizedCabinetServicePlugin;
  }
}

export default CustomizedCabinetServicePlugin;