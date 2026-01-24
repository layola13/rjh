/**
 * View Module
 * Main canvas view controller for shape drawing and manipulation
 * Original Module ID: 110
 */

import Konva from 'konva';
import { Point } from './geometry';
import { Tk } from './tk';
import { Polyfill } from './polyfill';
import { EventType } from './event-type';
import { DragRobot } from './drag-robot';
import { ToolManager } from './tool-manager';
import { ShapeManager } from './shape-manager';
import { MometoManager } from './momento-manager';
import { IDimInfoManager } from './dim-info-manager';
import { Param, FillPattern } from './param';
import { Hinge, HingeOnCircle } from './robot';
import { DrawParams, DimCraft, langMode } from './draw-params';
import EventEmitter from 'eventemitter3';

/**
 * Standard canvas dimensions and scale configuration
 */
interface CanvasStandardConfig {
  width: number;
  height: number;
  scale: number;
}

/**
 * Serializable shape data structure
 */
interface SerializedData {
  [key: string]: unknown;
}

/**
 * Main View class for managing canvas, layers, shapes, and tools
 * Handles drawing operations, event management, and coordinate transformations
 */
export declare class View {
  /** Authentication token */
  readonly token: string;
  
  /** DOM container element ID */
  readonly containerId: string;
  
  /** CSS class name for canvas content */
  readonly className: string;
  
  /** Standard canvas configuration [width, height, scale] */
  readonly standardCanvas: [number, number, number];
  
  /** Token key manager */
  private readonly keys: Tk;
  
  /** Main Konva stage (canvas) */
  private readonly stage: Konva.Stage;
  
  /** Active drawing layer */
  private readonly layer: Konva.Layer;
  
  /** Temporary drawing layer for transient shapes */
  private readonly tLayer: Konva.Layer;
  
  /** Drawing parameters */
  readonly params: Param;
  
  /** Event bus for inter-component communication */
  readonly eventBus: EventEmitter;
  
  /** Tool management system */
  readonly toolManager: ToolManager;
  
  /** Shape management system */
  readonly shapeManager: ShapeManager;
  
  /** Undo/redo state manager */
  readonly mometoManager: MometoManager;
  
  /** Dimension information manager */
  readonly dimManager: IDimInfoManager;
  
  /** Drag interaction robot */
  readonly dragRob: DragRobot;

  /**
   * Creates a new View instance
   * @param token - Authentication token
   * @param containerId - DOM element ID for canvas container (default: "webcc")
   * @throws {Error} When container element is not found
   */
  constructor(token: string, containerId?: string);

  /**
   * Gets the main Konva stage (canvas)
   * @readonly
   */
  get canvas(): Konva.Stage;

  /**
   * Gets the active drawing layer
   * @readonly
   */
  get activeLayer(): Konva.Layer;

  /**
   * Gets the temporary drawing layer
   * @readonly
   */
  get tmpLayer(): Konva.Layer;

  /**
   * Checks if a drag operation is currently in progress
   * @readonly
   */
  get isDragging(): boolean;

  /**
   * Serializes all shapes to a data structure
   * @returns Serialized shape data
   */
  serialize(): SerializedData;

  /**
   * Deserializes and loads shapes from data structure
   * @param data - Serialized shape data to load
   */
  deserialize(data: SerializedData): void;

  /**
   * Performs post-drawing operations for shapes with special rendering needs
   * @param canvas - Optional canvas context override
   * @param context - Optional rendering context override
   * @param includeHitRegion - Whether to draw hit detection regions (default: true)
   */
  postDraw(canvas?: CanvasRenderingContext2D, context?: unknown, includeHitRegion?: boolean): void;

  /**
   * Registers post-draw event handler
   * @private
   */
  private onPostDraw(): void;

  /**
   * Refreshes the canvas display
   * Disables drawing temporarily and triggers batch redraw
   */
  refresh(): void;

  /**
   * Destroys all shapes except drag robot visual object
   * Clears both temporary and active layers
   */
  destoryAll(): void;

  /**
   * Converts canvas coordinates to screen coordinates
   * @param point - Canvas coordinate point
   * @returns Screen coordinate point with stage scale and position applied
   */
  toScreen(point: Point): Point;

  /**
   * Centers all shapes in the viewport
   * Automatically adjusts stage position based on container size
   */
  centerShapes(): void;

  /**
   * Calculates optimal canvas scale factor
   * @param containerWidth - Container width in pixels
   * @param containerHeight - Container height in pixels
   * @param standardWidth - Standard canvas width (default: 1000)
   * @param standardHeight - Standard canvas height (default: 2000)
   * @returns Calculated scale factor
   */
  getCanvasScale(
    containerWidth: number,
    containerHeight: number,
    standardWidth?: number,
    standardHeight?: number
  ): number;

  /**
   * Sets English language mode
   * Triggers shape label updates and canvas refresh when changed
   */
  set enLangMode(enabled: boolean);

  /**
   * Sets language mode
   * Automatically updates enLangMode and refreshes all shape labels
   */
  set langMode(mode: langMode);

  /**
   * Gets localized language string
   * @param key - Translation key
   * @returns Localized string
   */
  lang(key: string): string;

  /**
   * Gets current length unit
   */
  get lenUnit(): string;

  /**
   * Sets length unit for measurements
   */
  set lenUnit(unit: string);

  /**
   * Gets decimal digits for length unit display
   */
  get lenUnitDigits(): number;

  /**
   * Sets decimal digits for length unit display
   */
  set lenUnitDigits(digits: number);
}