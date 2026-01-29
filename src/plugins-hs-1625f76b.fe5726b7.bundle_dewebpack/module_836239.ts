interface Entity {
  // Define based on actual entity structure
}

interface Application {
  cmdManager: CommandManager;
  pluginManager: PluginManager;
}

interface CommandManager {
  signalCommandStarted: unknown;
  signalCommandResumed: unknown;
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  receive(action: string, event?: unknown): boolean;
  complete(): void;
  current: Command | null;
}

interface Command {
  type: string;
  showGizmo?: boolean;
}

interface PluginManager {
  getPlugin(type: string): Plugin | null;
}

interface Plugin {
  hideLeftMenu(): void;
}

interface DragEvent {
  // Define drag event properties as needed
}

interface CommandEvent {
  data: {
    cmd: Command;
  };
}

interface Options {
  application: Application;
}

declare namespace HSCore {
  namespace Util {
    class SignalHook {
      constructor(context: unknown);
      listen(signal: unknown, handler: (event: CommandEvent) => void): this;
      dispose(): void;
    }
  }
  
  namespace Model {
    class CustomizedPMInstanceModel {}
    class NCustomizedStructure {}
    class NCustomizedBeam {}
    class Hole {}
  }
}

declare namespace HSApp {
  namespace View {
    namespace Base {
      class DisplayController {
        constructor(entity: Entity, options: Options);
        destroy(args: unknown): void;
      }
    }
  }
}

declare namespace HSFPConstants {
  enum CommandType {
    RotateCustomizedPMInstanceModel = 'RotateCustomizedPMInstanceModel',
    RotateStructure = 'RotateStructure',
    RotateBeam = 'RotateBeam',
    RotateHole = 'RotateHole',
    RotateContent = 'RotateContent'
  }
  
  enum PluginType {
    LeftMenu = 'LeftMenu'
  }
}

export default class RotationController extends HSApp.View.Base.DisplayController {
  private entity: Entity;
  private app: Application;
  private cmdMgr: CommandManager;
  private signalHook: HSCore.Util.SignalHook;

  constructor(entity: Entity, options: Options) {
    super(entity, options);
    
    this.entity = entity;
    this.app = options.application;
    this.cmdMgr = this.app.cmdManager;
    this.signalHook = new HSCore.Util.SignalHook(this);
    
    this.signalHook
      .listen(this.cmdMgr.signalCommandStarted, this._onCommandRunning)
      .listen(this.cmdMgr.signalCommandResumed, this._onCommandRunning);
  }

  ondragstart(event: DragEvent): boolean {
    let command: Command;

    if (this.entity instanceof HSCore.Model.CustomizedPMInstanceModel) {
      command = this.cmdMgr.createCommand(
        HSFPConstants.CommandType.RotateCustomizedPMInstanceModel,
        [this.entity, 'xy']
      );
    } else if (this.entity instanceof HSCore.Model.NCustomizedStructure) {
      command = this.cmdMgr.createCommand(
        HSFPConstants.CommandType.RotateStructure,
        [this.entity, 'xy']
      );
    } else if (this.entity instanceof HSCore.Model.NCustomizedBeam) {
      command = this.cmdMgr.createCommand(
        HSFPConstants.CommandType.RotateBeam,
        [this.entity, 'xy']
      );
    } else if (this.entity instanceof HSCore.Model.Hole) {
      command = this.cmdMgr.createCommand(
        HSFPConstants.CommandType.RotateHole,
        [this.entity, 'xy']
      );
    } else {
      command = this.cmdMgr.createCommand(
        HSFPConstants.CommandType.RotateContent,
        [this.entity, 'xy']
      );
    }

    command.showGizmo = false;
    this.cmdMgr.execute(command);
    
    return true;
  }

  ondragmove(event: DragEvent): boolean {
    const currentCommand = this.cmdMgr.current;
    
    if (!currentCommand) {
      return false;
    }

    const validCommandTypes = [
      HSFPConstants.CommandType.RotateContent,
      HSFPConstants.CommandType.RotateCustomizedPMInstanceModel,
      HSFPConstants.CommandType.RotateStructure,
      HSFPConstants.CommandType.RotateBeam,
      HSFPConstants.CommandType.RotateHole
    ];

    if (!validCommandTypes.includes(currentCommand.type as any)) {
      return false;
    }

    return this.cmdMgr.receive('dragmove', event);
  }

  ondragend(): boolean {
    const currentCommand = this.cmdMgr.current;
    
    if (!currentCommand) {
      return false;
    }

    if (currentCommand.type === HSFPConstants.CommandType.RotateContent) {
      return this.cmdMgr.receive('dragend');
    }

    const validCommandTypes = [
      HSFPConstants.CommandType.RotateCustomizedPMInstanceModel,
      HSFPConstants.CommandType.RotateStructure,
      HSFPConstants.CommandType.RotateBeam,
      HSFPConstants.CommandType.RotateHole
    ];

    if (!validCommandTypes.includes(currentCommand.type as any)) {
      return false;
    }

    this.cmdMgr.complete();
    return true;
  }

  private _onCommandRunning = (event: CommandEvent): void => {
    const command = event.data.cmd;
    
    if (!command) {
      return;
    }

    const rotateCommandTypes = [
      HSFPConstants.CommandType.RotateContent,
      HSFPConstants.CommandType.RotateCustomizedPMInstanceModel,
      HSFPConstants.CommandType.RotateStructure,
      HSFPConstants.CommandType.RotateBeam,
      HSFPConstants.CommandType.RotateHole
    ];

    if (rotateCommandTypes.includes(command.type as any)) {
      const leftMenuPlugin = this.app.pluginManager.getPlugin(
        HSFPConstants.PluginType.LeftMenu
      );
      
      leftMenuPlugin?.hideLeftMenu();
    }
  };

  destroy(args: unknown): void {
    super.destroy(args);
    this.signalHook.dispose();
  }
}