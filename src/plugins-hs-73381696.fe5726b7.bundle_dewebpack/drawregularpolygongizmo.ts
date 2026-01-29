import { HSApp } from './HSApp';

export class DrawRegularPolygonGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRegularPolygonGizmo {
  protected _getNormalTipKey(): string {
    return "slab_edit_sketch_draw_regular_polygon_tip";
  }
}