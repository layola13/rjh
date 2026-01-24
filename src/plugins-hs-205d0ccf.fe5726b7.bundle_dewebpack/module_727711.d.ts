/**
 * Canvas controller module for managing 2D and 3D view interactions
 * Handles mouse events, keyboard events, and view switching functionality
 */

declare namespace HSApp {
  namespace View {
    enum CursorEnum {
      grab = "grab",
      grabbing = "grabbing"
    }
  }

  namespace App {
    function getApp(): Application;
  }
}

declare namespace HSCore {
  namespace Model {
    enum CameraFlagEnum {
      toggleOff = "toggleOff"
    }
  }
}

/**
 * Point coordinates interface
 */
interface Point {
  x?: number;
  y?: number;
}

/**
 * 2D view context with internal state
 */
interface TwoDViewContext {
  /** Last movement delta for pan operations */
  _lastMoveDelta?: [number, number];
}

/**
 * 2D view interface
 */
interface TwoDView {
  context: TwoDViewContext;
  
  /**
   * Pan the 2D view by the specified delta
   * @param deltaX - Horizontal pan distance in pixels
   * @param deltaY - Vertical pan distance in pixels
   */
  pan(deltaX: number, deltaY: number): void;
  
  /**
   * Zoom the 2D view
   * @param zoomFactor - Zoom factor (positive = zoom in, negative = zoom out)
   * @param centerX - X coordinate of zoom center
   * @param centerY - Y coordinate of zoom center
   */
  zoom(zoomFactor: number, centerX: number, centerY: number): void;
}

/**
 * 3D canvas options
 */
interface ThreeDCanvasOptions {
  /** Whether to hide camera movement indicators */
  hideCameraMovementIndicators: boolean;
}

/**
 * 3D view context with DOM element
 */
interface ThreeDViewContext {
  /** DOM element for event dispatching */
  domElement: HTMLElement;
}

/**
 * 3D view canvas interface
 */
interface ThreeDCanvas {
  context: ThreeDViewContext;
  
  /**
   * Set canvas display options
   * @param options - Configuration options
   */
  setOptions(options: Partial<ThreeDCanvasOptions>): void;
}

/**
 * Camera interface with flag operations
 */
interface Camera {
  /**
   * Enable a camera flag
   * @param flag - Flag to enable
   */
  setFlagOn(flag: HSCore.Model.CameraFlagEnum): void;
  
  /**
   * Disable a camera flag
   * @param flag - Flag to disable
   */
  setFlagOff(flag: HSCore.Model.CameraFlagEnum): void;
}

/**
 * Floorplan with active camera
 */
interface Floorplan {
  /** Currently active camera */
  active_camera: Camera;
}

/**
 * Main application interface
 */
interface Application {
  /** Floorplan instance */
  floorplan: Floorplan;
  
  /**
   * Get the active 2D view
   * @returns Active 2D view instance
   */
  getActive2DView(): TwoDView;
  
  /**
   * Get the active 3D view
   * @returns Active 3D view canvas
   */
  getActive3DView(): ThreeDCanvas;
  
  /**
   * Check if 3D view is currently active
   * @returns True if 3D view is active
   */
  is3DViewActive(): boolean;
  
  /**
   * Check if 2D view is currently active
   * @returns True if 2D view is active
   */
  is2DViewActive(): boolean;
}

/**
 * jQuery mouse event with controller data
 */
interface ControllerMouseEvent extends JQuery.MouseEventBase {
  data: {
    twoDCanvasController?: TwoDCanvasController;
    threeDCanvasController?: ThreeDCanvasController;
  };
}

/**
 * jQuery keyboard event with controller data
 */
interface ControllerKeyboardEvent extends JQuery.KeyboardEventBase {
  data: {
    threeDCanvasController: ThreeDCanvasController;
  };
}

/**
 * 2D canvas controller for handling mouse interactions in 2D view
 */
interface TwoDCanvasController {
  /** Reference to main application */
  app: Application | null;
  
  /** Whether mouse button is currently pressed */
  isMouseDown: boolean;
  
  /** Last recorded mouse down position */
  downPoint: Point;
  
  /**
   * Handle mouse move events for panning
   * @param event - jQuery mouse event
   */
  onMouseMove(event: ControllerMouseEvent): void;
  
  /**
   * Handle mouse down events to initiate dragging
   * @param event - jQuery mouse event
   */
  onMouseDown(event: ControllerMouseEvent): void;
  
  /**
   * Handle mouse up events to end dragging
   * @param event - jQuery mouse event
   */
  onMouseUp(event: ControllerMouseEvent): void;
  
  /**
   * Handle mouse wheel events for zooming
   * @param event - jQuery mouse wheel event
   */
  onMouseWheel(event: JQuery.TriggeredEvent): void;
  
  /**
   * Initialize the 2D canvas controller
   */
  init(): void;
  
  /**
   * Show and activate the 2D canvas controller
   */
  show(): void;
  
  /**
   * Hide and deactivate the 2D canvas controller
   */
  hide(): void;
}

/**
 * 3D canvas controller for handling interactions in 3D view
 */
interface ThreeDCanvasController {
  /** Reference to 3D canvas */
  canvas: ThreeDCanvas | null;
  
  /** Whether mouse button is currently pressed */
  isMouseDown: boolean;
  
  /**
   * Initialize the 3D canvas controller
   */
  init(): void;
  
  /**
   * Show and activate the 3D canvas controller
   */
  show(): void;
  
  /**
   * Hide and deactivate the 3D canvas controller
   */
  hide(): void;
  
  /**
   * Handle mouse move events in 3D view
   * @param event - jQuery mouse event
   */
  onMouseMove(event: ControllerMouseEvent): void;
  
  /**
   * Handle mouse up events in 3D view
   * @param event - jQuery mouse event
   */
  onMouseUp(event: ControllerMouseEvent): void;
  
  /**
   * Handle mouse down events in 3D view
   * @param event - jQuery mouse event
   */
  onMouseDown(event: ControllerMouseEvent): void;
  
  /**
   * Handle keyboard key down events
   * @param event - jQuery keyboard event
   */
  onKeyDownHandler(event: ControllerKeyboardEvent): void;
  
  /**
   * Handle keyboard key up events
   * @param event - jQuery keyboard event
   */
  onKeyUpHandler(event: ControllerKeyboardEvent): void;
}

/**
 * Main canvas controller module managing both 2D and 3D view controllers
 */
interface CanvasControllerModule {
  /** Reference to main application */
  app: Application | null;
  
  /** Controller for 2D canvas interactions */
  twoDCanvasController: TwoDCanvasController;
  
  /** Controller for 3D canvas interactions */
  threeDCanvasController: ThreeDCanvasController;
  
  /**
   * Switch between 2D and 3D view controllers
   * Hides the current active controller and shows the other
   */
  switch(): void;
  
  /**
   * Initialize the canvas controller module
   */
  init(): void;
  
  /**
   * Show the appropriate canvas controller based on active view
   */
  show(): void;
  
  /**
   * Get the currently active controller (2D or 3D)
   * @returns Active controller instance or undefined
   */
  getController(): TwoDCanvasController | ThreeDCanvasController | undefined;
  
  /**
   * Hide all canvas controllers
   */
  hide(): void;
  
  /**
   * Update the UI position and dimensions
   * @param left - Left position in pixels
   * @param top - Top position in pixels
   * @param width - Width in pixels
   * @param height - Height in pixels
   */
  updateUIByData(left: number, top: number, width: number, height: number): void;
  
  /**
   * Get jQuery element for the canvas controller
   * @param selector - Optional child selector
   * @returns jQuery object
   */
  _$(selector?: string): JQuery;
}

declare const canvasControllerModule: CanvasControllerModule;

export default canvasControllerModule;