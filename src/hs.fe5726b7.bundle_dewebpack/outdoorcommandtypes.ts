export const OutdoorCommandTypes = {
    OutdoorDrawing: {
        DrawLines: "hsw.plugin.OutdoorDrawing.CmdDrawLines",
        DrawRectangle: "hsw.plugin.OutdoorDrawing.CmdDrawRectangle",
        DrawPolygons: "hsw.plugin.OutdoorDrawing.CmdDrawPolygons",
        DrawRegularPolygon: "hsw.plugin.OutdoorDrawing.CmdDrawRegularPolygon",
        DrawCircle: "hsw.plugin.OutdoorDrawing.CmdDrawCircle",
        AddSplitPoints: "hsw.plugin.OutdoorDrawing.CmdAddSplitPoints",
        AddGuideLines: "hsw.plugin.OutdoorDrawing.AddGuideLines",
        ClearGuideLines: "hsw.plugin.OutdoorDrawing.ClearGuideLines",
        DrawFillet: "hsw.plugin.OutdoorDrawing.CmdDrawFillet",
        DeleteVertex: "hsw.plugin.OutdoorDrawing.CmdDeleteVertex",
        MoveFaces: "hsw.plugin.OutdoorDrawing.CmdMoveFaces",
        MoveCurve: "hsw.plugin.OutdoorDrawing.CmdMoveCurve",
        MovePoint: "hsw.plugin.OutdoorDrawing.CmdMovePoint"
    }
} as const;

Object.freeze(OutdoorCommandTypes.OutdoorDrawing);

export type OutdoorDrawingCommandType = typeof OutdoorCommandTypes.OutdoorDrawing[keyof typeof OutdoorCommandTypes.OutdoorDrawing];