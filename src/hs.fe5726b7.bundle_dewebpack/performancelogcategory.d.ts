/**
 * Performance logging categories and operation types for the HSApp Plugin Metrics system.
 * @module PerformanceLogCategory
 * @originalId 105693
 */

/**
 * Performance log category identifiers used for categorizing performance metrics.
 */
export declare const PerformanceLogCategory: {
    /**
     * Category identifier for performance operation metrics.
     * Used to log and track performance data for various operations in the HSApp plugin.
     */
    readonly Operation: "HSApp.Plugin.Metrics.Performance.Operation";
};

/**
 * Enumeration of performance operation type identifiers.
 * These types are used to distinguish different operations when logging performance metrics.
 */
export declare const PerformanceOperationTypes: {
    /** Operation type for wall creation events */
    readonly WallCreated: "WallCreated";
    
    /** Operation type for wall movement completion events */
    readonly WallMoveCompleted: "WallMoveCompleted";
    
    /** Operation type for wall removal events */
    readonly WallRemoved: "WallRemoved";
    
    /** Operation type for structure movement completion events */
    readonly StructrueMoveCompleted: "StructrueMoveCompleted";
    
    /** Operation type for structure removal events */
    readonly StructureRemoved: "StructureRemoved";
    
    /** Operation type for opening profile resize events */
    readonly OpeningProfileResize: "OpeningProfileResize";
    
    /** Operation type for opening build change events */
    readonly OpeningChangeBuild: "OpeningChangeBuild";
    
    /** Operation type for countertop generation events */
    readonly GenerateCountertop: "GenerateCountertop";
    
    /** Operation type for topline generation events */
    readonly GenerateTopline: "GenerateTopline";
    
    /** Operation type for toekick generation events */
    readonly GenerateToekick: "GenerateToekick";
    
    /** Operation type for lightline generation events */
    readonly GenerateLightline: "GenerateLightline";
    
    /** Operation type for wallboard topline generation events */
    readonly GenerateWallboardTopline: "GenerateWallboardTopline";
    
    /** Operation type for wallboard toekick generation events */
    readonly GenerateWallboardToekick: "GenerateWallboardToekick";
    
    /** Operation type for wallboard waistline generation events */
    readonly GenerateWallboardWaistline: "GenerateWallboardWaistline";
};

/**
 * Type representing valid performance log category values.
 */
export type PerformanceLogCategoryType = typeof PerformanceLogCategory[keyof typeof PerformanceLogCategory];

/**
 * Type representing valid performance operation type values.
 */
export type PerformanceOperationType = typeof PerformanceOperationTypes[keyof typeof PerformanceOperationTypes];