/**
 * Sash bar settings module
 * Manages configuration and behavior of individual sash bars (frame edges)
 */

import { Arc } from './geometry';
import { EventType } from './events';
import { KfcSash, HardwareOnEdge } from './sash';
import { SlideHardwareManager } from './hardware';

/**
 * Settings and configuration for a specific sash bar (frame edge)
 * Provides access to properties like hinge edge, handle edge, and edge width
 */
export class SashBarSettings {
  /**
   * The sash hardware manager this bar belongs to
   */
  private readonly manager: any; // TODO: Add proper SashHardwareManager type

  /**
   * Index of this bar in the frame's edge array
   */
  private readonly frameBarIndex: number;

  /**
   * The view context for rendering and state management
   */
  private readonly view: any; // TODO: Add proper View type

  /**
   * Creates a new sash bar settings instance
   * @param manager - The sash hardware manager
   * @param frameBarIndex - Index of the frame bar
   * @param view - The view context
   */
  constructor(manager: any, frameBarIndex: number, view: any) {
    this.manager = manager;
    this.frameBarIndex = frameBarIndex;
    this.view = view;
  }

  /**
   * Checks if the sash is a KFC (Kentucky Fried Chicken) style sash
   * @returns True if the sash is a KfcSash instance
   */
  get isKfcSash(): boolean {
    return this.manager.sash instanceof KfcSash;
  }

  /**
   * Checks if the hardware manager is for sliding windows
   * @returns True if the manager is a SlideHardwareManager
   */
  get isSlide(): boolean {
    return this.manager instanceof SlideHardwareManager;
  }

  /**
   * Checks if this bar represents an arc edge
   * @returns True if the edge at this index is an Arc geometry
   */
  get isArc(): boolean {
    return this.manager.sash.polygon.edge(this.frameBarIndex) instanceof Arc;
  }

  /**
   * Checks if this bar is the hinge edge for the sash
   * Only applicable for non-slide, non-KFC sashes
   * @returns True if this is the hinge edge
   */
  get isHingeEdge(): boolean {
    return (
      !this.isSlide &&
      !this.isKfcSash &&
      this.sashHardware.hingeEdgeIndex === this.frameBarIndex
    );
  }

  /**
   * Sets this bar as the hinge edge
   * Updates all hinges to attach to this edge and redraws
   * @param value - True to set as hinge edge
   */
  set isHingeEdge(value: boolean) {
    if (
      this.sashHardware.hingeEdgeIndex !== this.frameBarIndex &&
      value
    ) {
      // Update all hinges to point to this edge
      this.sashHardware.hinges.forEach((hinge: any) => {
        hinge.edgeIndex = this.frameBarIndex;
        hinge.updatePoly();
      });

      // Update handle and indicator positions
      this.sashHardware.handle.updatePoly();
      this.sashHardware.indicator.updatePoly();

      // Redraw and save state
      this.sash.draw(this.view);
      this.broadcastTopViewChange();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Checks if this bar is the handle edge for the sash
   * Only applicable for non-slide, non-KFC sashes with edge-mounted handles
   * @returns True if this is the handle edge
   */
  get isHandleEdge(): boolean {
    return (
      !this.isSlide &&
      !this.isKfcSash &&
      this.sashHardware.handle instanceof HardwareOnEdge &&
      this.sashHardware.handle.edgeIndex === this.frameBarIndex
    );
  }

  /**
   * Sets this bar as the handle edge
   * Updates handle position and redraws
   * @param value - True to set as handle edge
   */
  set isHandleEdge(value: boolean) {
    if (
      this.sashHardware.handle instanceof HardwareOnEdge &&
      this.sashHardware.handle.edgeIndex !== this.frameBarIndex &&
      value
    ) {
      // Move handle to this edge
      this.sashHardware.handle.edgeIndex = this.frameBarIndex;
      this.sashHardware.handle.updatePoly();
      this.sashHardware.indicator.updatePoly();

      // Redraw and save state
      this.sash.draw(this.view);
      this.broadcastTopViewChange();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Gets the sash object this bar belongs to
   * @returns The sash instance
   */
  get sash(): any {
    return this.manager.sash;
  }

  /**
   * Gets the sash hardware manager
   * @returns The hardware manager instance
   */
  get sashHardware(): any {
    return this.manager;
  }

  /**
   * Gets the width of this edge/bar
   * @returns The edge width in current units
   */
  get edgeWidth(): number {
    return this.sash.frameManager.getEdgeWidth(this.frameBarIndex);
  }

  /**
   * Sets the width of this edge/bar
   * Triggers redraw if the value changes
   * @param value - The new edge width
   */
  set edgeWidth(value: number) {
    const sash = this.sash;
    if (this.edgeWidth !== value) {
      sash.frameManager.setEdgeWidth(
        this.frameBarIndex,
        value,
        this.view,
        true
      );
    }
  }

  /**
   * Broadcasts a top view change event to the event bus
   * Notifies listeners that the top view needs to be updated
   */
  private broadcastTopViewChange(): void {
    this.view.eventBus.emit({
      type: EventType.top_view_change,
      payload: {
        view: this.view,
        frame: this.manager.sash.topFrame,
      },
    });
  }
}