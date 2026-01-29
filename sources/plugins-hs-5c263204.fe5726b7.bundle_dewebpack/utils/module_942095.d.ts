/**
 * Command for including a member into a group.
 * This command handles the inclusion operation with full undo/redo support.
 */
declare module 'module_942095' {
  import { Command } from 'HSApp.Cmd';

  /**
   * Represents a member that can be included in a group.
   */
  interface GroupMember {
    /** The group this member belongs to */
    group?: Group;
    
    /**
     * Checks if a specific entity flag is off.
     * @param flag - The flag to check
     * @returns True if the flag is off, false otherwise
     */
    isFlagOff(flag: HSCore.Model.EntityFlagEnum): boolean;
  }

  /**
   * Represents a group that can contain members.
   */
  interface Group {
    /**
     * Includes a member into this group.
     * @param member - The member to include
     */
    include(member: GroupMember): void;
    
    /**
     * Excludes a member from this group.
     * @param member - The member to exclude
     */
    exclude(member: GroupMember): void;
  }

  /**
   * Command manager interface for controlling command execution lifecycle.
   */
  interface CommandManager {
    /**
     * Cancels the execution of a command.
     * @param command - The command to cancel
     */
    cancel(command: Command): void;
    
    /**
     * Marks a command as completed.
     * @param command - The command that has completed
     */
    complete(command: Command): void;
  }

  /**
   * Command for including a group member.
   * Extends the base Command class with group inclusion logic.
   */
  export default class IncludeMemberCommand extends Command {
    /** The member to be included in the group */
    readonly member: GroupMember;
    
    /** Command manager instance */
    protected mgr: CommandManager;

    /**
     * Creates a new include member command.
     * @param member - The group member to include
     */
    constructor(member: GroupMember);

    /**
     * Executes the include operation.
     * Validates that the member has a valid group and is not marked as removed.
     * If validation fails, the command is cancelled; otherwise, the member is included.
     */
    onExecute(): void;

    /**
     * Undoes the include operation by excluding the member from the group.
     */
    onUndo(): void;

    /**
     * Redoes the include operation by including the member back into the group.
     */
    onRedo(): void;

    /**
     * Gets the log category for this command.
     * @returns The content operation log group type
     */
    getCategory(): HSFPConstants.LogGroupTypes;
  }

  /**
   * Global constants namespace.
   */
  namespace HSFPConstants {
    enum LogGroupTypes {
      /** Category for content-related operations */
      ContentOperation
    }
  }

  /**
   * Core model namespace.
   */
  namespace HSCore.Model {
    /**
     * Flags that can be set on entities.
     */
    enum EntityFlagEnum {
      /** Indicates the entity has been removed */
      removed
    }
  }

  /**
   * Application command namespace.
   */
  namespace HSApp.Cmd {
    /**
     * Base command class with undo/redo support.
     */
    abstract class Command {
      /** Command manager instance */
      protected mgr: CommandManager;
      
      /** Executes the command */
      abstract onExecute(): void;
      
      /** Undoes the command */
      abstract onUndo(): void;
      
      /** Redoes the command */
      abstract onRedo(): void;
      
      /** Gets the command category */
      abstract getCategory(): unknown;
    }
  }
}