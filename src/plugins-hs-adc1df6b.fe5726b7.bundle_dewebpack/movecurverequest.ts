import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

export class MoveCurveRequest extends HSApp.ExtraordinarySketch2d.Request.MoveCurveRequest {
  getFilterFaceTopoTag(): typeof HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag {
    return HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag;
  }
}