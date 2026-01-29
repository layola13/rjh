import { Loop } from './Loop';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

interface RoofMeta {
  [key: string]: unknown;
}

interface Layer {
  height: number;
  [key: string]: unknown;
}

interface DrawingRegion {
  outerLoop: {
    getAllCurves(): unknown[];
  } | null;
  roof?: unknown;
}

interface RoofParams {
  meta: RoofMeta;
  layer: Layer;
  drawingRegion: DrawingRegion;
}

interface CmdAddRoofByDrawingParams {
  roofs: RoofParams[];
}

interface RoofRelation {
  drawingRegion: DrawingRegion;
  roof: unknown;
}

interface RelationsData {
  relations: RoofRelation[];
}

interface AddRoofRequestParams {
  meta: RoofMeta;
  layer: Layer;
  loop: Loop;
  roomHeight: number;
  linkWallIds: unknown[];
  generatedType: number;
  isPreview: boolean;
  updateParams: {
    offset: number;
  };
}

interface Request {
  result: unknown;
}

export class CmdAddRoofByDrawing extends HSApp.Cmd.Command {
  private _params: CmdAddRoofByDrawingParams;

  constructor(params: CmdAddRoofByDrawingParams) {
    super();
    this._params = params;
  }

  onExecute(): void {
    const transactionManager = HSApp.App.getApp().transManager;
    const session = transactionManager.startSession();
    const relationsData: RelationsData = {
      relations: []
    };

    this._params.roofs.forEach((roofParam: RoofParams) => {
      const outerLoop = roofParam.drawingRegion.outerLoop;
      
      if (outerLoop) {
        const mergedCurves = HSCore.Util.Roof.mergeCurves(outerLoop.getAllCurves());
        const loop = new Loop(mergedCurves);
        
        const addRoofParams: AddRoofRequestParams = {
          meta: roofParam.meta,
          layer: roofParam.layer,
          loop: loop,
          roomHeight: HSCore.Util.Unit.ConvertMeterToCustom("mm", roofParam.layer.height),
          linkWallIds: [],
          generatedType: HSCore.Model.ParametricRoofGeneratedTypeEnum.DRAW,
          isPreview: false,
          updateParams: {
            offset: 0
          }
        };

        const addRoofRequest = transactionManager.createRequest(
          HSFPConstants.RequestType.AddRoof,
          [addRoofParams]
        );
        transactionManager.commit(addRoofRequest);

        const roofResult = addRoofRequest.result;

        relationsData.relations.push({
          drawingRegion: roofParam.drawingRegion,
          roof: roofResult
        });

        if (roofParam.drawingRegion.roof) {
          const deleteRoofRequest = transactionManager.createRequest(
            HSFPConstants.RequestType.DeleteRoof,
            [roofParam.drawingRegion.roof]
          );
          transactionManager.commit(deleteRoofRequest);
        }
      }
    });

    const updateRelationRequest = transactionManager.createRequest(
      HSFPConstants.RequestType.RoofsDrawing.UpdateRoofRelation,
      [relationsData]
    );
    transactionManager.commit(updateRelationRequest);
    session.commit();
    this.mgr.complete(this);
  }

  getDescription(): string {
    return "手动画化屋顶";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.RoofsDrawing;
  }
}