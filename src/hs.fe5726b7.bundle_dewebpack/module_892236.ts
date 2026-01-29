const StairCommands = {
    ChangeParametricStairProperty: "hsw.transaction.stair.Cmdchangeparametricstairproperty",
    ReplaceParametricStairMaterial: "hsw.plugin.stair.CmdReplaceMaterial",
    ReplaceParametricStair: "hsw.plugin.stair.CmdReplaceStair"
} as const;

export type StairCommandType = typeof StairCommands[keyof typeof StairCommands];

export default StairCommands;