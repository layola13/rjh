export const PointCommands = {
    DeletePoint: "hsw.cmd.point.CmdDeletePoint",
    MergeWallOnPoint: "hsw.cmd.point.CmdMergeWallOnPoint",
    MovePoint: "hsw.cmd.point.CmdMovePoint",
    MoveNgWallPoint: "hsw.cmd.wall.CmdMoveNGWallPoint"
} as const;

export type PointCommandType = typeof PointCommands[keyof typeof PointCommands];

export default PointCommands;