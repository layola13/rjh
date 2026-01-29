import { HSApp } from './HSApp';

export class MovePointRequest extends HSApp.ExtraordinarySketch2d.Request.MovePointRequest {
  getFilterFaceTopoTag(): string {
    return HSCore.Model.RoofsDrawingSketch2dBuilder.RegionTopoTag;
  }
}