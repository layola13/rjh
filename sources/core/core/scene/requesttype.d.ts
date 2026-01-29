/**
 * Request type constants for HSCore transaction system.
 * Defines the different types of requests that can be made within the transaction framework.
 * @module RequestType
 */

/**
 * Enumeration of available request types in the HSCore transaction system.
 * All values are frozen to prevent runtime modification.
 */
export declare const RequestType: {
  /**
   * Composite request type for handling multiple related operations.
   * Fully qualified name: HSCore.Transaction.Common.CompositeRequest
   */
  readonly Composite: "HSCore.Transaction.Common.CompositeRequest";
  
  /**
   * Composite state request type for managing stateful composite operations.
   * Fully qualified name: HSCore.Transaction.Common.CompositeStateRequest
   */
  readonly CompositeState: "HSCore.Transaction.Common.CompositeStateRequest";
  
  /**
   * Data request type for standard data operations.
   * Fully qualified name: HSCore.Transaction.Common.DataRequest
   */
  readonly Data: "HSCore.Transaction.Common.DataRequest";
  
  /**
   * Change flag request type for entity flag modification operations.
   * Fully qualified name: HSCore.Transaction.Entity.ChangeFlagRequest
   */
  readonly ChangeFlag: "HSCore.Transaction.Entity.ChangeFlagRequest";
  
  /**
   * Batch request type for processing multiple requests in a single transaction.
   * Fully qualified name: HSCore.Transaction.BatchRequest
   */
  readonly Batch: "HSCore.Transaction.BatchRequest";
};

/**
 * Type alias representing all possible request type values.
 * Useful for type checking and ensuring type safety when working with request types.
 */
export type RequestTypeValue = typeof RequestType[keyof typeof RequestType];