import { CmdDecoration } from './476056';
import { CmdEditMaterial } from './833730';
import { CmdAddCatalogMolding } from './990225';

interface Command {
  type: string;
  showGizmo?: boolean;
}

interface CommandExecutor {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
}

export function executeCmd(
  executor: CommandExecutor,
  commandType: string,
  arg1: unknown,
  arg2: unknown,
  arg3: unknown,
  arg4: unknown,
  arg5: unknown
): Command {
  const command = executor.createCommand(commandType, [arg1, arg2, arg3, arg4, arg5]);
  
  if (command instanceof CmdEditMaterial) {
    command.showGizmo = false;
  }
  
  executor.execute(command);
  return command;
}

export function isThisPluginInCmd(command: Command): boolean {
  const commandType = HSFPConstants.CommandType;
  const mixPaintCommands = [
    commandType.MixPaint.CopyMaterialToFaces,
    commandType.MixPaint.PickMaterialToFaces,
    commandType.MixPaint.ApplyMixPaintPlanToFaces,
    commandType.MixPaint.MixDecoration,
    commandType.CustomizedFeatureModel.CustomizedFeatureModelMake,
    commandType.NCustomizedFeatureModel.CmdNCustomizedFeatureModelMake
  ];
  
  return (
    command instanceof CmdDecoration ||
    command instanceof CmdEditMaterial ||
    command instanceof CmdAddCatalogMolding ||
    mixPaintCommands.includes(command.type)
  );
}