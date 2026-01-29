import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

export class MovePointRequest extends HSApp.ExtraordinarySketch2d.Request.MovePointRequest {
  getFilterFaceTopoTag(): typeof HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag {
    return HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag;
  }
}