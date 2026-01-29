import { CommandType, PluginType } from './constants';
import { IPlugin } from './plugin-interface';
import { CmdDeleteSelection } from './commands/delete-selection';
import { CmdDuplicateSelection } from './commands/duplicate-selection';
import { CmdPointSelect } from './commands/point-select';
import { CmdWindowSelect } from './commands/window-select';
import { CmdElevationSelect } from './commands/elevation-select';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface ActivationContext {
  app: {
    cmdManager: {
      register(commands: Array<[CommandType, new () => unknown]>): void;
    };
  };
}

/**
 * Selection plugin for processing selection-related operations
 */
class SelectionPlugin extends IPlugin {
  constructor() {
    super({
      name: 'selection',
      description: 'process select related staff.',
      dependencies: []
    });
  }

  /**
   * Called when the plugin is activated
   * @param context - Activation context containing app instance
   */
  onActive(context: ActivationContext): void {
    context.app.cmdManager.register([
      [CommandType.DeleteSelection, CmdDeleteSelection],
      [CommandType.DuplicateSelection, CmdDuplicateSelection],
      [CommandType.PointSelect, CmdPointSelect],
      [CommandType.WindowSelect, CmdWindowSelect],
      [CommandType.ElevationSelect, CmdElevationSelect]
    ]);
  }

  /**
   * Gets the point select command class
   * @returns The CmdPointSelect command class
   */
  getCmdPointSelect(): typeof CmdPointSelect {
    return CmdPointSelect;
  }
}

// Register the selection plugin
HSApp.Plugin.registerPlugin(PluginType.Selection, SelectionPlugin);

export { SelectionPlugin };