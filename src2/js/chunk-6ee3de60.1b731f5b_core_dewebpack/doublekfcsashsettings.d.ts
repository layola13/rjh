/**
 * Module: DoubleKfcSashSettings
 * Settings management for double KFC (Kentucky Fried Chicken style) sash windows
 */

import type { Vector } from './vector-types';
import type { EventType } from './event-types';
import type { Glass } from './glass-types';

/**
 * Represents the joint connection method between sash components
 */
export enum JointWay {
  // Define specific joint types based on your application
}

/**
 * Represents the opening direction of the sash
 */
export enum OpenToward {
  // Define specific opening directions
}

/**
 * Hardware handle configuration
 */
export interface HandleType {
  id: string;
  name: string;
  // Additional handle properties
}

/**
 * Hinge hardware configuration
 */
export interface HingeType {
  id: string;
  name: string;
  // Additional hinge properties
}

/**
 * Manager for hardware components (handles, hinges, etc.)
 */
export interface HardwareManager {
  handleType: HandleType;
  hingeType: HingeType;
  hingeCount: number;
  updatePoly(): void;
}

/**
 * Individual sash component within a double sash assembly
 */
export interface Sash {
  hardwareManager: HardwareManager;
  largeUpDownSize: number;
  updatePoly(): void;
  draw(view: View): void;
}

/**
 * Pulling height configuration for splitters
 */
export interface PullingHeightInfo {
  height: number;
}

/**
 * Polygon geometry data
 */
export interface Polygon {
  // Polygon properties
}

/**
 * Mullion splitter manager
 */
export interface MullionSplitter {
  getPullingHeight(polyId: string): PullingHeightInfo | null;
  setPullingHeight(polyId: string, height: number): void;
  allowPullingHeight(polygon: Polygon): boolean;
}

/**
 * Mullion manager for frame divisions
 */
export interface MullionManager {
  splitter: MullionSplitter;
}

/**
 * Frame component containing the sash
 */
export interface Frame {
  mulManager: MullionManager;
  updateFrame(): void;
  draw(view: View): void;
}

/**
 * Shape manager containing all shapes in the view
 */
export interface ShapeManager {
  shapem: unknown; // Shape collection type
}

/**
 * Memento pattern manager for undo/redo functionality
 */
export interface MementoManager {
  checkPoint(): void;
}

/**
 * Rendering layer for graphics
 */
export interface Layer {
  batchDraw(): void;
}

/**
 * Event bus payload for top view changes
 */
export interface TopViewChangePayload {
  view: View;
  frame: Frame;
}

/**
 * Event bus message structure
 */
export interface EventBusMessage {
  type: EventType;
  payload: TopViewChangePayload;
}

/**
 * Event bus for application-wide events
 */
export interface EventBus {
  emit(message: EventBusMessage): void;
}

/**
 * Main view/viewport for rendering and interaction
 */
export interface View {
  shapeManager: ShapeManager;
  mometoManager: MementoManager;
  activeLayer: Layer;
  eventBus: EventBus;
  refresh(): void;
}

/**
 * Hardware shape creator singleton
 */
export interface HardwareShapeCreator {
  readonly doorHandles: ReadonlyArray<HandleType>;
}

/**
 * Double sash window component with two operable panels
 */
export interface DoubleSash {
  jointWay: JointWay;
  openToward: OpenToward;
  opened: boolean;
  offvecEnabled: boolean;
  offvec: Vector;
  sashes: Sash[];
  topFrame: Frame;
  polyId: string;
  polygon: Polygon;
  
  updatePoly(): void;
  draw(view: View): void;
  translate(vector: Vector): void;
  hideAssist(): void;
}

/**
 * Settings controller for double KFC sash windows
 * Manages configuration and state of double sash assemblies
 */
export declare class DoubleKfcSashSettings {
  private readonly doubleSash: DoubleSash;
  private readonly view: View;

  /**
   * Creates a new settings controller for a double sash
   * @param doubleSash - The double sash component to manage
   * @param view - The view context for rendering
   */
  constructor(doubleSash: DoubleSash, view: View);

  /**
   * Gets the target double sash component
   */
  get target(): DoubleSash;

  /**
   * Gets or sets the joint connection method between sash components
   */
  get jointWay(): JointWay;
  set jointWay(value: JointWay);

  /**
   * Gets or sets the opening direction of the sash
   */
  get openToward(): OpenToward;
  set openToward(value: OpenToward);

  /**
   * Gets or sets whether the sash is in opened state
   */
  get opened(): boolean;
  set opened(value: boolean);

  /**
   * Gets or sets whether offset vector functionality is enabled
   */
  get offvecEnabled(): boolean;
  set offvecEnabled(value: boolean);

  /**
   * Gets or sets whether the sash has a position offset
   * Setting to false resets the offset to zero
   */
  get hasOffset(): boolean;
  set hasOffset(value: boolean);

  /**
   * Gets the list of available door handle types
   */
  get handleTypeList(): HandleType[];

  /**
   * Gets or sets the handle hardware type for all sashes
   */
  get handleType(): HandleType;
  set handleType(value: HandleType);

  /**
   * Gets or sets the hinge hardware type for all sashes
   */
  get hingeType(): HingeType;
  set hingeType(value: HingeType);

  /**
   * Gets or sets the number of hinges on each sash
   */
  get hingesCount(): number;
  set hingesCount(value: number);

  /**
   * Gets or sets whether hinges are hidden (count = 0)
   */
  get hingesHidden(): boolean;
  set hingesHidden(value: boolean);

  /**
   * Gets or sets the size of large up/down hardware components
   */
  get largeUpDownSize(): number;
  set largeUpDownSize(value: number);

  /**
   * Gets or sets the pulling height for the top frame splitter
   */
  get pullingHeight(): number;
  set pullingHeight(value: number);

  /**
   * Gets whether pulling height can be set for this configuration
   */
  get allowPullingHeightSet(): boolean;

  /**
   * Broadcasts a top view change event through the event bus
   * @private
   */
  private broadcastTopViewChange(): void;
}