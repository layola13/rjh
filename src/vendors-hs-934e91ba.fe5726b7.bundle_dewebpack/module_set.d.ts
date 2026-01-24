/**
 * Module: module_set
 * Original ID: set
 * 
 * Sets the preserveCollinear property on the clipper instance.
 * This property determines whether collinear points should be preserved during clipping operations.
 * 
 * @param preserveCollinear - When true, collinear points are preserved; when false, they are removed
 */
declare function setPreserveCollinear(preserveCollinear: boolean): void;

/**
 * Interface representing a clipper instance with configuration options
 */
interface Clipper {
  /**
   * Determines whether collinear points (points that lie on the same line) 
   * should be preserved during clipping operations.
   * 
   * @defaultValue false
   */
  preserveCollinear: boolean;
}

/**
 * Context interface for the module_set function
 */
interface ModuleSetContext {
  /**
   * The clipper instance used for polygon clipping operations
   */
  _clipper: Clipper;
}

export { setPreserveCollinear, Clipper, ModuleSetContext };