/**
 * 3D rendering light computation module for L-shaped furniture (armoires)
 * Calculates optimal light positions based on room dimensions and rendering templates
 */

import type { Vector2, Vector3 } from 'three';

/**
 * Direction vector type for positioning lights symmetrically
 */
type DirectionVectorKey = 'leftForwardVec' | 'rightForwardVec' | 'frontForwardVec' | 'backForwardVec';

/**
 * Light configuration object returned by light computation methods
 */
interface LightConfiguration {
  /** 3D position of the light source */
  position: {
    x: number;
    y: number;
    z: number;
  };
  /** Light intensity value */
  intensity: number;
  /** Color temperature in Kelvin */
  temperature: number;
  /** IES light profile identifier */
  ies: string | number;
}

/**
 * Furniture element with spatial properties
 */
interface FurnitureElement {
  /** Get the position of the furniture in 3D space */
  getPosition(): Vector3;
  /** Get the dimensions of the furniture */
  getSize(): { x: number; y: number; z: number };
  /** Forward direction vector */
  frontForwardVec: Vector2;
  /** Backward direction vector */
  backForwardVec: Vector2;
  /** Left direction vector */
  leftForwardVec: Vector2;
  /** Right direction vector */
  rightForwardVec: Vector2;
  [key: string]: any;
}

/**
 * Room/space configuration
 */
interface SpaceConfiguration {
  /** Check if the ceiling face is hidden from view */
  isCeilingFaceHidden(): boolean;
  /** Get the height of the ceiling */
  getCeilingHeight(): number;
}

/**
 * Rendering template configuration
 */
interface RenderTemplate {
  /** Unique identifier for the rendering template */
  templateKey: string;
}

/**
 * Base light computation class (imported from module 42288)
 */
declare class BaseLightComputer {
  /** Get default light configuration for a furniture element */
  protected getDefaultLight(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate
  ): LightConfiguration;
}

/**
 * Position and direction information for symmetric light placement
 */
interface SymmetricLightPosition {
  /** Starting position vector */
  pos: Vector2;
  /** Direction vector key for iteration */
  direction: DirectionVectorKey;
}

/**
 * Light computer specialized for L-shaped armoires
 * Computes optimal light positions based on furniture dimensions and rendering templates
 */
export default class LShapedArmoireLightComputer extends BaseLightComputer {
  /** Offset distance from furniture edge for light placement (in meters) */
  static readonly offset: number = 0.2;
  
  /** Furniture type identifier */
  static readonly lShape: string = 'armoire - L shaped';
  
  /** Width threshold for L-shaped furniture classification (in meters) */
  static readonly lwidth: number = 0.8;

  /**
   * Main computation method that calculates light positions for L-shaped furniture
   * @param element - The furniture element to compute lights for
   * @param space - The space/room configuration
   * @param template - The rendering template configuration
   * @param lightOptions - Additional light options (unused in implementation)
   * @returns Array of light configurations or empty array if no lights needed
   */
  protected _compute(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate,
    lightOptions?: unknown
  ): LightConfiguration[];

  /**
   * Single light case for small furniture (width < 2m)
   * Places one light at the center-front of the furniture
   */
  private _oneLightCase(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate,
    intensity: number,
    temperature: number,
    ies: string | number
  ): LightConfiguration[];

  /**
   * Two symmetric lights for furniture 2m to 2.5m wide
   * Places lights symmetrically on left and right sides
   */
  private _twoLights2to2Point5(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate,
    intensity: number,
    temperature: number,
    ies: string | number
  ): LightConfiguration[];

  /**
   * Two symmetric lights for furniture 2.5m to 3m wide
   * Uses fixed 0.75m offset from center
   */
  private _twoLights2Point5to3(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate,
    intensity: number,
    temperature: number,
    ies: string | number
  ): LightConfiguration[];

  /**
   * Multiple lights for large furniture (width > 3m)
   * Combines base two lights with additional symmetric lights along the width
   */
  private _manyLightsLargerThan3(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate,
    intensity: number,
    temperature: number,
    ies: string | number
  ): LightConfiguration[];

  /**
   * Single light for L-shaped furniture (standard placement)
   * Places light at front edge with offset
   */
  private _oneLight4L(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate,
    intensity: number,
    temperature: number,
    ies: string | number
  ): LightConfiguration[];

  /**
   * Single light for small L-shaped furniture (1m-1.2m in both dimensions)
   * Places light diagonally offset from center
   */
  private _oneLight4SmallL(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate,
    intensity: number,
    temperature: number,
    ies: string | number
  ): LightConfiguration[];

  /**
   * Multiple lights for larger L-shaped furniture (depth > 1.5m)
   * Distributes lights along the back edge and adds symmetric lights
   */
  private _manyLights4L(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate,
    intensity: number,
    temperature: number,
    ies: string | number
  ): LightConfiguration[];

  /**
   * Helper method to create two symmetric lights
   * @param leftOffset - Distance from center to left/right lights
   * @param frontOffset - Distance from furniture position toward front
   */
  private _twoSymmetricLights(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate,
    leftOffset: number,
    frontOffset: number,
    intensity: number,
    temperature: number,
    ies: string | number
  ): LightConfiguration[];

  /**
   * Helper method to create multiple symmetric lights along a direction
   * @param leftPosition - Starting position and direction for left side lights
   * @param rightPosition - Starting position and direction for right side lights
   * @param count - Number of light pairs to create
   */
  private _manySymmetricLights(
    element: FurnitureElement,
    space: SpaceConfiguration,
    template: RenderTemplate,
    leftPosition: SymmetricLightPosition,
    rightPosition: SymmetricLightPosition,
    count: number,
    intensity: number,
    temperature: number,
    ies: string | number
  ): LightConfiguration[];
}

/**
 * Global constants namespace for rendering
 */
declare namespace HSConstants {
  namespace Render {
    /** V3 realistic rendering template */
    const TEMPLATE_NAME_V3: {
      REALISTIC: string;
      GENERAL: string;
      CHILLY_3: string;
      NATURE_3: string;
      NIGHT: string;
    };
  }
  
  namespace RenderLight {
    /** Safety multiplier for ceiling height checks */
    const SAFE_HEIGHT_SCALE: number;
  }
}