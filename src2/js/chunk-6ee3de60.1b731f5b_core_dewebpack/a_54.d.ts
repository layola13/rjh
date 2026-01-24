/**
 * Konva.js Core Module
 * Provides global configuration and utilities for the Konva canvas library
 */

/**
 * Global configuration interface for Konva
 */
interface KonvaGlobalConfig {
  /** Reference to the global object (window/self/global) */
  _global: Window | WorkerGlobalScope | typeof globalThis;
  
  /** Konva library version */
  version: string;
  
  /** Whether the code is running in a browser environment */
  isBrowser: boolean;
  
  /** Whether the code is unminified (for debugging) */
  isUnminified: boolean;
  
  /** Double click detection window in milliseconds */
  dblClickWindow: number;
  
  /**
   * Converts angle to radians if angleDeg is true
   * @param angle - Angle value to convert
   * @returns Converted angle value
   */
  getAngle: (angle: number) => number;
  
  /** Whether trace/debug mode is enabled */
  enableTrace: boolean;
  
  /** Whether pointer events are enabled globally */
  pointerEventsEnabled: boolean;
  
  /** Whether automatic drawing is enabled */
  autoDrawEnabled: boolean;
  
  /** Whether hit detection during drag is enabled */
  hitOnDragEnabled: boolean;
  
  /** Whether pointer event capturing is enabled */
  capturePointerEventsEnabled: boolean;
  
  /** Internal: Mouse click listener state */
  _mouseListenClick: boolean;
  
  /** Internal: Touch click listener state */
  _touchListenClick: boolean;
  
  /** Internal: Pointer click listener state */
  _pointerListenClick: boolean;
  
  /** Internal: Mouse double-click window state */
  _mouseInDblClickWindow: boolean;
  
  /** Internal: Touch double-click window state */
  _touchInDblClickWindow: boolean;
  
  /** Internal: Pointer double-click window state */
  _pointerInDblClickWindow: boolean;
  
  /** Internal: Mouse double-click pointer ID */
  _mouseDblClickPointerId: number | null;
  
  /** Internal: Touch double-click pointer ID */
  _touchDblClickPointerId: number | null;
  
  /** Internal: Pointer double-click pointer ID */
  _pointerDblClickPointerId: number | null;
  
  /** Device pixel ratio for high-DPI displays */
  pixelRatio: number;
  
  /** Minimum distance in pixels to initiate drag */
  dragDistance: number;
  
  /** Whether angles are measured in degrees (true) or radians (false) */
  angleDeg: boolean;
  
  /** Whether to show warning messages */
  showWarnings: boolean;
  
  /** Mouse buttons that can initiate drag (0=left, 1=middle, 2=right) */
  dragButtons: number[];
  
  /**
   * Check if a drag operation is currently in progress
   * @returns True if dragging
   */
  isDragging: () => boolean;
  
  /**
   * Check if drag is ready to start
   * @returns True if drag is ready
   */
  isDragReady: () => boolean;
  
  /** Reference to the DOM document object */
  document: Document | undefined;
  
  /**
   * Inject Konva into the global scope
   * @param konva - Konva instance to inject
   */
  _injectGlobal: (konva: unknown) => void;
  
  /** Drag and Drop utilities (populated elsewhere) */
  DD?: {
    isDragging: boolean;
    node: unknown;
  };
}

/**
 * Base class interface for Konva components
 */
interface KonvaComponent {
  /**
   * Get the class name of this component
   * @returns Class name string
   */
  getClassName(): string;
}

/**
 * Konva global namespace and configuration
 */
export declare const Konva: KonvaGlobalConfig;

/**
 * Register a Konva component class
 * @param ComponentClass - Component class to register
 */
export declare function registerComponent(ComponentClass: { 
  prototype: KonvaComponent;
  new(...args: any[]): KonvaComponent;
}): void;

/**
 * Named exports
 */
export { Konva as b };