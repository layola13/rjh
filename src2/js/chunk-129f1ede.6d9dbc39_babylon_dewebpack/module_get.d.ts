/**
 * Shape manager interface containing dimension and area information
 */
interface ShapeManager {
  /** Height of the shape in units */
  height: number;
  
  /** Width of the shape in units */
  width: number;
  
  /** Computed area of the main shape */
  computedArea: number;
  
  /** Area occupied by connectors */
  connectorsArea: number;
  
  /** Area occupied by corner joiners */
  cornerJoinersArea: number;
}

/**
 * Canvas interface containing the shape manager
 */
interface Canvas {
  /** Shape manager instance for handling shape calculations */
  shapeManager: ShapeManager;
}

/**
 * Order information structure
 */
interface OrderInfo {
  /** Height of the order item */
  height: number;
  
  /** Width of the order item */
  width: number;
  
  /** Total area of the order (including optional components and count multiplier) */
  area: number;
  
  /** Quantity/count of items in the order */
  count: number;
}

/**
 * Context interface for the module_get function
 */
interface ModuleGetContext {
  /** Canvas instance containing shape information */
  canvas?: Canvas;
  
  /** Order information object */
  order_info: OrderInfo;
  
  /** Whether to include connectors in area calculation */
  include_connectors: boolean;
  
  /** Whether to include corner joiners in area calculation */
  include_cornerJoiners: boolean;
}

/**
 * Module: module_get
 * Original ID: get
 * 
 * Retrieves shape manager and updates order information with calculated dimensions and area.
 * 
 * @this {ModuleGetContext} The context containing canvas and order configuration
 * @returns {ShapeManager | Record<string, never>} The shape manager instance, or empty object if canvas is unavailable
 * 
 * @remarks
 * - Calculates total area including optional connectors and corner joiners based on flags
 * - Multiplies area by order count
 * - Rounds all measurements to 2 decimal places
 */
declare function module_get(this: ModuleGetContext): ShapeManager | Record<string, never>;

export { module_get, ModuleGetContext, ShapeManager, Canvas, OrderInfo };