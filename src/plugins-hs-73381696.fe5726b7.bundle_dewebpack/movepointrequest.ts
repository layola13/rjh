import { HSApp } from './HSApp';

export class MovePointRequest extends HSApp.ExtraordinarySketch2d.Request.MovePointRequest {
  public getFilterFaceTopoTag(): string {
    return "slabhole";
  }
}