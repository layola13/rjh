/**
 * Transaction request type definitions for the HSW (Home Style Widget) system.
 * This module contains all available transaction request type identifiers used throughout the application.
 * @module TransactionRequestTypes
 */

/**
 * Enumeration of all transaction request types in the HSW system.
 * These string constants represent fully qualified class names for various transaction requests
 * related to content manipulation, assembly operations, window management, and customization.
 * 
 * @remarks
 * This object is frozen and cannot be modified at runtime.
 * Each property maps to a specific transaction request handler in the HSW framework.
 */
export interface TransactionRequestTypes {
  /** Add assembly request - hsw.transaction.content.AddAssemblyRequest */
  readonly AddAssembly: "hsw.transaction.content.AddAssemblyRequest";
  
  /** Add parametric assembly request - hsw.transaction.content.AddPAssemblyRequest */
  readonly AddPAssembly: "hsw.transaction.content.AddPAssemblyRequest";
  
  /** Add parametric assembly package request - hsw.transaction.content.AddPAssemblyPackage */
  readonly AddPAssemblyPackage: "hsw.transaction.content.AddPAssemblyPackage";
  
  /** Add content request - hsw.transaction.content.AddContentRequest */
  readonly AddContent: "hsw.transaction.content.AddContentRequest";
  
  /** Add content request (new version) - hsw.transaction.content.AddContentRequestNew */
  readonly AddContentNew: "hsw.transaction.content.AddContentRequestNew";
  
  /** Add corner window request - hsw.transaction.content.AddCornerWindowRequest */
  readonly AddCornerWindow: "hsw.transaction.content.AddCornerWindowRequest";
  
  /** Add corner flat window request - hsw.transaction.content.AddCornerFlatWindowRequest */
  readonly AddCornerFlatWindow: "hsw.transaction.content.AddCornerFlatWindowRequest";
  
  /** Add parametric ordinary window request - hsw.transaction.content.AddPOrdinaryWindowRequest */
  readonly AddPOrdinaryWindow: "hsw.transaction.content.AddPOrdinaryWindowRequest";
  
  /** Add product request - hsw.transaction.content.AddProductRequest */
  readonly AddProduct: "hsw.transaction.content.AddProductRequest";
  
  /** Add bay window request - hsw.transaction.content.AddBayWindowRequest */
  readonly AddBayWindow: "hsw.transaction.content.AddBayWindowRequest";
  
  /** Delete assembly request - hsw.transaction.content.DeleteAssemblyRequest */
  readonly DeleteAssembly: "hsw.transaction.content.DeleteAssemblyRequest";
  
  /** Delete content request - hsw.transaction.content.DeleteContentRequest */
  readonly DeleteContent: "hsw.transaction.content.DeleteContentRequest";
  
  /** Delete customized cabinet request - hsw.transaction.content.DeleteCustomizedCabinetRequest */
  readonly DeleteCustomizedCabinet: "hsw.transaction.content.DeleteCustomizedCabinetRequest";
  
  /** Delete customized model request - hsw.transaction.content.DeleteCustomizedModelRequest */
  readonly DeleteCustomizedModel: "hsw.transaction.content.DeleteCustomizedModelRequest";
  
  /** Delete corner window request - hsw.transaction.content.DeleteCornerWindowRequest */
  readonly DeleteCornerWindow: "hsw.transaction.content.DeleteCornerWindowRequest";
  
  /** Delete product request - hsw.transaction.content.DeleteProductRequest */
  readonly DeleteProduct: "hsw.transaction.content.DeleteProductRequest";
  
  /** Delete parametric assembly request - hsw.transaction.content.DeletePAssemblyRequest */
  readonly DeletePAssembly: "hsw.transaction.content.DeletePAssemblyRequest";
  
  /** Delete platform request - hsw.transaction.content.DeletePlatformRequest */
  readonly DeletePlatform: "hsw.transaction.content.DeletePlatformRequest";
  
  /** Display content request - hsw.transaction.content.DisplayContentRequest */
  readonly DisplayContent: "hsw.transaction.content.DisplayContentRequest";
  
  /** Flip content request - hsw.transaction.content.FlipContentRequest */
  readonly FlipContent: "hsw.transaction.content.FlipContentRequest";
  
  /** Group contents request - hsw.transaction.content.GroupContentsRequest */
  readonly GroupContents: "hsw.transaction.content.GroupContentsRequest";
  
  /** Distribution contents request - hsw.transaction.content.DistributionContentsRequest */
  readonly DistributionContents: "hsw.transaction.content.DistributionContentsRequest";
  
  /** Replace product request - hsw.transaction.content.ReplaceProductRequest */
  readonly ReplaceProduct: "hsw.transaction.content.ReplaceProductRequest";
  
  /** Rotate content request - hsw.transaction.content.RotateContentRequest */
  readonly RotateContent: "hsw.transaction.content.RotateContentRequest";
  
  /** Rotate customized model - hsw.transaction.content.RotateCustomizedModel */
  readonly RotateCustomizedModel: "hsw.transaction.content.RotateCustomizedModel";
  
  /** Move content request - hsw.transaction.content.MoveContentRequest */
  readonly MoveContentRequest: "hsw.transaction.content.MoveContentRequest";
  
  /** Move ceiling content request - hsw.transaction.content.MoveCeilingContentRequest */
  readonly MoveCeilingContentRequest: "hsw.transaction.content.MoveCeilingContentRequest";
  
  /** Move parametric background wall request - hsw.transaction.content.MoveParamrtricBackgroundWallRequest */
  readonly MoveParamrtricBackgroundWallRequest: "hsw.transaction.content.MoveParamrtricBackgroundWallRequest";
  
  /** Move NCP background wall unit request - hsw.transaction.content.MoveNCPBackgroundWallUnitRequest */
  readonly MoveNCPBackgroundWallUnitRequest: "hsw.transaction.content.MoveNCPBackgroundWallUnitRequest";
  
  /** Ungroup contents request - hsw.transaction.content.UngroupContentsRequest */
  readonly UngroupContents: "hsw.transaction.content.UngroupContentsRequest";
  
  /** Delete NGM opening request - hsw.transaction.content.DeleteNgmOpeningRequest */
  readonly DeleteNgmOpening: "hsw.transaction.content.DeleteNgmOpeningRequest";
  
  /** Place soft cloth request - hsw.transaction.content.PlaceSoftClothRequest */
  readonly PlaceSoftCloth: "hsw.transaction.content.PlaceSoftClothRequest";
  
  /** Restore soft cloth request - hsw.transaction.content.RestoreSoftClothRequest */
  readonly RestoreSoftCloth: "hsw.transaction.content.RestoreSoftClothRequest";
  
  /** Edit corner window request - hsw.transaction.content.EditCornerWindowRequest */
  readonly EditCornerWindow: "hsw.transaction.content.EditCornerWindowRequest";
  
  /** Apply parameters to all opening request - hsw.transaction.content.ApplyParamsToAllOpeningRequest */
  readonly ApplyParamsToAllOpeningRequest: "hsw.transaction.content.ApplyParamsToAllOpeningRequest";
  
  /** Apply parameters to all window - hsw.transaction.content.ApplyParamsToAllCornerWindowRequest */
  readonly ApplyParamsToAllWindow: "hsw.transaction.content.ApplyParamsToAllCornerWindowRequest";
  
  /** Change corner window material request - hsw.transaction.content.ChangeCornerWindowMaterialRequest */
  readonly ChangeCornerWindowMaterial: "hsw.transaction.content.ChangeCornerWindowMaterialRequest";
  
  /** Show/hide corner window child request - hsw.transaction.content.ShowHideCornerWindowChildRequest */
  readonly ShowHideCornerWindowChild: "hsw.transaction.content.ShowHideCornerWindowChildRequest";
  
  /** Change window frame number request - hsw.transaction.content.ChangeWindowFrameNumberRequest */
  readonly ChangeWindowFrameNumber: "hsw.transaction.content.ChangeWindowFrameNumberRequest";
  
  /** Change window frame width request - hsw.transaction.content.ChangeWindowFrameWidthRequest */
  readonly ChangeWindowFrameWidth: "hsw.transaction.content.ChangeWindowFrameWidthRequest";
  
  /** Change material to host request - hsw.transaction.content.ChangeMaterialTohostRequest */
  readonly ChangeMaterialTohost: "hsw.transaction.content.ChangeMaterialTohostRequest";
  
  /** Change corner window pocket style request - hsw.transaction.content.ChangeCornerWindowPocketStyleRequest */
  readonly ChangeCornerWindowPocketStyleRequest: "hsw.transaction.content.ChangeCornerWindowPocketStyleRequest";
  
  /** Change corner window material rotation - hsw.transaction.content.ChangeCornerWindowMaterialRotation */
  readonly ChangeCornerWindowMaterialRotation: "hsw.transaction.content.ChangeCornerWindowMaterialRotation";
  
  /** Change corner window pocket width request - hsw.transaction.content.ChangeCornerWindowPocketWidthRequest */
  readonly ChangeCornerWindowPocketWidth: "hsw.transaction.content.ChangeCornerWindowPocketWidthRequest";
  
  /** Change corner window pocket thickness request - hsw.transaction.content.ChangeCornerWindowPocketThicknessRequest */
  readonly ChangeCornerWindowPocketThickness: "hsw.transaction.content.ChangeCornerWindowPocketThicknessRequest";
  
  /** Change corner window pocket outer width request - hsw.transaction.content.ChangeCornerWindowPocketOuterWidthRequest */
  readonly ChangeCornerWindowPocketOuterWidth: "hsw.transaction.content.ChangeCornerWindowPocketOuterWidthRequest";
  
  /** Change corner window pocket outer thickness request - hsw.transaction.content.ChangeCornerWindowPocketOuterThicknessRequest */
  readonly ChangeCornerWindowPocketOuterThickness: "hsw.transaction.content.ChangeCornerWindowPocketOuterThicknessRequest";
  
  /** Edit parametric ceiling request - hsw.transaction.content.EditParametricCeilingRequest */
  readonly EditParametricCeiling: "hsw.transaction.content.EditParametricCeilingRequest";
  
  /** Edit customized molding request - hsw.transaction.content.EditCustomizedMoldingRequest */
  readonly EditCustomizedMolding: "hsw.transaction.content.EditCustomizedMoldingRequest";
  
  /** New edit parametric ceiling request - hsw.transaction.content.NEditParametricCeilingRequest */
  readonly NEditParametricCeiling: "hsw.transaction.content.NEditParametricCeilingRequest";
  
  /** Edit NCP background wall base request - hsw.transaction.content.EditNCPBackgroundWallBaseRequest */
  readonly EditNCPBackgroundWallBase: "hsw.transaction.content.EditNCPBackgroundWallBaseRequest";
  
  /** Edit NCP background wall unit self molding request - hsw.transaction.content.EditNCPBackgroundWallUnitSelfMoldingRequest */
  readonly EditNCPBackgroundWallUnitSelfMolding: "hsw.transaction.content.EditNCPBackgroundWallUnitSelfMoldingRequest";
  
  /** Resize new customized parametric model - hsw.transaction.content.ResizeNCustomizedParametricModel */
  readonly ResizeNCustomizedParametricModel: "hsw.transaction.content.ResizeNCustomizedParametricModel";
  
  /** Resize new customized parametric stairs - hsw.transaction.content.ResizeNCustomizedParametricStairs */
  readonly ResizeNCustomizedParametricStairs: "hsw.transaction.content.ResizeNCustomizedParametricStairs";
  
  /** Scale new customized parametric stairs request - hsw.transaction.content.ScaleNCustomizedParametricStairsRequest */
  readonly ScaleNCustomizedParametricStairsRequest: "hsw.transaction.content.ScaleNCustomizedParametricStairsRequest";
  
  /** Add new customized molding request - hsw.plugin.ncustomizedmodeling.AddNCustomizedMoldingRequest */
  readonly AddNCustomizedMolding: "hsw.plugin.ncustomizedmodeling.AddNCustomizedMoldingRequest";
  
  /** Preview new customized molding request - hsw.plugin.ncustomizedmodeling.PreviewNCustomizedMoldingRequest */
  readonly PreviewNCustomizedMoldingRequest: "hsw.plugin.ncustomizedmodeling.PreviewNCustomizedMoldingRequest";
  
  /** Delete new customized model molding request - hsw.plugin.ncustomizedmodel.DeleteNCustomizedModelMoldingRequest */
  readonly DeleteNCustomizedModelMolding: "hsw.plugin.ncustomizedmodel.DeleteNCustomizedModelMoldingRequest";
  
  /** Add new customized model light slot request - hsw.plugin.ncustomizedmodeling.AddNCustomizedModelLightSlotRequest */
  readonly AddNCustomizedModelLightSlot: "hsw.plugin.ncustomizedmodeling.AddNCustomizedModelLightSlotRequest";
  
  /** Delete new customized model light slot request - hsw.plugin.ncustomizedmodel.DeleteNCustomizedModelLightSlotRequest */
  readonly DeleteNCustomizedModelLightSlot: "hsw.plugin.ncustomizedmodel.DeleteNCustomizedModelLightSlotRequest";
  
  /** Delete new customized model light band request - hsw.plugin.ncustomizedmodel.DeleteNCustomizedModelLightBandRequest */
  readonly DeleteNCustomizedModelLightBand: "hsw.plugin.ncustomizedmodel.DeleteNCustomizedModelLightBandRequest";
  
  /** Edit new customized molding request - hsw.transaction.content.EditNCustomizedModelMoldingRequest */
  readonly EditNCustomizedMolding: "hsw.transaction.content.EditNCustomizedModelMoldingRequest";
  
  /** Add new customized model light band request - hsw.plugin.ncustomizedmodeling.AddNCustomizedModelLightBandRequest */
  readonly AddNCustomizedModelLightBand: "hsw.plugin.ncustomizedmodeling.AddNCustomizedModelLightBandRequest";
  
  /** Flip new customized molding request - hsw.transaction.content.FlipNCustomizedMoldingRequest */
  readonly FlipNCustomizedMolding: "hsw.transaction.content.FlipNCustomizedMoldingRequest";
  
  /** Change new customized molding type - hsw.plugin.ncustomizedmodel.ChangeNCustomizedMoldingType */
  readonly ChangeNCustomizedMoldingType: "hsw.plugin.ncustomizedmodel.ChangeNCustomizedMoldingType";
  
  /** Flip new customized light slot request - hsw.plugin.ncustomizedmodel.FlipNCustomizedLightSlotRequest */
  readonly FlipNCustomizedLightSlot: "hsw.plugin.ncustomizedmodel.FlipNCustomizedLightSlotRequest";
  
  /** Edit parametric background wall auto-fit request - hsw.transaction.content.EditParametricBackgroundWallIsAutoFitRequest */
  readonly EditParametricBackgroundWallIsAutoFit: "hsw.transaction.content.EditParametricBackgroundWallIsAutoFitRequest";
  
  /** Edit parametric content base request - hsw.transaction.content.EditParametricContentBaseRequest */
  readonly EditParametricContentBase: "hsw.transaction.content.EditParametricContentBaseRequest";
  
  /** Assign host request - hsw.transaction.content.AssignHostRequest */
  readonly AssignHost: "hsw.transaction.content.AssignHostRequest";
  
  /** Auto fit content - hsw.transaction.content.AutoFitContent */
  readonly AutoFitContent: "hsw.transaction.content.AutoFitContent";
  
  /** Add D assembly - hsw.transaction.customization.AddDAssembly */
  readonly AddDAssembly: "hsw.transaction.customization.AddDAssembly";
  
  /** Delete D assembly - hsw.transaction.customization.DeleteDAssembly */
  readonly DeleteDAssembly: "hsw.transaction.customization.DeleteDAssembly";
  
  /** Flip group request - HSCore.Transaction.Group.FlipGroupRequest */
  readonly FlipGroup: "HSCore.Transaction.Group.FlipGroupRequest";
  
  /** Move content request - hsw.plugin.contentmanipulation.MoveContentRequest */
  readonly MoveContent: "hsw.plugin.contentmanipulation.MoveContentRequest";
  
  /** Rename content request - hsw.plugin.contentmanipulation.RenameContentRequest */
  readonly RenameContent: "hsw.plugin.contentmanipulation.RenameContentRequest";
  
  /** Resize content request - hsw.plugin.contentmanipulation.ResizeContentRequest */
  readonly ResizeContent: "hsw.plugin.contentmanipulation.ResizeContentRequest";
  
  /** Resize opening profile request - hsw.plugin.contentmanipulation.ResizeOpeningProfileRequest */
  readonly ResizeOpeningProfile: "hsw.plugin.contentmanipulation.ResizeOpeningProfileRequest";
  
  /** Resize customized model request - hsw.plugin.customizedmodeling.ResizeCustomizedModelRequest */
  readonly ResizeCustomizedModel: "hsw.plugin.customizedmodeling.ResizeCustomizedModelRequest";
  
  /** Change component material request - hsw.plugin.contentmanipulation.ChangeComponentMaterialRequest */
  readonly ChangeComponentMaterial: "hsw.plugin.contentmanipulation.ChangeComponentMaterialRequest";
  
  /** Move opening request - hsw.plugin.contentmanipulation.MoveOpeningRequest */
  readonly MoveOpening: "hsw.plugin.contentmanipulation.MoveOpeningRequest";
  
  /** Move roof opening request - hsw.plugin.contentmanipulation.MoveRoofOpeningRequest */
  readonly MoveRoofOpening: "hsw.plugin.contentmanipulation.MoveRoofOpeningRequest";
  
  /** Add opening request - hsw.plugin.contentmanipulation.AddOpeningRequest */
  readonly AddOpening: "hsw.plugin.contentmanipulation.AddOpeningRequest";
  
  /** Rotate hole request - hsw.plugin.contentmanipulation.RotateHoleRequest */
  readonly RotateHole: "hsw.plugin.contentmanipulation.RotateHoleRequest";
  
  /** Overwrite entity request - hsw.plugin.contentedit.OverwriteEntityRequest */
  readonly OverwriteEntityRequest: "hsw.plugin.contentedit.OverwriteEntityRequest";
  
  /** Paste content - hsw.plugin.editor.PasteContent */
  readonly PasteContent: "hsw.plugin.editor.PasteContent";
  
  /** Apply wall board - hsw.plugin.wallboard.ApplyWallBoard */
  readonly ApplyWallBoard: "hsw.plugin.wallboard.ApplyWallBoard";
  
  /** Apply material to wall board request - hsw.plugin.wallboard.ApplyMaterialToWallBoardRequest */
  readonly ApplyMaterialToWallBoardRequest: "hsw.plugin.wallboard.ApplyMaterialToWallBoardRequest";
  
  /** Reset curtain request - hsw.plugin.curtain.ResetCurtainRequest */
  readonly ResetCurtain: "hsw.plugin.curtain.ResetCurtainRequest";
  
  /** Show/hide curtain component request - hsw.plugin.curtain.ShowHideCurtainComponentRequest */
  readonly ShowHideCurtainComponent: "hsw.plugin.curtain.ShowHideCurtainComponentRequest";
  
  /** Change component position request - hsw.plugin.customizedcabinet.ChangeComponentPositionRequest */
  readonly ChangeComponentPositionRequest: "hsw.plugin.customizedcabinet.ChangeComponentPositionRequest";
  
  /** Change drawer position request - hsw.plugin.customizedcabinet.ChangeDrawerPositionRequest */
  readonly ChangeDrawerPositionRequest: "hsw.plugin.customizedcabinet.ChangeDrawerPositionRequest";
  
  /** Apply material to obstacle request - hsw.plugin.kitchenobstacle.ApplyMaterialToObstacleRequest */
  readonly ApplyMaterialToObstacleRequest: "hsw.plugin.kitchenobstacle.ApplyMaterialToObstacleRequest";
  
  /** Apply material to roof obstacle request - hsw.plugin.roofobstacle.ApplyMaterialToRoofObstacleRequest */
  readonly ApplyMaterialToRoofObstacleRequest: "hsw.plugin.roofobstacle.ApplyMaterialToRoofObstacleRequest";
  
  /** Flip opening request - hsw.transaction.content.FlipOpeningRequest */
  readonly FlipOpeningRequest: "hsw.transaction.content.FlipOpeningRequest";
  
  /** Add proxy model request - hsw.transaction.content.AddProxyModelRequest */
  readonly AddProxyModelRequest: "hsw.transaction.content.AddProxyModelRequest";
  
  /** Update function component size - hsw.plugin.customization.UpdateFunctionComponentSize */
  readonly UpdateFunctionComponentSize: "hsw.plugin.customization.UpdateFunctionComponentSize";
  
  /** Add proxy DIYs request - hsw.plugin.autostyler.AddProxyDiysRequest */
  readonly AddProxyDiysRequest: "hsw.plugin.autostyler.AddProxyDiysRequest";
  
  /** Add mesh content request - hsw.transaction.content.AddMeshContentRequest */
  readonly AddMeshContent: "hsw.transaction.content.AddMeshContentRequest";
  
  /** Transform in hard decoration - hsw.transaction.harddecoration.TransformInHardDecoration */
  readonly TransformInHardDecoration: "hsw.transaction.harddecoration.TransformInHardDecoration";
}

/**
 * Frozen constant object containing all transaction request type identifiers.
 * This is the default export providing runtime access to transaction type strings.
 */
declare const TransactionRequestTypes: Readonly<TransactionRequestTypes>;

export default TransactionRequestTypes;