const WallTransactionTypes = {
    MoveNGWall: "hsw.transaction.wall.MoveNGWallRequest",
    MoveTGWall: "hsw.transaction.wall.MoveTGWallRequest",
    MoveTGWallPoint: "hsw.transaction.wall.MoveTGWallPointRequest",
    DeleteNGWall: "hsw.transaction.wall.DeleteNGWallRequest",
    DeleteTGWall: "hsw.transaction.wall.DeleteTGWallRequest",
    DeleteTGWalls: "hsw.transaction.wall.DeleteTGWallsRequest",
    DeleteNGWalls: "hsw.transaction.wall.DeleteNGWallsRequest",
    MoveNGWallPoint: "hsw.transaction.wall.MoveNGWallPointRequest",
    CreateRectWalls: "hsw.transaction.wall.CreateRectWallsRequest",
    CreateFreeformNGWall: "hsw.transaction.wall.CreateFreeformNGWallRequest",
    CreateTgWall: "hsw.transaction.wall.CreateTgWallRequest",
    SplitNGWall: "hsw.transaction.wall.SplitNGWallRequest",
    FreeCutWall: "hsw.transaction.wall.FreeCutWallRequest",
    CutWall: "hsw.transaction.wall.CutWallRequest",
    MergeWallOnPoint: "hsw.transaction.wall.MergeWallOnPointRequest",
    MergeWall: "hsw.transaction.wall.MergeWallRequest",
    ChangeWallType: "hsw.transcation.wall.ChangeWallTypeRequest",
    ChangeTGWallType: "hsw.transcation.wall.ChangeTGWallTypeRequest",
    ChangeToArcWall: "hsw.transaction.wall.ChangeToArcWallRequest",
    SwitchArcWall: "hsw.transaction.wall.SwitchArcWall",
    ChangeWallSagitta: "hsw.transaction.wall.ChangeWallSagitta",
    ChangeTgWallCurve: "hsw.transaction.wall.ChangeTgWallCurve",
    ChangeWallCurve: "hsw.transaction.wall.ChangeWallCurve",
    ResizeWalls: "hsw.request.wall.ResizeWalls",
    ResizeTgWalls: "hsw.request.wall.ResizeTgWalls",
    ChangeWallsWidth: "hsw.request.wall.ChangeWallsWidthRequest",
    ChangeWallAutoConnect: "hsw.request.wall.ChangeWallAutoConnect"
} as const;

export type WallTransactionType = typeof WallTransactionTypes[keyof typeof WallTransactionTypes];

export default WallTransactionTypes;