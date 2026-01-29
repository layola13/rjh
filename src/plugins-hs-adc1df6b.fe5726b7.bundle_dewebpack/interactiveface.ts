import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

export class InteractiveFace extends HSApp.ExtraordinarySketch2d.InteractiveModel {
  canEdit(): boolean {
    if (!super.canEdit()) {
      return false;
    }

    const sketchable = this.builder.sketchable;
    
    if (sketchable instanceof HSCore.Model.RoofDrawingRegion) {
      return !sketchable.roof;
    }

    return true;
  }
}