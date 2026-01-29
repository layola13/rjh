import { HSApp } from './HSApp';

export class AddGuideLineGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.AddExGuideLineGizmo {
  protected _getNormalTipKey(): string {
    return "slab_edit_sketch_add_guideline_tip";
  }
}