interface Sketch2dOperations {
  DrawLines: string;
  DrawRectangle: string;
  DrawRegularPolygon: string;
  DrawCircle: string;
  DeletePoint: string;
  DeleteCurve: string;
  DeleteFace: string;
  MovePoint: string;
  MoveCurve: string;
  MoveFaces: string;
  ChangeCircleRadius: string;
  ChangeArcSagitta: string;
  ConvertLineToArc: string;
  ClearAll: string;
  CopyFaces: string;
  OffsetPath: string;
  DrawFillet: string;
  Array: string;
  AxialArray: string;
  LinearArray: string;
  AddGuideLine: string;
  DeleteGuideLine: string;
}

interface ExtraordinarySketch2dOperations {
  DrawLines: string;
  DrawRectangle: string;
  DrawCircle: string;
  DrawRegularPolygon: string;
  AddGuideLine: string;
  DeleteGuideLine: string;
  ChangeCircleRadius: string;
  ChangeArcSagitta: string;
  Delete: string;
  MoveFaces: string;
  MoveCurve: string;
  MovePoint: string;
  ConvertLineToArc: string;
  DrawFillet: string;
}

interface CustomizedFeatureModelOperations {
  CopyCustomizedFeatureModelRequest: string;
  CustomizedFeatureModelRequest: string;
  ChangeExtrusionValue: string;
  ClearAll: string;
}

interface NCustomizedFeatureModelOperations {
  CopyNCustomizedFeatureModelRequest: string;
  NCustomizedFeatureModelRequest: string;
  ClearAll: string;
  CreateNCustomizedFeatureModelRequest: string;
  ClearNCustomizedFeatureModelRequest: string;
  SplitNCustomizedFaceGroupMixPaint: string;
  ElevationClearMaterialRequest: string;
  SectionAndElevationCopyRequest: string;
}

interface PluginOperations {
  Sketch2d: Sketch2dOperations;
  ExtraordinarySketch2d: ExtraordinarySketch2dOperations;
  CustomizedFeatureModel: CustomizedFeatureModelOperations;
  NCustomizedFeatureModel: NCustomizedFeatureModelOperations;
}

const pluginOperations: Readonly<PluginOperations> = Object.freeze({
  Sketch2d: {
    DrawLines: "hsw.plugin.sketch2d.req.DrawLines",
    DrawRectangle: "hsw.plugin.sketch2d.req.DrawRectangle",
    DrawRegularPolygon: "hsw.plugin.sketch2d.req.DrawRegularPolygon",
    DrawCircle: "hsw.plugin.sketch2d.req.DrawCircle",
    DeletePoint: "hsw.plugin.sketch2d.req.DeletePoint",
    DeleteCurve: "hsw.plugin.sketch2d.req.DeleteCurve",
    DeleteFace: "hsw.plugin.sketch2d.req.DeleteFace",
    MovePoint: "hsw.plugin.sketch2d.req.MovePoint",
    MoveCurve: "hsw.plugin.sketch2d.req.MoveCurve",
    MoveFaces: "hsw.plugin.sketch2d.req.MoveFaces",
    ChangeCircleRadius: "hsw.plugin.sketch2d.req.ChangeCircleRadius",
    ChangeArcSagitta: "hsw.plugin.sketch2d.req.ChangeArcSagitta",
    ConvertLineToArc: "hsw.plugin.sketch2d.req.ConvertLineToArc",
    ClearAll: "hsw.plugin.sketch2d.req.ClearAll",
    CopyFaces: "hsw.plugin.sketch2d.req.CopyFaces",
    OffsetPath: "hsw.plugin.sketch2d.req.OffsetPath",
    DrawFillet: "hsw.plugin.sketch2d.req.fillet",
    Array: "hsw.plugin.sketch2d.req.array",
    AxialArray: "hsw.plugin.sketch2d.req.axialarray",
    LinearArray: "hsw.plugin.sketch2d.req.lineararray",
    AddGuideLine: "hsw.plugin.sketch2d.req.array.AddGuideLine",
    DeleteGuideLine: "hsw.plugin.sketch2d.req.array.DeleteGuideLine"
  },
  ExtraordinarySketch2d: {
    DrawLines: "hsw.plugin.extraordinarySketch2d.req.DrawLines",
    DrawRectangle: "hsw.plugin.extraordinarySketch2d.req.DrawRectangle",
    DrawCircle: "hsw.plugin.extraordinarySketch2d.req.DrawCircle",
    DrawRegularPolygon: "hsw.plugin.extraordinarySketch2d.req.DrawRegularPolygon",
    AddGuideLine: "hsw.plugin.extraordinarySketch2d.req.array.AddGuideLine",
    DeleteGuideLine: "hsw.plugin.extraordinarySketch2d.req.array.DeleteGuideLine",
    ChangeCircleRadius: "hsw.plugin.extraordinarysketch2d.req.ChangeCircleRadius",
    ChangeArcSagitta: "hsw.plugin.extraordinarysketch2d.req.ChangeArcSagitta",
    Delete: "hsw.plugin.extraordinarysketch2d.req.Delete",
    MoveFaces: "hsw.plugin.extraordinarysketch2d.req.MoveFaces",
    MoveCurve: "hsw.plugin.extraordinarysketch2d.req.MoveCurve",
    MovePoint: "hsw.plugin.extraordinarysketch2d.req.MovePoint",
    ConvertLineToArc: "hsw.plugin.extraordinarysketch2d.req.ConvertLineToArc",
    DrawFillet: "hsw.plugin.extraordinarysketch2d.req.DrawFillet"
  },
  CustomizedFeatureModel: {
    CopyCustomizedFeatureModelRequest: "hsw.plugin.copyCustomizedFeatureModelRequest",
    CustomizedFeatureModelRequest: "hsw.transaction.layer.CustomizedFeatureModelRequest",
    ChangeExtrusionValue: "customizedfeaturemodel.req.ChangeExtrusionValue",
    ClearAll: "customizedfeaturemodel.req.ClearAllRequest"
  },
  NCustomizedFeatureModel: {
    CopyNCustomizedFeatureModelRequest: "hsw.plugin.copyNCustomizedFeatureModelRequest",
    NCustomizedFeatureModelRequest: "hsw.transaction.layer.NCustomizedFeatureModelRequest",
    ClearAll: "ncustomizedfeaturemodel.req.ClearAllRequest",
    CreateNCustomizedFeatureModelRequest: "hsw.transaction.layer.CreateNCustomizedFeatureModelRequest",
    ClearNCustomizedFeatureModelRequest: "hsw.transaction.layer.ClearNCustomizedFeatureModelRequest",
    SplitNCustomizedFaceGroupMixPaint: "hsw.plugin.SplitNCustomizedFaceGroupMixPaint",
    ElevationClearMaterialRequest: "hsw.plugin.ElevationClearMaterialRequest",
    SectionAndElevationCopyRequest: "hsw.plugin.SectionAndElevationCopyRequest"
  }
});

export default pluginOperations;