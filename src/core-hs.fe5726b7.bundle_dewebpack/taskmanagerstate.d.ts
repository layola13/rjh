/**
 * Task manager state enum
 * Represents the current state of the NCPClipTaskManager
 */
export enum TaskManagerState {
    /** Task is waiting to be executed */
    Pending = 0,
    /** Task is currently executing */
    Running = 1,
    /** Task has completed execution */
    Finished = 2
}

/**
 * Interface for entity objects that can be managed by the task manager
 */
interface IEntity {
    /** Signal dispatched when entity is removed */
    signalRemoved: unknown;
    
    /**
     * Check if a specific flag is enabled on the entity
     * @param flag - The entity flag to check
     * @returns True if the flag is enabled
     */
    isFlagOn(flag: number): boolean;
}

/**
 * Entity flag enumeration (imported from module 24567)
 */
interface EntityFlagEnum {
    hidden: number;
    removed: number;
}

/**
 * Task control interface returned when adding a clip task
 */
interface IClipTaskControl<T = unknown> {
    /**
     * Execute the task with provided arguments
     * @param args - Arguments to pass to the task function
     * @returns The result of the task execution
     */
    run(...args: unknown[]): T;
    
    /**
     * Delete the task without executing it
     */
    delete(): void;
}

/**
 * Internal structure for storing clip task information
 */
interface IClipTaskInfo<T = unknown> {
    /** The task function to execute */
    taskFn: (...args: unknown[]) => T;
    /** The entity associated with this task */
    entity: IEntity;
}

/**
 * Signal payload dispatched when task manager state changes
 */
interface ITaskManagerStatePayload {
    /** The new state of the task manager */
    state: TaskManagerState;
}

/**
 * Signal class for event dispatching (imported from module 55995)
 */
declare class Signal<T = unknown> {
    dispatch(payload: T): void;
}

/**
 * Signal hook class for managing signal listeners (imported from module 55995)
 */
declare class SignalHook {
    listen(signal: unknown, callback: () => void): void;
    unlisten(signal: unknown): void;
    unlistenAll(): void;
}

/**
 * NCP Clip Task Manager
 * Manages asynchronous clip tasks associated with entities, tracking their lifecycle
 * and state. Automatically cleans up tasks when entities are removed.
 */
export declare class NCPClipTaskManager {
    /** Signal dispatched when task manager state changes */
    static clipTaskSignal: Signal<ITaskManagerStatePayload>;
    
    /** Internal map storing active clip tasks by their unique keys */
    private static _clipTaskMap: Map<string, IClipTaskInfo>;
    
    /** Whether the task manager is currently enabled */
    private static _enabled: boolean;
    
    /** Current state of the task manager */
    private static _state: TaskManagerState;
    
    /** Hook for managing entity removal signals */
    private static _signalHook: SignalHook;
    
    /**
     * Enable the task manager to accept new tasks
     */
    static enable(): void;
    
    /**
     * Disable the task manager from accepting new tasks
     */
    static disable(): void;
    
    /**
     * Add a new clip task associated with an entity
     * @param key - Unique identifier for the task
     * @param taskFn - The task function to execute
     * @param entity - The entity associated with this task
     * @returns Task control object if task was added, undefined if rejected
     */
    static addClipTask<T = unknown>(
        key: string,
        taskFn: (...args: unknown[]) => T,
        entity: IEntity
    ): IClipTaskControl<T> | undefined;
    
    /**
     * Mark a task as complete and remove it from the task map
     * @param key - The task identifier to complete
     */
    private static _completeTask(key: string): void;
    
    /**
     * Clear a specific task by its key
     * @param key - The task identifier to clear
     */
    static clearTask(key: string): void;
    
    /**
     * Clear all active tasks and reset the task manager state
     */
    static clearAllTasks(): void;
}