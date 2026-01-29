const LayerTransactionTypes = {
  ActiveLayer: "hsw.transaction.layer.ActiveLayerRequest",
  InsertNewLayer: "hsw.transaction.layer.InsertNewLayerRequest",
  ResetLayerIndex: "hsw.transaction.layer.ResetLayerIndexRequest",
  AddNewLayer: "hsw.transaction.layer.AddNewLayerRequest",
  DeleteLayer: "hsw.transaction.layer.DeleteLayerRequest",
  ChangeLayerVisibility: "hsw.transaction.layer.ChangeLayerVisibilityRequest",
  ChangeLayerHeight: "hsw.transaction.layer.ChangeLayerHeightRequest",
  ChangeLayerThickness: "hsw.transaction.layer.ChangeLayerThicknessRequest",
  DeleteSlabProfilePoint: "hsw.transaction.layer.DeleteSlabProfilePointRequest",
  SplitSlabProfileEdge: "hsw.transaction.layer.SplitSlabProfileEdgeRequest",
  ChangeLayerSlabs: "hsw.transaction.layer.ChangeLayerSlabsRequest",
  ChangeSlab: "hsw.transaction.layer.ChangeSlabRequest",
  MoveSlabProfileEdge: "hsw.transaction.layer.MoveSlabProfileEdge",
  MoveSlabProfileVertex: "hsw.transaction.layer.MoveSlabProfileVertex",
  RenameLayer: "hsw.transaction.layer.RenameLayer",
  ResetSpace: "hsw.transaction.layer.ResetSpace",
  SplitSpace: "hsw.transaction.layer.SplitSpace",
  DeleteSpace: "hsw.transaction.layer.DeleteSpace",
  CopyPasteRooms: "hsw.transaction.layer.CopyPasteRooms",
  CreateOutdoorSpace: "hsw.transaction.layer.CreateOutdoorSpaceRequest",
  ChangeSlabThickness: "hsw.transaction.layer.ChangeSlabThicknessRequest",
  CleanupLayer: "hsw.transaction.layer.CleanupLayerRequest",
  CleanupAllLayer: "hsw.transaction.layer.CleanupAllLayerRequest",
  ToggleLayerVisibility: "hsw.transaction.layer.ToggleLayerVisibilityRequest",
  DeleteSlab: "hsw.transaction.layer.DeleteSlabRequest",
  TranslateLayer: "hsw.transaction.layer.TranslateLayerRequest",
  SlabEdit: {
    DrawLines: "hsw.plugin.slabEdit.req.DrawLines",
    DrawRectangle: "hsw.plugin.slabEdit.req.DrawRectangle",
    DrawCircle: "hsw.plugin.slabEdit.req.DrawCircle",
    DrawRegularPolygon: "hsw.plugin.slabEdit.req.DrawRegularPolygon",
    DrawPolygon: "hsw.plugin.slabEdit.req.DrawPolygon",
    AddSplitPoint: "hsw.plugin.slabEdit.req.AddSplitPoint",
    AddGuideLine: "hsw.plugin.slabEdit.req.AddGuideLine",
    DeleteGuideLine: "hsw.plugin.slabEdit.req.DeleteGuideLine",
    DrawFillet: "hsw.plugin.slabEdit.req.Fillet",
    DeleteLayerSlabHoles: "hsw.plugin.slabEdit.req.DeleteLayerSlabHoles",
    DeleteVertex: "hsw.plugin.slabEdit.req.DeleteVertex",
    MoveCurve: "hsw.plugin.slabEdit.req.MoveCurve",
    MovePoint: "hsw.plugin.slabEdit.req.MovePoint"
  },
  ConstraintLayout: {
    ApplyLayout: "hsw.plugin.constraintLayout.req.ApplyLayout",
    ApplyMaterialToFacesWithoutMixpaint: "hsw.plugin.constraintLayout.req.ApplyMaterialToFacesWithoutMixpaint",
    ChangeCustomizedMaterial: "hsw.plugin.constraintLayout.req.ChangeCustomizedMaterial",
    ApplyMoodBoardLayout: "hsw.plugin.constraintLayout.req.ApplyMoodBoardLayout"
  }
} as const;

export type LayerTransactionTypes = typeof LayerTransactionTypes;

export default LayerTransactionTypes;