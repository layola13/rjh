import { IPlugin } from 'HSApp/Plugin';
import ChangeGlobalHeightCommand from './commands/ChangeGlobalHeightCommand';
import ChangeGlobalWidthCommand from './commands/ChangeGlobalWidthCommand';
import ToggleCeilingStatusCommand from './commands/ToggleCeilingStatusCommand';
import { CmdToggleCeilingVisibility } from './commands/CmdToggleCeilingVisibility';
import ChangeWallFreezedCommand from './commands/ChangeWallFreezedCommand';
import ChangeGlobalAreaTypeCommand from './commands/ChangeGlobalAreaTypeCommand';
import ToggleCeilingStatusRequest from './requests/ToggleCeilingStatusRequest';
import { ToggleCeilingVisibilityRequest } from './requests/ToggleCeilingVisibilityRequest';
import ChangeGlobalWidthRequest from './requests/ChangeGlobalWidthRequest';
import FreezeWallRequest from './requests/FreezeWallRequest';
import ChangeGlobalAreaTypeRequest from './requests/ChangeGlobalAreaTypeRequest';

interface PluginContext {
  app: {
    cmdManager: {
      register(commands: Array<[string, any]>): void;
    };
    transManager: {
      register(requests: Array<[string, any]>): void;
    };
  };
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

class RoomEditPlugin extends IPlugin {
  constructor() {
    super({
      name: 'room editing',
      description: 'Process room edit commands.',
      dependencies: []
    } as PluginConfig);
  }

  onActive(context: PluginContext): void {
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.ChangeGlobalHeight, ChangeGlobalHeightCommand],
      [HSFPConstants.CommandType.ChangeGlobalWidth, ChangeGlobalWidthCommand],
      [HSFPConstants.CommandType.ToggleCeilingStatus, ToggleCeilingStatusCommand],
      [HSFPConstants.CommandType.ToggleCeilingVisibility, CmdToggleCeilingVisibility],
      [HSFPConstants.CommandType.ChangeWallFreezed, ChangeWallFreezedCommand],
      [HSFPConstants.CommandType.ChangeGlobalAreaType, ChangeGlobalAreaTypeCommand]
    ]);

    context.app.transManager.register([
      [HSFPConstants.RequestType.ToggleCeilingStatus, ToggleCeilingStatusRequest],
      [HSFPConstants.RequestType.ToggleCeilingVisibility, ToggleCeilingVisibilityRequest],
      [HSFPConstants.RequestType.ChangeGlobalWidth, ChangeGlobalWidthRequest],
      [HSFPConstants.RequestType.FreezeWall, FreezeWallRequest],
      [HSFPConstants.RequestType.ChangeGlobalAreaType, ChangeGlobalAreaTypeRequest]
    ]);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

HSApp.Plugin.registerPlugin('hsw.plugin.RoomEdit.Plugin', RoomEditPlugin);