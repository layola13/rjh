/**
 * Command for excluding a member from a group
 * @module GroupExcludeCommand
 */

/**
 * Represents a member that can be excluded from a group
 */
interface ExcludableMember {
  /** The group this member belongs to */
  group: MemberGroup | null | undefined;
  
  /**
   * Check if a specific flag is set on this entity
   * @param flag - The flag to check
   * @returns True if the flag is set
   */
  isFlagOn(flag: HSCore.Model.EntityFlagEnum): boolean;
}

/**
 * Represents a group that can include or exclude members
 */
interface MemberGroup {
  /**
   * Exclude a member from this group
   * @param member - The member to exclude
   */
  exclude(member: ExcludableMember): void;
  
  /**
   * Include a member back into this group
   * @param member - The member to include
   */
  include(member: ExcludableMember): void;
  
  /**
   * Get a flat list of all members in the group
   * @param includeNested - Whether to include nested group members
   * @returns Array of members
   */
  toFlatMemberList(includeNested: boolean): ExcludableMember[];
}

/**
 * Command manager interface for controlling command execution flow
 */
interface CommandManager {
  /**
   * Cancel the command execution
   * @param command - The command to cancel
   */
  cancel(command: Command): void;
  
  /**
   * Mark the command as completed
   * @param command - The command to complete
   */
  complete(command: command: Command): void;
}

/**
 * Base command class
 */
declare class Command {
  /** The command manager controlling this command */
  protected mgr: CommandManager;
}

/**
 * Command for excluding a member from a group.
 * Supports undo/redo operations and maintains group state consistency.
 */
declare class GroupExcludeCommand extends Command {
  /** The member to be excluded from its group */
  readonly member: ExcludableMember;
  
  /**
   * Creates a new group exclude command
   * @param member - The member to exclude from its group
   */
  constructor(member: ExcludableMember);
  
  /**
   * Execute the exclude operation.
   * Validates the member has a valid group and is not already removed,
   * then excludes it from the group. If the group becomes empty after exclusion,
   * unselects all items.
   */
  onExecute(): void;
  
  /**
   * Undo the exclude operation by including the member back into its group
   */
  onUndo(): void;
  
  /**
   * Redo the exclude operation by excluding the member from its group again
   */
  onRedo(): void;
  
  /**
   * Get the log category for this command
   * @returns The content operation log group type
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * Global application namespace for selection management
 */
declare namespace HSApp {
  namespace Selection {
    interface Manager {
      /**
       * Clear all current selections
       */
      unselectAll(): void;
    }
    
    const Manager: Manager;
  }
  
  namespace Cmd {
    export { Command };
  }
}

/**
 * Core model namespace for entity flags
 */
declare namespace HSCore {
  namespace Model {
    /**
     * Enum of flags that can be set on entities
     */
    enum EntityFlagEnum {
      /** Indicates the entity has been removed */
      removed
    }
  }
}

/**
 * Constants namespace for logging
 */
declare namespace HSFPConstants {
  /**
   * Log group type categorization
   */
  enum LogGroupTypes {
    /** Content-related operations */
    ContentOperation
  }
}

export default GroupExcludeCommand;