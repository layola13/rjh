import BaseCommand from './BaseCommand';

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command | null;
  execute(command: Command, options?: unknown): void;
}

interface Command {
  showGizmo: boolean;
}

interface TemplateEntity {
  // Define specific properties based on your domain
}

/**
 * Command for applying geometry material to pocket
 */
export default class ApplyGeometryMaterialCommand extends BaseCommand {
  protected cmdMgr!: CommandManager;
  protected templateEntity!: TemplateEntity;

  constructor(entity: TemplateEntity) {
    super(entity);
  }

  /**
   * Applies style by creating and executing a geometry material command
   * @param options - Optional configuration for command execution
   */
  onApplyStyle(options?: unknown): void {
    const command = this.cmdMgr.createCommand(
      HSFPConstants.CommandType.ApplyGeometryMaterialToPocket,
      [this.templateEntity]
    );

    if (command) {
      command.showGizmo = false;
      this.cmdMgr.execute(command, options);
    }
  }
}

declare const HSFPConstants: {
  CommandType: {
    ApplyGeometryMaterialToPocket: string;
  };
};