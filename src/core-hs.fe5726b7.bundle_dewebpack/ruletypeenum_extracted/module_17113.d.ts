/**
 * Light layout module for different room types
 * Handles automatic light placement and post-processing based on room geometry and type
 */

import HeadLightRule from './head-light-rule';
import WindowLightRule from './window-light-rule';
import { RuleTypeEnum } from './rule-type-enum';
import { isTemplateV3 } from './template-utils';

/**
 * Light data structure returned by layout calculations
 */
interface LightData {
  /** 3D position of the light */
  position: THREE.Vector3;
  /** Type of light (SpotLight, PointLight, etc.) */
  type: HSCore.Model.LightTypeEnum;
  /** IES profile identifier for spot lights */
  ies?: string;
  /** Rule that generated this light */
  ruleType?: RuleTypeEnum;
  /** Additional light properties */
  [key: string]: unknown;
}

/**
 * Parameters for light layout calculation
 */
interface LayoutParameter {
  /** Color temperature in Kelvin (default: 4000K) */
  temperature?: number;
  /** Rendering template key (e.g., REALISTIC, GENERAL) */
  templateKey?: string;
  /** Additional layout parameters */
  [key: string]: unknown;
}

/**
 * Room information interface
 */
interface RoomInfo {
  /** Get room geometry as 2D polygon */
  getGeometry(): THREE.Vector2[];
  /** Get light content elements in the room */
  getLightContents(): LightContent[];
  /** Additional room properties */
  [key: string]: unknown;
}

/**
 * Light content visitor interface
 */
interface LightContent {
  /** Accept visitor pattern for light generation */
  accept(
    visitor: unknown,
    roomInfo: RoomInfo,
    parameter: LayoutParameter
  ): { lights: LightData[] } | null;
}

/**
 * Neighbor relationship for light clustering
 */
interface LightNeighbor {
  /** The light being analyzed */
  light: LightData;
  /** Nearby lights within threshold distance */
  neighbors: LightData[];
}

/**
 * Base class for room-specific light layout strategies
 */
declare abstract class BaseLightLayout {
  protected _roomInfo?: RoomInfo;
  protected _parameter?: LayoutParameter;

  /**
   * Initialize the layout engine with room data
   * @param roomInfo - Room geometry and metadata
   * @param parameter - Layout parameters (temperature, template, etc.)
   */
  init(roomInfo: RoomInfo, parameter?: Partial<LayoutParameter>): void;

  /**
   * Calculate light positions for the room
   * @param visitor - Visitor for content-based lights
   * @param context - Execution context
   * @param options - Additional layout options
   * @returns Array of light data or null if room info missing
   */
  layout(
    visitor: unknown,
    context: unknown,
    options?: LayoutParameter
  ): LightData[] | null;

  /**
   * Post-process step 1: Filter lights too close to walls
   * Adjusts IES profiles for spot lights near room boundaries
   * @param lights - Raw light data
   * @returns Filtered light array
   */
  protected _postProcess1(lights: LightData[]): LightData[];

  /**
   * Post-process step 2: Remove redundant clustered lights
   * Keeps one light per cluster to avoid over-illumination
   * @param lights - Light data from step 1
   * @returns Deduplicated light array
   */
  protected _postProcess2(lights: LightData[]): LightData[];

  /**
   * Post-process step 3: Remove head lights near spot lights (V3 templates only)
   * Prevents double-lighting in realistic/general render modes
   * @param lights - Light data from step 2
   * @returns Final optimized light array
   */
  protected _postProcess3(lights: LightData[]): LightData[];
}

/**
 * Default layout for unspecified room types
 */
declare class DefaultRoomLayout extends BaseLightLayout {}

/**
 * Layout strategy for bedrooms (master, secondary, kids, elderly, nanny)
 */
declare class BedroomLayout extends BaseLightLayout {}

/**
 * Layout strategy for living rooms
 */
declare class LivingRoomLayout extends BaseLightLayout {}

/**
 * Layout strategy for dining rooms
 */
declare class DiningRoomLayout extends BaseLightLayout {}

/**
 * Layout strategy for combined living-dining spaces
 */
declare class LivingDiningRoomLayout extends BaseLightLayout {}

/**
 * Layout strategy for bathrooms (master, secondary)
 */
declare class BathroomLayout extends BaseLightLayout {}

/**
 * Layout strategy for kitchens
 * Uses simplified head lights for non-V3 templates
 */
declare class KitchenLayout extends BaseLightLayout {
  /**
   * Kitchen-specific layout with fallback to head lights only
   * @param visitor - Visitor for content-based lights
   * @param context - Execution context
   * @param options - Layout options
   * @returns Light array (head lights only for legacy templates)
   */
  layout(
    visitor: unknown,
    context: unknown,
    options?: LayoutParameter
  ): LightData[] | null;
}

/**
 * Factory for creating room-specific light layout strategies
 */
export default class LightLayoutFactory {
  /**
   * Create appropriate layout strategy based on room type
   * @param roomType - Enum value from HSCore.Model.RoomTypeEnum
   * @returns Layout instance for the specified room type
   * 
   * @example
   * const layout = LightLayoutFactory.createLayoutByType(
   *   HSCore.Model.RoomTypeEnum.Bedroom
   * );
   * layout.init(roomInfo, { temperature: 3000 });
   * const lights = layout.layout(visitor, context);
   */
  static createLayoutByType(roomType: HSCore.Model.RoomTypeEnum): BaseLightLayout;
}