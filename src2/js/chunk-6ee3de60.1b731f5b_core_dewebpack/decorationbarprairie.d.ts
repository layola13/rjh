import { Param } from './Param';
import { ShapeType } from './ShapeType';
import { EventType, DecorationBarPrairieSettings } from './EventSystem';
import { DecorationBar, DecorationBarType, DecorationSplitHelper, DecorationBarCreator } from './DecorationBarBase';

/**
 * Represents a prairie-style decoration bar with configurable edge and middle components.
 * Extends the base DecorationBar to provide specific layout patterns for prairie decorations.
 */
export class DecorationBarPrairie extends DecorationBar {
  /** Array of component shapes that make up this decoration */
  components: unknown[];

  /** Number of horizontal edge components */
  horEdgeCount: number;

  /** Separation distance between horizontal edge components */
  horEdgeSep: number;

  /** Number of vertical edge components */
  verEdgeCount: number;

  /** Separation distance between vertical edge components */
  verEdgeSep: number;

  /** Number of middle components */
  middleCount: number;

  /** Separation distance between middle components */
  middleSep: number;

  /** Number of vertical middle components */
  vMiddleCount: number;

  /** Separation distance between vertical middle components */
  vMiddleSep: number;

  /** Helper utility for splitting decoration components */
  splitHelper: DecorationSplitHelper;

  /**
   * Creates a new DecorationBarPrairie instance.
   * @param components - Initial array of decoration components
   */
  constructor(components: unknown[]) {
    super(components, DecorationBarType.decorationPrairie);
    this.components = components;
    this.horEdgeCount = 0;
    this.horEdgeSep = 0;
    this.verEdgeCount = 0;
    this.verEdgeSep = 0;
    this.middleCount = 0;
    this.middleSep = 0;
    this.vMiddleCount = 0;
    this.vMiddleSep = 0;
    this.splitHelper = new DecorationSplitHelper();
  }

  /**
   * Serializes the decoration bar to a JSON-compatible object.
   * @returns Serialized representation with abbreviated property names
   */
  toJSON(): SerializedDecorationBarPrairie {
    const json = super._toJSON();
    json.hec = this.horEdgeCount;
    json.hes = this.horEdgeSep;
    json.vec = this.verEdgeCount;
    json.ves = this.verEdgeSep;
    json.mc = this.middleCount;
    json.ms = this.middleSep;
    json.vmc = this.vMiddleCount;
    json.vms = this.vMiddleSep;
    json.sbw = this.semiBarWidth;
    return json;
  }

  /**
   * Deserializes a JSON object to restore the decoration bar state.
   * @param data - Serialized decoration bar data
   */
  deserialize(data: SerializedDecorationBarPrairie): void {
    super._deserialize(data);
    this.horEdgeCount = data.hec;
    this.horEdgeSep = data.hes;
    this.verEdgeCount = data.vec;
    this.verEdgeSep = data.ves;
    this.middleCount = data.mc;
    this.middleSep = data.ms;
    this.vMiddleCount = data.vmc;
    this.vMiddleSep = data.vms;
    this.semiBarWidth = data.sbw ?? new Param().get(ShapeType.DecorationBar) / 2;
  }

  /**
   * Splits the decoration bar into individual components based on host polygon bounds.
   * @returns Array of split decoration components
   */
  split(): DecorationComponent[] {
    const splitComponents: DecorationComponent[] = [];
    splitComponents.push(
      ...this.splitHelper.splitLine(this.components, this.hostPoly.box)
    );
    splitComponents.forEach((component) => {
      component.polyId = this.hostPoly.polyId.clone();
    });
    return splitComponents;
  }

  /**
   * Emits a decoration bar prairie event to the event bus.
   * @param param1 - First event parameter
   * @param param2 - Second event parameter
   * @param context - Context object containing the event bus
   */
  emitEvent(param1: unknown, param2: unknown, context: EventContext): void {
    context.eventBus.emit({
      type: EventType.decoration_bar_prairie,
      payload: new DecorationBarPrairieSettings(param1, param2, context),
    });
  }

  /**
   * Recreates all decoration components based on current configuration.
   * Updates component properties including semi-bar width.
   */
  recreateComponents(): void {
    this.components = DecorationBarCreator.Instance.createPrairieComponents(
      this.verEdgeSep,
      this.verEdgeCount,
      this.horEdgeSep,
      this.horEdgeCount,
      this.middleCount,
      this.middleSep,
      this.vMiddleCount,
      this.vMiddleSep
    );
    this.components.forEach((component) => {
      component.semiBarWidth = this.semiBarWidth;
    });
  }
}

/**
 * Serialized format of DecorationBarPrairie with abbreviated property names.
 */
interface SerializedDecorationBarPrairie {
  /** Horizontal edge count */
  hec: number;
  /** Horizontal edge separation */
  hes: number;
  /** Vertical edge count */
  vec: number;
  /** Vertical edge separation */
  ves: number;
  /** Middle count */
  mc: number;
  /** Middle separation */
  ms: number;
  /** Vertical middle count */
  vmc: number;
  /** Vertical middle separation */
  vms: number;
  /** Semi-bar width */
  sbw?: number;
  [key: string]: unknown;
}

/**
 * Individual decoration component after splitting.
 */
interface DecorationComponent {
  polyId: PolyId;
  semiBarWidth: number;
  [key: string]: unknown;
}

/**
 * Polygon identifier with cloning capability.
 */
interface PolyId {
  clone(): PolyId;
}

/**
 * Context object for event emission.
 */
interface EventContext {
  eventBus: EventBus;
  [key: string]: unknown;
}

/**
 * Event bus for dispatching decoration events.
 */
interface EventBus {
  emit(event: DecorationEvent): void;
}

/**
 * Event structure for decoration bar updates.
 */
interface DecorationEvent {
  type: EventType;
  payload: DecorationBarPrairieSettings;
}