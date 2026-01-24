/**
 * SVG graphics components for floor plan rendering
 * Includes logo, compass, and entry indicators
 */

import { SvgBase } from './SvgBase';
import { HSCore } from './HSCore';
import * as GeLib from './GeLib';

/**
 * Position and direction information for entry placement
 */
interface EntryPosition {
  /** Position point in canvas coordinates */
  pos: THREE.Vector3;
  /** Direction vector for entry indicator orientation */
  dir: THREE.Vector3;
}

/**
 * Page layout settings
 */
interface PageSetting {
  /** Logo configuration */
  logo: {
    /** Logo image source URL or texture key */
    src?: string;
    /** Logo width in pixels */
    sizeWidth: number;
    /** Logo height in pixels */
    sizeHeight: number;
  };
  /** Compass rose configuration */
  compass: {
    /** Compass width in pixels */
    sizeWidth: number;
    /** Compass height in pixels */
    sizeHeight: number;
  };
  /** Door/entry configuration */
  door: {
    /** Entry indicator width */
    entryWidth: number;
    /** Entry indicator height */
    entryHeight: number;
  };
  /** Total canvas width */
  fullWidth: number;
  /** Total canvas height */
  fullHeight: number;
  /** Floor plan margin/padding */
  floorplanSpan: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

/**
 * Texture resource descriptor
 */
interface TextureResource {
  /** Texture data URL */
  url: string;
  /** Texture width */
  width: number;
  /** Texture height */
  height: number;
}

/**
 * SVG logo component with watermark support
 * Renders company logo or watermark in the floor plan corner
 */
export declare class SvgLogo extends SvgBase {
  private _node?: SVGGElement;
  private _watermarkTexture?: string;

  constructor(context: unknown, options: unknown);

  /**
   * Initializes logo with optional watermark texture
   * Checks user benefits and loads watermark if available
   * @returns Promise resolving when initialization completes
   */
  initialized(): Promise<string | undefined>;

  /**
   * Creates the SVG group element for logo rendering
   */
  build(): void;

  /**
   * Renders the logo image at calculated position
   * Scales logo proportionally to fit configured dimensions
   */
  draw(): void;
}

/**
 * SVG compass rose component
 * Renders directional indicator in floor plan corner
 */
export declare class SvgCompass extends SvgBase {
  private _node?: SVGGElement;

  constructor(...args: unknown[]);

  /**
   * Initializes compass component
   * @returns Promise resolving immediately (no async work)
   */
  initialized(): Promise<undefined>;

  /**
   * Creates the SVG group element for compass rendering
   */
  build(): void;

  /**
   * Renders the compass image at calculated position
   * Places compass in bottom-left corner of floor plan
   */
  draw(): void;
}

/**
 * Entry indicator component
 * Renders "Entry" text label at detected entrance doors
 */
export declare class SvgEntry extends SvgBase {
  protected lang: string;
  protected _node?: SVGGElement;
  protected _data?: string;
  protected _doors?: EntryPosition[];

  /**
   * @param context - Rendering context
   * @param options - Component options
   * @param lang - Language code for entry text ("en_US" or "zh_CN")
   */
  constructor(context: unknown, options: unknown, lang?: string);

  /**
   * Builds the entry indicator
   * Generates SVG markup and finds entrance doors
   */
  build(): void;

  /**
   * Renders entry indicators at detected door positions
   * Scales and positions entry text based on door geometry
   */
  draw(): void;

  /**
   * Calculates offset position from base point
   * @param basePoint - Starting position
   * @param direction - Direction vector
   * @param distance - Offset distance
   * @returns Offset position
   */
  protected _offset(
    basePoint: THREE.Vector3,
    direction: THREE.Vector3,
    distance: number
  ): THREE.Vector3;

  /**
   * Calculates entry indicator position for a door
   * @param door - Door model element
   * @param offsetX - Horizontal offset adjustment
   * @param offsetY - Vertical offset adjustment
   * @returns Calculated position or null if invalid
   */
  protected _calcPos(
    door: HSCore.Model.Door,
    offsetX: number,
    offsetY: number
  ): THREE.Vector3 | null;

  /**
   * Determines if door opens outward relative to host wall
   * @param wall - Host wall element
   * @param wallSegment - Wall segment containing door
   * @param door - Door element
   * @returns True if door opens outward
   */
  protected _isOuter(
    wall: HSCore.Model.Wall,
    wallSegment: unknown,
    door: HSCore.Model.Door
  ): boolean;

  /**
   * Tests if two geometric loops intersect
   * @param loop1 - First geometric loop
   * @param loop2 - Second geometric loop
   * @returns True if loops intersect or overlap
   */
  protected _loopLoopIntersect(
    loop1: GeLib.Loop,
    loop2: GeLib.Loop
  ): boolean;

  /**
   * Adjusts door loop with offset for intersection testing
   * @param loop - Original door loop
   * @returns Offset loop or undefined if adjustment fails
   */
  protected _adjustDoorLoop(loop: GeLib.Loop): GeLib.Loop | undefined;

  /**
   * Finds all entry doors intersecting building exterior
   * @returns Array of entry positions with direction vectors
   */
  protected _findEntryByGeo(): EntryPosition[];

  /**
   * Calculates entry text position and orientation for a door
   * @param door - Door element
   * @returns Position and direction for entry indicator
   */
  protected _calcEntryTextPos(door: HSCore.Model.Door): EntryPosition;

  /**
   * Finds primary entry door (fallback method)
   * Selects door on wall with only one adjacent room
   * @returns Entry door or null if not found
   */
  protected _findEntry(): HSCore.Model.Door | null;

  /**
   * Generates SVG markup for entry text
   * Returns localized "Entry" text in Chinese or English
   * @returns SVG path markup string
   */
  protected _svg(): string;
}

/**
 * Empty entry indicator variant
 * Disables automatic entry detection
 */
export declare class SvgEmptyEntry extends SvgEntry {
  /**
   * Overrides entry detection to return nothing
   * @returns undefined
   */
  protected _findEntry(): undefined;
}