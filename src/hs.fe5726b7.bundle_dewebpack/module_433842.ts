export interface RoofsDrawingCommands {
  DrawLines: string;
  DrawRectangle: string;
  DrawCircle: string;
  DrawRegularPolygon: string;
  DrawPolygon: string;
  AddSplitPoint: string;
  AddGuideLine: string;
  DeleteGuideLine: string;
  DrawFillet: string;
  DeleteVertex: string;
  MoveCurve: string;
  MovePoint: string;
  UpdateRoofRelation: string;
  DeleteRoofRegion: string;
}

export interface RoofTransactionCommands {
  AddRoof: string;
  EndRoofPreview: string;
  ChangeRoofParam: string;
  ToggleGenerateRoof: string;
  ReplaceRoof: string;
  DeleteRoof: string;
  UpdateRoofDirection: string;
  ClearRoofFaceMaterial: string;
  ResetRoofFaceMaterial: string;
  RoofsDrawing: RoofsDrawingCommands;
}

const roofTransactionCommands: Readonly<RoofTransactionCommands> = Object.freeze({
  AddRoof: "hsw.transaction.roof.AddRoof",
  EndRoofPreview: "hsw.transaction.roof.EndRoofPreview",
  ChangeRoofParam: "hsw.transaction.roof.ChangeRoofParam",
  ToggleGenerateRoof: "hsw.transaction.roof.ToggleGenerateRoof",
  ReplaceRoof: "hsw.transaction.roof.ReplaceRoof",
  DeleteRoof: "hsw.transaction.roof.DeleteRoof",
  UpdateRoofDirection: "hsw.transaction.roof.UpdateRoofDirection",
  ClearRoofFaceMaterial: "hsw.transaction.roof.ClearRoofFaceMaterial",
  ResetRoofFaceMaterial: "hsw.transaction.roof.ResetRoofFaceMaterial",
  RoofsDrawing: {
    DrawLines: "hsw.plugin.RoofsDrawing.req.DrawLines",
    DrawRectangle: "hsw.plugin.RoofsDrawing.req.DrawRectangle",
    DrawCircle: "hsw.plugin.RoofsDrawing.req.DrawCircle",
    DrawRegularPolygon: "hsw.plugin.RoofsDrawing.req.DrawRegularPolygon",
    DrawPolygon: "hsw.plugin.RoofsDrawing.req.DrawPolygon",
    AddSplitPoint: "hsw.plugin.RoofsDrawing.req.AddSplitPoint",
    AddGuideLine: "hsw.plugin.RoofsDrawing.req.AddGuideLine",
    DeleteGuideLine: "hsw.plugin.RoofsDrawing.req.DeleteGuideLine",
    DrawFillet: "hsw.plugin.RoofsDrawing.req.DrawFillet",
    DeleteVertex: "hsw.plugin.RoofsDrawing.req.DeleteVertex",
    MoveCurve: "hsw.plugin.RoofsDrawing.req.MoveCurve",
    MovePoint: "hsw.plugin.RoofsDrawing.req.MovePoint",
    UpdateRoofRelation: "hsw.plugin.RoofsDrawing.req.UpdateRoofRelation",
    DeleteRoofRegion: "hsw.plugin.RoofsDrawing.req.DeleteRoofRegion"
  }
});

export default roofTransactionCommands;