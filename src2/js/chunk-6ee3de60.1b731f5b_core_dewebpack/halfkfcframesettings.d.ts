/**
 * Half KFC Frame Settings Module
 * Provides settings and manipulation methods for half KFC frame objects
 */

import { FrameSettings } from './FrameSettings';
import { Polygon } from './Polygon';
import { View } from './View';
import { Layer } from './Layer';
import { MomentoManager } from './MomentoManager';

/**
 * Frame manager interface for handling frame operations
 */
interface IFrameManager {
  /**
   * Recreates the frame with updated parameters
   * @param polygon - The polygon object to recreate
   * @param view - The view context
   */
  recreated(polygon: Polygon, view: View): void;
  
  /**
   * Gets the edge width at specified index
   * @param index - Edge index
   * @returns Width of the edge
   */
  getEdgeWidth(index: number): number;
}

/**
 * Frame interface representing a frame object
 */
interface IFrame {
  /** The polygon shape of the frame */
  polygon: Polygon;
  
  /** Frame manager instance */
  frameManager: IFrameManager;
  
  /**
   * Hides assistance UI elements
   */
  hideAssist(): void;
}

/**
 * Settings class for Half KFC Frame
 * Extends base FrameSettings with specific polygon manipulation capabilities
 */
export class HalfKfcFrameSettings extends FrameSettings {
  /** Reference to the frame object */
  protected frame: IFrame;
  
  /** Reference to the view context */
  protected view: View;

  /**
   * Gets the polygon associated with this frame
   * @returns The frame's polygon object
   */
  get poly(): Polygon {
    return this.frame.polygon;
  }

  /**
   * Gets the horizontal flip state of the polygon
   * @returns True if the polygon is horizontally flipped
   */
  get xFlip(): boolean {
    return this.poly.xFlip;
  }

  /**
   * Sets the horizontal flip state of the polygon
   * Triggers frame recreation, hides assist UI, redraws layer, and creates checkpoint
   * @param value - New flip state
   */
  set xFlip(value: boolean) {
    if (this.poly.xFlip !== value) {
      const flippedPolygon = this.poly.flipX();
      this.frame.frameManager.recreated(flippedPolygon, this.view);
      this.frame.hideAssist();
      this.view.activeLayer.batchDraw();
      this.view.momentoManager.checkPoint();
    }
  }

  /**
   * Fixes the inner dimensions of the frame based on edge width
   * Adjusts profile size, recreates frame, and updates view state
   */
  fixInnerDim(): void {
    const edgeWidth = this.frame.frameManager.getEdgeWidth(0);
    const updatedPolygon = this.poly.setProfileSize(edgeWidth);
    this.frame.frameManager.recreated(updatedPolygon, this.view);
    this.frame.hideAssist();
    this.view.activeLayer.batchDraw();
    this.view.momentoManager.checkPoint();
  }
}