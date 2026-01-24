import { Measure } from './measure';
import { Container } from './container';
import { ValueAndUnit } from './valueAndUnit';
import { Control } from './control';

/**
 * Bucket map structure for optimized rendering
 * Maps bucket index to array of controls in that bucket
 */
interface BucketMap {
  [bucketIndex: number]: Control[];
}

/**
 * Custom data stored on controls for scroll tracking
 */
interface ScrollCustomData {
  /** Original left position before scrolling */
  _origLeft: number;
  /** Original top position before scrolling */
  _origTop: number;
  /** Original left position for children container */
  origLeftForChildren?: number;
  /** Original top position for children container */
  origTopForChildren?: number;
  /** Original left position */
  origLeft?: number;
  /** Original top position */
  origTop?: number;
}

/**
 * ScrollViewerWindow - A specialized container for scrollable content with performance optimizations
 * 
 * This control provides efficient scrolling through:
 * - Frozen control rendering to avoid layout recalculations
 * - Bucket-based spatial partitioning for large numbers of children
 * - Optimized draw calls by only rendering visible controls
 */
export class _ScrollViewerWindow extends Container {
  /** Whether controls are frozen (optimization mode enabled) */
  private _freezeControls: boolean = false;
  
  /** Width of each spatial bucket for rendering optimization */
  private _bucketWidth: number = 0;
  
  /** Height of each spatial bucket for rendering optimization */
  private _bucketHeight: number = 0;
  
  /** Spatial partitioning buckets mapping indices to controls */
  private _buckets: BucketMap = {};
  
  /** Number of buckets per row (calculated from width) */
  private _bucketLen?: number;
  
  /** Cached left position from previous frame */
  private _oldLeft: number | null = null;
  
  /** Cached top position from previous frame */
  private _oldTop: number | null = null;
  
  /** Parent measure used for clipping calculations */
  private _parentMeasure?: Measure;
  
  /** Measure used for laying out children */
  private _measureForChildren!: Measure;

  constructor(name?: string) {
    super(name);
  }

  /**
   * Gets whether control freezing is enabled
   * When frozen, controls don't recalculate layout on scroll (performance optimization)
   */
  get freezeControls(): boolean {
    return this._freezeControls;
  }

  /**
   * Sets whether control freezing is enabled
   * Enabling freeze captures current layout, disabling restores normal layout behavior
   */
  set freezeControls(value: boolean) {
    if (this._freezeControls === value) return;

    // Restore measures when unfreezing
    if (value) {
      // Freeze: capture current state
    } else {
      this._restoreMeasures();
    }

    this._freezeControls = false;

    // Perform layout
    const size = this.host.getSize();
    const width = size.width;
    const height = size.height;
    const context = this.host.getContext();
    const measure = new Measure(0, 0, width, height);
    
    this.host._numLayoutCalls = 0;
    this.host._rootContainer._layout(measure, context);

    // If freezing, update measures and create buckets
    if (value) {
      this._updateMeasures();
      if (this._useBuckets()) {
        this._makeBuckets();
      }
    }

    this._freezeControls = value;
    this.host.markAsDirty();
  }

  /**
   * Gets the width of spatial buckets used for rendering optimization
   */
  get bucketWidth(): number {
    return this._bucketWidth;
  }

  /**
   * Gets the height of spatial buckets used for rendering optimization
   */
  get bucketHeight(): number {
    return this._bucketHeight;
  }

  /**
   * Sets the dimensions of spatial buckets for rendering optimization
   * Larger buckets reduce overhead but may render more off-screen controls
   * 
   * @param width - Width of each bucket in pixels
   * @param height - Height of each bucket in pixels
   */
  setBucketSizes(width: number, height: number): void {
    this._bucketWidth = width;
    this._bucketHeight = height;

    if (this._useBuckets()) {
      if (this._freezeControls) {
        this._makeBuckets();
      }
    } else {
      this._buckets = {};
    }
  }

  /**
   * Checks if bucket optimization should be used
   * @returns True if both bucket dimensions are positive
   */
  private _useBuckets(): boolean {
    return this._bucketWidth > 0 && this._bucketHeight > 0;
  }

  /**
   * Creates spatial buckets and distributes controls into them
   * This enables efficient culling of off-screen controls during rendering
   */
  private _makeBuckets(): void {
    this._buckets = {};
    this._bucketLen = Math.ceil(this.widthInPixels / this._bucketWidth);
    this._dispatchInBuckets(this._children);
    this._oldLeft = null;
    this._oldTop = null;
  }

  /**
   * Recursively distributes controls into spatial buckets
   * Each control is added to all buckets it overlaps
   * 
   * @param controls - Array of controls to distribute
   */
  private _dispatchInBuckets(controls: Control[]): void {
    for (let i = 0; i < controls.length; ++i) {
      const control = controls[i];
      const customData = control._customData as ScrollCustomData;

      // Calculate bucket range this control spans
      const leftBucket = Math.max(
        0,
        Math.floor((customData._origLeft - (this._customData as ScrollCustomData).origLeft!) / this._bucketWidth)
      );
      const rightBucket = Math.floor(
        (customData._origLeft - (this._customData as ScrollCustomData).origLeft! + control._currentMeasure.width - 1) / this._bucketWidth
      );
      const bottomBucket = Math.floor(
        (customData._origTop - (this._customData as ScrollCustomData).origTop! + control._currentMeasure.height - 1) / this._bucketHeight
      );
      const topBucket = Math.max(
        0,
        Math.floor((customData._origTop - (this._customData as ScrollCustomData).origTop!) / this._bucketHeight)
      );

      // Add control to all overlapping buckets
      for (let row = topBucket; row <= bottomBucket; row++) {
        for (let col = leftBucket; col <= rightBucket; col++) {
          const bucketIndex = row * this._bucketLen! + col;
          let bucket = this._buckets[bucketIndex];
          
          if (!bucket) {
            this._buckets[bucketIndex] = bucket = [];
          }
          
          bucket.push(control);
        }
      }

      // Recursively process container children
      if (control instanceof Container && control._children.length > 0) {
        this._dispatchInBuckets(control._children);
      }
    }
  }

  /**
   * Updates measures by offsetting them based on current scroll position
   * Captures original positions for later restoration
   */
  private _updateMeasures(): void {
    const leftOffset = this.leftInPixels | 0;
    const topOffset = this.topInPixels | 0;

    this._measureForChildren.left -= leftOffset;
    this._measureForChildren.top -= topOffset;
    this._currentMeasure.left -= leftOffset;
    this._currentMeasure.top -= topOffset;

    const customData = this._customData as ScrollCustomData;
    customData.origLeftForChildren = this._measureForChildren.left;
    customData.origTopForChildren = this._measureForChildren.top;
    customData.origLeft = this._currentMeasure.left;
    customData.origTop = this._currentMeasure.top;

    this._updateChildrenMeasures(this._children, leftOffset, topOffset);
  }

  /**
   * Recursively updates child control measures with scroll offsets
   * 
   * @param controls - Controls to update
   * @param leftOffset - Horizontal offset in pixels
   * @param topOffset - Vertical offset in pixels
   */
  private _updateChildrenMeasures(controls: Control[], leftOffset: number, topOffset: number): void {
    for (let i = 0; i < controls.length; ++i) {
      const control = controls[i];
      
      control._currentMeasure.left -= leftOffset;
      control._currentMeasure.top -= topOffset;
      
      const customData = control._customData as ScrollCustomData;
      customData._origLeft = control._currentMeasure.left;
      customData._origTop = control._currentMeasure.top;

      if (control instanceof Container && control._children.length > 0) {
        this._updateChildrenMeasures(control._children, leftOffset, topOffset);
      }
    }
  }

  /**
   * Restores original measures after unfreezing controls
   */
  private _restoreMeasures(): void {
    const leftOffset = this.leftInPixels | 0;
    const topOffset = this.topInPixels | 0;
    const customData = this._customData as ScrollCustomData;

    this._measureForChildren.left = customData.origLeftForChildren! + leftOffset;
    this._measureForChildren.top = customData.origTopForChildren! + topOffset;
    this._currentMeasure.left = customData.origLeft! + leftOffset;
    this._currentMeasure.top = customData.origTop! + topOffset;
  }

  /** @inheritdoc */
  protected _getTypeName(): string {
    return 'ScrollViewerWindow';
  }

  /**
   * Additional processing after measure calculation
   * Sets up child measurement bounds
   */
  protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void {
    super._additionalProcessing(parentMeasure, context);
    
    this._parentMeasure = parentMeasure;
    this._measureForChildren.left = this._currentMeasure.left;
    this._measureForChildren.top = this._currentMeasure.top;
    this._measureForChildren.width = parentMeasure.width;
    this._measureForChildren.height = parentMeasure.height;
  }

  /**
   * Layout override - skips layout when controls are frozen
   */
  protected _layout(parentMeasure: Measure, context: CanvasRenderingContext2D): boolean {
    if (this._freezeControls) {
      this.invalidateRect();
      return false;
    }
    
    return super._layout(parentMeasure, context);
  }

  /**
   * Scrolls children by updating their positions based on offsets
   * 
   * @param controls - Controls to scroll
   * @param leftOffset - Horizontal scroll offset
   * @param topOffset - Vertical scroll offset
   */
  private _scrollChildren(controls: Control[], leftOffset: number, topOffset: number): void {
    for (let i = 0; i < controls.length; ++i) {
      const control = controls[i];
      const customData = control._customData as ScrollCustomData;
      
      control._currentMeasure.left = customData._origLeft + leftOffset;
      control._currentMeasure.top = customData._origTop + topOffset;
      control._isClipped = false;

      if (control instanceof Container && control._children.length > 0) {
        this._scrollChildren(control._children, leftOffset, topOffset);
      }
    }
  }

  /**
   * Efficiently scrolls children using bucket-based spatial partitioning
   * Only updates controls in visible buckets
   * 
   * @param leftScroll - Current horizontal scroll position
   * @param topScroll - Current vertical scroll position
   * @param leftOffset - Horizontal offset to apply
   * @param topOffset - Vertical offset to apply
   */
  private _scrollChildrenWithBuckets(
    leftScroll: number,
    topScroll: number,
    leftOffset: number,
    topOffset: number
  ): void {
    const leftBucket = Math.max(0, Math.floor(-leftScroll / this._bucketWidth));
    const rightBucket = Math.floor((-leftScroll + this._parentMeasure!.width - 1) / this._bucketWidth);
    const bottomBucket = Math.floor((-topScroll + this._parentMeasure!.height - 1) / this._bucketHeight);
    const topBucket = Math.max(0, Math.floor(-topScroll / this._bucketHeight));

    for (let row = topBucket; row <= bottomBucket; row++) {
      for (let col = leftBucket; col <= rightBucket; col++) {
        const bucketIndex = row * this._bucketLen! + col;
        const bucket = this._buckets[bucketIndex];
        
        if (!bucket) continue;

        for (let i = 0; i < bucket.length; ++i) {
          const control = bucket[i];
          const customData = control._customData as ScrollCustomData;
          
          control._currentMeasure.left = customData._origLeft + leftOffset;
          control._currentMeasure.top = customData._origTop + topOffset;
          control._isClipped = false;
        }
      }
    }
  }

  /**
   * Custom draw implementation with frozen control optimization
   */
  protected _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Measure): void {
    if (this._freezeControls) {
      this._localDraw(context);
      
      if (this.clipChildren) {
        this._clipForChildren(context);
      }

      const leftOffset = this.leftInPixels | 0;
      const topOffset = this.topInPixels | 0;

      // Use bucket optimization if available and not first frame
      if (this._useBuckets() && this._oldLeft !== null && this._oldTop !== null) {
        this._scrollChildrenWithBuckets(this._oldLeft, this._oldTop, leftOffset, topOffset);
        this._scrollChildrenWithBuckets(leftOffset, topOffset, leftOffset, topOffset);
      } else {
        this._scrollChildren(this._children, leftOffset, topOffset);
      }

      this._oldLeft = leftOffset;
      this._oldTop = topOffset;

      // Render visible children
      for (const child of this._children) {
        if (child._intersectsRect(this._parentMeasure!)) {
          child._render(context, this._parentMeasure!);
        }
      }
    } else {
      super._draw(context, invalidatedRectangle);
    }
  }

  /**
   * Post-measure processing to calculate content size
   * Expands to fit all children when not frozen
   */
  protected _postMeasure(): void {
    if (this._freezeControls) {
      super._postMeasure();
      return;
    }

    let maxWidth = this.parentClientWidth;
    let maxHeight = this.parentClientHeight;

    // Calculate required size to fit all children
    for (const child of this.children) {
      if (!child.isVisible || child.notRenderable) continue;

      // Center-aligned controls need position adjustment
      if (child.horizontalAlignment === Control.HORIZONTAL_ALIGNMENT_CENTER) {
        child._offsetLeft(this._currentMeasure.left - child._currentMeasure.left);
      }
      if (child.verticalAlignment === Control.VERTICAL_ALIGNMENT_CENTER) {
        child._offsetTop(this._currentMeasure.top - child._currentMeasure.top);
      }

      maxWidth = Math.max(
        maxWidth,
        child._currentMeasure.left - this._currentMeasure.left + 
        child._currentMeasure.width + child.paddingRightInPixels
      );
      maxHeight = Math.max(
        maxHeight,
        child._currentMeasure.top - this._currentMeasure.top + 
        child._currentMeasure.height + child.paddingBottomInPixels
      );
    }

    // Update dimensions if changed
    if (this._currentMeasure.width !== maxWidth) {
      this._width.updateInPlace(maxWidth, ValueAndUnit.UNITMODE_PIXEL);
      this._currentMeasure.width = maxWidth;
      this._rebuildLayout = true;
      this._isDirty = true;
    }

    if (this._currentMeasure.height !== maxHeight) {
      this._height.updateInPlace(maxHeight, ValueAndUnit.UNITMODE_PIXEL);
      this._currentMeasure.height = maxHeight;
      this._rebuildLayout = true;
      this._isDirty = true;
    }

    super._postMeasure();
  }
}