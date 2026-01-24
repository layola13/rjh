/**
 * Module: BaseOperation
 * Base class for all operations in the application.
 * Provides lifecycle hooks and callback management for operation execution.
 */

import { HSApp } from './HSApp';
import { ICopilotMessage, OperationId, RecommendedOperationTypes } from './types';

/**
 * Callback invoked when operation starts
 * @param data - Operation start data
 */
type StartCallback = (data: any) => void;

/**
 * Callback invoked when operation finishes
 * @param error - Error object if operation failed
 * @param result - Result data if operation succeeded
 * @param metadata - Additional metadata about the operation
 */
type FinishCallback = (error: Error | null, result: any, metadata?: any) => void;

/**
 * Callback invoked during operation progress
 * @param progress - Progress data
 */
type ProgressCallback = (progress: any) => void;

/**
 * Callback for querying selection state
 * @param query - Query parameters
 * @param context - Execution context
 * @param options - Additional options
 * @param callback - Completion callback
 */
type SelectionQueryCallback = (query: any, context: any, options: any, callback: any) => void;

/**
 * Copilot message structure for AI operations
 */
export interface ICopilotMessage {
    /** Type of operation to perform */
    operationType: OperationId;
    /** Priority level of the operation */
    priority: number;
    /** Whether the operation is required */
    required: boolean;
    /** Reply message or content */
    reply: string;
}

/**
 * Enumeration of available operation types
 */
export enum OperationId {
    Others = 'Others',
    // Add other operation IDs as needed
}

/**
 * Base class for all operations in the application.
 * Provides common functionality for operation execution, lifecycle management,
 * and callback handling.
 */
export declare class BaseOperation {
    /** Start callback - invoked when operation begins */
    private _scb?: StartCallback;
    
    /** Finish callback - invoked when operation completes */
    private _fcb?: FinishCallback;
    
    /** Progress callback - invoked during operation progress */
    private _pcb?: ProgressCallback;
    
    /** Selection query callback - invoked to query selection state */
    private _selectionQuery?: SelectionQueryCallback;
    
    /** Reference to the main application instance */
    protected app: typeof HSApp.App;

    constructor();

    /**
     * Execute the operation with provided callbacks
     * @param data - Operation data/parameters
     * @param startCallback - Callback invoked when operation starts
     * @param finishCallback - Callback invoked when operation finishes
     * @param selectionQuery - Callback for querying selection state
     * @param progressCallback - Callback invoked during operation progress
     */
    execute(
        data: any,
        startCallback: StartCallback,
        finishCallback: FinishCallback,
        selectionQuery: SelectionQueryCallback,
        progressCallback: ProgressCallback
    ): void;

    /**
     * Query the current selection state
     * @param query - Query parameters
     * @param context - Execution context
     * @param options - Additional options
     * @param callback - Completion callback
     */
    protected onQuerySelection(query: any, context: any, options: any, callback: any): void;

    /**
     * Lifecycle hook - called when operation starts
     * @param data - Operation start data
     */
    protected onStart(data: any): void;

    /**
     * Lifecycle hook - called when operation finishes
     * @param error - Error object if operation failed
     * @param result - Result data if operation succeeded
     * @param metadata - Additional metadata about the operation
     */
    protected onFinish(error: Error | null, result: any, metadata?: any): void;

    /**
     * Lifecycle hook - called during operation progress
     * @param progress - Progress data
     */
    protected onProcess(progress: any): void;

    /**
     * Abstract method to be implemented by subclasses.
     * Contains the main operation logic.
     * @param data - Operation execution data
     */
    protected onExecute(data: any): void;

    /**
     * Check if the current command/operation is supported in the current environment
     * @returns true if command is supported, false otherwise
     */
    protected checkCommandSupport(): boolean;

    /**
     * Check if the application is currently in AI mode
     * @returns true if in AI mode, false otherwise
     */
    protected isAIMode(): boolean;

    /**
     * Cleanup resources after operation completion.
     * Override this method to perform custom cleanup logic.
     */
    protected cleanup(): void;

    /**
     * Get the unique identifier for this operation type
     * @returns The operation ID
     */
    static getId(): OperationId;

    /**
     * Get recommended operation types for a given operation ID
     * @param operationId - The operation ID to get recommendations for
     * @returns Array of recommended operation types
     */
    static getRecommendedOperationTypes(operationId: OperationId): OperationId[];

    /**
     * Create a mock copilot message for testing purposes
     * @returns Mock ICopilotMessage instance
     */
    static createMockMessage(): ICopilotMessage;
}

export { ICopilotMessage, OperationId };