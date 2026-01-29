import { CommandType, RequestType } from './constants';
import { IPlugin } from './plugin-interface';
import { CmdAddWallMolding } from './commands/add-wall-molding';
import { CmdChangeMoldingAutoFit } from './commands/change-molding-autofit';
import { CmdChangeMoldingHeight } from './commands/change-molding-height';
import { CmdChangeMoldingOffset } from './commands/change-molding-offset';
import { CmdChangeMoldingWidth } from './commands/change-molding-width';
import { CmdResetWallMolding } from './commands/reset-wall-molding';
import { CmdDeleteMitreMolding } from './commands/delete-mitre-molding';
import { CmdCutMolding } from './commands/cut-molding';
import { CmdConnectMolding } from './commands/connect-molding';
import { AddWallMoldingRequest } from './requests/add-wall-molding-request';
import { AddMitreMoldingRequest } from './requests/add-mitre-molding-request';
import { ChangeMoldingTextureRequest } from './requests/change-molding-texture-request';
import { ChangeMoldingTypeRequest } from './requests/change-molding-type-request';
import { ChangeMoldingSizeRequest } from './requests/change-molding-size-request';
import { ChangeMoldingOffsetRequest } from './requests/change-molding-offset-request';
import { ChangeMoldingAutofitRequest } from './requests/change-molding-autofit-request';
import { DeleteMitreMoldingRequest } from './requests/delete-mitre-molding-request';
import { CutMoldingRequest } from './requests/cut-molding-request';
import { ConnectMoldingRequest } from './requests/connect-molding-request';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface AppContext {
  app: {
    cmdManager: CommandManager;
    transManager: TransactionManager;
  };
}

interface CommandManager {
  register(commands: Array<[CommandType, new (...args: unknown[]) => unknown]>): void;
}

interface TransactionManager {
  register(requests: Array<[RequestType, new (...args: unknown[]) => unknown]>): void;
}

/**
 * Plugin for handling molding editing operations.
 * Manages molding-related commands and transaction requests.
 */
class MoldingEditPlugin extends IPlugin {
  constructor() {
    super({
      name: 'molding editing',
      description: 'Process molding edit commands.',
      dependencies: []
    });
  }

  /**
   * Called when the plugin is activated.
   * Registers all molding-related commands and transaction requests.
   */
  onActive(context: AppContext): void {
    context.app.cmdManager.register([
      [CommandType.AddWallMolding, CmdAddWallMolding],
      [CommandType.ChangeMoldingAutoFit, CmdChangeMoldingAutoFit],
      [CommandType.ChangeMoldingHeight, CmdChangeMoldingHeight],
      [CommandType.ChangeMoldingOffset, CmdChangeMoldingOffset],
      [CommandType.ChangeMoldingWidth, CmdChangeMoldingWidth],
      [CommandType.ResetWallMolding, CmdResetWallMolding],
      [CommandType.DeleteMitreMolding, CmdDeleteMitreMolding],
      [CommandType.CutMolding, CmdCutMolding],
      [CommandType.ConnectMolding, CmdConnectMolding]
    ]);

    context.app.transManager.register([
      [RequestType.AddWallMolding, AddWallMoldingRequest],
      [RequestType.AddMiterMolding, AddMitreMoldingRequest],
      [RequestType.ChangeMoldingTexture, ChangeMoldingTextureRequest],
      [RequestType.ChangeMoldingType, ChangeMoldingTypeRequest],
      [RequestType.ChangeMoldingSize, ChangeMoldingSizeRequest],
      [RequestType.ChangeMoldingOffset, ChangeMoldingOffsetRequest],
      [RequestType.ChangeMoldingAutofit, ChangeMoldingAutofitRequest],
      [RequestType.DeleteMitreMolding, DeleteMitreMoldingRequest],
      [RequestType.CutMolding, CutMoldingRequest],
      [RequestType.ConnectMolding, ConnectMoldingRequest]
    ]);
  }

  /**
   * Called when the plugin is deactivated.
   */
  onDeactive(): void {
    // Cleanup logic if needed
  }
}

export { MoldingEditPlugin };