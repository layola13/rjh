const StructureCommands = {
    AddStructure: "hsw.plugin.structure.cmd.CmdAddStructure",
    MoveStructure: "hsw.plugin.structure.cmd.CmdMoveStructure",
    MoveBeam: "hsw.plugin.structure.cmd.CmdMoveBeam",
    DeleteStructure: "hsw.plugin.structure.cmd.CmdDeleteStructure",
    DeleteBeam: "hsw.plugin.structure.cmd.CmdDeleteBeam",
    ChangeStructureMode: "hsw.plugin.structure.cmd.CmdChangeStructureMode",
    ChangeBeamType: "hsw.plugin.structure.cmd.CmdChangeBeamType",
    RotateStructure: "hsw.plugin.structure.cmd.CmdRotateStructure",
    RotateBeam: "hsw.plugin.structure.cmd.CmdRotateBeam",
    CopyPasteStructure: "hsw.plugin.structure.cmd.CmdCopyPasteStructure",
    CopyPasteBeam: "hsw.plugin.structure.cmd.CmdCopyPasteBeam",
    ResizeStructure: "hsw.plugin.structure.cmd.CmdResizeStructure",
    ResizeBeam: "hsw.plugin.structure.cmd.CmdResizeBeam"
} as const;

export type StructureCommandType = typeof StructureCommands[keyof typeof StructureCommands];

export default StructureCommands;