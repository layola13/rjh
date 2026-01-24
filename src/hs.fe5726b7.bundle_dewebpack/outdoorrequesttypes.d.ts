/**
 * Outdoor request type definitions for HSW plugin system.
 * Defines string constants for various outdoor drawing operations.
 * @module OutdoorRequestTypes
 */

/**
 * Collection of request type identifiers for outdoor drawing operations.
 */
export interface OutdoorRequestTypes {
  /**
   * Request types for outdoor drawing operations.
   * This object is frozen and immutable at runtime.
   */
  readonly OutdoorDrawing: {
    /**
     * Request type for drawing lines in outdoor mode.
     * @constant
     */
    readonly DrawLines: "hsw.plugin.OutdoorDrawing.req.DrawLines";

    /**
     * Request type for drawing rectangles in outdoor mode.
     * @constant
     */
    readonly DrawRectangle: "hsw.plugin.OutdoorDrawing.req.DrawRectangle";

    /**
     * Request type for drawing circles in outdoor mode.
     * @constant
     */
    readonly DrawCircle: "hsw.plugin.OutdoorDrawing.req.DrawCircle";

    /**
     * Request type for drawing regular polygons in outdoor mode.
     * @constant
     */
    readonly DrawRegularPolygon: "hsw.plugin.OutdoorDrawing.req.DrawRegularPolygon";

    /**
     * Request type for drawing irregular polygons in outdoor mode.
     * @constant
     */
    readonly DrawPolygon: "hsw.plugin.OutdoorDrawing.req.DrawPolygon";

    /**
     * Request type for adding split points to geometry in outdoor mode.
     * @constant
     */
    readonly AddSplitPoint: "hsw.plugin.OutdoorDrawing.req.AddSplitPoint";

    /**
     * Request type for adding guide lines in outdoor mode.
     * @constant
     */
    readonly AddGuideLine: "hsw.plugin.OutdoorDrawing.req.AddGuideLine";

    /**
     * Request type for deleting guide lines in outdoor mode.
     * @constant
     */
    readonly DeleteGuideLine: "hsw.plugin.OutdoorDrawing.req.DeleteGuideLine";

    /**
     * Request type for drawing fillets (rounded corners) in outdoor mode.
     * @constant
     */
    readonly DrawFillet: "hsw.plugin.OutdoorDrawing.req.DrawFillet";

    /**
     * Request type for deleting vertices from geometry in outdoor mode.
     * @constant
     */
    readonly DeleteVertex: "hsw.plugin.OutdoorDrawing.req.DeleteVertex";

    /**
     * Request type for moving curves in outdoor mode.
     * @constant
     */
    readonly MoveCurve: "hsw.plugin.OutdoorDrawing.req.MoveCurve";

    /**
     * Request type for moving points in outdoor mode.
     * @constant
     */
    readonly MovePoint: "hsw.plugin.OutdoorDrawing.req.MovePoint";
  };
}

/**
 * Exported constant containing all outdoor request type identifiers.
 * The OutdoorDrawing sub-object is frozen to prevent modification.
 */
export declare const OutdoorRequestTypes: OutdoorRequestTypes;