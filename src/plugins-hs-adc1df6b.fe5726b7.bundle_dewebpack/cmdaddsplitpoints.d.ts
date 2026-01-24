/**
 * Module: CmdAddSplitPoints
 * Command for adding split points in outdoor drawing mode
 */

import { HSApp } from './HSApp';
import { TransactionManager, RequestType } from './TransactionManager';
import { Sketch2dBuilder } from './Sketch2dBuilder';
import { HSFPConstants } from './HSFPConstants';

/**
 * Command class for adding split points to outdoor area drawings
 * Extends the base CmdAddSplitPoints from HSApp.ExtraordinarySketch2d.Cmd
 */
export declare class CmdAddSplitPoints extends HSApp.ExtraordinarySketch2d.Cmd.CmdAddSplitPoints {
  /**
   * Reference to the application context containing the transaction manager
   */
  protected context: {
    transManager: TransactionManager;
  };

  /**
   * The 2D sketch builder instance used for creating split points
   */
  protected sketch2dBuilder: Sketch2dBuilder;

  /**
   * Constructor for CmdAddSplitPoints
   */
  constructor();

  /**
   * Creates a request for adding a split point
   * @param splitPointData - Data representing the split point to be added
   * @returns A request object that will be processed by the transaction manager
   */
  protected _createRequest(splitPointData: unknown): unknown;

  /**
   * Returns a human-readable description of this command
   * @returns Description string for logging and debugging purposes
   */
  getDescription(): string;

  /**
   * Returns the category/group type this command belongs to
   * @returns The log group type constant for outdoor drawing operations
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}