import Paper from 'paper'; // Assuming module 0 is paper.js
import { OpenDirection } from './OpenDirection'; // Module 13
import { 
  HardwareOnMullion, 
  ShapeType, 
  HardwareShape 
} from './Hardware'; // Module 1

/**
 * KFC handle hardware component that attaches to a mullion.
 * Provides functionality for positioning, movement, and alignment of door/window handles.
 */
export class KfcHandle extends HardwareOnMullion {
  /** Manager instance controlling this hardware component */
  private readonly manager: any; // Replace 'any' with proper manager type

  /** Shape identifier for this hardware */
  public readonly hardwareShape: HardwareShape = HardwareShape.KfcHandle;

  /**
   * Creates a new KFC handle instance
   * @param manager - The hardware manager controlling this component
   */
  constructor(manager: any) {
    super(manager, ShapeType.Handle);
    this.manager = manager;
  }

  /**
   * Gets the hardware color from the top frame's color manager
   */
  get color(): string | number {
    return this.topFrame.colorManager.hardware;
  }

  /**
   * Determines if the handle should be offset in the opposite direction
   * based on the open direction and edge orientation
   */
  get oppositeOffset(): boolean {
    const isLeftOpening = this.manager.openDirection === OpenDirection.Left;
    const isEdgeLeftToRight = this.edge.start.x < this.edge.end.x;
    return (isLeftOpening && isEdgeLeftToRight) || (!isLeftOpening && !isEdgeLeftToRight);
  }

  /**
   * Gets the physical length of the hardware shape from profile size manager
   */
  get hardwareShapeLength(): number {
    return this.topFrame.profileSizeManager.get(ShapeType.KfcWaist);
  }

  /**
   * Gets the current position of the handle
   */
  get handlePosition(): any {
    return this.position;
  }

  /**
   * Returns the directional vector for the hardware shape
   * @returns A unit vector pointing upward (0, 1)
   */
  hardwareShapeDirection(): Paper.Point {
    return Paper.vector(0, 1);
  }

  /**
   * Moves the handle to a new position
   * @param percentOffset - The percentage offset along the mullion (0-1)
   * @param unused - Unused parameter
   * @param options - Movement options including oppositeOffset flag
   */
  move(
    percentOffset: number, 
    unused: unknown, 
    options?: { oppositeOffset?: boolean }
  ): void {
    const view = this.topFrame.view;
    
    // Flip offset if opposite direction is specified
    this.percentOffset = options?.oppositeOffset !== this.oppositeOffset 
      ? 1 - percentOffset 
      : percentOffset;
    
    this.updatePoly();
    this.draw(view);
  }

  /**
   * Sets the distance from the handle to the ground
   * @param currentDistance - Current distance value
   * @param targetDistance - Target distance value
   */
  setDistanceToGround(currentDistance: number, targetDistance: number): void {
    const view = this.topFrame.view;
    const translationAmount = targetDistance - currentDistance;
    
    // Move all aligned hardware components
    this.allHardwaresAlignedWith().forEach((hardware) => 
      hardware.translateY(translationAmount)
    );
    
    this.translateY(translationAmount);
    view.refresh();
  }

  /**
   * Sets the distance from the handle to the sash
   * Delegates to setDistanceToGround as they use the same logic
   * @param currentDistance - Current distance value
   * @param targetDistance - Target distance value
   */
  setDistanceToSash(currentDistance: number, targetDistance: number): void {
    this.setDistanceToGround(currentDistance, targetDistance);
  }

  /**
   * Clones properties from another KfcHandle instance
   * @param source - The source handle to clone from
   * @returns This instance for method chaining
   */
  cloneFrom(source: KfcHandle): this {
    super.cloneFrom(source);
    return this;
  }

  /**
   * Creates a new instance with the same properties
   * @returns A new cloned KfcHandle instance
   */
  recreate(): KfcHandle {
    return new KfcHandle(this.manager).cloneFrom(this);
  }

  /**
   * Computes the automatic offset position for the handle
   * @returns 0.8 for opposite offset, 0.2 for normal offset
   */
  computeAutoOffset(): number {
    const OPPOSITE_OFFSET_POSITION = 0.8;
    const NORMAL_OFFSET_POSITION = 0.2;
    
    return this.oppositeOffset 
      ? OPPOSITE_OFFSET_POSITION 
      : NORMAL_OFFSET_POSITION;
  }

  /**
   * Translates the handle vertically by dragging the associated mullion
   * @param deltaY - The vertical distance to translate
   */
  private translateY(deltaY: number): void {
    const view = this.topFrame.view;
    const translationVector = Paper.vector(0, deltaY);
    
    this.sash.mulManager.dragMullion(this.bar, translationVector);
    this.sash.updatePoly();
    this.sash.draw(view);
  }
}