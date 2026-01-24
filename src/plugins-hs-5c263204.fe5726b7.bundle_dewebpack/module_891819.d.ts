/**
 * Light content lift module for 3D scene manipulation
 * Provides controllers for light and light target positioning
 */

import { ContentLift, ContentLiftController } from './ContentLift';

/**
 * Context for light selection mode
 */
interface ActiveContext {
  /** Whether to select light target position instead of light position */
  selectLightTarget: boolean;
}

/**
 * Light entity data structure
 */
interface LightEntity {
  /** Light X coordinate */
  x: number;
  /** Light Y coordinate */
  y: number;
  /** Light Z coordinate */
  z: number;
  /** Light target X coordinate */
  XTarget: number;
  /** Light target Y coordinate */
  YTarget: number;
  /** Light target Z coordinate */
  ZTarget: number;
}

/**
 * Light content data structure
 */
interface LightContent extends LightEntity {
  // Extends all properties from LightEntity
}

/**
 * Extended ContentLift class for light manipulation
 * Handles both light position and light target position based on context
 */
export default class LightContentLift extends ContentLift {
  /** Current content being manipulated */
  content: LightContent;
  
  /** Active selection context */
  activeContext: ActiveContext;

  /**
   * Creates a new LightContentLift instance
   * @param param0 - First parameter
   * @param param1 - Second parameter
   * @param param2 - Entity data
   * @param param3 - Fourth parameter
   * @param param4 - Fifth parameter
   * @param param5 - Controller instance (optional, will be auto-created)
   * @param param6 - Seventh parameter
   * @param param7 - Eighth parameter
   */
  constructor(
    param0: unknown,
    param1: unknown,
    param2: LightEntity,
    param3: unknown,
    param4: unknown,
    param5?: LightContentLiftController,
    param6?: unknown,
    param7?: unknown
  );

  /**
   * Gets the current content position as a Three.js Vector3
   * Returns either light target position or light position based on active context
   */
  get contentPosition(): THREE.Vector3;
}

/**
 * Controller for LightContentLift
 * Manages the interaction and state of light content manipulation
 */
declare class LightContentLiftController extends ContentLiftController {
  /** The light entity being controlled */
  entity: LightEntity;
  
  /** Active selection context */
  activeContext: ActiveContext;

  /**
   * Creates a new LightContentLiftController instance
   * @param entity - Light entity data
   * @param param1 - Second parameter
   * @param controller - Optional existing controller (LightController or LightTargetController)
   * @param param3 - Fourth parameter
   * @param param4 - Fifth parameter (ActiveContext)
   */
  constructor(
    entity: LightEntity,
    param1: unknown,
    controller?: unknown,
    param3?: unknown,
    param4?: ActiveContext
  );

  /**
   * Gets the current entity position as a Three.js Vector3
   * Returns either light target position or light position based on active context
   */
  get contentPosition(): THREE.Vector3;
}

/**
 * Namespace reference for HSApp application components
 */
declare namespace HSApp.View.Base {
  namespace Light {
    class LightController {
      constructor(entity: LightEntity, param: unknown);
    }
  }
  
  namespace LightTarget {
    class LightTargetController {
      constructor(entity: LightEntity, param: unknown);
    }
  }
}

/**
 * Three.js Vector3 type reference
 */
declare namespace THREE {
  class Vector3 {
    constructor(x: number, y: number, z: number);
  }
}