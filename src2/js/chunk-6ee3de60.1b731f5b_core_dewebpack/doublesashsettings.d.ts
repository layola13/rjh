import type Flatten from '@flatten-js/core';
import type { EventBus, EventType } from './EventBus';
import type { View } from './View';
import type { ShapeManager } from './ShapeManager';
import type { MomentoManager } from './MomentoManager';
import type { Layer } from './Layer';
import type { TopFrame } from './TopFrame';
import type { Polygon } from './Polygon';

/**
 * Joint way enumeration for double sash connection types
 */
export enum JointWay {
  /** Joint type variant 1 */
  Type1 = 0,
  /** Joint type variant 2 */
  Type2 = 1,
  /** Joint type variant 3 */
  Type3 = 2,
}

/**
 * Opening direction for double sash
 */
export enum OpenToward {
  /** Opens inward */
  Inward = 0,
  /** Opens outward */
  Outward = 1,
}

/**
 * Hardware shape type for handles
 */
export enum HardwareShape {
  /** Standard window handle */
  Handle = 'handle',
  /** Door handle variant */
  Handle2 = 'handle2',
}

/**
 * Hardware manager for sash components
 */
export interface HardwareManager {
  /** Number of hinges on the sash */
  hingeCount: number;
  /** Array of hinge objects */
  hinges: Hinge[];
  /** Type of handle hardware */
  handleType: string;
  /** Handle hardware instance */
  handle: HardwareHandle;
  /** Type of hinge hardware */
  hingeType: string;
}

/**
 * Hinge hardware component
 */
export interface Hinge {
  /** Whether offset is automatically calculated */
  autoOffset: boolean;
  /** Update the polygon geometry */
  updatePoly(): void;
  /** Draw the hinge on the view */
  draw(view: View): void;
}

/**
 * Handle hardware component
 */
export interface HardwareHandle {
  /** Whether the handle is hidden */
  hidden: boolean;
}

/**
 * Individual sash component within a double sash
 */
export interface Sash {
  /** Hardware manager for this sash */
  hardwareManager: HardwareManager;
  /** Whether this is a door sash */
  isDoor: boolean;
  /** Whether sash has a turning frame */
  withTurningFrame: boolean;
  /** Whether frame should be truncated */
  truncateFrame: boolean;
  /** Update the polygon geometry */
  updatePoly(): void;
  /** Draw the sash on the view */
  draw(view: View): void;
}

/**
 * Manager for mullion/transom splitting
 */
export interface MullionManager {
  /** Splitter instance for managing divisions */
  splitter: Splitter;
}

/**
 * Splitter for managing pulling heights and divisions
 */
export interface Splitter {
  /**
   * Get pulling height configuration for a polygon
   * @param polyId - Polygon identifier
   * @returns Height configuration or null
   */
  getPullingHeight(polyId: string): { height: number } | null;
  
  /**
   * Set pulling height for a polygon
   * @param polyId - Polygon identifier
   * @param height - Height value in millimeters
   */
  setPullingHeight(polyId: string, height: number): void;
  
  /**
   * Check if pulling height can be set for a polygon
   * @param polygon - Target polygon
   * @returns True if pulling height is allowed
   */
  allowPullingHeight(polygon: Polygon): boolean;
}

/**
 * Double sash window/door component
 */
export interface DoubleSash {
  /** Joint connection method */
  jointWay: JointWay;
  /** Whether the sash is in opened state */
  opened: boolean;
  /** Direction the sash opens */
  openToward: OpenToward;
  /** Array of child sashes */
  sashes: Sash[];
  /** Whether offset vector is enabled */
  offvecEnabled: boolean;
  /** Current offset vector */
  offvec: Flatten.Vector;
  /** Whether this is a door */
  isDoor: boolean;
  /** Whether sash has turning frame */
  withTurningFrame: boolean;
  /** Whether frame should be truncated */
  truncateFrame: boolean;
  /** Parent frame containing this sash */
  topFrame: TopFrame;
  /** Polygon geometry identifier */
  polyId: string;
  /** Polygon geometry */
  polygon: Polygon;
  /** Sibling sash if exists */
  siblingSash?: DoubleSash | null;
  
  /** Update polygon geometry */
  updatePoly(): void;
  
  /** 
   * Draw the double sash on view 
   * @param view - Target view for rendering
   */
  draw(view: View): void;
  
  /**
   * Translate sash by vector
   * @param vector - Translation vector
   */
  translate(vector: Flatten.Vector): void;
  
  /** Hide assist guides */
  hideAssist(): void;
}

/**
 * Hardware shape creator singleton for managing hardware templates
 */
export interface HardwareShapeCreator {
  /** Available window handle types */
  windowHandles: string[];
  /** Available door handle types */
  doorHandles: string[];
}

/**
 * Glass utility for serial number calculation
 */
export interface GlassStatic {
  /**
   * Calculate serial numbers for shapes
   * @param shapes - Array of shapes to process
   */
  calcSerial(shapes: unknown[]): void;
}

/**
 * Settings manager for DoubleSash component
 * Provides property getters/setters with automatic view updates and history checkpoints
 */
export class DoubleSashSettings {
  /** The double sash instance being configured */
  private readonly doubleSash: DoubleSash;
  
  /** The view context for rendering */
  private readonly view: View;

  /**
   * Creates a new DoubleSashSettings instance
   * @param doubleSash - The double sash to configure
   * @param view - The view context for rendering
   */
  constructor(doubleSash: DoubleSash, view: View);

  /**
   * Get the target double sash instance
   * @returns The configured double sash
   */
  get target(): DoubleSash;

  /**
   * Joint connection method between sashes
   */
  get jointWay(): JointWay;
  set jointWay(value: JointWay);

  /**
   * Whether the double sash is in opened state
   */
  get opened(): boolean;
  set opened(value: boolean);

  /**
   * Direction the sash opens (inward/outward)
   */
  get openToward(): OpenToward;
  set openToward(value: OpenToward);

  /**
   * Number of hinges on each sash
   */
  get hingeCount(): number;
  set hingeCount(value: number);

  /**
   * Combined list of available handle types (window + door)
   */
  get handleTypeList(): string[];

  /**
   * Type of handle hardware on sashes
   */
  get handleType(): string;
  set handleType(value: string);

  /**
   * Type of hinge hardware on sashes
   */
  get hingeType(): string;
  set hingeType(value: string);

  /**
   * Whether offset vector functionality is enabled
   */
  get offvecEnabled(): boolean;
  set offvecEnabled(value: boolean);

  /**
   * Whether the sash currently has an offset applied
   */
  get hasOffset(): boolean;
  set hasOffset(value: boolean);

  /**
   * Whether this double sash is configured as a door
   */
  get isDoor(): boolean;
  set isDoor(value: boolean);

  /**
   * Whether sash includes a turning frame
   */
  get withTurningFrame(): boolean;
  set withTurningFrame(value: boolean);

  /**
   * Whether the frame should be truncated
   */
  get truncateFrame(): boolean;
  set truncateFrame(value: boolean);

  /**
   * Pulling height in millimeters for sliding mechanisms
   */
  get pullingHeight(): number;
  set pullingHeight(value: number);

  /**
   * Whether pulling height can be set for this configuration
   */
  get allowPullingHeightSet(): boolean;
}