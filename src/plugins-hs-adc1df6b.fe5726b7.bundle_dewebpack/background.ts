import { HSApp } from './HSApp';

export class Background extends HSApp.View.SVG.ExtraordinarySketch2d.Background {
  canShowDimensions(): boolean {
    return true;
  }
}