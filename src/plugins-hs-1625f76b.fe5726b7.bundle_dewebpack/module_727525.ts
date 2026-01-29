import { HSApp } from './518193';
import { CmdMoveParametricBackgroundWall } from './979634';
import { CmdMoveNCPBackgroundWallUnit } from './471593';
import { CmdRotateContent } from './433805';
import { CmdRotateContents } from './24644';
import { CmdContentArcArray } from './557333';
import { CmdReplaceZooWeeRRModel } from './938282';
import { CmdEditParametricBackgroundWallIsAutoFit } from './518313';
import { CmdMoveInHardDecoration } from './862898';
import { CmdMoveNCPBgWallInWFA } from './991793';
import { CmdRotateInHardDecoration } from './632048';
import { CmdResizeInHardDecoration } from './472611';
import { MoveParamrtricBackgroundWallRequest } from './352700';
import { MoveNCPBackgroundWallUnitRequest } from './992535';
import { RotateContentRequest } from './35183';
import { EditParametricBackgroundWallIsAutoFitRequest } from './350383';
import { AddMeshContentRequest } from './161789';
import { TransformInHardDecorationRequest } from './934901';
import CmdAddProduct from './736073';
import CmdDeleteContent from './439151';
import CmdDisplayAllContent from './69833';
import CmdDisplayContent from './881944';
import CmdDisplayContents from './889127';
import CmdDuplicateContent from './247453';
import CmdFlipContent from './799567';
import CmdFlipOpening from './173526';
import CmdMoveContent from './680089';
import CmdMoveContents from './818300';
import CmdReplaceContent from './415594';
import CmdRequestWrap from './988244';
import CmdCreateParametricCeiling from './469714';
import CmdAlign from './83312';
import CmdContentArray from './777035';
import CmdApplyParamsToAllOpening from './130523';
import ReqAddAssembly from './409156';
import ReqAddBayWindow from './357612';
import ReqAddContentNew from './251766';
import ReqAddContent from './939955';
import ReqPlaceSoftCloth from './558380';
import ReqRestoreSoftCloth from './711629';
import ReqAddCornerFlatWindow from './624890';
import ReqAddCornerWindow from './338155';
import ReqAddPAssemblyPackage from './750144';
import ReqAddPAssembly from './698040';
import ReqAddPOrdinaryWindow from './309354';
import ReqAddProduct from './333993';
import ReqDeleteAssembly from './927354';
import ReqDeleteContent from './726209';
import ReqDeleteCornerWindow from './616561';
import ReqDeleteCustomizedCabinet from './445263';
import ReqDeleteCustomizedModel from './929744';
import ReqDeleteNgmOpening from './796914';
import ReqDeletePAssembly from './653546';
import ReqDeleteProduct from './213579';
import ReqDisplayContent from './437232';
import ReqFlipContent from './748689';
import ReqGroupContents from './649670';
import ReqMoveContentRequest from './77999';
import ReqMoveCeilingContentRequest from './628118';
import ReqReplaceProduct from './257546';
import ReqUngroupContents from './430213';
import ReqOverwriteEntityRequest from './722111';
import ReqFlipOpeningRequest from './639508';
import ReqAddProxyModelRequest from './573909';
import ReqApplyParamsToAllOpeningRequest from './882813';
import ReqDeletePlatform from './721945';

interface PluginContext {
    app: {
        cmdManager: {
            register(commands: Array<[string, any]>): void;
        };
        transManager: {
            register(requests: Array<[string, any]>): void;
        };
    };
}

interface PluginConfig {
    name: string;
    description: string;
    dependencies: string[];
}

class ContentEditPlugin extends HSApp.Plugin.IPlugin {
    constructor() {
        super({
            name: "content editing",
            description: "Process content edit commands.",
            dependencies: []
        });
    }

    onActive(context: PluginContext): void {
        context.app.cmdManager.register([
            [HSFPConstants.CommandType.AddProduct, CmdAddProduct],
            [HSFPConstants.CommandType.DeleteContent, CmdDeleteContent],
            [HSFPConstants.CommandType.DisplayAllContent, CmdDisplayAllContent],
            [HSFPConstants.CommandType.DisplayContent, CmdDisplayContent],
            [HSFPConstants.CommandType.DisplayContents, CmdDisplayContents],
            [HSFPConstants.CommandType.DuplicateContent, CmdDuplicateContent],
            [HSFPConstants.CommandType.FlipContent, CmdFlipContent],
            [HSFPConstants.CommandType.FlipOpening, CmdFlipOpening],
            [HSFPConstants.CommandType.MoveContent, CmdMoveContent],
            [HSFPConstants.CommandType.MoveContents, CmdMoveContents],
            [HSFPConstants.CommandType.MoveParametricBackgroundWall, CmdMoveParametricBackgroundWall],
            [HSFPConstants.CommandType.MoveNCPBackgroundWallUnit, CmdMoveNCPBackgroundWallUnit],
            [HSFPConstants.CommandType.ReplaceContent, CmdReplaceContent],
            [HSFPConstants.CommandType.RotateContent, CmdRotateContent],
            [HSFPConstants.CommandType.RotateContents, CmdRotateContents],
            [HSFPConstants.CommandType.CmdRequestWrap, CmdRequestWrap],
            [HSFPConstants.CommandType.CreateParametricCeiling, CmdCreateParametricCeiling],
            [HSFPConstants.CommandType.CmdAlign, CmdAlign],
            [HSFPConstants.CommandType.CmdContentArray, CmdContentArray],
            [HSFPConstants.CommandType.CmdContentArcArray, CmdContentArcArray],
            [HSFPConstants.CommandType.ApplyParamsToAllOpening, CmdApplyParamsToAllOpening],
            [HSFPConstants.CommandType.EditParametricBackgroundWallIsAutoFit, CmdEditParametricBackgroundWallIsAutoFit],
            [HSFPConstants.CommandType.CmdReplaceZooWeeRRModel, CmdReplaceZooWeeRRModel],
            [HSFPConstants.CommandType.MoveInHardDecoration, CmdMoveInHardDecoration],
            [HSFPConstants.CommandType.MoveNCPBgWallInWFA, CmdMoveNCPBgWallInWFA],
            [HSFPConstants.CommandType.RotateInHardDecoration, CmdRotateInHardDecoration],
            [HSFPConstants.CommandType.ResizeInHardDecoration, CmdResizeInHardDecoration]
        ]);

        context.app.transManager.register([
            [HSFPConstants.RequestType.AddAssembly, ReqAddAssembly],
            [HSFPConstants.RequestType.AddBayWindow, ReqAddBayWindow],
            [HSFPConstants.RequestType.AddContentNew, ReqAddContentNew],
            [HSFPConstants.RequestType.AddContent, ReqAddContent],
            [HSFPConstants.RequestType.PlaceSoftCloth, ReqPlaceSoftCloth],
            [HSFPConstants.RequestType.RestoreSoftCloth, ReqRestoreSoftCloth],
            [HSFPConstants.RequestType.AddCornerFlatWindow, ReqAddCornerFlatWindow],
            [HSFPConstants.RequestType.AddCornerWindow, ReqAddCornerWindow],
            [HSFPConstants.RequestType.AddPAssemblyPackage, ReqAddPAssemblyPackage],
            [HSFPConstants.RequestType.AddPAssembly, ReqAddPAssembly],
            [HSFPConstants.RequestType.AddPOrdinaryWindow, ReqAddPOrdinaryWindow],
            [HSFPConstants.RequestType.AddProduct, ReqAddProduct],
            [HSFPConstants.RequestType.DeleteAssembly, ReqDeleteAssembly],
            [HSFPConstants.RequestType.DeleteContent, ReqDeleteContent],
            [HSFPConstants.RequestType.DeleteCornerWindow, ReqDeleteCornerWindow],
            [HSFPConstants.RequestType.DeleteCustomizedCabinet, ReqDeleteCustomizedCabinet],
            [HSFPConstants.RequestType.DeleteCustomizedModel, ReqDeleteCustomizedModel],
            [HSFPConstants.RequestType.DeleteNgmOpening, ReqDeleteNgmOpening],
            [HSFPConstants.RequestType.DeletePAssembly, ReqDeletePAssembly],
            [HSFPConstants.RequestType.DeleteProduct, ReqDeleteProduct],
            [HSFPConstants.RequestType.DisplayContent, ReqDisplayContent],
            [HSFPConstants.RequestType.FlipContent, ReqFlipContent],
            [HSFPConstants.RequestType.GroupContents, ReqGroupContents],
            [HSFPConstants.RequestType.MoveContentRequest, ReqMoveContentRequest],
            [HSFPConstants.RequestType.MoveCeilingContentRequest, ReqMoveCeilingContentRequest],
            [HSFPConstants.RequestType.MoveParamrtricBackgroundWallRequest, MoveParamrtricBackgroundWallRequest],
            [HSFPConstants.RequestType.MoveNCPBackgroundWallUnitRequest, MoveNCPBackgroundWallUnitRequest],
            [HSFPConstants.RequestType.ReplaceProduct, ReqReplaceProduct],
            [HSFPConstants.RequestType.RotateContent, RotateContentRequest],
            [HSFPConstants.RequestType.UngroupContents, ReqUngroupContents],
            [HSFPConstants.RequestType.DistributionContents, HSApp.Request.Implement.DistributionContentsRequest],
            [HSFPConstants.RequestType.OverwriteEntityRequest, ReqOverwriteEntityRequest],
            [HSFPConstants.RequestType.FlipOpeningRequest, ReqFlipOpeningRequest],
            [HSFPConstants.RequestType.AddProxyModelRequest, ReqAddProxyModelRequest],
            [HSFPConstants.RequestType.ApplyParamsToAllOpeningRequest, ReqApplyParamsToAllOpeningRequest],
            [HSFPConstants.RequestType.DeletePlatform, ReqDeletePlatform],
            [HSFPConstants.RequestType.EditParametricBackgroundWallIsAutoFit, EditParametricBackgroundWallIsAutoFitRequest],
            [HSFPConstants.RequestType.AddMeshContent, AddMeshContentRequest],
            [HSFPConstants.RequestType.TransformInHardDecoration, TransformInHardDecorationRequest]
        ]);
    }

    onDeactive(): void {
        // Cleanup logic when plugin is deactivated
    }
}

HSApp.Plugin.registerPlugin("hsw.plugin.ContentEdit.Plugin", ContentEditPlugin);