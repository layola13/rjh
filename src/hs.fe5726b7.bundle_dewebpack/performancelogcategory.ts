export const PerformanceLogCategory = {
    Operation: "HSApp.Plugin.Metrics.Performance.Operation"
} as const;

export const PerformanceOperationTypes = {
    WallCreated: "WallCreated",
    WallMoveCompleted: "WallMoveCompleted",
    WallRemoved: "WallRemoved",
    StructrueMoveCompleted: "StructrueMoveCompleted",
    StructureRemoved: "StructureRemoved",
    OpeningProfileResize: "OpeningProfileResize",
    OpeningChangeBuild: "OpeningChangeBuild",
    GenerateCountertop: "GenerateCountertop",
    GenerateTopline: "GenerateTopline",
    GenerateToekick: "GenerateToekick",
    GenerateLightline: "GenerateLightline",
    GenerateWallboardTopline: "GenerateWallboardTopline",
    GenerateWallboardToekick: "GenerateWallboardToekick",
    GenerateWallboardWaistline: "GenerateWallboardWaistline"
} as const;

export type PerformanceLogCategoryType = typeof PerformanceLogCategory[keyof typeof PerformanceLogCategory];
export type PerformanceOperationType = typeof PerformanceOperationTypes[keyof typeof PerformanceOperationTypes];