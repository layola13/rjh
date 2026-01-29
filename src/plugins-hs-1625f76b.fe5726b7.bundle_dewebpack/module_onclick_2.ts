import type { CommandManager, Command } from './types/CommandManager';
import type { App } from './types/App';

interface GlobalContext {
  _app: App;
}

declare const n: GlobalContext;

enum CommandType {
  SplitNGWall = 'SplitNGWall'
}

const HSFPConstants = {
  CommandType
};

function handleClick(entity: unknown): void {
  const commandManager: CommandManager = n._app.cmdManager;
  const commandType = HSFPConstants.CommandType.SplitNGWall;
  const command: Command = commandManager.createCommand(commandType, [entity]);
  commandManager.execute(command);
}