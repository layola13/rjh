/**
 * Duplicate Selection Command - Type Definitions
 * 
 * A command that duplicates selected content or room items in the scene.
 * This command validates that all selected items are of the same type and
 * are instances of NgContent before executing the duplication.
 */

/**
 * Command for duplicating selected content or room objects
 * 
 * @extends HSApp.Cmd.Command
 * @category ContentOperation
 */
declare class DuplicateSelectionCommand extends HSApp.Cmd.Command {
  /**
   * Creates a new DuplicateSelectionCommand instance
   */
  constructor();

  /**
   * Executes the duplicate operation on selected items
   * 
   * Validates selection, creates duplicate commands for each selected item,
   * and completes the operation. If validation fails, cancels the command.
   * 
   * @returns void
   * @throws Will log warning and cancel if selection is invalid
   */
  onExecute(): void;

  /**
   * Validates whether the selection can be duplicated
   * 
   * Checks that:
   * - Selection is not empty
   * - All items are of the same class type
   * - All items are instances of NgContent
   * 
   * @param selection - Array of selected model objects
   * @returns True if selection is valid for duplication, false otherwise
   */
  private _isValid(selection: any[]): boolean;

  /**
   * Gets the human-readable description of this command
   * 
   * @returns Localized description string
   */
  getDescription(): string;

  /**
   * Gets the log category for this command
   * 
   * @returns The log group type for content operations
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * Module export - Default export of DuplicateSelectionCommand class
 */
export default DuplicateSelectionCommand;

/**
 * Expected global types referenced in this module
 */
declare namespace HSApp {
  namespace Cmd {
    class Command {
      protected mgr: CommandManager;
      protected subs: Command[];
    }
  }

  namespace Selection {
    class Manager {
      static selected(): any[];
    }
  }
}

declare namespace HSFPConstants {
  enum CommandType {
    DuplicateSelection = "DuplicateSelection",
    DuplicateContent = "DuplicateContent"
  }

  enum LogGroupTypes {
    ContentOperation = "ContentOperation"
  }
}

declare namespace HSConstants {
  enum ModelClass {
    NgContent = "NgContent"
  }
}

interface CommandManager {
  createCommand(type: HSFPConstants.CommandType, args: any[]): HSApp.Cmd.Command;
  cancel(command: HSApp.Cmd.Command): void;
  complete(command: HSApp.Cmd.Command): void;
}

interface Logger {
  warning(message: string): void;
}

declare const log: {
  logger(type: HSFPConstants.CommandType): Logger;
};