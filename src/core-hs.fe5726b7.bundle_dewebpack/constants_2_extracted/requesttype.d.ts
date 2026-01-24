/**
 * Request type enumeration for HSCore transaction system.
 * Defines the available request types used across the transaction framework.
 * 
 * @module RequestType
 * @readonly
 */
export declare const RequestType: {
  /**
   * Composite request type for handling multiple related operations.
   * Fully qualified type: HSCore.Transaction.Common.CompositeRequest
   */
  readonly Composite: "HSCore.Transaction.Common.CompositeRequest";
  
  /**
   * Composite state request type for managing stateful composite operations.
   * Fully qualified type: HSCore.Transaction.Common.CompositeStateRequest
   */
  readonly CompositeState: "HSCore.Transaction.Common.CompositeStateRequest";
  
  /**
   * Data request type for standard data operations.
   * Fully qualified type: HSCore.Transaction.Common.DataRequest
   */
  readonly Data: "HSCore.Transaction.Common.DataRequest";
  
  /**
   * Change flag request type for entity flag modifications.
   * Fully qualified type: HSCore.Transaction.Entity.ChangeFlagRequest
   */
  readonly ChangeFlag: "HSCore.Transaction.Entity.ChangeFlagRequest";
  
  /**
   * Batch request type for bulk operations.
   * Fully qualified type: HSCore.Transaction.BatchRequest
   */
  readonly Batch: "HSCore.Transaction.BatchRequest";
};

/**
 * Union type of all possible request type values.
 * Can be used for type-safe request type checking.
 */
export type RequestTypeValue = typeof RequestType[keyof typeof RequestType];