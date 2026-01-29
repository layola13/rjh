export interface GroupCommands {
  DeleteGroup: string;
  ExcludeMember: string;
  IncludeMember: string;
  RemoveGroup: string;
  AddGroup: string;
  FlipGroup: string;
  DistributionContents: string;
}

const groupCommands: Readonly<GroupCommands> = Object.freeze({
  DeleteGroup: "hsw.cmd.group.CmdDeleteGroup",
  ExcludeMember: "hsw.cmd.group.CmdExcludeMember",
  IncludeMember: "hsw.cmd.group.CmdIncludeMember",
  RemoveGroup: "hsw.cmd.group.CmdRemoveGroup",
  AddGroup: "hsw.cmd.group.CmdAddGroup",
  FlipGroup: "hsw.cmd.group.CmdFlipGroup",
  DistributionContents: "hsw.cmd.group.DistributionContents"
});

export default groupCommands;