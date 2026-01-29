import BaseCommand from './BaseCommand';

interface CommandManager {
  createCommand(commandType: string, args: unknown[]): Command | null;
  execute(command: Command, options?: unknown): void;
}

interface Command {
  showGizmo: boolean;
}

interface TemplateEntity {
  // Define properties based on your application's entity structure
}

declare const HSFPConstants: {
  CommandType: {
    ApplyGeometryMaterialToOpening: string;
  };
};

export default class ApplyGeometryMaterialCommand extends BaseCommand {
  protected cmdMgr!: CommandManager;
  protected templateEntity!: TemplateEntity;

  constructor(options: unknown) {
    super(options);
  }

  onApplyStyle(options?: unknown): void {
    const command = this.cmdMgr.createCommand(
      HSFPConstants.CommandType.ApplyGeometryMaterialToOpening,
      [this.templateEntity]
    );

    if (command) {
      command.showGizmo = false;
      this.cmdMgr.execute(command, options);
    }
  }
}