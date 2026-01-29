import { ExtraordinarySketch2d } from './ExtraordinarySketch2d';
import { Model } from './Model';
import { Util } from './Util';

interface ISketchData {
  edges?: IEdge[];
  [key: string]: unknown;
}

interface IEdge {
  curve: ICurve;
  isBackground?: boolean;
}

interface ICurve {
  // Base curve interface
}

interface ISketchInteractor {
  dirty(options: { type: string }): void;
}

export class MoveCurveRequest extends ExtraordinarySketch2d.Request.MoveCurveRequest {
  protected _edge!: IEdge;
  protected _sketchdata!: ISketchData;
  protected _clonedChangedSketchdata!: ISketchData;
  protected _sketchInteractor!: ISketchInteractor;

  protected getFilterFaceTopoTag(): string {
    return HSCore.Model.RoofsDrawingSketch2dBuilder.RegionTopoTag;
  }

  public isValid(): boolean {
    const curve = this._edge.curve;

    if (
      curve instanceof HSCore.Model.ExtraordinaryLine2d ||
      curve instanceof HSCore.Model.ExtraordinaryCircleArc2d
    ) {
      const allEdges = HSCore.Util.ExtraordinarySketch2d.getAllEdgesFromSketchData(
        this._sketchdata
      );

      const hasBackgroundEdges = allEdges.some((edge: IEdge) => edge.isBackground);
      const filterTag = hasBackgroundEdges ? undefined : this.getFilterFaceTopoTag();

      const isWireValid = HSApp.ExtraordinarySketch2d.Util.isWireValidByEdges(
        this._clonedChangedSketchdata,
        allEdges,
        filterTag
      );

      if (!isWireValid) {
        this._sketchInteractor.dirty({
          type: HSCore.Model.EntityEventType.Geometry
        });
        return false;
      }
    }

    return true;
  }
}