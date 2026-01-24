/**
 * Represents a node in a hierarchical tree structure.
 * Each node corresponds to an entity and manages its relationships with child entities.
 * @template TEntity - The type of entity this node represents
 * @template TContext - The type of context object containing configuration and factory methods
 */
export declare class Node<TEntity = any, TContext = any> {
    /**
     * Map of child entity IDs to their corresponding Node instances
     */
    childNodes: Map<string, Node<any, TContext>>;

    /**
     * Signal hook for managing event listeners on the entity
     */
    signalHook: SignalHook<this> | undefined;

    /**
     * The entity instance associated with this node
     */
    entity: TEntity | undefined;

    /**
     * The context object containing configuration and relationship factory methods
     */
    context: TContext;

    /**
     * Reference to the parent node in the hierarchy
     */
    parent: Node<any, TContext> | undefined;

    /**
     * Creates a new Node instance
     * @param entity - The entity to be represented by this node
     * @param context - The context object for configuration and relationship creation
     * @param parent - Optional parent node in the hierarchy
     */
    constructor(entity: TEntity, context: TContext, parent?: Node<any, TContext>);

    /**
     * Gets the ID of the associated entity
     * @returns The entity ID or an empty string if no entity exists
     */
    getEntityID(): string;

    /**
     * Internal initialization method that calls the overridable onInit hook
     * @private
     */
    _init(): void;

    /**
     * Lifecycle hook called during node initialization.
     * Creates child relationship models and binds configuration actions.
     */
    onInit(): void;

    /**
     * Cleans up the node and all its children, disposing event listeners and references
     */
    clear(): void;

    /**
     * Lifecycle hook called during cleanup. Override to add custom cleanup logic.
     */
    onClear(): void;

    /**
     * Event handler called when a child entity is added
     * @param event - Event object containing the added child entity
     */
    onChildAdded(event: { data: { entity: TEntity } }): void;

    /**
     * Event handler called when a child entity is removed
     * @param event - Event object containing the removed child entity
     */
    onChildRemoved(event: { data: { entity: TEntity } }): void;

    /**
     * Creates a relationship model (child node) for the given entity
     * @param entity - The child entity to create a relationship model for
     */
    createRelationshipModel(entity: TEntity): void;

    /**
     * Binds configuration actions from the context's config register to the entity's signals
     * @private
     */
    _bindConfigActions(): void;

    /**
     * Rebinds all event hooks after configuration changes
     * @private
     */
    _rebindHooks(): void;

    /**
     * Updates the node by rebinding hooks and recursively updating or creating child nodes.
     * Clears the node if it's no longer an available type according to the config register.
     */
    update(): void;
}

/**
 * Manages signal listeners for a target object
 * @template T - The type of the target object
 */
export declare class SignalHook<T> {
    /**
     * Creates a new SignalHook instance
     * @param target - The target object to manage signals for
     */
    constructor(target: T);

    /**
     * Registers a listener for a specific signal
     * @param signal - The signal to listen to
     * @param callback - The callback function to invoke when the signal is triggered
     * @returns This SignalHook instance for chaining
     */
    listen(signal: any, callback: Function): this;

    /**
     * Removes all registered listeners
     */
    unlistenAll(): void;

    /**
     * Disposes the signal hook and cleans up all listeners
     */
    dispose(): void;
}