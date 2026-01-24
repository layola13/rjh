/**
 * Props for the PinchZoomPan component
 */
export interface PinchZoomPanProps {
  /** Child element to be zoomed/panned (typically an img element) */
  children: React.ReactElement;
  
  /** URL of the image to display */
  imageUrl?: string;
  
  /** Maximum scale factor allowed */
  maxScale: number;
  
  /** Initial scale factor - use 'auto' for auto-fit or a number for specific scale */
  initialScale?: number | 'auto';
  
  /** Initial top position in pixels */
  initialTop?: number;
  
  /** Initial left position in pixels */
  initialLeft?: number;
  
  /** Position strategy for the image - 'center' or custom positioning */
  position?: 'center' | string;
  
  /** Behavior on double tap/click - 'zoom' to zoom in, other values to reset */
  doubleTapBehavior?: 'zoom' | string;
  
  /** Whether to display zoom control buttons */
  zoomButtons?: boolean;
  
  /** Custom CSS class name to apply to the container */
  customClassName?: string;
}

/**
 * State for the PinchZoomPan component
 */
export interface PinchZoomPanState {
  /** Current scale factor */
  scale?: number;
  
  /** Current top position in pixels */
  top?: number;
  
  /** Current left position in pixels */
  left?: number;
  
  /** Whether the image is currently being dragged */
  dragging: boolean;
  
  /** Dimensions of the container element */
  containerDimensions?: {
    width: number;
    height: number;
  };
  
  /** Natural dimensions of the image */
  imageDimensions?: {
    width: number;
    height: number;
  };
  
  /** Ratio for scaling calculations */
  scaleRadio: number;
  
  /** Current image URL */
  imageUrl?: string;
}

/**
 * Transform object describing position and scale
 */
export interface Transform {
  /** Top position in pixels */
  top: number;
  
  /** Left position in pixels */
  left: number;
  
  /** Scale factor */
  scale: number;
}

/**
 * Point coordinates
 */
export interface Point {
  /** X coordinate */
  x: number;
  
  /** Y coordinate */
  y: number;
}

/**
 * Dimensions object
 */
export interface Dimensions {
  /** Width in pixels */
  width: number;
  
  /** Height in pixels */
  height: number;
}

/**
 * Pan delta values for all directions
 */
export interface PanDelta {
  /** Upward movement distance */
  up: number;
  
  /** Downward movement distance */
  down: number;
  
  /** Rightward movement distance */
  right: number;
  
  /** Leftward movement distance */
  left: number;
}

/**
 * React component providing pinch-to-zoom and pan functionality for images
 * 
 * Features:
 * - Mouse wheel zoom
 * - Double-click zoom
 * - Click and drag panning
 * - Zoom control buttons
 * - Automatic constraint handling
 * - Smooth animations
 */
export declare class PinchZoomPan extends React.Component<PinchZoomPanProps, PinchZoomPanState> {
  /** Chrome browser version number, -1 if not Chrome */
  private chromeVersion: number;
  
  /** Last pointer position during pan operation */
  private lastPanPointerPosition?: Point;
  
  /** Current animation frame ID */
  private animation?: number;
  
  /** Reference to the image element */
  private imageRef?: HTMLImageElement | HTMLElement;
  
  /** Flag indicating if the image has loaded */
  private isImageLoaded?: boolean;

  constructor(props: PinchZoomPanProps);

  /**
   * Whether the image is ready for manipulation
   */
  get isImageReady(): boolean;

  /**
   * Whether the transform (scale, position) has been initialized
   */
  get isTransformInitialized(): boolean;

  /**
   * Lifecycle: Add window resize listener and initialize dimensions
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Check for dimension changes and update scale ratio
   */
  componentDidUpdate(prevProps: PinchZoomPanProps, prevState: PinchZoomPanState): void;

  /**
   * Lifecycle: Clean up animation and event listeners
   */
  componentWillUnmount(): void;

  /**
   * Get corrected transform with constraints applied
   * @param transform - Desired transform
   * @param tolerance - Tolerance factor for constraints
   * @returns Corrected transform or null if no correction needed
   */
  getCorrectedTransform(transform: Transform, tolerance: number): Transform | null;

  /**
   * Get scale constrained within min/max bounds
   * @param scale - Desired scale
   * @param tolerance - Tolerance factor
   * @returns Constrained scale value
   */
  getConstrainedScale(scale: number, tolerance: number): number;

  /**
   * Apply transform with constraints and update state
   * @param top - Top position
   * @param left - Left position
   * @param scale - Scale factor
   * @param tolerance - Constraint tolerance
   * @param animationSpeed - Animation speed (0 for instant)
   * @returns True if transform was applied
   */
  constrainAndApplyTransform(
    top: number,
    left: number,
    scale: number,
    tolerance: number,
    animationSpeed?: number
  ): boolean;

  /**
   * Apply transform to component state
   * @param transform - Transform to apply
   * @param animationSpeed - Animation speed (0 for instant, >0 for animated)
   */
  applyTransform(transform: Transform, animationSpeed: number): void;

  /**
   * Adjust current transform if needed (e.g., after resize)
   * @param animationSpeed - Animation speed
   */
  maybeAdjustCurrentTransform(animationSpeed?: number): void;

  /**
   * Apply the initial transform based on props
   * @param animationSpeed - Animation speed
   */
  applyInitialTransform(animationSpeed?: number): void;

  /**
   * Check and handle dimension changes (container or image)
   */
  maybeHandleDimensionsChanged(): void;

  /**
   * Zoom in at specified point
   * @param point - Point to zoom towards (defaults to center)
   * @param animationSpeed - Animation speed
   */
  zoomIn(point?: Point, animationSpeed?: number): void;

  /**
   * Zoom out from specified point
   * @param point - Point to zoom from (defaults to center)
   */
  zoomOut(point?: Point): void;

  /**
   * Zoom to specific scale at given point
   * @param scale - Target scale
   * @param point - Point to zoom towards/from
   * @param tolerance - Constraint tolerance
   * @param animationSpeed - Animation speed
   */
  zoom(scale: number, point: Point, tolerance: number, animationSpeed?: number): void;

  /**
   * Record pointer down position
   * @param event - Mouse event
   */
  pointerDown(event: React.MouseEvent): void;

  /**
   * Handle double-click zoom or reset
   * @param point - Click point
   */
  doubleClick(point: Point): void;

  /**
   * Handle pan movement
   * @param event - Mouse event
   * @returns Pan delta in all directions or 0 if not initialized
   */
  pan(event: React.MouseEvent): PanDelta | 0;

  /**
   * Calculate negative space (empty areas) at given scale
   * @param scale - Scale factor
   * @returns Negative space dimensions
   */
  calculateNegativeSpace(scale: number): Dimensions;

  /**
   * Update the scale ratio based on current image rendering
   */
  updateScaleRadio(): void;

  /**
   * Cancel any ongoing animation
   */
  cancelAnimation(): void;

  /**
   * Mouse down event handler
   */
  private handleMouseDown: (event: React.MouseEvent) => void;

  /**
   * Mouse move event handler
   */
  private handleMouseMove: (event: React.MouseEvent) => null;

  /**
   * Mouse up event handler
   */
  private handleMouseUp: () => null;

  /**
   * Double-click event handler
   */
  private handleMouseDoubleClick: (event: React.MouseEvent) => void;

  /**
   * Mouse wheel event handler for zoom
   */
  private handleMouseWheel: (event: React.WheelEvent) => void;

  /**
   * Image load event handler
   */
  private handleImageLoad: (event: React.SyntheticEvent) => void;

  /**
   * Zoom in button click handler
   */
  private handleZoomInClick: () => void;

  /**
   * Zoom out button click handler
   */
  private handleZoomOutClick: () => void;

  /**
   * Zoom to original size handler
   */
  private handleZoomToOrigin: () => void;

  /**
   * Zoom to specific scale handler
   */
  private handleZoomToScale: (scale: number) => void;

  /**
   * Window resize event handler
   */
  private handleWindowResize: () => void;

  /**
   * Image ref callback
   */
  private handleRefImage: (element: HTMLImageElement | HTMLElement | null) => void;

  /**
   * Render the component
   */
  render(): React.ReactElement;
}