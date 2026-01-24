/**
 * Transaction manager for roofs drawing operations.
 * Manages undo/redo sessions and filters specific drawing requests.
 */
export declare class RoofsDrawingTransaction {
  /**
   * Internal transaction session reference.
   * @private
   */
  private _internalSession: any | undefined;

  /**
   * Creates a new RoofsDrawingTransaction instance.
   */
  constructor();

  /**
   * Enters a new transaction session.
   * Initializes an internal session with a maximum of 100 undo steps.
   */
  enter(): void;

  /**
   * Recovers the transaction by aborting the current session and entering a new one.
   * Useful for resetting the transaction state.
   */
  recover(): void;

  /**
   * Aborts the current transaction session without committing changes.
   */
  abort(): void;

  /**
   * Exits the transaction session.
   * Commits changes if undo is available, otherwise ends the session without committing.
   */
  exit(): void;

  /**
   * Filters requests that should not be included in the transaction session.
   * 
   * @param request - The request to filter
   * @returns `true` if the request should be filtered out (excluded from transaction),
   *          `false` if the request should be included in the transaction
   * 
   * @remarks
   * Filters out the following request types:
   * - DrawRectangleRequest
   * - DrawPolygonsRequest
   * - MovePointRequest
   * - MoveCurveRequest
   * - UpdateRoofRelationRequest
   * - DeleteRoofRegionRequest
   * - MoveFacesRequest
   * 
   * @private
   */
  private _sessionToRequestFilter(request: any): boolean;
}