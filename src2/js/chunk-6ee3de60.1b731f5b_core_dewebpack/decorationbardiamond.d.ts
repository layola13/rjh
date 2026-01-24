import { ShapeType } from './shape-type';
import { Param } from './param';
import { EventType, DecorationBarDiamondSettings } from './events';
import { DecorationBar, DecorationBarType, DecorationBarCreator } from './decoration-bar';

/**
 * Component interface for decoration bar elements
 */
interface DecorationComponent {
  semiBarWidth: number;
}

/**
 * Serialized representation of DecorationBarDiamond
 */
interface SerializedDecorationBarDiamond {
  hpc: number;
  vpc: number;
  sbw: number;
  [key: string]: unknown;
}

/**
 * Event context for emitting decoration bar events
 */
interface EventContext {
  eventBus: {
    emit(event: { type: EventType; payload: DecorationBarDiamondSettings }): void;
  };
}

/**
 * Diamond-shaped decoration bar component.
 * Creates a diamond pattern using horizontal and vertical point counts.
 */
export class DecorationBarDiamond extends DecorationBar {
  /** Array of decoration components forming the diamond shape */
  private components: DecorationComponent[];
  
  /** Horizontal point count for diamond tessellation */
  private hPtCount: number;
  
  /** Vertical point count for diamond tessellation */
  private vPtCount: number;
  
  /** Half-width of the decoration bar */
  private semiBarWidth: number;

  /**
   * Creates a new DecorationBarDiamond instance
   * @param components - Initial decoration components
   */
  constructor(components: DecorationComponent[]) {
    super(components, DecorationBarType.decorationDiamond);
    this.components = components;
    this.hPtCount = 1;
    this.vPtCount = 1;
    this.semiBarWidth = 0;
  }

  /**
   * Serializes the decoration bar to JSON format
   * @returns Serialized object with diamond-specific properties
   */
  public toJSON(): SerializedDecorationBarDiamond {
    const baseJson = super._toJSON();
    return {
      ...baseJson,
      hpc: this.hPtCount,
      vpc: this.vPtCount,
      sbw: this.semiBarWidth
    };
  }

  /**
   * Deserializes the decoration bar from JSON format
   * @param data - Serialized decoration bar data
   */
  public deserialize(data: SerializedDecorationBarDiamond): void {
    super._deserialize(data);
    this.hPtCount = data.hpc ?? 1;
    this.vPtCount = data.vpc ?? 1;
    this.semiBarWidth = data.sbw ?? new Param().get(ShapeType.DecorationBar) / 2;
  }

  /**
   * Emits a decoration bar diamond event through the event bus
   * @param eventData1 - First event parameter
   * @param eventData2 - Second event parameter
   * @param context - Event context containing event bus
   */
  public emitEvent(
    eventData1: unknown,
    eventData2: unknown,
    context: EventContext
  ): void {
    context.eventBus.emit({
      type: EventType.decoration_bar_diamond,
      payload: new DecorationBarDiamondSettings(eventData1, eventData2, context)
    });
  }

  /**
   * Recreates all components based on current point counts.
   * Updates each component's semi-bar width to match the current configuration.
   */
  public recreateComponents(): void {
    this.components = DecorationBarCreator.Instance.createDiamondComponents(
      this.hPtCount,
      this.vPtCount
    );
    
    this.components.forEach((component) => {
      component.semiBarWidth = this.semiBarWidth;
    });
  }
}