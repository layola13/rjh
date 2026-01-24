/**
 * Group command type definitions
 * Commands for managing groups and their members in the HSW system
 */

/**
 * Enumeration of available group command identifiers
 * These command strings are used to identify specific group operations in the HSW command system
 */
export interface GroupCommands {
  /** Command to permanently delete a group */
  readonly DeleteGroup: "hsw.cmd.group.CmdDeleteGroup";
  
  /** Command to exclude/remove a member from a group */
  readonly ExcludeMember: "hsw.cmd.group.CmdExcludeMember";
  
  /** Command to include/add a member to a group */
  readonly IncludeMember: "hsw.cmd.group.CmdIncludeMember";
  
  /** Command to remove a group (soft delete or detach operation) */
  readonly RemoveGroup: "hsw.cmd.group.CmdRemoveGroup";
  
  /** Command to create and add a new group */
  readonly AddGroup: "hsw.cmd.group.CmdAddGroup";
  
  /** Command to flip/invert group properties or orientation */
  readonly FlipGroup: "hsw.cmd.group.CmdFlipGroup";
  
  /** Command to distribute contents within a group */
  readonly DistributionContents: "hsw.cmd.group.DistributionContents";
}

/**
 * Frozen object containing all group command identifiers
 * @readonly This object is immutable and cannot be modified at runtime
 */
declare const groupCommands: Readonly<GroupCommands>;

export default groupCommands;