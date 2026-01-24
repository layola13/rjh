/**
 * Command for editing parametric ceiling properties.
 * Handles ceiling change events and creates transaction requests.
 */
declare class EditParametricCeilingCommand extends HSApp.Cmd.Command {
  /**
   * The content/data associated with the ceiling being edited
   */
  private _content: unknown;

  /**
   * The type of request for this command
   */
  private _requestType: HSFPConstants.RequestType;

  /**
   * The transaction request object
   */
  private _request: unknown;

  /**
   * Creates a new EditParametricCeilingCommand
   * @param content - The ceiling content/data to be edited
   */
  constructor(content: unknown);

  /**
   * Commits the current request to the transaction manager
   */
  private _commitRequest(): void;

  /**
   * Called when the command is executed
   */
  onExecute(): void;

  /**
   * Handles received events related to ceiling modifications
   * @param eventType - The type of ceiling event (e.g., 'ceilingchangebegin', 'ceilingchanging', 'ceilingchangeend', 'ceilingReset', 'rotationchangeend', 'ceilingResetIncludeRotate')
   * @param eventData - Additional data associated with the event
   * @returns True if the event was handled and should stop propagation, false otherwise
   */
  onReceive(eventType: string, eventData: unknown): boolean;
}

export default EditParametricCeilingCommand;