import { HSApp } from './HSApp';

/**
 * DrawRectangleGizmo class for drawing rectangles in 2D sketch mode
 */
export class DrawRectangleGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRectangleGizmo {
  /**
   * Returns the localization key for the normal tip message
   * @returns The tip key for rectangle drawing operation
   */
  protected _getNormalTipKey(): string {
    return "slab_edit_sketch_draw_rectangle_tip";
  }
}