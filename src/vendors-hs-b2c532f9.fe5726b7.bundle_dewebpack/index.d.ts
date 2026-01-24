/**
 * Type definitions for webpack bundle modules
 * This file provides TypeScript type declarations for the compiled bundle
 */

// ============================================================================
// Core Utility Types
// ============================================================================

/**
 * Generic module export type
 */
export interface ModuleExports {
  [key: string]: unknown;
}

/**
 * Module factory function signature
 */
export type ModuleFactory = (
  module: Module,
  exports: ModuleExports,
  require: RequireFunction
) => void;

/**
 * Webpack module definition
 */
export interface Module {
  /** Module exports object */
  exports: ModuleExports;
  /** Module identifier */
  id: string | number;
  /** Whether the module has been loaded */
  loaded: boolean;
}

/**
 * Webpack require function
 */
export interface RequireFunction {
  /** Load a module by ID */
  (moduleId: string | number): ModuleExports;
  /** Module cache */
  cache: Record<string | number, Module>;
  /** Define property helper */
  d: (exports: ModuleExports, name: string, getter: () => unknown) => void;
  /** ES module marker */
  r: (exports: ModuleExports) => void;
  /** Compatibility getter for non-harmony exports */
  n: (module: ModuleExports) => ModuleExports;
  /** Object property getter helper */
  o: (object: object, property: string) => boolean;
}

// ============================================================================
// Event Handler Types
// ============================================================================

/**
 * Generic event handler callback
 */
export type EventHandler<T = Event> = (event: T) => void;

/**
 * Touch event handler
 */
export type TouchEventHandler = EventHandler<TouchEvent>;

/**
 * Mouse event handler
 */
export type MouseEventHandler = EventHandler<MouseEvent>;

/**
 * Wheel event handler
 */
export type WheelEventHandler = EventHandler<WheelEvent>;

/**
 * Keyboard event handler
 */
export type KeyboardEventHandler = EventHandler<KeyboardEvent>;

/**
 * Generic callback function
 */
export type Callback<T = void> = () => T;

/**
 * Load event callback
 */
export type OnLoadCallback = Callback<void>;

// ============================================================================
// UI Component Types
// ============================================================================

/**
 * Drag thumb component configuration
 */
export interface DragThumbConfig {
  /** Thumb element or selector */
  element: HTMLElement | string;
  /** Drag axis ('x' | 'y' | 'both') */
  axis?: 'x' | 'y' | 'both';
  /** Drag bounds */
  bounds?: DragBounds;
  /** Drag start callback */
  onDragStart?: MouseEventHandler;
  /** Drag move callback */
  onDragMove?: MouseEventHandler;
  /** Drag end callback */
  onDragEnd?: MouseEventHandler;
}

/**
 * Drag bounds configuration
 */
export interface DragBounds {
  /** Minimum X position */
  minX?: number;
  /** Maximum X position */
  maxX?: number;
  /** Minimum Y position */
  minY?: number;
  /** Maximum Y position */
  maxY?: number;
}

/**
 * Click rail component configuration
 */
export interface ClickRailConfig {
  /** Rail element or selector */
  element: HTMLElement | string;
  /** Click handler */
  onClick?: MouseEventHandler;
  /** Whether to prevent default behavior */
  preventDefault?: boolean;
}

// ============================================================================
// Graphics Types
// ============================================================================

/**
 * WebGL rendering mode constants
 */
export enum GLMode {
  /** GL_POINTS */
  POINTS = 0x0000,
  /** GL_LINES */
  LINES = 0x0001,
  /** GL_LINE_LOOP */
  LINE_LOOP = 0x0002,
  /** GL_LINE_STRIP */
  LINE_STRIP = 0x0003,
  /** GL_TRIANGLES */
  TRIANGLES = 0x0004,
  /** GL_TRIANGLE_STRIP */
  TRIANGLE_STRIP = 0x0005,
  /** GL_TRIANGLE_FAN */
  TRIANGLE_FAN = 0x0006,
}

/**
 * Polygon winding order
 */
export enum WindingOrder {
  /** Clockwise winding */
  CLOCKWISE = 'cw',
  /** Counter-clockwise winding */
  COUNTER_CLOCKWISE = 'ccw',
  /** Unknown winding order */
  UNKNOWN = 'unknown',
}

/**
 * Rendering mode configuration
 */
export interface ModeConfig {
  /** WebGL mode constant */
  mode: GLMode;
  /** Winding order */
  winding?: WindingOrder;
}

// ============================================================================
// Data Structure Types
// ============================================================================

/**
 * Generic getter function
 */
export type Getter<T> = () => T;

/**
 * Generic setter function
 */
export type Setter<T> = (value: T) => void;

/**
 * Value container with getter/setter
 */
export interface ValueContainer<T> {
  /** Get the current value */
  get: Getter<T>;
  /** Set a new value */
  set: Setter<T>;
  /** Current value */
  value: T;
}

/**
 * Collection set operations
 */
export interface SetOperations<T> {
  /** Add an item to the set */
  add(item: T): this;
  /** Remove an item from the set */
  delete(item: T): boolean;
  /** Check if item exists */
  has(item: T): boolean;
  /** Clear all items */
  clear(): void;
  /** Get set size */
  readonly size: number;
}

// ============================================================================
// Date/Time Types
// ============================================================================

/**
 * Date format tokens
 */
export type DateFormatToken = 'yy' | 'MM' | 'dd' | 'hh' | 'mm' | 'ss';

/**
 * Relative time reference
 */
export enum TimeReference {
  /** Past time */
  PAST = 'past',
  /** Future time */
  FUTURE = 'future',
}

/**
 * Date/time formatting configuration
 */
export interface DateTimeFormatConfig {
  /** Format pattern */
  format: string;
  /** Locale identifier */
  locale?: string;
  /** Time reference */
  reference?: TimeReference;
}

// ============================================================================
// Re-exported Module Types
// ============================================================================

/**
 * Rendering mode utilities
 * @module mode
 */
export * from './mode';

/**
 * WebGL line loop rendering
 * @module gl_line_loop
 */
export * from './gl_line_loop';

/**
 * Unknown winding order handling
 * @module winding_unknown
 */
export * from './winding_unknown';

// ============================================================================
// Module-specific Type Guards
// ============================================================================

/**
 * Type guard to check if value is a valid GLMode
 */
export function isGLMode(value: unknown): value is GLMode;

/**
 * Type guard to check if value is a valid WindingOrder
 */
export function isWindingOrder(value: unknown): value is WindingOrder;

/**
 * Type guard to check if value is a valid TimeReference
 */
export function isTimeReference(value: unknown): value is TimeReference;

/**
 * Type guard to check if value is a valid DateFormatToken
 */
export function isDateFormatToken(value: unknown): value is DateFormatToken;