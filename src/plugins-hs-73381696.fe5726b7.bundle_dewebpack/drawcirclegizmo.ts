import { HSApp } from './HSApp';

export class DrawCircleGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExCircleGizmo {
  protected _getNormalTipKey(): string {
    return "slab_edit_sketch_draw_circle_tip";
  }
}