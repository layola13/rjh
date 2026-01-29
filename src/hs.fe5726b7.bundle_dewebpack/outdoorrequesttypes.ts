export const OutdoorRequestTypes = {
  OutdoorDrawing: {
    DrawLines: "hsw.plugin.OutdoorDrawing.req.DrawLines",
    DrawRectangle: "hsw.plugin.OutdoorDrawing.req.DrawRectangle",
    DrawCircle: "hsw.plugin.OutdoorDrawing.req.DrawCircle",
    DrawRegularPolygon: "hsw.plugin.OutdoorDrawing.req.DrawRegularPolygon",
    DrawPolygon: "hsw.plugin.OutdoorDrawing.req.DrawPolygon",
    AddSplitPoint: "hsw.plugin.OutdoorDrawing.req.AddSplitPoint",
    AddGuideLine: "hsw.plugin.OutdoorDrawing.req.AddGuideLine",
    DeleteGuideLine: "hsw.plugin.OutdoorDrawing.req.DeleteGuideLine",
    DrawFillet: "hsw.plugin.OutdoorDrawing.req.DrawFillet",
    DeleteVertex: "hsw.plugin.OutdoorDrawing.req.DeleteVertex",
    MoveCurve: "hsw.plugin.OutdoorDrawing.req.MoveCurve",
    MovePoint: "hsw.plugin.OutdoorDrawing.req.MovePoint"
  }
} as const;

Object.freeze(OutdoorRequestTypes.OutdoorDrawing);

export type OutdoorDrawingRequestType = typeof OutdoorRequestTypes.OutdoorDrawing[keyof typeof OutdoorRequestTypes.OutdoorDrawing];