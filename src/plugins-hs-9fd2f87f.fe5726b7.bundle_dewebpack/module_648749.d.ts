/**
 * Transaction request for removing a molding from a customized model.
 * Supports undo/redo operations by storing WebCAD document states.
 */
declare class RemoveMoldingRequest extends HSCore.Transaction.Request {
  /**
   * The molding instance to be removed
   */
  private _molding: unknown;

  /**
   * Reference to the parent customized model containing the molding
   */
  private _parentCustomizedModel: HSCore.Model.CustomizedModel;

  /**
   * Serialized WebCAD document state before the molding removal
   */
  private _webcadDocBefore: string;

  /**
   * Serialized WebCAD document state after the molding removal
   */
  private _webcadDocAfter: string;

  /**
   * Specification data of the removed molding, used for restoration
   */
  private _spec: unknown;

  /**
   * Creates a new RemoveMoldingRequest transaction.
   * 
   * @param molding - The molding object to be removed from the customized model
   */
  constructor(molding: unknown);

  /**
   * Commits the molding removal transaction.
   * Removes the molding from the content and captures the final document state.
   */
  onCommit(): void;

  /**
   * Undoes the molding removal.
   * Restores the WebCAD document to its state before removal and re-adds the molding.
   */
  onUndo(): void;

  /**
   * Redoes the molding removal.
   * Restores the WebCAD document to its state after removal and removes the molding again.
   */
  onRedo(): void;
}

export default RemoveMoldingRequest;