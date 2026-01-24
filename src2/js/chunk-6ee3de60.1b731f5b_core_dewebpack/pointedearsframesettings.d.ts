/**
 * PointedEarsFrameSettings module
 * Provides settings and configuration for pointed ears frame polygons.
 * Original Module ID: 505
 */

import Vector from './Vector'; // Module 0
import { Direction } from './Direction'; // Module 11
import { EdgeJointWay } from './EdgeJointWay'; // Module 2
import { FrameSettings } from './FrameSettings'; // Module 109

/**
 * Represents the polygon interface with ear-specific properties
 */
interface IPointedEarsPolygon {
  /** Current position of the ears on the frame */
  earPosition: Direction;
  /** Whether the polygon has a base structure */
  hasBase: boolean;
  /** Array controlling the pulling height of the polygon [base, adjustment] */
  pullingHeight: [number, number];
  /** Center position of the bounding box */
  box: { center: Vector };
  /** Current position of the polygon */
  position: Vector;
  /** List of edges in the polygon */
  edges: Array<unknown>;
  
  /** Initializes the polygon layout based on current settings */
  initLayout(): void;
  /** Translates the polygon by the given vector */
  translate(offset: Vector): void;
}

/**
 * Represents the frame object containing polygon and manager
 */
interface IFrame {
  /** The polygon instance associated with this frame */
  polygon: IPointedEarsPolygon;
  /** Manager responsible for frame operations */
  frameManager: IFrameManager;
  
  /** Hides assistance guides/overlays */
  hideAssist(): void;
}

/**
 * Frame manager handling polygon recreation and edge joint configurations
 */
interface IFrameManager {
  /** Edge joint way configuration array for each edge */
  ejw: EdgeJointWay[];
  
  /**
   * Recreates the polygon with updated settings
   * @param polygon - The polygon to recreate
   * @param view - The view context for rendering
   */
  recreated(polygon: IPointedEarsPolygon, view: IView): void;
}

/**
 * View interface managing layers and state
 */
interface IView {
  /** The currently active rendering layer */
  activeLayer: ILayer;
  /** Manager for undo/redo checkpoints */
  mometoManager: IMomentoManager;
}

/**
 * Layer interface for rendering operations
 */
interface ILayer {
  /** Redraws all elements in the layer efficiently */
  batchDraw(): void;
}

/**
 * Momento manager for handling undo/redo checkpoints
 */
interface IMomentoManager {
  /** Creates a checkpoint for the current state */
  checkPoint(): void;
}

/**
 * Settings class for pointed ears frame polygons.
 * Extends base FrameSettings with ear-specific configuration options.
 */
export class PointedEarsFrameSettings extends FrameSettings {
  /** Reference to the frame instance */
  protected frame!: IFrame;
  /** Reference to the view instance */
  protected view!: IView;

  /**
   * Gets the polygon instance from the frame
   * @returns The pointed ears polygon
   */
  protected get poly(): IPointedEarsPolygon {
    return this.frame.polygon;
  }

  /**
   * Gets the current ear position on the frame
   * @returns The direction where ears are positioned (Up, Down, Left, Right)
   */
  get earPosition(): Direction {
    return this.poly.earPosition;
  }

  /**
   * Sets the ear position and reinitializes the polygon layout
   * Resets base and pulling height when position changes
   * @param value - New ear position direction
   */
  set earPosition(value: Direction) {
    if (this.poly.earPosition !== value) {
      this.poly.hasBase = true;
      this.poly.pullingHeight[1] = 0;
      this.poly.earPosition = value;
      this.poly.initLayout();
      
      // Recenter the polygon after layout change
      const offset = Vector.vector(this.poly.box.center, this.poly.position);
      this.poly.translate(offset);
      
      this.frame.frameManager.recreated(this.poly, this.view);
      this.frame.hideAssist();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Sets the joint way for all edges of the frame
   * First edge always uses Default joint way
   * @param value - The edge joint way to apply to all edges
   */
  set jointWay(value: EdgeJointWay) {
    this.frame.polygon.edges.forEach((_edge, index) => {
      this.frame.frameManager.ejw[index] = value;
    });
    
    // Override first edge to always use default
    this.frame.frameManager.ejw[0] = EdgeJointWay.Default;
    
    this.frame.frameManager.recreated(this.frame.polygon, this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets whether the polygon has a base structure
   * @returns True if base exists, false otherwise
   */
  get hasBase(): boolean {
    return this.poly.hasBase;
  }

  /**
   * Sets whether the polygon should have a base structure
   * Only applicable when ears are not positioned Up or Down
   * Resets pulling height when base state changes
   * @param value - True to enable base, false to disable
   */
  set hasBase(value: boolean) {
    const isVerticalPosition = 
      this.poly.earPosition === Direction.Up || 
      this.poly.earPosition === Direction.Down;
    
    if (this.hasBase !== value && !isVerticalPosition) {
      this.poly.hasBase = value;
      this.poly.pullingHeight[1] = 0;
      
      this.frame.frameManager.recreated(this.poly, this.view);
      this.frame.hideAssist();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Gets the current pulling height adjustment value
   * @returns The pulling height adjustment (second element of pullingHeight array)
   */
  get pullingHeight(): number {
    return this.poly.pullingHeight[1];
  }

  /**
   * Sets the pulling height adjustment for the polygon
   * Only applicable when base exists and ears are not positioned Up or Down
   * Value must be non-negative
   * @param value - New pulling height adjustment value (must be >= 0)
   */
  set pullingHeight(value: number) {
    const isVerticalPosition = 
      this.poly.earPosition === Direction.Up || 
      this.poly.earPosition === Direction.Down;
    
    const shouldUpdate = 
      this.hasBase && 
      !isVerticalPosition && 
      value >= 0 && 
      value !== this.pullingHeight;
    
    if (shouldUpdate) {
      this.poly.pullingHeight[1] = value;
      
      this.frame.frameManager.recreated(this.poly, this.view);
      this.frame.hideAssist();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }
}