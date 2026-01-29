import type { ContentMovement, ContentMovementController } from './ContentMovement';

/**
 * Position vector containing x, y, z coordinates
 */
interface Position {
  x: number;
  y: number;
  z: number;
}

/**
 * Content object with position and target coordinates
 */
interface Content {
  /** Current X position */
  x: number;
  /** Current Y position */
  y: number;
  /** Current Z position */
  z: number;
  /** Target X position for light */
  XTarget: number;
  /** Target Y position for light */
  YTarget: number;
  /** Target Z position for light */
  ZTarget: number;
}

/**
 * Active context configuration
 */
interface ActiveContext {
  /** Whether to select light target position instead of regular position */
  selectLightTarget: boolean;
}

/**
 * Light target controller for managing light target movements
 */
declare class LightTargetController {
  constructor(content: Content, element: unknown);
}

/**
 * Light controller for managing light movements
 */
declare class LightController {
  constructor(content: Content, element: unknown);
}

/**
 * Extended content movement controller with light support
 */
declare class ExtendedContentMovementController extends ContentMovementController {
  /**
   * Creates a new extended content movement controller
   * @param content - The content object to control
   * @param element - The associated DOM element
   * @param controller - Optional custom controller instance
   * @param param4 - Additional parameter
   * @param context - Active context configuration
   */
  constructor(
    content: Content,
    element: unknown,
    controller?: LightTargetController | LightController,
    param4: unknown,
    context: ActiveContext
  );
}

/**
 * Extended content movement class with light target support
 */
declare class ExtendedContentMovement extends ContentMovement {
  protected content: Content;
  protected activeContext: ActiveContext;

  /**
   * Creates a new extended content movement instance
   * @param arg1 - First argument
   * @param arg2 - Second argument
   * @param arg3 - Third argument
   * @param content - The content object
   * @param context - Active context configuration
   * @param controller - Movement controller instance
   * @param arg7 - Seventh argument
   * @param arg8 - Eighth argument
   */
  constructor(
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    content: Content,
    context: ActiveContext,
    controller: ExtendedContentMovementController,
    arg7: unknown,
    arg8: unknown
  );

  /**
   * Gets the current content position as a THREE.Vector3
   * Returns light target position if selectLightTarget is true,
   * otherwise returns regular position
   */
  get contentPosition(): THREE.Vector3;
}

export default ExtendedContentMovement;