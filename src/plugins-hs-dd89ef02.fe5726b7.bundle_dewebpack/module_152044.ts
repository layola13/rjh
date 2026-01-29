import { CmdApplyToAllFace } from './CmdApplyToAllFace';
import { ApplyToAllWallFaceMoldingRequest } from './ApplyToAllWallFaceMoldingRequest';
import { ApplyToAllWallFacePaperRequest } from './ApplyToAllWallFacePaperRequest';
import { ApplyToAllBeamFacePaperRequest } from './ApplyToAllBeamFacePaperRequest';
import { EditWallFacePaperRequest } from './EditWallFacePaperRequest';
import { CmdCreateFreeformNGWall } from './CmdCreateFreeformNGWall';
import { CmdMoveNGWall } from './CmdMoveNGWall';
import { CmdDeleteNGWall } from './CmdDeleteNGWall';
import { CmdDeleteNGWalls } from './CmdDeleteNGWalls';
import { CmdSplitNGWall } from './CmdSplitNGWall';
import { CmdMergeNGWallOnPoint } from './CmdMergeNGWallOnPoint';
import { CmdMergeWall } from './CmdMergeWall';
import { CmdAlignWall } from './CmdAlignWall';
import { CmdChangeWallType } from './CmdChangeWallType';
import { CmdFreeCutWall } from './CmdFreeCutWall';
import { CmdCutWall } from './CmdCutWall';
import { CmdCreateRectWalls } from './CmdCreateRectWalls';
import { CmdChangeWallSagitta } from './CmdChangeWallSagitta';
import { CmdResizeWalls } from './CmdResizeWalls';
import { CmdChangeWallsWidth } from './CmdChangeWallsWidth';
import { CmdChangeWallAutoConnect } from './CmdChangeWallAutoConnect';
import { CmdHideWall } from './CmdHideWall';
import { CmdToArcWall } from './CmdToArcWall';
import { changeMoldingTypeAdapter } from './changeMoldingTypeAdapter';
import { changeMoldingTextureAdapter } from './changeMoldingTextureAdapter';
import { CmdAddFaceMolding } from './CmdAddFaceMolding';
import { CmdDeleteFaceMolding } from './CmdDeleteFaceMolding';
import { CmdClearFacesMolding } from './CmdClearFacesMolding';
import { CmdApplyToAllRoomFace } from './CmdApplyToAllRoomFace';
import { MoveNGWallRequest } from './MoveNGWallRequest';
import { MoveTgWallRequest } from './MoveTgWallRequest';
import { MoveTGWallPointRequest } from './MoveTGWallPointRequest';
import { DeleteNGWallRequest } from './DeleteNGWallRequest';
import { DeleteTGWallRequest } from './DeleteTGWallRequest';
import { DeleteTGWallsRequest } from './DeleteTGWallsRequest';
import { DeleteNGWallsRequest } from './DeleteNGWallsRequest';
import { MoveNGWallPointRequest } from './MoveNGWallPointRequest';
import { CmdMoveNGWallPoint } from './CmdMoveNGWallPoint';
import { AddFaceMoldingRequest } from './AddFaceMoldingRequest';
import { DeleteFaceMoldingRequest } from './DeleteFaceMoldingRequest';
import { ChangeFaceMoldingTextureRequest } from './ChangeFaceMoldingTextureRequest';
import { ChangeMoldingTypeRequest } from './ChangeMoldingTypeRequest';
import { ApplyToAllRoomWallFaceMoldingRequest } from './ApplyToAllRoomWallFaceMoldingRequest';
import { CreateRectWallsRequest } from './CreateRectWallsRequest';
import { CreateFreeformNGWallRequest } from './CreateFreeformNGWallRequest';
import { SplitNGWallRequest } from './SplitNGWallRequest';
import { FreeCutWallRequest } from './FreeCutWallRequest';
import { CutWallRequest } from './CutWallRequest';
import { MergeWallOnPointRequest } from './MergeWallOnPointRequest';
import { MergeWallRequest } from './MergeWallRequest';
import { ChangeWallTypeRequest } from './ChangeWallTypeRequest';
import { ChangeTGWallTypeRequest } from './ChangeTGWallTypeRequest';
import { ResizeWallsRequest } from './ResizeWallsRequest';
import { ChangeWallsWidthRequest } from './ChangeWallsWidthRequest';
import { ChangeWallAutoConnectRequest } from './ChangeWallAutoConnectRequest';
import { ResizeTgWallsRequest } from './ResizeTgWallsRequest';
import { ChangeToArcWallRequest } from './ChangeToArcWallRequest';
import { ChangeWallSagittaRequest } from './ChangeWallSagittaRequest';
import { ChangeTgWallCurveRequest } from './ChangeTgWallCurveRequest';
import { ChangeWallCurveRequest } from './ChangeWallCurveRequest';
import { WallEditHook } from './WallEditHook';
import type { IPlugin, PluginActivationContext } from './types/Plugin';
import type { WallEditHandler } from './types/WallEditHandler';

interface PluginMetadata {
  name: string;
  description: string;
  dependencies: string[];
}

class WallEditPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    const metadata: PluginMetadata = {
      name: 'wall editing',
      description: 'Process wall edit commands and its gizmos.',
      dependencies: [HSFPConstants.PluginType.Ngmmixpaint]
    };
    super(metadata);
  }

  onActive(context: PluginActivationContext): void {
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.CreateFreeformNGWall, CmdCreateFreeformNGWall],
      [HSFPConstants.CommandType.MoveNGWall, CmdMoveNGWall],
      [HSFPConstants.CommandType.MoveNGWallPoint, CmdMoveNGWallPoint],
      [HSFPConstants.CommandType.DeleteNGWall, CmdDeleteNGWall],
      [HSFPConstants.CommandType.DeleteNGWalls, CmdDeleteNGWalls],
      [HSFPConstants.CommandType.SplitNGWall, CmdSplitNGWall],
      [HSFPConstants.CommandType.MergeNGWallOnPoint, CmdMergeNGWallOnPoint],
      [HSFPConstants.CommandType.MergeWall, CmdMergeWall],
      [HSFPConstants.CommandType.AlignWall, CmdAlignWall],
      [HSFPConstants.CommandType.ChangeNGWallType, CmdChangeWallType],
      [HSFPConstants.CommandType.FreeCutWall, CmdFreeCutWall],
      [HSFPConstants.CommandType.CutWall, CmdCutWall],
      [HSFPConstants.CommandType.CreateRectNGWalls, CmdCreateRectWalls],
      [HSFPConstants.CommandType.ChangeWallSagitta, CmdChangeWallSagitta],
      [HSFPConstants.CommandType.ResizeWalls, CmdResizeWalls],
      [HSFPConstants.CommandType.ChangeWallsWidth, CmdChangeWallsWidth],
      [HSFPConstants.CommandType.ChangeWallAutoConnect, CmdChangeWallAutoConnect],
      [HSFPConstants.CommandType.HideWall, CmdHideWall],
      [HSFPConstants.CommandType.ToArcWall, CmdToArcWall],
      [HSFPConstants.CommandType.ChangeFaceMoldingType, HSFPConstants.CommandType.OpenIndependentPanel, changeMoldingTypeAdapter],
      [HSFPConstants.CommandType.ChangeFaceMoldingTexture, HSFPConstants.CommandType.OpenIndependentPanel, changeMoldingTextureAdapter],
      [HSFPConstants.CommandType.AddFaceMolding, CmdAddFaceMolding],
      [HSFPConstants.CommandType.DeleteFaceMolding, CmdDeleteFaceMolding],
      [HSFPConstants.CommandType.ApplyMoldingToAllFace, CmdApplyToAllFace],
      [HSFPConstants.CommandType.ClearFacesMolding, CmdClearFacesMolding],
      [HSFPConstants.CommandType.ApplyMoldingToAllRoomFace, CmdApplyToAllRoomFace]
    ]);

    context.app.transManager.register([
      [HSFPConstants.RequestType.MoveNGWall, MoveNGWallRequest],
      [HSFPConstants.RequestType.MoveTGWall, MoveTgWallRequest],
      [HSFPConstants.RequestType.MoveTGWallPoint, MoveTGWallPointRequest],
      [HSFPConstants.RequestType.DeleteNGWall, DeleteNGWallRequest],
      [HSFPConstants.RequestType.DeleteTGWall, DeleteTGWallRequest],
      [HSFPConstants.RequestType.DeleteTGWalls, DeleteTGWallsRequest],
      [HSFPConstants.RequestType.DeleteNGWalls, DeleteNGWallsRequest],
      [HSFPConstants.RequestType.MoveNGWallPoint, MoveNGWallPointRequest],
      [HSFPConstants.RequestType.AddWallFaceMolding, AddFaceMoldingRequest],
      [HSFPConstants.RequestType.DeleteWallFaceMolding, DeleteFaceMoldingRequest],
      [HSFPConstants.RequestType.ChangeFaceMoldingTexture, ChangeFaceMoldingTextureRequest],
      [HSFPConstants.RequestType.ChangeWallMoldingType, ChangeMoldingTypeRequest],
      [HSFPConstants.RequestType.ApplyToAllWallFaceMolding, ApplyToAllWallFaceMoldingRequest],
      [HSFPConstants.RequestType.ApplyToAllRoomWallFaceMolding, ApplyToAllRoomWallFaceMoldingRequest],
      [HSFPConstants.RequestType.ApplyToAllWallFacePaper, ApplyToAllWallFacePaperRequest],
      [HSFPConstants.RequestType.ApplyToAllBeamFacePaper, ApplyToAllBeamFacePaperRequest],
      [HSFPConstants.RequestType.EditWallFacePaper, EditWallFacePaperRequest],
      [HSFPConstants.RequestType.CreateRectWalls, CreateRectWallsRequest],
      [HSFPConstants.RequestType.CreateFreeformNGWall, CreateFreeformNGWallRequest],
      [HSFPConstants.RequestType.SplitNGWall, SplitNGWallRequest],
      [HSFPConstants.RequestType.FreeCutWall, FreeCutWallRequest],
      [HSFPConstants.RequestType.CutWall, CutWallRequest],
      [HSFPConstants.RequestType.MergeWallOnPoint, MergeWallOnPointRequest],
      [HSFPConstants.RequestType.MergeWall, MergeWallRequest],
      [HSFPConstants.RequestType.ChangeWallType, ChangeWallTypeRequest],
      [HSFPConstants.RequestType.ChangeTGWallType, ChangeTGWallTypeRequest],
      [HSFPConstants.RequestType.ResizeWalls, ResizeWallsRequest],
      [HSFPConstants.RequestType.ChangeWallsWidth, ChangeWallsWidthRequest],
      [HSFPConstants.RequestType.ChangeWallAutoConnect, ChangeWallAutoConnectRequest],
      [HSFPConstants.RequestType.ResizeTgWalls, ResizeTgWallsRequest],
      [HSFPConstants.RequestType.ChangeToArcWall, ChangeToArcWallRequest],
      [HSFPConstants.RequestType.ChangeWallSagitta, ChangeWallSagittaRequest],
      [HSFPConstants.RequestType.ChangeTgWallCurve, ChangeTgWallCurveRequest],
      [HSFPConstants.RequestType.ChangeWallCurve, ChangeWallCurveRequest]
    ]);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }

  registerWallEditHandler(handler: WallEditHandler): void {
    WallEditHook.getInstance().addHandler(handler);
  }

  unRegisterWallEditHandler(handler: WallEditHandler): void {
    WallEditHook.getInstance().removeHandler(handler);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.WallEdit, WallEditPlugin);