import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * Controller for handling route differences in the CW (Component Workflow) system.
 * Extends the base DisplayController to provide custom click handling with selection commands.
 */
export declare class DiffCWRouteController extends HSApp.View.Base.DisplayController {
    /**
     * Command manager instance for creating and executing commands.
     * @private
     */
    private _cmdMgr: CommandManager;

    /**
     * The entity associated with this controller.
     * @private
     */
    private entity: unknown;

    /**
     * Handles click events on the route display.
     * Creates and executes a PointSelect command if no current command exists.
     * 
     * @param event - The click event data containing the original DOM event
     * @returns `true` if a new command was created and executed, `false` if a command is already active
     */
    onclick(event: ClickEventData): boolean;
}

/**
 * Command manager interface for managing command execution lifecycle.
 */
interface CommandManager {
    /**
     * Currently active command, if any.
     */
    current: Command | null;

    /**
     * Creates a new command of the specified type.
     * 
     * @param commandType - The type of command to create
     * @returns The newly created command instance
     */
    createCommand(commandType: string): Command;

    /**
     * Executes a command with the provided parameters.
     * 
     * @param command - The command to execute
     * @param entity - The entity to operate on
     * @param isMultiSelect - Whether multiple items should be selected
     * @param eventData - Additional event data for the command
     */
    execute(
        command: Command,
        entity: unknown,
        isMultiSelect: boolean,
        eventData: ClickEventData
    ): void;
}

/**
 * Represents a command that can be executed by the command manager.
 */
interface Command {
    // Command properties would be defined here based on actual implementation
}

/**
 * Click event data structure passed to onclick handler.
 */
interface ClickEventData {
    /**
     * The original DOM event that triggered the click.
     */
    event: MouseEvent | KeyboardEvent;
}