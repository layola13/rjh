import { Measure } from './measure';
import { Container } from './container';
import { ValueAndUnit } from './valueAndUnit';
import { Control } from './control';

/**
 * Bucket dictionary mapping bucket index to array of controls
 */
interface BucketMap {
  [key: number]: Control[];
}

/**
 * Custom data stored on controls for scroll optimization
 */
interface ScrollViewerCustomData {
  /** Original left position before freezing */
  _origLeft: number;
  /** Original top position before freezing */
  _origTop: number;
  /** Original left position for children container */
  origLeft?: number;
  /** Original top position for children container */
  origTop?: number;
  /** Original left position for children measure */
  origLeftForChildren?: number;
  /** Original top position for children measure */
  origTopForChildren?: number;
}

/**
 * A specialized container window for scroll viewers that provides performance optimizations
 * through control freezing and spatial bucketing for efficient rendering of large scrollable content.
 * 
 * When controls are frozen, their layout is cached and only scroll transforms are applied,
 * significantly improving performance for large lists or grids.
 */
export class _ScrollViewerWindow extends Container {
  /** Whether controls are frozen (layout cached for performance) */
  private _freezeControls: boolean = false;
  
  /** Width of spatial buckets for culling optimization */
  private _bucketWidth: number = 0;
  
  /** Height of spatial buckets for culling optimization */
  private _bucketHeight: number = 0;
  
  /** Spatial hash map of controls organized into buckets */
  private _buckets: BucketMap = {};
  
  /** Number of bucket columns */
  private _bucketLen?: number;
  
  /** Cached left scroll position from previous frame */
  private _oldLeft: number | null = null;
  
  /** Cached top scroll position from previous frame */
  private _oldTop: number | null = null;
  
  /** Parent measure used for clipping calculations */
  private _parentMeasure?: Measure;

  constructor(name?: string) {
    super(name);
  }

  /**
   * Gets whether controls are frozen (layout is cached).
   * When frozen, controls don't recalculate layout on scroll, improving performance.
   */
  get freezeControls(): boolean {
    return this._freezeControls;
  }

  /**
   * Sets whether to freeze controls layout for performance optimization.
   * When enabled, captures current layout and uses transforms for scrolling.
   * When disabled, restores normal layout behavior.
   */
  set freezeControls(value: boolean) {
    if (this._freezeControls === value) {
      return;
    }

    // Restore measures if unfreezing
    if (!value) {
      this._restoreMeasures();
    }

    this._freezeControls = false;

    // Force a full layout pass
    const size = this.host.getSize();
    const width = size.width;
    const height = size.height;
    const context = this.host.getContext();
    const measure = new Measure(0, 0, width, height);
    
    this.host._numLayoutCalls = 0;
    this.host._rootContainer._layout(measure, context);

    // Update measures and create buckets if freezing
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
   * Gets the width of spatial buckets used for culling optimization
   */
  get bucketWidth(): number {
    return this._bucketWidth;
  }

  /**
   * Gets the height of spatial buckets used for culling optimization
   */
  get bucketHeight(): number {
    return this._bucketHeight;
  }

  /**
   * Sets the bucket dimensions for spatial partitioning.
   * Larger buckets use less memory but provide coarser culling.
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
   * Determines if bucket-based culling should be used
   * @returns True if both bucket dimensions are positive
   */
  private _useBuckets(): boolean {
    return this._bucketWidth > 0 && this._bucketHeight > 0;
  }

  /**
   * Creates spatial hash buckets for all child controls.
   * Controls are assigned to buckets based on their bounds for efficient culling.
   */
  private _makeBuckets(): void {
    this._buckets = {};
    this._bucketLen = Math.ceil(this.widthInPixels / this._bucketWidth);
    this._dispatchInBuckets(this._children);
    this._oldLeft = null;
    this._oldTop = null;
  }

  /**
   * Recursively assigns controls to spatial buckets based on their bounds
   * 
   * @param controls - Array of controls to dispatch into buckets
   */
  private _dispatchInBuckets(controls: Control[]): void {
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];
      const customData = control._customData as ScrollViewerCustomData;
      const thisCustomData = this._customData as ScrollViewerCustomData;

      // Calculate bucket range this control occupies
      const minCol = Math.max(0, Math.floor((customData._origLeft - thisCustomData.origLeft!) / this._bucketWidth));
      const maxCol = Math.floor((customData._origLeft - thisCustomData.origLeft! + control._currentMeasure.width - 1) / this._bucketWidth);
      const maxRow = Math.floor((customData._origTop - thisCustomData.origTop! + control._currentMeasure.height - 1) / this._bucketHeight);
      const minRow = Math.max(0, Math.floor((customData._origTop - thisCustomData.origTop!) / this._bucketHeight));

      // Add control to all buckets it intersects
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
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
   * Updates and caches all control measures relative to scroll position.
   * Called when freezing controls to establish the baseline positions.
   */
  private _updateMeasures(): void {
    const left = this.leftInPixels | 0;
    const top = this.topInPixels | 0;

    // Offset measures by current scroll position
    this._measureForChildren.left -= left;
    this._measureForChildren.top -= top;
    this._currentMeasure.left -= left;
    this._currentMeasure.top -= top;

    // Cache original positions
    const customData = this._customData as ScrollViewerCustomData;
    customData.origLeftForChildren = this._measureForChildren.left;
    customData.origTopForChildren = this._measureForChildren.top;
    customData.origLeft = this._currentMeasure.left;
    customData.origTop = this._currentMeasure.top;

    this._updateChildrenMeasures(this._children, left, top);
  }

  /**
   * Recursively updates and caches child control measures
   * 
   * @param controls - Array of controls to update
   * @param leftOffset - Left offset to apply
   * @param topOffset - Top offset to apply
   */
  private _updateChildrenMeasures(controls: Control[], leftOffset: number, topOffset: number): void {
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];
      
      control._currentMeasure.left -= leftOffset;
      control._currentMeasure.top -= topOffset;
      
      const customData = control._customData as ScrollViewerCustomData;
      customData._origLeft = control._currentMeasure.left;
      customData._origTop = control._currentMeasure.top;

      // Recursively process containers
      if (control instanceof Container && control._children.length > 0) {
        this._updateChildrenMeasures(control._children, leftOffset, topOffset);
      }
    }
  }

  /**
   * Restores control measures to their original positions before freezing.
   * Called when unfreezing controls to resume normal layout behavior.
   */
  private _restoreMeasures(): void {
    const left = this.leftInPixels | 0;
    const top = this.topInPixels | 0;
    const customData = this._customData as ScrollViewerCustomData;

    this._measureForChildren.left = customData.origLeftForChildren! + left;
    this._measureForChildren.top = customData.origTopForChildren! + top;
    this._currentMeasure.left = customData.origLeft! + left;
    this._currentMeasure.top = customData.origTop! + top;
  }

  /**
   * @returns The type name of this control
   */
  protected _getTypeName(): string {
    return "ScrollViewerWindow";
  }

  /**
   * Additional processing during layout phase
   * 
   * @param parentMeasure - Parent container's measure
   * @param context - Canvas rendering context
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
   * Layout override that skips relayout when controls are frozen
   * 
   * @param parentMeasure - Parent container's measure
   * @param context - Canvas rendering context
   * @returns True if layout was performed
   */
  _layout(parentMeasure: Measure, context: CanvasRenderingContext2D): boolean {
    if (this._freezeControls) {
      this.invalidateRect();
      return false;
    }
    
    return super._layout(parentMeasure, context);
  }

  /**
   * Recursively scrolls children by updating their positions
   * 
   * @param controls - Array of controls to scroll
   * @param leftOffset - Left scroll offset
   * @param topOffset - Top scroll offset
   */
  private _scrollChildren(controls: Control[], leftOffset: number, topOffset: number): void {
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];
      const customData = control._customData as ScrollViewerCustomData;
      
      control._currentMeasure.left = customData._origLeft + leftOffset;
      control._currentMeasure.top = customData._origTop + topOffset;
      control._isClipped = false;

      // Recursively scroll container children
      if (control instanceof Container && control._children.length > 0) {
        this._scrollChildren(control._children, leftOffset, topOffset);
      }
    }
  }

  /**
   * Efficiently scrolls children using spatial bucket culling.
   * Only updates controls in visible buckets.
   * 
   * @param oldLeft - Previous left scroll position
   * @param oldTop - Previous top scroll position
   * @param newLeft - New left scroll position
   * @param newTop - New top scroll position
   */
  private _scrollChildrenWithBuckets(
    oldLeft: number, 
    oldTop: number, 
    newLeft: number, 
    newTop: number
  ): void {
    const minCol = Math.max(0, Math.floor(-oldLeft / this._bucketWidth));
    const maxCol = Math.floor((-oldLeft + this._parentMeasure!.width - 1) / this._bucketWidth);
    const maxRow = Math.floor((-oldTop + this._parentMeasure!.height - 1) / this._bucketHeight);
    const minRow = Math.max(0, Math.floor(-oldTop / this._bucketHeight));

    // Process all visible buckets
    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        const bucketIndex = row * this._bucketLen! + col;
        const bucket = this._buckets[bucketIndex];
        
        if (!bucket) continue;

        // Update all controls in this bucket
        for (let i = 0; i < bucket.length; i++) {
          const control = bucket[i];
          const customData = control._customData as ScrollViewerCustomData;
          
          control._currentMeasure.left = customData._origLeft + newLeft;
          control._currentMeasure.top = customData._origTop + newTop;
          control._isClipped = false;
        }
      }
    }
  }

  /**
   * Custom draw implementation with optimized scrolling when controls are frozen
   * 
   * @param context - Canvas rendering context
   * @param invalidatedRectangle - Rectangle that needs redrawing
   */
  _draw(context: CanvasRenderingContext2D, invalidatedRectangle?: Measure): void {
    if (!this._freezeControls) {
      super._draw(context, invalidatedRectangle);
      return;
    }

    this._localDraw(context);
    
    if (this.clipChildren) {
      this._clipForChildren(context);
    }

    const left = this.leftInPixels | 0;
    const top = this.topInPixels | 0;

    // Use bucket optimization if available and not first frame
    if (this._useBuckets() && this._oldLeft !== null && this._oldTop !== null) {
      this._scrollChildrenWithBuckets(this._oldLeft, this._oldTop, left, top);
      this._scrollChildrenWithBuckets(left, top, left, top);
    } else {
      this._scrollChildren(this._children, left, top);
    }

    this._oldLeft = left;
    this._oldTop = top;

    // Render visible children
    for (const child of this._children) {
      if (child._intersectsRect(this._parentMeasure!)) {
        child._render(context, this._parentMeasure!);
      }
    }
  }

  /**
   * Post-measure processing to calculate content bounds and update dimensions
   */
  protected _postMeasure(): void {
    if (this._freezeControls) {
      super._postMeasure();
      return;
    }

    let maxWidth = this.parentClientWidth;
    let maxHeight = this.parentClientHeight;

    // Calculate maximum content bounds
    for (const child of this.children) {
      if (!child.isVisible || child.notRenderable) {
        continue;
      }

      // Center-align offset corrections
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

    // Update dimensions if content size changed
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