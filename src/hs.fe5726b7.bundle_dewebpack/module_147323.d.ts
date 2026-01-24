/**
 * Layer transaction request type definitions
 * Provides string constants for all layer-related transaction and plugin request types
 */

/**
 * Slab editing plugin request types
 */
export interface SlabEditRequests {
  /** Draw lines request type */
  readonly DrawLines: "hsw.plugin.slabEdit.req.DrawLines";
  /** Draw rectangle request type */
  readonly DrawRectangle: "hsw.plugin.slabEdit.req.DrawRectangle";
  /** Draw circle request type */
  readonly DrawCircle: "hsw.plugin.slabEdit.req.DrawCircle";
  /** Draw regular polygon request type */
  readonly DrawRegularPolygon: "hsw.plugin.slabEdit.req.DrawRegularPolygon";
  /** Draw polygon request type */
  readonly DrawPolygon: "hsw.plugin.slabEdit.req.DrawPolygon";
  /** Add split point request type */
  readonly AddSplitPoint: "hsw.plugin.slabEdit.req.AddSplitPoint";
  /** Add guide line request type */
  readonly AddGuideLine: "hsw.plugin.slabEdit.req.AddGuideLine";
  /** Delete guide line request type */
  readonly DeleteGuideLine: "hsw.plugin.slabEdit.req.DeleteGuideLine";
  /** Draw fillet request type */
  readonly DrawFillet: "hsw.plugin.slabEdit.req.Fillet";
  /** Delete layer slab holes request type */
  readonly DeleteLayerSlabHoles: "hsw.plugin.slabEdit.req.DeleteLayerSlabHoles";
  /** Delete vertex request type */
  readonly DeleteVertex: "hsw.plugin.slabEdit.req.DeleteVertex";
  /** Move curve request type */
  readonly MoveCurve: "hsw.plugin.slabEdit.req.MoveCurve";
  /** Move point request type */
  readonly MovePoint: "hsw.plugin.slabEdit.req.MovePoint";
}

/**
 * Constraint layout plugin request types
 */
export interface ConstraintLayoutRequests {
  /** Apply layout request type */
  readonly ApplyLayout: "hsw.plugin.constraintLayout.req.ApplyLayout";
  /** Apply material to faces without mixpaint request type */
  readonly ApplyMaterialToFacesWithoutMixpaint: "hsw.plugin.constraintLayout.req.ApplyMaterialToFacesWithoutMixpaint";
  /** Change customized material request type */
  readonly ChangeCustomizedMaterial: "hsw.plugin.constraintLayout.req.ChangeCustomizedMaterial";
  /** Apply mood board layout request type */
  readonly ApplyMoodBoardLayout: "hsw.plugin.constraintLayout.req.ApplyMoodBoardLayout";
}

/**
 * All layer transaction request types
 * This object is frozen and cannot be modified
 */
export interface LayerTransactionRequests {
  /** Active layer request type */
  readonly ActiveLayer: "hsw.transaction.layer.ActiveLayerRequest";
  /** Insert new layer request type */
  readonly InsertNewLayer: "hsw.transaction.layer.InsertNewLayerRequest";
  /** Reset layer index request type */
  readonly ResetLayerIndex: "hsw.transaction.layer.ResetLayerIndexRequest";
  /** Add new layer request type */
  readonly AddNewLayer: "hsw.transaction.layer.AddNewLayerRequest";
  /** Delete layer request type */
  readonly DeleteLayer: "hsw.transaction.layer.DeleteLayerRequest";
  /** Change layer visibility request type */
  readonly ChangeLayerVisibility: "hsw.transaction.layer.ChangeLayerVisibilityRequest";
  /** Change layer height request type */
  readonly ChangeLayerHeight: "hsw.transaction.layer.ChangeLayerHeightRequest";
  /** Change layer thickness request type */
  readonly ChangeLayerThickness: "hsw.transaction.layer.ChangeLayerThicknessRequest";
  /** Delete slab profile point request type */
  readonly DeleteSlabProfilePoint: "hsw.transaction.layer.DeleteSlabProfilePointRequest";
  /** Split slab profile edge request type */
  readonly SplitSlabProfileEdge: "hsw.transaction.layer.SplitSlabProfileEdgeRequest";
  /** Change layer slabs request type */
  readonly ChangeLayerSlabs: "hsw.transaction.layer.ChangeLayerSlabsRequest";
  /** Change slab request type */
  readonly ChangeSlab: "hsw.transaction.layer.ChangeSlabRequest";
  /** Move slab profile edge request type */
  readonly MoveSlabProfileEdge: "hsw.transaction.layer.MoveSlabProfileEdge";
  /** Move slab profile vertex request type */
  readonly MoveSlabProfileVertex: "hsw.transaction.layer.MoveSlabProfileVertex";
  /** Rename layer request type */
  readonly RenameLayer: "hsw.transaction.layer.RenameLayer";
  /** Reset space request type */
  readonly ResetSpace: "hsw.transaction.layer.ResetSpace";
  /** Split space request type */
  readonly SplitSpace: "hsw.transaction.layer.SplitSpace";
  /** Delete space request type */
  readonly DeleteSpace: "hsw.transaction.layer.DeleteSpace";
  /** Copy paste rooms request type */
  readonly CopyPasteRooms: "hsw.transaction.layer.CopyPasteRooms";
  /** Create outdoor space request type */
  readonly CreateOutdoorSpace: "hsw.transaction.layer.CreateOutdoorSpaceRequest";
  /** Change slab thickness request type */
  readonly ChangeSlabThickness: "hsw.transaction.layer.ChangeSlabThicknessRequest";
  /** Cleanup layer request type */
  readonly CleanupLayer: "hsw.transaction.layer.CleanupLayerRequest";
  /** Cleanup all layer request type */
  readonly CleanupAllLayer: "hsw.transaction.layer.CleanupAllLayerRequest";
  /** Toggle layer visibility request type */
  readonly ToggleLayerVisibility: "hsw.transaction.layer.ToggleLayerVisibilityRequest";
  /** Delete slab request type */
  readonly DeleteSlab: "hsw.transaction.layer.DeleteSlabRequest";
  /** Translate layer request type */
  readonly TranslateLayer: "hsw.transaction.layer.TranslateLayerRequest";
  /** Slab editing plugin request types */
  readonly SlabEdit: SlabEditRequests;
  /** Constraint layout plugin request types */
  readonly ConstraintLayout: ConstraintLayoutRequests;
}

/**
 * Frozen constant object containing all layer transaction request type strings
 * @readonly
 */
declare const layerTransactionRequests: Readonly<LayerTransactionRequests>;

export default layerTransactionRequests;