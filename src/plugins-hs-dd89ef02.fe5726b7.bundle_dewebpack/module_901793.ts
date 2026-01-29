const CommandNames = {
    AddOpeningToWall: "CmdAddOpeningToWall",
    AssignOpeningToHost: "CmdAssignOpeningToHost"
} as const;

export type CommandName = typeof CommandNames[keyof typeof CommandNames];

export default CommandNames;