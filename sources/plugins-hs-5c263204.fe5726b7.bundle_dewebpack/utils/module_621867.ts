import { HSApp } from './518193';
import CmdAddGroup from './125963';
import CmdRemoveGroup from './124190';
import CmdDeleteGroup from './483223';
import CmdFlipGroup from './802579';
import CmdIncludeMember from './942095';
import CmdExcludeMember from './544485';
import TransFlipGroup from './420833';

interface IPluginContext {
  app: {
    cmdManager: {
      register(commands: Array<[string, unknown]>): void;
    };
    transManager: {
      register(requests: Array<[string, unknown]>): void;
    };
  };
}

class GroupEditingPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: 'group editing',
      description: 'Process group edit commands.',
      dependencies: []
    });
  }

  onActive(context: IPluginContext): void {
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.AddGroup, CmdAddGroup],
      [HSFPConstants.CommandType.RemoveGroup, CmdRemoveGroup],
      [HSFPConstants.CommandType.DeleteGroup, CmdDeleteGroup],
      [HSFPConstants.CommandType.FlipGroup, CmdFlipGroup],
      [HSFPConstants.CommandType.DistributionContents, HSApp.Cmd.Implement.CmdDistributionContents],
      [HSFPConstants.CommandType.IncludeMember, CmdIncludeMember],
      [HSFPConstants.CommandType.ExcludeMember, CmdExcludeMember]
    ]);

    context.app.transManager.register([
      [HSFPConstants.RequestType.FlipGroup, TransFlipGroup]
    ]);
  }

  onDeactive(): void {
    // Plugin deactivation logic
  }
}

HSApp.Plugin.registerPlugin('hsw.plugin.Group.Plugin', GroupEditingPlugin);