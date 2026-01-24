/**
 * Retrieves the underlying agent instance.
 * 
 * @returns The agent instance associated with this context.
 * @remarks
 * This getter provides access to the internal agent that handles
 * the actual operations for this object. The agent pattern is commonly
 * used to delegate behavior to a separate object.
 */
declare function getAgent<TAgent = unknown>(): TAgent;

/**
 * Alternative declaration if this is a class method:
 */
declare class AgentContainer<TAgent = unknown> {
  /**
   * The underlying agent instance.
   * @private
   */
  private _agent: TAgent;

  /**
   * Retrieves the underlying agent instance.
   * 
   * @returns The agent instance associated with this container.
   * @remarks
   * This getter provides access to the internal agent that handles
   * the actual operations for this object.
   */
  get agent(): TAgent;
}