/**
 * Measure Tool Plugin for HSApp
 * Provides 2D and 3D measurement functionality
 */

declare module 'hsw.plugin.measuretool' {
  import { HSApp } from 'HSApp';
  import { HSCore } from 'HSCore';

  /**
   * Measurement tool plugin namespace
   */
  export namespace MeasureTool {
    
    /**
     * Handler for measurement tool operations
     */
    interface Handler {
      /** Application instance */
      app?: HSApp.Application;
      
      /** Current command display gizmo */
      cmdDisplay?: UI.MeasureToolGizmo;
      
      /**
       * Initialize the handler with application instance
       * @param app - The application instance
       */
      init(app: HSApp.Application): void;
      
      /**
       * Get the active 2D canvas
       * @returns The 2D canvas or undefined
       */
      getCanvas2d(): HSApp.View.Canvas2D | undefined;
      
      /**
       * Register command display for the given command
       * @param cmd - The measure tool command
       */
      registerCommandDisplay(cmd: Command.CmdMeasureTool): void;
      
      /**
       * Unregister command display
       * @param cmd - The measure tool command
       */
      unregisterCommandDisplay(cmd: Command.CmdMeasureTool): void;
      
      /**
       * Called when measurement begins
       * @param event - Event data containing the command
       */
      measureBegin(event: { data: { cmd: HSApp.Cmd.Command } }): void;
      
      /**
       * Called when measurement ends
       * @param event - Event data containing the command
       */
      measureEnd(event: { data: { cmd: HSApp.Cmd.Command } }): void;
    }

    /**
     * UI components for measure tool
     */
    namespace UI {
      
      /**
       * Configuration for linear dimensions
       */
      interface DimensionConfig {
        /** Font size for dimension text */
        fontSize?: number;
        /** Show arrow indicators */
        showArrow?: boolean;
        /** Arrow width in pixels */
        arrowWidth?: number;
        /** Arrow height in pixels */
        arrowHeight?: number;
        /** Auto-resize dimension */
        autoResize?: boolean;
        /** Start arrow image path */
        startArrowImage?: string;
        /** End arrow image path */
        endArrowImage?: string;
        /** Line color */
        lineColor?: string;
        /** Text color */
        textColor?: string;
      }

      /**
       * Snap result information
       */
      interface SnapInfo {
        /** Snapped point position */
        point: HSCore.Util.Math.Vec2;
        /** Distance to snap point */
        distance: number;
        /** Associated snap lines */
        lines: HSCore.Util.Math.Line[];
        /** Whether snapped to a point (vs edge) */
        snapPoint: boolean;
      }

      /**
       * 2D measurement tool gizmo for visual feedback
       */
      class MeasureToolGizmo extends HSApp.View.SVG.Temp {
        /** Application instance */
        app: HSApp.Application;
        
        /** Highlight bounds for content */
        highlightBounds: Record<string, SVGElement>;
        
        /** Snap radius in model units */
        snapRadius: number;
        
        /** Current cursor position in model space */
        cursorInModel: HSCore.Util.Math.Vec2;
        
        /** Axes used for tracing/snapping */
        tracingAxes: HSCore.Util.Math.Line[];
        
        /** Candidate axes for snapping */
        snapAxesCandidates: HSCore.Util.Math.Line[];
        
        /** Visual indicator for snap points */
        snapIndicator?: SVGElement;
        
        /** Current snap position */
        snapPosition?: HSCore.Util.Math.Vec2;
        
        /** Whether currently tracing a measurement */
        isTracing: boolean;
        
        /** Start position of measurement */
        beginPosition: HSCore.Util.Math.Vec2;
        
        /** End position of measurement */
        endPosition: HSCore.Util.Math.Vec2;
        
        /** Currently highlighted content IDs */
        highlightedContents: string[];
        
        /** Active line dimension gizmo */
        activeLineDimension?: HSApp.View.SVG.Dimension;
        
        /** Whether element is attached to DOM */
        hasAttachedElement: boolean;

        /**
         * Create a new measure tool gizmo
         * @param context - SVG context
         * @param layer - SVG layer
         * @param cmd - Associated command
         * @param app - Application instance
         */
        constructor(
          context: any,
          layer: SVGElement,
          cmd: Command.CmdMeasureTool,
          app: HSApp.Application
        );

        /**
         * Create a linear dimension display
         * @param context - SVG context
         * @param layer - SVG layer
         * @param cmd - Associated command
         */
        createLengthDimension(context: any, layer: SVGElement, cmd: Command.CmdMeasureTool): void;

        /**
         * Update dimension display
         * @param dimension - Dimension element to update
         * @param options - Update options including positions
         */
        updateDimension(
          dimension: HSApp.View.SVG.Dimension | undefined,
          options: {
            startPos: HSCore.Util.Math.Vec2;
            endPos: HSCore.Util.Math.Vec2;
            autoResize?: boolean;
            startArrowImage?: string;
            endArrowImage?: string;
            lineColor?: string;
          }
        ): void;

        /**
         * Get current scale shrink ratio
         * @returns Scale factor
         */
        getShrinkRatio(): number;

        /**
         * Highlight a content element
         * @param content - Content to highlight
         */
        highlightContent(content: HSCore.Model.Content): void;

        /**
         * Remove highlight from content
         * @param contentIdOrContent - Content ID or content object
         */
        unHighlightContent(contentIdOrContent: string | HSCore.Model.Content): void;

        /**
         * Clear all content highlights
         */
        clearContentHighlight(): void;

        /**
         * Clear all content bound highlights
         */
        clearContentBoundHighlight(): void;

        /**
         * Try to snap cursor to outline points/edges
         * @param outline - Polygon outline points
         * @param result - Output snap information
         * @returns True if snap succeeded
         */
        trySnapToOutline(
          outline: Array<{ x: number; y: number }>,
          result: Partial<SnapInfo>
        ): boolean;

        /**
         * Try to snap to floor slab geometry
         * @param result - Output snap information
         * @returns True if snap succeeded
         */
        trySnapToSlab(result: Partial<SnapInfo>): boolean;

        /**
         * Try to snap to structure face edges
         * @param result - Output snap information
         * @returns True if snap succeeded
         */
        trySnapToStructureFace(result: Partial<SnapInfo>): boolean;

        /**
         * Try to snap to content bounds
         * @param result - Output snap information
         * @returns True if snap succeeded
         */
        trySnapToContent(result: Partial<SnapInfo>): boolean;

        /**
         * Try to snap to tracing axes
         * @param point - Point to snap
         * @param result - Output snap information
         * @returns True if snap succeeded
         */
        trySnapToAxes(
          point: { x: number; y: number },
          result: Partial<SnapInfo>
        ): boolean;

        /**
         * Try to snap to extraordinary sketch geometry
         * @param sketch - Sketch data
         * @param result - Output snap information
         * @returns True if snap succeeded
         */
        trySnapToExtraordinarySketch2d(
          sketch: any,
          result: Partial<SnapInfo>
        ): boolean;

        // Event handlers
        onDraw(): void;
        onMouseMove(event: MouseEvent, x: number, y: number): void;
        onMouseDown(event: MouseEvent): void;
        onMouseClick(event: MouseEvent, x: number, y: number): void;
        onCleanup(): void;
      }
    }

    /**
     * Command implementations
     */
    namespace Command {
      
      /**
       * 2D Measure tool command
       */
      class CmdMeasureTool extends HSApp.Cmd.Command {
        /**
         * Whether command can be undone/redone
         */
        canUndoRedo(): boolean;

        /**
         * Whether command can be suspended
         */
        canSuspend(): boolean;

        /**
         * Get command description for logging
         */
        getDescription(): string;

        /**
         * Get command category for logging
         */
        getCategory(): string;

        /**
         * Whether command is interactive
         */
        isInteractive(): boolean;
      }
    }

    /**
     * Plugin registration class
     */
    class Plugin extends HSApp.Plugin.IPlugin {
      /** Application instance */
      app?: HSApp.Application;

      /**
       * Create plugin instance
       */
      constructor();

      /**
       * Called when plugin is activated
       * @param context - Activation context with app instance
       */
      onActive(context: { app: HSApp.Application }): void;
    }
  }

  /**
   * Global handler instance
   */
  export const Handler: MeasureTool.Handler;
}

/**
 * Global function to trigger measure tool
 * @param options - Optional configuration including 3D gizmo
 */
declare function onMeasureToolButtonClicked(options?: { gizmo3D?: any }): void;

/**
 * Plugin constants
 */
declare const PLUGIN_NAME = 'hsw.plugin.measuretool';
declare const MEASURE_TEMPLATE_KEY = 'house.template.measure';