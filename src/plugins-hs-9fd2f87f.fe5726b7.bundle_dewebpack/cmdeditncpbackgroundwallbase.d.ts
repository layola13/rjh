import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { ClipTaskIntergration } from './ClipTaskIntergration';

/**
 * Options for editing NCP background wall
 */
export interface EditNCPBackgroundWallOptions {
  /** Whether to enable clipping task integration */
  clip: boolean;
}

/**
 * Content type that can be either a parametric background wall or its unit
 */
export type NCPBackgroundWallContent =
  | HSCore.Model.NCustomizedParametricBackgroundWall
  | HSCore.Model.NCustomizedParametricBackgroundWallUnit;

/**
 * Base command class for editing NCP (NCustomizedParametric) background walls.
 * Handles both parametric background walls and their individual units with optional clipping support.
 * 
 * @extends HSApp.Cmd.Command
 */
export declare class CmdEditNCPBackgroundWallBase extends HSApp.Cmd.Command {
  /**
   * The content object to be edited (background wall or unit)
   * @private
   */
  private _content: NCPBackgroundWallContent;

  /**
   * Request type identifier for the transaction manager
   * @private
   */
  private _requestType: HSFPConstants.RequestType;

  /**
   * The transaction request object created by the transaction manager
   * @private
   */
  private _request: unknown | undefined;

  /**
   * Configuration options for the editing operation
   * @private
   */
  private _options: EditNCPBackgroundWallOptions;

  /**
   * Creates an instance of CmdEditNCPBackgroundWallBase
   * 
   * @param content - The parametric background wall or unit to edit
   * @param options - Configuration options, defaults to { clip: false }
   */
  constructor(
    content: NCPBackgroundWallContent,
    options?: EditNCPBackgroundWallOptions
  );

  /**
   * Commits the transaction request to the transaction manager
   * @private
   */
  private _commitRequest(): void;

  /**
   * Called when the command completes execution.
   * Handles clip task integration if enabled, then commits the request.
   * 
   * @override
   */
  onComplete(): void;

  /**
   * Executes the command by creating a transaction request
   * 
   * @override
   */
  onExecute(): void;

  /**
   * Receives and processes command events (e.g., reset, update)
   * Handles special "onReset" event by loading metadata recursively
   * 
   * @param eventName - The name of the event to handle
   * @param eventData - The data associated with the event
   * @returns True if the event was handled successfully
   * @override
   */
  onReceive(eventName: string, eventData: unknown): boolean;

  /**
   * Returns the log category based on the content type
   * 
   * @returns ParametricBackgroundWall for wall content, ParametricBackgroundWallUnit for unit content
   * @override
   */
  getCategory(): HSFPConstants.LogGroupTypes;

  /**
   * Returns a human-readable description of the command
   * 
   * @returns "编辑参数化背景墙" (Edit parametric background wall) or "编辑参数化单元" (Edit parametric unit)
   * @override
   */
  getDescription(): string;
}