import { Param } from './Param';
import { ShapeType } from './ShapeType';
import { EventType, DecorationBarColonialSettings } from './EventSystem';
import { DecorationBar, DecorationBarType, DecorationBarCreator, DecorationSplitHelper } from './DecorationBar';

/**
 * Serialized representation of DecorationBarColonial
 */
interface DecorationBarColonialJSON {
  /** Semi-bar width */
  sbw: number;
  /** Horizontal edge count */
  hec: number;
  /** Vertical edge count */
  vec: number;
  [key: string]: unknown;
}

/**
 * Component interface for decoration bar elements
 */
interface DecorationBarComponent {
  /** Semi-bar width for this component */
  semiBarWidth: number;
  /** Polygon identifier */
  polyId?: PolyId;
}

/**
 * Polygon identifier with clone capability
 */
interface PolyId {
  clone(): PolyId;
}

/**
 * Bounding box structure
 */
interface BoundingBox {
  [key: string]: unknown;
}

/**
 * Host polygon reference
 */
interface HostPolygon {
  /** Polygon identifier */
  polyId: PolyId;
  /** Bounding box of the polygon */
  box: BoundingBox;
}

/**
 * Event bus for decoration events
 */
interface EventBus {
  emit(event: DecorEvent): void;
}

/**
 * Decoration event structure
 */
interface DecorEvent {
  type: EventType;
  payload: DecorationBarColonialSettings;
}

/**
 * Context for event emission
 */
interface EventContext {
  eventBus: EventBus;
  [key: string]: unknown;
}

/**
 * Colonial-style decoration bar with horizontal and vertical edges.
 * Extends the base DecorationBar class to provide grid-like decoration patterns.
 */
export declare class DecorationBarColonial extends DecorationBar {
  /** Array of decoration components forming the colonial pattern */
  components: DecorationBarComponent[];
  
  /** Number of horizontal edges in the colonial pattern */
  horEdgeCount: number;
  
  /** Number of vertical edges in the colonial pattern */
  verEdgeCount: number;
  
  /** Half-width of the decoration bar */
  semiBarWidth: number;
  
  /** Helper utility for splitting decoration components */
  readonly splitHelper: DecorationSplitHelper;
  
  /** Reference to the host polygon containing this decoration */
  readonly hostPoly: HostPolygon;

  /**
   * Creates a new DecorationBarColonial instance
   * @param components - Array of decoration bar components forming the colonial pattern
   */
  constructor(components: DecorationBarComponent[]);

  /**
   * Serializes the colonial decoration bar to JSON format
   * @returns Serialized representation containing semi-bar width and edge counts
   */
  toJSON(): DecorationBarColonialJSON;

  /**
   * Deserializes a colonial decoration bar from JSON data
   * @param data - Serialized decoration bar data
   */
  deserialize(data: DecorationBarColonialJSON): void;

  /**
   * Splits the decoration bar into individual line segments
   * @returns Array of split decoration bar components with assigned polygon IDs
   */
  split(): DecorationBarComponent[];

  /**
   * Emits a decoration bar colonial event to the event bus
   * @param param1 - First event parameter
   * @param param2 - Second event parameter
   * @param context - Event context containing the event bus
   */
  emitEvent(param1: unknown, param2: unknown, context: EventContext): void;

  /**
   * Recreates the decoration components based on current edge counts.
   * Updates all component semi-bar widths to match the parent.
   */
  recreateComponents(): void;
}