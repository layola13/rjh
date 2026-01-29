import { CmdAddStructure } from './commands/CmdAddStructure';
import { CmdChangeStructureMode } from './commands/CmdChangeStructureMode';
import { CmdChangeBeamType } from './commands/CmdChangeBeamType';
import { CmdDeleteStructure } from './commands/CmdDeleteStructure';
import { CmdDeleteBeam } from './commands/CmdDeleteBeam';
import { CmdMoveStructure } from './commands/CmdMoveStructure';
import { CmdMoveBeam } from './commands/CmdMoveBeam';
import { CmdRotateStructure } from './commands/CmdRotateStructure';
import { CmdRotateBeam } from './commands/CmdRotateBeam';
import { CmdCopyPasteStructure } from './commands/CmdCopyPasteStructure';
import { CmdCopyPasteBeam } from './commands/CmdCopyPasteBeam';
import { CmdResizeStructure } from './commands/CmdResizeStructure';
import { CmdResizeBeam } from './commands/CmdResizeBeam';
import { AddStructureRequest } from './requests/AddStructureRequest';
import { ChangeStructureModeRequest } from './requests/ChangeStructureModeRequest';
import { ChangeBeamTypeRequest } from './requests/ChangeBeamTypeRequest';
import { AddBeamRequest } from './requests/AddBeamRequest';
import { DeleteStructureRequest } from './requests/DeleteStructureRequest';
import { DeleteBeamRequest } from './requests/DeleteBeamRequest';
import { MoveStructureRequest } from './requests/MoveStructureRequest';
import { MoveBeamRequest } from './requests/MoveBeamRequest';
import { RotateStructureRequest } from './requests/RotateStructureRequest';
import { RotateBeamRequest } from './requests/RotateBeamRequest';
import { CopyPasteStructureRequest } from './requests/CopyPasteStructureRequest';
import { CopyPasteBeamRequest } from './requests/CopyPasteBeamRequest';
import { ResizeStructureRequest } from './requests/ResizeStructureRequest';
import { ResizeBeamRequest } from './requests/ResizeBeamRequest';

interface PluginContext {
  app: {
    cmdManager: CommandManager;
    transManager: TransactionManager;
  };
}

interface CommandManager {
  register(commands: Array<[string, new (...args: any[]) => any]>): void;
}

interface TransactionManager {
  register(requests: Array<[string, new (...args: any[]) => any]>): void;
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

/**
 * Structure Edit Plugin
 * Processes structure edit commands and manages related gizmos.
 */
class StructureEditPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: 'structure edit',
      description: 'process structure edit commands and its gizmos.',
      dependencies: []
    });
  }

  onActive(context: PluginContext): void {
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.AddStructure, CmdAddStructure],
      [HSFPConstants.CommandType.MoveStructure, CmdMoveStructure],
      [HSFPConstants.CommandType.MoveBeam, CmdMoveBeam],
      [HSFPConstants.CommandType.RotateStructure, CmdRotateStructure],
      [HSFPConstants.CommandType.RotateBeam, CmdRotateBeam],
      [HSFPConstants.CommandType.CopyPasteStructure, CmdCopyPasteStructure],
      [HSFPConstants.CommandType.CopyPasteBeam, CmdCopyPasteBeam],
      [HSFPConstants.CommandType.DeleteStructure, CmdDeleteStructure],
      [HSFPConstants.CommandType.DeleteBeam, CmdDeleteBeam],
      [HSFPConstants.CommandType.ChangeStructureMode, CmdChangeStructureMode],
      [HSFPConstants.CommandType.ChangeBeamType, CmdChangeBeamType],
      [HSFPConstants.CommandType.ResizeStructure, CmdResizeStructure],
      [HSFPConstants.CommandType.ResizeBeam, CmdResizeBeam]
    ]);

    context.app.transManager.register([
      [HSFPConstants.RequestType.AddStructure, AddStructureRequest],
      [HSFPConstants.RequestType.MoveStructure, MoveStructureRequest],
      [HSFPConstants.RequestType.MoveBeam, MoveBeamRequest],
      [HSFPConstants.RequestType.RotateStructure, RotateStructureRequest],
      [HSFPConstants.RequestType.RotateBeam, RotateBeamRequest],
      [HSFPConstants.RequestType.CopyPasteStructure, CopyPasteStructureRequest],
      [HSFPConstants.RequestType.CopyPasteBeam, CopyPasteBeamRequest],
      [HSFPConstants.RequestType.DeleteStructure, DeleteStructureRequest],
      [HSFPConstants.RequestType.DeleteBeam, DeleteBeamRequest],
      [HSFPConstants.RequestType.ChangeStructureMode, ChangeStructureModeRequest],
      [HSFPConstants.RequestType.ChangeBeamType, ChangeBeamTypeRequest],
      [HSFPConstants.RequestType.AddBeam, AddBeamRequest],
      [HSFPConstants.RequestType.ResizeStructure, ResizeStructureRequest],
      [HSFPConstants.RequestType.ResizeBeam, ResizeBeamRequest]
    ]);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.Structure, StructureEditPlugin);