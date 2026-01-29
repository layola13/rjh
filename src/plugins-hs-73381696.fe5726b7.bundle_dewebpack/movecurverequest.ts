import { HSApp } from './HSApp';

export class MoveCurveRequest extends HSApp.ExtraordinarySketch2d.Request.MoveCurveRequest {
  getFilterFaceTopoTag(): string {
    return "slabhole";
  }
}