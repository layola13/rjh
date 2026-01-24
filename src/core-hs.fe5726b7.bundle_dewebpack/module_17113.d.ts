/**
 * Light layout module for different room types
 * Handles automatic light placement and post-processing based on room geometry and type
 */

import { default as HeadLightRuleVisitor } from './49327';
import { default as WindowLightRuleVisitor } from './92141';
import { RuleTypeEnum } from './96366';
import { isTemplateV3 } from './34991';

/**
 * Parameters for light layout configuration
 */
export interface LightLayoutParameter {
  /** Color temperature in Kelvin (default: 4000K) */
  temperature?: number;
  /** Render template key identifier */
  templateKey?: string;
  /** Additional custom parameters */
  [key: string]: unknown;
}

/**
 * Light data structure
 */
export interface LightData {
  /** 3D position of the light */
  position: THREE.Vector3;
  /** Type of light (Point, Spot, Directional, etc.) */
  type: HSCore.Model.LightTypeEnum;
  /** IES light profile identifier */
  ies?: string;
  /** Rule type that generated this light */
  ruleType?: RuleTypeEnum;
  /** Additional light properties */
  [key: string]: unknown;
}

/**
 * Room information interface
 */
export interface RoomInfo {
  /** Get room geometry as polygon */
  getGeometry(): THREE.Vector2[];
  /** Get light content elements in the room */
  getLightContents(): LightContentVisitable[];
  /** Additional room properties */
  [key: string]: unknown;
}

/**
 * Visitable light content interface
 */
export interface LightContentVisitable {
  /**
   * Accept visitor pattern for light generation
   * @param visitor - Visitor instance
   * @param roomInfo - Room information
   * @param parameter - Layout parameters
   * @returns Light generation result
   */
  accept(
    visitor: unknown,
    roomInfo: RoomInfo,
    parameter: LightLayoutParameter
  ): { lights: LightData[] } | null;
}

/**
 * Light neighbor relationship for post-processing
 */
interface LightNeighborGroup {
  light: LightData;
  neighbors: LightData[];
}

/**
 * Base abstract class for room light layout
 * Implements common light placement logic and post-processing
 */
declare abstract class BaseLightLayout {
  protected _roomInfo: RoomInfo | undefined;
  protected _parameter: LightLayoutParameter | undefined;

  constructor();

  /**
   * Initialize layout with room info and parameters
   * @param roomInfo - Room geometry and properties
   * @param parameter - Light layout configuration
   */
  init(roomInfo: RoomInfo, parameter?: LightLayoutParameter): void;

  /**
   * Generate light layout for the room
   * @param visitor - Visitor instance for content processing
   * @param context - Additional context data
   * @param options - Layout options
   * @returns Array of generated lights
   */
  layout(
    visitor: unknown,
    context: unknown,
    options?: LightLayoutParameter
  ): LightData[] | null;

  /**
   * Post-process step 1: Filter lights too close to walls
   * Adjusts IES profiles based on distance to geometry
   * @param lights - Input light array
   * @returns Filtered light array
   */
  protected _postProcess1(lights: LightData[]): LightData[];

  /**
   * Post-process step 2: Remove duplicate nearby spotlights
   * Keeps lights with more neighbors and better IES profiles
   * @param lights - Input light array
   * @returns Deduplicated light array
   */
  protected _postProcess2(lights: LightData[]): LightData[];

  /**
   * Post-process step 3: Filter head lights near spotlights (V3 templates only)
   * Removes redundant ambient lights in realistic/general render modes
   * @param lights - Input light array
   * @returns Filtered light array
   */
  protected _postProcess3(lights: LightData[]): LightData[];
}

/**
 * Default light layout for generic rooms
 */
declare class DefaultLightLayout extends BaseLightLayout {}

/**
 * Light layout for bedrooms
 * Includes master, secondary, kids, elderly, and nanny rooms
 */
declare class BedroomLightLayout extends BaseLightLayout {}

/**
 * Light layout for living rooms
 */
declare class LivingRoomLightLayout extends BaseLightLayout {}

/**
 * Light layout for dining rooms
 */
declare class DiningRoomLightLayout extends BaseLightLayout {}

/**
 * Light layout for combined living-dining rooms
 */
declare class LivingDiningRoomLightLayout extends BaseLightLayout {}

/**
 * Light layout for bathrooms
 */
declare class BathroomLightLayout extends BaseLightLayout {}

/**
 * Light layout for kitchens
 * Uses simplified head light rule for non-V3 templates
 */
declare class KitchenLightLayout extends BaseLightLayout {
  /**
   * Kitchen-specific layout with conditional V3 template handling
   * @param visitor - Visitor instance
   * @param context - Context data
   * @param options - Layout options
   * @returns Generated lights or null
   */
  layout(
    visitor: unknown,
    context: unknown,
    options?: LightLayoutParameter
  ): LightData[] | null;
}

/**
 * Factory class for creating room-specific light layouts
 */
export default class LightLayoutFactory {
  /**
   * Create appropriate light layout instance based on room type
   * @param roomType - Type of room from HSCore.Model.RoomTypeEnum
   * @returns Concrete light layout instance
   * 
   * @example
   *