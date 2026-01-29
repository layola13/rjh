const StructureTransactionTypes = {
    AddStructure: "hsw.transaction.structure.AddStructure",
    AddBeam: "hsw.transaction.structure.AddBeam",
    MoveStructure: "hsw.transaction.structure.MoveStructure",
    MoveBeam: "hsw.transaction.structure.MoveBeam",
    DeleteStructure: "hsw.transaction.structure.DeleteStructure",
    DeleteBeam: "hsw.transaction.structure.DeleteBeam",
    ChangeStructureMode: "hsw.transaction.structure.ChangeStructureModeRequest",
    ChangeBeamType: "hsw.transaction.structure.ChangeBeamTypeRequest",
    RotateStructure: "hsw.transaction.structure.RotateStructureRequest",
    RotateBeam: "hsw.transaction.structure.RotateBeamRequest",
    CopyPasteStructure: "hsw.transaction.structure.CopyPasteStructureRequest",
    CopyPasteBeam: "hsw.transaction.structure.CopyPasteBeamRequest",
    ResizeStructure: "hsw.transaction.structure.ResizeStructureRequest",
    ResizeBeam: "hsw.transaction.structure.ResizeBeamRequest"
} as const;

export type StructureTransactionType = typeof StructureTransactionTypes[keyof typeof StructureTransactionTypes];

export default StructureTransactionTypes;